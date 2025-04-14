'use strict';

const startButton = document.querySelector('.button-start-game');
const restartButton = document.querySelector('.button-restart');
const nextLevelButton = document.querySelector('.button-next-level');

const menu = document.querySelector('.game-menu');
const wrapper = document.querySelector('.wrapper');
const gameScreen = document.querySelector('.game-screen');
const gunman = document.getElementById('gunman');
const gamePanel = document.querySelector('.game-panels');
const message = document.querySelector('.message');
const messageFire = document.querySelector('.message--fire');

let duelStarted = false;
let fireTime = 0;
let clickTime = 0;
let clicked = false;
let fireTimeout;

startButton.addEventListener('click', startGame);

gunman.addEventListener('click', () => {
    if (!duelStarted || clicked) return;

    clicked = true;
    clickTime = performance.now();
    const reaction = clickTime - fireTime;

    if (reaction < 800) {
        playerShootsGunman(reaction);
    } else {
        gunmanShootsPlayer();
    }
});

function startGame() {
    menu.style.display = 'none';
    wrapper.style.display = 'block';
    gameScreen.style.display = 'block';
    gamePanel.style.display = 'block';

    moveGunman();
}

function restartGame() {

}

function nextLevel() {

}

function moveGunman() {
    setTimeout(() => {
        stopWalking();
    }, 2000);
}

function stopWalking() {
    gunman.classList.remove('gunman-level-1__shooting', 'gunman-level-1__death', 'gunman-level-1__ready');
    gunman.classList.add('gunman-level-1__ready');

    setTimeout(() => {
         prepareForDuel();
    }, 1000);
}

function prepareForDuel() {
    gunman.classList.remove('gunman-level-1__standing');
    gunman.classList.add('gunman-level-1__ready');

     const delay = Math.floor(Math.random() * 2000) + 1000;
    duelStarted = true;
    messageFire.style.display = 'block';
    fireTime = performance.now();
    timeCounter();
    fireTimeout = setTimeout(() => {
        messageFire.style.display = 'none';
        if (!clicked) {
            gunmanShootsPlayer();
        }
    }, delay);
}

function timeCounter() {
    const gunmanTime = document.querySelector('.time-panel__gunman');
    const youTime = document.querySelector('.time-panel__you');

    const interval = setInterval(() => {
        if (!duelStarted) return clearInterval(interval);

        const currentTime = (performance.now() - fireTime) / 1000;
        youTime.textContent = currentTime.toFixed(2);
    }, 16);
}

function gunmanShootsPlayer() {
    duelStarted = false;
    message.style.display = 'block';
    message.textContent = 'You lose! Gunman shot first.';

    gunman.classList.remove('gunman-level-1__ready');
    gunman.classList.add('gunman-level-1__standing');
}

function playerShootsGunman(reaction) {
    duelStarted = false;
    message.style.display = 'block';
    message.textContent = `You win! Reaction: ${(reaction / 1000).toFixed(2)}s`;

    gunman.classList.remove('gunman-level-1__ready');
    gunman.classList.add('gunman-level-1__death');
}
function scoreCount() {

}