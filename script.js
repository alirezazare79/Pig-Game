'use strict';

// Selcting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const currentPlayer0 = document.getElementById('current--0');
const currentPlayer1 = document.getElementById('current--1');
const player0E1 = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');


let score, activePlayer, currentScore, playing;

const init = function() {

    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    currentPlayer0.textContent = 0;
    currentPlayer1.textContent = 0;
    diceEl.classList.add('hidden');
    player0E1.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0E1.classList.add('player--active');
    player1El.classList.remove('player--active');
};


init();



const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0E1.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};


// Rolling dice
btnRoll.addEventListener('click', function() {
    if (playing) {
        // 1. Generating by random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);

        // 2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // 3.Check for rolled 1
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        // 1- add current score to active player 
        score[activePlayer] += currentScore;
        console.log(score[activePlayer]);
        // score[1]= score[1]+currentScore
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

        // 2- Check if score is > 100
        if (score[activePlayer] >= 100) {
            // Finish the game
            diceEl.classList.add('hidden');
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        } else {
            switchPlayer();

        }

        // switch player
    }
});

btnNew.addEventListener('click', init)