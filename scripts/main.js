// TODO: start by adding all the stories here - wrap mind around the game
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
let boardArray = []

let gameStatus = document.getElementById('status')
// Note: if cell is empty, not 'occupied'

// initialize game blocks (the cells)
let cells = document.querySelectorAll('.board>.block')

// When the user clicks 'Start Game'
let startButton = document.getElementById('startBtn')
startButton.addEventListener('click', (event) => {
    // Then the 'Start Game' button is disabled ("grayed out")
    startButton.disabled = "true"

    // And the status area contains "Player X's turn
    gameStatus.textContent = "Player X's turn"
})


// Story: No Rules [done]
// =====================

// Given an empty board, and the current player is X
// When the user selects a cell
for(cell of cells) {
    cell.addEventListener('click', (event) => {
        let cell = event.target

        // check if game has started
        if( startBtn.disabled ) {
            // When user selects a cell that is not empty
            if( cell.textContent != '') {
                // Then the game says "Please select an empty cell." 
                // and does not put an X or O in the cell
                alert("That one is taken! Find an empty cell.")
            } else {
                updateCell(cell)
            }
        }
        // if game hasn't started, tell 'em
        else {
            alert("Gotta start the game to play. Click the start button :-)")
        }
        
        console.log('boardArray', boardArray)
        
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
        boardArray[Number(cell.id[5]) - 1] = 1
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
        boardArray[Number(cell.id[5]) -1 ] = 0

        // And the turn ends, and the current player changes from O to X
        gameStatus.textContent = "Player X's turn" 
    }
}