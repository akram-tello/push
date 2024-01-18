// Configuration Constants
const RADIAN = Math.PI / 180;
const START_ANGLE = 270;
const FONT_SIZE = 22;
const LINE_WIDTH = 5;
const BORDER_WIDTH = 10; // Width of the border around the profile image

// Color Configuration for Progress Bars
const borderColor = '#FF4136'; // Adjust as needed for your border color

// Initialize Circular Progress Bars
const circularProgressBars = document.querySelectorAll('.circularProgressMAF');
initializeCircularProgress(circularProgressBars);

// Initialize Circular Progress
function initializeCircularProgress(progressBars) {
  progressBars.forEach((progress, index) => {
    const context = progress.getContext('2d');
    const containerDimension = progress.parentElement.clientWidth;
    progress.width = progress.height = containerDimension;
    const progressValue = progress.getAttribute('data-progress-value');
    const endAngle = (progressValue / 100) * 360;

    drawCircularProgress(context, containerDimension, endAngle, index);
  });
}

// Draw Circular Progress and Border without Text
function drawCircularProgress(ctx, dimension, endAngle, colorIndex) {
  const center = dimension / 2;
  const radius = center - (BORDER_WIDTH / 2);


  var gradient = ctx.createLinearGradient(center, 0, center, dimension);
  gradient.addColorStop(0, '#1ecd47'); // Start color
  gradient.addColorStop(1, '#007BFF'); // End color

  // Clear the canvas first
  ctx.clearRect(0, 0, dimension, dimension);


  // Draw the border around the profile image as a background
  ctx.clearRect(0, 0, dimension, dimension); // Clear the canvas first
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.lineWidth = BORDER_WIDTH;
  ctx.strokeStyle = 'rgba(0,0,0,0.1)'; // Choose a color for the background border
  ctx.stroke();

// Draw the progress as a border circle with gradient
ctx.beginPath();
ctx.arc(center, center, radius, START_ANGLE * RADIAN, (START_ANGLE + endAngle) * RADIAN);
ctx.strokeStyle = gradient; // Apply the gradient here
ctx.lineWidth = BORDER_WIDTH;
ctx.stroke();
}

// function to draw the percentage text
function drawText(ctx, dimension, progressValue) {
  const center = dimension / 2;
  ctx.textAlign = 'center';
  ctx.font = `${FONT_SIZE}px Arial`;
  ctx.fillText(`${progressValue} Push ups`, center, center + (FONT_SIZE / 3)); 
  ctx.fillStyle = '#007BFF'; // Choose a color for the text
}

// Swipe
const swipeContainer = document.getElementById('swipe-container');
handleSwipeGesture(swipeContainer);

function handleSwipeGesture(container) {
  let touchStartX = 0;
  let touchEndX = 0;
  const img = container.querySelector('img');
  const canvas = container.querySelector('canvas');

  container.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  container.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    swipeDirection(touchStartX, touchEndX, img, canvas);
  }, false);
}

function swipeDirection(startX, endX, img, canvas) {
  if (endX < startX) {
    showText(canvas, img);
  } else if (endX > startX) {
    showImage(canvas, img);
  }
}

function showText(canvas, img) {
  img.style.opacity = 0;
  const ctx = canvas.getContext('2d');
  const dimension = canvas.width;
  const progressValue = canvas.getAttribute('data-progress-value');
  const endAngle = (progressValue / 60) * 360;
  const colorIndex = 0; 
  drawCircularProgress(ctx, dimension, endAngle, colorIndex); 
  drawText(ctx, dimension, progressValue);
}

function showImage(canvas, img) {
  img.style.opacity = 1;
  const ctx = canvas.getContext('2d');
  const dimension = canvas.width;
  const progressValue = canvas.getAttribute('data-progress-value');
  const endAngle = (progressValue / 60) * 360;
  const colorIndex = 0; 
  drawCircularProgress(ctx, dimension, endAngle, colorIndex); 
}

 var isBackSide = false;

if (isBackSide) {
  // Get the canvas and the text elements
  var canvas = document.getElementById('canvas-profile');
  var text = document.getElementById('push-progress');

  // Hide the elements
  canvas.style.display = 'none';
  text.style.display = 'none';
} else {
  // Show the elements
  canvas.style.display = 'block';
  text.style.display = 'block';
}
