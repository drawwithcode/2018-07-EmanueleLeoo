var mic;
var vol;
var j;
var neve = [];

function preload(){
  // put preload code here
}

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);

  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();

  mic = new p5.AudioIn();

  mic.start();

  for(var x = width/2.4 + 35 + 40; x < width/2.4 + 35 + 585 + 40; x += random(10, 30))
  {
    for(var y = height/1.3; y < height/1.3 + 30; y += random(10, 30))
    {
      var miePalleBianche = new PalleBianche(x, y, 8, random(12, 32));
      miePalleBianche.speed = 2.5 * random(2,8);

      neve.push(miePalleBianche);
    }
  }
}

function draw() {
  // put drawing code here
  background(255, 219, 248);


  var vol = mic.getLevel();
  var j = vol * 1000;

  if(j > 17.5){

    background('#e22187');

    //corniceVoicePower
    noStroke();
    fill('#111111');
    rect(width/8 - 120 + 20, height/4, 430, 400);
    noFill();
    stroke('#111111');
    strokeWeight(6);
    rect(width/8 - 120 + 20, height/4 - 80, 430, 400 + 80);
    noStroke();
    fill(255, 219, 248);
    rect(width/8 - 95 + 20, height/1.27, 380, 30);
    fill(0, random(0,300), random(0,300));
    rect(width/8 - 95 + 20, height/1.27, 50 + j * 2, 30);

    //webcam
    var myImage = capture.loadPixels();
    stroke('#111111');
    strokeWeight(6);
    image(myImage, width/2.4 + 40, height/8, 640, 480);
    noFill();
    rect(width/2.4 + 40, height/8, 640, 480);

    //VoicePower
    noStroke();
    fill(0, random(0,300), random(0,300));
    textSize(40);
    textFont('Helvetica');
    textStyle(NORMAL);
    text(j, width/8 - 100 + 20, height/3);
    stroke('#111111');
    strokeWeight(3);
    textSize(53);
    textStyle(BOLD);
    text('VOICE POWER', width/8 - 100 + 20, height/4 - 20);

    for(var f = 0; f < neve.length; f++){
      neve[f].move();
      neve[f].display();
    }

    //megafono
    strokeWeight(3);
    fill(random(0,300), random(100,200), random(100,300));
    ellipse(width/1.5 + 35, height/2 + 95, 50 + 2.2 * j);
    fill(random(0,100), random(100,200), random(0,300));
    ellipse(width/1.5 + 35, height/2 + 95, 25 + 2.2 * j);
    fill(random(100,300), random(0,200), random(200,300));
    ellipse(width/1.5 + 35, height/2 + 95, 2 + 2.2 * j);
    fill(random(200,300), random(0,300), random(100,300));
    ellipse(width/1.5 + 35, height/2 + 95, 0 + 2.2 * j - 30);

    if(j > 30){
      noStroke();
      fill(random(0,100), random(200,300), random(0,300));
      textSize(40);
      textFont('Helvetica');
      textStyle(NORMAL);
      text(j, width/8 - 100 + 20, height/3 + 50);
    }

    if(j > 45){
      noStroke();
      fill(random(100,200), random(0,300), random(200,300));
      textSize(40);
      textFont('Helvetica');
      textStyle(NORMAL);
      text(j, width/8 - 100 + 20, height/3 + 100);
    }

    if(j > 60){
      noStroke();
      fill(random(100,300), random(0,300), random(0,200));
      textSize(40);
      textFont('Helvetica');
      textStyle(NORMAL);
      text(j, width/8 - 100 + 20, height/3 + 150);
    }

    if(j > 75){
      noStroke();
      fill(random(0,300), random(200,300), random(100,300));
      textSize(40);
      textFont('Helvetica');
      textStyle(NORMAL);
      text(j, width/8 - 100 + 20, height/3 + 200);
    }

    if(j > 90){
      noStroke();
      fill(random(150,300), random(0,225), random(45,250));
      textSize(40);
      textFont('Helvetica');
      textStyle(NORMAL);
      text(j, width/8 - 100 + 20, height/3 + 250);
    }
  }
  else{
    //webcam
    var myImage = capture.loadPixels();
    stroke('#111111');
    strokeWeight(6);
    image(myImage, width/2.4 + 40, height/8, 640, 480);
    noFill();
    rect(width/2.4 + 40, height/8, 640, 480);

    //corniceVoicePower
    noStroke();
    fill('#111111');
    rect(width/8 - 120 + 20, height/4, 430, 400);
    noFill();
    stroke('#111111');
    strokeWeight(6);
    rect(width/8 - 120 + 20, height/4 - 80, 430, 400 + 80);
    noStroke();
    fill(255, 219, 248);
    rect(width/8 - 95 + 20, height/1.27, 380, 30);

    //testoScritto
    stroke('#111111');
    strokeWeight(3);
    textSize(53);
    textStyle(BOLD);
    text('VOICE POWER', width/8 - 100 + 20, height/4 - 20);
    noStroke();
    textSize(40);
    textFont('Helvetica');
    textStyle(NORMAL);
    text(j, width/8 - 100 + 20, height/3);

    //bandaNeraIniziale
    fill('#111111');
    rect(width/2.4 + 40, height/1.90, 640, 165);
    noFill();
    stroke(255, 219, 248);
    strokeWeight(0.9);
    textSize(53);
    textStyle(BOLD);
    text('speak, shout or sing!', width/2.2 + 40, height/1.48);
  }

}

function PalleBianche(_x1, _y1, _diameter1, _diameter2){
  this.x = _x1;
  this.y = _y1;
  this.diameter = _diameter1;
  this.diameter2 = _diameter2;
  this.speed = 10;

  this.display = function() {
    fill(random(0, 275), random(13, 230), random(13, 145));
    stroke('#111111');
    strokeWeight(2);
    ellipse(this.x, this.y, this.diameter, this.diameter2);
  }

  var yDirection = 1;
  var xDirection = 1;

  this.move = function() {
    this.y += this.speed;

    if(this.y > height/8 + 463 || this.y < 0){
      this.y = height/8 + 15;
    }
  }
}
