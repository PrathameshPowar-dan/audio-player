console.log('Js working');

let currentSong = new Audio();

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

const songs = [
  "Bad Beat - Dyalla.mp3",
  "Broken Circuits - Telecasted.mp3",
  "Carousel Dreams - The Soundlings.mp3",
  "Champion - Telecasted.mp3",
  "Funk It - Dyalla.mp3",
  "Gemini - The Soundlings.mp3",
  "Give It To Me Straight - Jeremy Black.mp3",
  "Glitcher - Dyalla.mp3",
  "Going Home - The Soundlings.mp3",
  "GTA Type Beat - Dyalla.mp3",
  "I Need You - Dyalla.mp3",
  "Jetski - Telecasted.mp3",
  "Jingle Bells - The Soundlings.mp3",
  "Kung Fu Love Tree - Quincas Moreira.mp3",
  "Motherland - Ryan Stasik, Kanika Moore.mp3",
  "No Combat - Telecasted.mp3",
  "Oh Please - Telecasted.mp3",
  "Portcullis - The Mini Vandals.mp3",
  "Ricky Tar - Casa Rosa's Tulum Vibes.mp3",
  "Silent Night - The Soundlings.mp3",
  "Taverna Mystica - Chris Haugen.mp3",
  "Tipo Um Samba - Quincas Moreira.mp3",
  "Touch Anno - Domini Beats.mp3",
  "Trilogy - Telecasted.mp3",
  "Youll Find A Way - Telecasted.mp3"
];

async function GetSongs() {
    return songs;
}

const playMusic = (track, pause = false) => {
    currentSong.src = "https://prathameshpowar-dan.github.io/audio-player/Songs/" + track
    if (!pause) {

        currentSong.play()
        play.src = "Images/pause.svg"
    }
    document.querySelector(".footer-song-name").innerHTML = decodeURI(track.replace(".mp3", " ").split("-")[0]);
}

async function Songs() {
    await GetSongs();
    playMusic(songs[0], true)

    let songUL = document.querySelector(".playlist ul");
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `
        <li>
        <div class="your-playlist flex alignCEN">
                        <img src="Images/M.svg" alt="Music" width="32px">
                        <div class="song-details">
                            <div class="playlist-song-name">
                                <p>${song.replaceAll("%20", " ").replace(".mp3", " ").split("-")[0]}</p>
                            </div>
                            <div class="playlist-song-name-true">
                                <h5>${song.replaceAll("%20", " ")}</h5>
                            </div>
                            <div class="playlist-song-artist">
                                <p>${song.replaceAll("%20", " ").replace(".mp3", " ").split("-")[1]}</p>
                            </div>
                        </div>
                        <div class="playing-song flex alignCEN ">
                            <button class="flex alignCEN justifyCEN gap">
                                <span>Play now</span>
                                <img src="Images/play.svg" alt="play" width="24px">
                            </button>
                        </div>
                    </div>
        </li>`
    }

    let TrendingSection = document.querySelector("#trending-cards");
    for (const song of songs) {
        TrendingSection.innerHTML += `
        <div class="card-container" data-song="${song}">
            <div class="card">
                <img src="Images/image.jpg" alt="card">
                <button><img src="Images/play.svg" alt="play"></button>
                <div class="card-song-name">
                    <p><a href="">${song.replaceAll("%20", " ").replace(".mp3", " ").split("-")[0]}</a></p>
                    <div class="card-song-artist">
                        <ul>
                            <li>
                                <p><a href="">${song.replaceAll("%20", " ").replace(".mp3", " ").split("-")[1]}</a></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>`;
    }




    Array.from(document.querySelector(".playlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".playlist-song-name-true").firstElementChild.innerHTML.trim())
        })
    })

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "Images/pause.svg"
        } else {
            currentSong.pause()
            play.src = "Images/play2.svg"
        }
    })

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector("#song-time-running").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}`
        document.querySelector("#song-time-total").innerHTML = `${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".point").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })


    document.querySelector(".bar").addEventListener("click", e => {
        let NewTime = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".point").style.left = NewTime + "%";
        currentSong.currentTime = ((currentSong.duration) * NewTime) / 100
    })

    document.querySelectorAll('#trending-cards .card-container').forEach(container => {
        container.addEventListener('click', () => {
            const song = container.getAttribute('data-song');
            if (song) {
                playMusic(song);
            }
        });
    });


    document.querySelector("#hamburger-list").addEventListener("click", () => {
        document.querySelector(".Library").style.left = "0";
    })

    document.querySelector(".cross-icon").addEventListener("click", () => {
        document.querySelector(".Library").style.left = "-100%";
    })

    document.querySelector(".volume").addEventListener("click", () => {
        document.querySelector(".volume").style.display = "none";
        document.querySelector(".no-volume").style.display = "block";
        currentSong.volume = 0;
        document.querySelector(".volume-bar").getElementsByTagName("input")[0].value = 0;
    })

    document.querySelector(".no-volume").addEventListener("click", () => {
        document.querySelector(".no-volume").style.display = "none";
        document.querySelector(".volume").style.display = "block";
        currentSong.volume = .10;
        document.querySelector(".volume-bar").getElementsByTagName("input")[0].value = 10;
    })

    previous.addEventListener("click", () => {
    currentSong.pause();
    let currentFile = decodeURIComponent(currentSong.src.split("/").pop());
    let index = songs.findIndex(s => s.trim() === currentFile.trim());
    if (index > 0) {
        playMusic(songs[index - 1]);
    }
});

next.addEventListener("click", () => {
    currentSong.pause();
    let currentFile = decodeURIComponent(currentSong.src.split("/").pop());
    let index = songs.findIndex(s => s.trim() === currentFile.trim());
    if (index < songs.length - 1) {
        playMusic(songs[index + 1]);
    }
});


    document.querySelector(".volume-bar").getElementsByTagName("input")[0].addEventListener("change", e => {
        currentSong.volume = parseInt(e.target.value) / 100
        if (currentSong.volume == 0) {
            document.querySelector(".volume").style.display = "none";
            document.querySelector(".no-volume").style.display = "block";
        }
    })

    document.querySelector(".volume-bar").getElementsByTagName("input")[0].addEventListener("change", e => {
        currentSong.volume = parseInt(e.target.value) / 100
        if (currentSong.volume > .10) {
            document.querySelector(".volume").style.display = "block";
            document.querySelector(".no-volume").style.display = "none";
        }
    })
}
Songs()















































































































































































































































































