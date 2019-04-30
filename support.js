// Player Constructor

function Player(){
    this.width = 51;
    this.height = 90;
    this.x = width/2 - this.width/2 - cameraX;
    this.y = height/2 - this.height/2 - cameraY;
    this.hp = 100; 
    this.maxHp = 100;
    this.equip = "Gun";
    this.aimX = 0;
    this.aimY = 0;
    this.speed = 5;
    this.motion = false;
    this.sneaking = false;
    this.sneakModifier = 0.5;
    this.gun = {
        tag: "ThornSpiker",
        damage: 4,
        speed: 25,
        ammo: 12,
        ammoMax: 12,
        ROF: 0.12,
        cycle: false,
        reloadSpeed: 2.5,
    };
    this.barrell = {
        x: 0,
        y: 0,
    };
    this.areaId = 0;
    this.roomId = null; 
    this.frameUpdate = 3; 
    this.animationStep = 0;
    this.direction = "right";
    this.death = false;
    
    this.areaId = findAreaId(this.x+this.width/2, this.y+this.height/2, this.areaId);
    this.roomId = findRoomId(this.x+this.width/2, this.y+this.height/2, this.areaId, this.roomId);
}
Player.prototype.updateGun = function(){
    this.aimX = mouseX - cameraX;
    this.aimY = mouseY - cameraY;
    var gunChangeX = this.aimX - (width/2 - cameraX);
    var gunChangeY = this.aimY - (height/2 - cameraY);
    var pvGun1 = Math.sqrt(Math.pow(45, 2)/(Math.pow(gunChangeX, 2)+Math.pow(gunChangeY, 2)));
    //var pvGun2 = Math.sqrt(Math.pow(5, 2)/(Math.pow(gunChangeX, 2)+Math.pow(gunChangeY, 2)));
    //var pvGun3 = Math.sqrt(Math.pow(20, 2)/(Math.pow(gunChangeX, 2)+Math.pow(gunChangeY, 2)));
    
    this.barrell.x = (width/2 - cameraX) + this.width/2 + (gunChangeX*pvGun1);
    this.barrell.y = (height/2 - cameraY) + this.height/2 + (gunChangeY*pvGun1);
}
Player.prototype.showGun = function(){
    this.aimX = mouseX - cameraX;
    this.aimY = mouseY - cameraY;
    var gunChangeX = this.aimX - (width/2 - cameraX);
    var gunChangeY = this.aimY - (height/2 - cameraY);
    var pvGun1 = Math.sqrt(Math.pow(45, 2)/(Math.pow(gunChangeX, 2)+Math.pow(gunChangeY, 2)));
    var pvGun2 = Math.sqrt(Math.pow(5, 2)/(Math.pow(gunChangeX, 2)+Math.pow(gunChangeY, 2)));
    var pvGun3 = Math.sqrt(Math.pow(20, 2)/(Math.pow(gunChangeX, 2)+Math.pow(gunChangeY, 2)));
    
    stroke("red");
    stroke(255, 0, 0);
    strokeWeight(9);
    strokeCap(SQUARE);
    line((width/2 - cameraX)-(gunChangeX*pvGun2), (height/2 - cameraY)-(gunChangeY*pvGun2), (width/2 - cameraX)+(gunChangeX*pvGun1), (height/2 - cameraY)+(gunChangeY*pvGun1));
    line((width/2 - cameraX)-(gunChangeX*pvGun3), (height/2 - cameraY)+5-(gunChangeY*pvGun3), (width/2 - cameraX)+(gunChangeX*pvGun2), (height/2 - cameraY)+5 +(gunChangeY*pvGun2));
}
Player.prototype.updateKinematic = function(){
    this.motion = false;
    if(inputUp || inputDown || inputLeft || inputRight){
        var speedX = 0;
        var speedY = 0;

        var speedModifier = 1;
        if(this.sneaking){
            speedModifier *= this.sneakModifier;
        }
        var movementSpeed = this.speed * speedModifier;

        if(inputUp){
            speedY -= movementSpeed;
        }
        if(inputLeft){
            speedX -= movementSpeed;
        }
        if(inputDown){
            speedY += movementSpeed;
        }
        if(inputRight){
            speedX += movementSpeed;
        }
        
        if(Math.abs(speedX) > 0.5){
            if(speedX < 0){
                this.direction = "left";
            }
            else{
                this.direction = "right";
            }
        }

        var kFactor = findProportionalFactor(speedX, speedY, movementSpeed);
        var velocityX = speedX * kFactor;
        var velocityY = speedY * kFactor;

        var collision = this.wallCollision(velocityX, velocityY);

        if(collision.x || collision.y){
            if(collision.x){
                velocityX = 0;
            }
            if(collision.y){
                velocityY = 0;
            }
            //wall Sound;
        }
        else{
            collision = this.thingCollision(velocityX, velocityY);
            if(collision.x || collision.y){
                if(collision.x){
                    velocityX = 0;
                }
                if(collision.y){
                    velocityY = 0;
                }
                //wall Sound;
            }
        }

        if(speedX != 0 || speedY != 0){
            if((this.animationStep == 0 || this.animationStep == Math.floor(imageSrc[this.getAnimationLabel()].length)/2) && frameCount % this.frameUpdate == 0){
                soundWaves.push(new soundWave(this.x+this.width/2, this.y+this.height/2, this.sneakModifier*randomNumber(15,25), 1, this.areaId, this.roomId));
            }
            this.motion = true;
        }

        cameraX -= velocityX;
        cameraY -= velocityY;
    }
    this.x = width/2 - this.width/2 - cameraX;
    this.y = height/2 - this.height/2 - cameraY;
}
Player.prototype.thingCollision = function(velocityX, velocityY){
    var collision = {
        x: false,
        y: false,
    }
    var area = areas[this.areaId];
    for(var thing of area.things){
        if(collideRectRect(this.x+velocityX, this.y+this.height*4/5+velocityY, this.width, this.height/5, thing.x, thing.y, thing.width, thing.height)){
            if(collideRectRect(this.x, this.y+this.height*4/5+velocityY, this.width, this.height/5, thing.x, thing.y, thing.width, thing.height)){
                collision.y = true;
            }
            if(collideRectRect(this.x+velocityX, this.y+this.height*4/5, this.width, this.height/5, thing.x, thing.y, thing.width, thing.height)){
                collision.x = true;
            }
            if(!collision.x && !collision.y){
                if(Math.abs(velocityX) > Math.abs(velocityY)){
                    collision.y = true;
                }
                else{
                    collision.x = true;
                }
            }
        }
    }
    return collision;a
}
Player.prototype.wallCollision = function(velocityX, velocityY){
    var collision = {
        x: false,
        y: false,
    }
    if(this.roomId == null){
        var area = areas[this.areaId];
        for(var direction in area.blocks){
            for(var block of area.blocks[direction]){
                if(collideRectRect(this.x, this.y+velocityY, this.width, this.height, block.x, block.y, block.blockSize, block.blockSize)){
                    collision.y = true;
                }
                if(collideRectRect(this.x+velocityX, this.y, this.width, this.height, block.x, block.y, block.blockSize, block.blockSize)){
                    collision.x = true;
                }
            }
        }

        for(var entrance of area.entrances){
            if(entrance.requirement != null && collideRectRect(this.x+velocityX, this.y+velocityY, this.width, this.height, entrance.x-entrance.width/2, entrance.y-entrance.height/2, entrance.width, entrance.height)){
                for(var block of entrance.blocks){
                    if(collideRectRect(this.x, this.y+velocityY, this.width, this.height, block.x, block.y, block.blockSize, block.blockSize)){
                        collision.y = true;
                    }
                    if(collideRectRect(this.x+velocityX, this.y, this.width, this.height, block.x, block.y, block.blockSize, block.blockSize)){
                        collision.x = true;
                    }
                }
            }
        }

        for(var room of area.rooms){
            if(collideRectRect(this.x+velocityX, this.y+velocityY, this.width, this.height, room.x, room.y, room.width, room.height)){
                for(var direction in room.blocks){
                    for(var block of room.blocks[direction]){
                        if(collideRectRect(this.x, this.y+velocityY, this.width, this.height, block.x, block.y, block.blockSize, block.blockSize)){
                            collision.y = true;
                        }
                        if(collideRectRect(this.x+velocityX, this.y, this.width, this.height, block.x, block.y, block.blockSize, block.blockSize)){
                            collision.x = true;
                        }
                    }
                }
            }
        }
    }
    else{
        var room = areas[this.areaId].rooms[this.roomId];
        if(collideRectRect(this.x+velocityX, this.y+velocityY, this.width, this.height, room.x, room.y, room.width, room.height)){
            for(var direction in room.blocks){
                for(var block of room.blocks[direction]){
                    if(collideRectRect(this.x, this.y+velocityY, this.width, this.height, block.x, block.y, block.blockSize, block.blockSize)){
                        collision.y = true;
                    }
                    if(collideRectRect(this.x+velocityX, this.y, this.width, this.height, block.x, block.y, block.blockSize, block.blockSize)){
                        collision.x = true;
                    }
                }
            }
        }
    }
    return collision;
}
Player.prototype.getAnimationLabel = function(){
    if(this.death || this.death == null){
        return "playerDeath";
    }
    else if(!this.motion){
        return "playerIdle";
    }
    else{
        var movementType = "Walk";
        if(this.sneaking){
            movementType = "Crouch";
        }
        var movementDirection = capitalize(this.direction);
        return ("player" + movementType + movementDirection);
    }
}
Player.prototype.showHpBar = function(){
    var hpWidth = map(this.hp, 0, this.maxHp, 0, this.width);
    if(hpWidth < 0){
        hpWidth = 0;
    }
    fill(255, 100);
    stroke("black");
    strokeWeight(2);
    rect(this.x, this.y-10, this.width, 5);
    fill("green");
    rect(this.x, this.y-10, hpWidth, 5);
}
Player.prototype.show = function(){
    if(frameCount % this.frameUpdate == 0){
        this.animationStep += 1;
    }
    var animationLabel = this.getAnimationLabel();
    if(this.death && this.animationStep >= imageSrc[animationLabel].length){
        return true;
    }
    else if(this.death == null && this.animationStep >= imageSrc[animationLabel].length-1){
        this.animationStep = imageSrc[animationLabel].length-1;
    }
    else if(this.animationStep >= imageSrc[animationLabel].length){
        this.animationStep = 0;
    }
    image(imageSrc[animationLabel][this.animationStep], this.x, this.y, this.width, this.height);
}

