import { html, css, nothing, LitElement } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import { columnBodyRenderer } from 'lit-vaadin-helpers';

import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@trazit/tr-dialog/tr-dialog';
import {TrazitGenericDialogs} from '../components/GenericDialogs/TrazitGenericDialogs';

import { ButtonsFunctions } from '../components/Buttons/ButtonsFunctions';
import { GridFunctions } from '../components/grid_with_buttons/GridFunctions';
import '../components/Audit/audit-dialog';
import '../components/grid_with_buttons/grid-with-buttons';
import { commonLangConfig } from '@trazit/common-core';

import '../components/Audit/audit-dialog';
import { AuditFunctions} from '../components/Audit/AuditFunctions';

export class SampleIncubationView extends AuditFunctions(TrazitGenericDialogs(ButtonsFunctions(GridFunctions((CredDialog))))) {
  static get styles() {
    return [
      Layouts,
     // super.styles,
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
      viewModelFromProcModel: { type: Object },
      config: { type: Object },
      procInstanceName: { type: String },
      viewName: { type: String },
      filterName: { type: String },
      //langConfig: { type: Object },
      actions: { type: Array },
      samplesReload: { type: Boolean },
      selectedItems: { type: Array },
      selectedBatches:{ type: Array },
      selectedSamples:{ type: Array },
      selectedIncubators:{ type: Array },
      //selectedAction: { type: Object },
      batchName: { type: String },
      gridItems: { type: Array },
      filteredItems: { type: Array },
      filteredBatchesItems: { type: Array },
      filteredSamplesItems: { type: Array },
      currentFilterForSamples:{type: String},
      viewDataInfo: { type: Object },

      windowOpenable: { type: String },
      sopsPassed: { type: Boolean },
      stucksList: { type: Array },
      stuckNum: { type: Number }
    };
  }

  constructor() {
    super()
    this.samplesReload = true
    this.incubatorsList = []
    this.gridItems = []
    this.filteredItems = []
    this.viewModelFromProcModel={}

    this.selectedItems=[]
    this.selectedBatches=[]
    this.selectedSamples=[]
    this.selectedIncubators=[]
    this.filteredBatchesItems=[]
    this.filteredSamplesItems=[]

    this.viewDataInfo={}
    this.currentFilterForSamples=''
  }

  updated(updates) {
    super.updated(updates)
    if (updates.has('viewModelFromProcModel')) {
      //this.filterName = this.viewModelFromProcModel.filter
      this.resetView()
      this.authorized()
    }
  }

