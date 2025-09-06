const canvas = document.getElementById('myCanvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;

c.fillStyle = 'red';
c.fillRect(200, 100, 100, 100);

class Player{
    constructor(position) {
        this.position = position;
        this.velocity = {
            x: 0,
            y: 1, //falling down by default
        }
        this.height = 100;
    }

    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 100, this.height);
    }

    update(){
        this.draw();
        this.position.y += this.velocity.y;
        //ensure player never goes below screen
        if (this.position.y + this.height + this.velocity.y < canvas.height){ 
            this.velocity.y += gravity;
        }else{ 
            this.velocity.y = 0;
        }
    }
}

const player = new Player({
    x:0,
    y:0,
});
const player2 = new Player({
    x: 300,
    y: 100,
});


/*
function loops itself by continuously calling itself with 
requestAnimationFrame
*/
function animate(){
    window.requestAnimationFrame(animate); //function loops itself by continuously calling itself with requestAnimationFrame
    
    c.fillStyle = 'white'; // clears canvas
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    player.update();
    player2.update();
}

animate();

