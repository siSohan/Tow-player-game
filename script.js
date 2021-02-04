'use strict';

const player1 = document.querySelector('.player--0'); //1st player skin
const player2 = document.querySelector('.player--1'); //2nd player skin
const score01 = document.getElementById('score--0'); //1st player score
const score02 = document.getElementById('score--1'); // 2st player score
const diceEl = document.querySelector('.dice'); //dice show
const btnNew = document.querySelector('.btn--new'); //Reset button
const btnRoll = document.querySelector('.btn--roll'); //Roll button
const btnHold = document.querySelector('.btn--hold'); //Hold button
const current01 = document.getElementById('current--0'); //1st player score save here
const current02 = document.getElementById('current--1'); // 2nd player score save here
//main score Board
let score = 0;
let playerScore1 = 0;
let playerScore2 = 0;
let playing = true;
//starting position -->
diceEl.classList.remove('hide'); //show  the dice
score01.textContent = 0; //score set 0
score02.textContent = 0; //score set 0
current01.textContent = 0; //current score 0
current02.textContent = 0; //current score 0

//play button function -->
btnRoll.addEventListener('click', function () {
  diceEl.classList.remove('hide');
  const dice = Math.trunc(Math.random() * 6 + 1); //dice number
  if (playing) {
    diceEl.src = `dice-${dice}.png`; //dice changer
    //1st player condition -->
    if (player1.classList.contains('player--active')) {
      if (dice !== 1) {
        score += dice;
        current01.textContent = score;
      } //pass condition -->
      else {
        score = 0;
        current01.textContent = score;
        player2.classList.toggle('player--active');
        player1.classList.toggle('player--active');
      }
    } //2nd player condition -->
    else {
      if (dice !== 1) {
        score += dice;
        current02.textContent = score;
      } else {
        score = 0;
        current02.textContent = score;
        player1.classList.toggle('player--active');
        player2.classList.toggle('player--active');
      }
    }
  }
});

//Hold button -->

btnHold.addEventListener('click', function () {
  if (playing) {
    //point saving condition -->
    if (player1.classList.contains('player--active')) {
      playerScore1 += score;
      score01.textContent = playerScore1;
      score = 0;
      current01.textContent = score;
      player2.classList.toggle('player--active');
      player1.classList.toggle('player--active');
    } else {
      playerScore2 += score;
      score02.textContent = playerScore2;
      score = 0;
      current02.textContent = score;
      player1.classList.toggle('player--active');
      player2.classList.toggle('player--active');
    }
    //winner section condition -->
    if (score01.textContent >= 100) {
      playing = false;
      player1.classList.add('player--winner');
      document.getElementById('name--0').textContent = `🏆🏆 Winner by ${
        playerScore1 - playerScore2
      } point's`;
    } else if (score02.textContent >= 100) {
      playing = false;
      player2.classList.add('player--winner');
      document.getElementById('name--1').textContent = `🏆🏆 Winner by ${
        playerScore2 - playerScore1
      } point's`;
    }
  }
});

//Reset function -->
btnNew.addEventListener('click', function () {
  diceEl.classList.add('hide');
  playing = true;
  score = 0;
  score01.textContent = score;
  score02.textContent = score;
  current01.textContent = score;
  current02.textContent = score;
  player2.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  document.getElementById('name--0').textContent = `PLAYER 1`;
  document.getElementById('name--1').textContent = `PLAYER 2`;
  //class toggle condition ===>
  if (player2.classList.contains('player--active')) {
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
  } else {
    player1.classList.add('player--active');
  }
});
