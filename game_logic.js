const gameBoard = document.querySelector(".game-board");
// Cards will be stored in a vector. This will allow me to add more rows/columns as time goes on.
let cards = [];
let firstSelectedCard, secondSelectedCard;
let lockBoard = false;
// Turns are 0 by default in the html so no need to set it manually
let turns = 0;

// Kelly's 22 Colors of Maximum Contrast
const kellyColors = [
  "#FFB300", // Vivid Yellow
  "#803E75", // Strong Purple
  "#FF6800", // Vivid Orange
  "#A6BDD7", // Very Light Blue
  "#C10020", // Vivid Red
  "#CEA262", // Grayish Yellow
  "#817066", // Medium Gray
  "#007D34", // Vivid Green
  "#F6768E", // Strong Purplish Pink
  "#00538A", // Strong Blue
  "#FF7A5C", // Strong Yellowish Pink
  "#53377A", // Strong Violet
  "#FF8E00", // Vivid Orange Yellow
  "#B32851", // Strong Purplish Red
  "#F4C800", // Vivid Greenish Yellow
  "#7F180D", // Strong Reddish Brown
  "#93AA00", // Vivid Yellowish Green
  "#593315", // Deep Yellowish Brown
  "#F13A13", // Vivid Reddish Orange
  "#232C16", // Dark Olive Green
  "#00A1C2", // Vivid Blue (Bonus from other Kelly references)
  "#A0C8F0"  // Light Pastel Blue (Soft but distinguishable)
];

// Used for extensibility & ease of use
class Card {
    /**
     * @param {string} color
     * @param {number} uid
     * @param {number} pair_id
     */
    constructor(color, uid, pair_id) {
        this.color = color;
        this.uid = uid;
        this.pair_id = pair_id;
    }
}

/* 
 * Generates a random set of unique cards
*/
function generateCardSet(pairs) {
    // Stores colors temporarily to ensure uniqueness between cards
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

        // Render to the game board
        gameBoard.appendChild(cardElement)
    })
}

generateCardSet(6);
shuffleCards();
populateBoard();