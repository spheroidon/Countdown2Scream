let waiting = false;
let waitTime = 0;

const minTime = 3
const maxTime = 60

document.addEventListener("click", function (e) {
    if (!waiting) {
        waiting = true;
        waitTime = Math.random() * (maxTime - minTime) + minTime;
        console.log("Countdown seconds: "+waitTime);
        setTimeout(function() {
            waiting = false;
            waitTime = 0;
            document.body.classList.add("scream");
            console.log("Countdown ended! Scream!")
        }, waitTime*1000)
    }
})