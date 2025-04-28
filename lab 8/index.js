const gameContainer = document.getElementById("game");
const timerDisplay = document.getElementById("timer");
const movesDisplay = document.getElementById("moves");
const startBtn = document.getElementById("startBtn");
const resetSettingsBtn = document.getElementById("resetSettingsBtn");
const restartBtn = document.getElementById("restartBtn");
const messageContainer = document.getElementById("message");
const playerModeSelect = document.getElementById("playerMode");
const player2Container = document.getElementById("player2Container");

let gridRows = 4,
    gridCols = 4,
    difficulty = "easy",
    totalTime = 180,
    timer,
    timeLeft,

    cards = [],
    flipped = [],
    matched = 0,
    moves = 0,

    currentPlayer = 1,
    playerScores = { 1: 0, 2: 0 },

    rounds = 1,
    currentRound = 1,
    roundStats = [];

const cardImages = [
    'img/plankton.jpg', 'img/Mrs.Puff.png', 'img/Patrick.png', 'img/Spongebob.png',
    'img/spongebob_2.jpg', 'img/spongebob_3.jpeg', 'img/spongebob_4.jpg', 'img/Gary.jpg',
    'img/pineapple_house.jpg', 'img/squidward.jpg', 'img/stone_house.webp', 'img/spongebob_5.webp',
    'img/krusty-krab.jpg', 'img/crabsburger.jpg', 'img/TheChumBucket.webp', 'img/squidward_2.jpg',
    'img/stone_house.webp', 'img/Patrick_house.webp'
];

function getTimeForDifficulty(level) {
    switch (level) {
        case "easy": return 180;
        case "normal": return 120;
        case "hard": return 60;
        default: return 180;
    }
}

function updateInfo() {
    movesDisplay.textContent = `Раунд ${currentRound}/${rounds} 🔄 Ходи: ${moves} | 👤 Гравець: ${currentPlayer === 1 ? player1Name : player2Name} | 🎯 Очки: ${player1Name} - ${playerScores[1]} / ${player2Name} - ${playerScores[2]}`;
}

function updateTimer() {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");
    timerDisplay.textContent = `⏱ ${minutes}:${seconds}`;

    if (timeLeft <= 0) {
        clearInterval(timer);
        endRound();
    }
    timeLeft--;
}

function disableAllCards() {
    cards.forEach(card => card.removeEventListener("click", onCardClick));
}

function startTimer() {
    clearInterval(timer);
    timeLeft = totalTime;
    updateTimer();
    timer = setInterval(updateTimer, 1000);
}

function createDeck() {
    const pairCount = (gridRows * gridCols) / 2;
    const selectedImages = cardImages.slice(0, pairCount);
    const deck = [...selectedImages, ...selectedImages];
    deck.sort(() => Math.random() - 0.5);
    return deck;
}

function renderGrid() {
    gameContainer.innerHTML = "";
    gameContainer.style.gridTemplateColumns = `repeat(${gridCols}, 100px)`;
    cards = [];
    flipped = [];
    matched = 0;
    moves = 0;
    currentPlayer = 1;
    playerScores = { 1: 0, 2: 0 };
    updateInfo();

    const deck = createDeck();

    deck.forEach(imagePath => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.image = imagePath;

        const frontFace = document.createElement("div");
        frontFace.className = "card-front";

        const backFace = document.createElement("div");
        backFace.className = "card-back";

        const img = document.createElement("img");
        img.src = imagePath;
        img.alt = "card image";
        backFace.appendChild(img);

        card.appendChild(frontFace);
        card.appendChild(backFace);

        card.addEventListener("click", () => onCardClick(card));
        gameContainer.appendChild(card);
        cards.push(card);
    });
}

