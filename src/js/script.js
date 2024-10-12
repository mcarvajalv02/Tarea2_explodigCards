import * as constant from "./constants.js";
import { Card } from "./cards.js";

let deck = [];
const globalDiv = document.createElement("div");
const buttonElement = document.createElement("button");
const buttonElementReset = document.createElement("button");
let divElement = document.createElement("div"); // Changed to 'let' to recreate the container
const nameCard = document.createElement("span");
const imgPoint = document.createElement("img");
const imgBomb = document.createElement("img");
const imgDefuse = document.createElement("img");
const imgSkiptTurn = document.createElement("img");
const imgNope = document.createElement("img");

imgPoint.src = "src/img/point.png";
imgBomb.src = "src/img/bomb.png";
imgDefuse.src = "src/img/defuse.png";
imgSkiptTurn.src = "src/img/skipTurn.png";
imgNope.src = "src/img/nope.png";

nameCard.className = "finalPhrase";

divElement.id = "underContainer";
globalDiv.appendChild(nameCard); // Add nameCard to divElement

globalDiv.id = "container";
buttonElement.id = "stealButton";
buttonElement.textContent = "Draw";
globalDiv.appendChild(divElement);
globalDiv.appendChild(buttonElement);
document.body.appendChild(globalDiv);

buttonElement.addEventListener("click", stealCards);

function generateDeck() {
  deck = []; // Clear the previous deck
  for (let i = 0; i < constant.NUMBER_BOMBS; i++) {
    deck.push(new Card(constant.CARD_TYPES.BOMB));
  }
  for (let i = 0; i < constant.NUMBER_DEFUSE; i++) {
    deck.push(new Card(constant.CARD_TYPES.DEFUSE));
  }
  for (let i = 0; i < constant.NUMBER_SKIP_TURN; i++) {
    deck.push(new Card(constant.CARD_TYPES.SKIP_TURN));
  }
  for (let i = 0; i < constant.NUMBER_NOPE; i++) {
    deck.push(new Card(constant.CARD_TYPES.NOPE));
  }
  for (let i = 0; i < constant.NUMBER_POINTS; i++) {
    const randomValue = Math.floor(Math.random() * 10) + 1;
    deck.push(new Card(constant.CARD_TYPES.POINTS, randomValue));
  }
  return deck;
}

deck = generateDeck();

function shuffleCards() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  console.log("Shuffled Deck:", deck);
  return deck;
}
deck = shuffleCards();

function stealCards() {
  if (deck.length > 0) {
    const stolenCard = deck.pop(); // Steal the last card
    displayStolenCard(stolenCard); // Display the stolen card
    console.log("Stolen card:", stolenCard);
  } else {
    // If there are no more cards, remove the Draw button and the card container
    buttonElement.style.display = "none"; // Hide the Draw button
    nameCard.textContent = "There are no more cards";

    // Show the Reset button
    buttonElementReset.textContent = "Reset";
    globalDiv.appendChild(buttonElementReset);
    buttonElementReset.addEventListener("click", resetDeck);

    // Remove the stolen card container
    divElement.remove(); // Remove the card container from the DOM
  }
}

function resetDeck() {
  // Regenerate and shuffle the deck
  deck = generateDeck();
  deck = shuffleCards();

  // Restore the "Draw" button and show it
  buttonElement.style.display = "inline-block"; // Show the Draw button again
  
  // Recreate the card container and add it back to the DOM
  divElement = document.createElement("div");
  divElement.id = "underContainer";
  globalDiv.insertBefore(divElement, buttonElement);

  nameCard.textContent = '';
  buttonElementReset.remove();

  console.log("Deck reset:", deck);
}

// Display the stolen card
function displayStolenCard(card) {
  // Clear the content of the previous card
  divElement.innerHTML = '';

  // Remove the color of the previous card
  divElement.className = '';

  // Create elements for the top part of the card
  const imgCornerLeftTop = document.createElement("img");
  const imgCornerRightBottom = document.createElement("img");

  imgCornerLeftTop.className = "corner-left";
  imgCornerRightBottom.className = "corner-right";

  // Specify the sources for the corner images
  imgCornerLeftTop.src = imgPoint.src;  // You can change this depending on the card
  imgCornerRightBottom.src = imgPoint.src;

  const cardTypeTop = document.createElement("div");
  cardTypeTop.className = "card-type";
  cardTypeTop.textContent = `${card.type}`;
  
  const cardDescriptionTop = document.createElement("div");
  cardDescriptionTop.className = "card-description";
  cardDescriptionTop.textContent = "Card description";

  const cardDescriptionBottom = document.createElement("div");
  cardDescriptionBottom.className = "card-description-bottom-text";
  cardDescriptionBottom.textContent = "Card description";
  
  const cardImage = document.createElement("img");
  cardImage.className = "card-image";
  
  const pointsCard = document.createElement("span");
  pointsCard.textContent = `${card.value}`;
  pointsCard.className = "pointsOfCards";

  // Select the corresponding image
  switch (card.type) {
    case "POINTS":
      cardImage.src = imgPoint.src;
      divElement.appendChild(pointsCard);
      divElement.classList.add("points-card");
      imgCornerLeftTop.src = imgPoint.src;
      imgCornerRightBottom.src = imgPoint.src;
      break;
    case "BOMB":
      cardImage.src = imgBomb.src;
      divElement.classList.add("bomb-card");
      imgCornerLeftTop.src = imgBomb.src;
      imgCornerRightBottom.src = imgBomb.src;
      break;
    case "DEFUSE":
      cardImage.src = imgDefuse.src;
      divElement.classList.add("defuse-card");
      imgCornerLeftTop.src = imgDefuse.src;
      imgCornerRightBottom.src = imgDefuse.src;
      break;
    case "SKIP TURN":
      cardImage.src = imgSkiptTurn.src;
      divElement.classList.add("skip-turn-card");
      imgCornerLeftTop.src = imgSkiptTurn.src;
      imgCornerRightBottom.src = imgSkiptTurn.src;
      break;
    case "NOPE":
      cardImage.src = imgNope.src;
      divElement.classList.add("nope-card");
      imgCornerLeftTop.src = imgNope.src;
      imgCornerRightBottom.src = imgNope.src;
      break;
    default:
      cardImage.src = ""; // Default image if needed
  }

  // Create containers for name and description
  const divNameDescriptionTop = document.createElement("div");
  const divNameDescriptionBottom = document.createElement("div");

  divNameDescriptionTop.appendChild(imgCornerLeftTop);  // Add the top left corner image
  divNameDescriptionTop.appendChild(cardTypeTop);
  divNameDescriptionTop.appendChild(cardDescriptionTop);
  divElement.appendChild(divNameDescriptionTop);
  divElement.appendChild(cardImage);
  divNameDescriptionTop.className = "container-name-description-top";

  const cardTypeBottom = document.createElement("div");
  cardTypeBottom.className = "card-type-bottom-text";
  cardTypeBottom.textContent = `${card.type}`;
  
  divNameDescriptionBottom.appendChild(imgCornerRightBottom); // Add the bottom right corner image
  divNameDescriptionBottom.appendChild(cardTypeBottom);
  divNameDescriptionBottom.appendChild(cardDescriptionBottom);
  divElement.appendChild(divNameDescriptionBottom);
  divNameDescriptionBottom.className = "container-name-description-bottom";
}