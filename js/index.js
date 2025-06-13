let userName1;
let userName2;
const user1 = document.getElementById('user1');
const user2 = document.getElementById('user2');


startBtn.addEventListener('click', () => {
    userName1 = user1.value.trim() || '플레이어 1';
    userName2 = user2.value.trim() || '플레이어 2';

    if (userName1 === userName2) {
        alert("닉네임은 중복될 수 없습니다");
    }
    else {
        let difficulty=document.getElementById("difficulty").value;
        location.href = `game.html?user1=${userName1}&user2=${userName2}&difficulty=${difficulty}`; //difficulty=${} <= 이 활호안에 숫자 1, 2, 3 넣으면 쉬움, 보통, 어려움으로 지정됨
    }
});