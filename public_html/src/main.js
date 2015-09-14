/*
 * @author          Gonzalo Serrano <gonzalo@7generationgames.com>
 * @copyright       2015 7 Generation Games
 * 
 * @Overview
 * chicken chasing game for Forgotten Trail
 */
/* global Phaser, BasicGame, SCREEN_HEIGHT, SCREEN_WIDTH, score, timer, game */
'use strict';

// This is the first instance of the game, 
// I suppose you could call it the preboot phase
window.onload = function () {
    game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.CANVAS);
    //create game states
    game.state.add('boot', BasicGame.Boot);
    game.state.add('preload', BasicGame.Preload);
    game.state.add('openscreen', BasicGame.Open);
    game.state.add('win', BasicGame.win);
    game.state.add('game', PlayGame);
    //start boot game state 
    //procedure is boot > preload > game
    game.state.start('boot');
};

//This is the main game!
var PlayGame = function (game) {
};

PlayGame.prototype.preload = function () {
};

PlayGame.prototype.create = function () {
    //background color is blue, unless we get an actual background image
    game.stage.backgroundColor = '#6888ff';

    //start the physics engine in arcade mode
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Add background objects
    //background
    map = game.add.tilemap('level1');
    map.addTilesetImage('tilesheet', 'tiles', 32, 32);
    /*
     * The numbers in setCollisionBetween are from the tilesheet used in tiled program, 
     * opening the .tmx file in assets
     * The tilesheet was made with a set tile size of 32x32
     * which means that based on the tilesheet there are 98 blocks
     * These numbers represent these blocks on the tilesheet
     * counted from left to right, top to bottom
     */
    map.setCollisionBetween(84, 87); //blocks are the grass on the tilesheet

    background = map.createLayer('back');
    background.resizeWorld();

    midground = map.createLayer('mid');

    //Add soundtrack
    soundtrack = game.add.audio('soundtrack');
    soundtrack.play('', 0, 1, true);

    //large trees
    lgTrees = game.add.group();
    //1st tree
    lgTrees.create(18, 374, 'large');
    //2nd tree
    lgTrees.create(1638, 341, 'large');
    lgTrees.create(1488, 422, 'large');
    //3rd tree
    lgTrees.create(2193, 361, 'large');
    //4th tree
    lgTrees.create(2449, 450, 'large');
    //5th tree
    lgTrees.create(3495, 560, 'large');
    //6th tree
    lgTrees.create(4753, 292, 'large');

    game.physics.enable(lgTrees, Phaser.Physics.ARCADE);
    lgTrees.setAll('body.immovable', true);
    lgTrees.setAll('anchor.x', .5);
    lgTrees.setAll('body.checkCollision.left', false);
    lgTrees.setAll('body.checkCollision.right', false);
    lgTrees.setAll('body.checkCollision.down', false);
    lgTrees.getAt(0).scale.x = -1;
    lgTrees.getAt(2).scale.x = -1;
    lgTrees.getAt(3).scale.x = -1;
    lgTrees.getAt(4).scale.x = -1;
    lgTrees.getAt(6).scale.x = -1;

    for (var i = 0; i < lgTrees.length; i++) {
        if (lgTrees.getAt(i).scale.x == -1) {
            lgTrees.getAt(i).body.setSize(92, 14, 10, 0);
        }
        else {
            lgTrees.getAt(i).body.setSize(92, 14, -10, 0);
        }
    }

    //medium trees
    mdTrees = game.add.group();
    //1st tree
    mdTrees.create(145, 530, 'med');
    //2nd tree
    mdTrees.create(1509, 577, 'med');
    //3rd tree
    mdTrees.create(2213, 590, 'med');
    mdTrees.create(2322, 520, 'med');
    //4th tree
    mdTrees.create(2579, 590, 'med');
    //5th trees
    mdTrees.create(3367, 560, 'med');
    //6th tree
    mdTrees.create(4626, 400, 'med');

    game.physics.enable(mdTrees, Phaser.Physics.ARCADE);
    mdTrees.setAll('body.immovable', true);
    mdTrees.setAll('anchor.x', .5);
    mdTrees.setAll('body.checkCollision.left', false);
    mdTrees.setAll('body.checkCollision.right', false);
    mdTrees.setAll('body.checkCollision.down', false);
    mdTrees.getAt(1).scale.x = -1;
    mdTrees.getAt(2).scale.x = -1;
    mdTrees.getAt(5).scale.x = -1;

    for (var i = 0; i < mdTrees.length; i++) {
        if (mdTrees.getAt(i).scale.x == -1) {
            mdTrees.getAt(i).body.setSize(52, 13, 6, 0);
        }
        else {
            mdTrees.getAt(i).body.setSize(52, 13, -6, 0);
        }
    }

    //small trees
    smTrees = game.add.group();
    //first tree
    smTrees.create(51, 447, 'small');
    //2nd tree
    smTrees.create(1604, 502, 'small');
    //4th tree
    smTrees.create(2564, 390, 'small');
    //5th tree
    smTrees.create(3461, 460, 'small');
    //6th tree
    smTrees.create(4612, 477, 'small');
    //7th tree
    smTrees.create(4787, 233, 'small');
    //8th tree
    smTrees.create(4868, 418, 'small');

    game.physics.enable(smTrees, Phaser.Physics.ARCADE);
    smTrees.setAll('body.immovable', true);
    smTrees.setAll('anchor.x', .5);
    smTrees.setAll('body.checkCollision.left', false);
    smTrees.setAll('body.checkCollision.right', false);
    smTrees.setAll('body.checkCollision.down', false);
    smTrees.getAt(0).scale.x = -1;
    for (var i = 0; i < smTrees.length; i++) {
        smTrees.getAt(i).body.setSize(30, 12, 0, 0);
    }

    //cliff
    cliffs = game.add.group();
    cliffs.create(1798, 532, 'cliff');
    cliffs.create(2690, 452, 'cliff');
    cliffs.create(3113, 558, 'cliff');
    cliffs.create(3528, 404, 'cliff');
    game.physics.enable(cliffs, Phaser.Physics.ARCADE);
    cliffs.setAll('body.immovable', true);
    for (var i = 0; i < cliffs.length; i++) {
        cliffs.getAt(i).body.setSize(85, 379, 20, 13);
    }
    //platforms
    platforms = game.add.group();
    //two platforms between first and second tree
    platforms.create(710, 573, 'large');
    platforms.create(1085, 573, 'large');
    //two platforms after fifth tree
    platforms.create(3670, 523, 'med');
    platforms.create(3975, 523, 'large');

    game.physics.enable(platforms, Phaser.Physics.ARCADE);
    platforms.setAll('body.immovable', true);
    platforms.setAll('anchor.x', .5);
    platforms.setAll('body.checkCollision.left', false);
    platforms.setAll('body.checkCollision.right', false);
    platforms.setAll('body.checkCollision.down', false);

    //crates
    crates = game.add.group();
    crates.create(710, 622, 'crate');
    crates.create(3474, 622, 'crate');
    crates.create(3153, 522, 'crate');
    game.physics.enable(crates, Phaser.Physics.ARCADE);
    crates.setAll('body.immovable', true);
    for (var i = 0; i < crates.length; i++) {
        crates.getAt(i).body.setSize(25, 50, 10, 4);
        crates.getAt(i).body.gravity.y = 400;
    }
    crates.getAt(1).rivercrate = true;
    crates.getAt(1).body.allowGravity = false;

    //the end house
    house = game.add.sprite(5056, 413, 'house');
    game.physics.enable(house, Phaser.Physics.ARCADE);
    house.body.immovable = true;
    house.body.setSize(20, 30, 55, 120);
    //create the characters needed for the game
    //Sam
    player = game.add.sprite(500, 678, 'characters', 'sam08.png');
    player.animations.add("idle", ["sam08.png"]);
    player.animations.add("walk", ["sam09.png", "sam10.png", "sam11.png"],
            7, true, false);
    player.animations.add("jumping", ["sam_jump1.png", "sam_jump1.png", "sam_jump2.png", "sam_jump3.png"],
            15, false, false);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.acceleration.y = 1800;
    player.body.setSize(20, 32, 0, -6);
    player.anchor.x = .5;
    player.anchor.y = 1;
    player.body.collideWorldBounds = true;


    //Chicken
    chickens = game.add.group();
    chickens.create(51, 325, 'characters', 'chicken_hop1.png');
    chickens.create(750, 550, 'characters', 'chicken_hop1.png');
    chickens.create(1600, 350, 'characters', 'chicken_hop1.png');
    chickens.create(2145, 321, 'characters', 'chicken_hop1.png');
    chickens.create(2690, 650, 'characters', 'chicken_hop1.png');
    chickens.create(3530, 600, 'characters', 'chicken_hop1.png');
    chickens.create(3969, 600, 'characters', 'chicken_hop1.png');
    chickens.create(4780, 200, 'characters', 'chicken_hop1.png');
    game.physics.enable(chickens, Phaser.Physics.ARCADE);
    chickens.setAll('body.acceleration.y', 980);
    chickens.setAll('outOfBoundsKill', true);

    //tree tops
    treeTops = game.add.group();
    treeTops.create(95, 155, 'tTop');
    treeTops.create(1563, 145, 'tTop');
    treeTops.create(2267, 145, 'tTop');
    treeTops.create(2523, 200, 'tTop');
    treeTops.create(3418, 254, 'tTop');
    treeTops.create(4576, 190, 'tTop');
    treeTops.create(4827, 121, 'tTop');
    treeTops.setAll('anchor.x', .5);
    
    //create camera movement
    game.camera.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    game.camera.follow(player);
    game.camera.setBoundsToWorld();

    //The HUD keeping track of score and time
    var style = {font: "25px Arial", fill: "#ffffff", align: "center"};
    text = game.add.text(0, 0, "Score: " + score, style);
    HUD = game.add.sprite(0, 0);
    HUD.fixedToCamera = true;
    HUD.addChild(text);
    HUD.cameraOffset.x = 10;
    HUD.cameraOffset.y = 10;
};

