const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

const Background = new Sprite({ position: { x: 0, y: 0 }, src: "assets/background (1).png" })

const player = new Player({
    position: { x: 75, y: 0 }, src: "./assets/playerSprite/Idle.png", frame: 8, scale: 0.5,
    animation: {
        idle: {
            src: "./assets/playerSprite/Idle.png",
            frame: 8,
            FrameBuffer:5
        },
        run: {
            src: "./assets/playerSprite/Run.png",
            frame: 8,
            FrameBuffer:7
        },
        runLeft: {
            src: "./assets/playerSprite/RunLeft.png",
            frame: 8,
            FrameBuffer:5
        }
        ,
        jump:{
            src:"./assets/playerSprite/Jump.png",
            frame:2,
            FrameBuffer:3
        }
        ,
        fall:{
            src:"./assets/playerSprite/Fall.png",
            frame:2,
            FrameBuffer:3
        }
    }
});

const keys = {
    d: {
        pressed: false
    }, a: {
        pressed: false
    }
}


function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.save();
    c.scale(4, 4);
    c.translate(0, -Background.image.height + canvas.height / 4)
    Background.update();

    FloorCollision2d.forEach((colli) => {
        colli.update();
    })
    PlatformCollisions.forEach((colli) => {

        colli.update();
    })
    player.update();
    c.restore();

    player.velocity.x = 0;
    if (keys.d.pressed) {
        player.velocity.x = 1;
        player.switchSprite('run');
    }

    else if (keys.a.pressed) {
        player.velocity.x = (-1)
        player.switchSprite('runLeft');
    }
    else if (player.velocity.y===0){
        player.switchSprite('idle')
    }
    else if (player.velocity.y<0){
        player.switchSprite('jump')
    }
    else if (player.velocity.y>0){
        player.switchSprite('fall')
    }
        
    


}



    animate();



    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case "w":
                console.log(player.velocity.y)
                player.velocity.y = -4;
                break;
            case "a":
                keys.a.pressed = true;
               
                break;
            case "d":
                keys.d.pressed = true;
               
                break;

            default:
                break;
        }
    })

    window.addEventListener('keyup', (event) => {
        switch (event.key) {
            case "a":
                keys.a.pressed = false;
                break;

            case "d":
                keys.d.pressed = false;
                break;

            default:
                break;
        }
    })

