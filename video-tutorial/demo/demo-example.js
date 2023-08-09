import { LitElement, html, css } from 'lit-element';
import { getUserSession } from '@trazit/platform-login';
import '@trazit/platform-login/platform-login';
import '../video-tutorial';

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
      flag: { type: String }
    }
  }

  constructor() {
    super();
    this.auth = false;
    this.flag = "es";
  }

  render() {
    return html`
      <platform-login @authorized=${e=>{this.auth=e.target.auth;this.vTutor.config=this.pLogin.config}}></platform-login>
      <div ?hidden="${!this.auth}">
        <h1>Hi ${this.getUser()}, you are authorized</h1>
        <video-tutorial></video-tutorial><br>
        <button @click=${this.changeLang}><img .src="/images/${this.flag}.png" style="width:30px"></button><br><br>
        <button @click=${()=>this.pLogin.logout()}>Logout</button>
      </div>
    `;
  }

  get pLogin() {
    return this.shadowRoot.querySelector("platform-login")
  }

  get vTutor() {
    return this.shadowRoot.querySelector("video-tutorial")
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
    this.flag = this.vTutor.changeLang()
  }
}
customElements.define('demo-example', DemoExample);
