import { LitElement, html, css, nothing } from 'lit';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-icon';
import { GoogleChart } from '@google-web-components/google-chart';
import {DataViews} from '../components/Views/DataViews';

class GoogleChartExt extends GoogleChart {
  redraw() {
    if (this.chartWrapper == null || this._data == null)
        return;
    // `ChartWrapper` can be initialized with `DataView` instead of `DataTable`.
    this.chartWrapper.setDataTable(this._data);
    this.chartWrapper.setOptions(this.options || {});
    this.drawn = false;
    if (this.redrawTimeoutId !== undefined)
        clearTimeout(this.redrawTimeoutId);
    this.redrawTimeoutId = window.setTimeout(() => {
        // Drawing happens after `chartWrapper` is initialized.
        this.chartWrapper.draw();
        this.dispatchEvent(new CustomEvent('redrawed'))
    }, 5);
  }
}
customElements.define('google-chart-ext', GoogleChartExt);

export class BrowserData extends DataViews(LitElement) {
  static get styles() {
    return [
      Layouts,
      css`
      :host {
        display: block;
      }
      sp-card-ext {
        margin: 5px;
      }
      mwc-icon {
        cursor: pointer;
      }
      mwc-icon[hidden] {
        display: none;
      }
    `];
  }

  render() {
    console.log('render', 'this.tabDefinition', this.tabDefinition)
    return html`
    ${this.data===undefined||this.data.report_info===undefined ? nothing: html`

      ${this.tabDefinition.action!==undefined&&this.tabDefinition.action==='GET_SAMPLE_STAGES_SUMMARY_REPORT' ?
        html `${this.sampleBrowser()}
      `:nothing}

      ${this.tabDefinition.action!==undefined&&this.tabDefinition.action==='GET_INCUBATOR_REPORT' ?
        html `${this.incubatorBrowser()}
      `:nothing}

      ${this.tabDefinition.action!==undefined&&this.tabDefinition.action==='GET_BATCH_REPORT' ?
        html `${this.batchBrowser()}
      `:nothing}

      ${this.tabDefinition.action!==undefined&&this.tabDefinition.action==='GET_PRODLOT_REPORT' ?
        html `${this.lotBrowser()}
      `:nothing}
      
      
    `}
    `;
  }
//   <!--      
//   ${this.()}
//   ${this.()}
//   ${this.()}
// `: html`
//   ${this.jsonViewer(this.data)} -->


