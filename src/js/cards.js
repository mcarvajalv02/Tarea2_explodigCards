
export class Card {
  constructor(type, value = null) {
    this.type = type;
    this.value = value; // Only 'Points' type cards will have a value
  }
}


