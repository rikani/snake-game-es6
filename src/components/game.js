'use strict';

import Field from './field';
import Snake from './snake';
import Food from './food';

const defaults = {
  speed: 260
};

export default class Game {

  constructor(root) {
    this.root = root;

    this.speed = defaults.speed;
    
    this.size = [20, 30];

    this.pointSize = 20;

    this.field = new Field({root: this.root, size: this.size, pointSize: this.pointSize}).render();
    
    this.food = new Food({field: this.field, size: this.size, pointSize: this.pointSize});

    this.playButton = document.createElement('button');

    this.gameStarted = false;

    this.scoreCount = 0;

    this.levelCount = 1;
  }

  initBoard() {
    this.score = document.getElementById('score');

    this.level = document.getElementById('level');

    this.score.innerHTML = this.scoreCount;
    this.level.innerHTML = this.levelCount;
  }

  initControls() {
    const controls = document.createElement('div');
    controls.classList.add('controls');

    this.playButton.innerHTML = 'New game';
    this.playButton.classList.add('play-button');

    this.playButton.addEventListener('click', this.handlePlayButtonClick.bind(this));

    controls.appendChild(this.playButton);

    this.root.appendChild(controls);
  }

  handlePlayButtonClick() {
    if (this.gameStarted) return;

    this.gameStarted = true;

    if (this.snake) {
      this.field.innerHTML = '';
      delete this.snake;
      this.updateScore(0);
    }

    this.food.initFood();
    
    this.snake = new Snake({root: this.root, size: this.size, pointSize: this.pointSize});

    let snake = this.snake.render();

    this.field.appendChild(snake);

    this.updateSnake(snake);
  }

  updateSnake(snake) {

    setTimeout(() => {
      const movement = this.snake.moveSnake({foodPosition: this.food.getPosition()});

      if (!movement) {
        this.stopGame();
        return false;
      }

      if (this.snake.isSnakeEatFood()) {
        this.food.growFood();

        this.updateScore(this.scoreCount+1);
      }

      this.field.removeChild(snake);

      snake = this.snake.render();

      this.field.appendChild(snake);

      this.updateSnake(snake);
    }, this.speed);
  }

  updateScore(score) {
    const newLevel = Math.ceil(score/10);
    this.scoreCount = score;

    this.score.innerHTML = score;

    if (score === 0) {
      this.levelCount = 1;
      this.speed = defaults.speed;
    } else  if (newLevel != this.levelCount) {
      this.levelCount = newLevel;
      this.speed -= 30;
    }

    this.level.innerHTML = newLevel;
  }

  stopGame() {
    this.gameStarted = false;

    alert('Game over!');
  }

  start() {
    this.initBoard();

    this.root.appendChild(this.field);

    this.initControls();

    console.log('[Game] Game is inited!');
  }
}