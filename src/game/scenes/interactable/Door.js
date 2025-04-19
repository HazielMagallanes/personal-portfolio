export default class Door extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'interactable-sheet', 'door01');
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // 🛡️ Hitbox
        this.setSize(this.width * 2, this.height);
        this.setOffset(this.width / 4, 0);
        this.setImmovable(true);
        // 🎞️ Animations
        this.createAnimations(scene);
    }

    createAnimations(scene) {
        if(scene.anims.exists('open')) return;
        scene.anims.create({
            key: 'open',
            frames: scene.anims.generateFrameNames('door', {
                prefix: 'door',
                start: 1,
                end: 3,
                zeroPad: 2
            }),
            frameRate: 10,
            repeat: -1
        });
    }
}