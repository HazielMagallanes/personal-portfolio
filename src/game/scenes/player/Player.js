export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player', 'walk01');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        // Hitbox
        this.setSize(this.width / 3, this.height / 2);
        this.setOffset(this.width / 3, this.height / 3); 

        //this.setScale(scale);
        this.setCollideWorldBounds(true);

        this.createAnimations(scene);
        this.keys = scene.input.keyboard.addKeys({
            left: 'A',
            up: 'W',
            right: 'D'
        });
        
    }

    createAnimations(scene) {
        scene.anims.create({
            key: 'walk',
            frames: scene.anims.generateFrameNames('player', {
                prefix: 'walk',
                start: 1,
                end: 8,
                zeroPad: 2
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    update() {
        const speed = 200;
        const { left, right } = this.keys;

        this.setVelocity(0);
        let moving = false;

        if (left.isDown) {
            this.setVelocityX(-speed);
            this.setFlipX(true);
            this.anims.play('walk', true);
            moving = true;
        } else if (right.isDown) {
            this.setVelocityX(speed);
            this.setFlipX(false);
            this.anims.play('walk', true);
            moving = true;
        }

        if (!moving) {
            this.anims.stop();
            this.setFrame('walk01');
        }
    }
}
