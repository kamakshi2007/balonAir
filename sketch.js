const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var balloon;
var position;
var reset;
var r,rImage

function preload() {
      bg = loadImage("bg.png"); 
      //balloonImage = loadAnimation("balloon1.png , balloon2.png , balloon3.png");
      balloonImage = loadAnimation("Ballon1.png" , "Ballon2.png" , "Ballon3.png"); 
      rImage = loadImage("r.png");
 }

function setup(){
    database = firebase.database();
    var balloonPosition = database.ref("balloon/position");
    balloonPosition.on("value",readPosition,showError);
    createCanvas(1300,600);
    //engine = Engine.create();
    //world = engine.world;
    reset = createButton("reset");
    reset.position(1000,50);
    reset.visible = false;
    
   
    balloon = createSprite(100,450);
    balloon.addAnimation("balloonImage",balloonImage);
    balloon.scale = 0.5;

    //r = createSprite(1020,60);
    //r.addImage(rImage);
    //r.scale = 0.2;
}

function draw(){
  
    background(bg);
    fill("plum");
    stroke("red")
    strokeWeight(5);
    textSize(30);
    text("USE ARROW KEYS TO GO A RIDE ON HOT AIR BALLOON",40,50);
    if(position){
        if(keyDown(LEFT_ARROW)){
            writePosition(-2,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(2,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-2);
            if(balloon.scale>0.2){
                balloon.scale = balloon.y/1000
            }
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+2);
            if(balloon.scale<0.5){
                balloon.scale = balloon.y/1000
            }
        }
       /* if(keyDown(UP_ARROW)){
         balloon.scale = balloon.y/1000;
        }*/
        reset.mousePressed( ()=>{
            database.ref("balloon/position").set({
                "x": 100,
                "y": 450
            })
        });
        drawSprites();
    }
   // Engine.update(engine);
    
 
}
function writePosition(x,y){
    database.ref("balloon/position").set({
     "x": position.x+x,
     "y": position.y+y
    })
    
}
function readPosition(data){
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
}
function showError(){
    console.log("error in database");
}