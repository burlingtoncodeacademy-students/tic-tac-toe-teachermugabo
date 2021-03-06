/* ----------- GAME STORIES IMPLEMENTATION PROGRESS ------------- */

// TODO: Story: TDD -- in another life time perhaps
// Story: No Rules [done]
// Story: Rules [done]
// Story: Winning Condition [done]
// Story: Reset [done]
// Story: Replay [done]
// Story: Multiplayer [done]
// TODO: Story: Names [not started]
// Story: Timer [done]
// TODO: Story: Single-player, artificial stupidity [not started]


// Project #3 Feedback
// Need comments in body of HTML and more in CSS. [done]
// Switch Single player to be on right and Multi player on the left [done]
// TODO: The header and footer text is not centered. [not started]

/* -------------- GENERAL GUIDING WISDOM ------------------- */

// "Debugging is twice as hard as writing the code in the first place.
// Therefore, if you write the code as cleverly as possible,
// you are, by definition, not smart enough to debug it."
//
// - KR

//  Cortney's guidance: user action => add event listener w/ callback
//  that callback sets another callback or calls another method. 
//  we end up with a chain of functionality.

//  GENERAL BOOTCAMP MOTTO: MAKE IT WORK, THEN RIGHT, THEN FAST


/* ---------   GAME STATE GLBOAL CONSTANTS & VARIABLES --------- */

// Global Variables
let gameState = [[],[],[]] // 3x3 matrix to represent game state
let gameOver = false
let elpsedTimeInterval = null // to be set on start :-)

// Global References to board pieces
let gameStatus = document.getElementById('status') // reference to game status display
let timer = document.getElementById("timer") // show time elapsed till game over or reset
let cells = document.querySelectorAll('.board>.block') // board cells (board blocks in CSS)

// Global references to game buttons
let startBtn = document.getElementById('startBtn') // start button
let resetBtn = document.getElementById('resetBtn') // reset button
let replayBtn = document.getElementById('replayBtn') // replay button

// TIC-TAC-TOE winning condition representations
const boardLines = [
    // rows wins
    [0,1,2],
    [3,4,5],
    [6,7,8],
    
    // columns wins
    [0,3,6],
    [1,4,7],
    [2,5,8], 

    // diagonals wins
    [0,4,8],
    [2,4,6]
]

// values to represent players moves in gameState
const PLAYER_O_STATE = -1
const PLAYER_X_STATE = 1


/* ------------ USER ACTIONS IMPLEMENTATION --------------- */

/**
 * Name: Start Game
 * =================
 * Sets the state for starting a new game & start the clock
 * 
 * When the user
 * @param {*} event 
 */
 const startGame = (event) => {
    gameStatus.textContent = "Player X's turn" // Player X starts first
    startBtn.disabled = "true" // disable 'Start Game' button to start the game
    elpsedTimeInterval = startClock() // start counting & display elapsed time
}

/**
 * Name: replayGame
 * ================
 * Handler to replay the game.
 * Combines functionality of reset & start actions. 
 * 
 * @param {*} event 
 */
 const replayGame = (event) => {
    initGame() // First, reset the game
    startGame() // then start next game
}

/**
 * Name: resetGame
 * ================
 * Resets game state and clears the board, 
 * and prepares board for next game.
 * Player is invite to Start the game.
 * 
 * @param {*} event 
 */
const resetGame = (event) => {
    initGame()
}

/**
 * Name: selectCell
 * ================
 * Called whenever a player makes a move (selects a cell).
 * Makes sure the game has started, that it is not over, 
 * and that the cell isn't already filled.
 * 
 * When those conditions are met, update cell & check for win.
 * 
 * @param {*} event 
 */
const selectCell = (event) => {
    let cell = event.target

    // check if game has started
    if( startBtn.disabled ) {

        // once game starts, make sure resetBtn is enabled.
        if ( resetBtn.disabled ) resetBtn.disabled = false

        // check if game isn't over yet
        if (gameOver) {
            alert("Game is over. Click Replay to play again!")
        }
        // When user selects a cell that is not empty
        else if ( cell.textContent != '') {
            // Then the game says "Please select an empty cell." 
            // and does not put an X or O in the cell
            alert("That one is taken! Find an empty cell.")
        } 
        // we have a valid move - update cell & check if it's a winner!
        else {
            updateCell(cell)
            checkWinCondition() // use public arrayBoard
        }
    }
    // if game hasn't started, tell 'em
    else {
        alert("Gotta start the game to play. Click the start button :-)")
    }
    
    console.log('gameState', gameState)
}


/* ------------ ADD USER ACTION HANDLERS ------------------ */

