let waiting = false;
let waitTime = 0;
let screaming = false;

const text = document.getElementById("txt");
const idleText = "Press anywhere to start the countdown.";
const screamText = "PRESS ANYWHERE TO MAKE IT STOP";
const startedText = "Countdown started. Be patient.";

const minTime = 2;
const maxTime = 50;

const screamAudio = new Audio("assets/scream.mp3");
screamAudio.loop = true;

const tickingAudio = new Audio("assets/ticking.mp3");
tickingAudio.loop = true;

document.addEventListener("DOMContentLoaded", function (e) {
    text.innerText = idleText;
})

document.addEventListener("click", function (e) {
    if (!screaming) {
        if (!waiting) {
            text.innerText = startedText;
            waiting = true;
            waitTime = Math.random() * (maxTime - minTime) + minTime;
            tickingAudio.play();
            console.log("Countdown seconds: " + waitTime);
            setTimeout(function () {
                waiting = false;
                waitTime = 0;
                screaming = true;
                tickingAudio.pause();
                text.innerText = screamText;
                tickingAudio.currentTime = 0;
                screamAudio.play();
                document.body.classList.add("scream");
                console.log("Countdown ended! Scream!");
            }, waitTime * 1000)
        }
    } else {
        screaming = false;
        screamAudio.pause();
        document.body.classList.remove("scream");
        text.innerText = idleText;
    }
})