import * as constant from "./constants.js";
import { Card } from "./cards.js";

let deck = [];
const globalDiv = document.createElement("div");
const buttonElement = document.createElement("button");
const buttonElementReset = document.createElement("button");
const divElement = document.createElement("div");
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

divElement.id = "underContainer";
globalDiv.appendChild(nameCard); // Añadimos nameCard a divElement

globalDiv.id = "container";
buttonElement.id = "stealButton";
buttonElement.textContent = "Draw";
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
    buttonElement.remove();
    nameCard.textContent = "No hay más cartas"; // Mensaje cuando no hay más cartas
    buttonElementReset.textContent = "Reset";
    globalDiv.appendChild(buttonElementReset);
    buttonElementReset.addEventListener("click", resetDeck);
  }
}

function resetDeck(deck){
  deck = generateDeck();
  deck = shuffleCards();

  //Borramos la última carta que ha salido 
  divElement.innerHTML = '';
  //Borramos el color de la última carta que ha salido
  divElement.className = '';
  nameCard.textContent = "";
  buttonElementReset.remove();
  globalDiv.appendChild(buttonElement);
  return deck;
}

//Muestro la tarjeta robada
function displayStolenCard(card) {
  // Limpia el contenido de la carta anterior
  divElement.innerHTML = '';

  //Borramos el color de la carta anterior
  divElement.className = '';

  // Crea los elementos para la parte superior de la carta
  const cardTypeTop = document.createElement("div");
  cardTypeTop.className = "card-type";
  cardTypeTop.textContent = `${card.type}`;
  
  const cardDescriptionTop = document.createElement("div");
  cardDescriptionTop.className = "card-description";
  cardDescriptionTop.textContent = "Descripción de la carta";
  
  const cardImage = document.createElement("img");
  cardImage.className = "card-image";
  
  const pointsCard = document.createElement("span");
  pointsCard.textContent = `${card.value}`;
  pointsCard.className = "pointsOfCards"

  // Selecciona la imagen correspondiente
  switch (card.type) {
      case "POINTS":
          cardImage.src = imgPoint.src;
          divElement.appendChild(pointsCard);
          divElement.classList.add("points-card");
          break;
      case "BOMB":
          cardImage.src = imgBomb.src;
          divElement.classList.add("bomb-card");
          break;
      case "DEFUSE":
          cardImage.src = imgDefuse.src;
          divElement.classList.add("defuse-card");
          break;
      case "SKIP TURN":
          cardImage.src = imgSkiptTurn.src;
          divElement.classList.add("skip-turn-card");
          break;
      case "NOPE":
          cardImage.src = imgNope.src;
          divElement.classList.add("nope-card");
          break;
      default:
          cardImage.src = ""; // Default image if needed
  }

  //Creo un div donde meto el nombre de la carta y la descripción
  const divNameDescriptionTop = document.createElement("div");
  const divNameDescriptionBottom = document.createElement("div");

  // Crea los elementos para la parte inferior de la carta
  const cardTypeBottom = document.createElement("div");
  cardTypeBottom.className = "card-type-bottom-text";
  cardTypeBottom.textContent = `${card.type}`;
  
  const cardDescriptionBottom = document.createElement("div");
  cardDescriptionBottom.className = "card-description-bottom-text";
  cardDescriptionBottom.textContent = "Descripción de la carta";

  // Añadir los elementos a la tarjeta (parte superior)
  divNameDescriptionTop.appendChild(cardTypeTop);
  divNameDescriptionTop.appendChild(cardDescriptionTop);
  divElement.appendChild(divNameDescriptionTop);
  divElement.appendChild(cardImage);
  divNameDescriptionTop.className = "container-name-description-top";

  

  // Añadir los elementos a la tarjeta (parte inferior)
  divNameDescriptionBottom.appendChild(cardTypeBottom);
  divNameDescriptionBottom.appendChild(cardDescriptionBottom);
  divElement.appendChild(divNameDescriptionBottom);
  divNameDescriptionBottom.className = "container-name-description-bottom";
}


function updateDOM() {
  // Aquí podrías actualizar otros elementos del DOM si es necesario
}

// Escucha el evento de cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", function() {
  // Llamada para generar el botón y la interfaz
  updateDOM();
});
