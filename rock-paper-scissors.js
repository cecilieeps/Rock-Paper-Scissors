const rockBtn = document.querySelector('#rock-btn');
const paperBtn = document.querySelector('#paper-btn');
const scissorsBtn = document.querySelector('#scissors-btn');
const scoreContainer = document.querySelector('#score-container');
const healthContainer = document.getElementById('health-container');

// Initializes health visuals
for (let i = 0; i < 5; i++) {
    const heartIcon = document.createElement('img');
    heartIcon.setAttribute('src', './images/heart.png');
    document.getElementById('health-container').appendChild(heartIcon);
}

// Have a function which removes a health heart when the opposite
// player wins. 

// Create a message that pops up when someone has won
const winnerMessage = document.querySelector('div');

let enemyHP = 0;
let playerHP = 0;

function checkScore() {
    if (enemyHP === 5 || playerHP === 5) {
        return declareWinner(playerHP, enemyHP);
    }
}

rockBtn.addEventListener('click', () => {
    playRound("rock", getEnemyChoice());
});

paperBtn.addEventListener('click', () => {
    playRound("paper", getEnemyChoice());
});

scissorsBtn.addEventListener('click', () => {
    playRound("scissors", getEnemyChoice());
});

function getEnemyChoice() {
    let choices = ["rock", "paper", "scissors"];
    let i = Math.floor(Math.random() * 3);
    return choices[i];
}

function playRound(playerSelection, enemySelection) {
    if (playerSelection === enemySelection) {}
    else if (
        (playerSelection === "rock" && enemySelection === "scissors") ||
        (playerSelection === "paper" && enemySelection === "rock") ||
        (playerSelection === "scissors" && enemySelection === "player")) {
        playerHP++;
        player.textContent = `Player: ${playerHP}`;
    } 
    else {
        enemyHP++;
        comp.textContent = `Computer: ${enemyHP}`;
    }
    checkScore();
}

function declareWinner(playerHP, enemyHP) {
    if (playerHP > enemyHP) {
        console.log(`${playerHP}`);
        console.log(`Player wins by ${playerHP - enemyHP} points!`)
    } 
    else if (playerHP < enemyHP) {
        console.log(`${playerHP}`);
        console.log(`Computer wins by ${enemyHP - playerHP} points!`)
    } 
    else {console.log(`It's a draw!`)}
    resetScore();
}

function resetScore() {
    enemyHP = 0;
    playerHP = 0;
    player.textContent = 'Your health: 0'
}