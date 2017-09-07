$(document).ready(function() { 

var gameRunning = false;
questionsArray = ["What did Kramer write a book about?", "What item did Jerry accidentally agree to promote on live TV?", "What is Elaine notoriously bad at?", "What food item did Newman picture Kramer to be?", "What snack did Jerry and Kramer accidentally drop inside the patient in the operating room?", "Newman is almost evicted from his apartment for doing what?", "What food is George caught sloppily eating on live TV?", "George purchased what arcade game to save his high score?", "What did George's fiance die from?", "What group gift did George hide from the gang in his apartment for as long as he could?"];
choicesArray = [ ["Golf", "Cigars", "Coffee Tables", "Bagels"], ["A leather jacket", "A puffy shirt", "Sunglasses", "A fancy watch"], ["Singing", "Dancing", "Painting", "Checkers"], ["Ham", "Turkey", "Pizza", "Frozen Yogurt"],["Junior Mints", "Skittles", "Starburst", "JujyFruit"], ["Skipping out on rent", "Throwing a huge millenium party", "Stealing mail", "Reversing his peephole"], ["Hotdogs", "Nachos", "An icecream sundae", "Calzone"], ["Pacman", "Frogger", "Space Invaders", "Donkey Kong"], ["Cheap envelopes", "Car accident", "Cabin fire", "Lightning"], ["Big screen TV", "Stereo System", "Massage chair", "Icecream maker"] ];
correctAnswers = [" Coffee Tables", " A puffy shirt", " Dancing", " Turkey", " Junior Mints", " Reversing his peephole", " An icecream sundae", " Frogger", " Cheap envelopes", " Massage chair"];
questionCounter = 0;
var number = 25;
var userCorrect = 0;
var userIncorrect = 0;


$("#start").on("click", function() { 
	startTimer();
	startGame();

});


$("body").on("click", ".choice", function() {
	console.log(questionCounter);
	selectedAnswer = $(this).text();

	console.log("User chose: ", selectedAnswer);
	console.log("correct answer: ", correctAnswers[questionCounter]);

	if(selectedAnswer === correctAnswers[questionCounter]){
		win();
	}
	else {
		loss();
	}

});


//Add in a function that delays the next question from displaying. 
function win() {
	$("#questions").html("That's correct!");
	userCorrect++;
	questionCounter++;
	if(questionCounter < 10) {
		setTimeout(startGame, 1000 * 10); // on delay
		stop();
	}
	else { 	//if there aren't any more questions in the questionsArray, display a final screen. 
		finalScreen();
		stop();
	}
}

function loss() {
	$("#questions").html("That's wrong! The right answer was " + correctAnswers[questionCounter]);
	userIncorrect++;
	questionCounter++;
	stop(); //stop timer
	if(questionCounter < 10) {
		setTimeout(startGame, 1000 * 10); // on delay
		stop();
	}
	else { 	//if there aren't any more questions in the questionsArray, display a final screen. 
		finalScreen();
		stop();
	}
}

function lossTimeout() { //generate a loss from time running out. 
	$("#questions").html("Time's up! The correct answer was " + correctAnswers[questionCounter]);
	userIncorrect++;
	questionCounter++;
	stop();
	if(questionCounter < 10) {
		setTimeout(startGame, 1000 * 10); // on delay
		stop();
	}
	else { 	//if there aren't any more questions in the questionsArray, display a final screen. 
		finalScreen();
		stop();
	}
}

//Add in a reset function. 


// Timer functions

function startTimer() { 
	if(!gameRunning) { 
		$(".seconds-left").html("<h2>Seconds remaining: </h2>" + 25);
		number=25;
		intervalId = setInterval(decrement, 1000);
		gameRunning = true;
	}
}


function decrement() {
	number--;
	$(".seconds-left").html("<h2>Seconds remaining: </h2>" + number);
	if(number === 0) {
		lossTimeout();
	}
}


function stop() { 
	clearInterval(intervalId);
	gameRunning = false;
}

function finalScreen() { 
	$("#questions").html("Here's how you did!</br>" + "<p>Number of answers correct: " + userCorrect + "</p><p>Number of answers incorrect " + userIncorrect + "</p>");
	var startOverButton = $("<button>Start Over</button>");
	$("#start-over").html(startOverButton);
	stop();
	reset();
}

function reset() {
	$("#start-over").on("click", function() {
		number = 25;
		userCorrect = 0;
		userIncorrect = 0;
		questionCounter = 0;
		startGame();
		$("#start-over").empty();
	});
}


// Start Game function

function startGame() {
	startTimer();
	$(".start").empty();
	$("#questions").html(questionsArray[questionCounter] + "<p class='choice'> " + choicesArray[questionCounter][0] + "</p> <p class='choice'> " + choicesArray[questionCounter][1] + "</p> <p class='choice'> " + choicesArray[questionCounter][2] + "</p> <p class='choice'> " + choicesArray[questionCounter][3]);
}


}); // end document.ready function