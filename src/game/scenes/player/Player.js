export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player', 'walk01');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        // 🛡️ Hitbox
        this.setSize(this.width / 3, this.height / 2);
        this.setOffset(this.width / 3, this.height / 3); 
        this.setCollideWorldBounds(true);

        // 📊 Stats
        this.speed = 200;
        this.direction = 0;
        this.isMoving = false;
        // 🎞️ Animations
        this.createAnimations(scene);
        // Controls
        this.keys = scene.input.keyboard.addKeys({
            left: 'A',
            right: 'D'
        });
        this.scene.input.keyboard.on('keyup-SPACE', () => {
            this.scene.events.emit('interact');
        });

        // Events
        this.scene.events.on('movingright', () => {
            this.direction = 1;
        });
        this.scene.events.on('movingleft', () => {
            this.direction = -1;
        });
        this.scene.events.on('stopmoving', () => {
            this.direction = 0;
        })
    }

    createAnimations(scene) {
        if(scene.anims.exists('walk')) return;
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

    move(){
        this.isMoving = false;
        this.setVelocity(0);
        if (this.direction == -1) {
            // ⬅️ Move left
            this.speed = this.speed > 0 ? this.speed * -1 : this.speed;
            this.setVelocityX(this.speed);
            this.setFlipX(true);
            this.anims.play('walk', true);
            this.isMoving = true;
        } else if (this.direction == 1) {
            // ➡️ Move right
            this.speed = this.speed < 0 ? this.speed * -1 : this.speed;
            this.setVelocityX(this.speed);
            this.setFlipX(false);
            this.anims.play('walk', true);
            this.isMoving = true;
        }
        if (!this.isMoving) {
            this.anims.stop();
            this.setFrame('walk01');
        }
    }
    update() {
        const { left, right } = this.keys;
        if (left.isDown){
            this.scene.events.emit('movingleft');
        }else if (right.isDown){
            this.scene.events.emit('movingright');
        }
        this.move();
        if(this.scene.sys.game.device.os.desktop){
            this.direction = 0;
        }
    }
}
