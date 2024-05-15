let workoutTimeInput = document.getElementById("workoutTime");
let breakTimeInput = document.getElementById("breakTime");
let intervalsInput = document.getElementById("intervals");
let setBreakTimeInput = document.getElementById("setBreakTime");
let setsInput = document.getElementById("sets");
let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");
let resetButton = document.getElementById("reset");
let time = document.getElementById("time");
let remainingSetDiv = document.getElementById("remainingSet");
let totalSetsDiv = document.getElementById("totalSets");
let remainingIntervalDiv = document.getElementById("remainingInterval");
let totalIntervalsDiv = document.getElementById("totalIntervals");
let timerContainer = document.getElementById("timerContainer");

let nIntervId;
let remainingWorkoutTime;
let remainingBreakTime;
let remainingInterval;
let remainingSetBreakTime;
let remainingSets;
let remainingStartCountdown;

const startCountdown = 3;
let timerRunning = false;
let countdownRunning = true;
let workoutRunning = false;
let intervalBreakRunning = false;
let setBreakRunning = false;

//functions
function handleStartButtonClick() {
    if (!timerRunning) {
        initTimer();
        timerRunning = true;
    }
    if (!nIntervId) {
        nIntervId = setInterval(runTimer, 1000);
    }
}

function handleResetButtonClicked() {
    stopInterval();
    initTimer();
    timerRunning = false;
}

function handleStopButtonClicked() {
    stopInterval();
}

function runTimer() {

    remainingIntervalDiv.innerText = intervalsInput.value - remainingInterval;
    totalIntervalsDiv.innerText = intervalsInput.value;

    remainingSetDiv.innerText = setsInput.value - remainingSets;
    totalSetsDiv.innerText = setsInput.value;

    if (remainingSets > 0) {
        if (setBreakRunning) {
            time.innerText = remainingSetBreakTime;
            if (remainingSetBreakTime > 1) {
                remainingSetBreakTime--;
            } else {
                remainingSetBreakTime = setBreakTimeInput.value;
                setBreakRunning = false;
            }
        } else {
            if (intervalBreakRunning) {
                timerContainer.classList.add("timer-container-green");
                timerContainer.classList.remove("timer-container-red");
                time.innerText = remainingBreakTime;
                if (remainingBreakTime === breakTimeInput.value) {
                    beepLowAudio.play();
                }
                if (remainingBreakTime > 0) {
                    remainingBreakTime--;
                } else {
                    intervalBreakRunning = false;
                    remainingBreakTime = breakTimeInput.value;
                    workoutRunning = true;
                }
            }

            if (workoutRunning) {
                timerContainer.classList.remove("timer-container-green");
                timerContainer.classList.add("timer-container-red");
                time.innerText = remainingWorkoutTime;
                if (remainingWorkoutTime === workoutTimeInput.value) {
                    beepHighAudio.play();
                }
                if (remainingWorkoutTime > 1) {
                    remainingWorkoutTime--;
                } else {
                    workoutRunning = false;
                    intervalBreakRunning = true;
                    remainingWorkoutTime = workoutTimeInput.value;
                    remainingInterval--;
                    if (remainingInterval === 0) {
                        remainingSets--;
                        remainingInterval = intervalsInput.value;
                        setBreakRunning = true;
                    }
                }
            }

            if (countdownRunning) {
                beepLowAudio.play();
                time.innerText = remainingStartCountdown;
                if (remainingStartCountdown > 1) {
                    remainingStartCountdown--;

                } else {
                    countdownRunning = false;
                    workoutRunning = true;
                }
            }
        }
    } else {
        time.innerText = "finished <3";
        handleStopButtonClicked();
    }
}

function initTimer() {
    remainingWorkoutTime = workoutTimeInput.value;
    remainingBreakTime = breakTimeInput.value;
    remainingInterval = intervalsInput.value;
    remainingSetBreakTime = setBreakTimeInput.value;
    remainingSets = setsInput.value;
    remainingStartCountdown = startCountdown;

    timerRunning = false;
    countdownRunning = true;
    workoutRunning = false;
    intervalBreakRunning = false;
    setBreakRunning = false;

    time.innerText = "0";
    remainingIntervalDiv.innerText = "0";
}

function stopInterval() {
    clearInterval(nIntervId);
    nIntervId = null;
}

//event listeners
startButton.addEventListener("click", handleStartButtonClick);
stopButton.addEventListener("click", handleStopButtonClicked);
resetButton.addEventListener("click", handleResetButtonClicked);

//audio
let beepLowAudio = new Audio('./beep_low.mp3');
beepLowAudio.autoplay = true;

let beepHighAudio = new Audio('./beep_high.mp3');
beepHighAudio.autoplay = true;




