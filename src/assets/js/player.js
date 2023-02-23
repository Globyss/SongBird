import { correctAnswer } from "./game";
let isPlay = false;

const questionAudio = new Audio();
const answerAudio = new Audio();


const questionSettings = {
  playBtn: document.querySelector('.player__button'),
  songDurationNode: document.body.querySelector('.song-duration'),
  currentTime: document.body.querySelector('.current-time'),
  playerPoint: document.body.querySelector('.point'),
  playerPastTime: document.body.querySelector('.past-time'),
  loadingMessage: document.body.querySelector('.current-question__body .loading-message'),
  playerNode: document.body.querySelector('.player'),

}

const selectedQuestionSettings = {
  playBtn: document.querySelector('.answer-player-button'),
  songDurationNode: document.body.querySelector('.your-answer__song-duration'),
  currentTime: document.body.querySelector('.your-answer__current-time'),
  playerPoint: document.body.querySelector('.your-answer__point'),
  playerPastTime: document.body.querySelector('.your-answer__past-time'),
  loadingMessage: document.body.querySelector('.your-answer__body .loading-message'),
  playerNode: document.body.querySelector('.your-answer__body .player'),
}

function player(audio, src, settings) {
  audio.src = src;
  audio.addEventListener("loadedmetadata", () => settings.songDurationNode.textContent = setDuration(audio.duration));
  audio.addEventListener('loadeddata', () => {
    settings.playerNode.style.visibility = 'visible';
    settings.loadingMessage.style.display = 'none'
  })
}

function timeProgress(currentTime, fullTime, settings) {
  let percent = currentTime / fullTime * 100;
  settings.playerPoint.style.left = `${percent}%`;
  settings.playerPastTime.style.width = `${percent}%`;
}

function playAudio(audio, settings) {
  if (!isPlay) {
    audio.play();
    isPlay = true;
    setInterval(() => {
      settings.currentTime.textContent = setDuration(audio.currentTime);
      timeProgress(audio.currentTime, audio.duration, settings);
    }, 500)
  } else {
    audio.pause();
    isPlay = false;
  }
  toggleBtn(settings)
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

function toggleBtn(settings) {
  let btn = settings.playBtn.children[0]
  if (isPlay) btn.className = 'pause';
  if (!isPlay) btn.className = 'play';
}



questionSettings.playBtn.addEventListener('click', () => playAudio(questionAudio, questionSettings));
selectedQuestionSettings.playBtn.addEventListener('click', () => playAudio(answerAudio, selectedQuestionSettings));
export { player, questionAudio, answerAudio, questionSettings, selectedQuestionSettings }
