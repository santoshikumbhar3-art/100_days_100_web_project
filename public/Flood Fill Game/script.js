const SIZE = 10;
const boardElement = document.getElementById("board");

let currentPlayer = 1;
let board = [];
let gameOver = false;

for (let row = 0; row < SIZE; row++) {
    board[row] = [];

    for (let col = 0; col < SIZE; col++) {

        board[row][col] = 0;

        const cell = document.createElement("div");

        cell.classList.add("cell");
        cell.dataset.row = row;
        cell.dataset.col = col;

        cell.addEventListener("click", handleMove);

        boardElement.appendChild(cell);
    }
}

function handleMove(e) {

    if (gameOver) return;

    const row = Number(e.target.dataset.row);
    const col = Number(e.target.dataset.col);

    if (board[row][col] !== 0) return;

  ,floodFill(board, row, col, currentPlayer);  

    updateBoard();
    updateScore();

    currentPlayer = currentPlayer === 1 ? 2 : 1;

    document.getElementById("turn").textContent =
        `Player ${currentPlayer} Turn`;

    checkWinner();
}

function floodFill(row, col, player) {

    const stack = [[row, col]];

    while (stack.length) {

        const [r, c] = stack.pop();

        if (
            r < 0 ||
            c < 0 ||
            r >= SIZE ||
            c >= SIZE ||
            board[r][c] !== 0
        ) {
            continue;
        }

        board[r][c] = player;

        stack.push([r + 1, c]);
        stack.push([r - 1, c]);
        stack.push([r, c + 1]);
        stack.push([r, c - 1]);

        break;
    }
}

function updateBoard() {

    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {

        const row = cell.dataset.row;
        const col = cell.dataset.col;

        cell.classList.remove("player1", "player2");

        if (board[row][col] === 1)
            cell.classList.add("player1");

        if (board[row][col] === 2)
            cell.classList.add("player2");
    });
}

function updateScore() {

    let p1 = 0;
    let p2 = 0;

    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {

            if (board[row][col] === 1)
                p1++;

            if (board[row][col] === 2)
                p2++;
        }
    }

    document.getElementById("score1").textContent = p1;
    document.getElementById("score2").textContent = p2;
}

function checkWinner() {

    let filled = 0;

    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {

            if (board[row][col] !== 0)
                filled++;
        }
    }

    if (filled === SIZE * SIZE) {

        gameOver = true;

        const p1 =
            Number(document.getElementById("score1").textContent);

        const p2 =
            Number(document.getElementById("score2").textContent);

        if (p1 > p2)
            document.getElementById("winner").textContent =
                "Player 1 Wins!";

        else if (p2 > p1)
            document.getElementById("winner").textContent =
                "Player 2 Wins!";

        else
            document.getElementById("winner").textContent =
                "Draw!";
    }
}

document.getElementById("restart")
.addEventListener("click", () => {

    board = [];
    boardElement.innerHTML = "";
    gameOver = false;
    currentPlayer = 1;

    document.getElementById("winner").textContent = "";
    document.getElementById("turn").textContent =
        "Player 1 Turn";

    document.getElementById("score1").textContent = 0;
    document.getElementById("score2").textContent = 0;

    for (let row = 0; row < SIZE; row++) {

        board[row] = [];

        for (let col = 0; col < SIZE; col++) {

            board[row][col] = 0;

            const cell = document.createElement("div");

            cell.classList.add("cell");

            cell.dataset.row = row;
            cell.dataset.col = col;

            cell.addEventListener("click", handleMove);

            boardElement.appendChild(cell);
        }
    }
});