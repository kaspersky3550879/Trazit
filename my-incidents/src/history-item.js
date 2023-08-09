import { LitElement, html, css } from 'lit';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@material/mwc-icon';

export class HistoryItem extends LitElement {
  static get styles() {
    return css`
    sp-tooltip {
      margin: 10px 0;
      --spectrum-tooltip-max-width: 300px;
    }
    `;
  }

  static get properties() {
    return {
      lang: { type: String },
      history: { type: Object }
    };
  }

  constructor() {
    super();
    this.history = {};
  }

  render() {
    return html`
    <sp-tooltip open placement="" variant="${this.variant()}">
      <mwc-icon slot="icon" style="margin-right:10px">${this.icon()}</mwc-icon>
      <h3 style="margin-top:5px">${this.history.action_pretty_en ? this.history['action_pretty_'+ this.lang] : this.history.action_name}<br>${this.history.date}</h3>
      <span>${this.history.note}</span>
    </sp-tooltip>
    `;
  }

  variant() {
    if (this.history.action_name.indexOf("NEW") > -1) {
      return "negative"
    } else if (this.history.action_name.indexOf("NOTE") > -1) {
      return "info"
    } else if (this.history.action_name.indexOf("CONFIRMED") > -1) {
      return "positive"
    } else {
      return
    }
  }

  icon() {
    if (this.history.action_name.indexOf("NEW") > -1) {
      return "add"
    } else if (this.history.action_name.indexOf("NOTE") > -1) {
      return "note_add"
    } else {
      return "check"
    }
  }
}
window.customElements.define('history-item', HistoryItem);