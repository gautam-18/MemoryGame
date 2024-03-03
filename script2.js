`use strict`
let gameLevel = 3;
let array = [];
let boxes = document.querySelectorAll('.col');
let boxesArray = Array.from(boxes);
let boxClicked = [];
let j = 0;
let Nboxes = [];
let gamePlaying = true;
const button = document.getElementById('PlayGame');
const button2 = document.getElementById('restart')
let displayLevel = document.getElementById('myLevel');
let newLevel = 1;
let currentScore = document.getElementById('myCurrentScore');
let newCurrentScore = 0;
let winMessageElement = document.getElementById('winMessage');
let loseMessageElement = document.getElementById('loseMessage');
const gameSound = document.getElementById("game-sound");
// document.getElementById("game-sound").play();
button.addEventListener('click', function () {
    randomNumbers();
    listenBoxClick();
    gameSound.play();

})
button2.addEventListener('click', function () {
    location.reload();
})
function randomNumbers() {
    array = [];
    for (let i = 0; i < gameLevel + 1; i++) {
        let x;
        do {
            x = Math.floor(Math.random() * gameLevel * gameLevel);
        }
        while (array.includes(x));
        array.push(x);
    }
    console.log(array)
    for (let i = 0; i < gameLevel + 1; i++) {
        setTimeout(function (i) {
            return function () {
                boxesArray[array[i]].style.backgroundColor = '#FE7822';

            };
        }(i), gameLevel * 75 * (i + 1));
    }
    setTimeout(function () {
        for (let i = 0; i < gameLevel + 1; i++) {
            boxesArray[array[i]].style.backgroundColor = '#470012';
        }
    }, gameLevel * 750)
}
function listenBoxClick() {
    boxes.forEach((col) => {
        col.addEventListener("click", handleBoxClick); // Add event listener to handleBoxClick
    });
}
const audio = document.getElementById("pop-sound");
function handleBoxClick() { // Define the event handling function
    if (gamePlaying) {
        audio.currentTime = 0;
        audio.play();
        const index = boxesArray.indexOf(this); // Get the index of the clicked box
        boxClicked.push(index);
        console.log(boxClicked);
        checkMyclick();
    }
}
// function listenBoxClick() {

//     boxes.forEach((col, i) => {
//         col.addEventListener("click", function () {
//             if (gamePlaying) {
//                 boxClicked.push(i);
//                 console.log(boxClicked);
//                 checkMyclick();
//             }
//         });
//     });
// }
function checkMyclick() {
    if (boxClicked[j] === array[j]) {
        boxesArray[boxClicked[j]].style.backgroundColor = "rgba(0,0,0,0)";
        j++;
        Nboxes.push(1);
        console.log(Nboxes);
        checkWinner();
    }
    else {
        console.log(array)
        boxesArray[boxClicked[j]].style.backgroundColor = '#FE7822';
        loseMessageElement.style.display = 'block';
        document.getElementById("game-loose").play();
        gamePlaying = false;
    }
}
function checkWinner() {
    if (Nboxes.length === array.length) {
        console.log("you won the game");
        document.getElementById("game-win").play();

        winMessageElement.style.display = 'block';
        setTimeout(function () {
            winMessageElement.style.display = 'none';
        }, 2000)
        gamePlaying = false;

        displayLevel.textContent = ++newLevel;
        newCurrentScore += 10;
        currentScore.textContent = newCurrentScore;
        gameLevel++;
        setTimeout(function () {
            resetGame();
            levelUp();
        }, 2000)

    }
}
function resetGame() {
    array = [];
    boxClicked = [];
    j = 0;
    Nboxes = [];
    boxesArray.forEach(box => {
        box.style.backgroundColor = '#470012';

    });
    boxes.forEach((col, i) => {
        col.removeEventListener("click", listenBoxClick);
    });
    gamePlaying = true;
}
const parent = document.querySelector('.game-box');
function addRow() {
    const row = document.createElement('div');
    row.classList.add('row');
    parent.appendChild(row);
    for (let i = 0; i < gameLevel; i++) {
        const col = document.createElement('div');
        col.classList.add('col');
        row.appendChild(col);
    }
}
function addColumns() {
    const rows = document.querySelectorAll('.row');
    rows.forEach(row => {
        const col = document.createElement('div');
        col.classList.add('col');
        row.appendChild(col);
    });
}
function levelUp() {

    addColumns();
    addRow();
    boxes = document.querySelectorAll('.col');
    boxesArray = Array.from(boxes);
    boxes.forEach(box => {
        if (window.innerWidth < 600) {
            box.style.height = 100 / (gameLevel + 3) + 'vw';
            box.style.width = 100 / (gameLevel + 3) + 'vw';
        }
        else {
            box.style.height = 20 / (gameLevel + 1) + "vw";
            box.style.width = 20 / (gameLevel + 1) + "vw";
        }
    })

}
5
