import Interactable from "./Interactable";

export default class Computer extends Interactable {
    constructor(scene, x, y) {
        super(scene, x, y, 'interactable-sheet', 'computer01');
        this.setCrop(1, 1, 18, 18);
        // 🛡️ Interactable area box
        this.interactableArea.setSize(36, 46);
        this.interactableArea.setOffset(-8, -2);
        this.interactableArea.setVisible(true);
        // 🎞️ Animations
        this.createAnimations(scene);
        // Computer behavior
        this.isOpen = false;
    }
    
    interact(){
        this.toggleWindow();
    }

    toggleWindow(){
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
        if(scene.anims.exists('computer')) return;
        scene.anims.create({
            key: 'computer',
            frames: scene.anims.generateFrameNames('interactable-sheet', {
                prefix: 'computer',
                start: 1,
                end: 3,
                zeroPad: 2
            }),
            frameRate: 10,
            repeat: 0
        });
    }
}