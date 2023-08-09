import { html, css } from 'lit';
import { CommonCore } from '@trazit/common-core';
import { CalendarUtilities } from './CalendarUtilities';
import { CalendarActions } from './CalendarActions';
import { CalendarDialogTemplate} from './CalendarDialogTemplate';
import { TrazitReactivateObjectsDialog} from './TrazitReactivateObjectsDialog';
import { ApiFunctions} from '@trazit/tr-procedures/src/components/Api/ApiFunctions';
import '@google-web-components/google-chart';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';


const viewInfoDefinition = {
  grid: {
    id: {"label_en": "Id", "label_es": "Id"},
    date: {"label_en": "Date", "label_es": "Fecha"},
    day_name: {"label_en":"Name", "label_es": "Nombre"},
    created_on: {"label_en":"Creation Date", "label_es": "F.Creación"},
    created_by: {"label_en": "Creator", "label_es": "Creador"}
  },
  selector: { 
    title: {"label_en": "Calendar Name", "label_es": "Calendario"}
  },
  calendarActions: [
    { "actionName": "NEW_CALENDAR",
      "selObjectVariableName": "selectedCalendar", 
      "endPoint": "/app/HolidayCalendarAPIactions",
      "endPointParams": [ 
        { "argumentName": "name", "element": "text1" },
        { "isAdhocField": true, "argumentName": "fieldName", "defaultValue": "description" },
        { "isAdhocField": true, "argumentName": "fieldValue", "element": "text2", "fieldType":"STRING" }
      ],
    "button": {
      "icon": "create_new_folder",
      "title": {
        "label_en": "Create", "label_es": "Crear"
      },
      requiresObjectSelected : false
    },   
    "dialogInfo": {
      "requiresDialog": true,
      "name": "genericFormDialog",
      "fields": {
        "text1": { "label_en": "New calendar name", "label_es": "Nombre nuevo calendario" },
        "text2": { "label_en": "Description", "label_es": "Descripción" },
      }
    }
    },    
    { "actionName": "DEACTIVATE_CALENDAR",
      "selObjectVariableName": "selectedCalendarDate", 
      "endPoint": "/app/HolidayCalendarAPIactions",
      "endPointParams": [ 
        { "argumentName": "name", "internalVariableSimpleObjName":"selectedCalendar", "internalVariableSimpleObjProperty":"code"}              
      ],
      "button": {
        "icon": "alarm_off",
        "title": {
          "label_en": "Deactivate", "label_es": "Desactivar"
        },
        requiresObjectSelected : false
      },   
    },    
    { "actionName": "REACTIVATE_CALENDAR",
      "endPoint": "/app/HolidayCalendarAPIactions",  
      "endPointParams": [
        { "argumentName": "name", "selObjectPropertyName": "code" }
      ],
      "clientMethod": "openReactivateObjectDialog",
      "button": {
        "icon": "alarm_add",
        "title": {
          "label_en": "Reactivate", "label_es": "Reactivar"
        },
        "requiresObjectSelected": false
      },
      "requiresDialog": true,
      "dialogInfo": {          
        "name": "reactivateObjectDialog",
        "fieldsObject": {
          "queryNumDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
          "objectName": { "label_en": "Calendar to reactivate", "label_es": "Calendario a Reactivar" }
        },    
        "listDefinition":{
          "keyFldName":"code",
          "eachEntryTextGenerator":[
            {"value": "Name: ", "type":"fix"}, {"value": "code", "type":"field"}, {"value": " (", "type":"fix"}, {"value": "description", "type":"field"}, {"value": ")", "type":"fix"} 
          ]
        },
        "viewQuery": {
          "actionName": "DEACTIVATED_HOLIDAY_CALENDARS_LAST_N_DAYS",
          "clientMethod": "getDeactivatedObjects",
          "endPoint": "/app/HolidayCalendarAPIqueries",
          "endPointParams": [
            { "argumentName": "numDays", "element": "queryNumDays", "fixValue": 7 }
          ]
        },
        "action": [            
        ]
      }
    },

  ],
  calendarDateActions: [
    { "actionName": "ADD_DATE_TO_CALENDAR",
    "requiresDialog": true,
    "xxxclientMethod": "newStudyIndividual",
    "selObjectVariableName": "selectedCalendar", 
    "endPoint": "/app/HolidayCalendarAPIactions",
    "endPointParams": [ 
      { "argumentName": "name", "internalVariableSimpleObjName":"selectedCalendar", "internalVariableSimpleObjProperty":"code"},
      { "argumentName": "dayName", "element": "text1" },
      { "argumentName": "newDate", "element": "date1" }
    ],
    "button": {
      "icon": "event_available",
      "title": {
        "label_en": "Add Date", "label_es": "Añadir Fecha"
      },
      requiresObjectSelected : false
    },   
    "dialogInfo": {
      "requiresDialog": true,
      "name": "genericFormDialog",
      "fields": {
        "text1": { "label_en": "Date Name", "label_es": "Nombre" },
        "date1": { "label_en": "Date", "label_es": "Fecha"}
      }
    }
    },
    { "actionName": "DELETE_DATE_FROM_GIVEN_CALENDAR",
      "selObjectVariableName": "selectedCalendarDate", 
      "endPoint": "/app/HolidayCalendarAPIactions",
      "endPointParams": [ 
        { "argumentName": "calendar", "internalVariableObjName":"selectedCalendarDate", "internalVariableObjProperty":"calendar_code", "ZZZselObjectPropertyName": "study"},
        { "argumentName": "date_id", "internalVariableObjName":"selectedCalendarDate", "internalVariableObjProperty":"id" },        
      ],
      "button": {
        "icon": "event_busy",
        "title": {
          "label_en": "Remove Date", "label_es": "Quitar Fecha"
        },
        requiresObjectSelected : true
      },   
    }     
  ]
};

 
export class HolidayCalendars extends (TrazitReactivateObjectsDialog(ApiFunctions(CalendarDialogTemplate(CalendarActions(CalendarUtilities((CommonCore))))))) {
  static get styles() {
    return [
      css`
      sp-split-view {
        height: calc(100vh - 150px);
      }
      #leftSplit {
        padding: 10px;
      }
      #endpointName {
        height: 100%;
        overflow-y : auto;
      }
      #leftSplit::-webkit-scrollbar, #rightSplit::-webkit-scrollbar, #endpointName::-webkit-scrollbar {
        display: none;
      }
      label {
        color: blue;
      }
      .ed {
        cursor: pointer;
      }
      div[hidden] {
        display: none;
      }
      @media (max-width: 460px) {
        #endpointName {
          height: calc(100vh - 180px);
        }
      }
      google-chart.calendarchart{
        height:180px;
      }
      mwc-icon-button#lang {        
        color : rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }
      mwc-button {        
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
      }            
      mwc-icon-button {        
        color : rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }        
      mwc-icon-button.disabledtrue{        
        color : red;
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }        
      mwc-icon-button#video {
        color : #FFFFFF;
        color : rgba(36, 192, 235, 1);
      }
      sp-button {
        background : #24C0EB;
        background : rgba(36, 192, 235, 1);
        border-color : inherit !important;
        border-radius : 35px;
        -moz-border-radius : 35px;
        -webkit-border-radius : 35px;
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        color : #FFFFFF;
        color : rgb(255, 255, 255);
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
        background: rgba(255, 255, 255, 0) none repeat scroll 0% 0%;
      }
      mwc-textfield.mdc-text-field {
        background-color :  #FFFFFF;
        background-color : rgb(255, 255, 255);     
      }
      mwc-textfield.mdc-textfield.mdc-floating-label {
        color: red; 
      }
      mwc-select {     
        width: 400px;  
        padding: 0 6px;
        --mdc-theme-primary : rgba(36, 192, 235, 1);
        --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
        --mdc-select-ink-color: rgb(47, 47, 47);
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
      }       `
    ]
  }

