/* GLOBALS */
const gameBoard = document.querySelector(".game-board");
// Cards will be stored in a vector. This will allow me to add more rows/columns as time goes on.
let cards = [];
let firstSelectedCard, secondSelectedCard;
let lockBoard = false;
// Turns and pairs are 0 by default in the html so no need to set it manually
let turns = 0;
let pairs = 0;

// Kelly's 22 Colors of Maximum Contrast
const kellyColors = [
  "#fdfdfd", // White
  "#1d1d1d", // Black
  "#ebce2b", // Yellow
  "#702c8c", // Purple
  "#db6917", // Orange
  "#96cde6", // Light Blue
  "#ba1c30", // Red
  "#c0bd7f", // Buff
  "#7f7e80", // Gray
  "#5fa641", // Green
  "#d485b2", // Purple Pink
  "#4277b6", // Blue
  "#df8461", // Yellow Pink
  "#463397", // Violet
  "#e1a11a", // Orange Yellow
  "#91218c", // Purple Red
  "#e8e948", // Green Yellow
  "#7e1510", // Red Brown
  "#92ae31", // Yellow Green
  "#6f340d", // Yellow Brown
  "#d32b1e", // Red Orange
  "#2b3514", // Olive Green
];

// Used for extensibility & ease of use
class Card {
    /**
     * @param {string} color
     * @param {number} uid
     * @param {number} pairId
     */
    constructor(color, uid, pairId) {
        this.color = color;
        this.uid = uid;
        this.pairId = pairId;
    }
}

/* 
 * Generates a random set of unique cards
*/
function generateCardSet(pairs) {
    // Stores colors temporarily to ensure uniqueness between cards
    // Note, the [...<object>] syntax creates a clone but simply setting a new variable equal to another creates a reference.
    let tempColors = [...kellyColors];
    cards.length = 0; // resets cards array for reuse
    for (let i = 0; i < pairs; i++) {
        // Generates a random color and assigns an id
        const randIndex = Math.floor(Math.random() * tempColors.length);
        const color = tempColors[randIndex];

        // Remove previously used color to avoid duplicates and add new card to card array
        tempColors.splice(randIndex, 1);
        cards.push(new Card(color, i * 2, i));
        cards.push(new Card(color, i * 2 + 1, i));
    }
}

// Implemented using the Fisher-Yates shuffle algorithm
function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]]
    }
}

/*
 * Populates the visible game board with cards
 */
function populateBoard() {
    // Clear existing board
    gameBoard.innerHTML = '';

    cards.forEach((card, index) => {
        // Create a card element
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        // Creating front and back faces of the card
        const frontFace = document.createElement('div');
        frontFace.classList.add('front');
        frontFace.style.backgroundColor = card.color; // Color on front

        const backFace = document.createElement('div');
        backFace.classList.add('back'); // CSS pattern

        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);
        
        // Store relevant data in the DOM
        cardElement.dataset.pairId = card.pairId;
        cardElement.dataset.uid = card.uid;

        // Add click listener
        cardElement.addEventListener('click', handleCardClick)

        // Render to the game board
        gameBoard.appendChild(cardElement)
    })
}

function handleCardClick() {
    // Something occuring which indicates that the user should not be able to click cards
    if (lockBoard) return;
    // Can't click same card twice
    if (this === firstSelectedCard) return;

    // Flip our card
    this.classList.add("flipped")

    // Store our selected card
    if (!firstSelectedCard) {
        firstSelectedCard = this;
        return;
    }

    // Second card selected
    secondSelectedCard = this;
    turns++;
    document.querySelector("#turns").textContent = turns;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstSelectedCard.dataset.pairId === secondSelectedCard.dataset.pairId;

    isMatch ? disableCards() : unflipCards();

    checkWin();
}

/*
 * A pair has been found! Permanently flip them and highlight the pair!
 */
function disableCards() {
    firstSelectedCard.removeEventListener("click", handleCardClick);
    secondSelectedCard.removeEventListener("click", handleCardClick);

    // Add matched styling
    firstSelectedCard.classList.add("matched");
    secondSelectedCard.classList.add("matched");

    // Match found, increase match counter
    pairs++;
    document.querySelector("#pairs").textContent = pairs;

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstSelectedCard.classList.remove("flipped");
        secondSelectedCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    // Reset relevant variables
    firstSelectedCard = null;
    secondSelectedCard = null;
    lockBoard = false;
}

function newGame() {
    firstSelectedCard = null;
    secondSelectedCard = null;

    generateCardSet(6);
    shuffleCards();
    populateBoard();
    lockBoard = false;
    turns = 0;
    document.querySelector("#turns").textContent = turns;
    pairs = 0;
    document.querySelector("#pairs").textContent = pairs;
}

function checkWin() {
    // Get a NodeList of all cards and turn them into an array
    const allCards = document.querySelectorAll('.card');
    const allMatched = Array.from(allCards).every(card => 
        card.classList.contains('matched')
    );
    
    if (allMatched) {
        alert(`You won in ${turns} turns!`);
    }
}

generateCardSet(6);
shuffleCards();
populateBoard();

document.querySelector(".reset-button").addEventListener('click', newGame);