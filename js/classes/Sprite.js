//Sprite Class
class Sprite {
    //every sprite has a position
    constructor({position, imageSrc, frameRate = 1, frameBuffer = 80, scale = 1}){
        this.position = position;
        this.scale = scale
        this.image = new Image()
        this.image.onload = () => {
            this.width = (this.image.width / this.frameRate) * this.scale
            this.height = (this.image.height) * this.scale
        }
        this.image.src = imageSrc //asign image to this .image
        this.frameRate = frameRate
        this.currentFrame = 0;
        this.frameBuffer = frameBuffer;
        this.elapsedFrames = 0;
    }

    //call this
    draw(){
        if (!this.image){return} //if image is undefined (not loaded yet)
        //console.log(this.width)
        const cropbox = {
            position: {
                x: this.currentFrame * this.image.width / this.frameRate,
                y: 0,
            },
            width: this.image.width / this.frameRate,
            height: this.image.height,
        }
        c.drawImage(this.image, 
            cropbox.position.x, 
            cropbox.position.y, 
            cropbox.width, 
            cropbox.height, 
            this.position.x, 
            this.position.y,
            this.width,
            this.height
        )
    }

    overlap(){
        if(player.hitbox.position.x + player.hitbox.width > this.position.x
            && player.hitbox.position.x + player.hitbox.width < this.position.x + this.width
            && player.hitbox.position.y + player.hitbox.height < this.position.y + this.height
            && player.hitbox.position.y + player.hitbox.height > this.position.y){
            console.log("Inside Area");
        }else{
            console.log("Nope")
        }
    }


    update() {
        this.draw()
        this.updateFrames()
    }

    updateFrames(){
        this.elapsedFrames++
        if(this.elapsedFrames % this.frameBuffer === 0){
            if(this.currentFrame < this.frameRate - 1) this.currentFrame++
                else this.currentFrame = 0
        }
    }
}