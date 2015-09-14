/*
 * @author          Gonzalo Serrano <gonzalo@7generationgames.com>
 * @copyright       2015 7 Generation Games
 * 
 * @Overview
 * Player class
 */
/* global Phaser, BasicGame, tileSize */
'use strict';

var wKey;
var aKey;
var sKey;
var dKey;

var Player = function (game) {
    this.game = game;
    this.sprite = null;
    this.alive = true;
    this.tilex = 0; //the x tile on the tilemap
    this.tiley = 0; //the y tile on the tilemap
};

Player.prototype = {
    preload: function () {
        //this will still be called in preload
        this.load.atlasJSONHash('characters', 'assets/img/spritesheets/characters.png', 'assets/img/spritesheets/characters.json');
    },
    create: function () {
        //the arrow keys
        this.cursor = this.game.input.keyboard.createCursorKeys();

        //Setup WASD and extra keys
        wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

        this.sprite = this.game.add.sprite(this.tilex * tileSize - tileSize / 2, this.tiley * tileSize + tileSize / 2, 'characters', 'sam08.png');

        this.sprite.anchor.setTo(0.5, 0.5);
        this.game.physics.p2.enable(this.sprite); // set up player physics
        this.sprite.body.fixedRotation = true; // no rotation

        //Create a rectangular hitbox around players body
        this.sprite.body.clearShapes();
        this.sprite.body.addRectangle(23, 44, 4, 2);

        this.sprite.direction = 'down';

        //Idle states
        this.sprite.animations.add('idledown', ['sam00.png']);
        this.sprite.animations.add('idleleft', ['sam04.png']);
        this.sprite.animations.add('idleright', ['sam08.png']);
        this.sprite.animations.add('idleup', ['sam12.png']);

        //Walking states
        this.sprite.animations.add("right", ["sam09.png", "sam10.png", "sam11.png", "sam08.png"], 7, true, false);
        this.sprite.animations.add("down", ["sam01.png", "sam02.png", "sam03.png", "sam00.png"], 7, true, false);
        this.sprite.animations.add("up", ["sam13.png", "sam14.png", "sam15.png", "sam12.png"], 7, true);
        this.sprite.animations.add("left", ["sam05.png", "sam06.png", "sam07.png", "sam04.png"], 7, true);

        //Running states
        this.sprite.animations.add("runright", ["sam09.png", "sam10.png", "sam11.png", "sam08.png"], 15, true, false);
        this.sprite.animations.add("rundown", ["sam01.png", "sam02.png", "sam03.png", "sam00.png"], 15, true, false);
        this.sprite.animations.add("runup", ["sam13.png", "sam14.png", "sam15.png", "sam12.png"], 15, true);
        this.sprite.animations.add("runleft", ["sam05.png", "sam06.png", "sam07.png", "sam04.png"], 15, true);

        //Harvesting states
        this.sprite.animations.add("chopright", ["sam_chop16.png", "sam_chop17.png", "sam_chop18.png", "sam_chop19.png",
            "sam_chop20.png", "sam_chop21.png", "sam_chop22.png", "sam_chop23.png"], 15, true, false);

        this.sprite.animations.add("chopdown", ["sam_chop16.png", "sam_chop16.png", "sam_chop16.png", "sam_chop16.png",
            "sam_chop16.png", "sam_chop16.png", "sam_chop16.png", "sam_chop16.png"], 15, true, false);

        this.sprite.animations.add("chopup", ["sam_chop16.png", "sam_chop16.png", "sam_chop16.png", "sam_chop16.png",
            "sam_chop16.png", "sam_chop16.png", "sam_chop16.png", "sam_chop16.png"], 15, true, false);

        this.sprite.animations.add("chopleft", ["sam_chop16.png", "sam_chop16.png", "sam_chop16.png", "sam_chop16.png",
            "sam_chop16.png", "sam_chop16.png", "sam_chop16.png", "sam_chop16.png"], 15, true, false);


    },
    update: function () {

        this.movements();
        this.updatecamera();

    },
    updatecamera: function () {
        if (this.tweening) {
            return;
        }
        this.tweening = true;

        var speed = 700;
        var toMove = false;

        if (this.sprite.y > this.game.camera.y + BasicGame.h) {
            BasicGame.camera.y += 1;
            toMove = true;
        }
        else if (this.sprite.y < this.game.camera.y) {
            BasicGame.camera.y -= 1;
            toMove = true;
        }
        else if (this.sprite.x > this.game.camera.x + BasicGame.w) {
            BasicGame.camera.x += 1;
            toMove = true;
        }
        else if (this.sprite.x < this.game.camera.x) {
            BasicGame.camera.x -= 1;
            toMove = true;
        }

        if (toMove) {
            var t = this.game.add.tween(this.game.camera).to({
                x: BasicGame.camera.x * BasicGame.w,
                y: BasicGame.camera.y * BasicGame.h
            },
            speed);
            t.start();
            t.onComplete.add(function () {
                this.tweening = false;
            }, this);
        }
        else {
            this.tweening = false;
        }
    },
    reposition: function () {
        this.sprite.x = this.tilex * tileSize - tileSize / 2;
        this.sprite.y = this.tiley * tileSize + tileSize / 2;
    },
    movements: function () {
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;

        var speed = 275;

        if (this.tweening) {
            //Don't move while camera is panning
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        } else {
            //Don't move when the dialogue box is visible
            if ((dialogue.hidden) && (this.cursor.left.isDown || aKey.isDown)) {
                this.sprite.body.velocity.x = -speed;
                this.sprite.direction = 'left';
                this.sprite.animations.play('left');
            }
            else if ((dialogue.hidden) && (this.cursor.right.isDown || dKey.isDown)) {
                this.sprite.body.velocity.x = speed;
                this.sprite.direction = 'right';
                this.sprite.animations.play('right');
            }
            else if ((dialogue.hidden) && (this.cursor.up.isDown || wKey.isDown)) {
                this.sprite.body.velocity.y = -speed;
                this.sprite.direction = 'up';
                this.sprite.animations.play('up');
            }
            else if ((dialogue.hidden) && (this.cursor.down.isDown || sKey.isDown)) {
                this.sprite.body.velocity.y = speed;
                this.sprite.direction = 'down';
                this.sprite.animations.play('down');
            }
            else {
                if (this.sprite.direction === 'up') {
                    this.sprite.frame = 1;
                }
                else if (this.sprite.direction === 'down') {
                    this.sprite.frame = 0;
                }
                else if (this.sprite.direction === 'right') {
                    this.sprite.frame = 2;
                }
                else if (this.sprite.direction === 'left') {
                    this.sprite.frame = 3;
                }
                this.sprite.animations.stop();
            }
        }
    }
};

