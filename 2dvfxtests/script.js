class SparkGraphics extends PIXI.Graphics {
    constructor(colour) {
        super();
        this.colour = colour;
        this.refresh();
    }
    refresh() {
        this.clear();
        this.lineStyle(1, this.colour);
    }
    drawSpark(points) {
        this.moveTo(points[0], points[1]);
        this.lineTo(points[2], points[3]);
    }
}

class Spark {
    constructor(position, speed, angle, drag, colour) {
        this.position = position;
        this.velocity = {
            x: speed * Math.cos(angle),
            y: speed * Math.sin(angle)
        };
        this.drag = drag;
        this.colour = colour;
    }
    speed() {
        return Math.sqrt(this.velocity.x**2 + this.velocity.y**2);
    }
    update() {
        // Slow the spark down
        this.velocity.x *= this.drag;
        this.velocity.y *= this.drag;
        // Update position based on velocity
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

function updateParticles(array, particleGraphic) {
    for (let i = 0; i < array.length; i++) {
        array[i].update();
        particleGraphic.drawSpark([array[i].position.x, array[i].position.y,
            array[i].position.x - array[i].velocity.x * 3, array[i].position.y - array[i].velocity.y * 3]);
        let speed = array[i].speed()
        if ((speed < 0.1 && speed > -0.1) || array[i].position.x < 0) {
            array.splice(i, 1);
            i--;
        }
    }
}

function explosion(x, y, intensity, container, array) {
    for (let i = 0; i < intensity; i++) {
        let particle = new Spark({ x: x, y: y }, Math.random() * 90, Math.random() * 2 * Math.PI, 0.8, 0xffffff);
        array.push(particle);
    }
    container.addChild(particleGraphic);
}

// Create application which fills entire screen including on resize
let app = new PIXI.Application({ resizeTo: window });
addEventListener("resize", (event) => {
    app.resize();
})
document.body.appendChild(app.view);

// Create particle array and container
let particleContainer = new PIXI.Container();
app.stage.addChild(particleContainer);
let particleGraphic = new SparkGraphics(0xffdf90);
particleContainer.addChild(particleGraphic);
let particles = [];

// Add event listener
addEventListener("mousedown", event => {
    explosion(event.clientX, event.clientY, 1000, particleContainer, particles);
})

// Application loop
let elapsed = 0.0;
app.ticker.add((delta) => {
    particleGraphic.refresh();
    // Update/Draw particles
    updateParticles(particles, particleGraphic);
    // Track elapsed time
    elapsed += delta;
})