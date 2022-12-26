class particle {
    constructor(x, y, radius, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#202D2D";
        ctx.fill();
    }
    update() {
        y += this.speed;
    }
}

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var WIDTH = document.getElementById("canvas").getBoundingClientRect().width;
var HEIGHT = document.getElementById("canvas").getBoundingClientRect().height;

function updateFrame() {
    
}