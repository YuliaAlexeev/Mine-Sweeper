'use strict';

console.log('Hello :)');

const MINE = '💣';
const EMPTY = ' ';
const MARK = '🚩';

var gBoard;
var gLevel;
var gTimerInterval;
var gElSmiley = document.querySelector('.smiley');

var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
};

//This is called when page loads
function initGame(levelNum, mines) {
    initLevel(levelNum, mines);
    reset();
}

function reset(){
    gBoard = buildBoard();
    renderBoard(gBoard);
    gElSmiley.innerText = '🙂'
}

function initLevel(levelNum, mines) {
    gLevel = {
        SIZE: levelNum,
        MINES: mines,
    };
}

function createCell(minesAroundCount, isShown, isMine, isMarked) {
    var cell = {
        minesAroundCount: minesAroundCount,
        isShown: isShown,
        isMine: isMine,
        isMarked: isMarked,
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
            board[i][j] = createCell(0, false, false, false);
        }
    }
    renderMine(board);
    setMinesNegsCount(board);
    console.table(board);
    return board;
}

function renderMine(board) {
    for (var i = 0; i < gLevel.MINES; i++) {
        var cell =
            board[getRandomIntInclusive(0, gLevel.SIZE - 1)][
                getRandomIntInclusive(0, gLevel.SIZE - 1)
            ];
        cell.isMine = true;
    }
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (!board[i][j].isMine) {
                var minesAroundCount = getCountOfMineNegs(board, {
                    i: i,
                    j: j,
                });
                if (minesAroundCount > 0) {
                    board[i][j] = createCell(minesAroundCount,false,false,false);
                }
            }
        }
    }
    return board;
}

function getCountOfMineNegs(board, pos) {
        var count = 0;
        for (var i = pos.i - 1; i <= pos.i + 1; i++) {
            if (i < 0 || i >= board.length) continue;
            for (var j = pos.j - 1; j <= pos.j + 1; j++) {
                if (j < 0 || j >= board[i].length) continue;
                if (i === pos.i && j === pos.j) continue;
                if (board[i][j].isMine) {
                    count++;
                }
            }
        }
        return count;
}

function cellClicked(elCell, i, j) {
   
    //debugger;
    elCell.classList.remove('hide');
    gBoard[i][j].isShown = true;
  
    elCell.innerText = renderCell(gBoard[i][j]);
    if(gBoard[i][j].minesAroundCount){
        var cellCount = ++gGame.shownCount
        console.log(cellCount)
    }
    if(gGame.shownCount === 1){
        //to do
        //gTimerInterval = setInterval(timerCount, 100);
    }
    if(gBoard[i][j].isMine){
        expandAllMines(gBoard);
        //alert('game over!');
        gElSmiley.innerText = '😔'
        renderBoard(gBoard);
        checkGameOver();
    }
}

function expandAllMines(board){  
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j].isMine) {
                checkGameOver() 
                board[i][j].isShown = true;              
            }
        }
    }
}

function cellMarked(elCell, i, j) {
    gBoard[i][j].isMarked = true;
    var markCount = ++gGame.markedCount
    elCell.innerText = MARK;
   //console.log('f', markCount);
}

function isWin(){
    for(var i=0; i<gBoard.length; i++){
        for(var j = 0; j<gBoard[i].length; j++){
            
            if (!gBoard[i][j].isMine && gBoard[i][j].minesAroundCount && gBoard[i][j].isShown){

            }
        }
    }
}

function checkGameOver() {
    clearInterval(gTimerInterval);
    gGame.isOn = false;
    return false;
}

function expandShown(board, elCell, i, j) {}




function renderCell(cell) {
    if (cell.isShown) {
        if (cell.isMine) {
            return MINE;
        } else {
            if (cell.minesAroundCount > 0) return cell.minesAroundCount;
            return EMPTY;
        }
    } 
    return EMPTY; 
}


function timerCount(){
    //TO DO timer
    var time = new Date();
    document.querySelector('.game-timer').innerHTML = time.getMilliseconds();
}