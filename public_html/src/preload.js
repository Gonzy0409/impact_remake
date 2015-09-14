/*
 * @author          Gonzalo Serrano <gonzalo@7generationgames.com>
 * @copyright       2015 7 Generation Games
 * 
 * @Overview
 * Preload phase, load all assets: images, json files, audio, texture atlas
 */
/* global Phaser */
'use strict';
var SCREEN_WIDTH = 800; //16 : 9
var SCREEN_HEIGHT = 450;
var BasicGame = {};

BasicGame.Preload = function (game) {
    this.preloadBar = null;
};

BasicGame.Preload.prototype = {
    preload: function () {
        this.displayLoadScreen();
        this.loadAssets();
    },
    
    displayLoadScreen: function () {
        this.preloadBar = this.add.sprite((SCREEN_WIDTH / 2) - 200, (SCREEN_HEIGHT / 2) - 100, 'loading');

        this.barBg = this.add.sprite((SCREEN_WIDTH / 2) - 10, (SCREEN_HEIGHT / 2) - 10, 'load_progress_bar_dark');
        this.barBg.anchor.setTo(0.5, 0.5);

        this.bar = this.add.sprite((SCREEN_WIDTH / 2)- 202, (SCREEN_HEIGHT / 2) -10, 'load_progress_bar');
        this.bar.anchor.setTo(0, 0.5);
        this.load.setPreloadSprite(this.bar);

        // onLoadComplete is dispatched when the final file in the load queue has been loaded/failed. 
        // addOnce adds that function as a callback, but only to fire once.
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    },
    
    loadAssets: function () {
        //Load Characters
        this.load.atlasJSONHash('characters', 'assets/img/spritesheets/characters.png', 'assets/img/spritesheets/characters.json');
        //Load the tile map
        this.load.tilemap('level1', 'assets/img/levels/forgottentrail01.json', null, Phaser.Tilemap.TILED_JSON);
        //Load objects
        this.load.image('tiles', 'assets/img/spritesheets/tilesheet.png');
        this.load.image('large', 'assets/img/spritesheets/tree_branch_large.png');
        this.load.image('med', 'assets/img/spritesheets/tree_branch_med.png');
        this.load.image('small', 'assets/img/spritesheets/tree_branch_small.png');
        this.load.image('tTop', 'assets/img/spritesheets/tree_top.png');
        this.load.image('cliff', 'assets/img/spritesheets/cliff.png');
        this.load.image('crate', 'assets/img/spritesheets/crate.png');
        this.load.image('house', 'assets/img/spritesheets/neighborshouse.png');
        this.load.image('openscreen', 'assets/img/spritesheets/openscreen.png');
        this.load.image('win', 'assets/img/spritesheets/wingame.png');
        
        //Load audio
        this.game.load.audio('soundtrack', ['assets/audio/music_level3_loop.ogg','assets/audio/music_level3_loop.mp3'] );
    },
    
    update: function () {
        if (!!this.ready) { // !! is "bang bang you're a boolean". forces typecast to boolean
            this.game.state.start('openscreen');
        }
    },
    
    onLoadComplete: function () {
        this.ready = true;
    }
};