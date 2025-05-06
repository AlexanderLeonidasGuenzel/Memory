document.addEventListener("DOMContentLoaded", () => {
  addLogoAnimation();
});

//Menu Logic
const menuBtn = document.querySelectorAll(".menu-btn");
menuBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let submenu = btn.id;
    switch (submenu) {
      case "new-game":
        toggleMainMenu();
        newGame();
        break;
      case "help":
        toggleSubmenu(submenu + "-menu");
        break;
      case "options":
        toggleSubmenu(submenu + "-menu");
        break;
      case "credits":
        toggleSubmenu(submenu + "-menu");
        break;
    }
  });
});

const backBtn = document.querySelectorAll(".btn-back");
backBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    showMainMenu();
  });
});

function toggleMainMenu() {
  const gameMenu = document.getElementById("game-menu");
  const gameField = document.getElementById("game-field");

  if (gameMenu.style.display === "none") {
    // Show main menu
    gameField.style.display = "none";
    gameMenu.style.display = "flex";
  } else {
    // Show game field
    gameMenu.style.display = "none";
    gameField.style.display = "grid";
  }

  removeSlideAnimation();
}

function toggleSubmenu(menuId) {
  hideInfoText();
  hideMainMenu();
  hideSubmenu();
  showActualSubmenu(menuId);
  console.log(menuId);
}

function hideMainMenu() {
  document.getElementById("game-menu").style.display = "none";
}

function showMainMenu() {
  hideSubmenu();
  document.getElementById("game-menu").style.display = "flex";
}

function hideSubmenu() {
  document.querySelectorAll(".submenu").forEach((menu) => {
    menu.classList.add("hidden");
  });
}

function showActualSubmenu(menuId) {
  document.getElementById(menuId).classList.remove("hidden");
}

function addLogoAnimation() {
  const logo = document.getElementById("logo");
  logo.classList.add("animation");
}

function hideInfoText() {
  const infoText = document.getElementById("info-text");
  infoText.style.display = "none";
}

function activateLogoMenu() {
  const logoMenu = document.getElementById("logo");
  logoMenu.addEventListener("click", toggleMainMenu);
}

function removeSlideAnimation() {
  document.getElementById("game-menu").classList.remove("slide-animation");
}

// Game Logic

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

function newGame() {
  createGameBoard();
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.addEventListener("click", flipCard));
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

  activateLogoMenu();
  hideInfoText();
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
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
