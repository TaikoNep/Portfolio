//Sprite Class
class Sprite {
    //every sprite has a position
    constructor({position, imageSrc}){
        this.position = position;
        this.image = new Image()
        this.image.src = imageSrc //asign image to this .image
    }

    draw(){
        if (!this.image){return} //if image is undefined (not loaded yet)
        c.drawImage(this.image, this.position.x, this.position.y)
    }

    update() {
        this.draw()
    }
}