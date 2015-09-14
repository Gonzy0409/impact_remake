/*
 * @author          Gonzalo Serrano <gonzalo@7generationgames.com>
 * @copyright       2015 7 Generation Games
 * 
 * @Overview
 * Preload phase, load all assets: images, json files, audio, texture atlas
 */
/* global BasicGame, score, game, Phaser */

'use strict';

BasicGame.Open = function (game) {

};

BasicGame.Open.prototype = {
    preload: function () {

    },
    create: function () {
        var menu = game.add.sprite((SCREEN_WIDTH / 2), (SCREEN_HEIGHT / 2), 'openscreen');
        menu.anchor.x = .5;
        menu.anchor.y = .5;
        var style = {font: "15px Arial", fill: "#ffffff", align: "center"};
        game.add.text(400, 100, "To move: use arrow keys or w,a,s,d ", style);
        game.add.text(400, 115, "To Jump: use space bar", style);
        game.add.text(400, 130, "To Run: hold shift key", style);
        game.add.text(400, 160, "Collect as many chickens as you can", style);
        game.add.text(400, 175, "to help your aunt jean", style);
        game.add.text(400, 205, "Be careful", style);
        game.add.text(400, 220, "Don't fall in the river!", style);

    },
    update: function () {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            this.game.state.start('game');
        }
    }
};