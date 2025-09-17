class Player{
    constructor({position, collisionBlocks}) {
        this.position = position;
        this.velocity = {
            x: 0,
            y: 1, //falling down by default
        }
        this.width = 25
        this.height = 25;
        this.collisionBlocks = collisionBlocks;
        
        this.direction = 0; 
        this.lastDirection = 1;
        this.friction = 4000;
        this.acceleration = 1500;
        this.turnAcceleration = 8000;
        this.speed = 1;
    }

    /**
     * Gets the previous direction of the player
     * returns an int representing the previous direction
     * -1 = left, 1 = right
     */
    previousDirection() {
        if(this.direction == 1){
            this.lastDirection = this.direction;
        }else{
            if (this.velocity.x < 0){
                this.lastDirection = -1;
            }else if (this.velocity.x > 0){
                this.lastDirection = 1;
            }
        }
    }

    /**
     * processes the elements of a player: direction, velocity
     */
    physicsProcess(delta){
        if(keys.d.pressed){
            this.direction = 1;
        } else if(keys.a.pressed){
            this.direction = -1;
            console.log(this.direction);
        }else{
            this.direction = 0;
        }
        this.previousDirection(); //store previous direction

        if(this.direction){ /*if the direction is not 0 (true)*/
            console.log("The direction is currently:" + this.direction);
            if (this.direction * this.velocity.x < 0){ //if we want to go in the opposite direction, slow down by our turn acceleration
                this.velocity.x = moveTowards(this.velocity.x, this.direction * this.speed, this.turnAcceleration * delta);
            }else{ // if we want to continue moving in a direction, speed up by our acceleration
                this.velocity.x = moveTowards(this.velocity.x, this.direction * this.speed, this.acceleration * delta);
            }
        } else{ //if we have no direction(direction is 0/false), slow down by the amount of friction
            this.velocity.x = moveTowards(this.velocity.x, 0, this.friction * delta);
        }

    }

    
    

    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.checkForHorizontalCollisions(); //Apply before gravity
        this.applyGravity();
        this.checkForVerticalCollisions();
    }

    checkForHorizontalCollisions(){
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]

            if(
                collision({
                    object1: this,
                    object2: collisionBlock,
                })
            ) {
                //console.log('we are colliding')
                if(this.velocity.x > 0){
                    this.velocity.x = 0;
                    this.position.x = collisionBlock.position.x - this.width - 0.01;
                    break
                }

                if(this.velocity.x < 0){
                    this.velocity.x = 0;
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01;
                    break //Speed up process by not having to continue loop
                }
            }
        }
    }

    applyGravity(){
        this.position.y += this.velocity.y;
        this.velocity.y += gravity;

    }
        
    
    checkForVerticalCollisions(){
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]

            if(
                collision({
                    object1: this,
                    object2: collisionBlock,
                })
            ) {
                //console.log('we are colliding')
                if(this.velocity.y > 0){
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y - this.height - 0.01;
                    break
                }

                if(this.velocity.y < 0){
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01;
                    break
                }
            }
        }
    }

}