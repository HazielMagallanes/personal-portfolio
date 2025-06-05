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
        this.retroWindow.style.display = 'none';
        this.windowContent = document.getElementById('retro-window-content')
        this.windowControllers = {
            tripleContainer: document.getElementById("triple-arrow"),
            doubleContainer: document.getElementById("double-arrow"),
            finalContainer: document.getElementById("triple-arrow-final")
        }
        this.windowControllers.tripleContainer.addEventListener('click', () => {this.nextPage()});
        this.windowControllers.finalContainer.addEventListener('click', () => {this.pastPage()});
        document.getElementById("next").addEventListener('click', () => {this.nextPage()});
        document.getElementById("past").addEventListener('click', () => {this.pastPage()});
        this.pagesKeys = {
            1: 'analysis',
            2: 'skills',
            3: 'experiences',
            4: 'experiences',
            5: 'final',
        };
        this.page = 1;
        this.currentPhoto = 0;
        this.visor;
        this.photosOfMe = [
            "/assets/html/img/me/1.webp",
            "/assets/html/img/me/2.webp",
            "/assets/html/img/me/3.webp",
            "/assets/html/img/me/4.webp",
            "/assets/html/img/me/5.webp",
            "/assets/html/img/me/6.webp",
            "/assets/html/img/me/7.webp",
            "/assets/html/img/me/8.webp"
        ];
        // Initialize visorUpdater
        this.visorUpdate();

        // Window close
        this.scene.input.keyboard.on('keyup-ESC', () =>{
            if(this.isOpen){
                this.scene.events.emit('unlockinput');
                this.toggleWindow();
            }
        })
        document.addEventListener('touchstart', (event) => {
            if(this.isOpen && !document.getElementById('retro-window').contains(event.target)){
                this.scene.events.emit('unlockinput');
                this.toggleWindow();
            }
        })
    }
    visorUpdate(){
        // Visor animation;
        if(this.page == 1 && this.isOpen){
            this.visor = document.getElementById("photo-visor");
            this.visor.innerHTML = `<img src=${this.photosOfMe[this.currentPhoto]} alt="Haziel Magallanes">`
            if(this.currentPhoto == 7){this.currentPhoto = -1};
            this.currentPhoto += 1;
        }
        setTimeout(() => {this.visorUpdate()}, 1000)
    }

    interact(){
        this.toggleWindow();
    }
    nextPage(){
        this.page = Object.keys(this.pagesKeys).includes((this.page + 1).toString()) ? this.page + 1 : 1;
        this.windowContent.innerHTML = this.getPagesContent(this.page);
    }
    pastPage(){
        this.page -= 1;
        this.windowContent.innerHTML = this.getPagesContent(this.page);
    }
    toggleWindow(){
        if(this.isOpen){
            this.isOpen = false;
            this.retroWindow.style.display = 'none';
            this.page = 1;
        }else{
            this.isOpen = true;
            this.scene.events.emit('blockinput');
            // 🖥️ Open window
            this.retroWindow.style.display = 'flex';
            this.windowContent.innerHTML = this.getPagesContent(1);
        }
    }
    // CONTENT GETTERS (Based on React jsx component system)
    getPagesContent(page){
        // Get keys from lang json
        const pageKey = this.pagesKeys[page];
        const keyPrefix = 'retro_computer.' + pageKey + '.';
        this.windowControllers.tripleContainer.style.display = "none";
        this.windowControllers.finalContainer.style.display = "none";
        this.windowControllers.doubleContainer.style.display = "none";
        var content;
        const keys = Object.keys(this.scene.cache.json.get('en-US')['retro_computer'][pageKey]);
        switch(page){
            case 1: 
                {this.windowControllers.tripleContainer.style.display = 'flex';break;}
            case 5:
                {this.windowControllers.finalContainer.style.display = 'flex';break;}
            default:
                {this.windowControllers.doubleContainer.style.display = 'flex';break;}
        }
        return `
        ${this.getPageTextContent(page)}
        ${this.getPagePreviewer(page)}`
    }
    getPagePreviewer(page){
        // Get keys from lang json
        const pageKey = this.pagesKeys[page];
        const keyPrefix = 'retro_computer.' + pageKey + '.';
        var content;
        switch(page){
            case 1:
                content = `
                    <div class="previewer">
                        <div class="visor">
                            <div class="previewer-image" id="photo-visor"></div>
                        </div>
                        <div class="previewer-subtitle">Haziel Magallanes</div>
                    </div>
                    
                `;
                break;
            case 2:
                content = `
                    <div class="previewer looping-cards">
                        <div class="visor">
                            <div class="previewer-image"></div>
                        </div>
                        <div class="previewer-subtitle">Tech Stack</div>
                    </div
                `;break;
            case 3:
                content = `
                <div class="previewer projects">
                    <div class="visor">
                        <div class="previewer-image"></div>
                    </div>
                    <div class="previewer-subtitle">${langs.get('retro_computer.experiences.preview_text')}</div>
                </div
            `;break;
            case 4:
                // Same as case 3
                content = `
                <div class="previewer projects">
                    <div class="visor">
                        <div class="previewer-image"></div>
                    </div>
                    <div class="previewer-subtitle">${langs.get('retro_computer.experiences.preview_text')}</div>
                </div
            `;break;
        }
        return content || '';
    }

    getPageTextContent(page){
        // Get keys from lang json
        const pageKey = this.pagesKeys[page];
        const keyPrefix = 'retro_computer.' + pageKey + '.';
        var title = langs.get(keyPrefix + 'title');
        var content;
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
                break; 
            }
            case 2: {
                content = `
                <div class="content">
                    <ul>
                        <li>${langs.get(keyPrefix + '1')}</li>
                        <li>${langs.get(keyPrefix + '2')}</li>
                        <li>${langs.get(keyPrefix + '3')}</li>
                        <li>${langs.get(keyPrefix + '4')}</li>
                        <li>${langs.get(keyPrefix + '5')}</li>
                        <li>${langs.get(keyPrefix + '6')}</li>
                    </ul>
                </div>
                `      
                break;
            }
            case 3: {
                content = `
                <div class="content">
                    <ul>
                        <li>${langs.get(keyPrefix + 'page1.1')}</li>
                        <li>${langs.get(keyPrefix + 'page1.2')}</li>
                        <li>${langs.get(keyPrefix + 'page1.3')}</li>
                        <li>${langs.get(keyPrefix + 'page1.4')}</li>
                        <li>${langs.get(keyPrefix + 'page1.5')}</li>
                        <li>${langs.get(keyPrefix + 'page1.6')}</li>
                    </ul>
                </div>
                `;
                break;
            }
            case 4: {
                content = `
                <div class="content">
                    <ul>
                        <li>${langs.get(keyPrefix + 'page2.1')}</li>
                        <li>${langs.get(keyPrefix + 'page2.2')}</li>
                        <li>${langs.get(keyPrefix + 'page2.3')}</li>
                        <li>${langs.get(keyPrefix + 'page2.4')}</li>
                    </ul>
                </div>
                `;
                break;
            }
            case 5: {
                content = `
                <div class="content">
                    <p class="final-text">${langs.get(keyPrefix + 'text')}</p>
                    <p class="final-caption">${this.scene.sys.game.device.os.desktop ? 
                     langs.get(keyPrefix + 'press-scape') : langs.get(keyPrefix + 'touch-outside')}</p>
                </div>
                `;
                break;
            }
        }
        // Number of Previous experiences page.
        if(page == 3){ title += " 1" }
        else if(page == 4){ title += " 2" }
        // Return title div + content. If page  == 5 exclude title.
        return `
        ${this.page != 5 ? 
        `<div class="text-content">
            <div class="title">
                <span>${title}</span>
            </div>` : '<div class="text-content final"'
        }
        ${content}
        </div>
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