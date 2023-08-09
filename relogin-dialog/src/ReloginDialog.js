import { html, css } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import {TrazitCredentialsDialogs} from '../../tr-procedures/src/components/GenericDialogs/TrazitCredentialsDialogs';

export class ReloginDialog extends TrazitCredentialsDialogs(CredDialog) {
  static get properties() {
    return {
      startSession: { type: Number },
      businessRules: { type: Object },
      minute: { type: Number }, // minute in microseconds
      noActivity: { type: Boolean },
      activityEvents: { type: Array },
      isLockSessionEnable: { type: Boolean },
      minsLockSession: {type: Number},
      isLogoutEnable: { type: Boolean },
      minsLogoutSession: {type: Number},
      secondsNextTimeChecker: {type: Number},
      showTimingInConsole:  { type: Boolean },

      tiempoSaludo: {type: Number}, 
      tiempoDespedida : {type: Number}, 

      underInactivity:{type: Boolean}
    };
  }

  constructor() {
    super();
    this.businessRules = {};
    this.minute = 60000; //60000; // multiply to 1 minute
    this.escapeKey = false;
    this.noActivity = true;
    this.isLockSessionEnable = false;
    this.isLogoutEnable = false;
    this.minsLockSession=-1;
    this.minsLogoutSession=-1;
    this.secondsNextTimeChecker=30;
    this.showTimingInConsole = true;
    this.underInactivity=false;
  }

  reset() {
    super.reset()
    this.nonProc = true
  }

  // Override this method once authorized
  authorized() {
    super.authorized()
    if (this.config.local) {
      this.businessRules = this.config.businessRules
    } else {
      this.businessRules = JSON.parse(sessionStorage.getItem("userSession")).platform_business_rules      
    }
    if (this.businessRules.enableLockSession!==undefined){this.isLockSessionEnable=this.businessRules.enableLockSession==="true"}
    if (this.businessRules.minsLockSession!==undefined){this.minsLockSession=Number(this.businessRules.minsLockSession)}
    if (this.businessRules.enableLogoutSession!==undefined){this.isLogoutEnable=this.businessRules.enableLogoutSession==="true"}
    if (this.businessRules.minsLogoutSession!==undefined){this.minsLogoutSession=Number(this.businessRules.minsLogoutSession)}
    if (this.businessRules.secondsNextTimeChecker!==undefined){this.secondsNextTimeChecker=Number(this.businessRules.secondsNextTimeChecker)}
    if (this.businessRules.showTimingInConsole!==undefined){this.showTimingInConsole=Number(this.businessRules.showTimingInConsole)}
    
    // Fake session
    // console.clear()
    // this.isLockSessionEnable=true
    // this.isLogoutEnable=true
    // this.minsLockSession=1
    // this.minsLogoutSession=1.5
    // this.showTimingInConsole=true

    if (this.isLockSessionEnable||this.isLogoutEnable){
      this.minsLockSession=this.minsLockSession*this.minute
      this.minsLogoutSession=this.minsLogoutSession*this.minute

      //alert(this.minsLockSession)
      this.startSession = new Date().getTime()
      this.checkTimer()
      if (this.isLockSessionEnable){
        this.cTemporizadorLock = setTimeout(() => {this.checkSessionExpired()}, this.minsLockSession);
      }
      if (this.isLogoutEnable){
        this.cTemporizadorLogOut = setTimeout(() => {this.logout()}, this.minsLogoutSession);    
      }
      window.addEventListener('click', () => {this.reiniciarTemporizadores()});
      window.addEventListener('mousemove', () => {this.reiniciarTemporizadores()});
      window.addEventListener('keypress', () => {this.reiniciarTemporizadores()});    
    }
    return
  }
  reiniciarTemporizadores() {
    this.startSession = new Date().getTime()
    this.newSession = new Date().getTime()    
    if (this.isLockSessionEnable){
      clearTimeout(this.cTemporizadorLock);
      this.cTemporizadorLock = setTimeout(() => {this.checkSessionExpired()}, this.minsLockSession);      
    }
    if (this.isLogoutEnable){
      clearTimeout(this.cTemporizadorLogOut);
      this.cTemporizadorLogOut = setTimeout(() => {this.logout()}, this.minsLogoutSession);    
    }
  }
  getEvent(evt) {
    setTimeout(() => {
      this.enterSession(evt)
    }, 1000)
    return
  }
  enterSession(e) {
    if (!this.isLockSessionEnable&&!this.isLogoutEnable){
      return
    }
    this.checkTimer()
    if (this.isLockSessionEnable){
      this.cTemporizadorLock = setTimeout(() => {this.checkSessionExpired()}, this.minsLockSession);
    }
    if (this.isLogoutEnable){
      this.cTemporizadorLogOut = setTimeout(() => {this.logout()}, this.minsLogoutSession);    
    }
    window.addEventListener('click', () => {this.reiniciarTemporizadores()});
    window.addEventListener('mousemove', () => {this.reiniciarTemporizadores()});
    window.addEventListener('keypress', () => {this.reiniciarTemporizadores()});    
    this.checkSessionExpired()
  }

