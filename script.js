const canvas = document.getElementById('myCanvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4
}

/**
 * Creating sub Arrays within our floorCollision Array to loop through
 * each row of titles
 */
const floorCollisions2D = [];
for (let i = 0; i < floorCollisions.length; i += 179)
    floorCollisions2D.push(floorCollisions.slice(i, i + 179)); //Slices out the first 179 items then go to next iteration

console.log(floorCollisions2D);

const collisionBlocks = [];
/**
 * For each item within floorCollisions2D, loop through each row's symbols
 * Creates a 2D array
 */
floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if(symbol === 131073){
            console.log('draw a block here')
            collisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16,
                    },
                }))
        }
    })
})

/**
 * 2D array for platform collision blocks
 */
const platformCollisions2D = [];
for (let i = 0; i < platformCollisions.length; i += 179)
    platformCollisions2D.push(platformCollisions.slice(i, i + 179)); //Slices out the first 179 items then go to next iteration

platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if(symbol === 131073){
            console.log('draw a block here')
            collisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16,
                    },
                }))
        }
    })
})

console.log(collisionBlocks)

const gravity = 0.5;

c.fillStyle = 'red';
c.fillRect(200, 100, 100, 100);

const player = new Player({
    x:15,
    y:0,
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
    imageSrc: './img/sonicStage.png',
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
    //c.scale(2, 2)//scale image by 4 on the x and y axis
    //c.translate(0, -background.image.height/3); //Position canvas to the bottom left of the background image
    background.update()
    collisionBlocks.forEach((collisionBlock) => {
        collisionBlock.update()
    })
    c.restore()

    

    player.update();

    

    player.physicsProcess(60);
}

function moveTowards(fromFloat, toFloat, delta){

    //Move closer to "toFloat" regardless if fromFloat is bigger or not
    if(fromFloat > toFloat){
        if(fromFloat - delta < toFloat){
            return toFloat;
        }
        return fromFloat - delta;
    }else if (fromFloat < toFloat){
        if(fromFloat + delta > toFloat){
            return toFloat;
        }
        return fromFloat + delta;
    }
    
    return 0;
    
}

//THIS GOES LAST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
        case 'k':
            console.log(moveTowards(-5, -10, -4));
            break
    }
})

