'use strict';

console.log('Hello :)');

const MINE = '💣';
const EMPTY = ' ';
const MARK = '🚩';

var gBoard;



//level
var gLevel = {
    SIZE: 4,
    MINES: 2,
};

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
};

//This is called when page loads
function initGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
    setMinesNegsCount(gBoard);
   
}

// function initLevel(levelNum) {
//     initGame(levelNum, Math.sqrt(levelNum));
//   }

function createCell(minesAroundCount, isShowen, isMine, isMarked, cellType){
    //cell
    var cell = {
        minesAroundCount: minesAroundCount,
        isShown: isShowen,
        isMine: isMine,
        isMarked: isMarked,
        cellType: cellType
    };
    return cell;
}


//Builds the board
function buildBoard() {
    var SIZE = gLevel.SIZE;

    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = createCell(4, true, false, true, EMPTY);

            //TO DO put MINES in random places and call setMinesNegsCount() and return created one
            
            // if(board[i][j] === MINE){
            //     cell.isMine = true;
            // }
            // if(board[i][j] !== MINE){
            //     board[i][j] = getRandomIntInclusive(1, 4);
            // }
            
        }
    }

    renderMine(board);
    //
    
    // board[2][2] = MINE;
    // board[3][0] = MINE;
    console.table(board);
    return board;
}

function renderMine(board){
    for(var i=0; i<gLevel.MINES; i++){
        
        board[getRandomIntInclusive(0, gLevel.SIZE-1)][getRandomIntInclusive(0, gLevel.SIZE-1)] += createCell(4, true, false, true, MINE);
        
    }
}


function setMinesNegsCount(board) {
    //TO DO count mines around each cell and set the minesAroundCount.
    // var count = 0;
    // cell.minesAroundCount = count;
    // var SIZE = gLevel.SIZE;
    // for (var i = 0; i < board.length; i++) {
    //     board.push([]);
    //     for (var j = 0; j < board.length; j++) {
    //         // if(board[i][j] === ){

    //         // }
            
    //     }
    // }
}

//Render board in the DOM
function renderBoard(board) {
    var htmlStr = '<table><tbody>';
    for (var i = 0; i < board.length; i++) {
        htmlStr += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var className = 'cell cell' + i + '-' + j;
            htmlStr += '<td class="' + className + '" oncontextmenu="cellMarked(elCell)" >' + cell.cellType + '</td>';
        }
        htmlStr += '</tr>';
    }
    htmlStr += '<tbody></table>';
    var elBoard = document.querySelector('.game-board');
    elBoard.innerHTML = htmlStr;
    //console.log(elBoard);
}

function cellClicked(elCell, i, j) {}

function cellMarked(elCell) {
   alert('s')
        //elCell.innerHTML = MARK;
    
}

function checkGameOver() {
    console.log('Game Over');
    gGame.isOn = false;
}

function expandShown(board, elCell, i, j) {}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
