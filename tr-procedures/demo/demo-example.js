import { LitElement, html, css } from 'lit-element';
import { getUserSession } from '@trazit/platform-login';
import '@trazit/platform-login/platform-login';
import '../tr-procedures';
import '../src/components/ProcManagement/proc-management-home';
import '@material/mwc-icon-button';
import '@material/mwc-ripple';
import { DemoViews } from '../src/ProceduresModel';


class DemoExample extends LitElement {
  static get styles() {
    return css`
        div[hidden] {
          display: none;
        }
        p{
          margin:0px;
        }
        div.proctitle{
          font-weight: bold;
          font-size: 16px;
        }   
        button {        
          color : rgba(36, 192, 235, 1);
          font-family : Montserrat;
          font-weight : bold;
          background: rgb(36, 192, 235) none repeat scroll 0% 0%;
          font-family: Montserrat;
          font-size: 11px;
          color: white;
          border-color: transparent !important;
          --mdc-button-fill-color: red;
          --mdc-button-ink-color: blue;
          border-radius: 8px;
        }
        .language{
          background-color: white;
        }   
      `
  }

  static get properties() {
    return {
      auth: { type: Boolean },
      showAllButtonsStatus: { type: Boolean },
      flag: { type: String },
      userRole: { type: String }
    }
  }

  constructor() {
    super();
    this.showAllButtonsStatus=false;
    this.auth = false;
    this.flag = "es";
    this.userRole='';
  }
  hideActionButtonProc(proc){
    if (proc===undefined) return false
    //alert(proc)
    let sessionProcs=JSON.parse(sessionStorage.getItem("userSession"))
    if (sessionProcs===null) return false
    let findProc = sessionProcs.procedures_list.procedures.filter(m => m.procInstanceName == proc)
    //console.log('hideActionButtonProc', 'proc', proc, 'findProc', findProc)
    return (findProc===undefined||findProc.length==0)
  }

  hideActionButton(proc){
    if (proc===undefined) return false
    //alert(proc)
    let sessionProcs=JSON.parse(sessionStorage.getItem("userSession"))
    if (sessionProcs===null) return false
    let findProc = sessionProcs.procedures_list.procedures.filter(m => m.procInstanceName == proc)
//    console.log('hideAllButtons', 'proc', proc, 'findProc', findProc)
    return (findProc===undefined||findProc.length==0)
  }
  toggleHideAllButtonsStatus(){
    //if (this.showAllButtonsStatus===true){this.showAllButtonsStatus=false;return;}
    this.showAllButtonsStatus=!this.showAllButtonsStatus
  }
  hideAllButtons(){
    return this.showAllButtonsStatus===false
  }

  render() {
    return html`
      <platform-login @authorized=${e=>{
        this.auth=e.target.auth;
        if (this.auth) {
        //if (this.userRole!==undefined&&this.userRole.length>0&&this.userRole!=='proc_management'){
          this.trProc.config=this.pLogin.config;
          if (this.trProcManagement){
            this.trProcManagement.config=this.pLogin.config;
            console.log('this.trProcManagement.config', this.trProcManagement.config)
            //this.trProc.resetView()
            //this.trProc.authorized()
            //this.trProc.render()
        
          }
        }
      }}></platform-login>

      <div ?hidden="${!this.auth}">
        <h1 @click=${this.toggleHideAllButtonsStatus}>Hi ${this.getUser()}, you are authorized</h1>
        <button class="language" @click=${this.changeLang}><img .src="/images/${this.flag}.png" style="width:30px"></button>
        <button @click=${()=>this.pLogin.logout()}>Logout</button><hr>

        ${this.userRole==="proc_management" ?
        html`
          <proc-management-home .config="${this.pLogin.config}"></proc-management-home>
        `:html` 
        <div ?hidden="${this.hideAllButtons()}" id="allButons">  
        
        ${DemoViews.map(curProc =>          
          html`
          ${this.hideActionButtonProc(curProc.proc_instance_name) ?  html``:html`
          <div class="proctitle"><p>${curProc.label}</p></div>
          ${curProc.views.map(curView =>
          html`<button ?hidden="${this.hideActionButton(curView.proc_instance_name)}" 
            @click=${()=>this.selectMenu(curView.proc_instance_name, curView.view_name, curView.filter_name)}>${curView.title}</button>
          `)}
          </p>
          `}
        `)}
<!--          <button @click=${this.changeLang}><img .src="/images/${this.flag}.png" style="width:30px"></button>
          <button @click=${()=>this.pLogin.logout()}>Logout</button><hr> -->
          </div>
          <tr-procedures></tr-procedures>          
          ${this.openTestDefaultView()}
        </div>
      `}
    `;
  }

  openTestDefaultView(){    
    //console.log('openTestDefaultView', this.pLogin)
    if (this.pLogin&&this.pLogin.config&&this.pLogin.config.local&&this.pLogin.config.localDefaultView){
      //this.showAllButtonsStatus=true
      this.selectMenu(this.pLogin.config.localDefaultView.procName, this.pLogin.config.localDefaultView.viewName, this.pLogin.config.localDefaultView.filterName)      
    }
  }
  selectMenu(proc, viewName, filter) {
    this.trProc.ready = false
    this.trProc.procName = proc
    this.pLogin.config.localDefaultView.procName=proc
    this.trProc.viewName = viewName
    this.pLogin.config.localDefaultView.viewName=viewName
    this.trProc.filterName = filter
    this.pLogin.config.localDefaultView.filterName=filter
    this.trProc.resetView()
    this.trProc.authorized()
    this.trProc.render()
  }

  get pLogin() {    return this.shadowRoot.querySelector("platform-login")  }
  get trProc() {    return this.shadowRoot.querySelector("tr-procedures")  }
  get trProcManagement() {    return this.shadowRoot.querySelector("proc-management-home")  }
  

  /**
   * Lifecycle called after DOM updated on the first time
   * Pulling the app config and waiting for the sts state
   */
  firstUpdated() {
    fetch("./config.json").then(r => r.json()).then(j => {
      this.pLogin.config = j
      if (this.trProcManagement!==null){
        this.trProcManagement.config=j
      }
    })
    if (this.auth) {
      let session = getUserSession()
      this.userRole=session.userRole
      //this.trProc.render()
    }

  }

  getUser() {
    if (this.auth) {
      let session = getUserSession()
      this.userRole=session.userRole
      return session.header_info.first_name +" "+ session.header_info.last_name +"("+ session.userRole +")"
      
    }
  }

  changeLang() {
    if (this.trProc!==undefined&&this.trProc!==null){
      this.flag = this.trProc.changeLang()
    }
    if (this.trProcManagement!==undefined&&this.trProcManagement!==null){
      this.flag = this.trProcManagement.changeLang()
    }

  }
}
customElements.define('demo-example', DemoExample);
