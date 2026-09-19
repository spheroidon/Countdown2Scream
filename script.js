// Variable initialization
let waiting = false;
let waitTime = 0;
let screaming = false;

const minTime = 1;
const maxTime = 90;

// Text variables
const text = document.getElementById("txt");
const idleText = "Press anywhere to start the countdown.";
const screamText = "PRESS ANYWHERE TO MAKE IT STOP";
const startedText = "Countdown started. Be patient.";

// Audio variables
const screamAudio = new Audio("assets/scream.mp3");
screamAudio.loop = true;

const tickingAudio = new Audio("assets/ticking.mp3");
tickingAudio.loop = true;

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
    text.innerText = idleText;
});


// Main functionality
document.addEventListener("click", function (e) {
    if (!screaming) {
        if (!waiting) {
            // Start countdown
            text.innerText = startedText;
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
                /// Start screaming
                text.innerText = screamText;
                tickingAudio.currentTime = 0;
                screamAudio.play();
                document.body.classList.add("scream");
                console.log("Countdown ended! Scream!");
            }, waitTime * 1000)
        }
    } else {
        // Stop screaming
        screaming = false;
        screamAudio.pause();
        document.body.classList.remove("scream");
        text.innerText = idleText;
        // Release wakelock
        try {
            wakeLock.release().then(() => {
                wakeLock = null;
            });
        } catch (err) {
            console.warn("Failed to release WakeLock: " + err.name + ", " + err.message);
        }
    }
});