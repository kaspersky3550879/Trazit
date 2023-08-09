export function ProcManagementMethods(base) {
    return class extends (base) {
      selectedProcedureInstance(e){ 
        this.selectedProcInstance={}   
        this.selectedProcInstance=this.allProcedures.find(item => item.proc_instance_name === e.currentTarget.id);
        this.selectSectionView(0)
        this.render()
      }
      openSop(e){
        if (window) {
          window.open(this.selectedItems[0].file_link, '_blank').focus()
        }
      }
      procMngRequirementsMethod(e){        
        this.credsChecker(this.actionBeingPerformedModel.actionName, null, this.jsonParam(this.actionBeingPerformedModel, this.selectedItems[0]), this.actionBeingPerformedModel, true)
      }
      testScriptPerformed(){
          alert('testScriptPerformed')
          let mye={}
          mye.currentTarget={}
          mye.currentTarget.id=this.procInstanceName
          //this.resetView()
          //this.selectedProcedureInstance(mye)    
        }
        coveragePerformed(){
          alert('coveragePerformed')
          
      }        
    }
}