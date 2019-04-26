// Game Setup

function preload() {/*
    soundSrc["soundtrack"] = loadSound('Asset/Music/Ambient/Shadowlands 3 - Machine.mp3');
    soundSrc["soundtrack1"] = loadSound('Asset/Music/Combat/Mistake the Getaway.mp3')
    soundSrc["soundtrack2"] = loadSound('Asset/Music/Other/Serpentine Trek.mp3')
    soundSrc["footstep"] = loadSound('Asset/Sound/Walking/footstep00.ogg')
    soundSrc["footstep2"] = loadSound('Asset/Sound/Walking/footstep01.ogg')
    soundSrc["footstep3"] = loadSound('Asset/Sound/Walking/footstep02.ogg')
    soundSrc["footstep4"] = loadSound('Asset/Sound/Walking/footstep03.ogg')
    soundSrc["footstep5"] = loadSound('Asset/Sound/Walking/footstep04.ogg')
    soundSrc["footstep6"] = loadSound('Asset/Sound/Walking/footstep05.ogg')
    soundSrc["footstep7"] = loadSound('Asset/Sound/Walking/footstep06.ogg')
    soundSrc["footstep8"] = loadSound('Asset/Sound/Walking/footstep07.ogg')
    soundSrc["footstep9"] = loadSound('Asset/Sound/Walking/footstep08.ogg')
    soundSrc["footstep10"] = loadSound('Asset/Sound/Walking/footstep09.ogg')
    soundSrc["playerattack"] = loadSound('Asset/Sound/Player/Player_Attack.mp3')
    soundSrc["ambience"] = loadSound('Asset/Sound/Zombie/Zombie_Ambience (1).wav')
    soundSrc["ambience2"] = loadSound('Asset/Sound/Zombie/Zombie_Ambience (2).wav')
    soundSrc["ambienc3"] = loadSound('Asset/Sound/Zombie/Zombie_Ambience (3).wav')
    soundSrc["zombiedeath1"] = loadSound('Asset/Sound/Zombie/Zombie_Death.wav')
    soundSrc["zombiedeath2"] = loadSound('Asset/Sound/Zombie/Zombie_Death1.wav')
    soundSrc["grunt"] = loadSound('Asset/Sound/Zombie/Zombie_Grunt.wav')
    soundSrc["zombiesound1"] = loadSound('Asset/Sound/Zombie/Zombies Sound Effects Pack/ZOMBIE SOUNDZ (2).wav')
    soundSrc["zombiesound2"] = loadSound('Asset/Sound/Zombie/Zombies Sound Effects Pack/ZOMBIE SOUNDZ (3).wav')
    soundSrc["zombiesound3"] = loadSound('Asset/Sound/Zombie/Zombies Sound Effects Pack/ZOMBIE SOUNDZ (5).wav')
    soundSrc["zombiesound4"] = loadSound('Asset/Sound/Zombie/Zombies Sound Effects Pack/ZOMBIE SOUNDZ (6).wav')
    soundSrc["zombiesound5"] = loadSound('Asset/Sound/Zombie/Zombies Sound Effects Pack/ZOMBIE SOUNDZ (9).wav')
    soundSrc["zombiesound6"] = loadSound('Asset/Sound/Zombie/Zombies Sound Effects Pack/ZOMBIE SOUNDZ (10).wav')
    soundSrc["zombiesound7"] = loadSound('Asset/Sound/Zombie/Zombies Sound Effects Pack/ZOMBIE SOUNDZ (11).wav')
    soundSrc["zombiesound8"] = loadSound('Asset/Sound/Zombie/Zombies Sound Effects Pack/ZOMBIE SOUNDZ (12).wav')
    soundSrc["zombiesound9"] = loadSound('Asset/Sound/Zombie/Zombies Sound Effects Pack/ZOMBIE SOUNDZ (13).wav')
    soundSrc["zombiesound10"] = loadSound('Asset/Sound/Zombie/Zombies Sound Effects Pack/ZOMBIE SOUNDZ (14).wav')
    soundSrc["zombiesound11"] = loadSound('Asset/Sound/Zombie/Zombies Sound Effects Pack/ZOMBIE SOUNDZ (15).wav')
    soundSrc["zombiesound12"] = loadSound('Asset/Sound/Zombie/Zombies Sound Effects Pack/ZOMBIE SOUNDZ (16).wav')
    soundSrc["zombiesound13"] = loadSound('Asset/Sound/Zombie/Zombies Sound Effects Pack/ZOMBIE SOUNDZ (17).wav')
    soundSrc["zombiesound14"] = loadSound('Asset/Sound/Zombie/Zombies Sound Effects Pack/ZOMBIE SOUNDZ (18).wav')
    soundSrc["zombiesound15"] = loadSound('Asset/Sound/Zombie/Zombies Sound Effects Pack/ZOMBIE SOUNDZ (19).wav')
    soundSrc["zombiesound16"] = loadSound('Asset/Sound/Zombie/Zombies Sound Effects Pack/ZOMBIE SOUNDZ (20).wav')
    soundSrc["zombiesound17"] = loadSound('Asset/Sound/Zombie/Zombies Sound Effects Pack/ZOMBIE SOUNDZ (21).wav')
    soundSrc["zombiesound18"] = loadSound('Asset/Sound/Zombie/Zombies Sound Effects Pack/ZOMBIE SOUNDZ (23).wav')
    soundSrc["zombiesound19"] = loadSound('Asset/Sound/Zombie/Zombies Sound Effects Pack/ZOMBIE SOUNDZ (24).wav')
    soundSrc["zombiesound20"] = loadSound('Asset/Sound/Zombie/Zombies Sound Effects Pack/ZOMBIE SOUNDZ (25).wav')*/
    
    fontSrc["chakraPetch"] = loadFont("Asset/Font/ChakraPetch-Medium.ttf");
    fontSrc["fellEnglish"] = loadFont("Asset/Font/Fell English.ttf");
    
    imageSrc["playerWalkLeft"] = [loadImage("Asset/Image/player/walk/left/0.png"), loadImage("Asset/Image/player/walk/left/1.png"), loadImage("Asset/Image/player/walk/left/2.png"), loadImage("Asset/Image/player/walk/left/3.png"), loadImage("Asset/Image/player/walk/left/4.png"), loadImage("Asset/Image/player/walk/left/5.png"), loadImage("Asset/Image/player/walk/left/6.png"), loadImage("Asset/Image/player/walk/left/7.png")];

    imageSrc["playerWalkRight"] = [loadImage("Asset/Image/player/walk/right/0.png"), loadImage("Asset/Image/player/walk/right/1.png"), loadImage("Asset/Image/player/walk/right/2.png"), loadImage("Asset/Image/player/walk/right/3.png"), loadImage("Asset/Image/player/walk/right/4.png"), loadImage("Asset/Image/player/walk/right/5.png"), loadImage("Asset/Image/player/walk/right/6.png"), loadImage("Asset/Image/player/walk/right/7.png")];

    imageSrc["playerCrouchLeft"] = [loadImage("Asset/Image/player/crouch/left/0.png"), loadImage("Asset/Image/player/crouch/left/0.png"), loadImage("Asset/Image/player/crouch/left/1.png"), loadImage("Asset/Image/player/crouch/left/1.png"), loadImage("Asset/Image/player/crouch/left/2.png"), loadImage("Asset/Image/player/crouch/left/2.png"), loadImage("Asset/Image/player/crouch/left/3.png"), loadImage("Asset/Image/player/crouch/left/3.png"), loadImage("Asset/Image/player/crouch/left/4.png"), loadImage("Asset/Image/player/crouch/left/4.png")];

    imageSrc["playerCrouchRight"] = [loadImage("Asset/Image/player/crouch/right/0.png"), loadImage("Asset/Image/player/crouch/right/0.png"), loadImage("Asset/Image/player/crouch/right/1.png"), loadImage("Asset/Image/player/crouch/right/1.png"), loadImage("Asset/Image/player/crouch/right/2.png"), loadImage("Asset/Image/player/crouch/right/2.png"), loadImage("Asset/Image/player/crouch/right/3.png"), loadImage("Asset/Image/player/crouch/right/3.png"), loadImage("Asset/Image/player/crouch/right/4.png"), loadImage("Asset/Image/player/crouch/right/4.png")];

    imageSrc["playerIdle"] = [loadImage("Asset/Image/player/idle/0.png"), loadImage("Asset/Image/player/idle/1.png"), loadImage("Asset/Image/player/idle/2.png"), loadImage("Asset/Image/player/idle/3.png"), loadImage("Asset/Image/player/idle/4.png"), loadImage("Asset/Image/player/idle/5.png"), loadImage("Asset/Image/player/idle/6.png")];
    
    imageSrc["playerAttackLeft"] = [loadImage("Asset/Image/player/attack/left/0.png")];
    
    imageSrc["playerAttackRight"] = [loadImage("Asset/Image/player/attack/right/0.png")];
    
    imageSrc["playerDeath"] = [loadImage("Asset/Image/player/death/0.png"), loadImage("Asset/Image/player/death/1.png"), loadImage("Asset/Image/player/death/2.png"), loadImage("Asset/Image/player/death/3.png"), loadImage("Asset/Image/player/death/4.png"), loadImage("Asset/Image/player/death/5.png"), ]

    imageSrc["meleeZombieWalkLeft"] = [loadImage("Asset/Image/zombie/walk/left/0.png"), loadImage("Asset/Image/zombie/walk/left/1.png"), loadImage("Asset/Image/zombie/walk/left/2.png"), loadImage("Asset/Image/zombie/walk/left/3.png")];

    imageSrc["meleeZombieWalkRight"] = [loadImage("Asset/Image/zombie/walk/right/0.png"), loadImage("Asset/Image/zombie/walk/right/1.png"), loadImage("Asset/Image/zombie/walk/right/2.png"), loadImage("Asset/Image/zombie/walk/right/3.png")];

    imageSrc["meleeZombieIdle"] = [loadImage("Asset/Image/zombie/idle/0.png")];
    
    imageSrc["meleeZombieAttackLeft"] = [loadImage("Asset/Image/zombie/attack/left/0.png"), loadImage("Asset/Image/zombie/attack/left/0.png"), loadImage("Asset/Image/zombie/attack/left/1.png"), loadImage("Asset/Image/zombie/attack/left/1.png"), loadImage("Asset/Image/zombie/attack/left/2.png"), loadImage("Asset/Image/zombie/attack/left/2.png")];
    
    imageSrc["meleeZombieAttackRight"] = [loadImage("Asset/Image/zombie/attack/right/0.png"), loadImage("Asset/Image/zombie/attack/right/0.png"), loadImage("Asset/Image/zombie/attack/right/1.png"), loadImage("Asset/Image/zombie/attack/right/1.png"), loadImage("Asset/Image/zombie/attack/right/2.png"), loadImage("Asset/Image/zombie/attack/right/2.png")]
    
    imageSrc["meleeZombieDeath"] = [loadImage("Asset/Image/zombie/death/0.png"), loadImage("Asset/Image/zombie/death/1.png"), loadImage("Asset/Image/zombie/death/2.png"), loadImage("Asset/Image/zombie/death/3.png"), loadImage("Asset/Image/zombie/death/4.png"), loadImage("Asset/Image/zombie/death/5.png"), loadImage("Asset/Image/zombie/death/6.png"), loadImage("Asset/Image/zombie/death/7.png"), loadImage("Asset/Image/zombie/death/8.png"), loadImage("Asset/Image/zombie/death/9.png"), loadImage("Asset/Image/zombie/death/10.png"), ]

    imageSrc["cobblestoneHorizontal"] = loadImage("Asset/Image/miscellaneous/cobblestone.png");
    imageSrc["cobblestoneVertical"] = loadImage("Asset/Image/miscellaneous/cobblestone.png");
    imageSrc["woodHorizontal"] = loadImage("Asset/Image/miscellaneous/wood.png");
    imageSrc["woodVertical"] = loadImage("Asset/Image/miscellaneous/wood.png");
    imageSrc["rosebushHorizontal"] = loadImage("Asset/Image/miscellaneous/rosebush.png");
    imageSrc["rosebushVertical"] = loadImage("Asset/Image/miscellaneous/rosebushVertical.png");
    //imageSrc["roadHorizontal"] = loadImage("Asset/Image/miscellaneous/Mossy & Cracked Road.png");
    //imageSrc["roadVertical"] = loadImage("Asset/Image/miscellaneous/Mossy & Cracked Road Vertical.png");

    //imageSrc["tree"] = [loadImage("Asset/Image/miscellaneous/tree/0.png"), loadImage("Asset/Image/miscellaneous/tree/1.png"), loadImage("Asset/Image/miscellaneous/tree/2.png"), loadImage("Asset/Image/miscellaneous/tree/3.png"), loadImage("Asset/Image/miscellaneous/tree/4.png"), loadImage("Asset/Image/miscellaneous/tree/5.png"), loadImage("Asset/Image/miscellaneous/tree/6.png"), loadImage("Asset/Image/miscellaneous/tree/7.png"), loadImage("Asset/Image/miscellaneous/tree/8.png"), loadImage("Asset/Image/miscellaneous/tree/9.png"), loadImage("Asset/Image/miscellaneous/tree/10.png"), loadImage("Asset/Image/miscellaneous/tree/11.png"), loadImage("Asset/Image/miscellaneous/tree/12.png"), loadImage("Asset/Image/miscellaneous/tree/13.png"), loadImage("Asset/Image/miscellaneous/tree/14.png"), loadImage("Asset/Image/miscellaneous/tree/15.png"), loadImage("Asset/Image/miscellaneous/tree/16.png"), loadImage("Asset/Image/miscellaneous/tree/17.png"), loadImage("Asset/Image/miscellaneous/tree/18.png")];

    imageSrc["hitmarker"] = [loadImage("Asset/Image/miscellaneous/hitmarker/0.png"), loadImage("Asset/Image/miscellaneous/hitmarker/1.png")];

    imageSrc["wardrobeClose"] = loadImage("Asset/Image/miscellaneous/wardrobe/close/0.png");
    imageSrc["wardrobeOpen"] = loadImage("Asset/Image/miscellaneous/wardrobe/open/0.png");
    imageSrc["titlescreen"] = loadImage("Asset/Image/miscellaneous/titlescreen.png");
    imageSrc["titlescreenHover"] = loadImage("Asset/Image/miscellaneous/titlescreenHover.png");
}

