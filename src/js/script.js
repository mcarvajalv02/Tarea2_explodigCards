import * as constant from "./constants.js";
import { Card } from "./cards.js";

let deck = [];
const globalDiv = document.createElement("div");
const buttonElement = document.createElement("button");
const divElement = document.createElement("div");
const nameCard = document.createElement("h2");
const imgPoint = document.createElement("img");
const imgBomb = document.createElement("img");

imgPoint.src = "src/img/point.png";
imgBomb.src = "src/img/bomb.png";

divElement.id = "underContainer";
divElement.appendChild(nameCard); // Añadimos nameCard a divElement

globalDiv.id = "container";
buttonElement.id = "stealButton";
buttonElement.textContent = "Robar Carta";
globalDiv.appendChild(divElement);
globalDiv.appendChild(buttonElement);
document.body.appendChild(globalDiv);

buttonElement.addEventListener("click", stealCards);

function generateDeck() {
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
    const stolenCard = deck.pop(); // Roba la última carta
    displayStolenCard(stolenCard); // Muestra la carta robada
    console.log("Carta robada:", stolenCard);
  } else {
    console.log("No hay cartas en el mazo");
    nameCard.textContent = "No hay más cartas"; // Mensaje cuando no hay más cartas
  }
}

//Muestro la tarjeta robada
function displayStolenCard(card) {
  nameCard.textContent = `${card.type}`;
  
  // Si es de tipo POINTS, muestra la imagen
  if (card.type == "POINTS") {
    if (!divElement.contains(imgPoint)) {
      divElement.appendChild(imgPoint);
      
      
    }
  } else {
    // Si no es POINTS, asegúrate de quitar la imagen si está presente
    if (divElement.contains(imgPoint)) {
      divElement.removeChild(imgPoint);
    }
  }

  if (card.type == "BOMB") {
    if (!divElement.contains(imgBomb)) {
      divElement.appendChild(imgBomb);
    }
  } else {
    // Si no es POINTS, asegúrate de quitar la imagen si está presente
    if (divElement.contains(imgBomb)) {
      divElement.removeChild(imgBomb);
    }
  }
}

function updateDOM() {
  // Aquí podrías actualizar otros elementos del DOM si es necesario
}

// Escucha el evento de cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", function() {
  // Llamada para generar el botón y la interfaz
  updateDOM();
});
