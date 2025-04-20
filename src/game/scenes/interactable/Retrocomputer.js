import Interactable from "./Interactable";
import langs from "../UI/LangUtil";
export default class Retrocomputer extends Interactable {
    constructor(scene, x, y) {
        super(scene, x, y + 9, 'retrocomputer', 'computer01', false);
        // 🛡️ Interactable area box
        this.interactableArea.setSize(48, 16);
        this.interactableArea.setOffset(-10, 8);
        this.interactableArea.setVisible(true);
        // 🎞️ Animations
        this.createAnimations(scene);
        this.anims.play('computershiftingcolors', true);
        // Computer behavior
        this.isOpen = false;
        this.retroWindow = document.getElementById('retro-window');
        this.retroWindow.style.visibility = 'hidden';
        this.windowContent = document.getElementById('retro-window-content')
    }

    interact(){
        this.toggleWindow();
    }

    toggleWindow(){
        if(this.isOpen){
            this.isOpen = false;
            this.retroWindow.style.visibility = 'hidden';
        }else{
            this.isOpen = true;
            // 🖥️ Open window
            this.retroWindow.style.visibility = 'visible';
            document.getElementById('title').innerHTML = langs.get("retro_computer.analysis.title");
        }
    }

    createAnimations(scene) {
        if(scene.anims.exists('computershiftingcolors')) return;
        scene.anims.create({
            key: 'computershiftingcolors',
            frames: scene.anims.generateFrameNames('retrocomputer', {
                prefix: 'computer',
                start: 1,
                end: 3,
                zeroPad: 2
            }),
            frameRate: 6,
            repeat: -1
        });
        scene.anims.create({
            key: 'computershiftingcolors-outlined',
            frames: scene.anims.generateFrameNames('retrocomputer', {
                prefix: 'computer_outline',
                start: 1,
                end: 3,
                zeroPad: 2
            }),
            frameRate: 6,
            repeat: -1
        });
    }

    update(){
        super.update();
        if(this.scene.physics.overlap(this.interactableArea, this.scene.player)){
            // 🖱️ Show object is interactable
            this.anims.play('computershiftingcolors-outlined', true);
        }else{         
            // Remove outline
            this.anims.play('computershiftingcolors', true);
        }
    }
}