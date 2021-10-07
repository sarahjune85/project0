///////////////////////////////////////////////////////
// Globals:
let turnCount = 0;
let spaces = [];
let winLogger = [];
let playerOne = "";
let playerTwo = "";
let currentPlayer = "";

// bird character selection - image src array:
const birdimages = [];
for (let i = 0; i < 5; i++) {
  birdimages[i] = new Image().src = `img/bird${i + 1}.png`;
}

// bread character selection - image src array:
const breadimages = [];
for (let i = 0; i < 5; i++) {
  breadimages[i] = new Image().src = `img/bread${i + 1}.png`;
}

// On page load - initialise splash screen and character select:
$(document).ready(function () {
  startGame();

  function startGame() {
    $(".score").hide();
    $(".game-box").hide();
    $(".splash").show();
    $(".reset-button").hide();

    // bird character selection assigned to playerOne - default is position 0.
    let i = 0;
    playerOne = birdimages[0];
    $(".bird").attr({ src: birdimages[i], width: 90 });

    $("#arrowleftbird").on("click", function () {
      if (i > 0 && i <= birdimages.length - 1) {
        i--;
        playerOne = birdimages[i];
        $(".bird").attr({ src: birdimages[i], width: 90 });
      }
    });

    $("#arrowrightbird").on("click", function () {
      if (i >= 0 && i < birdimages.length - 1) {
        i++;
        playerOne = birdimages[i];
        $(".bird").attr({ src: birdimages[i], width: 90 });
      }
    });

    // bread character selection assigned to playerTwo:
    let j = 0;
    playerTwo = breadimages[0];
    $(".bread").attr({ src: breadimages[j], width: 90 });

    $("#arrowleftbread").on("click", function () {
      if (j > 0 && j <= breadimages.length - 1) {
        j--;
        playerTwo = breadimages[j];
        $(".bread").attr({ src: breadimages[j], width: 90 });
      }
    });

    $("#arrowrightbread").on("click", function () {
      if (j >= 0 && j < breadimages.length - 1) {
        j++;
        playerTwo = breadimages[j];
        $(".bread").attr({ src: breadimages[j], width: 90 });
      }
    });
  }

  // reset button - takes game back to character select, clears wins:
  $(".reset-button").on("click", function () {
    startGame();
    winLogger = [];
    $("h4").text("Select your fighter:");
    $(".picker").show();
    $(".scorebox").hide();
    $("p").show();
    $(".start-button").css({ position: "relative", top: "26%", right: "0" });
  });

  // On keypress - game start/restart. clears variables/splash:
  $(document).on("keypress", function () {
    currentPlayer = playerOne;
    turnCount = 0;
    spaces = [];
    $(".btn").html(" ");
    $(".game-box").show();
    $("h5").hide();
    $(".splash").hide();
    $("p").hide();
    $(".score").show();
    $(".btn").css("pointer-events", "auto");
  });

  // start/restart button - same function as keypress:
  $(".start-button").click(function () {
    currentPlayer = playerOne;
    turnCount = 0;
    spaces = [];
    $(".btn").html(" ");
    $(".game-box").show();
    $("h5").hide();
    $(".splash").hide();
    $("p").hide();
    $(".score").show();
    $(".btn").css("pointer-events", "auto");
  });

  // Button click - animates, passes cell to clicked func:
  $(".btn").click(function () {
    let chosenCell = $(this).attr("id");
    $("#" + chosenCell)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
    clicked(chosenCell);
  });

  // audio playing function:
  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".wav");
    audio.play();
  }

  function clicked(cellID) {
    // if cellID in spaces array is empty, add player token:
    if (!spaces[cellID]) {
      playSound("tap");
      $("#" + cellID).addClass("pressed");
      setTimeout(function () {
        $("#" + cellID).removeClass("pressed");
      }, 200);
      spaces[cellID] = currentPlayer;

      $("#" + cellID).html("<img src=" + currentPlayer + " width=70>");
      turnCount++;

      if (winner()) {
        playSound("bell");
        $("h4").html("<img src=" + currentPlayer + " width=70> has won!");
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
    }
  }

  function stopGame() {
    $(".reset-button").show();
    // board button killer:
    $(".btn").css("pointer-events", "none");
    $(".picker").hide();
    $(".scorebox").show();
    $("h5").show();
    $("h5").html("Press any key to restart.");

    // returns to splash screen:
    setTimeout(function () {
      $(".game-box").hide();
    }, 1000);

    setTimeout(function () {
      $(".splash").show();
    }, 1000);

    $(".reset-button").css({ right: "-7%", top: "-15%" });
    $(".start-button").css({ right: "-29%", top: "-26%" });
    // filter() gathers # wins for each player:
    let playerOneWins = winLogger.filter((e) => e === playerOne);
    let playerTwoWins = winLogger.filter((e) => e === playerTwo);
    $(".playerOne").text(`P1: ${playerOneWins.length}`);
    $(".playerTwo").text(`P2: ${playerTwoWins.length}`);
  }

  // Game logic:
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
