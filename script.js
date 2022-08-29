const getComputerChoice = () => {
    let choice = Math.floor(Math.random() * 2) + 1;

    switch (choice) {
        case 1:
            return 'Rock';
        case 2:
            return 'Paper';
        case 3:
            return 'Scissors';

    }
}

const playRound = (playerSelection, computerSelection) => {
    let player = playerSelection.toLowerCase();
    let computer = computerSelection.toLowerCase();

    if (player === computer) {
        return ("draw");
    } else if (
        player === "rock" && computer === "scissors" ||
        player === "paper" && computer === "rock" ||
        player === "scissors" && computer === "paper"
    ) {
        return (`You Win! ${playerSelection} beats ${computerSelection}`)
    } else {
        return (`You Lose! ${computerSelection} beats ${playerSelection}`)
    }
}

const game = (function() {
    let playerScore = 0;
    let computerScore = 0;
    let output = "";
    for (let i = 1; i <= 5; i++) {
        console.log(`Round ${i} : please input your choice : `)
        output = playRound(prompt(), getComputerChoice())
        if (output.includes("Win")) {
            console.log(output)
            playerScore++
        } else if (output.includes("Lose")) {
            console.log(output)
            computerScore++
        } else {
            console.log(output)
        }
        output = "";
    }
    return playerScore > computerScore ?
        console.log(`You Win by ${ playerScore } : ${ computerScore }`) :
        (playerScore < computerScore ?
            console.log(`You Lose by ${ computerScore } : ${ playerScore }`) :
            console.log(`Draw by ${ computerScore } : ${ playerScore }`)
        )
})()