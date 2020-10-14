// Global timer variable
var intervalTimer;
// Counter counts the number of times the function - rollDiceAction is executed in an interval of 300 ms
var count = 0;

// Adding Event listeners
document.getElementById('btn-roll-dice').addEventListener('click', rollDice);
document.getElementById('btn-roll-again').addEventListener('click', rollAgain);

// Reload page
function reload() {
  // Reload the web page
  window.location.reload(true);
}

// Roll Dice
function rollDice() {

  // Check if player names have been entered and do not match each other
  var validated = addValidatorClass();

  // If validation are correct - the Show the roll dice screen
  if (validated === true) {

    /* Show the roll dice screen and randomly roll the dice */

    // Adjust the #main <div> at the top inside the <main> to have the dice-container-dice style
    document.querySelector('.dice-container-player').classList.toggle('dice-container-dice');
    document.querySelector('.dice-container-player').classList.toggle('dice-container-player');

    // Hide the player information <div>
    document.getElementById("players").classList.toggle('visible');
    document.getElementById("players").classList.toggle('invisible');

    // Diplay the dice <div>
    document.getElementById("play-dice").classList.toggle('visible');
    document.getElementById("play-dice").classList.toggle('invisible');

    // Update the <p> elements displayig Player 1 and Player 2 to the player names entered
    document.getElementById("player-1-name").textContent = document.getElementById('player1').value;
    document.getElementById("player-2-name").textContent = document.getElementById('player2').value;

    // Execute the rollDiceAction function after every 300 ms
    intervalTimer = setInterval(rollDiceAction, 300);

    return;
  }
}

// Roll again
function rollAgain() {
  // Execute the rollDiceAction function after every 300 ms
  count = 0;
  // Reset the heading
  document.getElementById('heading').textContent = "Dice Challenge";

  // Remove flag from player 1 if it exists.
  var lastChild = document.getElementById("player-1-name").lastElementChild;
  if (lastChild !== null && lastChild.getAttribute('id') !== null) {
    document.getElementById("player-1-name").removeChild(lastChild);
  }
  // Remove flag from player 2 if it exists.
  lastChild = document.getElementById("player-2-name").lastElementChild;
  if (lastChild !== null && lastChild.getAttribute('id') !== null) {
    document.getElementById("player-2-name").removeChild(lastChild);
  }
  // Start the dice animation
  intervalTimer = setInterval(rollDiceAction, 300);

  // Disable the button while the dice is rolling
  document.getElementById('btn-roll-again').disabled = true;

  return;
}



function rollDiceAction() {

  // Randomly generate numbers 1 to 6 for dice 1 and also dice 2
  var random = Math.random();
  var dice1 = Math.floor(random * 6) + 1;
  random = Math.random();
  var dice2 = Math.floor(random * 6) + 1;

  // Set the image source for dice 1 and dice 2
  document.getElementById('img-dice-1').setAttribute('src', 'images/dice' + dice1 + '.png');
  document.getElementById('img-dice-2').setAttribute('src', 'images/dice' + dice2 + '.png');

  // Increment the function executon counter
  count += 1;

  if (count === 12) {
    // Stop the timer being executed at the specified interval
    clearInterval(intervalTimer);
    // Enable the dice roll again button
    document.getElementById('btn-roll-again').disabled = false;
    // Set the winner result
    var winner = "";
    if (dice1 > dice2) {
      // Format player name
      winner = document.getElementById('player1').value;
      winner = winner.toLocaleUpperCase();

      // Add winner player name to heading
      var tag = document.createElement('span');
      tag.classList.add('winner');
      tag.appendChild(document.createTextNode(winner));
      document.getElementById('heading').textContent = "";
      document.getElementById('heading').appendChild(tag);
      document.getElementById('heading').appendChild(document.createTextNode(" wins!"));

      // Add flag to player 1
      var imgTag = document.createElement("img");
      imgTag.setAttribute("id", "winner-flag");
      imgTag.setAttribute("src", "images/flag.png");
      imgTag.classList.add('img-flag');
      document.getElementById("player-1-name").appendChild(imgTag);

      // Remove flag from player 2 if it exists.
      var lastChild = document.getElementById("player-2-name").lastElementChild;
      if (lastChild !== null && lastChild.getAttribute('id') !== null) {
        document.getElementById("player-2-name").removeChild(lastChild);
      }

      addClassToElement(document.getElementById('div-roll-again'), 'invisible', 'visible');

    } else if (dice2 > dice1) {

      winner = document.getElementById('player2').value;
      winner = winner.toLocaleUpperCase();

      // Add winner player name to heading
      var tag = document.createElement('span');
      tag.classList.add('winner');
      tag.appendChild(document.createTextNode(winner));
      document.getElementById('heading').textContent = "";
      document.getElementById('heading').appendChild(tag);
      document.getElementById('heading').appendChild(document.createTextNode(" wins!"));

      // Add flag to player 2
      var imgTag = document.createElement("img");
      imgTag.setAttribute("id", "winner-flag");
      imgTag.setAttribute("src", "images/flag.png");
      imgTag.classList.add('img-flag');
      document.getElementById("player-2-name").appendChild(imgTag);

      // Remove flag from player 1 if it exists.
      var lastChild = document.getElementById("player-1-name").lastElementChild;
      if (lastChild !== null && lastChild.getAttribute('id') !== null) {
        document.getElementById("player-1-name").removeChild(lastChild);
      }

      addClassToElement(document.getElementById('div-roll-again'), 'invisible', 'visible');
    } else {

      // Add DRAW to heading
      document.getElementById('heading').textContent = "It is a ";
      var tag = document.createElement('span');
      tag.classList.add('draw');
      tag.appendChild(document.createTextNode("DRAW!"));
      document.getElementById('heading').appendChild(tag);

      // Remove flag from player 1 if it exists.
      var lastChild = document.getElementById("player-1-name").lastElementChild;
      if (lastChild !== null && lastChild.getAttribute('id') !== null) {
        document.getElementById("player-1-name").removeChild(lastChild);
      }
      // Remove flag from player 2 if it exists.
      lastChild = document.getElementById("player-2-name").lastElementChild;
      if (lastChild !== null && lastChild.getAttribute('id') !== null) {
        document.getElementById("player-2-name").removeChild(lastChild);
      }

      // Display the Roll Again button
      addClassToElement(document.getElementById('div-roll-again'), 'invisible', 'visible');
    }

  }

  return;
}

