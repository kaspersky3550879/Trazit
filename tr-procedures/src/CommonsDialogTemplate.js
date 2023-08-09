import { html, nothing } from 'lit';
import { columnBodyRenderer, gridRowDetailsRenderer } from 'lit-vaadin-helpers';
import { commonLangConfig } from '@trazit/common-core';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';

export function CommonsDialogTemplate(base) {
  return class extends base {
    static get properties() {
      return {
        targetValue: { type: Object },
        selectedDialogAction: { type: Object },
        numDays: { type: Number },
        deactivatedObjects: { type: Array },
        dataForDialog: { type: Object },
        fromGrid: { type: Boolean }
      }
    }

    constructor() {
      super()
      this.numDays = 7
      this.deactivatedObjects = []
      this.fromGrid = false
    }
    cleanReactivateObjectList(){
      this.deactivatedObjects= []
    }
    reactiveObjectTemplate() {
      //console.log('reactivateObjectDialog')
      return html`
      <tr-dialog id="reactivateObjectDialog"
        heading=""
        hideActions=""
        @closed="${this.cleanReactivateObjectList}"
        scrimClickAction="">
        <div class="layout vertical flex center-justified">        
          ${this.selectedAction?
            html`${this.selectedAction.dialogInfo===undefined||this.selectedAction.dialogInfo.fieldText===undefined||this.selectedAction.dialogInfo.fieldText.objectName===undefined ?          
            nothing: html`
                <div class="layout vertical flex">
                  <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="queryNumDays" type="number" 
                      .value=${this.numDays} @change=${e => this.numDays = e.target.value}
                      label="${this.selectedAction.dialogInfo.fieldText.numDays["label_" + this.lang]}"
                      @keypress=${e => e.keyCode == 13 && this.setDays()}></mwc-textfield>
                    <mwc-icon-button icon="refresh" @click=${this.setDays}></mwc-icon-button>
                  </div>
                  <mwc-select id="objectToReactivateName" label="${this.selectedAction.dialogInfo.fieldText.objectName["label_" + this.lang]}" 
                    ?disabled=${!this.deactivatedObjects.length}>
                    ${this.deactivatedObjects.map((l, i) =>
                    html`<mwc-list-item value="${this.listItemValueToGet(l)}" ?selected=${i == 0}>${this.listItemValueToDisplay(l)}</mwc-list-item>`
                    )}
                  </mwc-select>
                </div>     
            `}
        `:nothing}        
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.reactivateObjectDialogAction}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>      
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

    numberWithDecimalsDialogTemplate() {
      return html`
      <tr-dialog id="numberWithDecimalsDialog"
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">        
          ${this.selectedAction?
            html`${this.selectedAction.dialogInfo===undefined||this.selectedAction.dialogInfo.fieldText===undefined||this.selectedAction.dialogInfo.fieldText.temperature===undefined ?          
              nothing: html`
                <div class="layout horizontal flex center-center">
                  <mwc-textfield class="layout flex" id="temperature" type="number" 
                    .value=${this.numDays} @change=${e => this.numDays = e.target.value}
                    label="${this.selectedAction.dialogInfo.fieldText.temperature["label_" + this.lang]}"
                    @keypress=${e => e.keyCode == 13 && this.myButtonClickedMethod()}></mwc-textfield>
                </div>
            `}
        `:nothing}        
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.myButtonClickedMethod}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>      
      `
    }

    

    get reactivateObjectDialog() {
      return this.shadowRoot.querySelector("tr-dialog#reactivateObjectDialog")
    }
    get numberWithDecimalsDialog() {
      return this.shadowRoot.querySelector("tr-dialog#numberWithDecimalsDialog")
    }

    get queryNumDays() {
      return this.shadowRoot.querySelector("mwc-textfield#queryNumDays")
    }

    get objectToReactivateName() {
      return this.shadowRoot.querySelector("mwc-select#objectToReactivateName")
    }
    get temperature() {
      return this.shadowRoot.querySelector("mwc-textfield#temperature")
    }

    setDays() {
      console.log('setDays clicked')
      this.selectedDialogAction = this.selectedAction.dialogInfo.action[0]
      this.actionMethod(this.selectedDialogAction, false)
    }

    reactivateObjectDialogAction() {
      console.log('reactivateObjectDialogAction', 'this.objectToReactivateName', this.objectToReactivateName)
      if (this.objectToReactivateName.value) {
        this.selectedSamples[this.selectedAction.dialogInfo.listDefinition.keyFldName]=this.objectToReactivateName.value
        this.selectedDialogAction = this.selectedAction
        this.myActionMethod(this.selectedDialogAction, this.selectedSamples, this.selectedAction.dialogInfo.listDefinition.keyFldName)
        //this.dialogAccept(false)
      }
    }
    myButtonClickedMethod(){
      this.myActionMethod(this.selectedAction, this.selectedSamples, 'name')
    }
    myActionMethod(action, selObject, propName) {
      if (action===undefined){
        alert('viewQuery property not found in the procedure model for procInstanceName'+this.procName+' and view '+this.viewName)
        return
      }
      console.log('myActionMethod','action', action, 'selObject', selObject)
        if (selObject.length) {
          this.credsCheckerCommons(action.actionName, selObject[propName], this.jsonParam(action, selObject), action)
        } else {
          this.credsCheckerCommons(action.actionName, null, this.jsonParam(action, selObject), action)
        }
    }
    
    actionMethodTrProcedure(action, replace = true, actionNumIdx) {
      console.log('actionMethodTrProcedure', 'action', action)
        if (replace) {
          this.selectedAction = action
        }
        if (actionNumIdx!==undefined) {
          var viewDef=ProceduresModel[this.procName][this.viewName]
          action = viewDef.actions[actionNumIdx]
          this.selectedAction = ProceduresModel[this.procName][this.viewName].actions[actionNumIdx]
        }else{
          //action = ProceduresModel[this.procName][this.viewName].viewQuery
          //this.selectedAction = ProceduresModel[this.procName][this.viewName].viewQuery
        }
        if (action===undefined){
          alert('viewQuery property not found in the procedure model for procInstanceName'+this.procName+' and view '+this.viewName)
          return
        }
        if (action&&action.dialogInfo) {
          if (action.dialogInfo.automatic) { 
            if (this.itemId) {
              this.credsChecker(action.actionName, this.itemId, this.jsonParam(action, this.selectedSamples[0]), action)
            } else if (this.selectedSamples.length) {
              this.credsChecker(action.actionName, this.selectedSamples[0].sample_id, this.jsonParam(action, this.selectedSamples[0]), action)
            } else {
              this.credsChecker(action.actionName, null, this.jsonParam(action, this.selectedSamples), action)
            }
          } else {
            if (this[action.dialogInfo.name]){
              this[action.dialogInfo.name].show()          
            }else{
              alert('the dialog '+action.dialogInfo.name+' does not exist')
            }
          }
        } else {
          if (this.selectedSamples.length) {
            this.credsChecker(action.actionName, this.selectedSamples[0].sample_id, this.jsonParam(action, this.selectedSamples[0]), action)
          } else {
            this.credsChecker(action.actionName, null, this.jsonParam(action, this.selectedSamples[0]), action)
          }
        }
      }    
      async getGridData() {
        this.samplesReload = true
        this.selectedSamples = []
        let params = this.config.backendUrl + (this.selectedAction.endPoint ? this.selectedAction.endPoint : this.config.frontEndEnvMonitSampleUrl)
          + '?' + new URLSearchParams(this.reqParams)
        await this.fetchApi(params).then(j => {
          if (j && !j.is_error) {
            this.setGrid(j)
          } else {
            this.setGrid()
          }
        })
        this.samplesReload = false
      }
  
      // buttonActionWithoutDialog() {
      //   console.log('buttonActionWithoutDialog')
      //   if (+ this.selectedAction.endPoint===undefined){
      //     alert('Action with no endPoint property, cannot continue')
      //     return
      //   }
      //   var extraParams=this.jsonParam(this.selectedAction, this.selectedSamples[0])      
      //   let params = this.config.backendUrl + this.selectedAction.endPoint
      //     + '?' + new URLSearchParams(this.reqParams) 
      //   if (extraParams!==undefined){
      //     params=params + '&' + new URLSearchParams(extraParams)
      //   }
      //   this.fetchApi(params).then(() => {
      //     //this.reload()
      //   })
      // }
  
      xjsonParamCommons(selAction, selObject) {
        console.log('jsonParam', selAction)
        let jsonParam = {}
        let action = selAction
        if (action.endPointParams) {
          action.endPointParams.forEach(p => {
            if (p.element) {
              jsonParam[p.argumentName] = this[p.element].value // get value from field input
            } else if (p.defaultValue) {
              jsonParam[p.argumentName] = p.defaultValue // get value from default value (i.e incubator)
            } else if (p.selObjectPropertyName) {
              jsonParam[p.argumentName] = selObject[p.selObjectPropertyName] // get value from selected item
            } else if (p.targetValue) {
              jsonParam[p.argumentName] = this.targetValue[p.argumentName] // get value from target element passed
            } else {
              jsonParam[p.argumentName] = p.value
            }
            console.log('jsonParam', 'endPointParamsArgument', p, 'selObject', selObject, 'jsonParam', jsonParam)
          })
        }
        if (action.paramFilter) {
          jsonParam[action.paramFilter[this.filterName].argumentName] = action.paramFilter[this.filterName].value
        }
        return jsonParam
      }
      openReactivateObjectDialog() {
        if (this.selectedAction.dialogInfo===undefined){
          return
        }
        if (this.selectedAction.dialogInfo.action[0]===undefined){
          alert('Action with no endPoint property, cannot continue')
          return
        }
        let params = this.config.backendUrl + this.selectedAction.dialogInfo.action[0].endPoint
          + '?' + new URLSearchParams(this.reqParams)
        this.fetchApi(params).then(() => {
          if (this.reload!==undefined){
            this.reload()
          }
        })
      }
    
      getDeactivatedObjects() {
        console.log('getDeactivatedObjects')
        this.deactivatedObjects = []
        let params = this.config.backendUrl + this.selectedDialogAction.endPoint
          + '?' + new URLSearchParams(this.reqParams)
        this.fetchApi(params).then(j => {
          if (j && !j.is_error) {
            this.deactivatedObjects = j
          }
        })
      }
  
      myButtonClickedMethod(){
        this.myActionMethod(this.selectedAction, this.selectedSamples, 'name')
      }
      myActionMethod(action, selObject, propName) {
        if (action===undefined){
          alert('viewQuery property not found in the procedure model for procInstanceName'+this.procName+' and view '+this.viewName)
          return
        }
        console.log('myActionMethod','action', action, 'selObject', selObject)
          if (selObject!==undefined) {
            this.credsCheckerCommons(action.actionName, selObject[propName], this.jsonParam(action, selObject), action)
          } else {
            this.credsCheckerCommons(action.actionName, undefined, this.jsonParam(action, selObject), action)
          }
      }
   
  }
}