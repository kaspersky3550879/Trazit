import { html, css, nothing } from 'lit';
import { CoreView } from './../../components/core-view';
import { Alignment, Layouts } from '@collaborne/lit-flexbox-literals';
import { commonLangConfig } from '@trazit/common-core';

import {DialogsFunctions} from '../../components/GenericDialogs/DialogsFunctions';

let langConfig = {
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

export class SamplingPointsMap extends DialogsFunctions(CoreView) {
  static get styles() {
    return [Layouts, Alignment,
      super.styles,
      css`
        .mapWrap {
          position: relative;
          height: 1040px;
          width: 850px;
        }
        .mapWrap .mapImg {
          width: 100%;
        }
        .mapWrap .mapIcon {
          position: absolute;
          cursor: pointer;
        }
      `
    ];
  }

  static get properties() {
    return {
      samplePoints: { type: Array },
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
    this.samplePoints = []
    this.selectedItems = []
    this.selectedProgram = []
    return
    this.selectedAction = actions[0]
  }

  tabView() {
    return html`
      <div class="layout horizontal flex wrap">
        <div class="layout flex">
          <h1>${langConfig.title["label_"+this.lang]}</h1>
          <div class="mapWrap">
            <img class="mapImg" src="/images/clean-room-example.png">
            ${this.samplePoints&&this.samplePoints.map(point => 
              html`<img class="mapIcon" 
                src="/images/${this.mapIcon(point.map_icon)}" 
                style="top:${point.map_icon_top};left:${point.map_icon_left};width:${point.map_icon_w}px;height:${point.map_icon_h}px"
                @mouseover=${()=>this.selectedItems=[point]}>`
            )}
          </div>
        </div>
        ${this.pointTemplate()}
      </div>
    `;
  }

  mapIcon(icon) {
    let path = icon.split("/")
    return path[path.length-1]
  }

  /** Point Template Dialog part */
  pointTemplate() {
    return html`
    <tr-dialog id="pointDialog" .open=${this.selectedItems&&this.selectedItems.length}
      @closed=${e=>{if(e.target===this.pointDialog)this.selectedItems=[]}}
      heading=""
      hideActions=""
      scrimClickAction="">
      <div class="layout vertical flex center-justified">
        <div class="layout horizontal justified flex">
          <sp-button size="m" variant="secondary" dialogAction="close">
            ${commonLangConfig.closeDialogButton["label_" + this.lang]}</sp-button>
          <sp-button size="m" @click=${this.setLogSample}>${langConfig.fieldText.logBtn["label_"+this.lang]}</sp-button>
        </div>
        <mwc-select label="${langConfig.fieldText.shift["label_"+this.lang]}" id="shift">
          ${langConfig.fieldText.shift.items.map((c,i) => 
            html`<mwc-list-item value="${c.keyName}" ?selected=${i==0}>${c["keyValue_"+this.lang]}</mwc-list-item>`
          )}
        </mwc-select>
        <mwc-select label="${langConfig.fieldText.lot["label_"+this.lang]}" id="lot">
          ${langConfig.fieldText.lot.items.map((c,i) => 
            html`<mwc-list-item value="${c.lot_name}" ?selected=${i==0}>${c.lot_name}</mwc-list-item>`
          )}
        </mwc-select>
        ${this.selectedItems.length&&this.selectedItems[0].card_info.map(f => 
          html`<mwc-textfield label=${f['label_'+this.lang]} name=${f.name} type=${f.type} value=${f.value}></mwc-textfield>`
        )}
      </div>
    </tr-dialog>
    `
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


  jsonParam() {
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

  setView() {
    this.samplePoints = []
    this.selectedItems = []
    if (this.selectedProgram===undefined){return}
    this.samplePoints = this.selectedProgram.sample_points
    return
    this.selectedAction = actions[0]
    this.actionMethod(this.selectedAction.subAction)
  }
}
customElements.define('sampling-points-map', SamplingPointsMap);