import { html, nothing } from 'lit';
import { columnBodyRenderer, gridRowDetailsRenderer } from 'lit-vaadin-helpers';
import { commonLangConfig } from '@trazit/common-core';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';
import {DialogsFunctions} from './DialogsFunctions';
export function TrazitInvestigationsDialog(base) {
return class extends DialogsFunctions(base) {
    static get properties() {
        return {
          selectedInvestigations:{ type: Array},
          openInvests:{ type: Array},
          capaRequired: {type: Boolean},
          targetValue: {type: Object}
        }
    }
    constructor() {
        super()
        this.selectedInvestigations=[]
        this.openInvests=[]
        this.capaRequired=false
        this.targetValue={}
    }
    openGenericDialog(actionModel = this.actionBeingPerformedModel){
      if (actionModel.dialogInfo===undefined||actionModel.dialogInfo.name===undefined||actionModel.dialogInfo.name.toString().toUpperCase()!=="GENERICDIALOG"){
          return false
      }    

//        if (!actionModel||!actionModel.dialogInfo||!actionModel.dialogInfo.fields){
//        //alert(false)
//        return false
//       } 
     // alert(true)
     this.defaultValue()
     //this.resetFields()
     return true 
  }
    investigationTemplate() {
      //console.log('viewModelFromProcModel', this.viewModelFromProcModel)
      if (this.viewModelFromProcModel===undefined||this.viewModelFromProcModel.langConfig===undefined
        ||this.viewModelFromProcModel.langConfig.gridHeader===undefined||this.viewModelFromProcModel.langConfig.gridHeader.created_on===undefined
        ||this.viewModelFromProcModel.filter!=="pending"){
          
          return html``
        }
      return html`
      <tr-dialog id="investigationDialog" ?open=${this.openInvests.length}        
        @closed=${e => { if (e.target === this.investigationDialog) { this.openInvests = []; this.grid.activeItem = null } }}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified" style="width:450px;">
          <div style="height:55vh;overflow:auto">
            <vaadin-grid .items=${this.openInvests} id="investigationGrid" theme="row-dividers" column-reordering-allowed multi-sort 
              @active-item-changed=${e => this.selectedInvestigations = e.detail.value ? [e.detail.value] : []}
              .selectedItems="${this.selectedInvestigations}" all-rows-visible>
              <vaadin-grid-sort-column width="40%" resizable text-align="center" path="id" header="Id"></vaadin-grid-sort-column>
              <vaadin-grid-filter-column width="60%" resizable text-align="center" path="created_on" .header="${this.viewModelFromProcModel.langConfig.gridHeader.created_on["label_" + this.lang]}"></vaadin-grid-filter-column>
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
    decisionTemplate() {
      if (this.viewModelFromProcModel===undefined||this.viewModelFromProcModel.langConfig===undefined||this.viewModelFromProcModel.langConfig.fieldText===undefined
        ||this.viewModelFromProcModel.filter!=="open"
        ){return html``}
      
      return html`
      <tr-dialog id="decisionDialog" 
        @opened=${() => this.capaRequired = this.capaCheck.checked}
        @closed=${e => { if (e.target === this.decisionDialog) this.grid.activeItem = null }}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <mwc-textfield id="systemName" label="${this.viewModelFromProcModel.langConfig.fieldText.systemName["label_" + this.lang]}" 
            .value=${this.selectedItems.length && this.selectedItems[0].capa_external_system_name}
            dialogInitialFocus></mwc-textfield>
          <mwc-textfield id="systemId" label="${this.viewModelFromProcModel.langConfig.fieldText.systemId["label_" + this.lang]}"
            .value=${this.selectedItems.length && this.selectedItems[0].capa_external_system_id}></mwc-textfield>
          <mwc-formfield label="${this.viewModelFromProcModel.langConfig.fieldText.capa["label_" + this.lang]}">
            <mwc-checkbox id="capaCheck" 
              ?checked=${this.selectedItems.length && this.selectedItems[0].capa_required}
              @change=${e => {                
                this.capaRequired = e.target.checked;
                this.capaId.value = "";
                this.capaName.value = "";
            }}></mwc-checkbox>
          </mwc-formfield>
          <mwc-textfield id="capaName" label="${this.viewModelFromProcModel.langConfig.fieldText.capaName["label_" + this.lang]}"
            .value=${this.selectedItems.length && this.selectedItems[0].external_system_name}
            ?hidden=${!this.capaRequired}></mwc-textfield>
          <mwc-textfield id="capaId" label="${this.viewModelFromProcModel.langConfig.fieldText.capaId["label_" + this.lang]}"
            .value=${this.selectedItems.length && this.selectedItems[0].external_system_id}
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
    get investigationDialog() {return this.shadowRoot.querySelector("tr-dialog#investigationDialog")}
    get decisionDialog() {return this.shadowRoot.querySelector("tr-dialog#decisionDialog")}
    get systemName() {return this.shadowRoot.querySelector("mwc-textfield#systemName")}
    get systemId() {return this.shadowRoot.querySelector("mwc-textfield#systemId")}
    get capaCheck() {return this.shadowRoot.querySelector("mwc-checkbox#capaCheck")}
    get capaName() {return this.shadowRoot.querySelector("mwc-textfield#capaName")}
    get capaId() {return this.shadowRoot.querySelector("mwc-textfield#capaId")}

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

      let targetValue = {
        "capaFieldValue": "Trackwise" + this.systemName.value + "*String|" + this.systemId.value + "*String|" + this.capaName.value + "*String|" + this.capaId.value + "*String",
        "capaRequired": this.capaRequired
      }
      this.performActionRequestHavingDialogOrNot(this.actionBeingPerformedModel, this.selectedItems[0], targetValue)
    }
    addInvestigationAction() {
      let targetValue = {
        "investigationId": this.selectedInvestigations[0].id,
        "objectsToAdd": "sample_analysis_result*" + this.selectedItems[0].result_id
      }
      this.performActionRequestHavingDialogOrNot(this.actionBeingPerformedModel.dialogInfo.action[0], this.selectedItems[0], targetValue, undefined, this.selectedInvestigations[0])
    }
    newInvestigationAction() {
//      console.log('newInvestigationAction')
      this.reqParams.fieldValue = "Investigation for " + this.selectedItems[0].result_id + "*String"
      this.reqParams.objectsToAdd = "sample_analysis_result*" + this.selectedItems[0].result_id
      let APIParams=this.getAPICommonParams(this.actionBeingPerformedModel)    
      let endPointUrl=this.getActionAPIUrl(this.actionBeingPerformedModel)
      if (String(endPointUrl).toUpperCase().includes("ERROR")){
          alert(endPointUrl)
          return
      }
      let params = this.config.backendUrl + endPointUrl   
        + '?' + new URLSearchParams(this.reqParams) + '&'+ new URLSearchParams(APIParams)
      this.fetchApi(params).then(() => {
        this.reload()
      })
    }

    getOpenInvestigations() {
      //this.actionBeingPerformedModel.dialogInfo.viewQuery  
      let APIParams=this.getAPICommonParams(this.actionBeingPerformedModel)    
      let endPointUrl=this.getQueryAPIUrl(this.actionBeingPerformedModel)
      if (String(endPointUrl).toUpperCase().includes("ERROR")){
          alert(endPointUrl)
          return
      }
      let params = this.config.backendUrl + endPointUrl        
        + '?' + new URLSearchParams(APIParams) //+ '&'+ new URLSearchParams(extraParams)
console.log('getOpenInvestigations', 'params', params)        
      this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          this.openInvests = j
          this.requestUpdate()
        }
      })
    }

    addInvestObjects() {
      let params = this.config.backendUrl + this.selectedDialogAction.endPoint
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.investigationDialog.close()
        this.resetDialogThings()
        this.reload()
      })
    }

    capaDecisionAction() {
      let APIParams=this.getAPICommonParams(this.actionBeingPerformedModel)    
      let endPointUrl=this.getActionAPIUrl(this.actionBeingPerformedModel)
      if (String(endPointUrl).toUpperCase().includes("ERROR")){
          alert(endPointUrl)
          return
      }
      console.log('capaDecisionAction', 'reqParams', this.reqParams)
      let params = this.config.backendUrl + endPointUrl   
        + '?' + new URLSearchParams(this.reqParams) + '&'+ new URLSearchParams(APIParams)
      this.fetchApi(params).then(() => {
        this.decisionDialog.close()
        this.resetDialogThings()
        this.reload()
      })
    }

    closeInvestigation() {
      if (!this.selectedItems[0].capa_decision_on) {
        this.dispatchEvent(new CustomEvent("error", {
          detail: {
            is_error: true,
            message_en: "Required set decision before close",
            message_es: "Decisión de conjunto requerida antes del cierre"
          },
          bubbles: true,
          composed: true
        }))
        console.log("Required set decision before close")
        return
      }
      let params = this.config.backendUrl + this.selectedAction.endPoint
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.reload()
      })
    }


}}