function setup() {
    canvas = createCanvas(800, 600);
    var offsetX = (windowWidth - width) /2;
    var offsetY = (windowHeight - height) / 2;
    canvas.position(offsetX, offsetY);
    //soundSrc["soundtrack"].play();
    
    areas = [];
    soundWaves = [];
    projectiles = [];
    
    restartRadiusc = findHypotenuse(width/2, height/2);
    restartSeparateX = 0;
    
    addGameContent();
}


// Main Loop

function draw() {
    if(gameActive){
        translate(cameraX, cameraY);
        background("green");
        noStroke();
        fill("#727472");
        rect(0, 0, 2590, 350);
        
        for(var area of areas){
            areas[player.areaId].show();
        }
        
        for(var area of areas){
            if(collideRectRect(-cameraX, -cameraY, width, height, area.x, area.y, area.width, area.height)){
                for(var room of area.rooms){
                    room.show();
                }
            }
        }
        
        for(var area of areas){
            if(collideRectRect(-cameraX, -cameraY, width, height, area.x, area.y, area.width, area.height)){
                for(var current of area.zombies){
                    current.showThreatZone();
                }
            }
        }
         
        for(var s=0, length=soundWaves.length; s<length; s++){
            var current = soundWaves[s];
            current.expandRadius();
            current.show();
            if(current.intensity/current.radius*10 < 0.1){
                soundWaves.splice(s, 1);
                s -= 1;
                length -= 1;
            }
        }
        
        for(var p=0, length=projectiles.length; p<length; p++){
            var current = projectiles[p];
            current.updateKinematic();
            
            var collision = false;
            if(!collision){
                collision = current.zombieCollision();
            }
            if(!collision){
                collision = current.wallCollision();
            }
            
            current.show();
            if(collision){
                projectiles.splice(p, 1);
                p -= 1;
                length -= 1;
            }
        }
        
        for(var area of areas){
            if(collideRectRect(-cameraX, -cameraY, width, height, area.x, area.y, area.width, area.height)){
                for(var thing of area.things){
                    thing.show();
                }
            }
        }
        
        player.areaId = findAreaId(player.x,player.y, player.areaId);
        player.roomId = findRoomId(player.x,player.y, player.areaId, player.roomId);
        player.updateKinematic();
        player.updateGun();
        player.showHpBar();
        
        if(player.death){
            var deathAnimationFinish = false;
            deathAnimationFinish = player.show();
            if(deathAnimationFinish){
                gameOverAnimation();
            }
        }
        else{
            player.show();
        }
        
        for(var area of areas){
            if(collideRectRect(-cameraX, -cameraY, width, height, area.x, area.y, area.width, area.height)){
                for(var z=0, length=area.zombies.length; z<length; z++){
                    var current = areas[player.areaId].zombies[z];
                    var deathAnimationFinish = false;
                    if(current.death){

                    }
                    else if(current.action == "motion"){
                        current.updateKinematic();
                        current.soundCollision();
                        current.threatZoneCollision();
                        current.playerCollision();
                    }
                    else if(current.action == "attack"){
                        current.type.attack(current.enemy);
                    }
                    current.showHpBar();
                    var deathAnimationFinish = current.show();
                    if(deathAnimationFinish){
                        areas[player.areaId].zombies.splice(z, 1);
                        z -= 1;
                        length -= 1;
                    }
                }
            }
        }
    }
    if(titleScreen){
        if(collidePointTriangle(mouseX, mouseY, 310, 200, 310, 430, 510, 315)){
            image(imageSrc["titlescreenHover"], 0, 0, 800, 600);    
        }
        else{
            image(imageSrc["titlescreen"], 0, 0, 800, 600);
        }
    }
    else if(gameOverScreen){
        fill(0, 55+sin(frameCount*0.05)*25);
        noStroke();
        rect(-cameraX, -cameraY, width, height);
        
        fill("white")
        stroke(3);
        stroke("black")
        textAlign(CENTER, CENTER);
        textFont(fontSrc["chakraPetch"]);
        textSize(80);
        text("Game Over", width/2-cameraX, height/3-cameraY)
        
        if(sin(frameCount*0.05) > -0.64){
            textSize(20);
            text("Press R to Restart", width/2-cameraX, height/2-cameraY); 
        }
    }
    if(restartScreen){
        if(restartRadius > 0){
            restartRadius -= restartSpeed;
            if(restartRadius <= 0){
                gameReInitiation();
            }
            else{
                noFill();
                stroke("black");
                strokeWeight(findHypotenuse(width/2, height/2) - restartRadius);
                ellipse(width/2, height/2, restartRadius, restartRadius);
            }
        }
        else{
            if(restartSeparateX < width){
                restartSeparateX += restartSpeed;
                if(restartSeparateX > width){
                    restartSeparateX = width;
                }
            }
            else if(restartSeparateY < height){
                restartSeparateY += restartSpeed;
                if(restartSeparateY >= height){
                    restartSeparateY = height;
                    restartGame();
                }
            }
            beginShape();
            vertex(0, 0);
            vertex(width/2, 0);
            vertex(width/2 - restartSeparateX/2, height - restartSeparateY);
            vertex(0, height - restartSeparateY);
            endShape();
            
            beginShape();
            vertex(width, 0);
            vertex(width/2, 0);
            vertex(width/2 + restartSeparateX/2, height - restartSeparateY);
            vertex(width, height - restartSeparateY);
            endShape();
        }
    }
}


