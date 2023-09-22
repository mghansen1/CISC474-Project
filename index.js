const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024;
canvas.height = 576;
const gravity = .3;

c.fillStyle = "blue";
c.fillRect(0, 0, canvas.width, canvas.height)

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
        width: 50,
        height: 150
    },
    attackArea: {
        height: 60,
        width: 150
    },
    facingDirection: 1
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
        width: 50,
        height: 150
    },
    attackArea: {
        height: 30,
        width: 50
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
    c.fillStyle = "blue";
    c.fillRect(0, 0, canvas.width, canvas.height)   
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
    }

    if (player1.isAttacking) {
        setTimeout(() => {
            player1.isAttacking = false 
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
            player1.isAttacking = true;
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
