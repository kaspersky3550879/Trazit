import { html, css, nothing } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import { columnBodyRenderer } from 'lit-vaadin-helpers';

import {ButtonsFunctions} from '../Buttons/ButtonsFunctions';
import {GridFunctions} from '../grid_with_buttons/GridFunctions';
import {DialogsFunctions} from '../GenericDialogs/DialogsFunctions';
import {TrazitInvestigationsDialog} from '../GenericDialogs/TrazitInvestigationsDialog';

import {TrazitGenericDialogs} from '../GenericDialogs/TrazitGenericDialogs';
import { AuditFunctions} from '../Audit/AuditFunctions';
import {TrazitCredentialsDialogs} from '../GenericDialogs/TrazitCredentialsDialogs';

export class TabsComposition extends TrazitCredentialsDialogs(AuditFunctions(TrazitGenericDialogs(ButtonsFunctions(GridFunctions(DialogsFunctions(TrazitInvestigationsDialog(CredDialog))))))) {
  static get styles() {
    return [
      Layouts,
      super.styles,
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
      viewName: { type: String },
      filterName: { type: String },
      langConfig: { type: Object },
      actions: { type: Array },
      samplesReload: { type: Boolean },
      selectedItems: { type: Array },      
      windowOpenable: { type: String },
      sopsPassed: { type: Boolean },
      ready:{type: Boolean},
      gridItems: { type: Array },
      masterData:{ type: Object}
    };
  }

  constructor() {
    super()
    this.viewModelFromProcModel={}
    this.openInvests = []
    this.selectedInvestigations = []
    this.samplesReload = true
    this.ready=false;
    this.selectedItems = []
    this.gridItems=[]
    this.masterData={}
  }

  resetView() {
    this.openInvests = []
    this.selectedInvestigations = []
    this.selectedItems = []
    this.langConfig = this.viewModelFromProcModel.langConfig
    this.actions = this.viewModelFromProcModel.actions
    this.GridWithButtons.resetView()
  }

  render(){
    console.log('tabs-composition-render', 'model', this.viewModelFromProcModel)
    return html`${this.viewModelFromProcModel ? 
      html`    
        <grid-with-buttons id="gridwithbuttons" .viewModelFromProcModel=${this.viewModelFromProcModel} viewName=${this.viewName} 
          filterName=${this.filterName} procInstanceName=${this.procInstanceName} lang=${this.lang}
          .config=${this.config} .reqParams=${this.reqParams} .masterData=${this.masterData} ?ready="false">
        </grid-with-buttons>    
      ` : nothing
      }
      ${super.render()}
      ${this.credentialsDialog()}
      ${this.genericFormDialog()}

      ${this.investigationTemplate()}
      ${this.decisionTemplate()}
      `
  }
  // ${this.reactivateObjectsDialog()}
  // ${this.moduleEnvMonitMicroorganismsDialogAdd()}
  // ${this.moduleEnvMonitMicroorganismsDialogRemove()}
  // ${this.pointTemplate()}
  // ${this.resultTemplate()}

  
  get GridWithButtons() {return this.shadowRoot.querySelector("grid-with-buttons")}  

  reload() {
    this.resetDialogThings()
    this.GetViewData()
  }

  resetDialogThings() {
    this.targetValue = {}
    this.selectedDialogAction = null
  }

  reloadDialog() {
    this.resetDialogThings()
    this.actionMethod(this.selectedAction)
  }
}
window.customElements.define('tabs-composition', TabsComposition);