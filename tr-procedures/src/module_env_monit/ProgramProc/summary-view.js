import { html, css, unsafeCSS } from 'lit';
import { CoreView } from './../../components/core-view';
import { Layouts, displayFlex, vertical, centerAligned } from '@collaborne/lit-flexbox-literals';
import '@spectrum-web-components/tabs/sp-tabs';
import '@spectrum-web-components/tabs/sp-tab';
import '@spectrum-web-components/tabs/sp-tab-panel';
import '@google-web-components/google-chart';

let langConfig = {
  homeView: {
    header: {label_en:'Home page for the program', label_es:'Página de inicio para el programa'},
    chartTitle: {label_en:'In-Progress Sample Percentage', label_es:'Porcentaje en Muestras En-Progreso'}
  },
  areaView: {
    header: {label_en:'Area KPIs', label_es:'KPI sobre áreas'}
  }
}

export class SummaryView extends CoreView {
  static get styles() {
    return [Layouts, 
      super.styles,
      css`
      .panel {
        ${unsafeCSS(displayFlex)}
        ${unsafeCSS(vertical)}
        ${unsafeCSS(centerAligned)}
      }
      `
    ];
  }

  tabView() {
    return html`
      <sp-tabs selected="1">
        <sp-tab label="Home" value="1"></sp-tab>
        <sp-tab label="Area" value="2"></sp-tab>
        <sp-tab-panel value="1">
          <div class="layout vertical flex center">
            <h2>${langConfig.homeView.header["label_"+ this.lang]} ${this.selectedProgram&&this.selectedProgram.name}</h2>
            <h3>${langConfig.homeView.chartTitle["label_"+ this.lang]}</h3>
            <google-chart type='pie'></google-chart>
          </div>
        </sp-tab-panel>
        <sp-tab-panel value="2">
          <div class="layout vertical flex center">
            <h2>${langConfig.areaView.header["label_"+ this.lang]} ${this.selectedProgram&&this.selectedProgram.name}</h2>
          </div>
        </sp-tab-panel>
      </sp-tabs>
    `;
  }

  get chart() {
    return this.shadowRoot.querySelector("google-chart")
  }

  setView() {
    let data = [["Stage", "Counter"]]
    if (this.selectedProgram!==undefined&&this.selectedProgram.samples_summary_by_stage!==undefined){  
      this.selectedProgram.samples_summary_by_stage.forEach(c => {
        if (c.current_stage != "END") {
          data.push([c.current_stage, c.COUNTER])
        }
      })
    }
    this.chart.data = JSON.stringify(data)
  }
}
customElements.define('summary-view', SummaryView);