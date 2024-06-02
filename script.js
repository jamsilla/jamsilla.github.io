var buttons = document.getElementsByClassName("gameButton");
var resetWinsButton = document.getElementById("resetWinsButton");
var resetBoardButton = document.getElementById("resetBoardButton");

var xWinsText = document.getElementById("xScore");
var oWinsText = document.getElementById("oScore");

var currentChar = "X";
var xWins = 0;
var oWins = 0;
var finished = false;

Array.from(buttons).forEach(button => {
    button.addEventListener("click", function() {
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
    Array.from(buttons).forEach(button => {
        button.textContent = " ";
    })
})




function checkWin(){
    // horizontal check
    for (let i = 0; i < 9; i += 3) {
        if(buttons[i].textContent == "X" && buttons[1 + i].textContent == "X" && buttons[2 + i].textContent == "X"){
            return "X";
        }else if(buttons[i].textContent == "O" && buttons[1 + i].textContent == "O" && buttons[2 + i].textContent == "O"){
            return "O";
        }
    }
    // vertical check
    for (let i = 0; i < 3; i++) {
        if(buttons[i].textContent == "X" && buttons[3 + i].textContent == "X" && buttons[6 + i].textContent == "X"){
                return "X";
        }else if(buttons[i].textContent == "O" && buttons[3 + i].textContent == "O" && buttons[6 + i].textContent == "O"){
                return "O";
        }
    }
    // diagonal 1
    if(buttons[0].textContent == "X" && buttons[4].textContent == "X" && buttons[8].textContent == "X"){
        return "X";
    }else if(buttons[0].textContent == "O" && buttons[4].textContent == "O" && buttons[8].textContent == "O"){
        return "O";
    }

    // diagonal 2
    if(buttons[2].textContent == "X" && buttons[4].textContent == "X" && buttons[6].textContent == "X"){
         return "X";
    }else if(buttons[2].textContent == "O" && buttons[4].textContent == "O" && buttons[6].textContent == "O"){
         return "O";
    }
    return "?";
}

