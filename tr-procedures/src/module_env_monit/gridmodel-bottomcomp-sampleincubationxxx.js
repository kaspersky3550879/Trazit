import { html, css, nothing } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import { columnBodyRenderer } from 'lit-vaadin-helpers';
//import { ClientMethod } from '../ClientMethod';
//import { DialogTemplate } from '../DialogTemplate';
import '../components/Audit/audit-dialog';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
export class GridmodelBottomcompSampleincubationxxx extends ((CredDialog)) {
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
      model: { type: Object },
      config: { type: Object },
      procName: { type: String },
      viewName: { type: String },
      filterName: { type: String },
      langConfig: { type: Object },
      actions: { type: Array },
      samplesReload: { type: Boolean },
      selectedItems: { type: Array },
      selectedAction: { type: Object },
      batchName: { type: String },
      gridItems: { type: Array },
      filteredItems: { type: Array },
      windowOpenable: { type: String },
      sopsPassed: { type: Boolean },
      stucksList: { type: Array },
      stuckNum: { type: Number }
    };
  }

  constructor() {
    super()
    this.samplesReload = true
    this.assignList = []
    this.gridItems = []
    this.filteredItems = []
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
    this.actions = this.model.actions
    this.selectedAction = this.model.actions[0]
  }

  render() {
    console.log('gridmodel-bottomcom-sampleincubation >> render', this.selectedItems)
    return html`${this.model ? 
      html`
      <div class="layout horizontal flex wrap">
        <div class="layout flex">
          ${this.getTitle()}
          ${this.filteredItems.length}
          <div class="layout horizontal center flex wrap">
            ${this.getButton()}
          </div>
          <vaadin-grid id="absractGrid" theme="row-dividers" column-reordering-allowed multi-sort 
            .items=${this.filteredItems}
            @active-item-changed=${this.selectItem}
            .selectedItems="${this.selectedItems}">
            ${this.gridList()}
          </vaadin-grid>
        </div>
        ${this.langConfig&&this.filterName=="active_batches" ? 
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
          ` : ``
        }
        <audit-dialog @sign-audit=${this.setAudit}></audit-dialog>
        ${super.render()}
      </div>
      ` : 
      nothing
    }
    `;
  }
//  ${this.newBatchTemplate()}
//  ${this.assignTemplate()}
//:
  //  html`${this.sampleStuckTemplate()}`

  selectItem(e) {
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

  get grid() {return this.shadowRoot.querySelector("vaadin-grid#absractGrid")}

  authorized() {
    super.authorized()
    // whether user has access into the selected proc
    let procList = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures
    this.audit.updateComplete.then(() => {
      let whichProc = procList.filter(p => p.procInstanceName == this.procName)
      if (whichProc.length) {
        this.audit.sampleAuditRevisionMode = whichProc[0].audit_sign_mode.sampleAuditRevisionMode == "DISABLE" ? false : true
        this.audit.sampleAuditChildRevisionRequired = whichProc[0].audit_sign_mode.sampleAuditChildRevisionRequired == "FALSE" ? false : true
      }
    })
  }

  reload() {
    this.resetDialogThings()
    this.selectedAction = this.model.actions[0]
    this.actionMethod(this.selectedAction)
  }

  resetDialogThings() {
    this.itemId = null
    this.targetValue = {}
    this.selectedResults = []
    this.selectedAssigns = []
    this.selectedStucks = []
    this.selectedDialogAction = null
  }

  reloadDialog() {
    this.resetDialogThings()
    this.actionMethod(this.selectedAction)
  }

  actionMethod(action, replace = true) {
    if (replace) {
      this.selectedAction = action
    }
    if (action.dialogInfo) {
      if (action.dialogInfo.automatic) {
        if (this.itemId) {
          this.credsChecker(action.actionName, this.itemId, this.jsonParam(), action)
        } else {
          this.credsChecker(action.actionName, this.selectedItems[0].sample_id, this.jsonParam(), action)
        }
      } else {
        this[action.dialogInfo.name].show()
      }
    } else {
      if (this.selectedItems.length) {
        this.credsChecker(action.actionName, this.selectedItems[0].sample_id, this.jsonParam(), action)
      } else {
        this.credsChecker(action.actionName, null, this.jsonParam(), action)
      }
    }
  }

  getButton() {
    return html`
      ${this.actions&&this.actions.map(action =>
        html`${action.button ?
          html`${action.button.icon ?
            html`${action.actionName ?
              html`<mwc-icon-button style="color:${action.button.color}"
                class="${action.button.class}"
                icon="${action.button.icon}" 
                title="${action.button.title['label_'+this.lang]}${action.button.title.extra ? ` (${this[action.button.title.extra]})` : null}" 
                ?disabled=${this.btnDisabled(action)}
                ?hidden=${action.button.whenHidden&&!this[action.button.whenHidden]}
                @click=${()=>this.actionMethod(action)}></mwc-icon-button>` :
              html`<mwc-icon-button style="color:${action.button.color}" 
                class="${action.button.class}"
                icon="${action.button.icon}" 
                title="${action.button.title['label_'+this.lang]}" 
                ?disabled=${this.btnDisabled(action)}
                @click=${()=>this[action.clientMethod](action.filterState)}></mwc-icon-button>`
            }` :
            html`${action.button.img ?
              html`<mwc-icon-button class="${action.button.class} img" 
                title="${action.button.title['label_'+this.lang]}"
                ?disabled=${this.btnDisabled(action)}
                @click=${()=>this[action.clientMethod](action.filterState)}>
                  <img class="iconBtn" src="/images/${action.button.img}">
                </mwc-icon-button>` :
              html`<mwc-button dense raised 
                label="${action.button.title['label_'+this.lang]}" 
                ?disabled=${this.btnDisabled(action)}
                @click=${()=>this.actionMethod(action)}></mwc-button>`
            }`
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
        d = action.button.whenDisabled == "samplesReload" && action.button.title.label_en == "Reload" ? this.samplesReload : true
      }
    } else {
      d = action.button.whenDisabled == "samplesReload" ? 
        this.samplesReload : 
        (this.selectedItems.length ?
          action.button.disabledBEState&&this.selectedItems[0][action.button.disabledBEState] ? 
            true :
            false
          : true)
    }
    return d
  }

  filterSamples(state) {
    if (state == "not_in_batch") {
      this.filteredItems = this.gridItems.filter(item => !item.incubation_batch)
    } else if (state == "in_batch_1") {
      this.filteredItems = this.gridItems.filter(item => item.incubation_batch && !item.incubation_start)
    } else if (state == "progress_1") {
      this.filteredItems = this.gridItems.filter(item => item.incubation_batch && item.incubation_start && !item.incubation_end)
    } else if (state == "done") {
      this.filteredItems = this.gridItems.filter(item => item.incubation_end && !item.incubation2_batch)
    } else if (state == "in_batch_2") {
      this.filteredItems = this.gridItems.filter(item => item.incubation2_batch && !item.incubation2_start)
    } else if (state == "progress_2") {
      this.filteredItems = this.gridItems.filter(item => item.incubation2_batch && item.incubation2_start && !item.incubation2_end)
    } else {
      this.filteredItems = this.gridItems
    }
  }

  nextRequest() {
    super.nextRequest()
    this.reqParams = {
      procInstanceName: this.procName,
      ...this.reqParams
    }
    let action = this.selectedDialogAction ? this.selectedDialogAction : this.selectedAction
    this[action.clientMethod]()
  }

  dialogAccept(selected=true) {
    if (selected) {
      this.credsChecker(this.selectedAction.actionName, this.selectedItems[0].sample_id, this.jsonParam(this.selectedAction), this.selectedAction)
    } else {
      this.credsChecker(this.selectedAction.actionName, null, this.jsonParam(this.selectedAction), this.selectedAction)
    }
  }

  jsonParam() {
    let jsonParam = {}
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

  
  setGrid(j) {
    // updating grid of samples_stillIncubationStageAndBothIncubCompleted
    if (this.siGrid) {
      if (j) {
        if (j.samples_stillIncubationStageAndBothIncubCompleted && j.samples_stillIncubationStageAndBothIncubCompleted.length) {
          this.stucksList = j.samples_stillIncubationStageAndBothIncubCompleted
          this.stuckNum = this.stucksList.length
          this.siGrid.items = j.samples_stillIncubationStageAndBothIncubCompleted
        } else {
          this.stucksList = null
          this.siGrid.items = []
        }
      } else {
        this.stucksList = null
        this.siGrid.items = []
      }
      this.selectedStucks = []
    }
    this.dispatchEvent(new CustomEvent('set-grid', { detail: j }))
  }

  gridList() {
    if (this.langConfig && JSON.stringify(this.langConfig) == JSON.stringify(this.model.langConfig)) {
      return Object.entries(this.langConfig.gridHeader).map(
        ([key, value], i) => html`
          ${this.langConfig.gridHeader[key].is_icon ?
            this.iconColumn(key, value, i) :
            this.nonIconColumn(key, value, i)
          }
        `
      )
    }
  }

  iconColumn(key, value, i) {
    return html`
      ${this.desktop ?
        html`
          <vaadin-grid-column class="${key}"
            header="${value['label_'+this.lang]}"
            ${columnBodyRenderer(this.iconRenderer)}
            text-align="center"
            width="${this.langConfig.gridHeader[key].width}" resizable 
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

  iconRenderer(sample, model, col) {
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

  nonIconColumn(key, value, i) {
    return html`${this.langConfig.gridHeader[key].sort ?
      this.sortColumn(key, value, i) :
      html`${this.langConfig.gridHeader[key].filter ? 
        html`${this.filterColumn(key, value, i)}` : 
        html`${this.commonColumn(key, value, i)}`
      }`
    }`
  }

  sortColumn(key, value, i) {
    return html`
      ${this.desktop ?
        html`
          ${i==0 ?
            html`${this.langConfig.gridHeader[key].width ?
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                width="${this.langConfig.gridHeader[key].width}" resizable text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`:
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
            }` :
            html`${this.langConfig.gridHeader[key].width ?
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                width="${this.langConfig.gridHeader[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>` :
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
            }`
          }
        ` :
        html`<vaadin-grid-sort-column width="65px" resizable 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          text-align="${this.langConfig.gridHeader[key].align ? this.langConfig.gridHeader[key].align : 'end' }"
          path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
      }
    `
  }

  filterColumn(key, value, i) {
    return html`
      ${this.desktop ?
        html`
          ${i==0 ?
            html`${this.langConfig.gridHeader[key].width ?
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                width="${this.langConfig.gridHeader[key].width}" resizable text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
            }` :
            html`${this.langConfig.gridHeader[key].width ?
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                width="${this.langConfig.gridHeader[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
            }`
          }
        ` :
        html`<vaadin-grid-filter-column width="65px" resizable 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          text-align="${this.langConfig.gridHeader[key].align ? this.langConfig.gridHeader[key].align : 'end' }"
          path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
      }
    `
  }

  commonColumn(key, value, i) {
    return html`
      ${this.desktop ?
        html`
          ${i==0 ?
            html`${this.langConfig.gridHeader[key].width ?
              html`<vaadin-grid-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                width="${this.langConfig.gridHeader[key].width}" resizable text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`:
              html`<vaadin-grid-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`
            }` :
            html`${this.langConfig.gridHeader[key].width ?
              html`<vaadin-grid-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                width="${this.langConfig.gridHeader[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`:
              html`<vaadin-grid-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`
            }`
          }
        ` :
        html`<vaadin-grid-column 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          width="65px" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`
      }
    `
  }

  isConfidential(sample, key) {
    if (this.langConfig.gridHeader[key].confidential_value&&sample[key]) {
      return html`*****`
    } else {
      return html`${sample[key]}`
    }
  }

  xgetTitle() {    
    if (this.model.langConfig&&this.model.langConfig.title) {
      return html`<h1>${this.model.langConfig.title["label_"+this.lang]}</h1>`
    }
  }
  get batchElement() {return this.shadowRoot.querySelector("gridmodel-bottomcomp-sampleincubationxxx#active_batches")}
  get incubElement() {return this.shadowRoot.querySelector("gridmodel-bottomcomp-sampleincubationxxx#samplesWithAnyPendingIncubation")}

}
window.customElements.define('gridmodel-bottomcomp-sampleincubationxxx', GridmodelBottomcompSampleincubationxxx);