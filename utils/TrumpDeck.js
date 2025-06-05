export let deck = [];
export function makeDeck() {
    //let deck = [];

    let shape = ["C", "D", "H", "S"];
    let number = ["2", "3", "4", "5", "6", "7", "8", "9"];

    for (let i of number) {
        for (let j of shape) {
            let deckID = `${i}${j}`;
            deck.push({
                "id": deckID,
                "imgPath": deckID + ".png",
                "flag": false//뒤집을 수 있는 카드인지 판단
            });
            deck.push({
                "id": deckID,
                "imgPath": deckID + ".png",
                "flag": false//뒤집을 수 있는 카드인지 판단
            });
        }
    }
}


export function shuffle() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}