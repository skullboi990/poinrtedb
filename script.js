// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};

// Start the rotation
let direction = 0.1; // change this value to adjust rotation speed
let angle = 0;
let rotating = true;

function rotate() {
  if (!rotating) {
    requestAnimationFrame(rotate);
    return;
  }
  
  angle += direction;
  if (angle > 50) {
    direction = -0.1;
  } else if (angle < -50) {
    direction = 0.1;
  }
  modelViewers.forEach(modelViewer => {
    modelViewer.setAttribute('camera-orbit', `${angle}deg 75deg auto`);
  });
  requestAnimationFrame(rotate);
}

document.addEventListener('pointerdown', () => {
  rotating = false;
});

document.addEventListener('pointerup', () => {
  rotating = true;
});

window.addEventListener('load', (event) => {
  const modelViewers = document.querySelectorAll('model-viewer');
  
  modelViewers.forEach(modelViewer => {
    // Attach the progress event listener
    modelViewer.addEventListener('progress', onProgress);

    // Dispatch synthetic click event
    const click = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    modelViewer.dispatchEvent(click);
  });

  // Start the rotation
  rotate();
});
