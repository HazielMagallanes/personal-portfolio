import langs from "./UI/LangUtil";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super( {key: 'Preloader'} );
    }

    preload() {
        // Center coordinates
        const { width, height } = this.cameras.main;
        // Create a background rectangle for the loading bar
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);
        // Loading bar (foreground)
        const progressBar = this.add.graphics();
        // Loading text
        const loadingText = document.getElementById('loading-text');
        // Progress percent text
        const percentText = document.getElementById('percent-text');
        // Loading screen
        const loadingScreen = document.getElementById('loading-screen');
        // Update loading bar on progress
        this.load.on('progress', (value) => {
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
        percentText.innerText = `${Math.round(value * 100)}%`;
        });

        this.load.on('complete', () => {
        progressBar.destroy();
        progressBox.destroy();

        loadingText.style.display = "none";
        percentText.style.display = "none";
        loadingScreen.style.display = "none";
        });


        this.load.path = 'assets/'
        // 🎨 UI
        this.load.atlas('UI', './sprites/UI/UI.png', './sprites/UI/UI.json');
        this.load.image('tutorial', './sprites/UI/tutorial.png')
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
        this.load.image('city-1', './sprites/background/city/city-1.png');
        this.load.image('city-2', './sprites/background/city/city-2.png');
        this.load.image('city-3', './sprites/background/city/city-3.png');
        this.load.image('city-4', './sprites/background/city/city-4.png');
        this.load.image('city-5', './sprites/background/city/city-5.png');
        this.load.image('city-6', './sprites/background/city/city-6.png');
        this.load.image('city-7', './sprites/background/city/city-7.png');
        // 🗺️ World map
        this.load.tilemapTiledJSON('world', '../map/world.json');
        this.load.image('house-structure-tiles', './sprites/tilesets/house/house_structure.png');
        this.load.image('house-furniture-tiles', './sprites/tilesets/house/house_furniture.png');
        this.load.image('constraints-tileset', './sprites/tilesets/constraints.png');
        // 🔤 Fonts
        this.load.font('press-start-2p', './font/Press_Start_2P/PressStart2P-Regular.ttf', 'truetype');
        // 📝 Pregenerated texts
        this.load.image('title-text', './pregen_text/title.bmp');
        this.load.atlas('pregen-texts', './pregen_text/pregen_texts.bmp', './pregen_text/pregen_texts.json');
        // Languages
        this.load.json('en-US', './lang/en-US.json');
        this.load.json('es-ES', './lang/es-ES.json');
        
    }

    create() {
        // Lock orientation to landscape
        if (this.sys.game.device.os.desktop === false) this.scale.lockOrientation('landscape');
        // Load language data from JSON file
        langs.langData = {
            'en-US': this.cache.json.get('en-US'),
            'es-ES': this.cache.json.get('es-ES')
        }
        langs.setLang('es-ES')        
        document.getElementById('body').style.visibility="visible"
        this.scene.start('Menu');
    }
}