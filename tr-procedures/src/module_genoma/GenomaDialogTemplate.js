import { html, nothing } from 'lit';
import { columnBodyRenderer, gridRowDetailsRenderer } from 'lit-vaadin-helpers';
import { commonLangConfig } from '@trazit/common-core';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';

export function GenomaDialogTemplate(base) {
  return class extends base {
    static get properties() {
      return {
        // targetValue: { type: Object },
        // selectedDialogAction: { type: Object },
        // numDays: { type: Number },
        // deactivatedObjects: { type: Array },
        // dataForDialog: { type: Object },
        // fromGrid: { type: Boolean }
      }
    }

    constructor() {
      super()
    //   this.numDays = 7
    //   this.deactivatedObjects = []
    //   this.fromGrid = false
    }


    cleanFormFields(){
        if (this.text1){this.text1.value=''}
        if (this.number1){this.number1.value=''}
        if (this.list1){this.list1.value=''}
        if (this.list1){this.listMDprocedureUsers.value=''}
        
        //if (this.listSelectedStudyIndividuals){this.listSelectedStudyIndividuals.value=''}
      }
    genomaDialogsSetResultValueTemplate() {   
      //console.log('genomaDialogsTemplate') 
      return html`       
        <tr-dialog id="objectSetResultValue"         
            heading=""
            hideActions=""
            @closed=${() => this.cleanFormFields()}
            scrimClickAction="">
            ${this.selectedAction===undefined||this.selectedAction.dialogInfo===undefined ?
            html``: html`    
            <div class="layout vertical flex center-justified">
            ${!this.selectedAction.dialogInfo.fieldText.variableName ?
                html``: html`        
                <div class="layout horizontal flex center-center">
                <mwc-textfield class="layout flex" id="text1" type="text" 
                .value=${this.selectedAction.dialogInfo.fieldText.variableName.default_value ? this.selectedAction.dialogInfo.fieldText.variableName.default_value : this[this.selectedAction.selObjectVariableName][0].name} 
                label="${this.selectedAction.dialogInfo.fieldText.variableName["label_" + this.lang]}"
                disabled
                @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                ${this.enterResultList()}      
                </div>
            `}                  
            `}        
        </tr-dialog>      
          
    `}        
    //get genericFormDialog() {return this.shadowRoot.querySelector("tr-dialog#genericFormDialog")    }
    get text1() {    return this.shadowRoot.querySelector("mwc-textfield#text1")    }        
    get number1() {    return this.shadowRoot.querySelector("mwc-textfield#number1")    }    
    get list1() {    return this.shadowRoot.querySelector("mwc-select#list1")    }
    get listSelectedStudyIndividuals() {    return this.shadowRoot.querySelector("mwc-select#listSelectedStudyIndividuals")    }    
    get listMDprocedureUsers() {    return this.shadowRoot.querySelector("mwc-select#listMDprocedureUsers")    }    
    get listMDvariablesSet() {    return this.shadowRoot.querySelector("mwc-select#listMDvariablesSet")    }    
    get listMDvariables() {    return this.shadowRoot.querySelector("mwc-select#listMDvariables")    }    
    get listSelectedStudyIndividualSamples() {    return this.shadowRoot.querySelector("mwc-select#listSelectedStudyIndividualSamples")    }    
    

    get objectSetResultValue() {return this.shadowRoot.querySelector("tr-dialog#objectSetResultValue")      }  

    enterResultList() {
        //console.log('enterResultList')
          return html`
          <mwc-textfield class="layout flex" id="text1" type="text" 
          .value=${this.selectedAction.dialogInfo.fieldText.variableName.default_value ? this.selectedAction.dialogInfo.fieldText.variableName.default_value : this[this.selectedAction.selObjectVariableName][0].name} 
          label="${this.selectedAction.dialogInfo.fieldText.variableName["label_" + this.lang]}"
          disabled
          @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
          ${this[this.selectedAction.selObjectVariableName][0].type}
          ${this[this.selectedAction.selObjectVariableName][0].value}      
          `    
      }
        

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