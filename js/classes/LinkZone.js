
class LinkZone{
    constructor({position, width, height, link}){
        this.position = position;
        this.link = link;
        this.width = width;
        this.height = height;
    }


    overlap(){
        if(player.hitbox.position.x + player.hitbox.width >= this.position.x
            && player.hitbox.position.x + player.hitbox.width <= this.position.x + this.width
            && player.hitbox.position.y + player.hitbox.height <= this.position.y + this.height
            && player.hitbox.position.y + player.hitbox.height >= this.position.y){
            console.log("Inside Area");
            return true;
        }else{
            console.log("Nope")
            return false;
        }
    }

    draw(){

        //draw out the zone
        c.fillStyle = 'rgba(0, 255, 255, 0.3)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}