var bg;
var pc;
var asteroid1,asteroid2;
var asteroidGroup;
var alien1,alien2,alien3;
var alienGroup;
var missileImg;
var missileGroup, TMGroup;
var blastImg;
var k =0;
var score=0;

var playSound2;
var tm,tm1;
var PLAY=1;
var END=0;
var gameState=PLAY;
var frames;
var loose; 
var bg2


function preload(){
    bg=loadImage("bg.jpg")
    bg2=loadImage("bg2.jpg")
    pc=loadImage("/pc.png")
    asteroid1=loadImage("/asteroid1.png")
    asteroid2=loadImage("/asteroid2.png")
    alien1=loadImage("alien1.png")
    alien2=loadImage("alien2.png")
    alien3=loadImage("alien3.gif")
   missileImg=loadImage("missile.png")
   blastImg=loadImage("blast.webp")
    tm=loadImage("team member.png")
    tm1=loadImage("team member 1.png")
   playSound2=loadSound("sound2.wav");
   loose=loadSound("sound loose.wav");


}
function setup(){
    createCanvas(displayWidth,displayHeight);
    rocket=createSprite(displayWidth/2,displayHeight-100);
    rocket.addImage(pc);
    rocket.scale=0.3;
  

    blast=createSprite(200,200,10,10)
    blast.addImage(blastImg)
    blast.scale=0.3;
    blast.visible=false;

    o=createSprite(displayWidth+100,30)

    asteroidGroup=new Group();
    alienGroup=new Group();
    missileGroup=new Group();
    TMGroup=new Group();
}
function draw (){
    background(bg);

    fill("cyan");
    textSize(20)
    text("hint:killing aliens=+5 points,killing team member=-5,if alien or asteroid touches you you loose",displayWidth-900,50)

    if(gameState===PLAY){
          
    if(keyDown("LEFT_ARROW")){  
    rocket.x=rocket.x-20;
   }
    else if(keyDown("RIGHT_ARROW")){
     
        rocket.x=rocket.x+20;
    }


    if(keyDown("space")){
        spawnMissile();
    }


    
    for( var j =0;j<asteroidGroup.length;j++){
        for (var i =0;i<missileGroup.length ;i++){
            if(missileGroup[i].isTouching(asteroidGroup[j])){
                blast.x=missileGroup[i].x;
                blast.y=missileGroup[i].y;
                blast.visible=true;
                
                missileGroup[i].destroy();
                asteroidGroup[j].destroy();
                score+=5;
                playSound2.play();
               
               
                for ( k =0;k<5;k++){
  
                }
                break;
            }
            if(k===4){
                blast.visible=false;
                k=0;   
            }    
        }
    }
   


    
    for( var p =0;p<alienGroup.length;p++){
        for (var s =0;s<missileGroup.length ;s++){
            if(missileGroup[s].isTouching(alienGroup[p])){
                blast.x=missileGroup[s].x;
                blast.y=missileGroup[s].y;
                blast.visible=true;
                
                missileGroup[s].destroy();
                alienGroup[p].destroy();
                score+=5;
                playSound2.play();
 
                for ( k =0;k<5;k++){

                }
                break;
            }
            if(k===4){
                blast.visible=false;
                k=0;
              
            }           
        } 
    }

    for( var q =0;q<TMGroup.length;q++){
        for (var m=0;m<missileGroup.length ;m++){
            if(missileGroup[m].isTouching(TMGroup[q])){
                blast.x=missileGroup[m].x;
                blast.y=missileGroup[m].y;
                blast.visible=true;
                
                
                missileGroup[m].destroy();
               
                TMGroup[q].destroy();
                score-=5;
                playSound2.play();

                for ( k =0;k<5;k++){
                }
                break;
            }
            if(k===4){
                blast.visible=false;
                k=0;
            }
        }
       
        
    }

    if (alienGroup.isTouching(rocket)){
        blast.x=rocket.x;
        blast.y=rocket.y;
        blast.visible=true;
        alienGroup.destroyEach();
       rocket.destroy();
       playSound2.play();
       score-=5
       gameState=END;
       frames=frameCount+500;


      
    }
    if(asteroidGroup.isTouching(rocket)){
        blast.x=rocket.x;
        blast.y=rocket.y;
        blast.visible=true;
        asteroidGroup.destroyEach();
       rocket.destroy();
       playSound2.play();
       score-=5
       gameState=END;
       frames=frameCount+500;


      
    }
    // if(mouseY.isTouching(o)){
    //     gameState=PLAY
    // }


    drawSprites()
    }

    else{
       
        alienGroup.setVelocityYEach(0);
        asteroidGroup.setVelocityYEach(0);
        missileGroup.setVelocityYEach(0);
        TMGroup.setVelocityYEach(0);
        alienGroup.setLifetimeEach(-1);
        asteroidGroup.setLifetimeEach(-1);
        missileGroup.setLifetimeEach(-1);
        TMGroup.setLifetimeEach(-1);
        loose.play();
        background(bg2)
        if(frames<frameCount)
            blast.visible=false;
    }
   


  
   
    spawnObstacles();
    spawnAliens();
    spawnTM();

   
   
    fill ("yellow")
    textSize(50)
    text ("score:"+score,displayWidth-190,180)
    if(gameState===END){
        fill("red");
        textSize(50);
        stroke ("cyan")
        text("'GAME OVER'",displayWidth/2,displayHeight/2)
    }
    
}
function spawnObstacles(){
    // var rand=Math.round(random(120,150))
    if(frameCount%130===0){
        asteroid=createSprite(40,-30)
        var i=Math.round(random(1,2))
        if(i===1){
            asteroid.addImage(asteroid2)
            asteroid.scale=0.1;
        }
        else{
            asteroid.addImage(asteroid1)
            asteroid.scale=0.2;
        }

        asteroid.velocityY=2;
        asteroid.x=Math.round(random(40,displayWidth-100))
        asteroid.lifetime=displayHeight/6;
        asteroidGroup.add(asteroid);



    }
}
function spawnAliens(){
    if(frameCount%80===0){
        alien=createSprite(40,-30)
        var i=Math.round(random(1,3))
        switch(i){
            case 1:alien.addImage(alien1);
            alien.scale=0.2
            break;
            case 2:alien.addImage(alien2);
            alien.scale=0.1
            break;
            case 3:alien.addImage(alien3);
            alien.scale=0.2
            break;

        }

        alien.velocityY=Math.round(random(5,7))
        alien.x=Math.round(random(40,displayWidth-100))
        alien.lifetime=displayHeight/alien.velocityY;
        alienGroup.add(alien);
        rocket.depth=alien.depth+1



    }


}


function spawnMissile(){
    var missile=createSprite(200,200);
    missile.addImage(missileImg);
    missile.x=rocket.x;
    missile.y=rocket.y;

    missile.velocityY=-5;
    missile.scale=0.08;
   missile.lifetime=displayHeight/5;
   missile.depth=rocket.depth-1;
   missileGroup.add(missile)



    
}
function spawnTM(){
    if(frameCount%80===0){
       TM=createSprite(40,-30)
        var i=Math.round(random(1,2))
        if(i===1){
            TM.addImage(tm)
            TM.scale=0.3;
        }
        else{
            TM.addImage(tm1)
            TM.scale=0.3;
        }

        TM.velocityY=Math.round(random(5,7))
        TM.x=Math.round(random(40,displayWidth-100))
        TM.lifetime=displayHeight/TM.velocityY;
        TMGroup.add(TM);
        rocket.depth=TM.depth+1



    }


}


