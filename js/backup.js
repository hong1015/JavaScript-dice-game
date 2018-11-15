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

let randNo = []
let countTable = [];


function checkPlayer() {

    if (playerNo.value < 6 && playerNo.value > 1) {
        outPutPlayer();
        playerBtn.parentNode.style.display = "none";
        reRoll.parentNode.style.display = "block";
    }

    else if (playerNo.value > 5) {
        alert("Maximum 5 players to play this game!");
    } else {
        alert("You need more than 2 players to play this game!");
    }
};

function outPutPlayer() {

    for (let i = 0; i < playerNo.value; i++) {
        diceResult();
        //playerDices.forEach(function (die) {
        //    '<span>' + die + '</span>'
        //})
        let playerID = document.createElement('div'); //create div
        playerID.setAttribute("id", "player" + i); // set dynamic id

        //var newContent = document.createTextNode("Hi player " + i + "!");
        //console.log('player =' + playerDices);

        playerID.innerHTML = '<span>' + playerDices.join('</span>' + '<span>') + '</span>';

        //playerID.appendChild = diceResult();
        //playerID.appendChild(newContent);

        playerDeck.appendChild(playerID);
    }
}


function diceResult() {
    //console.log(String(dice.A));
    //console.log(dice[12]);

    let randNo = []

    let countTable = [];

    let i = 0;
    while (i < 5) {
        //let randomIndex = Math.floor(Math.random() * dice.length - 1);
        let randomIndex = Math.floor(Math.random() * 5);
        randNo.push(dice[randomIndex]);
        i++;
    }

    //return randno
    console.log('randNo ' + JSON.stringify(randNo));
    //func check count of cards
    randNo.forEach(function (x) {

        let test = search(x.name, countTable);

        if (test) {
            test.count = test.count + 1;
        } else {
            countTable.push({ name: x.name, value: x.value, count: 1 });
        }

        console.log(x.name);

    });
    console.log("Count table: " + JSON.stringify(countTable));

    console.log("test: " + Object.values(randNo));

    // return count num array

    //function check what hands I have
    // full house
    if (countTable.length == 2 && countTable[1].count == 2) {
        console.log('full house');
    } else if (countTable.length == 3 && countTable[0].count == 2 && countTable[1].count == 2 || countTable.length == 3 && countTable[1].count == 2 && countTable[2].count == 2 || countTable.length == 3 && countTable[0].count == 2 && countTable[2].count == 2) {
        console.log('2 pair');
    } else if (countTable.length == 2 && countTable[0].count == 1 || countTable.length == 2 && countTable[1].count == 1) {
        console.log('4 of a kind');
    } else if (countTable.length == 3 && countTable[0].count == 3 && countTable[1].count == 1 || countTable.length == 3 && countTable[1].count == 3 && countTable[0].count == 1) {
        console.log('3 of a kind');
    } else if (countTable.length == 5) {
        console.log('straight');
    } else {
        console.log('nothing');
    }


    //display hand
    for (index = 0; index < randNo.length; index++) {

        console.log("bob " + randNo[index].name);


    }


    //for (u = 0; u < randNo.length; u++) {

    //    randDice.push(dice[randNo[u]]);
    //}



    //player.innerHTML = player.innerHTML + "index[" + index + "]: " + randDice;

    //randDice.forEach(function (entry) {
    //    console.log(entry);
    //    let i = 0;
    //    let test = ""
    //    while (i < 4) {

    //        test += entry
    //        i++;
    //    }
    //     player.innerHTML = entry;
    //});

};

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
    var newArea = document.getElementById("playArea");
    while (newArea.firstChild) {
        newArea.removeChild(newArea.firstChild);
    }
    outPutPlayer();
};
function clickLimit() {
    var count = 0;

    return function () {
        count += 1;
        if (count > 5) {
            return;
        }

    }
};



playerBtn.onclick = function (e) {
    checkPlayer();
}

var clickLimit = (function (e) {
    var rollCount = 0;

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
