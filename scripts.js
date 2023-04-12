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
const volumeBar = document.querySelector("#volume-bar")
const pointSpan = document.querySelector("#points")

// populate choices container
for (let i in tracks){
    var btn = document.createElement("button");
    btn.innerHTML = i;
    choicesCtr.appendChild(btn);
}

var points = 0;
pointSpan.innerHTML = points;

var start = 0;
var max = 0;

var trackKeys = Object.keys(tracks);

// load music
var composer = trackKeys[trackKeys.length * Math.random() << 0];
var track = tracks[composer];
sample.src = 'MQuiz/' + track[0];
console.log(track)

sample.addEventListener('loadeddata', () => {
    sample.currentTime = start = Math.round(Math.random() * sample.duration - 10);
    console.log(sample.currentTime)
});

playBtn.addEventListener('click', () => {
    sample.play();
    setTimeout(() => {
        sample.pause();
        sample.currentTime = start;
    }, 10000)
})

choicesCtr.querySelectorAll("button").forEach(btn => {
    btn.addEventListener('click', () => {
        // correct choice
        if (btn.innerHTML.toLowerCase() == composer.toLowerCase())
        {
            // stop audio
            sample.pause();

            // update points
            points += 1;
            pointSpan.innerHTML = points;

            // reload music
            composer = trackKeys[trackKeys.length * Math.random() << 0];
            track = tracks[composer];
            console.log(track);
            sample.src = 'MQuiz/' + track[0];
        }
    })
})