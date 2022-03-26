var betGreen            = [1, 10, 100];     // Jackpot bets
var betBait             = [1, 4, 20];       // Bait bets
var betDouble           = [1, 10];           // Double bets
var minJackpot          = 1000;             // Start betting when jackpot is x
var minBalance          = 1.5;             // Stop betting on user balance
var allowDouble         = 0;                // 1: Set 1 bet after green | 2: Set bet after double green
var hasBet              = 0;                // DO NOT TOUCH
var currentGreenCount   = 0;                // DO NOT TOUCH

function removeCommas(str) {
    while (str.search(",") >= 0) {
        str = (str + "").replace(',', '');
    }
    return str;
};

function doEvent( obj, event ) {
    var event = new Event( event, {target: obj, bubbles: true} );
    return obj ? obj.dispatchEvent(event) : false;
}

function makeBet(gAmount, bAmount) {
    var buttonGreen         = document.getElementsByClassName('mat-button-base mat-green')[0];
    var buttonBait          = document.getElementsByClassName('mat-button-base mat-bait')[0];
    var setBetSize          = document.getElementById("mat-input-0");

    hasBet = 1;

    // Green bet
    setBetSize.value = gAmount;
    doEvent( setBetSize, 'input' );
    buttonGreen.click();

    // Bait bet
    setBetSize.value = bAmount;
    doEvent( setBetSize, 'input' );
    buttonBait.click();

    console.log("%c[BET]", "color: #bada55", "Bet added, Green: " + gAmount + " | Bait: " + bAmount);
}

function makeDoubleBet(getAmount) {
    var buttonGreen         = document.getElementsByClassName('mat-button-base mat-green')[0];
    var setBetSize          = document.getElementById("mat-input-0");

    hasBet = 1;

    // Green bet
    setBetSize.value = getAmount;
    doEvent( setBetSize, 'input' );
    buttonGreen.click();
    console.log("%c[GREEN]", "color: #4CC355", "Double bet added, Green: ", getAmount);
}

function callBet() {
    if (hasBet === 0) {
        var currentBalance      = document.getElementsByClassName('currency-value ng-star-inserted')[0].innerText;
        var currentJackpot      = document.getElementsByClassName('test')[0].innerText;
        var preRolls            = document.getElementsByClassName('roll rounded-circle');
        var lastRoll            = preRolls[0].className;

        if (lastRoll.includes('green')) {
            if (currentGreenCount === 3) {
                currentGreenCount = 0;
                console.log("%c[JACKPOT] WE GOT THE JACKPOT!", "color: #FFD700");
                hasBet = 1;
            } else {
                currentGreenCount += 1;
                console.log("%c[ROLL]", "color: #C0FFEE", "Rolled Green: ", currentGreenCount);
            }
        } else if (lastRoll.includes('red')) {
            currentGreenCount = 0;
        } else {
            currentGreenCount = 0;
        }

        if ( hasBet === 0 ) {
            if ( minBalance < removeCommas(currentBalance) ) {
                if ( minJackpot < removeCommas(currentJackpot) ) {
                    if ( currentGreenCount == 0 && hasBet === 0) {
                        makeBet(betGreen[0], betBait[0]);
                    } else if ( currentGreenCount == 1 && hasBet === 0) {
                        makeBet(betGreen[1], betBait[1]);
                    } else if ( currentGreenCount == 2 && hasBet === 0) {
                        makeBet(betGreen[2], betBait[2]);
                    }
                } else {
                    if (allowDouble === 1) {
                        if ( currentGreenCount == 0 && hasBet === 0) {
                            console.log("%c[DOUBLE]", "color: #10CA7E", "Waiting for a green before betting.");
                            hasBet = 1;
                        } else if ( currentGreenCount == 1 && hasBet === 0) {
                            makeDoubleBet(betDouble[0]);
                        } else if ( currentGreenCount == 2 && hasBet === 0) {
                            makeDoubleBet(betDouble[1]);
                        }
                    } else if (allowDouble === 2) {
                        if ( currentGreenCount === 0 || currentGreenCount === 1 && hasBet === 0) {
                            console.log("%c[DOUBLE]", "color: #10CA7E", "Waiting for double green before betting.");
                            hasBet = 1;
                        } else if ( currentGreenCount == 2 && hasBet === 0) {
                            makeDoubleBet(betDouble[1]);
                        }
                    } else {
                        console.log("%c[JACKPOT]", "color: #FA7A55", "Jackpot is currently to low, checking again next round.");
                        hasBet = 1;
                    }
                }
            } else {
                console.log("%c[BALANCE]", "color: #bada55", "Our balance has reached the max, refill...");
                hasBet = 1;
            }
        }
    }
}

const StartBot = setInterval(function() {
    var countDown = document.getElementsByClassName('next-roll')[0].innerText;
    countDown = countDown.replace("ROLLING IN", "");
    timerLeft = countDown.trim();

    if (!(timerLeft === "0.00") && hasBet === 0) {
        callBet();
    } else if (timerLeft === "0.00" && hasBet === 1) {
        hasBet = 0;
        console.log("%c[RESET]", "color: #D13537", "Resetting bets!");
    } else {
        // Do nothing
    }
}, 2000);

StartBot;