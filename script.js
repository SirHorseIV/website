class particle {
    constructor(x, y, radius, speed, xMoveEffect) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.xMoveEffect = xMoveEffect;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#1F2B34";
        ctx.fill();
    }
    update() {
        this.x += xMove * this.xMoveEffect;
        this.y -= this.speed;
    }
}

var width = window.innerWidth;
var height = window.innerHeight;
var c = document.getElementById("canvas");
c.setAttribute("width", width);
c.setAttribute("height", height);
c.style.width = width;
c.style.height = height;
var ctx = c.getContext("2d");

var xMove = 0, oldX = 0;
document.addEventListener('mousemove', (event) => {
    if (Math.abs(event.clientX - oldX) > Math.abs(xMove)) {
	    xMove = event.clientX - oldX;
    }
    oldX = event.clientX;
});

addEventListener("resize", (event) => {
    width = window.innerWidth;
    height = window.innerHeight;
    c.setAttribute("width", width);
    c.setAttribute("height", height);
    c.style.width = width;
    c.style.height = height;
});

var lastTime;
var requiredElapse = 1000 / 60

var particleDensity = 2;
var particleSpeed = 5;
var particleSpeedVar = 3
var particleSize = 6;
var particleSizeVar = 3;

var particles = []

function updateFrame(now) {
    requestAnimationFrame(updateFrame);

    if (!lastTime) { lastTime = now; }
    var elapsed = now - lastTime;

    if (elapsed > requiredElapse) {
        var numberOfParticles = (Math.random() * particleDensity) - Math.random()
        for (var i = 1; i < numberOfParticles; i++) {
            particles.push(new particle(Math.random() * width, height,
                                        particleSize + (Math.random() * particleSizeVar),
                                        particleSpeed + (Math.random() * particleSpeedVar),
                                        0.6 + (Math.random() * 0.4)));
        }
        xMove *= 0.9;
        if (xMove > 6) {xMove = 6;}
        else if (xMove < -6) {xMove = -6;}
        ctx.clearRect(0, 0, width, height);
        for (var i = 0; i < particles.length; i++)
        {
            particles[i].update();
            if (particles[i].y < -particleSize - 2) {
                particles.splice(i, 1);
            }
            particles[i].draw(ctx);
        }

        lastTime = now;
    }
}

updateFrame();