  checkTimer(expanded=false) {
      let curTime = new Date().getTime();
      let runSession = curTime - this.startSession;
      if (this.showTimingInConsole) {
        let logMsg=`timer checker: ${Math.round(runSession/1000)}s`
        if (expanded){
          logMsg=logMsg+' '+(this.isLockSessionEnable ? 'Lock Session by inactivity is enabled and session will be locked after '+this.minsLockSession+' Minutes': 'Lock Session by inactivity is disabled')
          logMsg=logMsg+' '+(this.isLogoutEnable ? 'Log Out Session by inactivity is enabled and session will be closed after '+this.minsLogoutSession+' Minutes': 'LogOut Session by inactivity is disabled')
        }
        console.log(logMsg)    
  
      }
      this.cTimer = setTimeout(() => {
        this.checkTimer()
      }, Number(this.secondsNextTimeChecker) * 1000)
  }

  /**
   * Checking the user session inactivity
   */
  checkSessionExpired() {
    if (!this.isLockSessionEnable&&!this.isLogoutEnable){
      return
    }
    this.underInactivity=true 
    let curTime = new Date().getTime();
    let runSession = curTime - this.startSession;
    if (!this.isLockSessionEnable || Number(this.minsLockSession) < 0) {
      if (this.isLogoutEnable && Number(this.minsLogoutSession) > 0) {
        console.log('check logout directly due to  locking is disabled')
        this.newSession = new Date().getTime()
        this.checkUserRelogin()
      }else{
        console.log('Inactivity modes, lock and log out session, not enabled')
      }
    } else {
      if (this.isLockSessionEnable && (runSession >= Number(this.minsLockSession))) { // session running >= minsLockSession
        // remove these events from the document.
        if (this.activityEvents!==undefined){
          this.activityEvents.forEach(eventName => {
            document.removeEventListener(eventName, this.getEvent, { once: true })
          })
        }
        // open relogin dialog
        this.type = "user"
        this.credsChecker("TOKEN_VALIDATE_USER_CREDENTIALS", -1)
        if (this.isLogoutEnable && Number(this.minsLogoutSession) > 0) {
          //This line below, uncomment to start the counter when locking moment starts
          this.newSession = new Date().getTime()
          this.checkUserRelogin()
        } else {
          // clear out the timeout if exist to stop the previous time checker
          if (this.cTimer) {
            clearTimeout(this.cTimer);
          }
        }
      } else {
        this.sTimer = setTimeout(() => {
          this.checkSessionExpired()
        }, Number(this.secondsNextTimeChecker) * 1000)
      }
    }
  }
  checkUserRelogin() {
    if (!this.isLockSessionEnable&&!this.isLogoutEnable){
      this.checkTimer(true)
      return
    }
    if (this.noActivity) {
      this.underInactivity=true
      if (this.activityEvents!==undefined){
        this.activityEvents.forEach(eventName => {
          document.removeEventListener(eventName, this.getEvent, { once: true })
        })
      }
      let curTime = new Date().getTime();
      let runSession = curTime - this.newSession;
      this.checkTimer(true)

      if (runSession >= Number(this.minsLogoutSession)) { // session running >= minsLogoutSession  
        this.logout()
      } else {
        this.lTimer = setTimeout(() => {
          this.checkUserRelogin()
        }, Number(this.secondsNextTimeChecker) * 1000)
      }
    }
  }

  fetchApi(urlParams) {
    return super.fetchApi(urlParams, false)
  }

  nextRequest() {
    super.nextRequest()
    this.dispatchEvent(new CustomEvent('success', {
      detail: { message_en: "Start sew session succeed", message_es: "Iniciar nueva sesión correctamente" },
      bubbles: true,
      composed: true
    }))
    this.enterSession()
  }

  failedAttempt() {
    super.failedAttempt()
    this.logout()
  }

  logout() {
    this.dispatchEvent(new CustomEvent('logout'))
  }
}