import Player from './player/Player.js';

export default class World extends Phaser.Scene {
    constructor() {
        super('World');
    }

    create() {
        //Map
        const map = this.make.tilemap({ key: 'world' })

        const tileset = map.addTilesetImage('house_structure', 'house-structure-tiles');
        const constraints = map.addTilesetImage('constraints', 'constraints-tileset');
        map.createLayer('BG', tileset, 0, 0);
        const constraintsLayer = map.createLayer('Constraints', constraints, 0, 0);
        constraintsLayer.visible = false;
        // Get player spawn coordinates
        let spawnX = 0, spawnY = 0;
        constraintsLayer.forEachTile(tile => {
            if (tile.index != 10 ) return;
            // Convert tile coordinates to world coordinates
            const worldPos = constraintsLayer.tileToWorldXY(tile.x, tile.y);
            spawnX = worldPos.x * constraintsLayer.scaleX;
            spawnY = worldPos.y * constraintsLayer.scaleY;
        });
    
        // Player
        this.player = new Player(this, spawnX, spawnY);

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setFollowOffset((this.scale.width / 4) * -1, this.scale.height / 5);
        this.cameras.main.useBounds = false;
        this.physics.world.setBounds( 0, 0, 10000, 256 );
        this.keys = this.input.keyboard.addKeys({
            space: 'space'
        });

        //this.cameras.main.setBounds(-300, 0, 1600, 1200);
    }

    update() {
        this.player.update();
    }
}
