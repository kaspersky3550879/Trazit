import { LitElement, html, css } from 'lit-element';
import { getUserSession } from '@trazit/platform-login';
import '@trazit/platform-login/platform-login';
import '../procedure-management';


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
  // <pdf-viewer
  // .src="https://docs.google.com/a/misena.edu.co/viewer?a=v&pid=sites&srcid=bWlzZW5hLmVkdS5jb3xyZWRlczE0fGd4Ojc5NzYwYTBlYmQ2MmZlODk"
  // .pageNum="${number('Page Number', 1)}"
  // .zoomIndex="${number('Zoom Index', 2)}"
  // ></zen-pdf-viewer>
  render() {
    return html`
      <platform-login @authorized=${e=>{
        this.auth=e.target.auth;
        this.proc.config=this.pLogin.config;}}></platform-login>
      <div ?hidden="${!this.auth}">
        <h1>Hi ${this.getUser()}, you are authorized</h1>
        <procedure-management></procedure-management><br>        
        <button @click=${()=>this.pLogin.logout()}>Logout</button>

        asd

        
      </div>
    `;
  }

  get pLogin() {
    return this.shadowRoot.querySelector("platform-login")
  }

  get proc() {
    return this.shadowRoot.querySelector("procedure-management")
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
