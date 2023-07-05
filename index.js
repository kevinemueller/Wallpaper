// Function returns a random int/float between min - max
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

class Dot {
    constructor(x, y, index) {

        this.isNew = true;
        
        this.size = random(1, 7);
        this.posX = x;
        this.posY = y;

        this.maxTime = random(100, 200);
        this.timeToLive = this.maxTime;

        this.maxOpacity = random(0.1, 0.75);
        this.opacity = 0;

        this.velX = random(-1, 1) * 0.1;
        this.velY = random(-1, 1) * 0.1;

        this.index = index;
    }

    SubTime(time) {
        this.timeToLive-=time;
    }
}

// Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let nodes = new Array(200);

for(let i = 0; i < nodes.length; i++)
    nodes[i] = new Dot(random(0, window.innerWidth), random(window.innerHeight / 4, window.innerHeight / 1.25), i);

function animate() {

     // Set Canvas width & height
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;

    // clear canvas
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(const node of nodes) {
        ctx.fillStyle = `rgba(84, 255, 175, ${node.opacity})`;
        ctx.shadowColor = 'rgb(124, 255, 255)';
        ctx.shadowBlur = node.size * 5;
        ctx.beginPath();
        ctx.arc(node.posX, node.posY, node.size, Math.PI, 3*Math.PI);
        ctx.fill();

        //Update variables
        if(node.isNew) {
            node.opacity += 0.005;

            if(node.opacity >= node.maxOpacity) {
                node.opacity = node.maxOpacity;
                node.isNew = false;
            }
        }
        else {
            node.SubTime(0.5);
            node.opacity = node.maxOpacity * (node.timeToLive / node.maxTime);
        }

        //Update Position
        node.posX += node.velX;
        node.posY += node.velY;

        if(node.opacity <= 0 && !node.isNew)
            nodes[node.index] = new Dot(random(0, window.innerWidth), random(window.innerHeight / 4, window.innerHeight / 1.25), node.index);
    }

    requestAnimationFrame(animate);
}

animate();