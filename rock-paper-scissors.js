function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    let i = Math.floor(Math.random() * 3);
    return choices[i];
}

function getPlayerChoice() {
    let playerChoice = prompt("Your weapon of choice (Rock/Paper/Scissors)? ").toLowerCase();
    if (validSelection(playerChoice)) {
        return playerChoice;
    } 
    else {
        alert("Oops! That weapon requires a higher level! Try again... ")
        getPlayerChoice();
    }
}

function validSelection(playerSelection) {
    let choices = ["rock", "paper", "scissors"];
    return (choices.includes(playerSelection) ? true : false);
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return null;
    } 
    else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "player")) {
        return roundWinner("player");
    } 
    else {return roundWinner("computer");}
}

function roundWinner(player) {
    return player;
}

function declareWinner(playerScore, computerScore) {
    if (playerScore > computerScore) {
        console.log(`Player wins by ${playerScore - computerScore} points!`)
    } 
    else if (playerScore < computerScore) {
        console.log(`Computer wins by ${computerScore - playerScore} points!`)
    } 
    else {console.log(`It's a draw!`)}
}

function game() {
    let computerScore = 0;
    let playerScore = 0;
    for (let round = 1; round <= 5; round++) {
        console.log(`ROUND ${round}...`);
        let computerChoice = getComputerChoice();
        let playerChoice = getPlayerChoice();
        let roundResult = playRound(playerChoice, computerChoice);
        if (roundResult === "player") {
            console.log(`You chose ${playerChoice}! You win this round!`);
            playerScore++;
        } 
        else if (roundResult === "computer") {
            console.log(`Computer chose ${computerChoice}! Computer wins this round!`);
            computerScore++;
        } 
        else {console.log("It's a draw!");}
        console.log(`Player: ${playerScore} \nComputer: ${computerScore}`);
    }
    declareWinner(playerScore, computerScore);
}

game();