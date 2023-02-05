const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

console.log("------");
console.log("Hi! It's tick tack toe game!");
console.log("------");
// сделать игру крестики-нолики для 1 игрока
// ввод через консоль/терминал
// нужно отрисовывать поле
// в поле можно поставить 0 или X
// При совпадении 3-х 0 или X по диагонали/вертикали/горизонтали игрок побеждает
// После победы можно завершить игру либо начать новую
// Первый ход начинают крестики, второй нолики



// Сократить ифы
// проверка заполненности (уже занято)
// проверка на победу



const dimensionOfField = 3;
const cells = [[1,2,3], [4,5,6], [7,8,9]];
let turn = 1;

const renderTable = () => {
  for (let i = 0; i < dimensionOfField ; i++) {
    let string = "";
    for (let j = 0; j < dimensionOfField ; j++) {
      string += j !== dimensionOfField - 1 ? `${cells[i][j]} | ` : cells[i][j];
    }
    console.log(string);
    console.log("----------");
  }
}

const checkWinner = (player, target) => {
  let col = 0;
  let row = 0;
  let diag = 0;
  let antiDiag = 0;

  for (let i = 0; i < dimensionOfField; i++) {
    if (cells[target.x][i] === player) {
      row++;
    }
  }

  if (col === dimensionOfField || row === dimensionOfField || diag === dimensionOfField || antiDiag === dimensionOfField) {
    return true;
  }
}

const askQuestion = () => {
  const player = turn % 2 === 0 ? "0": "X";

  rl.question(`Выберите номер в таблице чтобы поставить туда ${player}\n`, (answer) => {
    const targetCellX = parseInt((answer - 1) / 3);
    const targetCellY = parseInt((answer - 1) % 3);

    if (cells[targetCellX][targetCellY] === "X" || cells[targetCellX][targetCellY] === "0") {
        console.log("Эта ячейка уже занята!");
        askQuestion();
        return;
    }

    cells[targetCellX][targetCellY] = player;
    turn = turn + 1;

    renderTable();
    if (checkWinner(player, {x: targetCellX, y: targetCellY})) {
      console.log(`The winner is ${player}!`);
      rl.close();
    } else {
      askQuestion();
    }
  });
}

// initial
renderTable();
askQuestion();


// rl.close();
