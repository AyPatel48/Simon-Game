//Author : Ayush Patel
//Github : AyPatel48

//Variable declaration
var userClickedPattern = [];
var gamePattern = [];
var randomChosenColour = "";
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
gameStarted = false;

//Event listeners

    //1. When the player clicks on a button
    $("[type='button']").on("click", onButtonClick);

    //2. When a key is pressed indicating the start or restart of the game
    $(document).keydown(function (event) {
    // Check if the pressed key is not F5
    if (event.key !== "F5") {
        // Only start the game if it hasn't already started
        if (!gameStarted) {
        gameStarted = true;
        nextSequence();
        }
    }
    });

//Gets the random next sequence of the game
function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //Select the button with the same id as the randomChosenColour
  $("#" + randomChosenColour)
    .fadeOut(500)
    .fadeIn(500);
  playSound(randomChosenColour);
}

//Plays sound corresponding to the colour of the button clicked or to the event when game ends.
function playSound(randomChosenColour = "wrong") {
  var audio = new Audio("./sounds/" + randomChosenColour + ".mp3");
  audio.autoplay = true;
  audio.play();
}

//What happens when a button is clicked
function onButtonClick(event) {
  if (gameStarted) {
    var userChosenColour = $(event.target).attr("id").replace("#", "");

    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkPlayerInput(userClickedPattern.length - 1);
  } else {
    wrongInput();
  }
}

//Check players input i.e., the button clicked by the player is correct as per the gamePattern sequence or not.
function checkPlayerInput(index) {
  //If yes, then...
  if (userClickedPattern[index] === gamePattern[index]) {
    if (index === gamePattern.length - 1) {
      userClickedPattern = [];
      nextSequence();
    }
  }
  //If not, then...
  else {
    wrongInput();
  }
}

//Handles the game incase of a wrong player input i.e, not matching the gamePattern sequence
function wrongInput() {
  $("#level-title").text("Game Over, Press Any Key to Restart");
  animatePress();
  playSound();
  startOver();
}

//Resets the variables indicating the restart of the game
function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

//Animates the buttons when clicked by the player or when
function animatePress(currentColour = "body") {
  var effect = "game-over";
  var selector = currentColour;

  if (currentColour != "body") {
    selector = "#" + currentColour;
    effect = "pressed";
  }
  $(selector).addClass(effect);
  setTimeout(function () {
    $(selector).removeClass(effect);
  }, 100);
}
