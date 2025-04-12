let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let found = 0;
let pairs = 8;

const cardData = [
  { icon: "bed", image: "assets/img/memory/pet-bed.png" },
  { icon: "food", image: "assets/img/memory/dog-food.png" },
  { icon: "stand", image: "assets/img/memory/dog-stand.png" },
  { icon: "ball", image: "assets/img/memory/ball.png" },
  { icon: "house", image: "assets/img/memory/dog-house.png" },
  { icon: "foot-print", image: "assets/img/memory/foot-print.png" },
  { icon: "treat", image: "assets/img/memory/dog-treat.png" },
  { icon: "sit", image: "assets/img/memory/dog-sit.png" },
];

document.addEventListener("DOMContentLoaded", () => {
  const newGameButton = document.getElementById("new-game");

  const gameMenu = document.getElementById("game-menu");
  const gameField = document.getElementById("game-field");

  const logo = document.getElementById("logo");
  logo.classList.add("animation");

  newGameButton.addEventListener("click", () => {
    gameMenu.style.display = "none";
    gameField.style.display = "grid";

    createGameBoard();

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => card.addEventListener("click", flipCard));
  });
});

function toggleMainMenu() {
  const gameMenu = document.getElementById("game-menu");
  const gameField = document.getElementById("game-field");
  gameMenu.classList.add("no-animation");

  if (gameMenu.style.display === "none") {
    // Show main menu
    gameField.style.display = "none";
    gameMenu.style.display = "flex";
  } else {
    // Show game field
    gameMenu.style.display = "none";
    gameField.style.display = "grid";
  }
}

function createGameBoard() {
  const gameField = document.getElementById("game-field");
  const cards = [...cardData, ...cardData];
  gameField.innerHTML = "";
  shuffle(cards);

  cards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.icon = card.icon;

    cardElement.innerHTML = `
      <div class="front"></div>
      <div class="back" style="background-image: url(${card.image})"></div>
    `;
    gameField.appendChild(cardElement);
  });

  const logoMenu = document.getElementById("logo");
  logoMenu.addEventListener("click", toggleMainMenu);

  const infoText = document.getElementById("info-text");
  infoText.style.display = "none";
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    console.log(this.dataset.icon);
    return;
  }

  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.icon === secondCard.dataset.icon) {
    disableCards();
    found++;
    console.log("found: " + found);
    if (found === pairs) {
      setTimeout(() => {
        window.alert("Well done!");
      }, 1500);
    }
  } else {
    unFlip();
  }
}

function unFlip() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
