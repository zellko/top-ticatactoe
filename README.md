# top-ticatactoe
The Odin Project - JavaScript - Project: Tic Tac Toe

## ToDo:

### UI
HTML/CSS:
- [x] Create a simple board.
- [ ] Add modal or division to add play name.
- [x] Add a modal or division to display the winner.
- [ ] Style everything.  

### JS

#### Coding problems:
1. Mark the board:
- [x] Create a function which, when an user click on a board cell,...
- [x] ...add a mark to DOM cell.
- [x] ...add it to the board Array.
- [x] ...this function should check if the cell is already used.
- [x] Find a way to alterate between player 1('X') and player 2('O'). 

2. Check for winner / tie. Create a function which:
- [x] Check for three in a row, on line.
- [x] Check for three in a row, on column.
- [x] Check for three in a row, on diagonals.
- [x] Check for tie.

3. Clear the board:
- [x] Create a function, when the game is finished, to clear the board and array.

4. Fine-tuning: 
- [x] Get the player Names from input.
- [x] At the end of the game, display the winner name or "It's a tie". Propose players to restart game.

5. Code cleaning:
- [ ] Add comments / refactor

6. Optional: AI:
- [ ] x

### GameFlow:

Players fill up their nameand play "start"
-> Initiate the board, player name, player mark (X/O).
-> Set the active player as "player 1"
-> Set isGameOver = false (as long as this variable is false, the game can continue).
<wait for player input on a board cell>
Populate the board cell with active player mark 
-> Update the board in DOM
-> Update the board array 
    -> Check for winner / tie 
        -> Yes: Display winner or tie. isGameOver = true (game stopped until it is restarted)
-> Modifiy active player as "player 2" || "player 1"
<wait for player input on a board cell>
...

## Ressources:
Images:
- x

Color Palette:
- x

Icons:
- x

Font:
- x

Code:
- x

Inspiration:
- x