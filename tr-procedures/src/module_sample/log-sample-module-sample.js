import { html, css } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import { Layouts, Alignment } from '@collaborne/lit-flexbox-literals';
import '../components/core-view';
import '@trazit/tr-dialog/tr-dialog';
import '../form_fields/trazit-form-fields';
import {ApiFunctions} from '../components/Api/ApiFunctions'

export class LogSampleModuleSample extends (ApiFunctions(CredDialog)) {
  static get styles() {
    return [
      Layouts, Alignment,
      super.styles,
      css`
        :host {
          display: block;
        }
        .tabContainer {
          overflow: auto;
        }
        .tabContainer::-webkit-scrollbar {
          display: none;
        }
        .tabContainer > * {
          display: inline-block;
          flex-shrink: 0;
        }
        mwc-button {
          --mdc-typography-button-text-transform: none;
        }
        mwc-icon-button.slide[hidden] {
          visibility: hidden;
        }
        mwc-select[hidden] {
          display: none;
        }
      `
    ];
  }

  static get properties() {
    return {
      model: { type: Object },
      config: { type: Object },
      procInstanceName: { type: String },
      viewName: { type: String },
      filterName: { type: String },
      langConfig: { type: Object },
      actions: { type: Array },
      windowOpenable: { type: String },
      sopsPassed: { type: Boolean },
      viewModelFromProcModel: { type: Object },
    };
  }

  constructor() {
    super()
    this.viewModelFromProcModel = {}
  }

  updated(updates) {
    if (updates.has('model')) {
      this.resetView()
    }
  }

  resetView() {
    this.programsList = []
    this.actions = this.model.actions
    this.selectedAction = this.model.actions[0]
    this.actionMethod(this.selectedAction)
  }

  render() {
    // console.log('render', this.viewModelFromProcModel.langConfig)
    return html`
      <div class="layout vertical flex">
      <h1>${this.viewModelFromProcModel.langConfig.title["label_"+this.lang]}</h1>
      <div class="layout flex vertical">
        <trazit-form-fields id="filterfields" lang="${this.lang}" .fields="${this.viewModelFromProcModel.langConfig.fields}" >
        </trazit-form-fields>
        </div>
      </div>
      <mwc-button id="search" raised label="${this.viewModelFromProcModel.langConfig.button["label_"+this.lang]}" @click=${this.buttonClicked}></mwc-button>
        ${super.render()}
      </div>
    `
  }
  get trazitFormFields() {    return this.shadowRoot.querySelector("trazit-form-fields#filterfields")    } 
  buttonClicked(){
    this.selectedAction=this.viewModelFromProcModel.actions[0]
    this.reqParams=this.jsonParam(this.viewModelFromProcModel.actions[0])
    this.nextRequestCommons(this.viewModelFromProcModel.actions[0])
  }
  isScroll() {
    if (this.tabContainer.offsetWidth < this.tabContainer.scrollWidth) {
      this.next = true
    } else {
      this.next = false
    }
  }
  xjsonParamCommons(selAction, selObject) {
    //console.log('xjsonParamCommons', selAction)
    if (selAction===undefined){
      selAction=this.selectedAction
    }
    if (selObject===undefined){
      if (selAction.selObjectVariableName===undefined){
        alert("Please add the property selObjectVariableName to your action definition")
        return
      }
      if (this[selAction.selObjectVariableName]!==undefined){
        selObject=this[selAction.selObjectVariableName][0]
      }
    }
    let jsonParam = {}
    let action = selAction
    if (action.endPointParams) {
      action.endPointParams.forEach(p => {
        if (p.argumentName==="projectName") {
          if (this.selectedProject===undefined||this.selectedProject.name===undefined){
            alert('No study selected')
            return jsonParam
          }
          jsonParam[p.argumentName] = this.selectedProject.name
        } else if (p.internalVariableObjName&&p.internalVariableObjProperty) {          
            if (this[p.internalVariableObjName]===undefined||this[p.internalVariableObjName][0][p.internalVariableObjProperty]===undefined){
              var msg=""
              if (this[p.internalVariableObjName][0][p.internalVariableObjProperty]===undefined){
                msg='The object '+p.internalVariableObjName+' has no one property called '+p.internalVariableObjProperty
                alert(msg)
                //console.log(msg, this[p.internalVariableObjName][0])
              }else{
                msg='there is no object called '+p.internalVariableObjName+' in this view'
                alert(msg)
              }
          //    alert('No family selected')
              return jsonParam[p.argumentName] = "ERROR: "+msg
            }  
          jsonParam[p.argumentName] = this[p.internalVariableObjName][0][p.internalVariableObjProperty]
         
        } else if (p.element) {
          jsonParam[p.argumentName] = this.trazitFormFields[p.element].value // get value from field input
        } else if (p.defaultValue) {
          jsonParam[p.argumentName] = p.defaultValue // get value from default value (i.e incubator)
        } else if (p.selObjectPropertyName) {
          jsonParam[p.argumentName] = selObject[p.selObjectPropertyName] // get value from selected item
        } else if (p.targetValue) {
          jsonParam[p.argumentName] = this.targetValue[p.argumentName] // get value from target element passed
        } else {
          jsonParam[p.argumentName] = p.value
        }
        console.log('xjsonParamCommons', 'endPointParamsArgument', p, 'selObject', selObject, 'jsonParam', jsonParam)
      })
    }
    if (action.paramFilter) {
      jsonParam[action.paramFilter[this.filterName].argumentName] = action.paramFilter[this.filterName].value
    }
    return jsonParam
  }
}
window.customElements.define('log-sample-module-sample', LogSampleModuleSample);