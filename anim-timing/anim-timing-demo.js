import { Ball } from "./Ball.js";

// We define a global object to contain all our globals, for configuration
// and working variables, just to avoid cluttering the global namespace.
const anim = {
    CANVAS:             undefined,
    CTX:                undefined,
    canvasX:            undefined,  // actual size of canvas
    canvasY:            undefined,

    ballSize:           10,         // size of balls
    minBallSpeed:       50,         // minimum and maximum ball speed in pixels per second
    maxBallSpeed:       250,
    avoidBorder:        0.10,       // min distance from border to spawn

    frameRate:          undefined,  // default wanted framerate
    timeSync:           undefined,  // track time between frames, for sync'ing
    Ball:               [],         // the ball objects to draw

    // On some browsers, the window innerWidth and innerHeight are still large
    // enough to enable scrollbars for some reason. We will shrink them by some
    // arbitrary amount to remove the scrollbars in those browsers.
    CANVAS_SIZE_OFFSET:     24,
    CONTROLS_SPACE:         120,     // extra space at bottom to fit controls
};

// our standard initialize() function, called only once at page load
function initialize(){
    // get our canvas and a 2d context for drawing
    anim.CANVAS = document.getElementById("anim-canvas");
    anim.CTX = anim.CANVAS.getContext("2d");
    // set the adjusted canvas size
    anim.canvasX = window.innerWidth - anim.CANVAS_SIZE_OFFSET;
    anim.CTX.canvas.width = anim.canvasX;
    anim.canvasY = window.innerHeight - anim.CANVAS_SIZE_OFFSET - anim.CONTROLS_SPACE;
    anim.CTX.canvas.height = anim.canvasY;
    // add a thin border just to see exactly where our canvas is
    anim.CTX.canvas.style = "border: 1px solid;";

    // set initial number of balls from control default value
    let numBalls = document.getElementById("num-balls-ctrl").value;
    for(let n = 0; n < numBalls; ++n){
        anim.Ball.push(makeBall());
    }
    // set initial framerate from control default value
    anim.frameRate = document.getElementById("fps-ctrl").value;

    // store the initial timestamp before the first animation frame
    anim.timeSync = performance.now();
    // request the first animation frame
    window.requestAnimationFrame(function(){ update(); });
}

// The update() function is called at every animation frame, i.e. before the
// next "redraw". It is called for the first time in the initialize()
// function, and then it is called from itself for subsequent frames.
function update(){
    // We want to check the amount of time since the last frame, and do
    // something only if enough time has passed based upon the framerate
    // that we want.
    const pNow = performance.now();     // get the current timestamp
    const dt = pNow - anim.timeSync;    // find milliseconds since last frame
    // do somethig only if enough time has passed
    if(dt/1000 >= 1/anim.frameRate){
        // clear the canvas at the start of each frame
        anim.CTX.clearRect(0, 0, anim.canvasX, anim.canvasY);
        for(const ball of anim.Ball){
            // calculate the new location of the ball
            ball.updateLocation(anim.frameRate);
            // draw the ball onto the canvas
            ball.draw(anim.CTX, "black");
        }
        anim.timeSync = pNow;           // reset timestamp for next frame
    }

    // request the next animation frame
    window.requestAnimationFrame(function(){ update(); });
}


//-------- Event Handlers

// slider control for number of balls
document.getElementById("num-balls-ctrl").addEventListener("input",(e)=>{
    const numBalls = e.target.value;
    let currentBalls = anim.Ball.length;
    document.getElementById("num-balls").textContent = numBalls;
    while(numBalls > currentBalls){
        anim.Ball.push(makeBall());
        ++currentBalls;
    }
    while(numBalls < currentBalls){
        anim.Ball.pop();
        --currentBalls;
    }
});

// slider control for framerate
document.getElementById("fps-ctrl").addEventListener("input",(e)=>{
    const fps = e.target.value;
    document.getElementById("fps").textContent = fps;
    anim.frameRate = fps;
});

//-------- Utility Functions

// create a ball with random properties based upon config
function makeBall(){
    // pick a random point (bx, by) in the canvas that is at least avoidBorder
    // percent away from the borders
    const bx = Math.random() * anim.canvasX * (1 - 2*anim.avoidBorder) + anim.canvasX * anim.avoidBorder;
    const by = Math.random() * anim.canvasY * (1 - 2*anim.avoidBorder) + anim.canvasY * anim.avoidBorder;
    // choose a vector (dx, dy) that is the direction and speed the ball is
    // travelling, and give each a 50% chance to be negative
    let dx = Math.random() * (anim.maxBallSpeed - anim.minBallSpeed) + anim.minBallSpeed;
    let dy = Math.random() * (anim.maxBallSpeed - anim.minBallSpeed) + anim.minBallSpeed;
    if(Math.random()<0.5){      // allow for left or right initial movement
        dx *= -1;
    }
    if(Math.random()<0.5){      // allow for up or down initial movement
        dy *= -1;
    }
    return new Ball(bx, by, anim.ballSize, dx, dy, anim.canvasX, anim.canvasY);
}

// start it all up!
initialize();
