'use strict';

const MINE = '💣';
const EMPTY = ' ';
const MARK = '🚩';
const SMILEY_DEFAULT = '🙂';
const SMILEY_WIN = '😃';
const SMILEY_LOSE = '😔';
const LIVE = '💗';

var gBoard;
var gLevel;
var gTimerInterval;
var gElSmiley = document.querySelector('.smiley');
var gLives;

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
    renderTimer();
}

function reset() {
    gGame.isOn = true;
    gGame.shownCount = 0;
    gBoard = buildBoard();
    renderBoard(gBoard);
    gElSmiley.innerText = SMILEY_DEFAULT;
    gLives = 3;
    renderLives();
    clearInterval(gTimerInterval);
    gGame.secsPassed = 0;
    renderTimer();
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
        numOfClicks: 0,
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
        var cellCount = gGame.shownCount;
        if (gBoard[i][j].isMine) {
            elCell.classList.add('is-mine');
            setTimeout(function () {
                elCell.classList.remove('is-mine');
            }, 1000);
            livesCount();
        } else {
            elCell.classList.remove('hide');
            if (!gBoard[i][j].isShown) {
                ++gGame.shownCount;
                cellCount = gGame.shownCount;
                if (cellCount === 1) {
                    gTimerInterval = setInterval(timerCount, 1000);
                }
            }
            gBoard[i][j].isShown = true;
        }
        elCell.innerText = renderCell(gBoard[i][j]);
        if (gLevel.SIZE * gLevel.SIZE - gLevel.MINES === cellCount) {
            isWin();
        }
    }
}

function livesCount() {
    gLives--;
    renderLives();
}

function renderLives() {
    var htmlStr = '';
    for (var i = 0; i < gLives; i++) {
        htmlStr += '<span class="game-lives-heart">' + LIVE + '</span>';
    }

    if (gLives === 0) {
        expandAllMines(gBoard);
        renderBoard(gBoard);
        checkGameOver();
    }
    var gElLives = document.querySelector('.game-lives');
    gElLives.innerHTML = htmlStr;
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
    gGame.isOn = false;
    console.log('You Win!');
    clearInterval(gTimerInterval);
}

function checkGameOver() {
    gElSmiley.innerText = SMILEY_LOSE;
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
    renderTimer();
}

function renderTimer() {
    var minutes = parseInt(gGame.secsPassed / 60);
    var seconds = parseInt(gGame.secsPassed % 60);
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var timerStr = minutes + ':' + seconds;
    document.querySelector('.game-timer').innerHTML = timerStr;
}
