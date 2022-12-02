const container = document.getElementById('container');
const rockBtn = document.getElementById('rock-btn');
const paperBtn = document.getElementById('paper-btn');
const scissorsBtn = document.getElementById('scissors-btn');
const scoreContainer = document.getElementById('score-container');
const healthContainer = document.getElementById('health-hearts');
const healthPotionBtn = document.getElementById('health-potion-btn');

let enemyLives = 5;
let playerLives = 5;
let gamesPlayed = 0;

// create a reset button


const potionText = document.getElementById('potion-text');
potionText.style.visibility = 'hidden';

const enemyChooses = document.getElementById('enemy-choice');

document.getElementById('player-wins').style.display = 'none';
document.getElementById('enemy-wins').style.display = 'none';
healthPotionBtn.style.display = 'none';

resetHealth();

healthPotionBtn.addEventListener('click', () => {
    document.getElementById('potion-text').style.opacity = 0.3;
    healthPotionBtn.style.display = 'none';
    healthContainer.innerHTML = '';
    resetHealth();
    });

rockBtn.addEventListener('click', () => {
    if (potionText.style.visibility === 'visible') {
        potionText.style.opacity = 0.3;
    }
    playRound("rock", getEnemyChoice());
    });

paperBtn.addEventListener('click', () => {
    if (potionText.style.visibility === 'visible') {
        potionText.style.opacity = 0.3;
    }
    playRound("paper", getEnemyChoice());
    });

scissorsBtn.addEventListener('click', () => {
    if (potionText.style.visibility === 'visible') {
        potionText.style.opacity = 0.3;
    }
    playRound("scissors", getEnemyChoice());
    });

function getEnemyChoice() {
    let choices = ["rock", "paper", "scissors"];
    let i = Math.floor(Math.random() * 3);
    return choices[i];
}

function playRound(playerSelection, enemySelection) {
    if (playerSelection === enemySelection) {}
    else if ((playerSelection === "rock" && enemySelection === "scissors") ||
        (playerSelection === "paper" && enemySelection === "rock") ||
        (playerSelection === "scissors" && enemySelection === "player")) {
        enemyLives--;
    } 
    else {
        playerLives--;
        // Removes a heart from health gauge
        if (healthContainer.hasChildNodes()) {
            healthContainer.removeChild(healthContainer.children[playerLives]);
        }
        else {healthContainer.removeFirstChild();}
    }
    enemyChooses.textContent=`The enemy uses ${enemySelection}!`;
    checkLives();
}

function checkLives() {
    if (playerLives === 0 || enemyLives === 0) {
        declareWinner(playerLives, enemyLives);
    }
    if (gamesPlayed === 0 && playerLives === 1) {
        console.log(`playerLives = ${playerLives}`);
        gamesPlayed ++;
        offerHealthPotion();
    }
}

function offerHealthPotion() {
    document.getElementById('intro-text').style.opacity = 0.3;
    document.getElementById('potion-text').style.visibility = 'visible';
    healthPotionBtn.style.display = 'inline-block';
}

function declareWinner(playerLives, enemyLives) {
    document.querySelector('.buttons-heading').style.visibility = 'hidden';
    document.querySelector('.buttons-container').style.display = 'none';
    document.getElementById('health-container').style.display = 'none';
    enemyChooses.style.visibility = 'hidden';
    if (playerLives > enemyLives) {
        document.getElementById('player-wins').style.display = 'block';
    } 
    else if (playerLives < enemyLives) {
        document.getElementById('enemy-wins').style.display = 'block';
    } 
    else {console.log(`It's a draw!`)}
}

function resetHealth() {
    enemyLives = 5;
    playerLives = 5;
    // Initializes health visuals
    for (let i = 0; i < 5; i++) {
        const heartIcon = document.createElement('img');
        heartIcon.setAttribute('src', './images/healthheart.png');
        healthContainer.appendChild(heartIcon);
    }
}

// When a game finishes all our text is visible on the screen
// Re-set visibility and re-set player and enemy health
function resetGame() {
    resetHealth();
    document.getElementById('intro-text').style.opacity = 1;
    potionText.style.visibility = 'hidden';
    document.querySelector('.buttons-heading').style.visibility = 'visible';
    
}