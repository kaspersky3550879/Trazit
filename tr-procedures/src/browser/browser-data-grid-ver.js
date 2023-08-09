import { LitElement, html, css } from 'lit';
import { gridRowDetailsRenderer } from 'lit-vaadin-helpers';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@alenaksu/json-viewer';

export class BrowserData extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`
      <json-viewer>${JSON.stringify(this.gridData)}</json-viewer>
      <vaadin-grid 
        @active-item-changed=${e=>this.selectedData=e.detail.value ? [e.detail.value] : []}
        .items=${this.gridData}
        .selectedItems="${this.selectedData}"
        .detailsOpenedItems=${this.selectedData}
        ${gridRowDetailsRenderer(this.detailRenderer)}>
          ${this.gridList()}
      </vaadin-grid>
    `;
  }

  detailRenderer() {
    return Object.entries(this.retrieveData).map(([key, val]) => 
      html`<p>${key}: ${val}</p>`
    )
  }

  gridList() {
    if (this.gridData.length) {
      return Object.entries(this.gridData[0]).map(([key]) => html`<vaadin-grid-column auto-width resizable path="${key}" header="${key}"></vaadin-grid-column>`)
    }
  }

  static get properties() {
    return {
      data: { type: Object },
      tab: { type: String },
      gridData: { type: Array },
      retrieveData: { type: Object },
      selectedData: { type: Array }
    };
  }

  constructor() {
    super();
    this.data = {}
    this.gridData = []
    this.selectedData = []
  }

  updated(updates) {
    if (updates.has('data')) {
      let displayObj = {}
      if (this.tab == "Sample" && this.data.sampleFieldsToDisplay) {
        this.retrieveData = this.data.sampleFieldToRetrieve
        this.data.sampleFieldsToDisplay.forEach(f => {
          displayObj[f.field_name] = f.field_value
        })
      } else if (this.tab == "Incubation" && this.data.incubatorFieldsToDisplay) {
        this.retrieveData = this.data.incubatorFieldToRetrieve
        this.data.incubatorFieldsToDisplay.forEach(f => {
          displayObj[f.field_name] = f.field_value
        })
      }
      this.gridData = [displayObj]
    }
  }
}
customElements.define('browser-data', BrowserData);