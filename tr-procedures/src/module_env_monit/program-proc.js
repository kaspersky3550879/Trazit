import { html, css, nothing } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import { Layouts, Alignment } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
import './../components/core-view';
import '@trazit/tr-dialog/tr-dialog';
import '../components/Tabs/tab-element';
import {TabFunctions} from '../components/Tabs/TabFunctions';
import './ProgramProc/summary-view';
import './ProgramProc/parameter-limits';
import './ProgramProc/config-calendar';
import './ProgramProc/sampling-points';
import './ProgramProc/sampling-points-map';
import './ProgramProc/corrective-actions';

import {DialogsFunctions} from '../components/GenericDialogs/DialogsFunctions';
import {ButtonsFunctions} from '../components/Buttons/ButtonsFunctions';
import {GridFunctions} from '../components/grid_with_buttons/GridFunctions';
import { ApiFunctions } from '../components/Api/ApiFunctions';

// { tabLabel_en: "Corrective Actions", tabLabel_es: "Acciones Correctivas", view: "corrective-actions"}

let tabBtns = {
  "tabs": [
    {tabLabel_en: "Summary", tabLabel_es: "Inicio", view: "summary"},
    {tabLabel_en: "Parameter Limits", tabLabel_es: "Límites", view: "parameter-limits"},
    {tabLabel_en: "Config Calendar", tabLabel_es: "Calendario Config", view: "config-calendar"},
    {tabLabel_en: "Sampling Points", tabLabel_es: "Puntos de Muestreo", view: "sampling-points"},
    {tabLabel_en: "Sampling Points Map", tabLabel_es: "Puntos de Muestreo Mapa", view: "sampling-points-map"}
  ]
}

export class ProgramProc extends ApiFunctions(GridFunctions(ButtonsFunctions(DialogsFunctions(TabFunctions(CredDialog))))) {
  static get styles() {
    return [
      Layouts, Alignment,
      super.styles,
      css`
        :host {
          display: block;
        }
        .tabContainer {
          overflow: auto;
        }
        .tabContainer::-webkit-scrollbar {
          display: none;
        }
        .tabContainer > * {
          display: inline-block;
          flex-shrink: 0;
        }
        mwc-button {
          --mdc-typography-button-text-transform: none;
        }
        mwc-icon-button.slide[hidden] {
          visibility: hidden;
        }
        mwc-select[hidden] {
          display: none;
        }
      `
    ];
  }

  static get properties() {
    return {
      model: { type: Object },
      config: { type: Object },
      procInstanceName: { type: String },
      viewName: { type: String },
      filterName: { type: String },
      langConfig: { type: Object },
      actions: { type: Array },
      samplesReload: { type: Boolean },
      selectedItems: { type: Array },
      selectedAction: { type: Object },
      prev: { type: Boolean },
      next: { type: Boolean },
      programsList: { type: Array },
      selectedProgram: { type: Array },
      tabView: { type: String },
      windowOpenable: { type: String },
      sopsPassed: { type: Boolean },

      viewModelFromProcModel: { type: Object },
    };
  }

  constructor() {
    super()
    this.tabView = "summary"
    this.prev = false
    this.next = false
    this.programsList = []
    this.selectedItems = []
    this.viewModelFromProcModel = {}
    this.selectedProgram=[]
    if (this.viewModelFromProcModel.tabs!==undefined){
      tabBtns=this.viewModelFromProcModel.tabs
    }
  }

  updated(updates) {
    if (updates.has('model')) {
      this.resetView()
    }
  }

  resetView() {
    this.programsList = []
    this.GetViewData()
    // this.actions = this.model.actions
    // this.selectedAction = this.model.actions[0]
    // this.actionMethod(this.selectedAction)
  }

