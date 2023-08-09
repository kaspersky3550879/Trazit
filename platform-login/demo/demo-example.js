import { LitElement, html, css } from 'lit-element';
import { getUserSession } from '../';
import '../platform-login';

class DemoExample extends LitElement {
  static get styles() {
    return css`
      div[hidden] {
        display: none;
      }
      .btn {
        padding: 8px 16px;
        border-radius: 6px;
        border: 1px solid rgb(36, 192, 235);
        color: white;
        background-color: rgb(36, 192, 235);
        cursor: pointer;
        transition: all 0.2s;
      }
      .btn:hover {
        color: rgb(36, 192, 235);
        background-color: white;
        transform: scale(1.02);
      }
    `
  }

  static get properties() {
    return {
      auth: { type: Boolean },
      businessRules: { type: Object }
    }
  }

  constructor() {
    super();
    this.auth = false;
    this.businessRules = {
      "enableLockSession": true,
      "minsLockSession": 10,
      "enableLogoutSession": true,
      "minsLogoutSession": 15,
      "secondsNextTimeChecker": 60
    }
  }

  render() {
    return html`
      ${
        this.auth ? 
        html`<div ?hidden="${!this.auth}">
          <h1>Hi ${this.getUser()}, you are authorized</h1>
          <button class="btn" @click=${this.logout}>Logout</button>
        </div>`
        :
        html`<platform-login 
          @authorized=${e=>this.auth=e.target.auth} 
          .businessRules=${this.businessRules}
          localBusinessRules=true
        ></platform-login>`
      }
    `;
  }

  get pLogin() {
    return this.shadowRoot.querySelector("platform-login")
  }

  clearSessionStorage() {
    window.sessionStorage.clear();
  }

  logout() {
    console.log('PlatformLogin::logout')
    this.clearSessionStorage();
    window.location.href = "/";
  }

  /**
   * Lifecycle called after DOM updated on the first time
   * Pulling the app config and waiting for the sts state
   */
  firstUpdated() {
    fetch("./config.json").then(r => r.json()).then(j => {
      console.log(j)
      this.pLogin.config = j
    })
  }

  getUser() {
    if (this.auth) {
      let session = getUserSession()
      return session.header_info.first_name +" "+ session.header_info.last_name +"(Role: "+ session.userRole +")"
    }
  }
}
customElements.define('demo-example', DemoExample);