  static get properties() {
    return {
      docs: { type: Array },
      filterDocs: { type: Array },
      apis: { type: Array },
      calendars: { type: Array },
      selectedApis: { type: Array },
      selectedTxts: { type: Array },
      selectedCalendarDate: { type: Array },
      selectedCalendar: { type: Object },
      actionBeingPerformedModel:{type: Object},
      selectedItems: { type: Array },
    };
  }

  constructor() {
    super()
    this.docs = []
    this.filterDocs = []
    this.apis = []
    this.selectedApis = []
    this.selectedTxts = []
    this.calendars = []
    this.selectedCalendar = [{}]
    this.selectedCalendarDate = [],
    this.actionBeingPerformedModel={}
    this.selectedItems=[]    
  }
  calendarSelectorTitle(){
    return viewInfoDefinition.selector.title["label_"+this.lang]
  }
  listEntryLabel(entry){
    if (entry.description&&entry.description.length>0){
      return entry.code +' ('+entry.description+')'
    }else{
      return entry.code
    }
  }
  
  render() {
    return html`
      <div class="layout horizontal center flex wrap">      
        <mwc-icon-button icon="refresh" @click=${this.getHolidayCalendars}></mwc-icon-button>      
        <mwc-select style=" width: 600px;" outlined id="calendarsList" label="${this.calendarSelectorTitle()}" @change=${this.calendarChanged} ?hidden=${this.calendars.length<2}>
            ${this.calendars&&this.calendars.map((p,i) => 
              html`<mwc-list-item value="${p.code}" ?selected=${i==0}>${this.listEntryLabel(p)}</mwc-list-item>`
            )}
          </mwc-select>
          ${this.getButton(viewInfoDefinition.calendarActions, this.selectedCalendar)}
      </div>
      <h1>${this.getTitle()}</h1>

      ${this.getButton(viewInfoDefinition.calendarDateActions, this.selectedCalendarDate)}
      <div class="layout horizontal center flex wrap">  
        <google-chart class="calendarchart" type="calendar"></google-chart>
      </div>
      <vaadin-grid @active-item-changed=${this.selectItem} theme="row-dividers" column-reordering-allowed multi-sort
       .selectedItems="${this.selectedCalendarDate}" 
      >
        <vaadin-grid-selection-column auto-select frozen></vaadin-grid-selection-column>
        <vaadin-grid-sort-column path="id" .header="${viewInfoDefinition.grid.id["label_"+this.lang]}"></vaadin-grid-sort-column>
        <vaadin-grid-sort-column path="date" .header="${viewInfoDefinition.grid.date["label_"+this.lang]}"></vaadin-grid-sort-column>
        <vaadin-grid-filter-column path="day_name" .header="${viewInfoDefinition.grid.day_name["label_"+this.lang]}"></vaadin-grid-filter-column>
        <vaadin-grid-filter-column path="created_on" .header="${viewInfoDefinition.grid.created_on["label_"+this.lang]}"></vaadin-grid-filter-column>
        <vaadin-grid-filter-column path="created_by" .header="${viewInfoDefinition.grid.created_by["label_"+this.lang]}"></vaadin-grid-filter-column>
      </vaadin-grid>
      ${this.calendarDialogsTemplate()}
      ${this.reactivateObjectsDialog()} 
    `;
  }
    