// Area Constructor

function Area(x, y, blockX, blockY, blockSize, areaId, areaName){
    this.x = x;
    this.y = y;
    this.blockX = blockX;
    this.blockY = blockY;
    this.blockSize = blockSize;
    this.width = blockX * blockSize;
    this.height = blockY * blockSize;
    this.areaId = areaId;
    this.areaName = areaName;
    this.blocks = {
        top: [],
        left: [],
        bottom: [],
        right: [],
    };
    this.entrances = [];
    this.rooms = [];
    this.zombies = [];
    this.things = [];
    
    this.roomToBlocks();
}
Area.prototype.roomToBlocks = function(){
    //top wall
    for(var x=0; x<this.blockX; x++){
        this.blocks.top.push(new Block(this.x + x*this.blockSize, this.y, this.blockSize, "top", "rosebush"));
    }
    //left wall
    for(var y=0; y<this.blockY; y++){
        this.blocks.left.push(new Block(this.x, this.y + y*this.blockSize, this.blockSize, "left", "rosebush"));
    }
    //bottom wall
    for(var x=0; x<this.blockX; x++){
        this.blocks.bottom.push(new Block(this.x + x*this.blockSize, this.y + this.height - this.blockSize, this.blockSize, "bottom", "rosebush"));
    }
    //right wall
    for(var y=0; y<this.blockY; y++){
        this.blocks.right.push(new Block(this.x + this.width - this.blockSize, this.y + y*this.blockSize, this.blockSize, "right", "rosebush"));
    }
}
Area.prototype.addEntrance = function(wallDirection, blockCoordinate, exitId, requiredMilestone){
    if(wallDirection == "top"){
        var entranceX = this.x + blockCoordinate * this.blockSize;
        var entranceY = this.y + this.blockSize/2;
        var width = this.blockSize*5;
        var height = this.blockSize;
    }
    else if(wallDirection == "left"){
        var entranceX = this.x + this.blockSize/2
        var entranceY = this.y + blockCoordinate * this.blockSize;
        var width = this.blockSize;
        var height = this.blockSize*5;
    }
    else if(wallDirection == "bottom"){
        var entranceX = this.x + blockCoordinate * this.blockSize;
        var entranceY = this.y + this.height - this.blockSize/2;
        var width = this.blockSize*5;
        var height = this.blockSize;
    }
    else if(wallDirection == "right"){
        var entranceX = this.x + this.width - this.blockSize/2
        var entranceY = this.y + blockCoordinate * this.blockSize;
        var width = this.blockSize;
        var height = this.blockSize*5;
    }   
    this.entrances.push(new Entrance(entranceX, entranceY, width, height, wallDirection, exitId, "area"));
    this.entrances[this.entrances.length-1].requirement = requiredMilestone;
    this.replaceEntranceBlocks(this.entrances[this.entrances.length-1]);
}
Area.prototype.replaceEntranceBlocks = function(entrance){
    //top wall
    if(entrance.wallDirection == "top"){
        var currentBlocks = this.blocks.top;
        for(var x=0, length=this.blockX; x<length; x++){
            var currentBlock = currentBlocks[x];
            if(collideRectRect(entrance.x-entrance.width/2, entrance.y-entrance.height/2, entrance.width, entrance.height, currentBlock.x, currentBlock.y, currentBlock.blockSize, currentBlock.blockSize)){
                entrance.blocks.push(new Block(currentBlock.x, currentBlock.y, currentBlock.blockSize, currentBlock.wallDirection, "wood"));
                currentBlocks.splice(x, 1);
                x -= 1;
                length -= 1;
            }
        }
    }
    
    //left wall
    else if(entrance.wallDirection == "left"){
        var currentBlocks = this.blocks.left;
        for(var y=0, length=this.blockY; y<length; y++){
            var currentBlock = currentBlocks[y];
            if(collideRectRect(entrance.x-entrance.width/2, entrance.y-entrance.height/2, entrance.width, entrance.height, currentBlock.x, currentBlock.y, currentBlock.blockSize, currentBlock.blockSize)){
                entrance.blocks.push(new Block(currentBlock.x, currentBlock.y, currentBlock.blockSize, currentBlock.wallDirection, "wood"));
                currentBlocks.splice(y, 1);
                y -= 1;
                length -= 1;
            }
        }
    }
    //bottom wall
    else if(entrance.wallDirection == "bottom"){
        var currentBlocks = this.blocks.bottom;
        for(var x=0, length=this.blockX; x<length; x++){
            var currentBlock = currentBlocks[x];
            if(collideRectRect(entrance.x-entrance.width/2, entrance.y-entrance.height/2, entrance.width, entrance.height, currentBlock.x, currentBlock.y, currentBlock.blockSize, currentBlock.blockSize)){
                entrance.blocks.push(new Block(currentBlock.x, currentBlock.y, currentBlock.blockSize, currentBlock.wallDirection, "wood"));
                currentBlocks.splice(x, 1);
                x -= 1;
                length -= 1;
            }
        }
    }
    //right wall
    if(entrance.wallDirection == "right"){
        var currentBlocks = this.blocks.right;
        for(var y=0, length=this.blockY; y<length; y++){
            var currentBlock = currentBlocks[y];
            if(collideRectRect(entrance.x-entrance.width/2, entrance.y-entrance.height/2, entrance.width, entrance.height, currentBlock.x, currentBlock.y, currentBlock.blockSize, currentBlock.blockSize)){
                entrance.blocks.push(new Block(currentBlock.x, currentBlock.y, currentBlock.blockSize, currentBlock.wallDirection, "wood"));
                currentBlocks.splice(y, 1);
                y -= 1;
                length -= 1;
            }
        }
    }
}
Area.prototype.show = function(){
    if(collideRectRect(-cameraX, -cameraY, width, height, this.x, this.y, this.width, this.height)){
        for(var direction in this.blocks){
            for(var block of this.blocks[direction]){
                if(collideRectRect(-cameraX, -cameraY, width, height, block.x, block.y, block.blockSize, block.blockSize)){
                    block.show();
                }
            }
        }
        for(entrance of this.entrances){
            entrance.show();
        }
    }
}