  resetView() {
    this.selectedItems = []
    this.incubatorsList = []
    //this.langConfig = this.viewModelFromProcModel.langConfig
    this.GetViewData()
    //this.actions = this.viewModelFromProcModel.actions
    //this.selectedAction = this.viewModelFromProcModel.actions[0]
  }
//   <grid-with-buttons id="gridwithbuttons" .viewModelFromProcModel=${this.viewModelFromProcModel} viewName=${this.viewName} 
//   filterName=${this.filterName} procInstanceName=${this.procInstanceName} lang=${this.lang}
//   .config=${this.config} .reqParams=${this.reqParams} ?ready="false">
// </grid-with-buttons>  


xbottomCompositionBlock(){
  return html`  
  ${this.viewModelFromProcModel.bottomCompositions ?
      html`${this.viewModelFromProcModel.bottomCompositions.map(c =>                             
      html`
          ${c.elementName=='envmonit-batch-sampleincubation' ? html`                               
          <div class="layout flex">
          ${c.filter}
          <gridmodel-bottomcomp-sampleincubation id=${c.filter} .procName=${this.procName} .viewName=${this.viewName}
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
          <gridmodel-bottomcomp-chart id=${c.filter} .procName=${this.procName} .viewName=${this.viewName}
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
 

render(){
 // console.log('SampleIncubationView >> render', 'viewModelFromProcModel', this.viewModelFromProcModel)
  return html`
  ${this.viewModelFromProcModel!==undefined ? 
  html`       
    ${this.activeBatchesLayout()}
    ${this.samplesPendingIncubLayout()}
    <audit-dialog @sign-audit=${this.setAudit} .actionBeingPerformedModel=${this.actionBeingPerformedModel} 
      .filterName=${this.filterName} .lang=${this.lang} .windowOpenable=${this.windowOpenable}
      .sopsPassed=${this.sopsPassed} .procInstanceName=${this.procInstanceName} .viewName=${this.viewName} 
      .viewModelFromProcModel=${this.viewModelFromProcModel}
    .selectedItems=${this.selectedItems} .config=${this.config}></audit-dialog>    

    ${this.genericFormDialog()}
    ${this.assignTemplate()}
    ${super.render()}    
  `: nothing
  }`
}

activeBatchesLayout(){
  return html`  
  
  <div class="layout flex">        
    ${this.getTitle(this.viewModelFromProcModel.active_batches)}
    <div class="layout horizontal center flex wrap">
      ${this.getButton(this.viewModelFromProcModel.active_batches)}
    </div>
    <vaadin-grid id="batchesGrid" theme="row-dividers" column-reordering-allowed multi-sort 
    .items=${this.filteredBatchesItems}
      @active-item-changed=${this.batchesGridSelectedItem}
      .selectedItems="${this.selectedBatches}">
      ${this.gridList2(this.viewModelFromProcModel.active_batches)}
    </vaadin-grid>
  </div>
  ${this.langConfig&&this.viewModelFromProcModel.active_batches!==undefined ? 
    html`
      <div id="batchDetail">
        ${this.selectedItems.length ?
          html`
            <div>
              <h1>
                The selected batch is: ${this.selectedItems[0].name}. 
                Incubator: ${this.selectedItems[0].incubation_incubator}. 
                #Samples: ${this.selectedItems[0].SAMPLES_ARRAY.length}
              </h1>
              ${this.selectedItems[0].SAMPLES_ARRAY.length ?
                html`<div id="samplesArr">${this.selectedItems[0].SAMPLES_ARRAY.map(s =>
                  html`<div>${s.sample_id}</div>`
                )}</div>` :
                nothing
              }
            </div>
          ` :
          nothing
        }
      </div>
      ${this.newBatchTemplate()}
      ${this.assignTemplate()}
    ` :
    html`${this.sampleStuckTemplate()}`
  }
  </div>  
  `
}
samplesPendingIncubLayout(){
  return html`  
  <div class="layout horizontal flex wrap">
        <div class="layout flex">
        ${this.getTitle(this.viewModelFromProcModel.samples_pending_incubation)}
        <div class="layout horizontal center flex wrap">
          ${this.getButton(this.viewModelFromProcModel.samples_pending_incubation)}
          </div>
          <vaadin-grid id="samplesGrid" theme="row-dividers" column-reordering-allowed multi-sort 
          .items=${this.filteredSamplesItems}
            @active-item-changed=${this.samplesGridSelectedItem}
            .selectedItems="${this.selectedSamples}">
            ${this.gridList2(this.viewModelFromProcModel.samples_pending_incubation)}
          </vaadin-grid>
        </div>
  </div>
  `
}

  batchesGridSelectedItem(e){
     this.selectedBatches = e.detail.value ? [e.detail.value] : []
     //this.filteringBatch(e)
     this.filteringIncub(e)
    // this.dispatchEvent(new CustomEvent('selected-batch', {
    //   detail: { sample: e.detail.value }
    // }))
  }
  samplesGridSelectedItem(e){
    this.selectedSamples = e.detail.value ? [e.detail.value] : []
    this.filteringBatch(e)
    // this.dispatchEvent(new CustomEvent("selected-incub", {
    //   detail: { sample: e.detail.value }
    // }))
  }
  selectItem(e) {
    return
    this.selectedItems = e.detail.value ? [e.detail.value] : []
    if (this.filterName == "active_batches") {
      this.dispatchEvent(new CustomEvent('selected-batch', {
        detail: { sample: e.detail.value }
      }))
    } else if (this.filterName == "samplesWithAnyPendingIncubation") {
      this.dispatchEvent(new CustomEvent("selected-incub", {
        detail: { sample: e.detail.value }
      }))
    }
  }

  get audit() {
    return this.shadowRoot.querySelector("audit-dialog")
  }
    
  setAudit(e) {
    this.targetValue = {
      auditId: e.detail.audit_id
    }
    this.itemId = e.detail.audit_id
    this.selectedDialogAction = this.selectedAction.dialogInfo.action[0]
    this.actionMethod(this.selectedDialogAction, false)
  }

  get grid() {return this.shadowRoot.querySelector("vaadin-grid#batchesGrid")}

  authorized() {
    //super.authorized()
  
    // whether user has access into the selected proc
    let procList = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures
    if (this.audit===null||this.audit===undefined){return}
    this.audit.updateComplete.then(() => {
      let whichProc = procList.filter(p => p.procInstanceName == this.procInstanceName)
      if (whichProc.length) {
        this.audit.sampleAuditRevisionMode = whichProc[0].audit_sign_mode.sampleAuditRevisionMode == "DISABLE" ? false : true
        this.audit.sampleAuditChildRevisionRequired = whichProc[0].audit_sign_mode.sampleAuditChildRevisionRequired == "FALSE" ? false : true
      }
    })
  }
  reload() {
    //this.resetDialogThings()
    this.GetViewData()
    //this.selectedAction = this.viewModelFromProcModel.actions[0]
    //this.actionMethod(this.selectedAction)
  }
  resetDialogThings() {
    return
    this.itemId = null
    this.targetValue = {}
    this.selectedResults = []
    this.selectedIncubators = []
    this.selectedStucks = []
    this.selectedDialogAction = null
  }
  xreloadDialog() {
    this.resetDialogThings()
    this.actionMethod(this.selectedAction)
  }
  xnextRequest() {
    super.nextRequest()
    this.reqParams = {
      procInstanceName: this.procInstanceName,
      ...this.reqParams
    }
    let action = this.selectedDialogAction ? this.selectedDialogAction : this.selectedAction
    this[action.clientMethod]()
  }
  xdialogAccept(selected=true) {
    if (selected) {
      this.credsChecker(this.selectedAction.actionName, this.selectedItems[0].sample_id, this.jsonParam(this.selectedAction), this.selectedAction)
    } else {
      this.credsChecker(this.selectedAction.actionName, null, this.jsonParam(this.selectedAction), this.selectedAction)
    }
  }
  xjsonParam() {

    let jsonParam = {}
    return jsonParam
    let action = this.selectedDialogAction ? this.selectedDialogAction : this.selectedAction
    if (action.apiParams) {
      action.apiParams.forEach(p => {
        if (p.element) {
          jsonParam[p.query] = this[p.element].value // get value from field input
        } else if (p.defaultValue) {
          jsonParam[p.query] = p.defaultValue // get value from default value (i.e incubator)
        } else if (p.beItem) {
          jsonParam[p.query] = this.selectedItems[0][p.beItem] // get value from selected item
        } else if (p.targetValue) {
          jsonParam[p.query] = this.targetValue[p.query] // get value from target element passed
        } else {
          jsonParam[p.query] = p.value
        }
      })
    }
    if (action.paramFilter) {
      jsonParam[action.paramFilter[this.filterName].query] = action.paramFilter[this.filterName].value
    }
    return jsonParam
  }
  xiconColumn(key, value, i, sectionModel=this.viewModelFromProcModel) {
    return html`
      ${this.desktop ?
        html`
          <vaadin-grid-column class="${key}"
            header="${value['label_'+this.lang]}"
            ${columnBodyRenderer(this.iconRenderer)}
            text-align="center"
            width="${sectionModel.langConfig.gridHeader[key].width}" resizable 
          ></vaadin-grid-column>
        ` :
        html`
          <vaadin-grid-column class="${key}"
            header="${value['label_'+this.lang]}"
            ${columnBodyRenderer(this.iconRenderer)}
            text-align="center"
            width="65px" resizable 
          ></vaadin-grid-column>
        `
      }
    `
  }
  iconRenderer(sample, viewModelFromProcModel, col) {
    if (this.filterName) {
      if (col.getAttribute("class") == "sampleType") {
        return html`<img src="/images/incubators/${sample.sample_config_code=='program_smp_template'?'samplesIcon.png':'samplePerson.png'}" style="width:20px">`
      } else if (col.getAttribute("class") == "batchState") {
        // started / in progress
        // no started / new batch
        if (sample.incubation_start) {
          return html`<img src="/images/incubators/IncubInProgress.gif" style="width:20px">`
        } else {
          return html`<mwc-icon style="color:DarkGoldenRod;--mdc-icon-size:20px">radio_button_checked</mwc-icon>`
        }
      } else if (col.getAttribute("class") == "samplesState") {
        // end incub1
        // started / in progress
        // in batch
        // not in batch
        if (sample.pending_incub == 2) {
          if (sample.incubation2_start) {
            return html`<img src="/images/incubators/IncubInProgress.gif" style="width:20px">`
          } else if (sample.incubation2_batch) {
            return html`<mwc-icon style="color:SlateBlue;--mdc-icon-size:20px">radio_button_checked</mwc-icon>`
          } else {
            return html`<mwc-icon style="color:MediumSeaGreen;--mdc-icon-size:20px">radio_button_checked</mwc-icon>`
          }
        } else {
          if (sample.incubation_start) {
            return html`<img src="/images/incubators/IncubInProgress.gif" style="width:20px">`
          } else if (sample.incubation_batch) {
            return html`<mwc-icon style="color:Tomato;--mdc-icon-size:20px">radio_button_checked</mwc-icon>`
          } else {
            return html`<mwc-icon style="color:Orange;--mdc-icon-size:20px">radio_button_checked</mwc-icon>`
          } 
        }
      } else if (col.getAttribute("class") == "incubState") {
        // inc_1
        // inc2
        if (this.filterName == "active_batches") {
          if (sample.incub_stage == 1) {
            return html`<img src="/images/1.png" style="width:20px">`
          } else if (sample.incub_stage == 2) {
            return html`<img src="/images/2.png" style="width:20px">`
          }
        } else {
          if (sample.pending_incub == 1) {
            return html`<img src="/images/1.png" style="width:20px">`
          } else if (sample.pending_incub == 2) {
            return html`<img src="/images/2.png" style="width:20px">`
          }
        }
      }
    }
  }
  xnonIconColumn(key, value, i, sectionModel=this.viewModelFromProcModel) {
    return html`${sectionModel.langConfig.gridHeader[key].sort ?
      this.xsortColumn(key, value, i, sectionModel) :
      html`${sectionModel.langConfig.gridHeader[key].filter ? 
        html`${this.xfilterColumn(key, value, i, sectionModel)}` : 
        html`${this.xcommonColumn(key, value, i, sectionModel)}`
      }`
    }`
  }
  xsortColumn(key, value, i, sectionModel=this.viewModelFromProcModel) {
    return html`
      ${this.desktop ?
        html`
          ${i==0 ?
            html`${sectionModel.langConfig.gridHeader[key].width ?
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, sectionModel))}
                width="${sectionModel.langConfig.gridHeader[key].width}" resizable text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`:
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, sectionModel))}
                flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
            }` :
            html`${sectionModel.langConfig.gridHeader[key].width ?
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, sectionModel))}
                width="${sectionModel.langConfig.gridHeader[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>` :
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, sectionModel))}
                resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
            }`
          }
        ` :
        html`<vaadin-grid-sort-column width="65px" resizable 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, sectionModel))}
          text-align="${sectionModel.langConfig.gridHeader[key].align ? sectionModel.langConfig.gridHeader[key].align : 'end' }"
          path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
      }
    `
  }
  xfilterColumn(key, value, i, sectionModel=this.viewModelFromProcModel) {
    return html`
      ${this.desktop ?
        html`
          ${i==0 ?
            html`${sectionModel.langConfig.gridHeader[key].width ?
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, sectionModel))}
                width="${sectionModel.langConfig.gridHeader[key].width}" resizable text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, sectionModel))}
                flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
            }` :
            html`${sectionModel.langConfig.gridHeader[key].width ?
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, sectionModel))}
                width="${sectionModel.langConfig.gridHeader[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, sectionModel))}
                resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
            }`
          }
        ` :
        html`<vaadin-grid-filter-column width="65px" resizable 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, sectionModel))}
          text-align="${sectionModel.langConfig.gridHeader[key].align ? sectionModel.langConfig.gridHeader[key].align : 'end' }"
          path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
      }
    `
  }
  xcommonColumn(key, value, i, sectionModel=this.viewModelFromProcModel) {
    return html`
      ${this.desktop ?
        html`
          ${i==0 ?
            html`${sectionModel.langConfig.gridHeader[key].width ?
              html`<vaadin-grid-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, sectionModel))}
                width="${sectionModel.langConfig.gridHeader[key].width}" resizable text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`:
              html`<vaadin-grid-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, sectionModel))}
                flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`
            }` :
            html`${sectionModel.langConfig.gridHeader[key].width ?
              html`<vaadin-grid-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, sectionModel))}
                width="${sectionModel.langConfig.gridHeader[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`:
              html`<vaadin-grid-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, sectionModel))}
                resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`
            }`
          }
        ` :
        html`<vaadin-grid-column 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, sectionModel))}
          width="65px" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`
      }
    `
  }
  xisConfidential(sample, key, sectionModel=this.viewModelFromProcModel) {
    if (sectionModel.langConfig.gridHeader[key].confidential_value&&sample[key]) {
      return html`*****`
    } else {
      return html`${sample[key]}`
    }
  }

  actionMethod(action, viewModel) {
   // console.log('actionMethod')
    if (action.clientMethod==='filterSamples'){
      this.filterSamples(action.filterState)
      return
    }
    this.actionBeingPerformedModel=action     
    console.log(this.actionBeingPerformedModel)
    // alert(this.actionBeingPerformedModel.actionName)
    // if (replace) {
    //   this.selectedAction = action
    // }
    let selectedItemPropertyName='selectedItems'
    if (viewModel.alternativeItemPropertyName!==undefined){
      selectedItemPropertyName=viewModel.alternativeItemPropertyName
    }
    if(action.requiresDialog===undefined){
      alert('The action '+action.actionName+' has no requiresDialog property which is mandatory')
      return
    }
    if(action.requiresDialog===false){
        this.actionWhenRequiresNoDialog(action, this[selectedItemPropertyName][0])
        return
    }  
    this.samplesReload = false
    this.samplesReload = true
    this.selectedItems = []  
    this.GetQueriesForDialog(action) 
    // this.loadDialogs()
    if (action.dialogInfo.name==="auditDialog"){
      this[action.clientMethod]()
      return
    }
    if (this[action.dialogInfo.name]){
        if (action.dialogInfo.subQueryName){
            this[action.dialogInfo.subQueryName]()
        }else{        
            this[action.dialogInfo.name].show()          
        }
    }else{
        alert('the dialog '+action.dialogInfo.name+' does not exist')
    }
    //this.actionBeingPerformedModel=undefined
    console.log("End of actionMethiod", this.actionBeingPerformedModel)

    return
    if (action.dialogInfo) {
      if (action.dialogInfo.automatic) {
        if (this.itemId) {
          this.credsChecker(action.actionName, this.itemId, this.xjsonParamCommons(action, this[selectedItemPropertyName][0]), action)
        } else {
          this.credsChecker(action.actionName, this[selectedItemPropertyName][0].sample_id, this.xjsonParamCommons(action, this[selectedItemPropertyName][0]), action)
        }
      } else {
        this[action.dialogInfo.name].show()
      }
    } else {
      if (this[selectedItemPropertyName].length) {
        this.credsChecker(action.actionName, this[selectedItemPropertyName][0].sample_id, this.xjsonParamCommons(action, this[selectedItemPropertyName][0]), action)
      } else {
        this.credsChecker(action.actionName, null, this.xjsonParamCommons(action, this[selectedItemPropertyName][0]), action)
      }
    }
  }
  xloadDialogs(){
    console.log('loadDialogs', this.actionBeingPerformedModel)
    return html`
      ${this.genericFormDialog(this.actionBeingPerformedModel)}
      ${this.assignTemplate()}
    `
  }
//  ${this.newBatchTemplate()}

  xxxxxxactionMethodxxxx(action, replace = true, actionNumIdx) {
    //this.loadDialogs()  
    console.log('actionMethod', 'action', action)
        if(action===undefined){
            alert('action not passed as argument')
            return
        }

        this.samplesReload = true
        this.selectedItems = []  

        this.actionBeingPerformedModel=action        
        if(action.requiresDialog===undefined){
            alert('The action '+action.actionName+' has no requiresDialog property which is mandatory')
            return
        }
        if(action.requiresDialog===false){
            this.actionWhenRequiresNoDialog(action, this.selectedItems[0])
            return
        }  
        //this.loadDialogs()
        if (action.dialogInfo.name==="auditDialog"){
          this[action.clientMethod]()
          return}
        if (this[action.dialogInfo.name]){
            if (action.dialogInfo.subQueryName){
                this[action.dialogInfo.subQueryName]()
            }else{        
                this[action.dialogInfo.name].show()          
            }
        }else{
            alert('the dialog '+action.dialogInfo.name+' does not exist')
        }

    return
    }   


  gridList2(sectionModel) {
//    console.log('gridList2', 'sectionModel', sectionModel)
    if (sectionModel.langConfig.gridHeader===undefined){return}
    if (sectionModel.langConfig && JSON.stringify(sectionModel.langConfig) == JSON.stringify(sectionModel.langConfig)) {
      return Object.entries(sectionModel.langConfig.gridHeader).map(
        ([key, value], i) => html`
        alert(sectionModel.langConfig.gridHeader[key].label_en)
          ${sectionModel.langConfig.gridHeader[key].is_icon ?
            this.xiconColumn(key, value, i, sectionModel) :
            this.xnonIconColumn(key, value, i, sectionModel)
          }
        `
      )
    }
  }


  filteringIncub(e) {
    this.selectedSamples=[]
    if (this.selectedBatches[0]) {
      this.batchName = this.selectedBatches[0].name
      //alert(this.batchName)
      // if select new batch item, don't show up any incub samples
      if (!this.selectedBatches[0].incub_stage) {
        this.samplesGrid.filteredItems = []
      // if select new assigned incub#1 (incub_stage=1) and SAMPLES_ARRAY.length=0, show up the incub samples that incubation_batch = "" (orange state)
      } else if (!this.selectedBatches[0].incubation_start && this.selectedBatches[0].incub_stage == "1" && !this.selectedBatches[0].SAMPLES_ARRAY.length) {
        this.samplesGrid.filteredItems = this.samplesGrid.items.filter(item => !item.incubation_batch)
      // if select new assigned incub#1 (incub_stage=1) and SAMPLES_ARRAY.length>0, show up the incub samples that incubation_batch != "" & pending_incub = 1 & incubation_start = "" (tomato state)
      } else if (!this.selectedBatches[0].incubation_start && this.selectedBatches[0].incub_stage == "1" && this.selectedBatches[0].SAMPLES_ARRAY.length) {
        let pendings = this.samplesGrid.items.filter(item => !item.incubation_batch)
        let preFilter = this.samplesGrid.items.filter(item => item.incubation_batch && item.pending_incub == 1 && !item.incubation_start)
        // sort out by matched sample id
        let inBatches = preFilter.filter(p => {
          let matched = false
          this.selectedBatches[0].SAMPLES_ARRAY.forEach(s => {
            if (p.sample_id == s.sample_id) matched = true
          })
          if (matched) return p
        })
        this.samplesGrid.filteredItems = [...pendings, ...inBatches]
      // if select started incub#1 (incub_stage=1), show up the incub samples that pending_incub = 1 & incubation_start != "" & incubation_end = "" (gif state)
      } else if (this.selectedBatches[0].incubation_start && this.selectedBatches[0].incub_stage == "1") {
        this.samplesGrid.filteredItems = this.samplesGrid.items.filter(item => item.incubation_start && !item.incubation_end && item.pending_incub == 1)
      // if select new assigned incub#2 (incub_stage=2) and SAMPLES_ARRAY.length=0, show up the incub samples that incubation_end != "" & incubation2_batch = "" (MediumSeaGreen state)
      } else if (!this.selectedBatches[0].incubation_start && this.selectedBatches[0].incub_stage == "2" && !this.selectedBatches[0].SAMPLES_ARRAY.length) {
        this.samplesGrid.filteredItems = this.samplesGrid.items.filter(item => item.incubation_end && !item.incubation2_batch)
      // if select new assigned incub#2 (incub_stage=2) and SAMPLES_ARRAY.length>0, show up the incub samples that incubation2_batch != "" & pending_incub = 2 & incubation2_start = "" (SlateBlue state)
      } else if (!this.selectedBatches[0].incubation_start && this.selectedBatches[0].incub_stage == "2" && this.selectedBatches[0].SAMPLES_ARRAY.length) {
        let pendings = this.samplesGrid.items.filter(item => !item.incubation2_batch && item.pending_incub == 2 && !item.incubation2_start)
        let preFilter = this.samplesGrid.items.filter(item => item.incubation2_batch && item.pending_incub == 2 && !item.incubation2_start)
        // sort out by matched sample id
        let inBatches = preFilter.filter(p => {
          let matched = false
          this.selectedBatches[0].SAMPLES_ARRAY.forEach(s => {
            if (p.sample_id == s.sample_id) matched = true
          })
          if (matched) return p
        })
        this.samplesGrid.filteredItems = [...pendings, ...inBatches]
      // if select started incub#2 (incub_stage=2), show up the incub samples that pending_incub = 2 & incubation2_start != "" & incubation2_end = "" (gif state)
      } else if (this.selectedBatches[0].incubation_start && this.selectedBatches[0].incub_stage == "2") {
        this.samplesGrid.filteredItems = this.samplesGrid.items.filter(item => item.incubation2_start && !item.incubation2_end && item.pending_incub == 2)
      } else {
        this.batchElement.filteredItems = this.batchElement.gridItems
      }
    } else {
      this.batchName = null
      this.samplesGrid.filteredItems = this.samplesGrid.items
    }
    this.requestUpdate()
  }


    /** Incubation Template Dialog part */
    xnewBatchTemplate() {      
      return html`
      <tr-dialog id="newBatchDialog" 
        @closed=${() => this.batchInput.value = ""}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <mwc-textfield id="batchInput" label="${this.viewModelFromProcModel.active_batches && this.viewModelFromProcModel.active_batches.langConfig.fieldText.newBatch["label_" + this.lang]}" 
            dialogInitialFocus @keypress=${e => e.keyCode == 13 && this.newBatch()}></mwc-textfield>
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" @click=${this.newBatch}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `
    }

    get xnewBatchDialog() {
      return this.shadowRoot.querySelector("tr-dialog#newBatchDialog")
    }

    get xbatchInput() {
      return this.shadowRoot.querySelector("mwc-textfield#batchInput")
    }

    xnewBatch() {
      if (this.batchInput.value) {
        this.dialogAccept(false)
      }
    }
    xxxgetAssign() {
      console.log('getAssign')
      let params = this.config.backendUrl + this.config.frontEndEnvMonitIncubationUrl
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          this.selectedIncubators = []
          this.incubatorsList = j
          this.asGrid.items = j
          this.requestUpdate()
        }
      })
    }
    // 
    assignTemplate() {
      // console.log('assignTemplate')
      return html`
      asdas
      <tr-dialog id="assignDialog" ?open=${this.incubatorsList.length}
        @closing=${() => this.incubatorsList = []}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <div style="height:50vh;overflow:auto">
            <vaadin-grid id="asGrid" theme="row-dividers" .items="${this.incubatorsList}"
              @active-item-changed=${e => this.selectedIncubators = e.detail.value ? [e.detail.value] : []}
              .selectedItems="${this.selectedIncubators}" all-rows-visible>
              ${this.asList()}
            </vaadin-grid>
          </div>
          <div style="margin-top:30px;text-align:center;">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" @click=${this.setAssignIncubAction}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `
    }

    asList() {
      if (this.viewModelFromProcModel.active_batches) {
        return Object.entries(this.viewModelFromProcModel.active_batches.langConfig.assignHeader).map(([key, value], i) =>
          html`${i == 0 ?
            html`<vaadin-grid-column path="${key}" header="${value['label_' + this.lang]}"></vaadin-grid-column>` :
            html`<vaadin-grid-column resizable auto-width path="${key}" header="${value['label_' + this.lang]}"></vaadin-grid-column>`
            }`
        )
      }
    }

    get assignDialog() {return this.shadowRoot.querySelector("tr-dialog#assignDialog")}

    get asGrid() {
      return this.shadowRoot.querySelector("vaadin-grid#asGrid")
    }

    setAssignIncubAction() {
      let targetValue = {
        incubatorName: this.selectedIncubators[0].name,
        incubStage: this.selectedIncubators[0].stage
      }
      // this.selectedDialogAction = this.selectedAction.dialogInfo.action[0]
      this.performActionRequestHavingDialogOrNot(this.actionBeingPerformedModel.dialogInfo.action, this.selectedBatches[0], targetValue)
      // this.actionMethod(this.selectedDialogAction, false)
      this.assignDialog.close()
    }

    sampleStuckTemplate() {
      return html`
      <tr-dialog id="sampleStuckDialog" 
        heading=""
        hideActions=""
        scrimClickAction="">
        <label slot="topLeft" style="font-size:12px">${this.viewModelFromProcModel.stuckSamplesDialog && this.viewModelFromProcModel.stuckSamplesDialog.fields.topLabel["label_" + this.lang]}</label>
        <div class="layout vertical flex center-justified">
          <div style="height:50vh;overflow:auto">
            <vaadin-grid id="stuckSamplesGrid" theme="row-dividers" 
              @active-item-changed=${e => this.selectedStucks = e.detail.value ? [e.detail.value] : []}
              .selectedItems="${this.selectedStucks}" all-rows-visible>
              ${this.siList()}
            </vaadin-grid>
          </div>
          <div style="margin-top:30px;text-align:center;">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" @click=${this.setToNext}>
              ${this.viewModelFromProcModel.stuckSamplesDialog && this.viewModelFromProcModel.stuckSamplesDialog.fields.next["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `
    }

    siList() {
      if (this.viewModelFromProcModel.stuckSamplesDialog) {
        return Object.entries(this.viewModelFromProcModel.stuckSamplesDialog.gridHeader).map(([key, value], i) =>
          html`<vaadin-grid-column resizable path="${key}" header="${value['label_' + this.lang]}"></vaadin-grid-column>`
        )
      }
    }
    filteringBatch(e) {
      console.log('filteringBatch', e)
      let allBatches=this.viewDataInfo.active_batches
      if (this.selectedBatches[0]) {
        // sample not in batch, show the batch that incubation_start = "" & assigned incub#1 (incub_stage=1)
        if (!this.selectedBatches[0].incubation_batch) {
          this.batchesGrid.filteredItems = this.batchesGrid.items.filter(item => !item.incubation_start && item.incub_stage == "1")
        // sample in batch incub#1 & incubation_start="", show the batch that incubation_start = "" & assigned incub#1 (incub_stage=1) & sample_id is already put on SAMPLES_ARRAY
        } else if (this.selectedBatches[0].incubation_batch && !this.selectedBatches[0].incubation_start) {
          let preFilter = this.batchesGrid.items.filter(item => !item.incubation_start && item.incub_stage == "1" && item.SAMPLES_ARRAY.length)
          // sort out by matched sample id
          let matched
          preFilter.forEach(p => {
            if (!matched) {
              p.SAMPLES_ARRAY.forEach(s => {
                if (s.sample_id == this.selectedBatches[0].sample_id) matched = p
              })
            }
          })
          this.batchesGrid.filteredItems = [matched]
        // sample incub#1 incubation_start != "" & incubation_end = "", show the batch that incubation_start != "" & assigned incub#1 (incub_stage=1)
        } else if (this.selectedBatches[0].incubation_start && !this.selectedBatches[0].incubation_end) {
          let preFilter = this.batchesGrid.items.filter(item => item.incubation_start && item.incub_stage == "1")
          // sort out by matched sample id
          let matched
          preFilter.forEach(p => {
            if (!matched) {
              p.SAMPLES_ARRAY.forEach(s => {
                if (s.sample_id == this.selectedBatches[0].sample_id) matched = p
              })
            }
          })
          this.batchesGrid.filteredItems = [matched]
        // sample incub#1 incubation_start != "" & incubation_end != "" & incubation2_batch = "", show the batch that incubation_start = "" & assigned incub#2 (incub_stage=2)
        } else if (this.selectedBatches[0].incubation_start && this.selectedBatches[0].incubation_end && !this.selectedBatches[0].incubation2_batch) {
          this.batchesGrid.filteredItems = this.batchesGrid.items.filter(item => !item.incubation_start && item.incub_stage == "2")
        // sample in batch incub#2 & incubation2_start="", show the batch that incubation_start = "" & assigned incub#2 (incub_stage=2) & sample_id is already put on SAMPLES_ARRAY
        } else if (this.selectedBatches[0].incubation2_batch && !this.selectedBatches[0].incubation2_start) {
          let preFilter = this.batchesGrid.items.filter(item => !item.incubation_start && item.incub_stage == "2" && item.SAMPLES_ARRAY.length)
          // sort out by matched sample id
          let matched
          preFilter.forEach(p => {
            if (!matched) {
              p.SAMPLES_ARRAY.forEach(s => {
                if (s.sample_id == this.selectedBatches[0].sample_id) matched = p
              })
            }
          })
          this.batchesGrid.filteredItems = [matched]
        // sample incub#2 incubation2_start != "" & incubation2_end = "", show the batch that incubation_start != "" & assigned incub#2 (incub_stage=2)
        } else if (this.selectedBatches[0].incubation2_start && !this.selectedBatches[0].incubation2_end) {
          let preFilter = this.batchesGrid.items.filter(item => item.incubation_start && item.incub_stage == "2")
          // sort out by matched sample id
          let matched
          preFilter.forEach(p => {
            if (!matched) {
              p.SAMPLES_ARRAY.forEach(s => {
                if (s.sample_id == this.selectedBatches[0].sample_id) matched = p
              })
            }
          })
          this.batchesGrid.filteredItems = [matched]
        }
      } else {
        this.batchesGrid.filteredItems = this.batchesGrid.items
      }
    }      
    filterSamples(state) {
      // alert('filterSamples')

      let allSamples=this.viewDataInfo.samplesWithAnyPendingIncubation
      if (this.currentFilterForSamples.length>0&&this.currentFilterForSamples===state){
        this.filteredSamplesItems = allSamples
        this.currentFilterForSamples=''
        return
      }
      if (state == "not_in_batch") {
        this.filteredSamplesItems = allSamples.filter(item => !item.incubation_batch)
      } else if (state == "in_batch_1") {
        this.filteredSamplesItems = allSamples.filter(item => item.incubation_batch && !item.incubation_start)
      } else if (state == "progress_1") {
        this.filteredSamplesItems = allSamples.filter(item => item.incubation_batch && item.incubation_start && !item.incubation_end)
      } else if (state == "done") {
        this.filteredSamplesItems = allSamples.filter(item => item.incubation_end && !item.incubation2_batch)
      } else if (state == "in_batch_2") {
        this.filteredSamplesItems = allSamples.filter(item => item.incubation2_batch && !item.incubation2_start)
      } else if (state == "progress_2") {
        this.filteredSamplesItems = allSamples.filter(item => item.incubation2_batch && item.incubation2_start && !item.incubation2_end)
      } else {
        this.filteredSamplesItems = allSamples
        return
      }
      this.currentFilterForSamples=state
    }
    setGrid(j) {
      // updating grid of samples_stillIncubationStageAndBothIncubCompleted
      // if (this.batchElement){
      //   if (j){
      //     this.batchElement.items =j.active_batches
      //   }
      // }
      // if (this.batchElement){
      //   if (j){
      //     this.batchElement.items =j.active_batches
      //   }
      // }
      // incubElement
 // console.log('setGrid', 'j', j)
      if (this.stuckSamplesGrid) {
        if (j) {
          if (j.samples_stillIncubationStageAndBothIncubCompleted && j.samples_stillIncubationStageAndBothIncubCompleted.length) {
            this.stucksList = j.samples_stillIncubationStageAndBothIncubCompleted
            this.stuckNum = this.stucksList.length
            this.stuckSamplesGrid.items = j.samples_stillIncubationStageAndBothIncubCompleted
          } else {
            this.stucksList = null
            this.stuckSamplesGrid.items = []
          }
  
          this.filteredBatchesItems=j.active_batches
          //this.gridItems=j.active_batches
          this.filteredSamplesItems=j.samplesWithAnyPendingIncubation

          this.viewDataInfo=j
  
        } else {
          this.stucksList = null
          this.stuckSamplesGrid.items = []
        }
        this.selectedStucks = []
      }
      // alert(j.active_batches.length)
      //this.dispatchEvent(new CustomEvent('set-grid', { detail: j }))
    }
  
    get sampleStuckDialog() {return this.shadowRoot.querySelector("tr-dialog#sampleStuckDialog")}

    get batchesGrid() {return this.shadowRoot.querySelector("vaadin-grid#batchesGrid")}
    get samplesGrid() {return this.shadowRoot.querySelector("vaadin-grid#samplesGrid")}

    get stuckSamplesGrid() {return this.shadowRoot.querySelector("vaadin-grid#stuckSamplesGrid")}

//    get batchElement() {return this.shadowRoot.querySelector("gridmodel-bottomcomp-sampleincubation#active_batches")}
//    get incubElement() {return this.shadowRoot.querySelector("gridmodel-bottomcomp-sampleincubation#samplesWithAnyPendingIncubation")}

}
window.customElements.define('sample-incubation-view', SampleIncubationView);