export let deck = [];

export function makeDeck() {
    //let deck = [];

    let shape=["C","D","H","S"];
    let number=["2","3","4","5","6","7","8","9","10","A","J","K","Q"];

    for(let i of number){
        for(let j of shape){
            let deckID=`$i$j`;
            deck.push({
                "id":deckID,
                "imgPath":deckID+".png",
                "flag":flase//뒤집을수잇는카드인지판단
            });
        }
    }

}