function onCardClick(card) {
    if (flipped.length >= 2 || card.classList.contains("flipped") || card.classList.contains("matched")) return;

    card.classList.add("flipped");
    flipped.push(card);

    if (flipped.length === 2) {
        moves++;
        updateInfo();
        const [first, second] = flipped;

        if (first.dataset.image === second.dataset.image) {
            first.classList.add("matched");
            second.classList.add("matched");
            matched += 1;
            playerScores[currentPlayer]++;
            flipped = [];

            updateInfo();

            if (matched === (gridRows * gridCols) / 2) {
                clearInterval(timer);
                setTimeout(() => {
                    endRound();
                }, 300);
            }
        } else {
            setTimeout(() => {
                first.classList.remove("flipped");
                second.classList.remove("flipped");
                flipped = [];
                switchPlayer();
                updateInfo();
            }, 800);
        }
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

function formatTime(seconds) {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
}

function showMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.className = "message";
    messageElement.textContent = message;

    messageContainer.innerHTML = "";
    messageContainer.appendChild(messageElement);
}

function endRound() {
    disableAllCards();
    const roundTime = totalTime - timeLeft;

    // Зберігаємо статистику раунду
    roundStats.push({
        round: currentRound,
        moves,
        time: formatTime(roundTime),
        winner: playerScores[1] > playerScores[2] ? player1Name : playerScores[1] < playerScores[2] ? player2Name : "Нічия"
    });

    if (currentRound < rounds) {
        currentRound++;
        setTimeout(() => {
            renderGrid();
            startTimer();
        }, 1000);
    } else {
        // Всі раунди завершено
        setTimeout(showFinalResult, 1000);
    }
}

function showFinalResult() {
    let resultText = "🏆 Підсумки гри:\n";
    let player1Wins = 0, player2Wins = 0;

    roundStats.forEach(stat => {
        resultText += `Раунд ${stat.round}: ${stat.winner} | Ходи: ${stat.moves} | Час: ${stat.time}\n`;
        if (stat.winner === player1Name) player1Wins++;
        if (stat.winner === player2Name) player2Wins++;
    });

    let finalWinner;
    if (player1Wins > player2Wins) {
        finalWinner = `🎉 ${player1Name} переміг у грі!`;
    } else if (player2Wins > player1Wins) {
        finalWinner = `🎉 ${player2Name} переміг у грі!`;
    } else {
        finalWinner = "🤝 Гра закінчилась нічиєю!";
    }

    showMessage(`${resultText}\n${finalWinner}`);
}

startBtn.addEventListener("click", () => {
    player1Name = document.getElementById("player1Name").value || "Гравець 1";
    player2Name = document.getElementById("player2Name").value || "Гравець 2";
    const size = document.getElementById("gridSize").value.split("x");
    gridRows = parseInt(size[0]);
    gridCols = parseInt(size[1]);
    difficulty = document.getElementById("difficulty").value;
    totalTime = getTimeForDifficulty(difficulty);

    rounds = Math.min(parseInt(document.getElementById("rounds").value) || 1, 3);

    if ((gridRows * gridCols) / 2 > cardImages.length) {
        showMessage(`Недостатньо картинок для такого розміру! Максимум ${(cardImages.length) * 2} карток.`);
        return;
    }

    currentRound = 1;
    roundStats = [];
    renderGrid();
    startTimer();
});

resetSettingsBtn.addEventListener("click", () => {
    document.getElementById("gridSize").value = "4x4";
    document.getElementById("difficulty").value = "easy";
});

restartBtn.addEventListener("click", () => {
    clearInterval(timer);
    currentRound = 1;
    roundStats = [];
    renderGrid();
    startTimer();
});

let player1Name = "Гравець 1";
let player2Name = "Гравець 2";

playerModeSelect.addEventListener("change", () => {
    if (playerModeSelect.value === "2") {
        player2Container.style.display = "block";
    } else {
        player2Container.style.display = "none";
    }
});

// Правильне відображення після початкового завантаження
if (playerModeSelect.value === "2") {
    player2Container.style.display = "block";
} else {
    player2Container.style.display = "none";
}