PlayGame.prototype.update = function () {
    //check world collisions
    /*
     * NOTE: for collide to work one of the objects must be in motion
     * collide adjust the objects depending on their velocity
     * if a velocity is 0 then the object is not in motion and
     * collision will not adjust anything between the two objects
     * 
     * NOTE 2: overlap is also used if you want to compare collision between
     * stationary objects but you must define create the collisionhandler function
     * that will handle collisions between the two objects
     */
    game.physics.arcade.collide(player, background);
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player, cliffs);
    game.physics.arcade.collide(player, lgTrees);
    game.physics.arcade.collide(player, mdTrees);
    game.physics.arcade.collide(player, smTrees);
    game.physics.arcade.collide(player, chickens, collectChickens, null, game);
    game.physics.arcade.overlap(player, house, wingame, null, game);

    game.physics.arcade.collide(chickens, background);
    game.physics.arcade.collide(chickens, platforms);
    game.physics.arcade.collide(chickens, lgTrees);
    game.physics.arcade.collide(chickens, mdTrees);
    game.physics.arcade.collide(chickens, smTrees);

    game.physics.arcade.collide(crates, background);
    game.physics.arcade.overlap(crates, cliffs, crateOnCliff, null, game);
    game.physics.arcade.collide(player, crates, movecrates, null, game);

    text.setText("Score: " + score + "\t\t\t\tTime: ");

    //if player isn't touching the ground then he is in the air
    inAir = (player.body.blocked.down || player.body.touching.down) ? false : true;
    player.running = game.input.keyboard.isDown(Phaser.Keyboard.SHIFT);

    if (game.input.keyboard.isDown(Phaser.Keyboard.D)) { //moving right
        player.scale.x = 1; //scale is used to flip the image
        if (!inAir) {
            player.animations.play("walk");
        }
        player.body.velocity.x = player.running ? 250 : 100;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.A)) { //moving left
        player.scale.x = -1; //negative scale flips the image
        if (!inAir) {
            player.animations.play("walk");
        }
        player.body.velocity.x = player.running ? -250 : -100;
    }
    else { //not moving
        if (!inAir) {
            player.animations.play("idle", true);
            player.body.velocity.x = 0;
        }
    }

    if ((game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) && (player.body.blocked.down || player.body.touching.down)) {
        player.animations.play("jumping");
        jumpTimer = 1;
        player.body.velocity.y = -250;
        timer += game.time.elapsed; // time is in ms
    }
    else if ((game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) && (jumpTimer != 0)) {
        if (jumpTimer > 20) {
            jumpTimer = 0;
        }
        else {
            jumpTimer++;
            player.body.velocity.y = -300;
        }
    }
    else if (jumpTimer != 0) {
        jumpTimer = 0;
    }
};

