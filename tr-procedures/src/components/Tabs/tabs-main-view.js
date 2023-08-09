import { html, css, nothing, LitElement } from 'lit';
import('../grid_with_buttons/grid-with-buttons');
import './tabs-composition';
import {DialogsFunctions} from '../GenericDialogs/DialogsFunctions';

export class TabsMainView extends DialogsFunctions(LitElement) {
  static get styles() {
    return css`
      :host([disabled]) {
        opacity: 0.5;
        pointer: none;
      }
      div.t-item {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin-right: 3px;
        background-color: #03a9f4;
      }
      mwc-button.tabBtn {
        background-color: #24C0EB;
        font-family : Myriad Pro;
        border-radius : 11px;        
        -moz-border-radius : 11px;
        -webkit-border-radius : 11px;
        border-style:outset;
        border-color:rgb(48, 116, 135);
        border-width: 0px 3px 3px 0px;
        --mdc-typography-button-text-transform: none;
        --mdc-typography-button-font-size: 19px;
        --mdc-theme-primary: rgb(3, 169, 244);       
      }
    `;
  }

    static get properties() {
        return {
            tabsMainViewModelFromProcModel: {type: Object},
            viewModelFromProcModel: {type: Object},        

            config: { type: Object },
            procName: { type: String },
            ready:{type: Boolean},
            viewName: { type: String },
            filterName: { type: String },
            lang: { type: String },
            procInstanceName:{type: String},
            masterData:{ type: Object},
            selectedItems: { type: Array },
        }
    }
    constructor() {
        super()
        this.viewModelFromProcModel={} 
        this.tabsMainViewModelFromProcModel={}

        this.ready=false;
        this.config={}
        this.masterData={} 
        this.selectedItems=[]
        //if (this.viewModelFromProcModel===undefined||Object.keys(this.viewModelFromProcModel).length==0){
//          this.viewModelFromProcModel=this.tabsMainViewModelFromProcModel.tabs[0]
  //      }                  
    }
    render() {        
        return html`        
        ${this.viewModelFromProcModel ? 
        html`
            ${this.tabsBlock()}              
        `: nothing}`
    }
    tabsBlock(){
        this.resetView()
        return html`
        ${this.tabsMainViewModelFromProcModel.tabs ?
          html`
            <div class="layout vertical flex">
              <div class="layout horizontal flex">
                ${this.tabsMainViewModelFromProcModel.tabs.map(t => 
                  html`
                    <mwc-button class="tabBtn" dense unelevated 
                      .label=${t.langConfig.tab["label_"+ this.lang]}
                      @click=${()=>this.selectTab(t)}></mwc-button>
                  `
                )}
              </div>
              <tabs-composition 
                .lang=${this.lang} .masterData=${this.masterData}
                .windowOpenable=${this.windowOpenable}
                .sopsPassed=${this.sopsPassed}
                .procInstanceName=${this.procInstanceName}             
                .viewName=${this.viewName}  .viewModelFromProcModel=${this.viewModelFromProcModel!==undefined&&Object.keys(this.viewModelFromProcModel).length>0 ? this.viewModelFromProcModel : this.tabsMainViewModelFromProcModel.tabs[0]}
                .config=${this.config}>${this.tabOnOpenView()}</tabs-composition>
            </div>
            
          ` : nothing
        }
        `
    }
    tabOnOpenView() {
      return
    }
    selectTab(tab) {
      this.viewModelFromProcModel=tab
      this.tabsComposition.resetView()
    }

    resetView() {
      //console.log('resetView', 'tabs', this.tabsMainViewModelFromProcModel.tabs, 'master data', this.masterData)
      if (this.tabsComposition!==null){
        this.tabsComposition.render()
      }
      return
      this.viewModelFromProcModel=this.tabsMainViewModelFromProcModel.tabs[0]
        if (this.viewModelFromProcModel===undefined||this.viewModelFromProcModel.component===undefined){return}
        switch(this.viewModelFromProcModel.component){
          case 'GridWithButtons':
          case 'TableWithButtons':        
            import('../grid_with_buttons/grid-with-buttons')            
            if (this.GridWithButtons!==null){
              this.GridWithButtons.ready=false
            }        
            //alert('grid')
            return
        //   case 'Tabs':
        //     import('./components/Tabs/tabs-main-view')
        //     return
        //   case 'ModuleEnvMonitProgramProc':
        //     import('./module_env_monit/program-proc')
        //     return
        //   case 'EnvMonitBrowser':
        //     import('./browser/browser-view')
        //     return
        //   case 'DataMining':
        //     import('./data_mining/datamining-mainview')
        //     return
        //   case 'ModuleGenomaProjectWindow':
        //     import('./module_genoma/genoma-project')
        //     return
        //   case 'ModuleSampleLogSample':
        //     import('./module_sample/log-sample-module-sample')
        //     return
          default:
            alert('In tabs-main-view component, Not found component '+this.viewModelFromProcModel.component)
            return
        }
      }
    
      get tabsComposition() {return this.shadowRoot.querySelector("tabs-composition")}  
      get GridWithButtons() {return this.shadowRoot.querySelector("grid-with-buttons")}  
}
window.customElements.define('tabs-main-view', TabsMainView);