startBtn.addEventListener("click", startGame) // When the user clicks 'Start Game'
replayBtn.addEventListener("click", replayGame) // When the user clicks 'Replay'
resetBtn.addEventListener("click", resetGame) // When user clicks 'Reset'
cells.forEach((cell) => cell.addEventListener("click", selectCell)) // When the user selects a cell

/* ------------ GAME HELPER FUNCTIONS ------------------- */


/**
 * Name: pad
 * =========
 * Front pads single digit numbers with '0'
 * Soure: https://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date
 *
 * @param {*} n - number to pad
 * @returns padded number as string
 */
const pad = (n) => n < 10 ? '0'+ n : n

// For example, 2 minutes shows up as 2:0 and
// 2 minutes and single digit seconds, show up as 2:1, 2:2, etc...
// need front padding for 2:0 => 2:00, 2:1 => 2:01q

/**
 * Name: displayTime
 * =================
 * Translate time in seconds into MM:SS format
 *
 *
 * @param {*} seconds - time in seconds
 * @returns formated time string
 */
const displayTime = (seconds) => (
    `${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)}`
)

/**
 * Name: startClock
 * ======================
 * Start clock and track time since called.
 *
 * @returns interval - for clearing when game is done.
 */
const startClock = () => {
    let seconds = 0;

    // create interval object & assign to global var for later access
    let interval = setInterval(() => {
        seconds += 1 // inc time
        timer.textContent = `Time elpased: ${displayTime(seconds)}` // update view
    }, 1000)

    return interval;
}

/**
 * Name: updateCell
 * ================
 * Given a cell, check the global gameStatus variable,
 * to determine who's move it is, and update the board
 * 
 * @param {*} cell
 */
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

/**
 * Check Win Condition
 * ===================
 * Called Given the turn has just ended
 * 
 * * Uses global param gameState
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
            gameStatus.textContent = 'Congrats! Player O wins' // update game status
            alert(gameStatus.textContent) // alert players of winner

            // Then the system draws a line through the winning three cells
            endGame(line) // Game Ends
        }
        // else, game continues
    }

    // check if board is full - declare draw & end game
    console.log("check if the board is full.")
    if (isBoardFull()) {
        gameStatus.textContent = "Draw! Replay?"  // update game status
        // alert(gameStatus.textContent)

        endGame() // no winning line
    }
}

/**
 * Name: isBoardFull
 * =================
 * Predicate function to check whether all board cells are filled.
 * 
 * @returns {Boolean} 
 */
const isBoardFull = () => {
    // if any cells are empty
    for(let cell of cells ) {
        if (cell.textContent === '') return false
    }
    
    // otherwise return true
    return true;
}

/**
 * Name: endGame
 * =============
 * Call method to end the game (sets global variable gameOver)
 * Highlight the winning line if game was won (could've been a draw)
 * Stop clock, and update buttons to set user up for a replay :-) 
 * 
 * @param {[#,#,#]} line 
 */
const endGame = (line)  => {
    // highlight winning line, if there is one.     
    // if (line) highlightLine(line) 

    // stop clock - by clearing interval
    clearInterval(elpsedTimeInterval)

    gameOver = true // set global indicator to true

    resetBtn.disabled = true // disable reset button
    replayBtn.disabled = false // enable replay button
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
 * @param {[#,#,#]} line 
 * @param {[[#,#,#],
            [#,#,#],
            [#,#,#]]} gameState 
 * @return sum of corresponding board cells
 */
const sumBoardLine = (line, gameState) => {
    // console.log('inside sumBoardLine, lines=', lines)
    return line
        // board cells run 1-9, gameState indices 0-8
        .map(cell => gameState[cell]) 
        // return board cells sum
        .reduce((sum,score) => sum += score)
}

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
        cell.classList.remove('occupied')
    }
}

/**
 * Name: initGame
 * ==============
 * Initialize game state
 */
 const initGame = () => {
    // console.log("entering init game")

    gameStatus.textContent = "Click Start to Play" // init game status
    gameState = [  // clear game state
        [0,0,0],
        [0,0,0],
        [0,0,0]] 
    clearBoardCells() // clear the board

    gameOver = false // game's just about to start

    // reset time
    if (elpsedTimeInterval) clearInterval(clearInterval(elpsedTimeInterval)) // remove clock
    timer.textContent = '' // clear time display

    // ensure start button is enabled & disable the rest. 
    if( startBtn.disabled ) startBtn.disabled = false
    resetBtn.disabled = "true" // disabled 
    replayBtn.disabled = "true" // disabled
}

initGame() // init game & board on page load & let the games begin!!