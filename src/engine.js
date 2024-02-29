let state = {
    values: {
        player1Score: 0,
        player2Score: 0,
        playerTime: 1,
        markedSquares: [],
        player1Squares: [],
        player2Squares: [],
        gameEnd: false,
    },
    view: {
        scoreP1: document.querySelector("#player1"),
        scoreP2: document.querySelector("#player2"),
        squares: document.querySelectorAll(".square"),
        playerTime: document.querySelector("#player-time"),
        endMessage: document.querySelector(".end"),
        winner: document.querySelector(".end-winner"),
    },
    winPositions: [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['3', '6', '9'],
        ['1', '5', '9'],
        ['3', '5', '7'],
    ],
};

function addSquareListener() {
    state.view.squares.forEach(square => {
        square.addEventListener("click", () => {
            if (state.values.markedSquares.includes(square.id) || state.values.gameEnd === true) {
                return;
            }
            state.values.markedSquares.push(square.id);
            if (state.values.playerTime === 1) {
                state.values.player1Squares.push(square.id);
                square.classList.add('blue');
                square.innerText = 'X';
                state.view.playerTime.innerText = "Player 2";
                state.view.playerTime.classList.add('player2');
                winLose(state.values.playerTime);

            } else {
                state.values.player2Squares.push(square.id);
                square.classList.add('red');
                square.innerText = 'O';
                state.view.playerTime.innerText = "Player 1";
                state.view.playerTime.classList.remove('player2');
                winLose(state.values.playerTime);
            }
            
        });
    });
};

function winLose(player) {
    let playerSquares = player === 1 ? state.values.player1Squares : state.values.player2Squares;
  
    state.values.gameEnd = state.winPositions.some(winPosition => {
        let win = winPosition.every(position => playerSquares.includes(position));
        return win;
    });

    (state.values.playerTime === 1) ? state.values.playerTime = 2 : state.values.playerTime = 1;
    if (state.values.markedSquares.length === 9 && !state.values.gameEnd) {
        endGame(0);
    }
    if (state.values.gameEnd) {
        endGame(player);
    }
}

function endGame(player) {
    state.view.squares.forEach(square => {
        square.style.border = 'none';
        square.style.background = '#bbb';
    });
    state.view.endMessage.style.display = 'flex';

    if (player === 0) {
        state.view.winner.innerText = 'Deu Velha';
        state.view.winner.classList.add('velha');
        state.values.playerTime = 1;
        if (state.values.playerTime === 1) {
            state.values.playerTime = 2;
            state.view.playerTime.innerText = "Player 2";
            state.view.playerTime.classList.add('player2');
        } else {
            state.values.playerTime = 1;
            state.view.playerTime.innerText = "Player 1";
            state.view.playerTime.classList.remove('player2');
        }
        return;
    } else if (player === 1) {
        state.view.winner.innerText = 'Player 1';
        state.values.playerTime = 1;
        state.view.playerTime.innerText = "Player 1";
        state.view.playerTime.classList.remove('player2');
        
    } else {
        state.view.winner.innerText = 'Player 2';
        state.view.winner.classList.add('player2');
        state.values.playerTime = 2;
        state.view.playerTime.innerText = "Player 2";
        state.view.playerTime.classList.add('player2');
    }
    state.values['player' + player + 'Score']++;
    state.view['scoreP' + player].innerText = state.values['player' + player + 'Score'];
}

function resetGame() {
    state.view.endMessage.style.display = 'none';
    state.view.winner.classList.remove('player2', 'velha');
    state.view.squares.forEach(square => {
        square.style.border = '1px solid #000';
        square.style.background = '#bbb';
    });
    state.values.gameEnd = false;
    state.values.player1Squares = [];
    state.values.player2Squares = [];
    state.values.markedSquares = [];
    cleanSquares();
    init();
}

function cleanSquares() {
    state.view.squares.forEach(square => {
        square.classList.remove('red', 'blue');
        square.innerText = '';
    });
}

function init() {
  addSquareListener(); 
}

init();