class Sprite {
    constructor({position}) {
        this.position = position
        this.width = 50
        this.height = 150
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height)    
    }
}

class Fighter extends Sprite {
    constructor({
        velocity,
        position
    }) {
        super({position})
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastkey
    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.x + this.width + this.velocity.x > canvas.width) {
            this.position.x = canvas.width - this.width
            this.velocity.x = 0
        } else if (this.position.x + this.velocity.x < 0) {
            this.position.x = 0
            this.velocity.x = 0
        }

        if (this.position.y + this.height + this.velocity.y > canvas.height) {
            this.position.y = canvas.height - this.height
        } else {
            this.velocity.y += gravity
        }

        this.draw()
    }

}