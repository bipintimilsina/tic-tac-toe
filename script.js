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
    let index = parseInt(event.target.id.split("-")[1]);
    // console.log(index)

    if (Gameboard.getgameboard()[index] !== "") return;

    Gameboard.update(index, players[currentPlayerIndex].mark);

    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  }

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      Gameboard.update(i, "");
    }
  };

  return {
    start,
    handleClick,
    restart,
  };
})();

startbtn.addEventListener("click", () => {
  Game.start();
});

restartbtn.addEventListener("click", () => {
  Game.restart();
});
