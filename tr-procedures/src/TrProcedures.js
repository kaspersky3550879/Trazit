import { html, css, nothing} from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import { Layouts, Alignment } from '@collaborne/lit-flexbox-literals';
import { ProceduresModel } from './ProceduresModel';
import '@trazit/tr-dialog/tr-dialog';
import './components/Audit/audit-dialog';

import {ApiFunctions} from './components/Api/ApiFunctions';


export class TrProcedures extends (((((((ApiFunctions(CredDialog)))))))) {
  static get styles() {
    return [
      Layouts, Alignment,
      super.styles,
      css`
        mwc-button {
          --mdc-typography-button-text-transform: none;
          margin: 0 2px;
        }
        tr-dialog * {
          margin-bottom: 5px;
        }
        mwc-textfield[hidden] {
          display: none;
        }
        div#microGrid {
          height: 35vh;
          overflow: auto;
        }
        mwc-button[hidden] {
          display: none;
        }
        mwc-button.tabBtn {
          --mdc-theme-primary: #03a9f4;
          --mdc-theme-on-primary: white;
          --mdc-typography-button-font-size: 10px;
        }
        mwc-icon-button.reverse {
          -webkit-transform:rotateY(180deg);
          -moz-transform:rotateY(180deg);
          -o-transform:rotateY(180deg);
          -ms-transform:rotateY(180deg);
        }
        mwc-icon-button[disabled] {
          opacity: 0.5;
        }
        img.iconBtn {
          width: 20px;
        }
        div.input * {
          margin: 10px 0 5px;
        }
        mwc-icon-button[hidden] {
          display: none;
        }
        #resultDialog {
          --mdc-dialog-min-width: 80vw;
        }
        vaadin-grid {
          font-size: 12px;
        }
        sp-button[hidden] {
          display: none;
        }
        .enterResultVal {
          width: 75%;
        }
        @media (max-width: 460px) {
          vaadin-grid {
            font-size: 10px;
          }
          vaadin-grid-cell-content {
            padding: 5px;
          }
          #resultDialog {
            --mdc-dialog-min-width: 100vw;
          }
        }
      `
    ];
  }

  static get properties() {
    return {
      procName: { type: String },
      viewModelFromProcModel: {type: Object},      
      viewName: { type: String },
      filterName: { type: String },
      // langConfig: { type: Object },
      // actions: { type: Array },
      // compositions: { type: Array },
      // samplesReload: { type: Boolean },
      // gridItems: { type: Array },
      // selectedSamples: { type: Array },
      // selectedAction: { type: Object },
      // batchName: { type: String },
      // viewModelFromProcModel: { type: String },      
      tabs: { type: Array },
      windowOpenable: { type: String },
      // sopsPassed: { type: Boolean },
      // we will wait the updated langConfig completed
      // fixed issue: https://github.com/FranGomezVenegas/FETR/issues/158
      ready: { type: Boolean },
      sampleState: { type: Object },
      masterData:{ type: Object}
     
    };
  }
  constructor() {
    super()
    this.procName=''
    this.viewName=''
    this.masterData={}
  }

