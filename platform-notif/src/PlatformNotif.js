import { html, css } from 'lit';
import { CommonCore } from '@trazit/common-core';
import '@spectrum-web-components/accordion/sp-accordion';
import '@spectrum-web-components/accordion/sp-accordion-item';

export class PlatformNotif extends CommonCore {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      :host([hidden]) {
        display: none;
      }
    `;
  }

  static get properties() {
    return {
      notifs: { type: Array }
    };
  }

  constructor() {
    super();
    this.notifs = [];
  }

  render() {
    return html`
      ${this.notifs.map(n=>
        html`
        <sp-accordion allow-multiple style="--spectrum-accordion-text-color: ${n.is_error?'#a33':'#0085ff'}; --spectrum-accordion-text-color-hover: ${n.is_error?'#a33':'#0085ff'}">
          <sp-accordion-item label=${n["message_"+ this.lang]}>
            <p style="overflow-wrap: break-word;">${n["message_"+ this.lang]}</p>
          </sp-accordion-item>
        </sp-accordion>
        `
      )}
    `;
  }

  notifDetail(n) {
    return Object.entries(n).map(
      ([key, value]) => html`${key}: ${JSON.stringify(value)}<br />`
    )
  }
}