// The render function is used in the debugging process
PlayGame.prototype.render = function () {
//    for (var i = 0; i < crates.length; i++) {
//        game.debug.body(crates.getAt(i), 'rgba(0,255,255, 0.5');
//    }
//    for (var i = 0; i < cliffs.length; i++) {
//        game.debug.body(cliffs.getAt(i), 'rgba(0,255,255, 0.5');
//    }
    game.debug.body(house, 'rgba(255, 255, 255, 0.5)');
};

function collectChickens(player, chicken) {
    chicken.kill();
    score += 1;
};

function wingame(player, house){
    game.state.start('win');
};

function movecrates(player, crate) {
    if (crate.rivercrate) {
        return;
    }
    if (player.running && !inAir) {
        crate.body.immovable = false;
        crate.body.velocity.x = .001;
    }
    else {
        crate.body.immovable = true;
        crate.body.velocity.x = 0;
        crate.body.velocity.y = 0;
    }
};

function crateOnCliff(crate, cliff) {
    if ( (crate.body.y + crate.body.height) > cliff.body.y) {
        crate.body.y = (cliff.body.y) - (crate.height);
    }
    else if((crate.body.x + crate.body.width) > cliff.body.x){
        crate.body.x = (cliff.body.x) - (crate.width);
    }
    else if(crate.body.x  < (cliff.body.x + cliff.body.width)){
        crate.body.x = (cliff.body.x) + (cliff.width);
    }
}
;
