import { LitElement, html, css } from 'lit-element';
import { getUserSession } from '@trazit/platform-login';
import '@material/mwc-snackbar';
import '@trazit/platform-login/platform-login';
import '@trazit/user-profile/user-profile';
import '../platform-notif';

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
      notifs: { type: Array }
    }
  }

  constructor() {
    super();
    this.auth = false;
    this.notifs = [];
  }

  render() {
    return html`
      <platform-login @authorized=${e=>{this.auth=e.target.auth;this.uProfile.config=this.pLogin.config}}></platform-login>
      <div ?hidden="${!this.auth}">
        <h1>Hi ${this.getUser()}, you are authorized</h1>
        <div>
          <button @click=${() => this.notif.hidden = !this.notif.hidden}>Notifications ${this.notifs.length?this.notifs.length:null}</button>
          <button @click=${()=>this.pLogin.logout()}>Logout</button>
        </div>
        <user-profile @success=${this.setNotif} @error=${this.setNotif}></user-profile><hr>
        <platform-notif .notifs=${this.notifs} hidden=true></platform-notif>
      </div>
      <mwc-snackbar></mwc-snackbar>
    `;
  }

  get pLogin() {
    return this.shadowRoot.querySelector("platform-login")
  }

  get uProfile() {
    return this.shadowRoot.querySelector("user-profile")
  }

  get notif() {
    return this.shadowRoot.querySelector("platform-notif")
  }

  get toast() {
    return this.shadowRoot.querySelector("mwc-snackbar")
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

  setNotif(e) {
console.log('setNotif', e.detail.message_en)    
    this.toast.labelText = e.detail.message_en;    
    this.toast.show();
    if (e.detail.log) { // logging as required
      this.notifs = [
        ...this.notifs,
        e.detail
      ]
      this.requestUpdate()
    }
  }
}
customElements.define('demo-example', DemoExample);
