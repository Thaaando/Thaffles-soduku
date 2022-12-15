var toggleDupBtn = document.getElementById("duplicate-btn");

var showDuplicates = true;


onInit();

function onInit () {
    toggleDupBtn.addEventListener("click", ()=> {
        toggleDuplicates();
    })
}

function toggleDuplicates() {
    showDuplicates = !showDuplicates;
    console.log("Show duplicates : " + showDuplicates);
}

export function getDuplicateSetting() {
    return showDuplicates;
}


