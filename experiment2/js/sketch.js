/* exported setup, draw */

let seed = 0;

const yAxis = 1;

const mountColor = "#984e71";
const midMountColor = "#5b3b64";
const frontMountColor = "#34498a";
const sunColor = "#fdafaf";
const rockColor = "#181204";
const starColor = "#FFFFFF";

let skyColor1, skyColor2, groundColor1, groundColor2, groundColor3;

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// listener for reimagine button
$("#reimagine").click(function() {
  seed++;
});

function setup() {  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  skyColor1 = color(254, 120, 113);
  skyColor2 = color(250, 158, 130);
  groundColor1 = color(96, 69, 120);
  groundColor2 = color(27, 25, 38);
  groundColor3 = color(0, 0, 0);
}

function draw() {
  randomSeed(seed);
  background(100);
  
  // Sets the gradient and draws the sky
  setGradient(0, 0, width, height / 2, skyColor1, skyColor2, yAxis);
  
  // Draws a random number of stars with random movement speeds
  const starCount = 100 * random();
  for (let i = 0; i < starCount; i++) {
    let xRand = random(0, 550);
    let yRand = random(0, 300);
    let xStar = xRand * noise(random(0.005, 0.010) * frameCount) + random(-200, 750);
    let yStar = yRand * noise(random(0.005, 0.010) * frameCount + random(0, 500) + random(0, 200));
    // Draw the point.
    fill(starColor);
    ellipse(xStar, yStar, 5, 5);
  }
  
  noStroke();
  
  // Draws the sun
  fill(sunColor);
  ellipse(275, 150, width / 2.5, height / 2);
  
  // Draws Background Mountain with a random number of peaks
  fill(mountColor);
  beginShape();
  vertex(0, height / 1.4);
  const steps = 30;
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let y =
      height / 2 - (random() * random() * random() * height) / 4 - height / 50;
    vertex(x, y);
  }
  vertex(width, height / 1.4);
  endShape(CLOSE);
  
  // Draws middle mountain layer with a random number of peaks
  fill(midMountColor);
  beginShape();
  vertex(0, height / 1.4);
  const peaks = 30;
  for (let i = 0; i < peaks + 1; i++) {
    let x = (width * i) / peaks;
    let y =
      height / 1.8 - (random() * random() * random() * height) / 4 - height / 50;
    vertex(x, y);
  }
  vertex(width, height / 1.4);
  endShape(CLOSE);
  
  // Draws Blue Front Mountain with a random number of peaks
  fill(frontMountColor);
  beginShape();
  vertex(0, height / 1.4);
  const count = 30;
  for (let i = 0; i < count + 1; i++) {
    let x = (width * i) / count;
    let y =
      height / 1.6 - (random() * random() * random() * height) / 4 - height / 50;
    vertex(x, y);
  }
  vertex(width, height / 1.4);
  endShape(CLOSE);
  
  // Sets the gradient and draws the ground
  setGradient(0, 286, width, height / 6, groundColor1, groundColor2, yAxis);
  setGradient(0, 353, width, height / 6, groundColor2, groundColor3, yAxis);
  
  // Draws a random amount of rocks using the quad function
  fill(rockColor);
  beginShape();
  const rocks = 20 * random();
  const scrub = mouseX/width;
  for (let i = 0; i < rocks; i++) {
    let z = random();
    let x = width * ((random() + (scrub/50 + millis() / 500000.0) / z) % 1);
    let s = width / 50 / z;
    let y = height / 2 + height / 5 / z;
    quad(x, y + s, x + s / 4, y, x + s , y, x + s * 2, y + s);
  }
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noStroke();
  noFill();

  if (axis === yAxis) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  }
}