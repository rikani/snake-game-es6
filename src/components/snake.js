'use strict';

const DIR = {
  top: 'TOP',
  left: 'LEFT',
  right: 'RIGHT',
  bottom: 'BOTTOM'
};

const ARROW = {
  left: 37,
  up: 38,
  right: 39,
  down: 40
};

export default class Snake {

  constructor(props) {
    this.size = props.size;

    this.pointSize = props.pointSize;

    this.root = props.root;

    this.snake = [{x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:3, y:0}, {x:4, y:0}];

    this.head = this.snake[this.snake.length-1];

    this.direction = DIR.bottom;

    this.attachEvents();
  }

  attachEvents() {
    window.document.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  paintSnake() {
    const body = document.createElement('div');
    body.classList.add('snake');

    for (let i = 0, len = this.snake.length; i < len; i++) {
      const snakeScale = document.createElement('div');
      snakeScale.classList.add('snake-scale');

      snakeScale.style.width = `${this.pointSize}px`;
      snakeScale.style.height = `${this.pointSize}px`;

      snakeScale.style.left = `${this.pointSize*this.snake[i].x}px`;
      snakeScale.style.top = `${this.pointSize*this.snake[i].y}px`;
      
      body.appendChild(snakeScale);
    }

    return body;
  }

  handleKeyPress(evt) {
    switch (evt.keyCode) {
      case ARROW.up:
        if (this.direction != DIR.bottom) {
          this.direction = DIR.top;
        }
        break;
      case ARROW.right:
        if (this.direction != DIR.left) {
          this.direction = DIR.right;
        }
        break;
      case ARROW.down:
        if (this.direction != DIR.top) {
          this.direction = DIR.bottom;
        }
        break;
      case ARROW.left:
        if (this.direction != DIR.right) {
          this.direction = DIR.left;
        }
        break;
    }
  }

  moveSnake(props) {
    const foodPosition = props.foodPosition;
    let snakeHead = {};

    if (this.direction === DIR.right) {
      snakeHead.x = this.head.x+1;
      snakeHead.y = this.head.y;
    }
    if (this.direction === DIR.left) {
      snakeHead.x = this.head.x-1;
      snakeHead.y = this.head.y;
    }
    if (this.direction === DIR.top) {
      snakeHead.x = this.head.x;
      snakeHead.y = this.head.y-1;
    }
    if (this.direction === DIR.bottom) {
      snakeHead.x = this.head.x;
      snakeHead.y = this.head.y+1;
    }

    if (!this.canMoveHere(snakeHead)) return false;

    this.head = snakeHead;

    this.snake.push(snakeHead);

    if (!this.isFoodHere(snakeHead, foodPosition)) {
      this.foodEaten = false;
      this.snake.shift();
    } else {
      this.foodEaten = true;
    }
    
    return true;
  }

  canMoveHere(newPosition) {
    if (newPosition.x < 0 ||
        newPosition.y < 0 ||
        newPosition.x >= this.size[0] ||
        newPosition.y >= this.size[1]) {
      return false;
    }

    for (let i = 0, len = this.snake.length; i < len; i++) {
      if (this.snake[i].x === newPosition.x && this.snake[i].y === newPosition.y) {
        return false;
      }
    }

    return true;
  }

  isFoodHere(newPosition, foodPosition) {
    return !!(foodPosition.x === newPosition.x && foodPosition.y === newPosition.y);
  }
  
  isSnakeEatFood() {
    return this.foodEaten;
  }

  render() {
    return this.paintSnake();
  }
}