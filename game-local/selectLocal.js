
const gravity = 0
const hitBoxesOn = false
let canvas = document.getElementById("selectedFighterDisplay1")
let c = canvas.getContext('2d')

document.addEventListener('DOMContentLoaded', function() {
    
    canvas.width = 220
    canvas.height = 200
    const fighters = document.querySelectorAll('.fighter');
    // const selectedFighterDisplay = document.getElementById('selectedFighter');
    const p1Element = document.getElementById('p1');
    const selectedFighterDisplay1 = p1Element.querySelector('#selectedFighter');
    const p2Element = document.getElementById('p2');
    const selectedFighterDisplay2 = p2Element.querySelector('#selectedFighter');
    // let player;
    // let myInterval;
    
    

    // fighters.forEach((fighter) => {
    //   fighter.addEventListener('click', function() {
    //     player = null
    //     const selectedFighter = fighter.textContent;
    //     localStorage.setItem("myFighter-local", selectedFighter);
    //     player = new BrowserFighter(fighterConfigurations({character: characterMap[selectedFighter], player: "p1"}))
    //     player.switchSprite("idle")
    //     player.position.x=50
    //     player.position.y=500
    //     clearInterval(myInterval)
    //     myInterval = setInterval(() => {
    //       c.clearRect(0,0,canvas.width,canvas.height)
    //       player.update()
    //       }, 10
    //     );
         
    //     selectedFighterDisplay.textContent = selectedFighter;
    //   });
    // });

    let player1;
    let player2;
    let myInterval;
    
    fighters.forEach((fighter) => {
        fighter.addEventListener('click', function() {
            const selectedFighter = fighter.textContent;
            
            if (!player1) {
                canvas = document.getElementById("selectedFighterDisplay1")
                c = canvas.getContext('2d')
                canvas.width = 220
                canvas.height = 200
                localStorage.setItem("myFighter-local-p1", selectedFighter);
                player1 = new BrowserFighter(fighterConfigurations({character: characterMap[selectedFighter], player: "p1"}))
                player1.switchSprite("idle")
                player1.position.x = 50
                player1.position.y = 500
                
                clearInterval(myInterval)
                myInterval = setInterval(() => {
                    c.clearRect(0, 0, canvas.width, canvas.height)
                    player1.update()
                }, 10);
                
                selectedFighterDisplay1.textContent = selectedFighter;
            } else if (!player2) {
                canvas = document.getElementById("selectedFighterDisplay2")
                c = canvas.getContext('2d')
                canvas.width = 220
                canvas.height = 200
                localStorage.setItem("myFighter-local-p2", selectedFighter);
                player2 = new BrowserFighter(fighterConfigurations({character: characterMap[selectedFighter], player: "p2"}))
                player2.switchSprite("idle")
                player2.position.x = 50
                player2.position.y = 500
                
                clearInterval(myInterval)
                myInterval = setInterval(() => {
                    c.clearRect(0, 0, canvas.width, canvas.height)
                    player2.update()
                }, 10);
                
                selectedFighterDisplay2.textContent = selectedFighter;
            }

            
        });
    });


  });
