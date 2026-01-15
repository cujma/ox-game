const btnModeBasic = document.getElementById("mode-basic-btn");
const btnModeAi = document.getElementById("mode-ai-btn");
const btnModeSpecial = document.getElementById("mode-special-btn");

const modeBasic = document.getElementById("mode-basic");
const modeAi = document.getElementById("mode-ai");
const modeSpecial = document.getElementById("mode-special");
const menu = document.getElementById("menu");

const btnGoBackBasicMode = document.getElementById("go-back-basic");
const btnGoBackAiMode = document.getElementById("go-back-ai");
const btnGoBackSpecialMode = document.getElementById("go-back-special");

const overlayGameEnd = document.getElementById("game-end");
const gameEndText = document.getElementById("game-end-text");
const playAgainBtn = document.getElementById("play-again-btn");
const backToMenuBtn = document.getElementById("back-to-menu-btn");



function startBasicMode(){
    menu.classList.add("hidden");
    modeBasic.classList.remove("hidden");
}

function startAiMode(){
    menu.classList.add("hidden");
    modeAi.classList.remove("hidden");
}

function startSpecialMode(){
    menu.classList.add("hidden");
    modeSpecial.classList.remove("hidden");
}



function backToMenuBasicMode(){
    menu.classList.remove("hidden");
    modeBasic.classList.add("hidden");
}


function backToMenuAiMode(){
    menu.classList.remove("hidden");
    modeAi.classList.add("hidden");
}

function backToMenuSpecialMode(){
    menu.classList.remove("hidden");
    modeSpecial.classList.add("hidden");
}



btnModeBasic.addEventListener("click", startBasicMode);
btnModeAi.addEventListener("click", startAiMode);
btnModeSpecial.addEventListener("click", startSpecialMode);

btnGoBackBasicMode.addEventListener("click", backToMenuBasicMode);
btnGoBackAiMode.addEventListener("click", backToMenuAiMode);
btnGoBackSpecialMode.addEventListener("click", backToMenuSpecialMode);



function showGameEnd(text){
    const gameEnd = document.querySelector("#game-end h1");
    gameEnd.innerHTML = text;
    overlayGameEnd.classList.remove("hidden");
    overlayGameEnd.classList.add("show");
}

function hideGameEnd(){
    overlayGameEnd.classList.remove("show");
    overlayGameEnd.classList.add("hidden");
}



playAgainBtn.addEventListener("click", () => {
    hideGameEnd();
    if (!modeBasic.classList.contains("hidden")) gameResetBasic();
    if (!modeAi.classList.contains("hidden")) gameResetAI();
    if (!modeSpecial.classList.contains("hidden")) gameResetSpecial();
});

backToMenuBtn.addEventListener("click", () => {
    hideGameEnd();
    modeBasic.classList.add("hidden");
    modeAi.classList.add("hidden");
    modeSpecial.classList.add("hidden");
    menu.classList.remove("hidden");
});
