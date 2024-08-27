document.addEventListener('DOMContentLoaded', () => {
    const playAIButton = document.getElementById('playAI');
    const playPvPButton = document.getElementById('playPvP');
    const gameBoard = document.getElementById('game-board');
    const status = document.getElementById('status');
    const cells = document.querySelectorAll('.cell');

    let board, currentPlayer, gameMode;

    const initGame = () => {
        board = Array(9).fill(null);
        currentPlayer = 'X';
        status.textContent = `É a vez do jogador ${currentPlayer}`;
        gameBoard.classList.remove('hidden');
        cells.forEach(cell => cell.textContent = '');
        cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    };

    const handleCellClick = (e) => {
        const index = e.target.dataset.index;
        if (board[index] || !gameBoard.classList.contains('hidden')) return;

        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        if (checkWinner()) {
            status.textContent = `Jogador ${currentPlayer} venceu!`;
            gameBoard.classList.add('hidden');
            return;
        }

        if (board.every(cell => cell)) {
            status.textContent = 'Empate!';
            gameBoard.classList.add('hidden');
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `É a vez do jogador ${currentPlayer}`;

        if (gameMode === 'AI' && currentPlayer === 'O') {
            setTimeout(makeAIMove, 500);
        }
    };

    const makeAIMove = () => {
        const availableMoves = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
        const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        board[move] = 'O';
        cells[move].textContent = 'O';

        if (checkWinner()) {
            status.textContent = 'Jogador O venceu!';
            gameBoard.classList.add('hidden');
        } else if (board.every(cell => cell)) {
            status.textContent = 'Empate!';
            gameBoard.classList.add('hidden');
        } else {
            currentPlayer = 'X';
            status.textContent = `É a vez do jogador ${currentPlayer}`;
        }
    };

    const checkWinner = () => {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontais
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticais
            [0, 4, 8], [2, 4, 6] // Diagonais
        ];
        return winningCombos.some(combo => {
            const [a, b, c] = combo;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    };

    playAIButton.addEventListener('click', () => {
        gameMode = 'AI';
        initGame();
    });

    playPvPButton.addEventListener('click', () => {
        gameMode = 'PvP';
        initGame();
    });
});
