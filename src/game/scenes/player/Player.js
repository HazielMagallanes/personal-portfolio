export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, scale) {
        super(scene, x, y, 'player', 'walk_fright_01');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        // Hitbox
        this.setSize(this.width / 3, this.height / 2);
        this.setOffset(this.width / 3, this.height / 3); 

        this.setScale(scale);
        this.setCollideWorldBounds(true);
        this.direction = 'right';

        this.createAnimations(scene);
        this.keys = scene.input.keyboard.addKeys({
            left: 'A',
            right: 'D'
        });
    }

    createAnimations(scene) {
        scene.anims.create({
            key: 'walk_right',
            frames: scene.anims.generateFrameNames('player', {
                prefix: 'walk_fright_',
                start: 1,
                end: 8,
                zeroPad: 2
            }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'walk_left',
            frames: scene.anims.generateFrameNames('player', {
                prefix: 'walk_fleft_',
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
            this.anims.play('walk_left', true);
            this.direction = 'left';
            moving = true;
        } else if (right.isDown) {
            this.setVelocityX(speed);
            this.anims.play('walk_right', true);
            this.direction = 'right';
            moving = true;
        }

        if (!moving) {
            this.anims.stop();
            if (this.direction === 'right') {
                this.setFrame('walk_fright_01');
            } else {
                this.setFrame('walk_fleft_01');
            }
        }
    }
}
