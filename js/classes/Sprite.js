//Sprite Class
class Sprite {
    //every sprite has a position
    constructor({position, imageSrc, frameRate = 1}){
        this.position = position;
        this.image = new Image()
        this.image.onload = () => {
            this.width = this.image.width / this.frameRate
            this.height = this.image.height
        }
        this.image.src = imageSrc //asign image to this .image
        this.frameRate = frameRate

    }

    //call this
    draw(){
        if (!this.image){return} //if image is undefined (not loaded yet)
        //console.log(this.width)
        const cropbox = {
            position: {
                x: 0,
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

    update() {
        this.draw()
    }
}