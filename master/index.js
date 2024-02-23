let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

//Функция, дающая возможность игроку нажимать на клетки поля
function handleClick(cellIndex) {
    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        document.getElementsByClassName('cell')[cellIndex].innerText = currentPlayer;
        if (checkWin()) {
            // Сообщение о победе
            document.getElementById('message').innerText = `${currentPlayer} wins!`;
            updateScore(currentPlayer); // Обновляем счет для текущего игрока
            gameActive = false;
        } else if (checkDraw()) {
            //Сообщение о ничье
            document.getElementById('message').innerText = `It's a draw!`;
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Слои
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Колонны
        [0, 4, 8], [2, 4, 6] // Диагонали
    ];
    return winConditions.some(condition => {
        return condition.every(index => gameBoard[index] === currentPlayer);
    });
}

function checkDraw() {
    return !gameBoard.includes('');
}

//Кнопка рестарта
function restartGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.getElementById('message').innerText = '';
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
}

//Функция обновления счёта игрока
function updateScore(player) {
    if (player === 'X') {
        scoreX++;
        document.getElementById('score-x').innerText = scoreX;
    } else {
        scoreO++;
        document.getElementById('score-o').innerText = scoreO;
    }
}

//Кнопка сброса счёта
function resetScore() {
    scoreX = 0;
    scoreO = 0;
    document.getElementById('score-x').innerText = scoreX;
    document.getElementById('score-o').innerText = scoreO;
    restartGame();
}
