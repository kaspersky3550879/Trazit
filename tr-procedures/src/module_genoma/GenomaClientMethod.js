export function GenomaClientMethod(base) {
  return class extends base {

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

    buttonActionWithoutDialog(action, selectedItem) {
      console.log('buttonActionWithoutDialog')
      var extraParams=this.jsonParam(action, selectedItem)      
      let params = this.config.backendUrl + (action.endPoint ? action.endPoint : this.config.frontEndEnvMonitSampleUrl)
      params=params+'?' + new URLSearchParams(this.reqParams) 
      if (extraParams!==undefined){
        params=params + '&' + new URLSearchParams(extraParams)
      }
      this.fetchApi(params).then(() => {
        //this.reload()
      })
    }

    xjsonParamCommons(selAction, selObject) {
      console.log('xjsonParamCommons', selAction)
      if (selAction===undefined){
        selAction=this.selectedAction
      }
      if (selObject===undefined){
        if (selAction.selObjectVariableName===undefined){
          alert("Please add the property selObjectVariableName to your action definition")
          return
        }
        selObject=this[selAction.selObjectVariableName][0]
      }
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
          console.log('xjsonParamCommons', 'endPointParamsArgument', p, 'selObject', selObject, 'jsonParam', jsonParam)
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
        this.reload()
      })
    }
    newStudyIndividualMethod(){
      console.log('newStudyIndividualMethod', this.newStudyIndividual)
      //this.requestUpdate()
      //this.reload()
     // this.reloadDialog()

    }
    getDeactivatedObjects() {
      this.deactivatedObjects = []
      let params = this.config.backendUrl + this.selectedDialogAction.endPoint
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          this.deactivatedObjects = j
        }
      })
    }


    GenomaActionMethod(action, replace = true) {
      if (replace) {
        this.selectedAction = action
      }
      if (action.dialogInfo) {
        if (action.dialogInfo.automatic) {
          if (this.itemId) {
            this.credsChecker(action.actionName, this.itemId, this.jsonParam(), action)
          } else {
            this.credsChecker(action.actionName, this.selectedSamples[0].sample_id, this.jsonParam(), action)
          }
        } else {
          let dialogName=action.dialogInfo.name
          this[dialogName].show()
        }
      } else {
        if (this.selectedSamples.length) {
          this.credsChecker(action.actionName, this.selectedSamples[0].sample_id, this.jsonParam(), action)
        } else {
          this.credsChecker(action.actionName, null, this.jsonParam(), action)
        }
      }
    }
 
    xgetButton(butArr, selectedItem) {        
      if (butArr===undefined){return}
      return html`
        ${butArr.map(action =>
          html`${action.button ?
            html`${action.button.icon ?
              html`<mwc-icon-button 
                class="${action.button.class}"
                icon="${action.button.icon}" 
                title="${action.button.title['label_'+this.lang]}" 
                ?disabled=${this.buttonDisable(action)}
                @click=${()=>this.buttonAction(action, this[action.selObjectVariableName][0], undefined)}></mwc-icon-button>` :
              html`${action.button.img ?
                html`<mwc-icon-button 
                  class="${action.button.class} img"
                  title="${action.button.title['label_'+this.lang]}" 
                  ?disabled=${this.buttonDisable(action)}
                  ?hidden=${this.btnHidden(action)}
                  @click=${()=>this.buttonAction(action, this[action.selObjectVariableName][0], undefined)}>
                    <img class="iconBtn" src="images/${action.button.img}">
                  </mwc-icon-button>` :
                html`<mwc-button dense raised 
                  label="${action.button.title['label_'+this.lang]}" 
                  ?disabled=${this.buttonDisable(action)}
                  @click=${()=>this.buttonAction(action, this[action.selObjectVariableName][0], undefined)}></mwc-button>`
              }`
            }` :
            nothing
          }`
        )}
      `
    }  
    buttonDisable(action){
      console.log('buttonDisable')
      if (action===undefined||action.button===undefined){return true}
      if (action.button.requiresObjectSelected===undefined){return true}
      if (action.button.requiresObjectSelected===false){return false}
      if (action.selObjectVariableName===undefined){
        alert("The button "+action.button.title['label_en']+" is configured as to be disabled when no object selected but property selObjectVariableName is not found,please review the settings for this button action")
        return true
      }    
      if (this[action.selObjectVariableName]===undefined){return true}
      if (this[action.selObjectVariableName][0]===undefined){return true}
      return false
    }
  
    buttonAction(action, selectedItem, replace = true, actionNumIdx) {
      console.log(action, this.newStudyIndividual)
      
  //     if (action===undefined){return}
  //     console.log('genomaActionMethod', 'action', action)
  //     if (action.clientMethod==="buttonActionWithoutDialog"){
  //       this.buttonActionWithoutDialog(action, selectedItem)
  //       return
  //     }
  // //    this.selectedAction = action
  //     var propName = ""
  //     this.GenomaActionMethod(action)
    }
    genomaActionMethodOld(action, selectedItem, replace = true, actionNumIdx) {
      if (replace) {
        this.selectedAction = action
      }
      if (actionNumIdx) {
        action = actions[actionNumIdx]
        this.selectedAction = actions[actionNumIdx]
      }
      if (selectedItem!==undefined&&selectedItem.length) {
        this.credsChecker(action.actionName, selectedItem[0].sample_id, this.jsonParam(selectedItem), action)
      } else {
        this.credsChecker(action.actionName, null, this.jsonParam(selectedItem), action)
      }
    }
      

  }
}