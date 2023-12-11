characterMap = {
  "Warrior": 'Warrior',
  "Wizard": 'Wizard',
  "Martial Hero": "Martial_hero",
  "Fantasy Warrior":"Fantasy_Warrior"
}

const canvas = document.getElementById("selectedFighterDisplay")
const c = canvas.getContext('2d')
canvas.width = 220
canvas.height = 200
const gravity = 0
const hitBoxesOn = false


document.addEventListener('DOMContentLoaded', function() {
    const fighters = document.querySelectorAll('.fighter');
    const selectedFighterDisplay = document.getElementById('selectedFighter');
    let player;
    let myInterval;
    
    

    fighters.forEach((fighter) => {
      fighter.addEventListener('click', function() {
        player = null
        const selectedFighter = fighter.textContent;
        player = new BrowserFighter(fighterConfigurations({character: characterMap[selectedFighter], player: "p1"}))
        player.switchSprite("idle")
        player.position.x=50
        player.position.y=500
        clearInterval(myInterval)
        myInterval = setInterval(() => {
          c.clearRect(0,0,canvas.width,canvas.height)
          player.update()
          }, 10
        );
         
        selectedFighterDisplay.textContent = selectedFighter;
      });
    });
  });
