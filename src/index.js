import './assets/styles/style.scss';
import {selectBird, fillAnswers, correctAnswer} from './assets/js/game';
import {player, questionAudio, questionSettings} from './assets/js/player';

// for (let i = 0; i < birdsList.length; i++) {
//   console.log(selectBird(birdsList, i))
// }
fillAnswers()

player(questionAudio, correctAnswer.audio, questionSettings)
