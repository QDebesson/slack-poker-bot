class Blackjack {
  // players;
  // decks;
  // croupier;
  // PLAYERS_COUNT = 7;

  constructor() {
    this.decks = new Deck(6);
    this.players = [];
    for(let i = 0; i < 7; i++) {
      this.players.push(new Player(this, i));
    }
    this.croupier = new Croupier(this);
  }

  startOfGame() {
    this.decks.shuffle();
    this.players.forEach(player => {
      console.log(player.id);
      player.getFirstRound();
    });
    console.log('croupier');
    this.croupier.getFirstRound();
  }

  nextTurn() {
    this.players.forEach(player => {
      console.log(player.id);
      player.getNewCard();
    });
    console.log('croupier');
    this.croupier.getNewCard();
  }

  endOfGame() {
    this.players.forEach(player => {
      console.log(player.id);
      player.hasWon(this.croupier);
    });
    console.log("Croupier has " + this.croupier.hand.handCalculator() + " points!");
  }
}

class Player {
  // hand;
  // game;

  constructor(game, id) {
    this.game = game;
    this.hand = new Hand();
    this.id = id;
  }

  hasBlackjack() {
    return (this.hand.length === 2 && this.hand.handCalculator() === 21);
  }

  hasWon(croupier) {
    let hasWon = (this.hasBlackjack()
    || !this.hand.hasBusted() && this.hand.handCalculator() > croupier.hand.handCalculator()
    || croupier.hand.hasBusted());
    console.log(this.id + " has " + this.hand.handCalculator() + " points!");
    console.log(hasWon);
    return hasWon;
  }

  getFirstRound() {
    for(let i = 0; i<2; i++) {
      let card = this.game.decks.drawCard();
      console.log(card);
      this.hand.push(card);
    }
  }

  getNewCard() {
    let card = this.game.decks.drawCard();
    console.log(card);
    this.hand.push(card);
  }
}

class Croupier extends Player {
  getFirstRound() {
    let card = this.game.decks.drawCard();
    console.log(card);
    this.hand.push(card);
  }
}

class Hand {
  // cards = [];

  constructor() {
    this.cards = [];
  }

  push(card) {
    this.cards.push(card);
  }

  handCalculator() {
    let points = 0;
    this.cards.forEach(card => {
      points += card.getValue();
    });
    if (points > 21) {
      for (let i = 0; i < this.aceCount(); i++) {
        points -= 10;
        if (points <= 21) {
          break;
        }
      }

      return points;
    }
    return points;
  }

  hasBusted() {
    return this.handCalculator() > 21;
  }

  aceCount() {
    return this.cards.filter(card => card.rank === 'A').length;
  }
}

class Deck {
  constructor(count = 1) {
    this.cards = [];
    for(let i = 0; i<count; i++) {
      for (let suit of Card.Suits()) {
        for (let rank of Card.Ranks()) {
          let card = new Card(rank, suit);
          this.cards.push(card);
        }
      }
    }
  }

  // Public: Performs a proper Fisher-Yates shuffle.
  //
  // Returns nothing; the shuffle is in-place.
  shuffle() {
    let temp, idx;
    let cardsRemaining = this.cards.length;

    // While there remain elements to shuffle…
    while (cardsRemaining) {

      // Pick a remaining element…
      idx = Math.floor(Math.random() * cardsRemaining--);

      // And swap it with the current element.
      temp = this.cards[cardsRemaining];
      this.cards[cardsRemaining] = this.cards[idx];
      this.cards[idx] = temp;
    }
  }

  drawCard() {
    return this.cards.shift();
  }

  toString() {
    return this.cards.join();
  }

  toAsciiString() {
    return this.cards.map(card => card.toAsciiString()).join();
  }
}

class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  getValue() {
    return Card.Points()[Card.Ranks().indexOf(this.rank)];
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

let blackjack = new Blackjack();
blackjack.startOfGame();
blackjack.nextTurn();
blackjack.nextTurn();
blackjack.nextTurn();
blackjack.nextTurn();
blackjack.endOfGame();