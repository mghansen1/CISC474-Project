const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

let hitBoxesOn = true;
canvas.width = 1024;
canvas.height = 576;
const gravity = .3;

// c.fillStyle = "blue";
// c.fillRect(0, 0, canvas.width, canvas.height)

var background = new Image();
background.src = "./sprites/background.gif";

c.drawImage(background,0,0);   

const player1 = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }, 
    size: {
        width: 75,
        height: 140
    },
    attackArea: {
        height: 90,
        width: 210
    },
    facingDirection: 1,
    health: 50,
    attackDamage: 10,
    name: "Player 1",
    imageSrc: "./sprites/Warrior/Idle.png",
    maxFrames: 10,
    scale: 3.5,
    offset: {
        x: 205,
        y: 163
    },
    sprites: {
        idle: {
            imageSrc: "./sprites/Warrior/Idle.png",
            maxFrames: 10
        },
        attack: {
            imageSrc: "./sprites/Warrior/Attack1.png",
            maxFrames: 4
        }
    }
})

const player2 = new Fighter({
    position: {
        x: 310,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }, 
    size: {
        width: 75,
        height: 140
    },
    attackArea: {
        height: 30,
        width: 50
    },
    facingDirection: 1,
    health: 50,
    attackDamage: 10,
    name: "Player 2",
    imageSrc: "./sprites/Warrior/Idle.png",
    maxFrames: 10,
    scale: 3.5,
    offset: {
        x: 205,
        y: 163
    },
    sprites: {
        idle: {
            imageSrc: "./sprites/Warrior/Idle.png",
            maxFrames: 10
        },
        attack: {
            imageSrc: "./sprites/Warrior/Attack1.png",
            maxFrames: 4
        }
    }
})

const keyDown = {
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}



//main loop
function animate() {
    window.requestAnimationFrame(animate)
    // c.fillStyle = "blue";
    // c.fillRect(0, 0, canvas.width, canvas.height)   
    c.drawImage(background,0,0, canvas.width, canvas.height);
    player1.update()
    player2.update()


    player1.velocity.x = 0
    if (keyDown.ArrowLeft.pressed && player1.lastkey === 'ArrowLeft') {
        player1.velocity.x = -10.8
    } else if (keyDown.ArrowRight.pressed && player1.lastkey === 'ArrowLeft') {
        player1.velocity.x = 10.8
    } else if (keyDown.ArrowRight.pressed && player1.lastkey === 'ArrowRight') {
        player1.velocity.x = 10.8
    } else if (keyDown.ArrowLeft.pressed && player1.lastkey === 'ArrowRight') {
        player1.velocity.x = -10.8
    }

    if (player1.isAttacking && collisionDetection({player: player1, enemy: player2})) {
        console.log("p1 hit p2");
        if (player1.damageDealt === false) {
            player2.takeDamage({damageAmount: player1.attackDamage})
            player1.damageDealt = true
            determineWinner({player: player1, enemy: player2})
        } 
        
    }

    if (player1.isAttacking) {
        setTimeout(() => {
            player1.isAttacking = false
            player1.damageDealt = false
            player1.switchSprite("idle") 
            }, 100
        );   
    }

}
animate()


window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case "ArrowLeft":
            keyDown.ArrowLeft.pressed = true;
            player1.lastkey = 'ArrowLeft'
            player1.facingDirection = -1
            break;
        case "ArrowRight":
            keyDown.ArrowRight.pressed = true;
            player1.lastkey = 'ArrowRight'
            player1.facingDirection = 1
            break;
        case "ArrowUp":
            player1.velocity.y = -10.8;
            break;
        case "c":
            player1.attack()
            break;  
        case "t":
            hitBoxesOn = !hitBoxesOn
            console.log(hitBoxesOn)
            break;
    }

})

window.addEventListener('keyup', (e) => {
    switch(e.key) {
        case "ArrowLeft":
            keyDown.ArrowLeft.pressed = false
            break;
        case "ArrowRight":
            keyDown.ArrowRight.pressed = false
            break;
        case "ArrowUp":
            player1.velocity.y = 0
            break;

    }
})
