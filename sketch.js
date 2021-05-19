var backImage,backgr;

var player, player_running;

var ground,ground_img;

var obstacle,stoneImg,obstacleGrp;

var bananaGrp,bananaImg,banana;

var gameOverImg;

var score = 0;
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  stoneImg = loadImage("stone.png");
  bananaImg = loadImage("banana.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  obstacleGrp = new Group();
  bananaGrp = new Group();
}

function draw() { 
  background(0);

  if(gameState===PLAY){

    spawnObstacle();
    spawnBanana();
    gameOverImg.visible = false;

    if(player.isTouching(bananaGrp)){
      bananaGroup.destroyEach();
      score = score + 1;
    }

    if(obstacleGrp.isTouching(player)){
      gameState = END;
    } 
    else if (gameState === END) {

    //set velcity of each game object to 0

    gameOverImg.visible = true;
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    bg.velocityX = 0;

    //change the trex animation
    monkey.changeAnimation("mymonkey", monkey_running);

    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
    }
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
   }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }

  drawSprites();

  fill("yellow");
  stroke("yellow");
  text("Score ::" + score, 500, 50);


function spawnObstacle(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(stoneImg);
    var rand = Math.round(random(200, 600));
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacleGrp.add(obstacle);
    obstacle.depth = player.depth;
    player.depth = obstacle.depth + 1;
  }
}

function spawnBanana(){
  if(frameCount % 80 === 0){
    banana = createSprite(600, 275, 20, 20);
    banana.addImage(bananaImg);
    banana.scale = 0.1;
    banana.y = Math.round(random(120, 200));
    banana.velocityX = -3;
    banana.lifetime = 200;
    banana.depth = player.depth;
    player.depth = banana.depth + 1;
    bananaGrp.add(banana);
  }
}