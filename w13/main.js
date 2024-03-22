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
        out:            elem.OUTPUT,    // output element
        targetNum:      targetNum,      // request total sets to perform
        minutes:        minutes,        // minutes per set
        rest:           rest,           // seconds rest time between sets
        exercise:       exercise,       // name of exercise
        setNum:         setNum,         // current set number
        // working variables for timers
        curMin:         undefined,      // current minutes in set
        curSec:         undefined,      // current seconds in set
        restSec:        undefined,      // current resting time
        spCountdown:    undefined,      // countdown span
        spMinutes:      undefined,      // timer minutes span
        spSeconds:      undefined,      // timer seconds span
    };

    displayCountdown(timeout_parms)
        .then(displaySetTimer)
        .then(setComplete);
}

// display a countdown timer at the given element for the specified number
// of seconds, then call the endCallback function
const displayCountdown = (tp) => {
    // create the countdown text
    const spExercise = document.createElement("span");  // span for the exercise name
    spExercise.classList.add("highlight");
    spExercise.textContent = tp.exercise;
    tp.spCountdown = document.createElement("span"); // span for the countdown
    tp.out.textContent = "Get ready to begin your next set of ";
    tp.out.appendChild(spExercise);
    spExercise.after(" in ");
    tp.out.appendChild(tp.spCountdown);
    tp.spCountdown.after(" seconds...");
    // set working variables
    tp.restSec = tp.rest;
    return new Promise((resolve) => {
        // perform the countdown
        displayCountdownVal(tp, resolve);
    });
}

// update the value of a countdown timer (seconds only)
const displayCountdownVal = (tp, resolve) => {
    tp.spCountdown.textContent = tp.restSec;
    if(tp.restSec > 0){    // still have more time to wait
        setTimeout(() => {
            --tp.restSec;
            displayCountdownVal(tp, resolve);
        }, 1000);
    } else {            // time's up
        resolve(tp);
    }
}

// display and update the set timer for the current set
const displaySetTimer = (tp) => {
    tp.curMin = Math.floor(tp.minutes);
    tp.curSec = (tp.minutes - tp.curMin) * 60;

    // create the timer text
    const divExercise = document.createElement("div");
    const spExercise = document.createElement("span");  // span for the exercise name
    spExercise.classList.add("highlight");
    spExercise.textContent = tp.exercise;
    tp.spMinutes = document.createElement("span");  // span for the timer values
    tp.spSeconds = document.createElement("span");
    divExercise.textContent = "Let's do some ";
    divExercise.appendChild(spExercise);
    spExercise.after("!");
    tp.out.textContent = "";
    tp.out.appendChild(divExercise);
    const divTimer = document.createElement("div");
    divTimer.textContent = `Set #${tp.setNum} of ${tp.targetNum} -- Time remaining: `;
    divTimer.appendChild(tp.spMinutes);
    tp.spMinutes.after(" min ");
    divTimer.appendChild(tp.spSeconds);
    tp.spSeconds.after(" sec");
    tp.out.appendChild(divTimer);
    return new Promise((resolve) => {
        // perform the countdown
        displaySetTimerVal(tp, resolve);
    });
}

// update the values of the set timer, minutes and seconds
const displaySetTimerVal = (tp, resolve) => {
    tp.spMinutes.textContent = tp.curMin;
    tp.spSeconds.textContent = tp.curSec;
    if(tp.curMin > 0 || tp.curSec > 0){    // still have more time to wait
        setTimeout(() => {
            if(!tp.curSec){      // seconds timer reached zero
                --tp.curMin;
                tp.curSec = 59;
            }else{
                --tp.curSec;
            }
            displaySetTimerVal(tp, resolve);
        }, 1000);
    } else {            // time's up
        resolve(tp);
    }
}

// set is complete, check if we need to do more and start next one
const setComplete = (tp) => {
    if(tp.setNum < tp.targetNum){     // we still have more sets to perform
        performSets(tp.setNum + 1, tp.targetNum, tp.minutes, tp.rest, tp.exercise);
    }else{
        tp.out.textContent = "Exercises complete, well done!";
        elem.SUBMIT.disabled = false;   // re-enable submit button to allow another run
        elem.SUBMIT.textContent = "Start Another";
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
