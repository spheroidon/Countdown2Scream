let waiting = false;
let waitTime = 0;
let screaming = false;

const minTime = 2;
const maxTime = 50;

const screamAudio = new Audio("assets/scream.mp3");
screamAudio.loop = true;

document.addEventListener("click", function (e) {
    if (!screaming) {
        if (!waiting) {
            waiting = true;
            waitTime = Math.random() * (maxTime - minTime) + minTime;
            console.log("Countdown seconds: " + waitTime);
            setTimeout(function () {
                waiting = false;
                waitTime = 0;
                screaming = true;
                screamAudio.play();
                document.body.classList.add("scream");
                console.log("Countdown ended! Scream!");
            }, waitTime * 1000)
        }
    } else {
        screaming = false;
        screamAudio.pause();
        document.body.classList.remove("scream");
    }
})