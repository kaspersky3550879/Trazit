import { html, css, LitElement, nothing } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import { columnBodyRenderer, gridRowDetailsRenderer, contextMenuRenderer } from 'lit-vaadin-helpers';
import { Layouts, Alignment } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';

import '@trazit/cred-dialog'
//import '../../module_env_monit/gridmodel-bottomcomp-sampleincubation';
import '../../gridmodel-bottomcomp-chart';

import '../templates-';
import '@trazit/tr-dialog/tr-dialog';
import { AuditFunctions} from '../Audit/AuditFunctions';
import {ButtonsFunctions} from '../Buttons/ButtonsFunctions';
import {GridFunctions} from './GridFunctions';
import {ModuleEnvMonitClientMethods} from '../../module_env_monit/ModuleEnvMonitClientMethods';
import { ProceduresModel } from '../../ProceduresModel';
import {TrazitGenericDialogs} from '../GenericDialogs/TrazitGenericDialogs';
import {TrazitReactivateObjectsDialog} from '../GenericDialogs/TrazitReactivateObjectsDialog';
import {TrazitEnterResultWithSpec} from '../GenericDialogs/TrazitEnterResultWithSpec';
import {ModuleEnvMonitDialogsMicroorganism} from '../../module_env_monit/Dialogs/ModuleEnvMonitDialogsMicroorganism';
import {TrazitInvestigationsDialog} from '../GenericDialogs/TrazitInvestigationsDialog';
import { ModuleInstrumentsDialogs} from '../../module_instruments/ModuleInstrumentsDialogs'

import {TrazitCredentialsDialogs} from '../GenericDialogs/TrazitCredentialsDialogs';


