class Game {
    constructor(CANVAS) {
        // Constants
        this.FPS                = 60;
        this.BIRD_START_X       = 200;
        this.BIRD_START_Y       = 200;
        this.BIRD_ACCEL         = .15;
        this.BIRD_WIDTH         = 100;
        this.BIRD_HEIGHT        = 100;
        this.BIRD_JUMP_VEL      = -5;
        this.GROUND_HEIGHT      = 100;
        this.ROOF_HEIGHT        = 100;
        this.PIPE_WIDTH         = 100;
        this.PIPE_SPEED         = -3;
        this.PIPE_GEN_SPEED     = 1300;                     // This is a time in ms!
        this.PIPE_SEPARATION    = this.BIRD_HEIGHT * 3;     // This is between top and bottom

        this.canvas = CANVAS;
        this.context = CANVAS.getContext("2d");
        this.context.imageSmoothingEnabled = false;
    }


    resize = (width , height) => {
        this.canvas.width = width;
        this.canvas.height = height;
    }


    load = () => {
        this.createSprites();

        this.background = new Image();
        this.background.src = "./assets/img/background.JPG";
        this.background.onload = this.pregame;
    }


    pregame = () => {
        this.draw();

        this.gameStart = window.addEventListener("keydown" , this.startOnKeydown);
    }


    startOnKeydown = (event) => {
        if (event.key === " ") {
            this.start();
        }
    }

    
    createSprites = () => {
        this.bird = new Bird(this.context);
        this.bird.setCollidable(true);
        this.bird.setPosition([this.BIRD_START_X, this.BIRD_START_Y]);
        this.bird.setAcceleration([0, this.BIRD_ACCEL]);
        this.bird.setVelocity([0, 0]);
        this.bird.setBoundingBox([this.BIRD_WIDTH, this.BIRD_HEIGHT]);

        this.ground = new Ground(this.context);
        this.ground.setCollidable(true);
        this.ground.setPosition([0, this.canvas.height - this.GROUND_HEIGHT]);
        this.ground.setBoundingBox([this.canvas.width, this.GROUND_HEIGHT]);

        this.roof = new Roof(this.context);
        this.roof.setCollidable(true);
        this.roof.setPosition([0, -this.ROOF_HEIGHT]);
        this.roof.setBoundingBox([this.canvas.width, this.ROOF_HEIGHT])

        this.pipes = [];
    }


    start = () => {
        // Remove start game event listener
        window.removeEventListener("keydown" , this.startOnKeydown);

        // Make the bird jump on spacebar down
        window.addEventListener("keydown", event => {
            if (event.key === " ") {
                this.bird.jump(this.BIRD_JUMP_VEL);
            }
        });

        // Looped events
        this.loopRunner = window.setInterval(this.run, 1000.0 / this.FPS);
        this.pipeGenerator = window.setInterval(this.generatePipeSet , this.PIPE_GEN_SPEED);

        // This is so the bird jumps when you start the game instead of just falling
        this.bird.jump(this.BIRD_JUMP_VEL);

        this.run();
    }


    run = () => {
        // 100.0 is not a typo! this is just a nice number after trial and error
        const DT = 100.0 / this.FPS;

        // Update Physics
        this.bird.updateKinematics(DT);
        this.pipes.forEach(i => {
            i.updateKinematics(DT);
        });


        // Collision Detection
        if (this.ground.collidesWith(this.bird)) {
            this.gameOver();
        }

        if (this.roof.collidesWith(this.bird)) {
            this.bird.setPosition([this.BIRD_START_X, 0]);
            this.bird.setVelocity([0, 0]);
        }

        this.pipes.forEach(i => {
            if (i.collidesWith(this.bird)) {
                this.gameOver();
            }
        });


        // Garbage Cleanup
        this.pipes = this.pipes.filter(i => i.pos[0] > (0 - this.PIPE_WIDTH));

        this.draw();
    }


    gameOver = () => {
        window.clearInterval(this.loopRunner);
        window.clearInterval(this.pipeGenerator);
        this.bird.setPosition([this.BIRD_START_X , this.canvas.height - this.BIRD_HEIGHT - this.GROUND_HEIGHT]);
    }


    generatePipeSet = () => {
        const LEFTOVER_HEIGHT = this.canvas.height - this.GROUND_HEIGHT;
        const PIPE_HEIGHTS = [
            LEFTOVER_HEIGHT * .1 ,
            LEFTOVER_HEIGHT * .2 ,
            LEFTOVER_HEIGHT * .3 ,
            LEFTOVER_HEIGHT * .4 ,
            LEFTOVER_HEIGHT * .5 ,
        ];

        let topPipeHeight = PIPE_HEIGHTS[Math.floor(Math.random() * PIPE_HEIGHTS.length)];
        let topPipe = new Pipe(this.context);
        let bottomPipe = new Pipe(this.context);

        topPipe.setCollidable(true);
        topPipe.setAcceleration([0 , 0]);
        topPipe.setVelocity([this.PIPE_SPEED , 0]);
        topPipe.setPosition([this.canvas.width , 0]);
        topPipe.setBoundingBox([this.PIPE_WIDTH , topPipeHeight]);

        bottomPipe.setCollidable(true);
        bottomPipe.setAcceleration([0 , 0]);
        bottomPipe.setVelocity([this.PIPE_SPEED , 0]);
        bottomPipe.setPosition([this.canvas.width , topPipeHeight + this.PIPE_SEPARATION]);
        bottomPipe.setBoundingBox([this.PIPE_WIDTH , LEFTOVER_HEIGHT - topPipeHeight - this.PIPE_SEPARATION]);

        this.pipes.push(topPipe);
        this.pipes.push(bottomPipe);
    }


    draw = () => {
        this.context.drawImage(this.background , 0 , 0 , this.canvas.width , this.canvas.height);
        console.log(this.canvas.width);
        console.log(this.canvas.height);
        console.log(this.background);


        this.bird.draw();
        this.ground.draw();
        this.pipes.forEach(i => {
            i.draw();
        });
    }
}


// PhysicalSprite Components


class Pipe extends PhysicalSprite {
    constructor(CONTEXT) {
        super(CONTEXT);
    }


    draw = () => {
        this.context.fillStyle = 'blue';
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