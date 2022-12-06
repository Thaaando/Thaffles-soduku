
var selectedCell;
var selectedContainer;

var parentGrid = document.getElementById("parent-grid");
var pauseMenu = document.getElementById("pause-menu");
var minTxt = document.getElementById("min-txt");
var secTxt = document.getElementById("sec-txt");
var messageBar = document.getElementById("message-bar");
var messageText = messageBar.getElementsByClassName("message-text")[0];
var mistakesTxt = document.getElementById("mistake-txt");

var emptyCells = 0;
var mistakes = 0;
var isGameOver = false;
var timeInterval;
var isNotes = false;
var isPaused = false;
var seconds;
var minutes;
var currGridHTML;

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

var testPuzzle2 = [
    1,5,9,2,7,4,8,3,6,
    3,4,2,5,6,8,1,9,7,
    7,8,6,3,1,9,4,5,2,
    7,1,8,4,9,3,5,6,2,
    9,2,6,8,5,1,4,7,3,
    5,4,3,6,2,7,1,9,8,
    3,2,1,9,8,5,6,4,7,
    6,8,5,7,3,4,2,1,9,
    9,7,4,2,6,1,8,3,0
]

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
    emptyCells = 0;
    generateTable();
    seconds = 00;
    minutes = 00;
    minTxt.innerHTML = "00";
    secTxt.innerHTML = "00";
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
                        var cellValue = testPuzzle[cellNumber];
                      
                        parentGridHTML += '<div class="cell r-' + currRow + ' c-' + currCol ;
                        var name = '" name="' + testPuzzle[cellNumber] +'"><p class="input-text" id="' + cellNumber + '">';
                        if(cellValue != 0){
                            
                            parentGridHTML += ' final' + name +   cellValue;
                           
                        }else {
                            parentGridHTML +=  name;
                            emptyCells++;
                        }
                        // parentGridHTML += cellNumber;
                        
                        parentGridHTML +=  '</p>'
                        parentGridHTML += '<div class="col w-100 h-100 note-layout"><div class="row w-100 h-30" ><p  class="note-text" name="1"></p><p class="note-text"  name="2"></p><p class="note-text"  name="3"></p></div><div class="row w-100 h-30"><p class="note-text"  name="4"></p><p class="note-text"  name="5"></p><p class="note-text"  name="6"></p></div><div class="row w-100  h-30"><p class="note-text"  name="7"></p><p class="note-text"  name="8"></p><p class="note-text"  name="9"></p></div></div>'
                        
                        parentGridHTML += ' </div>';
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
        console.log(emptyCells)
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
        case "0"  :
            erase();
            break;
        case "Backspace" :
            erase();
            break;
        case "delete":
            erase();
            break;
    }
})





function gameOver(){
    isGameOver = true;
    clearInterval(timeInterval);

    showMessage(" Made 3 mistakes, Game Over :( ", false);
    parentGrid.innerHTML = '  <div class="game-over h-center">Nice Try!<button class="number-btn" onclick="startGame()">Retry</button></div>'
}


function togglePause() {
    
    isPaused = !isPaused;
    if(isPaused){
        console.log("Game Paused");
        currGridHTML = parentGrid.innerHTML;
        pauseMenu.style.display = "block";
        parentGrid.style.display = "none";
        // parentGrid.innerHTML = '  <div class="game-over h-center">Paused!<button class="number-btn" onclick="togglePause()">Resume</button></div>'
        clearInterval(timeInterval);
    }else{
        console.log("Game resumed");
        pauseMenu.style.display = "none";
        parentGrid.style.display = "block";
        // parentGrid.innerHTML = currGridHTML;
        startTimer();
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

function setValue(number) {
    if(mistakes <3 ){
       if(selectedCell != null){
            if(isNotes){ //check if notes has been enabled
                selectedCell.getElementsByClassName("note-layout")[0].style.display = "block";
                var noteTxt = selectedCell.getElementsByClassName("note-text")[number-1];
                console.log(noteTxt.innerHTML);
                if(noteTxt.innerHTML != ""){
                    console.log("not empty")
                    noteTxt.innerHTML = "";
                }else{
                    noteTxt.innerHTML = number;

                }
                console.log(noteTxt);
            }else {
                selectedCell.getElementsByClassName("note-layout")[0].style.display = "none";

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

            
            
        }
        
    }else {
        gameOver();
    }
    
}

function toggleNotes() {
    isNotes = !isNotes;
    console.log("Note Status :" + isNotes)
}

function erase() {
    if(selectedCell != null){
        if(selectedCell.classList.contains("error") ){
            selectedCell.classList.remove("error");
            selectedCell.getElementsByClassName("input-text")[0].innerHTML = "";
            selectedCell.attributes["name"].value = "0";
        }else{
            showMessage("can't erase this cell");
        }
     

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
        showMessage("Made a mistake, only " + (3-mistakes)+ " lives remaining" );

        if(mistakes == 3) {

            gameOver();
        }


    }else{
        cell.classList.remove("error");
        cell.classList.add("modified");
        emptyCells--;
        if(emptyCells == 0){
            puzzleComplete();
        }
    }
}
//Check for a win scenario
function checkTable (currentTable , completeTable) {

}

function puzzleComplete() {

    isGameOver = true;
    clearInterval(timeInterval);

    showMessage("Nice One! ", false);
    parentGrid.innerHTML = '  <div class="game-over complete h-center">Go have a nice wank boyo!<button class="number-btn" onclick="startGame()">Retry</button></div>'

    console.log("Puzzle Complete")
}
