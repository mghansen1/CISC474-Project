class Sprite {
    constructor({position, size, imageSrc, maxFrames, scale, offset, sprites}) {
        this.position = position
        this.size = size
        this.image = new Image()
        this.image.src = imageSrc
        this.currentFrame = 0
        this.maxFrames = maxFrames
        this.scale = scale
        this.offset = offset
        this.framesHold = 7
        this.frameBuffer = 0
        this.sprites = sprites
    }

    draw() {
        if (hitBoxesOn) {
            c.fillStyle = 'red';
            c.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)
        }
         
        // const image = new Image()
        // image.src = "./sprites/Warrior/Idle.png"
        // c.drawImage(this.image, 0, 0)
        
        c.save();
        if (this.facingDirection == -1) {
            c.scale(-1,1)
            c.drawImage(
                this.image,
                this.currentFrame * (this.image.width / this.maxFrames),
                0,
                this.image.width / this.maxFrames,
                this.image.height,
                -1 * (this.position.x + this.offset.x+70),
                this.position.y - this.offset.y,
                (this.image.width / this.maxFrames) * this.scale,
                this.image.height * this.scale
            )
        } else {
            c.drawImage(
                this.image,
                this.currentFrame * (this.image.width / this.maxFrames),
                0,
                this.image.width / this.maxFrames,
                this.image.height,
                this.position.x - this.offset.x,
                this.position.y - this.offset.y,
                (this.image.width / this.maxFrames) * this.scale,
                this.image.height * this.scale
                )

        }
        c.restore()
            
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
    }

    update() {
        this.draw()
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
        if (this.position.y + this.size.height + this.velocity.y > canvas.height) {
            this.position.y = canvas.height - this.size.height
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

    takeDamage({damageAmount}) {
        this.health -= damageAmount
        if (this.health < 0) {
            this.health = 0
        }
        console.log(this.health);

    }

    switchSprite(sprite) {
        // switch through idle, attack, dodge, run, jump, death sprites
        switch (sprite) {
            case "idle":
                this.image.src = this.sprites.idle.imageSrc
                this.maxFrames = this.sprites.idle.maxFrames
                this.currentFrame = 0

                break
            case "attack":
                this.image.src = this.sprites.attack.imageSrc
                this.maxFrames = this.sprites.attack.maxFrames
                this.currentFrame = 0
                break


        }
    }


}