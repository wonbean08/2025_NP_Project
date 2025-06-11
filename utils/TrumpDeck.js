export let deck = [];
export function createDeck(difficulty) {
    let shape = ["C", "D"];
    if (difficulty >= 2) {
        shape.push("H")
    }
    if (difficulty >= 3) {
        shape.push("S")
    }
    
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