function Room(x, y, blockX, blockY, blockSize, areaId, roomId, roomName){
    this.x = x;
    this.y = y;
    this.blockX = blockX;
    this.blockY = blockY;
    this.blockSize = blockSize;
    this.areaId = areaId;
    this.roomId = roomId;
    this.roomName = roomName;
    this.width = blockX * blockSize;
    this.height = blockY * blockSize;
    this.blocks = {
        top: [],
        left: [],
        bottom: [],
        right: [],
    };
    this.entrances = [];
    this.roomToBlocks();
}
Room.prototype.roomToBlocks = function(){
    //top wall
    for(var x=0; x<this.blockX; x++){
        this.blocks.top.push(new Block(this.x + x*this.blockSize, this.y, this.blockSize, "top", "cobblestone"));
    }
    //left wall
    for(var y=0; y<this.blockY; y++){
        this.blocks.left.push(new Block(this.x, this.y + y*this.blockSize, this.blockSize, "left", "cobblestone"));
    }
    //bottom wall
    for(var x=0; x<this.blockX; x++){
        this.blocks.bottom.push(new Block(this.x + x*this.blockSize, this.y + this.height - this.blockSize, this.blockSize, "bottom", "cobblestone"));
    }
    //right wall
    for(var y=0; y<this.blockY; y++){
        this.blocks.right.push(new Block(this.x + this.width - this.blockSize, this.y + y*this.blockSize, this.blockSize, "right", "cobblestone"));
    }
}
Room.prototype.addEntrance = function(wallDirection, exitId){
    if(wallDirection == "top"){
        var entranceX = this.x + (Math.floor(Math.random()*(this.blockX-10))+5) * this.blockSize;
        var entranceY =this.y + this.blockSize/2;
        var width = this.blockSize*4;
        var height = this.blockSize;
    }
    else if(wallDirection == "left"){
        var entranceX = this.x + this.blockSize/2
        var entranceY = this.y + (Math.floor(Math.random()*(this.blockX-10))+5) * this.blockSize;
        var width = this.blockSize;
        var height = this.blockSize*4;
    }
    else if(wallDirection == "bottom"){
        var entranceX = this.x + (Math.floor(Math.random()*(this.blockX-10))+5) * this.blockSize;
        var entranceY = this.y + this.height - this.blockSize/2;
        var width = this.blockSize*4;
        var height = this.blockSize;
    }
    else if(wallDirection == "right"){
        var entranceX = this.x + this.width - this.blockSize/2
        var entranceY = this.y + (Math.floor(Math.random()*(this.blockX-10))+5) * this.blockSize;
        var width = this.blockSize;
        var height = this.blockSize*4;
    }   
    //console.log(areas)
    this.entrances.push(new Entrance(entranceX, entranceY, width, height, wallDirection, exitId, "room"));
    areas[this.areaId].entrances.push(new Entrance(entranceX, entranceY, width, height, null, this.roomId, "room"));
    this.removeEntranceBlocks(this.entrances[this.entrances.length-1]);
}
Room.prototype.removeEntranceBlocks = function(entrance){
    //top wall
    if(entrance.wallDirection == "top"){
        var currentBlocks = this.blocks.top;
        for(var x=0, length=this.blockX; x<length; x++){
            var currentBlock = currentBlocks[x];
            if(collideRectRect(entrance.x-entrance.width/2, entrance.y-entrance.height/2, entrance.width, entrance.height, currentBlock.x, currentBlock.y, currentBlock.blockSize, currentBlock.blockSize)){
                currentBlocks.splice(x, 1);
                x -= 1;
                length -= 1;
            }
        }
    }
    //left wall
    else if(entrance.wallDirection == "left"){
        var currentBlocks = this.blocks.left;
        for(var y=0, length=this.blockY; y<length; y++){
            var currentBlock = currentBlocks[y];
            if(collideRectRect(entrance.x-entrance.width/2, entrance.y-entrance.height/2, entrance.width, entrance.height, currentBlock.x, currentBlock.y, currentBlock.blockSize, currentBlock.blockSize)){
                currentBlocks.splice(y, 1);
                y -= 1;
                length -= 1;
            }
        }
    }
    //bottom wall
    else if(entrance.wallDirection == "bottom"){
        var currentBlocks = this.blocks.bottom;
        for(var x=0, length=this.blockX; x<length; x++){
            var currentBlock = currentBlocks[x];
            if(collideRectRect(entrance.x-entrance.width/2, entrance.y-entrance.height/2, entrance.width, entrance.height, currentBlock.x, currentBlock.y, currentBlock.blockSize, currentBlock.blockSize)){
                currentBlocks.splice(x, 1);
                x -= 1;
                length -= 1;
            }
        }
    }
    //right wall
    if(entrance.wallDirection == "right"){
        var currentBlocks = this.blocks.right;
        for(var y=0, length=this.blockY; y<length; y++){
            var currentBlock = currentBlocks[y];
            if(collideRectRect(entrance.x-entrance.width/2, entrance.y-entrance.height/2, entrance.width, entrance.height, currentBlock.x, currentBlock.y, currentBlock.blockSize, currentBlock.blockSize)){
                currentBlocks.splice(y, 1);
                y -= 1;
                length -= 1;
            }
        }
    }
}
Room.prototype.show = function(){
    if(collideRectRect(-cameraX, -cameraY, width, height, this.x, this.y, this.width, this.height)){
        fill("#654321");
        noStroke();
        rect(this.x, this.y, this.width, this.height);
        for(var direction in this.blocks){
            for(var block of this.blocks[direction]){
                block.show();
            }
        }
    }
}

