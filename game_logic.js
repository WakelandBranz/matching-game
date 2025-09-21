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
     * @param {number} id
     */
    constructor(color, id) {
        this.color = color;
        this.id = id;
    }
}

/* 
 * Generates a random set of unique cards
*/
function generateCardSet(count) {
    // Stores colors temporarily to ensure uniqueness between cards
    let tempColors = kellyColors
    cards.length = 0; // resets cards array for reuse
    for (i = 0; i < tempColors.length; i++) {
        // Generates a random color and assigns an id
        randIndex = Math.floor(Math.random() * tempColors.length);
        color = tempColors[randIndex];
        id = i++;

        // Remove previously used color to avoid duplicates and add new card to card array
        tempColors.splice(randIndex, 1);
        cards.push(Card(color, id));
    }
}

// Implemented using the Fisher-Yates shuffle algorithm
function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]]
    }
}