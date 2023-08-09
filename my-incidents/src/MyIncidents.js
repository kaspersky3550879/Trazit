import { html, css, unsafeCSS } from 'lit';
import { CommonCore } from '@trazit/common-core';
import { Alignment, displayFlex, Layouts, vertical } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-icon-button';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-textarea';
import '@material/mwc-textfield';
import '@spectrum-web-components/button/sp-button';
import '@spectrum-web-components/icon/sp-icon.js';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
import '@trazit/tr-dialog/tr-dialog';
import './history-item';

const langConfig = {
  field: {
    title: {
      "label_en": "Title", "label_es": "Titulo"
    },
    detail: {
      "label_en": "Detail", "label_es": "Detalle"
    },
    days: {
      "label_en": "Number of Days", "label_es": "Número de Días"
    },
    id:  {
      "label_en": "Incident Id - Date Creation - Title", "label_es": "Id de Incidencia - Creación de fecha - Título"
    }
  },
  dialog_button: {
    new: {
      "label_en": "Create", "label_es": "Crear"
    },
    confirm: {
      "label_en": "Confirm", "label_es": "Confirmar"
    },
    close: {
      "label_en": "Close", "label_es": "Cerrar"
    },
    cancel: {
      "label_en": "Cancel", "label_es": "Cancelar"
    },
    accept: {
      "label_en": "Accept", "label_es": "Aceptar"
    }
  },
  grid: {
    id: {
      "label_en": "Id", "label_es": "Id"
    },
    last_update: {
      "label_en": "Last Update", "label_es": "Último cambio"
    },
    creation: {
      "label_en":"Creation", "label_es": "Creación"
    },
    title: {
      "label_en": "Title", "label_es": "Titulo"
    },
    detail: {
      "label_en": "Detail", "label_es": "Detalle"
    }
  },
  button: {
    new: {
    "label_en": "New", "label_es": "Crear"
    },
    confirm: {
      "label_en": "Confirm", "label_es": "Confirmar"
    },
    note: {
      "label_en": "Add Note", "label_es": "Añadir Nota"
    },
    close: {
      "label_en": "Close it!", "label_es": "¡Zanjarla!"
    },
    reopen: {
      "label_en": "ReOpen it!", "label_es": "¡Reabrirla!"
    }
  }
};

export class MyIncidents extends CommonCore {
  static get styles() {
    return [
      Layouts, Alignment,
      css`
        tr-dialog {
          --mdc-dialog-heading-ink-color: blue;
          --mdc-typography-headline6-font-size: 35px;
        }
        .content {
          opacity: 0.9;
        }
        .content * {
          margin: 5px 0;
        }
        div[hidden] {
          display: none;
        }
        sp-button {
          margin: 0 2px;
        }
        sp-button[hidden] {
          display: none;
        }
        mwc-textfield[hidden] {
          display: none;
        }
        .reopenPart {
          ${unsafeCSS(displayFlex)}
          ${unsafeCSS(vertical)}
        }
        `
    ];
  }

  static get properties() {
    return {
      selectedItem: { type: Object },
      histories: { type: Array },
      dialogType: { type: String },
      numDays: { type: Number },
      closedIds: { type: Array }
    };
  }

  constructor() {
    super();
    this.histories = [];
    this.dialogType = "";
    this.numDays = 7;
    this.closedIds = [];
    this.fieldErrMsg = {
      en: {
        title: "Title is required",
        id: "Id is required",
        detail: "Detail is required"
      },
      es: {
        title: "El título es obligatorio",
        id: "Se requiere identificación",
        detail: "Se requiere detalle"
      }
    };
  }

  authorized() {
    super.authorized()
    this.getOpenIncidents()
  }

