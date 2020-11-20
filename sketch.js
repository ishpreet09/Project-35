var dog, happyDog, sadDog,database;
var foods, foodStock;
var fedTime, lastFed;
var feed, addFood;
var foodObj;

function preload()
{
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happydog.png");
}

function setup() {
  createCanvas(1000,400);
  database=firebase.database();
  console.log(database);

  foodObj=new Food();

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodStock=database.ref('food');
  foodStock.on("value",readStock);

  feed=createButton("Feed The Dog");
  feed.position(830,65);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(950,65);
  addFood.mousePressed(addFoods);
}


function draw() {  
background(46,139,87);
foodObj.display();

 fedTime=database.ref('fedTime');
 fedTime.on("value",function(data){
   lastFed=data.val();
   foodObj.getFedTime(lastFed);
 })

 fill(255,255,254);
 textSize(15);
 if(lastFed>=12){
   text("Last Fed :"+lastFed%12+"PM",350,30);
 }
 else if(lastFed===0){
   text("Last Fed : 12 AM", 350,30);
 }
 else{
   text("Last Fed :"+lastFed+"AM",350,30);
 }
  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodstock()-1);
  database.ref('/').update({
    food:foodObj.getFoodstock(),
    fedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}

