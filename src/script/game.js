class Game {
    constructor(CANVAS) {
        this.FPS = 60;

        this.canvas = CANVAS;
        this.context = CANVAS.getContext("2d");
        this.context.imageSmoothingEnabled = false;

        this.loopRunner = window.setInterval(this.run, 1000.0 / this.FPS);
    }


    resize = (width , height) => {
        this.canvas.width = width;
        this.canvas.height = height;
    }


    start = () => {
        this.bird = new Bird(this.context);
        this.bird.setCollidable(true);
        this.bird.setPosition([50, 50]);
        this.bird.setAcceleration([0, .05]);
        this.bird.setVelocity([0, -1]);
        this.bird.setBoundingBox([20, 20]);

        this.ground = new Ground(this.context);
        this.ground.setCollidable(true);
        this.ground.setPosition([0, this.canvas.height - 20]);
        this.ground.setBoundingBox([this.canvas.width, 20]);

        this.roof = new Roof(this.context);
        this.roof.setCollidable(true);
        this.roof.setPosition([0, -20]);
        this.roof.setBoundingBox([this.canvas.width, 20])

        window.addEventListener("keydown", event => {
            if (event.key === " ") {
                this.bird.jump(-2);
            }
        })

        this.run();
    }


    run = () => {
        this.bird.updateKinematics(100.0 / this.FPS);

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);


        if (this.ground.collidesWith(this.bird)) {
            this.gameOver();
        }

        if (this.roof.collidesWith(this.bird)) {
            this.bird.setPosition([50, 0]);
            this.bird.setVelocity([0, 0]);
        }


        // Draw background
        let background = new Image();
        background.src = "./assets/img/background.JPG"
        this.context.drawImage(background , 0 , 0 , this.canvas.width , this.canvas.height);



        // Draw everything after this line:
        this.bird.draw();
        this.ground.draw();
    }


    gameOver = () => {
        window.clearInterval(this.loopRunner);

        console.log("gg!");
    }
}


class Pipe extends PhysicalSprite {
    constructor(CONTEXT) {
        super(CONTEXT);
    }


    draw = () => {
        this.context.fillRect(this.pos[0], this.pos[1], this.boundingBox[0], this.boundingBox[1]);
    }
}


class Bird extends PhysicalSprite {
    constructor(CONTEXT) {
        super(CONTEXT);
    }


    draw = () => {
        this.context.fillStyle = 'orange';
        this.context.fillRect(this.pos[0], this.pos[1], this.boundingBox[0], this.boundingBox[1]);
    }


    jump = (accel) => {
        this.setVelocity([0, accel]);
    }
}


class Ground extends PhysicalSprite {
    constructor(CONTEXT) {
        super(CONTEXT);
    }


    draw = () => {
        this.context.fillStyle = 'green';
        this.context.fillRect(this.pos[0], this.pos[1], this.boundingBox[0], this.boundingBox[1]);
    }
}


class Roof extends PhysicalSprite {
    constructor(CONTEXT) {
        super(CONTEXT);
    }


    draw = () => {
        // Don't really have to do anything since it's invisible
    }
}