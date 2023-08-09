import { html, nothing } from 'lit';
import { columnBodyRenderer, gridRowDetailsRenderer } from 'lit-vaadin-helpers';
import { commonLangConfig } from '@trazit/common-core';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';

export function DialogTemplate(base) {
  return class extends base {
    static get properties() {
      return {
        selectedResults: { type: Array },
        enterResults: { type: Array },
        microorganismList: { type: Array },
        selectedAssigns: { type: Array },
        assignList: { type: Array },
        targetValue: { type: Object },
        selectedDialogAction: { type: Object },
        lotDays: { type: Number },
        deactivatedLots: { type: Array },
        openInvests: { type: Array },
        selectedInvestigations: { type: Array },
        capaRequired: { type: Boolean },
        selectedStucks: { type: Array },
        dataForDialog: { type: Object },
        familyList: { type: Array },
        microName: { type: String },
        fromGrid: { type: Boolean }
      }
    }

    constructor() {
      super()
      this.lotDays = 7
      this.deactivatedLots = []
      this.microorganismList = []
      this.familyList = []
      this.capaRequired = false
      this.fromGrid = false
    }

    /** Date Template Dialog part */
    dateTemplate() {
      return html`
      <tr-dialog id="dateDialog" 
        @closed=${() => this.dateInput.value = ""}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <input id="dateInput" 
            type="datetime-local" dialogInitialFocus
            @keypress=${e => e.keyCode == 13 && this.setNewDate()}>
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" @click=${this.setNewDate}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `
    }

    get dateDialog() {
      return this.shadowRoot.querySelector("tr-dialog#dateDialog")
    }

    get dateInput() {
      return this.shadowRoot.querySelector("input#dateInput")
    }

    setNewDate() {
      if (this.dateInput.value) {
        this.dialogAccept()
      }
    }

    /** Comment Template Dialog part */
    commentTemplate() {
      return html`
      <tr-dialog id="commentDialog" 
        @closed=${() => this.commentInput.value = ""}
        heading=""
        hideActions=""
        scrimClickAction="">
        ${!this.selectedAction.dialogInfo ?
        html`ggg`: html`        
          <div class="layout vertical flex center-justified">
            <mwc-textfield id="commentInput" label="${this.selectedAction.dialogInfo.fieldText && this.selectedAction.dialogInfo.fieldText.comment["label_" + this.lang]}" 
              dialogInitialFocus
              @keypress=${e => e.keyCode == 13 && this.addComment()}></mwc-textfield>
            <div style="margin-top:30px;text-align:center">
              <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
                ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
              <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.addComment}>
                ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
            </div>
          </div>
        `}        
      </tr-dialog>
      `
    }

    get commentDialog() {
      return this.shadowRoot.querySelector("tr-dialog#commentDialog")
    }

    get commentInput() {
      return this.shadowRoot.querySelector("mwc-textfield#commentInput")
    }

    addComment() {
      if (this.commentInput.value) {
        this.dialogAccept()
      }
    }

    /** Enter Result Template Dialog part */
    resultTemplate() {
      //console.log('this.enterResults', this.enterResults)
      return html`
      <tr-dialog id="resultDialog" ?open=${this.enterResults.length}
        @opened=${() => this.setCellListener()}
        @closing=${() => this.removeEvents()}
        heading=""
        hideActions=""
        scrimClickAction="">
        ${this.selectedSamples.length ?
          html`<label slot="topLeft" style="font-size:12px">${this.langConfig.resultHeaderObjectLabelTopLeft["label_" + this.lang]} ${this.selectedSamples[0].sample_id || this.selectedSamples[0].id}</label>` : nothing
        }
        <vaadin-grid id="erGrid" theme="row-dividers" column-reordering-allowed multi-sort
          .items=${this.enterResults}
          @selected-items-changed=${e => {
          if (this.selectedAction.actionName == "INSTRUMENT_EVENT_VARIABLES") {
            this.selectedResults = []
          } else {
            this.selectedResults = e.detail.value
          }
        }}
          .detailsOpenedItems=${this.selectedResults}
          ${gridRowDetailsRenderer(this.detailRenderer)}>
          ${this.desktop ?
          html`<vaadin-grid-selection-column header="" flex-grow="1"></vaadin-grid-selection-column>` :
          html`<vaadin-grid-selection-column header="" width="65px" resizable ></vaadin-grid-selection-column>`
        }
          ${this.selectedAction.actionName == "INSTRUMENT_EVENT_VARIABLES" ?
          html`${this.instrumentEventList()}` :
          html`${this.enterResultList()}`
        }
        </vaadin-grid>
        <div id="rowTooltip">&nbsp;</div>
      </tr-dialog>
      <tr-dialog id="uomConvertionDialog" ?open=${this.dataForDialog}
        heading="UOM Convertion List"
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <select @change=${e => this.setUOM(this.dataForDialog.result_id, e.target.value)}>
            ${this.dataForDialog && this.dataForDialog.ucm.map(u =>
          html`<option value=${u} ?selected=${u == this.dataForDialog.uom}>${u}</option>`
        )}
          </select>
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `
    }

    get rowTooltip() {
      return this.shadowRoot.querySelector("#rowTooltip")
    }

    get uomDialog() {
      return this.shadowRoot.querySelector("tr-dialog#uomConvertionDialog")
    }

    setCellListener() {
      if (this.selectedAction.actionName == "INSTRUMENT_EVENT_VARIABLES") {
        // 
      } else {
        this.rowTooltip.style.display = "block"
        this.rowTooltip.style.visibility = "hidden"
        this.rowTooltip.style.fontSize = "12px"
        this.rowTooltip.style.color = "white"
        let rows = this.erGrid.shadowRoot.querySelectorAll("tr[part=row]")
        rows.forEach((r, i) => {
          if (i > 0 && this.enterResults[i - 1]) {
            r.removeEventListener('mouseenter', () => this.showLockReason(i))
            r.removeEventListener('mouseleave', this.hideLockReason.bind(this))
          }
          if (i > 0 && this.enterResults[i - 1] && (this.enterResults[i - 1].is_locked || this.enterResults[i - 1].warning_reason)) {
            r.addEventListener('mouseenter', () => this.showLockReason(i))
            r.addEventListener('mouseleave', this.hideLockReason.bind(this))
          }
        })
      }
    }

    showLockReason(i) {
      let labels = {
        "warning_reason_label_en": "Warning Reason", "warning_reason_label_es": "Razón Aviso",
        "locking_reason_label_en": "Locking Reason", "locking_reason_label_es": "Razón Bloqueo"
      }
      if (this.enterResults[i - 1].is_locked) {
        this.rowTooltip.style.backgroundColor = "rgb(255 8 8)"
        this.rowTooltip.style.visibility = "visible"
        this.rowTooltip.textContent = labels['locking_reason_label_' + this.lang] + ": " + (this.enterResults[i - 1].locking_reason["message_" + this.lang])
      } else if (this.enterResults[i - 1].warning_reason) {
        this.rowTooltip.style.backgroundColor = "#0085ff"
        this.rowTooltip.style.visibility = "visible"
        this.rowTooltip.textContent = labels['warning_reason_label_' + this.lang] + ": " + this.enterResults[i - 1].warning_reason["message_" + this.lang]
      }
    }

    hideLockReason() {
      this.rowTooltip.style.visibility = "hidden"
    }

    removeEvents() {
      if (this.selectedAction.actionName == "INSTRUMENT_EVENT_VARIABLES") {
        // 
      } else {
        this.rowTooltip.textContent = ""
        this.rowTooltip.style.visibility = "hidden"
        let rows = this.erGrid.shadowRoot.querySelectorAll("tr[part=row]")
        rows.forEach((r, i) => {
          if (i > 0 && this.enterResults[i - 1] && this.enterResults[i - 1].is_locked) {
            r.removeEventListener('mouseenter', this.showLockReason.bind(this))
            r.removeEventListener('mouseleave', this.hideLockReason.bind(this))
          }
        })
      }
      this.curResultRef = undefined
      this.enterResults = []
    }

    detailRenderer(result) {
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
          html`<p style="color:rgb(255 8 8)">${labels['locking_reason_label_' + this.lang]}: ${result.locking_reason["message_" + this.lang]}</p>` : nothing
        }
          ${result.warning_reason ?
          html`<p style="color:#0085ff">${labels['warning_reason_label_' + this.lang]}: ${result.warning_reason["message_" + this.lang]}</p>` : nothing
        }
        </div>
      `
    }

    enterResultList() {
      //alert(this.selectedAction.actionName)
      return Object.entries(this.langConfig.resultHeader).map(([key, value], i) =>
        html`
          ${this.desktop ?
            html`
              ${i == 0 ?
                html`<vaadin-grid-column 
                  ${columnBodyRenderer(this.specRenderer)}
                  text-align="center" 
                  flex-grow="0"
                  path="${key}" 
                  header="${value['label_' + this.lang]}"></vaadin-grid-column>` :
                  html`${key == "raw_value" ?
                    html`<vaadin-grid-column 
                      ${columnBodyRenderer(this.valRenderer)}
                      text-align="center" 
                      resizable 
                      width="130px"
                      path="${key}" 
                      header="${value['label_' + this.lang]}"></vaadin-grid-column>` 
                    :
                    html`${key == "sar2_raw_value" ?
                      html`<vaadin-grid-column 
                        ${columnBodyRenderer(this.valRenderer)}
                        text-align="center" 
                        resizable 
                        width="130px"
                        path="${key}" 
                        header="${value['label_' + this.lang]}"></vaadin-grid-column>` 
                      :
                      html`${key == "uom" ?
                        html`<vaadin-grid-column ${columnBodyRenderer(this.uomRenderer)} resizable flex-grow=1 text-align='center' path="${key}" header="${value['label_' + this.lang]}"></vaadin-grid-column>` 
                      :
                        html`<vaadin-grid-column resizable flex-grow=1 path="${key}" header="${value['label_' + this.lang]}"></vaadin-grid-column>`
                      }`
                    }`
                  }`
              }
            ` :
            html`
              ${i == 0 ?
                html`<vaadin-grid-column 
                  ${columnBodyRenderer(this.specRenderer)}
                  width="65px" resizable 
                  path="${key}" 
                  header="${value['label_' + this.lang]}"></vaadin-grid-column>` :
                html`${key == "raw_value" ?
                  html`<vaadin-grid-column 
                    ${columnBodyRenderer(this.valRenderer)}
                    width="130px" resizable 
                    path="${key}" 
                    header="${value['label_' + this.lang]}"></vaadin-grid-column>` 
                  :
                  html`${key == "sar2_raw_value" ?
                    html`<vaadin-grid-column 
                      ${columnBodyRenderer(this.valRenderer)}
                      text-align="center" 
                      resizable 
                      width="130px"
                      path="${key}" 
                      header="${value['label_' + this.lang]}"></vaadin-grid-column>` 
                  :                  
                  html`${key == "uom" ?
                    html`<vaadin-grid-column ${columnBodyRenderer(this.uomRenderer)} resizable width="65px" path="${key}" header="${value['label_' + this.lang]}"></vaadin-grid-column>` 
                  :
                    html`<vaadin-grid-column resizable width="65px" path="${key}" header="${value['label_' + this.lang]}"></vaadin-grid-column>`
                    }`
                  }`
                }`
              }
            `
          }
        `
      )
    }

    instrumentEventList() {
      return Object.entries(this.langConfig.resultHeader).map(([key, value], i) =>
        html`
          ${this.desktop ?
            html`
              ${key == "value" ?
                html`<vaadin-grid-column 
                  ${columnBodyRenderer(this.valRendererInstrument)}
                  text-align="center" 
                  width="130px"
                  path="${key}" 
                  header="${value['label_' + this.lang]}"></vaadin-grid-column>` :
                html`<vaadin-grid-column resizable flex-grow=1 path="${key}" header="${value['label_' + this.lang]}"></vaadin-grid-column>`
              }
            ` :
            html`
              ${key == "value" ?
                html`<vaadin-grid-column 
                  ${columnBodyRenderer(this.valRendererInstrument)}
                  width="130px" resizable
                  path="${key}" 
                  header="${value['label_' + this.lang]}"></vaadin-grid-column>` :
                html`<vaadin-grid-column resizable width="65px" path="${key}" header="${value['label_' + this.lang]}"></vaadin-grid-column>`
              }
            `
          }
        `
      )
    }

    specRenderer(result) {
      if (result.spec_eval) {
        if (result.spec_eval == 'IN') {
          return html`<mwc-icon style="color:green">radio_button_checked</mwc-icon>`
        } else {
          if (result.spec_eval.toUpperCase().includes("OUT") && result.spec_eval.toUpperCase().includes("SPEC")) {
            return html`<mwc-icon style="color:red">radio_button_checked</mwc-icon>`
          } else {
            return html`<mwc-icon style="color:orange">radio_button_checked</mwc-icon>`
          }
        }
      } else {
        return html`<img style="height:24px; width: 24px;" src="https://upload.wikimedia.org/wikipedia/commons/9/96/Button_Icon_White.svg">`
      }
    }

    valRenderer(result) {
      var rawValue=''
      if (this.selectedAction.actionName.toUpperCase().includes('SECOND')){
        rawValue = result.sar2_raw_value
      }else{
        rawValue = result.raw_value
      }
      if (result.is_locked) {
        return html`
          <div style="width: 100%;height: 55px;position: relative; background-color: rgb(255 8 8 / 20%)">
            <div style="width: 100%;text-align:center; margin: 0;position: absolute;top: 50%;-ms-transform: translateY(-50%);transform: translateY(-50%);">${result.raw_value}</div>
          </div>
        `
      } else {
        if (result.param_type.toUpperCase() == "TEXT" || result.param_type == "qualitative") {
          return html`<input class="enterResultVal" type="text" .value=${rawValue} 
            ?disabled=${this.selectedAction.dialogInfo.readOnly}
            @keydown=${e => e.keyCode == 13 && this.setResult(result, e.target)}>`
        } else if (result.param_type.toUpperCase().indexOf("LIST") > -1) {
//console.log('valRenderer', 'result', result)
          let lEntry = ('|'+result.list_entry).split("|")
          return html`
            ${result.param_type.toUpperCase() == "TEXTLIST" ?
              html`
                <input class="enterResultVal" list="listEntry${result.result_id}" 
                  .value=${rawValue}
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
                    html`<option value="${l}" ?selected=${l==rawValue}>${l}`
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

    valRendererInstrument(result) {
      if (result.is_locked) {
        return html`
          <div style="width: 100%;height: 55px;position: relative; background-color: rgb(255 8 8 / 20%)">
            <div style="width: 100%;text-align:center; margin: 0;position: absolute;top: 50%;-ms-transform: translateY(-50%);transform: translateY(-50%);">${result.raw_value}</div>
          </div>
        `
      } else {
        if (result.param_type.toUpperCase() == "TEXT" || result.param_type == "qualitative") {
          return html`<input class="enterResultVal" type="text" .value=${result.value} 
            ?disabled=${this.selectedAction.dialogInfo.readOnly}
            @keydown=${e => e.keyCode == 13 && this.setResultInstrument(result, e.target)}>`
        } else if (result.param_type.toUpperCase().indexOf("LIST") > -1) {
          let lEntry = result.allowed_values.split("|")
          return html`
            ${result.param_type.toUpperCase() == "TEXTLIST" ?
              html`
                <input class="enterResultVal" list="listEntry${result.result_id}" 
                  .value=${result.value}
                  @keydown=${e => e.keyCode == 13 && this.setResultInstrument(result, e.target)}>
                <datalist id="listEntry${result.result_id}">
                  ${lEntry.map(l =>
                    html`<option value="${l}">${l}`
                  )}
                </datalist>
              ` :
              html`
                <select class="enterResultVal" @change=${e => this.setResultInstrument(result, e.target)}>
                  ${lEntry.map(l =>
                    html`<option value="${l}" ?selected=${l==result.value}>${l}`
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
              .value=${result.value} 
              @input=${e=>this.setValidVal(e, result)}
              @keydown=${e => e.keyCode == 13 && this.setResultInstrument(result, e.target)}>
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
              .value=${result.value}
              @input=${e=>this.setValidVal(e, result)}
              @keydown=${e => e.keyCode == 13 && this.setResultInstrument(result, e.target)}>
          `
        }
      }
    }

    setValidVal(e, result) {
      if (typeof result.min_allowed == 'number' && e.target.value < result.min_allowed) {
        e.target.value = result.min_allowed
        return
      }
      if (typeof result.max_allowed == 'number' && e.target.value > result.max_allowed) {
        e.target.value = result.max_allowed
        return
      }
      // make sure the decimal length <= max_dp when manual input
      if (result.max_dp) {
        let v = e.target.value.split(".")
        if (v.length > 1 && v[1].length > result.max_dp) {
          v[1] = v[1].substring(0, result.max_dp)
          e.target.value = Number(v.join("."))
        }
      }
    }

    /**
     * if min/max_undetermined defined, do this method
     * for example max_undetermined = 10, set the value to be 10 when users input the field > 10
     * add operator ">" or "<" to describe it
     * @param {*} result the active result
     * @param {*} elmSet which element field, optional for update the field value after action api
     */
    adjustValUndetermined(result, elmSet) {
      let lbl = "", raw = ""
      if (result.raw_value != "") {
        raw = result.raw_value
        if (typeof result.min_undetermined == "number") {
          if (Number(result.raw_value) < result.min_undetermined) {
            lbl = "<"
            raw = result.min_undetermined
          } else if (typeof result.max_undetermined == "number") {
            if (Number(result.raw_value) > result.max_undetermined) {
              lbl = ">"
              raw = result.max_undetermined
            }
          }
        } else if (typeof result.max_undetermined == "number") {
          if (Number(result.raw_value) > result.max_undetermined) {
            lbl = ">"
            raw = result.max_undetermined
          }
        }
      }
      this[result.param_type+''+result.result_id] = lbl
      if (elmSet) {
        elmSet.value = raw
      } else {
        return raw
      }
    }

    uomRenderer(result) {
      if (result.uom) {
        if (result.uom_conversion_mode) {
          let ucm = result.uom_conversion_mode.split("|")
          return html`<mwc-button 
            @click=${() => this.dataForDialog = { ucm, uom: result.uom, result_id: result.result_id }}
            ?disabled=${!result.raw_value} label="${result.uom}" icon="edit"></mwc-button>`
        }
        return result.uom
      }
    }

    setUOM(resultId, newResultUom) {
      this.targetValue = { resultId, newResultUom }
      let actionIdx = this.selectedAction.dialogInfo.action.findIndex(a => a.clientMethod == "changeUOM")
      this.selectedDialogAction = this.selectedAction.dialogInfo.action[actionIdx]
      this.actionMethod(this.selectedDialogAction, false)
    }

    get erGrid() {
      return this.shadowRoot.querySelector("vaadin-grid#erGrid")
    }

    get resultDialog() {
      return this.shadowRoot.querySelector("tr-dialog#resultDialog")
    }

    get rItem() {
      return this.shadowRoot.querySelector("input[name=rItem]")
    }

    setResult(result, target) {
      var resId=''
      if (this.selectedAction.actionName.toUpperCase().includes('SECOND')){
        resId = result.sar2_result_id
      }else{
        resId = result.result_id
      }      
      let newValue = target.value
      this.targetValue = {
        rawValueResult: newValue,
        resultId: resId,
        eventId: result.event_id,
        instrumentName: result.instrument,
        variableName: result.param_name
      }
      // vaadin grid field rebinding doesn't work, so let's do manually
      // ClientMethod::getResult
      this.curResultRef = { elm: target, resId: result.result_id, evtId: result.event_id }
      let act = JSON.stringify(this.selectedAction.dialogInfo.action[0])
      this.selectedDialogAction = JSON.parse(act)
      var rawValue=''
      if (this.selectedAction.actionName.toUpperCase().includes('SECOND')){
        rawValue = result.sar2_raw_value
      }else{
        rawValue = result.raw_value
      }
      console.log('setResult', 'resId', resId, 'selectedDialogAction', this.selectedDialogAction)
      if (rawValue) {
        this.selectedDialogAction.actionName = "RE" + this.selectedDialogAction.actionName
        this.actionMethod(this.selectedDialogAction, false)
      } else {
        this.actionMethod(this.selectedDialogAction, false)
      }
    }
    setResultInstrument(result, target) {
      let newValue = target.value
      this.targetValue = {
        newValue: newValue,
        eventId: result.event_id,
        instrumentName: result.instrument,
        variableName: result.param_name
      }
      // vaadin grid field rebinding doesn't work, so let's do manually
      // ClientMethod::getResult
      this.curResultRef = { elm: target, resId: result.result_id, evtId: result.event_id }
      let act = JSON.stringify(this.selectedAction.dialogInfo.action[0])
      this.selectedDialogAction = JSON.parse(act)
      if (result.raw_value || result.value) {
        this.selectedDialogAction.actionName = "RE" + this.selectedDialogAction.actionName
        this.actionMethod(this.selectedDialogAction, false)
      } else {
        this.actionMethod(this.selectedDialogAction, false)
      }
    }

    /** Microorganism Template Dialog part */
    microorganismTemplate() {
      return html`
      <tr-dialog id="microorganismDialog" ?open=${this.microorganismList.length}
        @opened=${e => { if (e.target === this.microorganismDialog) this.fromGrid = false }}
        @closing=${e => { if (e.target === this.microorganismDialog) { this.microorganismList = []; this.reload(); } }}
        heading=""
        hideActions=""
        scrimClickAction="">
        ${this.selectedSamples.length ?
          html`<label slot="topLeft" style="font-size:12px">Sample ID: ${this.selectedSamples[0].sample_id}</label>` : nothing
        }
        <div class="layout vertical flex">
          ${this.selectedAction.clientMethod == "getMicroorganism" ?
          html`${this.viewForAdd()}` :
          html`${this.viewForRemove()}`
        }
        </div>
      </tr-dialog>
      `
    }

    viewForAdd() {
      return html`
        <mwc-textfield id="numMicroItems" label="${this.microName||'Microorganism Name'}" type="number" 
          .min=${this.getNumMicroItems()} 
          .value=${this.getNumMicroItems()}></mwc-textfield>

        <mwc-select id='mAdd' @change=${this.selectMicroItem}>
          <mwc-list-item value=''>-- Microorganism List --</mwc-list-item>
          ${this.microorganismList.map(m =>
            html`<mwc-list-item value=${m.name}>${m.name}</mwc-list-item>`
          )}
        </mwc-select>
        <sp-button id="mAddBtn" size="m" variant="cta" @click=${()=>this.setMicroorganism(false)}>
          ${this.selectedAction.dialogInfo.fieldText.addBtn["label_" + this.lang]}</sp-button>

        <mwc-textfield id="mAddHoc" label="${this.selectedAction.dialogInfo.fieldText.addhocInput['label_' + this.lang]}"
          @input=${this.inputAddhoc}></mwc-textfield>
        <sp-button id="mAddHocBtn" size="m" variant="secondary" @click=${()=>this.setMicroorganism()}>
          ${this.selectedAction.dialogInfo.fieldText.addhocBtn["label_" + this.lang]}</sp-button>

        <div id='microGrid'>
          <vaadin-grid theme="row-dividers" multi-sort
            .items=${this.gridDialogItems}
            @active-item-changed="${this.selectMicroOrg}">
            <vaadin-grid-sort-column resizable auto-width path="name" header="${this.langConfig.microorganismHeader.name['label_' + this.lang]}"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column resizable auto-width path="items" header="${this.langConfig.microorganismHeader.items['label_' + this.lang]}"></vaadin-grid-sort-column>
          </vaadin-grid>
        </div>
      `
    }

    selectMicroItem(e) {
      if (!this.fromGrid) {
        this.microGrid.activeItem = null
        this.microGrid.selectedItems = []
        this.microName = e.target.value
        if (this.microName) {
          this.mAddHoc.disabled = true
          this.mAddHocBtn.disabled = true
          this.mAddHoc.value = ''
        } else {
          this.mAddHoc.disabled = false
          this.mAddHocBtn.disabled = false
        }
      }
      this.fromGrid = false
    }

    inputAddhoc(e) {
      if (!this.fromGrid) {
        this.microGrid.activeItem = null
        this.microGrid.selectedItems = []
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        let name = e.target.value
        this.timeout = setTimeout(() => {
          this.microName = name
          if (this.microName) {
            this.mAdd.value = ''
            this.mAdd.disabled = true
            this.mAddBtn.disabled = true
          } else {
            this.mAdd.disabled = false
            this.mAddBtn.disabled = false
          }
        }, 300);
      }
      this.fromGrid = false
    }

    selectMicroOrg(e) {
      this.fromGrid = true
      // reset back the fromGrid because of async process
      const item = e.detail.value;
      // checking opened dialog, whether add or remove
      if (this.mAdd) {
        this.mAddHoc.disabled = false
        this.mAddHocBtn.disabled = false
        this.mAdd.disabled = false
        this.mAddBtn.disabled = false
        if (item) {
          let existItemList = this.microorganismList.filter(m => m.name == item.name)
          if (existItemList.length) {
            this.mAddHoc.disabled = true
            this.mAddHocBtn.disabled = true
            this.mAddHoc.value = ''
            this.mAdd.value = item.name
            this.mAdd.disabled = true
          } else {
            this.mAdd.disabled = true
            this.mAddBtn.disabled = true
            this.mAdd.value = ''
            this.mAddHoc.value = item.name
            this.mAddHoc.disabled = true
          }
        } else {
          this.mAdd.value = ''
          this.mAddHoc.value = ''
        }
      }
      this.microName = item ? item.name : '';
      e.target.selectedItems = item ? [item] : [];
    }

    getNumMicroItems() {
      let item = this.selectedSamples.length&&this.selectedSamples[0].microorganism_list_array.filter(m => m.name == this.microName)
      if (item.length) {
        return item[0].items + 1
      } else {
        return 1
      }
    }

    viewForRemove() {
      return html`
        <div id='microGrid'>
          <vaadin-grid theme="row-dividers" all-rows-visible multi-sort
            .items=${this.gridDialogItems}
            @active-item-changed="${this.selectMicroOrg}">
            <vaadin-grid-sort-column resizable auto-width path="name" header="${this.langConfig.microorganismHeader.name['label_' + this.lang]}"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column resizable auto-width path="items" header="${this.langConfig.microorganismHeader.items['label_' + this.lang]}"></vaadin-grid-sort-column>
          </vaadin-grid>
        </div>
        ${this.microGrid && this.microGrid.selectedItems.length ?
          html`
            <mwc-textfield id="numMicroItems" min=0 .max=${this.getNumMicroItems() - 2} label="${this.microGrid.selectedItems[0].name}" type="number" .value=${this.getNumMicroItems() - 2}></mwc-textfield>
          ` :
          nothing
        }
        <sp-button size="m" variant="cta" @click=${this.unsetMicroorganism}>
          ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
      `
    }

    get microorganismDialog() {
      return this.shadowRoot.querySelector("tr-dialog#microorganismDialog")
    }

    get mAdd() {
      return this.shadowRoot.querySelector("mwc-select#mAdd")
    }

    get mAddHoc() {
      return this.shadowRoot.querySelector("mwc-textfield#mAddHoc")
    }

    get microItems() {
      return this.shadowRoot.querySelector("mwc-textfield#numMicroItems")
    }

    get microGrid() {
      return this.shadowRoot.querySelector('div#microGrid vaadin-grid')
    }

    get mAddBtn() {
      return this.shadowRoot.querySelector("sp-button#mAddBtn")
    }

    get mAddHocBtn() {
      return this.shadowRoot.querySelector("sp-button#mAddHocBtn")
    }

    setMicroorganism(addhoc=true) {
      if (this.microName) {
        // get value from text input
        let totalItems = Number(this.microItems.value)
        // get value from text input
        if (addhoc) {
          this.selectedDialogAction = this.selectedAction.dialogInfo.action[1]
        // get value from selected item
        } else {
          this.selectedDialogAction = this.selectedAction.dialogInfo.action[0]
        }
        let item = this.gridDialogItems.filter(m => m.name == this.microName)
        if (item.length) {
          item = item[0].items
        } else {
          item = 0
        }
        let numItems = totalItems - item
        this.gridDialogItems.forEach(m => {
          if (m.name != this.microName) {
            totalItems += Number(m.items)
          }
        })

        if (Number(this.selectedSamples[0].raw_value) < totalItems) {
          this.dispatchEvent(new CustomEvent("error", {
            detail: {
              is_error: true,
              message_en: "This addition would be " + totalItems + " what is greater than the reading " + this.selectedSamples[0].raw_value + " what is not allowed.",
              message_es: "Está adición sumaría un total de " + totalItems + ", mayor a la lectura identificada, " + this.selectedSamples[0].raw_value + ", lo que no es permitido."
            },
            bubbles: true,
            composed: true
          }))
          console.log("This addition would be " + totalItems + " what is greater than the reading " + this.selectedSamples[0].raw_value + " what is not allowed.")
          return
        }
        this.targetValue = {
          microorganismName: this.microName,
          numItems: numItems
        }
        this.actionMethod(this.selectedDialogAction, false)
      }
    }

    unsetMicroorganism() {
      if (!this.microGrid.selectedItems.length) return
      this.targetValue = {
        microorganismName: this.microGrid.selectedItems[0].name,
        numItems: this.microGrid.selectedItems[0].items - this.microItems.value
      }
      this.microItems.hidden = true
      this.selectedDialogAction = this.selectedAction.dialogInfo.action[0]
      this.actionMethod(this.selectedDialogAction, false)
    }

    // checkMicroItems(name) {
    //   let existItem = this.selectedSamples[0].microorganism_list_array.filter(m => m.name == name)
    //   if (existItem.length) {
    //     this.dispatchEvent(new CustomEvent("error", {
    //       detail: {
    //         is_error: true,
    //         message_en: "The microorganism is already set, please select or input another name",
    //         message_es: "El microorganismo ya está configurado, seleccione o ingrese otro nombre"
    //       },
    //       bubbles: true,
    //       composed: true
    //     }))
    //     return "The microorganism is already set, please select or input another name"
    //   }
    // }

    /** Incubation Template Dialog part */
    newBatchTemplate() {      
      return html`
      <tr-dialog id="newBatchDialog" 
        @closed=${() => this.batchInput.value = ""}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <mwc-textfield id="batchInput" label="${this.langConfig && this.langConfig.fieldText.newBatch["label_" + this.lang]}" 
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

    get newBatchDialog() {
      return this.shadowRoot.querySelector("tr-dialog#newBatchDialog")
    }

    get batchInput() {
      return this.shadowRoot.querySelector("mwc-textfield#batchInput")
    }

    newBatch() {
      if (this.batchInput.value) {
        this.dialogAccept(false)
      }
    }

    assignTemplate() {
      return html`
      <tr-dialog id="assignDialog" ?open=${this.assignList.length}
        @closing=${() => this.assignList = []}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <div style="height:50vh;overflow:auto">
            <vaadin-grid id="asGrid" theme="row-dividers"
              @active-item-changed=${e => this.selectedAssigns = e.detail.value ? [e.detail.value] : []}
              .selectedItems="${this.selectedAssigns}" all-rows-visible>
              ${this.asList()}
            </vaadin-grid>
          </div>
          <div style="margin-top:30px;text-align:center;">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" @click=${this.setAssign}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `
    }

    asList() {
      if (this.langConfig) {
        return Object.entries(this.langConfig.assignHeader).map(([key, value], i) =>
          html`${i == 0 ?
            html`<vaadin-grid-column path="${key}" header="${value['label_' + this.lang]}"></vaadin-grid-column>` :
            html`<vaadin-grid-column resizable auto-width path="${key}" header="${value['label_' + this.lang]}"></vaadin-grid-column>`
            }`
        )
      }
    }

    get assignDialog() {
      return this.shadowRoot.querySelector("tr-dialog#assignDialog")
    }

    get asGrid() {
      return this.shadowRoot.querySelector("vaadin-grid#asGrid")
    }

    setAssign() {
      this.targetValue = {
        incubatorName: this.selectedAssigns[0].name,
        incubStage: this.selectedAssigns[0].stage
      }
      this.selectedDialogAction = this.selectedAction.dialogInfo.action[0]
      this.actionMethod(this.selectedDialogAction, false)
    }

    sampleStuckTemplate() {
      return html`
      <tr-dialog id="sampleStuckDialog" 
        heading=""
        hideActions=""
        scrimClickAction="">
        <label slot="topLeft" style="font-size:12px">${this.langConfig && this.langConfig.fieldText.topLabel["label_" + this.lang]}</label>
        <div class="layout vertical flex center-justified">
          <div style="height:50vh;overflow:auto">
            <vaadin-grid id="siGrid" theme="row-dividers" 
              @active-item-changed=${e => this.selectedStucks = e.detail.value ? [e.detail.value] : []}
              .selectedItems="${this.selectedStucks}" all-rows-visible>
              ${this.siList()}
            </vaadin-grid>
          </div>
          <div style="margin-top:30px;text-align:center;">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" @click=${this.setToNext}>
              ${this.langConfig && this.langConfig.fieldText.next["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `
    }

    siList() {
      if (this.langConfig) {
        return Object.entries(this.langConfig.stuckHeader).map(([key, value], i) =>
          html`<vaadin-grid-column resizable path="${key}" header="${value['label_' + this.lang]}"></vaadin-grid-column>`
        )
      }
    }

    get sampleStuckDialog() {
      return this.shadowRoot.querySelector("tr-dialog#sampleStuckDialog")
    }

    get siGrid() {
      return this.shadowRoot.querySelector("vaadin-grid#siGrid")
    }

    setToNext() {
      let adjustAction = {
        ...this.selectedAction,
        "button": {
          "title": {
            "label_en": "Next", "label_es": "Siguiente"
          }
        }
      }
      this.credsChecker(this.selectedAction.actionName, this.selectedStucks[0].sample_id, this.jsonParam(), adjustAction)
    }

    /** Point Template Dialog part */
    pointTemplate() {
      return html`
      <tr-dialog id="pointDialog" .open=${this.selectedSamples && this.selectedSamples.length && this.sopsPassed}
        @closed=${e => { if (e.target === this.pointDialog) this.grid.activeItem = null }}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <div class="layout horizontal justified flex">
            <sp-button size="m" variant="secondary" dialogAction="accept">
              ${commonLangConfig.closeDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="m" @click=${this.setLogSample}>${this.langConfig.fieldText.logBtn["label_" + this.lang]}</sp-button>
          </div>
          <div class="layout horizontal flex around-justified wrap" style="gap: 5px;">
            <mwc-select label="${this.langConfig.fieldText.shift["label_" + this.lang]}" id="shift">
              ${this.langConfig.fieldText.shift.items.map((c, i) =>
        html`<mwc-list-item value="${c.keyName}" ?selected=${c.keyName == this.headerInfo.shift}>${c["keyValue_" + this.lang]}</mwc-list-item>`
      )}
            </mwc-select>
            <mwc-select label="${this.langConfig.fieldText.lot["label_" + this.lang]}" id="lot">
              ${this.langConfig.fieldText.lot.items.map((c, i) =>
        html`<mwc-list-item value="${c.lot_name}" ?selected=${i == 0}>${c.lot_name}</mwc-list-item>`
      )}
            </mwc-select>
            ${this.selectedSamples.length && this.selectedSamples[0].card_info.map(f =>
        html`${(f.name in this.langConfig.gridHeader) ?
          // html`<mwc-textfield style="width:200px" ?disabled=${this.langConfig.gridHeader[f.name]&&this.langConfig.gridHeader[f.name].confidential_value?true:false} label=${this.langConfig.gridHeader[f.name]['label_'+this.lang]} name=${f.name} type=${f.type} value=${this.langConfig.gridHeader[f.name]&&this.langConfig.gridHeader[f.name].confidential_value&&f.value?"*****":f.value}></mwc-textfield>` :
          html`<mwc-textfield disabled style="width:200px" label=${this.langConfig.gridHeader[f.name]['label_' + this.lang]} name=${f.name} type=${f.type} value=${this.langConfig.gridHeader[f.name] && this.langConfig.gridHeader[f.name].confidential_value && f.value ? "*****" : f.value}></mwc-textfield>` :
          nothing
          }
              `
      )}
          </div>
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

    setLogSample() {
      this.targetValue = {
        sampleTemplate: this.templates.selectedProgram.sample_config_code,
        sampleTemplateVersion: this.templates.selectedProgram.sample_config_code_version,
        fieldValue: `${this.shiftField.value}*String|${this.lotField.value}*String`
      }
      this.actionMethod(null, false, 0)
    }

    /** Lot Template Dialog part */
    // lotTemplate() {
    //   return html`
    //   <tr-dialog id="lotDialog"
    //     @closed=${e=>{if(e.target===this.lotDialog)this.grid.activeItem=null}}
    //     heading=""
    //     hideActions=""
    //     scrimClickAction="">
    //     <div class="layout vertical flex center-justified">
    //       <mwc-textfield id="lotInput" 
    //         label="${this.selectedAction.actionName=="EM_NEW_PRODUCTION_LOT" ?
    //           this.langConfig.fieldText.newLot["label_"+ this.lang] :
    //           this.langConfig.fieldText.activateLot["label_"+ this.lang]
    //         }" 
    //         .value=${this.selectedAction.actionName=="EM_ACTIVATE_PRODUCTION_LOT"&&this.selectedSamples.length ?
    //           this.selectedSamples[0].lot_name :
    //           ''
    //         }
    //         dialogInitialFocus
    //         @keypress=${e=>e.keyCode==13&&this.lotAction()}></mwc-textfield>
    //       <div style="margin-top:30px;text-align:center">
    //         <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
    //           ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
    //         <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.lotAction}>
    //           ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
    //       </div>
    //     </div>
    //   </tr-dialog>
    //   `
    // }
    /** Lot Template Dialog part */
    lotTemplate() {
      return html`
      <tr-dialog id="lotDialog"
        @closed=${e => { if (e.target === this.lotDialog) this.deactivatedLots = [] }}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
        ${!this.selectedAction.dialogInfo ?
          html``: html`
            ${this.selectedAction.actionName == "EM_NEW_PRODUCTION_LOT" ?
            html`
                <mwc-textfield id="lotInput" 
                  label="${this.selectedAction.dialogInfo.fieldText.newLot["label_" + this.lang]}" 
                  dialogInitialFocus
                  @keypress=${e => e.keyCode == 13 && this.lotAction()}></mwc-textfield>
            ` :
            html`
            `}
        `}        
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.lotAction}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `
    }

    get lotDialog() {
      return this.shadowRoot.querySelector("tr-dialog#lotDialog")
    }

    get lotInput() {
      return this.shadowRoot.querySelector("mwc-textfield#lotInput")
    }

    get lotNumDays() {
      return this.shadowRoot.querySelector("mwc-textfield#lotNumDays")
    }

    get lotName() {
      return this.shadowRoot.querySelector("mwc-select#lotName")
    }

    setDays() {
      this.selectedDialogAction = this.selectedAction.dialogInfo.action[0]
      this.actionMethod(this.selectedDialogAction, false)
    }

    lotAction() {
      if (this.selectedAction.actionName == "EM_ACTIVATE_PRODUCTION_LOT") {
        if (this.lotName.value) {
          this.selectedDialogAction = null
          this.dialogAccept(false)
        }
      } else {
        if (this.lotInput.value) {
          this.dialogAccept(false)
        }
      }
    }


    /** Investigation Template Dialog part */
    investigationTemplate() {
      return html`
      <tr-dialog id="investigationDialog" ?open=${this.openInvests.length}
        @closed=${e => { if (e.target === this.investigationDialog) { this.openInvests = []; this.grid.activeItem = null } }}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <div style="height:55vh;overflow:auto">
            <vaadin-grid .items=${this.openInvests} id="investigationGrid" theme="row-dividers" column-reordering-allowed multi-sort 
              @active-item-changed=${e => this.selectedInvestigations = e.detail.value ? [e.detail.value] : []}
              .selectedItems="${this.selectedInvestigations}" all-rows-visible>
              <vaadin-grid-sort-column width="100%" resizable text-align="center" path="id" header="Id"></vaadin-grid-sort-column>
              <vaadin-grid-filter-column width="100%" resizable text-align="center" path="created_on" .header="${this.model.langConfig.gridHeader.created_on["label_" + this.lang]}"></vaadin-grid-filter-column>
            </vaadin-grid>
          </div>
          <div style="margin-top:10px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" dialogAction="accept" 
              @click=${this.addInvestigationAction}
              ?disabled=${!this.selectedInvestigations.length}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `
    }

    get investigationDialog() {
      return this.shadowRoot.querySelector("tr-dialog#investigationDialog")
    }

    addInvestigationAction() {
      this.targetValue = {
        "investigationId": this.selectedInvestigations[0].id,
        "objectsToAdd": "sample_analysis_result*" + this.selectedSamples[0].result_id
      }
      this.selectedDialogAction = this.selectedAction.dialogInfo.action[0]
      this.actionMethod(this.selectedDialogAction, false)
    }

    /** Decision Template Dialog part */
    decisionTemplate() {
      return html`
      <tr-dialog id="decisionDialog" 
        @opened=${() => this.capaRequired = this.capaCheck.checked}
        @closed=${e => { if (e.target === this.decisionDialog) this.grid.activeItem = null }}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <mwc-textfield id="systemName" label="${this.langConfig.fieldText.systemName["label_" + this.lang]}" 
            .value=${this.selectedSamples.length && this.selectedSamples[0].capa_external_system_name}
            dialogInitialFocus></mwc-textfield>
          <mwc-textfield id="systemId" label="${this.langConfig.fieldText.systemId["label_" + this.lang]}"
            .value=${this.selectedSamples.length && this.selectedSamples[0].capa_external_system_id}></mwc-textfield>
          <mwc-formfield label="${this.langConfig.fieldText.capa["label_" + this.lang]}">
            <mwc-checkbox id="capaCheck" 
              ?checked=${this.selectedSamples.length && this.selectedSamples[0].capa_required}
              @change=${e => {
          this.capaRequired = e.target.checked;
          this.capaId.value = "";
          this.capaName.value = "";
        }}></mwc-checkbox>
          </mwc-formfield>
          <mwc-textfield id="capaName" label="${this.langConfig.fieldText.capaName["label_" + this.lang]}"
            .value=${this.selectedSamples.length && this.selectedSamples[0].external_system_name}
            ?hidden=${!this.capaRequired}></mwc-textfield>
          <mwc-textfield id="capaId" label="${this.langConfig.fieldText.capaId["label_" + this.lang]}"
            .value=${this.selectedSamples.length && this.selectedSamples[0].external_system_id}
            ?hidden=${!this.capaRequired}></mwc-textfield>
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction"
              @click=${this.setDecision}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `
    }

    get decisionDialog() {
      return this.shadowRoot.querySelector("tr-dialog#decisionDialog")
    }

    get systemName() {
      return this.shadowRoot.querySelector("mwc-textfield#systemName")
    }

    get systemId() {
      return this.shadowRoot.querySelector("mwc-textfield#systemId")
    }

    get capaCheck() {
      return this.shadowRoot.querySelector("mwc-checkbox#capaCheck")
    }

    get capaName() {
      return this.shadowRoot.querySelector("mwc-textfield#capaName")
    }

    get capaId() {
      return this.shadowRoot.querySelector("mwc-textfield#capaId")
    }

    setDecision() {
      let required = []
      if (!this.systemName.value) {
        required.push("System Name")
      }
      if (!this.systemId.value) {
        required.push("System Id")
      }
      if (this.capaCheck.checked) {
        if (!this.capaName.value) {
          required.push("CAPA Name")
        }
        if (!this.capaId.value) {
          required.push("CAPA Id")
        }
      }
      if (required.length) {
        this.dispatchEvent(new CustomEvent("error", {
          detail: {
            is_error: true,
            message_en: "Please fill the required fields: " + required.join(", "),
            message_es: "Por favor, rellene los campos obligatorios: " + required.join(", ")
          },
          bubbles: true,
          composed: true
        }))
        console.log("Please fill the required fields: " + required.join(", "))
        return
      }

      this.targetValue = {
        "capaFieldValue": "Trackwise" + this.systemName.value + "*String|" + this.systemId.value + "*String|" + this.capaName.value + "*String|" + this.capaId.value + "*String"
      }
      this.dialogAccept(false)
    }

    newPlatformAdminWhiteIPListsTemplate() {
      return html`
    <tr-dialog id="newIPEntryDialog" 
      @closed=${this.cleanIpDialogFields}
      heading=""
      hideActions=""
      scrimClickAction="">
      <div class="layout vertical flex center-justified">
        <mwc-textfield id="ipValue1Input" type="number" placeholder="xxx" label="${this.langConfig.fieldText.ip_value1["label_" + this.lang]}"> </mwc-textfield>
        <mwc-textfield id="ipValue2Input" type="number" placeholder="xxx" label="${this.langConfig.fieldText.ip_value2["label_" + this.lang]}"> </mwc-textfield>
        <mwc-textfield id="ipValue3Input" type="number" placeholder="xxx" label="${this.langConfig.fieldText.ip_value3["label_" + this.lang]}"> </mwc-textfield>
        <mwc-textfield id="ipValue4Input" type="number" placeholder="xxx" label="${this.langConfig.fieldText.ip_value4["label_" + this.lang]}"> </mwc-textfield>
        <mwc-textfield id="ipDescriptionInput" type="text" label="${this.langConfig.fieldText.description["label_" + this.lang]}"> </mwc-textfield>
        <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
          ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
        <sp-button size="xl" slot="primaryAction" @click=${this.newUpdateIp}>
          ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
      </div>
    </tr-dialog>
    <tr-dialog id="updateIPEntryDialog"
      @closed=${this.cleanIpDialogFields}
      heading=""
      hideActions=""
      scrimClickAction="">
      <div class="layout vertical flex center-justified">
        <mwc-textfield id="ipValue1Update" type="number" placeholder="xxx" 
          .value=${this.selectedSamples.length && this.selectedSamples[0].ip_value1}        
          label="${this.langConfig.fieldText.ip_value1["label_" + this.lang]}"> </mwc-textfield>
        <mwc-textfield id="ipValue2Update" type="number" placeholder="xxx" 
          .value=${this.selectedSamples.length && this.selectedSamples[0].ip_value2}        
          label="${this.langConfig.fieldText.ip_value2["label_" + this.lang]}"> </mwc-textfield>
        <mwc-textfield id="ipValue3Update" type="number" placeholder="xxx" 
          .value=${this.selectedSamples.length && this.selectedSamples[0].ip_value3}        
          label="${this.langConfig.fieldText.ip_value3["label_" + this.lang]}"> </mwc-textfield>
        <mwc-textfield id="ipValue4Update" type="number" placeholder="xxx" 
          .value=${this.selectedSamples.length && this.selectedSamples[0].ip_value4}        
          label="${this.langConfig.fieldText.ip_value4["label_" + this.lang]}"> </mwc-textfield>
        <mwc-textfield id="ipDescriptionUpdate" type="text" placeholder="xxx" 
          .value=${this.selectedSamples.length && this.selectedSamples[0].description}        
          label="${this.langConfig.fieldText.description["label_" + this.lang]}"> </mwc-textfield>      
        <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
          ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
        <sp-button size="xl" slot="primaryAction" @click=${this.newUpdateIp}>
          ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
      </div>
    </tr-dialog>
    `
    }
    get ipValue1Input() {
      if (this.newIPEntryDialog.open)
        return this.shadowRoot.querySelector("mwc-textfield#ipValue1Input")
      else
        return this.shadowRoot.querySelector("mwc-textfield#ipValue1Update")
    }
    get ipValue2Input() {
      if (this.newIPEntryDialog.open)
        return this.shadowRoot.querySelector("mwc-textfield#ipValue2Input")
      else
        return this.shadowRoot.querySelector("mwc-textfield#ipValue2Update")
    }
    get ipValue3Input() {
      if (this.newIPEntryDialog.open)
        return this.shadowRoot.querySelector("mwc-textfield#ipValue3Input")
      else
        return this.shadowRoot.querySelector("mwc-textfield#ipValue3Update")
    }
    get ipValue4Input() {
      if (this.newIPEntryDialog.open)
        return this.shadowRoot.querySelector("mwc-textfield#ipValue4Input")
      else
        return this.shadowRoot.querySelector("mwc-textfield#ipValue4Update")
    }
    get ipDescriptionInput() {
      if (this.newIPEntryDialog.open)
        return this.shadowRoot.querySelector("mwc-textfield#ipDescriptionInput")
      else
        return this.shadowRoot.querySelector("mwc-textfield#ipDescriptionUpdate")
    }
    newPlatformAdminBlackIPListsTemplate() {
      return html`
    <tr-dialog id="newIPEntryDialog" 
      @closed=${this.cleanIpDialogFields}
      heading=""
      hideActions=""
      scrimClickAction="">
      <div class="layout vertical flex center-justified">
        <mwc-textfield id="ipValue1Input" type="number" placeholder="xxx" label="${this.langConfig.fieldText.ip_value1["label_" + this.lang]}"> </mwc-textfield>
        <mwc-textfield id="ipValue2Input" type="number" placeholder="xxx" label="${this.langConfig.fieldText.ip_value2["label_" + this.lang]}"> </mwc-textfield>
        <mwc-textfield id="ipValue3Input" type="number" placeholder="xxx" label="${this.langConfig.fieldText.ip_value3["label_" + this.lang]}"> </mwc-textfield>
        <mwc-textfield id="ipValue4Input" type="number" placeholder="xxx" label="${this.langConfig.fieldText.ip_value4["label_" + this.lang]}"> </mwc-textfield>
        <mwc-textfield id="ipDescriptionInput" type="text" label="${this.langConfig.fieldText.description["label_" + this.lang]}"> </mwc-textfield>
        
        <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
          ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
        <sp-button size="xl" slot="primaryAction" @click=${this.newUpdateIp}>
          ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
      </div>
    </tr-dialog>
    <tr-dialog id="updateIPEntryDialog" 
      @closed=${this.cleanIpDialogFields}
      heading=""
      hideActions=""
      scrimClickAction="">
      <div class="layout vertical flex center-justified">
        <mwc-textfield id="ipValue1Update" type="number" placeholder="xxx" 
          .value=${this.selectedSamples.length && this.selectedSamples[0].ip_value1}        
          label="${this.langConfig.fieldText.ip_value1["label_" + this.lang]}"> </mwc-textfield>
        <mwc-textfield id="ipValue2Update" type="number" placeholder="xxx" 
          .value=${this.selectedSamples.length && this.selectedSamples[0].ip_value2}        
          label="${this.langConfig.fieldText.ip_value2["label_" + this.lang]}"> </mwc-textfield>
        <mwc-textfield id="ipValue3Update" type="number" placeholder="xxx" 
          .value=${this.selectedSamples.length && this.selectedSamples[0].ip_value3}        
          label="${this.langConfig.fieldText.ip_value3["label_" + this.lang]}"> </mwc-textfield>
        <mwc-textfield id="ipValue4Update" type="number" placeholder="xxx" 
          .value=${this.selectedSamples.length && this.selectedSamples[0].ip_value4}        
          label="${this.langConfig.fieldText.ip_value4["label_" + this.lang]}"> </mwc-textfield>
        <mwc-textfield id="ipDescriptionUpdate" type="text" placeholder="xxx" 
          .value=${this.selectedSamples.length && this.selectedSamples[0].description}        
          label="${this.langConfig.fieldText.description["label_" + this.lang]}"> </mwc-textfield>      
        <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
          ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
        <sp-button size="xl" slot="primaryAction" @click=${this.newUpdateIp}>
          ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
      </div>
    </tr-dialog>
    `
    }
    get newIPEntryDialog() {
      return this.shadowRoot.querySelector("tr-dialog#newIPEntryDialog")
    }
    get updateIPEntryDialog() {
      return this.shadowRoot.querySelector("tr-dialog#updateIPEntryDialog")
    }
    cleanIpDialogFields() {
      this.ipValue1Input.value = "";
      this.ipValue2Input.value = "";
      this.ipValue3Input.value = "";
      this.ipValue4Input.value = "";
      this.ipDescriptionInput.value = "";
    }
    newUpdateIp() {
      if (this.ipValue1Input.value) {
        this.dialogAccept(false)
      }
    }

    newPlatformAdminBusinessRulesTemplate() {
      return html`
    <tr-dialog id="newIPEntryDialog" 
      @closed=${this.cleanIpDialogFields}
      heading=""
      hideActions=""
      scrimClickAction="">
      <div class="layout vertical flex center-justified">
        <div style="margin-top:30px;text-align:center">
          <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
            ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
          <sp-button size="xl" slot="primaryAction" @click=${this.newUpdateIp}>
            ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
        </div>
      </div>
    </tr-dialog>
    `
    }
  }
}