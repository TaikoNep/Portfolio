
class LinkZone{
    constructor({position, width, height, link}){
        this.position = position;
        this.link = link;
        this.width = width;
        this.height = height;
    }





    draw(){

        //draw out the zone
        c.fillStyle = 'rgba(0, 255, 255, 0.3)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}