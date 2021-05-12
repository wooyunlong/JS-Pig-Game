/**
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/**
Adcanced Rules:
- A player loses entire scores and pass his turn, if he rolls two 6 in a row.
- Let the user decide the winning score.
- Add another dice to the game. The player loses his current score and pass his turn, if any of the dice is 1.
*/

/**
 * field
 */
var scores, roundScore, lastDice, activePlayer, gamePlaying, scoreToWin; //state variable;

/**
 * constructor / init function
 */
function init() {
  scoreToWin = window.prompt("Please set a winning score!");
  try {
    while (scoreToWin <= 0) {
      scoreToWin = window.prompt(
        "Invalid input. Please enter a integer that is greater than 0."
      );
    }
  } catch {
    scoreToWin = window.prompt(
      "Invalid input. Please enter a integer that is greater than 0."
    );
  }
  scores = [0, 0];
  roundScore = 0;
  lastDice = [0, 0];
  activePlayer = 0;
  gamePlaying = true;
  /**
   * use getElementById to select with ID
   */
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".btn-hold").style.display = "block";
  document.querySelector(".btn-roll").style.display = "block";
  document.querySelector(".dice1").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
}

init();

/**
 * Two ways to make a setter to mutate content.
 * document.querySelector("#current-" + activePlayer).textContent = dice;
 * document.querySelector("#current-" + activePlayer).innerHTML ="<em>" + dice + "</em>";
 */

/**
 * Can also make a getter, save content into variable with selector.
 * var x = document.querySelector("#score-0").textContent;
 * console.log(x);
 */

/**
 * #ID to select ID
 * document.querySelector("#score-0").textContent='0';
 *
 * .CLASS to select class.
 * document.querySelector(".dice").style.display = "none"; //"display" attribute changes inline css and adds property.
 */

function switchPlayer() {
  document.querySelector(".dice1").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
  roundScore = 0;
  document.querySelector("#current-" + activePlayer).textContent = roundScore;

  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.toggle("active");
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.toggle("active");
}

/**
 * event and event listener
 */

/**
 * the btn alone is called the callback function
//function btn(){}
//btn();
//document.querySelector('.btn-roll').addEventListener('click', btn);
*/

//the function statement in the parenthesis is called the anonymous function
document.querySelector(".btn-roll").addEventListener("click", function() {
  //check state
  if (gamePlaying) {
    //1. generate random number and save it
    var dice = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1
    ];
    //2. display the result
    var dice1DOM = document.querySelector(".dice1");
    dice1DOM.style.display = "block";
    dice1DOM.src = "dice-" + dice[0] + ".png";
    var dice2DOM = document.querySelector(".dice2");
    dice2DOM.style.display = "block";
    dice2DOM.src = "dice-" + dice[1] + ".png";
    //3. update the round score if the rolled number was not 1
    function rollAgain() {
      roundScore += dice[0] + dice[1];
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
      console.log(dice + " were rolled. ");
      lastDice[activePlayer] = dice[1];
    }
    if (dice[0] !== 1 && dice[1] !== 1) {
      if (dice.includes(6)) {
        if (dice[0] === dice[1] || dice[1] === lastDice[activePlayer]) {
          console.log(
            "Two " + dice[0] + " were rolled in a row. All score lost."
          );
          scores[activePlayer] = 0;
          lastDice[activePlayer] = dice[1];
          switchPlayer();
        } else {
          rollAgain();
        }
      } else {
        rollAgain();
      }
    } else {
      console.log(dice + " were rolled. Player loses current score.");
      lastDice[activePlayer] = dice[1];
      switchPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //1.add roundScore to scores
    scores[activePlayer] += roundScore;
    //2.display the socre
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    //3.check winner
    if (scores[activePlayer] >= scoreToWin) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice1").style.display = "none";
      document.querySelector(".btn-hold").style.display = "none";
      document.querySelector(".btn-roll").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false; //change state
    } else {
      //4.reset roundScore, display, switch player
      switchPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", init);
