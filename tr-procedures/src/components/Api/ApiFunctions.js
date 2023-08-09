import { ProceduresModel } from '../../ProceduresModel';

export function ApiFunctions(base) {
    return class extends (base) {

      refreshMasterData(endPointResponse) {
        if (endPointResponse===undefined||endPointResponse.master_data===undefined) {
          return
        } 
        console.log('refreshMasterDataaaa', 'procInstanceName', this.procInstanceName, 'endPointResponse', endPointResponse)
        let userSession = JSON.parse(sessionStorage.getItem("userSession"))
        let findProcIndex = userSession.procedures_list.procedures.findIndex(m => m.procInstanceName == this.procInstanceName)
        if (findProcIndex !== -1) {
          userSession.procedures_list.procedures[findProcIndex].master_data=endPointResponse.master_data
          sessionStorage.setItem('userSession', JSON.stringify(userSession))
          return
        }
        return
      }  
      fetchApi(urlParams, feedback=true) { 
        // notification enabled by default, just turn log to false for those what requires no notification   
        let log = true
        if (urlParams.toString().toUpperCase().includes("QUERI")) {
          log = false
        }
        log = true
        //console.log('fetchApi, log', log, 'urlParams', urlParams, urlParams.toString().toUpperCase())
        urlParams += "&isForTesting="+ this.config.isForTesting
        this.dispatchEvent(new CustomEvent('set-activity', {bubbles: true, composed: true}))
        return fetch(urlParams).then(async r => {
          if (r.status == 200) {
            return r.json()
          } else {
            let err = await r.json()
            throw err
          }
        }).then(j => {
          this.refreshMasterData(j)
          if (feedback) {
            this.dispatchEvent(new CustomEvent('success', {
              detail: {...j, log: log},
              bubbles: true,
              composed: true
            }))
          }
          return j
        }).catch(e => {
          if (e.message == "Unexpected end of JSON input") {
            this.dispatchEvent(new CustomEvent("error", {
              detail: {...e},
              bubbles: true,
              composed: true
            }))
          } else {
            this.dispatchEvent(new CustomEvent("error", {
              detail: {...e, log: log},
              bubbles: true,
              composed: true
            }))
            //this.error(e)
            return e
          }
        })
      }

      getAPICommonParams(action, excludeProcInstanceName = false){
        if (action===undefined){return}
        let extraParams={}  
        extraParams.actionName=action.actionName
        extraParams.dbName= this.config.dbName
        if (excludeProcInstanceName!==undefined&&excludeProcInstanceName===false){
          extraParams.procInstanceName = this.procInstanceName
        }
        extraParams.finalToken= JSON.parse(sessionStorage.getItem("userSession")).finalToken
        return extraParams
      }          
      jsonParam(action, selObject = {}, targetValue = {}, selGridObject = {}) {
        console.log('ApiFunctions>jsonParam', 'action', action, 'selObject', selObject, 'targetValue', targetValue, 'selGridObject', selGridObject)
        let curArgName=""
        if (action===undefined){return}
          let jsonParam = {}
          if (action.endPointParams) {
            action.endPointParams.forEach(p => {
              if (p.internalVariableSimpleObjName&&p.internalVariableSimpleObjProperty) {          
                if (this[p.internalVariableSimpleObjName]===undefined||this[p.internalVariableSimpleObjName][p.internalVariableSimpleObjProperty]===undefined){
                  var msg=""
                  if (this[p.internalVariableSimpleObjName][p.internalVariableSimpleObjProperty]===undefined){
                    msg='The object '+p.internalVariableSimpleObjName+' has no one property called '+p.internalVariableSimpleObjProperty
                    alert(msg)
                    //console.log(msg, this[p.internalVariableSimpleObjName][0])
                  }else{
                    msg='there is no object called '+p.internalVariableSimpleObjName+' in this view'
                    alert(msg)
                  }
              //    alert('No family selected')
                  return jsonParam[p.argumentName] = "ERROR: "+msg
                }  
              jsonParam[p.argumentName] = this[p.internalVariableSimpleObjName][p.internalVariableSimpleObjProperty]
              
              } else if (p.internalVariableObjName&&p.internalVariableObjProperty) {          
                  if (this[p.internalVariableObjName]===undefined||this[p.internalVariableObjName][0][p.internalVariableObjProperty]===undefined){
                    let msg=""
                    if (this[p.internalVariableObjName][0][p.internalVariableObjProperty]===undefined){
                      msg='The object '+p.internalVariableObjName+' has no one property called '+p.internalVariableObjProperty
                      alert(msg)
                      //console.log(msg, this[p.internalVariableObjName][0])
                    }else{
                      msg='there is no object called '+p.internalVariableObjName+' in this view'
                      alert(msg)
                    }
                //    alert('No family selected')
                    jsonParam[p.argumentName] = "ERROR: "+msg
                    return 
                  }  
                jsonParam[p.argumentName] = this[p.internalVariableObjName][0][p.internalVariableObjProperty]
                
              } else if (p.element) {
                if (p.addToFieldNameAndValue!==undefined&&p.addToFieldNameAndValue===true){
                  if (this[p.element]==null){
                    if (p.notAddWhenValueIsBlank!==undefined&&p.notAddWhenValueIsBlank===true){
                      return
                    }else{
                    //msg='The element '+p.element+' was not added in this dialog definition, please review the endPointParams configuration or add them to the dialog'
                    alert(msg)
                      jsonParam[p.argumentName] = "ERROR: "+msg
                      return 
                    }
                  }
                  if (this[p.element].value!==undefined&&this[p.element].value.length>0){                    
                    if (jsonParam.fieldName===undefined){
                      let curFldNameValue=p.argumentName                      
                      jsonParam["fieldName"]=curFldNameValue
                      let curFldValValue=this[p.element].value
                      if (p.fieldType!==undefined){curFldValValue=curFldValValue+"*"+p.fieldType}                      
                      jsonParam["fieldValue"]=curFldValValue
                      
                    }else{
                      let curFldNameValue=jsonParam["fieldName"]
                      if (curFldNameValue.length>0){curFldNameValue=curFldNameValue+"|"}   
                      curFldNameValue=curFldNameValue+p.argumentName 
                      jsonParam["fieldName"]=curFldNameValue

                      let curFldValValue=jsonParam["fieldValue"]
                      if (curFldValValue.length>0){curFldValValue=curFldValValue+"|"}   
                      curFldValValue=curFldValValue+this[p.element].value
                      if (p.fieldType!==undefined){curFldValValue=curFldValValue+"*"+p.fieldType}                      
                      jsonParam["fieldValue"]=curFldValValue

                    }
                  }
                }else if (p.isAdhocField!==undefined&&p.isAdhocField===true){
                  curArgName=jsonParam[p.argumentName]
                  if (curArgName===undefined){curArgName=''}
                  if (curArgName.length>0){curArgName=curArgName+"|"}
                  curArgName=curArgName+this[p.element].value
                  if (p.fieldType!==undefined){
                    curArgName=curArgName+"*"+p.fieldType
                  }
                  jsonParam[p.argumentName] = curArgName
                }else{
                  if (this[p.element]===undefined||this[p.element]===null){
                    alert('Not found the html element called '+p.element+' Please talk with your System Admin')
                  }else{
                    //console.log('element object in context content is:', this[p.element])
                    if (this[p.element].value.length>0){
                      jsonParam[p.argumentName] = this[p.element].value // get value from field input
                    }else{
                      if (p.notAddWhenValueIsBlank===undefined||p.notAddWhenValueIsBlank===false){
                        jsonParam[p.argumentName] = this[p.element].value // get value from field input
                      }
                    }
                  }
                }
              } else if (p.getFromGrid) {
                if (p.addToFieldNameAndValue!==undefined&&p.addToFieldNameAndValue===true){
                  if (selGridObject[p.argumentName]==null){
                    if (p.notAddWhenValueIsBlank!==undefined&&p.notAddWhenValueIsBlank===true){
                      return
                    }else{
                    //msg='The element '+p.element+' was not added in this dialog definition, please review the endPointParams configuration or add them to the dialog'
                    alert(msg)
                      jsonParam[p.argumentName] = "ERROR: "+msg
                      return 
                    }
                  }
                  if (selGridObject[p.argumentName]!==undefined&&selGridObject[p.argumentName].toString().length>0){                    
                    if (jsonParam.fieldName===undefined){
                      let curFldNameValue=p.argumentName                      
                      jsonParam["fieldName"]=curFldNameValue
                      let curFldValValue=selGridObject[p.argumentName]
                      if (p.fieldType!==undefined){curFldValValue=curFldValValue+"*"+p.fieldType}                      
                      jsonParam["fieldValue"]=curFldValValue
                      
                    }else{
                      let curFldNameValue=jsonParam["fieldName"]
                      if (curFldNameValue!==undefined&&curFldNameValue.length>0){curFldNameValue=curFldNameValue+"|"}   
                      curFldNameValue=curFldNameValue+p.argumentName 
                      jsonParam["fieldName"]=curFldNameValue

                      let curFldValValue=jsonParam["fieldValue"]
                      if (curFldValValue!==undefined&&curFldValValue.length>0){curFldValValue=curFldValValue+"|"}   
                      curFldValValue=curFldValValue+selGridObject[p.argumentName]
                      if (p.fieldType!==undefined){curFldValValue=curFldValValue+"*"+p.fieldType}                      
                      jsonParam["fieldValue"]=curFldValValue

                    }
                  }
                }else if (p.isAdhocField!==undefined&&p.isAdhocField===true){
                  curArgName=jsonParam[p.argumentName]
                  if (curArgName===undefined){curArgName=''}
                  if (curArgName.length>0){curArgName=curArgName+"|"}
                  curArgName=curArgName+this[p.element].value
                  if (p.fieldType!==undefined){
                    curArgName=curArgName+"*"+p.fieldType
                  }
                  jsonParam[p.argumentName] = curArgName
                } else if (p.selObjectPropertyName) {
                  jsonParam[p.argumentName] = selGridObject[p.selObjectPropertyName] // get value from selected item
  
                }else{
                  if (this[p.element]===undefined||this[p.element]===null){
                    alert('Not found the html element called '+p.element+' Please talk with your System Admin')
                  }else{
                    //console.log('element object in context content is:', this[p.element])
                    if (this[p.element].value.length>0){
                      jsonParam[p.argumentName] = this[p.element].value // get value from field input
                    }else{
                      if (p.notAddWhenValueIsBlank===undefined||p.notAddWhenValueIsBlank===false){
                        jsonParam[p.argumentName] = this[p.element].value // get value from field input
                      }
                    }
                  }
                }
              } else if (p.defaultValue) {
                if (p.isAdhocField!==undefined&&p.isAdhocField===true){
                  curArgName=jsonParam[p.argumentName]
                  if (curArgName===undefined){curArgName=''}
                  if (curArgName.length>0){curArgName=curArgName+"|"}
                  curArgName=curArgName+p.defaultValue
                  if (p.fieldType!==undefined){
                    curArgName=curArgName+"*"+p.fieldType
                  }
                  jsonParam[p.argumentName] = curArgName
                }else{
                  jsonParam[p.argumentName] = p.defaultValue // get value from default value (i.e incubator)
                }
              } else if (p.selObjectPropertyName) {
                if (Array.isArray(selObject)){
                  jsonParam[p.argumentName] = selObject[0][p.selObjectPropertyName] // get value from selected item
                }else{
                  jsonParam[p.argumentName] = selObject[p.selObjectPropertyName] // get value from selected item
                }
              } else if (p.targetValue) {
                jsonParam[p.argumentName] = targetValue[p.argumentName] // get value from target element passed
              } else if (p.fixValue) {
                jsonParam[p.argumentName] = p.fixValue
              } else if (p.contextVariableName) {
                jsonParam[p.argumentName] = this[p.contextVariableName]
              } else {
                jsonParam[p.argumentName] = p.value
              }
              //console.log('xjsonParamCommons', 'endPointParamsArgument', p, 'selObject', selObject, 'jsonParam', jsonParam)
            })
          }
          //console.log('jsonParam', 'action', action, 'filterName', this.filterName)
          if (action.subViewFilter!==undefined&&this.filterName!==undefined){
            action.subViewFilter[this.filterName].forEach(p => {
              if (p.internalVariableSimpleObjName&&p.internalVariableSimpleObjProperty) {          
                if (this[p.internalVariableSimpleObjName]===undefined||this[p.internalVariableSimpleObjName][p.internalVariableSimpleObjProperty]===undefined){
                  let msg=""
                  if (this[p.internalVariableSimpleObjName][p.internalVariableSimpleObjProperty]===undefined){
                    msg='The object '+p.internalVariableSimpleObjName+' has no one property called '+p.internalVariableSimpleObjProperty
                    alert(msg)
                    //console.log(msg, this[p.internalVariableSimpleObjName][0])
                  }else{
                    msg='there is no object called '+p.internalVariableSimpleObjName+' in this view'
                    alert(msg)
                  }
                  jsonParam[p.argumentName] = "ERROR: "+msg
                  return jsonParam[p.argumentName]
                }  
                jsonParam[p.argumentName] = this[p.internalVariableSimpleObjName][p.internalVariableSimpleObjProperty]              
              } else if (p.internalVariableObjName&&p.internalVariableObjProperty) {          
                  if (this[p.internalVariableObjName]===undefined||this[p.internalVariableObjName][0][p.internalVariableObjProperty]===undefined){
                    let msg=""
                    if (this[p.internalVariableObjName][0][p.internalVariableObjProperty]===undefined){
                      msg='The object '+p.internalVariableObjName+' has no one property called '+p.internalVariableObjProperty
                      alert(msg)
                      //console.log(msg, this[p.internalVariableObjName][0])
                    }else{
                      msg='there is no object called '+p.internalVariableObjName+' in this view'
                      alert(msg)
                    }
                //    alert('No family selected')
                    jsonParam[p.argumentName] = "ERROR: "+msg
                    return jsonParam[p.argumentName]
                  }  
                jsonParam[p.argumentName] = this[p.internalVariableObjName][0][p.internalVariableObjProperty]
                
              } else if (p.element) {
                if (p.addToFieldNameAndValue!==undefined&&p.addToFieldNameAndValue===true){
                  if (this[p.element].value!==undefined&&this[p.element].value.toString().length>0){                 
                    if (jsonParam.fieldName===undefined){
                      let curFldNameValueObj={}
                      curFldNameValueObj.push(p.argumentName)
                      jsonParam["fieldName"]=curFldNameValue
                      let curFldValValue=curFldValValue+this[p.element].value
                      if (p.fieldType!==undefined){curFldValValue=curFldValValue+"*"+p.fieldType}                      
                      jsonParam["fieldValue"]=curFldValValue
                      
                    }else{
                      let curFldNameValue=jsonParam["fieldName"]
                      if (curFldNameValue.length>0){curFldNameValue=curFldNameValue+"|"}   
                      curFldNameValue=curFldNameValue+p.argumentName 
                      jsonParam["fieldName"]=curFldNameValue

                      let curFldValValue=jsonParam["fieldValue"]
                      if (curFldValValue.length>0){curFldValValue=curFldValValue+"|"}   
                      curFldValValue=curFldValValue+this[p.element].value
                      if (p.fieldType!==undefined){curFldValValue=curFldValValue+"*"+p.fieldType}                      
                      jsonParam["fieldValue"]=curFldValValue

                    }
                  }
                }else if (p.isAdhocField!==undefined&&p.isAdhocField===true){
                  let curArgName=jsonParam[p.argumentName]
                  if (curArgName===undefined){curArgName=''}
                  if (curArgName.length>0){curArgName=curArgName+"|"}
                  curArgName=curArgName+this[p.element].value
                  if (p.fieldType!==undefined){
                    curArgName=curArgName+"*"+p.fieldType
                  }
                  jsonParam[p.argumentName] = curArgName
                }else{
                  if (this[p.element]===undefined||this[p.element]===null){
                    alert('Not found the html element called '+p.element+' Please talk with your System Admin')
                  }else{
                    //console.log('element object in context content is:', this[p.element])
                    if (this[p.element].value.length>0){
                      jsonParam[p.argumentName] = this[p.element].value // get value from field input
                    }else{
                      if (p.notAddWhenValueIsBlank===undefined||p.notAddWhenValueIsBlank===false){
                        jsonParam[p.argumentName] = this[p.element].value // get value from field input
                      }
                    }
                  }
                }
              } else if (p.defaultValue) {
                if (p.isAdhocField!==undefined&&p.isAdhocField===true){
                  let curArgName=jsonParam[p.argumentName]
                  if (curArgName===undefined){curArgName=''}
                  if (curArgName.length>0){curArgName=curArgName+"|"}
                  curArgName=curArgName+p.defaultValue
                  if (p.fieldType!==undefined){
                    curArgName=curArgName+"*"+p.fieldType
                  }
                  jsonParam[p.argumentName] = curArgName
                }else{
                  jsonParam[p.argumentName] = p.defaultValue // get value from default value (i.e incubator)
                }
              } else if (p.selObjectPropertyName) {
                jsonParam[p.argumentName] = selObject[p.selObjectPropertyName] // get value from selected item
              } else if (p.targetValue) {
                jsonParam[p.argumentName] = targetValue[p.argumentName] // get value from target element passed
              } else if (p.fixValue) {
                jsonParam[p.argumentName] = p.fixValue
              } else {
                jsonParam[p.argumentName] = p.value
              }
              //console.log('xjsonParamCommons', 'endPointParamsArgument', p, 'selObject', selObject, 'jsonParam', jsonParam)
            })  
          }
          return jsonParam
      }
      getActionAPIUrl(action){
        //console.log('getActionAPIUrl', this.procInstanceName)
        if (action!==undefined&&action.endPoint!==undefined){
          return action.endPoint ? action.endPoint : this.config.SampleAPIactionsUrl
        }
        let procInstanceModel={}
        if (!this.config.local) {
          let findProc = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures.filter(m => m.procInstanceName == this.procInstanceName)
          if (findProc.length) {
            procInstanceModel= findProc[0].procModel
          }
        }else{
          procInstanceModel=ProceduresModel[this.procInstanceName]
        }               
        if (procInstanceModel.ModuleSettings===undefined){
          return 'ERROR, ModuleSettings property not found in the model for procedure instance '+this.procInstanceName+'. If endPoint property at action level is not defined then moduleSettings becomes mandatory to get the Endpoint url'
        }
        let actionsEndpoints=procInstanceModel.ModuleSettings.actionsEndpoints
        if (actionsEndpoints.length==1){         
          return actionsEndpoints[0].url
        }
        let endPointUrl=action.endPointUrl        
        let foundEndPoint=actionsEndpoints.filter(m => m.name == endPointUrl)
        if (foundEndPoint.length===0){
          return 'ERROR in ApiFunctions.getActionAPIUrl: EndPointUrl '+endPointUrl+" not found in Module Settings"
        }else{
          return foundEndPoint[0].url
        }
      }
      getQueryAPIUrl(query){
        //console.log('getQueryAPIUrl', this.procInstanceName)
        if (query!==undefined&&query.endPoint!==undefined){
          return query.endPoint ? query.endPoint : this.config.SampleAPIqueriesUrl
        }
        let procInstanceModel={}
        if (!this.config.local) {
          let findProc = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures.filter(m => m.procInstanceName == this.procInstanceName)
          if (findProc.length) {
            procInstanceModel= findProc[0].procModel
          }
        }else{
          procInstanceModel=ProceduresModel[this.procInstanceName]
        }               
        if (procInstanceModel.ModuleSettings===undefined||procInstanceModel.ModuleSettings.queriesEndpoints===undefined){
          return 'ERROR, ModuleSettings property not found in the model for procedure instance '+this.procInstanceName+'. If endPoint property at action level is not defined then queriesEndpoints property in moduleSettings becomes mandatory to get the Endpoint url'
        }
        let queriesEndpoints=procInstanceModel.ModuleSettings.queriesEndpoints
        if (queriesEndpoints.length==1){         
          return queriesEndpoints[0].url
        }
        let endPointUrl=query.endPointUrl        
        let foundEndPoint=queriesEndpoints.filter(m => m.name == endPointUrl)
        if (foundEndPoint.length===0){
          return 'ERROR in ApiFunctions.getActionAPIUrl: EndPointUrl '+endPointUrl+" not found in Module Settings"
        }else{
          return foundEndPoint[0].url
        }
      }
    

    }
}