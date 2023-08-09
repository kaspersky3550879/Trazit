import { html, css } from 'lit';
import { CommonCore } from '@trazit/common-core';
import '@alenaksu/json-viewer';
import '@spectrum-web-components/split-view/sp-split-view';

export class PlatformUsersessions extends CommonCore {
  static get styles() {
    return [
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
    ]
  }

  static get properties() {
    return {
      docs: { type: Array },
      filterDocs: { type: Array },
      apis: { type: Array },
      endpoints: { type: Array },
      selectedApis: { type: Array },
      selectedTxts: { type: Array }
    };
  }

  constructor() {
    super()
    this.docs = []
    this.filterDocs = []
    this.apis = []
    this.selectedApis = []
    this.selectedTxts = []
  }

  render() {
    return html`
      ${this.desktop ?
        html`
        <sp-split-view resizable splitter-pos="300">
          <div id="leftSplit">
            <select @change=${this.apiChanged}>
              <option value="">-- Filter by API Name --</option>
              ${this.apis.map(a=>
                html`<option value=${a}>${a}</option>`
              )}
            </select><br>
            Last Update <input id="lastDate" type="datetime-local" @change=${this.dateChanged}>
            <hr>
            <label>${this.filterDocs.length} of ${this.docs.length}</label>
            <div id="endpointName">
            ${this.filterDocs.map(d =>
              html`
                <p class="ed" id="${d.id}" @click=${e=>this.endpointSelect(e, d)}>${d.endpoint_name}</p>
              `
            )}
            </div>
          </div>
          <div id="rightSplit">
            ${this.selectedApis.map(s =>
              html`<json-viewer>${JSON.stringify(s)}</json-viewer>`
            )}
          </div>
        </sp-split-view>
        ` :
        html`
        <div id="mobile">
          <div id="leftSplit">
            <select @change=${this.apiChanged}>
              <option value="">-- Filter by API Name --</option>
              ${this.apis.map(a=>
                html`<option value=${a}>${a}</option>`
              )}
            </select><br>
            Last Update <input id="lastDate" type="datetime-local" @change=${this.dateChanged}>
            <hr>
            <label>${this.filterDocs.length} of ${this.docs.length}</label>
            <div id="endpointName">
            ${this.filterDocs.map(d =>
              html`
                <p class="ed" id="${d.id}" @click=${()=>this.shadowRoot.querySelector("#detail"+d.id).hidden=!this.shadowRoot.querySelector("#detail"+d.id).hidden}>${d.endpoint_name}</p>
                <div id="detail${d.id}" hidden=true>
                  <json-viewer>${this.endpointDetail(d)}</json-viewer>
                </div>
              `
            )}
            </div>
          </div>
        </div>
        `
      }
    `;
  }

  async authorized() {
    super.authorized()
    await this.fetchApi(this.config.backendUrl + this.config.endpointsDocApiUrl + '?' + new URLSearchParams({
      actionName: "USER_SESSIONS",
      apiName: "ALL",
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      person: JSON.parse(sessionStorage.getItem("userSession")).header_info.person_id,
      date_started_start: '2023-02-01',
      date_started_end: '2023-03-01'
      
    }), false).then(j => {
      this.docs = this.filterDocs = j
      let apis = j.map(d => d.api_name)
      apis.unshift("All")
      this.apis = apis.filter((item, index) => apis.indexOf(item) === index);
    })
    this.requestUpdate()
  }

  apiChanged(e) {
    return
    this.selectedTxts.forEach(t => {
      t.style.fontWeight = "normal"
    })
    this.selectedApis = []
    this.selectedTxts = []
    this.shadowRoot.querySelector("input#lastDate").value = ""
    if (!e.target.value) return
    if (e.target.value == "All") {
      this.filterDocs = this.docs
    } else {
      this.filterDocs = this.docs.filter(d => d.api_name == e.target.value)
    }
    this.requestUpdate()
  }

  dateChanged(evt) {
    this.selectedTxts.forEach(t => {
      t.style.fontWeight = "normal"
    })
    this.selectedApis = []
    this.selectedTxts = []
    this.shadowRoot.querySelector("select").value = ""
    if (evt.target.value) {
      this.filterDocs = this.docs.filter(d => new Date(d.last_update).getTime() >= new Date(evt.target.value).getTime())
    } else {
      this.filterDocs = this.docs      
    }
    this.requestUpdate()
  }

  endpointSelect(evt, api) {
    if (evt.target.style.fontWeight == "bold") {
      evt.target.style.fontWeight = "normal"
      this.selectedApis = this.selectedApis.filter(a => a.title != `${api.endpoint_name} (${api.api_name} ${api.id})`)
      this.selectedTxts = this.selectedTxts.filter(t => t.id != evt.target.id)
    } else {
      evt.target.style.fontWeight = "bold"
      this.selectedApis.push({
        title: `${api.endpoint_name} (${api.api_name} ${api.id})`,
        date: `${api.creation_date} ${api.last_update}`,
        arguments: api.arguments_array.map(arg => { 
          return { name: arg.name, type: arg.type, mandatory: arg['is_mandatory?'] }
        }),
        output_object_types: api.output_object_types
      })
      this.selectedTxts.push(evt.target)
    }
    this.requestUpdate()
  }

  endpointDetail(api) {
    return JSON.stringify({
      title: `${api.endpoint_name} (${api.api_name} ${api.id})`,
      date: `${api.creation_date} ${api.last_update}`,
      arguments: api.arguments_array.map(arg => { 
        return { name: arg.name, type: arg.type, mandatory: arg['is_mandatory?'] }
      }),
      output_object_types: api.output_object_types
    })
  }
}
