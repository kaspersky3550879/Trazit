export function ClientMethod(base) {
  return class extends base {

    async getSamples() {
      this.samplesReload = true
      this.selectedSamples = []
console.log('getSamples', 'actionObj', this.actionObj)      
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
    getMicroorganism() {
      let params = this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          this.microName = null
          this.microorganismList = j
          this.gridDialogItems = this.selectedSamples[0].microorganism_list_array
          this.fromGrid = false
          this.requestUpdate()
        }
      })
    }

    addSampleMicroorganism() {
      this.sampleState = { action: JSON.stringify(this.selectedAction), sample: this.selectedSamples[0].sample_id }
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.reload()
      })
    }

    reloadSampleState() {
      this.selectedSamples = this.gridItems.filter(g => g.sample_id == this.sampleState.sample)
      this.selectedAction = JSON.parse(this.sampleState.action)
      this.reloadDialog()
      this.sampleState = null
    }

    getMicroorganismItem() {
      this.reqParams.whereFieldsValue = this.selectedSamples[0].sample_id + "*Integer"
      let params = this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          this.microName = null
          this.microorganismList = j
          this.gridDialogItems = this.selectedSamples[0].microorganism_list_array
          this.requestUpdate()
        }
      })
    }

    removeSampleMicroorganism() {
      this.sampleState = { action: JSON.stringify(this.selectedAction), sample: this.selectedSamples[0].sample_id }
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.microGrid.selectedItems = []
        this.reload()
      })
    }

    setIncubator() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitUrl
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        this.newBatchDialog.close()
        this.assignDialog.close()
        this.reload()
      })
    }

    getAssign() {
      let params = this.config.backendUrl + this.config.frontEndEnvMonitIncubationUrl
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          this.selectedAssigns = []
          this.assignList = j
          this.asGrid.items = j
          this.requestUpdate()
        }
      })
    }

    addRemoveBatch() {
      if (this.selectedAction.actionName == "EM_BATCH_INCUB_ADD_SMP" && !this.batchName) {
        this.dispatchEvent(new CustomEvent("error", {
          detail: {
            is_error: true,
            message_en: "Please select the batch should be added",
            message_es: "Seleccione el lote que debe agregarse"
          },
          bubbles: true,
          composed: true
        }))
        console.log("Please select the batch should be added")
        return
      }
      this.reqParams = {
        ...this.reqParams,
        batchName: this.batchName
      }
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.reload()
      })
    }



    getLots() {
      console.log('getLots')
      let params = this.config.backendUrl + this.config.frontEndEnvMonitUrl
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        this.samplesReload = false
        this.langConfig.fieldText.lot.items = j
        this.ready = true
        this.requestUpdate()
      })
    }

    logSample() {
      let params = this.config.backendUrl + (this.actionObj.endPoint ? this.actionObj.endPoint : this.config.SampleAPIactionsUrl)
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.pointDialog.close()
      })
    }

    reviewTest() {
      let params = this.config.backendUrl + (this.actionObj.endPoint ? this.actionObj.endPoint : this.config.SampleAPIactionsUrl)
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.reload()
      })
    }

    getDeactivatedLots() {
      this.deactivatedLots = []
      let params = this.config.backendUrl + this.selectedDialogAction.endPoint
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          this.deactivatedLots = j
        }
      })
    }

    setLot() {
      console.log('setLot')
      let params = this.config.backendUrl + this.config.ApiEnvMonitProdLotUrl
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.lotDialog.close()
        this.reload()
      })
    }

    setInstruments() {
      console.log('this.reqParams', this.reqParams);
      let params = this.config.backendUrl + this.config.ApiInstrumentsAPIactionsUrl
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        //        this.newInstrumentDialog.close()
        this.reload()
      })
    }
    completeInstrumentEvent() {
      console.log('completeInstrumentEvent this.reqParams', this.reqParams);
      if (this.selectedSamples !== undefined && this.selectedSamples[0].event_type !== undefined) {
        this.reqParams.actionName = "COMPLETE_" + this.selectedSamples[0].event_type;
      }
      this.reqParams.decision = this.decisionInput.value
      let params = this.config.backendUrl + this.config.ApiInstrumentsAPIactionsUrl
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        //        this.newInstrumentDialog.close()
        this.reload()
      })
    }
    getDeactivatedInstruments() {
      this.deactivatedLots = []
      let params = this.config.backendUrl + this.config.ApiInstrumentsAPIqueriesUrl
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          this.deactivatedLots = j
        }
      })
    }
    getInstEventResult() {
      let params = this.config.backendUrl + this.config.ApiInstrumentsAPIqueriesUrl
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          if (this.curResultRef) {
            let r = j.filter(d => d.event_id == this.curResultRef.evtId)
            if (r.length) {
              this.curResultRef.elm.value = r[0].value
            }
          }
          this.selectedResults = []
          this.enterResults = j
          this.erGrid.items = j
          this.requestUpdate()
        } else {
          this.dispatchEvent(new CustomEvent("error", {
            detail: {
              is_error: true,
              message_en: this.selectedAction.alertMsg.empty["label_en"],
              message_es: this.selectedAction.alertMsg.empty["label_es"]
            },
            bubbles: true,
            composed: true
          }))
          console.log(this.selectedAction.alertMsg.empty["label_en"])
        }
      })
    }

    instEventEnterResult() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.reloadDialog()
      })
    }

    reviewSample() {
      let params = this.config.backendUrl + (this.selectedAction.endPoint ? this.selectedAction.endPoint : this.config.frontEndEnvMonitSampleUrl)
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.reload()
      })
    }
 
    inventoryLotPrintLabel(action, selectedItem ) {
      console.log('inventoryLotPrintLabel this.reqParams', this.reqParams);
      if (selectedItem === undefined || selectedItem.lot_name === undefined) {
        alert("item not selected")
        return
      } 

      var extraParams=this.jsonParam(action,  selectedItem)   
      let APIParams=this.getAPICommonParams(action)
      let endPointUrl=this.getActionAPIUrl(action)
      if (String(endPointUrl).toUpperCase().includes("ERROR")){
          alert(endPointUrl)
          return
      }
      let params = this.config.backendUrl + endPointUrl
        + '?' + new URLSearchParams(APIParams) + '&'+ new URLSearchParams(extraParams)
       // + '&'+ new URLSearchParams(credDialogArgs)
      console.log('inventoryLotPrintLabel', 'action', action, ' selectedItem',  selectedItem, 'extraParams', extraParams)


      //this.reqParams.actionName = "LOT_PRINT_LABEL";     
      // let params = this.config.backendUrl + this.config.ApiInstrumentsAPIactionsUrl
      //   + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        if (j && !j.is_error) {          
          console.log(j.zpl_code)
          //this.setPrintContent()          
          var printWindow = window.open('', '', 'fullscreen=yes');
          printWindow.document.write(j.zpl_code);
//          printWindow.document.title = this.printObj.header;
          printWindow.document.close();
          setTimeout(function () {
            printWindow.print();
            
            printWindow.close();
          }, 500);  
        } else {            
          alert('is_error')
        }
      })     
      return 
      this.fetchApi(params).then(() => {(j => {
        console.log('j', j)
        if (j && j.is_error===undefined) {
          console.log(j.zpl_code)
          this.setPrintContent()
          var printWindow = window.open('', '', 'fullscreen=yes');
          printWindow.document.write(j.zpl_code);
//          printWindow.document.title = this.printObj.header;
          printWindow.document.close();
          setTimeout(function () {
            printWindow.print();
            printWindow.close();
          }, 500);          
        } else {
          alert(j.is_error)
        }
        }
        //this.reload()
      )})
    }    
  }
}