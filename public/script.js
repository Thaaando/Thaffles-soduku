
var selectedCell;
var selectedContainer;

var parentGrid = document.getElementById("parent-grid");
var minTxt = document.getElementById("min-txt");
var secTxt = document.getElementById("sec-txt");
var messageBar = document.getElementById("message-bar");
var messageText = messageBar.getElementsByClassName("message-text")[0];
var mistakesTxt = document.getElementById("mistake-txt");

var emptyCells = 0;
var mistakes = 0;
var isGameOver = false;
var timeInterval;

//This is a dummy puzzle to test out functionality
var testPuzzle = [ //the emptied out puzzle
    1,5,0,2,7,4,0,0,6,
    0,4,2,5,6,0,0,0,7,
    0,0,6,0,1,0,4,0,2,
    0,1,0,0,0,0,0,6,0,
    0,0,0,0,5,0,4,0,3,
    0,4,0,0,0,0,1,9,0,
    0,2,0,9,8,5,0,4,0,
    6,0,5,0,3,0,2,1,9,
    9,0,0,0,6,0,8,3,0
];

var memo = [ //the completed puzzle
    1,5,9,2,7,4,8,3,6,
    3,4,2,5,6,8,1,9,7,
    7,8,6,3,1,9,4,5,2,
    7,1,8,4,9,3,5,6,2,
    9,2,6,8,5,1,4,7,3,
    5,4,3,6,2,7,1,9,8,
    3,2,1,9,8,5,6,4,7,
    6,8,5,7,3,4,2,1,9,
    9,7,4,2,6,1,8,3,5
]
var currTable = testPuzzle;

//Start up
startGame();

function startGame(){
    mistakes = 0;
    isGameOver = false;
    generateTable();
    startTimer();
    messageBar.style.display = "none";
    mistakesTxt.innerHTML = mistakes;
    document.querySelectorAll(".cell").forEach(cell => {   
        cell.addEventListener("click", event => 
        {
            selectCell(cell);      
        })
    });
    

}

function startTimer() {
    var seconds = 00;
    var minutes = 00;
    minTxt.innerHTML = "00";
    secTxt.innerHTML = "00";
    timeInterval = setInterval(function() {
        
        seconds++;
        if(seconds < 10){
            secTxt.innerHTML = "0" + seconds;
        }else if(seconds  > 59){
            seconds = 0;
            minutes++;
            secTxt.innerHTML = "00";
            if(minutes < 10){
                minTxt.innerHTML = "0" + minutes;
            }else{
                minTxt.innerHTML = minutes;
            }
        }else{
            secTxt.innerHTML = seconds;

        }
        
        

    },1000);
}

function generateTable() {


    var cellNumber = 0;
    var parentGridHTML = '';

    //used for cell navigation through numbering cells by row (r-1, r-2 .. )and colums (c-1, c-2, c-3) within the class list
    var currRow = 1;

    var tableFactor = 3;
        //Outer rows
        for(i = 0; i < tableFactor; i++){
            var currCol = 1;

            parentGridHTML += '<div class="row">';
            //Inner Containers
            for(j = 0; j < tableFactor; j++){
                parentGridHTML += '<div class="container">';
                //Inner Rows
                for(k = 0; k < tableFactor; k++){
                    var innerRowNumber = k +1;
                    parentGridHTML += '<div class="row">';
                    //Individual Cells
                    for(c = 0; c < tableFactor; c++){                      
                        parentGridHTML += '<div class="cell r-' + currRow + ' c-' + currCol +  '" name="' + testPuzzle[cellNumber] +'"><p class="input-text" id="' + cellNumber + '" >';
                        var cellValue = testPuzzle[cellNumber];
                        if(cellValue != 0){
                            parentGridHTML += cellValue;
                           
                        }else {
                            emptyCells++;
                        }
                        // parentGridHTML += cellNumber;
                        parentGridHTML +=  '</p></div>';
                        cellNumber++;
                        currCol++;
                    
                        if((currCol-1)%tableFactor==0){
                            currCol -= tableFactor ;
                        }
                    }
                    parentGridHTML += '</div>';
                    currRow++;                    
                    if((currRow-1)%tableFactor==0){
                        currRow -= tableFactor;
                    }
                   
                }
                parentGridHTML += '</div>';
                if(j == tableFactor - 1){
                    currRow += tableFactor;

                }
                currCol += tableFactor;
            }

            parentGridHTML += '</div>';
        }
        parentGrid.innerHTML = parentGridHTML;

}

