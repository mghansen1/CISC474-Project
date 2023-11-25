const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d')


canvas.width = 1224;
canvas.height = 576;
c.fillStyle = "blue";
c.fillRect(0, 0, canvas.width, canvas.height)  

const socket = io();
frontEndPlayers = {}
let hitBoxesOn = true;
let selfID;

socket.on("connect", () => {
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
        }
    }
})


var background = new Image();
background.src = "./sprites/background.gif";
const gravity = .3;
let animationId
function animate() {
  animationId = requestAnimationFrame(animate)

  c.drawImage(background,0,0, canvas.width, canvas.height);
  

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

    let player1 = frontEndPlayers[socket.id]
    switch(e.key) {
        case "a":
            console.log("a")
            keyDown.a.pressed = true;
            player1.lastkey = 'a'
            player1.facingDirection = -1
            break;
        case "d":
            keyDown.d.pressed = true;
            player1.lastkey = 'd'
            player1.facingDirection = 1
            break;
        case "w":
            if (player1.remainingJumps > 0) {
                player1.velocity.y = -10.8;
                player1.remainingJumps -= 1
            }
            break;
        case " ":
            player1.attack()
            break;
        case "t":
            hitBoxesOn = !hitBoxesOn
            break;
            
    }

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
            if (frontEndPlayers[socket.id].remainingJumps > 0) {
                frontEndPlayers[socket.id].velocity.y = 0
            }
            break;
        
    }
})

function emitUserCommands() {
    socket.emit("userCommand")
}