// Validating user input
function addValidatorClass() {

  // Get the text input elements for player1 and player2
  var player1Input = document.getElementById('player1');
  var player2Input = document.getElementById('player2');

  // Validation flags - one for each text input control
  var player1InputValid = true;
  var player2InputValid = true;

  // If input text for player1 is empty - add the is-invalid class to the input control
  if (player1Input.value.trim() === "") {
    // Change the player1 class to have is-invalid class and remove is-valid class if present
    addClassToElement(player1Input, "is-valid", "is-invalid");
    // Change the invalid-feedback message for player 1
    document.getElementById('player1-invalid-msg').textContent = "Player 1 name cannot be empty.";
    player1InputValid = false;
  } else {
    // Change the player1 class to have is-valid class and remove is-invalid class if present
    addClassToElement(player1Input, "is-invalid", "is-valid");
    player1InputValid = true;
  }

  // If input text for player2 is empty - add the is-invalid class to the input control
  if (player2Input.value.trim() === "") {
    // Change the player2 class to have is-invalid class and remove is-valid class if present
    addClassToElement(player2Input, "is-valid", "is-invalid");
    // Change the invalid-feedback message for player 2
    document.getElementById('player2-invalid-msg').textContent = "Player 2 name cannot be empty.";
    player2InputValid = false;
  } else {
    // Change the player2 class to have is-valid class and remove is-invalid class if present
    addClassToElement(player2Input, "is-invalid", "is-valid");
    player2InputValid = true;
  }

  if ((player1Input.value.trim() !== "") && (player2Input.value.trim() !== "")) {
    if (player1Input.value.trim().toUpperCase() === player2Input.value.trim().toUpperCase()) {

      // Change the player1 class to have is-invalid class and remove isvalid class if present
      addClassToElement(player1Input, "is-valid", "is-invalid");
      document.getElementById('player1-invalid-msg').textContent = "Player 1 name is same as Player 2 name.";
      player1InputValid = false;

      // Change the player2 class to have is-invalid class and remove isvalid class if present
      addClassToElement(player2Input, "is-valid", "is-invalid");
      document.getElementById('player2-invalid-msg').textContent = "Player 2 name is same as Player 1 name.";
      player2InputValid = false;
    }
  }

  // Any any control has validation false - return false
  if ((player1InputValid === true) && (player2InputValid === true)) {
    return true;
  } else {
    return false;
  }

}

// Function to add a class and remove a class simulltaneously from an Element Node object
function addClassToElement(elementObject, removeClass, addClass) {

  // Validate input
  if (typeof elementObject === 'undefined' || typeof elementObject === null) {
    return false;
  }

  if (typeof removeClass === 'undefined' || typeof removeClass === null || removeClass.trim() === '') {
    return false;
  }

  if (typeof addClass === 'undefined' || typeof addClass === null || addClass.trim() === '') {
    return false;
  }

  // If input text for player1 has class is-valid then remove the class
  if (elementObject.classList.contains(removeClass)) {
    elementObject.classList.remove(removeClass);
  }
  // If elementObject DOES NOT have the class addClass then add the class
  if (elementObject.classList.contains(addClass) === false) {
    elementObject.classList.add(addClass);
  }

  return true;
}
