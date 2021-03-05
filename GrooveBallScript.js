var buttons = document.getElementsByClassName("button") // Fetch all the elements with a class of 'button'
var scores = document.getElementsByClassName("score") // Fetch all the elements with a class of 'score'
var playerOneTotalEl = document.getElementById("player1score") // Get the current player 1 score element
var playerTwoTotalEl = document.getElementById("player2score") // Get the current player 2 score element
var playerOneScores = []
var playerTwoScores = []

function sum(accumulator, currentValue) {
    return accumulator + currentValue;
}

function calculateScores(player, scoreChange, playerEl) {
    if (scoreChange === 'subtract') { // If this is subtracting the last score
        player.pop(); // Remove it from the array for this player
    } else { // If this is adding to the score
        player.push(scoreChange); // Push the new score to the array
    }
    console.log(player);
    playerEl.innerHTML = player.reduce(sum, 0); // Update the score
}

for (var i = 0; i < buttons.length; i++) { // For each element with the button class
    buttons[i].addEventListener('click', function() { // Bind a click event that does this stuff
        event.preventDefault(); // Stop the browser default (so it doesn't jump to the top of the page)

        var player = this.parentNode // Fetch the clicked element's parent node (helps us figure out which player this is for)
        var scoreChange = parseInt(this.textContent) // Get the value of the clicked button and make it a number
        var classes = this.classList // Get the list of classes used on this element

        if (classes.contains("subtract")){ // If this element uses the 'subtract' class
            var value = 'subtract' // set 'value' to 'subtract'
        } else {
            var value = scoreChange // Otherwise set it to the points value
        }

        if (player.className === "player1") { // If the className of the clicked element's parent is player1
            calculateScores(playerOneScores, value, playerOneTotalEl); // Run the calculateScores function using player 1's deets     
        } else if (player.className === "player2") { //If the className of the clicked element's parent is player2
            calculateScores(playerTwoScores, value, playerTwoTotalEl); // Run the calculateScores function using player 1's deets     
        } else if (classes.contains("reset")){
            if (confirm('Do you want to reset for a new game?')) { // Show a browser alert asking if you really want to do it
                // Reset the scores and the score arrays
                playerOneTotalEl.innerHTML = 0;
                playerTwoTotalEl.innerHTML = 0;
                playerOneScores = [];
                playerTwoScores = [];
            } else { // If they cancel, don't do anything
                console.log('Phew!');
            }
        }
    });
}