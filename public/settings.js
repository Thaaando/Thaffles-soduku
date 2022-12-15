var toggleDupBtn = document.getElementById("duplicate-btn");
var toggleHighlightsBtn = document.getElementById("highlights-btn");
var highlightStatus = document.getElementById("highlights-status");
var duplicateStatus = document.getElementById("duplicate-status");

var showDuplicates = true;
var showHighlights = true;


onInit();

function onInit () {
    toggleDupBtn.addEventListener("click", ()=> {
        toggleDuplicates();
    })

    toggleHighlightsBtn.addEventListener("click", () => {
        toggleHighlights();
    })
}

function toggleDuplicates() {
    showDuplicates = !showDuplicates;
    if(showDuplicates){
        duplicateStatus.innerHTML = "On";
    }else {
        duplicateStatus.innerHTML = "Off";

    }
    console.log("Show duplicates : " + showDuplicates);
}

function toggleHighlights() {
    showHighlights = !showHighlights;
    if(showHighlights){
        highlightStatus.innerHTML = "On";
    }else {
        highlightStatus.innerHTML = "Off";

    }
    console.log("Show highlights : " + showHighlights);
}

export function getDuplicateSetting() {
    return showDuplicates;
}

export function getHighlightSetting() {
    return showHighlights;
}


