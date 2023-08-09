import { LitElement, html, css, nothing } from 'lit';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-button';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-textfield';

import './browser-tab';
import './browser-data';

export class BrowserView extends LitElement {
  static get styles() {
    return [
      Layouts,
      css`
      sp-split-view {
        height: calc(100vh - 150px);
      }
      #leftSplit {
        padding: 10px;
        background-color:transparent
      }
      #leftSplit::-webkit-scrollbar, #rightSplit::-webkit-scrollbar {
        display: none;
      }
      #rightSplit{
        background-color:transparent
      }      
      div[hidden] {
        display: none;
      }
      mwc-button {
        background-color: rgba(36, 192, 235, 1);
        font-family: Montserrat;
        font-weight: bold;
        font-size: 19px;
        --mdc-theme-primary:rgba(36, 192, 235, 1);
        border-radius: 12px;
      }
      mwc-button.button {        
        color : rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        background: rgb(36, 192, 235) none repeat scroll 0% 0%;
        font-family: Montserrat;
        font-weight: bold;
        font-size: 19px;
        color: white;
        border-color: transparent !important;
        --mdc-button-fill-color: red;
        --mdc-button-ink-color: blue;
        border-radius: 12px;
      }            
      mwc-textfield {
        border-style : Solid;
        border-color : #999999;
        border-color : rgba(153, 153, 153, 1);
        border-width : 1px;
        border-radius : 7px;
        -moz-border-radius : 7px;
        -webkit-border-radius : 7px;   
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        background-color :  #FFFFFF;
        background-color : rgb(255, 255, 255);  
        --mdc-text-field-idle-line-color:#148CFA;
        --mdc-text-field-outlined-idle-border-color: #148CFA;
        --mdc-text-field-label-ink-color:  #148CFA;
        --mdc-text-field-focused-label-color: #148CFA;
        --mdc-theme-primary: #0465FB;
      }
      nwc-textfield.mdc-text-field {
      background-color :  #FFFFFF;
      background-color : rgb(255, 255, 255);     
      }

  `
    ];
  }

  static get properties() {
    return {
      desktop: { type: Boolean },
      config: { type: Object },
      lang: { type: String },
      model: { type: Object },
      procName: { type: String },
      tabList: { type: Array },
      activeTab: { type: Object },
      sampleData: { type: Object },
      chartImgs: { type: Array }
    };
  }

  constructor() {
    super()
    this.desktop = true
    this.model = {}
    this.tabList = []
    this.activeTab = {}
    this.sampleData = {}
    this.chartImgs = []
    if (this.config.local==true){alert('yeee')}
  }

  updated(updates) {
    if (updates.has('model') && this.model.Browser) {
      this.tabList = this.model.Browser.tabs
    }
  }
// <!--      ${this.desktop ?
//         html` -->

  render() {
    return html`
        <sp-split-view resizable primary-size="250">
          <div id="leftSplit">            
            <browser-tab 
              @tab-changed=${this.tabChanged}
              .lang=${this.lang}
              .tabs=${this.tabList}></browser-tab>
            <div class="layout flex vertical">
            ${this.activeTab.label_en == "Sample" ?
              html`<mwc-textfield label="Sample ID" value="2029"></mwc-textfield>` :
              html`${this.activeTab.label_en == "Incubation" ?
                html`
                  <mwc-textfield label="Incubator Name"></mwc-textfield>
                  <mwc-textfield label="Start Date" type="datetime-local"></mwc-textfield>
                  <mwc-textfield label="End Date" type="datetime-local"></mwc-textfield>
                ` :
                html`${this.activeTab.label_en == "Batch" ?
                  html`<mwc-textfield label="Batch Name" value="20220513"></mwc-textfield>` :
                  html`<mwc-textfield label="Lot Name" value="Lote 20220201"></mwc-textfield>`
                }`
              }`
            }
            <mwc-button raised label="Search" @click=${this.getSampleData}></mwc-button>
            </div>
          </div>
          <div id="rightSplit">
            ${this.sampleData.sampleFieldToRetrieve||this.sampleData.incubatorFieldToRetrieve||this.sampleData.batchFieldToRetrieve||this.sampleData.prodLotFieldToRetrieve ?
              html`
              <div class="layout horizontal">
                <mwc-icon-button icon="print" @click=${this.print}></mwc-icon-button>
                <mwc-icon-button icon="share"></mwc-icon-button>
              </div>
              ` : nothing
            }
            <browser-data .data=${this.sampleData} .tabDefinition=${this.activeTab}
              @chart-images=${e=>{this.chartImgs.push(e.detail.imgUri);this.requestUpdate()}}></browser-data>
          </div>
        </sp-split-view>
    `
  }
//   <!--        ` :
//   html`Coming Soon`
// } -->

