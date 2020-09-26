'use strict';

console.log('Hello :)');

const MINE = '💣';
const EMPTY = ' ';
const MARK = '🚩';

const SMILEY_DEFAULT = '🙂';
const SMILEY_WIN = '😃';
const SMILEY_LOSE = '😔';

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
    timerCount();
}

function reset() {
    gGame.isOn = true;
    gGame.shownCount = 0;
    gBoard = buildBoard();
    renderBoard(gBoard);
    gElSmiley.innerText = SMILEY_DEFAULT;
    //gGame.secsPassed = 0;
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
                    board[i][j] = createCell(minesAroundCount, false, false, false);
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
    
    if (gGame.isOn === true) {
        elCell.classList.remove('hide');
        gBoard[i][j].isShown = true;

        elCell.innerText = renderCell(gBoard[i][j]);
        var cellCount = ++gGame.shownCount;
        //console.log('show cells count', cellCount);

        if ((gLevel.SIZE * gLevel.SIZE) - gLevel.MINES === cellCount) {
            isWin();
        }
        if (gGame.shownCount === 1) {
            gTimerInterval = setInterval(timerCount, 1000);
        }
        if (gBoard[i][j].isMine) {
            gElSmiley.innerText = SMILEY_LOSE;
            expandAllMines(gBoard);
            renderBoard(gBoard);
            checkGameOver();
        }
    }
}

function expandAllMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j].isMine) {
                board[i][j].isShown = true;
            }
        }
    }
}

function cellMarked(elCell, i, j) {
    var markedToggle = (gBoard[i][j].isMarked = !gBoard[i][j].isMarked);
    //console.log(markedToggle);
    if (gBoard[i][j].isMarked) {
        elCell.innerText = MARK;
    } else {
        elCell.innerText = EMPTY;
    }

    if (gBoard[i][j].isMine) {
        ++gGame.markedCount;
        if (gGame.markedCount === gLevel.MINES) {
            isWin();
        }
    } 
}

function isWin() {
    gElSmiley.innerText = SMILEY_WIN;
    console.log('you win!');
    gGame.isOn = false;
}

function checkGameOver() {
    clearInterval(gTimerInterval);
    gGame.isOn = false;
    console.log('Game Over!');
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

function timerCount() {
    gGame.secsPassed++;
    var minutes = parseInt(gGame.secsPassed / 60);
    var seconds = parseInt(gGame.secsPassed % 60);
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var timerStr = minutes + ':' + seconds;
    document.querySelector('.game-timer').innerHTML = timerStr;
}