  get grid() {return this.shadowRoot.querySelector("vaadin-grid")}
  get chart() {return this.shadowRoot.querySelector("google-chart")}
  getTitle(){
    if (this.selectedCalendar&&this.selectedCalendar.code){
      return this.selectedCalendar.description+'  ('+this.selectedCalendar.code+')'
    }else{
      return ''
    }
  }
  selectItem(e) {
    console.log('selectItem', e.detail.value)
    if (!e.detail.value) {
      this.selectedCalendarDate = []
      //this.histories = []
      return
    }
    // deselect old selected item if found
    if (this.selectedCalendarDate) {
      e.target.deselectItem(this.selectedCalendarDate)
    }
    this.selectedCalendarDate = []
    if (e.detail.value) {
      this.selectedCalendarDate.push(e.detail.value)
      this.requestUpdate()
    }
  }  
  calendarChanged(e) {
    //console.log('calendarChanged', e.target.value)
    let program = []
    this.selectedCalendarDate = []
    program=this.calendars.filter(p => p.code == e.target.value)
    if (program.length) {
      this.selectedCalendar = []
      this.selectedCalendar=program[0]
      this.grid.items=program[0].holidays_calendar_date
      this.setGoogleCalendarChart()
      this.requestUpdate()
    }
  }

  setGoogleCalendarChart() {
    let cols=[]
    cols=[{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }]
     
    this.chart.cols=cols 
    let options={}
    
    if (this.selectedCalendar){
      if (this.selectedCalendar.description){
        options.title=this.selectedCalendar.description
      }else{
        options.title=this.selectedCalendar.code
      }
    }
    options= {      
      width: 2000,
      height: 720,
      redFrom: 4,
      redTo: 5,
      yellowFrom:1,
      yellowTo: 3,
      minorTicks: 5,
      title: "",
      calendar: {
        dayOfWeekLabel: {
          fontName: 'Montserrat',
          fontSize: 12,
          color: '#24c0eb',
          bold: true,
          italic: true,
        },
        dayOfWeekRightSpace: 10,
        daysOfWeek: 'LMXJVSD',
        yearLabel: {
          fontName: 'Montserrat',
          fontSize: 32,
          color: '#24c0eb',
          bold: true,
          italic: true
        },
        monthOutlineColor: {
          stroke: '#24c0eb',
          strokeOpacity: 0.5,
          strokeWidth: 3
        },
        unusedMonthOutlineColor: {
            stroke: '#050B33',
            strokeOpacity: 0.8,
            strokeWidth: 1
        },                                                                           
      },
      underMonthSpace: 26,     
      noDataPattern: {
        backgroundColor: '#7ed2e9',
        color: '#EEF1FF'
      },
      legend: "none"
    }          
    this.chart.options=options
    let datas=[]
    datas=this.selectedCalendar.holidays_calendar_date
    let i;
    let datesArr=[];
    for (i = 0; i < datas.length; i++) { 
        console.log('i', i, datas[i].year);
        let newElement=[];
        newElement[0]=new Date(datas[i].date_year, datas[i].date_month-1, datas[i].date_dayOfMonth);
        newElement[1]=50 //datas[i].day_name
        datesArr[i]=newElement;                    
    }
    //console.log('datesArr', datesArr);
    this.chart.rows=datesArr
  }

  getHolidayCalendars() {
    let curCalendar=this.selectedCalendar
    if (curCalendar===undefined){return}
    this.fetchApi(this.config.backendUrl + this.config.HolidayCalendarAPIqueriesUrl + '?' + new URLSearchParams({
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      actionName: 'GET_ALL_HOLIDAY_DATES_LIST_ALL_CALENDARS'
    }), false).then(j => {
      if (j && !j.is_error) {
        this.calendars = j
        this.selectedCalendar=this.calendars[0]
        if (curCalendar.code!==undefined){
          let givenCalendar = this.calendars.filter(i => i.code == curCalendar.code)
          if (givenCalendar!==undefined){
            this.selectedCalendar=givenCalendar[0]
            this.grid.items=this.selectedCalendar.holidays_calendar_date
          }else{
            this.grid.items=this.calendars[0].holidays_calendar_date
          }
          this.setGoogleCalendarChart()
        }
      }
    })
    this.requestUpdate()
  }
  authorized() {
    super.authorized()
    this.getHolidayCalendars()
  }

}
