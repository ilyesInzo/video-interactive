// Credit: Mateusz Rybczonec

const FULL_DASH_ARRAY = 283;

const TIME_LIMIT_LEVEL = 20;
const WARNING_THRESHOLD_LEVEL = 6;
const ALERT_THRESHOLD_LEVEL = 3;

let TIME_LIMIT = TIME_LIMIT_LEVEL;
let WARNING_THRESHOLD = WARNING_THRESHOLD_LEVEL;
let ALERT_THRESHOLD = ALERT_THRESHOLD_LEVEL;

let COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
};
let isPaused = false;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

function resetValues() {
    clearInterval(timerInterval);
    timePassed = 0;
    timeLeft = TIME_LIMIT;
    timerInterval = null;
    remainingPathColor = COLOR_CODES.info.color;
    isPaused = false
}

function onTimesUp(spinner) {
    resetValues()
    spinner.style.display = "none"
}

function startTimer(spinner, callback) {
    timerInterval = setInterval(() => {

        if (!isPaused) {
            timePassed = timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;
            /*document.getElementById("base-timer-label").innerHTML = formatTime(
                timeLeft
            );*/
            setCircleDasharray();
            setRemainingPathColor(timeLeft);

            if (timeLeft === 0) {
                onTimesUp(spinner);
                callback()
            }
        }
    }, 1000);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(warning.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
    }
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}

function calculateAndSetSpinnerTimeSettings(customMaxTime) {
    if (customMaxTime) {
        TIME_LIMIT = customMaxTime;
        WARNING_THRESHOLD = Math.round(customMaxTime * 0.6);
        ALERT_THRESHOLD = Math.round(customMaxTime * 0.3);
    } else {
        TIME_LIMIT = TIME_LIMIT_LEVEL;
        WARNING_THRESHOLD = WARNING_THRESHOLD_LEVEL;
        ALERT_THRESHOLD = ALERT_THRESHOLD_LEVEL;
    }
    COLOR_CODES.warning.threshold = WARNING_THRESHOLD;
    COLOR_CODES.alert.threshold = ALERT_THRESHOLD;
}


export const displaySpinner = (callback, customMaxTime) => {
    const spinner = document.getElementById("app")

    calculateAndSetSpinnerTimeSettings(customMaxTime)
    resetValues()
    spinner.innerHTML = `
    <div class="base-timer">
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            class="base-timer__path-remaining ${remainingPathColor}"
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <img src="/giphy.gif" style=\"width: 50px; display: flex; align-items: center; justify-content: center; position: absolute; top: 0;\"></img>
    </div>
    `;
    spinner.style.display = "block"
    startTimer(spinner, callback);

}

export const hideSpinner = () => {
    const spinner = document.getElementById("app")
    onTimesUp(spinner)
}

export const reverseSpinner = () => {
    isPaused = !isPaused
}
