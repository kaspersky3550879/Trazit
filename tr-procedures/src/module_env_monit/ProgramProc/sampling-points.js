import { html, css, nothing } from 'lit';
import { CoreView } from './../../components/core-view';
import { Alignment, Layouts } from '@collaborne/lit-flexbox-literals';
import { commonLangConfig } from '@trazit/common-core';
import { columnBodyRenderer } from 'lit-vaadin-helpers';

import {DialogsFunctions} from '../../components/GenericDialogs/DialogsFunctions';
import '../../components/grid_with_buttons/grid-with-buttons'
import {ModuleEnvMonitClientMethods} from '../../module_env_monit/ModuleEnvMonitClientMethods';

let thisTabViewDefinition = {
  "title": {
    "label_en": "Program Sampling Points", 
    "label_es": "Puntos de muestro del programa"
  },
  "fieldText": {
    "logBtn": { "label_en": "Log Sample", "label_es": "Registrar Muestra" },
    "shift": {
      "items": [
        { "keyName": "M1", "keyValue_en": "Morning 1", "keyValue_es": "Mañana 1" },
        { "keyName": "M2", "keyValue_en": "Morning 2", "keyValue_es": "Mañana 2" },
        { "keyName": "N", "keyValue_en": "Night", "keyValue_es": "Noche" }
      ],
      "label_en": "Shift", "label_es": "Turno"
    },
    "lot": {
      "items": [],
      "label_en": "Lot", "label_es": "Lote"
    }
  },
  "gridHeader": {
    "area": {
      "label_en": "Area", "label_es": "Area", "sort": false, "filter": true, "is_icon": true, "width": "10%"
    },
    "location_name": {
      "label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true, "width": "20%"
    },
    "spec_code": {
      "label_en": "Spec", "label_es": "Especificación", "sort": false, "filter": true, "width": "20%"
    },
    "spec_variation_name": {
      "label_en": "Variation", "label_es": "Variación", "sort": false, "filter": true, "width": "20%"
    },
    "spec_analysis_variation": {
      "label_en": "Analysis Variation", "label_es": "Análisis de Variación", "sort": false, "filter": true, "width": "20%"
    },
    "person_ana_definition": {
      "label_en": "Person Sampling Areas", "label_es": "Areas a analizar de Personal", "sort": false, "filter": true, "width": "40%"
    }
  },
  "langConfig": {
      "gridActionOnClick":{"actionName": "LOGSAMPLE",
      "endPoint": "/moduleenvmon/EnvMonSampleAPIactions",
      "requiresDialog": true,
      "clientMethod": "logSampleDialog",
      "dialogQueries":[
        {	"actionName": "GET_ACTIVE_PRODUCTION_LOTS",				
          "endPoint": "/moduleenvmon/EnvMonAPIqueries",
          "variableForData": "prodLotList"		  
        }
      ],

      "dialogInfo":{
        "name" : "pointDialog",
        "action": { "actionName": "LOGSAMPLE",
          "endPointUrl": "Samples",
          "requiresDialog": false,
          "endPoint": "/moduleenvmon/EnvMonSampleAPIactions",
          "clientMethod": "logSample",
          "endPointParams": [
            { "argumentName": "programName", "selObjectPropertyName": "program_name" },
            { "argumentName": "locationName", "selObjectPropertyName": "location_name" },
            { "argumentName": "sampleTemplate", "defaultValue": "program_smp_template" },
            { "argumentName": "sampleTemplateVersion", "defaultValue": 1 },
            { "argumentName": "fieldName", "defaultValue": "shift|production_lot" },
            { "argumentName": "fieldValue", "targetValue": true },
            { "argumentName": "numSamplesToLog", "defaultValue": 1 }
          ]
        }
      }
      }

  }

}
let actions = [
  { "actionName": "LOGSAMPLE",
    "endPointUrl": "Samples",
    "requiresDialog": false,
    "endPoint": "/moduleenvmon/EnvMonSampleAPIactions",
    "clientMethod": "logSample",
    "endPointParams": [
      { "argumentName": "programName", "element": "programInput" },
      { "argumentName": "locationName", "element": "locationInput" },
      { "argumentName": "sampleTemplate", "defaultValue": "program_smp_template" },
      { "argumentName": "sampleTemplateVersion", "defaultValue": 1 },
      { "argumentName": "fieldName", "targetValue": "fieldName" },
      { "argumentName": "fieldValue", "targetValue": "fieldValue" },
      { "argumentName": "numSamplesToLog", "defaultValue": 1 }
    ]
  }
]

