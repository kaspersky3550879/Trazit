import { LitElement, html, css } from 'lit';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import { CredDialog } from '@trazit/cred-dialog';
import '@material/mwc-icon';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@trazit/tr-dialog/tr-dialog';
import {ButtonsFunctions} from '../Buttons/ButtonsFunctions';
import { ProceduresModel } from '../../ProceduresModel';
import {TrazitCredentialsDialogs} from '../GenericDialogs/TrazitCredentialsDialogs';
import '../../components/Audit/audit-dialog';
const langConfig = {
  "actionName": {    "label_en": "Action Name",    "label_es": "Acción"  },
  "performedOn": {    "label_en": "Performed on",    "label_es": "Realizado el"  },
  "reviewedOn": {    "label_en": "Reviewed on",    "label_es": "Revisado el"  },
  "auditId": {    "label_en": "Audit Id",    "label_es": "Id Auditoría"  },
  "fieldsUpdate": {    "label_en": "Fields updated",    "label_es": "Campos modificados"  },
  "by": {    "label_en": "By",    "label_es": "Por"  },
  "sign": {    "label_en": "Sign",    "label_es": "Firmar"  }
}
export class AuditDialog extends TrazitCredentialsDialogs(ButtonsFunctions(CredDialog)) {
  static get styles() {
    return [
      Layouts,
      css`
        :host {
          font-family:Montserrat;
        }      
        tr-dialog {
          --mdc-dialog-max-width: 90vw;
          position: relative;
          z-index:998;
          transition: opacity 0.2s ease-in-out;
        }
        tr-dialog[open] {
          opacity: 1;
        }
        tr-dialog {
          animation: bounce 0.5s ease-in-out;
        }
        @keyframes bounce {
          0% { transform: translateY(-20px); }
          50% { transform: translateY(10px); }
          100% { transform: translateY(0); }
        }
        sp-tooltip[hidden] {
          display: none;
        }
        sp-tooltip {
          max-width: 100%;
          width: 100%;
          --spectrum-tooltip-info-background-color: rgba(36, 192, 235, 0.08);
          color: #3f51b5;
        }
        sp-tooltip.sub {
          --spectrum-tooltip-info-background-color: rgba(36, 192, 235, 0.09);
        }
        mwc-icon.sign {
          cursor: pointer;
        }
        mwc-icon[hidden] {
          display: none;
        }
        div[hidden] {
          display: none;
        }
        .ball {
          margin-left: -13px;
          cursor: pointer;
          background: transparent;
        }
        .column-list {
          -webkit-columns: 4; /* Number of columns */
          -moz-columns: 4;
          columns: 4;
          -webkit-column-gap: 10px; /* Spacing between columns */
          -moz-column-gap: 10px;
          column-gap: 10px;
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        
        .column-list li {
          display: inline-block;
          width: 100%;
          margin-bottom: 10px;
          margin-left:30px;
          hyphens: auto;
          word-break: break-all;          
        }
        span.relevantlabel{
          font-weight: bold;
          font-size: 16px;
        }          
        span.label{
          font-weight: bold;         
        }
        p{
            font-weight: bold;
            font-size: 15px;
            margin-top:5px;
            margin-left:4px;
            margin-bottom:5px;
        }   
        .text-group {
          display: flex;
          align-items: center;
        }        
        .tglabelaction {
          font-size: 1.2em;
          width: 100px;
          text-align: right;
          margin-right: 20px;
        }
        .tglabel {
          font-size: 1.2em;
          width: 124px;
          text-align: right;
          margin-right: 20px;
        }
        .tgvalue {
          font-size: 1.0em;
        }
        div.feldsupdatedregion{
          border-color : rgba(153, 153, 153, 1);
          border-left : 1px solid;
          border-radius : 10px;
        }
        mwc-textfield {
          border-style : Solid;
          border-color : #999999;
          border-color : rgba(153, 153, 153, 1);
          border-width : 1px;
          border-radius : 7px;
          -moz-border-radius : 7px;
          -webkit-border-radius : 7px;   
          font-family : Montserrat;
          font-weight : bold;
          font-size : 19px;
          background-color :  #FFFFFF;
          background-color : rgb(255, 255, 255);  
          --mdc-text-field-idle-line-color:#148CFA;
          --mdc-text-field-outlined-idle-border-color: #148CFA;
          --mdc-text-field-label-ink-color:  #148CFA;
          --mdc-text-field-focused-label-color: #148CFA;
          --mdc-theme-primary: #0465FB;
        }
        mwc-select {        
          --mdc-theme-primary : rgba(36, 192, 235, 1);
          --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
          --mdc-select-ink-color: rgb(47, 47, 47);
          --mdc-select-dropdown-icon-color:rgba(36, 192, 235, 1);
          --mdc-select-hover-line-color:rgba(36, 192, 235, 1);
          --mdc-notched-outline-border-color: rgba(186, 235, 248, 0.4);
          --mdc-select-disabled-dropdown-icon-color:rgba(36, 192, 235, 1);
  
          font-family : Montserrat;
          font-weight : bold;
          font-size : 19px;
        }
        mwc-select.outlined {        
          --mdc-theme-primary : rgba(36, 192, 235, 1);
          --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
          --mdc-select-ink-color: rgba(36, 192, 235, 1);
          font-family : Montserrat;
          font-weight : bold;
          font-size : 19px;
          background-color: 4fcad029;
        }            
      `
    ];
  }

