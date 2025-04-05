export default class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        this.load.path = './src/game/assets/'
        this.load.atlas('player', './sprites/player/hazu.png', './sprites/player/hazu.json');
    }

    create() {
        this.scene.start('Menu');
    }
}