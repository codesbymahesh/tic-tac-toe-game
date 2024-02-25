// The code starts by selecting all the elements on the web page that are needed for the game: boxes where X or O can be placed, a message area to show game information, and a button to start a new game.
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

// It also declares some variables to keep track of the current player, the state of the game grid, and the positions where a player can win.
let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
   
    //updating on UI that empty in starting
    boxes.forEach((box, index) => {
        box.innerText = "";

        // Enables pointer events on each box element, allowing them to be clickable
        boxes[index].style.pointerEvents = "all";
        
        //one more thing is missing, initialise box with css properties again(remove green color)

        //indexing start with 0 and box is with 1
        box.classList = `box box${index+1}`;
        
    });
    newGameBtn.classList.remove("active"); //hide new game btn initially

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();  //fn called

//chnage player
function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        //eg.mtlb suppose {0,4,7} (0 means oth 4 measn 1st and 7 means 2nd index) ye teeno position pe jao aur it should be non empty and same value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    

                //disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //now we know X/O is a winner then green
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    //it means we have a winner
    if(answer !== "" ) {
        gameInfo.innerText = `Winner Player - ${answer}`;
        //enable new game button
        newGameBtn.classList.add("active");
        return;
    }

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        gameInfo.style.backgroundColor = "red";
        newGameBtn.classList.add("active");
        newGameBtn.style.backgroundColor = "green";

    }

}

function handleClick(index) {
    //CHECK first is it empty , if yes then
    if(gameGrid[index] === "" ) {
        //fill it with x or 0 (changes on UI)
        boxes[index].innerText = currentPlayer;
        // changes in inner logic
        gameGrid[index] = currentPlayer;
        //if there is already x or 0 then cursor pointer not be working on that index
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko(player change)
        swapTurn();
        //check koi jeet toh nahi gya
        checkGameOver();
    }
}

//when i click on any box then call handleclick fn with same index on which we clicked
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

//if i click on new game start new game
newGameBtn.addEventListener("click", initGame);

const darkModeBtn = document.querySelector(".dark-mode-btn");

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});