///////////////////////////////////////////////////////
$(document).on("keypress", function () {
  $("h4").text("GO GO GO");
  // startGame();
  started = true;
});

function startGame() {}

$(".btn").click(function () {
  let chosenCell = $(this).attr("id");
  $("#" + chosenCell)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound("blip");
  pressMe(chosenCell);
  console.log(chosenCell);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".wav");
  audio.play();
}

function pressMe(chosenCell) {
  $("#" + chosenCell).addClass("pressed");
  setTimeout(function () {
    $("#" + chosenCell).removeClass("pressed");
  }, 200);
}

function startOver() {
  started = false;
}
