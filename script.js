var buttons = document.getElementsByClassName("gameButton");
var resetWinsButton = document.getElementById("resetWinsButton");
var resetBoardButton = document.getElementById("resetBoardButton");
var pvpButton = document.getElementById("pvpButton");
var pveButton = document.getElementById("pveButton");
var easyButton = document.getElementById("easyButton");
var mediumButton = document.getElementById("mediumButton");
var impossibleButton = document.getElementById("impossibleButton");

var xWinsText = document.getElementById("xScore");
var oWinsText = document.getElementById("oScore");

var difficultyDiv = document.getElementById("difficultyDiv");

var currentChar = "X";
var xWins = 0;
var oWins = 0;
var finished = true;
var isFirstMove = true;
var moves = 0;

//setting pvp as initial gamemode
var gamemode = "pvp";
difficultyDiv.style.display = "none";
pvpButton.style.borderWidth = "4px";
//setting easy as initial difficulty
var difficulty = "easy";
easyButton.style.borderWidth = "4px";

Array.from(buttons).forEach(button => {
    button.addEventListener("click", function() {
        if(isFirstMove){
            isFirstMove = false;
            currentChar = "X";
        }
        //if PVP
        if(gamemode == "pvp"){
            moves++;
            if(button.textContent != "X" && button.textContent != "O" && !finished){
                button.textContent = currentChar;
                currentChar = currentChar === "X" ? "O" : "X";
                if(checkWin() != "?"){
                    if(checkWin() == "X"){
                        xWins++;
                        xWinsText.textContent = ("X: " + xWins);
                        finished = true;
                    }else{
                        oWins++;
                        oWinsText.textContent = ("O: " + oWins);
                        finished = true;
                    }
                }
            }
        }
        //if PVE
        if(gamemode == "pve"){
            if(button.textContent != "X" && button.textContent != "O" && !finished){
                moves++;
                button.textContent = "X";
                if(checkWin() != "?"){
                    if(checkWin() == "X"){
                        xWins++;
                        xWinsText.textContent = ("X: " + xWins);
                        finished = true;
                    }else{
                        oWins++;
                        oWinsText.textContent = ("O: " + oWins);
                        finished = true;
                    }
                }
                //if EASY (picks random spot)
                if(difficulty == "easy" && moves < 9 && !finished){
                    var notFound = true;
                    while(notFound){
                        var index = getRandomInt(8);
                        if(buttons[index].textContent != "X" && buttons[index].textContent != "O"){
                            moves++;
                            buttons[index].textContent = "O";
                            notFound = false;
                        }
                    }
                    if(checkWin() != "?"){
                        if(checkWin() == "X"){
                            xWins++;
                            xWinsText.textContent = ("X: " + xWins);
                            finished = true;
                        }else{
                            oWins++;
                            oWinsText.textContent = ("O: " + oWins);
                            finished = true;
                        }
                    }
                }
                //if MEDIUM (blocks 1 way)
                if(difficuly == "medium"){

                }
                //if IMPOSSIBLE (MINIMAX algo)
                if(difficuly == "impossible"){

                }
            }
        }

    });
});

resetWinsButton.addEventListener("click",function(){
    xWins = 0;
    oWins = 0;
    xWinsText.textContent = ("X: 0");
    oWinsText.textContent = ("O: 0");
})


resetBoardButton.addEventListener("click",function(){
    finished = false;
    isFirstMove = true;
    moves = 0;
    resetBoardButton.textContent = "Reset Board";
    Array.from(buttons).forEach(button => {
        button.textContent = " ";
    })
})

pvpButton.addEventListener("click",function(){
    if(finished){
        pvpButton.style.borderWidth = "4px";
        difficultyDiv.style.display = "none";
        pveButton.style.borderWidth = "1px";
        gamemode = "pvp";
    }
})

pveButton.addEventListener("click",function(){
    if(finished){
        pveButton.style.borderWidth = "4px";
        difficultyDiv.style.display = "block";
        pvpButton.style.borderWidth = "1px";
        gamemode = "pve";
    }
})

easyButton.addEventListener("click",function(){
    if(finished){
        easyButton.style.borderWidth = "4px";
        mediumButton.style.borderWidth = "1px";
        impossibleButton.style.borderWidth = "1px";
        difficuly = "easy";
    }
})

mediumButton.addEventListener("click",function(){
    if(finished){
        easyButton.style.borderWidth = "1px";
        mediumButton.style.borderWidth = "4px";
        impossibleButton.style.borderWidth = "1px";
        difficuly = "medium";
    }
})

impossibleButton.addEventListener("click",function(){
    if(finished){
        easyButton.style.borderWidth = "1px";
        mediumButton.style.borderWidth = "1px";
        impossibleButton.style.borderWidth = "4px";
        difficuly = "impossible";
    }
})


function checkWin(){
    // horizontal check
    for (let i = 0; i < 9; i += 3) {
        if(buttons[i].textContent == "X" && buttons[1 + i].textContent == "X" && buttons[2 + i].textContent == "X"){
            resetBoardButton.textContent = "Start Game";
            return "X";
        }else if(buttons[i].textContent == "O" && buttons[1 + i].textContent == "O" && buttons[2 + i].textContent == "O"){
            resetBoardButton.textContent = "Start Game";
            return "O";
        }
    }
    // vertical check
    for (let i = 0; i < 3; i++) {
        if(buttons[i].textContent == "X" && buttons[3 + i].textContent == "X" && buttons[6 + i].textContent == "X"){
            resetBoardButton.textContent = "Start Game";
            return "X";
        }else if(buttons[i].textContent == "O" && buttons[3 + i].textContent == "O" && buttons[6 + i].textContent == "O"){
            resetBoardButton.textContent = "Start Game";
            return "O";
        }
    }
    // diagonal 1
    if(buttons[0].textContent == "X" && buttons[4].textContent == "X" && buttons[8].textContent == "X"){
        resetBoardButton.textContent = "Start Game";
        return "X";
    }else if(buttons[0].textContent == "O" && buttons[4].textContent == "O" && buttons[8].textContent == "O"){
        resetBoardButton.textContent = "Start Game";
        return "O";
    }

    // diagonal 2
    if(buttons[2].textContent == "X" && buttons[4].textContent == "X" && buttons[6].textContent == "X"){
        resetBoardButton.textContent = "Start Game";
        return "X";
    }else if(buttons[2].textContent == "O" && buttons[4].textContent == "O" && buttons[6].textContent == "O"){
        resetBoardButton.textContent = "Start Game";
        return "O";
    }
    return "?";
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}