let boardArray = [
    'x','','',
    'o','x','',
    '','','',
]

// Helper variables to create & hold textBoard
let textBoard = '';
let textBoardLine = `\n--- --- ---\n`
let cellSeparator = '|'
let cellValue = '';

/**
 * TODO: quick method to test game logic
 * 
 */
const displayBoard = () => {
    for(let index in boardArray) {
        
        // assign cellValue 
        if(!boardArray[index]) cellValue = ' '
        else cellValue = boardArray[index]

        textBoard += ` ${cellValue} `

        // if index is divisible by 3, append new line
        if ((index + 1) % 3 === 0 && index != 8) {
            textBoard += textBoardLine
        }
        // for last line
        else if (index == 8) {
            // for last index, do nothing
        }
        // else, for all other lines, add separator
        else  textBoard += cellSeparator
        
        //console.log(boardArray[index])
    }
}

displayBoard();

console.log(textBoard)
