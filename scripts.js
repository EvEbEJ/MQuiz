const tracks = {
    "Beethoven":["music/Beethoven-sym-3-1st.mp3"],
    "Brahms":["music/Brahms-sym-4-3rd.mp3"],
    "Debussy":["music/Debussy-la-mer.mp3"],
    "Dvorak":["music/Dvorak-ser-op22-4th.mp3"],
    "Handel":["music/Handel-sui-2-alla.mp3"],
    "Mozart":["music/Mozart-pcon-22-3rd.mp3"],
    "Stravinsky":["music/Strav-Rite-of-Spring-beginning.mp3"],
    "Tchaikovsky":["music/Tchai-sym-6-4th.mp3"],
};

const sample = document.querySelector('#sample');
const playBtn = document.querySelector('#play-btn');
const choicesCtr = document.querySelector('#choices-ctr');
const volumeBar = document.querySelector("#volume-bar");
const pointBar = document.querySelector("#ptbar");
const streakBar = document.querySelector("#streakbar");
const wrongBar = document.querySelector("#wrongbar");
const pointSpan = document.querySelector("#points");
const streakSpan = document.querySelector("#streak");
const wrongSpan = document.querySelector("#wrong");

const endPage = document.querySelector("#restart-page");
const restartBtn = document.querySelector("#restart-btn");
const hiScoreSpan = document.querySelector("#hi")

var hiScore = localStorage.getItem("hiScore");
var currentHi = 0;

var soundEffects = true;

// populate choices container
for (let i in tracks){
    var btn = document.createElement("button");
    btn.innerHTML = i;
    choicesCtr.appendChild(btn);
}

var points = 0;
pointSpan.innerHTML = points;

var streak = 0;
streakSpan.innerHTML = streak;

var wrong = 0;
wrongSpan.innerHTML = wrong;


var attempts = 0;

var start = 0;

var trackKeys = Object.keys(tracks);

// load music
var index = trackKeys.length * Math.random() << 0
var composer = trackKeys[index];
var track = tracks[composer];
sample.src = 'MQuiz/' + track[0];
console.log(track)

var pauseSample;

sample.addEventListener('loadeddata', () => {
    sample.currentTime = start = Math.round(Math.random() * sample.duration - 10);
    console.log(sample.currentTime)
});

playBtn.addEventListener('click', () => {
    if (sample.currentTime == start)
    {
        sample.play();
        pauseSample = setTimeout(() => {
            sample.pause();
            sample.currentTime = start;
        }, 10000)
    }
})

choicesCtr.querySelectorAll("button").forEach(btn => {
    btn.addEventListener('click', () => {
        // correct choice
        if (btn.innerHTML.toLowerCase() == composer.toLowerCase())
        {
            // stop audio
            if (pauseSample != null)
            {
                clearTimeout(pauseSample)
            }
            sample.pause();

            // update points
            points ++;
            pointSpan.innerHTML = points;
            if (soundEffects)
            {
                var audio = new Audio('MQuiz/sounds/right.wav');
                audio.play(); 
            }
            pointBar.style.animationPlayState = "running";
            pointFlash = setTimeout(() => {
                pointBar.style.animationPlayState = "paused";
            }, 1000)
            
            // update streak
            if (attempts == 0)
            {
                streak ++;
                if (streak > currentHi) 
                {
                    currentHi ++;
                }
                streakSpan.innerHTML = streak;
                streakBar.style.animationPlayState = "running";
                streakFlash = setTimeout(() => {
                    streakBar.style.animationPlayState = "paused";
                }, 1000)
                if (streak % 3 == 0 && streak > 0)
                {
                    points ++;
                }
            }

            // reset attempts
            attempts = 0

            // reload music
            composer = trackKeys[trackKeys.length * Math.random() << 0];
            track = tracks[composer];
            console.log(track);
            sample.src = 'MQuiz/' + track[0];
        }
        // wrong choice
        else {
            attempts ++;
            streak = 0;
            streakSpan.innerHTML = streak;
            if (attempts == 1)
            {
                wrong ++;
                wrongSpan.innerHTML = wrong;
                if (soundEffects)
                {
                    var audio = new Audio('MQuiz/sounds/wrong.wav');
                    audio.play();
                }
                wrongBar.style.animationPlayState = "running";
                wrongFlash = setTimeout(() => {
                    wrongBar.style.animationPlayState = "paused";
                }, 1000)
                if (wrong >= 3)
                {
                    // stop audio
                    clearTimeout(pauseSample)
                    sample.pause();

                    // update hi score
                    if (currentHi > parseInt(hiScore) || !hiScore)
                    {
                        localStorage.setItem("hiScore", currentHi.toString())
                        hiScore = localStorage.getItem("hiScore");
                    }
                    // display end page
                    endPage.style.display = "flex";
                    hiScoreSpan.innerHTML = hiScore;                    
                    if (soundEffects)
                    {
                        var audio = new Audio('MQuiz/sounds/end.wav');
                        audio.play();
                    }
                }
            }
            else if (attempts == 3)
            {
                //TODO: Reveal answer
            }
        }
    })
})

restartBtn.addEventListener("click", () => {
    // reset pts
    points = 0;
    wrong = 0;
    streak = 0;
    attempts = 0;

    pointSpan.innerHTML = points;
    wrongSpan.innerHTML = wrong;
    streakSpan.innerHTML = streak;

    // load music
    var composer = trackKeys[trackKeys.length * Math.random() << 0];
    var track = tracks[composer];
    sample.src = 'MQuiz/' + track[0];
    console.log(track)
    endPage.style.display = "";
})