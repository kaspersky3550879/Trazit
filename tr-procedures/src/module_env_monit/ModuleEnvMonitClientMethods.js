import { html, nothing } from 'lit';
import { commonLangConfig } from '@trazit/common-core';

export function ModuleEnvMonitClientMethods(base) {
    return class extends base {  
        static get properties() {
            return {
                headerInfo: { type: Object },
                sopsPassed: {type : Boolean},
                prodLotList: { type: Object },
            }
        }
        constructor() {
            super()
            this.sopsPassed=true
            this.headerInfo = JSON.parse(sessionStorage.getItem("userSession")).header_info
            //console.log(this.headerInfo)
            this.prodLotList=[]
        }
        async getProgramList() {
           //alert('getProgramList')
            let queryDefinition=this.viewModelFromProcModel.viewQuery
            this.samplesReload = true
        //    this.templates.programsList = []
            let APIParams=this.getAPICommonParams(queryDefinition)
            let viewParams=this.jsonParam(queryDefinition)
            let params = this.config.backendUrl + this.config.frontEndEnvMonitUrl
                + '?' + new URLSearchParams(APIParams) + '&'+ new URLSearchParams(viewParams)
            await this.fetchApi(params).then(j => {
            if (j && !j.is_error) {
                //if (queryDefinition.subQuery) {
                //this.GetViewData(queryDefinition.subQuery)
                this.templates.programsList = j.programsList
                //}
            }
            })
        }
        logSampleDialog() {
            // alert('logSampleDialog')
            this.GetQueriesForDialog(this.viewModelFromProcModel.langConfig.gridActionOnClick)            
        }
        pointTemplate() {
            // console.log('pointTemplate')

            if (this.viewModelFromProcModel===undefined||this.viewModelFromProcModel.langConfig===undefined||this.viewModelFromProcModel.langConfig.fieldText===undefined
                ||this.selectedItems===undefined||this.selectedItems[0]===undefined||this.selectedItems[0].card_info===undefined) {
                //alert('genericFormDialog has no dialogInfo')
                return nothing
            }

            return html`
            <tr-dialog id="pointDialog" .open=${this.selectedItems && this.selectedItems.length && this.sopsPassed}
              @closed=${e => { if (e.target === this.pointDialog) this.grid.activeItem = null }}
              heading=""
              hideActions=""
              scrimClickAction="">            
              <div class="layout vertical flex center-justified">
                <div class="layout horizontal justified flex">
                  <sp-button size="m" variant="secondary" dialogAction="accept">
                    ${commonLangConfig.closeDialogButton["label_" + this.lang]}</sp-button>
                  <sp-button size="m" @click=${this.setLogSample}>${this.viewModelFromProcModel.langConfig.fieldText.logBtn["label_" + this.lang]}</sp-button>
                </div>
                <div class="layout horizontal flex around-justified wrap" style="gap: 5px;">
                  <mwc-select label="${this.viewModelFromProcModel.langConfig.fieldText.shift["label_" + this.lang]}" id="shift">
                    ${this.viewModelFromProcModel.langConfig.fieldText.shift.items.map((c, i) =>
              html`<mwc-list-item value="${c.keyName}" ?selected=${c.keyName == this.headerInfo.shift}>${c["keyValue_" + this.lang]}</mwc-list-item>`
            )}
                  </mwc-select>
                  <mwc-select label="${this.viewModelFromProcModel.langConfig.fieldText.lot["label_" + this.lang]}" id="lot">
                    ${this.prodLotList.map((c, i) =>
              html`<mwc-list-item value="${c.lot_name}" ?selected=${i == 0}>${c.lot_name}</mwc-list-item>`
            )}
                  </mwc-select>
                  ${this.selectedItems.length && this.selectedItems[0].card_info.map(f =>
              html`${(f.name in this.viewModelFromProcModel.langConfig.gridHeader) ?
                // html`<mwc-textfield style="width:200px" ?disabled=${this.viewModelFromProcModel.langConfig.gridHeader[f.name]&&this.viewModelFromProcModel.langConfig.gridHeader[f.name].confidential_value?true:false} label=${this.viewModelFromProcModel.langConfig.gridHeader[f.name]['label_'+this.lang]} name=${f.name} type=${f.type} value=${this.viewModelFromProcModel.langConfig.gridHeader[f.name]&&this.viewModelFromProcModel.langConfig.gridHeader[f.name].confidential_value&&f.value?"*****":f.value}></mwc-textfield>` :
                html`<mwc-textfield disabled style="width:200px" label=${this.viewModelFromProcModel.langConfig.gridHeader[f.name]['label_' + this.lang]} name=${f.name} type=${f.type} value=${this.viewModelFromProcModel.langConfig.gridHeader[f.name] && this.viewModelFromProcModel.langConfig.gridHeader[f.name].confidential_value && f.value ? "*****" : f.value}></mwc-textfield>` :
                nothing
                }
                    `
            )}
                </div>
              </div>
            </tr-dialog>
            `
          }
      
          get pointDialog() {
            return this.shadowRoot.querySelector("tr-dialog#pointDialog")
          }
      
          get shiftField() {
            return this.shadowRoot.querySelector("mwc-select#shift")
          }
      
          get lotField() {
            return this.shadowRoot.querySelector("mwc-select#lot")
          }
      
          setLogSample() {
            this.targetValue = {
              sampleTemplate: this.templates.selectedProgram.sample_config_code,
              sampleTemplateVersion: this.templates.selectedProgram.sample_config_code_version,
              fieldValue: `${this.shiftField.value}*String|${this.lotField.value}*String`
            }
            
            this.performActionRequestHavingDialogOrNot(this.viewModelFromProcModel.langConfig.gridActionOnClick.dialogInfo.action, this.selectedItems[0], this.targetValue)
          }
      
    }
}