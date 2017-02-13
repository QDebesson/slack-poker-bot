class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  getValue() {
    return Card.Points().get(Card.Ranks().indexOf(this.rank));
  }

  toString() {
    return `${this.rank}${Card.SuitMapping()[this.suit]}`;
  }
  
  toAsciiString() {
    return `${this.rank}${this.suit.substring(0, 1).toLowerCase()}`;
  }

  static Ranks() {
    return ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
  }

  static Points() {
    return [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
  }

  static Suits() {
    return ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
  }

  static SuitMapping() {
    return {'Spades':'♠', 'Hearts':'♥', 'Diamonds':'♦', 'Clubs':'♣'};
  }
}

module.exports = Card;
