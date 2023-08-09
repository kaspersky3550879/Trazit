import { html, css, nothing, LitElement } from 'lit';
// import('../grid_with_buttons/grid-with-buttons');
// import './tabs-composition';
// import {DialogsFunctions} from '../GenericDialogs/DialogsFunctions';

//import { navigator } from 'lit-element-router';
export class CultureMedium extends (LitElement) {
  static get styles() {
    return css`
    :host {
      display: block;
    }
    .container {
      display: inline-flex;
      flex-direction: column;
      overflow: hidden;
    }
    .left {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      background-color: rgba(36, 192, 235, 1);
      width: 280px;
      flex-grow: 1;
      min-width: 100%;      
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: rgba(36, 192, 235, 1);
      flex-grow: 1;
      min-width: 100%;
    }
    .card {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 80px;
      background-color: white;
      border: 1px solid #ccc;
      font-family: Montserrat;
      margin: 10px;
      font-size: 24px;
      font-weight: bold;
      user-select: none;
      cursor: move;
    }
    .box-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
    .box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      background-color: white;
      color: rgba(36, 192, 235, 1);
      border: 1px solid #ccc;
      margin: 5px;
      font-size: 16px;
      font-weight: bold;
      user-select: none;
      cursor: pointer;
      font-family: Montserrat;
      padding: 30px;
    }
    .notSelected {
      padding: 20px;
      font-size:30px;
      color: white;
      background-color: rgb(3, 169, 244);
    }        
    .selected {
      padding: 20px;
      font-size:30px;
      background-color: white;
      color: rgb(3, 169, 244);
    }    
    `

  }

    static get properties() {
        return {
          cardNumbers: { type: Array },
          selectedBoxType: { type: String },
          boxes: { type: Array },          
        }
    }
    constructor() {
        super()
        this.cardNumbers = Array.from({ length: 20 }, (_, i) => i + 1)
        this.selectedBoxType = '5x5'
        this.boxes = Array.from({ length: 25 }, () => [])

        this.rows = 5;
        this.cols = 5;
        this.selectedSize = '5x5';        
        this.boxes = Array.from({ length: this.rows*this.cols }, () => [])
    }
    renderContainers() {
      console.log('renderContainers')
      
      let contId=0
      for (let i = 0; i < this.rows; i++) {
        const row = [];
        for (let j = 0; j < this.cols; j++) {
          row.push(html`<div class="box-container"></div>`);
        }
        // if (this.boxes[contId]===undefined){
        //   this.boxes[contId]=html`<div id=${contId} class="box" @dragover="${this.handleDragOver}" @drop="${this.handleDrop}" @click="${this.handleBoxClick}"></div> `;
        // }else{
          this.boxes[contId]=html`<div id=${contId} class="box" @dragover="${this.handleDragOver}" @drop="${this.handleDrop}" @click="${this.handleBoxClick}">${this.boxes[contId].join(', ')}</div> `;
//        }
        contId=contId+1
      }
      return this.boxes //containers;
    }

    updateSize(event) {
      const value = event.target.value;
      switch (value) {
        case '5x5':
          this.rows = 5;
          this.cols = 5;
          break;
        case '8x12':
          this.rows = 8;
          this.cols = 12;
          break;
        case '10x2':
          this.rows = 10;
          this.cols = 2;
          break;
      }
      this.selectedSize = value;
      this.boxes = Array.from({ length: this.rows*this.cols }, () => [])

      //this.renderContainers()
      this.render()

    }
    render2(){
      return html`
      <div class="container">
      <div class="left">
        ${this.cardNumbers.map((number) => html`
          <div class="card" draggable="true" @dragstart="${(e) => this.handleDragStart(e, number)}">${number}</div>
        `)}
      </div>
      <div class="right">      
        <div>
          <label for="size">Select container size:</label>
          <select id="size" @change=${this.updateSize}>
            <option value="5x5">5x5</option>
            <option value="8x12">8x12</option>
            <option value="10x2">10x2</option>
          </select>
        </div>
        <div>
          ${this.renderContainers()}
        </div>
      </div>
      </div>      
      `;      
    }

        render() {          
      return html`  
      
      <div class="container">
      <div class="left">
        ${this.cardNumbers.map((number) => html`
          <div class="card" draggable="true" @dragstart="${(e) => this.handleDragStart(e, number)}">${number}</div>
        `)}
      </div>
      <div class="right">
        <div style="display:flex;">
          <div class="box" @click="${() => this.handleBoxTypeSelect('5x5')}" .classList="${this.selectedBoxType === '5x5' ? 'selected' : 'notSelected'}">5x5</div>
          <div class="box" @click="${() => this.handleBoxTypeSelect('9x9')}" .classList="${this.selectedBoxType === '9x9' ? 'selected' : 'notSelected'}">9x9</div>
          <div class="box" @click="${() => this.handleBoxTypeSelect('9x12')}" .classList="${this.selectedBoxType === '9x12' ? 'selected' : 'notSelected'}">9x12</div>
          </div>
          ${this.renderBoxes()}
        </div>
      </div>
                    
      `
    }

    renderBoxes(){
      // let row=[]
      // row.push(html`<div class="box-container">`)
      // let contId=0
      // for (let i = 0; i < this.rows; i++) {        
      //   for (let j = 0; j < this.cols; j++) {
      //     row.push(html` 
      //       <div id=${contId} class="box" @dragover="${this.handleDragOver}" @drop="${this.handleDrop}" @click="${this.handleBoxClick}">${this.boxes[contId].join(', ')}</div> 
      //     `)
      //   }
      //   row.push(html`<div class="box-container"></div>`);
      // }
      // row.push(html`</div>`)
      // return row
      return html`
      <div class="box-container">
        ${this.boxes.map((box, index) => html `      
        <div id=${index} class="box" @dragover="${this.handleDragOver}" @drop="${this.handleDrop}" @click="${this.handleBoxClick}">${box.join(', ')}</div> 
      </div>
      
      `)}
    
          `
    }    
    handleDragStart(e, number) {
      e.dataTransfer.setData('text/plain', number);
    }
  
    handleDragOver(e) {
      e.preventDefault();
    }
  
    handleDrop(e) {
      e.preventDefault();
      const number = e.dataTransfer.getData('text/plain');
      const index = e.target.id
      this.boxes[index].push(number);
      this.requestUpdate();
      //alert(`Card ${number} added to box ${index}.`)
     // e.target.style.visibility=hidden
    }
    handleDrop1(e) {
      e.preventDefault();
      const number = e.dataTransfer.getData('text/plain');
      const index = e.target.id
      this.boxes[index].push(number);
      this.requestUpdate();
      alert(`Card ${number} added to box ${index}.`)
     // e.target.style.visibility=hidden
    }    
  
    handleBoxClick(e) {
      const index = e.target.id
      if (this.boxes[index].length > 0) {
        alert(`Box ${index} contains cards: ${this.boxes[index].join(', ')}.`)
      }
    }
  
    handleBoxTypeSelect(type) {
      if (type !== this.selectedBoxType) {
        this.selectedBoxType = type;
        const numCols = parseInt(type.split('x')[1], 10);
        const numRows = parseInt(type.split('x')[0], 10);
        let totalBoxes=numCols*numRows
        this.boxes = Array.from({ length: totalBoxes }, () => [])
        this.boxes = Array.from({ length: totalBoxes }, (_, i) => this.boxes[i].slice(0, totalBoxes));
        this.requestUpdate();
      }
    }   
}
window.customElements.define('culture-medium', CultureMedium);