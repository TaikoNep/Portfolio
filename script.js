

const linkZone1 = new LinkZone({
    position: {
        x: 312,
        y: 301,
    },
    width: 100,
    height: 100,
    link: '/about.html'

})

const linkZone2 = new LinkZone({
    position: {
        x: 500,
        y: 301,
    },
    width: 100,
    height: 100,
    link: '/projects.html'

})

const linkZones = [
    linkZone1,
    linkZone2
]

function loadZones(){
    for (const zone of linkZones){
        zone.draw()
    }
}

function checkLinkZones(){
    for (let i = 0; i < linkZones.length; i++)
        if(linkZones[i].overlap() === true){
            window.open(linkZones[i].link, "_blank");
            console.log("This zone works")
            break;
        }
    
}


const canvas = document.getElementById('myCanvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 512;

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4
}

//check if sprites load
var initialLoad = false;

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

const platformCollisionBlocks = []

platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if(symbol === 131073){
            console.log('draw a block here')
            platformCollisionBlocks.push(
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

const gravity = 0.3;

c.fillStyle = 'red';
c.fillRect(200, 100, 100, 100);

const player = new Player({
    position: {
        x:50,
        y:0,
    },
    collisionBlocks,
    imageSrc: "./img/sonic/Idle.png",
    frameRate: 1,
    animations: {
        Idle: {
            imageSrc: "./img/sonic/Idle.png",
            frameRate: 1,
            frameBuffer: 3
        },
        Jog1: {
            imageSrc: "./img/sonic/Jog1.png",
            frameRate: 6,
            frameBuffer: 25
        },
        Jump: {
            imageSrc: "./img/sonic/Jump.png",
            frameRate: 6,
            frameBuffer: 25
        },
    },
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


/**
 * function preloads files before animate is called
 */

const imageUrls = [
    './img/sonicStage.png',
    './img/sonic/Idle.png'
]

let loadedImages = 0;
let loadedAllImages = false;
const totalImages = imageUrls.length;

function imageLoaded(){
    loadedImages++;
    if(loadedImages === totalImages){
        console.log("All sprites preloaded!");
        loadedAllImages = true;
    }
}


const backgroundImageHeight = 960
const camera = {
    position: {
        x: 0,
        y: -289,
    },
}


/*
function loops itself by continuously calling itself with 
requestAnimationFrame
*/
function animate(){
        window.requestAnimationFrame(animate); //function loops itself by continuously calling itself with requestAnimationFrame
        
        //load all images before continuing
        if(loadedAllImages === false){
        }else{

        

        c.fillStyle = 'white'; // clears canvas
        c.fillRect(0, 0, canvas.width, canvas.height);
        
        c.save() //Whenever method c.scale is called, only run the code between c.save and c.restore
        c.scale(2, 2)//scale image by 4 on the x and y axis
        c.translate(camera.position.x, camera.position.y); //Position canvas to the bottom left of the background image
        background.update()
        collisionBlocks.forEach((collisionBlock) => {
            collisionBlock.update()
        })
        platformCollisionBlocks.forEach((block) => {
            block.update();
        })
        player.checkForHorizontalCanvasCollision()
        player.update();
        player.physicsProcess(60);
        loadZones()
        c.restore()

    }

    

    

    
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
imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
    img.onload = imageLoaded;
    img.onerror = () => console.error(`Failed to load image: ${url}`);
    console.log(`loaded ${url}`)
    
});


animate(); 





//event listeners

//check whether a key is pressed down
window.addEventListener('keydown', (event) => {
    //console.log(event)
    switch(event.key){
        case 'Enter':
            console.log("Enter pressed")
            checkLinkZones()
            break
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
            player.velocity.y = -10;
            break
        case 's':
            keys.s.pressed = true;
            break
        case 'k':
            keys.d.pressed = true;
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
            keys.k.pressed = false;
            break
        case 'p':
            //keys.p.pressed = false;
            //console.log(player.position);
            console.log(player.camerabox.position.y)
            console.log("Camera y:" + camera.position.y)
            break
    }
})

