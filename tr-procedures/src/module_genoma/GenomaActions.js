import { html, css } from 'lit';
import {DialogsFunctions} from '../components/GenericDialogs/DialogsFunctions';
export function GenomaActions(base) {
    return class extends DialogsFunctions(base) {

          xbuttonActionWithoutDialogNoCredChecker(action, selectedItem) {
            this.selectedAction=action
            //console.log('buttonActionWithoutDialog')
            this.reqParams.actionName=action.actionName
            var extraParams=this.jsonParam(action, selectedItem)   
        //    if (extraParams.includes("ERROR")){return}   
            let params = this.config.backendUrl + (action.endPoint ? action.endPoint : this.config.frontEndEnvMonitSampleUrl)
            params=params+'?' + new URLSearchParams(this.reqParams) 
            if (extraParams!==undefined){
              params=params + '&' + new URLSearchParams(extraParams)
            }
            this.fetchApi(params).then(() => {
                this.getGenomaProjectsList()
              //this.reload()
            })
            //this.getGenomaProjectsList()
          }
          xbuttonActionWithoutDialog(action, selectedItem) {
            this.selectedAction=action
            //console.log('genomaSuperDialogClickedAction')
            if (this.itemId) {
              this.credsChecker(action.actionName, this.itemId, this.jsonParam(this.selectedAction, selectedItem), action)
            } else {
              this.credsChecker(action.actionName, selectedItem, this.jsonParam(this.selectedAction, selectedItem), action)
            }
            return
                //console.log('buttonActionWithoutDialog')
                this.reqParams.actionName=action.actionName
                var extraParams=this.xjsonParamCommons(action, selectedItem)   
            //    if (extraParams.includes("ERROR")){return}   
                let params = this.config.backendUrl + (action.endPoint ? action.endPoint : this.config.frontEndEnvMonitSampleUrl)
                params=params+'?' + new URLSearchParams(this.reqParams) 
                if (extraParams!==undefined){
                  params=params + '&' + new URLSearchParams(extraParams)
                }
                this.fetchApi(params).then(() => {
                    this.getGenomaProjectsList()
                  //this.reload()
                })
                //this.getGenomaProjectsList()
          }
          xgenomaSuperDialogClickedActionNoCredChecker(){
            //console.log('genomaSuperDialogClickedAction')
            let action=this.selectedAction
            let selectedItem={}
            if (action.selObjectVariableName!==undefined&&this[action.selObjectVariableName][0]!==undefined){
                selectedItem=this[action.selObjectVariableName][0]
            }
            this.reqParams.actionName=action.actionName
            var extraParams=this.jsonParam(action, selectedItem)      
        //    if (extraParams.includes("ERROR")){return}   
            let params = this.config.backendUrl + (action.endPoint ? action.endPoint : this.config.frontEndEnvMonitSampleUrl)
            params=params+'?' + new URLSearchParams(this.reqParams) 
            if (extraParams!==undefined){
              params=params + '&' + new URLSearchParams(extraParams)
            }
            this.fetchApi(params).then(() => {
              alert('closing dialog')
              this[action.dialogInfo.name].close()
              this.getGenomaProjectsList()
              //this.reload()
            })            
          }
          xgenomaSuperDialogClickedAction(){
            //console.log('genomaSuperDialogClickedAction')
            let action=this.selectedAction
            let selectedItem={}
            if (action.selObjectVariableName!==undefined&&this[action.selObjectVariableName][0]!==undefined){
                selectedItem=this[action.selObjectVariableName][0]
            }
            if (this.itemId) {
              this.credsChecker(action.actionName, this.itemId, this.jsonParam(this.selectedAction, selectedItem), action)
            } else {
              this.credsChecker(action.actionName, selectedItem, this.jsonParam(this.selectedAction, selectedItem), action)
            }
            return
            this.reqParams.actionName=action.actionName
            var extraParams=this.xjsonParamCommons(action, selectedItem)      
        //    if (extraParams.includes("ERROR")){return}   
            let params = this.config.backendUrl + (action.endPoint ? action.endPoint : this.config.frontEndEnvMonitSampleUrl)
            params=params+'?' + new URLSearchParams(this.reqParams) 
            if (extraParams!==undefined){
              params=params + '&' + new URLSearchParams(extraParams)
            }
            this.fetchApi(params).then(() => {
              this[action.dialogInfo.name].close()
              this.getGenomaProjectsList()
              //this.reload()
            })            
          }
          xnextRequest() {
            super.nextRequest()
            this.reqParams = {
              procInstanceName: this.procName,
              ...this.reqParams
            }
            let action = this.selectedDialogAction ? this.selectedDialogAction : this.selectedAction
            this.performRequest()
            //this[action.clientMethod]()
          }    
                
          xperformRequest(){
            let action=this.selectedAction
            this.reqParams.actionName=action.actionName
            let selectedItem={}
            if (action.selObjectVariableName!==undefined&&this[action.selObjectVariableName][0]!==undefined){
                selectedItem=this[action.selObjectVariableName][0]
            }
            var extraParams=this.jsonParam(action, selectedItem)      
        //    if (extraParams.includes("ERROR")){return}   
            let params = this.config.backendUrl + (action.endPoint ? action.endPoint : this.config.frontEndEnvMonitSampleUrl)
            params=params+'?' + new URLSearchParams(this.reqParams) 
            if (extraParams!==undefined){
              params=params + '&' + new URLSearchParams(extraParams)
            }
            this.fetchApi(params).then(() => {
              if (action!==undefined&&action.dialogInfo!==undefined&&action.dialogInfo.name!==undefined){
                alert('closing dialog')
                this[action.dialogInfo.name].close()
              }
              this.getGenomaProjectsList()
              //this.reload()
            })            

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
              selObject=this[selAction.selObjectVariableName][0]
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
              jsonParam[action.paramFilter[this.filterName].query] = action.paramFilter[this.filterName].value
            }
            return jsonParam
          }
        
          xactionMethod(action, replace = true) {
            console.log('actionMethod')
            if (replace) {
              this.selectedAction = action
            }
            let selectedItem={}
            if (this[action.selObjectVariableName]!==undefined&&this[action.selObjectVariableName][0]!==undefined){
              selectedItem=this[action.selObjectVariableName][0]
            }
            if (action.dialogInfo) {
              if (action.dialogInfo.automatic) {
                if (this.itemId) {
                  this.credsChecker(action.actionName, this.itemId, this.jsonParam(this.selectedAction, selectedItem), action)
                } else {
                  this.credsChecker(action.actionName, this.selectedItems[0].sample_id, this.jsonParam(this.selectedAction, selectedItem), action)
                }
              } else {
                let dialogName=action.dialogInfo.name
				if (dialogName===undefined){
				  alert('the action '+action.actionName+' has no dialog assigned')
				  return
				}
				//console.log('action', action)
				if (this[dialogName]===undefined){
				  alert('Check the code due to the dialog '+dialogName+' is not load as to be open')
				  return
				}				
                //this.genomaDialogsTemplate()
                this[dialogName].show()
              }
            } else {
              if (this.selectedItems.length) {
                this.credsChecker(action.actionName, this.selectedItems[0].sample_id, this.jsonParam(this.selectedAction, selectedItem), action)
              } else {
                this.credsChecker(action.actionName, null, this.jsonParam(this.selectedAction, selectedItem), action)
              }
            }
          }  
          async getGenomaProjectsListOld() {
            this.samplesReload = true
            var curProject = this.selectedProject 
            var curStudy = this.selectedStudy 
            this.selectedProject={}
            this.selectedStudy={}
            //console.log('curProject', curProject)  
            this.reqParams.actionName="ALL_ACTIVE_PROJECTS"
            //console.log('getGenomaProjectsList', 'this.selectedAction', this.selectedAction)
            let params = this.config.backendUrl + this.config.GenomaStudyAPIqueriesUrl
              + '?' + new URLSearchParams(this.reqParams)
            await this.fetchApi(params).then(j => {
              if (j && !j.is_error) {        
                this.programsList = j.project
                if (j.master_data&&j.master_data.users){
                  this.MDprocedureUsers = j.master_data.users
                  this.MDvariablesSet = j.master_data.variables_set
                  this.MDvariables = j.master_data.variables
                }
              }
            })
            
            if (this.selectedProject===undefined){
               // console.log("FIRST TIME!!!!")
            }else{
                let givenProject = this.programsList.filter(i => i.name == curProject.name)
                this.selectedProject=givenProject[0]
                if (curStudy!==undefined&&this.selectedProject!==undefined){
                    this.selectedStudy=this.selectedProject.study.filter(i => i.name == curStudy.name)[0]
                }
                console.log('selectedStudy', this.selectedStudy)
            }
          }
          async getGenomaProjectsList() {
            let queryDefinition=this.viewModelFromProcModel.viewQuery
            if (queryDefinition===undefined){return}
        
            this.samplesReload = true
            //let params = this.config.backendUrl + this.config.frontEndEnvMonitUrl
            //  + '?' + new URLSearchParams(this.reqParams)
            this.selectedItems = []      
            let APIParams=this.getAPICommonParams(queryDefinition)
            let viewParams=this.jsonParam(queryDefinition)
            let endPointUrl=this.getQueryAPIUrl(queryDefinition)
            if (String(endPointUrl).toUpperCase().includes("ERROR")){
                alert(endPointUrl)
                return
            }
            let params = this.config.backendUrl + endPointUrl
                  + '?' + new URLSearchParams(APIParams) + '&'+ new URLSearchParams(viewParams)    
            await this.fetchApi(params).then(j => {
              if (j && !j.is_error) {
                this.programsList = j.project
                if (j.master_data&&j.master_data.users){
                  this.MDprocedureUsers = j.master_data.users
                  this.MDvariablesSet = j.master_data.variables_set
                  this.MDvariables = j.master_data.variables
                }

                // this.programsList = j.programsList
                // // if (this.programsList.length==1){
                // //   this.selectedProgram=this.programsList[0]
                // // }
                // if (queryDefinition.subAction) {
                //   this.GetAlternativeViewData(queryDefinition.subAction)
                // }
                // this.requestUpdate()
              }
            })
          }          
    }
}