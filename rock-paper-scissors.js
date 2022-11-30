const container = document.getElementById('container');
const rockBtn = document.getElementById('rock-btn');
const paperBtn = document.getElementById('paper-btn');
const scissorsBtn = document.getElementById('scissors-btn');
const scoreContainer = document.getElementById('score-container');
const healthContainer = document.getElementById('health-container');

const gameOver = document.createElement('div');
document.querySelector('body').appendChild(gameOver);

const gameOverMessage = document.createElement('p');
gameOver.appendChild(gameOverMessage);

gameOverMessage.setAttribute('id', 'game-over-msg');
gameOverMessage.textContent = '';

const healthPotionBtn = document.createElement('button');
healthPotionBtn.setAttribute('id', 'health-potion-btn');
gameOver.appendChild(healthPotionBtn);

const declinePotionBtn = document.createElement('button');
declinePotionBtn.setAttribute('id', 'decline-potion-btn');
gameOver.appendChild(declinePotionBtn);

let enemyLives = 5;
let playerLives = 5;
let numOfRounds = 0;
resetHealth();

function checkHealth() {
    if (enemyLives === 0 || playerLives === 0) {
        if (numOfRounds === 1){
            return declareWinner(playerLives, enemyLives);
        }
        else {
            gameOverMessage.textContent = 
            'Feeling faint you desperately search your satchel for something useful. You \
            clench your fingers around something cold and spherelike, and realize you have \
            a health potion. \nWould you like to drink it?';
            // Add a keyEventListener for a click on potion bottle
            healthPotionBtn.addEventListener('click', resetHealth());
        }
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
    checkHealth();
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