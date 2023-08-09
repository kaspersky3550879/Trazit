import { html, nothing } from 'lit';
import { columnBodyRenderer, gridRowDetailsRenderer } from 'lit-vaadin-helpers';
import { commonLangConfig } from '@trazit/common-core';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';

export function ModuleEnvMonitDialogsMicroorganism(base) {
return class extends base {
    static get properties() {
        return {
          microorganismList:{type: Array},
          gridDialogItems:{type: Array}
        }
    }
    constructor() {
        super()
        this.microorganismList=[]
        this.gridDialogItems=[]
    }

//    @opened=${this.getMicroorganismToRemove()}

    moduleEnvMonitMicroorganismsDialogAdd() {
      // if (this.actionBeingPerformedModel.dialogInfo===undefined||this.actionBeingPerformedModel.dialogInfo.name!=="microorganismDialogAdd"){return nothing}
      // console.log('moduleEnvMonitMicroorganismsDialog', 'actionBeingPerformedModel', this.actionBeingPerformedModel)
      return html`
        <tr-dialog id="microorganismDialogAdd" ?open=${this.openAddDialog()}
          @opened=${e => { if (e.target === this.microorganismDialog) this.fromGrid = false }}
          @closing=${e => { if (e.target === this.microorganismDialog) { this.microorganismList = []; this.reload(); } }}
          heading=""
          hideActions=""
          scrimClickAction="">
          ${this.actionBeingPerformedModel.dialogInfo===undefined||this.actionBeingPerformedModel.dialogInfo.name!=="microorganismDialogAdd" ? nothing:
          html`
              ${this.selectedItems.length ?
            html`<label slot="topLeft" style="font-size:12px">Sample ID: ${this.selectedItems[0].sample_id}</label>` : nothing
          }
          <div class="layout vertical flex">
            ${this.viewForAdd()}        
          </div>
          `}
        </tr-dialog>
      `
    }
    openAddDialog(){
      //console.log('openAddDialog')
      return this.microorganismList.length>0&&this.actionBeingPerformedModel.dialogInfo!==undefined&&this.actionBeingPerformedModel.dialogInfo.name==="microorganismDialogAdd"

    }
openRemoveDialog(){
  // !==undefined}&&${this.actionBeingPerformedModel.dialogInfo!==undefined&&${this.actionBeingPerformedModel.dialogInfo.name==="microorganismDialogRemove"}&&${this.microorganismList.length}
  return this.microorganismList.length>0&&this.actionBeingPerformedModel.dialogInfo!==undefined&&this.actionBeingPerformedModel.dialogInfo.name==="microorganismDialogRemove"
}
    moduleEnvMonitMicroorganismsDialogRemove() {
      // if (this.actionBeingPerformedModel.dialogInfo===undefined||this.actionBeingPerformedModel.dialogInfo.name!=="microorganismDialogRemove"){return nothing}
      // console.log('moduleEnvMonitMicroorganismsDialog', 'actionBeingPerformedModel', this.actionBeingPerformedModel)
      return html`
        <tr-dialog id="microorganismDialogRemove" ?open=${this.openRemoveDialog()}
          @opened=${e => { if (e.target === this.microorganismDialog) this.fromGrid = false }}
          @closing=${e => { if (e.target === this.microorganismDialog) { this.microorganismList = []; this.reload(); } }}
          heading=""
          hideActions=""
          scrimClickAction="">
          ${this.actionBeingPerformedModel.dialogInfo===undefined||this.actionBeingPerformedModel.dialogInfo.name!=="microorganismDialogRemove" ? nothing:
          html`
              ${this.selectedItems.length ?
            html`<label slot="topLeft" style="font-size:12px">Sample ID: ${this.selectedItems[0].sample_id}</label>` : nothing
          }
          <div class="layout vertical flex">
            ${this.viewForRemove()}        
          </div>
          `}
          </tr-dialog>
      `
    }

    viewForAdd() {
      if (this.actionBeingPerformedModel===undefined||this.actionBeingPerformedModel.dialogInfo===undefined){return html``}
      if (this.actionBeingPerformedModel.dialogInfo.name!=="microorganismDialogAdd"){return html``}
      return html`
        <mwc-textfield id="numMicroItems" label="${this.microName||'Microorganism Name'}" type="number" 
          .min=${this.getNumMicroItems()} 
          .value=${this.getNumMicroItems()}></mwc-textfield>
        ${this.actionBeingPerformedModel.dialogInfo.fieldText===undefined ? nothing: html`
          <mwc-select id='mAdd' @change=${this.selectMicroItem}>
            <mwc-list-item value=''>-- Microorganism List --</mwc-list-item>
            ${this.microorganismList.map(m =>
              html`<mwc-list-item value=${m.name}>${m.name}</mwc-list-item>`
            )}
          </mwc-select>
          <sp-button id="mAddBtn" size="m" variant="cta" @click=${()=>this.AddOrAdhocMicroorganismAction(false)}>
        
          ${this.actionBeingPerformedModel.dialogInfo.fieldText.addBtn["label_" + this.lang]}</sp-button>
        
          <mwc-textfield id="mAddHoc" label="${this.actionBeingPerformedModel.dialogInfo.fieldText.addhocInput['label_' + this.lang]}"
            @input=${this.inputAddhoc}></mwc-textfield>
          <sp-button id="mAddHocBtn" size="m" variant="secondary" @click=${()=>this.AddOrAdhocMicroorganismAction()}>
            ${this.actionBeingPerformedModel.dialogInfo.fieldText.addhocBtn["label_" + this.lang]}</sp-button>
        `}
        <div id='microGrid'>
          <vaadin-grid theme="row-dividers" multi-sort
            .items=${this.gridDialogItems}
            @active-item-changed="${this.selectMicroOrg}">
            <vaadin-grid-sort-column resizable auto-width path="name" header="${this.actionBeingPerformedModel.microorganismHeader.name['label_' + this.lang]}"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column resizable auto-width path="items" header="${this.actionBeingPerformedModel.microorganismHeader.items['label_' + this.lang]}"></vaadin-grid-sort-column>
          </vaadin-grid>
        </div>
      `
    }

    selectMicroItem(e) {
      if (!this.fromGrid) {
        this.microGrid.activeItem = null
        this.microGrid.selectedItems = []
        this.microName = e.target.value
        if (this.microName) {
          this.mAddHoc.disabled = true
          this.mAddHocBtn.disabled = true
          this.mAddHoc.value = ''
        } else {
          this.mAddHoc.disabled = false
          this.mAddHocBtn.disabled = false
        }
      }
      this.fromGrid = false
    }

    inputAddhoc(e) {
      if (!this.fromGrid) {
        this.microGrid.activeItem = null
        this.microGrid.selectedItems = []
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        let name = e.target.value
        this.timeout = setTimeout(() => {
          this.microName = name
          if (this.microName) {
            this.mAdd.value = ''
            this.mAdd.disabled = true
            this.mAddBtn.disabled = true
          } else {
            this.mAdd.disabled = false
            this.mAddBtn.disabled = false
          }
        }, 300);
      }
      this.fromGrid = false
    }

    selectMicroOrg(e) {
      console.log('selectMicroOrg')
      this.fromGrid = true
      // reset back the fromGrid because of async process
      const item = e.detail.value;
      // checking opened dialog, whether add or remove
      if (this.mAdd) {
        this.mAddHoc.disabled = false
        this.mAddHocBtn.disabled = false
        this.mAdd.disabled = false
        this.mAddBtn.disabled = false
        if (item) {
          let existItemList = this.microorganismList.filter(m => m.name == item.name)
          if (existItemList.length) {
            this.mAddHoc.disabled = true
            this.mAddHocBtn.disabled = true
            this.mAddHoc.value = ''
            this.mAdd.value = item.name
            this.mAdd.disabled = true
          } else {
            this.mAdd.disabled = true
            this.mAddBtn.disabled = true
            this.mAdd.value = ''
            this.mAddHoc.value = item.name
            this.mAddHoc.disabled = true
          }
        } else {
          this.mAdd.value = ''
          this.mAddHoc.value = ''
        }
      }
      this.microName = item ? item.name : '';
      e.target.selectedItems = item ? [item] : [];
    }

    getNumMicroItems() {
      let item = this.selectedItems.length&&this.selectedItems[0].microorganism_list_array.filter(m => m.name == this.microName)
      if (item.length) {
        return item[0].items + 1
      } else {
        return 1
      }
    }

    viewForRemove() {
      if (this.actionBeingPerformedModel===undefined||this.actionBeingPerformedModel.microorganismHeader===undefined){return html``}      
      if (this.actionBeingPerformedModel.dialogInfo.name!=="microorganismDialogRemove"){return html``}
      return html`        
        <div id='microGrid'>
          <vaadin-grid theme="row-dividers" all-rows-visible multi-sort
            .items=${this.gridDialogItems}
            @active-item-changed="${this.selectMicroOrg}">
            <vaadin-grid-sort-column resizable auto-width path="name" header="${this.actionBeingPerformedModel.microorganismHeader.name['label_' + this.lang]}"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column resizable auto-width path="items" header="${this.actionBeingPerformedModel.microorganismHeader.items['label_' + this.lang]}"></vaadin-grid-sort-column>
          </vaadin-grid>
        </div>
        ${this.microGrid && this.microGrid.selectedItems.length ?
          html`
            <mwc-textfield id="numMicroItems" min=0 .max=${this.getNumMicroItems() - 2} label="${this.microGrid.selectedItems[0].name}" type="number" .value=${this.getNumMicroItems() - 2}></mwc-textfield>
          ` :
          nothing
        }
        <sp-button size="m" variant="cta" @click=${this.removeSampleMicroorganismAction}>
        ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
      `
    }

    get microorganismDialogAdd() {return this.shadowRoot.querySelector("tr-dialog#microorganismDialogAdd")}
    get microorganismDialogRemove() {return this.shadowRoot.querySelector("tr-dialog#microorganismDialogRemove")}
    get mAdd() {return this.shadowRoot.querySelector("mwc-select#mAdd")}
    get mAddHoc() {return this.shadowRoot.querySelector("mwc-textfield#mAddHoc")}
    get microItems() {return this.shadowRoot.querySelector("mwc-textfield#numMicroItems")}
    get microGrid() {return this.shadowRoot.querySelector('div#microGrid vaadin-grid')}
    get mAddBtn() {return this.shadowRoot.querySelector("sp-button#mAddBtn")}
    get mAddHocBtn() {return this.shadowRoot.querySelector("sp-button#mAddHocBtn")}

    AddOrAdhocMicroorganismAction(addhoc=true) {
      if (this.microName) {
        // get value from text input
        let totalItems = Number(this.microItems.value)
        // get value from text input
        if (addhoc) {
          this.selectedDialogAction = this.actionBeingPerformedModel.dialogInfo.action[1]
        // get value from selected item
        } else {
          this.selectedDialogAction = this.actionBeingPerformedModel.dialogInfo.action[0]
        }
        let item = this.gridDialogItems.filter(m => m.name == this.microName)
        if (item.length) {
          item = item[0].items
        } else {
          item = 0
        }
        let numItems = totalItems - item
        this.gridDialogItems.forEach(m => {
          if (m.name != this.microName) {
            totalItems += Number(m.items)
          }
        })

        if (Number(this.selectedItems[0].raw_value) < totalItems) {
          this.dispatchEvent(new CustomEvent("error", {
            detail: {
              is_error: true,
              message_en: "This addition would be " + totalItems + " what is greater than the reading " + this.selectedItems[0].raw_value + " what is not allowed.",
              message_es: "Está adición sumaría un total de " + totalItems + ", mayor a la lectura identificada, " + this.selectedItems[0].raw_value + ", lo que no es permitido."
            },
            bubbles: true,
            composed: true
          }))
          console.log("This addition would be " + totalItems + " what is greater than the reading " + this.selectedItems[0].raw_value + " what is not allowed.")
          return
        }
        this.targetValue = {
          microorganismName: this.microName,
          numItems: numItems
        }
        this.performActionRequestHavingDialogOrNot(this.selectedDialogAction, this.selectedItems[0], this.targetValue)
      }
    }
    reload() {
      this.resetDialogThings()
    }
    resetDialogThings() {
      this.targetValue = {}
      this.selectedDialogAction = null
    }
    getMicroorganismToAdd() {      
      console.log('getMicroorganismToAdd')
      this.moduleEnvMonitMicroorganismsDialogAdd()
      let queryDefinition=this.actionBeingPerformedModel.dialogInfo.viewQuery
      let APIParams=this.getAPICommonParams(queryDefinition)
      let viewParams=this.jsonParam(queryDefinition, this.selectedItems[0])
      let params = this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl
        + '?' + new URLSearchParams(viewParams) + '&'+ new URLSearchParams(APIParams) 
      this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          this.microName = null
          this.microorganismList = j
          this.gridDialogItems = this.selectedItems[0].microorganism_list_array
          this.fromGrid = false
          this.requestUpdate()
        }
      })
    }

    addSampleMicroorganism() {
      let queryDefinition=this.actionBeingPerformedModel.action[0]
      //this.sampleState = { action: JSON.stringify(queryDefinition), sample: this.selectedItems[0].sample_id }
      this.targetValue = {
        sampleId: this.selectedItems[0].sample_id,
        microorganismName: this.microGrid.selectedItems[0].name
        //numItems: this.microGrid.selectedItems[0].items - this.microItems.value
      }
      console.log('addSampleMicroorganism', 'targetValue', this.targetValue)      
      var extraParams=this.jsonParam(queryDefinition, this.selectedItems[0], this.targetValue) 
      let APIParams=this.getAPICommonParams(queryDefinition)
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl
        + '?' + new URLSearchParams(this.reqParams) + '&'+ new URLSearchParams(APIParams) + '&'+ new URLSearchParams(extraParams)
      this.fetchApi(params).then(() => {
        this.reload()
      })
    }    

    getMicroorganismToRemove() {
      console.log('getMicroorganismToRemove')
      this.moduleEnvMonitMicroorganismsDialogRemove()
      let queryDefinition=this.actionBeingPerformedModel.dialogInfo.viewQuery
      let APIParams=this.getAPICommonParams(queryDefinition)      
      this.reqParams.whereFieldsName = "sample_id"
      this.reqParams.whereFieldsValue = this.selectedItems[0].sample_id + "*Integer"
      let params = this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl
        + '?' + new URLSearchParams(this.reqParams) + '&'+ new URLSearchParams(APIParams) 
      this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          this.microName = null
          this.microorganismList = j
          this.gridDialogItems = this.selectedItems[0].microorganism_list_array
          this[this.actionBeingPerformedModel.dialogInfo.name].show()
          this.requestUpdate()
        }
      })
    }

    removeSampleMicroorganismAction() {      
      let queryDefinition=this.actionBeingPerformedModel.dialogInfo.action[0]
      //this.sampleState = { action: JSON.stringify(queryDefinition), sample: this.selectedItems[0].sample_id }
      if (!this.microGrid.selectedItems.length) return
      this.targetValue = {}
      this.targetValue = {
        sampleId: this.selectedItems[0].sample_id,
        microorganismName: this.microGrid.selectedItems[0].name,
        numItems: this.microGrid.selectedItems[0].items - this.microItems.value
      }
      this.microItems.hidden = true
      console.log('removeSampleMicroorganismAction 20221013', 'targetValue', this.targetValue, 'queryDefinition', queryDefinition)      
      let APIParams=this.getAPICommonParams(queryDefinition)
      var extraParams=this.jsonParam(queryDefinition, this.selectedItems[0], this.targetValue)  
      let endPointUrl=this.getActionAPIUrl(queryDefinition) 
      let params = this.config.backendUrl + endPointUrl
        + '?' + new URLSearchParams(this.reqParams) + '&'+ new URLSearchParams(APIParams)+ '&'+ new URLSearchParams(extraParams)
      this.fetchApi(params).then(() => {
        this.microorganismList = []
        this.microGrid.selectedItems = []
        this.reload()
        this.targetValue = {}
      })
    }

    removeSampleMicroorganismActionNO() {
      console.log('removeSampleMicroorganismAction')
      // if (!this.microGrid.selectedItems.length) return
      // this.targetValue = {
      //   sampleId: this.selectedItems[0].sample_id,
      //   microorganismName: this.microGrid.selectedItems[0].name,
      //   numItems: this.microGrid.selectedItems[0].items - this.microItems.value
      // }
      // this.microItems.hidden = true
      this.selectedDialogAction = this.actionBeingPerformedModel.dialogInfo.action[0]
      this.actionMethod(this.selectedDialogAction, false)
    }    
    get objectToReactivateName() {return this.shadowRoot.querySelector("mwc-select#objectToReactivateName")}
  
}}