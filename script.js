var selectedCell;
var selectedContainer;

var numberBtn = document.getElementsByClassName("number-btn");
var parentGrid = document.getElementById("parent-grid");
var emptyCells = 0;
var testPuzzle = [
    1,2,3,0,0,0,0,8,9,
    1,2,0,8,4,6,8,9,5,
    1,0,3,0,5,6,0,8,9,
    1,2,3,0,5,6,7,0,9,
    1,2,3,4,0,6,0,8,9,
    1,2,0,4,5,0,7,8,9,
    1,0,3,0,5,0,7,0,9,
    1,2,3,4,0,6,7,0,9,
    1,0,3,4,5,6,7,8,9
]


//Start up
generateTable();

function generateTable() {


    var cellNumber = 0;
    var parentGridHTML = '';

    //used for cell navigation through numbering cells by row (r-1, r-2 .. )and colums (c-1, c-2, c-3) within the class list
    var currRow = 1;
    var colOffset = 0;
        //Outer rows
        for(i = 0; i < 3; i++){
            var currCol = 1;

            parentGridHTML += '<div class="row">';
            //Inner Containers
            for(j = 0; j < 3; j++){
                parentGridHTML += '<div class="container">';
                //Inner Rows
                for(k = 0; k < 3; k++){
                    var innerRowNumber = k +1;
                    parentGridHTML += '<div class="row"name = "' + innerRowNumber + '" ' + '>';
                    //Individual Cells
                    for(c = 0; c < 3; c++){                      
                        parentGridHTML += '<div class="cell r-' + currRow + ' c-' + currCol + '"><p class="input-text">';
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
                    
                        if((currCol-1)%3==0){
                            currCol -= 3 ;
                        }
                    }
                    parentGridHTML += '</div>';
                    currRow++;                    
                    if((currRow-1)%3==0){
                        currRow -= 3;
                    }
                   
                }
                parentGridHTML += '</div>';
                if(j == 2){
                    currRow += 3;

                }
                currCol += 3;
            }

            parentGridHTML += '</div>';
        }
        parentGrid.innerHTML = parentGridHTML;

}


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


var cells =  document.querySelectorAll(".cell").forEach(cell => {
    
    cell.addEventListener("click", event => 

    {
        selectCell(cell);

       
    })
})

function setValue(number) {
    var valueElement =  selectedCell.getElementsByClassName("input-text")[0]
    if(selectedCell != null){
        if(valueElement.innerHTML == ""){
            selectedCell.getElementsByClassName("input-text")[0].innerHTML = number;

        }else{
            showMessage("Can't fill a pre-filled cell");
        }
    }
}

function showMessage (message) {
    var messageBar = document.getElementById("message-bar");
    var messageText = messageBar.getElementsByClassName("message-text")[0];
    messageText.innerHTML= message;
    messageBar.style.display = "block";

    //hide message after 2 secs
    setTimeout(function () {
        messageBar.style.display = "none" 
    }
    , 2000);
}

function selectCell(cell){
    if(selectedCell != null) {
        selectedCell.classList.remove("active");

    }
    selectedCell = cell;
    cell.classList.add("active");
    // detectRow(cell);
    detectCellRowColumn(cell);
    
}


function detectCellRowColumn(cell){
    var innerRow = cell.parentElement;
    var container = innerRow.parentElement;


   
   
    //Detect the container
    if(selectedContainer != null){
        selectedContainer.classList.remove("highlighted");
    }

    selectedContainer = container;
    container.classList.add("highlighted");

    var rowNumber = "." + cell.classList[1];
    var colNumber = "." + cell.classList[2];

    document.querySelectorAll(".cell.highlighted").forEach((otherCell) =>{
        otherCell.classList.remove("highlighted");
    })
    highlightCells(rowNumber);
    highlightCells(colNumber);
    


}

function highlightCells(coordinate) {
    document.querySelectorAll(coordinate).forEach((otherCell) =>{
        otherCell.classList.add("highlighted");
    });
}




//Check for a win scenario
function checkTable (currentTable , completeTable) {

}