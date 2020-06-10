// Game Functions
function spawnEnemy(scene, numOfEnemies){
  var spawnX;

  while(numOfEnemies > 0){
    lOR = Boolean(randomNumber(0,1));
    if (lOR) {
      spawnX = 0 + (numOfEnemies*50); //CONSTANT ALERT CONSTANT ALERT!!!!!11!!!
    } else {
      spawnX = gameWidth - (numOfEnemies*50);
    }
    scene.worldGroup.add(new Enemy(scene, spawnX, gameHeight/2, "dude", 100, 100, 40, 10, 100, 50, 1000, 1000));
    numOfEnemies --;
  }
}
function gameOver(scope){
  scope.scene.pause();
  player.setTint(0xff0000);
  showMessage(scope, alertText, "Game Over");
  music.stop();
}

function showMessage(scope, alertItem, messageText){
  alertText.setText(messageText); //Make global alert function
  Phaser.Display.Align.In.Center(alertItem, scope.add.zone(gameWidth/2, gameHeight/2, gameWidth, gameHeight));
  alertText.visible = true;
}

function showTimer(scope, alertItem, countdown){
  if (countdown <= 0){
    alertText.visible = false;
    scope.spawnerRunning = false;
    level ++;
    levelText.setText("Level " + String(level));
    spawnEnemy(scope, level);
  } else {
    alertText.setText("Level " + String(level + 1) + " in " + String(countdown));
    Phaser.Display.Align.In.Center(alertItem, scope.add.zone(gameWidth/2, gameHeight/2, gameWidth, gameHeight));
    alertText.setVisible(true);
    scope.time.delayedCall(1000, showTimer, [scope, alertText, countdown - 1], this);
  }
}

function randomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function devLog(logText){
  if (devView){
    console.log("DEV: " + logText);
  }
}
