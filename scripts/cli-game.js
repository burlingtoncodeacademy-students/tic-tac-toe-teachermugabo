const readline = require('readline');

const { createBrotliCompress } = require('zlib');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}


/**
 * TODO: given board array, return ASCI tic-tac-toe board
 * @param boardArray array of tic tac toe moves
 */
const getTextBoard = (boardArray) => {

    // Helper variables to create & hold textBoard
    let textBoard = '';
    let textBoardLine = `\n--- --- ---\n`
    let cellSeparator = '|'
    let cellValue = '';

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

    // return our fruits of labor
    return textBoard
}




// playing the game

const displayGame = (boardArray, gameStatus) => {

    // ASCI board for console.log
    let textBoard = getTextBoard(boardArray);

    console.log("Tic Tac Toe\n")
    console.log(textBoard)
    // console.log(`\n${gameStatus}`)
}

// initialize game board as an array of chars
let boardArray = [
    'x','','',
    'o','x','',
    '','','',
]

// game loops
async function start() {

    // game status / who's turn / any game message...
    let gameStatus = "\nStart Game...\n"

    // GAME FLOW
    // 1) display
    // 2) wait for user prompt
    // 3) update game board, switch player, and go back to #1
    
    // DISPLAY GAME
    displayGame(boardArray, gameStatus)
    
    // PROMPT USER INPUT
    let answer = await ask(gameStatus);
    // console.log(answer, 'line 80');

    if (!answer) 
    // if user is done -- let them go
    if (answer === 'leave' || answer === 'exit') {
        console.log('bye!')
        process.exit(0)
    } 
    
    // PLAY GAME
    
    // else, game goes on


    // quick & dirty sanitizing
    let cellNumber = Number(answer.trim().toLowerCase()) // if not number, throw else
    console.log('you entered:', cellNumber)
    
    start();

}

start();
  

