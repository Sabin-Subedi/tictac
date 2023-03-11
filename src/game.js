class TICTAC {
  constructor() {
    this.gameData = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    this.gameWonBy = null;
    this.currentPlayer = 0;
  }

  hasWonGame() {
    let gameWin = false;

    // for diagnoal
    const leftDiagonalSum =
      this.gameData[0][0]?.toString() +
      this.gameData[1][1]?.toString() +
      this.gameData[2][2]?.toString();
    const rightDiagonalSum =
      this.gameData[2][0]?.toString() +
      this.gameData[1][1]?.toString() +
      this.gameData[0][2]?.toString();

    if (leftDiagonalSum === "111" || rightDiagonalSum === "111") {
      gameWin = true;
      this.gameWonBy = 1;

      return gameWin;
    } else if (rightDiagonalSum === "000" || leftDiagonalSum === "000") {
      gameWin = true;
      this.gameWonBy = 0;

      return gameWin;
    }
    // checks rows
    for (let i = 0; i < this.gameData.length; i++) {
      let rowSum = "";
      let colSum = "";
      for (let j = 0; j < this.gameData[i].length; j++) {
        rowSum += this.gameData[i][j]?.toString();
        colSum += this.gameData[j][i]?.toString();
      }

      if (rowSum === "111" || colSum === "111") {
        this.gameWonBy = 1;
        gameWin = true;
        break;
      } else if (rowSum === "000" || colSum === "000") {
        this.gameWonBy = 0;
        gameWin = true;
        break;
      }
    }

    return gameWin;
  }

  changePlayer() {
    if (this.currentPlayer === 0) {
      this.currentPlayer = 1;
    } else {
      this.currentPlayer = 0;
    }
  }

  selectBox({ selectedRow, selectedCol }) {
    this.gameData[selectedRow][selectedCol] = this.currentPlayer;
    this.hasWonGame();
    this.changePlayer();
  }

  restart() {
    this.gameData = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    this.gameWonBy = null;
    this.currentPlayer = 0;
  }
}

const game = new TICTAC();

export default game;
