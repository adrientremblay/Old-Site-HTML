class Entity extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y, texture, width, height, speed, damage, health, attackRange, attackDuration, jumpPower){
    super(scene, x, y, texture);
    this.scene.physics.world.enable(this);
    this.setCollideWorldBounds(true);
    this.scene.sys.displayList.add(this);
    this.scene.sys.updateList.add(this);
    this.scene.worldGroup.add(this);
    this.scene.physics.add.collider(this, scene.platformLayer);
    this.scene.worldGroup.children.each(function(entity){this.scene.physics.add.collider(this, entity)}, this);
    this.body.setSize(50,75);
    this.body.setOffset(25, 25);
    //Variables
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.damage = damage;
    this.health = health;
    this.attackRange = attackRange;
    this.attackDuration = attackDuration;
    this.jumpPower = jumpPower;
    this.canAttack = true;
    this.attacking = false;
    this.alive = true;
    this.active = true;
    this.facingRight = true;
    this.blocking = false;
  }

  //Movement Methods
  moveLeft(){
    this.body.setVelocityX(-this.speed);
    this.facingRight = false;
  }
  moveRight(){
    this.body.setVelocityX(this.speed);
    this.facingRight = true;
  }
  turn(){
    this.body.setVelocityX(0);
  }
  jump(){
    this.body.setVelocity(-this.jumpPower);
  }

  //Combat Method
  takeDamage(damage){
    this.health -= damage;
    this.setTint(0xff0000);
    this.scene.time.delayedCall(500, function(){if(this.alive){this.clearTint();}}, [], this);
  }

  //Other Methods
  inAttackRange(toAttack){
    return this.x - (this.width/2) - this.attackRange < toAttack.x
    && toAttack.x < this.x + (this.width/2)  + this.attackRange
    && Math.abs(toAttack.y - this.y) < 10
    && toAttack.alive;
    return true;
  }

}