  resetView() {

    let findProc = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures.filter(m => m.procInstanceName == this.procName)
    if (!this.config.local) {
      if (findProc.length) {
        ProceduresModel[this.procName] = findProc[0].procModel
      }
    }
    this.procInstanceModel=ProceduresModel[this.procName]
    if (findProc!==undefined&&findProc.length>0&&findProc[0].master_data!==undefined){
      this.masterData=findProc[0].master_data
      console.log('Master Data for procedure ', this.procName, this.masterData)   
    }
    this.gridItems = []
    this.viewModelFromProcModel = null
    if (ProceduresModel[this.procName]===undefined){
      alert('Model for procedure '+this.procName+' not found in the ProceduresModel (probably not load in local)')
      return
    }
    this.viewModelFromProcModel=ProceduresModel[this.procName][this.viewName];
    if (this.viewModelFromProcModel===undefined){
      alert('Not found any window called '+this.viewName+' in the Backend Proc Model for procedure '+this.procName)
      return
    }
    if (this.viewModelFromProcModel.component===undefined){
      alert('The window called '+this.viewName+' has no component specified in the Backend Proc Model for procedure '+this.procName)
      return
    }
    
    //console.log('resetView', 'component', this.viewModelFromProcModel.component)
    
    switch(this.viewModelFromProcModel.component){
      case 'GridWithButtons':
      case 'TableWithButtons':        
        import('./components/grid_with_buttons/grid-with-buttons')
        if (this.GridWithButtons!==null){
          this.GridWithButtons.ready=true
        }        
        //alert('grid')
        return
      case 'Tabs':
        import('./components/Tabs/tabs-main-view')
        return
      case 'Flowchart':
        import('./components/FlowChart/flow-chart')
        return  
      case 'ObjectByTabs':
        import('./components/ObjectByTabs/object-by-tabs')
        return  
        case 'CalendarData':
          import('./components/Calendar/calendar-data')
          return  
        case 'ModuleEnvMonitHomeAir':
        import('./module_env_monit/home-air')
        return  
      case 'ModuleEnvMonitCultureMedium':
        this.windowOpenable=true
        import('./module_env_monit/culture-medium')
        return  
      case 'ModuleEnvMonitHomeWater':
        import('./module_env_monit/home-water')
        return  
      case 'ModuleEnvMonitProgramProc':
        import('./module_env_monit/program-proc')
        return
      case 'ModuleEnvMonitSampleIncubation':
        import('./module_env_monit/sample-incubation-view')
        return
      case 'EnvMonitBrowser', 'Browser':
        import('./browser/browser-view')
        return        
      case 'DataMining':
        import('./data_mining/datamining-mainview')
        return
      case 'ModuleGenomaProjectWindow':
        import('./module_genoma/genoma-project')
        return
      case 'ModuleSampleLogSample':
        import('./module_sample/log-sample-module-sample')
        return
      default:
        alert('In TrProcedures, not found component '+this.viewModelFromProcModel.component)
        return
    }
  }

  async authorized() {
    //super.authorized() -- credDialog
    //console.log('authorized')
    this.windowOpenable = null
    this.sopsPassed = null
    let procList = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures

    if (this.procName===undefined||procList===undefined){return}
    
    let anyAccess = procList.filter(p => p.procInstanceName == this.procName)
    if (anyAccess.length) {
      let defView = anyAccess[0].new_definition.filter(d => d.lp_frontend_page_name == this.viewName)
      if (defView.length==0) {
        defView = anyAccess[0].icons_up.filter(d => d.lp_frontend_page_name == this.viewName)
      }
      if (defView.length==0) {
        defView = anyAccess[0].icons_down.filter(d => d.lp_frontend_page_name == this.viewName)
      }
      if (defView.length) {
        // for fake test
        // this.sopsPassed = false
        if (defView[0].icons) {
          let sopIcon = defView[0].icons.filter(i => i.name == this.filterName)
          if (sopIcon===undefined||sopIcon[0]===undefined){
            this.sopsPassed = true
          }else{
            this.sopsPassed = sopIcon[0].sops_passed
          }
        } else {
          if (defView===undefined||defView[0]===undefined){
            this.sopsPassed = true
          }else{
            this.sopsPassed = defView[0].sops_passed
          }
        }
        if (defView.sop===undefined||defView.sop.length==0){
          this.sopsPassed=true
        }

      }
      if (!this.sopsPassed) {
        if (anyAccess.length && anyAccess[0].userSopMode!==undefined && anyAccess[0].userSopMode.toString().toUpperCase().includes("DISAB")) {
          this.sopsPassed=true
        } else{      
          if (anyAccess[0].userSopMode===undefined||anyAccess[0].windowOpenableWhenNotSopCertifiedUserSopCertification===undefined){
            this.sopsPassed=false
            this.windowOpenable = "no"
          }else{
            this.windowOpenable = anyAccess[0].windowOpenableWhenNotSopCertifiedUserSopCertification.toLowerCase()
          }
        }
      }
      // When sopsPassed=true then does not matter what windowOpenableWhenNotSopCertifiedUserSopCertification business rule is set
      if (this.sopsPassed) {
        this.windowOpenable = "yes"
      }
      if (this.windowOpenable == "no") {
        this.dispatchEvent(new CustomEvent("error", {
          detail: { 
            is_error: true,
            message_en: "Window cannot be open due to pending linked SOP certifications",
            message_es: "La ventana no se puede abrir porque hay SOPs vinculados pendientes de certificación"
          },
          bubbles: true,
          composed: true
        }))
        console.log("Window cannot be open due to pending linked SOP certifications")
        return
      }
      if (defView.length && defView[0].mode==="readonly") {
        this.sopsPassed = false
      } else if (defView.length && defView[0].mode==="edit") {
        this.sopsPassed = this.sopsPassed == false ? false : true
      }
    }else{
      this.windowOpenable="yes"
      this.sopsPassed=true
    }
    await this.updateComplete
    // experimental for browser view
    if (this.viewName == "Browser") return
    if (this.viewName == "DataMining") return
    //console.log('this.viewModelFromProcModel', this.viewModelFromProcModel)    
    if (!this.viewModelFromProcModel) {
      // whether user has access into the selected proc
      if (anyAccess.length) {
        if (this.tabs) {
          this.tabsComposition.updateComplete.then(() => {
            this.tabsComposition.model = ProceduresModel[this.procName][this.viewName].tabs[0]
          })
        } else {
          this.reload()
        }
      }
    }    
  }

