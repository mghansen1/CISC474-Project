class Sprite {
    constructor({position, size, imageSrc, maxFrames, scale, offset, sprites}) {
        this.position = position
        this.size = size
        this.currentFrame = 0
        this.maxFrames = maxFrames
        this.scale = scale
        this.offset = offset
        this.framesHold = 10
        this.frameBuffer = 0
        this.sprites = sprites
        this.image = 'idle'
    }

    draw() {
        throw new Error('draw method must be implemented in derived classes');
    }
    
    animateFrame() {
        this.frameBuffer++

        if (this.frameBuffer % this.framesHold === 0) {
            if (this.currentFrame < this.maxFrames - 1) {
                this.currentFrame++
            } else {
                this.currentFrame = 0
            }
        }
    }


}

const canvas = {
    width: 1224,
    height: 576
}
const gravity = 0.4
const hitBoxesOn = false

class Fighter extends Sprite {
    constructor({
        velocity,
        position,
        attackArea,
        size,
        facingDirection,
        health,
        attackDamage,
        name,
        imageSrc,
        maxFrames,
        scale,
        offset,
        remainingJumps,
        sprites
    }) {
        super({position, size, imageSrc, maxFrames, scale, offset, sprites})
        this.velocity = velocity
        this.lastkey
        this.attackArea = attackArea
        this.isAttacking = false
        this.facingDirection = facingDirection
        this.sprite
        this.health = health
        this.attackDamage = attackDamage
        this.name = name
        this.damageDealt = false
        this.gettingHit = false
        this.maxJumps = 2
        this.remainingJumps = remainingJumps
        this.up = { pressed: false}
        this.left = { pressed: false}
        this.right = { pressed: false}
        this.roomNo = undefined;
        // for (const sprite in this.sprites) {
        //     sprites[sprite].image = new Image()
        //     sprites[sprite].image.src = sprites[sprite].imageSrc
        // }
    }

    update() {
        //this.draw()
        this.animateFrame()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        

        if (this.position.x + this.size.width + this.velocity.x > canvas.width) {
            this.position.x = canvas.width - this.size.width
            this.velocity.x = 0
        } else if (this.position.x + this.velocity.x < 0) {
            this.position.x = 0
            this.velocity.x = 0
        }
        if (this.position.y + this.size.height + this.velocity.y >= canvas.height) {
            this.position.y = canvas.height - this.size.height
            this.velocity.y = 0
            this.remainingJumps = this.maxJumps
        } else {
            this.velocity.y += gravity
        }

        

        
    
        // depreciate when added attack animation, call animateFrame()
        if (this.isAttacking && hitBoxesOn) {
            c.fillStyle = 'green';
            if (this.facingDirection === 1) {
                c.fillRect(this.position.x, this.position.y, this.attackArea.width, this.attackArea.height)
            } else {
                c.fillRect(this.position.x + this.size.width, this.position.y, -this.attackArea.width, this.attackArea.height)
            }
            
        }

    }

    attack() {
        this.isAttacking = true
        this.switchSprite("attack")
    }

    takeDamage({damageAmount, enemyDirection}) {
        this.health -= damageAmount
        if (this.health < 0) {
            this.health = 0
        } else {
            this.getHit({enemyDirection: enemyDirection})
        }
        //console.log(this.health);

    }

    getHit({enemyDirection}) {
        this.gettingHit = true
        this.velocity.x = enemyDirection * 3
        this.velocity.y -= 5
        setTimeout(() => {
            //this.velocity.x = 0 
            //this.gettingHit = false
            }, 500
        );
        this.switchSprite("getHit")
    }

    switchSprite(sprite) {

        // if (this.image === 'attack' && this.currentFrame < this.sprites.attack.maxFrames - 1) {
        //     return
        // }

        if (this.image === 'getHit' && this.currentFrame < this.sprites.getHit.maxFrames - 1) {
            this.currentFrame++
            return
        }
        
        // switch through idle, attack, dodge, run, jump, death sprites
        switch (sprite) {
            case "idle":
                if (this.image !== 'idle') {
                    this.image = 'idle'
                    this.maxFrames = this.sprites.idle.maxFrames
                    this.currentFrame = 0
                    
                }
                break
                
            case "attack":
                if (this.image !== 'attack') {
                    this.image = 'attack'
                    this.maxFrames = this.sprites.attack.maxFrames
                    this.currentFrame = 0
                    
                }
                break
            case "getHit":
                if (this.image !== 'getHit') {   
                    //console.log("sto")
                    this.image = 'getHit'
                    this.maxFrames = this.sprites.getHit.maxFrames
                    this.currentFrame = 0
                }
                break
            case "run":
                if (this.image !== 'run') {
                    this.image = 'run'
                    this.maxFrames = this.sprites.run.maxFrames
                    this.currentFrame = 0
                }
                break
            case "jump":
                if (this.image !== 'jump') {
                    this.image = 'jump'
                    this.maxFrames = this.sprites.jump.maxFrames
                    this.currentFrame = 0
                }
                break
            case "fall":
                if (this.image !== 'fall') {
                    this.image = 'fall'
                    this.maxFrames = this.sprites.fall.maxFrames
                    this.currentFrame = 0
                }
                break   
        }
    }


}
module.exports = { Sprite, Fighter }