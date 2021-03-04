var buttons = document.getElementsByClassName("button"), // Fetch all the elements with a class of 'button'
	scores = document.getElementsByClassName("score"), // Fetch all the elements with a class of 'score'
	player1score = document.getElementById("player1score"), // Get the current player 1 score element
	player2score = document.getElementById("player2score"); // Get the current player 2 score element

function calculateScores(player, scoreChange){
	currentScore = parseInt(player.textContent); // Fetch the text content of the current players score and make it a number
    newScore = currentScore + scoreChange; // Add the current score to the new score
    console.log(player); // Show us in the console for debugging
    player.innerHTML = newScore; // Replace the old score with the new one
}

for (var i = 0; i < buttons.length; i++) { // For each element with the button class
    buttons[i].addEventListener('click', function() { // Bind a click event that does this stuff
    	event.preventDefault(); // Stop the browser default (so it doesn't jump to the top of the page)

    	var player = this.parentNode, // Fetch the clicked element's parent node (helps us figure out which player this is for)
    		scoreChange = parseInt(this.textContent); // Get the value of the clicked button and make it a number

    	console.log(scoreChange); // Show us what score value has just been clicked

    	if (player.className === "player1"){ // If the className of the clicked element's parent is player1
    		calculateScores(player1score, scoreChange); // Run the calculateScores function using player 1's deets
    	} else if (player.className === "player2"){ //If the className of the clicked element's parent is player2
    		calculateScores(player2score, scoreChange); // Run the calculateScores function using player 2's deets
    	}
	});
}

for (var i = 0; i < scores.length; i++) { // For each element with the button class
    scores[i].addEventListener('click', function() { // Bind a click event that does this stuff
    	event.preventDefault(); // Stop the browser default (so it doesn't jump to the top of the page)
    	if (confirm('Are you sure you want to do that?')) { // Show a browser alert asking if you really want to do it
			  this.innerHTML = 0;
		} else { // If they cancel, don't do anything
			  console.log('Phew!');
		}
    });
}