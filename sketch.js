var gameState = 0;
var player,player_img;
var track;
var car2_img,car3_img,car4_img, ground_img;
var car,rand;
var carsGroup;
var score = 0;
var posY = -5000,posX = -500;

function preload(){
  player_img = loadImage("images/car1.jpg");
  car2_img = loadImage("images/car2.jpg");
  car3_img = loadImage("images/car3.jpg");
  car4_img = loadImage("images/car4.jpg");
  track = loadImage("images/track.jpg");
  ground_img = loadImage("images/ground.png")
}

function setup(){
  canvas = createCanvas(displayWidth,displayHeight-170);

  player = createSprite(displayWidth/2,2300,40,40);
  player.addImage(player_img);
  player.scale = 2;

  carsGroup = new Group();
  if(frameCount%40===0){
    car = createSprite(posX,posY,30,30);
  }
}

function draw(){
  background(ground_img);
  image(track, 0,-displayHeight*6,displayWidth+100, displayHeight*9);
  camera.position.x = displayWidth/2;
  camera.position.y = player.y-100; 

  if(gameState===1){
    fill("brown");
    noStroke();
    textSize(40);
    text("Sorry, try better next time!",displayWidth/4,player.y-300);
  }

  fill("gray");
  noStroke();
  textSize(20);
  text("Your Score: "+ score,50,player.y-200);

  player.velocityY = -10;

  if(keyDown(LEFT_ARROW)){
    player.x -= 10;
  }
  if(keyDown(RIGHT_ARROW)){
    player.x += 10;
  }
  if(player.y === -4470){
    gameState = 2;
    player.velocityY = 0;
    carsGroup.setVelocityXEach(0);
    fill("pink");
    noStroke();
    textSize(40);
    text("OMG U ACTUALLY WON",displayWidth/4,player.y-300);

  }
  if(frameCount % 50 === 0 && gameState === 0){
    score += 5;
  }

  if(frameCount % 50 === 0 && gameState === 0){
    rand = random(220,1255);
    car.y = player.y-800;
    car.x = rand;
    car.depth = player.depth;
    car.collide(Iwall1);
    car.collide(Iwall2);
    num = Math.round(random(1,5));

    switch(num) {
      case 1: car.addImage(car2_img);
              break;
      case 2: car.addImage(car3_img);
              break;
      case 3: car.addImage(car4_img);
              break;
      default: break;
    }

    car.scale = 2;
    car.velocityY = 10;
    carsGroup.add(car);
    car.lifetime = -100;
  }
  if(player.isTouching(car)){
    gameState = 1;
    player.destroy();
    carsGroup.destroyEach();
    score -= 5;
  }

  drawSprites();
}