  reload() {
    return
  }    
  resetDialogThings() {
    this.itemId = null
    this.targetValue = {}
    this.selectedResults = []
    this.selectedDialogAction = null
  }
  ownComponents(){
    if (this.viewModelFromProcModel!==null&&this.viewModelFromProcModel!==undefined&&this.viewModelFromProcModel.component!==undefined){
      //console.log('ownComponents', 'component', this.viewModelFromProcModel.component, 'viewName', this.viewName)
    }
    return html `
      ${this.viewModelFromProcModel!==undefined&&this.viewModelFromProcModel.component == 'Browser' ? html`
        <browser-view .config=${this.config} .desktop=${this.desktop} .lang=${this.lang} .model=${ProceduresModel[this.procName]} .procName=${this.procName}></browser-view>
      `:html``}      
      ${this.viewModelFromProcModel&&this.viewModelFromProcModel.component == 'DataMining' ? html`
        <datamining-mainview .config=${this.config} .desktop=${this.desktop} .lang=${this.lang} 
        .viewModelFromProcModel=${this.viewModelFromProcModel} .masterData=${this.masterData} .model=${ProceduresModel[this.procName]} .procInstanceName=${this.procName} .procName=${this.procName}></datamining-mainview>
      `:html``}
      ${this.viewModelFromProcModel&&this.viewModelFromProcModel.component == 'Flowchart' ? html`
        <flow-chart .config=${this.config} .desktop=${this.desktop} .lang=${this.lang} .model=${ProceduresModel[this.procName]} .procName=${this.procName}></flow-chart>
      `:html``}
      ${this.viewModelFromProcModel&&this.viewModelFromProcModel.component == 'ModuleEnvMonitHomeAir' ? html`
        <home-air .config=${this.config} .desktop=${this.desktop} .lang=${this.lang} .model=${ProceduresModel[this.procName]} .procName=${this.procName}></home-air>
      `:html``}
      ${this.viewModelFromProcModel&&this.viewModelFromProcModel.component == 'ModuleEnvMonitCultureMedium' ? html`
        <culture-medium></culture-medium>
      `:html``}
      ${this.viewModelFromProcModel&&this.viewModelFromProcModel.component == 'ModuleEnvMonitHomeWater' ? html`
        <home-water .config=${this.config} .desktop=${this.desktop} .lang=${this.lang} .model=${ProceduresModel[this.procName]} .procName=${this.procName}></home-water>
      `:html``}
      ${this.viewModelFromProcModel&&this.viewModelFromProcModel.component == 'ModuleSampleLogSample' ? html`
        <log-sample-module-sample 
          .windowOpenable=${this.windowOpenable} .sopsPassed=${this.sopsPassed}  .lang=${this.lang}
          .procInstanceName=${this.procName} .viewName=${this.viewName}   .filterName=${this.filterName}  
          .viewModelFromProcModel=${this.viewModelFromProcModel} .config=${this.config}>
        </log-sample-module-sample>        
      `:html``}
      ${this.viewModelFromProcModel&&this.viewModelFromProcModel.component == 'ModuleEnvMonitProgramProc' ? html`
        <program-proc .windowOpenable=${this.windowOpenable} .sopsPassed=${this.sopsPassed} .lang=${this.lang}
          .procInstanceName=${this.procName}  .viewName=${this.viewName} .filterName=${this.filterName} .model=${this.viewModelFromProcModel}
          .viewModelFromProcModel=${this.viewModelFromProcModel} .config=${this.config}></program-proc>      
      `:html``}
      ${this.viewModelFromProcModel&&this.viewModelFromProcModel.component == 'ModuleEnvMonitSampleIncubation' ? html`
        <sample-incubation-view .windowOpenable=${this.windowOpenable} .sopsPassed=${this.sopsPassed} .lang=${this.lang}
          .procInstanceName=${this.procName}  .viewName=${this.viewName} .filterName=${this.filterName} .viewModelFromProcModel=${this.viewModelFromProcModel}
          .config=${this.config}></sample-incubation-view>      
      `: nothing}
      ${this.viewModelFromProcModel&&this.viewModelFromProcModel.component == 'ObjectByTabs' ? html`
        <object-by-tabs .windowOpenable=${this.windowOpenable} .sopsPassed=${this.sopsPassed} .lang=${this.lang}
          .procInstanceName=${this.procName} .desktop=${this.desktop} .viewName=${this.viewName} .filterName=${this.filterName} 
          .model=${this.viewModelFromProcModel}
          .viewModelFromProcModel=${this.viewModelFromProcModel} .config=${this.config}></object-by-tabs>      
      `:nothing}
      ${this.viewModelFromProcModel&&this.viewModelFromProcModel.component == 'CalendarData' ? html`
        <calendar-data .windowOpenable=${this.windowOpenable} .sopsPassed=${this.sopsPassed} .lang=${this.lang}
          .procInstanceName=${this.procName} .desktop=${this.desktop} .viewName=${this.viewName} .filterName=${this.filterName} 
          .model=${this.viewModelFromProcModel}
          .viewModelFromProcModel=${this.viewModelFromProcModel} .config=${this.config}></calendar-data>      
      `:nothing}

      

      ${this.viewModelFromProcModel&&this.viewModelFromProcModel.component == 'ModuleGenomaProjectWindow' ? html`
        <genoma-project .windowOpenable=${this.windowOpenable} .sopsPassed=${this.sopsPassed} .lang=${this.lang}
          .procInstanceName=${this.procName}  .viewName=${this.viewName} .filterName=${this.filterName} .viewModelFromProcModel=${this.viewModelFromProcModel}
          .config=${this.config}></genoma-project>      
      `:html``}
    `
  }
  render(){
    // if (this.viewModelFromProcModel!==undefined){
    //   console.log('render', this.viewModelFromProcModel, 'windowOpenable', this.windowOpenable)
    // }
    return html`   
      ${this.windowOpenable=="yes" ? 
      html`      
        ${this.viewModelFromProcModel&&this.viewModelFromProcModel.component !== null&&this.viewModelFromProcModel.component !== undefined
          &&this.viewModelFromProcModel.component.toLowerCase() == 'tablewithbuttons' ? html`
          <grid-with-buttons id="gridwithbuttons" .viewModelFromProcModel=${this.viewModelFromProcModel} viewName=${this.viewName} 
            filterName=${this.filterName} procInstanceName=${this.procName} lang=${this.lang}
            .config=${this.config} .reqParams=${this.reqParams} .masterData=${this.masterData} ?ready="false">
          </grid-with-buttons>
        `: html`

        ${this.viewModelFromProcModel&&this.viewModelFromProcModel.component !== null&&this.viewModelFromProcModel.component !== undefined
          &&this.viewModelFromProcModel.component.toLowerCase() == 'tabs' ? html`
            <tabs-main-view id="tabsmainview" .tabsMainViewModelFromProcModel=${this.viewModelFromProcModel} viewName=${this.viewName} 
            filterName=${this.filterName} procInstanceName=${this.procName} lang=${this.lang}
            .config=${this.config} .masterData=${this.masterData} .reqParams=${this.reqParams} ?ready="false"></tabs-main-view>
          `: html`
            ${this.ownComponents()}
          `}  
        `}        
      `:
      nothing}
    ${super.render()}    
    `;
  }
  get GridWithButtons() {return this.shadowRoot.querySelector("grid-with-buttons#gridwithbuttons")}

}
