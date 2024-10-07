
export class Card {
  constructor(type, value = null) {
    this.type = type;
    this.value = value; // Solo las cartas de tipo 'Points' tendrán un valor
  }
}


