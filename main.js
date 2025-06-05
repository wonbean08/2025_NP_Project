import * as Deck from './utils/system.js';
const shuffleBtn = document.getElementById("shuffleTrump");
const cardTable = document.getElementById("cards");
let cards;
let temp = [];
let score = 0;
let deck = Deck.getDeck();

shuffleBtn.addEventListener("click", function () {
    cardTable.innerHTML = '';
    Deck.shuffleTrump();
    showCard();

    cards = document.getElementsByClassName("cell");
    cardAddEvnet();
});

function showCard() {
    let row;
    deck = Deck.getDeck();
    for (let i = 0; i < deck.length; i++) {
        if (i % 16 == 0) {
            row = document.createElement('tr');
            cardTable.appendChild(row);
        }
        let cell = document.createElement('td');
        //console.log(deck[i]);
        cell.innerHTML = `<img class="card" src="./imgs/Card_back.png">`;
        cell.classList.add('cell');
        cell.id = `${deck[i].id}`;
        row.appendChild(cell);
    }
}

function cardAddEvnet() {
    for (const item of cards) {
        item.addEventListener("click", function () {
            console.log(`./imgs/${this.id}.png>`);
            item.innerHTML = `<img src="./imgs/${this.id}.png">`;

            if (temp.length == 1) {
                if(temp[0].id === this.id) {
                    setTimeout(() => {
                        alert("동일함");
                        temp.pop();
                    }, 500);
                }
                else {
                    setTimeout(() => {
                        alert("다름");
                        temp[0].innerHTML = `<img class="card" src="./imgs/Card_back.png">`;
                        this.innerHTML = `<img class="card" src="./imgs/Card_back.png">`;
                        temp.pop();
                    }, 500);
                }
            }
            else {
                temp.push(this);
            }
        });
    }
}

