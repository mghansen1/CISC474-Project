const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path")

app.use("/sprites",express.static(path.join(__dirname, "..", "sprites")))
app.use(express.static(path.join(__dirname, "..", "commonUtils")))
app.use(express.static(path.join(__dirname,  "public")))

const { collisionDetection, determineWinner, decreaseTime } = require('../commonUtils/common.js');
const { BrowserSprite, BrowserFighter } = require('../commonUtils/browserClasses.js');
const { Sprite, Fighter } = require('./serverClasses.js');


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/client.html'));
});

const MAX_PLAYERS = 2
let connected_players = 0
backEndPlayers = {}
playerReg = {}
clientNo = 0

io.on('connection', (socket) => {
    console.log(socket.id + ' user connected');
    clientNo++;
    roomNo = Math.round(clientNo / 2);
    

    if (clientNo % 2 === 1) {
        console.log("1:"+ clientNo)
        backEndPlayers[socket.id] = new Fighter({
            position: {
                x: 200,
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
        playerReg[socket.id] = {id: socket.id, x: 200, y: 0}
        
    }
    else if (clientNo % 2 === 0) {
        console.log("2:"+ clientNo)
        backEndPlayers[socket.id] = new Fighter({
            position: {
                x: 410,
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
        playerReg[socket.id] = {id: socket.id, x: 410, y: 0};
    }

    for (let id in backEndPlayers) {
        console.log("player:" + playerReg[id].x)
        io.emit("updateConnections", playerReg[id])
    }

    socket.on("disconnect", () => {
        io.emit("deletePlayer", socket.id)
        delete playerReg[socket.id]
        delete backEndPlayers[socket.id]
        io.emit("updateConnections", playerReg)
    })


});

setInterval(serverLoop, 1000/60);

function serverLoop() {
    for (let id in backEndPlayers){
        io.emit('positionUpdate', {
            id: id,
            x: backEndPlayers[id].position.x,
            y: backEndPlayers[id].position.y
        });
    }
}

server.listen(3000, () => {
  console.log('listening on *:3000');
});