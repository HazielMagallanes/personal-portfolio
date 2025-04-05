import './style.css'
import Phaser from 'phaser';

import Preloader from './game/scenes/Preloader.js';
import Menu from './game/scenes/UI/Menu.js';
import World from './game/scenes/World.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    pixelArt: true,
    scene: [Preloader, Menu, World]
};

new Phaser.Game(config);
