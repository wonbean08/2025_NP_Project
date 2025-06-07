import * as Deck from '../utils/system.js';

const user1 = document.getElementById("showName1").innerText;
const user2 = document.getElementById("showName2").innerText;

const gamePlaying = document.getElementById('gamePlaying');
const shuffleBtn = document.getElementById('shuffleTrump')
const sign = document.getElementById('sign');

const cardTable = document.getElementById('cards');

let cards;
let selectedCards = [];
let score = [0, 0];
let deck;
let lockBoard = false;

let currentPlayerIndex = 0;

function switchTurn() {
    //호출하면 턴바꿈
    currentPlayerIndex = (currentPlayerIndex + 1) % score.length;

    let text = currentPlayerIndex == 0 ? `플레이어 ${user1}의 차례` : `플레이어 ${user2}의 차례`;
    gamePlaying.innerText = text;

    if (currentPlayerIndex == 0) {
        icon1.classList.add('blue-glow-effect')
        icon2.classList.remove('blue-glow-effect')
        icon2.style.color = 'red';
    } else {
        icon2.classList.add('blue-glow-effect')
        icon1.classList.remove('blue-glow-effect')
        icon1.style.color = 'red';
    }

}

function hideCard() {
    for (const item of cards) {
        //console.log(`./imgs/${this.id}.png>`);
        item.removeChild(item.childNodes[0]);
        let img = document.createElement('img');
        img.src = `./imgs/Card_back.png`;
        img.classList.add('card');
        item.appendChild(img);
    }
}

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
        let img = document.createElement('img');
        img.src = `./imgs/${deck[i].id}.png`;
        img.classList.add('card');

        cell.appendChild(img);
        cell.classList.add('cell');
        cell.id = `${deck[i].id}`;

        row.appendChild(cell);
    }

}

function countDown(second) {

    let cnt = second;
    const count = setInterval(() => {
        if (cnt == 0) {
            sign.innerText = "시작!";
            clearInterval(count);
            return;
        }
        sign.innerText = cnt
        cnt--;

    }, 1000);
}


shuffleBtn.addEventListener("click", function () {
    const second = 3;
    cardTable.innerHTML = '';
    Deck.shuffleTrump();
    showCard();
    countDown(second);
    setTimeout(() => {
        cards = document.getElementsByClassName("cell");
        cardAddEvnet();
        hideCard();
        icon1.classList.add('blue-glow-effect')
        gamePlaying.innerText = `플레이어 ${user1}의 차례`;
    }, (second+1) * 1000);



});


function cardAddEvnet() {
    shuffleBtn.disabled = true;

    for (const item of cards) {
        item.addEventListener("click", function () {
            //console.log(`./imgs/${this.id}.png>`);
            // item.removeChild(item.childNodes[0]);
            // let img = document.createElement('img');
            if (lockBoard) {
                return;
            }

            this.childNodes[0].src = `./imgs/${this.id}.png`;
            this.childNodes[0].classList.replace('card', 'selectCard');

            selectedCards.push(this);

            if (selectedCards.length === 2) {
                lockBoard = true; // 두 번째 카드가 선택되면 보드를 잠급니다.

                const [firstCard, secondCard] = selectedCards;
                if (firstCard.id === secondCard.id) {
                    sign.innerText = "카드가 같습니다!";
                    score[currentPlayerIndex]++;
                    resetBoard();
                } else {
                    sign.innerText = "카드가 다릅니다!";
                    switchTurn(); // 턴 전환
                    setTimeout(() => {
                        // 카드를 다시 뒷면으로 뒤집습니다.
                        firstCard.childNodes[0].src = `./imgs/Card_back.png`;
                        firstCard.childNodes[0].classList.replace('selectCard', 'card');
                        secondCard.childNodes[0].src = `./imgs/Card_back.png`;
                        secondCard.childNodes[0].classList.replace('selectCard', 'card');
                        resetBoard();
                    }, 500);
                }
            }
            //console.log(selectedCards);
        });
    }
}

function resetBoard() {
    selectedCards = [];
    lockBoard = false;
}