import { Math } from 'phaser';
import Player from './player/Player.js';
import Door from './interactable/Door.js';
import Retrocomputer from './interactable/Retrocomputer.js';
import SpacebarSign from './UI/SpacebarSign.js';

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
        this.computers = [];
        this.interactables = [this.doors, this.computers];
        constraintsLayer.forEachTile(tile => {
            if (![43, 44, 45].includes(tile.index)) return;
            const worldPos = constraintsLayer.tileToWorldXY(tile.x, tile.y);
            if(tile.index === 43){
                // 🧍 Define player spawn location
                playerSpawn.x = worldPos.x * constraintsLayer.scaleX;
                playerSpawn.y = (worldPos.y * constraintsLayer.scaleY) + 7;
                return;
            }
            if(tile.index === 44){
                // 🚪 Spawn door object
                this.doors.push(new Door(this, worldPos.x * constraintsLayer.scaleX + 16, (worldPos.y * constraintsLayer.scaleY) - 7));
                this.doors[this.doors.length - 1].create();
                return;
            }
            if(tile.index === 45){
                // 💻 Spawn computer object
                this.computers.push(new Retrocomputer(this, worldPos.x * constraintsLayer.scaleX + 16, (worldPos.y * constraintsLayer.scaleY)));
                this.computers[this.computers.length - 1].create();
                return;
            }
        });

        // 🏞️ BG Layers
        // 📝 TODO: Change this placeholders for new sprites with correct size
        this.parallaxLayers = [];
        for(let i = 1; i < 8; i++){
            this.parallaxLayers.push(this.add.tileSprite(width * 1.2, height , width, (height * 2) - 25, `city-${i}`).setOrigin(0.5, 0.5));
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
        this.computers.forEach(computer => {
            computer.setAbove(house);
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
        if(this.sys.game.device.os.desktop){
            this.spacebarSign = new SpacebarSign(this, 0, 0).setDepth(1).setOrigin(0.5, 0.5);
            this.add.sprite(playerSpawn.x * 1.4, playerSpawn.y - 28, 'tutorial');
        }
        if(!this.sys.game.device.os.desktop){
            this.mobileControls = {
                left: this.add.sprite(16 * 2, height, 'UI', 'mobile01').setDepth(1).setInteractive()
                .on('pointerover', () => {this.events.emit('movingleft')})
                .on('pointerout', () => {this.events.emit('stopmoving')}),
                right: this.add.sprite(16 * 3, height, 'UI', 'mobile01').setDepth(1).setFlipX(true).setInteractive()
                .on('pointerover', () => {this.events.emit('movingright')})
                .on('pointerout', () => {this.events.emit('stopmoving')}),
                interact: this.add.sprite(width - 24, height, 'UI', 'interact01').setDepth(1).setVisible(false).setInteractive()
                    .on('pointerover', () => {this.mobileControls.interact.setFrame('interact02')})
                    .on('pointerout', () => {
                        this.mobileControls.interact.setFrame('interact01');
                        this.events.emit('interact');
                    })
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
            this.mobileControls.interact.setX((this.scale.width - 24) + this.cameras.main.scrollX);
            this.mobileControls.interact.setVisible(false);
        }else this.spacebarSign.setVisible(false);
        
        // Update all interactables
        this.interactables.forEach(interactableList => {
            interactableList.forEach(interactable => {interactable.update()});
        });

        // 🏞️ Parallax layers have to stay fixed to player's X position.
        this.parallaxLayers.forEach((layer) => {
            layer.setX(layer.x + (((this.cameras.main.scrollX + (this.scale.width / 2) - layer.x))));
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
                for (let i = 0, speed = 0.2; i < 5; i++, speed *= 0.25) {
                    this.parallaxLayers[i].tilePositionX += speed;
                }
            }else{
                for (let i = 0, speed = 0.2; i < 5; i++, speed *= 0.25) {
                    this.parallaxLayers[i].tilePositionX -= speed;
                }
            }
        }
    }
}
