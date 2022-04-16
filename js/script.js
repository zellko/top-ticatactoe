const game = (() => {
    // Module: Follow up the flow of the game...
    // ... check when the user click on gameBoard case or buttons
    // ... define which player is active
    // ... define if th game should continue or not
    const btnTest = document.querySelector("#test");
    const btnStart = document.querySelector("#start");
    const btnRestart = document.querySelector("#restart");
    const boardCell = document.querySelectorAll(".board-cell");
    const inputPlayer1Name = document.querySelector("#player1");
    const inputPlayer2Name = document.querySelector("#player2");

    let activePlayer = undefined;
    let isGameOver = true;


    const _Player = (name) => {
        // Factory - Private : Create player object
        // ... player name are only accessible in the scope of game.
        let playerName = name;
        let playerMark = "";
        return { playerName, playerMark };
    };

    const _gameBoard = (() => {
        // Module - Private : Display the gameBoard to the DOM
        // ... is private so can not be modified outiside ou game scope, so user can not cheat using browser console

        let gameArray = [
            [undefined, undefined, undefined],
            [undefined, undefined, undefined],
            [undefined, undefined, undefined],
        ];

        const populateBoard = (e) => {
            // When a player click on a board cell...

            // ...Get the cell clicked
            const cell = e.target;
            // ... Check if it is empty 
            if (cell.textContent !== "") {
                console.log("already used!");
                return; // If not empty, ignore the click.
            };

            // ... get the cell row and column number.
            const rowNumber = cell.getAttribute("row");
            const colNumber = cell.getAttribute("col");
            //console.log(rowNumber, colNumber);

            cell.textContent = activePlayer.playerMark; // ...populate the cell with the correct mark.
            gameArray[rowNumber][colNumber] = activePlayer.playerMark; // ...populate the array with the correct mark. 
            //console.log(gameArray);

            checkForWinner(rowNumber, colNumber);
        };

        const checkForWinner = (row, col) => {
            // Check for 3 in a row: Line
            if (gameArray[row].every(element => element === activePlayer.playerMark)) {
                console.log(`${activePlayer.playerName} Win! With 3 in line`)
                isGameOver = true;
            };

            // Check for 3 in a row: Column
            let checkColumn = [];
            gameArray.forEach(element => {
                checkColumn.push(element[col]);
            });
            if (checkColumn.every(element => element === activePlayer.playerMark)) {
                console.log(`${activePlayer.playerName} Win! With 3 in column`);
                isGameOver = true;
            };

            // Check for 3 in a row: Diagonal
            let checkDiagonalA = [];
            let checkDiagonalB = [];
            let countA = 0;
            let countB = 2;
            gameArray.forEach(element => {
                checkDiagonalA.push(element[countA]);
                ++countA;
            });
            gameArray.forEach(element => {
                checkDiagonalB.push(element[countB]);
                --countB;
            });

            if (checkDiagonalA.every(element => element === activePlayer.playerMark)) {
                console.log(`${activePlayer.playerName} Win! With 3 in diagonal A`);
                isGameOver = true;
            };

            if (checkDiagonalB.every(element => element === activePlayer.playerMark)) {
                console.log(`${activePlayer.playerName} Win! With 3 in diagonal B`);
                isGameOver = true;
            };

            // Check for tie
            // !!!


            // Change active player
            (activePlayer === player1) ? activePlayer = player2: activePlayer = player1;
        };

        const clearBoard = () => {
            // Reset the gameArray
            gameArray = [
                [undefined, undefined, undefined],
                [undefined, undefined, undefined],
                [undefined, undefined, undefined],
            ];

            console.log(gameArray);
        };

        return { gameArray, populateBoard, clearBoard }
    })();

    function _initateGame() {
        // Function - Private: 
        // ...get the player name input
        //...clear the game board
        //...clear the DOM

        (inputPlayer1Name.value === "") ? player1.playerName = "John Doe": player1.playerName = inputPlayer1Name.value;
        (inputPlayer2Name.value === "") ? player2.playerName = "Mr. Smith": player2.playerName = inputPlayer2Name.value;

        player1.playerMark = "X";
        player2.playerMark = "0";

        activePlayer = player1;

        _gameBoard.clearBoard();

        boardCell.forEach(cell => cell.textContent = "");

        isGameOver = false;

    };

    /* Player object */
    const player1 = _Player("Zell");
    const player2 = _Player("Koss");

    /********************** 
    Event listner: Check for user actions
    ***********************/

    btnStart.addEventListener("click", () => {
        _initateGame();
    })


    boardCell.forEach(bcase => bcase.addEventListener("click", function(e) {
        if (isGameOver) return; // If the game is over or not started, we ignore the click on the cells
        _gameBoard.populateBoard(e);


    }));



    /********************** 
     Test Area:
    ***********************/

    // Public functions
    return {}
})();