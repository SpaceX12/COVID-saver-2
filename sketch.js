var carImg, person1Img, person2Img, person3Img, potholeImg, barrierImg, roadImg;

var paitentGroup, obstacleGroup;

var counter = 0;
var timeleft = 10;

var paitentCount = 0;
var obstacleCount = 0;

var paitentCollected = 0;
var paitentMissed = 0;

var restart;

var gameState = 0;
var minn = 1;
var sec = 60;
var secMod = "00";
var flag = 0;

function preload(){
    carImg = loadImage("Images/Ambulance.png");

    person1Img = loadImage("Images/patient1.png");
    person2Img = loadImage("Images/patient2.png");
    person3Img = loadImage("Images/patient3.png");

    potholeImg = loadImage("Images/pthhole.png");
    barrierImg = loadImage("Images/Barrier.png");

    roadImg = loadImage("Images/Road.PNG");

    reImg = loadImage("Images/Restart.png")
}

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);

    a = createSprite(windowWidth/2, windowHeight/2);
    a.addImage(roadImg);
    a.y = -2950;
    a.scale = 4.5;

    a.velocityY = (10);   

    g = createSprite(600, 520);
    g.addImage(carImg);
    g.setCollider("rectangle", 0, 0, g.width-70, g.height-36);

    paitentGroup = createGroup();
    obstacleGroup = createGroup();

    restart = createSprite(742, 350);
    restart.addImage(reImg);
    
}

function draw(){
    background(0);

    if(gameState == 0){
        a.visible = true;
        g.visible = true;

        restart.visible = false;
        if(a.y>0){
            a.y = -2500;
        }

        if((touches.length<0 || keyIsDown(LEFT_ARROW))){
            g.velocityX = -10;
            touches = [];

        }else if((touches.length<0 || keyIsDown(RIGHT_ARROW))){
            g.velocityX = 10;
            touches = [];

        } 
        else{
            g.velocityX = 0;
        }

        if(World.frameCount%30==0){
            if(flag==0){
                flag++;
                minn--;
            }
            if(sec==0){
                minn--;
                sec = 60;
            }
            sec-=1;
            if (sec<10){
                secMod="0"+sec;
            }
            else{
                if(sec==60){
                    secMod="00"                
                }
                else{
                    secMod = sec;
                }
            }
            if(sec==0){
                minn--;
                sec = 60;
            }
        }

        spawnPaitents();
        spawnObstacles();

        detectPaitent();
        detectObstacle();

        endGame();
    }else if(gameState == 1){

        a.visible = false;
        g.visible = false;
        paitentGroup.destroyEach();
        obstacleGroup.destroyEach();

        paitentGroup.setVelocityXEach(0);
        
        fill("white");
        textSize(50);

        text("You did your job   You saved: " + paitentCollected, 350, 100)

        restart.visible = true;

        if(mousePressedOver(restart)) {
            reset();
        }
    }

    drawSprites();

    if(gameState == 0){
        fill("red");
        textSize(30);

        text(minn+":"+secMod, 20, 30);

        fill("blue");
        textSize(30);

        text("Score: " + paitentCollected, 100, 30);
    }
}

function spawnPaitents(){
    if(frameCount % 70 === 0){
        var paitent = createSprite(random(1, 8), 0);

        paitent.velocityY = (10);
        paitent.velocityX = (random(-2,2) * 1);

        var rand = Math.round(random(1, 3));
        switch(rand) {
          case 1: paitent.addImage(person1Img);            

                  paitent.scale = 0.17;
                  break;

          case 2: paitent.addImage(person2Img);                

                  paitent.scale = 0.17;  
                  break;

          case 3: paitent.addImage(person3Img);

                  paitent.scale = 0.17;
                  break;

          default: break;
        }
        paitent.x = Math.round(random(200, windowWidth - 200));
        paitent.lifetime = 200;

        paitent.depth = g.depth;
        g.depth = g.depth + 1;

        paitentGroup.add(paitent);

        paitentCount++;
    }
}

function spawnObstacles(){
    if(frameCount % 100 === 0){
        var obstacle = createSprite(400, 0);

        obstacle.velocityY = 10;  

        var rand = Math.round(random(1, 2));
        switch(rand) {
          case 1: obstacle.addImage(potholeImg);
                   
                  obstacle.scale = 0.32;
                  obstacle.setCollider("circle", 0, 0, obstacle.width/2-30);
                break;

          case 2: obstacle.addImage(barrierImg);
                
                  obstacle.scale = 0.5; 
                break;

          default: break;
        }
        obstacle.x = Math.round(random(200, windowWidth - 200));
        obstacle.lifetime = 200;

        obstacle.depth = g.depth;
        g.depth = g.depth + 1;
    

        obstacleGroup.add(obstacle);
        obstacleCount++;
    }
}

function detectPaitent(){
    for(var i =0; i<paitentCount; i++){
        var currentP = paitentGroup.get(i);

        if(currentP !== undefined){
            if(currentP.isTouching(g)){
                paitentCollected++;
                paitentGroup.remove(currentP);

                paitentCount--;
                currentP.destroy();

                console.log("congrats"+paitentCollected);
            }else if(currentP.y>windowHeight+30){
                paitentMissed++;
                paitentGroup.remove(currentP);

                paitentCount--;
                currentP.destroy();

                console.log("Alas"+paitentMissed);
            }
        }
    }
}

function detectObstacle(){
    if(obstacleGroup.isTouching(g)){
        gameState = 1;
        a.velocityY = 0;

        obstacleGroup.setVelocityYEach(0);
        paitentGroup.setVelocityYEach(0);

        obstacleGroup.setLifetimeEach(-1);
        paitentGroup.setLifetimeEach(-1);

        g.setVelocity(0,0);
    }
}

function endGame(){
    if(minn<0){
        gameState = 1;
        a.velocityY = 0;

        obstacleGroup.setVelocityYEach(0);
        paitentGroup.setVelocityYEach(0);

        obstacleGroup.setLifetimeEach(-1);
        paitentGroup.setLifetimeEach(-1);

        g.setVelocity(0,0);
    }
}

function reset(){
    gameState = 0;
    restart.visible = false;

    obstacleGroup.destroyEach();
    paitentGroup.destroyEach();

    paitentCollected = 0;

    a.velocityY = 10;
    g.x = 742;

    minn = 0;
    sec = 60;
}