const startbtn = document.querySelector("#start-button");

const restartbtn = document.querySelector("#restart");

const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let boardHTML = "";
    gameboard.forEach((square, index) => {
      boardHTML += `<div class="square"    id="square-${index}">${square}</div>`;
    });
    document.querySelector("#gameboard").innerHTML = boardHTML;
    const squares = document.querySelectorAll(".square");

    squares.forEach((element, index) => {
      element.addEventListener("click", Game.handleClick);
    });
  };

  function update(index, value) {
    gameboard[index] = value;
    render();
  }
  const getgameboard = () => gameboard;

  return { gameboard, render, update, getgameboard };
})();

function createPlayers(name, mark) {
  return {
    name,
    mark,
    //factory function to create the object players
  };
}

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  function start() {
    players = [
      createPlayers(document.querySelector("#player1").value, "X"),
      createPlayers(document.querySelector("#player2").value, "O"),
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();
    const squares = document.querySelectorAll(".square");

    squares.forEach((element, index) => {
      element.addEventListener("click", handleClick);
    });
  }

  function handleClick(event) {
    // console.log(event.target.id)

    if (gameOver) {
      return;
    }
    let index = parseInt(event.target.id.split("-")[1]);
    // console.log(index)

    if (Gameboard.getgameboard()[index] !== "") return;

    Gameboard.update(index, players[currentPlayerIndex].mark);

    if (
      checkForWin(Gameboard.getgameboard(), players[currentPlayerIndex].mark)
    ) {
      gameOver = true;
      displayController.renderMessage(
        `${players[currentPlayerIndex].name} wins`
      );

      // alert(`${players[currentPlayerIndex].name} won!`);
    } else if (checkForTie(Gameboard.getgameboard())) {
      gameOver = true;

      displayController.renderMessage(`Its a tie`);

      // alert(`Its a tie!`);
    }

    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  }

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      Gameboard.update(i, "");

    }
    document.querySelector("#message").innerHTML=""
    Game.start()
  };

  return {
    start,
    handleClick,
    restart,
  };
})();

function checkForWin(board) {
  //this takes the board like board ko isthiti chaiyo ne haia to know who won rihgt
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    // Check if the current player has a winning combination
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false; // Return false if no winning combination is found
}

function checkForTie(board) {
  return board.every((cell) => cell !== "");
}

startbtn.addEventListener("click", () => {
  Game.start();
});

restartbtn.addEventListener("click", () => {
  Game.restart();
});

const displayController = (() => {
  const renderMessage = (message) => {
    document.querySelector("#message").innerHTML = message;
  };

  return {
    renderMessage,
  };
})();