import '../Audit/audit-dialog';
//import '../../tabs-composition';
export class GridWithButtons extends (TrazitCredentialsDialogs(AuditFunctions(ModuleInstrumentsDialogs(TrazitInvestigationsDialog(ModuleEnvMonitDialogsMicroorganism(TrazitEnterResultWithSpec(TrazitReactivateObjectsDialog(TrazitGenericDialogs(ModuleEnvMonitClientMethods(GridFunctions(ButtonsFunctions(LitElement)))))))))))) {
    static get styles() {
      return [
        Layouts, Alignment,
        //super.styles,
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
          h1 {        
            color : rgba(36, 192, 235, 1);
            font-family : Montserrat;
            font-weight : bold;
            font-size:calc(12px + 1.5vw);
            text-align: center;
          }        
          vaadin-grid-cell-content{
            color : rgb(94, 145, 186);
          }
          #vaadin-text-field-input{
          background-color: #d0f1fa;
          }
        `
      ];
    }
  
    static get properties() {
      return {
        model: { type: Object },
        config: { type: Object },
        procInstanceName: { type: String },
        viewModelFromProcModel: {type: Object},
        ready:{type: Boolean},
        viewName: { type: String },
        filterName: { type: String },
        lang: { type: String },
        // langConfig: { type: Object },
        // actions: { type: Array },
        // samplesReload: { type: Boolean },
        selectedItems: { type: Array },
        // selectedAction: { type: Object },
        // prev: { type: Boolean },
        // next: { type: Boolean },
        // programsList: { type: Array },
        // tabView: { type: String },
        // windowOpenable: { type: String },
        // sopsPassed: { type: Boolean },
        actionBeingPerformedModel:{type:Object},
        localProceduresModels: { type: Object},
        masterData:{type: Object}
      };
    }
  
    constructor() {
      super()
      this.ready=false;
      this.selectedItems=[]
      this.config={}
      this.viewModelFromProcModel={}   
      this.actionBeingPerformedModel={}
      this.localProceduresModels=ProceduresModel
      this.masterData={}
    }
    resetView(){
      this.selectedItems=[]
      this.ready=false;
    }
    // firstUpdated() {
    //   super.firstUpdated()
    //   alert('firstUpdated')
    // }
    //  updated(updates) {
    //   //alert('updated')
      
    //    if (updates.has('selectedItems')) {
    //    // this.GetViewData()  
    // //     this.resetView()
    //    }
    //  }
  // ${this.topCompositionBlock()} 
  // ${this.abstractBlock()}                        
  // ${this.resetView()}
  //${this.GetViewData()}
  // ${this.tabsBlock()}  
  render() {
      return html`
        <div>      
          ${this.topCompositionBlock()} 
          ${this.abstractBlock()}
          ${this.bottomCompositionBlock()}  
          <div style="display:none">
            ${this.ready===false&&this.viewModelFromProcModel.tabs===undefined ? html`${this.GetViewData()}`: nothing}            
          </div>
         
        </div>
      `
    }
    loadDialogs(){
      //console.log('loadDialogs')
      return html`
      ${this.credentialsDialog()}
      ${this.genericFormDialog()}
      ${this.reactivateObjectsDialog()}
      ${this.moduleEnvMonitMicroorganismsDialogAdd()}
      ${this.moduleEnvMonitMicroorganismsDialogRemove()}
      ${this.pointTemplate()}
      ${this.resultTemplate()}
      ${this.investigationTemplate()}
      ${this.filterName=="open" ?
        html`${this.decisionTemplate()}` : nothing
      }  
      ${this.decisionTemplate()}
    `}
  topCompositionBlock(){
      return html`
      ${this.viewModelFromProcModel.topCompositions ?
        html`${this.viewModelFromProcModel.topCompositions.map(c => 
          html`<templates- id="topComp"
            .windowOpenable=${this.windowOpenable}
            .sopsPassed=${this.sopsPassed}
            .templateName=${c.templateName} .buttons=${c.buttons} .lang=${this.lang}
            .viewName=${this.viewName} .filterName=${this.filterName}
            .viewModelFromProcModel=${this.viewModelFromProcModel}
            .procInstanceName=${this.procInstanceName}
            @program-changedzzzz=${e=>this.gridItems=e.detail}
            @program-changed=${this.programChangedAction}
            @template-event=${this.templateEvent}></templates->           
          `
        )}` :
        nothing
      }
      `
  }

  setReady(){
    this.ready=true
  }
  programChangedAction(e){
    if (e===undefined){return}
    this.ready=true
    this.gridItems=e.detail

  }
  bottomCompositionBlock(){
  return html`
  ${this.viewModelFromProcModel.bottomCompositions ?
      html`${this.viewModelFromProcModel.bottomCompositions.map(c =>                             
      html`
          ${c.elementName=='envmonit-batch-sampleincubation' ? html`                               
          <div class="layout flex">
          <gridmodel-bottomcomp-sampleincubation id=${c.filter} .procInstanceName=${this.procInstanceName} .viewName=${this.viewName}
              .lang=${this.lang}
              .windowOpenable=${this.windowOpenable}
              .sopsPassed=${this.sopsPassed}
              .model=${c} .config=${this.config} .batchName=${this.batchName}
              @reload-samples=${e=>this[e.detail.method]()}
              @selected-incub=${this.filteringBatch}
              @selected-batch=${this.filteringIncub}
              @set-grid=${e=>this.setGrid(e.detail)}></gridmodel-bottomcomp-sampleincubation>
          </div>
          ` : nothing} 
          ${c.elementName=='chart' ? html`      
          <div class="layout flex">
          <gridmodel-bottomcomp-chart id=${c.filter} .procInstanceName=${this.procInstanceName} .viewName=${this.viewName}
          .selectedItems=${this.selectedItems} .lang=${this.lang}
          .model=${c} .config=${this.config}></gridmodel-bottomcomp-chart>
          </div>
      ` : nothing} 
      `
      )}` :
      html``
  }
  `
  }
  activeItemChanged(e){
    
    if (e===undefined){return}
    let d=true
    d=this.disabledByCertification(this.viewModelFromProcModel.langConfig.gridActionOnClick)     
    if (d) {
       //alert('View in read only mode')
      return
    }
    this.selectedItems=e.detail.value ? [e.detail.value] : []
    if (this.selectedItems.length>0&&this.viewModelFromProcModel.langConfig.gridActionOnClick!==undefined){
      //alert(this.viewModelFromProcModel.langConfig.gridActionOnClick.actionName)
      this.GetAlternativeViewData(this.viewModelFromProcModel.langConfig.gridActionOnClick)
    }

  }
  rightMouseMenu(){
    return html `
    </vaadin-context-menu> 
    <vaadin-context-menu> 
      

    `

  }
  abstractBlock(){
    //console.log('abstractBlock')
  return html`
  ${this.loadDialogs()} 
  ${this.abstract ? 
      nothing :
      html`
        ${this.viewModelFromProcModel.topCompositions!==undefined ? nothing: html`${this.getTitle()}`}
      
        <div class="layout horizontal flex wrap">
            <div class="layout flex">          
            <div class="layout horizontal center flex wrap">
            
              ${this.getButton()}
            </div>
            ${this.ready ? 
              html`
    
              <vaadin-grid id="mainGrid" theme="row-dividers" column-reordering-allowed multi-sort 
                @active-item-changed=${this.activeItemChanged}
                .items=${this.gridItems} .selectedItems="${this.selectedItems}"
                ${gridRowDetailsRenderer(this.detailRenderer)}
                ${this.setCellListener()}
                ${contextMenuRenderer(this.rightMouseMenu)}
                >
                ${this.gridList(this.viewModelFromProcModel)}
              </vaadin-grid>
                 
              <div id="rowTooltip">&nbsp;</div>
              ` :
              html``
          }
          </div>   
         
  
          <audit-dialog @sign-audit=${this.setAudit} .actionBeingPerformedModel=${this.actionBeingPerformedModel} 
          .filterName=${this.filterName} .lang=${this.lang} .windowOpenable=${this.windowOpenable}
          .sopsPassed=${this.sopsPassed} .procInstanceName=${this.procInstanceName} .viewName=${this.viewName} 
          .viewModelFromProcModel=${this.viewModelFromProcModel}
          .selectedItems=${this.selectedItems} .config=${this.config}></audit-dialog>


        </div>
      `
  }    
  `
  }

//  ${this.resultTemplate()}
get rowTooltip() {
  return this.shadowRoot.querySelector("#rowTooltip")
}
  get xtabsCompositionc() {return this.shadowRoot.querySelector("tabs-composition")}

  get batchElement() {return this.shadowRoot.querySelector("gridmodel-bottomcomp-sampleincubation#active_batches")}
  get incubElement() {return this.shadowRoot.querySelector("gridmodel-bottomcomp-sampleincubation#samplesWithAnyPendingIncubation")}
  get grid() {return this.shadowRoot.querySelector("vaadin-grid#mainGrid")}
  get chart() {return this.shadowRoot.querySelector("google-chart")}   
  get templates() {return this.shadowRoot.querySelector("templates-#topComp")}
  get audit() {return this.shadowRoot.querySelector("audit-dialog")}    

  templateEvent(e) {
    console.log('templateEvent')
    if (e.detail.calledActionIdx >= 0) {
      this.selectedAction = ProceduresModel[this.procInstanceName][this.viewName].actions[e.detail.calledActionIdx]
      this.reload()
    }
  }

  showLockReason(i) {
    //alert('showLockReason', i)
    let labels = {
      "warning_reason_label_en": "Warning Reason", "warning_reason_label_es": "Razón Aviso",
      "locking_reason_label_en": "Locking Reason", "locking_reason_label_es": "Razón Bloqueo"
    }
    if (this.grid.items[i - 1].is_locked) {
      this.rowTooltip.style.backgroundColor = "#24C0EB"
      this.rowTooltip.style.visibility = "visible"
      let txtValue=labels['locking_reason_label_' + this.lang] + ": "
      if (this.grid.items[i - 1].locking_reason===undefined||this.grid.items[i - 1].locking_reason["message_" + this.lang]===undefined){
        txtValue=txtValue+"undefined"
      }else{
        txtValue=txtValue+this.grid.items[i - 1].locking_reason["message_" + this.lang]
      }
      this.rowTooltip.textContent = txtValue
    } else if (this.grid.items[i - 1].warning_reason) {
      this.rowTooltip.style.backgroundColor = "#D6E9F8"
      this.rowTooltip.style.visibility = "visible"
      let txtValue=labels['warning_reason_label_' + this.lang] + ": "
      if (this.grid.items[i - 1].warning_reason===undefined||this.grid.items[i - 1].warning_reason["message_" + this.lang]===undefined){
        txtValue=txtValue+"undefined"
      }else{
        txtValue=txtValue+this.grid.items[i - 1].warning_reason["message_" + this.lang]
      }
    }
  }

  hideLockReason() {
    this.rowTooltip.style.visibility = "hidden"
  }

  detailRenderer(result) {
    //console.log('detailRenderer', result)
    let labels = {
      "warning_reason_label_en": "Warning Reason", "warning_reason_label_es": "Razón Aviso",
      "locking_reason_label_en": "Locking Reason", "locking_reason_label_es": "Razón Bloqueo"
    }
    return html`
      <div style="text-align:center;font-size:12px">
        <p>${result.spec_eval ?
        html`${result.spec_eval == 'IN' ?
          html`<mwc-icon style="color:green">radio_button_checked</mwc-icon>` :
          html`${result.spec_eval.toUpperCase().includes("OUT") && result.spec_eval.toUpperCase().includes("SPEC") ?
            html`<mwc-icon style="color:red">radio_button_checked</mwc-icon>` :
            html`<mwc-icon style="color:orange">radio_button_checked</mwc-icon>`
            }`
          }` :
        html`<img style="height:24px; width: 24px;" src="https://upload.wikimedia.org/wikipedia/commons/9/96/Button_Icon_White.svg">`
      }</p>
        <p>${this.lang == "en" ? "Method" : "Método"}: ${result.method_name} (${result.method_version})</p>
        <p>Range Rule: ${result.spec_rule_info[0].ruleRepresentation}</p>
        <p>Range Evaluation: ${result.spec_eval} (${result.spec_eval_detail})</p>
      ${result.is_locked ?
        html`<p style="color:rgb(255 8 8)">${labels['locking_reason_label_' + this.lang]}: ${result.locked_reason}</p>` : nothing
      }
        ${result.warning_reason ?
        html`<p style="color:#0085ff">${labels['warning_reason_label_' + this.lang]}: ${result.warning_reason["message_" + this.lang]}</p>` : nothing
      }
      </div>
    `
  }  

  setCellListener() {
    // alert('setCellListener')
    //console.log('setCellListener')
    if (this.grid===undefined||this.grid===null){return}
    this.rowTooltip.style.display = "block"
    this.rowTooltip.style.visibility = "hidden"
    this.rowTooltip.style.fontSize = "12px"
    this.rowTooltip.style.color = "white"
    let rows = this.grid.shadowRoot.querySelectorAll("tr[part=row]")
    rows.forEach((r, i) => {
      if (i > 0 && this.grid.items[i - 1]) {
        r.removeEventListener('mouseenter', () => this.showLockReason(i))
        r.removeEventListener('mouseleave', this.hideLockReason.bind(this))
      }
      if (i > 0 && this.grid.items[i - 1] && (this.grid.items[i - 1].is_locked || this.grid.items[i - 1].warning_reason)) {
        r.addEventListener('mouseenter', () => this.showLockReason(i))
        r.addEventListener('mouseleave', this.hideLockReason.bind(this))
      }
    })    
  }

  }
  window.customElements.define('grid-with-buttons', GridWithButtons);