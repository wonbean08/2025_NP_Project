import * as Deck from '../utils/system.js';

const user1 = document.getElementById("showName1").innerText;
const user2 = document.getElementById("showName2").innerText;

const score1 = document.getElementById("userScore1");
const score2 = document.getElementById("userScore2");

const gamePlaying = document.getElementById('gamePlaying');
const shuffleBtn = document.getElementById('shuffleTrump')
const sign = document.getElementById('sign');
const cardTable = document.getElementById('cards');

const give_up1 = document.getElementById("give_up1");
const give_up2 = document.getElementById("give_up2");

let rightCardCnt = 0;
let cards;
let selectedCards = [];
let score = [0, 0];
let deck;
let lockBoard = false;

let currentPlayerIndex = 0;

let giveupTurn = [false, false];

function switchTurn() {
    //호출하면 턴바꿈
    currentPlayerIndex = (currentPlayerIndex + 1) % score.length;

    let text = currentPlayerIndex == 0 ? `플레이어 ${user1}의 차례` : `플레이어 ${user2}의 차례`;

    if (currentPlayerIndex == 0) {
        give_up2.disabled = true;
        give_up1.disabled = false;
    }
    else {
        give_up1.disabled = true;
        give_up2.disabled = false;
    }

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
        item.childNodes[0].src = `./imgs/Card_back.png`;
        item.childNodes[0].classList.add('card');
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
    shuffleBtn.disabled = true;
    shuffleBtn.classList.remove("startBtnHover");
    give_up2.disabled = true;
    give_up1.disabled = false;

    const second = 5;
    Deck.shuffleTrump();
    showCard();
    countDown(second);
    let StartTimeout = setTimeout(() => {
        cards = document.getElementsByClassName("cell");
        cardAddEvnet();
        hideCard();
        icon1.classList.add('blue-glow-effect')
        gamePlaying.innerText = `플레이어 ${user1}의 차례`;
    }, (second + 1) * 1000);



});


function cardAddEvnet() {


    for (const item of cards) {
        item.addEventListener("click", function () {
            //console.log(`./imgs/${this.id}.png>`);
            // item.removeChild(item.childNodes[0]);
            // let img = document.createElement('img');
            if (selectedCards.length > 0) {
                if (lockBoard || this.classList.contains('selectCard')) {
                    return;
                }
            }

            this.childNodes[0].src = `./imgs/${this.id}.png`;
            this.childNodes[0].classList.replace('card', 'selectCard');

            selectedCards.push(this);

            if (selectedCards.length === 2) {
                lockBoard = true; // 두 번째 카드가 선택되면 보드를 잠급니다.
                giveupTurn[0] = false;
                giveupTurn[1] = false;
                give_up1.disabled = false;
                give_up2.disabled = false;

                const [firstCard, secondCard] = selectedCards;
                if (firstCard.id === secondCard.id) {
                    sign.innerText = "카드가 같습니다!";
                    score[currentPlayerIndex]++;
                    score1.innerText = score[0];
                    score2.innerText = score[1];
                    rightCardCnt++;
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


            if (rightCardCnt == 32) {
                alert("게임 종료!");
                let text = '';
                if (score[0] > score[1]) {
                    text = user1+"님이 승리했습니다!";
                }
                else if (score[1] > score[0]) {
                    text = user2+"님이 승리했습니다!";
                }
                else {
                    text = "동점입니다!"
                }
                sign.innerText = text
            }
            //console.log(selectedCards);
        });
    }
}

function resetBoard() {
    selectedCards = [];
    lockBoard = false;
}




give_up1.addEventListener("click", function () {
    if (giveupTurn[1] == true) {
        sign.innerText = "게임 종료";
        restart();
    } else {
        giveupTurn[0] = true
        sign.innerText = "다음 턴에서 player2가 포기하면 게임 종료"
    }
    switchTurn();
});

give_up2.addEventListener("click", function () {
    if (giveupTurn[0] == true) {
        sign.innerText = "게임 종료";
        restart();
    } else {
        giveupTurn[1] = true
        sign.innerText = "다음 턴에서 player1가 포기하면 게임 종료"
    }
    switchTurn();
});

function restart() {
    if (confirm("다시 시작하시겠습니까?")) {
        cardTable.innerHTML = '';
        shuffleBtn.disabled = false;
        shuffleBtn.classList.remove("startBtnHover");
        sign.innerText = "시작할려면 카드 섞기를 눌러주세요!";
    }
}