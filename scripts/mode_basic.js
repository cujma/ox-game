const winningCombinations = [[0,1,2], [3,4,5] ,[6,7,8] ,[0,3,6] ,[1,4,7] ,[2,5,8] , [0,4,8], [2,4,6]];
let board = Array(9).fill(-1);
let basic;

class BasicMode{
    constructor(){
        this.cells = document.querySelectorAll(".cell-basic");
        this.currentPlayer = 1;
        this.gameActive = true;
        this.gameStartTime = performance.now();
        this.resetBoardGraphics();
        this.updateStatus();
    }

    resetBoardGraphics(){
        this.cells.forEach(cell => {
            cell.querySelector("img").src = "assets/blank.png";
        });
    }

    updateStatus(){
        const status = document.querySelector("#status-basic");
        status.textContent = "Player move: " + (this.currentPlayer === 1 ? "X" : "O");
    }

    checkWin(player){
        return winningCombinations.some(combo =>
            combo.every(i => board[i] === player)
        );
    }

    makeMove(){
        this.cells.forEach((cell, index) => {
            cell.onclick = () => this.handleClick(cell, index);
        });

        attachCellAnimations(this.cells);
    }

    handleClick(cell, index){
        if(!this.gameActive || board[index] !== -1) return;

        cell.querySelector("img").src =
            this.currentPlayer === 1 ? "assets/x.png" : "assets/o.png";

        board[index] = this.currentPlayer;

        if(this.checkWin(this.currentPlayer)){
            this.gameActive = false;
            const gameTime = ((performance.now() - this.gameStartTime) / 1000).toFixed(2);

            showGameEnd(`Player ${this.currentPlayer === 1 ? "X" : "O"} won!<br>Game time: ${gameTime} s`);
            return;
        }

        if(board.every(v => v !== -1)){
            this.gameActive = false;
            const gameTime = ((performance.now() - this.gameStartTime) / 1000).toFixed(2);

            showGameEnd(`Draw!<br>Game time: ${gameTime} s`);
            return;
        }

        this.currentPlayer = this.currentPlayer === 1 ? 0 : 1;
        this.updateStatus();
    }
}


function startGameBasic(){
    board = Array(9).fill(-1);
    basic = new BasicMode();
    basic.makeMove();
    basic.gameActive = true;
    animateBoard(document.querySelectorAll(".cell-basic"));
}

function gameResetBasic(){
    board = Array(9).fill(-1);
    basic.currentPlayer = 1;
    basic.gameActive = true;
    basic.gameStartTime = performance.now();
    basic.resetBoardGraphics();
    basic.updateStatus();
}