  render() {
    return html`
    <div class="layout horizontal center flex wrap">
      <mwc-icon-button icon="refresh" @click=${this.getOpenIncidents}></mwc-icon-button>
      <mwc-icon-button style="color:#c9252d" .title="${langConfig.button.new["label_"+this.lang]}" icon="add" @click=${()=>{this.action=`${langConfig.button.new["label_"+this.lang]} Incident`;this.openDialog("create")}}></mwc-icon-button>
      <mwc-icon-button style="color:#12805c" .title="${langConfig.button.confirm["label_"+this.lang]}" icon="check" ?disabled=${!this.selectedItem} @click=${()=>{this.action=`${langConfig.button.confirm["label_"+this.lang]} Incident`;this.openDialog("confirm")}}></mwc-icon-button>
      <mwc-icon-button style="color:#0d66d0" .title="${langConfig.button.note["label_"+this.lang]}" icon="note_add" ?disabled=${!this.selectedItem} @click=${()=>{this.action=`${langConfig.button.note["label_"+this.lang]}`;this.openDialog("note")}}></mwc-icon-button>
      <mwc-icon-button style="color:#747474" .title="${langConfig.button.close["label_"+this.lang]}" icon="close" ?disabled=${!this.selectedItem} @click=${()=>{this.action=`${langConfig.button.close["label_"+this.lang]} Incident`;this.openDialog("close")}}></mwc-icon-button>
      <mwc-icon-button .title="${langConfig.button.reopen["label_"+this.lang]}" icon="lock_open" @click=${()=>{this.action=`${langConfig.button.reopen["label_"+this.lang]} Incident`;this.openDialog("reopen")}} ?disabled=${!this.closedIds.length}></mwc-icon-button>
    </div>
    <vaadin-grid @active-item-changed=${this.selectItem} theme="row-dividers" column-reordering-allowed multi-sort>
      <vaadin-grid-selection-column auto-select frozen></vaadin-grid-selection-column>
      <vaadin-grid-sort-column path="id" .header="${langConfig.grid.id["label_"+this.lang]}"></vaadin-grid-sort-column>
      <vaadin-grid-filter-column path="date_last_update" .header="${langConfig.grid.last_update["label_"+this.lang]}"></vaadin-grid-filter-column>
      <vaadin-grid-filter-column path="date_creation" .header="${langConfig.grid.creation["label_"+this.lang]}"></vaadin-grid-filter-column>
      <vaadin-grid-filter-column path="item_title" .header="${langConfig.grid.title["label_"+this.lang]}"></vaadin-grid-filter-column>
      <vaadin-grid-filter-column path="item_detail" .header="${langConfig.grid.detail["label_"+this.lang]}"></vaadin-grid-filter-column>
    </vaadin-grid>
    <div ?hidden=${this.hideList}>
      ${this.histories.map(h=>
        html`<history-item .history=${h} .lang=${this.lang}></history-item>`
      )}
    </div>
    <tr-dialog id="icdDialog" 
      @opened=${e=>{if(e.target===this.icdDialog)this.dialogOpened()}} 
      @closed=${e=>{if(e.target===this.icdDialog){this.icdTitle.value="";this.icdDetail.value="";this.action=null;}}}
      heading=""
      hideActions=""
      scrimClickAction="">
      <label slot="topLeft" style="font-size:12px">${this.action}</label>
      <div class="content layout vertical flex center-justified">
        <mwc-textfield id="title" label="${langConfig.field.title["label_"+this.lang]}" ?hidden=${this.dialogType!="create"} .validationMessage=${this.fieldErrMsg[this.lang].title} required></mwc-textfield>
        <div class="reopenPart" ?hidden=${this.dialogType!="reopen"}>
          <div class="layout horizontal flex center-center">
            <mwc-textfield class="layout flex" id="numDays" type="number" 
              .value=${this.numDays} @change=${e=>this.numDays=e.target.value}
              label="${langConfig.field.days["label_"+this.lang]}"></mwc-textfield>
            <mwc-icon-button icon="refresh" @click=${this.getClosedIds}></mwc-icon-button>
          </div>
          <mwc-select id="icdId" label="${langConfig.field.id["label_"+this.lang]}" 
            ?disabled=${!this.closedIds.length}>
            ${this.closedIds.map((c,i) => 
              html`<mwc-list-item value="${c.id}" ?selected=${i==0}>${c.id} - ${c.date_creation.slice(0,10)} - ${c.item_title.slice(0,20)}</mwc-list-item>`
            )}
          </mwc-select>
        </div>
        <mwc-textarea id="detail" label="${langConfig.field.detail["label_"+this.lang]}" rows=10 cols=100 .validationMessage=${this.fieldErrMsg[this.lang].detail} required></mwc-textarea>
        <sp-button size="m" @click=${this.createIncident} ?hidden=${this.dialogType!="create"}>${langConfig.dialog_button.new["label_"+this.lang]}</sp-button>
        <sp-button size="m" @click=${this.confirmIncident} ?hidden=${this.dialogType!="confirm"}>${langConfig.dialog_button.confirm["label_"+this.lang]}</sp-button>
        <sp-button size="m" @click=${this.addNote} ?hidden=${this.dialogType!="note"}>${langConfig.dialog_button.accept["label_"+this.lang]}</sp-button>
        <sp-button size="m" @click=${this.closeIncident} ?hidden=${this.dialogType!="close"}>${langConfig.dialog_button.accept["label_"+this.lang]}</sp-button>
        <sp-button size="m" @click=${this.reopenIncident} ?hidden=${this.dialogType!="reopen"} ?disabled=${!this.closedIds.length}>${langConfig.dialog_button.accept["label_"+this.lang]}</sp-button>
      </div>
    </tr-dialog>
    `;
  }

