export default class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        this.load.path = './src/game/assets/'
        // Player
        this.load.atlas('player', './sprites/player/hazu.png', './sprites/player/hazu.json');
        //🏞️ Menu Background
        this.load.image('sky', './placeholder/Clouds/Clouds 1/0.png');
		this.load.image('clouds-1', './placeholder/Clouds/Clouds 1/1.png');
		this.load.image('clouds-2', './placeholder/Clouds/Clouds 1/2.png');
        this.load.image('clouds-3', './placeholder/Clouds/Clouds 1/3.png');
        this.load.image('clouds-4', './placeholder/Clouds/Clouds 1/4.png');
        //🏞️ World Background
        this.load.image('city-1', './placeholder/Cities/city 5/1.png');
        this.load.image('city-2', './placeholder/Cities/city 5/2.png');
        this.load.image('city-3', './placeholder/Cities/city 5/3.png');
        this.load.image('city-4', './placeholder/Cities/city 5/4.png');
        this.load.image('city-5', './placeholder/Cities/city 5/5.png');
        this.load.image('city-6', './placeholder/Cities/city 5/6.png');
        // World map
        this.load.tilemapTiledJSON('world', '../map/world.json');
        this.load.image('house-structure-tiles', './sprites/tilesets/house/house_structure.png');
        this.load.image('constraints-tileset', './sprites/tilesets/constraints.png');
        // Fonts
        this.load.font('pixelify-sans-bold', './font/Pixelify-sans/static/PixelifySans-Bold.ttf', 'truetype');
        this.load.font('press-start-2p', './font/Press_Start_2P/PressStart2P-Regular.ttf', 'truetype');
        
    }

    create() {
        this.scene.start('Menu');
    }
}