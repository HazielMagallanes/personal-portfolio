import Interactable from "./Interactable";

export default class Retrocomputer extends Interactable {
    constructor(scene, x, y) {
        super(scene, x, y, 'interactable-sheet', 'computer01', false);
        this.setCrop(2, 1, 18, 18);
        // 🛡️ Interactable area box
        this.interactableArea.setSize(48, 16);
        this.interactableArea.setOffset(-10, -8);
        this.interactableArea.setVisible(true);
        // 🎞️ Animations
        this.createAnimations(scene);
        this.anims.play('computer', true);
        // Computer behavior
        this.isOpen = false;
    }

    interact(){
        this.toggleWindow();
    }

    toggleWindow(){
        if(this.isOpen){
            this.isOpen = false;
        }else{
            this.isOpen = true;
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

    update(){
        this.setCrop(2, 1, 18, 18);
        if(this.scene.physics.overlap(this.interactableArea, this.scene.player)){
            console.log('overlap');
            this.setCrop(21, 1, 19, 19);
        }
    }
}