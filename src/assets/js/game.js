import birdsList from './birds'
import { answerAudio, player, selectedQuestionSettings } from './player';

const answersList = document.body.querySelector('.answers__list');
const answerPlayBtn = document.querySelector('.answer-player-button');
const birdView = document.querySelector('.bird-view');
const instructions = document.querySelector('.correct-answer__instruction');
const playerNode = document.body.querySelector('.your-answer__body .player');
const loadingMessage = document.body.querySelector('.your-answer__body .loading-message');


const correctAnswer = selectBird(birdsList, 0);
let isLevelWin = false;
let triesCounter = 0;
let score = 0;

function selectBird(birdsList, index) {
  const getRandomInt = Math.floor(Math.random() * 6);
  return birdsList[index][getRandomInt]
}

function selectBirdsList(birdsList, i = 0) {
  return birdsList[i]
}

function fillAnswers() {
  let i = 0
  const answers = document.body.querySelectorAll('.answers__button');
  for (let answer of answers) {
    answer.textContent = selectBirdsList(birdsList)[i].name;
    answer.dataset.birdId = selectBirdsList(birdsList)[i].id;
    i++
  }
}

function winCombination(answer, dataSetID, previousSibling) {
  if (answer.id == dataSetID) {
    const birdImage = document.body.querySelector('.current-question__image img');
    const songName = document.body.querySelector('.song-name');
    birdImage.src = answer.image;
    songName.textContent = answer.name;
    previousSibling.classList.add('result-point_correct');
    isLevelWin = true;
    updateScore()
  } else {
    updateScore(previousSibling);
    previousSibling.classList.add('result-point_wrong');
  }
}

function updateScore(hasAlreadyClick) {
  const scoreNode = document.body.querySelector('.score span');
  if (hasAlreadyClick && hasAlreadyClick.classList.contains('result-point_wrong')) return;
  if (isLevelWin) {
    switch (triesCounter) {
      case 0: {
        score += 5;
        break;
      };
      case 1: {
        score += 4;
        break;
      }
      case 2: {
        score += 3;
        break;
      }
      case 3: {
        score += 2;
        break;
      }
      case 4: {
        score += 1;
        break;
      }
    }
    scoreNode.textContent = score
  }
  triesCounter++
}

answersList.addEventListener('click', (event) => {
  if (event.target.className !== 'answers__button') return false;
  const birdId = event.target.dataset.birdId;
  const birdName = document.body.querySelector('.bird-name');
  const birdSpecies = document.body.querySelector('.species');
  const birdDescription = document.body.querySelector('.bird-description');
  const birdImage = document.body.querySelector('.your-answer__image img');
  for (let item of selectBirdsList(birdsList)) {
    if (item.id === +birdId) {
      birdName.textContent = item.name;
      birdSpecies.textContent = item.species;
      birdDescription.textContent = item.description;
      birdImage.src = item.image;
      player(answerAudio, item.audio, selectedQuestionSettings);
      birdView.classList.remove('bird-view_hidden');
      instructions.style.display = 'none';
      playerNode.style.visibility = 'hidden';
      loadingMessage.style.display = 'block';
    }
  }
  if (isLevelWin) return;
  winCombination(correctAnswer, birdId, event.target.previousElementSibling);
})


export {selectBird, fillAnswers, correctAnswer}
