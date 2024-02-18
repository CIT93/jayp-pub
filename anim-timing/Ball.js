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
    updateLocation(fps){
        this.#loc.x += this.#vec.x / fps;
        this.#loc.y += this.#vec.y / fps;
        if(this.#loc.x - this.#radius <= 0){
            // bounce left to right
            this.#loc.x = 2*this.#radius - this.#loc.x;
            this.#vec.x = -this.#vec.x;
        }else if(this.#loc.x + this.#radius >= this.#bounds.x){
            // bounce right to left
            this.#loc.x = 2 * (this.#bounds.x - this.#radius) - this.#loc.x;
            this.#vec.x = -this.#vec.x;
        }
        if(this.#loc.y - this.#radius <= 0){
            // bounce up to down
            this.#loc.y = 2*this.#radius - this.#loc.y;
            this.#vec.y = -this.#vec.y;
        }else if(this.#loc.y + this.#radius >= this.#bounds.y){
            // bounce down to up
            this.#loc.y = 2 * (this.#bounds.y - this.#radius) - this.#loc.y;
            this.#vec.y = -this.#vec.y;
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
