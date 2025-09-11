const canvas = document.getElementById('myCanvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4
}

const gravity = 0.5;

c.fillStyle = 'red';
c.fillRect(200, 100, 100, 100);

const player = new Player({
    x:0,
    y:0,
});
const player2 = new Player({
    x: 300,
    y: 100,
});

// cotains all the keys that will be inputed with
const keys = {
    //by default, this key is not pressed (pressed is false)
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
}

const background = new Sprite ({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/background.png',
})

/*
function loops itself by continuously calling itself with 
requestAnimationFrame
*/
function animate(){
    window.requestAnimationFrame(animate); //function loops itself by continuously calling itself with requestAnimationFrame
    
    c.fillStyle = 'white'; // clears canvas
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    c.save() //Whenever method c.scale is called, only run the code between c.save and c.restore
    c.scale(4, 4)//scale image by 4 on the x and y axis
    c.translate(0, -background.image.height + scaledCanvas.height); //Position canvas to the bottom left of the background image
    background.update()
    c.restore()

    player.update();
    player2.update();

    player.velocity.x = 0; //stop moving if no keys are pressed
    if(keys.d.pressed) {
        player.velocity.x = 1;
    }else if(keys.a.pressed){
        player.velocity.x = -1;
    }
}


animate();

//event listeners

//check whether a key is pressed down
window.addEventListener('keydown', (event) => {
    //console.log(event)
    switch(event.key){
        //anything within this case will run when key is pressed
        case 'd':
            //console.log("I'm moving right.");
            keys.d.pressed = true;
            break
        case 'a':
            //console.log("I'm moving left.");
            keys.a.pressed = true;
            break
        case 'w':
            //console.log("I'm moving left.");
            player.velocity.y = -20;
            break
    }
})

window.addEventListener('keyup', (event) => {
    //console.log(event)
    switch(event.key){
        //anything within this case will run when key is pressed
        case 'd':
            //console.log("I'm moving right.");
            keys.d.pressed = false;
            break
        case 'a':
            //console.log("I'm moving left.");
            keys.a.pressed = false;
            break
    }
})