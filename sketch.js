//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;
var score = 0;
var knife;
var knifeImage;
var fruit, fruitimg1, fruitimg2, fruitimg3, fruitimg4;
var fruitG;
var knifeSound;
var background1, backgroundimg;
var monster, monsterimg, monsterimg2;
var monsterG;
var gameover, gameoverimg;


function preload() {

  knifeImage = loadImage("knife.png");
  fruitimg1 = loadImage("fruit1.png");
  fruitimg2 = loadImage("fruit2.png");
  fruitimg3 = loadImage("fruit3.png");
  fruitimg4 = loadImage("fruit4.png");
  knifeSound = loadSound("knife_tone.mp3")
  backgroundimg = loadImage("background2.png")
  monsterimg = loadImage("monster.png");
  monsterimg2 = loadImage("monster2.png");
  gameoverimg = loadImage("gameover.png");
  gameoversound = loadSound("game_over.mp3");
}



function setup() {
  createCanvas(600, 600);
  background1 = createSprite(100, 200, 200, 30);
  background1.addImage(backgroundimg);

  //creating sword
  knife = createSprite(40, 200, 20, 20);
  knife.addImage(knifeImage);
  knife.scale = 0.7;


  monsterG = new Group();
  fruitG = new Group();
  //set collider for sword
  knife.setCollider("rectangle", 0, 0, 40, 40);

  score = 0;
  //create fruit and monster Group variable here
}

function draw() {
  background("black");

  if (gameState === PLAY) {

    //calling fruit and monster function
    createMonster();
    fruits();
    // Move knife with mouse
    knife.y = World.mouseY;
    knife.x = World.mouseX;

    if (knife.isTouching(fruitG)) {
      knifeSound.play();
      score = score + 2;
      fruitG.destroyEach();
    }
  }


  if (gameState === END) {
    gameover = createSprite(300, 200, 20, 20);
    gameover.addImage(gameoverimg);
    gameover.scale = 2;

    monsterG.setVelocityXEach(0);
    fruitG.setVelocityXEach(0);

  }
  // Go to end state if knife touching enemy
  if (monsterG.isTouching(knife)) {
    gameState = END;
    gameoversound.play();
    monsterG.destroyEach();
  }




  drawSprites();

  //Display score
  textSize(25)
  text("Score : " + score, 250, 50);
}

function fruits() {
  if (World.frameCount % 80 == 0) {
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        fruit.addImage(fruitimg1);
        break;
      case 2:
        fruit.addImage(fruitimg2);
        break;
      case 3:
        fruit.addImage(fruitimg3);
        break;
      case 4:
        fruit.addImage(fruitimg4);
        break;
      default:
        break;
    }
    fruit.y = Math.round(random(50, 340));
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    fruitG.add(fruit);
  }
}

function createMonster() {
  if (World.frameCount % 100 == 0) {
    monster = createSprite(200, 200, 20, 20);
    monster.scale = 0.036;
    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1:
        monster.addImage(monsterimg);
        break;
      case 2:
        monster.addImage(monsterimg2);
        break;
      default:
        break;
    }
    monster.y = Math.round(random(80, 300));
    monster.velocityX = -7;
    monster.setLifetime = 100;
    monsterG.add(monster);
  }
}