import Interactable from "./Interactable";

export default class Door extends Interactable {
    constructor(scene, x, y) {
        super(scene, x, y, 'interactable-sheet', 'door01');
        // 🛡️ Hitbox
        this.setSize(5, this.height);
        this.setOffset(8.5, 0);
        this.setImmovable(true);
        // 🛡️ Interactable area box
        this.interactableArea.setSize(36, 46);
        this.interactableArea.setOffset(-8, -2);
        // 🎞️ Animations
        this.createAnimations(scene);
        // Door behavior
        this.isOpen = false;
    }

    interact(){
        this.toggleDoor();
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
}