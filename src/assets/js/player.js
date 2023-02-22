let isPlay = false;
const audio = new Audio();

const playBtn = document.querySelector('.player__button');
const answerPlayBtn = document.querySelector('.answer-player-button');
const songDurationNode = document.body.querySelector('.song-duration')
const currentTime = document.body.querySelector('.current-time');
const playerPoint = document.body.querySelector('.point');
const playerPastTime = document.body.querySelector('.past-time');

function timeProgress(currentTime, fullTime) {
  let percent = currentTime / fullTime * 100;
  playerPoint.style.left = `${percent}%`;
  playerPastTime.style.width = `${percent}%`;
}

function player(src) {
  audio.src = src;
  audio.addEventListener("loadedmetadata", () => songDurationNode.textContent = setDuration(audio.duration));
}

function playAudio() {
  if (!isPlay) {
    audio.play();
    isPlay = true;
    setInterval(() => {
      currentTime.textContent = setDuration(audio.currentTime);
      timeProgress(audio.currentTime, audio.duration);
    }, 500)
  } else {
    audio.pause();
    isPlay = false;
  }
  toggleBtn()
}

function setDuration(duration) {
  let roundDuration = Math.round(duration)
  let minutes = 0
  let seconds = '00'
  if (roundDuration >= 60) {
    minutes = Math.floor(roundDuration / 60);
    seconds = roundDuration - (minutes * 60);
    if (seconds < 10) {
      seconds = `0${seconds}`
    }
  } else if(roundDuration < 60) {
    seconds = Math.round(duration)
    if (seconds < 10) {
      seconds = `0${seconds}`
    }
  }
  return `${minutes}:${seconds}`;
}

function toggleBtn() {
  let btn = playBtn.children[0]
  if (isPlay) btn.className = 'pause';
  if (!isPlay) btn.className = 'play';
}



playBtn.addEventListener('click', playAudio);
answerPlayBtn.addEventListener('click', playAudio)
export default player
