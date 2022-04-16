const game = (() => {
    // Module: Follow up the flow of the game...
    // ...check when the user click on gameBoard case
    // ... define which player is active
    // ... define if th game should continue or not
    const btnTest = document.querySelector("#test");
    const boardCase = document.querySelectorAll(".board-cell");
    let activePlayer = "X";


    const _Player = (name) => {
        // Factory - Private : Create player object
        // ... player name are only accessible in the scope of game.
        let playerName = name;
        return { playerName };
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
            console.log(rowNumber, colNumber);

            cell.textContent = activePlayer; // ...populate the cell with the correct mark.
            gameArray[rowNumber][colNumber] = activePlayer; // ...populate the array with the correct mark. 

            console.log(gameArray);
        };

        const clearBoard = () => {
            // ...
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
        player1.playerName = "John Doe";
        player2.playerName = "Mr. Smith";

        _gameBoard.clearBoard();

        boardCase.forEach(cell => cell.textContent = "");

        activePlayer = "X";

    };

    const checkArray = () => {
        console.log(_gameBoard.gameArray);
    };

    /********************** 
    Event listner: Check for user actions
    ***********************/
    boardCase.forEach(bcase => bcase.addEventListener("click", function(e) {
        _gameBoard.populateBoard(e);
        (activePlayer === "X") ? activePlayer = "O": activePlayer = "X";
    }));

    /* Player object */
    const player1 = _Player("Zell");
    const player2 = _Player("Koss");

    /********************** 
     Test Area:
    ***********************/
    btnTest.addEventListener("click", () => {
        console.log(_gameBoard.gameArray);
    })

    // Public functions
    return { checkArray, _initateGame } //_initateGame public for testing purpose, to be removed.
})();