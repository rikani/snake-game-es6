'use strict';

export default class Food {

  constructor(props) {
    this.size = props.size;
    this.pointSize = props.pointSize;
    this.field = props.field;

    this.food = document.createElement('div');
  }

  initFood() {
    this.food.classList.add('food');

    this.food.style.width = `${this.pointSize}px`;
    this.food.style.height = `${this.pointSize}px`;

    this.growFood();

    this.field.appendChild(this.food);
  }

  growFood() {
    this.position = {
      x: getRandomInt(0, this.size[0]-1),
      y: getRandomInt(0, this.size[1]-1)
    };

    this.food.style.left = `${this.position.x*this.pointSize}px`;
    this.food.style.top = `${this.position.y*this.pointSize}px`;
  }

  getPosition() {
    return this.position;
  }

  render() {
    return this.food;
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}