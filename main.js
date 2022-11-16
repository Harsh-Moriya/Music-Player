const play = document.getElementById('play');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const img = document.querySelector('.image');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progressbar')
const currTimeIndicator = document.getElementById('current_time');
const durationIndicator = document.getElementById('duration');

const songs = [
    {
        name: "music-1",
        title: "Song one",
        artist: "Artist one"
    },
    {
        name: "music-2",
        title: "Song two",
        artist: "Artist two"
    },
    {
        name: "music-3",
        title: "Song three",
        artist: "Artist three"
    },
    {
        name: "music-4",
        title: "Song four",
        artist: "Artist four"
    },
    {
        name: "music-5",
        title: "Song five",
        artist: "Artist five"
    },
]
let isplaying = false;
let currentSong = 0;

// for play
const playMusic = ()=>{
    isplaying = true;
    music.play();
    play.classList.replace('fa-play', 'fa-pause')
    img.classList.add('anime')
}

// for pause
const pauseMusic = ()=>{
    isplaying = false;
    music.pause();
    play.classList.replace('fa-pause', 'fa-play')
    img.classList.remove('anime')
}

play.addEventListener("click", ()=>{
    // if(isplaying) {
    //     pauseMusic();
    // } else {
    //     playMusic();
    // }

    isplaying ? pauseMusic() : playMusic();

})

// Changing the music

const loadSong = (songs)=>{
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = `music/${songs.name}.mp3`;
    img.src = `images/${songs.name}.jpg`;
};

loadSong(songs[currentSong]);

const nextSong = ()=>{
    // if(currentSong === 4) {
    //     currentSong = 0;
    // } else {
    //     currentSong++;
    // }
    currentSong = (currentSong + 1) % songs.length;
    loadSong(songs[currentSong]);
    playMusic();
}

const prevSong = ()=>{
    // if(currentSong === 0) {
    //     currentSong = 4;
    // } else {
    //     currentSong--;
    // }
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(songs[currentSong]);
    playMusic();
}

// progress

music.addEventListener('timeupdate', (e)=>{
    const {currentTime, duration} = e.srcElement;
    // console.log(currentTime, duration);
    let progressTime = (currentTime / duration) * 100;
    // console.log(progress, progressTime);
    progress.style.width = `${progressTime}%`
    // duration
    let min_dur = Math.floor(duration/60);
    let sec_dur = Math.floor(duration%60);
    
    if(duration) {
        durationIndicator.textContent = `${min_dur}:${sec_dur}`
    }

    //current Time
    let min_curr = Math.floor(currentTime/60);
    let sec_curr = Math.floor(currentTime%60);

    if(sec_curr < 10) {
        sec_curr = `0${sec_curr}`;
    }
    
    if(currentTime) {
        currTimeIndicator.textContent = `${min_curr}:${sec_curr}`
    }
})

progressBar.addEventListener('click', (e)=>{
    // let clickPerc = (e.offsetX / e.srcElement.clientWidth) * 100;
    // let clickDur = (clickPerc / 100) * music.duration;
    let clickDur = (e.offsetX / e.srcElement.clientWidth) * music.duration;
    music.currentTime = clickDur;
})

music.addEventListener('ended', nextSong)

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);