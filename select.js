characterMap = {
  "Warrior": 'Warrior',
  "Wizard": 'Wizard',
  "Martial Hero": "Martial_hero",
  "Fantasy Warrior":"Fantasy_Warrior"
}

let canvas = document.getElementById("selectedFighterDisplay")
let c = canvas.getContext('2d')
canvas.width = 220
canvas.height = 200
let gravity = 0
let hitBoxesOn = false
let selectedFighter = null
disablePlayButton()

document.addEventListener('DOMContentLoaded', function() {
    const fighters = document.querySelectorAll('.fighter');
    const selectedFighterDisplay = document.getElementById('selectedFighter');
    let player;
    let myInterval;
    let onlinePlayersInternval
    onlinePlayersInternval = setInterval(() => {
      checkPlayerCount()
      }, 2000
    );
    
    

    fighters.forEach((fighter) => {
      fighter.addEventListener('click', function() {
        player = null
        selectedFighter = fighter.textContent;
        localStorage.setItem("myFighter-online", selectedFighter);
        player = new BrowserFighter(fighterConfigurations({character: characterMap[selectedFighter], player: "p1"}))
        player.switchSprite("idle")
        player.position.x=50
        player.position.y=500
        checkStatus()
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


async function checkStatus() {
  try {
    const response = await fetch('https://cisc474-online-service.onrender.com/status');
    
    if (response.ok) {
      console.log('Server is running!');
    } else {
      console.error('Server is not running.');
    }

    if (response.ok && selectedFighter) {
      enablePlayButton();
      console.log("enabling button")
    } else {
      disablePlayButton();
    }
  } catch (error) {
    console.error('Error occurred while checking server status:', error);
    disablePlayButton();
  }
}

function enablePlayButton() {
  const playButton = document.getElementById("playButton")
  if (playButton) {
    playButton.classList.remove('disabled');
  }
}

function disablePlayButton() {
  const playButton = document.getElementById("playButton")
  if (playButton) {
    playButton.classList.add('disabled');
  }
}

async function checkPlayerCount() {
  try {
    const response = await fetch('https://cisc474-online-service.onrender.com/active-players');
    const result = await response.json();
    
    if (response.ok) {
      document.getElementById("player-count").innerHTML = "Online Players: " + result
    } else {
      document.getElementById("player-count").innerHTML = "(Server Down) Online Players: 0"
    }

  } catch (error) {
    document.getElementById("player-count").innerHTML = "(Server Down) Online Players: 0"
  }
}