  static get properties() {
    return {
      lang: { type: String },
      audits: { type: Array },
      sampleAuditRevisionMode: { type: Boolean },
      sampleAuditChildRevisionRequired: { type: Boolean },
      selectedItems:{type: Array},
      actionBeingPerformedModel:{type: Object},
      auditAction:{type: Object},
      procInstanceName: { type: String },
      filterName: { type: String },
      viewName: { type: String },
      windowOpenable: { type: Boolean },
      sopsPassed: { type: Boolean },
      config:{type: Object},
      localProceduresModels: { type: Object},
      viewModelFromProcModel: { type: Object},
      objectId: {type: String},
      ObjectType: {type: String},
    };
  }

  constructor() {
    super();
    this.lang = "en";
    this.audits = [];
    this.sampleAuditRevisionMode = true;
    this.sampleAuditChildRevisionRequired = true;
    this.selectedItems=[]
    this.actionBeingPerformedModel={}
    this.auditAction={}
    this.config={}
    this.localProceduresModels=ProceduresModel
    this.viewModelFromProcModel={}
  }

  updated(updates) {
    if (updates.has('audits') && this.audits.length) {
      this.setPrintContent()
    }
  }

  setPrintContent() {
    this.printObj = {
      header: `${this.objectType} Audit for ${this.objectId}`,
      content: this.setContent()
    }
  }

