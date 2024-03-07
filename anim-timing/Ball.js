// This is our Ball class. (You'll learn about classes in Week 11.)
//
// Each one can create a single Ball object that behaves independantly of
// all other Ball objects.
//
// It has only a constructor, an updateLocation() method, and a
// draw() method.

class Ball {
    #defaultRadius = 10;
    #defaultBounds = [100, 100];

    #loc;       // location (vec2)
    #radius;    // size
    #vec;       // motion vector (vec2)
    #bounds;    // max location of bounding box (vec2)

    constructor(x = 0, y = 0, rad = -1, dx = 0, dy = 0, bx = -1, by = -1){
        this.#loc = {       // set initial location
            x:  x,
            y:  y,
        };
        if(rad <= 0){       // set size
            rad = this.#defaultRadius;
        }
        this.#radius = rad;
        this.#vec = {       // set initial motion
            x:  dx,
            y:  dy,
        };
        if(bx < 0){         // set the boundary for bounces
            bx = this.#defaultBounds[0];
        }
        if(by < 0){
            by = this.#defaultBounds[1];
        }
        this.#bounds = {
            x:  bx,
            y:  by,
        }
    }

    // update the location of the ball for a single frame, given the framerate
    //
    // Because the ball may travel far beyond the border within a single
    // frame, depending upon its speed, we need to calculate where it would
    // actually be had it bounced at some point in between the previouis frame
    // and the new frame.
    //
    // As you can see, the equations themselves are actually super simple.
    // The key learning point is coming up with them yourself! And also
    // convincing yourself that they actually work and why.
    //
    updateLocation(fps){
        this.#loc.x += this.#vec.x / fps;
        this.#loc.y += this.#vec.y / fps;
        if(this.#loc.x - this.#radius <= 0){
            // bounce left to right
            this.#loc.x = 2 * this.#radius - this.#loc.x;   // calculate where the ball would actually be
            this.#vec.x = -this.#vec.x;                     // reverse its X direction
        }else if(this.#loc.x + this.#radius >= this.#bounds.x){
            // bounce right to left
            this.#loc.x = 2 * (this.#bounds.x - this.#radius) - this.#loc.x;        // calculate where the ball would actually be
            this.#vec.x = -this.#vec.x;                                             // reverse its X direction
        }
        if(this.#loc.y - this.#radius <= 0){
            // bounce up to down
            this.#loc.y = 2 * this.#radius - this.#loc.y;   // calculate where the ball would actually be
            this.#vec.y = -this.#vec.y;                     // reverse its Y direction
        }else if(this.#loc.y + this.#radius >= this.#bounds.y){
            // bounce down to up
            this.#loc.y = 2 * (this.#bounds.y - this.#radius) - this.#loc.y;        // calculate where the ball would actually be
            this.#vec.y = -this.#vec.y;                                             // reverse its Y direction
        }
    }

    // draw the ball using the given 2d context and color
    draw(ctx, color){
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.#loc.x, this.#loc.y, this.#radius, 0, Math.PI*2);
        ctx.fill();
    }
}

export { Ball };
