const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

//Music
const songs = [
    {
        name: "jacinto-1",
        displayName: "Electric Chill Machine",
        artist: "Jacinto Design",
    },
    {
        name: "jacinto-2",
        displayName: "Seven Nation Army (Remix)",
        artist: "Jacinto Design",
    },
    {
        name: "jacinto-3",
        displayName: "Goodnight, Disco Queen",
        artist: "Jacinto Design",
    },
    {
        name: "metric-1",
        displayName: "Front Row (Remix)",
        artist: "Metric/Jacinto Design",
    },
];

// Check if Playing
let isPlaying = false;

function playSong() {
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//Select first Song
//loadSong(songs[0]);
//Current song
let songIndex = 0;
//loadSong(songs[songIndex])

// Next Prev song play
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//update Progress bar & Time
function updateprogressBar(e) {
    if (isPlaying) {
        //console.log(e)
        const { duration, currentTime } = e.srcElement;
        //console.log(duration, currentTime);
        //Update progress bar width
        const progressPrecent = (currentTime / duration) * 100;
        //console.log(progressPrecent);
        progress.style.width = `${progressPrecent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        //console.log("minutes:", durationMinutes);
        let durationSeconds = Math.floor(duration % 60);
        //console.log(durationSeconds); // it get the second but without 0 so:
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
            //  console.log(durationSeconds);
        }
        //delay switching duration Element to avoid NAN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }

        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    // console.log(e); it give the how big the Progress Bar (clientWidth)
    const width = this.clientWidth;
    //console.log("width: ", width);
    // where click in the Progress Bar (offsetX)
    const clickX = e.offsetX;
    //console.log("clickX: ", clickX);
    const { duration } = music;
    // console.log(clickX / width);
    // console.log((clickX / width) * duration);
    music.currentTime = (clickX / width) * duration;
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateprogressBar);
progressContainer.addEventListener("click", setProgressBar);

// TODO volume
