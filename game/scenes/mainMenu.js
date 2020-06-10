// var skyisblue;
var mainMenu = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function Preload(){
    Phaser.Scene.call(this, {key: "mainMenu"});
  },
  preload: function(){

  },
  create: function(){
    console.log("Main Menu Loaded!");
    this.add.text(16,16, mainMenuText, {fontSize : "20px", fill : "#FFF"}); //Topleft
    this.add.text(16,gameHeight - 36, "Version : " + version, {fontSize : "20px", fill : "#FFF"}); //Bottomleft
    this.add.text(gameWidth - 200,gameHeight - 36, creator, {fontSize : "20px", fill : "#FFF"}); //Bottomright
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    // skyisblue= true;
    // var testButton = new Button(this, 500, 500, "on", skyisblue);
  },
  update: function(){
    if(Phaser.Input.Keyboard.JustDown(this.enterKey)){
      game.scene.start("gameScene");
      this.scene.pause();
    }
  }
});
myGame.scenes.push(mainMenu);
