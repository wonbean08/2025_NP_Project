import { deck, makeDeck, shuffle } from './TrumpDeck.js';
makeDeck();

export function getDeck() {
    //console.log(deck);
    return deck;
}

export function match(a,b){
    return false;
}

export function showFront(a){

}

export function shuffleTrump() {
    shuffle();
}