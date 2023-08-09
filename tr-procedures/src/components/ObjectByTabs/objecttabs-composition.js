import { html, css, nothing } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@alenaksu/json-viewer';
import '@spectrum-web-components/split-view/sp-split-view';

import {DataViews} from '../../components/Views/DataViews';
import {CoaView} from '../../components/Views/CoaView';
import {TestScripts} from '../../components/Views/TestScripts';
import {TrazitGenericDialogs} from '../GenericDialogs/TrazitGenericDialogs';

export class ObjecttabsComposition extends TestScripts(CoaView(TrazitGenericDialogs(DataViews(CredDialog)))) {
  static get styles() {
    return [
      Layouts,
      //super.styles,
      css`
        mwc-button {
          --mdc-typography-button-text-transform: none;
          margin: 0 2px;
          --mdc-typography-button-font-size: 15px;
        }
        tr-dialog * {
          margin-bottom: 5px;
        }
        mwc-textfield[hidden] {
          display: none;
        }
        @media (max-width: 460px) {
          vaadin-grid {
            font-size: 10px;
          }
          vaadin-grid-cell-content {
            padding: 5px;
          }
        }
        json-viewer{
          --background-color: #2a2f3a00;
          --string-color: #24C0EB;
          --property-color: rgba(36, 75, 170, 0.9);
          --preview-color: #24C0EB;
          --font-family: Montserrat;
          --key-color: rgba(36, 75, 170, 0.9);          
        } 
        span.cardLabel {
          font-weight: bold;
          color: #032bbc;
        }   
        span.cardValue{
          color: #009879;
        }     

      `
    ];
  }
  static get properties() {
    return {
      viewModelFromProcModel: { type: Object },
      config: { type: Object },
      procInstanceName: { type: String },
      selectedItem: { type: Object },
      selectedTabModelFromProcModel: { type: Object },
      sopsPassed: { type: Boolean },
      viewName: { type: String },
      filterName: { type: String },
      isProcManagement: { type: Boolean },

    }
  }
  constructor() {
    super()
    this.viewModelFromProcModel={}
    this.selectedItem = {}
    this.selectedTabModelFromProcModel = {}
    this.config = {}
    this.sopsPassed=false    
  }
  render(){
//    console.log('viewName', this.viewName, 'view_definition', this.selectedTabModelFromProcModel.view_definition, 'selectedItem', this.selectedItem)
    return html`
      <div>
        ${this.selectedTabModelFromProcModel===undefined?nothing:html`
          ${this.kpiElementsController(this.selectedTabModelFromProcModel.view_definition, this.selectedItem)}
        `}
      </div>
      ${this.genericFormDialog()}
      ${super.render()}
    ` 
  }

