import { LitElement, html, css } from 'lit';
import '@material/mwc-icon-button';
import '@material/mwc-button';

export class TabElement extends LitElement {
  static get styles() {
    return css`
      :host([disabled]) {
        opacity: 0.5;
        pointer: none;
      }
      div.t-item {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin-right: 3px;
        background-color: #03a9f4;
      }
      mwc-button {
        --mdc-typography-button-text-transform: none;
        --mdc-typography-button-font-size: 10px;
        --mdc-theme-primary: #ffffff;
      }
    `;
  }

  render() {
    return html`
      <div class="t-item">
        <mwc-button .label="${this.lang=="en"?this.tab.tabLabel_en:this.tab.tabLabel_es}" @click=${()=>this.dispatchEvent(new CustomEvent('tab-change', {
          detail: this.tab
        }))}></mwc-button>
      </div>
    `;
  }

  static get properties() {
    return {
      lang: { type: String },
      tab: { type: Object }
    };
  }

  constructor() {
    super();
    this.tab = {};
  }

  firstUpdated() {
    this.updateComplete.then(() => {
      this.dispatchEvent(new CustomEvent("tab-rendered"))
    })
  }
}
customElements.define('tab-element', TabElement);