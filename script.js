const gameDiv = document.querySelector(".game");

const positions = document.querySelectorAll(".game div");

const positionsArray = Array.from(positions);

const humanPositionsArray = [];

const computerPositionsArray = [];

const occupiedPositionsArray = [];

let result = document.getElementById("result");

let isGameOver = {
    isGameOver: false,
    winner: undefined,
};

const winPattern = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

gameDiv.addEventListener("click", (event) => {
    const clickedPosition = event.target;
    if (!occupiedPositionsArray.includes(clickedPosition)) {
        occupiedPositionsArray.push(event.target);
       
        humanPositionsArray.push(event.target);

        clickedPosition.style.backgroundImage = 'url("images/x.png")';
        clickedPosition.style.backgroundRepeat = "no-repeat";
        clickedPosition.style.backgroundPosition = "center";
        clickedPosition.style.backgroundSize = "50%";
        clickedPosition.style.cursor = "default";
        
       
        isGameOver = isTicTacToeOver(
            humanPositionsArray,
            computerPositionsArray
        );

        let chosenComputerPosition;
        let isPositionTargeted;
        if (occupiedPositionsArray.length !== 9) {
            do {
                let randomPosition = Math.round(Math.random() * 8 + 1);

                chosenComputerPosition = positionsArray[randomPosition - 1];

                isPositionTargeted = occupiedPositionsArray.some((position) => {
                    return (
                        position.className === chosenComputerPosition.className
                    );
                });
            } while (isPositionTargeted);

            occupiedPositionsArray.push(chosenComputerPosition);
            computerPositionsArray.push(chosenComputerPosition);
            chosenComputerPosition.style.backgroundImage =
                'url("images/O.png")';
            chosenComputerPosition.style.backgroundRepeat = "no-repeat";
            chosenComputerPosition.style.backgroundPosition = "center";
            chosenComputerPosition.style.backgroundSize = "50%";
            chosenComputerPosition.style.cursor = "default";
        }
    }

    if (isGameOver.isGameOver || occupiedPositionsArray.length === 9) {
        if (isGameOver.winner === "human") {
            result.textContent = "You won";
        } else {
            result.textContent = "The computer won";
        }
    }
});

function isTicTacToeOver(humanPositionsArray, computerPositionsArray) {
    let array = [];
    
    let didHumanWin = didPlayerWinGame(humanPositionsArray);
    if(didHumanWin){
        return {isGameOver: true, winner: "human"};
    }

    array.length = 0;

    let didComputerWin = didPlayerWinGame(computerPositionsArray);
    if(didComputerWin){
        return {isGameOver: true, winner: "computer"};
    }

    return { isGameOver: false, gameWinner: undefined };
}

function didPlayerWinGame(array){
   
    newArray = mapToNumbers(array);
    

    let trueCounter = 0;
    console.log(newArray.length);
    console.log(newArray.length ===3);
    if(newArray.length ===3){
        for(let i=0; i<winPattern; i++){
            for(let f=0; f<3;f++){
                for(let o=0; o<newArray.length;o++ ){
                    if(newArray[o]===winPattern[i][f]){
                        trueCounter++;
                        console.log(trueCounter);
                    }
                }
                if(trueCounter===3){
                    return true;
                }
            }
            trueCounter=0;
        }
    }
}

function mapToNumbers(array){
    const newArray = [];
    for(let i=0; i<array.length;i++){
        newArray[i] = convertClassNameToNumber(array[i].className);
    }
    return newArray;
}

function convertClassNameToNumber(className) {
    switch (className) {
        case "one":
            return 1;
        case "two":
            return 2;
        case "three":
            return 3;
        case "four":
            return 4;
        case "five":
            return 5;
        case "six":
            return 6;
        case "seven":
            return 7;
        case "eight":
            return 8;
        case "nine":
            return 9;
    }
}
