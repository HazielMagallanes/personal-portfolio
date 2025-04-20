import langs from "./UI/LangUtil";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        this.load.path = './src/game/assets/'
        // 🎨 UI
        this.load.atlas('UI', './sprites/UI/UI.png', './sprites/UI/UI.json');
        // 🕹️ Player
        this.load.atlas('player', './sprites/player/hazu.png', './sprites/player/hazu.json');
        // 🛠️ Interactable objects
        this.load.atlas('door', './sprites/interactable/door.png', './sprites/interactable/door.json');
        this.load.atlas('retrocomputer', './sprites/interactable/retrocomputer.png', './sprites/interactable/retrocomputer.json');
        // 🏞️ Menu Background
        this.load.image('sky', './placeholder/Clouds/Clouds 1/0.png');
        this.load.image('clouds-1', './placeholder/Clouds/Clouds 1/1.png');
        this.load.image('clouds-2', './placeholder/Clouds/Clouds 1/2.png');
        this.load.image('clouds-3', './placeholder/Clouds/Clouds 1/3.png');
        this.load.image('clouds-4', './placeholder/Clouds/Clouds 1/4.png');
        // 🏙️ World Background
        this.load.image('city-1', './placeholder/EDITED/Cities/cityPOT1.png');
        this.load.image('city-2', './placeholder/EDITED/Cities/cityPOT2.png');
        this.load.image('city-3', './placeholder/EDITED/Cities/cityPOT3.png');
        this.load.image('city-4', './placeholder/EDITED/Cities/cityPOT4.png');
        this.load.image('city-5', './placeholder/EDITED/Cities/cityPOT5.png');
        // 🗺️ World map
        this.load.tilemapTiledJSON('world', '../map/world.json');
        this.load.image('house-structure-tiles', './sprites/tilesets/fixed/house/house_structure.png');
        this.load.image('house-furniture-tiles', './sprites/tilesets/fixed/house/house_furniture.png');
        this.load.image('constraints-tileset', './sprites/tilesets/constraints.png');
        // 🔤 Fonts
        this.load.font('pixelify-sans-bold', './font/Pixelify-sans/static/PixelifySans-Bold.ttf', 'truetype');
        this.load.font('press-start-2p', './font/Press_Start_2P/PressStart2P-Regular.ttf', 'truetype');
        // 📝 Pregenerated texts
        this.load.image('title-text', './pregen_text/title.bmp');
        this.load.image('press-space-ES', './pregen_text/press-space-ES.bmp');
        this.load.image('touch-screen-ES', './pregen_text/touch-screen-ES.bmp');
        // Languages
        this.load.json('en-US', './lang/en-US.json');
        this.load.json('es-ES', './lang/es-ES.json');
        
    }

    create() {
        // Load language data from JSON file
        langs.langData = {
            'en-US': this.cache.json.get('en-US'),
            'es-ES': this.cache.json.get('es-ES')
        }
        langs.setLang('es-ES')        
        
        this.scene.start('Menu');
    }
}