  // ${Object.keys(this.data).length ?
  //   html`<json-viewer>${JSON.stringify(this.data)}</json-viewer>` :
  //   nothing
  // } 
  stageTitle(currentStage){
    return html`
      <h1>${currentStage}</h1>
    `
  }
  stageTimingCapture(stageData){
    return html`
      <h3>${stageData.started_on} --> ${stageData.ended_on}</h3>
    `
  }  
  sampleBrowser() {
    return html`${this.data.sampleFieldToRetrieve ? 
      html`
        <sp-card-ext heading="Report for the sample" subheading="${this.data.sampleFieldToRetrieve.sample_id}">
          <div slot="footer">
            ${this.data.sampleFieldsToDisplay.map(d =>
              html`<li>${d.field_name}: ${d.field_value}</li>`
            )}
          </div>
        </sp-card-ext>
        <sp-card-ext heading="Stages" nonSubHeading>
          <div slot="footer" class="layout vertical">
            ${this.data.stages.map(d =>
              html`
                ${this.stageTitle(d.current_stage)}
                ${this.stageTimingCapture(d)}
                <sp-card-ext heading="${d.current_stage}" ?nonSubHeading=${!d.started_on} subheading="${d.started_on}${d.ended_on&&` >> ${d.ended_on}`}">
                  <div slot="footer">
                    ${d.current_stage == "Sampling" ?
                      html`
                        ${d.data.map(data => 
                          html`<li>${data.field_name}: ${data.field_value}</li>`
                        )}
                      ` :
                      html`${d.current_stage == "Incubation" ?
                        html`
                          ${d.data.map(data => 
                            html`
                              <sp-card-ext heading="Incubation 1" nonSubHeading>
                                <div slot="footer">
                                  ${data.incubation_1.map(f =>
                                    html`${f.field_name ?
                                      html`<li>${f.field_name}: ${f.field_value}</li>` :
                                      nothing
                                    }`
                                  )}
                                </div>
                              </sp-card-ext>
                              <sp-card-ext heading="Incubation 2" nonSubHeading>
                                <div slot="footer">
                                  ${data.incubation_2.map(f =>
                                    html`${f.field_name ?
                                      html`<li>${f.field_name}: ${f.field_value}</li>` :
                                      nothing
                                    }`
                                  )}
                                </div>
                              </sp-card-ext>
                            `
                          )}
                        ` :
                        html`${d.current_stage == "PlateReading" ?
                          html`
                            ${d.data.map(data => 
                              html`${data.field_name == "raw_value" ?
                                html`<li>Number of Colonies: ${data.field_value}</li>` : nothing
                              }`
                            )}
                          ` :
                          html`${d.current_stage == "MicroorganismIdentification" ?
                          html`
                            ${d.data.map(data =>                                      
                              html`${data.field_name === "microorganism_count"||data.field_name === "microorganism_list" ?                       
                                html`<li>${data.field_name}: ${data.field_value}</li>` : nothing}`
                              
                            )}
                          ` :
                            html`
                              ${d.data.map(data => 
                                html`${data.field_name == "name" ?
                                  html`${data.field_name}: ${data.field_value}` : nothing
                                }`
                              )}
                            `                            
                          }`
                        }`
                      }`
                    }
                  </div>
                  ${d.current_stage == "Sampling" ?
                    html`<mwc-icon slot="actions" title="Open" placement="bottom-end" 
                      ?hidden=${this.data.sampleFieldToRetrieve.current_stage=="END"}
                      @click=${this.openSample}>file_open</mwc-icon>` :
                    nothing
                  }
                </sp-card-ext>
              `
            )}
          </div>
        </sp-card-ext>
      ` : 
        html`Sample ID: ${data.sample_id}`      
    }`
  }

  incubatorBrowser() {
    return html`${this.data.incubatorFieldToRetrieve ? 
      html`
        <div class="layout horizontal flex wrap">
          <sp-card-ext heading="Report for the incubator" subheading="${this.data.incubatorFieldToRetrieve.name}">
            <div slot="footer">
              ${this.data.incubatorFieldsToDisplay.map(d =>
                html`<li>${d.field_name}: ${d.field_value}</li>`
              )}
            </div>
          </sp-card-ext>
          <google-chart-ext id="chart1" 
            @redrawed=${e=>this.dispatchEvent(new CustomEvent('chart-images', {
              detail: { imgUri: e.target.imageURI }
            }))} 
            style="margin: 5px 5px 30px 8px" 
            type="line" 
            options='{"height": ${this.chartH}, "width": ${this.chartW}}'></google-chart-ext>
        </div>
      ` : nothing
    }`
  }

  batchBrowser() {
    return html`${this.data.batchFieldToRetrieve ? 
      html`
        <div class="layout horizontal flex wrap">
          <sp-card-ext heading="Report for the batch" subheading="${this.data.batchFieldToRetrieve.name}">
            <div slot="footer">
              ${this.data.batchFieldsToDisplay.map(d =>
                html`<li>${d.field_name}: ${d.field_value}</li>`
              )}
            </div>
          </sp-card-ext>
          <google-chart-ext id="chart1" 
            @redrawed=${e=>this.dispatchEvent(new CustomEvent('chart-images', {
              detail: { imgUri: e.target.imageURI }
            }))} 
            style="margin: 5px 5px 30px 8px" 
            type="line" 
            options='{"height": ${this.chartH}, "width": ${this.chartW}}'></google-chart-ext>
        </div>
        <sp-card-ext heading="Batch Content (${this.data.NUM_SAMPLES} samples)" nonSubHeading>
          <div slot="footer" class="layout horizontal flex wrap">
            ${this.data.SAMPLES_ARRAY.map((d,i) =>
              html`${d.sample_id}${i<this.data.SAMPLES_ARRAY.length-1 ? ', ' : ''}`
            )}
          </div>
        </sp-card-ext>
      ` : nothing
    }`
  }

