function animateCellClick(cell){
    const img = cell.querySelector("img");
    img.style.transform = "scale(0.8)";
    img.style.transition = "transform 0.1s ease";
    setTimeout(() => {
        img.style.transform = "scale(1)";
    }, 100);
}

function animateBoard(cells){
    cells.forEach((cell, index) => {
        cell.style.opacity = 0;
        cell.style.transform = "scale(0.5)";
        cell.style.transition = `all 0.1s `;
        setTimeout(() => {
            cell.style.opacity = 1;
            cell.style.transform = "scale(1)";
        }, 50);
    });
}

function animateGameEnd(){
    const overlay = document.getElementById("game-end");
    const box = overlay.querySelector(".game-end-box");

    overlay.classList.remove("hidden");
    overlay.style.opacity = 0;
    box.style.transform = "scale(0.5)";
    box.style.opacity = 0;

    overlay.style.transition = "opacity 0.3s ease";
    box.style.transition = "all 0.4s ease";

    setTimeout(() => {
        overlay.style.opacity = 1;
        box.style.transform = "scale(1)";
        box.style.opacity = 1;
    }, 50);
}


function attachCellAnimations(cells){
    cells.forEach(cell => {
        cell.addEventListener("click", () => animateCellClick(cell));
    });
}
