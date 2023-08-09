import { html, css, nothing } from 'lit';
import { CoreView } from '../../components/core-view';
import { Alignment, Layouts } from '@collaborne/lit-flexbox-literals';
import { commonLangConfig } from '@trazit/common-core';
import { columnBodyRenderer } from 'lit-vaadin-helpers';
import { CommonsDialogTemplate } from '../../CommonsDialogTemplate';
import { GenomaActions } from '../GenomaActions';
import { GenomaUtilities } from '../GenomaUtilities';
import { GridUtilities } from '../GridUtilities';
import { GenomaDialogTemplate } from '../GenomaDialogTemplate';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';


//import { CommonsClientMethod} from './../../CommonsClientMethod';
let langConfig = {
  "title": {"label_en": "Study Variable Values", "label_es": "Valores de variables para el estudio"},
  "fieldText": {
  },
  "gridHeaderStudyVariableValues": {
    gridColumns:{
      "id": {"label_en": "Id", "label_es": "Id", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
      "owner_table": {"label_en": "type", "label_es": "Tipo", "sort": false, "filter": true, "width": "20%"},
      "owner_id": {"label_en": "Owner", "label_es": "Dueño", "sort": false, "filter": true, "width": "20%"},
      "variable_set": {"label_en": "variable_set", "label_es": "variable_set", "sort": false, "filter": true, "width": "20%"},
      "name": {"label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "width": "20%"},
      "value": {"label_en": "Value", "label_es": "Valor", "sort": false, "filter": true, "width": "20%"}
    },
    buttons:[
      { "actionName": "STUDY_OBJECT_SET_VARIABLE_VALUE",
        "clientMethod": "studyObjectSetVariableValue",
        "selObjectVariableName": "selectedVariable",
        "endPoint": "/modulegenoma/GenomaStudyAPI",
        "endPointParams": [
          { "argumentName": "studyName", "ZZZselObjectPropertyName": "study"},
          { "argumentName": "ownerId", "selObjectPropertyName": "owner_id" },
          { "argumentName": "ownerTable", "selObjectPropertyName": "owner_table" },
          { "argumentName": "variableSetName", "selObjectPropertyName": "variable_set" },
          { "argumentName": "variableName", "selObjectPropertyName": "name" },
          { "argumentName": "newValue", "variableName": "newResult" }
        ],
        // // [{"is_mandatory?":true,"name":"studyName","type":"STRING","testing arg posic":6},
        // // {"is_mandatory?":true,"name":"variableSetName","type":"STRING","testing arg posic":7},
        // // {"is_mandatory?":true,"name":"ownerTable","type":"STRING","testing arg posic":8},
        // // {"is_mandatory?":true,"name":"ownerId","type":"STRING","testing arg posic":9},
        // // {"is_mandatory?":true,"name":"variableName","type":"STRING","testing arg posic":10},
        // // {"is_mandatory?":true,"name":"newValue","type":"STRING","testing arg posic":11}]        
        "button": {
          "z-icdon": "refresh",
          "title": {
            "label_en": "Set Result", "label_es": "Entrar Result"
          },
          requiresObjectSelected : true
        },   
        "dialogInfo": {
          "requiresDialog": true,
          "name": "objectSetResultValue",
          "fieldText": {
            "variableName": { "label_en": "Variable Name", "label_es": "Nombre Variable" },
            "value": { "label_en": "Value", "label_es": "Valor" }
            //"number1": { "label_en": "new Individual Name", "label_es": "Nombre Nuevo Individuo" },
            //"list1": { "label_en": "new Individual Name", "label_es": "Nombre Nuevo Individuo",
            //   "items": [
            //     { "keyName": "familyCorrecto", "keyValue_en": "Correct", "keyValue_es": "Correcto" },
            //     { "keyName": "familyIntentObs", "keyValue_en": "Attempt-Obs", "keyValue_es": "Intent-Obs" },
            //     { "keyName": "familyObsCorrecto", "keyValue_en": "Correct-Obs", "keyValue_es": "Correcto-Obs" },
            //     { "keyName": "familyObsIntentosCorrecto", "keyValue_en": "Corr-Attempt-Obs", "keyValue_es": "Corr-Intent-Obs" },
            //     { "keyName": "familyObsIntentoCorrectoTerminado", "keyValue_en": "Corr-Attempt-Obs-End", "keyValue_es": "Corr-Intent-Obs-Term" }
            //   ]            
            // }
          }
        }
      }
    ]
  },
}
let actions = [
]

export class StudyVariableValues extends GenomaDialogTemplate(GridUtilities(GenomaUtilities(GenomaActions(CommonsDialogTemplate(CoreView))))) {
  static get styles() {
    return [Layouts, Alignment,
      super.styles,
      css`
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
      samplesReload: { type: Boolean },
      selectedSamples: { type: Array },
      selectedAction: { type: Object },
      targetValue: { type: Object },
      procInstanceName: { type: String },
      config: { type: Object },

      selectedStudy: { type: Object },
      selectedVariable: { type: Array },
      newResult: {type: String},
    };
  }

  constructor() {
    super()
    this.selectedSamples = []
    this.selectedVariable = []
    this.selectedAction = []
    this.newResult=''
  }

  tabView() {
    return html`
      <div class="layout horizontal flex wrap">
        <div class="layout flex">
          <h1>${langConfig.title["label_"+this.lang]} ${this.selectedStudy.name}</h1>
          <div class="layout horizontal center flex wrap">
            ${this.getButton(langConfig.actions)}
          </div>
          ${this.getButton(langConfig.gridHeaderStudyVariableValues.buttons, this.selectedVariable)}
          <vaadin-grid id="studyvarvaluesgrid" theme="row-dividers" column-reordering-allowed multi-sort 
            @active-item-changed=${e=>this.selectedVariable=e.detail.value ? [e.detail.value] : []}
            .selectedItems="${this.selectedVariable}" .items="${this.selectedStudy.study_variable_values}">
            ${this.gridListFromGridUtilities(langConfig.gridHeaderStudyVariableValues)}                  
          </vaadin-grid>
        </div>
        ${this.genomaDialogsTemplate()} 
        ${this.reactiveObjectTemplate()}
      </div>
    `;
  }

  get studyvarvaluesgrid() {
    return this.shadowRoot.querySelector("vaadin-grid#studyvarvaluesgrid")
  }
  genericFormClient(){
    console.log('genericFormClient')
    this.selectedSamples = []
    this.newStudyIndividual.show()
//    this.actionMethod(this.selectedAction)
  }

  setView() {
    this.selectedSamples = []
    this.selectedAction = actions[0]
    this.actionMethod(this.selectedAction.subAction)
  }

  cleanFormFields(){
    if (this.text1){this.text1.value=''}
    if (this.number1){this.number1.value=''}
    //if (this.list1){this.list1.value={}}
  }
  setNewResult(e){
    console.log('setNewResult', e.value)
    this.newResult=e.value
    this.genomaSuperDialogClickedAction()
  }
  //@change=${this.setRole}
  // <mwc-textfield class="layout flex" id="text1" type="text" 
  // .value=${this.selectedAction.dialogInfo.fieldText.variableName.default_value ? this.selectedAction.dialogInfo.fieldText.variableName.default_value : this[this.selectedAction.selObjectVariableName][0].name} 
  // label="${this.selectedAction.dialogInfo.fieldText.variableName["label_" + this.lang]}"
  // disabled
  // @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>

  genomaDialogsTemplateIndiv() {    
    //console.log('genomaDialogsTemplateIndiv')
//    <mwc-textfield class="hidden" id="newResult" type="text" value="1"></mwc-textfield>

    return html`    
      <tr-dialog id="objectSetResultValue"         
      heading=""
      hideActions=""
      @closed=${() => this.cleanFormFields()}
      scrimClickAction="">
      ${this.selectedAction===undefined||this.selectedAction.dialogInfo===undefined ?
        html``: html`    
        <div class="layout vertical flex center-justified">
        ${!this.selectedAction.dialogInfo.fieldText.variableName ?
          html``: html`        
          <div class="layout horizontal flex center-center">
            ${this.enterResultList()}      
          </div>
        `} 
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      `}
      </tr-dialog>      
      
            
      <tr-dialog id="genericFormDialog"         
      heading=""
      hideActions=""
      @closed=${() => this.cleanFormFields()}
      scrimClickAction="">
      ${this.selectedAction===undefined||this.selectedAction.dialogInfo===undefined ?
        html``: html`    
        <div class="layout vertical flex center-justified">
        ${!this.selectedAction.dialogInfo.fieldText.text1 ?
          html``: html`        
          <div class="layout horizontal flex center-center">
          <mwc-textfield class="layout flex" id="text1" type="text" 
            .value=${this.selectedAction.dialogInfo.fieldText.text1.default_value ? this.selectedAction.dialogInfo.fieldText.text1.default_value : ''} @change=${e => this.numDays = e.target.value}
            label="${this.selectedAction.dialogInfo.fieldText.text1["label_" + this.lang]}"
            @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
          </div>
        `}          
        ${!this.selectedAction.dialogInfo.fieldText.number1 ?
          html``: html`        
          <div class="layout horizontal flex center-center">
          <mwc-textfield class="layout flex" id="number1" type="number" 
            .value=${this.selectedAction.dialogInfo.fieldText.number1.default_value ? this.selectedAction.dialogInfo.fieldText.number1.default_value : ''}
            label="${this.selectedAction.dialogInfo.fieldText.number1["label_" + this.lang]}"
            @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
          </div>
        `}          
        ${!this.selectedAction.dialogInfo.fieldText.list1 ?
        html``: html`        
            <mwc-select id="list1" label="${this.selectedAction&&this.selectedAction.dialogInfo&&this.selectedAction.dialogInfo.fieldText.list1&&this.selectedAction.dialogInfo.fieldText.list1["label_" + this.lang]}">
            ${this.selectedAction.dialogInfo.fieldText.list1.items.map((c, i) =>
              html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
            )}
            </mwc-select>
        `}     
        ${!this.selectedAction.dialogInfo.fieldText.listMDprocedureUsers ?
          html``: html`        
              <mwc-select id="listMDprocedureUsers" label="${this.selectedAction&&this.selectedAction.dialogInfo&&this.selectedAction.dialogInfo.fieldText.listMDprocedureUsers&&this.selectedAction.dialogInfo.fieldText.listMDprocedureUsers["label_" + this.lang]}">
              ${this.MDprocedureUsers.map((c, i) =>
                html`<mwc-list-item value="${c.user_name}" ?selected=${i == 0}>${c.user_name}</mwc-list-item>`
              )}
              </mwc-select>
          `}          
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" @click=${this.genomaSuperDialogClickedAction}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
        `
      }    
      </tr-dialog>      

  `}        
  get genericFormDialog() {
    return this.shadowRoot.querySelector("tr-dialog#genericFormDialog")
  }
  get objectSetResultValue() {
    return this.shadowRoot.querySelector("tr-dialog#objectSetResultValue")
  }    
//  get newResult() {    return this.shadowRoot.querySelector("mwc-textfield#newResult")  }    
  get text1() {
    return this.shadowRoot.querySelector("mwc-textfield#text1")
  }    
  get number1() {
    return this.shadowRoot.querySelector("mwc-textfield#number1")
  }    
  get list1() {
    return this.shadowRoot.querySelector("mwc-select#list1")
  }
  get listMDprocedureUsers() {
    return this.shadowRoot.querySelector("mwc-select#listMDprocedureUsers")
  }

  enterResultList() {
    //if (this.newResult){
    //  this.newResult.style.display="none"
    //}
    let result=this[this.selectedAction.selObjectVariableName][0]
    console.log('enterResultList')
    if (result.param_type.toUpperCase() == "TEXT") {
      return html`      
      <mwc-textfield class="layout flex" id="text1" type="text" 
      .value=${result.value===undefined ? '' : result.value} 
      label="${result.name}"
      @keypress=${e => e.keyCode == 13 && this.setNewResult(e.target)}></mwc-textfield>
      `    
    }
    if (result.param_type.toUpperCase() == "INTEGER" || result.param_type.toUpperCase() == "REAL") {
      return html`      
      <mwc-textfield class="layout flex" id="text1" type="numeric" 
      .value=${result.value===undefined ? '' : result.value} 
      label="${result.name}"
      @keypress=${e => e.keyCode == 13 && this.setNewResult(e.target)}></mwc-textfield>
      `          
    }
    if (result.param_type.toUpperCase() == "LIST" || result.param_type == "qualitative") {
      let lEntry = result.allowed_values.split("|")
      return html`
        <mwc-select id="listMDprocedureUsers" label="${result.name}"
        @change=${e => this.setNewResult(e.target)}>
        ${lEntry.map((c, i) =>
          html`<mwc-list-item value="${c}" ?selected=${i == 0}>${c}</mwc-list-item>`
        )}
        </mwc-select>
      `
    }
    return html`
    type not recognized
    ${this[this.selectedAction.selObjectVariableName][0].type}
    ${this[this.selectedAction.selObjectVariableName][0].value}            
    `
  }
  valRenderer(result) {
    if (result.is_locked) {
      return html`
        <div style="width: 100%;height: 55px;position: relative; background-color: rgb(255 8 8 / 20%)">
          <div style="width: 100%;text-align:center; margin: 0;position: absolute;top: 50%;-ms-transform: translateY(-50%);transform: translateY(-50%);">${result.raw_value}</div>
        </div>
      `
    } else {
      if (result.param_type.toUpperCase() == "TEXT" || result.param_type == "qualitative") {
        return html`<input class="enterResultVal" type="text" .value=${result.raw_value} 
          ?disabled=${this.selectedAction.dialogInfo.readOnly}
          @keydown=${e => e.keyCode == 13 && this.setResult(result, e.target)}>`
      } else if (result.param_type.toUpperCase().indexOf("LIST") > -1) {
        let lEntry = result.list_entry.split("|")
        return html`
          ${result.param_type.toUpperCase() == "TEXTLIST" ?
            html`
              <input class="enterResultVal" list="listEntry${result.result_id}" 
                .value=${result.raw_value}
                @keydown=${e => e.keyCode == 13 && this.setResult(result, e.target)}>
              <datalist id="listEntry${result.result_id}">
                ${lEntry.map(l =>
                  html`<option value="${l}">${l}`
                )}
              </datalist>
            ` :
            html`
              <select class="enterResultVal" @change=${e => this.setResult(result, e.target)}>
                ${lEntry.map(l =>
                  html`<option value="${l}" ?selected=${l==result.raw_value}>${l}`
                )}
              </select>
            `
          }
        `
      } else if (result.param_type.toUpperCase() == "REAL") {
        let step = result.max_dp ? 1 / Math.pow(10, result.max_dp) : 0.01
        let min = result.min_allowed ? result.min_allowed : 0
        let max = result.max_allowed && result.max_allowed
        return html`
          ${this[`${result.param_type+''+result.result_id}`]}
          <input class="enterResultVal" id="${result.param_type+''+result.result_id}" 
            ?disabled=${this.selectedAction.dialogInfo.readOnly} type="number" 
            .step=${step} 
            .min=${min}
            .max=${max}
            .value=${this.adjustValUndetermined(result)} 
            @input=${e=>this.setValidVal(e, result)}
            @keydown=${e => e.keyCode == 13 && this.setResult(result, e.target)}>
        `
      } else {
        let min = result.min_allowed ? result.min_allowed : 0
        let max = result.max_allowed && result.max_allowed
        return html`
          ${this[`${result.param_type+''+result.result_id}`]}
          <input class="enterResultVal" id="${result.param_type+''+result.result_id}" 
            ?disabled=${this.selectedAction.dialogInfo.readOnly} type="number" 
            .min=${min}
            .max=${max}
            .value=${this.adjustValUndetermined(result)} 
            @input=${e=>this.setValidVal(e, result)}
            @keydown=${e => e.keyCode == 13 && this.setResult(result, e.target)}>
        `
      }
    }
  }

  xjsonParamCommons(selAction, selObject) {
    let jsonParam = {}
    if (selAction.endPointParams===undefined){
      return jsonParam
    }
    console.log('xjsonParamCommons', selAction)
    if (selAction===undefined){
      selAction=this.selectedAction
    }
    if (selObject===undefined){
      if (selAction.selObjectVariableName===undefined){
        alert("Please add the property selObjectVariableName to your action definition")
        return
      }
      selObject=this[selAction.selObjectVariableName][0]
    }
    let action = selAction
    if (action.endPointParams) {
      action.endPointParams.forEach(p => {
        if (p.argumentName==="studyName") {
          if (this.selectedStudy===undefined||this.selectedStudy.name===undefined){
            alert('No study selected')
            return jsonParam
          }
          jsonParam[p.argumentName] = this.selectedStudy.name
        } else if (p.element) {
          jsonParam[p.argumentName] = this[p.element].value // get value from field input
        } else if (p.defaultValue) {
          jsonParam[p.argumentName] = p.defaultValue // get value from default value (i.e incubator)
        } else if (p.selObjectPropertyName) {
          jsonParam[p.argumentName] = selObject[p.selObjectPropertyName] // get value from selected item
        } else if (p.targetValue) {
          jsonParam[p.argumentName] = this.targetValue[p.argumentName] // get value from target element passed
        } else if (p.variableName) {
          jsonParam[p.argumentName] = this[p.variableName]
        } else {
          jsonParam[p.argumentName] = p.value
        }
        console.log('xjsonParamCommons', 'endPointParamsArgument', p, 'selObject', selObject, 'jsonParam', jsonParam)
      })
    }
    if (action.paramFilter) {
      jsonParam[action.paramFilter[this.filterName].query] = action.paramFilter[this.filterName].value
    }
    return jsonParam
  }
  
}
customElements.define('study-variable-values', StudyVariableValues);