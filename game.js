const buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var chosenColor = $(this).attr("id");
  userClickPattern.push(chosenColor);

  playSound(chosenColor);
  animatePress(chosenColor);
  checkAnswer(userClickPattern.length - 1);
});

function checkAnswer(currLevel) {
  if (userClickPattern[currLevel] === gamePattern[currLevel]) {
    if (userClickPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 100);
      userClickPattern = [];
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 300);
    $("#level-title").text("Press A Key to Start");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = 0;
  started = false;
}

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
