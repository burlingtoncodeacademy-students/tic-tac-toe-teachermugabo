/**
* "Debugging is twice as hard as writing the code in the first place.
* Therefore, if you write the code as cleverly as possible,
* you are, by definition, not smart enough to debug it."
* 
* - KR
*/

//  remember Cortney's thinking: user action => add event listener w/ callback
//  that callback sets another callback or calls another method. 
//  we end up with a chain of functionality.

//  MOTTO: MAKE IT WORK, THEN RIGHT, THEN FAST

// Story: Start Game [done]
// =====================
// Given an empty board & init game variables
// potentially use 1 for 'X', and 0 for 'O', and
// that way, sum of 0 is win for 'O', and 
// sum of 3 is win for 'X'
let gameState = []

// values to represent players moves in gameState
const PLAYER_O_STATE = -1
const PLAYER_X_STATE = 1

// global indicators for whether game is over
let gameOver = false

// game status display
let gameStatus = document.getElementById('status')

// initialize game blocks (the cells)
let cells = document.querySelectorAll('.board>.block')

// initialize game buttons
let startBtn = document.getElementById('startBtn')
// startBtn.disabled = "false" // default behavior

let resetBtn = document.getElementById('resetBtn')
resetBtn.disabled = "true"

let replayBtn = document.getElementById('replayBtn')
replayBtn.disabled = "true"


// When the user clicks 'Start Game'
startBtn.addEventListener('click', (event) => {
    // Then the 'Start Game' button is disabled ("grayed out")
    startBtn.disabled = "true"

    // And the status area contains "Player X's turn
    gameStatus.textContent = "Player X's turn"
})


// Story: No Rules [done]
// Story: Rules [done]
// Story: Winning Condition [wip]
// ==============================

// Given an empty board, and the current player is X
// When the user selects a cell
for(let cell of cells) {
    cell.addEventListener('click', (event) => {
        let cell = event.target

        // check if game has started
        if( startBtn.disabled) {

            // check if game isn't over yet
            if (gameOver) {
                alert("Game is over. Click Replay to play again!")
            }
            // When user selects a cell that is not empty
            else if ( cell.textContent != '') {
                // Then the game says "Please select an empty cell." 
                // and does not put an X or O in the cell
                alert("That one is taken! Find an empty cell.")
            } else {
                updateCell(cell)
                checkWinCondition() // use public arrayBoard
            }
        }
        // if game hasn't started, tell 'em
        else {
            alert("Gotta start the game to play. Click the start button :-)")
        }
        
        console.log('gameState', gameState)
    })
}

// Redrawing the board
// given a cell, update the global gameStatus variable
// to determine who's move it is, and update the board
const updateCell = (cell) => {
    
    // Given the player is X
    if (gameStatus.textContent == "Player X's turn") {

        // And an X appears in that cell, and the turn ends
        cell.textContent = 'X'

        // visualy let user know cell not clickable
        cell.classList.add('occupied')

        // TODO: find semantic function for last arr elem
        gameState[Number(cell.id[5]) - 1] = PLAYER_X_STATE 
        // And the current player changes from X to O
        gameStatus.textContent = "Player O's turn"
    }
    // Given the player is O
    // When the user selects a cell
    else {
        // Then an O appears in that cell            
        cell.textContent = 'O'

        // visualy let user know cell not clickable
        cell.classList.add('occupied')

        // TODO: find semantic function for last arr elem
        gameState[Number(cell.id[5]) -1 ] = PLAYER_O_STATE

        // And the turn ends, and the current player changes from O to X
        gameStatus.textContent = "Player X's turn" 
    }
}

let boardLines = [
    // rows
    [0,1,2],
    [3,4,5],
    [6,7,8],
    
    // columns
    [0,3,6],
    [1,4,7],
    [2,5,8], 

    // diagonals
    [0,4,8],
    [2,4,6]
]

/**
 * Check Win Condition
 * ===================
 * Called Given the turn has just ended
 * 
 * @param uses global param gameState
 */
const checkWinCondition = () => {
    console.log("entering checkwincondition...")
    // When if there are three Xs in a row, column, or diagonal
    for(let line of boardLines) {
        // player 'X' wins
        if (sumBoardLine(line) === PLAYER_X_STATE * 3) {
        // if(isPlayerXWinner(line)) {

            // And the app says "Congratulations! Player X wins!"
            gameStatus.textContent = 'Congrats! Player X wins'
            alert(gameStatus.textContent) // alert players of winner
            
            // Then the system draws a line through the winning three cells
            endGame(line) // Game Ends
        }
        // player 'O' wins
        else if (sumBoardLine(line) === PLAYER_O_STATE * 3) {
        // else if (isPlayerOWinner(line)) {
            
            // And the app says "Congratulations! Player O wins!"
            gameStatus.textContent = 'Congrats! Player O wins'
            alert(gameStatus.textContent) // alert players of winner

            // Then the system draws a line through the winning three cells
            endGame(line) // Game Ends
        }
        // TODO: handle else
    }
}

const endGame = (line)  => {
    gameOver = true // set global indicator to true
    // highlightLine(line) // highlight winning line    
    replayBtn.disabled = false // enable replay button
}

/**
 * Handler to replay the game
 * Combines the functionality of resetBtn & startBtn
 */
replayBtn.addEventListener("click", (event) => {
    // First, reset the game
    // ? is resetBtn.click() possible?
    gameState = [] // clear game state
    clearBoardCells() // clear the board
    startBtn.disabled = true // disable start button
    gameOver = false // set game is over to false

    // TODO Second: start game
    // ? is startBtn.click() possible?
})

/**
 * Name: clearBoardCells
 * =====================
 * Iterates thru board cells and sets them to empty string
 * * Operates on the Global variable cells
 * 
 * @param none
 * @returns none
 */
const clearBoardCells = () => {
    for(let cell of cells) {
        cell.textContent = ''
    }
}

/**
 * Name: isPlayerXWinner
 * =====================
 * Predicate to check whether a line is won by player X
 * Since gameState stores 1s for player X's moves, a
 * line that adds up to 3 is a win for Player X.
 * 
 * @param {[Number,Number,Number]} line
 * @returns did player X win? :boolean
 */
const isPlayerXWinner = (line) => {
    let sum = sumBoardLine(line)
    // console.log("board sum: ", sum)
    return sum === 3
}

/**
 * Name: isPlayerOWinner
 * =====================
 * Predicate to check whether a line is won by player O
 * Since gameState stores -1 for player O's moves, a
 * line that adds up to -3 is a win for player O
 * 
 * @param {[Number,Number,Number]} line 
 * @returns did player O win? :boolean
 */
const isPlayerOWinner = (line) => 
    sumBoardLine(line) === -3 

/**
 * Name: sumBoardLine
 * =====================
 * Given array of 3 board coordinates
 * ! Note dependence on global variable gameState
 * @param {[Number,Number,Number]} line 
 * @return sum of corresponding board cells
 */
const sumBoardLine = (line) => {
    // console.log('inside sumBoardLine, lines=', lines)
    return line
        // board cells run 1-9, gameState indices 0-8
        .map(line => gameState[line]) 
        // return board cells sum
        .reduce((sum,score) => sum += score)
}

console.log(sumBoardLine([0,0,0]),'000 => 0')
console.log(sumBoardLine([0,1,0]),'010 => 1')
console.log(sumBoardLine([1,0,1]),'101 => 2')
console.log(sumBoardLine([1,1,1]),'111 => 3')
