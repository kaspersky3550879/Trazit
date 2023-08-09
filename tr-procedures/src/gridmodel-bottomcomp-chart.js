import { html, css, nothing } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import { columnBodyRenderer } from 'lit-vaadin-helpers';
import { ClientMethod } from './ClientMethod';
//import { DialogTemplate } from './DialogTemplate';
import '@google-web-components/google-chart';
let chartWithNoData = {
   label_en: 'No data for charting', label_es: 'No hay datos para una gráfica' }

export class GridmodelBottomcompChart extends ((CredDialog)) {
  static get styles() {
    return [
      Layouts,
      super.styles,
      css`
        mwc-button {
          --mdc-typography-button-text-transform: none;
          margin: 0 2px;
        }
        tr-dialog * {
          margin-bottom: 5px;
        }
        mwc-textfield[hidden] {
          display: none;
        }
        mwc-button[hidden] {
          display: none;
        }
        div.input * {
          margin: 10px 0 5px;
        }
        mwc-icon-button[hidden] {
          display: none;
        }
        #resultDialog {
          --mdc-dialog-min-width: 800px;
        }
        #batchDetail {
          width: 200px;
          margin: 0 20px;
          padding-top: 20px;
        }
        #batchDetail h1 {
          color: blue;
        }
        #samplesArr {
          border-radius: 2px;
          box-shadow: rgb(136, 136, 136) 2px 2px;
          padding: 5px;
          background: #c2f2ff;
        }
        #samplesArr div {
          margin: 5px 0;
        }
        #assignDialog {
          --mdc-dialog-min-width: 500px;
        }
        @media (max-width: 460px) {
          vaadin-grid {
            font-size: 10px;
          }
          vaadin-grid-cell-content {
            padding: 5px;
          }
        }
      `
    ];
  }
  static get properties() {
    return {
      selectedItems: { type: Array },
      chartLineAllData: {type: Array}
    };
  }
  constructor() {
    super()
    this.chartLineAllData = []
  }
  updated(updates) {
    super.updated(updates)
    if (updates.has('model')) {
      this.filterName = this.model.filter
      this.resetView()
      this.authorized()
    }
  }
  resetView() {
    this.selectedItems = []
    this.assignList = []
    this.langConfig = this.model.langConfig
    if (this.mode&&this.model.actions){
      this.actions = this.model.actions
      this.selectedAction = this.model.actions[0]
    }
  }
  render() {
    return html`${this.model ? 
      html`      
      <div class="layout horizontal flex wrap">
        <div class="layout flex">
        <h3>${this.model.chartTitle["label_"+ this.lang]}</h3>
        ${!this.lineData()||this.lineData().length<=1 ? html`
          ${chartWithNoData["label_"+ this.lang]}
          `:html`      
            <google-chart type='${this.model.data.chartType}' .data='${this.lineData()}'></google-chart>
          `}
        </div>
        ${super.render()}
      </div>
      ` : 
      nothing
    }
    `;
  }
  lineData() {
    var allData=[[]]
    //console.log('lineData', 'selectedItems', this.selectedItems)
    allData[0][0]=this.model.data.chartValuesHeader[this.lang][0]
    allData[0][1]=this.model.data.chartValuesHeader[this.lang][1]
    if (this.selectedItems===undefined||this.selectedItems.length==0){
      return allData
    }
    if (this.selectedItems[0][this.model.data.objectArrayValuesName]===undefined||this.selectedItems[0][this.model.data.objectArrayValuesName]==="No readings"||this.selectedItems[0][this.model.data.objectArrayValuesName].length==0){
      return allData  
    }
    var valuesArr=this.selectedItems[0][this.model.data.objectArrayValuesName]
    if (valuesArr==="No readings"||valuesArr.length==0){
      return allData  
    }
    for (var i = 0; i < this.selectedItems[0][this.model.data.objectArrayValuesName].length; i++) {
      var curReading=[]
      curReading[0]=this.selectedItems[0][this.model.data.objectArrayValuesName][i][this.model.data.valuesFirstPropertyName]
      curReading[1]=this.selectedItems[0][this.model.data.objectArrayValuesName][i][this.model.data.valuesSecondPropertyName]
      allData.push(curReading)
  }    
    this.chartLineAllData=allData
    return allData
  }
}
window.customElements.define('gridmodel-bottomcomp-chart', GridmodelBottomcompChart);