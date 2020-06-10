var loading = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function Preload(){
    Phaser.Scene.call(this, {key: "loading"});
  },
  preload: function(){
    //Preloading Image Assets
    this.load.image('sky', 'assets/sky.png');
    // this.load.image('ground', 'assets/platform.png');
    // this.load.image('star', 'assets/star.png');
    // this.load.image('bomb', 'assets/bomb.png');
    // this.load.image("sword", "assets/sword.png");
    this.load.spritesheet('dude', 'assets/playerSheet.png', { frameWidth: 100, frameHeight: 100 });
    this.load.image('tiles', 'assets/tilemap.png');
    this.load.image("on", "assets/on.png");
    this.load.image("off", "assets/off.png");

    //Preloading Maps
    this.load.tilemapTiledJSON('arena', 'maps/arena.json');

    //Loading Audio
    this.load.audio("track1", ["assets/audio/track1.mp3"]);

  },
  create: function(){
    console.log("Loading Complete!");
    game.scene.start("mainMenu");
  },
  update: function(){
    //Nothing
  }
});
myGame.scenes.push(loading);