function Block(x, y, blockSize, wallDirection, type){
    this.x = x;
    this.y = y;
    this.blockSize = blockSize;
    this.wallDirection = wallDirection;
    this.type = type;
    this.wallAlignment = "Vertical";
    if(wallDirection == "top" || wallDirection == "bottom"){
        this.wallAlignment = "Horizontal";
    }
}
Block.prototype.show = function(){
    if(collideRectRect(-cameraX, -cameraY, width, height, this.x, this.y, this.blockSize, this.blockSize)){
        //image(imageSrc["block"], this.x, this.y, this.blockSize, this.blockSize);
        image(imageSrc[this.type + this.wallAlignment], this.x, this.y, this.blockSize, this.blockSize);
    }
}

function Entrance(x, y, width, height, wallDirection, exitId, type){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.wallDirection = wallDirection;
    this.exitId = exitId;
    this.type = type;
    this.blocks = [];
    this.requirement = null;
}
Entrance.prototype.show = function(){
    if(collideRectRect(-cameraX, -cameraY, width, height, this.x-this.width/2, this.y-this.height/2, this.width, this.height)){
        if(this.requirement != null && milestone[this.requirement] == null && collideRectRect(-cameraX, -cameraY, width, height, this.x-this.width/2, this.y-this.height/2, this.width, this.height)){
            for(var block of this.blocks){
                block.show();
            }
        }
    }
}


// Zombie Constructor

