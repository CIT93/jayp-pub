import { config, elem } from "./globals.js";
import { validateFields } from "./validate.js";

//---- functions

// perform a single set defined by setNum
const performSets = (setNum, targetNum, minutes, rest, exercise) => {
    // We define a simple object for storing parameters for our "cascade" of
    // setTimeout() calls so that we don't have to pass each value as a
    // separate argument down the chain, and also so we don't pollute the
    // global name space.
    const timeout_parms = {
        setNum:     setNum,         // current set number
        targetNum:  targetNum,      // request total sets to perform
        minutes:    minutes,        // minutes per set
        rest:       rest,           // seconds rest time between sets
        exercise:   exercise,       // name of exercise
    }

    displayCountdown(elem.OUTPUT, timeout_parms);
}

// display a countdown timer at the given element for the specified number
// of seconds, then call the endCallback function
const displayCountdown = (elem, tp) => {
    // create the countdown text
    const spExercise = document.createElement("span");  // span for the exercise name
    spExercise.classList.add("highlight");
    spExercise.textContent = tp.exercise;
    const spCountdown = document.createElement("span"); // span for the countdown
    elem.textContent = "Get ready to begin your next set of ";
    elem.appendChild(spExercise);
    spExercise.after(" in ");
    elem.appendChild(spCountdown);
    spCountdown.after(" seconds...");
    // perform the countdown
    displayCountdownVal(elem, spCountdown, tp.rest, displaySetTimer, tp);
}

// update the value of a countdown timer (seconds only)
const displayCountdownVal = (elem, span, seconds, endCallback, tp) => {
    span.textContent = seconds;
    if(seconds > 0){    // still have more time to wait
        setTimeout(() => {
            displayCountdownVal(elem, span, seconds - 1, endCallback, tp);
        }, 1000);
    } else {            // time's up
        endCallback(elem, tp);
    }
}

// display and update the set timer for the current set
const displaySetTimer = (elem, tp) => {
    let timerMinutes = Math.floor(tp.minutes);
    let timerSeconds = (tp.minutes - timerMinutes) * 60;

    // create the timer text
    const divExercise = document.createElement("div");
    const spExercise = document.createElement("span");  // span for the exercise name
    spExercise.classList.add("highlight");
    spExercise.textContent = tp.exercise;
    const spTimerMinutes = document.createElement("span");  // span for the timer values
    const spTimerSeconds = document.createElement("span");
    divExercise.textContent = "Let's do some ";
    divExercise.appendChild(spExercise);
    spExercise.after("!");
    elem.textContent = "";
    elem.appendChild(divExercise);
    const divTimer = document.createElement("div");
    divTimer.textContent = `Set #${tp.setNum} of ${tp.targetNum} -- Time remaining: `;
    divTimer.appendChild(spTimerMinutes);
    spTimerMinutes.after(" min ");
    divTimer.appendChild(spTimerSeconds);
    spTimerSeconds.after(" sec");
    elem.appendChild(divTimer);
    // perform the countdown
    displaySetTimerVal(elem, spTimerMinutes, spTimerSeconds, timerMinutes, timerSeconds, setComplete, tp);
}

// update the values of the set timer, minutes and seconds
const displaySetTimerVal = (elem, eMin, eSec, tMin, tSec, endCallback, tp) => {
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
            displaySetTimerVal(elem, eMin, eSec, tMin, tSec, endCallback, tp);
        }, 1000);
    } else {            // time's up
        endCallback(elem, tp);
    }
}

// set is complete, check if we need to do more and start next one
const setComplete = (elem, tp) => {
    if(tp.setNum < tp.targetNum){     // we still have more sets to perform
        performSets(tp.setNum + 1, tp.targetNum, tp.minutes, tp.rest, tp.exercise);
    }else{
        elem.textContent = "Exercises complete, well done!";
        elem.SUBMIT.disabled = false;   // re-enable submit button to allow another run
    }
}

//---- start of primary code

// initialize fields to defaults
elem.SETS.value = config.default_sets;
elem.TIME.value = config.default_time;
elem.REST.value = config.default_countdown;

//---- event listeners

// submit button
elem.FORM.addEventListener("submit", function(e){
    e.preventDefault();     // prevent old-school HTML form submission
    if(validateFields(elem.ERROR, elem.EXERCISE, elem.SETS, elem.TIME, elem.REST)){
        // we disbale the Submit button while running an exercise, otherwise
        // we can end up with multiple concurrent exercise processes all
        // trying to run at the same time
        elem.SUBMIT.disabled = true;
        elem.SUBMIT.textContent = "Running...";
        // kick things off by displaying the countdown for the first set
        const exerName = elem.EXERCISE.options[elem.EXERCISE.selectedIndex].text;
        performSets(1, elem.SETS.value, elem.TIME.value, elem.REST.value, exerName);
    }
});
