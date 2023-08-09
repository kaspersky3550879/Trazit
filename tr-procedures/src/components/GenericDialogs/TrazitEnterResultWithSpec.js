import { html, css, nothing, LitElement } from 'lit';
import { Layouts, Alignment } from '@collaborne/lit-flexbox-literals';
import { columnBodyRenderer, gridRowDetailsRenderer } from 'lit-vaadin-helpers';
import { commonLangConfig } from '@trazit/common-core';
import { ReactiveElement } from 'lit';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';

export function TrazitEnterResultWithSpec(LitElement) {
return class extends LitElement {

  static get styles() {
    return [
      Layouts, Alignment,
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
        div#microGrid {
          height: 35vh;
          overflow: auto;
        }
        mwc-button[hidden] {
          display: none;
        }
        mwc-button.tabBtn {
          --mdc-theme-primary: #03a9f4;
          --mdc-theme-on-primary: white;
          --mdc-typography-button-font-size: 10px;
        }
        mwc-icon-button.reverse {
          -webkit-transform:rotateY(180deg);
          -moz-transform:rotateY(180deg);
          -o-transform:rotateY(180deg);
          -ms-transform:rotateY(180deg);
        }
        mwc-icon-button[disabled] {
          opacity: 0.5;
        }
        img.iconBtn {
          width: 20px;
        }
        div.input * {
          margin: 10px 0 5px;
        }
        mwc-icon-button[hidden] {
          display: none;
        }
        #resultDialog {
          --mdc-dialog-min-width: 80vw;
        }
        vaadin-grid {
          font-size: 12px;
        }
        sp-button[hidden] {
          display: none;
        }
        .enterResultVal {
          width: 75%;
        }
        @media (max-width: 460px) {
          vaadin-grid {
            font-size: 10px;
          }
          vaadin-grid-cell-content {
            padding: 5px;
          }
          #resultDialog {
            --mdc-dialog-min-width: 100vw;
          }
        }
      `
    ];
  }  
    static get properties() {
        return {
          enterResults: { type: Array },
          selectedItems: { type: Array },
          actionBeingPerformedModel: {type: Object}
        }
    }
    constructor() {
        super()
        this.enterResults=[]
        this.selectedItems=[]
        this.actionBeingPerformedModel={}
    }
    get erGrid() {return this.shadowRoot.querySelector("vaadin-grid#erGrid")}
    get resultDialog() {return this.shadowRoot.querySelector("tr-dialog#resultDialog")}
    get rItem() {return this.shadowRoot.querySelector("input[name=rItem]")}
    get rowTooltipEnterResults() {return this.shadowRoot.querySelector("#rowTooltipenterresults")}
    get uomDialog() {return this.shadowRoot.querySelector("tr-dialog#uomConvertionDialog")}

    resultTemplate() {
      // console.log('resultTemplate')
      // if(this.actionBeingPerformedModel===undefined||this.actionBeingPerformedModel.dialogInfo===undefined||this.actionBeingPerformedModel.dialogInfo.name===undefined){return nothing}
      // if (this.actionBeingPerformedModel.dialogInfo.name !== "resultDialog"&&
      // this.actionBeingPerformedModel.dialogInfo.name !== "uomConvertionDialog") {return nothing}
      // console.log('resultTemplate', 'actionBeingPerformedModel', this.actionBeingPerformedModel)
      return html`

      <style>
      #resultDialog {
        --mdc-dialog-min-width: 80vw;
      }
      vaadin-grid {
        font-size: 12px;
      }
      sp-button[hidden] {
        display: none;
      }
      .enterResultVal {
        width: 75%;
      }
      @media (max-width: 460px) {
        vaadin-grid {
          font-size: 10px;
        }
        vaadin-grid-cell-content {
          padding: 5px;
        }
        #resultDialog {
          --mdc-dialog-min-width: 100vw;
        }
      }
      #topLeft{
        color: rgb(94, 145, 186);
        font-family: Montserrat;
        font-weight: bold;
        font-size: calc(12px + 1.5vw);
        text-align: center;        
      }
      </style>


      <tr-dialog id="resultDialog" ?open=${this.enterResults.length}
        @opened=${() => this.setCellListenerEnterResults()}
        @closing=${() => this.removeEvents()}
        heading=""
        hideActions=""
        scrimClickAction="">
        ${this.actionBeingPerformedModel.dialogInfo===undefined||this.actionBeingPerformedModel===undefined ? nothing:
        html`
          ${this.selectedItems.length&&this.actionBeingPerformedModel.dialogInfo.resultHeaderObjectLabelTopLeft!==undefined ?
            html`<label id="topLeft" slot="topLeft" style="font-size:12px">${this.actionBeingPerformedModel.dialogInfo.resultHeaderObjectLabelTopLeft["label_" + this.lang]} ${this.selectedItems[0].sample_id || this.selectedItems[0].id}</label>` : nothing
          }
          <vaadin-grid id="erGrid" theme="row-dividers" column-reordering-allowed multi-sort
            .items=${this.enterResults}
            @selected-items-changed=${e => {
            if (this.actionBeingPerformedModel.actionName == "INSTRUMENT_EVENT_VARIABLES"||
                this.actionBeingPerformedModel.actionName == "QUALIFIFICATION_EVENT_VARIABLES") {
              this.selectedResults = []
            } else {
              this.selectedResults = e.detail.value
            }
          }}
            .detailsOpenedItems=${this.selectedResults}
            ${gridRowDetailsRenderer(this.detailRendererEnterResults)}>
            ${this.desktop ?
            html`<vaadin-grid-selection-column header="" flex-grow="1"></vaadin-grid-selection-column>` :
            html`<vaadin-grid-selection-column header="" width="65px" resizable ></vaadin-grid-selection-column>`
          }
            ${this.actionBeingPerformedModel.actionName == "INSTRUMENT_EVENT_VARIABLES"||
              this.actionBeingPerformedModel.actionName == "QUALIFIFICATION_EVENT_VARIABLES"  ?
            html`${this.instrumentEventList()}` :
            html`${this.enterResultList()}`
          }
          </vaadin-grid>
          <div id="rowTooltipenterresults">&nbsp;</div>
        `}
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


    detailRendererEnterResults(result) {

      //console.log('detailRendererEnterResults', result.sample_id, 'result', result)
      let labels = {
        "warning_reason_label_en": "Warning Reason", "warning_reason_label_es": "Razón Aviso",
        "locking_reason_label_en": "Locking Reason", "locking_reason_label_es": "Razón Bloqueo"
      }
      let specAreaLabels = {
        "method_title":{"label_en":"Method", "label_es":"Método"},
        "rule_title":{"label_en":"Range", "label_es":"Rango"},
        "no_rule":{"label_en":"Has no limited range", "label_es":"No tiene rango asignado"},
        "range_evaluation":{"label_en":"Evaluation", "label_es":"Evaluación"}        
      }
      return html`
        <div style="text-align:center;font-size:12px">
          <p>${result.spec_eval ?
          html`${result.spec_eval == 'IN' || (result.spec_eval!==undefined&&result.spec_eval.toUpperCase().includes("NO_SPEC_LIMIT")) ?
            html`<mwc-icon style="color:green">radio_button_checked</mwc-icon>` :
            html`${result.spec_eval.toUpperCase().includes("OUT") && result.spec_eval.toUpperCase().includes("SPEC") ?
              html`<mwc-icon style="color:red">radio_button_checked</mwc-icon>` :
              html`<mwc-icon style="color:orange">radio_button_checked</mwc-icon>`
              }`
            }` :
          html`<img style="height:24px; width: 24px;" src="https://upload.wikimedia.org/wikipedia/commons/9/96/Button_Icon_White.svg">`
        }</p>
          <p>>${specAreaLabels.method_title["label_"+this.lang]}: ${result.method_name} (v${result.method_version})</p>
          <p>${specAreaLabels.rule_title["label_"+this.lang]}: ${result.spec_rule_info===undefined||result.spec_rule_info[0]===undefined||result.spec_rule_info[0].ruleRepresentation===undefined? specAreaLabels.no_rule["label_"+this.lang]:result.spec_rule_info[0].ruleRepresentation}</p>
          <p>${specAreaLabels.range_evaluation["label_"+this.lang]}:           
            ${result.spec_eval.toUpperCase().includes("NO_SPEC_LIMIT") ? 
               html`specAreaLabels.no_rule["label_"+this.lang]` :  html`${result.spec_eval} (${result.spec_eval_detail})`
            }
          </p >
          ${result.is_locked ?
          html`<p style="color:rgb(255 8 8)">${labels['locking_reason_label_' + this.lang]}: ${result.locking_reason["message_" + this.lang]}</p>` : nothing
        }
          ${result.warning_reason ?
          html`<p style="color:#0085ff">${labels['warning_reason_label_' + this.lang]}: ${result.warning_reason["message_" + this.lang]}</p>` : nothing
        }
        </div>
      `
    }    
    setCellListenerEnterResults() {
      console.log('setCellListenerEnterResults EnterResults')
      if (this.actionBeingPerformedModel.actionName == "INSTRUMENT_EVENT_VARIABLES"||
          this.actionBeingPerformedModel.actionName == "QUALIFIFICATION_EVENT_VARIABLES") {
        // 
      } else {
        if (this.erGrid===undefined||this.erGrid===null){return}
        this.rowTooltipEnterResults.style.display = "block"
        this.rowTooltipEnterResults.style.visibility = "hidden"
        this.rowTooltipEnterResults.style.fontSize = "12px"
        this.rowTooltipEnterResults.style.color = "white"
        let rows = this.erGrid.shadowRoot.querySelectorAll("tr[part=row]")
        rows.forEach((r, i) => {
          if (i > 0 && this.enterResults[i - 1]) {
            r.removeEventListener('mouseenter', () => this.showLockReasonEnterResults(i))
            r.removeEventListener('mouseleave', this.hideLockReasonEnterResults.bind(this))
          }
          if (i > 0 && this.enterResults[i - 1] && (this.enterResults[i - 1].is_locked || this.enterResults[i - 1].warning_reason)) {
            r.addEventListener('mouseenter', () => this.showLockReasonEnterResults(i))
            r.addEventListener('mouseleave', this.hideLockReasonEnterResults.bind(this))
          }
        })
      }
    }

    showLockReasonEnterResults(i) {

      let labels = {
        "warning_reason_label_en": "Warning Reason", "warning_reason_label_es": "Razón Aviso",
        "locking_reason_label_en": "Locking Reason", "locking_reason_label_es": "Razón Bloqueo"
      }
      if (this.enterResults[i - 1].is_locked) {
        this.rowTooltipEnterResults.style.backgroundColor = "rgb(255 8 8)"
        this.rowTooltipEnterResults.style.visibility = "visible"
        this.rowTooltipEnterResults.textContent = labels['locking_reason_label_' + this.lang] + ": " + (this.enterResults[i - 1].locking_reason["message_" + this.lang])
      } else if (this.enterResults[i - 1].warning_reason) {
        this.rowTooltipEnterResults.style.backgroundColor = "#0085ff"
        this.rowTooltipEnterResults.style.visibility = "visible"
        this.rowTooltipEnterResults.textContent = labels['warning_reason_label_' + this.lang] + ": " + this.enterResults[i - 1].warning_reason["message_" + this.lang]
      }
      console.log(this.rowTooltipEnterResults.textContent)
    }
    hideLockReasonEnterResults() {
      this.rowTooltipEnterResults.style.visibility = "hidden"
    }


    enterResultList() {
      //alert(this.actionBeingPerformedModel.actionName)
      //console.log('enterResultList', 'gridDef', this.actionBeingPerformedModel.dialogInfo.resultHeader)
      if (this.actionBeingPerformedModel===undefined||this.actionBeingPerformedModel.dialogInfo===undefined||this.actionBeingPerformedModel.dialogInfo.resultHeader===undefined)
      {return html``}
      
      return Object.entries(this.actionBeingPerformedModel.dialogInfo.resultHeader).map(([key, value], i) =>
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
      return Object.entries(this.actionBeingPerformedModel.resultHeader).map(([key, value], i) =>
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
    changeUOM() {
      let params = this.config.backendUrl + (this.actionBeingPerformedModel.endPoint ? this.actionBeingPerformedModel.endPoint : this.config.SampleAPIactionsUrl)
        + '?' + new URLSearchParams(this.reqParams)
      this.execResult(params)
    }
    enterResult() {      
      let params = this.config.backendUrl + (this.actionBeingPerformedModel.endPoint ? this.actionBeingPerformedModel.endPoint : this.config.SampleAPIactionsUrl)
        + '?' + new URLSearchParams(this.reqParams)
   //console.log('enterResult', params)
      this.execResult(params)
    }

    execResult(params) {
      this.fetchApi(params).then(j => {
        this.reloadDialog()
        this.dataForDialog = null
      })
    }
    removeEvents() {
      if (this.actionBeingPerformedModel.actionName == "INSTRUMENT_EVENT_VARIABLES"||
          this.actionBeingPerformedModel.actionName == "QUALIFIFICATION_EVENT_VARIABLES") {
        // 
      } else {
        if (this.rowTooltipEnterResults===undefined||this.rowTooltipEnterResults===null){return}
        this.rowTooltipEnterResults.textContent = ""
        this.rowTooltipEnterResults.style.visibility = "hidden"
        let rows = this.erGrid.shadowRoot.querySelectorAll("tr[part=row]")
        rows.forEach((r, i) => {
          if (i > 0 && this.enterResults[i - 1] && this.enterResults[i - 1].is_locked) {
            r.removeEventListener('mouseenter', this.showLockReasonEnterResults.bind(this))
            r.removeEventListener('mouseleave', this.hideLockReasonEnterResults.bind(this))
          }
        })
      }
      this.curResultRef = undefined
      this.enterResults = []
    }



    valRenderer(result) {
      var rawValue=''
      if (this.actionBeingPerformedModel.actionName.toUpperCase().includes('SECOND')){
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
        if (result.param_type.toUpperCase() == "CALC") {
          return html`<input class="enterResultVal" type="text" .value=${rawValue} 
            disabled>
          `
        } else if (result.param_type.toUpperCase() == "TEXT" || result.param_type.toUpperCase() == "QUALITATIVE") {
          return html`<input class="enterResultVal" type="text" .value=${rawValue} 
            ?disabled=${this.actionBeingPerformedModel.dialogInfo.readOnly}
            @keydown=${e => e.keyCode == 13 && this.setResult(result, e.target)}>`
        } else if (result.param_type.toUpperCase().indexOf("LIST") > -1) {
//console.log('valRenderer', 'result', result)
          let lEntry = ('|'+result.list_entry).split("|")
          if (result.value===undefined||result.value.length==0){
            let blankArr=[""]
            lEntry=[blankArr].concat(lEntry)
          }
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
              ?disabled=${this.actionBeingPerformedModel.dialogInfo.readOnly} type="number" 
              .step=${step} 
              .min=${min}
              .max=${max}
              .value=${this.adjustValUndetermined(result)} 
              @input=${e=>this.setValidVal(e, result)}
              @keydown=${e => e.keyCode == 13 && this.setResult(result, e.target)}>
          `
        } else {
          let min = result.min_allowed!==undefined && result.min_allowed.length>0 ? result.min_allowed : null
          let max = result.max_allowed!==undefined && result.max_allowed.length>0 ? result.max_allowed : null
          return html`
            ${this[`${result.param_type+''+result.result_id}`]}
            <input class="enterResultVal" id="${result.param_type+''+result.result_id}" 
              ?disabled=${this.actionBeingPerformedModel.dialogInfo.readOnly} type="number" 
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
      //console.log('valRendererInstrument', 'result', result)
      if (result.is_locked) {
        return html`
          <div style="width: 100%;height: 55px;position: relative; background-color: rgb(255 8 8 / 20%)">
            <div style="width: 100%;text-align:center; margin: 0;position: absolute;top: 50%;-ms-transform: translateY(-50%);transform: translateY(-50%);">${result.raw_value}</div>
          </div>
        `
      } else {
        if (result.param_type.toUpperCase() == "CALC") {
          return html`<input class="enterResultVal" type="text" .value=${rawValue} 
            disabled>
          `
        } else if (result.param_type.toUpperCase() == "FILE") {
          return html`
          <mwc-icon-button icon="print" @click=${this.printCoa}></mwc-icon-button>   
          <mwc-icon-button icon="print" @click=${() => {this.openFile(result)}}></mwc-icon-button>   
          `
        }else if (result.param_type.toUpperCase() == "TEXT" || result.param_type == "qualitative") {
          return html`<input class="enterResultVal" type="text" .value=${result.value} 
            ?disabled=${this.actionBeingPerformedModel.dialogInfo.readOnly}
            @keydown=${e => e.keyCode == 13 && this.setResultInstrument(result, e)}>`
        } else if (result.param_type.toUpperCase().indexOf("LIST") > -1) {
          let lEntry = result.allowed_values.split("|")
          if (result.value.length==0){
            let blankArr=[""]
            lEntry=[blankArr].concat(lEntry)
          }
          return html`
            ${result.param_type.toUpperCase() == "TEXTLIST" ?
              html`
                <input class="enterResultVal" list="listEntry${result.result_id}" 
                  .value=${result.value}
                  @keydown=${e => e.keyCode == 13 && this.setResultInstrument(result, e)}>
                <datalist id="listEntry${result.result_id}">
                  ${lEntry.map(l =>
                    html`<option value="${l}">${l}`
                  )}
                </datalist>
              ` :
              html`
                <select class="enterResultVal" @change=${e => this.setResultInstrument(result, e)}>
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
              ?disabled=${this.actionBeingPerformedModel.dialogInfo.readOnly} type="number" 
              .step=${step} 
              .min=${min}
              .max=${max}
              .value=${result.value} 
              @input=${e=>this.setValidVal(e, result)}
              @keydown=${e => e.keyCode == 13 && this.setResultInstrument(result, e)}>
          `
        } else {
          let min = result.min_allowed ? result.min_allowed : 0
          let max = result.max_allowed && result.max_allowed
          return html`
            ${this[`${result.param_type+''+result.result_id}`]}
            <input class="enterResultVal" id="${result.param_type+''+result.result_id}" 
              ?disabled=${this.actionBeingPerformedModel.dialogInfo.readOnly} type="number" 
              .min=${min}
              .max=${max}
              .value=${result.value}
              @input=${e=>this.setValidVal(e, result)}
              @keydown=${e => e.keyCode == 13 && this.setResultInstrument(result, e)}>
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
      console.log('adjustValUndetermined', 'result', result, 'elmSet', elmSet)
      let lbl = "", raw = ""      
      if (result.raw_value != "") {
        if (this.actionBeingPerformedModel.actionName.toUpperCase().includes('SECOND')){
          raw = result.sar2_raw_value
          if (raw===undefined||String(raw).length==0){
            raw = result.raw_value  
          }
        }else{
          raw = result.raw_value
        }
        //alert('adjustValUndetermined '+this.actionBeingPerformedModel.actionName+' 1)'+result.raw_value+' 2)'+result.sar2_raw_value)
        //raw = result.raw_value
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
      let actionIdx = this.actionBeingPerformedModel.dialogInfo.action.findIndex(a => a.clientMethod == "changeUOM")
      this.selectedDialogAction = this.actionBeingPerformedModel.dialogInfo.action[actionIdx]
      this.actionMethod(this.selectedDialogAction, false)
    }
    specRenderer(result) {
      if (result.spec_eval) {
        if (result.spec_eval == 'IN') {
          return html`<mwc-icon style="color:green">radio_button_checked</mwc-icon>`
        } else {
          if (result.spec_eval.toUpperCase().includes("OUT") && result.spec_eval.toUpperCase().includes("SPEC")) {
            return html`<mwc-icon style="color:red">radio_button_checked</mwc-icon>`
          }else if (result.spec_eval.toUpperCase().includes("NO_SPEC_LIMIT") ) {
            return html`<mwc-icon style="color:green">radio_button_checked</mwc-icon>`
          } else {
            return html`<mwc-icon style="color:orange">radio_button_checked</mwc-icon>`
          }
        }
      } else {
        return html`<img style="height:24px; width: 24px;" src="https://upload.wikimedia.org/wikipedia/commons/9/96/Button_Icon_White.svg">`
      }
    }
    openFile(res){
      const jsonString = res.attachment_jsonstring //attachment //attachment_text
      const jsonData = JSON.parse(jsonString);
      const byteData = jsonData.data;
  
      const blob = new Blob([byteData], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
  
      window.open(url, '_blank');      
    }

    downloadFile(res) {
      const jsonString = res.attachment
  
      const jsonData = JSON.parse(jsonString);
      const byteData = jsonData.data;
  
      const blob = new Blob([byteData], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = 'file.txt'; // Specify the desired file name
      link.click();
    }    


    getResult() {
      console.log('getResult', 'SampleAPIqueriesUrl', 'this.selectedItems[0]', this.selectedItems[0])

      let queryDefinition=this.actionBeingPerformedModel.dialogInfo.viewQuery
      this.deactivatedObjects = []
      let APIParams=this.getAPICommonParams(queryDefinition)
      let viewParams=this.jsonParam(queryDefinition, this.selectedItems[0])
      let endPointUrl=this.getQueryAPIUrl(queryDefinition)
      if (String(endPointUrl).toUpperCase().includes("ERROR")){
          alert(endPointUrl)
          return
      }
      let params = this.config.backendUrl + endPointUrl
      + '?' + new URLSearchParams(APIParams) + '&'+ new URLSearchParams(viewParams)


//      let params = this.config.backendUrl + (this.actionBeingPerformedModel.endPoint ? this.actionBeingPerformedModel.endPoint : this.config.SampleAPIqueriesUrl)
//        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          if (j.length==0){            
            //alert('Found no results')

            this.dispatchEvent(new CustomEvent("error", {
              detail: {
                is_error: true,
                message_en: 'Found no results',
                message_es: 'No se encontraron resultados'
              },
              bubbles: true,
              composed: true
            }))            
          }
          if (this.curResultRef) {
            if (j.message!==undefined&&j.message.includes('unexpected')){
              return
            }
            let r = j.filter(d => d.result_id == this.curResultRef.resId)
            
            if (r.length) {
              if (this.curResultRef.elm.type == "number") {
                this.adjustValUndetermined(r[0], this.curResultRef.elm)
              } else {
                this.curResultRef.elm.value = r[0].raw_value
              }
            }
          }
          this.curResultRef = undefined
          this.selectedResults = []
          this.enterResults = j
          this.requestUpdate()
        } else {
          this.dispatchEvent(new CustomEvent("error", {
            detail: {
              is_error: true,
              message_en: this.actionBeingPerformedModel.alertMsg.empty["label_en"],
              message_es: this.actionBeingPerformedModel.alertMsg.empty["label_es"]
            },
            bubbles: true,
            composed: true
          }))
          console.log(this.actionBeingPerformedModel.alertMsg.empty["label_en"])
        }
      })
    }

    getInstEventResult() {
      let params = this.config.backendUrl + this.config.ApiInstrumentsAPIqueriesUrl
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          if (this.curResultRef) {
            let r = j.filter(d => d.event_id == this.curResultRef.evtId)
            if (r.length) {
              this.curResultRef.elm.value = r[0].value
            }
          }
          this.selectedResults = []
          this.enterResults = j
          this.erGrid.items = j
          this.requestUpdate()
        } else {
          this.dispatchEvent(new CustomEvent("error", {
            detail: {
              is_error: true,
              message_en: this.selectedAction.alertMsg.empty["label_en"],
              message_es: this.selectedAction.alertMsg.empty["label_es"]
            },
            bubbles: true,
            composed: true
          }))
          console.log(this.selectedAction.alertMsg.empty["label_en"])
        }
      })
    }    
     
    setResult(result, target) {
      //alert('TrazitEnterResultWithSpec line 798-setResult')
      var resId=''
      if (this.actionBeingPerformedModel.actionName.toUpperCase().includes('SECOND')){

        if (result.sar2_result_id===undefined||result.sar2_result_id.length==0){
        this.dispatchEvent(new CustomEvent("error", {
          detail: {
            is_error: true,
            message_en: 'This result has no second entry feature enabled',
            message_es: 'Funcionalidad Segunda Entrada no habilitada para este resultado'
          },
          bubbles: true,
          composed: true
        }))   
        return
        }
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
      //console.log('setResult', 'targetValue', this.targetValue)
      // vaadin grid field rebinding doesn't work, so let's do manually
      // ClientMethod::getResult
      this.curResultRef = { elm: target, resId: result.result_id, evtId: result.event_id }
      let act = JSON.stringify(this.actionBeingPerformedModel.dialogInfo.action[0])
      this.selectedDialogAction = JSON.parse(act)
      var rawValue=''
      if (this.actionBeingPerformedModel.actionName.toUpperCase().includes('SECOND')){
        rawValue = result.sar2_raw_value
      }else{
        rawValue = result.raw_value
      }
      //console.log('setResult Before', 'resId', resId, 'selectedDialogAction', this.selectedDialogAction, 'this.selectedItems', this.selectedItems)
      if (rawValue) {
        this.selectedDialogAction.actionName = "RE" + this.selectedDialogAction.actionName
        this.actionMethodResults(this.selectedDialogAction, this.selectedItems, result.sample_number)
      } else {
        this.selectedItems[0]=result;
        this.actionMethodResults(this.selectedDialogAction, this.selectedItems, result.sample_number)
      }
      console.log('setResult After', 'resId', resId, 'selectedDialogAction', this.selectedDialogAction, 'this.selectedItems', this.selectedItems)
    }

    actionMethodResults(action, selObject, sampleId) {
      //this.loadDialogs()  
      console.log('actionMethodResults', 'action', action, 'sampleId', sampleId)
          if(action===undefined){
              alert('action not passed as argument')
              return
          }
          this.actionBeingPerformedModel=action        
          if(action.requiresDialog===undefined){
              alert('The action '+action.actionName+' has no requiresDialog property which is mandatory')
              return
          }
          if(action.requiresDialog===false){
              this.actionWhenRequiresNoDialog(action, selObject[0])
              return
          }  
          if ( action.requiresGridItemSelected!==undefined&&action.requiresGridItemSelected===true&&
            (this[selectedItemPropertyName]===undefined||this[selectedItemPropertyName][0]===undefined) ){
            alert('Please select one item in the table prior')
            return
          }
          this.GetQueriesForDialog(action)        
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

    setResultInstrument(result, e) {
      //alert('setResultInstrument , line 890')
      let newValue = e.target.value
      this.targetValue = {
        newValue: newValue,
        eventId: result.event_id,
        instrumentName: result.instrument,
        variableName: result.param_name
      }
      // vaadin grid field rebinding doesn't work, so let's do manually
      // ClientMethod::getResult
      this.curResultRef = { elm: e.target, resId: result.result_id, evtId: result.event_id }
      let act = JSON.stringify(this.actionBeingPerformedModel.dialogInfo.action[0])
      this.selectedDialogAction = JSON.parse(act)
      if (result.raw_value || result.value) {
        this.selectedDialogAction.actionName = "RE" + this.selectedDialogAction.actionName
        this.actionMethodResults(this.selectedDialogAction, this.selectedItems, result.event_id)
      } else {
        this.actionMethodResults(this.selectedDialogAction, this.selectedItems, result.event_id)
      }
    }
    xgetResult2() {
      console.log('getResult2', 'SampleAPIqueriesUrl')
      let params = this.config.backendUrl + (this.actionBeingPerformedModel.endPoint ? this.actionBeingPerformedModel.endPoint : this.config.SampleAPIqueriesUrl)
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          if (this.curResultRef) {
            let r = j.filter(d => d.result_id == this.curResultRef.resId)
            if (r.length) {
              if (this.curResultRef.elm.type == "number") {
                this.adjustValUndetermined(r[0], this.curResultRef.elm)
              } else {
                this.curResultRef.elm.value = r[0].raw_value
              }
            }
          }
          this.curResultRef = undefined
          this.selectedResults = []
          this.enterResults = j
          this.requestUpdate()
        } else {
          this.dispatchEvent(new CustomEvent("error", {
            detail: {
              is_error: true,
              message_en: this.actionBeingPerformedModel.alertMsg.empty["label_en"],
              message_es: this.actionBeingPerformedModel.alertMsg.empty["label_es"]
            },
            bubbles: true,
            composed: true
          }))
          // console.log(this.actionBeingPerformedModel.alertMsg.empty["label_en"])
        }
      })
    }

  //   update(changedProperties) {
  //    super.update(changedProperties);
  // }

    //get reactivateObjectDialog() {return this.shadowRoot.querySelector("tr-dialog#resultDialog")}
  
}}