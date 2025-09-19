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

        this.direction = 0; 
        this.lastDirection = 0;
        this.friction = 10000;
        this.acceleration = 1500;
        this.turnAcceleration = 10000;
        this.speed = 2;

        //character states
        this.idle = true;
        this.looking = false;
        this.moving = false;
        this.jumping = false;

        this.onFloor = false;

        this.spinDashChargeTime = 0;
        this.chargingSpinDash = false;
        this.loadingSpinDash = false;
        this.spinDashing = false;

        for (let key in this.animations){
            const image = new Image()
            image.src = this.animations[key].imageSrc
            
            this.animations[key].image = image
            console.log(`Added key: ${key} to animations`)
        }
        
        this.camerabox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 200,
            height: 80,
        }

        
    }

    switchSprite(key){
        if(this.image === this.animations[key].image) return
        this.image = this.animations[key].image
        this.frameBuffer = this.animations[key].frameBuffer
        this.frameRate = this.animations[key].frameRate
    }

    updateCameraBox(){
        this.camerabox = {
        position: {
            x: this.position.x - 75,
            y: this.position.y - 25,
        },
        width: 200,
        height: 100,
        }
    }

    checkForHorizontalCanvasCollision(){
        if (this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 2864 ||
            this.hitbox.position.x + this.velocity.x <= 0
        ){
            this.velocity.x = 0;
        }

    }

    shouldPanCameraToTheLeft({canvas, camera}){
        const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width
        const scaledDownCanvasWidth = canvas.width/4

        if(cameraboxRightSide >= 2864) return //greater than width of stage

        if(cameraboxRightSide >= scaledDownCanvasWidth + Math.abs(camera.position.x)){
            //console.log('translate to the left')
            camera.position.x -= this.velocity.x
        }
    }

    shouldPanCameraToTheRight({canvas, camera}){
       if (this.camerabox.position.x <= 0 ) return

       if(this.camerabox.position.x <= Math.abs(camera.position.x)){
            camera.position.x -= this.velocity.x

       }
    }

    shouldPanCameraDown({canvas, camera}){
       if (this.camerabox.position.y  + this.velocity.y <= 0 ) return

       if(this.camerabox.position.y <= Math.abs(camera.position.y)){
            camera.position.y -= this.velocity.y

       }
    }

    shouldPanCameraUp({canvas, camera}){
       if (this.camerabox.position.y  + this.camerabox.height + this.velocity.y >= backgroundImageHeight ) return

        const scaledCanvasHeight = canvas.height /4
       if(this.camerabox.position.y + this.camerabox.height >= Math.abs(camera.position.y)
            + scaledCanvasHeight){
            camera.position.y -= this.velocity.y

       }
    }

    updateHitbox(){
        this.hitbox = {
            position: {
                x: this.position.x + 8,
                y: this.position.y + 2,
            },
            width: 35,
            height: 55,
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

        //flip sprite based on velocity


        if(keys.d.pressed){
            this.direction = 1;
            //console.log(player.width)
            player.switchSprite('Jog1')
            player.shouldPanCameraToTheLeft({canvas, camera})

        } else if(keys.a.pressed){
            this.direction = -1;
            //console.log(this.direction);
            player.shouldPanCameraToTheRight({canvas, camera})
        }else{
            this.direction = 0;
            player.switchSprite("Idle")
        }
        

        if(player.velocity.y < 0){
            player.shouldPanCameraDown({camera, canvas})
        } else if (player.velocity.y > 0){
            player.shouldPanCameraUp({camera, canvas})
        }

        if(this.direction != 0 && !this.looking){ /*if the direction is not 0 (true)*/
            this.previousDirection(); //store previous direction
            this.idle = false;
            this.moving = true;
            
            //MOVING RIGHT
            if (this.direction * this.velocity.x < 0){ //if we want to go in the opposite direction, slow down by our turn acceleration
                this.velocity.x = moveTowards(this.velocity.x, this.direction * this.speed, this.turnAcceleration * delta);
                
            }else{ // if we want to continue moving in a direction, speed up by our acceleration
                this.velocity.x = moveTowards(this.velocity.x, this.direction * this.speed, this.acceleration * delta);
                //player.switchSprite('Jog1')

            }
        } else{ //if we have no direction(direction is 0/false), slow down by the amount of friction
            this.idle = true;
            this.moving = false;
            this.velocity.x = moveTowards(this.velocity.x, 0, this.friction * delta);
        }

        if(this.onFloor && !this.velocity.x){
            this.moving = false;
            this.idle = true;
        }


    }

    
    

    update(){
        this.updateFrames()
        this.updateHitbox()
        this.updateCameraBox()

        // c.fillStyle = 'rgba(0, 0, 255, 0.2)'
        // c.fillRect(
        //     this.camerabox.position.x, 
        //     this.camerabox.position.y, 
        //     this.camerabox.width, 
        //     this.camerabox.height)
        //console.log(player.position.y);
     
        //draws out the image
        // c.fillStyle = 'rgba(0,255, 0, 0.2)'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // c.fillStyle = 'rgba(255,0, 0, 0.2)'
        // c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)



        this.draw();
        this.position.x += this.velocity.x;
        this.updateHitbox()

        this.checkForHorizontalCollisions(); //Apply before gravity
        this.applyGravity();
        this.updateHitbox()

        this.checkForVerticalCollisions();
    }

    checkForHorizontalCollisions(){
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]

            if(
                collision({
                    object1: this.hitbox,
                    object2: collisionBlock,
                })
            ) {
                //console.log('we are colliding horizontally')
                if(this.velocity.x > 0){
                    this.velocity.x = 0;
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width

                    this.position.x = collisionBlock.position.x - offset - 0.01;
                    break
                }

                if(this.velocity.x < 0){
                    this.velocity.x = 0;

                    const offset = this.hitbox.position.x - this.position.x 
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01;
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
                    object1: this.hitbox,
                    object2: collisionBlock,
                })
            ) {
                //console.log('we are colliding vertically')
                this.onFloor = true;

                if(this.velocity.y > 0){
                    this.velocity.y = 0;

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height

                    this.position.y = collisionBlock.position.y - offset - 0.01;
                    break
                }

                if(this.velocity.y < 0){
                    this.velocity.y = 0;

                    const offset = this.hitbox.position.y - this.position.y 

                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
                    break
                }
            }
        }
    }

}