  lotBrowser() {
    return html`${this.data.prodLotFieldToRetrieve ? 
      html`
        <div class="layout horizontal flex wrap">
          <sp-card-ext heading="Report for the production lot" subheading="${this.data.prodLotFieldToRetrieve.name}">
            <div slot="footer">
              ${this.data.prodLotFieldsToDisplay.map(d =>
                html`<li>${d.field_name}: ${d.field_value}</li>`
              )}
            </div>
          </sp-card-ext>
          <google-chart-ext id="chart1" 
            @redrawed=${e=>this.dispatchEvent(new CustomEvent('chart-images', {
              detail: { imgUri: e.target.imageURI }
            }))} 
            style="margin: 5px 5px 30px 8px" 
            type="line" 
            options='{"height": ${this.chartH}, "width": ${this.chartW}}'></google-chart-ext>
          <google-chart-ext id="chart2" 
            @redrawed=${e=>this.dispatchEvent(new CustomEvent('chart-images', {
              detail: { imgUri: e.target.imageURI }
            }))} 
            style="margin: 5px 5px 30px 8px" 
            type="line" 
            options='{"height": ${this.chartH}, "width": ${this.chartW}}'></google-chart-ext>
        </div>
        <div class="layout horizontal flex center-justified">
          <mwc-button label='Download Sample' @click=${this.downloadSample}></mwc-button>
        </div>
      ` : nothing
    }`
  }

  static get properties() {
    return {
      data: { type: Object },
      tabDefinition: { type: Object },
      chartH: { type: Number },
      chartW: { type: Number }
    };
  }

  constructor() {
    super();
    this.data = {}
    this.tabDefinition = {}
  }

  firstUpdated() {
    this.chartH = Math.round(window.innerHeight / 2)
    this.chartW = Math.round(this.offsetWidth - 40)
  }

  get chart1() {
    return this.shadowRoot.querySelector('google-chart-ext#chart1')
  }

  get chart2() {
    return this.shadowRoot.querySelector('google-chart-ext#chart2')
  }

  updated(changes) {
    if (changes.has('data')) {
      if (this.data.incubatorFieldToRetrieve || this.data.batchFieldToRetrieve || this.data.prodLotFieldToRetrieve) {
        this.renderChart()
      }
    }
  }

  renderChart() {
    if (this.chart1) {
      if (this.data.lastTemperatureReadings) {
        if (this.data.lastTemperatureReadings[0].error) return
        let data = [["Created On", "Temperature"]]
        this.data.lastTemperatureReadings.forEach(t => data.push([t.created_on, t.temperature]))
        this.chart1.data = JSON.stringify(data)
      } else {
        let data1 = [["Area", "by area"]]
        this.data.counter_by_area_spec_tmp.forEach(t => data1.push([t.area, t.count]))
        this.chart1.data = JSON.stringify(data1)
        let data2 = [["Area", "by status"]]
        this.data.counter_by_status.forEach(t => data2.push([t.area, t.count]))
        this.chart2.data = JSON.stringify(data2)
      }
    }
  }

  downloadSample() {
    let csvContent = "data:text/csv;charset=utf-8,"
    let header = [], contents = []
    for (let i=0; i<this.data.sample.length; i++) {
      if (this.data.sample[i].spec_code) {
        if (!header.length) {
          Object.entries(this.data.sample[i]).map(([key]) => {
            header.push(key)
          })
          contents.push(header)
        }
        let content = []
        Object.entries(this.data.sample[i]).map(([key, val]) => {
          content.push(val)
        })
        contents.push(content)
      }
    }
    contents.forEach(rowArray => {
      let row = rowArray.join(",")
      csvContent += row + "\r\n";
    })
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data_sample.csv");
    link.click()
  }

  openSample() {}
}
customElements.define('browser-data', BrowserData);