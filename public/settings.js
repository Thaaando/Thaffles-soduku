
var closeBtn = document.getElementById("close-settings-btn");

var duplicateSwitch = document.getElementById("duplicate-switch");
var highlightsSwitch = document.getElementById("highlights-switch");
var completionSwitch = document.getElementById("completion-switch");


var openSettingsBtn = document.getElementById("open-settings-btn");
var closeSettingsBtn = document.getElementById("close-settings-btn");

var settingsMenu = document.getElementById("settings-menu");
var completionStatus = document.getElementById("completion-status");

var showDuplicates = true;
var showHighlights = true;


onInit();

function onInit () {
   
    openSettingsBtn.addEventListener("click", ()=>{
        openSettings();
    });

    closeSettingsBtn.addEventListener("click", ()=>{
        settingsMenu.style.display = "none";
    });

    duplicateSwitch.addEventListener("change", () =>{
        toggleDuplicates();
    });

    highlightsSwitch.addEventListener("change", () => {
        toggleHighlights();
    });

    completionSwitch.addEventListener("change", () => {
        if(completionSwitch.checked){
            completionStatus.style.display = "block";

        }else{
            completionStatus.style.display = "none";

        }
    })
}

function openSettings() {
    settingsMenu.style.display = "block";

}

function toggleDuplicates() {
    showDuplicates = !showDuplicates;
    console.log("Show duplicates : " + showDuplicates);
}

function toggleHighlights() {
    showHighlights = !showHighlights;
    console.log("Show highlights : " + showHighlights);
}



export function getDuplicateSetting() {
    return showDuplicates;
}

export function getHighlightSetting() {
    return showHighlights;
}