  setContent() {
    let session = JSON.parse(sessionStorage.getItem("userSession"))
    let sessionDate = session.appSessionStartDate
    let sessionUser = session.header_info.first_name +" "+ session.header_info.last_name +" ("+ session.userRole +")"
    let strContent = ``
    this.audits.forEach(a => {
      strContent += `<div><span class="relevantlabel">${langConfig.actionName["label_"+this.lang]}:</span> ${a.action_pretty_en ? a['action_pretty_'+ this.lang] : a.action_name}</div>`
      strContent += `<span class="relevantlabel">Performed On:</span> ${a.date} by ${a.person}`
      strContent += `<br><span class="relevantlabel">Reviewed On:</span> ${a.reviewed ? a.reviewed_on : ''}`
      
      strContent += `<li>audit_id: ${a.audit_id}</li>`
      let fu = a.fields_updated ? Object.entries(a.fields_updated).map(([key, value]) => { return {k: key, v: value}}) : null
      let strFu = ''
      if (fu) {
        strFu += `<ul>`
        fu.forEach(d => {
          strFu += `<li>${d.k}: ${d.v}</li>`
        })
        strFu += `</ul>`
      } else {
        strFu += `<br/>`
      }      
      strContent += `<p>fields_updated: </p> ${strFu}`
      if (a.sublevel.length&&a.sublevel[0].date) {
        strContent += `<div style="margin-left: 20px;">`
        a.sublevel.forEach(s=> {
          strContent += `<p><div><span class="relevantlabel">Action Name: </span>${s.action_pretty_en ? s['action_pretty_'+ this.lang] : s.action_name}</div>`
          strContent += `<span class="relevantlabel">Performed On: </span>${s.date} by ${s.person}`
          strContent += `<br><span class="relevantlabel">Reviewed On: </span>${s.reviewed ? s.reviewed_on : ''}`
          fu = s.fields_updated ? Object.entries(s.fields_updated).map(([key, value]) => { return {k: key, v: value}}) : null
          strFu = ''
          if (fu) {
            strFu += `<ul>`
            fu.forEach(d => {
              strFu += `<li>${d.k}: ${d.v}</li>`
            })
            strFu += `</ul>`
          } else {
            strFu += `<br/>`
          }
          strContent += `<br><p>fields_updated: </p> ${strFu}`
        })
        strContent += `</div>`
      }
      strContent += `<hr>`
    })

    let str = `
      <style type="text/css">
      .page-header, .page-header-space {
        height: 75px;
        padding-top: 50px;
      }
      .page-header {
        position: fixed;
        top: 0mm;
        width: 100%;
        border-bottom: 1px solid black; /* for demo */
      }
      .page-footer, .page-footer-space {
        height: 30px;
        padding-top: 10px;
      }
      .page-footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        border-top: 1px solid black; /* for demo */
      }
      .page {
        page-break-after: always;
      }
      @page {
        margin: 0mm 10mm 10mm;
      }
      @media print {
        thead {display: table-header-group;} 
        tfoot {display: table-footer-group;}
      }
      .column-list {
        -webkit-columns: 3; /* Number of columns */
        -moz-columns: 3;
        columns: 3;
        -webkit-column-gap: 10px; /* Spacing between columns */
        -moz-column-gap: 10px;
        column-gap: 10px;
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      
      .column-list li {
        display: inline-block;
        width: 100%;
        margin-bottom: 10px;
      }

            
      </style>

      <div class="page-header" style="text-align: center; font-weight: bold;">
        ${this.objectType} Audit for ${this.objectId} on ${sessionDate}
      </div>

      <div class="page-footer">
        ${sessionUser} on ${sessionDate} 
      </div>
      <table>
        <thead>
          <tr>
            <td>
              <!--place holder for the fixed-position header-->
              <div class="page-header-space"></div>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <!--*** CONTENT GOES HERE ***-->
              <div class="page">${strContent}</div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <!--place holder for the fixed-position footer-->
              <div class="page-footer-space"></div>
            </td>
          </tr>
        </tfoot>
      </table>
    `
    return str
  }

  auditPrint() {
    var printWindow = window.open('', '', 'fullscreen=yes');
    printWindow.document.write(this.printObj.content);
    printWindow.document.title = this.printObj.header;
    printWindow.document.close();
    setTimeout(function () {
      printWindow.print();
      printWindow.close();
    }, 500);
  }

  firstUpdated() {
    this.updateComplete.then(() => {
      // manually backgrounding the dialog box
      // password dialog
      this.dialogSurface.style.padding = "20px";
      this.dialogSurface.style.width = "100vw";
    })
  }

