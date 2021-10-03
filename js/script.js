///////////////////////////////////////////////////////
const cells = $(".btn");
const strategy = document.querySelector("#strategy");
const restart = document.querySelector("#restart");
const text = document.querySelector(".h4");

let spaces = [];

const playerOne = "O";
const playerTwo = "X";
let currentPlayer = playerOne;

$(document).ready(function () {
  // on keypress game start function - fix later:
  // $(document).on("keypress", function () {
  //   $("h4").text("GO GO GO");
  //   // startGame();
  //   started = true;
  //   console.log("array: " + spaces);
  // });

  //function startGame() {}

  $("#restart").on("click", function () {
    started = false;
    spaces = [];
    $("h4").text("a battle of wits...");
    $(".btn").html(":|");

    console.log("testing restart");
  });

  $(".btn").click(function () {
    let chosenCell = $(this).attr("id");
    $("#" + chosenCell)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);

    clicked(chosenCell);
  });

  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".wav");
    audio.play();
  }

  function clicked(cellID) {
    // if cellID in spaces array is empty, add player token:
    if (!spaces[cellID]) {
      playSound("blip");
      $("#" + cellID).addClass("pressed");
      setTimeout(function () {
        $("#" + cellID).removeClass("pressed");
      }, 200);
      spaces[cellID] = currentPlayer;
      console.log(spaces[cellID] + " " + cellID);
      $("#" + cellID).html(`${currentPlayer}`);
      console.log(spaces);

      if (winner()) {
        $("h4").text(`${currentPlayer} has won!`);
        // startOver();
        return;
      }

      // if (playerDraw()) {
      //   return;
      // }
      // player switch - ternary to flick between:
      currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    } else {
      playSound("error");

      // shake not working for div - will use for pics inside though:
      $("#" + cellID).addClass("error");
      setTimeout(function () {
        $("#" + cellID).removeClass("error");
      }, 200);
    }
  }

  function winner() {
    // Anchor at 0 - top, diagonal left, left
    // 0, 1 and 2 - top line
    if (spaces[0] === currentPlayer) {
      if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
        console.log("top line winner");
        return true;
      }
      // 0, 3 and 6 - left
      if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
        $("h4").text(`${currentPlayer} has won!`);
        console.log("left side winner");
        return true;
      }
      // 0, 4 and 8 - diagonal top left to bottom right
      if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
        $("h4").text(`${currentPlayer} has won!`);
        console.log("diagonal top left winner");
        return true;
      }
    }
    // Anchor at 4:
    // 2, 4 and 6 - diagonal top right to bottom left:
    if (spaces[4] === currentPlayer) {
      if (spaces[2] === currentPlayer && spaces[6] === currentPlayer) {
        $("h4").text(`${currentPlayer} has won!`);
        console.log("diagonal top right winner");
        return true;
      }

      // 1, 4 and 7 - middle line vertical:
      if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
        $("h4").text(`${currentPlayer} has won!`);
        console.log("middle line vertical winner");
        return true;
      }

      // 3, 4 and 5 - middle line horizontal:
      if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
        $("h4").text(`${currentPlayer} has won!`);
        console.log("middle line horizontal winner");
        return true;
      }
    }

    // Anchor at 8:
    // 2, 5 and 8 - right:
    if (spaces[8] === currentPlayer) {
      if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
        $("h4").text(`${currentPlayer} has won!`);
        console.log("right side winner");
        return true;
      }

      // 6, 7 and 8 - bottom line:
      if (spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
        $("h4").text(`${currentPlayer} has won!`);
        console.log("bottom line winner");
        return true;
      }
    }
  }
});
