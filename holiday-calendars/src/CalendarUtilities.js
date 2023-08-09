import { html, css } from 'lit';

export function CalendarUtilities(base) {
    return class extends base {
        selectedItem(action){
            if (action.selObjectVariableName===undefined){
                return undefined
            }
            return this[action.selObjectVariableName][0]
        }
        getButton(butArr, selectedItem) {        
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
                      @click=${()=>this.buttonAction(action, this.selectedItem(action), undefined)}></mwc-icon-button>` :
                    html`${action.button.img ?
                      html`<mwc-icon-button 
                        class="${action.button.class} img"
                        title="${action.button.title['label_'+this.lang]}" 
                        ?disabled=${this.buttonDisable(action)}
                        ?hidden=${this.btnHidden(action)}
                        @click=${()=>this.buttonAction(action, this.selectedItem(action), undefined)}>
                          <img class="iconBtn" src="images/${action.button.img}">
                        </mwc-icon-button>` :
                      html`<mwc-button dense raised 
                        label="${action.button.title['label_'+this.lang]}" 
                        ?disabled=${this.buttonDisable(action)}
                        @click=${()=>this.buttonAction(action, this.selectedItem(action), undefined)}></mwc-button>`
                    }`
                  }` :
                  nothing
                }`
              )}
            `
        }  
        buttonDisable(action){
          //console.log('buttonDisable')
          if (action===undefined||action.button===undefined){return true}
          if (action.button.requiresObjectSelected===undefined){return true}
          if (action.button.requiresObjectSelected===null){return true}
          if (action.button.requiresObjectSelected===false){return false}
          if (action.selObjectVariableName===undefined){
            alert("The button "+action.button.title['label_en']+" is configured as to be disabled when no object selected but property selObjectVariableName is not found,please review the settings for this button action")
            return true
          }    
          if (this[action.selObjectVariableName]===undefined){return true}
          if (this[action.selObjectVariableName]===null){return true}
          if (this[action.selObjectVariableName].length==0){return true}
          if (this[action.selObjectVariableName][0]===undefined){return true}
          return false
        }
        
          buttonAction(action, selectedItem, replace = true, actionNumIdx) {
            //alert('buttonActions')
            //console.log(action, this.newStudyIndividual, action)
            this.selectedAction=action
            this.actionBeingPerformedModel=action
            if (action===undefined){return}
            if (action.clientMethod===undefined&&action.dialogInfo===undefined){
              this.buttonActionWithoutDialogNoCredChecker(action, selectedItem)
              return
            }            
            if (action.clientMethod==="buttonActionWithoutDialog"){
              this.buttonActionWithoutDialogNoCredChecker(action, selectedItem)
              return
            }
            this.selectedAction = action
          //this.newStudyIndividual.show()
        
            var propName = ""
            this.actionMethod(action)
          }        
          tableHeight(tableItemsObj){            
            if (tableItemsObj===undefined){
              console.log('tableHeight', 'tableItemsObj', tableItemsObj, '100px')
              return "85px"
            }
            var l=[]
            l=tableItemsObj
            var dynamicH=l.length
            dynamicH=dynamicH*35
            dynamicH=dynamicH+100
            if (dynamicH>350){
              console.log('tableHeight', 'tableItemsObj', tableItemsObj, '250px')
              return "350px"
            }
            console.log('tableHeight', 'tableItemsObj', tableItemsObj, dynamicH+'px')
            return dynamicH.toString()+"px" //(tableItemsObj.length*35)+100
          }
          async GetAlternativeViewData(queryDefinition, selObject = {}){
            if (queryDefinition.clientMethod!==undefined){
                //alert('Calling '+queryDefinition.clientMethod+' from GetViewData')            
                if (this[queryDefinition.clientMethod]===undefined){
                    alert('not found any clientMethod called '+queryDefinition.clientMethod)
                    return
                }
                this[queryDefinition.clientMethod]()
                return
            }
            console.log('GetAlternativeViewData', 'queryDefinition', queryDefinition)
            let APIParams=this.getAPICommonParams(queryDefinition)
            let viewParams=this.jsonParam(queryDefinition, selObject)
            let endPointUrl=this.getQueryAPIUrl(queryDefinition)
            let params = this.config.backendUrl + endPointUrl
              + '?' + new URLSearchParams(APIParams) + '&'+ new URLSearchParams(viewParams)
    
            //console.log('params', params)        
            await this.fetchApi(params).then(j => {
              if (j && !j.is_error) {
                this.setGrid(j)
              } else {            
                this.setGrid()
              }
            })
            this.samplesReload = false
        }           
    }
}  