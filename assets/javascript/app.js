$(document).ready(function() { 

// Global variables
// Store all questions in an array
// Store all choices in each of their own arrays, stored in a choicesArray
// Store correct answers in another array
// Store gifs in an array
// Create a counter variable to count which question the game is on
var gameRunning = false;
var questionsArray = ["What did Kramer write a book about?", "What item did Jerry accidentally agree </br> to promote on live TV?", "What is Elaine notoriously bad at?", "What food item did Newman picture Kramer to be?", "What snack did Jerry and Kramer accidentally drop </br> inside the patient in the operating room?", "Newman is almost evicted from his apartment for doing what?", "George purchased what arcade game to save his high score?", "What did George's fiance die from?", "What group gift did George hide from the gang </br> in his apartment for as long as he could?", "Who is the Co-creator of Seinfeld along with Jerry Seinfeld himself?"];
var choicesArray = [ ["Golf", "Cigars", "Coffee Tables", "Bagels"], ["A leather jacket", "A puffy shirt", "Sunglasses", "A fancy watch"], ["Singing", "Dancing", "Painting", "Checkers"], ["Ham", "Turkey", "Pizza", "Frozen Yogurt"], ["Junior Mints", "Skittles", "Starburst", "JujyFruit"], ["Skipping out on rent", "Throwing a huge millenium party", "Stealing mail", "Reversing his peephole"], ["Pacman", "Frogger", "Space Invaders", "Donkey Kong"], ["Cheap envelopes", "Car accident", "Cabin fire", "Lightning"], ["Big screen TV", "Stereo System", "Massage chair", "Icecream maker"], ["Larry David", "David Steinberg", "Jason Alexander", "Julia Louis-Dreyfus"] ];
var correctAnswers = [" Coffee Tables", " A puffy shirt", " Dancing", " Turkey", " Junior Mints", " Reversing his peephole", " Frogger", " Cheap envelopes", " Massage chair", " Larry David"];
var gifsArray = ["assets/images/coffe-table-book.gif", "assets/images/puffy-shirt.gif", "assets/images/elaine-dancing.gif", "assets/images/kramer-turkey.gif", "assets/images/junior-mints.gif", "assets/images/peephole.gif", "assets/images/frogger.gif", "assets/images/envelopes.gif", "assets/images/massage-chair.gif", "assets/images/larry-david.gif"];
var questionCounter = 0;
var number = 25;
var userCorrect = 0;
var userIncorrect = 0;
var userUnanswered = 0;


// When user presses "start" at the beginning of the game, start the timer and the game
$("body").on("click", "#start", function() { 
	startTimer();
	startGame();
});


// Start writing trivia questions and choices out to the page by targeting the four indexes of the choicesArray
// This function will be fired again after the user selected their answer
// The question and choices that are fired are determined based on the questionCounter. (i.e. if questionCounter = 2, the third questionArray and third choicesArray gets fired)
function startGame() {
	startTimer();
	$("#start").hide(); // Hide the start button 
	$("#questions").html("<p class='text'>" + questionsArray[questionCounter] + "<p class='choice'> " + choicesArray[questionCounter][0] + "</p> <p class='choice'> " + choicesArray[questionCounter][1] + "</p> <p class='choice'> " + choicesArray[questionCounter][2] + "</p> <p class='choice'> " + choicesArray[questionCounter][3] + "</p>");
}


// User selects an answer
$("body").on("click", ".choice", function() {
	console.log(questionCounter);
	selectedAnswer = $(this).text();

	console.log("User chose: ", selectedAnswer);
	console.log("Correct answer: ", correctAnswers[questionCounter]);

	if(selectedAnswer === correctAnswers[questionCounter]){
		win();
	}
	else {
		loss();
	}

});


// Generate win function
function win() {
	$("#questions").html("<p class='text'>That's correct!</p>" + "<img class='gifs' src=" + gifsArray[questionCounter] + ">");
	console.log("Question #: " + questionCounter + " " + "User answered correctly");
	userCorrect++;
	questionCounter++;
	if(questionCounter < 10) {
	// Look to see if the question counter is less than 10, then start next question on a 7 second delay. 
		setTimeout(startGame, 1000 * 7); 
		stop();
	}
	else if(questionCounter = 10) { 	
	// Once questionCounter reaches 10, display a final screen. Delay this screen 7 seconds so that the user has a chance to see question 10's result. 
		setTimeout(finalScreen, 1000 * 7);
		stop();
	}
}


// Generate loss function
function loss() {
	$("#questions").html("<p class='text'>That's wrong! The right answer was " + correctAnswers[questionCounter] + "</p><img class='gifs' src=" + gifsArray[questionCounter] + ">");
	console.log("Question #: " + questionCounter +  " " + "User answered incorrectly");
	userIncorrect++;
	questionCounter++;
	stop(); //stop timer
	if(questionCounter < 10) {
	// Look to see if the question counter is less than 10, then start next question on a 7 second delay. 
		setTimeout(startGame, 1000 * 7); 
		stop();
	}
	else if(questionCounter = 10) {  
	// Once questionCounter reaches 10, display a final screen. Delay this screen 7 seconds so that the user has a chance to see question 10's result. 
		setTimeout(finalScreen, 1000 * 7);
		stop();
	}
}


// Increment unanswered counter due to the timer running out
function lossTimeout() { 
	$("#questions").html("<p class='text'>Time's up! The correct answer was " + correctAnswers[questionCounter] + "</p><img class='gifs' src=" + gifsArray[questionCounter] + ">");
	console.log("Question #: " + questionCounter + " " + "User ran out of time.");
	userUnanswered++;
	questionCounter++;
	stop();
	if(questionCounter < 10) {
	// Look to see if the question counter is less than 10, then start next question on a 7 second delay. 
		setTimeout(startGame, 1000 * 7); 
		stop();
	} else if(questionCounter = 10) { 
	// Once questionCounter reaches 10, display a final screen. Delay this screen 7 seconds so that the user has a chance to see question 10's result. 
		setTimeout(finalScreen, 1000 * 7);
		stop();
	}
}


// Timer functions
function startTimer() { 
	if(!gameRunning) { 
		$(".seconds-left").html("00:25");
		number=25;
		intervalId = setInterval(decrement, 1000);
		gameRunning = true;
	}
}

function decrement() {
	number--;
	$(".seconds-left").html("00:" + number);
	if(number === 0) {
		lossTimeout();
	}
}

function stop() { 
	clearInterval(intervalId);
	gameRunning = false;
}


// Final Screen 
function finalScreen() { 
	$("#questions").html("Here's how you did!</br>" + "<p>Correct Answers: " + userCorrect + "</p><p>Incorrect Answers: " + userIncorrect + "</p><p>Unanswered: " + userUnanswered + "</p");
	var startOverButton = $("<button class='start-over'>Start Over</button>");
	$("#start-over").html(startOverButton);
	stop();
	reset();
}


// Reset the game by clicking "start over" button
function reset() {
	$("#start-over").on("click", function() {
		number = 25;
		userCorrect = 0;
		userIncorrect = 0;
		userUnanswered = 0;
		questionCounter = 0;
		startGame();
		$("#start-over").empty();
	});
}

}); // end document.ready function