  get grid() {
    return this.shadowRoot.querySelector("vaadin-grid")
  }

  get icdDialog() {
    return this.shadowRoot.querySelector("tr-dialog#icdDialog")
  }

  get icdDialogSurface() {
    return this.icdDialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  get icdTitle() {
    return this.shadowRoot.querySelector("#title")
  }

  get icdId() {
    return this.shadowRoot.querySelector("#icdId")
  }

  get icdDetail() {
    return this.shadowRoot.querySelector("#detail")
  }

  getOpenIncidents() {
    this.histories = []
    this.fetchApi(this.config.backendUrl + this.config.frontEndIncidentsUrl + '?' + new URLSearchParams({
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      actionName: 'USER_OPEN_INCIDENTS'
    }), false).then(j => {
      if (j && !j.is_error) {
        this.getClosedIds()
        this.grid.items = j
        this.grid.querySelectorAll("vaadin-checkbox").forEach(c => {
          c.disabled = true
        })
      }
    })
  }

  getClosedIds() {
    this.closedIds = []
    this.fetchApi(this.config.backendUrl + this.config.frontEndIncidentsUrl + '?' + new URLSearchParams({
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      actionName: 'CLOSED_INCIDENTS_LAST_N_DAYS',
      numDays: this.numDays
    }), false).then(j => {
      if (j && !j.is_error) {
        this.closedIds = j
      }
    })
  }

  /**
   * Once an incident item selected
   * @param {*} e the grid
   */
  selectItem(e) {
    if (!e.detail.value) {
      this.selectedItem = null
      this.histories = []
      return
    }
    // deselect old selected item if found
    if (this.selectedItem) {
      e.target.deselectItem(this.selectedItem)
    }
    if (e.detail.value) {
      this.selectedItem = e.detail.value
      this.fetchApi(this.config.backendUrl + this.config.frontEndIncidentsUrl + '?' + new URLSearchParams({
        dbName: this.config.dbName,
        finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
        actionName: 'INCIDENT_DETAIL_FOR_GIVEN_INCIDENT',
        incidentId: this.selectedItem.id
      }), false).then(j => {
        if (j && !j.is_error) {
          this.histories = j
        }
      })
    }
  }

  incidentAPI(params) {
    this.fetchApi(this.config.backendUrl + this.config.ApiIncidentsUrl + '?' + new URLSearchParams({
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      ...params
    })).then(j => {
      this.icdDialog.close()
      this.getOpenIncidents()
    })
  }

  createIncident() {
    if (!this.icdTitle.validity.valid) {
      return this.icdTitle.focus()
    }
    if (!this.icdDetail.validity.valid) {
      return this.icdDetail.focus()
    }
    this.incidentAPI({
      actionName: 'NEW_INCIDENT',
      incidentTitle: this.icdTitle.value,
      incidentDetail: this.icdDetail.value
    })
  }

  confirmIncident() {
    if (!this.icdDetail.validity.valid) {
      return this.icdDetail.focus()
    }
    this.incidentAPI({
      actionName: 'CONFIRM_INCIDENT',
      incidentId: this.selectedItem.id,
      note: this.icdDetail.value
    })
  }

  addNote() {
    if (!this.icdDetail.validity.valid) {
      return this.icdDetail.focus()
    }
    this.incidentAPI({
      actionName: 'ADD_NOTE_INCIDENT',
      incidentId: this.selectedItem.id,
      note: this.icdDetail.value
    })
  }

  closeIncident() {
    if (!this.icdDetail.validity.valid) {
      return this.icdDetail.focus()
    }
    this.incidentAPI({
      actionName: 'CLOSE_INCIDENT',
      incidentId: this.selectedItem.id,
      note: this.icdDetail.value
    })
  }

  reopenIncident() {
    if (!this.icdDetail.validity.valid) {
      return this.icdDetail.focus()
    }
    this.incidentAPI({
      actionName: 'REOPEN_INCIDENT',
      incidentId: this.icdId.value,
      note: this.icdDetail.value
    })
  }

  openDialog(type) {
    this.dialogType = type
    this.icdDialog.show()
  }

  dialogOpened() {
    if (this.dialogType == "create") {
      this.icdTitle.focus()
    } else if (this.dialogType == "reopen") {
      this.icdId.focus()
    } else {
      this.icdDetail.focus()
    }
  }
}
