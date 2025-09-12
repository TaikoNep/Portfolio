class Player{
    constructor(position) {
        this.position = position;
        this.velocity = {
            x: 0,
            y: 1, //falling down by default
        }
        this.height = 100;

        
        this.direction = 0; 
        this.lastDirection = 1;
        this.friction = 4000;
        this.acceleration = 1500;
        this.turnAcceleration = 8000;
        
    }

    /**
     * Gets the previous direction of the player
     * returns an int representing the previous direction
     * -1 = left, 1 = right
     */
    previousDirection() {
        if(direction == 1){
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
     * updates the Player according to input
     */
    playerPhysics(){
        if(keys.d.pressed){
            direction = 1;
        } else if(keys.a.pressed){
            direction = -1;
        }
    }

    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 100, this.height);
    }

    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        //ensure player never goes below screen
        if (this.position.y + this.height + this.velocity.y < canvas.height){ 
            this.velocity.y += gravity;
        }else{ 
            this.velocity.y = 0;
        }
    }

    
        
    
}