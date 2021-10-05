///////////////////////////////////////////////////////
const cells = $(".btn");

let turnCount = 0;
let spaces = [];
let winLogger = [];
let pickedBird = "";
let pickedBread = "";
var playerOne = "";
var playerTwo = "X";
let currentPlayer = "";

// bird character selection:
const birdimages = new Array(); // create new array to preload images
birdimages[0] = new Image(); // create new instance of image object
birdimages[0].src = "img/bird1.png"; // set image src property to image path, preloading image in the process
birdimages[1] = new Image();
birdimages[1].src = "img/bird2.png";
// birdimages[2] = new Image();
// birdimages[2].src = "thirdcar.gif";

$(document).ready(function () {
  $(".score").addClass("hide");
  $(".restart-button").addClass("hide");
  $("h5").addClass("hide");

  let i = 0;
  $(".bird").attr("src", birdimages[0].src);

  $("#arrowleftbird").on("click", function () {
    if (i > 0 && i <= birdimages.length - 1) {
      i--;
      pickedBird = birdimages[i].src;
      $(".bird").attr("src", birdimages[i].src);
      console.log("picked bird: " + pickedBird);
      playerOne = pickedBird;
      console.log("current: " + currentPlayer);
      console.log(playerOne);
    }
  });

  $("#arrowrightbird").on("click", function () {
    if (i >= 0 && i < birdimages.length - 1) {
      i++;
      pickedBird = birdimages[i].src;
      $(".bird").attr("src", birdimages[i].src);
      console.log("picked bird: " + pickedBird);
      playerOne = pickedBird;
      console.log(playerOne);
    }
  });

  // $("#arrowleft").on("click", function () {
  //   for (let i = 0; i < birdimages.length; i--) {
  //     $(".bird").attr("src", birdimages[i].src);
  //     pickedBird = birdimages[i].src;
  //     console.log("picked bird: " + pickedBird);
  //   }
  // });
  // $("#arrowright").on("click", function () {
  //   for (let i = 0; i < birdimages.length; i++) {
  //     $(".bird").attr("src", birdimages[i].src);
  //     pickedBird = birdimages[i].src;
  //     console.log("picked bird: " + pickedBird);
  //   }
  // });

  // var playerOne = pickedBird;
  // var playerTwo = "";
  // let currentPlayer = playerOne;
  // console.log("current: " + currentPlayer);

  // console.log(playerOne);

  // on keypress game start function:
  $(document).on("keypress", function () {
    currentPlayer = playerOne;
    turnCount = 0;
    spaces = [];
    // let playerOne = birdimages[0].src;
    //currentPlayer = playerOne;
    $(".btn").html("🍞");
    $(".game-box").removeClass("hide");
    $("h5").removeClass("hide");
    // $(".restart-button").removeClass("hide");
    $(".splash").addClass("hide");
  });

  // $("#restart").on("click", function () {
  //   started = false;
  //   spaces = [];
  //   turnCount = 0;
  //   $(".btn").html("🥚");
  //   restartGame();
  //   console.log("restarting");
  // });

  // TODO: this
  ///////// somehow have to put this picked bird src into the cell html:

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

      $("#" + cellID).html("<img src=" + currentPlayer + ">");
      // $("#" + cellID).html(`${currentPlayer}`);
      turnCount++;

      console.log("turnCount:" + turnCount);

      if (winner()) {
        $("h4").html("<img src=" + currentPlayer + "> has won!");
        // TODO
        ///////////// This needs to kill .btn function!!
        stopGame();
        return;
      } else if (turnCount === 9 && !winner()) {
        $("h4").text(`Draw`);
        stopGame();
        return;
      }

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

  function stopGame() {
    $(".picker").addClass("hide");
    setTimeout(function () {
      $(".game-box").addClass("hide");
    }, 700);

    setTimeout(function () {
      $(".splash").removeClass("hide");
    }, 700);
    let playerOneWins = winLogger.filter((word) => word === "O");
    let playerTwoWins = winLogger.filter((word) => word === "X");
    $(".playerOne").text(`Player O: ${playerOneWins.length}`);
    $(".playerTwo").text(`Player X: ${playerTwoWins.length}`);
    console.log("win log: " + playerOneWins.toString() + ", " + playerTwoWins.toString());
  }

  function winner() {
    // Anchor at 0 - top, diagonal left, left
    // 0, 1 and 2 - top line
    if (spaces[0] === currentPlayer) {
      if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
        console.log("top line winner");
        winLogger.push(currentPlayer);
        return true;
      }
      // 0, 3 and 6 - left
      if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
        $("h4").text(`${currentPlayer} has won!`);
        console.log("left side winner");
        winLogger.push(currentPlayer);
        return true;
      }
      // 0, 4 and 8 - diagonal top left to bottom right
      if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
        $("h4").text(`${currentPlayer} has won!`);
        console.log("diagonal top left winner");
        winLogger.push(currentPlayer);
        return true;
      }
    }

    // Anchor at 8:
    // 2, 5 and 8 - right:
    if (spaces[8] === currentPlayer) {
      if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
        $("h4").text(`${currentPlayer} has won!`);
        console.log("right side winner");
        winLogger.push(currentPlayer);
        return true;
      }

      // 6, 7 and 8 - bottom line:
      if (spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
        $("h4").text(`${currentPlayer} has won!`);
        console.log("bottom line winner");
        winLogger.push(currentPlayer);
        return true;
      }
    }

    // Anchor at 4:
    // 2, 4 and 6 - diagonal top right to bottom left:
    if (spaces[4] === currentPlayer) {
      if (spaces[2] === currentPlayer && spaces[6] === currentPlayer) {
        $("h4").text(`${currentPlayer} has won!`);
        console.log("diagonal top right winner");
        winLogger.push(currentPlayer);

        return true;
      }

      // 1, 4 and 7 - middle line vertical:
      if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
        $("h4").text(`${currentPlayer} has won!`);
        console.log("middle line vertical winner");
        winLogger.push(currentPlayer);

        return true;
      }

      // 3, 4 and 5 - middle line horizontal:
      if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
        $("h4").text(`${currentPlayer} has won!`);
        console.log("middle line horizontal winner");
        winLogger.push(currentPlayer);

        return true;
      }
    }
  }
});
