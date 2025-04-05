import './style.css'
import Phaser from 'phaser';

const config = {
    title: "Hazu's Portfolio",
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    pixelArt: true,
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                y: 2000
            }
        }
    },
    scene: [
        Preloader,
        UI,
        Play,
        Menu
    ]
};

new Phaser.Game(config);
