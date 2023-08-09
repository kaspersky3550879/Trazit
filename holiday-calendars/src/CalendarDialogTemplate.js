import { html, nothing } from 'lit';
import { columnBodyRenderer, gridRowDetailsRenderer } from 'lit-vaadin-helpers';
import { commonLangConfig } from '@trazit/common-core';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';

export function CalendarDialogTemplate(base) {
  return class extends base {
    static get properties() {
      return {
        // targetValue: { type: Object },
        // selectedDialogAction: { type: Object },
        // numDays: { type: Number },
        // deactivatedObjects: { type: Array },
        // dataForDialog: { type: Object },
        // fromGrid: { type: Boolean }
        selectedAction: {type: Array}
      }
    }

    constructor() {
      super()
      this.selectedAction = []
    //   this.numDays = 7
    //   this.deactivatedObjects = []
    //   this.fromGrid = false
    }



    defaultValue(){
        //console.log('defaultValue')
        this.resetFields()
        let dlgFlds=this.actionBeingPerformedModel.dialogInfo.fields
        if (dlgFlds===undefined){
            //alert('The dialog '+this.actionBeingPerformedModel.dialogInfo.name+' has no fields property for adding the fields, please review.')
            return
        }
        for (let i=0;i<dlgFlds.length;i++){
            let fldObj=dlgFlds[i]
            let keyName=Object.keys(fldObj)
            
            //if (==null){            
            if (fldObj[keyName].default_value!==undefined&&fldObj[keyName].default_value!==null){
                this[keyName[0]].value=fldObj[keyName].default_value
            }
            if (fldObj[keyName].selObjectPropertyName!==undefined&&fldObj[keyName].selObjectPropertyName!==null){
                this[keyName[0]].value=this.selectedItems[0][fldObj[keyName].selObjectPropertyName]
            }
            if (fldObj[keyName].internalVariableObjName!==undefined&&fldObj[keyName].internalVariableObjName!==null&&
                fldObj[keyName].internalVariableObjProperty!==undefined&&fldObj[keyName].internalVariableObjProperty!==null){
                this[keyName[0]].value=this[fldObj[keyName].internalVariableObjName][0][fldObj[keyName].internalVariableObjProperty]
            }
        }
    }    
    resetFields(){           
        //alert('reset Fields now')   
        let dlgFlds=this.actionBeingPerformedModel.dialogInfo.fields
        if (dlgFlds===undefined){
            //alert('The dialog '+this.actionBeingPerformedModel.dialogInfo.name+' has no fields property for adding the fields, please review.')
            return
        }
        for (let i=0;i<dlgFlds.length;i++){
            let fldObj=dlgFlds[i]
            let keyName=Object.keys(fldObj)
            if (this[keyName]!==null){
                this[keyName[0]].value=""
            }
        }
    }
    cleanFormFields(){
        if (this.text1){this.text1.value=''}
        if (this.number1){this.number1.value=''}
        //if (this.list1){this.list1.value=[]}
        //if (this.listSelectedStudyIndividuals){this.listSelectedStudyIndividuals.value=''}
      }
    calendarDialogsTemplate() {   
      //console.log('calendarDialogsTemplate') 
      
      if (this.selectedAction&&this.selectedAction.dialogInfo){ 
        //console.log(this.selectedAction.actionName, this.selectedAction.dialogInfo)
        if (this.selectedAction&&this.selectedAction.dialogInfo.name==='reactivateObjectDialog'){
          return
        }
        
      }
      return html`
        <tr-dialog id="genericFormDialog"         
        heading=""
        hideActions=""
        @closed=${() => this.cleanFormFields()}
        scrimClickAction="">
            ${this.selectedAction===undefined||this.selectedAction.dialogInfo===undefined ?
            html`hola`: html`    
            <div class="layout vertical flex center-justified">
            ${!this.selectedAction.dialogInfo.fields.text1 ?
                html``: html`        
                <div class="layout horizontal flex center-center">
                <mwc-textfield class="layout flex" id="text1" type="text" 
                .value=${this.selectedAction.dialogInfo.fields.text1.default_value ? this.selectedAction.dialogInfo.fields.text1.default_value : ''} @change=${e => this.numDays = e.target.value}
                label="${this.selectedAction.dialogInfo.fields.text1["label_" + this.lang]}"
                @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedActionNoCredChecker()}></mwc-textfield>
                </div>
            `}          
            ${!this.selectedAction.dialogInfo.fields.text2 ?
              html``: html`        
              <div class="layout horizontal flex center-center">
              <mwc-textfield class="layout flex" id="text2" type="text" 
              .value=${this.selectedAction.dialogInfo.fields.text2.default_value ? this.selectedAction.dialogInfo.fields.text2.default_value : ''} @change=${e => this.numDays = e.target.value}
              label="${this.selectedAction.dialogInfo.fields.text2["label_" + this.lang]}"
              @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedActionNoCredChecker()}></mwc-textfield>
              </div>
            `}          
            ${!this.selectedAction.dialogInfo.fields.number1 ?
                html``: html`        
                <div class="layout horizontal flex center-center">
                <mwc-textfield class="layout flex" id="number1" type="number" 
                .value=${this.selectedAction.dialogInfo.fields.number1.default_value ? this.selectedAction.dialogInfo.fields.number1.default_value : ''} @change=${e => this.numDays = e.target.value}
                label="${this.selectedAction.dialogInfo.fields.number1["label_" + this.lang]}"
                @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedActionNoCredChecker()}></mwc-textfield>
                </div>
            `}          
            ${!this.selectedAction.dialogInfo.fields.list1 ?
            html``: html`        
                <mwc-select id="list1" label="${this.selectedAction&&this.selectedAction.dialogInfo&&this.selectedAction.dialogInfo.fields.list1&&this.selectedAction.dialogInfo.fields.list1["label_" + this.lang]}">
                ${this.selectedAction.dialogInfo.fields.list1.items.map((c, i) =>
                    html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
                )}
                </mwc-select>
            `}    
            ${this.selectedAction.dialogInfo.fields.date1 ?
              html`
              <label for="fname">${this.selectedAction.dialogInfo.fields.date1["label_" + this.lang]}</label><br>
              <input id="date1" type="date" dialogInitialFocus>
              ` : nothing
            }
            <div style="margin-top:30px;text-align:center">
              <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
                  ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
              <sp-button size="xl" slot="primaryAction" @click=${this.genomaSuperDialogClickedActionNoCredChecker}>
                  ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
              </div>
            </div>
            `
            }    
        </tr-dialog>     
        
    `}        
    get genericFormDialog() {return this.shadowRoot.querySelector("tr-dialog#genericFormDialog")}
    get text1() {    return this.shadowRoot.querySelector("mwc-textfield#text1")    }
    get text2() {    return this.shadowRoot.querySelector("mwc-textfield#text2")    }
    get number1() {    return this.shadowRoot.querySelector("mwc-textfield#number1")    }    
    get list1() {    return this.shadowRoot.querySelector("mwc-select#list1")    }
    get date1() {return this.shadowRoot.querySelector("input#date1")}    
    

    get objectSetResultValue() {return this.shadowRoot.querySelector("tr-dialog#objectSetResultValue")      }  

    xlistItemValueToGet(entry){
      if (this.selectedAction.dialogInfo===undefined||this.selectedAction.dialogInfo.listDefinition===undefined||this.selectedAction.dialogInfo.listDefinition.keyFldName===undefined){
        alert('This selected action has no the requirements, requieres dialogInfo.listDefinition.keyFldName property, check the console')
        console.log('this.selectedAction', this.selectedAction)
        return entry["name"]
      }
      return entry[this.selectedAction.dialogInfo.listDefinition.keyFldName]
    }
    xlistItemValueToDisplay(entry){
      if (this.selectedAction.dialogInfo===undefined||this.selectedAction.dialogInfo.listDefinition===undefined||this.selectedAction.dialogInfo.listDefinition.eachEntryTextGenerator===undefined){
        alert('This selected action has no the requirements, requieres dialogInfo.listDefinition.eachEntryTextGenerator property, check the console')
        console.log('this.selectedAction', this.selectedAction)
        return entry["name"]
      }
      var lFlds=this.selectedAction.dialogInfo.listDefinition.eachEntryTextGenerator
      var textToDisplay=''
      for (var i = 0; i < lFlds.length; i++) {
        if (lFlds[i].type=='fix'){textToDisplay=textToDisplay+lFlds[i].value}
        if (lFlds[i].type=='field'){textToDisplay=textToDisplay+entry[lFlds[i].value]}
      }
      return textToDisplay
      //return entry["description"]+' ('+entry["name"]+')'
    }
    listItemValueToGet(fieldDef, entry){
      console.log('fieldDef', fieldDef, 'entry', entry)      
      if (fieldDef===undefined||fieldDef.keyFldName===undefined){
        alert('This selected action has no the requirements, requieres dialogInfo.keyFldName property, check the console')        
        return entry["name"]
      }
      return entry[fieldDef.keyFldName]
    }
    listItemValueToDisplay(fieldDef, entry){
      console.log('fieldDef', fieldDef, 'entry', entry)
      if (fieldDef===undefined||fieldDef.eachEntryTextGenerator===undefined){
        alert('This selected action has no the requirements, requieres dialogInfo.eachEntryTextGenerator property, check the console')
        return entry["name"]
      }
      var lFlds=fieldDef.eachEntryTextGenerator
      var textToDisplay=''
      for (var i = 0; i < lFlds.length; i++) {
        if (lFlds[i].type=='fix'){textToDisplay=textToDisplay+lFlds[i].value}
        if (lFlds[i].type=='field'){textToDisplay=textToDisplay+entry[lFlds[i].value]}
      }
      return textToDisplay
      //return entry["description"]+' ('+entry["name"]+')'
    }
   
  }
}