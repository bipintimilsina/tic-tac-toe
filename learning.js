const startGame = document.querySelector("#start-button");
const restartGame = document.querySelector("#restart");

const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];
  // const board = document.createElement("div");

  function render() {
    const gameboardDiv = document.querySelector("#gameboard");
    gameboardDiv.innerHTML = "";

    gameboard.forEach((element, index) => {
      gameboardDiv.innerHTML += `<div id="square-${index}" class="square">${element}</div>`;
    });

    const squares = document.querySelectorAll(".square");
    squares.forEach((element) => {
      element.addEventListener("click", Game.handleClick);
    });

    // gameboardDiv.appendChild(board);
  }

  return {
    render,
    gameboard,
  };
})();

function createPlayers(name, mark) {
  this.name = name;
  this.mark = mark;
}

const Game = (() => {
  gameOver = false;
  currentPlayerIndex = 0;
  function start() {
    const player1 = new createPlayers(
      document.querySelector("#player1").value,
      "X"
    );

    const player2 = new createPlayers(
      document.querySelector("#player2").value,
      "O"
    );
    PlayersArray = [player1, player2];

    Gameboard.render();
  }

  const checkForWin = (board) => {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 6],
      [2, 5, 8],
    ];
    for (let combination of winCombinations) {
      const [a, b, c] = combination;
      if (
        board[a] &&
        board[b] &&
        board[c] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return true;
      }
    }
    return false;
  };
  function checkForTie(board) {
    if (board.every((cell) => cell != "")) {
      return true;
    }
    return false;
  }

  const handleClick = (event) => {
    // alert("hey")
    if (gameOver) return;

    displayController("");
    const squareIndex = parseInt(event.target.id.split("-")[1]);
    if (event.target.textContent == "") {
      Gameboard.gameboard[squareIndex] = PlayersArray[currentPlayerIndex].mark;
      Gameboard.render();
    }
    if (checkForWin(Gameboard.gameboard)) {
      // console.log("hey");
      gameOver=true
      // const message = document.querySelector("#message");
      displayController(
        `${PlayersArray[currentPlayerIndex].mark} ${PlayersArray[currentPlayerIndex].name} won`
      );

      Gameboard.render();
      return;
    } else {

      // console.log("err");
      if (checkForTie(Gameboard.gameboard)) {
     
     gameOver=true
        displayController("Its a tie!");
        Gameboard.render();
        return;
      }
    }
    // console.log(event.target);
    // event.target.innerHTML ="x"

    if (!checkForWin(Gameboard.gameboard)) {
      if (currentPlayerIndex == 1) {
        currentPlayerIndex = 0;
      } else {
        currentPlayerIndex = 1;
      }
    }
    Gameboard.render();
  };

  return {
    start,
    handleClick,
    checkForWin,
  };
})();

function restart() {
  displayController("")
  gameOver=false
  Gameboard.gameboard.forEach((element, index) => {
    Gameboard.gameboard[index] = "";
  });
  // console.log(Gameboard.gameboard)
  // Game.render();
  Game.start();
}

startGame.addEventListener("click", () => {
  Game.start();
});

restartGame.addEventListener("click", () => {
  restart();
});

function displayController(message) {
  let message1 = document.querySelector("#message");
  message1.innerHTML = message;
}
