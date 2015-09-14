/*
 * @author          Gonzalo Serrano <gonzalo@7generationgames.com>
 * @copyright       2015 7 Generation Games
 * 
 * @Overview
 * Preload phase, load all assets: images, json files, audio, texture atlas
 */
/* global Phaser, BasicGame */
'use strict';

BasicGame.Preload = function (game) {
    this.game = game;
    this.preloadBar = null;
};

BasicGame.Preload.prototype = {
    preload: function () {
        this.displayLoadScreen();
        this.loadAssets();
    },
    displayLoadScreen: function () {
        this.preloadBar = this.add.sprite((BasicGame.w / 2) - 200, (BasicGame.h / 2) - 100, 'loading');

        this.barBg = this.add.sprite((BasicGame.w / 2) - 10, (BasicGame.h / 2) - 10, 'load_progress_bar_dark');
        this.barBg.anchor.setTo(0.5, 0.5);

        this.bar = this.add.sprite((BasicGame.w / 2) - 202, (BasicGame.h / 2) - 10, 'load_progress_bar');
        this.bar.anchor.setTo(0, 0.5);
        this.load.setPreloadSprite(this.bar);

        // onLoadComplete is dispatched when the final file in the load queue has been loaded/failed. 
        // addOnce adds that function as a callback, but only to fire once.
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    },
    loadAssets: function () {
        //Load NPC dialog
        dialogue = new Dialogue(this.game);
        dialogue.preload();
        
        //Load Player
        player = new Player(this.game);
        player.preload();
        
        //Load Characters
        this.load.atlasJSONHash('creatures', 'assets/img/spritesheets/creatures.png', 'assets/img/spritesheets/creatures.json');
        this.load.atlasJSONHash('objects', 'assets/img/spritesheets/objects.png', 'assets/img/spritesheets/objects.json');

        //Load the tile map
        this.load.tilemap('level1', 'assets/img/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level2', 'assets/img/levels/level2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level3', 'assets/img/levels/level3.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level4', 'assets/img/levels/level4.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level5', 'assets/img/levels/level5.json', null, Phaser.Tilemap.TILED_JSON);

        //Load tilesheet
        this.load.image('tiles', 'assets/img/spritesheets/tilesheet.png');

        //Load screens
        this.load.image('openscreen', 'assets/img/spritesheets/openscreen.png');
        this.load.image('win', 'assets/img/spritesheets/wingame.png');
        this.load.image('bearlose', 'assets/img/spritesheets/beardead.png');
        this.load.image('skunklose', 'assets/img/spritesheets/dead_with_skunks.png');
        this.load.image('holelose', 'assets/img/spritesheets/boy_hurt_leg.png');

        //Load audio
        this.game.load.audio('soundtrack', ['assets/audio/ericmusic_loop.ogg', 'assets/audio/ericmusic_loop.mp3']);
        this.game.load.audio('bush1', ['assets/audio/bush_rustle1.ogg', 'assets/audio/bush_rustle1.mp3']);
        this.game.load.audio('bush2', ['assets/audio/bush_rustle2.ogg', 'assets/audio/bush_rustle2.mp3']);
        this.game.load.audio('skunkgrowl', ['assets/audio/skunkgrowl.ogg', 'assets/audio/skunkgrowl.mp3']);
        this.game.load.audio('woodchop1', ['assets/audio/woodchop1.ogg', 'assets/audio/woodchop1.mp3']);
        this.game.load.audio('woodchop2', ['assets/audio/woodchop2.ogg', 'assets/audio/woodchop2.mp3']);
        this.game.load.audio('woodchop3', ['assets/audio/woodchop3.ogg', 'assets/audio/woodchop3.mp3']);
        this.game.load.audio('woodchop4', ['assets/audio/woodchop_final.ogg', 'assets/audio/woodchop_final.mp3']);
        
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