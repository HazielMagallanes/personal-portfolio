import BouncingElement from "./BouncingElement";
import langs from "./LangUtil";

export default class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }
    create() {
        const { width, height } = this.scale;
        // 🏞️🌥️ Background layers
        this.backgroundLayers = 
        [
            this.add.tileSprite(0, 0, width, height, 'sky').setOrigin(0, 0),
            this.add.tileSprite(0, 0, width, height, 'clouds-1').setOrigin(0, 0),
            this.add.tileSprite(0, 0, width, height, 'clouds-2').setOrigin(0, 0),
            this.add.tileSprite(0, height / 2, width, height, 'clouds-3').setOrigin(0, 0),
            this.add.tileSprite(0, height, width, height, 'clouds-3').setOrigin(0, 0).setFlipY(true),
            this.add.tileSprite(0, 0, width, height, 'clouds-4').setOrigin(0, 0),
            this.add.tileSprite(0, height / 1.5, width, height, 'clouds-4').setOrigin(0, 0)
        ];
        this.backgroundLayers[6].tilePositionX = width / 3;
        this.scaleBackground();
        this.scale.lockOrientation("landscape");

        // 📝📱 UI elements
        var startText = this.sys.game.device.os.desktop ? '01': '02'
        
        this.languageButtons =
        [
            this.add.sprite(width - (25 + 16), 8, 'UI', 'en-US01').setInteractive()
            .on('pointerup', () => {
                this.languageButtons[0].setFrame('en-US01');
                this.changeLanguage('en-US');
            })
            .on('pointerdown', () => {
                this.languageButtons[0].setFrame('en-US02');
            }),
            this.add.sprite(width - (5 + 16), 8, 'UI', 'es-ES01').setInteractive()
            .on('pointerup', () => {
                this.languageButtons[1].setFrame('es-ES01');
                this.changeLanguage('es-ES');
            })
            .on('pointerdown', () => {
                this.languageButtons[1].setFrame('es-ES02');
            })
        ]
        // 🖼️ Use pregenerated text to avoid problems with older GPUs and integrated graphics (Happened on one of my computers LOL).
        this.gameTitle = this.add.sprite(width / 2, height / 4, 'title-text').setOrigin(0.5);
        this.startButton = new BouncingElement(this.add.sprite(width / 2, height / 2, 'pregen-texts', `${langs.getLang() + startText}`).setOrigin(0.5), 0.08, height / 2.2);

        addEventListener('touchend', () => {
            if(!this.scene.isActive('Menu')) return;
            if(this.touchingLanguages) {
                this.touchingLanguages = false;
                return;
            }
            this.scene.start('World');
        })
        // 🌐📏 Resize handling
        this.scale.addListener('resize', (gameSize) => {
            const { width, height } = gameSize;
            this.recenterMenu(width, height);
        });
        // 🎮 Interactivity
        this.input.keyboard.on('keyup-SPACE', () => {
            this.scene.start('World');
        })
    }

    recenterMenu(width, height) {
        // 📝🔄 Texts
        this.gameTitle.setPosition(width / 2, height / 4);
        this.startButton.element.setPosition(width / 2, height / 2);
        // 🏞️🔄 Parallax Layers
        this.backgroundLayers.forEach((layer) =>{
            layer.setSize(width, height);
        })
        this.backgroundLayers[0].setPosition(0, 0);
        this.backgroundLayers[1].setPosition(0, 0);
        this.backgroundLayers[2].setPosition(0, 0);
        this.backgroundLayers[3].setPosition(0, height / 2);
        this.backgroundLayers[4].setPosition(0, height);
        this.backgroundLayers[5].setPosition(0, 0);
        this.backgroundLayers[6].setPosition(0, height / 1.5);
        this.scaleBackground();
    }

    scaleBackground() {
        // 🔄📏 Resize all background layers to fit screen
        this.backgroundLayers.forEach((layer) => {
            layer.setScale(1, 0.5);
        })
        this.backgroundLayers[0].setScale(1, 1);
    }
    changeLanguage(lang){
        var startText = this.sys.game.device.os.desktop ? '01': '02'
        // Change language in the game
        langs.setLang(lang);
        // Change pregenerated texts to corresponding language
        this.startButton.getElement().setFrame(`${langs.getLang() + startText}`)
        this.touchingLanguages = true;
    }
    update() {
        // 🎞️🌌 Parallax
        this.backgroundLayers[1].tilePositionX += 0.02;
        this.backgroundLayers[2].tilePositionX += 0.04;
        this.backgroundLayers[3].tilePositionX += 0.16;
        this.backgroundLayers[4].tilePositionX += 0.16;
        this.backgroundLayers[5].tilePositionX += 0.08;
        this.backgroundLayers[6].tilePositionX += 0.12;
        // 🕹️🎨 Title animation 
        this.startButton.bounce();
    }
}
