// Fetch all the things
var newGameEl = document.getElementsByClassName("intro")
var newGameButtons = document.getElementsByClassName("newgame")
var scoreBoardEl = document.getElementsByClassName("scoring")
var mask = document.getElementById("mask")
var img1 = document.getElementById("p1")
var img2 = document.getElementById("p2")
var buttons = document.getElementsByClassName("button") // Fetch all the elements with a class of 'button'
var scores = document.getElementsByClassName("score") // Fetch all the elements with a class of 'score'
var playerOneTotalEl = document.getElementById("player1score") // Get the current player 1 score element
var playerTwoTotalEl = document.getElementById("player2score") // Get the current player 2 score element
var playerOneScores = []
var playerTwoScores = []
var targetScore
var custom = document.getElementById("custom")
var customScore = document.getElementById("customScore")


// Function that controls the game (re)starts
function newGame(action) { // Show the start of a new game or reset everything to start again
    if (action === 'start') { // If starting a new game
        newGameEl[0].classList.add("hidden"); // Hide the intro screen
        scoreBoardEl[0].classList.remove("hidden"); // Show the scoreboard
        document.body.classList.remove("introLayout"); // Remove the 'introlayout' class from the body tag
    } else { // If resetting 
        newGameEl[0].classList.remove("hidden"); // Show the intro screen
        scoreBoardEl[0].classList.add("hidden"); // Hide the scoreboard
        document.body.classList.add("introLayout"); // Add the 'introLayout' class to the body tag
        playerOneTotalEl.innerHTML = 0; // Reset the score element for Player 1
        playerTwoTotalEl.innerHTML = 0; // Reset the score element for Player 2
        playerOneScores = []; // Reset the score array for Player 1
        playerTwoScores = []; // Reset the score array for Player 1
        custom.classList.add("hidden"); // Hide the 'custom target' div
        customScore.value = ''; // Reset the custom score value
    }
}

// Functions to add up and calculate the scores
function sum(accumulator, currentValue) {
    return accumulator + currentValue;
}

function calculateScores(player, scoreChange, playerEl) {
    if (scoreChange === 'subtract') { // If this is subtracting the last score
        player.pop(); // Remove it from the array for this player
    } else { // If this is adding to the score
        player.push(scoreChange); // Push the new score to the array
    }

    var newScore = player.reduce(sum, 0); // Add the values in the player's score array (using the 'sum' function above)
    playerEl.innerHTML = newScore; // Update the score element

    if (newScore >= targetScore) { // If this wins the game
        if (playerEl.id === 'player1score') { // If the current player is Player 1
            victory(img1); // Show the Player 1 victory image
        } else { // If the current player is Player 2
            victory(img2); // Show the Player 2 victory image
        }
    }
}

// Function to show the victory pictures
function victory(playerImg) {
    playerImg.classList.remove("hidden"); // Show the player image div contents
    mask.classList.remove("hidden"); // Show the mask div
    playerImg.addEventListener('click', function() { // Bind a click event to the mask layer so it can be dismissed
        event.preventDefault();
        playerImg.classList.add("hidden"); // Hide the victory image
        mask.classList.add("hidden"); // Hide the mask
        newGame(); // Return to the new game screen
    });
}

// Settings for the 'new game' buttons
for (var i = 0; i < newGameButtons.length; i++) { // For each element with the button class
    newGameButtons[i].addEventListener('click', function() { // Bind a click event that does this stuff
        event.preventDefault(); // Stop the browser default (so it doesn't jump to the top of the page)

        var classes = this.classList // Get the list of classes used on this element

        if (classes.contains("pick")) { // If the 'Pick a custom target' button is clicked
            custom.classList.remove("hidden"); // Show the custom target field
        } else if (classes.contains("custom")) { // If the 'Let's do eeet' button is clicked
            targetScore = document.getElementById("customScore").value; // Set the target value to the entered value
            newGame('start'); // Start the game
        } else { // If the 'Classic' or 'Test match' buttons are clicked
            targetScore = this.getAttribute("data-target"); // Set the target value using the data attribute
            newGame('start'); // Start the game

        }

    });
}

for (var i = 0; i < buttons.length; i++) { // For each element with the button class
    buttons[i].addEventListener('click', function() { // Bind a click event that does this stuff
        event.preventDefault(); // Stop the browser default (so it doesn't jump to the top of the page)

        var player = this.parentNode // Fetch the clicked element's parent node (helps us figure out which player this is for)
        var scoreChange = parseInt(this.textContent) // Get the value of the clicked button and make it a number
        var classes = this.classList // Get the list of classes used on this element

        if (classes.contains("subtract")) { // If this element uses the 'subtract' class
            var value = 'subtract' // set 'value' to 'subtract'
        } else {
            var value = scoreChange // Otherwise set it to the points value
        }

        if (player.className === "player1") { // If the className of the clicked element's parent is player1
            calculateScores(playerOneScores, value, playerOneTotalEl); // Run the calculateScores function using player 1's deets     
        } else if (player.className === "player2") { //If the className of the clicked element's parent is player2
            calculateScores(playerTwoScores, value, playerTwoTotalEl); // Run the calculateScores function using player 1's deets     
        } else if (classes.contains("reset")) {
            if (confirm('Do you want to reset for a new game?')) { // Show a browser alert asking if you really want to do it
                newGame();
            } else { // If they cancel, don't do anything
                console.log('Phew!');
            }
        }
    });
}