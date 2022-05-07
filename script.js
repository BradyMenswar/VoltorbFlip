let tileElementArray = [];
let rowElementArray = [];
let colElementArray = [];

let tile = document.getElementById("0");
let winnerColor = window.getComputedStyle(tile).getPropertyValue("--color-winner");
let lightColor = window.getComputedStyle(tile).getPropertyValue("--color-light");
let markedColor = window.getComputedStyle(tile).getPropertyValue("--color-marked");
let bombColor = window.getComputedStyle(tile).getPropertyValue("--color-secondary");

let boardString;
let gameState;
let gameWon = false;
let gameLost = false;
let markMode = false;

function SetTileElements() {
    for(var i = 0; i < 25; i++) {
        tileElementArray[i] = document.getElementById(i);
        tileElementArray[i].style.backgroundColor = lightColor;
    }
    
    for(var i = 0; i < 5; i++) {
        rowElementArray[i] = document.getElementById("row" + i);
    }

    for(var i = 0; i < 5; i++) {
        colElementArray[i] = document.getElementById("col" + i);
    }
}

function ToggleMarkMode() {
    markMode = !markMode;
    let markButton = document.querySelector(".mark-mode");
    markButton.classList.toggle('active');
}

function GetRandomIntRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.floor(Math.random()  * (max - min) + min));
}

function AssignBoardString(level) {

    let boardStringArray = [[],[],[],[],[],[],[],[]];
    
    boardStringArray[0][0] = "1111111111111112223444444";
    boardStringArray[0][1] = "1111111111111111333444444";
    boardStringArray[0][2] = "1111111111111122222444444";
    boardStringArray[0][3] = "1111111111111112233444444";
    boardStringArray[0][4] = "1111111111111122223444444";

    boardStringArray[1][0] = "1111111111111123334444444";
    boardStringArray[1][1] = "1111111111112222224444444";
    boardStringArray[1][2] = "1111111111111222334444444";
    boardStringArray[1][3] = "1111111111111133334444444";
    boardStringArray[1][4] = "1111111111112222234444444";

    boardStringArray[2][0] = "1111111111112233344444444";
    boardStringArray[2][1] = "1111111111222222244444444";
    boardStringArray[2][2] = "1111111111122223344444444";
    boardStringArray[2][3] = "1111111111112333344444444";
    boardStringArray[2][4] = "1111111111222222344444444";


    boardStringArray[3][0] = "1111111111122233344444444";
    boardStringArray[3][1] = "1111111111113333344444444";
    boardStringArray[3][2] = "1111111222222224444444444";
    boardStringArray[3][3] = "1111111122222334444444444";
    boardStringArray[3][4] = "1111111112233334444444444";

    boardStringArray[4][0] = "1111111222222234444444444";
    boardStringArray[4][1] = "1111111122223334444444444";
    boardStringArray[4][2] = "1111111112333334444444444";
    boardStringArray[4][3] = "1111112222222224444444444";
    boardStringArray[4][4] = "1111111222222334444444444";

    boardStringArray[5][0] = "1111111122233334444444444";
    boardStringArray[5][1] = "1111111113333334444444444";
    boardStringArray[5][2] = "1111112222222234444444444";
    boardStringArray[5][3] = "1111111222223334444444444";
    boardStringArray[5][4] = "1111111122333334444444444";

    boardStringArray[6][0] = "1111112222222334444444444";
    boardStringArray[6][1] = "1111111222233334444444444";
    boardStringArray[6][2] = "1111123333334444444444444";
    boardStringArray[6][3] = "1122222222234444444444444";
    boardStringArray[6][4] = "1111112222223334444444444";


    boardStringArray[7][0] = "1111111133333334444444444";
    boardStringArray[7][1] = "1111122222222334444444444";
    boardStringArray[7][2] = "1111112222233334444444444";
    boardStringArray[7][3] = "1111111223333334444444444";
    boardStringArray[7][4] = "1111122222223334444444444";

    let randomInt = GetRandomIntRange(0,5);
    string = boardStringArray[level][randomInt];
    return string;
    
}