//Listen for keyboard inputs
document.addEventListener("keydown", event => {
    switch (event.key ) {
        case "9" :
            setValue(9);
            break;
        case "8" :
            setValue(8);
            break;  
        case "7" :
            setValue(7);
            break;  
        case "6" :
            setValue(6);
            break;  
        case "5" :
            setValue(5);
            break;  
        case "4" :
            setValue(4);
            break;  
        case "3" :
            setValue(3);
            break;  
        case "2" :
            setValue(2);
            break;  
        case "1" :
            setValue(1);
            break;  
        
    }
})





function gameOver(){
    isGameOver = true;
    clearInterval(timeInterval);

    showMessage(" Made 3 mistakes, Game Over :( ", false);
    parentGrid.innerHTML = '  <div class="game-over h-center">Nice Try!<button class="number-btn" onclick="startGame()">Retry</button></div>'
}



function setValue(number) {
    if(mistakes <3 ){
       if(selectedCell != null){
            var valueElement =  selectedCell.getElementsByClassName("input-text")[0];
            var isError = selectedCell.classList.contains("error");
            if(valueElement.innerHTML == "" || isError){
                selectedCell.getElementsByClassName("input-text")[0].innerHTML = number;
                selectedCell.attributes["name"].value = number;
                detectDuplicates();
                checkCell(valueElement.id,valueElement.innerHTML, selectedCell);
            }else{
                showMessage("Can't fill a pre-filled cell");
            }
            
        }
        
    }else {
        gameOver();
    }
    
}

function showMessage (message, close=true) {
    
    messageText.innerHTML= message;
    messageBar.style.display = "block";
    if(close){
    //hide message after 2 secs
        setTimeout(function () { messageBar.style.display = "none" }, 2000);
    }
   
}

function selectCell(cell){
    if(!isGameOver){
        if(selectedCell != null) {
            selectedCell.classList.remove("active");
    
        }
        selectedCell = cell;
        cell.classList.add("active");
        
        detectCellRowColumn(cell);
        detectDuplicates();
    }else {
    }
    

}

//Find all cell duplicates
function detectDuplicates(){
    var valueElement =  selectedCell.attributes["name"].value;
    document.querySelectorAll(".cell.duplicate").forEach((duplicate) =>{
        duplicate.classList.remove("duplicate");
    });
    if(valueElement != 0){
        
        var duplicates = document.getElementsByName(valueElement);
        duplicates.forEach((duplicate)=>{
            duplicate.classList.add("duplicate");
        });
    }
}

//find the row and column that a cell belongs to
function detectCellRowColumn(cell){
    var innerRow = cell.parentElement;
    var container = innerRow.parentElement; 
   
    //Detect the container
    if(selectedContainer != null){
        selectedContainer.classList.remove("highlighted");
    }

    selectedContainer = container;
    container.classList.add("highlighted");

    //class names that hold row and column numbers
    var rowNumber = "." + cell.classList[1];
    var colNumber = "." + cell.classList[2];

    document.querySelectorAll(".cell.highlighted").forEach((otherCell) =>{
        otherCell.classList.remove("highlighted");
    })
    highlightCells(rowNumber);
    highlightCells(colNumber);
}

//highlight the cell with the class name that is its coordinate
function highlightCells(coordinate) {
    document.querySelectorAll(coordinate).forEach((otherCell) =>{
        otherCell.classList.add("highlighted");
    });
}
//check if the value entered is correct
function checkCell (index, currValue, cell) {

    if(memo[index] != currValue){

        cell.classList.add("error");
        mistakes++;
        mistakesTxt.innerHTML = mistakes;
        if(mistakes == 3) {

            gameOver();
        }

    }else{
        cell.classList.remove("error");
        cell.classList.add("modified");
    }
}
//Check for a win scenario
function checkTable (currentTable , completeTable) {

}
