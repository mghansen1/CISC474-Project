
function fighterConfigurations({character, player}) {
    let playerX
    let playerY = 0;
    if (player === 'p1') {
        playerX = 200
    } else {
        playerX = 500
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
            name: "Player 2",
            imageSrc: "../sprites/Warrior/Idle.png",
            maxFrames: 10,
            scale: 3.5,
            offset: {
                x: 205,
                y: 163
            },
            remainingJumps: 2,
            sprites: {
                idle: {
                    imageSrc: "../sprites/Warrior/Idle.png",
                    maxFrames: 10
                },
                attack: {
                    imageSrc: "../sprites/Warrior/Attack1.png",
                    maxFrames: 4
                },
                getHit: {
                    imageSrc: "../sprites/Warrior/Get Hit.png",
                    maxFrames: 3
                },
                run: {
                    imageSrc: "../sprites/Warrior/Run.png",
                    maxFrames: 6
                },
                jump: {
                    imageSrc: "../sprites/Warrior/Jump.png",
                    maxFrames: 2
                },
                fall: {
                    imageSrc: "../sprites/Warrior/Fall.png",
                    maxFrames: 2
                },
            
        
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
            name: "Player 2",
            imageSrc: "../sprites/Fantasy Warrior/Idle.png",
            maxFrames: 10,
            scale: 3.5,
            offset: {
                x: 205,
                y: 219
            },
            remainingJumps: 2,
            sprites: {
                idle: {
                    imageSrc: "../sprites/Fantasy Warrior/Idle.png",
                    maxFrames: 10
                },
                attack: {
                    imageSrc: "../sprites/Fantasy Warrior/Attack1.png",
                    maxFrames: 7
                },
                getHit: {
                    imageSrc: "../sprites/Fantasy Warrior/Take hit.png",
                    maxFrames: 3
                },
                run: {
                    imageSrc: "../sprites/Fantasy Warrior/Run.png",
                    maxFrames: 8
                },
                jump: {
                    imageSrc: "../sprites/Fantasy Warrior/Jump.png",
                    maxFrames: 3
                },
                fall: {
                    imageSrc: "../sprites/Fantasy Warrior/Fall.png",
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
            name: "Player 2",
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
            name: "Player 1",
            imageSrc: "../sprites/Warrior/Idle.png",
            maxFrames: 10,
            scale: 4.2,
            offset: {
                x: 205,
                y: 209
            },
            remainingJumps: 2,
            sprites: {
                idle: {
                    imageSrc: "../sprites/Warrior/Idle.png",
                    maxFrames: 10
                },
                attack: {
                    imageSrc: "../sprites/Warrior/Attack1.png",
                    maxFrames: 4
                }, 
                getHit: {
                    imageSrc: "../sprites/Warrior/Get Hit.png",
                    maxFrames: 3
                },
                run: {
                    imageSrc: "../sprites/Warrior/Run.png",
                    maxFrames: 6
                },
                jump: {
                    imageSrc: "../sprites/Warrior/Jump.png",
                    maxFrames: 2
                },
                fall: {
                    imageSrc: "../sprites/Warrior/Fall.png",
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
            name: "Player 2",
            imageSrc: "../sprites/Fantasy Warrior/Idle.png",
            maxFrames: 10,
            scale: 3.5,
            offset: {
                x: 205,
                y: 219
            },
            remainingJumps: 2,
            sprites: {
                idle: {
                    imageSrc: "../sprites/Fantasy Warrior/Idle.png",
                    maxFrames: 10
                },
                attack: {
                    imageSrc: "../sprites/Fantasy Warrior/Attack1.png",
                    maxFrames: 7
                },
                getHit: {
                    imageSrc: "../sprites/Fantasy Warrior/Take hit.png",
                    maxFrames: 3
                },
                run: {
                    imageSrc: "../sprites/Fantasy Warrior/Run.png",
                    maxFrames: 8
                },
                jump: {
                    imageSrc: "../sprites/Fantasy Warrior/Jump.png",
                    maxFrames: 3
                },
                fall: {
                    imageSrc: "../sprites/Fantasy Warrior/Fall.png",
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
            name: "Player 2",
            imageSrc: "../sprites/Warrior/Idle.png",
            maxFrames: 4,
            scale: 3.5,
            offset: {
                x: 205,
                y: 163
            },
            remainingJumps: 2,
            sprites: {
                idle: {
                    imageSrc: "../sprites/Warrior/Idle.png",
                    maxFrames: 4
                },
                attack: {
                    imageSrc: "../sprites/Warrior/Attack1.png",
                    maxFrames: 4
                },
                getHit: {
                    imageSrc: "../sprites/Warrior/Take hit.png",
                    maxFrames: 3
                },
                run: {
                    imageSrc: "../sprites/Warrior/Run.png",
                    maxFrames: 8
                },
                jump: {
                    imageSrc: "../sprites/Warrior/Jump.png",
                    maxFrames: 2
                },
                fall: {
                    imageSrc: "../sprites/Warrior/Fall.png",
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
            name: "Player 2",
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
    
        }
        
    };

    return fighterConfigurations[character]
}



//export {fighterConfigurations};