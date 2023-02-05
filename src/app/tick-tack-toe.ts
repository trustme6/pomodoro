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

const cells = [1,2,3,4,5,6,7,8,9]
let turn = 1;

const renderTable = () => {
    console.log(`${cells[0]} | ${cells[1]} | ${cells[2]} `);
    console.log("--------- ");
    console.log(`${cells[3]} | ${cells[4]} | ${cells[5]}`);
    console.log("--------- ");
    console.log(`${cells[6]} | ${cells[7]} | ${cells[8]}`)
}

const checkWinner = (player) => {
  
  //todo add ifs 

  if (cells[0] === player && cells[4] === player && cells[8] === player) {
    return true;
  }

  if (cells[2] === player && cells[4] === player && cells[6] === player) {
    return true;
  }
   


  if (cells[0] === player && cells[1] === player && cells[2] === player) {
    return true;
  }

  if (cells[3] === player && cells[4] === player && cells[5] === player) {
    return true;
  }
  
  if (cells[6] === player && cells[7] === player && cells[8] === player) {
    return true;
  }
 

  if (cells[0] === player && cells[3] === player && cells[6] === player) {
    return true;
  }
  
  if (cells[1] === player && cells[4] === player && cells[7] === player) {
    return true;
  }
  
  if (cells[2] === player && cells[5] === player && cells[8] === player) {
    return true;
  }
}

const askQuestion = () => {
  const player = turn % 2 === 0 ? "0": "X";

  rl.question(`Выберите номер в таблице чтобы поставить туда ${player}\n`, (answer) => {
    cells[answer - 1] = player;
    turn = turn + 1;
    
    renderTable();
    if (checkWinner(player)) {
      console.log(`The winner is ${player}`);
    } else {
      askQuestion();
    }
  });
} 

// initial
renderTable();
askQuestion();


// rl.close();