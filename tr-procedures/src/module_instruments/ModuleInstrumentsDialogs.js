import { html, nothing } from 'lit';
import { columnBodyRenderer, gridRowDetailsRenderer } from 'lit-vaadin-helpers';
import { commonLangConfig } from '@trazit/common-core';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';

export function ModuleInstrumentsDialogs(base) {
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
      this.fromGrid = false
    }
    cleanNewInstrumentFields() {
      //this.instrumentInput.value = "";
      //this.instrumentFamilyInput.value = ""
    }
    newInstrumentsTemplate() {
      return html`
      <tr-dialog id="newInstrumentDialog" 
        ?open=${this.familyList.length}
        @closed=${e => { if (e.target === this.newInstrumentDialog) this.cleanNewInstrumentFields() }}
        heading=""
        hideActions=""
        scrimClickAction="">
        ${!this.selectedAction.dialogInfo ?
          html``: html`        
          <div class="layout vertical flex center-justified">
            <mwc-textfield id="instrumentInput" label="${this.langConfig && this.selectedAction.dialogInfo.fieldText.newInstrument && this.selectedAction.dialogInfo.fieldText.newInstrument["label_" + this.lang]}" 
              dialogInitialFocus @keypress=${e => e.keyCode == 13 && this.newInstrumentActionClick()}></mwc-textfield>
            ${this.selectedAction.dialogInfo.fieldText.familyName ?
              html`<mwc-select id="instrumentFamilyInput" label="${this.langConfig && this.selectedAction.dialogInfo.fieldText.familyName && this.selectedAction.dialogInfo.fieldText.familyName["label_" + this.lang]}">
                ${this.selectedAction.dialogInfo.fieldText.familyName.items.map(m =>
                  html`<mwc-list-item value=${m.keyName}>${m["keyValue_"+this.lang]}</mwc-list-item>`
                )}
                </mwc-select>
            ` : nothing}
            ${this.selectedAction.dialogInfo.fieldText.modelNo ?
              html`<mwc-textfield id="modelNoInput" type="number" placeholder="123" label="${this.selectedAction.dialogInfo.fieldText.modelNo["label_" + this.lang]}"> </mwc-textfield>
            ` : nothing}
            ${this.selectedAction.dialogInfo.fieldText.supplierName ?
              html`<mwc-select id="supplierInput" label="${this.langConfig && this.selectedAction.dialogInfo.fieldText.supplierName && this.selectedAction.dialogInfo.fieldText.supplierName["label_" + this.lang]}">
                ${this.selectedAction.dialogInfo.fieldText.supplierName.items.map(m =>
                  html`<mwc-list-item value=${m.keyName}>${m["keyValue_"+this.lang]}</mwc-list-item>`
                )}
                </mwc-select> 
            ` : nothing}
            ${this.selectedAction.dialogInfo.fieldText.serialNo ?
              html`<mwc-textfield id="serialNoInput" type="number" placeholder="123" label="${this.selectedAction.dialogInfo.fieldText.serialNo["label_" + this.lang]}"> </mwc-textfield>
            ` : nothing}
            ${this.selectedAction.dialogInfo.fieldText.manufacturerName ?
              html`<mwc-select id="manufacturerInput" label="${this.langConfig && this.selectedAction.dialogInfo.fieldText.manufacturerName && this.selectedAction.dialogInfo.fieldText.manufacturerName["label_" + this.lang]}">
                ${this.selectedAction.dialogInfo.fieldText.manufacturerName.items.map(m =>
                  html`<mwc-list-item value=${m.keyName}>${m["keyValue_"+this.lang]}</mwc-list-item>`
                )}
            ` : nothing}
            ${this.selectedAction.dialogInfo.fieldText.poDateInput ?
              html`
                <label for="fname">${this.selectedAction.dialogInfo.fieldText.poDateInput["label_" + this.lang]}</label><br>
                <input id="poDateInput" type="date" dialogInitialFocus>
              ` : nothing
            }
            ${this.selectedAction.dialogInfo.fieldText.installationDateInput ?
              html`
              <label for="fname">${this.selectedAction.dialogInfo.fieldText.installationDateInput["label_" + this.lang]}</label><br>
              <input id="installationDateInput" type="date" dialogInitialFocus>
              ` : nothing
            }
            </mwc-select>
            <div style="margin-top:30px;text-align:center">
              <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
                ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
              <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.newInstrumentActionClick}>
                ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
            </div>
          </div>
        `}        
      </tr-dialog>
      `
    }
    undecomInstrument() {
      if (this.selectedAction.actionName == "UNDECOMMISSION_INSTRUMENT") {
        if (this.instrumentName.value) {
          this.selectedDialogAction = null
          this.dialogAccept(false)
        }
      } else {
        if (this.instrumentInput.value) {
          this.dialogAccept(false)
        }
      }
    }
    get newInstrumentDialog() {
      return this.shadowRoot.querySelector("tr-dialog#newInstrumentDialog")
    }
    get undecomInstrDialog() {
      return this.shadowRoot.querySelector("tr-dialog#undecomInstrDialog")
    }
    get instrumentInput() {
      return this.shadowRoot.querySelector("mwc-textfield#instrumentInput")
    }
    get instrumentFamilyInput() {
      return this.shadowRoot.querySelector("mwc-select#instrumentFamilyInput")
    }
    get modelNoInput() {
      return this.shadowRoot.querySelector("mwc-textfield#modelNoInput")
    }
    get supplierInput() {
      return this.shadowRoot.querySelector("mwc-select#supplierInput")
    }
    get serialNoInput() {
      return this.shadowRoot.querySelector("mwc-textfield#serialNoInput")
    }
    get manufacturerInput() {
      return this.shadowRoot.querySelector("mwc-select#manufacturerInput")
    }
    get poDateInput() {
      return this.shadowRoot.querySelector("input#poDateInput")
    }
    get installationDateInput() {return this.shadowRoot.querySelector("input#installationDateInput")}    

         
    get instrumentName() {
      return this.shadowRoot.querySelector("mwc-select#instrumentName")
    }
    opencompleteInstrumentEventDialog(){      
      let actionName="completeInstrumentEventDialog"
      console.log('opencompleteInstrumentEventDialog this.actionBeingPerformedModel.dialogInfo', this.actionBeingPerformedModel.dialogInfo)
      if (this.actionBeingPerformedModel.dialogInfo===undefined){return false}
      if (this.actionBeingPerformedModel.dialogInfo.name===undefined){return false}
      return this.actionBeingPerformedModel.dialogInfo.name===actionName
    }
    instrumentEventTemplate() {
      return html`
      ${!this.selectedAction.dialogInfo ?
      html``: html`
        <tr-dialog id="completeInstrumentEventDialog" ?open=${this.opencompleteInstrumentEventDialog()}
        @closed=${() => this.cleanNewInstrumentFields()}
        heading=""
        hideActions=""
        scrimClickAction="">
          <div class="layout vertical flex center-justified">
          ${!this.selectedAction.dialogInfo.fieldText ?
          html``: html`        
              <mwc-select id="decisionInput" label="${this.selectedAction&&this.selectedAction.dialogInfo&& this.selectedAction.dialogInfo.fieldText.decision["label_" + this.lang]}">
              ${this.selectedAction.dialogInfo.fieldText.decision.items.map((c, i) =>
                html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
              )}
              </mwc-select>
          `}        
            <div style="margin-top:30px;text-align:center">
              <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
                ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
              <sp-button size="xl" slot="primaryAction" @click=${this.instrumentEventDecision}>
                ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
            </div>
          </div>
        </tr-dialog>      
      `}        
      `
    }
    get completeInstrumentEventDialog() {
      return this.shadowRoot.querySelector("tr-dialog#completeInstrumentEventDialog")
    }
    
    get decisionInput() {
      return this.shadowRoot.querySelector("mwc-select#decisionInput")
    }

    instrumentEventDecision() {
      if (this.decisionInput.value) {
        this.dialogAccept(false)
      }
    }
    newInstrumentActionClick() {
      console.log('newInstrumentAction', this.poDateInput.value, this.installationDateInput.value)
      if (this.instrumentInput.value) {
        this.dialogAccept(false)
      }
    }
    newInstrumentAction() {
      console.log('newInstrumentAction')
      let params = this.config.backendUrl
      if (this.selectedAction.endPoint){
        params = params + this.selectedAction.endPoint
      }else{
        params = params + this.config.ApiInstrumentsAPIactionsUrl
      }
      params = params + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.newInstrumentDialog.close()
        this.reload()
      })
    }    
    newInstrumentListEndpoint() {
      if (this.selectedAction.actionName == "NEW_INSTRUMENT") {
        if (this.instrumentInput.value) {
          this.selectedDialogAction = null
          this.dialogAccept(false)
        }
      } else {
        if (this.instrumentInput.value) {
          this.dialogAccept(false)
        }
      }
    }

    completeInstrumentEventAction() {
      //alert('completeInstrumentEventAction')
      console.log('completeInstrumentEvent this.reqParams', this.reqParams);      
      let action=this.actionBeingPerformedModel;
      if (action.actionName!==undefined&&action.actionName==='REOPEN_EVENT'){return}
      let extraParams={}
      if (this.selectedItems !== undefined && this.selectedItems[0].event_type !== undefined) {
        extraParams.actionName = "COMPLETE_" + this.selectedItems[0].event_type;
        action.actionName="COMPLETE_" + this.selectedItems[0].event_type;
      }
      extraParams.decision = this.list1.value
      let APIParams=this.getAPICommonParams(action)      
      let endPointUrl=this.getActionAPIUrl(action)
      if (String(endPointUrl).toUpperCase().includes("ERROR")){
          alert(endPointUrl)
          return
      }
      let viewParams=this.jsonParam(action, this.selectedItems[0])
      let params = this.config.backendUrl + endPointUrl
        + '?' + new URLSearchParams(APIParams) + '&'+ new URLSearchParams(viewParams)

      //let params = this.config.backendUrl + this.config.ApiInstrumentsAPIactionsUrl
      //  + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        //        this.newInstrumentDialog.close()
        this.GetViewData()
        this.reload()

      })
    }    

  }
}