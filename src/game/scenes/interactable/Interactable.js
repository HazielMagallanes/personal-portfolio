export default class Interactable extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sheet, frame, collidable = true) {
        super(scene, x, y, sheet, frame);
        scene.add.existing(this);
        // 🛡️ Hitbox
        if(collidable){ scene.physics.add.existing(this); }
        // 🛡️ Interactable area box
        this.interactableArea = new Phaser.Physics.Arcade.Sprite(scene, x, y, '', '');
        scene.physics.add.existing(this.interactableArea);
    }

    create(){
        this.scene.input.keyboard.on('keyup-SPACE', () => {
            if(this.scene.physics.overlap(this.interactableArea, this.scene.player)){
                this.interact();
            }
        });
    }

    interact(){
    }
}