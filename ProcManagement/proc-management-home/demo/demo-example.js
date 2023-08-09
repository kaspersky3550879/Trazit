import { LitElement, html, css } from 'lit-element';
// import { getUserSession } from '@trazit/platform-login';
// import '@trazit/platform-login/platform-login';
// import '../proc-management-home';

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
      auth: { type: Boolean }
    }
  }

  constructor() {
    super();
    this.auth = false;
  }
  // <platform-login @authorized=${e=>{
  //   this.auth=e.target.auth;
  //   this.el.config=this.pLogin.config;}}></platform-login>
  // <div ?hidden="${!this.auth}">
  //   <h1>Hi ${this.getUser()}, you are authorized</h1>
  //   <button @click=${()=>this.pLogin.logout()}>Logout</button><br><br>
  //   <proc-management-home></proc-management-home>
  // </div>
  render() {
    return html`
asds
    `;
  }

  get pLogin() {
    return this.shadowRoot.querySelector("platform-login")
  }

  get el() {
    return this.shadowRoot.querySelector("proc-management-home")
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
}
customElements.define('demo-example', DemoExample);
