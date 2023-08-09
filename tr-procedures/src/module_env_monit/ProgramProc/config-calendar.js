import { html, css } from 'lit';
import { CoreView } from './../../components/core-view';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import { columnBodyRenderer } from 'lit-vaadin-helpers';
import './mp-calendar-ext';

let langConfig = {
  headerTitle: { label_en: 'Scheduled program locations', label_es: 'Tabla de ubicaciones programadas para el programa' },
  gridHeader: {
    "program_day_date": {"label_en": "Date", "label_es": "Fecha", "sort": false, "filter": true, "width": "16%"},
    "area": {"label_en": "Area", "label_es": "Area", "sort": false, "filter": true, "width": "16%"},
    "location_name": {"label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true, "width": "16%"},
    "spec_variation_name": {"label_en": "Variation", "label_es": "Variación", "sort": false, "filter": true, "width": "16%"},
    "spec_analysis_variation": {"label_en": "Analysis Variation", "label_es": "Análisis de Variación", "sort": false, "filter": true, "width": "16%"},
    "sample_id": {"label_en": "Sample", "label_es": "Muestra", "sort": false, "filter": true, "width": "15%"}
  }
}

export class ConfigCalendar extends CoreView {
  static get styles() {
    return [Layouts,
      super.styles,
      css`
        mp-calendar {
          --main-bg: #fff;
          --header-bg: rgba(6, 143, 189, 0.85);
          --main-header-color: #fff;
          --header-icon-bg: #fff;
          --labels-color: #068fbd;
          --border-width: 1px;
          --border-right-width: 0;
          --border-color: rgba(6, 143, 189, 0.15);
          --prev-days-color: #068fbd;
          --curr-days-color: #068fbd;
          --next-days-color: #068fbd;
          --disabled-color: rgba(6, 143, 189, 0.3);
          --disabled-text-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
          --selected-day-bg: #078dc0;
          --today-boxshadow-color: #077599;
          --selected-day-hover-bg: rgba(6, 143, 189, 0.7);
        }
        @media (max-width: 460px) {
          vaadin-grid {
            font-size: 10px;
          }
          vaadin-grid-cell-content {
            padding: 5px;
          }
        }
      `
    ];
  }

  static get properties() {
    return {
      selectedCalendarSamples: { type: Array },
      gridItems: { type: Array },
      filteredItems: { type: Array },
      monthsLabels: { type: Array },
      daysLabels: { type: Array },
      startDayNumber: { type: String }
    };
  }

  constructor() {
    super()
    this.gridItems = []
    this.filteredItems = []
    this.selectedCalendarSamples = []
  }

  tabView() {
    return html`
    <mp-calendar-ext 
      @chosen-changed=${this.dateChosen}
      show-days-in-month="42" 
      disable-prev-days="true" disable-next-days="true" theme="light-blue"
      disabled-days='["Saturday", "Sunday"]'></mp-calendar-ext>
    <h2>${langConfig.headerTitle["label_" + this.lang]}
      ${this.selectedProgram&&this.selectedProgram.name}</h2>
    <vaadin-grid .items=${this.filteredItems} theme="row-dividers" column-reordering-allowed multi-sort @active-item-changed=${e =>
       this.selectedCalendarSamples = e.detail.value ? [e.detail.value] : []}
      .selectedItems="${this.selectedCalendarSamples}">
      <vaadin-grid-selection-column></vaadin-grid-selection-column>
      ${this.gridList()}
    </vaadin-grid>
    `;
  }

  get calendar() {
    return this.shadowRoot.querySelector("mp-calendar-ext")
  }

  get grid() {
    return this.shadowRoot.querySelector("vaadin-grid")
  }

  gridList() {
    return Object.entries(langConfig.gridHeader).map(
      ([key, value], i) => html`
        ${langConfig.gridHeader[key].sort ?
        this.sortColumn(key, value, i) :
        this.filterColumn(key, value, i)
        }
      `
    )
  }

  sortColumn(key, value, i) {
    return html`
      ${this.desktop ?
        html`
          ${i == 0 ?
            html`${langConfig.gridHeader[key].width ?
              html`<vaadin-grid-sort-column width="${langConfig.gridHeader[key].width}" resizable
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                text-align="${langConfig.gridHeader[key].align ? langConfig.gridHeader[key].align : 'end'}" path="${key}"
                header="${value['label_' + this.lang]}"></vaadin-grid-sort-column>` :
              html`<vaadin-grid-sort-column flex-grow="0"
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                text-align="${langConfig.gridHeader[key].align ? langConfig.gridHeader[key].align : 'end'}" path="${key}"
                header="${value['label_' + this.lang]}"></vaadin-grid-sort-column>`
            }` :
            html`${langConfig.gridHeader[key].width ?
              html`<vaadin-grid-sort-column width="${langConfig.gridHeader[key].width}" resizable path="${key}"
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                header="${value['label_' + this.lang]}"></vaadin-grid-sort-column>` :
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                resizable auto-width path="${key}" header="${value['label_' + this.lang]}">
              </vaadin-grid-sort-column>`
            }`
          }
        ` :
        html`<vaadin-grid-sort-column 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          resizable width="65px" path="${key}" header="${value['label_' + this.lang]}"></vaadin-grid-sort-column>`
      }
    `
  }

  filterColumn(key, value, i) {
    return html`
      ${this.desktop ?
        html`
          ${i == 0 ?
            html`${langConfig.gridHeader[key].width ?
              html`<vaadin-grid-filter-column width="${langConfig.gridHeader[key].width}" resizable
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                text-align="${langConfig.gridHeader[key].align ? langConfig.gridHeader[key].align : 'end'}" path="${key}"
                header="${value['label_' + this.lang]}"></vaadin-grid-filter-column>` :
              html`<vaadin-grid-filter-column flex-grow="0"
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                text-align="${langConfig.gridHeader[key].align ? langConfig.gridHeader[key].align : 'end'}" path="${key}"
                header="${value['label_' + this.lang]}"></vaadin-grid-filter-column>`
                }` :
            html`${langConfig.gridHeader[key].width ?
              html`<vaadin-grid-filter-column width="${langConfig.gridHeader[key].width}" resizable path="${key}"
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                header="${value['label_' + this.lang]}"></vaadin-grid-filter-column>` :
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                resizable auto-width path="${key}" header="${value['label_' + this.lang]}">
              </vaadin-grid-filter-column>`
            }`
          }
        ` :
        html`<vaadin-grid-filter-column 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          resizable width="65px" path="${key}" header="${value['label_' + this.lang]}"></vaadin-grid-filter-column>`
      }
    `
  }

  isConfidential(sample, key) {
    if (langConfig.gridHeader[key].confidential_value&&sample[key]) {
      return html`*****`
    } else {
      return html`${sample[key]}`
    }
  }

  setView() {
    if (this.lang == "es") {
      this.monthsLabels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      this.daysLabels = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
      this.startDayNumber = 1;
    } else {
      this.monthsLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      this.daysLabels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      this.startDayNumber = 0;
    }
    this.calendar.firstDayOfWeek = this.startDayNumber
    this.calendar.daysLabels = this.daysLabels
    this.calendar.monthsLabels = this.monthsLabels
    this.calendar.eventsObject = this.selectedProgram.config_scheduled_calendar
    this.gridItems = this.filteredItems = this.selectedProgram.config_scheduled_calendar
  }

  dateChosen(e) {
    this.filteredItems = this.gridItems.filter(item => item.program_day_date == e.detail.value)
  }
}
customElements.define('config-calendar', ConfigCalendar);