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
        // Module - Private : Display the gameBoard to the DOM
        // ... is private so can not be modified outiside ou game scope, so user can not modify variables using browser console

        const populateBoard = (domCell) => {

            // ... get the cell row and column number.
            const rowNumber = domCell.getAttribute("row");
            const colNumber = domCell.getAttribute("col");

            domCell.textContent = activePlayer.playerMark; // ...populate the cell with the correct mark.
            gameArray[rowNumber][colNumber] = activePlayer.playerMark; // ...populate the array with the correct mark. 

            checkForWinner(rowNumber, colNumber);
        };

        const checkForWinner = (row, col) => {
            // Check for 3 in a row: Line
            if (gameArray[row].every(element => element === activePlayer.playerMark)) {
                console.log(`${activePlayer.playerName} Win! With 3 in line`)
                displayResult.textContent = `${activePlayer.playerName} (${activePlayer.playerMark}) win the game!`;
                isGameOver = true;
            };

            // Check for 3 in a row: Column
            let checkColumn = [];
            gameArray.forEach(element => {
                checkColumn.push(element[col]);
            });
            if (checkColumn.every(element => element === activePlayer.playerMark)) {
                console.log(`${activePlayer.playerName} Win! With 3 in column`);
                displayResult.textContent = `${activePlayer.playerName} (${activePlayer.playerMark}) win the game!`;
                isGameOver = true;
            };

            // Check for 3 in a row: Diagonal
            let checkDiagonalA = [gameArray[0][0], gameArray[1][1], gameArray[2][2]];
            let checkDiagonalB = [gameArray[0][2], gameArray[1][1], gameArray[2][0]];

            if (checkDiagonalA.every(element => element === activePlayer.playerMark)) {
                console.log(`${activePlayer.playerName} Win! With 3 in diagonal A`);
                displayResult.textContent = `${activePlayer.playerName} (${activePlayer.playerMark}) win the game!`;
                isGameOver = true;
            };

            if (checkDiagonalB.every(element => element === activePlayer.playerMark)) {
                console.log(`${activePlayer.playerName} Win! With 3 in diagonal B`);
                displayResult.textContent = `${activePlayer.playerName} (${activePlayer.playerMark}) win the game!`;
                isGameOver = true;
            };

            // Check for tie

            if (playCounter >= 8) {
                console.log("It's a tie!");
                displayResult.textContent = "It's a tie!";
                isGameOver = true;
            };

            if (isGameOver) {
                inputPlayer1Name.disabled = false;
                if (!inputCheckBoxIA.checked) inputPlayer2Name.disabled = false;
                inputCheckBoxIA.disabled = false;
            };

            // Change active player
            (activePlayer === player1) ? activePlayer = player2: activePlayer = player1;

            // Increase counter of play
            ++playCounter;
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

        const checkWinningPlay = (mark, markNumber, undefinedNumber) => {
            let colN = undefined;
            let rowN = undefined;
            let markCount = 0;
            let undefCount = 0;

            // Check if player / IA can win with 3 in a row (line)
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

            // Check if player / IA  can win with 3 in a row (column)
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

            // Check if player / IA  can win with 3 in a row (diagonal)
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
                    rowN = i;
                    colN = i;
                };
            };

            console.log(`Diag 1 test: mark ${markCount} / undef ${markCount}`);
            console.log(`Diag 1 test: mark num ${markNumber} / undef num ${undefinedNumber}`);

            if (markCount === markNumber && undefCount === undefinedNumber) {
                console.log("diag 1 found a play");
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

            console.log(`Diag 2 test: mark ${markCount} / undef ${markCount}`);

            if (markCount === markNumber && undefCount === undefinedNumber) {
                console.log("diag 2 found a play");
                return [rowN, colN];
            };

            return null;
        };

        const chooseCell = () => {
            // IA Logic
            console.log("Hey, I'm the IA")

            let availableCell = [];

            //First IA Play is defined, either the middle or top left... 
            if (playCounter === 1 && gameArray[1][1] === undefined) {
                return [1, 1];
            } else if (playCounter === 1) {
                return [0, 0];
            };

            // ... The IA will first check if she can win...
            const isIACanWin = checkWinningPlay(player2.playerMark, 2, 1);
            console.log(`WinCon ia found = ${isIACanWin}`);

            if (isIACanWin !== null) return isIACanWin;

            //... then check if player can win, if yes block him ...
            const isPlayerCanWin = checkWinningPlay(player1.playerMark, 2, 1);
            console.log(`WinCon player = ${isPlayerCanWin}`);

            if (isPlayerCanWin !== null) return isPlayerCanWin;

            //... then choose a logic play based on gameboard  ...
            // To be added
            const iaLogicPlay = checkWinningPlay(player2.playerMark, 1, 2);
            console.log(`IA 'logic' play = ${iaLogicPlay}`);

            if (iaLogicPlay !== null) return iaLogicPlay;

            // ... or choose a random cell
            console.log("I don't know what to do, so I choose as random cell");
            gameArray.forEach((rows, index) => {
                let rowN = index;
                rows.forEach((cell, index) => {
                    let colN = index;
                    if (cell === undefined) availableCell.push([rowN, colN])
                });
            });

            let randomAIChoice = Math.floor(Math.random() * availableCell.length);
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
            console.log("already used!");
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