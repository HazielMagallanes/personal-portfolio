import { Math } from 'phaser';
import Player from './player/Player.js';
import Door from './interactable/Door.js';

export default class World extends Phaser.Scene {
    constructor() {
        super('World');
    }

    create() {
        // 🛠️ DEBUGGING TOOLS
        this.fpsText = document.getElementById("fps")
        const {width, height} = this.scale;;

        // 🗺️ Process map
        const map = this.make.tilemap({ key: 'world' })
        map.addTilesetImage('house_structure', 'house-structure-tiles', 18, 18, 1, 1);
        map.addTilesetImage('furniture', 'house-furniture-tiles', 18, 18, 1, 1);
        const constraints = map.addTilesetImage('constraints', 'constraints-tileset', 16, 16, 1, 1);

        // 🚧 Process map constraints
        const constraintsLayer = map.createLayer('Constraints', constraints, 0, 0);
        constraintsLayer.visible = false;

        // 🚀 Player spawn location constraint
        const playerSpawn = new Math.Vector2(0, 0);
        this.doors = [];
        constraintsLayer.forEachTile(tile => {
            if (![79, 80, 81].includes(tile.index)) return;
            const worldPos = constraintsLayer.tileToWorldXY(tile.x, tile.y);
            if(tile.index === 79){
                // 🧍 Define player spawn location
                playerSpawn.x = worldPos.x * constraintsLayer.scaleX;
                playerSpawn.y = (worldPos.y * constraintsLayer.scaleY) + 7;
                return;
            }
            if(tile.index === 80){
                // 🚪 Spawn door object
                this.doors.push(new Door(this, worldPos.x * constraintsLayer.scaleX + 16, (worldPos.y * constraintsLayer.scaleY) - 7));
                this.doors[this.doors.length - 1].create();
                return;
            }
            if(tile.index === 81){
                // 💻 Spawn computer object
                return;
            }
        });

        // 🏞️ BG Layers
        // 📝 TODO: Change this placeholders for new sprites with correct size
        this.parallaxLayers = [];
        for(let i = 1; i < 6; i++){
            this.parallaxLayers.push(this.add.tileSprite(0, 0 - (height - playerSpawn.y) + 8, width * 1.1, height * 1.1, `city-${i}`).setOrigin(0, 0).setTileScale(0.5, 0.4))
        }

        // 🖌️ Draw map
        const house = map.createLayer('BG', 'house_structure', 0, 0);
        map.createLayer('Furniture', 'furniture', 0, 1);
        map.createLayer('Furniture2', 'furniture', 0, -2);
    
        // 🧍 Player
        this.player = new Player(this, playerSpawn.x, playerSpawn.y);
        this.doors.forEach(door => {
            door.setAbove(house);
            this.physics.add.collider(this.player, door);
        });
        map.createLayer('Overplayer', 'house_structure', 512, 0);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setFollowOffset((width / 4) * -1, height / 5);
        this.cameras.main.useBounds = false;
        this.physics.world.setBounds(16 * 7, 0, 10000, playerSpawn.y + 10);

        // 🎮 Input keys
        this.keys = this.input.keyboard.addKeys({
            up: 'up',
            down: 'down',
            space: 'space'
        });

        // 🖼️ DRAW UI
        if(!this.sys.game.device.os.desktop){
            this.mobileControls = {
                left: this.add.sprite(16 * 2, height, 'UI').setFlipX(true).setInteractive()
                .on('pointerover', () => {this.player.direction = -1})
                .on('pointerout', () => {this.player.direction = 0}),
                right: this.add.sprite(16 * 3, height, 'UI').setInteractive()
                .on('pointerover', () => {this.player.direction = 1})
                .on('pointerout', () => {this.player.direction = 0})
            }
        }
    }

    update() {
        this.player.update();
        // 🖼️ UI
        if(!this.sys.game.device.os.desktop){
            // 📱 Mobile controls
            this.mobileControls.left.setX(16 * 2 + this.cameras.main.scrollX);
            this.mobileControls.right.setX(this.mobileControls.left.x + 16);
        }
        // 🏞️ Parallax layers have to stay fixed to player's X position.
        this.parallaxLayers.forEach((layer) => {
            layer.setX(this.cameras.main.scrollX - 16);
        })
        // 🛠️ DEBUGGING TOOLS
        const {up, down, space} = this.keys;
        if(down.isDown){
            this.cameras.main.setZoom(this.cameras.main.zoomX * 0.9);
        }else if(up.isDown){
            this.cameras.main.setZoom(this.cameras.main.zoomX + (this.cameras.main.zoomX * 0.1));
        }else if(space.isDown){
            this.cameras.main.setZoom(1);
        }
        this.fpsText.innerHTML = Math.FloorTo(this.game.loop.actualFps);

        // 🎞️ Parallax
        if(this.player.isMoving){
            if(this.player.speed < 0){
                this.parallaxLayers[0].tilePositionX += 0.02
                this.parallaxLayers[1].tilePositionX += 0.04
                this.parallaxLayers[2].tilePositionX += 0.16
                this.parallaxLayers[3].tilePositionX += 0.16
                this.parallaxLayers[4].tilePositionX += 0.12   
            }else{
                this.parallaxLayers[0].tilePositionX -= 0.02
                this.parallaxLayers[1].tilePositionX -= 0.04
                this.parallaxLayers[2].tilePositionX -= 0.16
                this.parallaxLayers[3].tilePositionX -= 0.16
                this.parallaxLayers[4].tilePositionX -= 0.12   
            }
        }
    }
}
