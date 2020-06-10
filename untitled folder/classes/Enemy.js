class Enemy extends Entity {
  constructor(scene, x, y, texture, width, height, speed, damage, health, attackRange, attackDuration, jumpPower){
    super(scene, x, y, texture, width, height, speed, damage, health, attackRange, attackDuration, jumpPower);
    this.stunned = false;
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
  //   if (player.eContainer.y - 5 > eContainer.y && eContainer.body.touching.down && eContainer.y < 460) {
  //     eContainer.col.active = false;
  //     eContainer.setVelocity(platformDropPower);
  //     this.time.delayedCall(platformDropTime, function(){eContainer.col.active=true;}, [], this);
  //
  //   }
  // }

  attack(){
    //Deciding whether to attack or block
    var aOB = Boolean(randomNumber(0,1));

    if(aOB){
      //Attack
      devLog("enemy attack");
      this.attacking = true;
      this.scene.time.delayedCall(attackAnimationTime, function(){
        this.attacking = false;
        if (! player.blocking) {
          player.takeDamage(this.damage);
          healthText.setText("Health: "+ player.health);
        } else {
          this.stunned = true; //BOI
        }
      }, [], this);
    } else {
      //Block
      devLog("enemy block");
      this.blocking = true;
      this.scene.time.delayedCall(attackAnimationTime, function(){
        this.blocking = false;
      }, [], this);
    }

    //Setting up next attack
    this.canAttack = false;
    var waitVariation = 2000;
    var timeTillNextAttack = randomNumber(attackAnimationTime, attackAnimationTime + waitVariation); //Random wait time above attack duration
    this.scene.time.delayedCall(timeTillNextAttack, function(){this.canAttack = true;}, [], this);

  }

  die(){
    devLog("Enemy Death");
    this.setTint(0xff0000);
    this.alive = false;
    this.scene.time.delayedCall(2000, function(){this.destroy();}, [], this);
    this.scene.worldGroup.remove(this);
    player.score += 10;
    scoreText.setText("Score: "+ player.score);
  }

  update(){
    var walkRight = this.x + (this.width/2) + (this.attackRange/2) < player.x;
    var walkLeft = player.x < this.x - (this.width/2) - (this.attackRange/2);

    // Animations
    if (this.alive && this.active) {
      if (this.attacking) {
        if(this.facingRight){
          this.anims.play("attack-right", true);
        } else {
          this.anims.play("attack-left", true);
        }
      } else if (this.blocking){
        if (this.facingRight){
         this.anims.play("block-right", true);
       } else {
         this.anims.play("block-left", true);
       }
     } else if (walkRight) {
        this.anims.play("walk-right", true);
      } else if (walkLeft) {
        this.anims.play("walk-left", true);
      } else {
        if (this.facingRight){
          this.anims.play("stand-right");
        } else {
          this.anims.play("stand-left");
        }

      }

      //Attack & Block
      if(this.inAttackRange(player) && this.canAttack){
        this.attack();
      } else {
        //Movement
        if (walkRight){ //Walk Right
          this.moveRight();
        } else if  (walkLeft) { //Walk Left
          this.moveLeft()
        } else {
          this.turn();
        }
        if (this.y -10 > player.y && this.body.touching.down){ //Jumping
          this.jump();
        }
      }
    }

    //Enemy Vital Signs Check
    if (this.health <= 0 ){
      this.die();
      // Check if all enemies are dead
      if (this.scene.worldGroup.getLength() == 1 && this.scene.worldGroup.getChildren()[0].constructor.name == "Player" && !this.scene.spawnerRunning){
        // Spawn more doods in
        this.scene.spawnerRunning = true;
        showTimer(this.scene, alertText, 3);
      }
    }
  }

}
