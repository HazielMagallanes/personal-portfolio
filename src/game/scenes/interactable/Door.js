export default class Door extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'interactable-sheet', 'door01');
        scene.add.existing(this);
        // 🛡️ Hitbox
        scene.physics.add.existing(this);
        this.setSize(5, this.height);
        this.setOffset(8, 0);
        this.setImmovable(true);
        // 🛡️ Interactable area box
        this.interactableArea = new Phaser.Physics.Arcade.Sprite(scene, x, y, '', '');
        scene.physics.add.existing(this.interactableArea);
        this.interactableArea.setSize(36, 46);
        this.interactableArea.setOffset(-8, -2);
        this.interactableArea.setVisible(true);
        // 🎞️ Animations
        this.createAnimations(scene);
        // Door behavior
        this.isOpen = false;
        
    }

    create(){
        this.scene.input.keyboard.on('keyup-SPACE', () => {
            if(this.scene.physics.overlap(this.interactableArea, this.scene.player)){
                this.toggleDoor();
            }
        });
    }

    toggleDoor(){
        if(this.isOpen){
            this.isOpen = false;
            this.body.setEnable(true);
            this.anims.playReverse('open', true);
        }else{
            this.anims.play('open', true);
            this.isOpen = true;
            this.body.setEnable(false);
        }
    }

    createAnimations(scene) {
        if(scene.anims.exists('open')) return;
        scene.anims.create({
            key: 'open',
            frames: scene.anims.generateFrameNames('interactable-sheet', {
                prefix: 'door',
                start: 1,
                end: 3,
                zeroPad: 2
            }),
            frameRate: 10,
            repeat: 0
        });
    }
    update() {

    }

}