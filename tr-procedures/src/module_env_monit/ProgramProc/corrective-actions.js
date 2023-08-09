import { html, css, nothing } from 'lit';
import { CoreView } from './../../components/core-view';
import { Alignment, Layouts } from '@collaborne/lit-flexbox-literals';
import { columnBodyRenderer } from 'lit-vaadin-helpers';

import {DialogsFunctions} from '../../components/GenericDialogs/DialogsFunctions';

let thisTabViewDefinition = {
  "title": {
    label_en:'Program Active Corrective Actions', 
    label_es:'Acciones correctivas aún activas del programa'
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
    "result_id": {
      "label_en": "Result", "label_es": "Resultado", "sort": false, "filter": true, "width": "10%"
    },
    "created_on": {
      "label_en": "Creation", "label_es": "Creada", "sort": true, "filter": false, "width": "15%"
    },
    "location_name": {
      "label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true, "width": "15%"
    },
    "method_name": {
      "label_en": "Method", "label_es": "Método", "sort": false, "filter": true, "width": "10%"
    },
    "spec_eval_detail": {
      "label_en": "Problem Detail", "label_es": "Detalle del Problema", "sort": false, "filter": true, "width": "30%"
    },
    "spec_rule_with_detail": {
      "label_en": "Spec Rule", "label_es": "Especificación", "sort": false, "filter": true, "width": "10%"
    }
  }
}
let actions = []
let actionswww = [
  {
    "actionName": "PROGRAMS_CORRECTIVE_ACTION_LIST",
    "clientMethod": "getCorrectiveList",
    "button": {
      "icon": "refresh",
      "title": {
        "label_en": "Reload", "label_es": "Recargar"
      },
      "whenDisabled": "samplesReload"
    },
    "subAction": {
      "actionName": "OPEN_INVESTIGATIONS",
      "clientMethod": "openInvestigations",
      "endPoint": "/frontend/InvestigationAPIfrontend"
    }
  },
  {
    "actionName": "CORRECTIVE_ACTION_COMPLETE",
    "clientMethod": "correctiveComplete",
    "button": {
      "title": {
        "label_en": "Complete", "label_es": "Concluir"
      },
      "whenDisabled": "selectedItems"
    },
  }
]

export class CorrectiveActions extends DialogsFunctions(CoreView) {
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
      windowOpenable: { type: String },
      sopsPassed: { type: Boolean }
    };
  }

  constructor() {
    super()
    this.selectedItems = []
    //this.selectedAction = actions[0]
  }

  //${this.getButton()}
  tabView() {
    return html`
      <div class="layout horizontal flex wrap">
        <div class="layout flex">
          <h1>${thisTabViewDefinition.title["label_"+this.lang]}</h1>
          <div class="layout horizontal center flex wrap">
            
          </div>
          <vaadin-grid theme="row-dividers" column-reordering-allowed multi-sort 
            @active-item-changed=${e=>this.selectedItems=e.detail.value ? [e.detail.value] : []}
            .selectedItems="${this.selectedItems}">
            ${this.gridList()}
          </vaadin-grid>
        </div>
      </div>
    `;
  }

  get grid() {
    return this.shadowRoot.querySelector("vaadin-grid")
  }
  
  xgetButton() {
    return html`
      ${actions.map(action =>
        html`${action.button ?
          html`${action.button.icon ?
            html`<mwc-icon-button 
              class="${action.button.class}"
              icon="${action.button.icon}" 
              title="${action.button.title['label_'+this.lang]}" 
              ?disabled=${this.btnDisabled(action)}
              @click=${()=>this.actionMethod(action)}></mwc-icon-button>` :
            html`<mwc-button dense raised 
              label="${action.button.title['label_'+this.lang]}" 
              ?disabled=${this.btnDisabled(action)}
              @click=${()=>this.actionMethod(action)}></mwc-button>`
          }` :
          nothing
        }`
      )}
    `
  }

  btnDisabled(action) {
    let d = false
    if (this.sopsPassed == false) {
      if (this.windowOpenable == "yes") {
        d = action.button.whenDisabled == "samplesReload" ? this.samplesReload : true
      }
    } else {
      d = action.button.whenDisabled == "samplesReload" ? this.samplesReload : !this.selectedItems.length
    }
    return d
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

  getCorrectiveList() {
    this.samplesReload = true
    this.reqParams.programName = this.selectedProgram.name
    let params = this.config.backendUrl + this.config.frontEndEnvMonitUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(j => {
      if (j && !j.is_error) {
        if (this.selectedAction.subAction) {
          this.actionMethod(this.selectedAction.subAction)
          this.grid.items = j
        }
      }
    })
  }

  openInvestigations() {
    return
    let params = this.config.backendUrl + this.selectedAction.endPoint  
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(j => {
      this.samplesReload = false
      this.selectedAction = actions[0]
      this.requestUpdate()
    })
  }

  setView() {
    return
    //this.actionMethod(this.selectedAction)
  }
}
customElements.define('corrective-actions', CorrectiveActions);