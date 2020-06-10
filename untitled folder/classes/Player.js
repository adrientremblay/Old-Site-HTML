class Player extends Entity {
  constructor(scene, x, y, texture, width, height, speed, damage, health, attackRange, attackDuration, jumpPower){
    super(scene, x, y, texture, width, height, speed, damage, health, attackRange, attackDuration, jumpPower);

    //Player score
    this.score = 0;
  }

  // platFun(eContainer, platforms){
  //   //Up Platform
  //   if (eContainer.body.touching.up){
  //     eContainer.col.active = false;
  //     eContainer.setVelocity(-platformPiercingPower);
  //     this.time.delayedCall(platformPiercingTime, function(){eContainer.col.active=true;}, [], this);
  //   } else{
  //     eContainer.col.active = true;
  //   }
  //
  //   //Down Platform
  //   if (this.sKey.isDown && eContainer.body.touching.down) {
  //     eContainer.col.active = false;
  //     eContainer.body.setVelocity(platformDropPower);
  //     this.time.delayedCall(platformDropTime, function(){eContainer.col.active=true;}, [], this);
  //
  //   }
  // }

  attack(toAttack){
    this.canAttack = false;
    this.scene.time.delayedCall(this.attackDuration,
      function(){
        this.canAttack = true;
        if(this.inAttackRange(toAttack) && ! toAttack.blocking){
          toAttack.takeDamage(this.damage);
        }
      }, [], this); //Attack Cooldown
  }

  die(){
    this.setTint(0xff0000);
    this.alive = false;
    this.setVelocityX(0);
    this.scene.time.delayedCall(5000, function(){this.destroy();}, [], this);
  }

  update(){
    if (this.alive && this.active) {
      //Animations
      if (! this.canAttack) {
        if(this.facingRight){
          this.anims.play("attack-right", true);
        } else {
          this.anims.play("attack-left", true);
        }
      } else if (this.scene.spaceKey.isDown){
        if(this.facingRight){
          this.anims.play("block-right", true);
        } else {
          this.anims.play("block-left", true);
        }
      } else if (this.scene.dKey.isDown) {
        this.anims.play("walk-right", true);
      } else if (this.scene.aKey.isDown) {
        this.anims.play("walk-left", true);
      } else  {
        if(this.facingRight){
          this.anims.play("stand-right", true);
        } else {
          this.anims.play("stand-left", true);
        }
      }
      //Player Attack
      if (Phaser.Input.Keyboard.JustDown(this.scene.enterKey) && this.canAttack){
        this.scene.worldGroup.children.each(function(entity){
          if (entity.constructor.name == "Enemy"){
            this.attack(entity, this.scene);
          }
        }, this);
      }
      //Player Movement
      if(this.scene.aKey.isDown){
        this.moveLeft();
      } else if (this.scene.dKey.isDown){
        this.moveRight();
      } else {
        this.turn();
      }

      if (this.scene.wKey.isDown && this.body.blocked.down) {  //Jumping
        this.jump();
      }
      //blocking
      if(this.scene.spaceKey.isDown && this.canAttack){
        this.blocking = true;
      } else {
        this.blocking = false;
      }
      //Player Vital Signs Check
      if (this.health <= 0 ){
        this.die();
      }
    } else if (!this.alive){
      gameOver(this.scene);
    }
  }

}
