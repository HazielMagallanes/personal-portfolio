import BouncingElement from "./BouncingElement";
export default class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }
    // TODO:  ADD MORE EMOJIS; THEY LOOK AWESOME
    create() {
        const { width, height } = this.scale;

        // 🏞️ Background layers
        this.sky = this.add.tileSprite(0, 0, width, height, 'sky').setOrigin(0, 0);
        this.clouds1 = this.add.tileSprite(0, 0, width, height, 'clouds-1').setOrigin(0, 0);
        this.clouds2 = this.add.tileSprite(0, 0, width, height, 'clouds-2').setOrigin(0, 0);
        this.clouds3 = this.add.tileSprite(0, height / 2, width, height, 'clouds-3').setOrigin(0, 0);
        this.clouds4 = this.add.tileSprite(0, height, width, height, 'clouds-3').setOrigin(0, 0).setFlipY(true);
        this.clouds5 = this.add.tileSprite(0, 0, width, height, 'clouds-4').setOrigin(0, 0);
        this.clouds6 = this.add.tileSprite(0, height / 1.5, width, height, 'clouds-4').setOrigin(0, 0);
        this.clouds6.tilePositionX = width / 3;
        this.scaleBackground();

        this.backgroundLayers = [this.sky, this.clouds1, this.clouds2, this.clouds3, this.clouds4, this.clouds5, this.clouds6];

        // 📝 UI elements
        this.gameTitle = this.add.text(width / 2, height / 4, "HAZU'S PORTFOLIO", {
            fontSize: '12px',
            fill: '#ffffff',
            fontFamily: 'press-start-2p',
            resolution: 30
        }).setOrigin(0.5);

        this.startButton = new BouncingElement(this.add.text(width / 2, height / 2, '(Presiona espacio para empezar)', {
            fontSize: '8px',
            fill: '#ffffff',
            fontFamily: 'press-start-2p',
            resolution: 50
        }).setOrigin(0.5), 0.08, height / 2.2);

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
        this.sky.setPosition(0, 0);
        this.clouds1.setPosition(0, 0);
        this.clouds2.setPosition(0, 0);
        this.clouds3.setPosition(0, height / 2);
        this.clouds4.setPosition(0, height);
        this.clouds5.setPosition(0, 0);
        this.clouds6.setPosition(0, height / 1.5);
        this.scaleBackground();
    }

    scaleBackground() {
        // 🔄 Resize all background layers to fit screen
        this.clouds1.setScale(1, 0.5);
        this.clouds2.setScale(1, 0.5);
        this.clouds3.setScale(1, 0.5);
        this.clouds4.setScale(1, 0.5);
        this.clouds5.setScale(1, 0.5);
        this.clouds6.setScale(1, 0.5);
    }

    update() {
        // 🎞️ Parallax
        this.clouds1.tilePositionX += 0.02;
        this.clouds2.tilePositionX += 0.04;
        this.clouds3.tilePositionX += 0.16;
        this.clouds4.tilePositionX += 0.16;
        this.clouds5.tilePositionX += 0.08;
        this.clouds6.tilePositionX += 0.12;
        // Title animation 
        this.startButton.bounce();
    }
}
