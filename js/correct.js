const playerNo = document.getElementById('playerNumber');
const playerBtn = document.getElementById('playerSubmit');
const playArea = document.getElementById('playArea');
const playerDeck = document.getElementById('playerDeck');
const reRoll = document.getElementById('reRoll');
const quit = document.getElementById('quit');

const dice = [
    { name: "A", value: 14 },
    { name: "K", value: 13 },
    { name: "Q", value: 12 },
    { name: "J", value: 11 },
    { name: "Ten", value: 10 },
    { name: "Nine", value: 9 }
];



let players = [];


function checkPlayer() {

    if (playerNo.value < 6 && playerNo.value > 1) {
        generatePlayers();
        displayPlayers();

        console.log(JSON.stringify(players));

        //playerBtn.parentNode.style.display = "none";
        //reRoll.parentNode.style.display = "block";
    }

    else if (playerNo.value > 5) {
        alert("Maximum 5 players to play this game!");
    } else {
        alert("You need more than 2 players to play this game!");
    }
};

function generatePlayers() {
    //console.log(playerNo.value);

    for (let i = 0; i < playerNo.value; i++) {

        players.push({
            id: i,
            dices: generateDices(),
            diceCountTable: []
        }); //add in the dices result to the players array, while adding id

        updatePlayerDiceCountTable(i);

    } // loop the function by the amount of players.  

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

function updatePlayerDiceCountTable(index) {

    players[index].diceCountTable = [];

    players[index].dices.forEach(function (die) {

        let item = search(die.name, players[index].diceCountTable);

        //If it can't find the current dice in the diceCountTable, then add it to the diceCountTable with an initial value of 1, else increment it
        if (item) {
            item.count++;
        } else {
            players[index].diceCountTable.push({ name: die.name, value: die.value, count: 1 });
        }


    });

};

function reroll(index) {

    //find that player with that index in your players array

    players[index].dices = generateDices();

    updatePlayerDiceCountTable(index);

    console.log(JSON.stringify(players));
}


function displayPlayers() {

    for (i = 0; i < players.length; i++) {

        console.log(players[i].dices)
        let playerID = document.createElement('div'); //create div base on the amount of players

        players[i].dices.forEach(function (die) {
            playerID.setAttribute("id", "player" + i);
            playerID.innerHTML += '<span>' + die.name + "</span>";

        });

        //playerID.innerHTML = '<h1>' + playerID.innerHTML + '</h1>';
        playerDeck.appendChild(playerID);
    }

}


//let test = [];


//function showHand(playersHand) {

//    let i = 0;
//    for (index = 0; index < playersHand.length; index++) {
//        //console.log("bob " + playersHand[index].name);
//        test.push(playersHand[index].name);

//    }
//    return test;
//    ///dcreat div

//}



function diceResult(countTable) {
    //function check what hands I have
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


};

function winner(countTable) {
    //five of a kind
    //four of a kind
    //full house
    //straight 10 - A is better than 9 - K
    // 3 of a kind
    //2 pair 
    //1 pair
    // high card - which means nobody has a card but A is the best (this is literally check for the highest number in the array)
    let totalCountValue = 0;
    for (var i = 0; i < countTable.length; i++) {
        totalCountValue += countTable[i].value;
    }

    console.log('totalCountValue ' + totalCountValue);
    //there can only be 2 straights 9-K or 10-A so check for those values by adding them up, else its not a straight

    // if its 55 its a K high straight, if its 60 its  an A high straight else its not anything
    if (totalCountValue === 55) {

    } else if (totalCountValue === 60) {

    }
}

function printResult(counttable, result) {
    // create result div 
    //append to html  put in new playerarea div console.log(result);
}


function getDiceTotal(totalDice, no) {
    return totalDice + no;
}


function search(nameKey, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].name === nameKey) {
            return array[i];
        }
    }
}

//function diceResult() {
//    let randDice= "";
//    let i = 0;
//    while ( i < 5) {
//        randDice +=  dice[Math.floor(Math.random() * dice.length)];
//        i++;
//    }
//    const randDiceSplit = randDice.split(" ");
//    return '<span>' + randDiceSplit.shift() + '</span> <span>' + randDiceSplit.shift() + '</span> <span>' + randDiceSplit.shift() + '</span> <span>' + randDiceSplit.shift() + '</span> <span>' + randDiceSplit.shift() + '</span>';
//};



function rollAgain() {
    players = []; // empty the array

    while (playerDeck.firstChild) {
        playerDeck.removeChild(playerDeck.firstChild);
    }; // remove all child div from playerDeck

    //run 
    outputPlayers();
    displayPlayers();
};




playerBtn.onclick = function (e) {
    checkPlayer();
}

let clickLimit = (function (e) {

    let rollCount = 0;

    return function () {
        rollCount += 1;
        if (rollCount > 3) {
            return;
        }

        rollAgain();

    }
}());

reRoll.addEventListener('click', clickLimit, false);

quit.onclick = function (e) {
    location.reload(true);
}