  render() {
    console.log('render', this.viewModelFromProcModel)
    return html`
      <div class="layout vertical flex">
        <div class="layout horizontal center-center">
          <mwc-select outlined label="Program Name" @change=${this.programChanged} ?hidden=${this.programsList.length<2}>
            ${this.programsList.map((p,i) => 
              html`<mwc-list-item value="${p.name}" ?selected=${i==0}>${p.name}</mwc-list-item>`
            )}
          </mwc-select>
        </div>
        ${this.showTabElement(this.viewModelFromProcModel, tabBtns)}
      
        <summary-view .lang=${this.lang} .selectedProgram=${this.selectedProgram} ?hidden=${this.tabView!="summary"}></summary-view>
        <parameter-limits .procInstanceName=${this.procInstanceName} .lang=${this.lang}
         .selectedProgram=${this.selectedProgram} ?hidden=${this.tabView!="parameter-limits"}
         .viewModelFromProcModel=${this.viewModelFromProcModel}></parameter-limits>

        <config-calendar .lang=${this.lang} .selectedProgram=${this.selectedProgram} 
          ?hidden=${this.tabView!="config-calendar"}></config-calendar>
        
        <sampling-points .procInstanceName=${this.procInstanceName}           
          .filterName=${this.filterName}  .viewName=${this.viewName}
          .lang=${this.lang} .selectedProgram=${this.selectedProgram} .config=${this.config} 
          ?hidden=${this.tabView!="sampling-points"}>
        </sampling-points>

        <sampling-points-map .procInstanceName=${this.procInstanceName} 
          .lang=${this.lang} .selectedProgram=${this.selectedProgram} .config=${this.config} 
          ?hidden=${this.tabView!="sampling-points-map"}>
        </sampling-points-map>
        
        <core-view .lang=${this.lang} .selectedProgram=${this.selectedProgram} ?hidden=${this.tabView!="core"}></core-view>

        <corrective-actions 
          .windowOpenable=${this.windowOpenable} .sopsPassed=${this.sopsPassed} 
          .procInstanceName=${this.procInstanceName} .lang=${this.lang} 
          .selectedProgram=${this.selectedProgram} .config=${this.config} 
          ?hidden=${this.tabView!="corrective-actions"}>
        </corrective-actions>
        ${super.render()}
      </div>
    `
  }

  programChanged(e) {
    console.log('programChanged')
    let program = this.programsList.filter(p => p.name == e.target.value)
    if (program.length) {
      this.selectedProgram = program[0]
      this.requestUpdate()
    }
  }

  get tabContainer() {
    return this.shadowRoot.querySelector(".tabContainer")
  }

  tabChanged(e) {
    if (e.detail.view) {
      this.tabView = e.detail.view
    } else {
      this.tabView = "core"
    }
  }

  prevTab() {
    this.tabContainer.scrollLeft = this.tabContainer.scrollLeft - 200
  }

  nextTab() {
    this.tabContainer.scrollLeft = this.tabContainer.scrollLeft + 200
  }

  isScroll() {
    if (this.tabContainer.offsetWidth < this.tabContainer.scrollWidth) {
      this.next = true
    } else {
      this.next = false
    }
  }

  firstUpdated() {
    super.firstUpdated()
    this.tabContainer.addEventListener('scroll', () => {
      if (this.tabContainer.scrollLeft == 0) {
        this.prev = false
      } else {
        this.prev = true
      }
      if (this.tabContainer.offsetWidth + this.tabContainer.scrollLeft == this.tabContainer.scrollWidth) {
        this.next = false
      } else {
        this.next = true
      }
    })
  }

  nextRequest() {
    return
    super.nextRequest()
    this.reqParams = {
      procInstanceName: this.procInstanceName,
      ...this.reqParams
    }
    this[this.selectedAction.clientMethod]()
  }

  async getProgramList() {
    let queryDefinition=this.viewModelFromProcModel.viewQuery
    if (queryDefinition===undefined){return}

    this.samplesReload = true
    //let params = this.config.backendUrl + this.config.frontEndEnvMonitUrl
    //  + '?' + new URLSearchParams(this.reqParams)
    this.selectedItems = []      
    let APIParams=this.getAPICommonParams(queryDefinition)
    let viewParams=this.jsonParam(queryDefinition)
    let endPointUrl=this.getQueryAPIUrl(queryDefinition)
    if (String(endPointUrl).toUpperCase().includes("ERROR")){
        alert(endPointUrl)
        return
    }
    let params = this.config.backendUrl + endPointUrl
    + '?' + new URLSearchParams(APIParams) + '&'+ new URLSearchParams(viewParams)    
    await this.fetchApi(params).then(j => {
      if (j && !j.is_error) {
        this.programsList = j.programsList
        // if (this.programsList.length==1){
        //   this.selectedProgram=this.programsList[0]
        // }
        if (queryDefinition.subAction) {
          this.GetAlternativeViewData(queryDefinition.subAction)
        }
        this.requestUpdate()
      }
    })
  }

  getLots() {
    let queryDefinition=this.viewModelFromProcModel.viewQuery.subAction
    if (queryDefinition===undefined){return}

    let APIParams=this.getAPICommonParams(queryDefinition)
    let endPointUrl=this.getQueryAPIUrl(queryDefinition)
    if (String(endPointUrl).toUpperCase().includes("ERROR")){
        alert(endPointUrl)
        return
    }
    let params = this.config.backendUrl + endPointUrl
        + '?' + new URLSearchParams(APIParams)
    this.fetchApi(params).then(j => {
      this.samplesReload = false
    })
  }

}
window.customElements.define('program-proc', ProgramProc);