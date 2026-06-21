function floodFill(board, row, col, player) {

    const SIZE = board.length;

    const stack = [[row, col]];
    const visited = Array(SIZE)
        .fill()
        .map(() => Array(SIZE).fill(false));

    while (stack.length > 0) {

        const [r, c] = stack.pop();

        if (
            r < 0 ||
            c < 0 ||
            r >= SIZE ||
            c >= SIZE
        ) {
            continue;
        }

        if (visited[r][c]) continue;

        if (board[r][c] !== 0) continue;

        visited[r][c] = true;

        board[r][c] = player;

        stack.push([r + 1, c]);
        stack.push([r - 1, c]);
        stack.push([r, c + 1]);
        stack.push([r, c - 1]);
    }
}