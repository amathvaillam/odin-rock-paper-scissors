let playerScore = 0;
let computerScore = 0;
let finished = false;
let round = 1
const getComputerChoice = () => {
    let choice = Math.floor(Math.random() * 3) + 1;

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
    // console.log(`player: ${player} | computer: ${computer}`)
    if (player === computer) {
        return (`No Winner round n° ${round}! \n`);
    } else if (
        player === "rock" && computer === "scissors" ||
        player === "paper" && computer === "rock" ||
        player === "scissors" && computer === "paper"
    ) {
        return (`You Win the round n°${round}! ${playerSelection} beats ${computerSelection} \n`)
    } else {
        return (`You Lose the round n°${round}! ${playerSelection} beats ${computerSelection} \n`)
    }
}
const updateScore = (rslt) => {
    console.log(rslt)
    if (rslt.includes("Win")) {
        playerScore++
    } else if (rslt.includes("Lose")) {
        computerScore++
    }
    //  console.log("update : ", playerScore, computerScore)
}
const checkWinner = () => {
    playerScore > computerScore ?
        displayText(`You Win by ${ playerScore } : ${ computerScore }`) :
        (playerScore < computerScore ?
            displayText(`You Lose by ${ computerScore } : ${ playerScore }`) :
            displayText(`Draw by ${ computerScore } : ${ playerScore }`)
        )
    if (playerScore == 5 || computerScore == 5) {
        finished = true;
        displayAndRefresh(`${ playerScore == 5 ? "You are the winner" : "Sorry you lose" } \n final score : ${ playerScore } : ${ computerScore }`)
        computerScore = 0;
        playerScore = 0;
        return true
    }
    return false
}
const listenerFunction = (event) => {
    event.stopPropagation();
    displayText(`Round ${ round } : please click your choice : `)
    playerSelection = event.target.getAttribute("data-value");
    computerSelection = getComputerChoice();

    let rslt = playRound(playerSelection, computerSelection)
    updateScore(rslt)
    displayAndRefresh(rslt)
    round++;
    if (checkWinner()) {
        rslt = ""
        displayReplay()
        deactivateEventListeners()
        finished = false
    }
};

const activateEventListeners = () => {
    let buttons = document.querySelectorAll('button[data-value]');
    for (let button of Array.from(buttons)) {
        button.disabled = false
        button.addEventListener('click', listenerFunction)
    }
}

const deactivateEventListeners = () => {
    let buttons = document.querySelectorAll('button[data-value]');

    for (let button of Array.from(buttons)) {
        button.removeEventListener('click', listenerFunction)
        button.disabled = true
    }
}

const displayText = (input) => {
    let rsltDiv = document.querySelector('#result');
    let text = document.createTextNode(input)
    rsltDiv.appendChild(text)
}
const displayAndRefresh = (input) => {

    let rsltDiv = document.querySelector('#result');
    let text = document.createTextNode(input)
    if (rsltDiv.hasChildNodes()) {
        for (let child of Array.from(rsltDiv.childNodes)) {
            rsltDiv.removeChild(child)
        }
    }
    rsltDiv.appendChild(text)
}
const displayReplay = (e) => {

    let container = document.getElementById("container");
    let replayButton = document.createElement("BUTTON")
    replayButton.setAttribute("id", "replay")
    replayButton.textContent = "replay"
    replayButton.addEventListener('click', (e) => {
        finished = false;
        e.stopPropagation();
        activateEventListeners();
        container.removeChild(replayButton)
        displayAndRefresh('')
    })
    container.appendChild(replayButton)

}

const game = (function() {

    activateEventListeners();

})()