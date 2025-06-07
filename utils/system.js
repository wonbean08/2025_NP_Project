import { deck, makeDeck } from './TrumpDeck.js';
makeDeck();

export function getDeck() {
    return deck;
}

//덱 섞음
export function shuffleTrump() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}