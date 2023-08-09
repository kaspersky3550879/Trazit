import { html, css, nothing, LitElement } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
//import { Layouts } from '@collaborne/lit-flexbox-literals';
// import { columnBodyRenderer } from 'lit-vaadin-helpers';

// import {ButtonsFunctions} from '../Buttons/ButtonsFunctions';
// import {GridFunctions} from '../grid_with_buttons/GridFunctions';
// import {DialogsFunctions} from '../GenericDialogs/DialogsFunctions';
// import {TrazitInvestigationsDialog} from '../GenericDialogs/TrazitInvestigationsDialog';

// import {TrazitGenericDialogs} from '../GenericDialogs/TrazitGenericDialogs';
// import { AuditFunctions} from '../Audit/AuditFunctions';
// import {TrazitCredentialsDialogs} from '../GenericDialogs/TrazitCredentialsDialogs';
//import('../grid_with_buttons/grid-with-buttons');
//import '@doubletrade/lit-datatable';
//import {DataViews} from '../../components/Views/DataViews';

//export class ObjecttabsComposition extends TrazitCredentialsDialogs(AuditFunctions(TrazitGenericDialogs(ButtonsFunctions(GridFunctions(DialogsFunctions(TrazitInvestigationsDialog(CredDialog))))))) {
export class ObjecttabsComposition extends DataViews(CredDialog) {
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
    return html`<div>      
      ${this.kpiElementsController(this.selectedTabModelFromProcModel.view_definition, this.selectedItem)}
      </div>
      ${super.render()}
    ` 
  }
  kpiElementsController(elemDef = this.selectedTabModelFromProcModel.view_definition, data = this.selectedItem) {
    console.log('kpiElementsController', 'data', data, 'elemDef', elemDef)
    return html`${data&&elemDef&&Object.keys(data).length > 0?       
      html`
        <div style="display:block">
          ${elemDef.map((elem, i) => 
            html`      
                    
              ${elem.type==="reportTitle" ? this.kpiReportTitle(elem, data[elem.endPointResponseObject]) : nothing}
              ${elem.type==="card" ? this.kpiCard(elem, data[elem.endPointResponseObject]) : nothing}
              ${elem.type==="cardSomeElementsSingleObject" ? this.kpiCardSomeElementsSingleObject(elem, data) : nothing}
              ${elem.type==="cardSomeElementsRepititiveObjects" ? this.cardSomeElementsRepititiveObjects(elem, data) : nothing}              
              ${elem.type==="recovery_rate" ? this.kpiRecoveryRate(elem) : nothing}
              ${elem.type==="grid" ? this.kpiGrid(elem, data[elem.endPointResponseObject]) : nothing}
              ${elem.type==="chart" ? this.kpiChartFran(elem) : nothing}   
              ${elem.type==="jsonViewer" ? this.jsonViewer(elem, data) : nothing}   
              ${elem.type==="readOnlyTable" ? this.readOnlyTable(elem, data[elem.endPointResponseObject][elem.endPointResponseObject2]) : nothing}   
              
              ${(elem.includeChild===undefined||elem.includeChild===false) ? nothing :
                html`
                    ${this.kpiCardSomeElementsChild(elem, data)}
              `}              
              ${elem.type==="Report" ? this.ReportController(elem) : nothing}              
        </div>
        `
        )}      
      ` : html`<div>There is no data</div>`
    }`
  }  
}
window.customElements.define('objecttabs-composition', ObjecttabsComposition);