  signButtonsMode(){    
    let procList = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures

    if (this.procInstanceName===undefined||procList===undefined){return}
    
    let whichProc = procList.filter(p => p.procInstanceName == this.procInstanceName)            
    if (whichProc===undefined||whichProc[0]===undefined){
      this.sampleAuditRevisionMode=true
      this.sampleAuditChildRevisionRequired=true
      return
    }
    this.sampleAuditRevisionMode = whichProc[0].audit_sign_mode.sampleAuditRevisionMode == "DISABLE" ? false : true
    this.sampleAuditChildRevisionRequired = whichProc[0].audit_sign_mode.sampleAuditChildRevisionRequired == "FALSE" ? false : true
//    alert('signButtonsMode '+this.procInstanceName+' sampleAuditRevisionMode: '+this.sampleAuditRevisionMode+' sampleAuditChildRevisionRequired: '+this.sampleAuditChildRevisionRequired )
  }  
  render() {
    this.signButtonsMode()
    return html`
    ${this.credentialsDialog()}
    <tr-dialog id="auditDialog" ?open=${this.audits.length}  @closed=${()=>this.audits=[]} class="layout vertical"
      heading=""
      hideActions=""
      scrimClickAction="">
      ${this.countInfo()}
      <mwc-icon slot="icon1" @click=${this.auditPrint}>print</mwc-icon>
      ${this.audits.map((a,i)=>
        html`
        <div id="wrap-${a.audit_id}" class="layout horizontal flex center" style="padding:2px 0 2px 0;border-left:3px solid #ccc">
          <mwc-icon class="ball"
            @click=${()=>this.showItem(a,i)}
            style="color:${a.ballState=="open"?'#3f51b5':a.ballState=="hide"?'#eee':'#aaa'}">radio_button_checked</mwc-icon>
          <sp-tooltip open placement="right" variant="info" id="tooltip-${a.audit_id}">
          
            <div class="layout horizontal flex center">
              ${a.reviewed?
                html`
                <div class="text-group"><mwc-icon title="${langConfig.reviewedOn["label_"+this.lang]}: ${a.reviewed_on}">grading</mwc-icon></div>
                `:
                html`
                <mwc-icon class="sign" title="${langConfig.sign["label_"+this.lang]}" 
                  @click=${()=>this.signAudit(a.audit_id)} ?hidden=${!this.sampleAuditRevisionMode}>edit_note</mwc-icon>
                `
              }
              <div class="text-group"><div class="tglabelaction">${langConfig.actionName["label_"+this.lang]}: </div><b>${a.action_pretty_en ? a['action_pretty_'+ this.lang] : a.action_name}</b></div>
            </div>
            <div class="text-group">
              <div class="tglabel">${langConfig.performedOn["label_"+this.lang]}: </div>${a.date} ${langConfig.by["label_"+this.lang]} ${a.person}
            </div>
            <div id="audit-${a.audit_id}" hidden=true>
            
              <div class="text-group">${a.reviewed?html`<br><div class="tglabel">${langConfig.reviewedOn["label_"+this.lang]}: ${a.reviewed_on}: </div>${a.reviewed_on}`:null}</div>
                     
              <div class="text-group"><div class="tglabel">${langConfig.auditId["label_"+this.lang]}: </div>${a.audit_id}</div>
              <div class="feldsupdatedregion">
                <p>${langConfig.fieldsUpdate["label_"+this.lang]}: </p> <ul class="column-list"> ${a.fields_updated ? Object.entries(a.fields_updated).map(([key, value], i) => html`<li><span class="label">${key}:</span> ${value}</li>`) : ''}</ul>
              </div>
              ${a.sublevel.length&&a.sublevel[0].date?
              html`${a.sublevel.map((s,si)=>
                html`
                  <div id="wrap-${s.audit_id}" class="layout horizontal flex center" style="margin:5px">
                    <mwc-icon class="ball"
                      @click=${()=>this.showSubItem(s,i,si)}
                      style="color:${s.ballState=="hide"?'#eee':s.ballState=="close"?'#aaa':'#3f51b5'}">radio_button_checked</mwc-icon>
                    <sp-tooltip class="sub" open placement="right" variant="info" id="tooltip-${s.audit_id}">
                      <div class="layout horizontal flex center">
                        ${s.reviewed?
                          html`
                          <mwc-icon title="reviewed_on: ${s.reviewed_on}">grading</mwc-icon>
                          `:
                          html`
                          <mwc-icon class="sign" title="${langConfig.sign["label_"+this.lang]}" 
                            @click=${()=>this.signAudit(s.audit_id)} ?hidden=${!this.sampleAuditRevisionMode||!this.sampleAuditChildRevisionRequired}>edit_note</mwc-icon>
                          `
                        }
                        <div class="text-group"><div class="tglabelaction">${langConfig.actionName["label_"+this.lang]}: </div>${s.action_pretty_en ? s['action_pretty_'+ this.lang] : s.action_name}</div>
                      </div>
                      <div class="text-group"><div class="tglabel">${langConfig.performedOn["label_"+this.lang]}: </div>${s.date} ${langConfig.by["label_"+this.lang]} ${s.person}</div>
                      <div id="audit-${s.audit_id}">
                        ${s.reviewed?html`<span class="relevantlabel">Reviewed On: </span>${s.reviewed_on}<br>`:null}
                        <div class="text-group"><div class="tglabel">${langConfig.auditId["label_"+this.lang]}: </div>${s.audit_id}</div>
                        <div class="feldsupdatedregion">
                          <p>${langConfig.fieldsUpdate["label_"+this.lang]}: </p> <ul class="column-list">${s.fields_updated ? Object.entries(s.fields_updated).map(([key, value], i) => html`<li><span class="label">${key}:</span> ${value}</li>`) : ''}</ul>
                        </div>
                      </div>
                    </sp-tooltip>
                  </div>`
              )}
              `: null}
            </div>
          </sp-tooltip>
        
        </div>
        `
      )}
    </tr-dialog>
    `;
  }

