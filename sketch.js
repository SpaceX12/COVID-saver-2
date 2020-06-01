var carImg, person1Img, person2Img, person3Img, potholeImg, barrierImg, roadImg;

var paitentGroup, obstacleGroup;

function preload(){
    carImg = loadImage("Images/Ambulance.png");
    person1Img = loadImage("Images/patient1.png");
    person2Img = loadImage("Images/patient2.png");
    person3Img = loadImage("Images/patient3.png");
    potholeImg = loadImage("Images/pthhole.png");
    barrierImg = loadImage("Images/Barrier.png");
    roadImg = loadImage("Images/Road.PNG");
}

function setup(){
    canvas = createCanvas(displayWidth - 7, displayHeight - 107);
    a = createSprite(displayWidth/2, displayHeight/2);
    a.addImage(roadImg);
    a.y = -2950;
    console.log(displayHeight);
    //a.debug = true;
    a.scale = 4.5;
    console.log(a.height);
    
    a.velocityY = 10;

    /*b.debug = true;

    c.debug = true;

    d.debug = true;*/    

    g = createSprite(500, 575);
    g.addImage(carImg);

    //g.debug = true;
    //g.scale = 0.7;
    g.setCollider("rectangle", 0, 0, g.width-70, g.height-36);

    paitentGroup = createGroup();
    obstacleGroup = createGroup();
}

function draw(){
    background(0);

    //console.log(a.y);

    if(a.y>0){
        a.y = -2800;
    }

    if(keyDown(RIGHT_ARROW)){
        g.velocityX = 10;
    }else{
        g.velocityX = 0;
    }

    if(keyIsDown(LEFT_ARROW)){
        g.velocityX = -10;
    }else{
        g.velocityX = 0;
    }
    
    spawnPaitents();
    spawnObstacles();

    drawSprites();
}

function spawnPaitents(){
    if(frameCount % 70 === 0){
        var paitent = createSprite(210, 0);

        paitent.velocityY = 10;

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
        paitent.x = Math.round(random(displayWidth - 1780, displayWidth - 115));
        paitent.lifetime = 300;

        paitent.depth = g.depth;
        g.depth = g.depth + 1;

        paitentGroup.add(paitent);
    }
}

function spawnObstacles(){
    if(frameCount % 70 === 0){
        var obstacle = createSprite(400, 0);

        obstacle.velocityY = 10;

        var rand = Math.round(random(1, 2));
        switch(rand) {
          case 1: obstacle.addImage(potholeImg);
                   //e.debug = true;
                  obstacle.scale = 0.32;
                  obstacle.setCollider("circle", 0, 0, obstacle.width/2-30);
                break;

          case 2: obstacle.addImage(barrierImg);
                  //f.debug = true;
                  obstacle.scale = 0.5; 
                break;

          default: break;
        }
        obstacle.x = Math.round(random(displayWidth - 1780, displayWidth - 115));
        obstacle.lifetime = 300;

        obstacle.depth = g.depth;
        g.depth = g.depth + 1;
    

        obstacleGroup.add(obstacle);
    }
}