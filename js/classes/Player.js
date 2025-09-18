class Player extends Sprite{
    constructor({position, collisionBlocks, imageSrc, frameRate, scale = 1.5, animations,}) {
        super({imageSrc, frameRate, scale})
        this.position = position;
        this.velocity = {
            x: 0,
            y: 1, //falling down by default
        }
        
        this.collisionBlocks = collisionBlocks;
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 10,
            height: 10,
        }

        this.animations = animations

        for (let key in this.animations){
            const image = new Image()
            image.src = this.animations[key].imageSrc
            
            this.animations[key].image = image
            console.log(`Added key: ${key} to animations`)
        }
        
        this.direction = 0; 
        this.lastDirection = 1;
        this.friction = 4000;
        this.acceleration = 1500;
        this.turnAcceleration = 8000;
        this.speed = 1;
    }

    switchSprite(key){
        if(this.image === this.animations[key].image) return
        this.image = this.animations[key].image
        this.frameBuffer = this.animations[key].frameBuffer
        this.frameRate = this.animations[key].frameRate
    }

    updateHitbox(){
        this.hitbox = {
            position: {
                x: this.position.x + 2,
                y: this.position.y + 2,
            },
            width: 10,
            height: 10,
        }
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
            //console.log(player.width)
            player.switchSprite('Jog1')

        } else if(keys.a.pressed){
            this.direction = -1;
            //console.log(this.direction);
        }else{
            this.direction = 0;
            player.switchSprite("Idle")
        }
        this.previousDirection(); //store previous direction

        if(this.direction){ /*if the direction is not 0 (true)*/
            //console.log("The direction is currently:" + this.direction);
            if (this.direction * this.velocity.x < 0){ //if we want to go in the opposite direction, slow down by our turn acceleration
                this.velocity.x = moveTowards(this.velocity.x, this.direction * this.speed, this.turnAcceleration * delta);
                
            }else{ // if we want to continue moving in a direction, speed up by our acceleration
                this.velocity.x = moveTowards(this.velocity.x, this.direction * this.speed, this.acceleration * delta);
                //player.switchSprite('Jog1')

            }
        } else{ //if we have no direction(direction is 0/false), slow down by the amount of friction
            this.velocity.x = moveTowards(this.velocity.x, 0, this.friction * delta);
        }

    }

    
    

    update(){
        this.updateFrames()
        this.updateHitbox()
        //console.log(player.position.y);
     
        //draws out the image
        c.fillStyle = 'rgba(0,255, 0, 0.2)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        c.fillStyle = 'rgba(255,0, 0, 0.2)'
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)



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
                console.log('we are colliding horizontally')
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
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;
        

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
                console.log('we are colliding vertically')
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