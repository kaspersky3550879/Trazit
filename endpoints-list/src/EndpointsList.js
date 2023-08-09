import { html, css } from 'lit';
import { CommonCore } from '@trazit/common-core';
import '@alenaksu/json-viewer';
import '@spectrum-web-components/split-view/sp-split-view';

export class EndpointsList extends CommonCore {
  static get styles() {
    return [
      css`
      sp-split-view {
        height: calc(100vh - 150px);
      }
      #leftSplit {
        padding: 10px;
        background-color:transparent;
        overflow: hidden;
      }
      #endpointName {
        height: 100%;
        overflow: hidden;
      }
      #leftSplit::-webkit-scrollbar, #rightSplit::-webkit-scrollbar, #endpointName::-webkit-scrollbar {            
      }
      #rightSplit{
        background-color:transparent
      }     
      input {
        color: rgba(57, 61, 71, 0.9);
        font-family: Montserrat;
      }         
      label {
        color: rgba(57, 61, 71, 0.9);
        font-family: Montserrat;
      }
      .ed {
        cursor: pointer;
        color:  rgba(57, 61, 71, 0.9);
        font-family: Montserrat;
      }
      select{
        color: rgba(57, 61, 71, 0.9);
        font-family: Montserrat;
      }
      div[hidden] {
        display: none;
      }
      @media (max-width: 460px) {
        #endpointName {
          height: calc(100vh - 180px);
        }
      }
      json-viewer{
        --background-color: #2a2f3a00;
        --string-color: rgba(57, 61, 71, 0.9);
        --property-color: rgba(57, 61, 71, 0.9);
        --preview-color: #24C0EB;
        --font-family: Montserrat;
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
                html`<option value=${a.api_name}>${a.api_url!==undefined&&a.api_url.length>0 ? a.api_url: a.api_name}</option>`
              )}
            </select><br>
            <label> Last Update</label> <input id="lastDate" type="datetime-local" @change=${this.dateChanged}>
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
                html`<option value=${a.api_name}>${a.api_url!==undefined&&a.api_url.length>0 ? a.api_url: a.api_name}</option>`
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
      actionName: "GET_DOC_ENDPOINTS",
      apiName: "ALL",
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken
    }), false).then(j => {
      this.docs = this.filterDocs = j

      let apis = this.docs.reduce((acc, curr) => {
        const { api_name, api_url } = curr;
        const existingObj = acc.find(
          (obj) => obj.api_name === api_name && obj.api_url === api_url
        );
      
        if (!existingObj) {
          acc.push({ api_name, api_url });
        }
      
        return acc;
      }, []);      
      let Allarr={"api_name":"All", "api_url":"All"};
      apis.unshift(Allarr)
      this.apis=apis
    })
    this.requestUpdate()
  }

  apiChanged(e) {
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
    // this.selectedApis = this.filterDocs.map( el =>{
    //   return{
    //     title: `${el.endpoint_name} (${el.api_name} ${el.id})`,
    //     date: `${el.creation_date} ${el.last_update}`,
    //     dev_notes: `${el.dev_notes}`,
    //     dev_notes_tags: `${el.dev_notes_tags}`,
    //     arguments: el.arguments_array.map(arg => { 
    //       return { name: arg.name, type: arg.type, mandatory: arg['is_mandatory?'] }
    //     }),     
    //     output_object_types: el.output_object_types        
    //   }
    // })
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
      this.selectedApis = this.selectedApis.filter(a => a.title != `${api.endpoint_name}`)
      this.selectedTxts = this.selectedTxts.filter(t => t.id != evt.target.id)
    } else {
      evt.target.style.fontWeight = "bold"
      this.selectedApis.push({
        Api_url: `${api.api_url}`,
        Api_Collection:`${api.api_name} / Id:${api.id} / Number Endpoints in API: ${api.num_endpoints_in_api}`,
        title: `${api.endpoint_name}`,              
        date: `${api.creation_date} ${api.last_update}`,
        dev_notes: `${api.dev_notes}`,
        dev_notes_tags: `${api.dev_notes_tags}`,
        number_of_arguments: `${api.num_arguments}`,
        arguments: api.arguments_array.map(arg => { 
          return { name: arg.name, type: arg.type, mandatory: arg['is_mandatory?'], dev_comment: arg.dev_comment, dev_comment_tags: arg.dev_comment_tags };
        }),
        output_object_types: api.output_object_types
      })
      this.selectedTxts.push(evt.target)
    }
    this.requestUpdate()
  }

  endpointDetail(api) {
  // Define CSS styles for mandatory and non-mandatory arguments
  const mandatoryStyle = '--property-color: red;';
  const nonMandatoryStyle = '--property-color: blue;';

  // Map the arguments_array property to an array of argument objects with styled names
  const argumentsArray = api.arguments_array.map(arg => {
    const name = arg['is_mandatory?']
      ? `<span style="${mandatoryStyle}">${arg.name}</span>`
      : `<span style="${nonMandatoryStyle}">${arg.name}</span>`;
    return { name, type: arg.type, mandatory: arg['is_mandatory?'], dev_comment: arg.dev_comment, dev_comment_tags: arg.dev_comment_tags };
  });

    return JSON.stringify({
      Api_url: `${api.api_url}`,
      Api_Collection:`${api.api_name} / Id:${api.id} / Number Endpoints in API: ${api.num_endpoints_in_api}`,
      title: `${api.endpoint_name}`,              
      date: `${api.creation_date} ${api.last_update}`,
      dev_notes: `${api.dev_notes}`,
      dev_notes_tags: `${api.dev_notes_tags}`,
      number_of_arguments: `${api.num_arguments}`,
      arguments: argumentsArray,      
      output_object_types: api.output_object_types,

    })
  }
}
