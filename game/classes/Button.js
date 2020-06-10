class Button extends Phaser.GameObjects.Image{
  constructor(scene, x, y, texture, toggleVarStr){
    super(scene, x, y, texture);

    //Button Functionality
    this.setInteractive();
    this.on('pointerdown', function (pointer) {
        if (toggleVar) {toggleVar = false ; this.setTexture("off");} else {toggleVar = true ; this.setTexture("on");};
        console.log("wew");
    });

    this.scene.sys.displayList.add(this);

  }
}
