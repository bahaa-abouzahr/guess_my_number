'use strict';

/*
// SECTION starting with DOM
console.log(document.querySelector('.message').textContent); // selects text from class element 'message'
// selection is done same as in css, # for id...

document.querySelector('.message').textContent = '🎉 Correct Number!'; // changes specific text!

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 8; // editing input value
console.log(document.querySelector('.guess').value); // use .value to get value from input field
*/

// SECTION Handling Click Events

// creating secret number
const secretNumberFunction = function () {
  return Math.trunc(Math.random() * 20) + 1;
  // Math.random() gives a random value between 0 and 1
  // so to get random from 1 to 20, we multiply by 20, remove decimals, add 1
};

let secretNumber = secretNumberFunction();

//function to apply querySelector text content, to remove repetition
const displayMessage = function (target, text) {
  document.querySelector(target).textContent = text;
};

let highScore = 0; // setting initial highscore
let score = 20; // getting initial score

// function when wrong guess is given
const wrongGuess = function (guess, secretNumber, score) {
  if (score > 0) {
    // if guess is bigger: too high message, else too low
    // provided text value as Conditional (Ternary) Operator!
    displayMessage('.message', guess > secretNumber ? 'Too High!' : 'Too Low!');

    // decreasing score
    score--;
    displayMessage('.score', score);
  }
  if (score === 0) {
    // end game if score is 0
    displayMessage('.message', 'You Lost the Game!');
  }
  return score;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // when there is no input
  if (!guess) {
    // if no number given by user, !false = true
    displayMessage('.message', '⛔ No Number given!');

    // When Player Wins
  } else if (guess === secretNumber) {
    displayMessage('.message', '🎉 Correct!');
    displayMessage('.number', secretNumber);

    // change css style when winning
    document.querySelector('body').style.backgroundColor = '#60b347';
    // inceasing width of number
    document.querySelector('.number').style.width = '30rem';
    // note will be inline styles!!

    if (score > highScore) {
      highScore = score;
      displayMessage('.highscore', highScore);
    }

    // When Guess is wrong!
  } else {
    score = wrongGuess(guess, secretNumber, score);
  }
});
// selecting .check, then adding event listener for clicks, then defining a function which will be executed on each click!!
document.querySelector('.again').addEventListener('click', function () {
  //restore initial values of the 'score' and'secretNumber' variables
  score = 20;
  secretNumber = secretNumberFunction();

  //Restore the initial conditions of the message, number, score and guess input fields
  displayMessage('.message', 'Start guessing...');
  displayMessage('.number', '?');
  displayMessage('.score', '20');
  document.querySelector('.guess').value = '';

  // restore the original background color (#222) and number width (15rem)
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
