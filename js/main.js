import * as Deck from '../utils/system.js';

const user = [document.getElementById("showName1").innerText, document.getElementById("showName2").innerText]

const score1 = document.getElementById("userScore1");
const score2 = document.getElementById("userScore2");

const icon1 = document.getElementById("icon1");
const icon2 = document.getElementById("icon2");

const playBoard = document.getElementById('playBoard');
const gamePlaying = document.getElementById('gamePlaying');
const shuffleBtn = document.getElementById('shuffleTrump');
const sign = document.getElementById('sign');
const cardTable = document.getElementById('cardTable');

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
    let text = currentPlayerIndex == 0 ? `플레이어 ${user[0]}의 차례` : `플레이어 ${user[1]}의 차례`;

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
    }
    else {
        icon2.classList.add('blue-glow-effect')
        icon1.classList.remove('blue-glow-effect')
    }

}

function hideCard() {
    for (const item of cards) {
        item.childNodes[0].src = `./imgs/Card_back.png`;
        item.childNodes[0].classList.add('card');
    }
}

function showCard() {
    for (const item of cards) {
        item.childNodes[0].src = `./imgs/${item.childNodes[0].id}.png`;
    }
}

function makeCard() {
    cardTable.innerHTML = '';
    let row;
    deck = Deck.getDeck();
    let column = deck.length / 4;
    for (let i = 0; i < deck.length; i++) {
        if (i % column == 0) {
            row = document.createElement('tr');
            cardTable.appendChild(row);
        }
        let cell = document.createElement('td');
        //console.log(deck[i]);
        let img = document.createElement('img');
        img.src = `./imgs/${deck[i].id}.png`;
        img.classList.add('card');
        img.classList.add('unselectCard');
        img.id = `${deck[i].id}`;

        cell.appendChild(img);
        cell.classList.add('cell');

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
    cards = document.getElementsByClassName("cell");
    shuffleBtn.disabled = true;
    shuffleBtn.classList.remove("startBtnHover");
    resetBoard()

    const second = 5;
    Deck.shuffleTrump();
    makeCard();
    showCard();
    countDown(second);

    let StartTimeout = setTimeout(() => {
        cardAddEvnet();
        hideCard();
        icon1.classList.add('blue-glow-effect')
        gamePlaying.innerText = `${user[0]}님의 차례`;
        give_up2.disabled = true;
        give_up1.disabled = false;
    }, (second + 1) * 1000);

});

function compareToCard() {
    const [firstCard, secondCard] = selectedCards;
    if (firstCard.id === secondCard.id) {
        sign.innerText = `${user[currentPlayerIndex]}님 득점!`;
        score[currentPlayerIndex]++;
        score1.innerText = score[0] + '점';
        score2.innerText = score[1] + '점';
        firstCard.classList.replace('selectCard', 'matched');
        secondCard.classList.replace('selectCard', 'matched');
        rightCardCnt++;
        resetBoard();
    } else {
        sign.innerText = "카드가 다릅니다!";
        setTimeout(() => {
            // 카드를 다시 뒷면으로 뒤집습니다.
            firstCard.src = `./imgs/Card_back.png`;
            firstCard.classList.replace('selectCard', 'unselectCard');
            secondCard.src = `./imgs/Card_back.png`;
            secondCard.classList.replace('selectCard', 'unselectCard');
            switchTurn();// 턴 전환
        }, 800);
        resetBoard();
    }
}

function cardAddEvnet() {
    for (const item of cards) {
        item.addEventListener("click", function () {
            //console.log(`./imgs/${this.id}.png>`);
            // item.removeChild(item.childNodes[0]);
            // let img = document.createElement('img');
            const selectCard = this.childNodes[0];

            if (selectCard.classList.contains('selectCard') || lockBoard || selectCard.classList.contains('matched')) {
                return;
            }

            selectCard.src = `./imgs/${selectCard.id}.png`;
            selectCard.classList.replace('unselectCard', 'selectCard');
            selectedCards.push(selectCard);

            if (selectedCards.length === 2) {
                lockBoard = true; // 두 번째 카드가 선택되면 보드를 잠급니다.
                giveupTurn[0] = false;
                giveupTurn[1] = false;
                give_up1.disabled = false;
                give_up2.disabled = false;
                compareToCard();
            }

            if (rightCardCnt == 32) {
                alert("게임 종료!");
                let text = '';
                if (score[0] > score[1]) {
                    text = user1 + "님이 승리했습니다!";
                }
                else if (score[1] > score[0]) {
                    text = user2 + "님이 승리했습니다!";
                }
                else {
                    text = "동점입니다!"
                }
                sign.innerText = text;
                lockBoard = true;
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
        gameEnd();
    } else {
        giveupTurn[0] = true
        sign.innerText = `다음 턴에서 ${user[0]}님이 포기하면 게임 종료`
        switchTurn();
    }
});

give_up2.addEventListener("click", function () {
    if (giveupTurn[0] == true) {
        gameEnd();
    } else {
        giveupTurn[1] = true
        sign.innerText = `다음 턴에서 ${user[1]}님이 포기하면 게임 종료`
        switchTurn();
    }
});

function gameEnd() {
    sign.innerText = "게임 종료";
    alert("게임 종료!");
    showCard();
    lockBoard = true;
    give_up2.disabled = true;
    give_up1.disabled = true;
    giveupTurn = [false, false];
    icon1.classList.remove('blue-glow-effect');
    icon2.classList.remove('blue-glow-effect');
    restart();
}

function restart() {
    shuffleBtn.disabled = false;
    shuffleBtn.classList.remove("startBtnHover");
    sign.innerText = "다시 시작할려면 카드 섞기를 눌러주세요!";
}

let difficulty = 3;
const url = new URL(window.location.href);
const urlParams = url.searchParams;
if (urlParams.has("difficulty")) {
    difficulty = urlParams.get('difficulty');
}

function playBoardSize() {
    if (difficulty == 1) {
        playBoard.style.width = "50%"
    }
    else if (difficulty == 2) {
        playBoard.style.width = "75%"
    }
    
}


Deck.makeDeck(difficulty);
playBoardSize();
makeCard();
give_up2.disabled = true;
give_up1.disabled = true;