function GetRowTotals() {
    let totals = [];
    let total = 0;
    for(var i = 0; i < 25; i++)
        {   
            if(boardString[i] !== '4') total += parseInt(boardString[i]);
            if((i + 1) % 5 == 0) {
                totals[Math.floor(i / 5)] = total;
                total = 0;
            } 
        }
    return totals;
}

function GetRowBombs() {
    let totals = [];
    let total = 0;
    for(var i = 0; i < 25; i++)
        {   
            if(boardString[i] === '4') total ++;
            if((i + 1) % 5 == 0) {
                totals[Math.floor(i / 5)] = total;
                total = 0;
            } 
        }
    return totals;
}

function GetColTotals()
{
    let totals = [0,0,0,0,0];
    for(var i = 0; i < 5; i++)
    {   
        for(var j = 0; j < 5; j++)
            if(boardString[i + (j * 5)] !== '4')
                totals[i] += parseInt(boardString[i + (j * 5)]);
                console.log(totals[i]);
    }
    console.log(totals)
    return totals;
}

function GetColBombs()
{
    let totals = [0,0,0,0,0];
    for(var i = 0; i < 5; i++)
    {   
        for(var j = 0; j < 5; j++)
            if(boardString[i + (j * 5)] === '4')
                totals[i] ++;
    }
    return totals;
}

function CreateBoard(level)
{
    // gameState = document.querySelector(".game-state");
    // gameState.textContent = "Game state: In Progress";
    
    gameWon = false;
    gameLost = false;
    SetTileElements();

    boardString = AssignBoardString(level);
    boardString = boardString.split('').sort(function(){return 0.5-Math.random()}).join('');

    let rowTotals = GetRowTotals();
    let rowBombs = GetRowBombs();
    let colTotals = GetColTotals();
    let colBombs = GetColBombs();

    for(var i = 0; i < 25; i++) {
        tileElementArray[i].classList.remove('flipped')
        tileElementArray[i].classList.remove('marked')
        tileElementArray[i].textContent = boardString[i];
        tileElementArray[i].setAttribute("value" , boardString[i]);
    }

    for(var i = 0; i < 5; i++) {
        rowElementArray[i].children[0].textContent = rowTotals[i];
        rowElementArray[i].children[1].children[1].textContent = rowBombs[i];
    }

    for(var i = 0; i < 5; i++) {
        colElementArray[i].children[0].textContent = colTotals[i];
        colElementArray[i].children[1].children[1].textContent = colBombs[i];
    }
}

document.addEventListener('click', e => {
    if(!e.target.classList.contains('tile') || e.target.classList.contains('flipped') || (e.target.classList.contains('marked') && !markMode) || gameWon || gameLost) return;
    if(!markMode) {
        e.target.classList.toggle('flipped');
    }
    else {
        e.target.classList.toggle('marked');
        return;
    }

    if(e.target.getAttribute("value") === '4') {
        // gameState.textContent = "Game state: Loss";
        e.target.style.backgroundColor = bombColor;
        gameLost = true;
        for(var i = 0; i < 25; i++) {
            tileElementArray[i].classList.add('flipped');
        }
        return;
    }

    for(var i = 0; i < 25; i++) {
        if((tileElementArray[i].getAttribute("value") === '2' || tileElementArray[i].getAttribute("value") === '3') && !tileElementArray[i].classList.contains('flipped')) return;
    }

    // gameState.textContent = "Game state: Won";
    for(var i = 0; i < 25; i++) {
        if(tileElementArray[i].getAttribute("value") === '2' || tileElementArray[i].getAttribute("value") === '3') {
            tileElementArray[i].style.backgroundColor = winnerColor;
        }
    }
    gameWon = true;

})