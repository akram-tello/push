// Configuration Constants
const RADIAN = Math.PI / 180;
const START_ANGLE = 270;
const FONT_SIZE = 22;
const LINE_WIDTH = 5;
const BORDER_WIDTH = 10; // Width of the border around the profile image

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

// Swipe Gesture Handling
function handleSwipeGesture(container) {
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 30; // Minimum distance to consider as a swipe
    const img = container.querySelector('img');
    const canvas = container.querySelector('canvas');

    container.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        e.preventDefault();
    }, { passive: false });

    container.addEventListener('touchmove', e => {
        e.preventDefault();
    }, { passive: false });

    container.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (Math.abs(touchEndX - touchStartX) > minSwipeDistance) {
            swipeDirection(touchStartX, touchEndX, img, canvas);
        }
        e.preventDefault();
    }, { passive: false });
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
  drawCircularProgress(ctx, dimension, (progressValue / 100) * 360, 0);
  drawText(ctx, dimension, progressValue);
}

function showImage(canvas, img) {
  img.style.opacity = 1;
  const ctx = canvas.getContext('2d');
  const dimension = canvas.width;
  const progressValue = canvas.getAttribute('data-progress-value');
  drawCircularProgress(ctx, dimension, (progressValue / 100) * 360, 0);
}

function drawText(ctx, dimension, progressValue) {
  const center = dimension / 2;
  ctx.textAlign = 'center';
  ctx.font = `${FONT_SIZE}px Arial`;
  ctx.fillText(`${progressValue}%`, center, center + (FONT_SIZE / 3)); 
  ctx.fillStyle = '#007BFF'; // Text color
}

// Apply Swipe to All Swipe Containers
document.querySelectorAll('.swipe-container').forEach(container => {
    handleSwipeGesture(container);
});
