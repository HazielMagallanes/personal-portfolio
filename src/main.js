import './style.css'
import Phaser from 'phaser';

import Preloader from './game/scenes/Preloader.js';
import Menu from './game/scenes/UI/Menu.js';
import World from './game/scenes/World.js';

const config = {
    type: Phaser.CANVAS,
    width: 256,
    height: 128,
    scale: {
        mode: Phaser.Scale.EXPAND,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#0079d6',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
        }
    },
    
    pixelArt: true,
    scene: [Preloader, Menu, World]
};

const game = new Phaser.Game(config);
