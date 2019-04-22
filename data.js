var canvas;

var cameraX = 0;
var cameraY = -500;

var gameActive = false;
var titleScreen = true;
var gameOverScreen = false;
var restartScreen = false;

var restartRadius;
var restartSeparateX;
var restartSpeed = 5;

var areas = [];
var soundWaves = [];
var projectiles = [];
var milestone = {};

var imageSrc = {};
var fontSrc = {};
var soundSrc = {};

var inputUp = false;
var inputDown = false; 
var inputLeft = false;
var inputRight = false;

var player = new Player(275, 280);


// Game Conent

function addGameContent(){
    var area0 = new Area(-50, -650, 140, 85, 20, null, null);
        area0.addEntrance("top", 95, 0, "haveWeedKiller");
        areas.push(area0);

        var room0 = new Room(30, 400, 30, 25, 20, 0, 0, null);
            one.addEntrance("top", null);
            areas[0].rooms.push(room0);
        var room1 = new Room(30, -550, 30, 25, 20, 0, 1, null);
            room1.addEntrance("bottom", null);
            areas[0].rooms.push(room1);
        var room2 = new Room(670, 400, 30, 25, 20, 0, 2, null);
            room2.addEntrance("top", null);
            areas[0].rooms.push(room2);
        var room3 = new Room(1310, 400, 60, 25, 20, 0, 3, null);
            room3.addEntrance("top", null);
            areas[0].rooms.push(room3);
        var room4 = new Room(670, -550, 30, 25, 20, 0, 4, null);
            room4.addEntrance("bottom", null);
            areas[0].rooms.push(room4);
        var room5 = new Room(1310, -550, 30, 25, 20, 0, 5, null);
            room5.addEntrance("bottom", null);
            areas[0].rooms.push(room5);
        var room6 = new Room(1950, -550, 30, 25, 20, 0, 6, null);
            room6.addEntrance("bottom", null);
            areas[0].rooms.push(room6);

        var zombie0 = new Zombie(50, 100, 0, null, new MeleeZombie());
            areas[0].zombies.push(zombie0);
        var zombie1 = new Zombie(150, -400, 0, null, new MeleeZombie());
            areas[0].zombies.push(zombie1);
        var zombie2 = new Zombie(200, -350, 0, null, new MeleeZombie());
            areas[0].zombies.push(zombie2);
        var zombie3 = new Zombie(500, 140, 0, null, new MeleeZombie());
            areas[0].zombies.push(zombie3);
        var zombie4 = new Zombie(700, -400, 0, null, new MeleeZombie());
            areas[0].zombies.push(zombie4);
        var zombie5 = new Zombie(750, -350, 0, null, new MeleeZombie());
            areas[0].zombies.push(zombie5);
        var zombie6 = new Zombie(900, 400, 0, null, new MeleeZombie());
            areas[0].zombies.push(zombie6);
        var zombie7 = new Zombie(1200, 100, 0, null, new MeleeZombie());
            areas[0].zombies.push(zombie7);
    
        var thing0 = new makeCabinet(550, 550, "Nothing! Life isn't fair.", 0);
            areas[0].things.push(thing0);
}