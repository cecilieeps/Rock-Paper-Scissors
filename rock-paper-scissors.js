const container = document.getElementById('container');
const rockBtn = document.getElementById('rock-btn');
const paperBtn = document.getElementById('paper-btn');
const scissorsBtn = document.getElementById('scissors-btn');
const scoreContainer = document.getElementById('score-container');
const healthContainer = document.getElementById('health-container');
const healthPotionBtn = document.getElementById('health-potion-btn');
const potionText = document.getElementById('potion-text');
const healedText = document.getElementById('healed-text');
const endOfRoundText = document.getElementById('round-end-text');
const healthHearts = document.getElementById('health-hearts');
const gameOverMessage = document.getElementById('game-over-message');
const enemyEyes = document.getElementById('enemy-eyes');
const divider = document.getElementById('divider');

potionText.style.visibility = 'hidden';
healedText.style.visibility = 'hidden';
enemyEyes.style.visibility = 'hidden';
healthPotionBtn.style.display = 'none';

let enemyLives = 5;
let playerLives = 5;
let gamesPlayed = 0;

resetHealth();

healthPotionBtn.addEventListener('click', () => {
    document.getElementById('potion-text').style.opacity = 0.3;
    healedText.style.visibility = 'visible';
    healthPotionBtn.style.display = 'none';
    resetHealth();
    });

rockBtn.addEventListener('click', () => {
    if (potionText.style.visibility === 'visible') {
        potionText.style.opacity = 0.3;
    }
    if (healedText.style.visibility === 'visible') {
        healedText.style.opacity = 0.3;
    }
    playRound('rock', getEnemyChoice());
    });

paperBtn.addEventListener('click', () => {
    if (potionText.style.visibility === 'visible') {
        potionText.style.opacity = 0.3;
    }
    if (healedText.style.visibility === 'visible') {
        healedText.style.opacity = 0.3;
    }
    playRound('paper', getEnemyChoice());
    });

scissorsBtn.addEventListener('click', () => {
    if (potionText.style.visibility === 'visible') {
        potionText.style.opacity = 0.3;
    }
    if (healedText.style.visibility === 'visible') {
        healedText.style.opacity = 0.3;
    }
    playRound('scissors', getEnemyChoice());
    });

function getEnemyChoice() {
    let choices = ['rock', 'paper', 'scissors'];
    let i = Math.floor(Math.random() * 3);
    return choices[i];
}

function playRound(playerSelection, enemySelection) {
    switch (playerSelection) {
        case 'rock':
            if (enemySelection === 'scissors'){
                enemyLives--;
            }
            if (enemySelection === 'paper') {
                playerLives--;
                removeHealth();
            }
            break;
        case 'paper':
            if (enemySelection === 'rock'){
                enemyLives--;
            }
            if (enemySelection === 'scissors') {
                playerLives--;
                removeHealth();
            }
            break;
        case 'scissors':
            if (enemySelection === 'rock'){
                enemyLives--;
            }
            if (enemySelection === 'scissors') {
                playerLives--;
                removeHealth();
            }
            break;
        default:
            endOfRoundText.textContent=`It's a draw!`;
    }
    endOfRoundText.textContent=`The enemy uses ${enemySelection}!`;
    enemyEyes.style.visibility = 'visible';
    checkLives();
}

function removeHealth() {
    if (healthHearts.hasChildNodes()) {
        healthHearts.removeChild(healthHearts.children[playerLives]);
    }
    else {healthHearts.removeFirstChild();}
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
    endOfRoundText.style.visibility = 'hidden';
    enemyEyes.style.display = 'none';
    divider.style.display = 'none';
    if (document.getElementById('intro-text').style.opacity === 1) {
        document.getElementById('intro-text').style.opacity = 0.3;
    }
    if (playerLives > enemyLives) {
        gameOverMessage.textContent = 'You win!';
    } 
    else if (playerLives < enemyLives) {
        gameOverMessage.textContent = 'Oh no ... something dark reaches from beyond the woods...';
    } 
    else {
        gameOverMessage.textContent = '\'Ahh... it appears we have a draw\'';
    }
}

// Resets global variables and health visuals
function resetHealth() {
    enemyLives = 5;
    playerLives = 5;
    // Initializes health visuals
    for (let i = 0; i < 5; i++) {
        const heartIcon = document.createElement('img');
        heartIcon.setAttribute('src', './images/healthheart.png');
        healthHearts.appendChild(heartIcon);
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