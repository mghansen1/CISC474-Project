class Sprite {
    constructor({position, size}) {
        this.position = position
        this.size = size
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)    
    }

    animateFrame() {
        //cycle through sprites
    }
}

class Fighter extends Sprite {
    constructor({
        velocity,
        position,
        attackArea,
        size,
        facingDirection
    }) {
        super({position, size})
        this.velocity = velocity
        this.lastkey
        this.attackArea = attackArea
        this.isAttacking = false
        this.facingDirection = facingDirection
        this.sprite
    }

    update() {
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

        this.draw()
        

        // depreciate when added attack animation, call animateFrame()
        if (this.isAttacking) {
            c.fillStyle = 'green';
            if (this.facingDirection === 1) {
                c.fillRect(this.position.x, this.position.y, this.attackArea.width, this.attackArea.height)
            } else {
                c.fillRect(this.position.x + this.size.width, this.position.y, -this.attackArea.width, this.attackArea.height)
            }
            
        }

    }

    takeDamage() {}

    switchSprite() {
        // switch through idle, attack, dodge, run, jump, death sprites
    }


}