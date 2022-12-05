const container = document.getElementById('container');
const rockBtn = document.getElementById('rock-btn');
const scrollBtn = document.getElementById('scroll-btn');
const daggerBtn = document.getElementById('dagger-btn');
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
const resetBtn = document.getElementById('reset-btn');
const introText = document.getElementById('intro-text');

potionText.style.visibility = 'hidden';
healedText.style.visibility = 'hidden';
enemyEyes.style.visibility = 'hidden';
healthPotionBtn.style.display = 'none';
resetBtn.style.visibility = 'hidden';

let enemyLives = 5;
let playerLives = 5;
let gamesPlayed = 0;

initializeHealth();

resetBtn.addEventListener('click', () => {
    document.location.reload();
});

healthPotionBtn.addEventListener('click', () => {
    document.getElementById('potion-text').style.opacity = 0.3;
    healedText.style.visibility = 'visible';
    healthPotionBtn.style.display = 'none';
    initializeHealth();
});

rockBtn.addEventListener('click', () => {
    changeTextOpacityIfHealed();
    playRound('rock', getEnemyChoice());
});

scrollBtn.addEventListener('click', () => {
   changeTextOpacityIfHealed();
    playRound('scroll', getEnemyChoice());
});

daggerBtn.addEventListener('click', () => {
    changeTextOpacityIfHealed();
    playRound('dagger', getEnemyChoice());
});

function getEnemyChoice() {
    let choices = ['rock', 'scroll', 'dagger'];
    let i = Math.floor(Math.random() * 3);
    return choices[i];
}

function playRound(playerSelection, enemySelection) {
    if (playerSelection === enemySelection) {
        endOfRoundText.textContent='It\'s a draw!';
    }
    else {endOfRoundText.textContent=`The enemy uses ${enemySelection}!`;}
    switch (playerSelection) {
        case 'rock':
            if (enemySelection === 'dagger'){
                enemyLives--;
            }
            else if (enemySelection === 'scroll') {
                playerLives--;
                removeHealth();
            }
            break;
        case 'scroll':
            if (enemySelection === 'rock'){
                enemyLives--;
            }
            else if (enemySelection === 'dagger') {
                playerLives--;
                removeHealth();
            }
            break;
        case 'dagger':
            if (enemySelection === 'scroll'){
                enemyLives--;
            }
            else if (enemySelection === 'rock') {
                playerLives--;
                removeHealth();
            }
            break;
        default:
    }
    endOfRoundText.textContent;
    checkLives();
}

function removeHealth() {
    if (healthHearts.hasChildNodes()) {
        healthHearts.removeChild(healthHearts.children[playerLives]);
    }
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
    introText.style.opacity = 0.3;
    document.getElementById('potion-text').style.visibility = 'visible';
    healthPotionBtn.style.display = 'inline-block';
}

function changeTextOpacityIfHealed() {
    if (potionText.style.visibility === 'visible') {
        potionText.style.opacity = 0.3;
    }
    if (healedText.style.visibility === 'visible') {
        healedText.style.opacity = 0.3;
    }
}

function declareWinner(playerLives, enemyLives) {
    document.querySelector('.buttons-container').style.display = 'none';
    document.getElementById('health-container').style.display = 'none';
    endOfRoundText.style.visibility = 'hidden';
    enemyEyes.style.display = 'none';
    divider.style.display = 'none';
    introText.style.opacity = 0.3;
    if (playerLives > enemyLives) {
        gameOverMessage.textContent = 'You hear an angry growl and then a deafening screech. \
                A sudden gust of wind throws your body across the forest floor. \
                You fumble to your feet and run as fast as you can out of the forest.';
    } 
    else if (playerLives < enemyLives) {
        gameOverMessage.textContent = 'Oh no ... something dark moves from behind the trees ...';
    } 
    else {
        gameOverMessage.textContent = '\'Ah it appears we have a draw... how convenient.\'';
    }
    resetBtn.style.visibility='visible';
}

// Initializes health visuals
function initializeHealth() {
    enemyLives = 5;
    let numOfHearts = 5;
    if (playerLives === 1) {
        numOfHearts = 4;
        playerLives = 5;
    }
    for (let i = 1; i <= numOfHearts; i++) {
        const heartIcon = document.createElement('img');
        heartIcon.setAttribute('src', './images/healthheart.png');
        healthHearts.appendChild(heartIcon);
    }
}