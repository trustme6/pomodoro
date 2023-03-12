const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const { Console } = require('node:console');

const rl = readline.createInterface({ input, output });

console.log('------');
console.log("Hi! It's tick tack toe game!");
console.log('------');
// сделать игру крестики-нолики для 1 игрока
// ввод через консоль/терминал
// нужно отрисовывать поле
// в поле можно поставить 0 или X
// При совпадении 3-х 0 или X по диагонали/вертикали/горизонтали игрок побеждает
// После победы можно завершить игру либо начать новую
// Первый ход начинают крестики, второй нолики
// Возможность начать заново
//// todo: add validation for values other than "X" or "0"
// выбор первого игрока (Х или О)
// ввод имени для первого и второго игрока
let turn = 1;
let cells = [];
let player = '';
let name = "";

const dimensionOfField = 4;

const startGame = () => {
  cells = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ];
  const callPlayer = () =>{
    rl.question(`Выберите имя первого игрока: \n`, (answer) => {
      name = answer;
      rl.question(`Выберите имя второго игрока: \n`, (answer) => {
        name = answer;
        choosePlayer();
      })
      choosePlayer();
    })

  }
  callPlayer();

  const choosePlayer = () => {
    rl.question(`Выберите первого игрока: "X" или "O"\n`, (answer) => {
      if (answer === 'X' || answer === 'O') { 
        player = answer;
        renderTable();
        askQuestion();
      } else {
      choosePlayer(); 
      }
    });
  };
  choosePlayer();
};

const renderTable = () => {
  for (let i = 0; i < dimensionOfField; i++) {
    let string = '';
    for (let j = 0; j < dimensionOfField; j++) {
      string += j !== dimensionOfField - 1 ? `${cells[i][j]} | ` : cells[i][j];
    }
    console.log(string);
    console.log('----------');
  }
};

const checkWinner = (player, target) => {
  console.log(player);
  let col = 0;
  let row = 0;
  let diag = 0;
  let antiDiag = 0;

  for (let i = 0; i < dimensionOfField; i++) {
    if (cells[target.x][i] === player) {
      row++;
    }
    if (cells[i][target.y] === player) {
      col++;
    }
    if (cells[i][i] === player) {
      diag++;
    }
    if (cells[i][dimensionOfField - 1 - i] === player) {
      antiDiag++;
    }
  }

  if (
    col === dimensionOfField ||
    row === dimensionOfField ||
    diag === dimensionOfField ||
    antiDiag === dimensionOfField
  ) {
    return true;
  }
};

const continueGame = () => {
  rl.question('Вы желаете продолжить игру? yes/no \n', (answer) => {
    if (answer === 'yes') {
      startGame();
    } else if (answer === 'no') {
      rl.close();
    }
  });
};

const askQuestion = () => {
  console.log(`ходит ${name}`);
  rl.question(
    `Выберите номер в таблице чтобы поставить туда ${player}\n`,
    (answer) => {
      console.log(`ходит ${name}`);
      const targetCellX = parseInt((answer - 1) / dimensionOfField);
      const targetCellY = parseInt((answer - 1) % dimensionOfField);

      if (
        cells[targetCellX][targetCellY] === 'X' ||
        cells[targetCellX][targetCellY] === '0'
      ) {
        console.log('Эта ячейка уже занята!');
        askQuestion();
        return;
      }

      cells[targetCellX][targetCellY] = player;

      renderTable();

      if (checkWinner(player, { x: targetCellX, y: targetCellY })) {
        console.log(`The winner is ${player}!`);
        continueGame();
      } else {
        turn = turn + 1;

        if (player === 'X') {
          player = '0';
        } else {
          player = 'X';
        }

        askQuestion();
      }
    }
  );
};

// initial

startGame();

// rl.close();
