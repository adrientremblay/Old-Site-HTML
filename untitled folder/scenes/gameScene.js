var gameScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function Preload(){
    Phaser.Scene.call(this, {key: "gameScene"});
  },
  preload: function(){

  },
  create: function(){
    console.log("Game Loaded!");

    //Music
    music = this.sound.add("track1");
    // music.play();
    //Creating Map
    this.add.image(gameWidth/2,gameHeight/2, "sky");
    var map = this.make.tilemap({key : "arena"});
    var tileset = map.addTilesetImage("tileset", "tiles");
    this.platformLayer = map.createStaticLayer(0, tileset, 0, 0);
    this.platformLayer.setCollision([34,26]);
    //Creating World
    this.worldGroup = this.add.group();
    //Creating Player
    player = new Player(this, gameWidth/2, gameHeight/2, "dude", 100, 100, 160, 25, 100, 150, 1000, 330);
    //Creating Enemies
    spawnEnemy(this, level);
    this.spawnerRunning = false;

    // Creating Animations
    this.anims.create({
      key : "walk-left",
      frames : this.anims.generateFrameNumbers("dude", {start : 14, end : 16}), //frames 0-3 on spritesheet
      frameRate : 10,
      repeat : -1 //loop
    });
    this.anims.create({
      key: 'walk-right',
      frames: this.anims.generateFrameNumbers('dude', { start: 11, end: 13 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'stand-right',
      frames: [ { key: 'dude', frame: 19 } ],
      frameRate: 20
    });
    this.anims.create({
      key: 'stand-left',
      frames: [ { key: 'dude', frame: 20 } ],
      frameRate: 20
    });
    this.anims.create({
      key : "attack-right",
      frames: this.anims.generateFrameNumbers("dude", {start : 5, end : 7}),
      duration : attackAnimationTime
    });
    this.anims.create({
      key : "attack-left",
      frames: this.anims.generateFrameNumbers("dude", {start : 8, end : 10}),
      duration : attackAnimationTime
    });
    this.anims.create({
      key : "block-right",
      frames: this.anims.generateFrameNumbers("dude", {start : 17, end : 17}),
      duration : attackAnimationTime
    });
    this.anims.create({
      key : "block-left",
      frames: this.anims.generateFrameNumbers("dude", {start : 18, end : 18}),
      duration : attackAnimationTime
    });
    this.anims.create({
      key : "die",
      frames: this.anims.generateFrameNumbers("dude", {start : 0, end : 4}),
      duration : attackAnimationTime
    });
    //Creating Key Listeners
    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    //Text Displays
    scoreText = this.add.text(16,16, "Score: " + player.score, {fontSize : "32px", fill : "#000"});
    healthText = this.add.text(16, 48, "Health: " + player.health, {fontSize : "32px", fill : "#000"});
    levelText = this.add.text(16, 80, "Level: " + level, {fontSize : "32px", fill : "#000"});
    alertText = this.add.text(0, 0, "Sample Text", {fontSize : "50px", fill : "#FFF"}); alertText.setVisible(false);
  },

  update: function(){
    //Updating entities
    this.worldGroup.children.each(function(entity){entity.update()}, this);

    //Escape
    if(this.escKey.isDown){
      gameOver(this);
    }
    //Pause
    if (Phaser.Input.Keyboard.JustDown(this.pKey)){
      if (alertText.visible){
        this.physics.resume();
        alertText.visible = false;
        //Revive everything
        this.worldGroup.children.each(function(entity){entity.active = true}, this);
      } else {
        this.physics.pause();
        showMessage(this, alertText,"Paused");
        //Kill everything
        this.worldGroup.children.each(function(entity){entity.active = false}, this);
      }
    }
  }

});

myGame.scenes.push(gameScene); //Adding self to scenes
