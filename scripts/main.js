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

// 3x3 matrix to represent game state
// Player moves will be represented with 
// PLAYER_O_STATE and PLAYER_X_STATE. 
let gameState = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

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
    console.log("check for win condition...")
    // check for winning condition - if there are three Xs in a row, column, or diagonal
    for(let line of boardLines) {
        
        // player 'X' wins - condition: sum of board line equals 3
        if (sumBoardLine(line, gameState) === PLAYER_X_STATE * 3) {
            // And the app says "Congratulations! Player X wins!"
            gameStatus.textContent = 'Congrats! Player X wins'
            alert(gameStatus.textContent) // alert players of winner
            
            // Then the system draws a line through the winning three cells
            endGame(line) // Game Ends
        }
        // player 'O' wins - condition: sum of board line equals -3
        else if (sumBoardLine(line, gameState) === PLAYER_O_STATE * 3) {
            // And the app says "Congratulations! Player O wins!"
            gameStatus.textContent = 'Congrats! Player O wins'
            alert(gameStatus.textContent) // alert players of winner

            // Then the system draws a line through the winning three cells
            endGame(line) // Game Ends
        }
        // else, game continues
    }

    // check if board is full - declare draw & end game
    console.log("check if the board is full.")
    if (isBoardFull()) {
        gameStatus.textContent = "Draw! Replay?" // we have a draw
        // alert(gameStatus.textContent)

        endGame()
    }
}

const isBoardFull = () => {
    // if any cells are empty
    for(let cell of cells ) {
        if (cell.textContent === '') return false
    }
    
    // otherwise return true
    return true;
}

const endGame = (line)  => {
    // highlight winning line, if there is one.     
    // if (line) highlightLine(line) 

    gameOver = true // set global indicator to true
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
    gameStatus.textContent = "Player X's turn"
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
 * Name: sumBoardLine
 * =====================
 * Given any board line (see var: boardLines) and the
 * gameState (3x3 matrix), map the line to the game state, 
 * and return sum of corresponding board cells. 
 * 
 * This method is used to determine win conditions.
 * 
 * TODO:  Resolve the gameState is undefined error.
 * 
 * @param {[#,#,#]} line 
 * @param {[
        [#,#,#],
        [#,#,#],
        [#,#,#]
    ]} gameState 
 * @return sum of corresponding board cells
 */
const sumBoardLine = (line, gameState) => {
    // console.log('inside sumBoardLine, lines=', lines)
    return line
        // board cells run 1-9, gameState indices 0-8
        // ! Uncaught TypeError: gameState is undefined
        .map(cell => gameState[cell]) 
        // return board cells sum
        .reduce((sum,score) => sum += score)
}

console.log(sumBoardLine([0,0,0]),'000 => 0')
console.log(sumBoardLine([0,1,0]),'010 => 1')
console.log(sumBoardLine([1,0,1]),'101 => 2')
console.log(sumBoardLine([1,1,1]),'111 => 3')