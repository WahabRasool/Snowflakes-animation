// Setup spin animation
const spin = gsap.timeline({ paused: true });
spin.from("#snowball", {
    duration: 5,
    rotate: 360,
    transformOrigin: "50% 50%",
    ease: "expo.out",
});

// Setup Canvas
const canvas = document.getElementById("snowball");
const ctx = canvas.getContext("2d");
canvas.width = 200;
canvas.height = 200;
let snowflakes = [];

function Snowflake(x, y, radius, speed, wind, alpha) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.wind = wind;
    this.update = function () {
        this.y += this.speed;
        this.x += this.wind;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    };

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.globalAlpha = alpha;
        ctx.fill();
    };
}

function createSnowflakes() {
    spin.restart(); // Start spin animation
    snowflakes = []; // Empty array
    const count = Math.floor(Math.random() * 301) + 100; // Decide how many snowflakes
    for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 3;
        const speed = Math.random() * 0.1 + 1;
        const wind = Math.random() * 2 - 1;
        const alpha = Math.random() * 0.6 + 0.4;
        snowflakes.push(new Snowflake(x, y, radius, speed, wind, alpha));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snowflakes.forEach((snowflake) => {
        snowflake.update();
        snowflake.draw();
    });

    requestAnimationFrame(animate);
}

// Ensure `createSnowflakes` is globally accessible
window.createSnowflakes = createSnowflakes;

// Initial setup
createSnowflakes();
animate();
