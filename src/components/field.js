'use strict';

export default class Field {
  constructor(props) {
    this.size = props.size;
    this.pointSize = props.pointSize;
    this.root = props.root;

    this.scene = document.createElement('div');
    
    this.initScene();
  }
  
  initScene() {
    this.scene.classList.add('field');
    
    this.scene.style.width = `${this.size[0]*this.pointSize}px`;
    this.scene.style.height = `${this.size[1]*this.pointSize}px`;
  }

  render() {
    return this.scene;
  }
}