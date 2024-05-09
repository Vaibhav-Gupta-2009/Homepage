// Function to select elements by query selector
let select = (elem) => document.querySelector(elem);

// API endpoint for LeetCode submissions
let leetCodeAPI = "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";

async function fetchData() {
  // Fetch data from the API endpoints
  let solvedProblemsResponse = await fetch('https://alfa-leetcode-api.onrender.com/vaibhav2009/solved');
  let generalAPIResponse = await fetch('https://alfa-leetcode-api.onrender.com/');

  // Handle rate limiting (status code 429)
  if (solvedProblemsResponse.status == 429) {
    return; // Exit function if rate limited
  }

  // Parse API responses to JSON
  let solvedProblemsData = await solvedProblemsResponse.json();

  // Select elements to display progress bars
  let smallProgressBar = select('.line');
  let largeProgressBar = select('.line-lg');
  let mediumProgressBar = select('.line-md');

  // Calculate percentage progress for each difficulty level
  let smallPercentage = solvedProblemsData["acSubmissionNum"][1].count / 791 * 100;
  let mediumPercentage = solvedProblemsData["acSubmissionNum"][2].count / 1649 * 100;
  let largePercentage = solvedProblemsData["acSubmissionNum"][3].count / 699 * 100;

  // Apply width styles to progress bars based on calculated percentages
  smallProgressBar.classList.add('relative', 'after:absolute', 'after:left-0', 'after:h-[100%]', `after:w-[${smallPercentage}%]`, 'after:bg-white', 'after:rounded-full');
  largeProgressBar.classList.add('relative', 'after:absolute', 'after:left-0', 'after:h-[100%]', `after:w-[${largePercentage}%]`, 'after:bg-white', 'after:rounded-full');
  mediumProgressBar.classList.add('relative', 'after:absolute', 'after:left-0', 'after:h-[100%]', `after:w-[${mediumPercentage}%]`, 'after:bg-white', 'after:rounded-full');
}

// Call fetchData function when the script runs
fetchData();

// Event listener for touch move
window.addEventListener('touchmove', (e) => {
  gsap.to('.box', {
    x: e.touches[0].clientX,
    y: e.touches[0].clientY,
    ease: 'Power2.inOut',
    duration: 0.3,
    display: "block"
  });
});

// Event listener for touch end
window.addEventListener('touchend', (e) => {
  gsap.to('.box', {
    display: "none"
  });
});

// Event listener for click (triple-click)
window.addEventListener('click', (evt) => {
  if (evt.detail >= 3) {
    let t1 = new gsap.timeline();
    t1.to('.sidebar', {
        right: 0,
        duration: 0.3,
        ease: "none"
      })
      .from('.sidebar .exit', {
        x: "-100%",
        opacity: 0,
        duration: 0.2,
        ease: "none"
      })
      .from('.boxes- .elem', {
        opacity: 0,
        duration: 0.15,
        x: "-100%",
        stagger: 0.12
      });
  }
});

// Event listener for click on the exit button
select('.exit').addEventListener('click', () => {
  let t1 = new gsap.timeline();
  t1.to('.sidebar', {
    right: "-100%",
    duration: 0.3,
    ease: "Power2.inOut"
  });
});
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions based on device screen size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.3; // Adjusted to 30% of the screen height

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let eraserMode = false; // Flag to toggle eraser mode

// Event listeners for touch actions
canvas.addEventListener('touchstart', (e) => {
    if (isWithinCanvas(e.touches[0].clientX, e.touches[0].clientY)) {
        isDrawing = true;
        [lastX, lastY] = [e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop];
    }
});

canvas.addEventListener('touchmove', (e) => {
    if (!isDrawing) return;
    if (isWithinCanvas(e.touches[0].clientX, e.touches[0].clientY)) {
        if (!eraserMode) {
            draw(e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop);
        } else {
            erase(e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop);
        }
    }
});

canvas.addEventListener('touchend', () => {
    isDrawing = false;
});

// Function to draw on the canvas
function draw(x, y) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#0CFF9C';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
    [lastX, lastY] = [x, y];
}

// Function to erase on the canvas
function erase(x, y) {
    ctx.clearRect(x - 10, y - 10, 20, 20); // Adjust eraser size as needed
}

// Function to toggle eraser mode
function toggleEraser() {
    eraserMode = !eraserMode;
    if (eraserMode) {
        canvas.style.cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAXCAYAAAAPqLepAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAGYktHRAD/AP8A/6C9p5MAAACqSURBVHjabJJBCsIwEEXf+DLQfFEz+QhYFV2hArX4gbVqRF7gJElq0hSoYR8x8eOTlP4Jx5iZcOC4k+/ePn+wxkj3T5R4dlmC1c2eNQgicK6fL2r2ZVxPf0rOavu1XATCezy5uzNboL49I8z9I/AbJPAiD/YZ5qefv+NQCAZxVPTFAJQ4AAAAAElFTkSuQmCC"), auto';
    } else {
        canvas.style.cursor = 'crosshair';
    }
}

// Function to check if the touch coordinates are within the canvas
function isWithinCanvas(x, y) {
    const rect = canvas.getBoundingClientRect();
    return (
        x >= rect.left && x <= rect.right &&
        y >= rect.top && y <= rect.bottom
    );
}

// Event listener for toggling eraser mode
canvas.addEventListener('click', toggleEraser);

// Event listener for clear button
document.querySelector('.clear-btn').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});



let input = select('.search-input');

input.addEventListener('keydown',(e) => {
  console.log(e.keyCode)
  if(e.keyCode === 13 || e.key === "Enter" || e.which === 13) {
    e.preventDefault()
    let qry = input.value;
    
    let toBe = qry.split(" ").join("+")
    let query = `https://www.google.com/search?q=${toBe}`
    input.value = ""    
    window.location.href = query
  }
  console.log(e.keyCode)
})
// Function to handle mouse down event
function handleMouseDown(e) {
    if (isWithinCanvas(e.clientX, e.clientY)) {
        isDrawing = true;
        [lastX, lastY] = [e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop];
    }
}

// Function to handle mouse move event
function handleMouseMove(e) {
    if (!isDrawing) return;
    if (isWithinCanvas(e.clientX, e.clientY)) {
        if (!eraserMode) {
            draw(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        } else {
            erase(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        }
    }
}

// Function to handle mouse up event
function handleMouseUp() {
    isDrawing = false;
}

// Event listeners for mouse actions
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);
// Function to move a fixed element with mouse cursor
function moveFixedElementWithMouse(e) {
    gsap.to('.box', {
        x: e.clientX,
        y: e.clientY,
        ease: 'Power2.inOut',
        duration: 0.3,
        display: "block"
    });
}

// Event listener for mousemove event
window.addEventListener('mousemove', moveFixedElementWithMouse);
