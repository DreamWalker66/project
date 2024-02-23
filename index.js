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

let isDragging = false;
let offsetX, offsetY;

const scoreContainer = document.querySelector('.score-container');

scoreContainer.addEventListener('mousedown', startDragging);
scoreContainer.addEventListener('touchstart', startDragging);

function startDragging(e) {
    isDragging = true;
    if (e.type === 'mousedown') {
        offsetX = e.clientX - scoreContainer.getBoundingClientRect().left;
        offsetY = e.clientY - scoreContainer.getBoundingClientRect().top;
    } else if (e.type === 'touchstart' && e.touches.length === 1) {
        const touch = e.touches[0];
        offsetX = touch.clientX - scoreContainer.getBoundingClientRect().left;
        offsetY = touch.clientY - scoreContainer.getBoundingClientRect().top;
    }
}

document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag);

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        scoreContainer.style.left = x + 'px';
        scoreContainer.style.top = y + 'px';
    }
}

document.addEventListener('mouseup', stopDragging);
document.addEventListener('touchend', stopDragging);

function stopDragging() {
    isDragging = false;
}
