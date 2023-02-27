import './assets/styles/style.scss';
import {selectBird, fillAnswers, correctAnswer, level} from './assets/js/game';
import birdsList from './assets/js/birds'
import {player, questionAudio, questionSettings} from './assets/js/player';


fillAnswers(level)

player(questionAudio, correctAnswer.audio, questionSettings)
