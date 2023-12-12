const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

let hitBoxesOn = true;
canvas.width = 1224;
canvas.height = 576;
const gravity = .3;   

const bg = new BrowserSprite({
    position: {
        x: 0,
        y: 0
    }, 
    size: {
        width: canvas.width,
        height: canvas.height
    },
    imageSrc: "../sprites/backgrounds/Town.png",
    maxFrames: 8,
    scale: 1,
    framesHold: 25,
    facingDirection: 1
})
bg.isFighter = false

const player1 = new BrowserFighter(fighterConfigurations({character: "Fantasy_Warrior_Big", player: "p1"}))
const player2 = new BrowserFighter(fighterConfigurations({character: "Wizard", player: "p2"}))

const keyDown = {
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
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
    // c.fillStyle = "blue";
    // c.fillRect(0, 0, canvas.width, canvas.height)   
    //c.drawImage(background,0,0, canvas.width, canvas.height);
    bg.drawBackground()
    player1.update()
    player2.update()

    
    if (!player1.gettingHit) {
        player1.velocity.x = 0
    }

    if (!player2.gettingHit) {
        player2.velocity.x = 0
    }

    
    if (keyDown.a.pressed && player1.lastkey === 'a') {
        player1.velocity.x = -10.8
        player1.facingDirection = -1
        player1.switchSprite("run")
    } else if (keyDown.d.pressed && player1.lastkey === 'a') {
        player1.velocity.x = 10.8
        player1.facingDirection = 1
        player1.switchSprite("run")
    } else if (keyDown.d.pressed && player1.lastkey === 'd') {
        player1.velocity.x = 10.8
        player1.facingDirection = 1
        player1.switchSprite("run")
    } else if (keyDown.a.pressed && player1.lastkey === 'd') {
        player1.velocity.x = -10.8
        player1.facingDirection = -1
        player1.switchSprite("run")
    } else {
        player1.switchSprite("idle")
    }
    
    if (player1.velocity.y < 0) {
        player1.switchSprite("jump")
    } else if (player1.velocity.y > 0) {
        player1.switchSprite("fall")
    } else if (player1.velocity.y === 0 && player1.remainingJumps === 0) {
        player1.remainingJumps = player1.maxJumps
    }

    if (player1.isAttacking && collisionDetection({player: player1, enemy: player2})) {
        console.log("p1 hit p2");
        if (player1.damageDealt === false) {
            player2.takeDamage({damageAmount: player1.attackDamage,enemyDirection: player1.facingDirection})
            player1.damageDealt = true
            determineWinner({player: player1, enemy: player2})
        } 
        
    }

    if (keyDown.ArrowLeft.pressed && player2.lastkey === 'ArrowLeft') {
        player2.velocity.x = -10.8
        player2.facingDirection = -1
        player2.switchSprite("run")
    } else if (keyDown.ArrowRight.pressed && player2.lastkey === 'ArrowLeft') {
        player2.velocity.x = 10.8
        player2.facingDirection = 1
        player2.switchSprite("run")
    } else if (keyDown.ArrowRight.pressed && player2.lastkey === 'ArrowRight') {
        player2.velocity.x = 10.8
        player2.facingDirection = 1
        player2.switchSprite("run")
    } else if (keyDown.ArrowLeft.pressed && player2.lastkey === 'ArrowRight') {
        player2.velocity.x = -10.8
        player2.facingDirection = -1
        player2.switchSprite("run")
    } else {
        player2.switchSprite("idle")
    }
    
    if (player2.velocity.y < 0) {
        player2.switchSprite("jump")
    } else if (player2.velocity.y > 0) {
        player2.switchSprite("fall")
    } else if (player2.velocity.y === 0 && player2.remainingJumps === 0) {
        player2.remainingJumps = player2.maxJumps
    }

    if (player2.isAttacking && collisionDetection({player: player2, enemy: player1})) {
        console.log("p2 hit p1");
        if (player2.damageDealt === false) {
            player1.takeDamage({damageAmount: player2.attackDamage, enemyDirection: player2.facingDirection})
            player2.damageDealt = true
            determineWinner({player: player2, enemy: player1})
        }  
    }


    if (player1.gettingHit) {
        if (player1.currentFrame == player1.sprites.getHit.maxFrames - 1) {
            player1.gettingHit = false
        }
    } else {
        if (player1.isAttacking) {
            setTimeout(() => {
                player1.isAttacking = false
                player1.damageDealt = false
                player1.switchSprite("idle") 
                }, 100
            );   
        }
    }

    if (player2.gettingHit) {
        if (player2.currentFrame == player2.sprites.getHit.maxFrames - 1) {
            player2.gettingHit = false
        }

    } else {
        if (player2.isAttacking) {
            setTimeout(() => {
                player2.isAttacking = false
                player2.damageDealt = false
                player2.switchSprite("idle") 
                }, 100
            );   
        }
    }
    
    
}
animate()


window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case "a":
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
        case "ArrowLeft":
            keyDown.ArrowLeft.pressed = true;
            player2.lastkey = 'ArrowLeft'
            player2.facingDirection = -1
            break;
        case "ArrowRight":
            keyDown.ArrowRight.pressed = true;
            player2.lastkey = 'ArrowRight'
            player2.facingDirection = 1
            break;
        case "ArrowUp":
            if (player2.remainingJumps > 0) {
                player2.velocity.y = -10.8;
                player2.remainingJumps -= 1
            }
            break;
        case "ArrowDown":
            player2.attack()
            break;  
        case "t":
            hitBoxesOn = !hitBoxesOn
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
            if (player1.remainingJumps >= 0) {
                player1.velocity.y = 0
            }
            break;
        case "ArrowLeft":
            keyDown.ArrowLeft.pressed = false
            break;
        case "ArrowRight":
            keyDown.ArrowRight.pressed = false
            break;
        case "ArrowUp":
            if (player2.remainingJumps > 0) {
                player2.velocity.y = 0
            }
            break;
    }
})
