class Game {
    constructor(CANVAS) {
        this.canvas = CANVAS;
        this.context = CANVAS.getContext("2d");
    }

    run = () => {
        let p1 = new Pipe(this.context);
        let p2 = new Pipe(this.context);


        p1.setCollidable(true);
        p2.setCollidable(true);
        p1.setPosition([0 , 0]);
        p1.setBoundingBox([50 , 100]);

        p2.setPosition([51 , 51]);
        p2.setBoundingBox([50 , 50]);

        console.log(p1.collidesWith(p2));

        p1.draw();
        p2.draw();
    }
}


class Pipe extends Sprite {
    constructor(CONTEXT) {
        super(CONTEXT);
    }


    draw = () => {
        this.context.fillRect(this.pos[0] , this.pos[1] , this.boundingBox[0] , this.boundingBox[1]);
    }
}