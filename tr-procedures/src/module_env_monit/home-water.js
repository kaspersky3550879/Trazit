import { html, css, nothing, LitElement } from 'lit';
// import('../grid_with_buttons/grid-with-buttons');
// import './tabs-composition';
// import {DialogsFunctions} from '../GenericDialogs/DialogsFunctions';
import { navigator } from 'lit-element-router';
export class HomeWater extends navigator(LitElement) {
  static get styles() {
    return css`
      :host([disabled]) {
        opacity: 0.5;
        pointer: none;
      }
      .maindiv{
        width: 850px;
        }
        .btn-2 {
        filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.6));
      }
      .btn-2 {
        display:inline-block;
        position: relative;
        color: #fff;
      border: 15px #C0080B;
        font-weight: 500;
        font-family: "Arial";
        text-decoration: none;
        text-transform: uppercase;
        padding: 15px 50px;
        text-align: center;
        clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);
        background-color: #7ED8F2;
      border: 10px;
      }
      .btn-1 {
        display:inline-block;
        position: relative;
        color: #fff;
        font-family: "Arial";
        font-weight: 500;
        text-decoration: none;
        text-transform: uppercase;
        padding: 30px 30px;
        text-align: center;
        clip-path: polygon(4% 0, 94% 0, 100% 50%, 90% 130%, 8% 150%, 0 50%);
        background-color: #D9F8FA;
      }
      
      .start-end {
        display:inline-block;
        position: relative;
        color: #7ED8F2;
        font-family: "Arial";
        font-weight: 500;
        text-decoration: none;
        text-transform: uppercase;
        padding: 30px 30px;
        text-align: center;
        clip-path: polygon(20% 0, 82% 0, 100% 50%, 80% 100%, 40% 150%, 0 50%);
        background-color: #D9F8FA;
      }
      .block-background {
        display:inline-block;
        position: relative;
        color: #fff;
        font-family: "Arial";
        font-weight: 500;
        text-decoration: none;
        text-transform: uppercase;
        padding: 15px 35px 0px 20px;
        text-align: center;
        clip-path: polygon(4% 0, 94% 0, 100% 50%, 90% 130%, 8% 150%, 0 50%);
        background-color: #D9F8FA;
      }
      .node {
        filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.6));
      }
      .node {
        display:inline-block;
        position: relative;
        color: #fff;
      border: 15px #C0080B;
        font-weight: 500;
        font-family: "Arial";
        text-decoration: none;
        text-transform: uppercase;
        padding: 0px 30px;
        text-align: center;
        clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);
        background-color: #7ED8F2;
      border: 10px;
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
    
        }
    }
    constructor() {
        super()
        this.viewModelFromProcModel={} 
        this.tabsMainViewModelFromProcModel={}
console.log('constructor flowchart')
        this.ready=false;
        this.config={}
  
    }
    render() {          
        return html`               
        ${this.viewModelFromProcModel ? 
        html`
            ${this.flowChart()}              
        `: nothing}`
    }
    selectedMenu(route) {
      this.shadowRoot.querySelectorAll("sp-action-menu").forEach(s => s.open = false)
      this.navigate(route)
    }    

    elementClicked(vwName, fltrName){
      console.log('elementClicked', this.procName,  vwName, fltrName)
      this.selectedMenu('/dashboard/procedures?procName='+this.procName+
      '&viewName='+vwName+'&filterName='+fltrName)
    }  
    flowChart(){
      console.log('Flowchart')
        //this.resetView()
        return html`
        <div class="maindiv">
        <div @click=${()=>this.elementClicked("LogSamples", "SampleLogin")} class="start-end" style="top: 37px; left: 10px;"><span>New <br>Samples</span></div>
        
        <div class="block-background" style="left:0px;">
          <div @click=${()=>this.elementClicked("SampleEnterResult", "FQ Testing")} class="node" style="top:-6px; padding: 15px 20px;"><span>Enter <br>Results</span></div>
          <div @click=${()=>this.elementClicked("ReviewTesting", "FQ Testing")} class="node" style="left: 10px; top:-6px; padding: 15px 20px;"><span>Review <br>Tests</span></div>
          <div @click=${()=>this.elementClicked("ReviewTestingGroup", "FQ Testing")} class="node" style="left: 10px; top:-6px;padding: 15px 20px;"><span>Review<br>Testing Group</span></div>
        </div>
        <div class="block-background" style="top: -8px; left:140px;">
          <div @click=${()=>this.elementClicked("SampleEnterResult", "MB Testing")} class="node" style="top:-6px; padding: 15px 20px;"><span>Enter <br>Results</span></div>          
          <div @click=${()=>this.elementClicked("ReviewTesting", "MB Testing")} class="node" style="left: 10px; top:-5px; padding: 15px 20px;"><span>Review <br>Tests</span></div>
          <div @click=${()=>this.elementClicked("ReviewTestingGroup", "MB Testing")} class="node" style="left: 10px; top:-5px; padding: 15px 20px;"><span>Review<br>Testing Group</span></div>
        </div>
          
        <div @click=${()=>this.elementClicked("ReviewSample", "")} class="start-end" style="top: -61px; left: 125px; padding: 30px 40px;"><span>Review<br>Sample</span></div>
      </div>
      `
    }
    
}
window.customElements.define('home-water', HomeWater);