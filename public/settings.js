import { togglePause, getGameStatus } from "./script.js";



var duplicateSwitch = document.getElementById("duplicate-switch");
var highlightsSwitch = document.getElementById("highlights-switch");
var completionSwitch = document.getElementById("completion-switch");
var numbersLeftSwitch = document.getElementById("numbers-left-switch");
var mistakeSwitch = document.getElementById("mistake-switch");

var openSettingsBtn = document.getElementById("open-settings-btn");
var closeSettingsBtn = document.getElementById("close-settings-btn");

var settingsMenu = document.getElementById("settings-menu");
var completionStatus = document.getElementById("completion-status");

var siteColors = document.querySelectorAll(".site-color");
var selectedTheme = document.getElementsByClassName("site-color active")[0];

var mistakeLimitTxt = document.getElementById("mistake-limit-txt");
var showDuplicates = true;
var showHighlights = true;
var showNumbersLeft = true;
var mistakeLimit = true;


onInit();

function onInit () {
   
    openSettingsBtn.addEventListener("click", ()=>{
        openSettings();
        if(getGameStatus()){
            togglePause();
        }
    });

    closeSettingsBtn.addEventListener("click", ()=>{
        settingsMenu.style.display = "none";
        if(getGameStatus()){
            togglePause();
        }

    });

    duplicateSwitch.addEventListener("change", () =>{
        toggleDuplicates();
    });

    highlightsSwitch.addEventListener("change", () => {
        toggleHighlights();
    });

    mistakeSwitch.addEventListener("change", () =>{
        toggleMistakesLimit();
    })

    numbersLeftSwitch.addEventListener("change", () => {
        if(numbersLeftSwitch.checked){
            document.querySelectorAll(".numbers-left").forEach((
                numberLeft
            ) => {
                numberLeft.style.display = "block"
            });
        }else{
            document.querySelectorAll(".numbers-left").forEach((
                numberLeft
            ) => {
                numberLeft.style.display = "none"
            });
        }
    });

    completionSwitch.addEventListener("change", () => {
        if(completionSwitch.checked){
            completionStatus.style.display = "block";

        }else{
            completionStatus.style.display = "none";

        }
    });


    siteColors.forEach((picker)=>{

        if (picker.classList.contains("active")){
            selectedTheme = picker;
            setTheme();
        }
        picker.addEventListener("click", ()=>{

            selectedTheme.classList.remove("active");
            picker.classList.add("active");
            selectedTheme = picker;
            setTheme();
        });
    });
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

function toggleMistakesLimit() {
    mistakeLimit = !mistakeLimit;
    if(mistakeLimit){
        mistakeLimitTxt.style.display = "block";
    }else {
        mistakeLimitTxt.style.display = "none";

    }
    console.log("Mistake Limit : " + mistakeLimit );
}

function setTheme() {
    switch(selectedTheme.attributes["name"].value){
        case "theme-dark": 
            document.body.style.backgroundColor = "rgb(30, 30, 30)";
            document.body.style.color = "white";
            settingsMenu.getElementsByClassName("main-body")[0].style.backgroundColor = "rgb(30, 30, 30)";
            break;
        case "theme-baby-blue":
            document.body.style.backgroundColor = "#367eb8";
            document.body.style.color = "black";
            settingsMenu.getElementsByClassName("main-body")[0].style.backgroundColor = "white";

            break;
        case "theme-baige":
            document.body.style.backgroundColor = "rgb(255, 222, 203)";
            document.body.style.color = "black";
            settingsMenu.getElementsByClassName("main-body")[0].style.backgroundColor = "white";

            break;
        
    }
    
}



export function getDuplicateSetting() {
    return showDuplicates;
}

export function getHighlightSetting() {
    return showHighlights;
}

export function getMistakesLimit() {
    return mistakeLimit;
}