export class SamplingPoints extends ModuleEnvMonitClientMethods(DialogsFunctions(CoreView)) {
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
      selectedItems: { type: Array },
      selectedAction: { type: Object },
      targetValue: { type: Object },
      procInstanceName: { type: String },
      config: { type: Object },

      selectedProgram: { type: Array },
    };
  }

  constructor() {
    super()
    this.selectedItems = []
    this.selectedProgram = []
    return
    this.selectedAction = actions[0]
  }

  xtabView(){
    return html`
    grid-with-buttons ${this.filterName} ${this.procInstanceName} ${this.viewName} ${this.lang} 
    <grid-with-buttons id="gridwithbuttons" .thisTabViewDefinition=${thisTabViewDefinition} viewName=${this.viewName} 
      filterName=${this.filterName} procInstanceName=${this.procInstanceName} lang=${this.lang}
      .config=${this.config} .reqParams=${this.reqParams} ?ready="false">
    </grid-with-buttons>

    `    
  }
  // <div class="layout horizontal center flex wrap">
  // ${this.getButton()}
  // </div>
  tabView() {
    return html`
      <div class="layout horizontal flex wrap">
        <div class="layout flex">
          <h1>${thisTabViewDefinition.title["label_"+this.lang]}</h1>

          <vaadin-grid theme="row-dividers" column-reordering-allowed multi-sort 
            @active-item-changed=${this.activeItemChanged}
            .selectedItems="${this.selectedItems}">
            ${this.gridList()}
          </vaadin-grid>
        </div>
        ${this.pointTemplate()}
      </div>
    `;
  }

  activeItemChanged(e){
    this.selectedItems=e.detail.value ? [e.detail.value] : []    
    if (this.selectedItems.length==0){return}
    //alert('Temporalmente deshabilitada la accion')
    //return
    if (e===undefined){return}
    let d=true
    d=this.disabledByCertification(thisTabViewDefinition.gridActionOnClick)     
    if (d) {
       //alert('View in read only mode')
      return
    }
    this.viewModelFromProcModel=thisTabViewDefinition
    this.selectedItems=e.detail.value ? [e.detail.value] : []
    if (this.selectedItems.length>0&&thisTabViewDefinition.gridActionOnClick!==undefined){
      //alert(thisTabViewDefinition.gridActionOnClick.actionName)
      this.GetAlternativeViewData(thisTabViewDefinition.gridActionOnClick)
    }
    this.pointDialog.show()

  }

  //${this.pointTemplate()}
  /** Point Template Dialog part */
  pointTemplate() {
    return html`
    <tr-dialog id="pointDialog" .open=${this.selectedItems&&this.selectedItems.length}
      @closed=${e=>{if(e.target===this.pointDialog)this.grid.activeItem=null}}
      heading=""
      hideActions=""
      scrimClickAction="">
      <div class="layout vertical flex center-justified">
        <div class="layout horizontal justified flex">
          <sp-button size="m" variant="secondary" dialogAction="accept">
            ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          <sp-button size="m" @click=${this.setLogSample}>${thisTabViewDefinition.fieldText.logBtn["label_"+this.lang]}</sp-button>
        </div>
        <mwc-select label="${thisTabViewDefinition.fieldText.shift["label_"+this.lang]}" id="shift">
          ${thisTabViewDefinition.fieldText.shift.items.map((c,i) => 
            html`<mwc-list-item value="${c.keyName}" ?selected=${i==0}>${c["keyValue_"+this.lang]}</mwc-list-item>`
          )}
        </mwc-select>
        <mwc-select label="${thisTabViewDefinition.fieldText.lot["label_"+this.lang]}" id="lot">
          ${thisTabViewDefinition.fieldText.lot.items.map((c,i) => 
            html`<mwc-list-item value="${c.lot_name}" ?selected=${i==0}>${c.lot_name}</mwc-list-item>`
          )}
        </mwc-select>
        ${this.selectedItems===undefined||this.selectedItems[0]===undefined||this.selectedItems[0].card_info===undefined ? nothing :
        html`
          ${this.selectedItems.length&&this.selectedItems[0].card_info.map(f => 
            html`<mwc-textfield label=${f['label_'+this.lang]} name=${f.name} type=${f.type} value=${f.value}></mwc-textfield>`
          )}
        `}
      </div>
    </tr-dialog>
    `
  }

  get grid() {
    return this.shadowRoot.querySelector("vaadin-grid")
  }

  get pointDialog() {
    return this.shadowRoot.querySelector("tr-dialog#pointDialog")
  }

  get shiftField() {
    return this.shadowRoot.querySelector("mwc-select#shift")
  }

  get lotField() {
    return this.shadowRoot.querySelector("mwc-select#lot")
  }

  get programInput() {
    return this.shadowRoot.querySelector("mwc-textfield[name=program_name]")
  }

  get locationInput() {
    return this.shadowRoot.querySelector("mwc-textfield[name=location_name]")
  }

  setLogSample() {
    this.targetValue = {}
    this.targetValue.fieldName=''
    this.targetValue.fieldValue=''
    if (this.lotField.value!==undefined){
      if (this.targetValue.fieldName.length>0){
        this.targetValue.fieldName=this.targetValue.fieldName+"|"
        this.targetValue.fieldValue=this.targetValue.fieldValue+"|"
      }
      this.targetValue.fieldName=this.targetValue.fieldName+"production_lot"
      this.targetValue.fieldValue=this.targetValue.fieldValue+this.lotField.value
    }
    
    if (this.shiftField.value!==undefined){
      if (this.targetValue.fieldName.length>0){
        this.targetValue.fieldName=this.targetValue.fieldName+"|"
        this.targetValue.fieldValue=this.targetValue.fieldValue+"|"
      }
      this.targetValue.fieldName=this.targetValue.fieldName+"shift"
      this.targetValue.fieldValue=this.targetValue.fieldValue+this.shiftField.value
    }
    this.selectedAction=actions[0]
    this.reqParams=this.jsonParam(actions[0], {}, this.targetValue)
    this.nextRequestCommons(actions[0])
    return    

    this.targetValue = {
      sampleTemplate: this.selectedProgram.sample_config_code,
      sampleTemplateVersion: this.selectedProgram.sample_config_code_version,
      fieldValue: `${this.shiftField.value}*String|${this.lotField.value}*String`
    }
    this.actionMethod(null, false, 1)
  }

  xgetButton() {
    return html`
      ${actions.map(action =>
        html`${action.button ?
          html`<mwc-icon-button 
            class="${action.button.class}"
            icon="${action.button.icon}" 
            title="${action.button.title['label_'+this.lang]}" 
            ?disabled=${action.button.whenDisabled == "samplesReload" ? this.samplesReload : !this.selectedItems.length}
            @click=${()=>this.actionMethod(action)}></mwc-icon-button>` :
          nothing
        }`
      )}
    `
  }

  xactionMethod(action, replace = true, actionNumIdx) {
    if (replace) {
      this.selectedAction = action
    }
    if (actionNumIdx) {
      action = actions[actionNumIdx]
      this.selectedAction = actions[actionNumIdx]
    }
    if (this.selectedItems.length) {
      this.credsChecker(action.actionName, this.selectedItems[0].sample_id, this.jsonParam(), action)
    } else {
      this.credsChecker(action.actionName, null, this.jsonParam(), action)
    }
  }

  xjsonParam() {
    let jsonParam = {}
    if (this.selectedAction.apiParams) {
      this.selectedAction.apiParams.forEach(p => {
        if (p.element) {
          jsonParam[p.query] = this[p.element].value // get value from field input
        } else if (p.defaultValue) {
          jsonParam[p.query] = p.defaultValue // get value from default value (i.e incubator)
        } else if (p.targetValue) {
          jsonParam[p.query] = this.targetValue[p.query] // get value from target element passed
        } else {
          jsonParam[p.query] = p.value
        }
      })
    }
    return jsonParam
  }

  xnextRequest() {
    super.nextRequest()
    this.reqParams = {
      procInstanceName: this.procInstanceName,
      ...this.reqParams
    }
    this[this.selectedAction.clientMethod]()
  }

  gridList() {
    return Object.entries(thisTabViewDefinition.gridHeader).map(
      ([key, value], i) => html`${this.nonIconColumn(key, value, i)}`
    )
  }

  nonIconColumn(key, value, i) {
    return html`${thisTabViewDefinition.gridHeader[key].sort ?
      this.sortColumn(key, value, i) :
      this.filterColumn(key, value, i)
    }`
  }

  sortColumn(key, value, i) {
    return html`
      ${this.desktop ?
        html`
          ${i==0 ?
            html`${thisTabViewDefinition.gridHeader[key].width ?
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                width="${thisTabViewDefinition.gridHeader[key].width}" resizable text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`:
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
            }` :
            html`${thisTabViewDefinition.gridHeader[key].width ?
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                width="${thisTabViewDefinition.gridHeader[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>` :
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
            }`
          }
        ` :
        html`<vaadin-grid-sort-column width="65px" resizable 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          text-align="${thisTabViewDefinition.gridHeader[key].align ? thisTabViewDefinition.gridHeader[key].align : 'end' }"
          path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
      }
    `
  }

  filterColumn(key, value, i) {
    return html`
      ${this.desktop ?
        html`
          ${i==0 ?
            html`${thisTabViewDefinition.gridHeader[key].width ?
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                width="${thisTabViewDefinition.gridHeader[key].width}" resizable text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
            }` :
            html`${thisTabViewDefinition.gridHeader[key].width ?
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                width="${thisTabViewDefinition.gridHeader[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
            }`
          }
        ` :
        html`<vaadin-grid-filter-column width="65px" resizable 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          text-align="${thisTabViewDefinition.gridHeader[key].align ? thisTabViewDefinition.gridHeader[key].align : 'end' }"
          path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
      }
    `
  }

  isConfidential(sample, key) {
    if (thisTabViewDefinition.gridHeader[key].confidential_value&&sample[key]) {
      return html`*****`
    } else {
      return html`${sample[key]}`
    }
  }

  async getProgramList() {
    return
    this.samplesReload = true
    let params = this.config.backendUrl + this.config.frontEndEnvMonitUrl 
      + '?' + new URLSearchParams(this.reqParams)
    await this.fetchApi(params).then(j => {
      if (j && !j.is_error) {
        if (this.selectedAction.subAction) {
          this.actionMethod(this.selectedAction.subAction)
          this.programsList = j.programsList
        }
      }
    })
  }

  getLots() {
    return
    let params = this.config.backendUrl + this.config.frontEndEnvMonitUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(j => {
      this.samplesReload = false
      this.grid.items = this.selectedProgram.sample_points
      thisTabViewDefinition.fieldText.lot.items = j
      this.requestUpdate()
    })
  }

  logSample() {
    this.reqParams.programName = this.selectedProgram.name
    let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(() => {
      this.selectedAction = actions[0]
      this.pointDialog.close()
    })
  }

  setView() {
    this.selectedItems = []
    if (this.selectedProgram===undefined){return}
    this.grid.items = this.selectedProgram.sample_points
    return
    this.selectedAction = actions[0]
    this.actionMethod(this.selectedAction.subAction)
  }
}
customElements.define('sampling-points', SamplingPoints);