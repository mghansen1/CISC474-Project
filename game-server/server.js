const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path")
const PORT = process.env.PORT || 3000

app.use("/sprites",express.static(path.join(__dirname, "..", "sprites")))
app.use(express.static(path.join(__dirname, "..", "commonUtils")))
app.use(express.static(path.join(__dirname,  "public")))

const { collisionDetection, determineWinner, decreaseTime } = require('../commonUtils/common.js');
const { BrowserSprite, BrowserFighter } = require('../commonUtils/browserClasses.js');
const { Sprite, Fighter } = require('./serverClasses.js');

MAX_ROOM_PLAYERS = 2
backEndPlayers = {}
playerReg = {}
clientNo = 0
let roomNo
let rooms = {}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/client.html'));
});

app.get('/status', (req, res) => {
    res.send('Server is running!');
});

app.get('/active-players', (req, res) => {
    res.end(`${Object.keys(backEndPlayers).length}`)
})



io.on('connection', (socket) => {
    // clientNo++;
    // roomNo = Math.round(clientNo / 2);
    // socket.join(roomNo);
    // console.log(`New client no.: ${clientNo}, room no.: ${roomNo}`);

    let roomId = null
    let startX = 200
    for (let id in rooms) {
        if (rooms[id].size < MAX_ROOM_PLAYERS) {
            roomId = id
            if (playerReg[rooms[id].values().next().value] !== undefined) {
                startX = playerReg[rooms[id].values().next().value].x === 410 ? 200 : 410 // check other player starting location
            }
            break;
        }
    }

    if (roomId === null) {
        roomId = Object.keys(rooms).length + 1;
        rooms[roomId] = new Set()
    }

    socket.join(roomId);
    rooms[roomId].add(socket.id);

    backEndPlayers[socket.id] = new Fighter({
        position: {
            x: startX,
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
        health: 500,
        attackDamage: 10,
        name: "Player 1",
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
    playerReg[socket.id] = {id: socket.id, x: startX, y: 0}
    backEndPlayers[socket.id].roomNo = roomId

    for (let id in backEndPlayers) {
        //console.log(`id: ${id} in room no: ${backEndPlayers[id].roomNo}`)
        io.to(backEndPlayers[id].roomNo).emit("updateConnections", playerReg[id])
    }

    socket.on("disconnect", () => {
        console.log("disconnection")
        const roomId = backEndPlayers[socket.id]?.roomNo
        if (roomId !== undefined) {
            rooms[roomId].delete(socket.id)
            io.to(roomId).emit("deletePlayer", socket.id)
        }
        delete playerReg[socket.id]
        delete backEndPlayers[socket.id]
        io.emit("updateConnections", playerReg)
        
    })

    socket.on("userCommands", (data) => {
        let currentKey = data.currentKey;
        let eventType = data.eventType;
        backEndPlayers[socket.id].up.pressed = data.w;
        backEndPlayers[socket.id].left.pressed = data.a
        backEndPlayers[socket.id].right.pressed = data.d
        backEndPlayers[socket.id].lastkey = data.lastkey
        backEndPlayers[socket.id].facingDirection = data.facingDirection
        backEndPlayers[socket.id].isAttacking = data.isAttacking

        let player = backEndPlayers[socket.id];
        
        if (player.up.pressed) {
            if (player.remainingJumps > 0) {
                player.velocity.y = -10.8;
                player.remainingJumps -= 1
            }
                 
        } else if (currentKey === 'w' && eventType === 'keyup') { //hard coded jump is 'w'
            if (player.remainingJumps >= 0 && player.velocity.y < 0) {
                player.velocity.y = 0
            }
        }

    })

    socket.on('ping', () => {
        if (backEndPlayers[socket.id].roomNo != undefined) {
            socket.emit('pong');
        }
    });

});



setInterval(serverLoop, 10);
function serverLoop() {

    for (let id in backEndPlayers){
        
        let player = backEndPlayers[id]

        if (!player.gettingHit) {
            player.velocity.x = 0
        }
        
        if (player.left.pressed && player.lastkey === 'a') {
            player.velocity.x = -10.8
            player.facingDirection = -1
            player.switchSprite("run")
        } else if (player.right.pressed && player.lastkey === 'a') {
            player.velocity.x = 10.8
            player.facingDirection = 1
            player.switchSprite("run")
        } else if (player.right.pressed && player.lastkey === 'd') {
            player.velocity.x = 10.8
            player.facingDirection = 1
            player.switchSprite("run")
        } else if (player.left.pressed && player.lastkey === 'd') {
            player.velocity.x = -10.8
            player.facingDirection = -1
            
            player.switchSprite("run")
        } else if (player.remainingJumps === player.maxJumps) {
            //player.velocity.x = 0
            player.switchSprite("idle")
        }
        
        if (player.velocity.y < 0) {
            player.switchSprite("jump")
        } else if (player.velocity.y > 0) {
            player.switchSprite("fall")
        }
        
        
        let player2;
        for (let id2 in backEndPlayers) {
            if (id != id2 && backEndPlayers[id].roomNo === backEndPlayers[id2].roomNo) {
                player2 = backEndPlayers[id2]
            }
        }

        if (player2 && player.isAttacking && collisionDetection({player: player, enemy: player2})) {
            if (player.damageDealt === false) {
                player2.takeDamage({damageAmount: player.attackDamage,enemyDirection: player.facingDirection})
                player.damageDealt = true
                determineWinner({player: player, enemy: player2})
            } 
            
        }
        
        if (player.gettingHit) {
            if (player.currentFrame == player.sprites.getHit.maxFrames - 1) {
                setTimeout(() => {
                    player.gettingHit = false
                    }, 200
                ); 
            }
        } else {
            if (player.isAttacking) {
                player.switchSprite("attack")
                setTimeout(() => {
                    player.isAttacking = false
                    player.damageDealt = false
                    player.switchSprite("idle")
                    }, 100
                );   
            }
        }

        player.update()

        io.to(player.roomNo).emit('positionUpdate', {
            id: id,
            x: player.position.x,
            y: player.position.y,
            facingDirection: player.facingDirection,
            isAttacking: player.isAttacking,
            sprite: player.image
        });
    }
}



server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});