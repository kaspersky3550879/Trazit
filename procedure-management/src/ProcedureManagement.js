import { html, nothing } from 'lit';
import { CommonCore } from '@trazit/common-core';
import '@alenaksu/json-viewer';

export class ProcedureManagement extends CommonCore {
  static get properties() {
    return {
      defs: { type: Array }
    };
  }

  constructor() {
    super()
    this.defs = []
  }

  render() {
    return html`
      ${this.defs.map(d =>
        html`
          <h2>${d.procedure_info.procedure_name}</h2>
          <json-viewer>${JSON.stringify(d)}</json-viewer>
        `
      )}
    `;
  }

  async authorized() {
    super.authorized()
    await this.fetchApi(this.config.backendUrl + this.config.procDefinitionApiUrl + '?' + new URLSearchParams({
      actionName: "ALL_PROCEDURES_DEFINITION",
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken
    }), false).then(j => {
      this.defs = j.procedures_list.procedures
    })
    this.requestUpdate()
  }
}
