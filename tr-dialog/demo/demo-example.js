import { LitElement, html, css } from 'lit';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-textfield';
import '@spectrum-web-components/button/sp-button';
import '../tr-dialog';

class DemoExample extends LitElement {
  static get styles() {
    return [
      Layouts,
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
      `
    ]
  }

  render() {
    return html`
    <button @click=${() => this.dialog.show()}>Open Dialog</button>
    
    <tr-dialog
      heading="Trazit Dialog"
      scrimClickAction=""
      hideActions=""
      @opening=${() => console.log("opening")}
      @opened=${() => console.log("opened")}
      @closing=${() => console.log("closing")}
      @closed=${() => console.log("closed")}>
      <div class="content layout vertical flex center-justified">
        <mwc-textfield label="User" type="text"></mwc-textfield>
        <mwc-textfield label="Password" type="password"
          iconTrailing="visibility" @click=${this.showPwd}>
        </mwc-textfield>
        <div style="margin-top:30px">
          <sp-button size="xl" variant="secondary" dialogAction="decline">Cancel</sp-button>
          <sp-button size="xl">Accept</sp-button>
        </div>
      </div>
    </tr-dialog>
    `;
  }

  get dialog() {
    return this.shadowRoot.querySelector("tr-dialog")
  }

  get dialogSurface() {
    return this.dialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  firstUpdated() {
    this.updateComplete.then(() => {
      this.dialogSurface.style.backgroundImage = "url(/images/abstract.jpg)";
      this.dialogSurface.style.backgroundSize = "cover";
      this.dialogSurface.style.backgroundRepeat = "no-repeat";
      this.dialogSurface.style.textAlign = "center";
      this.dialog.shadowRoot.querySelector("h2#title").style.fontSize = "20px";
      this.dialog.shadowRoot.querySelector("#content").style.paddingBottom = "0";
    })
  }

  showPwd(e) {
    if (e.pointerId == -1) {
      e.target.type = e.target.type == "password" ? "text" : "password";
    }
  }
}
customElements.define('demo-example', DemoExample);
