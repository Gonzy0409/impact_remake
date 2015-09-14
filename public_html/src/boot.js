/*
 * @author          Gonzalo Serrano <gonzalo@7generationgames.com>
 * @copyright       2015 7 Generation Games
 * 
 * @Overview
 * Boot phase, load the assets needed for preloader
 */
/* global Phaser */
'use strict';

var BasicGame = {},
tileSize = 8,
dRows = 80,
dCols = 120,
player,
dialogue;

var Game = {
    //game width and height is based on the .tmx properties
    w: tileSize * dCols,
    h: tileSize * dRows,
    lastLocation: 'level1', //keep track of last location player was in
    level: 1, //keep track of the level
    camera: {
        x: 0,
        y: 0
    }
};

//Setup Local Storage
if (localStorage.getItem('level') === null) {
    localStorage.setItem('level', '1');
}
if (localStorage.getItem('haveAxe') === null) {
    localStorage.setItem('haveAxe', false);
}

BasicGame.Boot = function (game) {
    this.game = game;
};

BasicGame.Boot.prototype = {
    preload: function () {
        //preload the loadscreen image
        this.load.image('loading', 'assets/img/preloader/loading.png');
        this.load.image('load_progress_bar_dark', 'assets/img/preloader/progress_bar_bg.png');
        this.load.image('load_progress_bar', 'assets/img/preloader/progress_bar_fg.png');
    },
    
    create: function () {
        this.state.start('preload');
    }
};