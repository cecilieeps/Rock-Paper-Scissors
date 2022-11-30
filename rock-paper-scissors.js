const rockBtn = document.querySelector('#rock-btn');
const paperBtn = document.querySelector('#paper-btn');
const scissorsBtn = document.querySelector('#scissors-btn');
const scoreContainer = document.querySelector('#score-container');
const healthContainer = document.getElementById('health-container');

// Create a message that pops up when someone has won
const gameOver = document.container('div');

let enemyLives = 5;
let playerLives = 5;

function checkScore() {
    if (enemyLives === 0 || playerLives === 0) {
        return declareWinner(playerLives, enemyLives);
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
        enemyLives--;
    } 
    else {
        playerLives--;
        console.log(playerLives);
        // Function removes a heart from health gauge
        if (healthContainer.hasChildNodes()) {
            healthContainer.removeChild(healthContainer.children[playerLives]);
        }
        else {healthContainer.removeFirstChild();}
    }
    checkScore();
}

function declareWinner(playerLives, enemyLives) {
    if (playerLives > enemyLives) {
        console.log(`${playerLives}`);
        console.log(`Player wins by ${playerLives - enemyLives} points!`)
    } 
    else if (playerLives < enemyLives) {
        console.log(`${playerLives}`);
        console.log(`Computer wins by ${enemyLives - playerLives} points!`)
    } 
    else {console.log(`It's a draw!`)}
    resetHealth();
}

function resetHealth() {
    enemyLives = 5;
    playerLives = 5;
    // Initializes health visuals
    for (let i = 0; i < 5; i++) {
        const heartIcon = document.createElement('img');
        heartIcon.setAttribute('src', './images/heart.png');
        healthContainer.appendChild(heartIcon);
    }
}