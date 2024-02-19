let CANVAS = document.getElementById("anim-canvas");
let CTX = CANVAS.getContext("2d");
let CANVAS_SIZE_OFFSET = 24;

// our ball's global info
let ballX = 0;          // our ball's coordinates
let ballY = 0;
const ballSize = 10;    // radius of ball
let speedX = 3;         // our ball's speed in both axes
let speedY = 3;

// the framerate that we want to have
const frameRate = 30;
// timestamp for animation frame timing
let prevFrameTime;

function initialize(){
    // set the adjusted canvas size
    CTX.canvas.width = window.innerWidth - CANVAS_SIZE_OFFSET;
    CTX.canvas.height = window.innerHeight - CANVAS_SIZE_OFFSET;
    CTX.canvas.style = "border: 1px solid;";

    // save a starting value for the animation timestamp
    prevFrameTime = performance.now();

    // begin our animation
    window.requestAnimationFrame( update );
}

function update(){
    const pNow = performance.now();     // get the timestamp for *this* frame
    const deltaTime = pNow - prevFrameTime;    // find ms since last frame
    if(deltaTime/1000 >= 1/frameRate){
        // clear the canvas from the last frame
        // (or the old ball will still be visible at the old location)
        CTX.clearRect(0, 0, CTX.canvas.width, CTX.canvas.height);

        // draw our ball at its current location using context.arc()
        CTX.beginPath();
        CTX.fillStyle = "black";
        CTX.arc(ballX, ballY, ballSize, 0, Math.PI*2);  // 2*pi is a full circle
        CTX.fill();

        // move the ball by its speed for the next animation frame
        ballX += speedX;
        ballY += speedY;

        // we drew a frame, so update the "previous" frame time for the next call
        prevFrameTime = pNow;
    }
    // request the next animation frame
    window.requestAnimationFrame( update );
}

initialize();
