export function CommonsClientMethod(base) {
  return class extends base {

    async getGridData() {
      this.samplesReload = true
      this.selectedSamples = []
      let params = this.config.backendUrl + (this.actionObj.endPoint ? this.actionObj.endPoint : this.config.frontEndEnvMonitSampleUrl)
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

    buttonActionWithoutDialog() {
      console.log('buttonActionWithoutDialog')
      if (+ this.selectedAction.endPoint===undefined){
        alert('Action with no endPoint property, cannot continue')
        return
      }
      var extraParams=this.jsonParam(this.selectedAction, this.selectedSamples[0])      
      let params = this.config.backendUrl + this.selectedAction.endPoint
        + '?' + new URLSearchParams(this.reqParams) 
      if (extraParams!==undefined){
        params=params + '&' + new URLSearchParams(extraParams)
      }
      this.fetchApi(params).then(() => {
        this.reload()
      })
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