function Zombie(x, y, areaId, roomId, type){
    this.x = x;
    this.y = y;
    this.roomId = roomId;
    this.areaId = areaId
    this.type = type;
    this.type.parent = this;
    this.hp = type.maxHp;
    this.idleLocationX;
    this.idleLocationY;
    this.velocityX;
    this.velocityY;
    this.velocityDirection;
    this.lineOfSight = {};
    this.theta = 0;
    this.alerted = false;
    this.investigation = {};
    this.aggravated = false;
    this.enemy = {};
    this.action = "motion";
    this.death = false;
    this.direction = "right";
    this.frameUpdate = 3;
    this.animationStep = 0;
    
    this.roomId = findRoomId(x+type.width/2, y+type.height/2, areaId, roomId);
    this.updateIdlePosition();
    this.updateKinematic();
    this.updateThreatZone();
}
Zombie.prototype.updateKinematic = function(){
    var roomDilemma = false;
    var speedModifier = 1;
    if(this.aggravated){
        if(this.enemy.roomId == this.roomId){
            var differenceX = this.enemy.x + this.enemy.width/2 - this.x - this.type.width/2;
            var differenceY = this.enemy.y + this.enemy.height/2 - this.y - this.type.height/2;
        }
        else{
            roomDilemma = true;
            var chosenEntrance = false;
            if(this.roomId == null){
                for(var entrance of areas[this.areaId].entrances){
                    if(entrance.type == "room" && entrance.exitId == this.enemy.roomId){
                        chosenEntrance = entrance;
                    }
                }
            }
            else{
                for(var entrance of areas[this.areaId].rooms[this.roomId].entrances){
                    if(entrance.exitId == this.enemy.roomId){
                        chosenEntrance = entrance;
                    }
                }
            }
            if(chosenEntrance  == false){
                var differenceX = this.enemy.x + this.enemy.width/2 - this.x - this.type.width/2;
                var differenceY = this.enemy.y + this.enemy.height/2 - this.y - this.type.height/2;
            }
            else{
                var differenceX = chosenEntrance.x - this.x - this.type.width/2;
                var differenceY = chosenEntrance.y - this.y - this.type.height/2;
            }
        }
    }
    else if(this.alerted){
        speedModifier = 0.75;
        if(this.investigation.roomId == this.roomId){
            var differenceX = this.investigation.x - this.x - this.type.width/2;
            var differenceY = this.investigation.y - this.y - this.type.height/2;
        }
        else{
            roomDilemma = true;
            var chosenEntrance = false;
            if(this.roomId == null){
                for(var entrance of areas[this.areaId].entrances){
                    if(entrance.type == "room" && entrance.exitId == this.investigation.roomId){
                        chosenEntrance = entrance;
                    }
                }
            }
            else{
                for(var entrance of areas[this.areaId].rooms[this.roomId].entrances){
                    if(entrance.exitId == this.investigation.roomId){
                        chosenEntrance = entrance;
                    }
                }
            }
            if(!chosenEntrance){
                var differenceX = this.investigation.x - this.x - this.type.width/2;
                var differenceY = this.investigation.y - this.y - this.type.height/2;
            }
            else{
                var differenceX = chosenEntrance.x - this.x - this.type.width/2;
                var differenceY = chosenEntrance.y - this.y - this.type.height/2;
            }
        }
    }
    else{
        speedMofifier = 0.5;
        var differenceX = this.idleLocationX - this.x - this.type.width/2;
        var differenceY = this.idleLocationY - this.y - this.type.height/2;
    }
    var theta = findRotation(differenceX, differenceY);
    
    var hypotenuse = findHypotenuse(differenceX, differenceY);
    if(this.aggravated && !roomDilemma){
        hypotenuse -= this.type.preferredDistanceFromEnemy;
        if(hypotenuse < 0){
            hypotenuse = 0;
        }
    }
    
    if(hypotenuse <= this.type.speed*speedModifier){ 
        if(hypotenuse != 0){
            this.theta = theta;
            differenceX = hypotenuse * Math.cos(theta); 
            differenceY = hypotenuse * Math.sin(theta);
        }
        
        this.x += differenceX;
        this.y += differenceY;
        
        if(Math.abs(differenceX) > 0.5){
            if(differenceX < 0){
                this.direction = "left";
            }
            else{
                this.direction = "right";
            }
        }
        
        if(roomDilemma){
            this.roomId = findRoomId(this.x+this.type.width/2+posNeg(differenceX)*(1+chosenEntrance.width/2), this.y+this.type.height/2+posNeg(differenceY)*(1+chosenEntrance.height/2), this.areaId, this.roomId);
        }
        else if(this.aggravated){
            this.action = "attack";
            this.animationStep = 0;
        }
        else if(this.alerted){
            this.alerted = false;
            this.investigation = null;
            this.updateIdlePosition();
        }
        else{
            this.updateIdlePosition();
        }
    }
    else{
        if(Math.abs(differenceX) > 0.5){
            if(differenceX < 0){
                this.direction = "left";
            }
            else{
                this.direction = "right";
            }
        }
        
        this.velocityX = (this.type.speed * speedModifier) * Math.cos(theta);
        this.velocityY = (this.type.speed * speedModifier) * Math.sin(theta);
        
        this.zombieCollision(this.velocityX, this.velocityY);
        var collision = this.wallCollision(this.velocityX, this.velocityY);
        
        if(!collision.x && !collision.y){
            this.theta = theta;
        }
        else if(!collision.x){
            this.velocityX = (this.type.speed * speedModifier) * posNeg(this.velocityX);
            this.velocityY = 0;
            this.theta = findRotation(this.velocityX, this.velocityY);
        }
        else if(!collision.y){
            this.velocityX = 0;
            this.velocityY = (this.type.speed * speedModifier) * posNeg(this.velocityY);
            this.theta = findRotation(this.velocityX, this.velocityY);
        }
        else{
            this.velocityX = 0;
            this.velocityY = 0;
        }
        this.x += this.velocityX;
        this.y += this.velocityY;
        //this.roomId = findRoomId(this.x+this.type.width/2, this.y+this.type.height/2, this.areaId, this.roomId);
    }
}
/*
Zombie.prototype.updateRoomId = function(){
    var collision = false;
    for(var i=1, length=rooms.length; i<length; i++){
        var currentRoom = rooms[i];
        if(collidePointRect(this.x, this.y, currentRoom.x, currentRoom.y, currentRoom.width, currentRoom.height)){
            this.roomId = currentRoom.roomId;
            isCollision = true;
        }
    }
    if(!isCollision){
        this.roomId = 0;
    }
}
*/
Zombie.prototype.updateThreatZone = function(){
    var originX = this.x + this.type.width/2;
    var originY = this.y + this.type.height/2;
    var deltaTheta = this.type.lineOfSight.angleMax / zombieThreatZoneSlices;
    var initialTheta = this.theta - this.type.lineOfSight.angleMax/2;
    this.lineOfSight = [
        {
            x: originX,
            y: originY,
        },
    ]
    for(var t=0; t<zombieThreatZoneSlices; t++){
        this.lineOfSight.push({
            x: originX + this.type.lineOfSight.distanceMax*Math.cos(initialTheta+t*deltaTheta),
            y: originY + this.type.lineOfSight.distanceMax*Math.sin(initialTheta+t*deltaTheta),
        });
    }
}
Zombie.prototype.updateIdlePosition = function(){
    var mustRelocate = false;
    var theta = Math.random()*TWO_PI;
    var distance = (Math.random()*(this.type.idleLocationMaxDistance-50))+50;
    var idleLocationX = this.x + this.type.width/2 + distance*Math.cos(theta);
    var idleLocationY = this.y + this.type.height/2 + distance*Math.sin(theta);
    if(!mustRelocate && this.roomId != findRoomId(idleLocationX, idleLocationY, this.areaId, this.roomId)){
        mustRelocate = true;
    }
    if(!mustRelocate){
        var collision = this.wallCollision(distance*Math.cos(theta), distance*Math.sin(theta));
        if(collision.x || collision.y){
            mustRelocate = true;
        }
    }
    if(mustRelocate){
        this.updateIdlePosition();
    }
    else{
        this.idleLocationX = idleLocationX;
        this.idleLocationY = idleLocationY;
    }
}
Zombie.prototype.soundCollision = function(){
    for(var s=0, soundLength=soundWaves.length; s<soundLength; s++){
        var currentWave = soundWaves[s];
        var zombiePinged = false;
        for(var l=0, pingLength=currentWave.zombiePinged.length; l<pingLength; l++){
            if(currentWave.zombiePinged[l] == this){
                zombiePinged = true;
            }
        }
        if(!zombiePinged && collideRectCircle(this.x, this.y, this.type.width, this.type.height, currentWave.x, currentWave.y, currentWave.radius)){
            currentWave.zombiePinged.push(this);
            if(!this.aggravated && (!this.alerted || this.investigation.curiousLevel < (currentWave.intensity/currentWave.radius)) && Math.random() < currentWave.intensity/currentWave.radius*10){
                this.alerted = true;
                this.investigation = new Investigation(currentWave.x, currentWave.y, currentWave.roomId, currentWave.intensity/currentWave.radius)
            }
        }
    }
}
Zombie.prototype.threatZoneCollision = function(){
    if(collideRectPoly(player.roomId == this.roomId && player.x, player.y, player.width, player.height, this.lineOfSight)){
        this.aggravated = true;
        this.enemy = player;
        if(this.alerted){
            this.alerted = false;
            this.investigation = null;
        }
    }
}
Zombie.prototype.wallCollision = function(velocityX, velocityY){
    var collision = {
        x: false,
        y: false,
    }
    var area = areas[this.areaId];
    if(this.roomId == null){
        for(var direction in area.blocks){
            for(var block of area.blocks[direction]){
                if(collideRectRect(this.x, this.y+velocityY, this.type.width, this.type.height, block.x, block.y, block.blockSize, block.blockSize)){
                    collision.y = true;
                }
                if(collideRectRect(this.x+velocityX, this.y, this.type.width, this.type.height, block.x, block.y, block.blockSize, block.blockSize)){
                    collision.x = true;
                }
            }
        }

        for(var entrance of area.entrances){
            if(entrance.requirement != null && collideRectRect(this.x+velocityX, this.y+velocityY, this.type.width, this.type.height, entrance.x-entrance.width/2, entrance.y-entrance.height/2, entrance.width, entrance.height)){
                for(var block of entrance.blocks){
                    if(collideRectRect(this.x, this.y+velocityY, this.type.width, this.type.height, block.x, block.y, block.blockSize, block.blockSize)){
                        collision.y = true;
                    }
                    if(collideRectRect(this.x+velocityX, this.y, this.type.width, this.type.height, block.x, block.y, block.blockSize, block.blockSize)){
                        collision.x = true;
                    }
                }
            }
        }
    
        for(var room of area.rooms){
            if(collideRectRect(this.x+velocityX, this.y+velocityY, this.type.width, this.type.height, room.x, room.y, room.width, room.height)){
                for(var direction in room.blocks){
                    for(var block of room.blocks[direction]){
                        if(collideRectRect(this.x+velocityX, this.y+velocityY, this.type.width, this.type.height, block.x, block.y, block.blockSize, block.blockSize)){
                            if(collideRectRect(this.x, this.y+velocityY, this.type.width, this.type.height, block.x, block.y, block.blockSize, block.blockSize)){
                                collision.y = true;
                            }
                            if(collideRectRect(this.x+velocityX, this.y, this.type.width, this.type.height, block.x, block.y, block.blockSize, block.blockSize)){
                                collision.x = true;
                            }
                            if(!collision.x && !collision.y){
                                if(Math.abs(velocityX) > Math.abs(velocityY)){
                                    collision.y = true;
                                }
                                else{
                                    collision.x = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    else{
        var room = area.rooms[this.roomId];
        if(collideRectRect(this.x+velocityX, this.y+velocityY, this.type.width, this.type.height, room.x, room.y, room.width, room.height)){
            for(var direction in room.blocks){
                for(var block of room.blocks[direction]){
                    if(collideRectRect(this.x+velocityX, this.y+velocityY, this.type.width, this.type.height, block.x, block.y, block.blockSize, block.blockSize)){
                        if(collideRectRect(this.x, this.y+velocityY, this.type.width, this.type.height, block.x, block.y, block.blockSize, block.blockSize)){
                            collision.y = true;
                            while(collideRectRect(this.x, this.y+velocityY, this.type.width, this.type.height, block.x, block.y, block.blockSize, block.blockSize)){
                                this.y -= posNeg(velocityY);
                                if(velocityY == 0){
                                    this.y -= 1;
                                }
                            }
                        }
                        if(collideRectRect(this.x+velocityX, this.y, this.type.width, this.type.height, block.x, block.y, block.blockSize, block.blockSize)){
                            collision.x = true;
                            while(collideRectRect(this.x+velocityX, this.y, this.type.width, this.type.height, block.x, block.y, block.blockSize, block.blockSize)){
                                this.x -= posNeg(velocityX);
                                if(velocityX == 0){
                                    this.x -= 1;
                                }
                            }
                        }
                        if(!collision.x && !collision.y){
                            if(Math.abs(velocityX) > Math.abs(velocityY)){
                                collision.y = true;
                            }
                            else{
                                collision.x = true;
                            }
                        }
                    }
                }
            }
        }
    }
    return collision;
}
Zombie.prototype.zombieCollision = function(velocityX, velocityY){
    var collision = {
        x: false,
        y: false,
    }
    for(var i=0, iLength=areas[this.areaId].zombies.length, meetSelf=false; i<iLength; i++){
        var zombie = areas[this.areaId].zombies[i];
        if(zombie == this){
            meetSelf = true;
        }
        else if(meetSelf){
            if(!zombie.death && collideRectRect(this.x+velocityX, this.y+velocityY, this.type.width, this.type.height, zombie.x, zombie.y, zombie.type.width, zombie.type.height)){
                if(collideRectRect(this.x, this.y+this.type.height/3+velocityY, this.type.width, this.type.height/3, zombie.x, zombie.y, zombie.type.width, zombie.type.height)){
                    collision.y = true;
                    while(collideRectRect(this.x, this.y+this.type.height/3+velocityY, this.type.width, this.type.height/3, zombie.x, zombie.y, zombie.type.width, zombie.type.height)){
                        this.y -= posNeg(velocityY);
                    }
                }
                if(collideRectRect(this.x+this.type.width/3+velocityX, this.y, this.type.width/3, this.type.height, zombie.x, zombie.y, zombie.type.width, zombie.type.height)){
                    collision.x = true;
                    while(collideRectRect(this.x+this.type.width/3+velocityX, this.y, this.type.width/3, this.type.height, zombie.x, zombie.y, zombie.type.width, zombie.type.height)){
                        this.x -= posNeg(velocityX);
                    }
                }
                if(!collision.x && !collision.y){
                    if(Math.abs(velocityX) > Math.abs(velocityY)){
                        collision.y = true;
                    }
                    else{
                        collision.x = true;
                    }
                }
            }
        }
    }
    return collision;
}
Zombie.prototype.playerCollision = function(){
    if(collideRectRect(this.x, this.y, this.type.width, this.type.height, player.x, player.y, player.width, player.height)){    
       this.action = "attack";
    }
}
Zombie.prototype.showHpBar = function(){
    if(collideRectRect(-cameraX, -cameraY, width, height, this.x, this.y, this.type.width, this.type.height)){
        var hpWidth = map(this.hp, 0, this.type.maxHp, 0, this.type.width);
        if(hpWidth < 0){
            hpWidth = 0;
        }
        fill(255, 100);
        stroke("black");
        strokeWeight(2);
        rect(this.x, this.y+this.type.height+5, this.type.width, 5);
        fill("red");
        rect(this.x, this.y+this.type.height+5, hpWidth, 5);
    }
}
Zombie.prototype.show = function(){
    if(collideRectRect(-cameraX, -cameraY, width, height, this.x, this.y, this.type.width, this.type.height)){
        var animationLabel = this.getAnimationLabel();

        if(frameCount % this.frameUpdate == 0){
            this.animationStep += 1;
        }
        if(this.death && this.animationStep == imageSrc[animationLabel].length){
            return true;
        }
        
        if(this.animationStep >= imageSrc[animationLabel].length){
            this.animationStep = 0;
        }

        image(imageSrc[animationLabel][this.animationStep], this.x, this.y, this.type.width, this.type.height);
        /*
        if(collidePointRect(mouseX-cameraX, mouseY-cameraY, this.x, this.y, this.type.width, this.type.height)){
            textAlign(LEFT, BOTTOM);
            fill("white")
            stroke("black")
            strokeWeight(1);
            textSize(15);
            text("x: " + this.x, mouseX - cameraX + 10, mouseY - cameraY - 10);
            text("y: " + this.y, mouseX - cameraX + 10, mouseY - cameraY + 10);
        }*/

        //fill("purple");
        //rect(this.x, this.y, this.type.width, this.type.height);
        if(this.death){
            
        }
        else if(this.aggravated){
            textAlign(CENTER, BOTTOM);
            fill("red")
            stroke("black")
            strokeWeight(1);
            textSize(30);
            text("!", this.x+this.type.width/2, this.y-7);
        }
        else if(this.alerted){
            textAlign(CENTER, BOTTOM);
            fill("red")
            stroke("black")
            strokeWeight(1);
            textSize(30);
            text("?", this.x+this.type.width/2, this.y-7);
        }
    }
}
Zombie.prototype.getAnimationLabel = function(){
    if(this.death){
        return (this.type.tag + "Death");
    }
    else if(this.velocityX == 0 && this.velocityY == 0 && this.action != "attack"){
        return (this.type.tag + "Idle");
    }
    else{
        var direction = capitalize(this.direction);
        var action = "Walk";
        if(this.action == "attack"){
            action = "Attack";
        }
        return (this.type.tag + action + direction);
    }
}
Zombie.prototype.showThreatZone = function(){
    var centerX  = (this.lineOfSight[0].x + this.lineOfSight[Math.ceil(this.lineOfSight.length/2)].x) / 2;
    var centerY  = (this.lineOfSight[0].y + this.lineOfSight[Math.ceil(this.lineOfSight.length/2)].y) / 2;
    var radius = centerX / 2;
    if(collideRectCircle(-cameraX, -cameraY, width, height, centerX, centerY, radius)){
        fill(0, 50);
        stroke(0, 100);
        //triangle(this.lineOfSight[0].x, this.lineOfSight[0].y, this.lineOfSight[1].x, this.lineOfSight[1].y, this.lineOfSight[2].x, this.lineOfSight[2].y);
        
        var lineOfSight=this.lineOfSight;
        beginShape();
        for(i=0, length=lineOfSight.length; i<length; i++){
            vertex(lineOfSight[i].x, lineOfSight[i].y);
        }
        endShape(CLOSE);
    }
}

function MeleeZombie(){
    this.maxHp = 20;
    this.width = 1080/30;
    this.height = 2057/30;
    this.speed = 6;
    this.soundThreshold = 100;
    this.lineOfSight = {
        angleMax: HALF_PI,
        distanceMax: 200,
    }
    this.threatRadius = 280;
    this.preferredDistanceFromEnemy = 7;
    
    this.idleLocationMaxDistance = 250;
    this.damage = 1;
    this.tag = "meleeZombie";
}
MeleeZombie.prototype.attack = function(enemy){
    var animationLabel = this.parent.getAnimationLabel();
    if(this.parent.animationStep == imageSrc[animationLabel].length-1){
        if(collideRectRect(this.parent.x, this.parent.y, this.width, this.height, enemy.x, enemy.y, enemy.width, enemy.height)){
            enemy.hp -= this.damage;
            if(enemy.hp <= 0 && enemy.death != null){
                enemy.hp = 0;
                enemy.death = true;
                this.parent.aggravated = false;
                //this.parent.enemy = null;
                deathAnimation();
                this.parent.updateIdlePosition();
            }
        }
        this.parent.action = "motion"; 
    }
}

function Investigation(x, y, roomId, curiousLevel){
    this.x = x;
    this.y = y;
    this.roomId = roomId;
    this.curiousLevel = curiousLevel;
}


// Projectile Constructor
function Projectile(x, y, velocityX, velocityY, damage, type, areaId){
    this.x = x;
    this.y = y;
    this.size = 12;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.damage = damage;
    this.type = type;
    this.areaId = areaId;
}
Projectile.prototype.updateKinematic = function(){
    this.x += this.velocityX;
    this.y += this.velocityY;
}
Projectile.prototype.zombieCollision = function(){
    for(var zombie of areas[this.areaId].zombies){
        if(collideRectRect(this.x, this.y, this.size, this.size, zombie.x, zombie.y, zombie.type.width, zombie.type.height)){
            zombie.hp -= this.damage;
            if(zombie.hp <= 0){
                zombie.death = true;
            }
            else{
                zombie.aggravated = true
                zombie.enemy = player;
                if(zombie.alerted){
                    zombie.alerted = false;
                    zombie.investigation = null;
                }
            }
            return true;
        }
    }
    return false;
}
Projectile.prototype.wallCollision = function(){
    var area = areas[this.areaId];
    for(var direction in area.blocks){
        for(var block of area.blocks[direction]){
            if(collideRectRect(this.x, this.y, this.size, this.size, block.x, block.y, block.blockSize, block.blockSize)){
                return true;
            }
        }
    }
    
    for(var entrance of area.entrances){
        if((entrance.type == "area" || entrance.requirement != null) && collideRectRect(this.x, this.y, this.size, this.size, entrance.x-entrance.width/2, entrance.y-entrance.height/2, entrance.width, entrance.height)){
            for(var block of entrance.blocks){
                if(collideRectRect(this.x, this.y, this.size, this.size, block.x, block.y, block.blockSize, block.blockSize)){
                    return true;
                }
            }
        }
    }
    
    for(var room of area.rooms){
        if(collideRectRect(this.x, this.y, this.size, this.size, room.x, room.y, room.width, room.height)){
            for(var direction in room.blocks){
                for(var block of room.blocks[direction]){
                    if(collideRectRect(this.x, this.y, this.size, this.size, block.x, block.y, block.blockSize, block.blockSize)){
                        return true;
                    }
                }
            }
        }
    }
    
    return false;
}
Projectile.prototype.show = function(){
    //fill("black");
    //rect(Number(this.x),Number(this.y), 2, 2);
    image(imageSrc["hitmarker"][0], this.x, this.y, this.size, this.size);
}


// Sound Wave Constuctor

function soundWave(x, y, intensity, radius, areaId, roomId){
    this.x = x;
    this.y = y;
    this.intensity = intensity;
    this.radius = radius;
    this.radiusExpansionSpeed = 15;
    this.areaId = areaId;
    this.roomId = roomId;
    this.zombiePinged = [];
}
soundWave.prototype.expandRadius = function(){
    this.radius += this.radiusExpansionSpeed;
}
soundWave.prototype.show = function(){
    noFill();
    stroke(0, 120);
    if(this.zombiePinged.length > 0){
        stroke(255, 70, 0, 150);
    }
    var currentStrokeWeight = this.intensity/this.radius*50;
    strokeWeight(currentStrokeWeight);
    ellipse(this.x, this.y, this.radius, this.radius);
}


// Thing Constructor

/*
function Sign(x, y, contents, areaId){
    this.x = x;
    this.y = y;
    this.contents = contents;
    this.type = "sign";
    this.open = false;
    this.areaId = areaId;
}
Sign.prototype.show = function(){
    fill("brown");
    noStroke();
    rect(this.x, this.y, 30, 25)
    rect(this.x+10, this.y+25, 10, 20);
    stroke("black");
     if(this.open){
        fill("black")
        text(this.contents, this.x-10, this.y-30, 50, 30);
    }
}
Sign.prototype.interact = function(){
    if(this.open == false){
        this.open = true
    }
    else{
        this.close()
    }
}
*/

function Cabinet(x, y, contents, areaId){
    this.x = x;
    this.y = y;
    this.width = 108;
    this.height = 63.5;
    this.contents = contents;
    this.type = "cabinet"
    this.open = false;
    this.areaId = areaId;
}
Cabinet.prototype.interact = function(){
    if(!this.open){
        this.open = true;
        if(this.openEffect != null){
            this.openEffect();
        }
    }
    else{
        this.open = false;
        if(this.closeEffect != null){
            this.closeEffect();
        }
    }
}
Cabinet.prototype.show = function(){
    if(collideRectRect(-cameraX, -cameraY, width, height, this.x, this.y, this.width, this.height)){
        var condition = "Close";
        if(this.open){
            condition = "Open";
        }
        image(imageSrc["wardrobe" + condition], this.x, this.y, this.width, this.height);
        if(this.open){
            fill("black");
            stroke("white");
            strokeWeight(0.5);
            textSize(23);
            textAlign(CENTER, CENTER);
            textFont(fontSrc["chakraPetch"]);
            text(this.contents, this.x, this.y-100, this.width, 90);
        }
    }
}


// Support Function

function findProportionalFactor(dx, dy, dh){
  var k = 0;
  if(dx != 0 || dy != 0){
    k = Math.sqrt(Math.pow(dh, 2) / (Math.pow(dx, 2)+Math.pow(dy, 2)));
  }
  return k;
}

function findRotation(dx, dy){
  var dh = Math.sqrt(Math.pow(dy, 2) + Math.pow(dx, 2));  
  var rotationRadian = 0;
  if(dh != 0){
    rotationRadian = Math.acos(dx / dh);
  }
  if(dy < 0){
    rotationRadian *= -1;
  } 
  return rotationRadian;
}

function findHypotenuse(dx, dy){
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

function posNeg(number){
  if(number != 0){
    return number / Math.abs(number);
  }
  else {
    return 0;
  }
}

function randomNumber(min, max) {
    // return Math.floor(Math.random()*(max-min+1)+min)
    return Math.random()*(max-min+1) + min;
}

function findRoomId(x, y, areaId, roomId){
    var collision = false;
    var area = areas[areaId];
    
    if(roomId != null){
        var room = area.rooms[roomId];
        if(collidePointRect(x, y, room.x, room.y, room.width, room.height)){
            collision = true; 
            return roomId;
        }
    }
    
    for(var i=0, length=area.rooms.length; i<length && i!=roomId; i++){
        var currentRoom = area.rooms[i];
        if(collidePointRect(x, y, currentRoom.x, currentRoom.y, currentRoom.width, currentRoom.height)){
            collision = true;
            return i;
        }
    }
    
    if(!collision){
        return null;
    }
}

function findAreaId(x, y, areaId){
    var collision = false;
    
    if(areaId != null){
        var area = areas[areaId];
        if(collidePointRect(x, y, area.x, area.y, area.width, area.height)){
            collision = true; 
            return areaId;
        }
    }
    
    for(var i=0, length=areas.length; i<length && i!=areaId; i++){
        var currentArea = areas[i];
        if(collidePointRect(x, y, currentArea.x, currentArea.y, currentArea.width, currentArea.height)){
            collision = true;
            return i;
        }
    }
    
    if(!collision){
        return null;
    }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


//Draggable Tutorial

var tutorialActive = false;
var tutorialSlide = 1;
var gameOverScreen = false;

dragElement(document.getElementById("tutorialSpace"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "Header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
    } 
    else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        if(elmnt.offsetLeft > windowWidth-330){
            elmnt.style.left = (windowWidth - 330) + "px";
        }
        else if(elmnt.offsetLeft < 330){
            elmnt.style.left = 330 + "px";
        }
        if(elmnt.offsetTop > windowHeight-155){
            elmnt.style.top = (windowHeight - 155) + "px";
        }
        else if(elmnt.offsetTop < 155){
            elmnt.style.top = 155 + "px";
        }
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function displayTutorialSpace(){
    document.getElementById("tutorialSpace").setAttribute("style", "display: inline; top: 50%; left: 50%; transform: (-50%, -50%);");  
    tutorialSlide = 1;  
    tutorialContent();
    tutorialActive = true;
    gameActive = false;
    playerActive = false;
    noLoop();
}

function hideTutorialSpace(){
    document.getElementById("tutorialSpace").setAttribute("style", "display: none;");
    if(!gameOverScreen){
        setTimeout(function(){
            gameActive = true;
            playerActive = true;
        }, 10);
    }
    tutorialActive = false;
    loop();
}

function tutorialContent(){
    if(tutorialSlide == 1){
        document.getElementById("tutorialText").innerHTML = "<p style='text-indent: 50px;'>On the 4th day of the 5th month of 2035th year, a world disaster arises. Overnight, every rose bushes of the blue world had suddenly grown to enormous heights. With their unearthly growth, they developed a bizarre toxin which began to propagate within the humans of the world. Many fell victim to the infectious toxin, but death did not embraces them. The toxin reanimated their bodies into mutated rose zombies. The few humans that weren’t affected now survive in the wasteland that is Earth, against the ever increasing amount of rose zombies.</p><button class='nextButton' onclick='displayNextSlide()'>Next: <i class='arrow right'></i></button>"; 
        document.getElementById("tutorialSpaceHeader").innerHTML = "Background";
    }
    else if(tutorialSlide == 2){
        document.getElementById("tutorialText").innerHTML = "<p>Mouse Input:<br>&emsp;Mouse Move: Aim gun<br>&emsp;Mouse Press: Fire gun<br>Keyboard Input:<br>&emsp;WASD = Move Player<br>&emsp;WASD + Shift = Stealth<br>&emsp;E Key = Interact with Items</p><button class='previousButton' onclick='displayPreviousSlide()'><i class='arrow left'></i> :Previous</button><button class='nextButton' onclick='displayNextSlide()'>Next: <i class='arrow right'></i></button>";
        document.getElementById("tutorialSpaceHeader").innerHTML = "Instruction";
    }
    else if(tutorialSlide == 3){
        document.getElementById("tutorialText").innerHTML = "<p>Game Designers:<br>&emsp;Design Crew: Liam Dimas, Mia Meyers, Khai Sam<br>&emsp;Coding Crew: Liam Dimas, Khai Sam<br>&emsp;Art Crew: Alexander Flores, Mia Meyers<br>&emsp;Sound Crew: Juan Carlos, Alexander Flores</p><button class='previousButton' onclick='displayPreviousSlide()'><i class='arrow left'></i> :Previous</button><button class='nextButton' onclick='displayNextSlide()'>Next: <i class='arrow right'></i></button>";
        document.getElementById("tutorialSpaceHeader").innerHTML = "Credit";
    }
    else if(tutorialSlide == 4){
        document.getElementById("tutorialText").innerHTML = "<p>Game Sponsors:<br>&emsp;National Student Leadership Conference<br>&emsp;EA Industrial Toys<br>&emsp;Pasadena Educational Foundation<br>&emsp;Art Center<br>&emsp;Innovate Pasadena<br>&emsp;Caltech</p><button class='previousButton' onclick='displayPreviousSlide()'><i class='arrow left'></i> :Previous</button>";
        document.getElementById("tutorialSpaceHeader").innerHTML = "Credit";
    }
}

function displayNextSlide(){
    tutorialSlide += 1;
    tutorialContent();
}

function displayPreviousSlide(){
    tutorialSlide -= 1;
    tutorialContent();
}
