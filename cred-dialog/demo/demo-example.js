import { LitElement, html, css } from 'lit-element';
import { getUserSession } from '@trazit/platform-login';
import '@trazit/platform-login/platform-login';
import '../cred-dialog';

class DemoExample extends LitElement {
  static get styles() {
    return css`
        div[hidden] {
          display: none;
        }
      `
  }

  static get properties() {
    return {
      auth: { type: Boolean },
      flag: { type: String },
      procList: { type: Array }
    }
  }

  constructor() {
    super();
    this.auth = false;
    this.flag = "es";
    this.procList = [];
  }

  render() {
    return html`
      <platform-login @authorized=${this.authorized}></platform-login>
      <div ?hidden="${!this.auth}">
        <h1>Hi ${this.getUser()}, you are authorized</h1>
        <cred-dialog
          @cancel=${()=>this.pLogin.logout()}></cred-dialog>
        <button @click=${this.changeLang}><img .src="/images/${this.flag}.png" style="width:30px"></button><br><br>
        <button @click=${()=>this.pLogin.logout()}>Logout</button>
        <hr>
        <input id="objId" type="text" placeholder="id"><br>
        ${this.procList.map(p => 
          html`<button @click=${()=>this.action(p)}>${p}</button>`
        )}
        <hr>
        <button @click=${this.credsChange}>USER_CHANGE_PSWD</button>
        <button @click=${this.nonProcAction}>RELOGIN (LOCK INACTIVITY)</button>
      </div>
    `;
  }

  get objId() {
    return this.shadowRoot.querySelector("#objId")
  }

  credsChange() {
    this.cDialog.changing = true
    this.action("USER_CHANGE_PSWD")
  }

  nonProcAction() {
    this.cDialog.nonProc = true
    this.action("RELOGIN (LOCK INACTIVITY)")
  }

  authorized(e) {
    let procList = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures[0]
    let list = []
    procList.actions_with_confirm_user.forEach(u => {
      if (typeof u === 'string') {
        list.push(u)
      }
    })
    procList.actions_with_esign.forEach(u => {
      if (typeof u === 'string') {
        list.push(u)
      }
    })
    procList.actions_with_justification_phrase.forEach(u => {
      if (typeof u === 'string') {
        list.push(u)
      }
    })
    procList.actions_with_action_confirm.forEach(u => {
      if (typeof u === 'string') {
        list.push(u)
      }
    })
    this.procList = list;
    this.auth = e.target.auth;
    this.cDialog.config = this.pLogin.config;
  }

  get pLogin() {
    return this.shadowRoot.querySelector("platform-login")
  }

  get cDialog() {
    return this.shadowRoot.querySelector("cred-dialog")
  }

  /**
   * Lifecycle called after DOM updated on the first time
   * Pulling the app config and waiting for the sts state
   */
  firstUpdated() {
    fetch("./config.json").then(r => r.json()).then(j => {
      this.pLogin.config = j
    })
  }

  getUser() {
    if (this.auth) {
      let session = getUserSession()
      return session.header_info.first_name +" "+ session.header_info.last_name +"("+ session.userRole +")"
    }
  }

  changeLang() {
    this.flag = this.cDialog.changeLang()
  }

  action(actionName) {
    this.cDialog.credsChecker(actionName, this.objId.value)
  }
}
customElements.define('demo-example', DemoExample);
