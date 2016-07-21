import './styles/main.scss';

import Game from './components/game';

const game = new Game(document.getElementById('game'));

game.start();
