let myModal = new bootstrap.Modal(document.getElementById('alertModal'))

//DOM selector
const board = document.querySelector(".boardBase");
const inputSize = document.querySelector("#inputSize");

//init value
let width = 8,
    totalSize = width * width;

//untuk meng Append square ke board
let change = false,
    backgroundColor = 'white';

//timer
let firstmove = false,
    timesup = false,
    duration = 60 * 5,
    minutes, seconds;

let countdown = setInterval(() => {
    startTimer();
}, 1000);

gameState.timer = duration;

function startTimer() {
    minutes = parseInt(gameState.timer / 60);
    seconds = parseInt(gameState.timer % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("timer").innerHTML = minutes + "m" + seconds + "s";
    gameState.boardState = board;

    if (gameState.timer <= 59) {
        document.getElementById("timer").classList.toggle('count-down');
    }
    if (gameState.timer-- === 0) {
        timesup = true;
        console.log("atas " + gameState.timer)
            // gameState.timer = duration;
        document.getElementById("timer").innerHTML = "Time's Up!!!";
        removePionsEventListener();
        checkWins(board);
        clearInterval(countdown);
    }

}

function stoptimer() {
    clearInterval(countdown);
}

//buat papan dengan pola kotak kotak
for (let i = 0; i < totalSize; i++) {
    const square = document.createElement('div')
    if (width % 2 != 0) {
        if (i % 2 != 0) {
            square.classList.add("color")
        }
    } else {
        change = i % 8 === 0 || i === 0
        backgroundColor = change ? backgroundColor : backgroundColor === 'white' ? 'color' : 'white'
        square.classList.add(backgroundColor)
        change = false
    }

    square.innerHTML = i
    square.setAttribute('id', i)
    square.classList.add("empty")
    board.appendChild(square)
}


// //Untuk Nampilin Pion Pertama Kali
for (let i = 0; i < width * 3; i++) { //Pion White
    if (board.children[i].classList.contains('color')) {
        board.children[i].innerHTML = '<img src="coin-w.svg">'
        board.children[i].classList.add("white-pion")
        board.children[i].classList.remove("empty")
    }
}

for (let i = totalSize - 1; i >= totalSize - width * 3; i--) { //Pion Color
    if (board.children[i].classList.contains('color')) {
        board.children[i].innerHTML = '<img src="coin-o.svg">'
        board.children[i].classList.add("color-pion")
        board.children[i].classList.remove("empty")
    }
}

function replayGame() {
    myModal.hide();

    document.getElementById("timer").classList.remove('count-down');
    document.getElementById("timer").innerHTML = "05m00s";
    gameState.timer = 60 * 5;
    countdown = setInterval(() => {
        startTimer();
    }, 1000);

    document.getElementById("colormove").innerHTML = "";
    document.getElementById("whitemove").innerHTML = "";
    board.innerHTML = "";

    //buat papan dengan pola kotak kotak
    for (let i = 0; i < totalSize; i++) {
        const square = document.createElement('div')
        if (width % 2 != 0) {
            if (i % 2 != 0) {
                square.classList.add("color")
            }
        } else {
            change = i % 8 === 0 || i === 0
            backgroundColor = change ? backgroundColor : backgroundColor === 'white' ? 'color' : 'white'
            square.classList.add(backgroundColor)
            change = false
        }

        square.innerHTML = i;
        square.setAttribute('id', i);
        square.classList.add("empty");
        board.appendChild(square);
    }

    //Untuk generate Pion
    for (let i = 0; i < width * 3; i++) { //Pion White
        if (board.children[i].classList.contains('color')) {
            board.children[i].innerHTML = '<img src="coin-w.svg">'
            board.children[i].classList.add("white-pion")
            board.children[i].classList.remove("empty")
        }
    }

    for (let i = totalSize - 1; i >= totalSize - width * 3; i--) { //Pion Color
        if (board.children[i].classList.contains('color')) {
            board.children[i].innerHTML = '<img src="coin-o.svg">'
            board.children[i].classList.add("color-pion")
            board.children[i].classList.remove("empty")
        }
    }
    gameState.playerTurn = true;
    gameState.player[0].score = 0;
    gameState.player[1].score = 0;
    gameState.player[0].firstKing = false;
    gameState.player[1].firstKing = false;
    document.getElementById('colorPionsScore').innerText = gameState.player[0].score;
    document.getElementById('whitePionsScore').innerText = gameState.player[1].score;
    clearClass();
    givePionsEventListener()
    checkPlayerCanMove()
}

// function newGame() {
//     window.location.href = "index.php";
// }

//Buat ngitung Pion White dan Color Tiap Makan
function winResult(boardState) {
    let PionWin = "Draw";
    if (gameState.player[0].score != gameState.player[1].score) {
        if (gameState.player[0].score > gameState.player[1].score) {
            PionWin = gameState.player[0].name;
        } else {
            PionWin = gameState.player[1].name;
        }
    } else if (gameState.player[0].score === gameState.player[1].score) {
        PionWin = gameState.player[0].firstKing ? gameState.player[0].name : PionWin;
        gameState.player[0].score += gameState.player[0].firstKing ? 15 : 0;
        PionWin = gameState.player[1].firstKing ? gameState.player[1].name : PionWin;
        gameState.player[1].score += gameState.player[1].firstKing ? 15 : 0;
    }
    gameState.winner = PionWin;
    return { PionWin }
}

//untuk tampilin jumlah pion
document.getElementById("colorPionsAmount").innerHTML = document.querySelectorAll('.color-pion').length
document.getElementById("whitePionsAmount").innerHTML = document.querySelectorAll('.white-pion').length

//untuk cek apakah board tsb sudah dalam kondisi menang atau belum
function checkWins(_board) {
    if (document.querySelectorAll('.white-pion').length === 0 || document.querySelectorAll('.color-pion').length === 0 || gameState.timer < 0) {
        document.getElementById('colorPionsScore').innerText = gameState.player[0].score;
        document.getElementById('whitePionsScore').innerText = gameState.player[1].score;
        removePionsEventListener()
        if (document.querySelectorAll('.white-pion').length === document.querySelectorAll('.color-pion').length && (!gameState.player[0].firstKing && !gameState.player[1].firstKing)) {
            document.getElementById('alertModalBody').innerHTML = "<h2>" + winResult(_board).PionWin + "</h2><p style='font-size:70pt;'>🤝</p>";
        } else {
            document.getElementById('alertModalBody').innerHTML = "<h2>" + winResult(_board).PionWin + " Win</h2><p style='font-size:70pt;'>🎉</p>";
        }
        stoptimer();
        myModal.show();
        document.getElementById('btnBackToMainMenu').removeAttribute('disabled');
        return true
    }
}

//untuk memberi event listerner click ke pions player
//biar bisa di click
function givePionsEventListener() {
    if (gameState.playerTurn) {
        document.querySelectorAll(".color-pion").forEach(function(element) {
            element.addEventListener('click', clickPion)
        });
    } else {
        document.querySelectorAll(".white-pion").forEach(function(element) {
            element.addEventListener('click', clickPion)
        });
    }
}

//untuk menghapus event listerner click dari pions
function removePionsEventListener() {
    for (let i = 0; i < totalSize; i++) {
        board.children[i].removeEventListener('click', clickPion)
    }
}

//untuk removeclass selected dan validmove
function clearClass() {
    for (let i = 0; i < totalSize; i++) {
        board.children[i].classList.remove('selected')
        board.children[i].classList.remove('valid-move')
        board.children[i].classList.remove('eat-move')
        board.children[i].classList.remove('can-move')
        board.children[i].removeAttribute('onclick')
    }
    if (gameState.playerTurn) {
        document.getElementById("playerTurnInfo").innerHTML = gameState.player[0].name;
    } else {
        document.getElementById("playerTurnInfo").innerHTML = gameState.player[1].name;
    }
    let whiteAmount = document.querySelectorAll('.white-pion').length
    let colorAmount = document.querySelectorAll('.color-pion').length
    document.getElementById("colorPionsAmount").innerHTML = colorAmount
    document.getElementById("whitePionsAmount").innerHTML = whiteAmount
}

//untuk memilih Pion
function clickPion() {
    clearClass()
    this.classList.add('selected')
    checkValidMove(this)
}

//untuk mengecek gerakan valid dari pion
function checkValidMove(selectedpion, chcAvaMove = true) {
    let pos = parseInt(selectedpion.getAttribute("id"))

    const isLeftEdge = (pos % width === 0)
    const isRightEdge = (pos % width === width - 1)
    const isTopEdge = (pos < width && pos >= 0)
    const isBottomEdge = (pos < totalSize && pos >= totalSize - width)

    const leftTop = pos - 1 - width
    const rightTop = pos + 1 - width

    const leftBottom = pos - 1 + width
    const rightBottom = pos + 1 + width

    //buat ngecek apakah kiri atas atau kanan atas adalah edge
    const leftTopIsEdge = (leftTop % width === 0)
    const rightTopIsEdge = (rightTop % width === width - 1)
    const leftTopIsTop = (leftTop < width && leftTop >= 0)
    const rightTopIsTop = (rightTop < width && rightTop >= 0)

    //buat ngecek apakah kiri bawah atau kanan bawah adalah edge
    const leftBottomIsEdge = (leftBottom % width === 0)
    const rightBottomIsEdge = (rightBottom % width === width - 1)
    const leftBottomIsBottom = (leftBottom >= totalSize - width && leftBottom < totalSize)
    const rightBottomIsBottom = (rightBottom >= totalSize - width && rightBottom < totalSize)

    if (gameState.playerTurn) { //Turn Player Pion Color
        if (selectedpion.classList.contains('king')) { //Gerakan Pion Raja Color
            pionKingValidMove("white-pion", chcAvaMove, pos, leftTop, rightTop, leftBottom, rightBottom, isLeftEdge, isRightEdge, isTopEdge, isBottomEdge, leftTopIsEdge, leftTopIsTop, rightTopIsEdge, rightTopIsTop, leftBottomIsEdge, leftBottomIsBottom, rightBottomIsEdge, rightBottomIsBottom)
        } else {
            //Gerakan Pion Color biasa
            //buat cek pos Kiri Atas [FIX] + Paksa Makan
            if (!isLeftEdge && !isTopEdge && !leftTopIsTop && !leftTopIsEdge && board.children[leftTop].classList.contains('white-pion') && board.children[leftTop - 1 - width].classList.contains('empty')) {
                if (chcAvaMove) {
                    board.children[leftTop - 1 - width].classList.add("valid-move")
                    board.children[leftTop].classList.add("eat-move")
                    board.children[leftTop - 1 - width].setAttribute('onclick', 'eatPion(' + pos + ',' + leftTop + ',' + parseInt(leftTop - 1 - width) + ')')
                } else {
                    board.children[pos].setAttribute('move', true)
                }
            } else if (!isRightEdge && !isTopEdge && board.children[rightTop].classList.contains('empty')) { //gerakan biasa
                if (chcAvaMove) {
                    board.children[rightTop].classList.add("valid-move")
                    board.children[rightTop].setAttribute('onclick', 'movePion(' + pos + ',' + rightTop + ')')
                } else {
                    board.children[pos].setAttribute('move', true)
                }
            }

            //buat cek pos Kanan Atas [FIX] + Paksa Makan
            if (!isRightEdge && !isTopEdge && !rightTopIsTop && !rightTopIsEdge && board.children[rightTop].classList.contains('white-pion') && board.children[rightTop + 1 - width].classList.contains('empty')) {
                if (chcAvaMove) {
                    board.children[rightTop + 1 - width].classList.add("valid-move")
                    board.children[rightTop].classList.add("eat-move")
                    board.children[rightTop + 1 - width].setAttribute('onclick', 'eatPion(' + pos + ',' + rightTop + ',' + parseInt(rightTop + 1 - width) + ')')
                } else {
                    board.children[pos].setAttribute('move', true)
                }
            } else if (!isLeftEdge && !isTopEdge && board.children[leftTop].classList.contains('empty')) { //gerakan biasa
                if (chcAvaMove) {
                    board.children[leftTop].classList.add("valid-move")
                    board.children[leftTop].setAttribute('onclick', 'movePion(' + pos + ',' + leftTop + ')')
                } else {
                    board.children[pos].setAttribute('move', true)
                }
            }
        }
    } else { //Turn Player Pion White
        if (selectedpion.classList.contains('king')) { //Gerakan Pion Raja Putih
            pionKingValidMove("color-pion", chcAvaMove, pos, leftTop, rightTop, leftBottom, rightBottom, isLeftEdge, isRightEdge, isTopEdge, isBottomEdge, leftTopIsEdge, leftTopIsTop, rightTopIsEdge, rightTopIsTop, leftBottomIsEdge, leftBottomIsBottom, rightBottomIsEdge, rightBottomIsBottom)
        } else {
            //Gerakan Pion White biasa
            //buat cek pos Kiri bawah [FIX] + Paksa Makan
            if (!isLeftEdge && !isBottomEdge && !leftBottomIsBottom && !leftBottomIsEdge && board.children[leftBottom].classList.contains('color-pion') && board.children[leftBottom - 1 + width].classList.contains('empty')) {
                if (chcAvaMove) {
                    board.children[leftBottom - 1 + width].classList.add("valid-move")
                    board.children[leftBottom].classList.add("eat-move")
                    board.children[leftBottom - 1 + width].setAttribute('onclick', 'eatPion(' + pos + ',' + leftBottom + ',' + parseInt(leftBottom - 1 + width) + ')')
                } else {
                    board.children[pos].setAttribute('move', true)
                }
            } else if (!isRightEdge && !isBottomEdge && board.children[rightBottom].classList.contains('empty')) { //gerakan biasa
                if (chcAvaMove) {
                    board.children[rightBottom].classList.add("valid-move")
                    board.children[rightBottom].setAttribute('onclick', 'movePion(' + pos + ',' + rightBottom + ')')
                } else {
                    board.children[pos].setAttribute('move', true)
                }
            }

            //buat cek pos Kanan bawah [FIX] + Paksa Makan
            if (!isRightEdge && !isBottomEdge && !rightBottomIsBottom && !rightBottomIsEdge && board.children[rightBottom].classList.contains('color-pion') && board.children[rightBottom + 1 + width].classList.contains('empty')) {
                if (chcAvaMove) {
                    board.children[rightBottom + 1 + width].classList.add("valid-move")
                    board.children[rightBottom].classList.add('eat-move')
                    board.children[rightBottom + 1 + width].setAttribute('onclick', 'eatPion(' + pos + ',' + rightBottom + ',' + parseInt(rightBottom + 1 + width) + ')')
                } else {
                    board.children[pos].setAttribute('move', true)
                }
            } else if (!isLeftEdge && !isBottomEdge && board.children[leftBottom].classList.contains('empty')) { //gerakan biasa
                if (chcAvaMove) {
                    board.children[leftBottom].classList.add("valid-move")
                    board.children[leftBottom].setAttribute('onclick', 'movePion(' + pos + ',' + leftBottom + ')')
                } else {
                    board.children[pos].setAttribute('move', true)
                }
            }
        }
    }
}

//untuk cek apakah player sekarang yg sedang bermain bisa bergerak atau tidak
function checkPlayerCanMove() {
    let CP = 0
    let canMove = []
    if (gameState.playerTurn) {
        CP = document.querySelectorAll(".color-pion")
    } else {
        CP = document.querySelectorAll(".white-pion")
    }
    let ctr = 0

    CP.forEach(function(element, index) {
        checkValidMove(element, false)
        if (!element.hasAttribute('move')) {
            ctr++
        } else {
            //here
            // CP[index].classList.add('valid-move');
            CP[index].classList.add('can-move');
            canMove.push(CP[index].getAttribute('id'));
        }
    });

    CP.forEach(function(element, index) {
        checkValidMove(element, false)
        if (element.hasAttribute('move')) {
            element.removeAttribute('move')
        }
    });

    let PionWin = ""
    let PionLose = ""
    if (gameState.playerTurn) {
        PionWin = gameState.player[1].name;
        PionLose = gameState.player[0].name;
    } else {
        PionWin = gameState.player[0].name;
        PionLose = gameState.player[1].name;
    }

    if (ctr === CP.length && CP.length != 0) {
        console.clear()
        removePionsEventListener()
        document.getElementById('alertModalBody').innerHTML = '<h2>' + PionWin + " Win </h2><p style='font-size:70pt;'>🎉</p><p>Because " + PionLose + " Has No Valid Movement</p>";
        stoptimer();
        myModal.show();

        document.getElementById('btnBackToMainMenu').removeAttribute('disabled');
    }
}

//gerakan Untuk pion king
function pionKingValidMove(pionType, chcAvaMove, pos, leftTop, rightTop, leftBottom, rightBottom, isLeftEdge, isRightEdge, isTopEdge, isBottomEdge, leftTopIsEdge, leftTopIsTop, rightTopIsEdge, rightTopIsTop, leftBottomIsEdge, leftBottomIsBottom, rightBottomIsEdge, rightBottomIsBottom) {
    let LT = false
    let RT = false
    let LB = false
    let RB = false

    //buat cek pos makan Kiri Atas [FIX] + Paksa Makan
    if (!isLeftEdge && !isTopEdge && !leftTopIsTop && !leftTopIsEdge && board.children[leftTop].classList.contains(pionType) && board.children[leftTop - 1 - width].classList.contains('empty')) {
        if (chcAvaMove) {
            LT = true
            board.children[leftTop - 1 - width].classList.add("valid-move")
            board.children[leftTop].classList.add("eat-move")
            board.children[leftTop - 1 - width].setAttribute('onclick', 'eatPion(' + pos + ',' + leftTop + ',' + parseInt(leftTop - 1 - width) + ')')
        } else {
            board.children[pos].setAttribute('move', true)
        }
    }

    //buat cek pos makan Kanan Atas [FIX] + Paksa Makan
    if (!isRightEdge && !isTopEdge && !rightTopIsTop && !rightTopIsEdge && board.children[rightTop].classList.contains(pionType) && board.children[rightTop + 1 - width].classList.contains('empty')) {
        if (chcAvaMove) {
            RT = true
            board.children[rightTop + 1 - width].classList.add("valid-move")
            board.children[rightTop].classList.add("eat-move")
            board.children[rightTop + 1 - width].setAttribute('onclick', 'eatPion(' + pos + ',' + rightTop + ',' + parseInt(rightTop + 1 - width) + ')')
        } else {
            board.children[pos].setAttribute('move', true)
        }
    }

    //buat cek pos makan Kiri bawah [FIX] + Paksa Makan
    if (!isLeftEdge && !isBottomEdge && !leftBottomIsBottom && !leftBottomIsEdge && board.children[leftBottom].classList.contains(pionType) && board.children[leftBottom - 1 + width].classList.contains('empty')) {
        if (chcAvaMove) {
            LB = true
            board.children[leftBottom - 1 + width].classList.add("valid-move")
            board.children[leftBottom].classList.add("eat-move")
            board.children[leftBottom - 1 + width].setAttribute('onclick', 'eatPion(' + pos + ',' + leftBottom + ',' + parseInt(leftBottom - 1 + width) + ')')
        } else {
            board.children[pos].setAttribute('move', true)
        }
    }

    // //buat cek pos makan Kanan bawah [FIX] + Paksa Makan
    if (!isRightEdge && !isBottomEdge && !rightBottomIsBottom && !rightBottomIsEdge && board.children[rightBottom].classList.contains(pionType) && board.children[rightBottom + 1 + width].classList.contains('empty')) {
        if (chcAvaMove) {
            RB = true
            board.children[rightBottom + 1 + width].classList.add("valid-move")
            board.children[rightBottom].classList.add('eat-move')
            board.children[rightBottom + 1 + width].setAttribute('onclick', 'eatPion(' + pos + ',' + rightBottom + ',' + parseInt(rightBottom + 1 + width) + ')')
        } else {
            board.children[pos].setAttribute('move', true)
        }
    }

    //buat cek pos gerak Kiri Atas [FIX] + Paksa Makan
    if (!RT && !LB && !RB && !isLeftEdge && !isTopEdge && board.children[leftTop].classList.contains('empty')) { //gerakan biasa
        if (chcAvaMove) {
            board.children[leftTop].classList.add("valid-move")
            board.children[leftTop].setAttribute('onclick', 'movePion(' + pos + ',' + leftTop + ')')
        } else {
            board.children[pos].setAttribute('move', true)
        }
    }

    //buat cek pos gerak Kanan Atas [FIX] + Paksa Makan
    if (!LT && !LB && !RB && !isRightEdge && !isTopEdge && board.children[rightTop].classList.contains('empty')) { //gerakan biasa
        if (chcAvaMove) {
            board.children[rightTop].classList.add("valid-move")
            board.children[rightTop].setAttribute('onclick', 'movePion(' + pos + ',' + rightTop + ')')
        } else {
            board.children[pos].setAttribute('move', true)
        }
    }

    //buat cek pos gerak Kiri Bawah [FIX] + Paksa Makan
    if (!LT && !RT && !RB && !isLeftEdge && !isBottomEdge && board.children[leftBottom].classList.contains('empty')) { //gerakan biasa
        if (chcAvaMove) {
            board.children[leftBottom].classList.add("valid-move")
            board.children[leftBottom].setAttribute('onclick', 'movePion(' + pos + ',' + leftBottom + ')')
        } else {
            board.children[pos].setAttribute('move', true)
        }
    }

    //buat cek pos gerak Kanan Bawah[FIX] + Paksa Makan
    if (!LT && !RT && !LB && !isRightEdge && !isBottomEdge && board.children[rightBottom].classList.contains('empty')) { //gerakan biasa
        if (chcAvaMove) {
            board.children[rightBottom].classList.add("valid-move")
            board.children[rightBottom].setAttribute('onclick', 'movePion(' + pos + ',' + rightBottom + ')')
        } else {
            board.children[pos].setAttribute('move', true)
        }
    }
}

//untuk memakan pion player lain
function eatPion(from, eat, to) {
    let text = 'Eat : (' + from + ') -> (' + eat + ') -> (' + to + ')'
        // console.log(text)

    //buat cetak gerakan
    let br = document.createElement('li');
    br.innerHTML = text
    if (gameState.playerTurn) {
        updateScore(10);
        document.getElementById("colormove").append(br)
    } else {
        updateScore(10);
        document.getElementById("whitemove").append(br)
    }
    scrollToEnd()

    // console.log('\n')

    const leftTop = to - 1 - width
    const rightTop = to + 1 - width

    const leftBottom = to - 1 + width
    const rightBottom = to + 1 + width

    const isLeftEdge = (to % width === 0)
    const isRightEdge = (to % width === width - 1)
    const isTopEdge = (to < width && to >= 0)
    const isBottomEdge = (to < totalSize && to >= totalSize - width)

    //buat ngecek apakah kiri atas atau kanan atas adalah edge
    const leftTopIsEdge = (leftTop % width === 0)
    const rightTopIsEdge = (rightTop % width === width - 1)
    const leftTopIsTop = (leftTop < width && leftTop >= 0)
    const rightTopIsTop = (rightTop < width && rightTop >= 0)

    //buat ngecek apakah kiri bawah atau kanan bawah adalah edge
    const leftBottomIsEdge = (leftBottom % width === 0)
    const rightBottomIsEdge = (rightBottom % width === width - 1)
    const leftBottomIsBottom = (leftBottom >= totalSize - width && leftBottom < totalSize)
    const rightBottomIsBottom = (rightBottom >= totalSize - width && rightBottom < totalSize)

    const pionType = board.children[from].innerHTML

    const pionFrom = (board.children[from].classList.contains('color-pion')) ? "color-pion" : "white-pion";

    board.children[from].innerHTML = board.children[from].getAttribute('id')
    board.children[from].classList.remove(pionFrom)
    board.children[from].classList.add("empty")

    const pionEat = (board.children[eat].classList.contains('white-pion')) ? "white-pion" : "color-pion";

    // board.children[eat].innerHTML = ""
    board.children[eat].innerHTML = board.children[eat].getAttribute('id')
    board.children[eat].classList.remove(pionEat)
    board.children[eat].classList.add("empty")

    board.children[to].classList.remove('empty')
    board.children[to].classList.add(pionFrom)

    if (board.children[from].classList.contains('king')) {
        board.children[from].classList.remove('king')
        board.children[to].classList.add('king')
    }

    if (board.children[eat].classList.contains('king')) {
        board.children[eat].classList.remove('king')
    }

    board.children[to].innerHTML = pionType;

    if (isTopEdge && !board.children[to].classList.contains('white-pion')) {
        board.children[to].innerHTML = '<img src="coin-o-king.svg">'
        board.children[to].classList.add('king')
        if (!gameState.player[1].firstKing) {
            gameState.player[0].firstKing = true;
            document.querySelectorAll('#colormove li')[document.querySelectorAll('#colormove li').length - 1].textContent += ' First King';
        }
    }

    if (isBottomEdge && !board.children[to].classList.contains('color-pion')) {
        board.children[to].innerHTML = '<img src="coin-w-king.svg">'
        board.children[to].classList.add('king')
        if (!gameState.player[0].firstKing) {
            gameState.player[1].firstKing = true;
            document.querySelectorAll('#whitemove li')[document.querySelectorAll('#whitemove li').length - 1].textContent += ' First King';
        }
    }
    //buat ganti giliran main
    gameState.playerTurn = (gameState.playerTurn) ? false : true;

    //buat delay kalau double jump biar gak kelihatan ghost
    const jumpDelay = 350
    setTimeout(() => {
        if (board.children[to].classList.contains('color-pion')) { //double Jump Untuk Color Pion
            if (!isLeftEdge && !isTopEdge && !leftTopIsTop && !leftTopIsEdge && board.children[leftTop].classList.contains('white-pion') && board.children[leftTop - 1 - width].classList.contains('empty')) {
                gameState.playerTurn = true;
                eatPion(to, leftTop, leftTop - 1 - width)
            } else if (!isRightEdge && !isTopEdge && !rightTopIsTop && !rightTopIsEdge && board.children[rightTop].classList.contains('white-pion') && board.children[rightTop + 1 - width].classList.contains('empty')) {
                gameState.playerTurn = true;
                eatPion(to, rightTop, rightTop + 1 - width)
            }

            if (board.children[to].classList.contains('king')) { //double Jump Untuk Color Pion King
                if (!isLeftEdge && !isBottomEdge && !leftBottomIsBottom && !leftBottomIsEdge && board.children[leftBottom].classList.contains('white-pion') && board.children[leftBottom - 1 + width].classList.contains('empty')) {
                    gameState.playerTurn = true;
                    eatPion(to, leftBottom, leftBottom - 1 + width)
                } else if (!isRightEdge && !isBottomEdge && !rightBottomIsBottom && !rightBottomIsEdge && board.children[rightBottom].classList.contains('white-pion') && board.children[rightBottom + 1 + width].classList.contains('empty')) {
                    gameState.playerTurn = true;
                    eatPion(to, rightBottom, rightBottom + 1 + width)
                }
            }
        }

        if (board.children[to].classList.contains('white-pion')) { //double Jump Untuk White Pion
            if (!isLeftEdge && !isBottomEdge && !leftBottomIsBottom && !leftBottomIsEdge && board.children[leftBottom].classList.contains('color-pion') && board.children[leftBottom - 1 + width].classList.contains('empty')) {
                gameState.playerTurn = false;
                eatPion(to, leftBottom, leftBottom - 1 + width)
            } else if (!isRightEdge && !isBottomEdge && !rightBottomIsBottom && !rightBottomIsEdge && board.children[rightBottom].classList.contains('color-pion') && board.children[rightBottom + 1 + width].classList.contains('empty')) {
                gameState.playerTurn = false;
                eatPion(to, rightBottom, rightBottom + 1 + width)
            }
            if (board.children[to].classList.contains('king')) { //double Jump Untuk White Pion King
                if (!isLeftEdge && !isTopEdge && !leftTopIsTop && !leftTopIsEdge && board.children[leftTop].classList.contains('color-pion') && board.children[leftTop - 1 - width].classList.contains('empty')) {
                    gameState.playerTurn = false;
                    eatPion(to, leftTop, leftTop - 1 - width)
                } else if (!isRightEdge && !isTopEdge && !rightTopIsTop && !rightTopIsEdge && board.children[rightTop].classList.contains('color-pion') && board.children[rightTop + 1 - width].classList.contains('empty')) {
                    gameState.playerTurn = false;
                    eatPion(to, rightTop, rightTop + 1 - width)
                }
            }
        }
    }, jumpDelay)


    removePionsEventListener()
    givePionsEventListener()
    clearClass()
    checkWins(board)
    checkPlayerCanMove()
    setTimeout(() => {
        if (!gameState.playerTurn) {
            // AIMove()
        }
    }, 10)

}

//untuk memindahkan Pion
function movePion(from, to) {
    let text = 'Move : (' + from + ') -> (' + to + ')'
    let br = document.createElement('li');
    br.innerHTML = text
    if (gameState.playerTurn) {
        document.getElementById("colormove").append(br)
    } else {
        document.getElementById("whitemove").append(br)
    }
    scrollToEnd()

    const pionType = board.children[from].innerHTML;
    const pionFrom = board.children[from];
    const pionTo = board.children[to];

    pionFrom.innerHTML = pionFrom.getAttribute('id')

    if (gameState.playerTurn) { //pindahan Pion Color
        if (pionFrom.classList.contains('king')) {
            pionFrom.classList.remove("color-pion", "king")
            pionFrom.classList.add("empty")
            pionTo.classList.remove('empty')
            pionTo.classList.add('color-pion', 'king')
        } else {
            pionFrom.classList.remove("color-pion")
            pionFrom.classList.add("empty")
            pionTo.classList.remove('empty')
            pionTo.classList.add('color-pion')
        }
        pionTo.innerHTML = pionType

        const isTopEdge = (to < width && to >= 0)
        if (isTopEdge) { //Untuk ubah Pion Color jadi KING
            if (!gameState.player[1].firstKing) {
                gameState.player[0].firstKing = true;
                document.querySelectorAll('#colormove li')[document.querySelectorAll('#colormove li').length - 1].textContent += ' First King';
            }
            pionTo.innerHTML = '<img src="coin-o-king.svg">'
            pionTo.classList.add('king')
        }
        gameState.playerTurn = false;
        // board.classList.add('rotate-180-cw');
    } else { //pindahan Pion White
        if (pionFrom.classList.contains('king')) {
            pionFrom.classList.remove("white-pion", "king")
            pionFrom.classList.add("empty")
            pionTo.classList.remove('empty')
            pionTo.classList.add('white-pion', 'king')
        } else {
            pionFrom.classList.remove("white-pion")
            pionFrom.classList.add("empty")
            pionTo.classList.remove('empty')
            pionTo.classList.add('white-pion')
        }
        pionTo.innerHTML = pionType

        const isBottomEdge = (to < totalSize && to >= totalSize - width)
        if (isBottomEdge) { //Untuk ubah Pion white jadi KING
            if (!gameState.player[0].firstKing) {
                gameState.player[1].firstKing = true;
                document.querySelectorAll('#whitemove li')[document.querySelectorAll('#whitemove li').length - 1].textContent += ' First King';
            }
            pionTo.innerHTML = '<img src="coin-w-king.svg">'
            pionTo.classList.add('king')
        }
        gameState.playerTurn = true;
        // board.classList.remove('rotate-180-cw');
    }

    removePionsEventListener()
    givePionsEventListener()
    clearClass()
    checkPlayerCanMove()
    setTimeout(() => {
        if (!gameState.playerTurn) {
            // AIMove()
        }
    }, 10)
}

clearClass();
givePionsEventListener();
checkPlayerCanMove();

//buat show gerakan selalu menujukan gerakan yg terbaru
function scrollToEnd() {
    let list = null
    if (gameState.playerTurn) {
        list = document.getElementById("colormove");
    } else {
        list = document.getElementById("whitemove");
    }
    list.scrollTop = list.scrollHeight;
}

function updateScore(_score) {
    if (gameState.playerTurn) {
        gameState.player[0].score += _score;
        document.getElementById('colorPionsScore').innerText = gameState.player[0].score;
    } else {
        gameState.player[1].score += _score;
        document.getElementById('whitePionsScore').innerText = gameState.player[1].score;
    }
}

function getBoardState() {
    let board_state = [];
    for (let i = 0; i < totalSize; i++) {
        // board_state.push(board.children[i].classList.value.split(' ')[0] + " " + board.children[i].classList.value.split(' ')[1]);
        board_state.push(board)
    }
    return board_state;
}
window.onbeforeunload = function() {
    return 'Are you really want to perform the action?';
}

$(document).ready(function() {
    $("#btnNewGame").on("click", function() {
        let scr = 0;
        if (gameState.winner === gameState.player[0].name) {
            scr = gameState.player[0].score;
        } else if (gameState.winner === gameState.player[1].name) {
            scr = gameState.player[1].score;
        }

        let data = new FormData();
        data.append("id", window.location.search.substr(4, 6));
        data.append("timer", gameState.timer);
        data.append("score", scr);
        data.append("winner", gameState.winner);
        data.append("idp1", gameState.player[0].id);
        data.append("idp2", gameState.player[1].id);

        $.ajax({
            type: "POST",
            data: data,
            url: 'process/post_data_game2.php',
            processData: false,
            contentType: false,
            success: function(response) {
                window.location.href = "index.php"
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus)
            }
        });
    });

    $("#btnBackToMainMenu").on("click", function() {
        let scr = 0;
        if (gameState.winner === gameState.player[0].name) {
            scr = gameState.player[0].score;
        } else if (gameState.winner === gameState.player[1].name) {
            scr = gameState.player[1].score;
        }

        let data = new FormData();
        data.append("id", window.location.search.substr(4, 6));
        data.append("timer", gameState.timer);
        data.append("score", scr);
        data.append("winner", gameState.winner);
        data.append("idp1", gameState.player[0].id);
        data.append("idp2", gameState.player[1].id);

        $.ajax({
            type: "POST",
            data: data,
            url: 'process/post_data_game2.php',
            processData: false,
            contentType: false,
            success: function(response) {
                window.location.href = "index.php"
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus)
            }
        });
    });

});