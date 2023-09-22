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
    attackArea: {
        height: 30,
        width: 50
    }
})

const player2 = new Fighter({
    position: {
        x: 110,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }, 
    attackArea: {
        height: 30,
        width: 50
    }
})

const keyDown = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    }
}


//main loop
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = "blue";
    c.fillRect(0, 0, canvas.width, canvas.height)   
    player1.update()


    player1.velocity.x = 0
    if (keyDown.a.pressed && player1.lastkey === 'a') {
        player1.velocity.x = -10.8
    } else if (keyDown.d.pressed && player1.lastkey === 'a') {
        player1.velocity.x = 10.8
    } else if (keyDown.d.pressed && player1.lastkey === 'd') {
        player1.velocity.x = 10.8
    } else if (keyDown.a.pressed && player1.lastkey === 'd') {
        player1.velocity.x = -10.8
    }
}
animate()


window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case "a":
            keyDown.a.pressed = true;
            player1.lastkey = 'a'
            break;
        case "d":
            keyDown.d.pressed = true;
            player1.lastkey = 'd'
            break;
        case "w":
            player1.velocity.y = -10.8;
            break;
    }

})

window.addEventListener('keyup', (e) => {
    switch(e.key) {
        case "a":
            keyDown.a.pressed = false
            break;
        case "d":
            keyDown.d.pressed = false
            break;
        case "w":
            player1.velocity.y = 0
            break;

    }
})
