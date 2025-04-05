export default class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    create() {
        this.add.text(300, 250, '2D Platformer', { fontSize: '32px', fill: '#fff' });
        const startButton = this.add.text(350, 300, 'Start', { fontSize: '24px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('World'));
    }
}