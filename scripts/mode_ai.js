const winningCombinationsAI = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let boardAI = Array(9).fill(-1);
let aiGame;

class AIMode {
    constructor(){
        this.cells = document.querySelectorAll(".cell-ai");
        this.currentPlayer = 1;
        this.gameActive = true;
        this.gameStartTime = performance.now();
        this.resetBoardGraphics();
        this.updateStatus();
    }

    resetBoardGraphics(){
        this.cells.forEach(cell => cell.querySelector("img").src = "assets/blank.png");
    }

    updateStatus(){
        const status = document.querySelector("#status-ai");
        if(!status) return;
        status.textContent = "Player move: " + (this.currentPlayer === 1 ? "X" : "O");
    }

    checkWin(player){
        return winningCombinationsAI.some(combo =>
            combo.every(i => boardAI[i] === player)
        );
    }

    getBotMove(){
        for(let i = 0; i < 9; i++){
            if(boardAI[i] === -1){
                boardAI[i] = 0;
                if(this.checkWin(0)){
                    boardAI[i] = -1;
                    return i;
                }
                boardAI[i] = -1;
            }
        }

        for(let i = 0; i < 9; i++){
            if(boardAI[i] === -1){
                boardAI[i] = 1;
                if(this.checkWin(1)){
                    boardAI[i] = -1;
                    return i;
                }
                boardAI[i] = -1;
            }
        }

        if(boardAI[4] === -1) return 4;

        const corners = [0,2,6,8];
        for(let c of corners){
            if(boardAI[c] === -1) return c;
        }

        for(let i=0;i<9;i++){
            if(boardAI[i] === -1) return i;
        }

        return -1;
    }

    makeMove(){
        this.cells.forEach((cell, index) => {
            cell.onclick = () => this.handleClick(cell, index);
        });

        attachCellAnimations(this.cells);
    }

    handleClick(cell, index){
        if(!this.gameActive) return;
        if(this.currentPlayer !== 1 || boardAI[index] !== -1) return;

        cell.querySelector("img").src = "assets/x.png";
        boardAI[index] = 1;

        if(this.checkWin(1)){
            this.gameActive = false;
            const gameTime = ((performance.now() - this.gameStartTime) / 1000).toFixed(2);
            showGameEnd(`Player X won!<br>Game time: ${gameTime} s`);
            return;
        }

        if(boardAI.every(v => v !== -1)){
            this.gameActive = false;
            const gameTime = ((performance.now() - this.gameStartTime) / 1000).toFixed(2);
            showGameEnd(`Draw!<br>Game time: ${gameTime} s`);
            return;
        }

        this.currentPlayer = 0;
        this.updateStatus();

        setTimeout(() => {
            if(!this.gameActive) return;

            const botIndex = this.getBotMove();
            const botImg = this.cells[botIndex].querySelector("img");
            botImg.src = "assets/o.png";
            boardAI[botIndex] = 0;

            if(this.checkWin(0)){
                this.gameActive = false;
                const gameTime = ((performance.now() - this.gameStartTime) / 1000).toFixed(2);
                showGameEnd(`Player O won!<br>Game time: ${gameTime} s`);
                return;
            }

            if(boardAI.every(v => v !== -1)){
                this.gameActive = false;
                const gameTime = ((performance.now() - this.gameStartTime) / 1000).toFixed(2);
                showGameEnd(`Draw!<br>Game time: ${gameTime} s`);
                return;
            }

            this.currentPlayer = 1;
            this.updateStatus();
        }, 400);
    }
}

function startGameAI(){
    boardAI = Array(9).fill(-1);
    aiGame = new AIMode();
    aiGame.makeMove();
    aiGame.gameActive = true;
    animateBoard(document.querySelectorAll(".cell-ai"));
}

function gameResetAI(){
    boardAI = Array(9).fill(-1);
    aiGame.currentPlayer = 1;
    aiGame.gameActive = true;
    aiGame.gameStartTime = performance.now();
    aiGame.resetBoardGraphics();
    aiGame.updateStatus();
}
