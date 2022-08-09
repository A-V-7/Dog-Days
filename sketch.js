

function preload(){
  dog_running = loadAnimation("dogAnimation1.png","dogAnimation2.png","dogAnimation3.png","dogAnimation4.png");
  hole_img = loadImage("hole.png");
  bone_img = loadImage("bone.png");
  gameOver_img = loadImage("gameOver.png");
}



function setup() {
  createCanvas(1000,500);
  createEdgeSprites();

  ground = createSprite(500,375,1000,250);
  ground.shapeColor = "limegreen";

  sky = createSprite(500,125,1000,250);
  sky.shapeColor = "skyBlue";

  dog = createSprite();
  dog.addAnimation("player",dog_running);
  dog.scale = 0.60;
  dog.debug = false;
  dog.setCollider("rectangle",0,-10,150,150);

  score = 0;
  gameState = "play";
  
 

  invisibleWall = createSprite(500,125,1000,180);
  invisibleWall.visible = false;
  invisibleWall.shapeColor ="blue"; 

  invisibleWall2 = createSprite(500,497,1000,3);
  invisibleWall2.visible = false;

  bonesGroup = createGroup();
  holesGroup = createGroup();

  
}

function draw() {
  
  dog.depth = sky.depth;
  dog.depth += 1;
  
  if(gameState === "play"){
    bones();
    holes();
    for(var i=0;i<bonesGroup.length;i++){
      if(bonesGroup[i].isTouching(dog)){
        bonesGroup[i].destroy();
        score+=1;
      }
    }
    
    if(holesGroup.isTouching(dog)){
      gameState = "end"
    }

    dog.y = World.mouseY;
    dog.x = World.mouseX;
  }

  if(gameState === "end"){
    bonesGroup.setVelocityXEach(0);
    holesGroup.setVelocityXEach(0);

    gameOver = createSprite(500,250);
    gameOver.addImage(gameOver_img);
  }
 
  dog.collide(invisibleWall2);
  dog.collide(invisibleWall);
  
  
  textSize(20)
  drawSprites();
  

  fill("white");
  text("Score: "+score,20,30);

 
  

  
}


function bones(){
  if(frameCount % 80 === 0){
    bone = createSprite(random(20,980),random(270,480),10,40);
    bone.addImage("collect",bone_img);
    bone.scale = 0.10;
    bone.velocityX -= 1
    bonesGroup.add(bone);
   }  
}

function holes(){
  if(frameCount % 90 === 0){
    hole = createSprite(random(20,980),random(270,480),10,40);
    hole.addImage("obstacle",hole_img);
    hole.scale = 0.25;
    hole.velocityX -= 1
    holesGroup.add(hole);
   } 
}
  