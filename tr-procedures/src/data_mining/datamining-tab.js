import { LitElement, html, css, unsafeCSS } from 'lit';
import { centerAligned, centerJustified, displayFlex, horizontal } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-icon-button';
import '@material/mwc-button';

export class DataMiningTab extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .tabWrap {
        ${unsafeCSS(displayFlex)}
        ${unsafeCSS(horizontal)}
        ${unsafeCSS(centerJustified)}
      }
      .tabContainer {
        overflow: auto;
        ${unsafeCSS(displayFlex)}
        ${unsafeCSS(horizontal)}
        ${unsafeCSS(centerAligned)}
      }
      .tabContainer::-webkit-scrollbar {
        display: none;
      }
      .tabContainer > * {
        display: inline-block;
        flex-shrink: 0;
      }
      mwc-button {
        --mdc-typography-button-text-transform: none;
        --mdc-typography-button-font-size: 12px;
        margin: 2px;
      }
      mwc-icon-button[hidden] {
        display: none;
      }
      mwc-select {        
        --mdc-theme-primary : rgba(36, 192, 235, 1);
        --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
        --mdc-select-ink-color: rgba(36, 192, 235, 1);
        --mdc-select-dropdown-icon-color:rgba(36, 192, 235, 1);
        --mdc-select-hover-line-color:rgba(36, 192, 235, 1);
        --mdc-notched-outline-border-color: rgba(186, 235, 248, 0.4);
        --mdc-select-disabled-dropdown-icon-color:rgba(36, 192, 235, 1);

        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }
      mwc-select.outlined {        
        --mdc-theme-primary : rgba(36, 192, 235, 1);
        --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
        --mdc-select-ink-color: rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        background-color: 4fcad029;
      } 

    `;
  }
  listObjectSelected(e){
    //console.log('listObjectSelected', e.target.value)
    this.tabChanged(this.tabs[e.target.value]) 
  }
  listElementLabel(){
    if (this.viewModelFromProcModel.tabsListElement===undefined){
      return ""
    }else{
      return this.viewModelFromProcModel.tabsListElement["label_"+this.lang]
    }
  }
  render() {
    if(this.tabs===undefined){return html``}
    if (this.tabs.length==1){this.tabChanged(this.tabs[0])}
    //console.log(this.tabs)
    // @change=${()=>this.tabChanged(t)}
    return html`
      <div class="layout flex vertical">
      ${this.tabs.length==1 ?html`
        <h2 style="text-align: center; color: #24c0eb;">${this.tabs[0]['label_'+this.lang]}</h2>
      `:html`
        <mwc-select style="width:100%;" class="layout flex vertical" outlined id="kpiList" label="${this.listElementLabel()}" @change=${this.listObjectSelected}>
        ${this.tabs&&this.tabs.map((p,i) => 
          html`<mwc-list-item value="${i}" ?selected=${i==0}>${p['label_'+this.lang]}</mwc-list-item>`
        )}
        </mwc-select>      
      `} 
      </div>
    `;
  }

  get tabContainer() {
    return this.shadowRoot.querySelector(".tabContainer")
  }

  get tabElems() {
    return this.shadowRoot.querySelectorAll('.tab-item')
  }

  prevTab() {
    this.tabContainer.scrollLeft = this.tabContainer.scrollLeft - 200
  }

  nextTab() {
    this.tabContainer.scrollLeft = this.tabContainer.scrollLeft + 200
  }

  isScroll() {
    if (this.tabContainer.offsetWidth < this.tabContainer.scrollWidth) {
      this.next = true
    } else {
      this.next = false
    }
    this.tabElems.forEach(t => {
      if (t.label == this.selectedTab['label_'+this.lang]) {
        t.raised = true
      } else {
        t.raised = false
      }
    })
  }

  updated(updates) {
    if (updates.has('tabs') && this.tabs.length) {
      this.updateComplete.then(() => {
        this.tabChanged(this.tabs[0])
      })  
    }
  }

  XfirstUpdated() {
    // this.tabContainer.addEventListener('scroll', ()=>{
    //   if (this.tabContainer.scrollLeft == 0) {
    //     this.prev = false
    //   } else {
    //     this.prev = true
    //   }
    //   if (this.tabContainer.offsetWidth + this.tabContainer.scrollLeft == this.tabContainer.scrollWidth) {
    //     this.next = false
    //   } else {
    //     this.next = true
    //   }
    // })
  }

  tabChanged(tab) {
    this.selectedTab = tab
    this.tabElems.forEach(t => {
      if (t.label == this.selectedTab['label_'+this.lang]) {
        t.raised = true
        t.outlined = false
      } else {
        t.outlined = true
        t.raised = false
      }
    })
    this.dispatchEvent(new CustomEvent('tab-changed'))
  }

  static get properties() {
    return {
      lang: { type: String },
      tabs: { type: Array },
      selectedTab: { type: Object }, // current selected tab
      prev: { type: Boolean },
      next: { type: Boolean },
      viewModelFromProcModel: {type: Object}
    };
  }

  constructor() {
    super();
    this.prev = false;
    this.next = false;
    this.tabs = [];
    this.selectedTab = {};
    this.viewModelFromProcModel = {}
  }
}
customElements.define('datamining-tab', DataMiningTab);