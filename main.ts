function drawTimer (turn: number, timer: number, limit: number) {
    x= (turn==0)?0:4
limity = 5 - Math.map(timer, 0, limit, 0, 5)
    for (let y = 0; y <= 5; y++) {
        if (y < limity) {
            led.unplot(x, y)
        } else {
            led.plot(x, y)
        }
    }
}

function countDown(turn: number, limit:number){
    for (let i = limit; i >= 0; i--) {
        if (i>9) {
            drawTimer(turn, i, limit)
            led.toggle(2, 2)
        }
        else
            basic.showString(i.toString(),0)
        
        basic.pause(1000)
    }
    for (let index = 0; index < 5; index++) {
        basic.showIcon(IconNames.No)
        basic.clearScreen()
        basic.pause(200)
    }
}

input.onButtonPressed(Button.A, function() {
  playerTURN = 0  
  //countDown(0,10)
})

input.onButtonPressed(Button.B, function() {
    playerTURN = 1
    //countDown(1,10)
})

input.onButtonPressed(Button.AB, function() {
    playerTURN = -1 //pause game
})

function playerLOOP() {
    if (playerTURN == -1) return
    let timr = 0
    if (playerTURN == 0)
        timr = timerA--
    else
        timr = timerB--
    drawTimer(playerTURN, timr, timerLIMIT)
    if (timr == 0) {
        control.clearInterval(intervalID, control.IntervalMode.Interval)
        for (let index = 0; index < 5; index++) {
            basic.pause(200)
            basic.clearScreen()
            basic.pause(200)
            if (timerA<=0)
                basic.showArrow(ArrowNames.East)
            else if (timerB<=0)
                basic.showArrow(ArrowNames.West)
        }

    }
    led.toggle(2,0)
}

let intervalID = control.setInterval(playerLOOP , 1000, control.IntervalMode.Interval)

let limity = 0
let timerLIMIT = 20
let x = 0
let timerA = timerLIMIT //seconds
let timerB = timerLIMIT //seconds
let playerTURN = -1
// 0 = A player, 1 = B player


