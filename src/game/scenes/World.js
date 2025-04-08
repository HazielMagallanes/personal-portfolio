import { Math } from 'phaser';
import Player from './player/Player.js';

export default class World extends Phaser.Scene {
    constructor() {
        super('World');
    }

    create() {
        const {width, height} = this.scale;
        // Process map
        const map = this.make.tilemap({ key: 'world' })
        const tileset = map.addTilesetImage('house_structure', 'house-structure-tiles');
        const constraints = map.addTilesetImage('constraints', 'constraints-tileset');

        // Process map constraints
        const constraintsLayer = map.createLayer('Constraints', constraints, 0, 0);
        constraintsLayer.visible = false;

        // Player spawn location constraint
        const playerSpawn = new Math.Vector2(0, 0)
        constraintsLayer.forEachTile(tile => {
            if (tile.index != 10 ) return;
            // Convert tile coordinates to world coordinates
            const worldPos = constraintsLayer.tileToWorldXY(tile.x, tile.y);
            playerSpawn.x = worldPos.x * constraintsLayer.scaleX;
            playerSpawn.y = worldPos.y * constraintsLayer.scaleY;
        });

        // 🏞️ BG Layers
        // TODO: Change this placeholders for new sprites with correct size
        this.parallaxLayers = 
        [
            this.add.tileSprite(0, 0 - (height - playerSpawn.y) + 8, width + width * 0.1, height + height * 0.1, 'city-1').setOrigin(0, 0).setTileScale(0.5, 0.4),
            this.add.tileSprite(0, 0 - (height - playerSpawn.y) + 8, width + width * 0.1, height + height * 0.1, 'city-2').setOrigin(0, 0).setTileScale(0.5, 0.4),
            this.add.tileSprite(0, 0 - (height - playerSpawn.y) + 8, width + width * 0.1, height + height * 0.1, 'city-3').setOrigin(0, 0).setTileScale(0.5, 0.4),
            this.add.tileSprite(0, 0 - (height - playerSpawn.y) + 8, width + width * 0.1, height + height * 0.1, 'city-4').setOrigin(0, 0).setTileScale(0.5, 0.4),
            this.add.tileSprite(0, 0 - (height - playerSpawn.y) + 8, width + width * 0.1, height + height * 0.1, 'city-5').setOrigin(0, 0).setTileScale(0.5, 0.4),
        ];

        // Draw map
        map.createLayer('BG', tileset, 0, 0);
    
        // Player
        this.player = new Player(this, playerSpawn.x, playerSpawn.y);

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setFollowOffset((width / 4) * -1, height / 5);
        this.cameras.main.useBounds = false;
        this.physics.world.setBounds( 0, 0, 10000, 256 );


        this.keys = this.input.keyboard.addKeys({
            up: 'up',
            down: 'down',
            space: 'space'
        });

        //this.cameras.main.setBounds(-300, 0, 1600, 1200);
    }

    update() {
        this.player.update();
        // Parallax layers have to stay fixed to player's X position.
        this.parallaxLayers.forEach((layer) => {
            layer.setX(this.cameras.main.scrollX - 16);
        })
        // DEBUG
        const {up, down, space} = this.keys;
        if(down.isDown){
            this.cameras.main.setZoom(this.cameras.main.zoomX * 0.9);
        }else if(up.isDown){
            this.cameras.main.setZoom(this.cameras.main.zoomX + (this.cameras.main.zoomX * 0.1));
        }else if(space.isDown){
            this.cameras.main.setZoom(1);
        }
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
