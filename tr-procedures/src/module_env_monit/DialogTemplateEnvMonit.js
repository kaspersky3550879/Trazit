import { html, nothing } from 'lit';
import { columnBodyRenderer, gridRowDetailsRenderer } from 'lit-vaadin-helpers';
import { commonLangConfig } from '@trazit/common-core';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';

export function DialogTemplateEnvMonit(base) {
  return class extends base {
    static get properties() {
      return {
        selectedResults: { type: Array },
        enterResults: { type: Array },
        selectedAssigns: { type: Array },
        assignList: { type: Array },
        targetValue: { type: Object },
        selectedDialogAction: { type: Object },
        selectedStucks: { type: Array },
        dataForDialog: { type: Object },
        microName: { type: String },
        fromGrid: { type: Boolean }
      }
    }

    constructor() {
      super()
      this.fromGrid = false
    }
    incubatorNewTemplate() {
      return html`
    <tr-dialog id="newIncubatorDialog" 
      @closed=${this.cleanIncubatorNewDialog}
      heading=""
      hideActions=""
      scrimClickAction="">
      <div class="layout vertical flex center-justified">
      ${this.selectedAction?
        html`
        ${this.selectedAction.dialogInfo===undefined||this.selectedAction.dialogInfo.fieldText===undefined||this.selectedAction.dialogInfo.fieldText.newName===undefined ?          
          nothing: html`<mwc-textfield id="newName" type="text" placeholder="xxx" label="${this.selectedAction.dialogInfo.fieldText.newName["label_" + this.lang]}"> </mwc-textfield>
        `}  
        ${this.selectedAction.dialogInfo===undefined||this.selectedAction.dialogInfo.fieldText===undefined||this.selectedAction.dialogInfo.fieldText.incubStage===undefined ?          
          nothing: html`<mwc-select label="${this.selectedAction.dialogInfo.fieldText.incubStage["label_" + this.lang]}" id="incubStage">
            ${this.selectedAction.dialogInfo.fieldText.incubStage.items.map((c, i) =>
            html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
            )}
          </mwc-select>
        `}            
        ${this.selectedAction.dialogInfo===undefined||this.selectedAction.dialogInfo.fieldText===undefined||this.selectedAction.dialogInfo.fieldText.minTemp===undefined ?          
          nothing: html`<mwc-textfield id="minTemp" .value=${this.selectedAction.dialogInfo.fieldText.minTemp.defaultValue} type="number" placeholder="xxx" label="${this.selectedAction.dialogInfo.fieldText.minTemp["label_" + this.lang]}"> </mwc-textfield>
        `}  
        ${this.selectedAction.dialogInfo===undefined||this.selectedAction.dialogInfo.fieldText===undefined||this.selectedAction.dialogInfo.fieldText.maxTemp===undefined ?          
          nothing: html`<mwc-textfield id="maxTemp" type="number" .value=${this.selectedAction.dialogInfo.fieldText.maxTemp.defaultValue} placeholder="xxx" label="${this.selectedAction.dialogInfo.fieldText.maxTemp["label_" + this.lang]}"> </mwc-textfield>
        `}  
             <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" @click=${this.newUpdateIp}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
      `:nothing}        
      </div>
    </tr-dialog>
    `
    }
    
    get newIncubatorDialog() {
      return this.shadowRoot.querySelector("tr-dialog#newIncubatorDialog")
    }
  get newName() {
        return this.shadowRoot.querySelector("mwc-textfield#newName")
    }
    get incubStage() {
        return this.shadowRoot.querySelector("mwc-select#incubStage")
    }
    get minTemp() {
      return this.shadowRoot.querySelector("mwc-textfield#minTemp")
    }
    get maxTemp() {
      return this.shadowRoot.querySelector("mwc-textfield#maxTemp")
    }
    cleanIncubatorNewDialog() {
      this.newName.value = "";
      this.incubStage.value = "";
    }
    newUpdateIp() {
      if (this.newName.value) {
        this.dialogAccept(false)
      }
    }
  }
}