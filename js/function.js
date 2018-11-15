const playerNo = document.getElementById('playerNumber');
const playerBtn = document.getElementById('playerSubmit');
const playerIDArea = document.getElementById('playerIDArea');
const playerDeck = document.getElementById('playerDeck');
const reRoll = document.getElementById('reRoll');
const quit = document.getElementById('quit');

const dice = [
    { name: "A", value: 14 },
    { name: "K", value: 13 },
    { name: "Q", value: 12 },
    { name: "J", value: 11 },
    { name: "10", value: 10 },
    { name: "9", value: 9 }
];


let countTable = [];
let players = [];



function checkPlayer() {

    if (playerNo.value < 6 && playerNo.value > 1) {
        outputPlayers();
        displayPlayers();
        checkDiceForPairs();
        playerBtn.parentNode.parentNode.style.display = "none";
        reRoll.parentNode.style.display = "block";
    }

    else if (playerNo.value > 5) {
        alert("Maximum 5 players to play this game!");
    } else {
        alert("You need more than 2 players to play this game!");
    }
};

function outputPlayers() {
 
    for (let i = 0; i < playerNo.value; i++) {

        let randomDices = generateDices();

        players.push({
            id: i,
            dices: generateDices()
        }); //add in the dices result to the players array, while adding id

    } // loop the function by the amount of players.  

}

function displayPlayers() {

    for (i = 0; i < players.length; i++) {

        console.log(players[i].dices)
        let playerDices = document.createElement('div'); //create div base on the amount of players
        let playerID = document.createElement('div');
        playerID.innerHTML += 'player ' + (i + 1);
        players[i].dices.forEach(function(die){
            playerDices.setAttribute("id", "player" + i);
            playerDices.innerHTML += '<span>' + die.name + "</span>";
          
        });
        playerIDArea.appendChild(playerID);
        playerDeck.appendChild(playerDices); //appendThe html
    }

}

function generateDices() {

    let resultArray = [];

    let i = 0;
    while (i < 5) {
        let randomIndex = Math.floor(Math.random() * 5);
        resultArray.push(dice[randomIndex]);
        i++;
    } //create random number 5 times and use the number as id for the dice array and push the result in to resultarrap
    return resultArray;
    
};

function checkDiceForPairs() {
    //function check count of dices

    for (i = 0; i < players.length; i++) {

        players[i].dices.forEach(function (die) {

            let test = search(die.name, countTable);

            if (test) {
                test.count = test.count + 1;
            } else {
                countTable.push({  name: die.name, value: die.value, count: 1 });
            }

        });
    }

    console.log("Count table: " + JSON.stringify(countTable));
};

function search(nameKey, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].name === nameKey) {
            return array[i];
        }
    }
}

function diceResult(countTable) {
    // full house
    if (countTable.length == 2 && countTable[1].count == 2) {
        printResult("full house");
        console.log('full house');
    } else if (countTable.length == 3 && countTable[0].count == 2 && countTable[1].count == 2 || countTable.length == 3 && countTable[1].count == 2 && countTable[2].count == 2 || countTable.length == 3 && countTable[0].count == 2 && countTable[2].count == 2) {
        printResult("2 pair");
        console.log('2 pair');
    } else if (countTable.length == 2 && countTable[0].count == 1 || countTable.length == 2 && countTable[1].count == 1) {
        printResult("4 of a kind");
        console.log('4 of a kind');
    } else if (countTable.length == 3 && countTable[0].count == 3 && countTable[1].count == 1 || countTable.length == 3 && countTable[1].count == 3 && countTable[0].count == 1) {
        printResult("3 of a kind");
        console.log('3 of a kind');
    } else if (countTable.length == 5) {
        console.log('straight');
    } else {
        console.log('nothing');
    }
};//for checking, not in use


function getDiceTotal(totalDice, no) {
    return totalDice + no;
} // work out total value


playerBtn.onclick = function (e) {
    checkPlayer();
}//player button


let clickLimit = (function (e) {
   
    let rollCount = 0;

    return function () {
        rollCount += 1;
        if (rollCount > 3) {
            return;
        } // 3 time limit, stop function

        rollAgain();

    }
}());

function rollAgain() {
    players = []; // empty the array

    while (playerDeck.firstChild) {
        playerDeck.removeChild(playerDeck.firstChild);
        playerIDArea.removeChild(playerIDArea.firstChild);
    }; // remove all child div from playerDeck

    //run 
    outputPlayers();
    displayPlayers();
};

reRoll.addEventListener('click', clickLimit, false);


quit.onclick = function (e) {
    location.reload(true);
}