// Support Animation

function deathAnimation() {
    gameActive = false;
    player.death = true;
    inputUp = false;
    inputDown = false; 
    inputLeft = false;
    inputRight = false;
}

function gameOverAnimation() {
    gameOverScreen = true;
}

function restartAnimation() {
    restartScreen = true;
    gameActive = false;
    inputUp = false;
    inputDown = false; 
    inputLeft = false;
    inputRight = false;
}

function gameReInitiation() {
    areas = [];
    things = [];
    soundWaves = [];
    projectiles = [];
    milestone = {};
    
    cameraX = 0;
    cameraY = -500;
    player = new Player(275, 280);
    
    gameOverScreen = false;
    addGameContent();
}

function restartGame() {
    restartScreen = false;
    gameActive = true;
    
    restartRadius = findHypotenuse(width/2, height/2);
    restartSeparateX = 0; 
}


// Player Input

function mouseClicked() {
    if(titleScreen){
        if(collidePointTriangle(mouseX, mouseY, 310, 200, 310, 430, 510, 315)){
            titleScreen = false;
            gameActive = true;
            redraw();
            gameActive = false;
            displayTutorialSpace();
        }
    }
    else if(gameActive && player.equip == "Gun"){
        if(player.gun.ammo > 0 && !player.gun.cycle){
            var differenceX = Number(player.aimX) - Number(player.barrell.x);
            var differenceY = Number(player.aimY) - Number(player.barrell.y);
            var kFactor = findProportionalFactor(differenceX, differenceY, player.gun.speed);
            var velocityX = differenceX * kFactor;
            var velocityY = differenceY * kFactor;
            //projectiles.push(new Projectile(player.barrell.x, player.barrell.y, velocityX, velocityY, player.gun.damage, "player", player.areaId));
            projectiles.push(new Projectile(player.x+player.width/2, player.y+player.height/2, velocityX, velocityY, player.gun.damage, "player", player.areaId));
            //player.gun.ammo -= 1;
            player.gun.cycle = true;
            setTimeout(function(){
                player.gun.cycle = false;  
            }, player.gun.ROF*1000);
            soundWaves.push(new soundWave(player.x+20, player.y+25, 40, 1, player.areaId, player.roomId));
        }
    }
}