  get sampleId() {
    return this.shadowRoot.querySelector("mwc-textfield[label='Sample ID']")
  }

  get incubatorName() {
    return this.shadowRoot.querySelector("mwc-textfield[label='Incubator Name']")
  }

  get startDate() {
    return this.shadowRoot.querySelector("mwc-textfield[label='Start Date']")
  }

  get endDate() {
    return this.shadowRoot.querySelector("mwc-textfield[label='End Date']")
  }

  get batchName() {
    return this.shadowRoot.querySelector("mwc-textfield[label='Batch Name']")
  }

  get lotName() {
    return this.shadowRoot.querySelector("mwc-textfield[label='Lot Name']")
  }

  get browserData() {
    return this.shadowRoot.querySelector("browser-data")
  }

  tabChanged(e) {
    this.chartImgs = []
    this.sampleData = {}
    this.activeTab = e.target.selectedTab
  }

  getSampleData() {
    this.browserData.data = {}
    let extraParams = {}
    console.log(this.activeTab)
    Object.entries(this.activeTab.extraParams).map((
      [key]) => extraParams[key] = this[key].value
    )
    let reqParams = {
      procInstanceName: this.procName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      dbName: this.config.dbName,
      schemaPrefix: this.procName, 
      actionName: this.activeTab.action, 
      ...this.activeTab.fixParams,
      ...extraParams
    }
    let params = this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl
      + '?' + new URLSearchParams(reqParams)
    this.fetchApi(params).then(j => {
      if (j && !j.is_error) {
        this.sampleData = j
        this.chartImgs = []
      }
    })
  }

  setPrintContent() {
    let header = `Report for the `
    if (this.sampleData.sampleFieldToRetrieve) {
      header += `sample ${this.sampleData.sampleFieldToRetrieve.sample_id}`
    } else if (this.sampleData.incubatorFieldToRetrieve) {
      header += `incubator ${this.sampleData.incubatorFieldToRetrieve.name}`
    } else if (this.sampleData.batchFieldToRetrieve) {
      header += `batch ${this.sampleData.batchFieldToRetrieve.name}`
    } else {
      header += `production lot ${this.sampleData.prodLotFieldToRetrieve.name}`
    }
    this.printObj = {
      header: header,
      content: this.setContent(header)
    }
  }

  setContent(header) {
    let session = JSON.parse(sessionStorage.getItem("userSession"))
    let sessionDate = session.appSessionStartDate
    let sessionUser = session.header_info.first_name +" "+ session.header_info.last_name +" ("+ session.userRole +")"
    let strContent = `<h2>Summary</h2>`
    
    strContent = this.sampleContent(strContent)
    strContent = this.incubatorContent(strContent)
    strContent = this.batchContent(strContent)
    strContent = this.lotContent(strContent)

    let str = `
      <style type="text/css">
      .page-header, .page-header-space {
        height: 50px;
        padding-top: 30px;
      }
      .page-header {
        font-size: 25px;
        position: fixed;
        top: 0mm;
        width: 100%;
        border-bottom: 1px solid black; /* for demo */
      }
      .page-footer, .page-footer-space {
        height: 50px;
        padding-top: 10px;
      }
      .page-footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        border-top: 1px solid black; /* for demo */
      }
      .page {
        page-break-after: always;
      }
      @page {
        margin: 0mm 10mm 10mm;
        ${this.activeTab.label_en == 'Production Lot' ? 'size: landscape;' : '' }
      }
      @media print {
        thead {display: table-header-group;} 
        tfoot {display: table-footer-group;}
      }
      </style>

      <div class="page-header" style="text-align: center; font-weight: bold;">
        ${header}
      </div>

      <div class="page-footer">
        ${sessionUser} on ${sessionDate}<br>
        ${this.sampleData.report_info[0].report_information}
      </div>
      <table>
      <thead>
        <tr>
          <td>
            <!--place holder for the fixed-position header-->
            <div class="page-header-space"></div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <!--*** CONTENT GOES HERE ***-->
            <div class="page">${strContent}</div>
          </td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td>
            <!--place holder for the fixed-position footer-->
            <div class="page-footer-space"></div>
          </td>
        </tr>
      </tfoot>
    </table>
    `
    return str
  }