  signAudit(id) {
    this.targetValue = {
      auditId: id
    }    
    console.log('signAudit', 'actionBeingPerformedModel', this.actionBeingPerformedModel)
    this.auditAction=this.actionBeingPerformedModel.dialogInfo.action[0]
    //this.selectedDialogAction = this.selectedAction.dialogInfo.viewQuery
  //this.performActionRequestHavingDialogOrNot(this.actionBeingPerformedModel.dialogInfo.action[0], this.selectedItems[0], this.targetValue)
    this.actionWhenRequiresNoDialog(this.actionBeingPerformedModel.dialogInfo.action[0], this.selectedItems[0], this.targetValue)
    //this.actionMethod(this.actionBeingPerformedModel.dialogInfo.action[0], false)
    //this.actionMethod(this.actionBeingPerformedModel, false)
  }

  xsignAuditMahdi(id) {
    this.dispatchEvent(new CustomEvent('sign-audit', {
      detail: { audit_id: id }
    }))
  }

  get dialog() {
    return this.shadowRoot.querySelector('tr-dialog')
  }

  get dialogSurface() {
    return this.dialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  showItem(item, i) {
    if (this.audits[i].ballState == "open") {
      this.audits[i].ballState = "hide"
      this.shadowRoot.querySelector("#tooltip-"+item.audit_id).hidden = true
      this.shadowRoot.querySelector("#wrap-"+item.audit_id).style.marginTop = "-11px"
      this.shadowRoot.querySelector("#wrap-"+item.audit_id).style.marginBottom = "-11px"
    } else if (this.audits[i].ballState == "hide") {
      this.audits[i].ballState = "close"
      this.shadowRoot.querySelector("#tooltip-"+item.audit_id).hidden = false
      this.shadowRoot.querySelector("#audit-"+item.audit_id).hidden = true
      this.shadowRoot.querySelector("#wrap-"+item.audit_id).style.marginTop = ""
      this.shadowRoot.querySelector("#wrap-"+item.audit_id).style.marginBottom = ""
    } else {
      this.audits[i].ballState = "open"
      this.shadowRoot.querySelector("#audit-"+item.audit_id).hidden = false
    }
    this.requestUpdate()
  }

  showSubItem(item, i, si) {
    if (this.audits[i].sublevel[si].ballState == "hide") {
      this.audits[i].sublevel[si].ballState = "close"
      this.shadowRoot.querySelector("#tooltip-"+item.audit_id).hidden = false
      this.shadowRoot.querySelector("#audit-"+item.audit_id).hidden = true
      this.shadowRoot.querySelector("#wrap-"+item.audit_id).style.margin = "5px"
    } else if (this.audits[i].sublevel[si].ballState == "close") {
      this.audits[i].sublevel[si].ballState = "open"
      this.shadowRoot.querySelector("#audit-"+item.audit_id).hidden = false
    } else {
      this.audits[i].sublevel[si].ballState = "hide"
      this.shadowRoot.querySelector("#tooltip-"+item.audit_id).hidden = true
      if (si == this.audits[i].sublevel.length - 1) { // the last item
        this.shadowRoot.querySelector("#wrap-"+item.audit_id).style.marginBottom = "-5px"
      } else {
        this.shadowRoot.querySelector("#wrap-"+item.audit_id).style.marginBottom = "-11px"
      }
    }
    this.requestUpdate()
  }

  countInfo() {
    let unSigned = this.audits.filter(a => !a.reviewed)
    let str = ''
    if (unSigned.length) {
      str = html`<label slot="topLeft" style="font-size:12px;color: red">${unSigned.length}/${this.audits.length}</label>`
    } else {
      str = html`<label slot="topLeft" style="font-size:12px;color: green">${this.audits.length}/${this.audits.length}</label>`
    }
    return str
  }



}
window.customElements.define('audit-dialog', AuditDialog);