characterMap = {
    "Warrior": 'Warrior',
    "Wizard": 'Wizard',
    "Martial Hero": "Martial_hero",
    "Fantasy Warrior":"Fantasy_Warrior"
}

const path = true ? "https://mghansen1.github.io/CISC474-Project/" : ".."

function fighterConfigurations({character, player}) {
    let playerX
    let name;
    let playerY = 0;
    if (player === 'p1') {
        playerX = 200
        name = "Player 1"
    } else {
        playerX = 500
        name = "Player 2"
    }

    const fighterConfigurations = {
        Warrior: {
            position: {
                x: playerX,
                y: playerY
            },
            velocity: {
                x: 0,
                y: 0
            }, 
            size: {
                width: 75,
                height: 140
            },
            attackArea: {
                height: 90,
                width: 210
            },
            facingDirection: 1,
            health: 500,
            attackDamage: 10,
            name: name,
            imageSrc: path + "sprites/Warrior/Idle.png",
            maxFrames: 10,
            scale: 3.5,
            offset: {
                x: 205,
                y: 163
            },
            facingDirectionOffset: {
                forward: 20,
                backward: 73
            },
            remainingJumps: 2,
            sprites: {
                idle: {
                    imageSrc: path + "sprites/Warrior/Idle.png",
                    maxFrames: 10
                },
                attack: {
                    imageSrc: path + "sprites/Warrior/Attack1.png",
                    maxFrames: 4
                },
                getHit: {
                    imageSrc: path + "sprites/Warrior/Get Hit.png",
                    maxFrames: 3
                },
                run: {
                    imageSrc: path + "sprites/Warrior/Run.png",
                    maxFrames: 6
                },
                jump: {
                    imageSrc: path + "sprites/Warrior/Jump.png",
                    maxFrames: 2
                },
                fall: {
                    imageSrc: path + "sprites/Warrior/Fall.png",
                    maxFrames: 2
                },
                death: {
                    imageSrc: path + "sprites/Warrior/Fall.png",
                    maxFrames: 2
                }
            }
        },
        Fantasy_Warrior_Big: {
            position: {
                x: playerX,
                y: playerY
            },
            velocity: {
                x: 0,
                y: 0
            }, 
            size: {
                width: 75,
                height: 140
            },
            attackArea: {
                height: 90,
                width: 210
            },
            facingDirection: 1,
            health: 500,
            attackDamage: 10,
            name: name,
            imageSrc: path + "sprites/Fantasy Warrior/Idle.png",
            maxFrames: 10,
            scale: 3.5,
            offset: {
                x: 205,
                y: 219
            },
            remainingJumps: 2,
            sprites: {
                idle: {
                    imageSrc: path + "sprites/Fantasy Warrior/Idle.png",
                    maxFrames: 10
                },
                attack: {
                    imageSrc: path + "sprites/Fantasy Warrior/Attack1.png",
                    maxFrames: 7
                },
                getHit: {
                    imageSrc: path + "sprites/Fantasy Warrior/Take hit.png",
                    maxFrames: 3
                },
                run: {
                    imageSrc: path + "sprites/Fantasy Warrior/Run.png",
                    maxFrames: 8
                },
                jump: {
                    imageSrc: path + "sprites/Fantasy Warrior/Jump.png",
                    maxFrames: 3
                },
                fall: {
                    imageSrc: path + "sprites/Fantasy Warrior/Fall.png",
                    maxFrames: 3
                },
        
            }
        },
        Wizard_Big: {
            position: {
                x: playerX,
                y: playerY
            },
            velocity: {
                x: 0,
                y: 0
            }, 
            size: {
                width: 93,
                height: 170
            },
            attackArea: {
                height: 90,
                width: 240
            },
            facingDirection: 1,
            health: 500,
            attackDamage: 10,
            name: name,
            imageSrc: ".../sprites/Wizard/Idle.png",
            maxFrames: 6,
            scale: 2.2,
            offset: {
                x: 165,
                y: 145
            },
            remainingJumps: 2,
            sprites: {
                idle: {
                    imageSrc: ".../sprites/Wizard/Idle.png",
                    maxFrames: 6
                },
                attack: {
                    imageSrc: ".../sprites/Wizard/Attack2.png",
                    maxFrames: 8
                },
                getHit: {
                    imageSrc: ".../sprites/Wizard/Hit.png",
                    maxFrames: 4
                },
                run: {
                    imageSrc: ".../sprites/Wizard/Run.png",
                    maxFrames: 8
                },
                jump: {
                    imageSrc: ".../sprites/Wizard/Jump.png",
                    maxFrames: 2
                },
                fall: {
                    imageSrc: ".../sprites/Wizard/Fall.png",
                    maxFrames: 2
                },
            
        
            }
    
        },
        Warrior_Big: {
            position: {
                x: playerX,
                y: playerY
            },
            velocity: {
                x: 0,
                y: 0
            }, 
            size: {
                width: 95,
                height: 160
            },
            attackArea: {
                height: 90,
                width: 240
            },
            facingDirection: -1,
            health: 500,
            attackDamage: 10,
            name: name,
            imageSrc: path + "sprites/Warrior/Idle.png",
            maxFrames: 10,
            scale: 4.2,
            offset: {
                x: 205,
                y: 209
            },
            remainingJumps: 2,
            sprites: {
                idle: {
                    imageSrc: path + "sprites/Warrior/Idle.png",
                    maxFrames: 10
                },
                attack: {
                    imageSrc: path + "sprites/Warrior/Attack1.png",
                    maxFrames: 4
                }, 
                getHit: {
                    imageSrc: path + "sprites/Warrior/Get Hit.png",
                    maxFrames: 3
                },
                run: {
                    imageSrc: path + "sprites/Warrior/Run.png",
                    maxFrames: 6
                },
                jump: {
                    imageSrc: path + "sprites/Warrior/Jump.png",
                    maxFrames: 2
                },
                fall: {
                    imageSrc: path + "sprites/Warrior/Fall.png",
                    maxFrames: 2
                },
            }
        },
        Fantasy_Warrior: {
            position: {
                x: playerX,
                y: playerY
            },
            velocity: {
                x: 0,
                y: 0
            }, 
            size: {
                width: 75,
                height: 140
            },
            attackArea: {
                height: 90,
                width: 210
            },
            facingDirection: 1,
            health: 500,
            attackDamage: 10,
            name: name,
            imageSrc: path + "sprites/Fantasy Warrior/Idle.png",
            maxFrames: 10,
            scale: 3.5,
            offset: {
                x: 205,
                y: 213
            },
            facingDirectionOffset: {
                forward: -20,
                backward: 110
            },
            remainingJumps: 2,
            sprites: {
                idle: {
                    imageSrc: path + "sprites/Fantasy Warrior/Idle.png",
                    maxFrames: 10
                },
                attack: {
                    imageSrc: path + "sprites/Fantasy Warrior/Attack1.png",
                    maxFrames: 7
                },
                getHit: {
                    imageSrc: path + "sprites/Fantasy Warrior/Take hit.png",
                    maxFrames: 3
                },
                run: {
                    imageSrc: path + "sprites/Fantasy Warrior/Run.png",
                    maxFrames: 8
                },
                jump: {
                    imageSrc: path + "sprites/Fantasy Warrior/Jump.png",
                    maxFrames: 3
                },
                fall: {
                    imageSrc: path + "sprites/Fantasy Warrior/Fall.png",
                    maxFrames: 3
                },
        
            }
        },
        Martial_hero: {
            position: {
                x: playerX,
                y: playerY
            },
            velocity: {
                x: 0,
                y: 0
            }, 
            size: {
                width: 75,
                height: 140
            },
            attackArea: {
                height: 90,
                width: 210
            },
            facingDirection: 1,
            health: 500,
            attackDamage: 10,
            name: name,
            imageSrc: path + "sprites/Martial Hero/Idle.png",
            maxFrames: 4,
            scale: 2.8,
            offset: {
                x: 215,
                y: 220
            },
            facingDirectionOffset: {
                forward: -10,
                backward: 110
            },
            remainingJumps: 2,
            sprites: {
                idle: {
                    imageSrc: path + "sprites/Martial Hero/Idle.png",
                    maxFrames: 4
                },
                attack: {
                    imageSrc: path + "sprites/Martial Hero/Attack1.png",
                    maxFrames: 4
                },
                getHit: {
                    imageSrc: path + "sprites/Martial Hero/Take hit.png",
                    maxFrames: 3
                },
                run: {
                    imageSrc: path + "sprites/Martial Hero/Run.png",
                    maxFrames: 8
                },
                jump: {
                    imageSrc: path + "sprites/Martial Hero/Jump.png",
                    maxFrames: 2
                },
                fall: {
                    imageSrc: path + "sprites/Martial Hero/Fall.png",
                    maxFrames: 2
                },
            
        
            }
        },
        Wizard: {
            position: {
                x: playerX,
                y: playerY
            },
            velocity: {
                x: 0,
                y: 0
            }, 
            size: {
                width: 85,
                height: 140
            },
            attackArea: {
                height: 90,
                width: 240
            },
            facingDirection: 1,
            health: 500,
            attackDamage: 15,
            name: name,
            imageSrc: path + "sprites/Wizard/Idle.png",
            maxFrames: 6,
            scale: 1.8,
            offset: {
                x: 165,
                y: 115
            },
            facingDirectionOffset: {
                forward: 30,
                backward: 74
            },
            remainingJumps: 2,
            sprites: {
                idle: {
                    imageSrc: path + "sprites/Wizard/Idle.png",
                    maxFrames: 6
                },
                attack: {
                    imageSrc: path + "sprites/Wizard/Attack2.png",
                    maxFrames: 8
                },
                getHit: {
                    imageSrc: path + "sprites/Wizard/Hit.png",
                    maxFrames: 4
                },
                run: {
                    imageSrc: path + "sprites/Wizard/Run.png",
                    maxFrames: 8
                },
                jump: {
                    imageSrc: path + "sprites/Wizard/Jump.png",
                    maxFrames: 2
                },
                fall: {
                    imageSrc: path + "sprites/Wizard/Fall.png",
                    maxFrames: 2
                },
            
        
            }
    
        }
        
    };

    return fighterConfigurations[character]
}



//export {fighterConfigurations};