  sampleContent(strContent) {
    if (this.sampleData.sampleFieldsToDisplay && this.activeTab.label_en == "Sample") {
      this.sampleData.sampleFieldsToDisplay.forEach(d => {
        strContent += `<li>${d.field_name}: ${d.field_value}</li>`
      })
      strContent += `<h2>Stages</h2>`
      this.sampleData.stages.forEach(d => {
        strContent += `<table border="1" cellpadding="3" style="margin-bottom: 10px; border-collapse: collapse; width: 100%;"><tr><th>${d.current_stage}<br>${d.started_on}${d.ended_on&&` >> ${d.ended_on}`}</th></tr><tr><td>`
        if (d.current_stage == "Sampling") {
          d.data.forEach(data => {
            strContent += `Sampling Date: ${data.sampling_date}`
          })
        } else if (d.current_stage == "Incubation") {
          d.data.forEach(data => {
            strContent += `<table border="1" cellpadding="3" style="border-collapse: collapse; width: 100%;"><tr><th>Incubation 1</th><th>Incubation 2</th></tr><tr>`
            strContent += `<td>`
            data.incubation_1.forEach(f => {
              if (f.field_name) {
                strContent += `<li>${f.field_name}: ${f.field_value}</li>`
              }
            })
            strContent += `</td><td>`
            data.incubation_2.forEach(f => {
              if (f.field_name) {
                strContent += `<li>${f.field_name}: ${f.field_value}</li>`
              }
            })
            strContent += `</td></tr></table>`
          })
        } else if (d.current_stage == "PlateReading") {
          d.data.forEach(data => {
            if (data.field_name == "raw_value") {
              strContent += `Number of Colonies: ${data.field_value}`
            }
          })
        } else {
          d.data.forEach(data => {
            strContent += `<li>${data.name}: ${data.items}</li>`
          })
        }
        strContent += `</td></tr></table>`
      })
    }
    return strContent
  }

  incubatorContent(strContent) {
    if (this.sampleData.incubatorFieldsToDisplay) {
      this.sampleData.incubatorFieldsToDisplay.forEach(d => {
        strContent += `<li>${d.field_name}: ${d.field_value}</li>`
      })
      strContent += this.chartContent()
    }
    return strContent
  }

  batchContent(strContent) {
    if (this.sampleData.batchFieldsToDisplay) {
      this.sampleData.batchFieldsToDisplay.forEach(d => {
        strContent += `<li>${d.field_name}: ${d.field_value}</li>`
      })
      strContent += this.chartContent()
      let batches = this.sampleData.SAMPLES_ARRAY.map(d => d.sample_id)
      strContent += `<table border="1" cellpadding="3" style="margin: 10px auto; border-collapse: collapse; width: 100%;"><tr><th>Batch Content (${this.sampleData.NUM_SAMPLES} samples)</th></tr><tr><td>${batches.join(", ")}</td></tr></table>`
    }
    return strContent
  }

  lotContent(strContent) {
    if (this.sampleData.prodLotFieldsToDisplay) {
      this.sampleData.prodLotFieldsToDisplay.forEach(d => {
        strContent += `<li>${d.field_name}: ${d.field_value}</li>`
      })
      strContent += this.chartContent()
      strContent += `<br><table border="1" cellpadding="3" style="margin-top: 10px; border-collapse: collapse; width: 100%;">`
      strContent += `<tr><th>Sample ID</th><th>Sampling Date</th><th>Sampling Date End</th><th>Raw Value</th></tr>`
      this.sampleData.sample.forEach(s => {
        if (s.spec_code) {
          strContent += `<tr><td>${s.sample_id}</td><td>${s.sampling_date}</td><td>${s.sampling_date_end}</td><td>${s.raw_value?s.raw_value:''}</td></tr>`
        }
      })
      strContent += `</table>`  
    }
    return strContent
  }

  chartContent() {
    let imgs = ``
    this.chartImgs.forEach(img => {
      imgs += `<img src="${img}" style="margin-bottom=10px;"><br>`
    })
    return imgs
  }

  print() {
    this.setPrintContent()
    let printWindow = window.open('', '', 'fullscreen=yes');
    printWindow.document.write(this.printObj.content);
    printWindow.document.title = this.printObj.header;
    printWindow.document.close();
    setTimeout(function () {
      printWindow.print();
      printWindow.close();
    }, 500);
  }

  /**
   * Populating fetch api
   * @param {*} urlParams the url api with params
   */
  fetchApi(urlParams) {
    this.dispatchEvent(new CustomEvent('set-activity', {bubbles: true, composed: true}))
    return fetch(urlParams).then(async r => {
      if (r.status == 200) {
        return r.json()
      } else {
        let err = await r.json()
        throw err
      }
    }).then(j => {
      this.dispatchEvent(new CustomEvent('success', {
        detail: {...j},
        bubbles: true,
        composed: true
      }))
      return j
    }).catch(e => {
      this.dispatchEvent(new CustomEvent("error", {
        detail: {...e},
        bubbles: true,
        composed: true
      }))
    })
  }
}
window.customElements.define('browser-view', BrowserView);