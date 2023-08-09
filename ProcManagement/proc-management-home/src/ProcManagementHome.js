import { html, css, LitElement, nothing } from 'lit';
//import '@trazit/tr-procedures/src/browser/sp-card-ext';
import {ProcManagement} from '@trazit/tr-procedures/src/0proc_models/proc-management-model';
//import './trazit-filter-view';
//import {ApiFunctions } from '@trazit/tr-procedures/src/components/Api/ApiFunctions';
//import {ButtonsFunctions} from '@trazit/tr-procedures/src/components/Buttons/ButtonsFunctions';
import { ProceduresManagement } from '../ProceduresManagement'
import '@spectrum-web-components/split-view/sp-split-view';
import { CommonCore } from '@trazit/common-core';
//import '@trazit/tr-procedures/src/components/ObjectByTabs/objecttabs-composition';

//export class ProcManagementHome extends ((ButtonsFunctions(ApiFunctions(CommonCore)))) {
export class ProcManagementHome extends ((((CommonCore)))) {
    static get styles() {
    return [
      css`
      :host {
        font-family: Montserrat;
        display: flex;
        flex-wrap: wrap;
      }
      .fade-in {
        opacity: 1;
        transition: opacity 2s ease-in-out;
      }
      .show {
        opacity: 0;
      }
      mwc-button {
        background-color: rgba(36, 192, 235, 1);
        font-family: Montserrat;
        font-weight: bold;
        font-size: 19px;
        --mdc-theme-primary:rgba(36, 192, 235, 1);
        border-radius: 12px;
      } 
      mwc-button.button {        
        color : rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        background: rgb(36, 192, 235) none repeat scroll 0% 0%;
        font-family: Montserrat;
        font-weight: bold;
        font-size: 19px;
        color: white;
        border-color: transparent !important;
        --mdc-button-fill-color: red;
        --mdc-button-ink-color: blue;
        border-radius: 12px;
      }            
      mwc-icon-button {        
        color : rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }             
      div.procCard {
        height: 200px;
        width: 300px;
        transition: box-shadow .1s;
        background-size: cover;
      }
      divprocCard:hover {
        box-shadow: 0px 0px 50px rgba(0, 0, 0, 1);
      }      

      .progress-bar {
        display: inline-block;
        width: 160px;
        height: 22px;
        background-color: #ddd;
        border-radius: 5px;
        color: white;
        padding-left: 5px;
        padding-top: 3px;
      }
      
      .bar {
        display: block;
        height: 100%;
        border-radius: 5px;
        padding-left: 10px;
      }
      
      /* Color ranges */
      [data-progress^="0"],
      [data-progress^="1"] {
        background-color: red;
      }
      
      [data-progress^="2"],
      [data-progress^="3"],
      [data-progress^="4"],
      [data-progress^="5"],
      [data-progress^="6"] {
        background-color: #ffcb00;
      }
      
      [data-progress^="7"],
      [data-progress^="8"],
      [data-progress^="9"] {
        background-color: rgb(156, 224, 100);
      }

      [data-progress^="100"] {
        background-color: green;
      }  

      .tooltip-container {
        position: relative;
        display: inline-block;
      }
      
      .tooltip {
        font-family: Montserrat;
        visibility: hidden;
        opacity: 0;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-10%);
        padding: 5px;
        background-color: white;
        color: #24C0EB;
        border-color: #24C0EB;
        border-block-style: solid;
        transition: all 0.3s ease-in-out;
        z-index: 1;
        width: 180px;
      }
      .tooltip-red{
        color: #800c00;
        border-color: #800c00;
      }
      .tooltip-blue{
        color: #24C0EB;
        border-color: #24C0EB;
      }
      
      .trigger:hover + .tooltip,
      .tooltip:hover {
        visibility: visible;
        opacity: 1;
        top: calc(100% + 5px);
      }   
      sp-split-view {
        height: calc(100vh - 150px);
      }
      #leftSplit {
        padding: 10px;
        background-color:transparent;
        overflow: hidden;
        width:230px;
      }
      #endpointName {
        height: 100%;
        overflow-y : auto;
      }
      #leftSplit::-webkit-scrollbar, #rightSplit::-webkit-scrollbar, #endpointName::-webkit-scrollbar {            
      }
      #rightSplit{
        background-color:transparent
      }  
      json-viewer{
        --background-color: #2a2f3a00;
        --string-color: rgba(57, 61, 71, 0.9);
        --property-color: rgba(57, 61, 71, 0.9);
        --preview-color: #24C0EB;
        --font-family: Montserrat;
      }       
      .accordion-item {
        border: 1px solid #ccc;
        padding: 10px;
      }
      .accordion-title {
        cursor: pointer;
        
          color: rgba(36, 192, 235, 1);
          font-family: Montserrat;
          font-weight: bold;
          font-size: 19px;
          --mdc-theme-primary:rgba(36, 192, 235, 1);          
                
      }
      .accordion-content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.2s ease-out;
      }
      .accordion-item[data-active] .accordion-content {
        max-height: 500px;
      }
    `
    ]
  }
  static get properties() {
    return {
      config:{type: Object},
      procMgrModel:{type: Object},
      procDefinitionViewCollapsed:{type: Boolean},
      procDeployViewCollapsed:{type: Boolean},
      procDeployViewCheckerCollapsed:{type: Boolean},
      procTestingCoverageCollapsed:{type: Boolean},
      procTestingScriptsCollapsed:{type: Boolean},
      selectedProcInstance:{type: Object},
      viewModelFromProcModel : {type: Object},
      show: { type: Boolean },
      selectedViewDefinition: { type: Object}
    };
  }
  constructor() {
    super()
    this.procMgrModel=ProcManagement    
    this.procDefinitionViewCollapsed=true   
    this.procDeployViewCheckerCollapsed=true
    this.procDeployViewCollapsed=true
    this.procTestingCoverageCollapsed=true
    this.procTestingScriptsCollapsed=true
    this.show = false;
    this.selectedViewDefinition={}
    //this.config={}
    if (!customElements.get('mwc-notched-outline')) {
      customElements.define('mwc-notched-outline', NotchedOutline);
    }
    return
    this.selectedProcInstance=undefined
    this.viewModelFromProcModel=ProcManagement.ProcedureDefinition
    console.log('constructor', 'this.config', this.config, this.viewModelFromProcModel)
    this.GetViewData()
  }
  updated(changedProperties) {
    if (changedProperties.has('show')) {
      const element = this.shadowRoot.querySelector('.fade-in');
      if (this.show) {
        if (element!==null){
        element.classList.add('fade-in');}
      } else {
        if (element!==null){
        element.classList.remove('fade-in');}
      }
    }
    const items = this.shadowRoot.querySelectorAll('.accordion-item');
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const isActive = item.hasAttribute('data-active');
      //const content = item.querySelector('.accordion-content');
      // const content = this.shadowRoot.querySelector('div#section'+i+'_detail');
      
      // if (isActive) {
      //   content.style.maxHeight = content.scrollHeight + 'px';
      // } else {
      //   content.style.maxHeight = null;
      // }
    }  
  }
  async authorized() {
    console.log('procManagementHome async authorized')
    super.authorized()
  }
  connectedCallback() {
    super.connectedCallback();
    this.show = true;
    this.selectedProcInstance=ProceduresManagement.ProceduresFake[0]
  }
  selectedProcedureInstance(e){
    this.selectedProcInstance=ProceduresManagement.ProceduresFake.find(item => item.name === e.currentTarget.id);        
    this.render()
  }
  resetView(){
    this.selectedProcInstance=undefined
    this.render()
  }  
  render(){return html`
    ${this.selectedProcInstance===undefined ?
      html`
       ${ProceduresManagement.ProceduresFake.map(p => 
          html`
          <div class="${this.show ? 'fade-in' : 'show'}">
          <sp-card-ext heading="${p.name}" id="${p.name}" subheading="'this[elem.subheadingObj].value'" @click=${this.selectedProcedureInstance}>
            <div class="procCard" style="background:url(/images/procedures_pictures/${p.picture===undefined ? "trazit-logo.jpg": p.picture}) no-repeat center; height: 125px;
            width: 430px;
            transition: box-shadow .1s;
            background-size: cover;" slot="cover-photo" @mousemove="${this.handleMouseMove}" @mouseout="${this.handleMouseOut}"></div>      
              <div slot="footer">            
              ${p.cardData===undefined ? nothing:
              html`
                ${p.cardData.title===undefined ? nothing: html`<p"><span style="font-weight: bold; font-size:18px;">${p.cardData.title}</span>
                  ${p.cardData.subtitle===undefined ? nothing: html` <span style="font-size:16px;">(${p.cardData.subtitle})`}
                  </p>`}              
                ${p.cardData.fields===undefined ? nothing:
                html`
                  ${p.cardData.fields.map(d =>
                    html`<li><b>${d.field_name}:</b> ${d.field_value}</li>`
                  )}              
                `}
                ${p.cardData.summary===undefined ? nothing:
                  html`
                    ${p.cardData.summary.map(d =>
                      html`
                      <p>
                      <div style="display:inline-flex;">  
                      <div class="tooltip-container">                      
                        ${d.signed!==undefined&&d.signed===true ? html`                          
                            <img class="trigger" style="height:25px; padding-right: 5px;" src="/images/procedures_pictures/Pass.jpg">        
                            <div class="tooltip tooltip-blue">Step done and signed!</div>
                          `:html`
                            <img class="trigger" style="height:25px; padding-right: 5px;" src="/images/procedures_pictures/NotPass.png">
                            <div class="tooltip tooltip-red">Step not completed neither signed!</div>
                          `}
                      </div>
                      <div class="tooltip-container">
                          <div class="trigger progress-bar" data-progress="${d.progress}"><span class="bar">${d.section}: ${d.progress} ${d.progress_extra_text===undefined?'':d.progress_extra_text}</span></div>
                          ${d.tooltip==undefined? nothing: html`<div class="tooltip tooltip-blue">${d.tooltip}</div>`}
                      </div>
                      </div></p>
                      `
                    )}              
                  `}                
                
              `}
              </div>  
          </sp-card-ext>
          </div>
          `
        )}   
      `:html`
        <div>
          <div style="display:flex;">
            <mwc-button dense raised label=""  icon="home" @click=${this.resetView}></mwc-button>
            ${this.selectedProcInstance.name}
          </div>
          ${this.selectedProcInstance.views===undefined?nothing:
          html`
            <div>${this.selectedProcInstanceMainView()}`}</div>
        <div>
      ` 
    }
    
  `}  
  selectedProcInstanceMainView() {
    return html`    
      ${this.desktop ?
        html`        
        <sp-split-view resizable splitter-pos="300">
          <div id="leftSplit">
            <div id="endpointName">
      
              ${this.selectedProcInstance.views.map((item, index) => html`              
                <div id="section${index}" class="accordion-item">
                  <div class="accordion-title">
                    <mwc-button dense raised label=""  icon="${item.expanded!==undefined&&item.expanded?'expand_less': 'expand_more'}"  @click=${() => this.toggleLeftElements(index)}></mwc-button>
                    <div @click=${() => this.selectSectionView(index)} >${item.title}</div>
                  </div>
                  ${item.expanded!==undefined&&item.expanded ? html`
                  <div id="section${index}_detail" class="accordion-content" style=${index > -1 ? 'max-height: none;' : ''}>
                    ${item.name}
                  </div>
                  `:nothing}
                </div>
            `)}
            </div>
          </div>
          <div id="rightSplit">
            ${this.selectedViewDefinition!==undefined&&this.selectedViewDefinition ? html`
            

            <objecttabs-composition .selectedTabModelFromProcModel=${this.selectedTabModelFromProcModel}
            .lang=${this.lang} .procInstanceName=${this.procInstanceName} .config=${this.config}     
            .selectedItem=${this.selectedItem}      
            </objecttabs-composition>              

            `:nothing}

          </div>
        </sp-split-view>
        ` :
        html`        
        <div id="mobile">
          <div id="leftSplit">
            <div id="endpointName">
            </div>
          </div>
        </div>
        `
      }
    `;
  }
  toggleLeftElements(index) {
    const item = this.selectedProcInstance.views[index];
    item.expanded = !item.expanded;
    this.requestUpdate();
  }
  selectSectionView(index){    
    this.selectedViewDefinition=this.selectedProcInstance.views[index]
    alert(this.selectedViewDefinition.name)
    this.objecttabsComposition.selectedTabModelFromProcModel=this.selectedViewDefinition
    this.objecttabsComposition.selectedItem=this.selectedProcInstance.definition
  }
  xtoggleWiewCollapsed(e){
    if (e.target.id===undefined){return}
    this[e.target.id]=!this[e.target.id]
    console.log('this[e.target.id]', e.target.id, this[e.target.id])
    this.render()   
  }
  xProcedureDefinitionView(){
    return html`
    <h1 id="procDefinitionViewCollapsed">${this.procMgrModel.ProcedureDefinition.viewDefinition[0]["label_en"+this.lang]}</h1>
    ${this.procDefinitionViewCollapsed===false ? html``: html`      
      <trazit-filter-view .config="${this.config}" .viewDefinition="${this.procMgrModel.ProcedureDefinition.viewDefinition}"></trazit-filter-view>
      `
    }
    `
  }
  xProcedureDeploymentView(){
    return html`
    <h1 id="procDeployViewCollapsed">${this.procMgrModel.ProcedureDeployment.viewDefinition[0]["label_en"+this.lang]}</h1>
    ${this.procDeployViewCollapsed===false ? html``: html`
      <trazit-filter-view .config="${this.config}" .viewDefinition="${this.procMgrModel.ProcedureDeployment.viewDefinition}"></trazit-filter-view>
      `
    }
    `
  }
  xProcedureDeploymentCheckerView(){
    return html`
    <h1 id="procDeployViewCheckerCollapsed" >${this.procMgrModel.ProcedureDeploymentChecker.viewDefinition[0]["label_en"+this.lang]}</h1>
    ${this.procDeployViewCheckerCollapsed===false ? html``: html`
      <trazit-filter-view .config="${this.config}" .viewDefinition="${this.procMgrModel.ProcedureDeploymentChecker.viewDefinition}"></trazit-filter-view>
      `
    }
    `
  }
  xProcedureTestingScriptsView(){
    return html`
    <h1 id="procTestingScriptsCollapsed" >${this.procMgrModel.ProcedureTestingScripts.viewDefinition[0]["label_en"+this.lang]}</h1>
    ${this.procTestingScriptsCollapsed===false ? html``: html`
      <trazit-filter-view .config="${this.config}" .viewDefinition="${this.procMgrModel.ProcedureTestingScripts.viewDefinition}"></trazit-filter-view>
      `
    }
    `
  }

  xProcedureTestingCoverageView(){
    return html`
    <h1 id="procTestingCoverageCollapsed" >${this.procMgrModel.ProcedureTestingCoverage.viewDefinition[0]["label_en"+this.lang]}</h1>
    ${this.procTestingCoverageCollapsed===false ? html``: html`
      <trazit-filter-view .config="${this.config}" .viewDefinition="${this.procMgrModel.ProcedureTestingCoverage.viewDefinition}"></trazit-filter-view>
      `
    }
    `
  }


  xrenderOld() {
    return html`       
      <div class="layout horizontal center flex wrap" @click="${this.toggleWiewCollapsed}">      
        ${this.procMgrModel.ProcedureDeployment&&this.procMgrModel.ProcedureDefinition.display===true ?
        html `${this.ProcedureDefinitionView()}`:nothing}
      </div>
      <div class="layout horizontal center flex wrap" @click="${this.toggleWiewCollapsed}">      
        ${this.procMgrModel.ProcedureDeployment&&this.procMgrModel.ProcedureDeployment.display===true ?
          html `${this.ProcedureDeploymentView()}`:nothing}
      </div>
      <div class="layout horizontal center flex wrap" @click="${this.toggleWiewCollapsed}">      
        ${this.procMgrModel.ProcedureDeployment&&this.procMgrModel.ProcedureDeploymentChecker.display===true ?
          html `${this.ProcedureDeploymentCheckerView()}`:nothing}
      </div>
      
      <div class="layout horizontal center flex wrap" @click="${this.toggleWiewCollapsed}">      
        ${this.procMgrModel.ProcedureDeployment&&this.procMgrModel.ProcedureTestingScripts.display===true ?
          html `${this.ProcedureTestingScriptsView()}`:nothing}
      </div>
      <div class="layout horizontal center flex wrap" @click="${this.toggleWiewCollapsed}">      
        ${this.procMgrModel.ProcedureDeployment&&this.procMgrModel.ProcedureTestingCoverage.display===true ?
          html `${this.ProcedureTestingCoverageView()}`:nothing}
      </div>
      
            

      
    `;
  }
  xhandleMouseMove(evt) {
    const el = evt.target;
    const {layerX, layerY} = evt;
    const height = el.clientHeight+80;
    const width = el.clientWidth+80;
    const yRotation = ((layerX - width / 2) / width) * 30;
    const xRotation = ((layerY - width / 2) / height) * 30;
    const transform = `perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    el.style.transform = transform;
  }
  xhandleMouseOut(evt) {
    const el = evt.target;
    el.style.transform = `perspective(500px) scale(1) rotateX(0) rotateY(0)`;
  }


  get objecttabsComposition() {return this.shadowRoot.querySelector("objecttabs-composition")}  
}
window.customElements.define('proc-management-home', ProcManagementHome);
