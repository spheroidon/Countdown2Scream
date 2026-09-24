// Variable initialization
let waiting = false;
let waitTime = 0;
let screaming = false;
let impatient = false;

let screamCount = 0;

const minTime = 1;
const maxTime = 90;

const impatienceTime = 1;

// Text variables
const labelStatus = document.getElementById("status");
const labelCounter = document.getElementById("counter");

const idleText = ["Press anywhere to start the countdown."];
const screamText = ["PRESS ANYWHERE TO MAKE IT STOP","AAAAAAAAAAAAA"];
const waitingText = ["Countdown started. Be patient.","The countdown has started.","Prepare."];
const impatientText = ["BE PATIENT", "WAIT A BIT", "CLICKING WONT MAKE THE COUNTDOWN FASTER", ">:(", "JUST WAIT", "DON'T BE SO IMPATIENT","GRR","JUST. WAIT.","D:<","GRRRRR"];

// Audio variables
const screamAudio = new Audio("assets/scream.mp3");
screamAudio.loop = true;

const tickingAudio = new Audio("assets/ticking.mp3");
tickingAudio.loop = true;

const impatientAudio = new Audio("assets/impatient.mp3");

// Wakelock functionality
let wakeLock = null;

async function requestWakelock() {
    try {
        wakeLock = await navigator.wakeLock.request("screen");
    } catch (err) {
        console.warn("Failed to request WakeLock: " + err.name + ", " + err.message);
    }
}

// Initial load
document.addEventListener("DOMContentLoaded", function (e) {
    labelStatus.innerText = idleText[Math.floor(Math.random() * idleText.length)];
});


// Main functionality
function handleSite(e) {
    if (!screaming) {
        if (!waiting) {
            // Start countdown
            labelStatus.innerText = waitingText[Math.floor(Math.random() * waitingText.length)];
            waiting = true;
            waitTime = Math.random() * (maxTime - minTime) + minTime;
            tickingAudio.play();
            requestWakelock();
            console.log("Countdown seconds: " + waitTime);
            setTimeout(function () {
                // Screaming / countdown ended
                /// Reset countdown
                waiting = false;
                waitTime = 0;
                screaming = true;
                tickingAudio.pause();
                // Update counter
                screamCount += 1;
                labelCounter.innerText = "Screams: " + screamCount;
                /// Start screaming
                labelStatus.innerText = screamText[Math.floor(Math.random() * screamText.length)];
                tickingAudio.currentTime = 0;
                screamAudio.play();
                document.body.classList.remove("impatient");
                document.body.classList.add("scream");
                console.log("Countdown ended! Scream!");
            }, waitTime * 1000)
        } else {
            if (!impatient) {
                // Impatient
                impatient = true;
                labelStatus.innerText = impatientText[Math.floor(Math.random() * impatientText.length)];
                tickingAudio.pause();
                impatientAudio.currentTime = 0;
                impatientAudio.play();
                document.body.classList.add("impatient");
                setTimeout(function () {
                    if (waiting) {
                        // Restore waiting state
                        impatient = false;
                        document.body.classList.remove("impatient");
                        labelStatus.innerText = waitingText[Math.floor(Math.random() * waitingText.length)];
                        tickingAudio.play();
                    }
                }, impatienceTime * 1000);
            }
        }
    } else {
        // Stop screaming
        screaming = false;
        screamAudio.pause();
        document.body.classList.remove("scream");
        labelStatus.innerText = idleText;
        // Release wakelock
        try {
            wakeLock.release().then(() => {
                wakeLock = null;
            });
        } catch (err) {
            console.warn("Failed to release WakeLock: " + err.name + ", " + err.message);
        }
    }
}

document.addEventListener("click", handleSite);
document.addEventListener("keypress", function (e) {
    if (e.key == " ") {
        handleSite(e);
    }
});