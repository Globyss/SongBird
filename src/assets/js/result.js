import '../styles/style.scss';

const score = localStorage.getItem('score');
const scoreNode = document.body.querySelector('.message span');
scoreNode ? scoreNode.textContent = score : '';
