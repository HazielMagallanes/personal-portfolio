import BouncingElement from "./BouncingElement";
export default class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }
    // TODO:  ADD MORE EMOJIS; THEY LOOK AWESOME
    create() {
        const { width, height } = this.scale;

        // 🏞️ Background layers
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

        // 📝 UI elements
        // Use pregenerated text to avoid problems with older gpus and integrated graphics (Happened on one of my computers LOL).
        this.gameTitle = this.add.sprite(width / 2, height / 4, 'title-text').setOrigin(0.5);
        this.startButton = new BouncingElement(this.add.sprite(width / 2, height / 2, 'press-space-ES').setOrigin(0.5), 0.08, height / 2.2);

        // 🌐 Resize handling
        this.scale.addListener('resize', (gameSize) => {
            const { width, height } = gameSize;
            this.recenterMenu(width, height);
        });
        // Interactivity
        this.input.keyboard.on('keyup-SPACE', () => {
            this.scene.start('World');
        })
    }

    recenterMenu(width, height) {
        // Texts
        this.gameTitle.setPosition(width / 2, height / 4);
        this.startButton.element.setPosition(width / 2, height / 2);
        // Parallax Layers
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
        // 🔄 Resize all background layers to fit screen
        this.backgroundLayers.forEach((layer) => {
            layer.setScale(1, 0.5);
        })
        this.backgroundLayers[0].setScale(1, 1);
    }

    update() {
        // 🎞️ Parallax
        this.backgroundLayers[1].tilePositionX += 0.02;
        this.backgroundLayers[2].tilePositionX += 0.04;
        this.backgroundLayers[3].tilePositionX += 0.16;
        this.backgroundLayers[4].tilePositionX += 0.16;
        this.backgroundLayers[5].tilePositionX += 0.08;
        this.backgroundLayers[6].tilePositionX += 0.12;
        // Title animation 
        this.startButton.bounce();
    }
}
