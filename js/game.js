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
    
    console.table(board);
    return board;
}

function getCellTypeFromBoard(board, i, j){
    return board[i][j].cellType;
}

function renderMine(board){
    
    for(var i=0; i<gLevel.MINES; i++){
        //debugger;
        var randomNum = getRandomIntInclusive(0, gLevel.SIZE-1);
        board[randomNum][randomNum] = createCell(4, true, false, true, MINE);    
    }
}

function setMinesNegsCount(board) {
    //TO DO count mines around each cell and set the minesAroundCount.
   
    
    for(var i=0; i<board.length; i++){
        for(var j=0; j<board[i].length; j++){
            var res = getCountOfMineNegs(board, {i:i,j:j});
            //board[i][j] = res;
            console.log('res',res)
        }
    }
   // console.log('ddd', res)

}


function getCountOfMineNegs(board, pos) {
    var count = 0;
    for (var i = pos.i-1; i <= pos.i+1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = pos.j-1; j <= pos.j+1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === pos.i && j === pos.j) continue;
            var cell = gBoard[i][j];
            //console.log(cell.cellType)
            if (cell.cellType === MINE) {
                count++;
                //console.log('inner mine negs', count)
            }
           
            
        }
    }
    
    return count;
}

//Render board in the DOM
function renderBoard(board) {
    var htmlStr = '<table><tbody>';
    for (var i = 0; i < board.length; i++) {
        htmlStr += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var className = 'cell cell' + i + '-' + j;
            htmlStr += '<td class="' + className + '" oncontextmenu="cellMarked(this)" >' + cell.cellType + '</td>';
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
    elCell.innerHTML = MARK;
}

function checkGameOver() {
    console.log('Game Over');
    gGame.isOn = false;
}

function expandShown(board, elCell, i, j) {}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

