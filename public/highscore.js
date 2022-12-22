var bestTime = 2147483647;

export function saveScore(currTime=0){
    if(currTime  < bestTime) {
        bestTime = currTime;
        console.log("New HighScore");
        window.localStorage.setItem("highScore", bestTime);
        return true;
    }
    return false;
}

export function getScore() {
    return window.localStorage.getItem("highScore");
}