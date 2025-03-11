// DOM Elements
const audioPlayer = document.getElementById("audio-player");
const songTitle = document.getElementById("song-title");
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const volumeSlider = document.getElementById("volume-slider");
const currentTimeEl = document.getElementById("current-time");
const totalDurationEl = document.getElementById("total-duration");

// Songs Array
const songs = [
  { title: "Woh Din", src: "Songs/WohDin.mp3" }
];

// State
let currentSongIndex = 0;
let isPlaying = false;

// Load a Song
function loadSong(index) {
  const song = songs[index];
  audioPlayer.src = song.src;
  songTitle.textContent = song.title;
  audioPlayer.load();
}

// Play or Pause the Song
function togglePlayPause() {
  if (isPlaying) {
    audioPlayer.pause();
    playPauseBtn.textContent = "▶️";
  } else {
    audioPlayer.play();
    playPauseBtn.textContent = "⏸";
  }
  isPlaying = !isPlaying;
}

// Format time in mm:ss
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Update Progress Bar and Timestamps
function updateProgress() {
  if (audioPlayer.duration) {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;

    // Update Progress Bar
    const percentage = (currentTime / duration) * 100;
    progressBar.value = percentage || 0;

    // Update Current Time and Total Duration
    currentTimeEl.textContent = formatTime(currentTime);
    totalDurationEl.textContent = formatTime(duration);
  }
}

// Seek to a specific time in the song
function seekSong() {
  const seekTime = (progressBar.value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = seekTime;
}

// Adjust Volume
function adjustVolume() {
  audioPlayer.volume = volumeSlider.value / 100;
}

// Event Listeners
playPauseBtn.addEventListener("click", togglePlayPause);
prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  togglePlayPause();
});
nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  togglePlayPause();
});
progressBar.addEventListener("input", seekSong);
volumeSlider.addEventListener("input", adjustVolume);
audioPlayer.addEventListener("loadedmetadata", () => {
  totalDurationEl.textContent = formatTime(audioPlayer.duration);
});
audioPlayer.addEventListener("timeupdate", updateProgress);

// Initialize
loadSong(currentSongIndex);
