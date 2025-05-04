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
        this.scene.events.on('interact', () => {
            if(this.scene.physics.overlap(this.interactableArea, this.scene.player)){
                this.interact();
            }
        });
    }

    interact(){
    }
    update(){
        // 🖱️ Show interactable button or signal.
        if(this.scene.physics.overlap(this.interactableArea, this.scene.player)){
            // PC
            if(this.scene.sys.game.device.os.desktop){
                this.scene.spacebarSign.setVisible(true);
                if(this.scene.player.x <= this.getBottomCenter().x){
                    this.scene.spacebarSign.setPosition(this.interactableArea.getBottomCenter().x + 40, this.interactableArea.getTopCenter().y);
                }else{
                    this.scene.spacebarSign.setPosition(this.interactableArea.getBottomCenter().x - 40, this.interactableArea.getTopCenter().y);
                }
            }else{
                this.scene.mobileControls.interact.setVisible(true);
            }
        }
    }
}