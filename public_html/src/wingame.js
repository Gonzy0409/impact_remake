/*
 * @author          Gonzalo Serrano <gonzalo@7generationgames.com>
 * @copyright       2015 7 Generation Games
 * 
 * @Overview
 * chicken chasing game for Forgotten Trail
 */

/* global BasicGame, game, SCREEN_HEIGHT, SCREEN_WIDTH, Phaser */

BasicGame.win = function(game){
    
};

BasicGame.win.prototype = {
    preload: function () {

    },
    create: function () {
        game.stage.backgroundColor = '#000000';
        var menu = game.add.sprite((SCREEN_WIDTH / 2), (SCREEN_HEIGHT / 2), 'win');
        menu.anchor.x = .5;
        menu.anchor.y = .5;

    },
    update: function () {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            setTimeout("window.location.href='../page14.html'",200);
        }
    }
};
