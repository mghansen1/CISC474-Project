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


let time = 60;
function determineWinner({player, enemy}) {
    if (player.health == 0 && enemy.health != 0) {
        console.log(enemy.name + " Wins! 0")
    } else if (enemy.health == 0 && player.health != 0) {
        console.log(player.name + " Wins! 0") 
    }


    if (time === 0) {
        if (player.health > enemy.health) {
            console.log(player.name + " Wins!")
        } else if (player.health < enemy.health) {
            console.log(enemy.name + " Wins!")
        } else {
            console.log("Tie")
        }
    }


}
function decreaseTime() {
    console.log("time")
}

module.exports = { collisionDetection, determineWinner, decreaseTime }