  print2LevelsObject(elem, data){    
    return html`    
    ${elem.type==="reportTitle" ? this.kpiReportTitle(elem, data[elem.endPointResponseObject], false) : nothing}
    <div style="display: flex; flex-wrap: wrap; padding-left:30px;">        
      ${elem.elements.map((elem2, i) =>
        html`
          ${elem2.is_translation===undefined||(elem2.is_translation!==undefined&&elem2.is_translation===true&&elem2.lang!==undefined&&elem2.lang===this.lang) ?
          html`              
            ${elem2.type==="reportTitle" ? this.kpiReportTitleLvl2(elem2, data[elem.endPointResponseObject], true) : nothing}
            ${elem2.type==="card" ? this.kpiCard(elem2, data[elem2.endPointResponseObject], true) : nothing}
            ${elem2.type==="cardSomeElementsSingleObject" ? this.kpiCardSomeElementsSingleObject(elem2, data, true) : nothing}
            ${elem2.type==="cardSomeElementsRepititiveObjects" ? this.cardSomeElementsRepititiveObjects(elem2, data, true) : nothing}              
            ${elem2.type==="recovery_rate" ? this.kpiRecoveryRate(elem2, true) : nothing}
            ${elem2.type==="grid" ? this.kpiGrid(elem2, data[elem2.endPointResponseObject], true) : nothing}
            ${elem2.type==="chart" ? this.kpiChartFran(elem2, true) : nothing}   

            ${elem2.type==="jsonViewer" ? this.jsonViewer(elem2, data, true): nothing}
            ${elem2.type==="readOnlyTable" ? this.readOnlyTable(elem2, data, true): nothing}
            ${elem2.type==="readOnlyTableByGroup" ? this.readOnlyTableByGroup(elem2, data, true): nothing}
            ${elem2.type==="readOnlyTableByGroupAllInOne" ? this.readOnlyTableByGroupAllInOne(elem2, data, true): nothing}

            ${elem2.type==="rolesAndActions"&&elem2.endPointResponseObject2!==undefined&&data[elem2.endPointResponseObject]!==undefined ? 
              this.rolesAndActions(elem2, data[elem2.endPointResponseObject][elem2.endPointResponseObject2], true, this.lang) : nothing}
            ${elem2.type==="rolesAndActions"&&elem2.endPointResponseObject2===undefined ? 
              this.rolesAndActions(elem2, data[elem2.endPointResponseObject], true, this.lang) : nothing}   

            ${elem2.type==="coa" ? this.coa(elem, data[elem.endPointResponseObject], true): nothing}
              
              
            ${(elem2.includeChild===undefined||elem2.includeChild===false) ? nothing :
              html`
                  ${this.kpiCardSomeElementsChild(elem2, data, true)}
            `}              
            ${elem2.type==="Report" ? this.ReportController(elem2, true) : nothing}
            ${elem2.type==="testScripts" ? this.scripts(elem2, true) : nothing}
          `:nothing}
        `
      )} 
    </div>
  `
  }
  print1LevelObject(elem, data){    
    return html`    
      ${elem.type==="reportTitle" ? this.kpiReportTitle(elem, data[elem.endPointResponseObject]) : nothing}
      ${elem.type==="card" ? this.kpiCard(elem, data[elem.endPointResponseObject]) : nothing}
      ${elem.type==="cardSomeElementsSingleObject" ? this.kpiCardSomeElementsSingleObject(elem, data) : nothing}
      ${elem.type==="cardSomeElementsRepititiveObjects" ? this.cardSomeElementsRepititiveObjects(elem, data) : nothing}              
      ${elem.type==="recovery_rate" ? this.kpiRecoveryRate(elem) : nothing}
      ${elem.type==="grid" ? this.kpiGrid(elem, data[elem.endPointResponseObject]) : nothing}
      ${elem.type==="chart" ? this.kpiChartFran(elem) : nothing}   
      ${elem.type==="jsonViewer" ? this.jsonViewer(elem, data, true): nothing}
      ${elem.type==="readOnlyTable" ? this.readOnlyTable(elem, data, true): nothing}
      ${elem.type==="readOnlyTableByGroup" ? this.readOnlyTableByGroup(elem, data, true): nothing}
      ${elem.type==="readOnlyTableByGroupAllInOne" ? this.readOnlyTableByGroupAllInOne(elem, data, true): nothing}

      ${elem.type==="rolesAndActions"&&elem.endPointResponseObject2!==undefined ? 
        this.rolesAndActions(elem, data[elem.endPointResponseObject][elem.endPointResponseObject2], true, this.lang) : nothing}
      ${elem.type==="rolesAndActions"&&elem.endPointResponseObject2===undefined ? 
        this.rolesAndActions(elem, data[elem.endPointResponseObject], true, this.lang) : nothing}   


      ${elem.type==="readOnlyTable"&&elem.endPointResponseObject2!==undefined&&data[elem.endPointResponseObject]!==undefined ? 
        this.readOnlyTable(elem, data[elem.endPointResponseObject][elem.endPointResponseObject2]) : nothing}
      ${elem.type==="readOnlyTable"&&elem.endPointResponseObject2===undefined ? 
        this.readOnlyTable(elem, data[elem.endPointResponseObject]) : nothing}
      
      ${(elem.includeChild===undefined||elem.includeChild===false) ? nothing :
        html`
            ${this.kpiCardSomeElementsChild(elem, data)}
      `}
      ${elem.type==="Report" ? this.ReportController(elem) : nothing}
      ${elem.type==="testScripts" ? this.scripts(elem, true) : nothing}
      ${elem.type==="coa" ? this.coa(elem, data[elem.endPointResponseObject], true): nothing}    
    `
  }

  kpiElementsController(elemDef = this.selectedTabModelFromProcModel, data = this.selectedItem) {
    if (this.selectedItem!==undefined){
    //  console.log(this.selectedItem.procInstanceName, 'kpiElementsController', 'data', data, 'elemDef', elemDef)
    }
    return html`${data&&elemDef&&Object.keys(data).length > 0 ?
      html`
        <div style="display:block">
          ${elemDef.map((elem, i) =>           
          html`    
            ${elem.is_translation===undefined||(elem.is_translation!==undefined&&elem.is_translation===true&&elem.lang!==undefined&&elem.lang===this.lang) ?
            html`              
              ${elem.elements!==undefined? html` ${this.print2LevelsObject(elem, data)}`: html`${this.print1LevelObject(elem, data)}`}
            `:nothing}
          `
          )}      
        </div>
      `:nothing
    }`
  }  
}
window.customElements.define('objecttabs-composition', ObjecttabsComposition);