// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];

let image = document.getElementsByTagName("img");
let images = [...image];

// deck of all cards in game
const deck = document.getElementById("card-deck");

// declaring move variable
let moves = 0;
let livesCounter = 0;
let lost = false;

let counter = document.querySelector(".moves");
let lives = document.querySelector(".lives");

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

// stars list
let starsList = document.querySelectorAll(".stars li");

// declare modal
let modal = document.getElementById("popup1");
let lostModal = document.getElementById("popup2");

// array for opened cards
var openedCards = [];

// @description shuffles cards
// @param {array}
// @returns shuffledarray
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// @description shuffles cards when page is refreshed / loads
document.body.onload = startGame();

// @description function to start a new play
function startGame() {
  // empty the openCards array
  openedCards = [];

  // shuffle deck
  cards = shuffle(cards);
  // remove all exisiting classes from each card
  for (var i = 0; i < cards.length; i++) {
    deck.innerHTML = "";
    [].forEach.call(cards, function (item) {
      deck.appendChild(item);
    });
    cards[i].classList.remove("show", "open", "match", "disabled");
  }
  // reset moves
  moves = 0;
  counter.innerHTML = moves;
  // reset moves
  livesCounter = 6;
  lives.innerHTML = livesCounter;
  // reset rating
  for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    image = images[i];

    image.classList.add("hidde");
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
  }
  for (var i = 0; i < stars.length; i++) {
    stars[i].style.color = "#FFD700";
    stars[i].style.visibility = "visible";
  }
}

// @description toggles open and show class to display cards
var displayCard = function () {
  this.firstChild.nextSibling.classList.remove("hidde");
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
};

// @description add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
  openedCards.push(this);
  var len = openedCards.length;

  if (len === 2) {
    moveCounter();
    if (openedCards[0].type === openedCards[1].type) {
      matched();
    } else {
      unmatched();
    }
  }
}

// @description when cards match
function matched() {
  openedCards[0].classList.add("match", "disabled");
  openedCards[1].classList.add("match", "disabled");
  openedCards[0].classList.remove("show", "open", "no-event");
  openedCards[1].classList.remove("show", "open", "no-event");
  openedCards = [];
}

// description when cards don't match9
function unmatched() {
  disable();
  setTimeout(function () {
    for (let i = 0; i < openedCards.length; i++) {
      const card = openedCards[i];
      card.classList.remove("show", "open", "no-event", "unmatched");
      card.firstChild.nextSibling.classList.add("hidde");
    }
    enable();
    openedCards = [];
  }, 1100);

  if (livesCounter > 0 && livesCounter != 1) {
    livesCounter = livesCounter - 1;
    lives.innerHTML = livesCounter;

    console.log("Lives " + livesCounter);
  } else {
    lost = true;

    console.log("You lost");
    startGame();
  }
}

// @description disable cards temporarily
function disable() {
  Array.prototype.filter.call(cards, function (card) {
    card.classList.add("disabled");
  });
}

// @description enable cards and disable matched cards
function enable() {
  Array.prototype.filter.call(cards, function (card) {
    card.classList.remove("disabled");
    for (var i = 0; i < matchedCard.length; i++) {
      matchedCard[i].classList.add("disabled");
    }
  });
}

// @description count player's moves
function moveCounter() {
  moves++;
  counter.innerHTML = moves;
}

// @description count player's moves
function showLives() {
  lives++;
  lives.innerHTML = lives;
  //start timer on first click
  // if (moves == 1) {
  //   second = 0;
  //   minute = 0;
  //   hour = 0;
  //   startTimer();
  // }
  // // setting rates based on moves
  // if (lives > 8 && lives < 12) {
  //   for (i = 0; i < 3; i++) {
  //     if (i > 1) {
  //       stars[i].style.visibility = "collapse";
  //     }
  //   }
  // } else if (lives > 13) {
  //   for (i = 0; i < 3; i++) {
  //     if (i > 0) {
  //       stars[i].style.visibility = "collapse";
  //     }
  //   }
  // }
}

// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations() {
  if (matchedCard.length == 8) {
    // show congratulations modal
    modal.classList.add("show");

    // declare star rating variable
    var starRating = document.querySelector(".stars").innerHTML;

    //showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = moves;
  }
  if (lost == true) {
    // show congratulations modal
    lostModal.classList.add("show");

    //showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = moves;
  }
}

// @desciption for user to play Again
function playAgain() {
  if (lost == true) {
    lostModal.classList.remove("show");
  } else {
    modal.classList.remove("show");
  }
  startGame();
}

// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++) {
  card = cards[i];
  image = images[i];

  image.classList.add("hidde");
  card.addEventListener("click", displayCard);
  card.addEventListener("click", cardOpen);
  card.addEventListener("click", congratulations);
}
