// Init variables
date = new Date();
var leafDropOffset = 20;
var age = date.getFullYear() - 1997;
// If birthday has not happened
if(date.getMonth() < 11 && date.getDay() < 23){ age = age - 1}
var lifeTime = 78;

let timeLeft = Math.floor((lifeTime - age) * 12);
let timeSpent = Math.floor((age) * 12);
let treeDistrib = Math.floor((((lifeTime) * 12) - timeSpent) / 3);

let leavesToFall = [];
for (var i = 0; i < leafDropOffset; i++) {
    leavesToFall.push(randomInt(0, treeDistrib*3));
}
let unit = 50;

// Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;
    Graphics = PIXI.Graphics;

// Create a Pixi Application
let app = new PIXI.Application({
        width: 800,
        height: 800,
        antialias: true,    // default: false
        transparent: true, // default: false
        resolution: 1       // default: 1
    }
);

// Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

loader
    .add([
        "leaf.png",
        "tree.png"
    ])
    .load(setup);

// Define Sprites
let leaf;
let tree;
let leaves;

// Debug Boxes
let leafZoneLeft;
let leafZoneMiddle;
let leafZoneRight;

function setup() {
// Define Containers
    leaves = new PIXI.Container();

// Tree
    tree = new Sprite(resources["tree.png"].texture);
    tree.width = 700;
    tree.height = 700;
    tree.x = 400 - tree.width / 2;
    tree.y = 400 - tree.height / 2;

// DEBUG BOXES
    leafZoneLeft = new Graphics();
    leafZoneLeft.beginFill(0x000);
    leafZoneLeft.drawCircle(0, 0, 150);
    leafZoneLeft.endFill();
    leafZoneLeft.x = 400 - leafZoneLeft.width / 2;
    leafZoneLeft.y = 400 - leafZoneLeft.width / 2;
    leafZoneLeft.alpha = 0;

    leafZoneMiddle = new Graphics();
    leafZoneMiddle.beginFill(0x000);
    leafZoneMiddle.drawCircle(0, 0, 150);
    leafZoneMiddle.endFill();
    leafZoneMiddle.x = 400;
    leafZoneMiddle.y = 400 - leafZoneMiddle.width * 0.66;
    leafZoneMiddle.alpha = 0;

    leafZoneRight = new Graphics();
    leafZoneRight.beginFill(0x000);
    leafZoneRight.drawCircle(0, 0, 150);
    leafZoneRight.endFill();
    leafZoneRight.x = 400 + leafZoneRight.width / 2;
    leafZoneRight.y = 400 - leafZoneRight.width / 2;
    leafZoneRight.alpha = 0;

// Temp Leaf
    // Desired number 672 (Months) or over 4000 (Weeks)
    var leafCount = 0;

    while(leafCount < treeDistrib){
        leaf = new Sprite(resources["leaf.png"].texture);

        leaf.anchor.set(0.5, 0.5);

        foo = Math.random(0, 1) * 2 * Math.PI;
        bar = 150 * Math.sqrt(Math.random(0, 1));
       
        leaf.x = bar * Math.cos(foo) + leafZoneLeft.x;
        leaf.y = bar * Math.sin(foo) + leafZoneLeft.y;
        leaf.vx = 0.5;
        leaf.vy = 1;

        leaf.rotation = randomInt(0, 5.7596);

        leaves.addChild(leaf);
        leafCount++;
    }

    leafCount = 0;
    while(leafCount < treeDistrib){
        leaf = new Sprite(resources["leaf.png"].texture);

        leaf.anchor.set(0.5, 0.5);

        foo = Math.random(0, 1) * 2 * Math.PI;
        bar = 150 * Math.sqrt(Math.random(0, 1));
       
        leaf.x = bar * Math.cos(foo) + leafZoneMiddle.x;
        leaf.y = bar * Math.sin(foo) + leafZoneMiddle.y;
        leaf.vx = 0.5;
        leaf.vy = 1;

        leaf.rotation = randomInt(0, 5.7596);

        leaves.addChild(leaf);
        leafCount++;
    }
    
    leafCount = 0;
    while(leafCount < treeDistrib){
        leaf = new Sprite(resources["leaf.png"].texture);

        leaf.anchor.set(0.5, 0.5);

        foo = Math.random(0, 1) * 2 * Math.PI;
        bar = 150 * Math.sqrt(Math.random(0, 1));
       
        leaf.x = bar * Math.cos(foo) + leafZoneRight.x;
        leaf.y = bar * Math.sin(foo) + leafZoneRight.y;
        leaf.vx = 0.5;
        leaf.vy = 1;

        leaf.rotation = randomInt(0, 5.7596);

        leaves.addChild(leaf);
        leafCount++;
    }

// Add to stage
    app.stage.addChild(tree);
    app.stage.addChild(leafZoneLeft);
    app.stage.addChild(leafZoneMiddle);
    app.stage.addChild(leafZoneRight);
    app.stage.addChild(leaves);

//Set the game state
    state = play;
//Start the game loop 
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
    //Update the current game state:
    if (currentLeaf < leafDropOffset){dropLeaf()}
    state(delta);
}

function play(delta) {
}