function keyPressed() {
    if(gameActive){
        // W Key
        if(keyCode == 87){
            inputUp = true;
            player.animationStep = 0;
        }
        // A Key
        else if(keyCode == 65){
            inputLeft = true; 
            player.animationStep = 0;
        }
        // S Key
        else if(keyCode == 83){
            inputDown = true;
            player.animationStep = 0;
        }
        // D Key
        else if(keyCode == 68){
            inputRight = true;        
            player.animationStep = 0;
        }
        // E Key
        else if(keyCode == 69){
            for(var thing of areas[player.areaId].things) {
                if(collideRectCircle(thing.x, thing.y, thing.width, thing.height, player.x+player.width/2, player.y+player.height/2, 100)){
                    thing.interact();
                }
            }
        }
        // Shift Key
        else if(keyCode == 16){
            player.sneaking = true;
            player.animationStep = 0;
        } 
    }
    // R Key
    else if(keyCode == 82 && gameOverScreen){
        restartGame();
    }
}

function keyReleased() {
    if(gameActive){
        // W Key
        if(keyCode == 87){
            inputUp = false;
        }
        // A Key
        else if(keyCode == 65){
            inputLeft = false;
        }
        // S Key
        else if(keyCode == 83){
            inputDown = false;
        }
        // D Key
        else if(keyCode == 68){
            inputRight = false;
        }
        // Shift Key
        else if(keyCode == 16){
            player.sneaking = false;
        }
    }
}

function windowResized() {
    var offsetX = 0;
    var offsetY = 0;
    if(windowWidth > width){
        offsetX = (windowWidth - width) / 2;
    }
    if(windowHeight > height){
        offsetY = (windowHeight - height) / 2;
    }
    canvas.position(offsetX, offsetY);
}