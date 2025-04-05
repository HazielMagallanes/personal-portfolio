import Player from './player/Player.js';

export default class World extends Phaser.Scene {
    constructor() {
        super('World');
    }

    create() {
        this.player = new Player(this, 400, 300, 4);

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, 1600, 1200);
    }

    update() {
        this.player.update();
    }
}
