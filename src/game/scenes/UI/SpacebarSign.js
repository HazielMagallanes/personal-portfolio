export default class SpacebarSign extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'UI', 'space01');
        scene.add.existing(this);
        // 🎞️ Animations
        this.createAnimations(scene);
        this.anims.play('press-space', true);
    }
    createAnimations(scene) {
        if(scene.anims.exists('press-space')) return;
        scene.anims.create({
            key: 'press-space',
            frames: scene.anims.generateFrameNames('UI', {
                prefix: 'space',
                start: 1,
                end: 2,
                zeroPad: 2
            }),
            frameRate: 2,
            repeat: -1
        });
    }
}