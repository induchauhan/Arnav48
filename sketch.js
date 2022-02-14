var PLAY=1;
var END=0;

var gameState=PLAY;

var bg;
var bgimg;
var ninja,n;
var s;
var invisibleGround;

var starsGroup;
var heart;
var hearts=[];
var gameOver,g;
var restart,r;
var score=0;
//localStorage["HighestScore"] = 0;
var j;

function preload (){
bg=loadImage("bg.jpg")
n=loadAnimation("image1.png","image2.png","image3.png","image4.png","image5.png")
s=loadImage("star.png")
g=loadImage("deathtext.png");
r=loadImage("death.png");
j=loadAnimation("image2.png");
heart=loadImage("life.png");
}


//---------------------------------------------------------------------------


function setup() {
    createCanvas(windowWidth,windowHeight);
    bgimg=createSprite(width/2,height/2,width,height);
    bgimg.addImage(bg)
    
    ninja=createSprite(200,height-100,50,50);
    ninja.addAnimation("ninja",n);
    ninja.addAnimation("jump",j);
    ninja.setCollider("rectangle",0,0,200,200);

    gameOver = createSprite(width/2,100);
    gameOver.addImage(g)
    gameOver.scale=0.5;

    restart = createSprite(width/2,height/2);
    restart.addImage(r);
    restart.scale=0.4;

    invisibleGround = createSprite(width/2,height-30,width*2,10);
    invisibleGround.visible = false;

    starsGroup=new Group();

    score=0;

    for(i=0;i<=2;i++){
      hearts[i] = createSprite(70*(i+1),50,10,10);
      hearts[i].addImage(heart);
      hearts[i].scale=0.1;
    
  }
}



//-------------------------------------------------------------------------------------------------



function draw() {
  background("white");
  drawSprites();
  fill("white");
  textSize(30);
  text("Score: "+ score, width-200,50);
  if (gameState===PLAY){
  score = score + Math.round(getFrameRate()/60);
  
  gameOver.visible = false;
  restart.visible = false;

  bgimg.velocityX=-8;
  
  if(bgimg.x<0){
  bgimg.x=width/2+4100;

  }
 
  if(keyDown("space") && ninja.y>invisibleGround.y-200) {
    ninja.velocityY = -20;
    ninja.changeAnimation("jump",j);
  }

if(ninja.isTouching(invisibleGround)){
ninja.changeAnimation("ninja",n);
}


  ninja.velocityY = ninja.velocityY + 0.8

  ninja.collide(invisibleGround);

  if(starsGroup.isTouching(ninja)){
    for(var i=0;i<starsGroup.length;i++){   
      if(starsGroup[i].isTouching(ninja)){
        starsGroup[i].destroy();
        if(hearts.length>1)
        {
              var l=hearts.length;
              hearts[l-1].destroy();
              hearts.pop();
        }
    else if (hearts.length<=1)
    {
      
      var l=hearts.length;
      hearts[l-1].destroy();
      hearts.pop();
      gameState=END;
    }
  }
  }
}
  spawnStars();
  }

  else if (gameState === END) {
   
    gameOver.visible = true;
    restart.visible = true;
    ninja.changeAnimation("jump",j);
    //set velcity of each game object to 0
    bgimg.velocityX = 0;
    ninja.velocityY = 0;
    starsGroup.setVelocityXEach(0);
    text("Your Score is: "+score,width/2-130,height-200);
    text("Click on the skull to play again!",width/2-200,height-150);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }

}

//--------------------------------------------------
  
function spawnStars(){
if(frameCount%100===0){
  var star=createSprite(width,Math.round(random(height/2,height-100)));
star.addImage(s);
star.scale=0.3;
//star.debug=true;
star.lifetime=width;
star.rotationSpeed=-10;
star.velocityX=-20;
starsGroup.add(star);

}

}





function reset(){
  gameState = PLAY;
  starsGroup.destroyEach();
  score = 0;
  
}
