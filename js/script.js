const game = (() => {
    // Module: Follow up the flow of the game...
    // ... check when the user click on gameBoard case or buttons
    // ... define which player is active
    // ... define if th game should continue or not
    const boardCell = document.querySelectorAll(".board-cell");
    const inputPlayer1Name = document.querySelector("#p1-name");
    const inputPlayer2Name = document.querySelector("#p2-name");
    const inputCheckBoxIA = document.querySelector("#ia-checkbox");
    const displayResult = document.querySelector(".display-result h2");

    let activePlayer = undefined;
    let isGameOver = true;
    let playCounter = 0; // Variable to count the number of play done, if no winner after 9 play, it's a tie.

    let gameArray = [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
    ];

    const _Player = (name) => {
        // Factory - Private : Create player object
        // ... player name are only accessible in the scope of game.
        let playerName = name;
        let playerMark = "";
        return { playerName, playerMark };
    };

    const _gameBoard = (() => {
        // Module - Private : Display gameBoard to the DOM, check for 3 in a row (winner) 
        // ... is private so can not be modified outiside ou game scope, user can not modify variables using browser console

        const populateBoard = (domCell) => {
            // ... get the cell row and column number.
            const rowNumber = domCell.getAttribute("row");
            const colNumber = domCell.getAttribute("col");

            domCell.textContent = activePlayer.playerMark; // ...populate the cell with active player mark.
            gameArray[rowNumber][colNumber] = activePlayer.playerMark; // ...populate active player mark.

            checkForWinner(rowNumber, colNumber); // After populating the gameArray and board. We check if there is a winner. 
        };

        const checkForWinner = (row, col) => {
            // Check for 3 in a row: Line
            if (gameArray[row].every(element => element === activePlayer.playerMark)) {
                displayResult.textContent = `${activePlayer.playerName} (${activePlayer.playerMark}) win the game!`;
                isGameOver = true;
            };

            // Check for 3 in a row: Column
            let checkColumn = [];
            gameArray.forEach(element => {
                checkColumn.push(element[col]);
            });
            if (checkColumn.every(element => element === activePlayer.playerMark)) {
                displayResult.textContent = `${activePlayer.playerName} (${activePlayer.playerMark}) win the game!`;
                isGameOver = true;
            };

            // Check for 3 in a row: Diagonal
            let checkDiagonalA = [gameArray[0][0], gameArray[1][1], gameArray[2][2]];
            let checkDiagonalB = [gameArray[0][2], gameArray[1][1], gameArray[2][0]];

            if (checkDiagonalA.every(element => element === activePlayer.playerMark)) {
                displayResult.textContent = `${activePlayer.playerName} (${activePlayer.playerMark}) win the game!`;
                isGameOver = true;
            };

            if (checkDiagonalB.every(element => element === activePlayer.playerMark)) {
                displayResult.textContent = `${activePlayer.playerName} (${activePlayer.playerMark}) win the game!`;
                isGameOver = true;
            };

            // Check for tie
            if (playCounter >= 8) {
                displayResult.textContent = "It's a tie!";
                isGameOver = true;
            };

            // Change active player
            (activePlayer === player1) ? activePlayer = player2: activePlayer = player1;

            // Increase counter of play
            ++playCounter;

            // Enable the input at the end of the game
            if (isGameOver) {
                inputPlayer1Name.disabled = false;
                if (!inputCheckBoxIA.checked) inputPlayer2Name.disabled = false;
                inputCheckBoxIA.disabled = false;
            };
        };

        const clearBoard = () => {
            // Reset the gameArray
            gameArray = [
                [undefined, undefined, undefined],
                [undefined, undefined, undefined],
                [undefined, undefined, undefined],
            ];
        };

        return { populateBoard, clearBoard }
    })();

    const _ia = (() => {

        const foundCell = (mark, markNumber, undefinedNumber) => {
            // This function check each lines, colums or diagonals for a specific pattern...
            //... E.g. if mark = "X", markNumber = 2, undefinedNumber= 1, will check for a line/column/diagonal with 2x "X" and 1x "undefined"
            //... if the pattern is found, return the position on the "undefined"
            // This function is used by the IA, to check if she can win, prevent that human player win or to choose a cell on a line/column/diagonal which already have one of her mark. 
            let colN = undefined;
            let rowN = undefined;
            let markCount = 0;
            let undefCount = 0;

            // Check the rows for the specific pattern...
            for (let i = 0; i < gameArray.length; ++i) {
                rowN = i;
                colN = undefined;
                markCount = 0;
                undefCount = 0;

                gameArray[i].forEach((cell, index) => {
                    if (cell === mark) ++markCount;
                    if (cell === undefined) {
                        ++undefCount;
                        colN = index;
                    }
                });

                if (markCount === markNumber && undefCount === undefinedNumber) {
                    return [rowN, colN];
                };
            };

            // Check the columns for the specific pattern...
            const col1 = [gameArray[0][0], gameArray[1][0], gameArray[2][0]]
            const col2 = [gameArray[0][1], gameArray[1][1], gameArray[2][1]]
            const col3 = [gameArray[0][2], gameArray[1][2], gameArray[2][2]]
            const allColumns = [col1, col2, col3]

            for (let i = 0; i < allColumns.length; ++i) {
                colN = i;
                rowN = undefined;
                markCount = 0;
                undefCount = 0;

                allColumns[i].forEach((cell, index) => {
                    if (cell === mark) ++markCount;
                    if (cell === undefined) {
                        ++undefCount;
                        rowN = index;
                    }
                });

                if (markCount === markNumber && undefCount === undefinedNumber) {
                    return [rowN, colN];
                };
            };

            // Check the diagonals for the specific pattern...
            const diag1 = [gameArray[0][0], gameArray[1][1], gameArray[2][2]];
            const diag2 = [gameArray[0][2], gameArray[1][1], gameArray[2][0]];

            colN = undefined;
            rowN = undefined;
            markCount = 0;
            undefCount = 0;

            for (let i = 0; i < diag1.length; ++i) {
                if (diag1[i] === mark) ++markCount;
                if (diag1[i] === undefined) {
                    ++undefCount;

                    if (undefinedNumber === 2 && undefCount === 1) {
                        rowN = i;
                        colN = i;
                    } else if (undefinedNumber === 1) {
                        rowN = i;
                        colN = i;
                    };
                };
            };

            if (markCount === markNumber && undefCount === undefinedNumber) {
                return [rowN, colN];
            };

            markCount = 0;
            undefCount = 0;
            colN = undefined;
            rowN = undefined;

            for (let i = 0; i < diag2.length; ++i) {

                if (diag2[i] === mark) ++markCount;
                if (diag2[i] === undefined) {
                    ++undefCount;
                    rowN = i;
                    if (i === 0) colN = 2;
                    if (i === 1) colN = 1;
                    if (i === 2) colN = 0;
                };

            };

            if (markCount === markNumber && undefCount === undefinedNumber) {
                return [rowN, colN];
            };

            return null;
        };

        const chooseCell = () => {
            // Core IA function, when the IA need to play, she will...

            let availableCell = [];

            // ... if it's her first play, will pick a specific cell, depending on human player first choice
            if (playCounter === 1) {
                if (gameArray[0][1] === player1.playerMark) return [0, 0];
                if (gameArray[1][0] === player1.playerMark) return [0, 0];
                if (gameArray[1][2] === player1.playerMark) return [0, 0];
                if (gameArray[2][1] === player1.playerMark) return [0, 0];
                if (gameArray[1][1] === undefined) {
                    return [1, 1];
                } else {
                    return [0, 0];
                };
            };

            // ... or IA will check if she can win...
            const isIACanWin = foundCell(player2.playerMark, 2, 1);
            console.log(`WinCon ia found = ${isIACanWin}`);

            if (isIACanWin !== null) return isIACanWin;

            // ... or check if player can win, if yes block him ...
            const isPlayerCanWin = foundCell(player1.playerMark, 2, 1);
            console.log(`WinCon player = ${isPlayerCanWin}`);

            if (isPlayerCanWin !== null) return isPlayerCanWin;

            //... or choose a line/colum/diagonal cell which already contain one IA mark  ...
            const iaLogicPlay = foundCell(player2.playerMark, 1, 2);
            console.log(`IA 'logic' play = ${iaLogicPlay}`);

            if (iaLogicPlay !== null) return iaLogicPlay;

            // ... or choose a random cell among the available (undefined) cell of the board
            gameArray.forEach((rows, index) => {
                let rowN = index;
                rows.forEach((cell, index) => {
                    let colN = index;
                    if (cell === undefined) availableCell.push([rowN, colN])
                });
            });

            let randomAIChoice = Math.floor(Math.random() * availableCell.length);
            console.log(`IA 'random' play = ${randomAIChoice}`);

            return availableCell[randomAIChoice];
        }

        return { chooseCell };

    })();

    function _initateGame() {
        // Function - Private: 
        // ...get the player name input
        //...clear the game board
        //...clear the DOM

        (inputPlayer1Name.value === "") ? player1.playerName = "Player 1": player1.playerName = inputPlayer1Name.value;
        (inputPlayer2Name.value === "") ? player2.playerName = "Player 2": player2.playerName = inputPlayer2Name.value;

        player1.playerMark = "X";
        player2.playerMark = "O";

        activePlayer = player1;

        _gameBoard.clearBoard();

        boardCell.forEach(cell => cell.textContent = "");
        displayResult.textContent = "";

        playCounter = 0;

        isGameOver = false;

        inputPlayer1Name.disabled = true;
        inputPlayer2Name.disabled = true;
        inputCheckBoxIA.disabled = true;
    };

    /* Player object */
    const player1 = _Player("Zell");
    const player2 = _Player("Koss");

    /********************** 
    Event listner: Check for user actions
    ***********************/

    inputCheckBoxIA.addEventListener("change", (e) => {

        if (!isGameOver) return;

        if (e.target.checked) {
            player2.playerName = "IA";
            inputPlayer2Name.value = "IA";
            inputPlayer2Name.disabled = true;
        } else {
            player2.playerName = "Player 2";
            inputPlayer2Name.value = "Player 2";
            inputPlayer2Name.disabled = false;
        };

    });

    boardCell.forEach(bcase => bcase.addEventListener("click", function(e) {
        // When a player click on a board cell...
        if (isGameOver) _initateGame(); // If the game is over, we reset the board before to start a new game

        // ...Get the cell clicked
        const cell = e.target;

        // ... Check if it is empty 
        if (cell.textContent !== "") {
            console.log("Cell already mnarked!");
            return; // If not empty, ignore the click.
        };

        _gameBoard.populateBoard(cell);

        if (player2.playerName === "IA" && !isGameOver) {
            const iaCellChoice = _ia.chooseCell();
            const iaCellDom = document.querySelector(`[row='${iaCellChoice[0]}'][col='${iaCellChoice[1]}']`);
            _gameBoard.populateBoard(iaCellDom);
        };
    }));

    // Public functions
    return {}
})();