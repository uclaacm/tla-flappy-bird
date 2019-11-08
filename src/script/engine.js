/* -------------------------
 * Sprite Class
 * -------------------------
 *
 * Manages a single entity called a "sprite"
 * Sprites are smaller images/entities that are integrated into a larger context.
 * 
 * These sprites can move and detect collisions between them.
 * 
 * -------------------------
 * Creating your own Sprite
 * -------------------------
 * 
 * You MUST define draw() in your subclass. In general, Sprite takes care of 
 * everything else so it's not recommended to overload anything.
 */
class Sprite {
    /* 
     * CONTEXT- a 2d context from an HTML Canvas element
     */
    constructor(CONTEXT) {
        this.context = CONTEXT;
    }


    /*
     * IS_COLLIDABLE- boolean that determines if the Sprite object can collide with anything
     */
    setCollidable = (IS_COLLIDABLE) => {
        this.isCollidable = IS_COLLIDABLE;
    }


    /*
     * POS- an integer array [xCoordinate , yCoordinate] that is the new position of the Sprite
     * 
     * Note: 
     *      The position of the sprite is its upper left corner.
     *      (0 , 0) is the upper left corner of the Canvas.
     */
    setPosition = (POS) => {
        this.pos = POS;
    }


    /*
     * BOUNDING_BOX- an integer array [width , height] that serves as the dimensions of the bounding box
     */
    setBoundingBox = (BOUNDING_BOX) => {
        this.boundingBox = BOUNDING_BOX;
    }

    /*
     * Determines if this Sprite object collides with another Sprite object
     *
     * returns True if they collide, False otherwise
     */
    collidesWith = (SPRITE) => {
        // Check for collidability 
        if(!this.isCollidable || !SPRITE.isCollidable) {
            return false;
        }


        // Check each corner of SPRITE.boundingBox and see if they're within our bounding box
        let spriteCorners = [ 
            [SPRITE.pos[0] , SPRITE.pos[1]] ,
            [SPRITE.pos[0] + SPRITE.boundingBox[0] , SPRITE.pos[1]] ,
            [SPRITE.pos[0] , SPRITE.pos[1] + SPRITE.boundingBox[1]] ,
            [SPRITE.pos[0] + SPRITE.boundingBox[0] , SPRITE.pos[1] + SPRITE.boundingBox[1]]
        ];

        let collides = false;

        spriteCorners.forEach(coordinate => {
            if(coordinate[0] >= this.pos[0] && coordinate[0] <= this.pos[0] + this.boundingBox[0] &&
               coordinate[1] >= this.pos[1] && coordinate[1] <= this.pos[1] + this.boundingBox[1]) {

                collides = true;
            }
        });

        return collides;
    }
}