const canvas = document.getElementById("canvas")
const c = canvas.getContext('2d')
const ping = document.getElementById("ping")


canvas.width = 1224;
canvas.height = 576;
c.fillStyle = "blue";
c.fillRect(0, 0, canvas.width, canvas.height)  

const socket = io();
frontEndPlayers = {}
let hitBoxesOn = false;
let selfID;
const gravity = 0


let bg;
socket.on("connect", () => {
    bg = new BrowserSprite({
        position: {
            x: 0,
            y: 0
        }, 
        size: {
            width: canvas.width,
            height: canvas.height
        },
        imageSrc: "./sprites/backgrounds/Town2.png",
        maxFrames: 8,
        scale: 1,
        framesHold: 25
    })
    bg.isFighter = false
    selfID = socket.id
})

socket.on("updateConnections", (player)=>{

    if (!frontEndPlayers[player.id]) {
        frontEndPlayers[player.id] = new BrowserFighter({
            position: {
                x: player.x,
                y: player.y
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
            health: 500,
            attackDamage: 10,
            name: "Player 2",
            imageSrc: "./sprites/Warrior/Idle.png",
            maxFrames: 10,
            scale: 3.5,
            offset: {
                x: 205,
                y: 163
            },
            remainingJumps: 2,
            sprites: {
                idle: {
                    imageSrc: "./sprites/Warrior/Idle.png",
                    maxFrames: 10
                },
                attack: {
                    imageSrc: "./sprites/Warrior/Attack1.png",
                    maxFrames: 4
                },
                getHit: {
                    imageSrc: "./sprites/Warrior/Get Hit.png",
                    maxFrames: 3
                },
                run: {
                    imageSrc: "./sprites/Warrior/Run.png",
                    maxFrames: 6
                },
                jump: {
                    imageSrc: "./sprites/Warrior/Jump.png",
                    maxFrames: 2
                },
                fall: {
                    imageSrc: "./sprites/Warrior/Fall.png",
                    maxFrames: 2
                },
            
        
            }
        })
    }

})

socket.on("deletePlayer", (id) => {
    if (frontEndPlayers[id]) {
        delete frontEndPlayers[id]
    }
})

socket.on('positionUpdate', playerPos => {
    for(let id in frontEndPlayers){
        if(frontEndPlayers[id] !== undefined && id === playerPos.id){
            frontEndPlayers[id].position.x = playerPos.x;
            frontEndPlayers[id].position.y = playerPos.y;
            frontEndPlayers[id].facingDirection = playerPos.facingDirection;
            frontEndPlayers[id].isAttacking = playerPos.isAttacking;
            frontEndPlayers[id].switchSprite(playerPos.sprite)
        }
    }
})


let startTime;

function measurePing() {
  startTime = Date.now();
  socket.emit('ping');
}

socket.on('pong', () => {
    const latency = Date.now() - startTime;
    console.log(`Ping: ${latency}ms`);
    ping.innerHTML = `Ping: ${latency}ms`
});

setInterval(() => {
    measurePing();
}, 3000);

var background = new Image();
background.src = "./sprites/background.gif";
let animationId
function animate() {
    animationId = requestAnimationFrame(animate)

    //c.drawImage(background,0,0, canvas.width, canvas.height);
    try {bg.drawBackground()} catch (e) {}

    for (const id in frontEndPlayers) {
        frontEndPlayers[id].update()
    }

}

animate()



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



window.addEventListener('keydown', (e) => {
    if (!frontEndPlayers[socket.id]) return

    let player = frontEndPlayers[socket.id]
    switch(e.key) {
        case "a":
            keyDown.a.pressed = true;
            player.lastkey = 'a'
            player.facingDirection = -1
            break;
        case "d":
            keyDown.d.pressed = true;
            player.lastkey = 'd'
            player.facingDirection = 1
            break;
        case "w":
            keyDown.w.pressed = true;
            // if (player.remainingJumps > 0) {
            //     player.velocity.y = -10.8;
            //     player.remainingJumps -= 1
            // }
            break;
        case " ":
            // player.attack()
            player.isAttacking = true;
            break;
        case "t":
            hitBoxesOn = !hitBoxesOn
            break;
    }
    emitUserCommands(e.key, 'keydown')
})

window.addEventListener('keyup', (e) => {
    if (!frontEndPlayers[socket.id]) return

    switch(e.key) {
        case "a":
            keyDown.a.pressed = false
            break;
        case "d":
            keyDown.d.pressed = false
            break;
        case "w":
            keyDown.w.pressed = false
            // if (frontEndPlayers[socket.id].remainingJumps > 0) {
            //     frontEndPlayers[socket.id].velocity.y = 0
            // }
            break;
        
    }
    emitUserCommands(e.key, 'keyup')
})

function emitUserCommands(currentKey, eventType) {
    let player = frontEndPlayers[socket.id]
    let userCommandObj = {
        currentKey: currentKey,
        eventType: eventType,
        a: keyDown.a.pressed,
        d: keyDown.d.pressed,
        w: keyDown.w.pressed,
        lastkey: player.lastkey,
        facingDirection: player.facingDirection,
        isAttacking: player.isAttacking,
        hitBoxesOn: hitBoxesOn
    }
    socket.emit("userCommands", userCommandObj)
}

