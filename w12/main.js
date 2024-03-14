import { config, OUTPUT } from "./globals.js";

// kick things off by displaying the countdown for the first set
const performSets = (setNum, targetNum, minutes, exercise) => {
    displayCountdown(OUTPUT, config.countdown_time, setNum, targetNum, minutes, exercise);
}

// display a countdown timer at the given element for the specified number
// of seconds, then call the endCallback function
const displayCountdown = (elem, seconds, setNum, targetNum, minutes, exercise) => {
    // create the countdown text
    const spExercise = document.createElement("span");  // span for the exercise name
    spExercise.classList.add("highlight");
    spExercise.textContent = exercise;
    const spCountdown = document.createElement("span"); // span for the countdown
    elem.textContent = "Get ready to begin your next set of ";
    elem.appendChild(spExercise);
    spExercise.after(" in ");
    elem.appendChild(spCountdown);
    spCountdown.after(" seconds...");
    // perform the countdown
    displayCountdownVal(elem, spCountdown, seconds, displaySetTimer, setNum, targetNum, minutes, exercise);
}

// update the value of a countdown timer (seconds only)
const displayCountdownVal = (elem, span, seconds, endCallback, setNum, targetNum, minutes, exercise) => {
    span.textContent = seconds;
    if(seconds > 0){    // still have more time to wait
        setTimeout(() => {
            displayCountdownVal(elem, span, seconds - 1, endCallback, setNum, targetNum, minutes, exercise);
        }, 1000);
    } else {            // time's up
        endCallback(elem, setNum, targetNum, minutes, exercise);
    }
}

// display and update the set timer for the current set
const displaySetTimer = (elem, setNum, targetNum, minutes, exercise) => {
    let timerMinutes = Math.floor(minutes);
    let timerSeconds = (minutes - timerMinutes) * 60;

    // create the timer text
    const divExercise = document.createElement("div");
    const spExercise = document.createElement("span");  // span for the exercise name
    spExercise.classList.add("highlight");
    spExercise.textContent = exercise;
    const spTimerMinutes = document.createElement("span");  // span for the timer values
    const spTimerSeconds = document.createElement("span");
    divExercise.textContent = "Let's do some ";
    divExercise.appendChild(spExercise);
    spExercise.after("!");
    elem.textContent = "";
    elem.appendChild(divExercise);
    const divTimer = document.createElement("div");
    divTimer.textContent = `Set #${setNum} of ${targetNum} -- Time remaining: `;
    divTimer.appendChild(spTimerMinutes);
    spTimerMinutes.after(" min ");
    divTimer.appendChild(spTimerSeconds);
    spTimerSeconds.after(" sec");
    elem.appendChild(divTimer);
    // perform the countdown
    displaySetTimerVal(elem, spTimerMinutes, spTimerSeconds, timerMinutes, timerSeconds, setComplete, setNum, targetNum, minutes, exercise);
}

// update the values of the set timer, minutes and seconds
const displaySetTimerVal = (elem, eMin, eSec, tMin, tSec, endCallback, setNum, targetNum, minutes, exercise) => {
    eMin.textContent = tMin;
    eSec.textContent = tSec;
    if(tMin > 0 || tSec > 0){    // still have more time to wait
        setTimeout(() => {
            if(!tSec){      // seconds timer reached zero
                --tMin;
                tSec = 59;
            }else{
                --tSec;
            }
            displaySetTimerVal(elem, eMin, eSec, tMin, tSec, endCallback, setNum, targetNum, minutes, exercise);
        }, 1000);
    } else {            // time's up
        endCallback(elem, setNum, targetNum, minutes, exercise);
    }
}

const setComplete = (elem, setNum, targetNum, minutes, exercise) => {
    if(setNum < targetNum){     // we still have more sets to perform
        performSets(setNum + 1, targetNum, minutes, exercise);
    }else{
        elem.textContent = "Exercises complete, well done!";
    }
}

performSets(1, 2, 0.25, "Push-Ups");
