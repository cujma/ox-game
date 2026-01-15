const winningCombinationsSpecial = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const lifeTime = 8;
let boardSpecial = Array(9).fill(-1);
let special;

class SpecialMode {
    constructor(){
        this.cells = document.querySelectorAll(".cell-special");
        this.currentPlayer = 1;
        this.gameActive = true;
        this.boardLifetime = Array(9).fill(0);
        this.gameStartTime = performance.now();
        this.resetBoardGraphics();
        this.updateStatus();
    }

    resetBoardGraphics(){
        this.cells.forEach(cell => {
            const img = cell.querySelector("img");
            img.src = "assets/blank.png";
            img.style.opacity = 1;
        });
    }

    updateLifetime(){
        for(let i = 0; i < this.cells.length; i++){
            if(this.boardLifetime[i] > 0){
                this.boardLifetime[i]--;
            }
            if(this.boardLifetime[i] <= 0){
                boardSpecial[i] = -1;
            }
        }
    }

    refreshBoard(){
        for(let i = 0; i < this.cells.length; i++){
            const img = this.cells[i].querySelector("img");

            if(this.boardLifetime[i] === 0){
                img.src = "assets/blank.png";
                img.style.opacity = 1;
            } else if(this.boardLifetime[i] === 1){
                img.style.opacity = 0.25;
            } else if(this.boardLifetime[i] === 2){
                img.style.opacity = 0.5;
            } else {
                img.style.opacity = 1;
            }
        }
    }

    updateStatus(){
        const status = document.querySelector("#status-special");
        if(!status) return;
        status.textContent = "Player move: " + (this.currentPlayer === 1 ? "X" : "O");
    }

    checkWin(player){
        return winningCombinationsSpecial.some(combo =>
            combo.every(i => boardSpecial[i] === player)
        );
    }

    makeMove(){
        this.cells.forEach((cell, index) => {
            cell.onclick = () => this.handleClick(cell, index);
        });

        attachCellAnimations(this.cells);
    }

    handleClick(cell, index){
        if(!this.gameActive) return;
        if(boardSpecial[index] !== -1 && this.boardLifetime[index] !== 0) return;

        cell.querySelector("img").src =
            this.currentPlayer === 1 ? "assets/x.png" : "assets/o.png";

        this.boardLifetime[index] = lifeTime;
        boardSpecial[index] = this.currentPlayer;

        if(this.checkWin(this.currentPlayer)){
            this.gameActive = false;
            const gameTime = ((performance.now() - this.gameStartTime) / 1000).toFixed(2);
            showGameEnd(`Player ${this.currentPlayer === 1 ? "X" : "O"} won!<br>Game time: ${gameTime} s`);
            return;
        }

        if(boardSpecial.every(v => v !== -1)){
            this.gameActive = false;
            const gameTime = ((performance.now() - this.gameStartTime) / 1000).toFixed(2);
            showGameEnd(`Draw!<br>Game time: ${gameTime} s`);
            return;
        }

        this.currentPlayer = this.currentPlayer === 1 ? 0 : 1;
        this.updateStatus();
        this.updateLifetime();
        this.refreshBoard();
    }
}

function startGameSpecial(){
    boardSpecial = Array(9).fill(-1);
    special = new SpecialMode();
    special.makeMove();
    special.gameActive = true;
    animateBoard(document.querySelectorAll(".cell-special"));
}

function gameResetSpecial(){
    boardSpecial = Array(9).fill(-1);
    special.currentPlayer = 1;
    special.gameActive = true;
    special.gameStartTime = performance.now();
    special.resetBoardGraphics();
    special.updateStatus();
}
