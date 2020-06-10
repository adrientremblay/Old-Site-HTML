//Game Variables
var gameWidth = 1200;
var gameHeight = 700;
var myGame = {
  scenes : []
};
var worldGroup;
var devView = false;
var version = "1.0";
var creator = "Adrien Tremblay";

//mainMenu variables
var mainMenuText = "~Attack the enemy~\nW: up\nS: down\nA: left\nD: right\nENTER: attack\nSPACE: block\nESC: quit\nP: pause\nPress Enter to start";

//animation variables
var attackAnimationTime = 1000;

//gameScene Variables
var platforms;
var platformPiercingPower = 250;
var platformPiercingTime = 1000;
var platformDropPower = 100;
var platformDropTime = 500;
var player;
var score = 0;
var scoreText;
var healthText;
var alertText;
var level = 1;
var music;
