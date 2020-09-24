//Render board in the DOM
function renderBoard(board) {
    var htmlStr = '<table><tbody>';
    for (var i = 0; i < board.length; i++) {
        htmlStr += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var className = 'cell' + i + '-' + j;
            var hide
            htmlStr += '<td class="' + className + ' hide" onclick="cellClicked(this, '+i+', '+j+')" oncontextmenu="cellMarked(this, '+i+', '+j+')" >' + renderCell(cell) + '</td>';
        }
        htmlStr += '</tr>';
    }
    htmlStr += '<tbody></table>';
    var elBoard = document.querySelector('.game-board');
    elBoard.innerHTML = htmlStr;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
