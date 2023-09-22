function collisionDetection({player, enemy}) {

    if (player.facingDirection === 1) {
        return (
            player.position.x + player.attackArea.width > enemy.position.x 
            && player.position.x < enemy.position.x + enemy.size.width 
            && player.position.y + player.attackArea.height > enemy.position.y
            && player.position.y < enemy.position.y + enemy.size.height
        )
    } else {
        return (
            player.position.x - player.attackArea.width + player.size.width < enemy.position.x + enemy.size.width
            && player.position.x + player.size.width > enemy.position.x 
            && player.position.y + player.attackArea.height > enemy.position.y
            && player.position.y < enemy.position.y + enemy.size.height
        )
    }
}

function determineWinner() {}

function timer() {}