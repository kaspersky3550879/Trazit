import { html } from 'lit';
import { commonLangConfig } from '@trazit/common-core';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';
import {DialogsFunctions} from './DialogsFunctions';
export function TrazitFormsElements(base) {
  return class extends DialogsFunctions(base) {
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
        fromGrid: { type: Boolean },
        fields:{type: Array},
        declineDialog:{type: Object},
        masterData:{type: Object}
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
      this.fields=[]
      this.actionBeingPerformedModel={}
      this.fieldsShouldBeReset=true
      this.masterData={}
    }
    openThisDialog(actionModel = this.actionBeingPerformedModel){
       if (!actionModel||!actionModel.dialogInfo||!actionModel.dialogInfo.fields){
        //alert(false)
        return false
       }      
       // alert(true)
       this.defaultValue()
       //this.resetFields()
       return true 
    }
        
    
    setValidVal(e, fieldDef) {
        console.log('setValidVal', e, 'fieldDef', fieldDef)
        
      if (fieldDef.min_allowed!==undefined && typeof fieldDef.min_allowed == 'number' && e.target.value < fieldDef.min_allowed) {
        e.target.value = fieldDef.min_allowed
        return
      }
      if ( fieldDef.max_allowed!==undefined && typeof fieldDef.max_allowed == 'number' && e.target.value > fieldDef.max_allowed) {
        e.target.value = fieldDef.max_allowed
        return
      }
      // make sure the decimal length <= max_dp when manual input
      if (fieldDef.max_dp!==undefined && fieldDef.max_dp) {
        let v = e.target.value.split(".")
        if (v.length > 1 && v[1].length > fieldDef.max_dp) {
          v[1] = v[1].substring(0, fieldDef.max_dp)
          e.target.value = Number(v.join("."))
        }
      }
    }    
    fieldLabel(fld){        
        let fldLbl= fld["label_" + this.lang]
        if (fld.optional===undefined||fld.optional===false){
            fldLbl="* "+fldLbl
        }
        return fldLbl
    }

    fldDefaultValue(fldDef){
        if (fldDef.default_value){
            return fldDef.default_value
        } else if (fldDef.internalVariableSimpleObjName&&fldDef.internalVariableSimpleObjProperty) {          
            if (this[fldDef.internalVariableSimpleObjName]===undefined||this[fldDef.internalVariableSimpleObjName][fldDef.internalVariableSimpleObjProperty]===undefined){
              var msg=""
              if (this[fldDef.internalVariableSimpleObjName][fldDef.internalVariableSimpleObjProperty]===undefined){
                msg='The object '+fldDef.internalVariableSimpleObjName+' has no one property called '+fldDef.internalVariableSimpleObjProperty
                alert(msg)
              }else{
                msg='there is no object called '+fldDef.internalVariableSimpleObjName+' in this view'
                alert(msg)
              }
              return "ERROR: "+msg
            }  
            return this[fldDef.internalVariableSimpleObjName][fldDef.internalVariableSimpleObjProperty]          
        } else if (fldDef.internalVariableObjName&&fldDef.internalVariableObjProperty) {          
            if (this[fldDef.internalVariableObjName]===undefined||this[fldDef.internalVariableObjName][0][fldDef.internalVariableObjProperty]===undefined){
            var msg=""
            if (this[fldDef.internalVariableObjName][0][fldDef.internalVariableObjProperty]===undefined){
                msg='The object '+fldDef.internalVariableObjName+' has no one property called '+fldDef.internalVariableObjProperty
                alert(msg)
                //console.log(msg, this[fldDef.internalVariableObjName][0])
            }else{
                msg='there is no object called '+fldDef.internalVariableObjName+' in this view'
                alert(msg)
            }
        //    alert('No family selected')
            return "ERROR: "+msg
            }  
            return this[fldDef.internalVariableObjName][0][fldDef.internalVariableObjProperty]
        
        } else if (fldDef.element) {
        
        } else if (fldDef.defaultValue) {
        if (fldDef.isAdhocField!==undefined&&fldDef.isAdhocField===true){
            curArgName=jsonParam[fldDef.argumentName]
            if (curArgName===undefined){curArgName=''}
            if (curArgName.length>0){curArgName=curArgName+"|"}
            curArgName=curArgName+fldDef.defaultValue
            if (fldDef.fieldType!==undefined){
            curArgName=curArgName+"*"+fldDef.fieldType
            }
            return curArgName
        }else{
            return fldDef.defaultValue // get value from default value (i.e incubator)
        }
        } else if (fldDef.selObjectPropertyName) {
            return selObject[fldDef.selObjectPropertyName] // get value from selected item
        } else if (fldDef.targetValue) {
            return targetValue[fldDef.argumentName] // get value from target element passed
        } else if (fldDef.fixValue) {
            return fldDef.fixValue
        } else if (fldDef.contextVariableName) {
            return this[fldDef.contextVariableName]
        } else {
            return ""
        }

    }

    /** Date Template Dialog part  @open=${this.defaultValue()}*/
    genericFormElements(fields) {
        if (fields===undefined){fields=[]}
        // if (this.actionBeingPerformedModel.dialogInfo === undefined) {
        //     //alert('genericFormElements has no dialogInfo')
        //     return nothing
        // }
        // if (this.actionBeingPerformedModel!==undefined&&this.actionBeingPerformedModel.dialogInfo!==undefined&&this.actionBeingPerformedModel.dialogInfo.name === "genericDialog"){
        //     let dlgFlds=fields
        //     if (dlgFlds===undefined){
        //         alert('The dialog '+this.actionBeingPerformedModel.dialogInfo.name+' has no fields property for adding the fields, please review.')
        //         return nothing
        //     }
        // }    

         // @closed=${this.resetFields} this is in use but moved to be executed about to perform the fetchApi 
         //     otherwise it is not compatible with actions requiring credentials dialog.
         this.fields=fields
     
    return html`
    <style>
    mwc-textfield {
        border-style : Solid;
        border-color : #999999;
        border-color : rgba(153, 153, 153, 1);
        border-width : 1px;
        border-radius : 7px;
        -moz-border-radius : 7px;
        -webkit-border-radius : 7px;   
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        background-color :  #FFFFFF;
        background-color : rgb(255, 255, 255);  
        --mdc-text-field-idle-line-color:#148CFA;
        --mdc-text-field-outlined-idle-border-color: #148CFA;
        --mdc-text-field-label-ink-color:  #148CFA;
        --mdc-text-field-focused-label-color: #148CFA;
        --mdc-theme-primary: #0465FB;
      }
      mwc-select {        
        --mdc-theme-primary : rgba(36, 192, 235, 1);
        --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
        --mdc-select-ink-color: rgb(47, 47, 47);
        --mdc-select-dropdown-icon-color:rgba(36, 192, 235, 1);
        --mdc-select-hover-line-color:rgba(36, 192, 235, 1);
        --mdc-notched-outline-border-color: rgba(186, 235, 248, 0.4);
        --mdc-select-disabled-dropdown-icon-color:rgba(36, 192, 235, 1);

        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }
      mwc-select.outlined {        
        --mdc-theme-primary : rgba(36, 192, 235, 1);
        --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
        --mdc-select-ink-color: rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        background-color: 4fcad029;
      } 
      mwc-formfield{        
        --mdc-theme-secondary: #1473e6;
      }      
    </style>
        ${!fields ?
            html``: html`              
            ${fields.map((fld, i) =>             
                html`            
                ${!fld.text1 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text1" type="text" .value=${this.fldDefaultValue(fld.text1)}  label="${this.fieldLabel(fld.text1)}" 
                        @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}          
                ${!fld.text2 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text2" type="text" .value=${this.fldDefaultValue(fld.text2)} label="${this.fieldLabel(fld.text2)}" 
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}          
                ${!fld.text3 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text3" type="text" .value=${this.fldDefaultValue(fld.text3)} label="${this.fieldLabel(fld.text3)}" 
                        @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}                       
                ${!fld.text4 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text4" type="text" .value=${this.fldDefaultValue(fld.text4)} label="${this.fieldLabel(fld.text4)}" 
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}          
                ${!fld.text5 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text5" type="text" .value=${this.fldDefaultValue(fld.text)} label="${this.fieldLabel(fld.text5)}" 
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}          
                ${!fld.text6 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text6" type="text" .value=${this.fldDefaultValue(fld.text6)} label="${this.fieldLabel(fld.text6)}" 
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}          
                ${!fld.text7 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text7" type="text" .value=${this.fldDefaultValue(fld.text7)} label="${this.fieldLabel(fld.text7)}" 
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}          
                ${!fld.text8 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text8" type="text" .value=${this.fldDefaultValue(fld.text8)}label="${this.fieldLabel(fld.text8)}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}          
                ${!fld.text9 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text9" type="text" .value=${this.fldDefaultValue(fld.text9)} label="${this.fieldLabel(fld.text9)}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}          
                ${!fld.text10 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text10" type="text" .value=${this.fldDefaultValue(fld.text10)} label="${this.fieldLabel(fld.text10)}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}                              
                ${!fld.number1 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number1" type="number" 
                    @input=${e=>this.setValidVal(e, fld)} .value=${this.fldDefaultValue(fld.number1)} label="${this.fieldLabel(fld.number1)}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}   
                ${!fld.number2 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number2" type="number" @input=${e=>this.setValidVal(e, fld)}
                    .value=${this.fldDefaultValue(fld.number2)}   label="${this.fieldLabel(fld.number2)}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}   
                ${!fld.number3 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number3" type="number" @input=${e=>this.setValidVal(e, fld)}
                    .value=${this.fldDefaultValue(fld.number3)}   label="${this.fieldLabel(fld.number3)}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}   
                ${!fld.number4 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number4" type="number" @input=${e=>this.setValidVal(e, fld)}
                    .value=${this.fldDefaultValue(fld.number4)}   label="${this.fieldLabel(fld.number4)}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}   
                ${!fld.number5 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number5" type="number" @input=${e=>this.setValidVal(e, fld)}
                    .value=${this.fldDefaultValue(fld.number5)}   label="${this.fieldLabel(fld.number5)}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}   
                ${!fld.number6 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number6" type="number" @input=${e=>this.setValidVal(e, fld)}
                    .value=${this.fldDefaultValue(fld.number6)}  label="${this.fieldLabel(fld.number6)}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}   
                ${!fld.number7 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number7" type="number" @input=${e=>this.setValidVal(e, fld)}
                    .value=${this.fldDefaultValue(fld.number7)}   label="${this.fieldLabel(fld.number7)}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}   
                ${!fld.number8 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number8" type="number" @input=${e=>this.setValidVal(e, fld)}
                    .value=${this.fldDefaultValue(fld.number8)}   label="${this.fieldLabel(fld.number8)}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}   
                ${!fld.number9 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number9" type="number" @input=${e=>this.setValidVal(e, fld)}
                    .value=${this.fldDefaultValue(fld.number9)}   label="${this.fieldLabel(fld.number9)}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}   
                ${!fld.number10 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number10" type="number" @input=${e=>this.setValidVal(e, fld)}
                    .value=${this.fldDefaultValue(fld.number10)}   label="${this.fieldLabel(fld.number10)}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}   
                ${!fld.checkbox1 ?
                    html``: html`        
                    <mwc-formfield label="${this.fieldLabel(fld.checkbox1)}" >
                        <mwc-checkbox id="checkbox1" ?checked=${this.fldDefaultValue(fld.checkbox1)}
                        @change=${e => { this.checkbox1.value=this.checkbox1.checked}} value="${this.fldDefaultValue(fld.checkbox1)}"
                        ></mwc-checkbox>
                    </mwc-formfield>
                `}                              
                    ${!fld.checkbox2 ?
                    html``: html`        
                    <mwc-formfield label="${this.fieldLabel(fld.checkbox2)}" >
                        <mwc-checkbox id="checkbox2" ?checked=${this.fldDefaultValue(fld.checkbox2)}
                        @change=${e => { this.checkbox2.value=this.checkbox2.checked}} value="${this.fldDefaultValue(fld.checkbox2)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.checkbox3 ?
                    html``: html`        
                    <mwc-formfield label="${this.fieldLabel(fld.checkbox3)}" >
                        <mwc-checkbox id="checkbox3" ?checked=${this.fldDefaultValue(fld.checkbox3)}
                        @change=${e => { this.checkbox3.value=this.checkbox3.checked}} value="${this.fldDefaultValue(fld.checkbox3)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.checkbox4 ?
                    html``: html`        
                    <mwc-formfield label="${this.fieldLabel(fld.checkbox4)}" >
                        <mwc-checkbox id="checkbox4" ?checked=${this.fldDefaultValue(fld.checkbox4)}
                        @change=${e => { this.checkbox4.value=this.checkbox4.checked}} value="${this.fldDefaultValue(fld.checkbox4)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.checkbox5 ?
                    html``: html`        
                        <mwc-formfield label="${this.fieldLabel(fld.checkbox5)}" >
                        <mwc-checkbox id="checkbox5" ?checked=${this.fldDefaultValue(fld.checkbox5)} @change=${e => { this.checkbox5.value=this.checkbox5.checked}}
                        value="${this.fldDefaultValue(fld.checkbox5)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.checkbox6 ?
                    html``: html`        
                        <mwc-formfield label="${this.fieldLabel(fld.checkbox6)}" >
                        <mwc-checkbox id="checkbox6" ?checked=${this.fldDefaultValue(fld.checkbox6)}
                        @change=${e => { this.checkbox6.value=this.checkbox6.checked}} value="${this.fldDefaultValue(fld.checkbox6)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.checkbox7 ?
                    html``: html`        
                        <mwc-formfield label="${this.fieldLabel(fld.checkbox7)}" >
                        <mwc-checkbox id="checkbox7" ?checked=${this.fldDefaultValue(fld.checkbox7)}
                        @change=${e => { this.checkbox7.value=this.checkbox7.checked}} value="${this.fldDefaultValue(fld.checkbox7)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.checkbox8 ?
                    html``: html`        
                        <mwc-formfield label="${this.fieldLabel(fld.checkbox8)}" >
                        <mwc-checkbox id="checkbox8" ?checked=${this.fldDefaultValue(fld.checkbox8)}
                        @change=${e => { this.checkbox8.value=this.checkbox8.checked}} value="${this.fldDefaultValue(fld.checkbox8)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.checkbox9 ?
                    html``: html`        
                        <mwc-formfield label="${this.fieldLabel(fld.checkbox9)}" >
                        <mwc-checkbox id="checkbox9" ?checked=${this.fldDefaultValue(fld.checkbox9)}
                        @change=${e => { this.checkbox9.value=this.checkbox9.checked}} value="${this.fldDefaultValue(fld.checkbox9)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.checkbox10 ?
                    html``: html`        
                        <mwc-formfield label="${this.fieldLabel(fld.checkbox10)}" >
                        <mwc-checkbox id="checkbox10" ?checked=${this.fldDefaultValue(fld.checkbox10)}
                        @change=${e => { this.checkbox10.value=this.checkbox10.checked}} value="${this.fldDefaultValue(fld.checkbox10)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              

                    ${!fld.date1 ?html``: html`<mwc-textfield id="date1" label="${this.fieldLabel(fld.date1)}" type="date"></mwc-textfield>`}
                    ${!fld.date2 ?html``: html`<mwc-textfield id="date2" label="${this.fieldLabel(fld.date2)}" type="date"></mwc-textfield>`}
                    ${!fld.date3 ?html``: html`<mwc-textfield id="date3" label="${this.fieldLabel(fld.date3)}" type="date"></mwc-textfield>`}
                    ${!fld.date4 ?html``: html`<mwc-textfield id="date4" label="${this.fieldLabel(fld.date4)}" type="date"></mwc-textfield>`}
                    ${!fld.date5 ?html``: html`<mwc-textfield id="date5" label="${this.fieldLabel(fld.date5)}" type="date"></mwc-textfield>`}                           
                    ${!fld.date6 ?html``: html`<mwc-textfield id="date6" label="${this.fieldLabel(fld.date6)}" type="date"></mwc-textfield>`} 
                    ${!fld.date7 ?html``: html`<mwc-textfield id="date7" label="${this.fieldLabel(fld.date7)}" type="date"></mwc-textfield>`}
                    ${!fld.date8 ?html``: html`<mwc-textfield id="date8" label="${this.fieldLabel(fld.date8)}" type="date"></mwc-textfield>`}
                    ${!fld.date9 ?html``: html`<mwc-textfield id="date9" label="${this.fieldLabel(fld.date9)}" type="date"></mwc-textfield>`}
                    ${!fld.date10 ?html``: html`<mwc-textfield id="date10" label="${this.fieldLabel(fld.date10)}" type="date"></mwc-textfield>`}

                    ${!fld.datetime1 ?html``: html`<input id="datetime1" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.datetime2 ?html``: html`<input id="datetime2" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.datetime3 ?html``: html`<input id="datetime3" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.datetime4 ?html``: html`<input id="datetime4" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.datetime5 ?html``: html`<input id="datetime5" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.datetime6 ?html``: html`<input id="datetime6" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.datetime7 ?html``: html`<input id="datetime7" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.datetime8 ?html``: html`<input id="datetime8" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.datetime9 ?html``: html`<input id="datetime9" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.datetime10 ?html``: html`<input id="datetime10" type="datetime-local" dialogInitialFocus>`}   

                    
                    ${!fld.daterange1 ?
                    html``: html`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange1dateStart" label="${this.fieldLabel(fld.daterange1.dateStart)}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange1dateEnd" label="${this.fieldLabel(fld.daterange1.dateEnd)}" type="date"></mwc-textfield>
                        </div>
                    `}                       
                    ${!fld.daterange2 ?
                    html``: html`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange2dateStart" label="${this.fieldLabel(fld.daterange2.dateStart)}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange2dateEnd" label="${this.fieldLabel(fld.daterange2.dateEnd)}" type="date"></mwc-textfield>
                        </div>
                    `}                       
                    ${!fld.daterange3 ?
                    html``: html`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange3dateStart" label="${this.fieldLabel(fld.daterange3.dateStart)}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange3dateEnd" label="${this.fieldLabel(fld.daterange3.dateEnd)}" type="date"></mwc-textfield>
                        </div>
                    `}                       
                    ${!fld.daterange4 ?
                    html``: html`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange4dateStart" label="${this.fieldLabel(fld.daterange4.dateStart)}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange4dateEnd" label="${this.fieldLabel(fld.daterange4.dateEnd)}" type="date"></mwc-textfield>
                        </div>
                    `}                       
                    ${!fld.daterange5 ?
                    html``: html`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange5dateStart" label="${this.fieldLabel(fld.daterange5.dateStart)}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange5dateEnd" label="${this.fieldLabel(fld.daterange5.dateEnd)}" type="date"></mwc-textfield>
                        </div>
                    `}                                   

                ${!fld.list1 ?html``: html`        
                    <mwc-select id="list1" label="${this.fieldLabel(fld.list1)}" @selected=${this.valueSelected} >
                        ${this.listEntries(fld.list1)}</mwc-select>`}  
                ${!fld.list2 ?html``: html`        
                    <mwc-select id="list2" label="${this.fieldLabel(fld.list2)}">
                        ${this.listEntries(fld.list2)}</mwc-select>`}  
                ${!fld.list3 ?html``: html`        
                    <mwc-select id="list3" label="${this.fieldLabel(fld.list3)}">
                        ${this.listEntries(fld.list3)}</mwc-select>`}  
                ${!fld.list4 ?html``: html`        
                    <mwc-select id="list4" label="${this.fieldLabel(fld.list4)}" ?disabled=${this.fldDisabled}>
                        ${this.listEntries(fld.list4)}</mwc-select>`}  
                ${!fld.list5 ?html``: html`        
                    <mwc-select id="list5" label="${this.fieldLabel(fld.list5)}" ?disabled=${this.fldDisabled}>
                        ${this.listEntries(fld.list5)}</mwc-select>`}  
                ${!fld.list6 ?html``: html`        
                    <mwc-select id="list6" label="${this.fieldLabel(fld.list6)}">
                        ${this.listEntries(fld.list6)}</mwc-select>`}  
                ${!fld.list7 ?html``: html`        
                    <mwc-select id="list7" label="${this.fieldLabel(fld.list7)}">
                        ${this.listEntries(fld.list7)}</mwc-select>`}  
                ${!fld.list8 ?html``: html`        
                    <mwc-select id="list8" llabel="${this.fieldLabel(fld.list8)}">
                        ${this.listEntries(fld.list8)}</mwc-select>`}  
                ${!fld.list9 ?html``: html`        
                    <mwc-select id="list9" label="${this.fieldLabel(fld.list9)}">
                        ${this.listEntries(fld.list9)}</mwc-select>`}  
                ${!fld.list10 ?html``: html`        
                    <mwc-select id="list10" label="${this.fieldLabel(fld.list10)}">
                        ${this.listEntries(fld.list10)}</mwc-select>`}  

                    ${!fld.listMDSamplerPersonalAreas ?
                    html``: html`        
                        <mwc-select id="listMDSamplerPersonalAreas" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listMDSamplerPersonalAreas&&fld.listMDSamplerPersonalAreas["label_" + this.lang]}">
                        ${this.masterData.samplerPersonalAreas.map((c, i) =>
                        html`<mwc-list-item value="${c.key}" ?selected=${i == 0}>${c["label_"+this.lang]}</mwc-list-item>`
                        )}
                        </mwc-select>
                `}           
                ${!fld.listMDprocedureUsers ?
                    html``: html`        
                        <mwc-select id="listMDprocedureUsers" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listMDprocedureUsers&&fld.listMDprocedureUsers["label_" + this.lang]}">
                        ${this.MDprocedureUsers.map((c, i) =>
                        html`<mwc-list-item value="${c.user_name}" ?selected=${i == 0}>${c.user_name}</mwc-list-item>`
                        )}
                        </mwc-select>
                `}         
                ${!fld.listMDvariablesSet ?
                    html``: html`        
                        <mwc-select id="listMDvariablesSet" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listMDvariablesSet&&fld.listMDvariablesSet["label_" + this.lang]}">
                        ${this.MDvariablesSet.map((c, i) =>
                        html`<mwc-list-item value="${c.name}" ?selected=${i == 0}>${c.name}(${c.variables_list})</mwc-list-item>`
                        )}
                        </mwc-select>
                `}           
                ${!fld.listMDvariables ?
                    html``: html`        
                        <mwc-select id="listMDvariables" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listMDvariables&&fld.listMDvariables["label_" + this.lang]}">
                        ${this.MDvariables.map((c, i) =>
                        html`<mwc-list-item value="${c.name}" ?selected=${i == 0}>${c.name}(${c.param_type})</mwc-list-item>`
                        )}
                        </mwc-select>
                `}           
            
                ${!fld.listSelectedStudyIndividuals ?
                    html``: html`        
                        <mwc-select id="listSelectedStudyIndividuals" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listSelectedStudyIndividuals&&fld.listSelectedStudyIndividuals["label_" + this.lang]}">
                        ${this.selectedStudy.study_individual.map((l, i) =>
                        html`<mwc-list-item value="${this.listItemValueToGet(fld.listSelectedStudyIndividuals, l)}" ?selected=${i == 0}>${this.listItemValueToDisplay(fld.listSelectedStudyIndividuals, l)}</mwc-list-item>`
                        )}
                        </mwc-select>
                `}    
                ${!fld.listSelectedStudyIndividualSamples ?
                    html``: html`        
                        <mwc-select id="listSelectedStudyIndividualSamples" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listSelectedStudyIndividualSamples&&fld.listSelectedStudyIndividualSamples["label_" + this.lang]}">
                        ${this.selectedStudy.study_individual.map((l, i) =>
                        html`<mwc-list-item value="${this.listItemValueToGet(fld.listSelectedStudyIndividualSamples, l)}" ?selected=${i == 0}>${this.listItemValueToDisplay(fld.listSelectedStudyIndividualSamples, l)}</mwc-list-item>`
                        )}
                        </mwc-select>
                `} 
                `            
            )}   
        `}        
    `
    }
    get dateInput() {return this.shadowRoot.querySelector("input#dateInput")}
    setNewDate() {
      if (this.dateInput.value) {
        this.dialogAccept(false)
      }
    }
    declineDialog(){
        this.fieldsShouldBeReset=true
    }
    acceptedGenericDialog(e){
        this.fieldsShouldBeReset=true
        if (this.checkMandatoryFieldsNotEmpty()){
            this.dialogAccept(false)
        }else{
            console.log('Accepted Generic Dialog but mandatories pending then action not performed')
           // alert('mandatories pending')
           e.stopPropagation();
        }
    }
    checkMandatoryFieldsNotEmpty(){                
        //console.log(this.fields)
        let dlgFlds=this.fields
        for (let i=0;i<dlgFlds.length;i++){            
            let fldObj=dlgFlds[i]
            //console.log('checkMandatoryFieldsNotEmpty', fldObj)
            let keyName=Object.keys(fldObj)
            let fldDef=fldObj[keyName[0]]
            if ((fldDef.optional===undefined||
                fldDef.optional===false)&&this[keyName].value.length==0){
                alert('Field '+fldDef["label_"+this.lang]+' is mandatory')
                return false
            }
        }
        return true
    }

    defaultValue(){
        if (this.fieldsShouldBeReset===true){
            this.resetFields()
            this.fieldsShouldBeReset=false
        }
        let dlgFlds=fields
        if (dlgFlds===undefined){
            //alert('The dialog '+this.actionBeingPerformedModel.dialogInfo.name+' has no fields property for adding the fields, please review.')
            return
        }
        for (let i=0;i<dlgFlds.length;i++){
            let fldObj=dlgFlds[i]
            let keyName=Object.keys(fldObj)
            
            //if (==null){            
            if (fldObj[keyName].default_value!==undefined&&fldObj[keyName].default_value!==null){
                //if (this[keyName[0]!==null]){
                    this[keyName[0]].value=fldObj[keyName].default_value
                //}
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
        let dlgFlds=fields
        if (dlgFlds===undefined){
            //alert('The dialog '+this.actionBeingPerformedModel.dialogInfo.name+' has no fields property for adding the fields, please review.')
            return
        }
        for (let i=0;i<dlgFlds.length;i++){
            let fldObj=dlgFlds[i]            
            let keyName=Object.keys(fldObj)
            if (this[keyName]!==null){
               // console.log(keyName[0])
                if (keyName[0].includes('list')){

                    this[keyName[0]].value=[]
                }else{
                    if (this[keyName]!==undefined&&this[keyName[0]]!==undefined){
                        this[keyName[0]].value=""
                    }
                }
            }
        }
    }
    valueSelected(e){
        return // The code below is there only for trying to make lists depending on another list, does not work yet
        //alert('ds '+ e.target.id+this[e.target.id].value)

        // var triggeredElem=fields.filter(p => p == e.target.id)

        let cleanParams = {}
        // Object.entries(fields).map(([key, value]) => {
        //   if (value != null || value != undefined) {
        //     cleanParams[key] = value
        //   }
        // })
        // console.log('cleanParams', cleanParams)
        var fld =fields[1].list2//(([key, value]) =>{
            //cleanParams=value
        //})
        console.log('fld', fld)
        let thisNewList2=[]
        thisNewList2=this.listEntries(fld)
        console.log('thisNewList2', thisNewList2)
        //alert(fields[e.target.id].valuesFromMasterData.recalculateObjectOnEntrySelected)
        //console.log(e.targetValue)
    }
    listEntries(fld){
        console.log('listEntries')
        var blankEmpty={keyName:"", keyValue_en:"", keyValue_es:""}
        var newList=[]
        if (fld===undefined){
            return html`<mwc-list-item></mwc-list-item>`

        }
        if (fld.addBlankValueOnTop!==undefined&&fld.addBlankValueOnTop===true){
            newList.push(blankEmpty)
        }
        if (fld.valuesFromMasterData!==undefined){
            var MDentriesArr=this.listEntriesFromMasterData(fld.valuesFromMasterData)
            if (MDentriesArr.length>0){
                MDentriesArr.forEach(item =>newList.push(item))
            }
        }else{
            fld.items.forEach(item =>newList.push(item))
        }
        if (fld.addBlankValueAtBottom!==undefined&&fld.addBlankValueAtBottom===true){
            newList.push(blankEmpty)
        }
    
        return html`
        ${newList.map((c, i) =>
            html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
        )}
        `
    }
    listEntriesFromMasterData(fldMDDef){
        if (this.masterData===undefined){return entries}
        console.log('masterData', this.masterData)
        console.log('actionBeingPerformedModel', this.actionBeingPerformedModel)
        var entries=[]
        
        if (this.masterData[fldMDDef.propertyNameContainer]===undefined){
            alert('Property '+fldMDDef.propertyNameContainer+' not found in Master Data')
            return entries
        }
        if (fldMDDef.filterInFirstLevel===undefined||fldMDDef.filterInFirstLevel!==true){
            this.masterData[fldMDDef.propertyNameContainer].forEach(item =>{
                console.log('item', item, 'fldMDDef.propertyNameContainer.propertyKeyName', fldMDDef.propertyKeyName)
                let blankEmpty={keyName:'', keyValue_en:'', keyValue_es:''}
                blankEmpty.keyName=item[fldMDDef.propertyKeyName]
                blankEmpty.keyValue_en=item[fldMDDef.propertyKeyValueEn]
                blankEmpty.keyValue_es=item[fldMDDef.propertyKeyValueEs]
                console.log('blankEmpty', blankEmpty)
                entries.push(blankEmpty)
            })
        }else{
            if ((fldMDDef.elementName===undefined||fldMDDef.elementName===null)&&(fldMDDef.propertyNameContainerLevelfixValue===undefined||fldMDDef.propertyNameContainerLevelfixValue===null)){
                alert('Property elementName or propertyNameContainerLevelfixValue is mandatory when filterInFirstLevel=true. Review model definition')
                return entries
            }
            let filterValue=undefined
            if (fldMDDef.propertyNameContainerLevelfixValue!==undefined){
                filterValue=fldMDDef.propertyNameContainerLevelfixValue                
            }else{
                filterValue=this[fldMDDef.elementName].value
            }
            if (filterValue===undefined){return entries}
            let result = this.masterData[fldMDDef.propertyNameContainer].find(item => item.name === filterValue);
            if (result===undefined){return entries}
            //alert(filterValue)
            // if (fldMDDef.propertyNameContainerLevel2fixValue!==undefined&&fldMDDef.propertyNameContainerLevel3){
            //     entries=getListInLevel3(fldMDDef, result[fldMDDef.propertyNameContainerLevel2])
            //     return entries
            // }
            result[fldMDDef.propertyNameContainerLevel2].forEach(item =>{
                console.log('item', item, 'fldMDDef.propertyNameContainer.propertyKeyName', fldMDDef.propertyKeyName)
                let blankEmpty={keyName:'', keyValue_en:'', keyValue_es:''}
                blankEmpty.keyName=item[fldMDDef.propertyKeyName]
                blankEmpty.keyValue_en=item[fldMDDef.propertyKeyValueEn]
                blankEmpty.keyValue_es=item[fldMDDef.propertyKeyValueEs]
                console.log('blankEmpty', blankEmpty)
                entries.push(blankEmpty)
            })
            console.log('entries at end', entries)
            return entries
            
        }        
        //var blankEmpty={keyName:"1", keyValue_en:"2", keyValue_es:"3"}
        //entries.push(blankEmpty)
        return entries
    }
    getListInLevel3(fldMDDef, level2Arr){
        let level3Arr = level2Arr.filter(p => p[propertyNameContainerLevel2PropertyKeyName] == fldMDDef.propertyNameContainerLevel2fixValue)
        level3Arr[fldMDDef.propertyNameContainerLevel3].forEach(item =>{
            console.log('item', item, 'fldMDDef.propertyNameContainer.propertyKeyName', fldMDDef.propertyNameContainerLevel2PropertyKeyName)
            let blankEmpty={keyName:'', keyValue_en:'', keyValue_es:''}
            blankEmpty.keyName=item[fldMDDef.propertyKeyName]
            blankEmpty.keyValue_en=item[fldMDDef.propertyKeyValueEn]
            blankEmpty.keyValue_es=item[fldMDDef.propertyKeyValueEs]
            console.log('blankEmpty', blankEmpty)
            entries.push(blankEmpty)
        })

    }
    fldDisabled(){
        return true
    }   
    get text1() {    return this.shadowRoot.querySelector("mwc-textfield#text1")    }        
    get text2() {    return this.shadowRoot.querySelector("mwc-textfield#text2")    }        
    get text3() {    return this.shadowRoot.querySelector("mwc-textfield#text3")    }        
    get text4() {    return this.shadowRoot.querySelector("mwc-textfield#text4")    }        
    get text5() {    return this.shadowRoot.querySelector("mwc-textfield#text5")    }        
    get text6() {    return this.shadowRoot.querySelector("mwc-textfield#text6")    }        
    get text7() {    return this.shadowRoot.querySelector("mwc-textfield#text7")    }        
    get text8() {    return this.shadowRoot.querySelector("mwc-textfield#text8")    }        
    get text9() {    return this.shadowRoot.querySelector("mwc-textfield#text9")    }        
    get text10() {    return this.shadowRoot.querySelector("mwc-textfield#text10")    }        
    get text10() {    return this.shadowRoot.querySelector("mwc-textfield#text10")    } 
    get checkbox1() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox1")    }        
    get checkbox2() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox2")    }        
    get checkbox3() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox3")    }        
    get checkbox4() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox4")    }        
    get checkbox5() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox5")    }        
    get checkbox6() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox6")    }        
    get checkbox7() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox7")    }        
    get checkbox8() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox8")    }        
    get checkbox9() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox9")    }        
    get checkbox10() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox10")    }        
    get date1() {    return this.shadowRoot.querySelector("mwc-textfield#date1")    }        
    get date2() {    return this.shadowRoot.querySelector("mwc-textfield#date2")    }    
    get date3() {    return this.shadowRoot.querySelector("mwc-textfield#date3")    }        
    get date4() {    return this.shadowRoot.querySelector("mwc-textfield#date4")    }    
    get date5() {    return this.shadowRoot.querySelector("mwc-textfield#date5")    }        
    get date6() {    return this.shadowRoot.querySelector("mwc-textfield#date6")    }    
    get date7() {    return this.shadowRoot.querySelector("mwc-textfield#date7")    }        
    get date8() {    return this.shadowRoot.querySelector("mwc-textfield#date8")    }    
    get date9() {    return this.shadowRoot.querySelector("mwc-textfield#date9")    }        
    get date10() {    return this.shadowRoot.querySelector("mwc-textfield#date10")    }    
    get datetime1() {    return this.shadowRoot.querySelector("input#datetime1")    }        
    get datetime2() {    return this.shadowRoot.querySelector("input#datetime2")    }    
    get datetime3() {    return this.shadowRoot.querySelector("input#datetime3")    }        
    get datetime4() {    return this.shadowRoot.querySelector("input#datetime4")    }    
    get datetime5() {    return this.shadowRoot.querySelector("input#datetime5")    }        
    get datetime6() {    return this.shadowRoot.querySelector("input#datetime6")    }    
    get datetime7() {    return this.shadowRoot.querySelector("input#datetime7")    }        
    get datetime8() {    return this.shadowRoot.querySelector("input#datetime8")    }    
    get datetime9() {    return this.shadowRoot.querySelector("input#datetime9")    }        
    get datetime10() {    return this.shadowRoot.querySelector("input#datetime10")    }    

    get daterange1dateStart() {    return this.shadowRoot.querySelector("mwc-textfield#daterange1dateStart")    }        
    get daterange1dateEnd() {    return this.shadowRoot.querySelector("mwc-textfield#daterange1dateEnd")    }    
    get daterange2dateStart() {    return this.shadowRoot.querySelector("mwc-textfield#daterange2dateStart")    }        
    get daterange2dateEnd() {    return this.shadowRoot.querySelector("mwc-textfield#daterange2dateEnd")    }    
    get daterange3dateStart() {    return this.shadowRoot.querySelector("mwc-textfield#daterange3dateStart")    }        
    get daterange3dateEnd() {    return this.shadowRoot.querySelector("mwc-textfield#daterange3dateEnd")    }    
    get daterange4dateStart() {    return this.shadowRoot.querySelector("mwc-textfield#daterange4dateStart")    }        
    get daterange4dateEnd() {    return this.shadowRoot.querySelector("mwc-textfield#daterange4dateEnd")    }    
    get daterange5dateStart() {    return this.shadowRoot.querySelector("mwc-textfield#daterange5dateStart")    }        
    get daterange5dateEnd() {    return this.shadowRoot.querySelector("mwc-textfield#daterange5dateEnd")    }    
        
    get number1() {    return this.shadowRoot.querySelector("mwc-textfield#number1")    }    
    get number2() {    return this.shadowRoot.querySelector("mwc-textfield#number2")    }    
    get number3() {    return this.shadowRoot.querySelector("mwc-textfield#number3")    }    
    get number4() {    return this.shadowRoot.querySelector("mwc-textfield#number4")    }    
    get number5() {    return this.shadowRoot.querySelector("mwc-textfield#number5")    }    
    get number6() {    return this.shadowRoot.querySelector("mwc-textfield#number6")    }    
    get number7() {    return this.shadowRoot.querySelector("mwc-textfield#number7")    }    
    get number8() {    return this.shadowRoot.querySelector("mwc-textfield#number8")    }    
    get number9() {    return this.shadowRoot.querySelector("mwc-textfield#number9")    }    
    get number10() {    return this.shadowRoot.querySelector("mwc-textfield#number10")    }    
  
    get list1() {    return this.shadowRoot.querySelector("mwc-select#list1")    }
    get list2() {    return this.shadowRoot.querySelector("mwc-select#list2")    }
    get list3() {    return this.shadowRoot.querySelector("mwc-select#list3")    }
    get list4() {    return this.shadowRoot.querySelector("mwc-select#list4")    }
    get list5() {    return this.shadowRoot.querySelector("mwc-select#list5")    }    
    get list6() {    return this.shadowRoot.querySelector("mwc-select#list6")    }    
    get list7() {    return this.shadowRoot.querySelector("mwc-select#list7")    }    
    get list8() {    return this.shadowRoot.querySelector("mwc-select#list8")    }    
    get list9() {    return this.shadowRoot.querySelector("mwc-select#list9")    }    
    get list10() {    return this.shadowRoot.querySelector("mwc-select#list10")    }  
    
    get listMDprocedureUsers() {return this.shadowRoot.querySelector("mwc-select#listMDprocedureUsers")}
    get listMDSamplerPersonalAreas() {return this.shadowRoot.querySelector("mwc-select#listMDSamplerPersonalAreas")}
    get listMDvariablesSet() {return this.shadowRoot.querySelector("mwc-select#listMDvariablesSet")}
    get listMDvariables() {return this.shadowRoot.querySelector("mwc-select#listMDvariables")}
    get listSelectedStudyIndividuals() {return this.shadowRoot.querySelector("mwc-select#listSelectedStudyIndividuals")}
    get listSelectedStudyIndividualSamples() {return this.shadowRoot.querySelector("mwc-select#listSelectedStudyIndividualSamples")}
         
  }
}