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

        this.pagesKeys = {
            1: 'analysis',
            2: 'skills',
            3: 'experiences',
            4: 'experiences',
            5: 'final',
        };
        this.page = 1;
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
            this.windowContent.innerHTML = this.getPagesContent(this.page);
        }
    }
    // CONTENT GETTERS
    getPagesContent(page){
        // Get keys from lang json
        const pageKey = this.pagesKeys[page];
        const keyPrefix = 'retro_computer.' + pageKey + '.';
        var content;
        const keys = Object.keys(this.scene.cache.json.get('en-US')['retro_computer'][pageKey]);
        return `
        <div class="text-content">
           ${this.getPageTextContent(page)}
        </div>
        <div class="previewer">
          <div class="previewer-image">
          </div>
          <div class="previewer-subtitle">Haziel Magallanes</div>
        </div>
        <div class="retro-window-controls"></div>
        `
    }
    getPageTextContent(page){
        // Get keys from lang json
        const pageKey = this.pagesKeys[page];
        const keyPrefix = 'retro_computer.' + pageKey + '.';
        var content;
        const keys = Object.keys(this.scene.cache.json.get('en-US')['retro_computer'][pageKey]);
        switch(page){
            case 1 : {
                content = `
                <div class="content">
                    <span>${langs.get(keyPrefix + 'objective_name')}</span>
                    <span>${langs.get(keyPrefix + 'objective_location')}</span>
                    <span>${langs.get(keyPrefix + 'objective_languages')}</span> 
                    <span>${langs.get(keyPrefix + 'objective_skills')}</span> 
                </div>
                `      
            }
            case 2: {

            }
        }
        return `
        <div class="title">
            <span>${langs.get(keyPrefix + 'title')}</span>
        </div>
        ${content}
        `
    }


    // Sprite behaviors
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