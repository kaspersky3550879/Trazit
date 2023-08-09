import { LitElement, html, css, nothing } from 'lit';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-button';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-textfield';
import '@material/mwc-formfield';
import '@material/mwc-checkbox';
import './datamining-tab';
import './datamining-data';
import {ButtonsFunctions} from '../components/Buttons/ButtonsFunctions';
import {FakeCOA} from '../0proc_models/RawMaterialCoaFake';
import '../components/ObjectByTabs/objecttabs-composition';
export class DataMiningMainView extends ButtonsFunctions(LitElement) {
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
      div#filterList {
        padding:8px;
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
      data: { type: Object },
      chartImgs: { type: Array },
      datatable:{type: Object},
      leftOpen:{type: Boolean},
      masterData: {type: Array},
      viewModelFromProcModel:{type: Object},
      coaTab:{type: Object},
      coaReportInfo:{type: Object},
      procInstanceName: { type: String },
      requestData: {type: Array},
    };
  }

  constructor() {
    super()
    this.desktop = true
    //this.model = {}
    this.tabList = []
    this.activeTab = {}
    this.sampleData = {}
    this.data = {}
    this.chartImgs = []
    this.leftOpen = true
    this.viewModelFromProcModel = {}
    this.coaTab ={
      "printable":{
        "printableTitleContent": true
      }
    }
    this.coaReportInfo={
      "report_info":[
        {"report_information":"This report is COA v1, released this model the 1st of July of 2022"
        }
      ]
    }   
    this.requestData=[]
    //this.activeTab=this.tabList[0] 
  }

  updated(updates) {
    if (updates.has('viewModelFromProcModel') && this.viewModelFromProcModel) {
      this.tabList = this.viewModelFromProcModel.tabs
      if (this.procName==="mp-release1"){
       // alert("yeee")
      }
    }
  }
  filterSize(){
    //let leftPane = this.shadowRoot.querySelector("div#leftSplit")
    let leftPane = this.shadowRoot.querySelector("sp-split-view#leftsplit")
    
    if (leftPane!==undefined){
      //leftPane.style.size="10"
      if (this.leftOpen){
        leftPane.primarySize="20"

      }else{
        leftPane.primarySize="300"
      }
      this.leftOpen=!this.leftOpen
    }else{
      //alert('not found')
    }
  }
  printPdfAll() {
      // Hide unnecessary elements
      document.querySelectorAll('.header, .footer').forEach(el => el.style.display = 'none');

      // Add page breaks
      const pages = document.querySelectorAll('.page');
      for (let i = 0; i < pages.length - 1; i++) {
        pages[i].style.pageBreakAfter = 'always';
      }

      // Print the document
      window.print();

      // Restore the original styles
      document.querySelectorAll('.header, .footer').forEach(el => el.style.display = '');
      pages.forEach(page => page.style.pageBreakAfter = '');
  }    

  xxxcoaheaderWithStyleBackup(){
    let coaData=FakeCOA
    return html`
    <style type="text/css">
    :host {
      font-family: Montserrat;
    }
    .document {
      page-break-after: always;
    }
  
    .title {
      font-size: 24pt;
      font-weight: bold;
      text-align: center;
      position: relative;
      top:-90px;
    }
    #firstline {
      height:120px;
    }
  
  
    .footer2 {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 0.5in;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    @media print {
      body * {
        visibility: hidden;
      }
      .header {
        position: fixed;
        top: 0;
        left: 0;
      }
      .footer {
        position: fixed;
        bottom: 0;
        left: 0;
      }    
      .document, .document * {
        visibility: visible;
      }
  
      .header, .footer {
        visibility: visible;
      }
      .content {
        margin-top: calc(var(--header-height) + 0.5in);
      }
      .document {
        position: static;
      }
    }  
  
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  
    .logo {
      margin-left:5px;
      margin-bottom: 20px;
      width: 1.5in;
      height: auto;    
    }
    .header {
      position:relative;
      top: 0;
      left: 0;
      right: 0;
      justify-content: center;
    }
    .form-header {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;
      margin-bottom:0.05in;
      padding-bottom: 20px;
    }  
    .form-fields {
      display: grid;
      grid-template-columns: max-content 1fr; 
      grid-gap: 10px;
      text-align: right;
      left:20px;
      position: relative;  
    }
    .form-fields.col2 {
      grid-column: 2;
    }
    .form-fields label {
      text-align: left;
    }
  
    .form-fields span {
      justify-self: start;
    }
  
    body {
      margin: 0;
    }
  
    .content {
      margin-top: calc(var(--header-height) + 0.5in);
    }
    .table-container {
      width: 100%;
    }
  
    .table-container table {
      width: inherit;
      /* Additional styles for the table */
    }  
    table{
      border: 1px solid black;
      width: calc(var(--header-width);
      border-top:0.5px solid black;
    }
    .table-container table thead{
      border: 1px solid black;
    }
    tr{
      border: 1px solid black;
    }  
    </style>  
    <div class="header">
    <div id="firstline">
      ${coaData.logo===undefined ? nothing: html`<img class="logo" src="${coaData.logo}" alt="Logo">`}      
      
      ${coaData.title2===undefined ? html`<h2 class="title">${coaData.title["label_"+this.lang]}</h2>`
        : html`<h2 class="title">${coaData.title["label_"+this.lang]}<br>${coaData.title2["label_"+this.lang]}</h2>`}
    </div>  
    ${coaData.header===undefined ? nothing: html`
      <div class="form-header">
        ${coaData.header.column===undefined ? nothing: html`
          <div class="form-fields col1">
          ${coaData.header.column.map(fld =>html`
            <label for="field1">${fld["label_"+this.lang]}</label>
            <span>${fld["value_"+this.lang]===undefined ? fld.value: fld["value_"+this.lang]}</span>
          `)}
          </div>    
        `}
        ${coaData.header.column2===undefined ? nothing: html`
          <div class="form-fields col2">
          ${coaData.header.column2.map(fld =>html`
            <label for="field1">${fld["label_"+this.lang]}</label>
            <span>${fld["value_"+this.lang]===undefined ? fld.value: fld["value_"+this.lang]}</span>
          `)}
          </div>    
        `}
  
      </div>  
    `}
  </div>
  
    `
  }
  xxxcoaResultsTableBackup(){
    let coaData=FakeCOA
    return html`
    ${coaData.resultsTable===undefined ? nothing: html` 
      <style>
      .table-container {
        width: 100%;
      }
    
      .table-container table {
        width: inherit;
        /* Additional styles for the table */
      }  
      table{
        border: 1px solid black;
        width: calc(var(--header-width);
        border-top:0.5px solid black;
      }
      .table-container table thead{
        border: 1px solid black;
      }
      tr{
        border: 1px solid black;
      }  
      </style>     
      <div class="table-container">   
        <table>
          <thead>
            <tr>
            ${coaData.resultsTable.header===undefined ? nothing: html` 
              ${coaData.resultsTable.header.map(fld =>html`
                <th>${fld["label_"+this.lang]===undefined ? fld.label: fld["label_"+this.lang]}</th>
              `)}
            `}
            </tr>
          </thead>
          <tbody>          
            ${coaData.resultsTable.values===undefined ? nothing: html`           
              ${coaData.resultsTable.values.map(row =>html`
              <tr>
                ${row.map(fld =>html`
                <td style="padding:5px;">${fld["value_"+this.lang]===undefined ? fld.value: fld["value_"+this.lang]}</td>
                `)}
              </tr>   
              `)}           
            `}
          </tbody>
        </table>
      </div>
    `}
    `
  }
  xxxcoaheader(){
    let coaData=FakeCOA
    return html`
    <div class="header">
    <div id="firstline">
      ${coaData.logo===undefined ? nothing: html`<img class="logo" src="${coaData.logo}" alt="Logo">`}      
      
      ${coaData.title2===undefined ? html`<h2 class="title">${coaData.title["label_"+this.lang]}</h2>`
        : html`<h2 class="title">${coaData.title["label_"+this.lang]}<br>${coaData.title2["label_"+this.lang]}</h2>`}
    </div>  
    ${coaData.header===undefined ? nothing: html`
      <div class="form-header">
        ${coaData.header.column===undefined ? nothing: html`
          <div class="form-fields col1">
          ${coaData.header.column.map(fld =>html`
            <label for="field1">${fld["label_"+this.lang]}</label>
            <span>${fld["value_"+this.lang]===undefined ? fld.value: fld["value_"+this.lang]}</span>
          `)}
          </div>    
        `}
        ${coaData.header.column2===undefined ? nothing: html`
          <div class="form-fields col2">
          ${coaData.header.column2.map(fld =>html`
            <label for="field1">${fld["label_"+this.lang]}</label>
            <span>${fld["value_"+this.lang]===undefined ? fld.value: fld["value_"+this.lang]}</span>
          `)}
          </div>    
        `}
  
      </div>  
    `}
  </div>
  
    `  
  }    


  xxxrenderCoaFran() {
    this.data=this.coaReportInfo
    this.activeTab=this.coaTab  
    return html`
    <style type="text/css">
    :host {
      font-family: Montserrat;
    }

    .document {
      page-break-after: always;
    }

    .title {
      font-size: 24pt;
      font-weight: bold;
      text-align: center;
      position: relative;
      top:-90px;
    }
    #firstline {
      height:120px;
    }


    .footer2 {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 0.5in;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media print {
      body * {
        visibility: hidden;
      }
      .header {
        position: fixed;
        top: 0;
        left: 0;
      }
      .footer {
        position: fixed;
        bottom: 0;
        left: 0;
      }    
      .document, .document * {
        visibility: visible;
      }

      .header, .footer {
        visibility: visible;
      }
      .content {
        margin-top: calc(var(--header-height) + 0.5in);
      }
      .document {
        position: static;
      }
    }  

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .logo {
      margin-left:5px;
      margin-bottom: 20px;
      width: 1.5in;
      height: auto;    
    }
    .header {
      position:relative;
      top: 0;
      left: 0;
      right: 0;
      justify-content: center;
      /*margin-bottom: 0.5in;*/
      /*border: 1px solid black;*/
      /*border-bottom:0.5px solid black; */
    }
    .form-header {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;
      margin-bottom:0.05in;
      padding-bottom: 20px;
    }  
    .form-fields {
      display: grid;
      grid-template-columns: max-content 1fr; 
      grid-gap: 10px;
      text-align: right;
      left:20px;
      position: relative;  
    }
    .form-fields.col2 {
      grid-column: 2;
    }
    .form-fields label {
      text-align: left;
    }

    .form-fields span {
      justify-self: start;
    }

    body {
      margin: 0;
    }

    .content {
      margin-top: calc(var(--header-height) + 0.5in);
    }
    .table-container {
      width: 100%;
    }

    .table-container table {
      width: inherit;
      /* Additional styles for the table */
    }  
    table{
      border: 1px solid black;
      width: calc(var(--header-width);
      /* border-top:0.5px solid black; */
    }
    .table-container table thead{
      /* border: 1px solid black; */
    }
    tr{
      /* border: 1px solid black; */
    }  
    </style>
    <button @click="${this.printCoa}" style="z-index: 999; position: relative;">Print PDF</button>
    
    <div class="document">
      
    ${this.coaheaderWithStyle()}
    ${this.coaResultsTable()}
      <div class="footer">
        <!-- Footer content goes here -->
        
      </div>
    </div>
  `;
  }

  xxxrenderByPages(){
    this.data=this.coaReportInfo
    this.activeTab=this.coaTab
    return html`
    <style>
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }

    .page {
      width: 8.5in;
      height: 11in;
      margin: 0 auto;
      padding: 0.5in;
      box-sizing: border-box;
      page-break-after: always;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    .page:before, .page:after {
      content: "";
      position: absolute;
      top: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-color: transparent;
      pointer-events: none;
    }

    .page:before {
      left: -10px;
      border-width: 0 0 11in 10px;
      box-shadow: -10px 0 10px -10px rgba(0, 0, 0, 0.5);
    }

    .page:after {
      right: -10px;
      border-width: 11in 0 0 10px;
      box-shadow: 10px 0 10px -10px rgba(0, 0, 0, 0.5);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.5in;
    }

    .logo {
      width: 2in;
      height: 1in;
      margin-right: 0.5in;
    }

    .title {
      font-size: 24pt;
      font-weight: bold;
      text-align: center;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 0.5in;
    }

    .table td, .table th {
      border: 1px solid #ccc;
      padding: 0.25in;
    }

    .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 0.5in;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .signature-block {
      margin-top: 1in;
      margin-bottom: 0.5in;
    }

    .signature {
      width: 3in;
      height: 1in;
      border: 1px solid #ccc;
      margin-right: 0.5in;
    }

    @media print {
      .page {
        box-shadow: none;
      }

      .page:before, .page:after {
        display: none;
      }

      .header, .footer {
        display: none;
      }
      body * {
        visibility: hidden;
      }

      .document, .document * {
        visibility: visible;
      }

      .header, .footer {
        visibility: visible;
      }

      .document {
        position: absolute;
        top: 0;
        left: 0;
      }      
      
    }
    </style>
    <button @click="${this.printPdf}">Print PDF</button>
    <mwc-icon-button icon="print" @click=${this.printCoa}></mwc-icon-button>     
<div class="document">
    <div class="page">
    <div class="header">
      <img class="logo" src="./images/logo.png" alt="Logo">
      <h1 class="title">My PDF Document</h1>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John Doe</td>
          <td>30</td>
          <td>New York</td>
        </tr>
        <tr>
          <td>Jane Doe</td>
          <td>25</td>
          <td>Los Angeles</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="page">
    <div class="header">
      <img class="logo" src="./images/logo.png" alt="Logo">
      <h1 class="title">My PDF Document</h1>
    </div>
    <div class="signature-block">
      <div class="signature">Fecha</div>
      <div class="signature"></div>
    </div>
    <div class="footer">
      Page 2 of 2
    </div>
  </div>
</div>
    `

  }
  //this.desktop

  render() {
    if (this.activeTab!==undefined&&this.activeTab.filter!==undefined&&this.activeTab.filter.filterField!==undefined){
      console.log(this.activeTab.filter.filterField)
    }
    
    return html`    
      ${1==1 ?
        html`
        <sp-split-view id="leftsplit" resizable primary-size="120">
          <div id="leftSplit">
            <datamining-tab @tab-changed=${this.tabChanged} .viewModelFromProcModel=${this.viewModelFromProcModel} 
              .lang=${this.lang}              .tabs=${this.tabList}></datamining-tab>
            <div id="filterList" class="layout flex vertical">
            ${!this.activeTab||!this.activeTab.filter||!this.activeTab.filter.filterFields ?
              html``: html`
                ${this.activeTab.filter.filterFields.map((fld, i) =>             
                  html`
                    ${!fld.text1 ?
                        html``: html`        
                        <div class="layout horizontal flex center-center">
                        <mwc-textfield class="layout flex" id="text1" type="text" .value=${fld.text1.default_value ? fld.text1.default_value : ''} label="${fld.text1["label_" + this.lang]}" 
                          @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                        </div>
                    `}          
                    ${!fld.text2 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="text2" type="text" .value=${fld.text2.default_value ? fld.text2.default_value : ''} label="${fld.text2["label_" + this.lang]}" 
                        @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}          
                    ${!fld.text3 ?
                        html``: html`        
                        <div class="layout horizontal flex center-center">
                        <mwc-textfield class="layout flex" id="text3" type="text" .value=${fld.text3.default_value ? fld.text3.default_value : ''} label="${fld.text3["label_" + this.lang]}" 
                          @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                        </div>
                    `}                       
                    ${!fld.text4 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="text4" type="text" .value=${fld.text4.default_value ? fld.text4.default_value : ''} label="${fld.text4["label_" + this.lang]}" 
                        @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}          
                    ${!fld.text5 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="text5" type="text" .value=${fld.text5.default_value ? fld.text5.default_value : ''} label="${fld.text5["label_" + this.lang]}" 
                        @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}          
                    ${!fld.text6 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="text6" type="text" .value=${fld.text6.default_value ? fld.text6.default_value : ''} label="${fld.text6["label_" + this.lang]}" 
                        @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}          
                    ${!fld.text7 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="text7" type="text" .value=${fld.text7.default_value ? fld.text7.default_value : ''} label="${fld.text7["label_" + this.lang]}" 
                        @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}          
                    ${!fld.text8 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="text8" type="text" .value=${fld.text8.default_value ? fld.text8.default_value : ''} label="${fld.text8["label_" + this.lang]}" 
                        @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}          
                    ${!fld.text9 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="text9" type="text" .value=${fld.text9.default_value ? fld.text9.default_value : ''} label="${fld.text9["label_" + this.lang]}" 
                        @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}          
                    ${!fld.text10 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="text10" type="text" .value=${fld.text10.default_value ? fld.text10.default_value : ''} label="${fld.text10["label_" + this.lang]}" 
                        @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}                              
                    ${!fld.number1 ?
                        html``: html`        
                        <div class="layout horizontal flex center-center">
                        <mwc-textfield class="layout flex" id="number1" type="number" 
                        .value=${fld.number1.default_value ? fld.number1.default_value : ''} label="${fld.number1["label_" + this.lang]}"
                        @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                        </div>
                    `}   
                    ${!fld.number2 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="number2" type="number" 
                      .value=${fld.number2.default_value ? fld.number2.default_value : ''}   label="${fld.number2["label_" + this.lang]}"
                      @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}   
                    ${!fld.number3 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="number3" type="number" 
                      .value=${fld.number3.default_value ? fld.number3.default_value : ''}   label="${fld.number3["label_" + this.lang]}"
                      @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}   
                    ${!fld.number4 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="number4" type="number" 
                      .value=${fld.number4.default_value ? fld.number4.default_value : ''}   label="${fld.number4["label_" + this.lang]}"
                      @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}   
                    ${!fld.number5 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="number5" type="number" 
                      .value=${fld.number5.default_value ? fld.number5.default_value : ''}   label="${fld.number5["label_" + this.lang]}"
                      @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}   
                    ${!fld.number6 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="number6" type="number" 
                      .value=${fld.number6.default_value ? fld.number6.default_value : ''}   label="${fld.number6["label_" + this.lang]}"
                      @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}   
                    ${!fld.number7 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="number7" type="number" 
                      .value=${fld.number7.default_value ? fld.number7.default_value : ''}   label="${fld.number7["label_" + this.lang]}"
                      @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}   
                    ${!fld.number8 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="number8" type="number" 
                      .value=${fld.number8.default_value ? fld.number8.default_value : ''}   label="${fld.number8["label_" + this.lang]}"
                      @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}   
                    ${!fld.number9 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="number9" type="number" 
                      .value=${fld.number9.default_value ? fld.number9.default_value : ''}   label="${fld.number9["label_" + this.lang]}"
                      @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}   
                    ${!fld.number10 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="number10" type="number" 
                      .value=${fld.number10.default_value ? fld.number10.default_value : ''}   label="${fld.number10["label_" + this.lang]}"
                      @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}   
                    ${!fld.checkbox1 ?
                      html``: html`                              
                        <mwc-formfield label="${fld.checkbox1["label_" + this.lang]}">
                          <mwc-checkbox id="checkbox1" 
                            ?checked=${fld.checkbox1.default_value===undefined ? false : fld.checkbox1.default_value}
                            @change=${e => { this.checkbox1.value=this.checkbox1.checked}}
                            value="${fld.checkbox1.default_value}"
                          ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                      ${!fld.checkbox2 ?
                        html``: html`        
                          <mwc-formfield label="${fld.checkbox2["label_" + this.lang]}">
                            <mwc-checkbox id="checkbox2" 
                            ?checked=${fld.checkbox2.default_value===undefined ? false : fld.checkbox2.default_value}
                            @change=${e => { this.checkbox2.value=this.checkbox2.checked}}
                            value="${fld.checkbox2.default_value}"
                        ></mwc-checkbox>
                          </mwc-formfield>
                      `}                              
                      ${!fld.checkbox3 ?
                        html``: html`        
                          <mwc-formfield label="${fld.checkbox3["label_" + this.lang]}">
                            <mwc-checkbox id="checkbox3" 
                            ?checked=${fld.checkbox3.default_value===undefined ? false : fld.checkbox3.default_value}
                            @change=${e => { this.checkbox3.value=this.checkbox3.checked}}
                            value="${fld.checkbox3.default_value}"
                        ></mwc-checkbox>
                          </mwc-formfield>
                      `}                              
                      ${!fld.checkbox4 ?
                        html``: html`        
                          <mwc-formfield label="${fld.checkbox4["label_" + this.lang]}">
                            <mwc-checkbox id="checkbox4" 
                            ?checked=${fld.checkbox4.default_value===undefined ? false : fld.checkbox4.default_value}
                            @change=${e => { this.checkbox4.value=this.checkbox4.checked}}
                            value="${fld.checkbox4.default_value}"
                        ></mwc-checkbox>
                          </mwc-formfield>
                      `}                              
                      ${!fld.checkbox5 ?
                        html``: html`        
                          <mwc-formfield label="${fld.checkbox5["label_" + this.lang]}">
                            <mwc-checkbox id="checkbox5" 
                            ?checked=${fld.checkbox5.default_value===undefined ? false : fld.checkbox5.default_value}
                            @change=${e => { this.checkbox5.value=this.checkbox5.checked}}
                            value="${fld.checkbox5.default_value}"
                        ></mwc-checkbox>
                          </mwc-formfield>
                      `}                              
                      ${!fld.checkbox6 ?
                        html``: html`        
                          <mwc-formfield label="${fld.checkbox6["label_" + this.lang]}">
                            <mwc-checkbox id="checkbox6" 
                            ?checked=${fld.checkbox6.default_value===undefined ? false : fld.checkbox6.default_value}
                            @change=${e => { this.checkbox6.value=this.checkbox6.checked}}
                            value="${fld.checkbox6.default_value}"
                        ></mwc-checkbox>
                          </mwc-formfield>
                      `}                              
                      ${!fld.checkbox7 ?
                        html``: html`        
                          <mwc-formfield label="${fld.checkbox7["label_" + this.lang]}">
                            <mwc-checkbox id="checkbox7" 
                            ?checked=${fld.checkbox7.default_value===undefined ? false : fld.checkbox7.default_value}
                            @change=${e => { this.checkbox7.value=this.checkbox7.checked}}
                            value="${fld.checkbox7.default_value}"
                        ></mwc-checkbox>
                          </mwc-formfield>
                      `}                              
                      ${!fld.checkbox8 ?
                        html``: html`        
                          <mwc-formfield label="${fld.checkbox8["label_" + this.lang]}">
                            <mwc-checkbox id="checkbox8" 
                            ?checked=${fld.checkbox8.default_value===undefined ? false : fld.checkbox8.default_value}
                            @change=${e => { this.checkbox8.value=this.checkbox8.checked}}
                            value="${fld.checkbox8.default_value}"
                        ></mwc-checkbox>
                          </mwc-formfield>
                      `}                              
                      ${!fld.checkbox9 ?
                        html``: html`        
                          <mwc-formfield label="${fld.checkbox9["label_" + this.lang]}">
                            <mwc-checkbox id="checkbox9" 
                            ?checked=${fld.checkbox9.default_value===undefined ? false : fld.checkbox9.default_value}
                            @change=${e => { this.checkbox9.value=this.checkbox9.checked}}
                            value="${fld.checkbox9.default_value}"
                        ></mwc-checkbox>
                          </mwc-formfield>
                      `}                              
                      ${!fld.checkbox10 ?
                        html``: html`        
                          <mwc-formfield label="${fld.checkbox10["label_" + this.lang]}">
                            <mwc-checkbox id="checkbox10" 
                            ?checked=${fld.checkbox10.default_value===undefined ? false : fld.checkbox10.default_value}
                            @change=${e => { this.checkbox10.value=this.checkbox10.checked}}
                            value="${fld.checkbox10.default_value}"
                        ></mwc-checkbox>
                          </mwc-formfield>
                      `}                              

                      ${!fld.date1 ?
                        html``: html`        
                          <mwc-textfield id="date1" label="${fld.date1["label_" + this.lang]}" type="date"></mwc-textfield>
                      `}                              
                      ${!fld.date2 ?
                        html``: html`        
                          <mwc-textfield id="date2" label="${fld.date2["label_" + this.lang]}" type="date"></mwc-textfield>
                      `}   
                      
                      ${!fld.daterange1 ?
                        html``: html`    
                          <div style="display:flex">    
                            <mwc-textfield id="daterange1dateStart" label="${fld.daterange1.dateStart["label_" + this.lang]}" type="date"></mwc-textfield>
                            <mwc-textfield id="daterange1dateEnd" label="${fld.daterange1.dateEnd["label_" + this.lang]}" type="date"></mwc-textfield>
                          </div>
                      `}                       
                      ${!fld.daterange2 ?
                        html``: html`    
                          <div style="display:flex">    
                            <mwc-textfield id="daterange2dateStart" label="${fld.daterange2.dateStart["label_" + this.lang]}" type="date"></mwc-textfield>
                            <mwc-textfield id="daterange2dateEnd" label="${fld.daterange2.dateEnd["label_" + this.lang]}" type="date"></mwc-textfield>
                          </div>
                      `}                       
                      ${!fld.daterange3 ?
                        html``: html`    
                          <div style="display:flex">    
                            <mwc-textfield id="daterange3dateStart" label="${fld.daterange3.dateStart["label_" + this.lang]}" type="date"></mwc-textfield>
                            <mwc-textfield id="daterange3dateEnd" label="${fld.daterange3.dateEnd["label_" + this.lang]}" type="date"></mwc-textfield>
                          </div>
                      `}                       
                      ${!fld.daterange4 ?
                        html``: html`    
                          <div style="display:flex">    
                            <mwc-textfield id="daterange4dateStart" label="${fld.daterange4.dateStart["label_" + this.lang]}" type="date"></mwc-textfield>
                            <mwc-textfield id="daterange4dateEnd" label="${fld.daterange4.dateEnd["label_" + this.lang]}" type="date"></mwc-textfield>
                          </div>
                      `}                       
                      ${!fld.daterange5 ?
                        html``: html`    
                          <div style="display:flex">    
                            <mwc-textfield id="daterange5dateStart" label="${fld.daterange5.dateStart["label_" + this.lang]}" type="date"></mwc-textfield>
                            <mwc-textfield id="daterange5dateEnd" label="${fld.daterange5.dateEnd["label_" + this.lang]}" type="date"></mwc-textfield>
                          </div>
                      `}                       


                                             
                    

                    ${!fld.list1 ?
                    html``: html`        
                        <mwc-select id="list1" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.list1&&fld.list1["label_" + this.lang]}">
                        ${fld.list1.items.map((c, i) =>
                            html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
                        )}
                        </mwc-select>
                    `}  
                    ${!fld.listMDSamplerPersonalAreas ?
                      html``: html`        
                          <mwc-select id="listMDSamplerPersonalAreas" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listMDSamplerPersonalAreas&&fld.listMDSamplerPersonalAreas["label_" + this.lang]}">
                          ${this.masterData.samplerPersonalAreas.map((c, i) =>
                          html`<mwc-list-item value="${c.key}" ?selected=${i == 0}>${c["label_"+this.lang]}</mwc-list-item>`
                          )}
                          </mwc-select>
                    `}           

                    ${!fld.listMDprocedureUsers ?
                        html``: html`        
                            <mwc-select id="listMDprocedureUsers" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listMDprocedureUsers&&fld.listMDprocedureUsers["label_" + this.lang]}">
                            ${this.MDprocedureUsers.map((c, i) =>
                            html`<mwc-list-item value="${c.user_name}" ?selected=${i == 0}>${c.user_name}</mwc-list-item>`
                            )}
                            </mwc-select>
                    `}           
                    ${!fld.listMDvariablesSet ?
                      html``: html`        
                          <mwc-select id="listMDvariablesSet" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listMDvariablesSet&&fld.listMDvariablesSet["label_" + this.lang]}">
                          ${this.MDvariablesSet.map((c, i) =>
                          html`<mwc-list-item value="${c.name}" ?selected=${i == 0}>${c.name}(${c.variables_list})</mwc-list-item>`
                          )}
                          </mwc-select>
                    `}           
                    ${!fld.listMDvariables ?
                      html``: html`        
                          <mwc-select id="listMDvariables" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listMDvariables&&fld.listMDvariables["label_" + this.lang]}">
                          ${this.MDvariables.map((c, i) =>
                          html`<mwc-list-item value="${c.name}" ?selected=${i == 0}>${c.name}(${c.param_type})</mwc-list-item>`
                          )}
                          </mwc-select>
                    `}           
              
                    ${!fld.listSelectedStudyIndividuals ?
                        html``: html`        
                            <mwc-select id="listSelectedStudyIndividuals" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listSelectedStudyIndividuals&&fld.listSelectedStudyIndividuals["label_" + this.lang]}">
                            ${this.selectedStudy.study_individual.map((l, i) =>
                            html`<mwc-list-item value="${this.listItemValueToGet(fld.listSelectedStudyIndividuals, l)}" ?selected=${i == 0}>${this.listItemValueToDisplay(fld.listSelectedStudyIndividuals, l)}</mwc-list-item>`
                            )}
                            </mwc-select>
                    `}    
                    ${!fld.listSelectedStudyIndividualSamples ?
                      html``: html`        
                          <mwc-select id="listSelectedStudyIndividualSamples" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listSelectedStudyIndividualSamples&&fld.listSelectedStudyIndividualSamples["label_" + this.lang]}">
                          ${this.selectedStudy.study_individual.map((l, i) =>
                          html`<mwc-list-item value="${this.listItemValueToGet(fld.listSelectedStudyIndividualSamples, l)}" ?selected=${i == 0}>${this.listItemValueToDisplay(fld.listSelectedStudyIndividualSamples, l)}</mwc-list-item>`
                          )}
                          </mwc-select>
                    `} 
                  `            
                )}                                 
              `
            }
            <mwc-button raised label="Search" @click=${this.getQueryFilterData}></mwc-button>
            </div>
          </div>
          <div id="rightSplit" style="display:block;">
<!--              <div class="layout horizontal">
                <mwc-icon-button icon="print" @click=${this.print}></mwc-icon-button>                
              </div> -->
              <div id="document" style="display:block;">
              ${this.activeTab===undefined? nothing:html`
                <datamining-data id="mydata" .data=${this.requestData} .activeTab=${this.activeTab} lang=${this.lang}
                  dbName=${this.config.dbName} procName=${this.procName} .procInstanceName=${this.procInstanceName} .config=${this.config}
                  @chart-images=${e=>{this.chartImgs.push(e.detail.imgUri);this.requestUpdate()}}></datamining-data>

              `}  
              </div>        
          </div>
        </sp-split-view>
        ` :
        html`Coming Soon !`
      }
    `
  }

  get objecttabsComposition() {return this.shadowRoot.querySelector("objecttabs-composition")}  

  get kpidata() {    return this.shadowRoot.querySelector("div#kpidata")    }        
  get text1() {    return this.shadowRoot.querySelector("mwc-textfield#text1")    }        
  get text2() {    return this.shadowRoot.querySelector("mwc-textfield#text2")    }        
  get text3() {    return this.shadowRoot.querySelector("mwc-textfield#text3")    }        
  get text4() {    return this.shadowRoot.querySelector("mwc-textfield#text4")    }        
  get text5() {    return this.shadowRoot.querySelector("mwc-textfield#text5")    }        
  get text6() {    return this.shadowRoot.querySelector("mwc-textfield#text6")    }        
  get text7() {    return this.shadowRoot.querySelector("mwc-textfield#text7")    }        
  get text8() {    return this.shadowRoot.querySelector("mwc-textfield#text8")    }        
  get text9() {    return this.shadowRoot.querySelector("mwc-textfield#text9")    }        
  get text10() {    return this.shadowRoot.querySelector("mwc-textfield#text10")    }        
  get checkbox1() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox1")    }        
  get checkbox2() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox2")    }        
  get checkbox3() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox3")    }        
  get checkbox4() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox4")    }        
  get checkbox5() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox5")    }        
  get checkbox6() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox6")    }        
  get checkbox7() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox7")    }        
  get checkbox8() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox8")    }        
  get checkbox9() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox9")    }        
  get checkbox10() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox10")    }        
  get date1() {    return this.shadowRoot.querySelector("mwc-textfield#date1")    }        
  get date2() {    return this.shadowRoot.querySelector("mwc-textfield#date2")    }    
  get daterange1dateStart() {    return this.shadowRoot.querySelector("mwc-textfield#daterange1dateStart")    }        
  get daterange1dateEnd() {    return this.shadowRoot.querySelector("mwc-textfield#daterange1dateEnd")    }    
  get daterange2dateStart() {    return this.shadowRoot.querySelector("mwc-textfield#daterange2dateStart")    }        
  get daterange2dateEnd() {    return this.shadowRoot.querySelector("mwc-textfield#daterange2dateEnd")    }    
  get daterange3dateStart() {    return this.shadowRoot.querySelector("mwc-textfield#daterange3dateStart")    }        
  get daterange3dateEnd() {    return this.shadowRoot.querySelector("mwc-textfield#daterange3dateEnd")    }    
  get daterange4dateStart() {    return this.shadowRoot.querySelector("mwc-textfield#daterange4dateStart")    }        
  get daterange4dateEnd() {    return this.shadowRoot.querySelector("mwc-textfield#daterange4dateEnd")    }    
  get daterange5dateStart() {    return this.shadowRoot.querySelector("mwc-textfield#daterange5dateStart")    }        
  get daterange5dateEnd() {    return this.shadowRoot.querySelector("mwc-textfield#daterange5dateEnd")    }    
      
  get number1() {    return this.shadowRoot.querySelector("mwc-textfield#number1")    }    
  get number2() {    return this.shadowRoot.querySelector("mwc-textfield#number2")    }    
  get number3() {    return this.shadowRoot.querySelector("mwc-textfield#number3")    }    
  get number4() {    return this.shadowRoot.querySelector("mwc-textfield#number4")    }    
  get number5() {    return this.shadowRoot.querySelector("mwc-textfield#number5")    }    
  get number6() {    return this.shadowRoot.querySelector("mwc-textfield#number6")    }    
  get number7() {    return this.shadowRoot.querySelector("mwc-textfield#number7")    }    
  get number8() {    return this.shadowRoot.querySelector("mwc-textfield#number8")    }    
  get number9() {    return this.shadowRoot.querySelector("mwc-textfield#number9")    }    
  get number10() {    return this.shadowRoot.querySelector("mwc-textfield#number10")    }    

  get list1() {    return this.shadowRoot.querySelector("mwc-select#list1")    }
  get listMDSamplerPersonalAreas() {    return this.shadowRoot.querySelector("mwc-select#listMDSamplerPersonalAreas")    }
  
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

  get dataminingData() {
    return this.shadowRoot.querySelector("datamining-data#mydata")
  }

  tabChanged(e) {
    this.chartImgs = []
    this.sampleData = {}
    this.activeTab = e.target.selectedTab
  }

  xxxgetQueryFilterData(e) {
    // console.log('this.selectedItem', this.selectedItem)
    //if (Object.keys(this.selectedItem).length === 0){
    //if (!this.selectedItemLoaded){        
//      if (this.lottoget!==null&& this.lottoget.value!=='' && this.selectedItemLot!=this.lottoget.value){
      this.selectedItemLot=""
      this.GetViewData(false)
      if (this.requestData.length===1){
        if (Array.isArray(this.requestData)){
          this.selectedItem=this.requestData[0]
        }else{
          this.selectedItem={}
        }
        this.selectedItemLot=this.selectedItem.lot_name
        this.selectedItemLoaded=true
      }
//      }
  }
  getQueryFilterData() {
    console.log('getQueryFilterData')
    if (this.dataminingData!==null){
      this.dataminingData.data = {}
    }
    var extraParams=this.jsonParam(this.activeTab.filter) 
    let reqParams = {
      procInstanceName: this.procName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      dbName: this.config.dbName,
      schemaPrefix: this.procName, 
      actionName: this.activeTab.action, 
      ...this.activeTab.filter.fixParams,
      ...extraParams
    }
    let endPointUrl=this.getQueryAPIUrl(this.activeTab)
    if (String(endPointUrl).toUpperCase().includes("ERROR")){
      endPointUrl=(this.activeTab.endPoint ? this.activeTab.endPoint : this.config.EnvMonSampleAPIQueriesStats)
    }
    let params = this.config.backendUrl + endPointUrl
      + '?' + new URLSearchParams(reqParams)
    this.fetchApi(params).then(j => {
      if (j && !j.is_error) {
        this.data = j
        if (j.recovery_rate&&j.recovery_rate.data){
          this.data.recoveryrate_datatable={}
          this.data.recoveryrate_datatable.conf =[]
          for (let i=0;i<j.recovery_rate.columns_data.length;i++){
            let newItem={}
            newItem.property=j.recovery_rate.columns_data[i].name
            newItem.header=j.recovery_rate.columns_data[i].name
            this.data.recoveryrate_datatable.conf.push(newItem)          
          }
          this.data.recoveryrate_datatable.data = j.recovery_rate.data
        }
        if (j.datatable){
          this.sampleData=j.datatable
        }
        this.requestData=j
        if (this.dataminingData!==null){
          this.dataminingData.data = j
        }    
        this.chartImgs = []
      }
    })
  }

  setPrintContent() {
     //let header = `Report for the `
    // if (this.sampleData.sampleFieldToRetrieve) {
    //   header += `sample ${this.sampleData.sampleFieldToRetrieve.sample_id}`
    // } else if (this.sampleData.incubatorFieldToRetrieve) {
    //   header += `incubator ${this.sampleData.incubatorFieldToRetrieve.name}`
    // } else if (this.sampleData.batchFieldToRetrieve) {
    //   header += `batch ${this.sampleData.batchFieldToRetrieve.name}`
    // } else {
    //   header += `production lot ${this.sampleData.prodLotFieldToRetrieve.name}`
    // }
    let contentToPrint="Page Empty, nothing to print"
    let dataContent=this.shadowRoot.querySelector("div#kpidata")
    if (dataContent!==undefined&&dataContent!==null){
      contentToPrint=dataContent
    }
    this.printObj = {
      header: this.activeTab["label_"+this.lang],
      //content: this.setContent(header)
      content:contentToPrint
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

  xsampleContent(strContent) {
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

  xincubatorContent(strContent) {
    if (this.sampleData.incubatorFieldsToDisplay) {
      this.sampleData.incubatorFieldsToDisplay.forEach(d => {
        strContent += `<li>${d.field_name}: ${d.field_value}</li>`
      })
      strContent += this.chartContent()
    }
    return strContent
  }

  xbatchContent(strContent) {
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

  xlotContent(strContent) {
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

  documentForPrinter(elem, data) {
    console.log('data',data)
      return html`
      
        <style type="text/css">
        :host {
          font-family: Montserrat;
        }
        .document {
          page-break-after: always;
        }   
        .title {
          font-size: 24pt;
          font-weight: bold;
          text-align: center;
          position: relative;
          top:-90px;
        }
        #firstline {
          height:120px;
        }        
        .footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 0.5in;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      
        @media print {
          body * {
            visibility: hidden;
          }
          .header {
            position: fixed;
            top: 0;
            left: 0;
          }
          .footer {
            position: fixed;
            bottom: 0;
            left: 0;
          }    
          .document, .document * {
            visibility: visible;
          }
      
          .header, .footer {
            visibility: visible;
          }
          .content {
            margin-top: calc(var(--header-height) + 0.5in);
          }
          .document {
            position: static;
          }
          .header {
            border: 0px;
          }
        }  
      
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
      
        .logo {
          margin-left:5px;
          margin-bottom: 20px;
          width: 1.2in;
          height: auto;    
        }
        .header {
          position:relative;
          top: 0;
          left: 0;
          right: 0;
          justify-content: center;
          /* margin-bottom: 0.5in; */        
        }
        .form-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px;
          margin-bottom:0.05in;
          padding-bottom: 10px;
        }  
        .form-fields {
          display: grid;
          grid-template-columns: max-content 1fr; 
          grid-gap: 10px;
          text-align: right;
          left:20px;
          position: relative;  
        }
        .form-fields.col2 {
          grid-column: 2;
        }
        .form-fields label {
          text-align: left;
        }
      
        .form-fields span {
          justify-self: start;
        }
      
        body {
          margin: 0;
        }
      
        .content {
          margin-top: calc(var(--header-height) + 0.5in);
        }
        .table-container {
          width: 100%;
        }
      
        .table-container table {
          width: inherit;
          /* Additional styles for the table */
        }  
        table.pageformattable{
          border: 0px solid black;
          width: calc(var(--header-width);
          /* border-top:0.5px solid black; */
        }
        .pageformattable.table-container table thead{
          /*border: 1px solid black;*/
        }
        .pageformattable.tr{
          /*border: 1px solid black;*/
        }  
        .pageformattable.td{
          /*border: 1px solid black;*/
        }        
        </style>
        <mwc-icon-button icon="print" @click=${()=>{this.printCoa(data)}}></mwc-icon-button>   

        <div id="document" class="document">
          <div class="page-header" style="text-align: center; font-weight: bold;"></div>
          <div class="page-footer"></div>
          <table class="pageformattable">
            <thead>
              <tr><td>
                <div class="page-header-space">${this.coaheaderWithStyle(data)}</div>
              </td></tr>
            </thead>
            <tbody>
              <tr><td>            
                  <div class="page">
                    ${this.coaResultsTable(data)} ${this.resultsTableExtraTables(data)}                   
                  </div>
              </td></tr>
            </tbody>
            <tfoot>
              <tr><td>
                
              </td></tr>
            </tfoot>
          </table>
        </div>
        <div id="pagefooter" class="document">
        <div class="page-footer-space">${this.coaUsageDecision(data)}${this.coaSignatures(data)}</div>
        </div>
      `    
    }    

  print(){
    let litDatatable = this.dataminingData; //this.shadowRoot.querySelector('lit-datatable');

// Get the HTML content of the lit-datatable component
let datatableContent = litDatatable.innerHTML;

// Create a new window for printing
let printWindow = window.open('', '_blank');

// Write the content with footer to the print window
printWindow.document.write(`
  <html>
    <head>
      <!-- Add any necessary stylesheets or scripts here -->
    </head>
    <body>
      ${datatableContent}
      <!-- Add your custom footer content here -->
    </body>
  </html>
`);

// Close the document for writing
printWindow.document.close();

// Trigger the print dialog for the print window
printWindow.print();
  }

  cccprint(data){
    let coaData=data//FakeCOA
    this.setPrintContentCoa(data)
    let printWindow = window.open('', '', 'fullscreen=yes');
    printWindow.document.write(this.printObj.contentWithFooter);
    console.log('contentWithFooter', this.printObj.contentWithFooter)
    printWindow.document.title = "provisional_copy"; //coaData.report_info["provisional_copy_"+this.lang];     
    printWindow.document.close();
    setTimeout(function () {
      printWindow.print();
      printWindow.close();
    }, 500);
  }
 
  setPrintContentCoa(data) { 
    let headerData=''
    // //let headerDataDiv =this.shadowRoot.querySelectorAll("div#kpidata")
    // let headerDataDiv=this.kpidata //this.shadowRoot.querySelector("div#kpidata")
    
    // if (headerDataDiv!==undefined){
    //   headerData=headerDataDiv[0].outerHTML
    // }    
//let obj=this.dataminingData
//     let myComponent = document.querySelector('datamining-data#mydata'); // Assuming the LitElement component has a custom element tag 'my-component'
// let headerDataDiv = myComponent.shadowRoot.querySelector('lit-datatable');
//     if (headerDataDiv!==undefined){
//       headerDataDiv[0].style.border="0px solid";
//       headerData=headerDataDiv[0].outerHTML
//     }    
    headerData=this.dataminingData.outerHTML
    let pagerFooter='fiiii'
/*    let pagerFooterDiv =this.shadowRoot.querySelectorAll("div#pagefooter")
    if (pagerFooterDiv!==undefined){
        pagerFooter=pagerFooterDiv[0].outerHTML
    }    
*/
    console.log('object to print', headerData)
    this.printObj = {
      header: '.', //this.documentFooter(), //this.coaForInspectionLotHeader(),
      content: headerData, //this.coaForInspectionLotContent(),   
      contentWithFooter: `
      <html>
        <head>        
          <style>
            @media print {          
              title {
                color: red;
                display: none;
              }
              #print-header {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
              }
              #xxxpage-footer {
                position: fixed;
                bottom:0;
                right: 0;
                font-size: 12px;                              
              }                      
              div.document-footer {
                position: fixed;
                bottom: 0px;
                right: 0;
                font-size: 12px;                              
              }
              #content2 {                
                margin-top: calc(var(--header-height) + 10px);
                margin-bottom: 200px; /* calc(var(--footer-height) + 10px);*/
              }
              #print-content{
                margin-top: calc(var(--header-height) - 10px);
                margin-bottom: initial;
              }
              #print-document-footer{
                margin-bottom: initial;
              }                      
            }
          </style>
        </head>
        <body>                
            <div id="print-header"></div> 
            <div id="print-content">${headerData}</div>
            <div id="print-document-footer" class="print-document-footer">${pagerFooter}${this.documentFooter(data)}</div> 
        </body>
      </html>
    `         
    }
  }    
  documentFooter(data){
    return ``
  }
  xxxprint() {
    this.setPrintContent()
    var printWindow = window.open('', '', 'fullscreen=yes');
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
      return
    })
  }

  xxcoaForInspectionLotHeader(){
    if (this.activeTab.printable.printableTitleContent==undefined)
      return this.setContentFranCoa()
      if (this[this.activeTab.printable.printableTitleContent]!==undefined){
        return this[this.activeTab.printable.printableTitleContent]()
      }else{
        //alert(this.activeTab.printable.printableTitleContent+ ' not found')
      }    
    return "."
  }
  xxxcoaForInspectionLotContent(strPageHeader, strPageFooter) {
    //alert('setContentFinal')
    let headerData=''
    let headerDataDiv =this.shadowRoot.querySelectorAll("div.document")
    if (headerDataDiv!==undefined){
      headerDataDiv[0].style.border="0px solid";
      headerData=headerDataDiv[0].outerHTML
    }
    
    return headerData
    console.log('strPageFooter', strPageFooter)
    let session = JSON.parse(sessionStorage.getItem("userSession"))
    let sessionDate = session.appSessionStartDate
    let sessionUser = session.header_info.first_name +" "+ session.header_info.last_name +" ("+ session.userRole +")"    
    let chHtmlObj=this.coaheader()
    let strCoaheader='wola'+this.coaheader().innerText
    let strContent = ``//this.setPrintableContentControllerCoa()
    
    let str = `
      <style type="text/css">

      :host {
        font-family: Montserrat;
      }
      .document {
        page-break-after: always;
      }
    
      .title {
        font-size: 24pt;
        font-weight: bold;
        text-align: center;
        position: relative;
        top:-90px;
      }
      #firstline {
        height:120px;
      }
    
    
      .footer2 {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 0.5in;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    
      @media print {
        body * {
          visibility: hidden;
        }
        .header {
          position: fixed;
          top: 0;
          left: 0;
        }
        .footer {
          position: fixed;
          bottom: 0;
          left: 0;
        }    
        .document, .document * {
          visibility: visible;
        }
    
        .header, .footer {
          visibility: visible;
        }
        .content {
          margin-top: calc(var(--header-height) + 0.5in);
        }
        .document {
          position: static;
        }
      }  
    
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
    
      .logo {
        margin-left:5px;
        margin-bottom: 20px;
        width: 1.5in;
        height: auto;    
      }
      .header {
        position:relative;
        top: 0;
        left: 0;
        right: 0;
        justify-content: center;
        /*margin-bottom: 0.5in;*/
        border: 1px solid black;
        border-bottom:0.5px solid black; 
      }
      .form-header {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
        margin-bottom:0.05in;
        padding-bottom: 20px;
      }  
      .form-fields {
        display: grid;
        grid-template-columns: max-content 1fr; 
        grid-gap: 10px;
        text-align: right;
        left:20px;
        position: relative;  
      }
      .form-fields.col2 {
        grid-column: 2;
      }
      .form-fields label {
        text-align: left;
      }
    
      .form-fields span {
        justify-self: start;
      }
    
      body {
        margin: 0;
      }
    
      .content {
        margin-top: calc(var(--header-height) + 0.5in);
      }
      .table-container {
        width: 100%;
      }
    
      .table-container table {
        width: inherit;
        /* Additional styles for the table */
      }  
      table{
        border: 1px solid black;
        width: calc(var(--header-width);
        border-top:0.5px solid black;
      }
      .table-container table thead{
        border: 1px solid black;
      }
      tr{
        border: 1px solid black;
      }  
      
      .fran{

      }

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
       
      </div>

      <div class="page-footer">
        ${sessionUser} on ${sessionDate}<br>
        ${this.data.report_info[0].report_information}
      </div>
      <table>
      <thead>
        <tr>
          <td>
            <!--place holder for the fixed-position header-->
            <div class="page-header-space">${headerData}</div>
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
            <div class="page-footer-space">${strPageFooter}</div>
          </td>
        </tr>
      </tfoot>
    </table>
    `
    return str
  }  
  xxxsetPrintableContentControllerCoa(){
    if (this.activeTab.printable.printableContent==undefined)
      return this.setContentFranCoa()
      if (this[this.activeTab.printable.printableContent]!==undefined){
        return this[this.activeTab.printable.printableContent]()
      }else{
        //alert(this.activeTab.printable.printableContent+ ' not found')
      }    
    return this.setContentFinal()
  }
  xxxsetContentFranCoa() {
    alert('setContentFranCoa')
    let strContent =``
    let filterContent=``
    filterContent=this.myFilter()
    strContent =this.myCharts()
    let strContent2 =`` 
    strContent2=this.myTables()
    //let strCoaheader=this.printableCoaHeader()
    let strCoaheader=this.coaheader().innerText
    let str = `
      <style type="text/css">
      .page-header, .page-header-space {
        height: 50px;
        padding-top: 30px;
      }
      .page-header {
        display: flex;
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
      .styled-table {
        display: -webkit-inline-box;
        margin-top: 0px;
        margin-bottom: 3px;
        color: #4285f4;
        font-size:2vmin;
        border-collapse: collapse;
        margin: 25px 0;
        font-family: sans-serif;
        min-width: 400px;
        box-shadow: 0 0 20px #44cbe6;
      }            
      .styled-table thead tr {
        background-color: #2989d8;
        color: #ffffff;
        text-align: left;
      }   
      .styled-table th,
      .styled-table td {
        color: #032bbc; 
        padding: 12px 15px;
      }  
      .styled-table tbody tr {
        border-bottom: 1px solid #207cca;
      }
      .styled-table tbody tr:nth-of-type(even) {
        background-color: #c2f2ff5c;
      }
      .styled-table tbody tr:last-of-type {
        border-bottom: 2px solid #009879;
      }      
      .styled-table tbody tr.active-row {
        font-weight: bold;
        color: #009879;
      }

      </style>
eeee
      <div class="page-header" style="text-align: center; font-weight: bold;">      
      </div>

      <div class="page-footer">
        
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
            <div class="page">${strCoaheader}</div>
            <div class="page">${strContent2}</div>
            
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
  xxxprintableCoaHeader(){
    let content=`` 
    let dataContentChart =this.shadowRoot.querySelectorAll("div.header")    
    content += dataContentChart
    return content
  }
  xxxmyCharts(){
    let content=`` 
    let dataContentChart =this.shadowRoot.querySelectorAll("google-chart")    
    if (dataContentChart!==undefined){
      //let imgs = `` // ${this.kpiStyleByStringAttribute("div", undefined)}
      content += `<div style="display:flex;">`  
      for (var i=0;i<dataContentChart.length;i++){
        content += `<img src="${dataContentChart[i].imageURI}" style="margin-bottom=10px;"><br>`
      }
      content += `</div>`

    }
    return content    
  }
  xxxmyFilter(){
    let content=`` 
    console.log(this.data.filter_detail)
    if (this.data.filter_detail!=undefined){
      let filterContent=[]
      filterContent=this.data.filter_detail
      content += `<div style="display:flex;">` 
      for (var i=0;i<filterContent.length;i++){
        content += `${filterContent[i].filter_name}:${filterContent[i].value}`
      }    
      content += `</div>`
    }
    return content    
  }
 
  xxxmyTables(){    
    let strContent=`` 
    let dataContentTables =this.shadowRoot.querySelectorAll("lit-datatable")
    if (dataContentTables!==undefined){
      for (var i=0;i<dataContentTables.length;i++){
//        strContent += `<table border="1" cellpadding="3" style="border-collapse: collapse; width: 100%;">`
        strContent += `<table class="styled-table" >`
        strContent += `<tr>`
        dataContentTables[i].headers.forEach(f => {
          if (f.innerText) {
            strContent += `<th>${f.innerText}</th>`
          }
        })
        strContent += `</tr>`
        //strContent += `</td><td>`
        dataContentTables[i].table.forEach(row => {
          strContent += `<tr>`
          for (var col=0;col<row.columns.length;col++){
            var valToDisp=''                  
            if (row.columns[col].innerText) {
              valToDisp=row.columns[col].innerText
            }
            strContent += `<td>${valToDisp}</td>`             
          }
          strContent += `</tr>`
        })
        strContent += `</table>`
      }
    }
    return strContent    

  }
  xxxreportHeaderContentCoa(){
    let content=``
    //content += `<img height="50px" src="https://upload.wikimedia.org/wikipedia/en/3/3e/Tranzit_Group_logo%2C_New_Zealand.png" style="margin-bottom=10px;"><br>`
    content += `<div>`
    content += `hollla`
    content += `<p style="text-align: center;"><img height="50px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPwOK46iZVfnuBPpbQVbU7BRpc27BhtTkbgAQuF8AUyqxjBb-oTn1-5jxl8vg2_05FNvE&usqp=CAU" style="margin-bottom=10px;">` //${this.activeTab["label_"+this.lang]}</p>`       
    content +=`<td> ${this.activeTab["label_"+this.lang]}</p>`
    content += `</div>`
    return content
  }
  xxxreportFooterContentCoa(){    
    let content=``
    let session = JSON.parse(sessionStorage.getItem("userSession"))
    let sessionDate = session.appSessionStartDate
    let sessionUser = session.header_info.first_name +" "+ session.header_info.last_name +" ("+ session.userRole +")"

    content += `${sessionUser} on ${sessionDate}<br>`
    content += `${this.activeTab["label_"+this.lang]} system: ${this.dbName} Procedure: ${this.procName}`
    return content
  }

  resultsTableExtraTables(){
  if (1==1){return html``}  
  return html`
    <div class="content">
      <!-- Your report content goes here -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>DETERMINACION</th>
              <th>MÉTODO</th>
              <th>ESPECIFICACIÓN</th>
              <th>RESULTADO</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SOLUBILIDAD</td>
              <td>Fácilmente soluble en cloroformo, tolueno, acetona y metanol, casi insoluble en agua.</td>
              <td>PCC-MMP-125</td>
              <td>Cumple</td>
            </tr>
            <!-- Add more rows as needed -->
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>30</td>
              <td>New York</td>
            </tr>
            <!-- Add more rows as needed -->
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>30</td>
              <td>New York</td>
            </tr>
            <!-- Add more rows as needed -->
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>30</td>
              <td>New York</td>
            </tr>
            <!-- Add more rows as needed -->
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>30</td>
              <td>New York</td>
            </tr>
            <!-- Add more rows as needed -->
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>30</td>
              <td>New York</td>
            </tr>
            <!-- Add more rows as needed -->
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John1 Doe</td>
              <td>301</td>
              <td>New1 York</td>
            </tr>
            <tr>
              <td>John2 Doe</td>
              <td>302</td>
              <td>New2 York</td>
            </tr>
            <tr>
              <td>John3 Doe</td>
              <td>303</td>
              <td>New3 York</td>
            </tr>
            <tr>
              <td>John4 Doe</td>
              <td>303</td>
              <td>New3 York</td>
            </tr>
            <tr>
              <td>John5 Doe</td>
              <td>303</td>
              <td>New3 York</td>
            </tr>
            <tr>
              <td>John6 Doe</td>
              <td>303</td>
              <td>New3 York</td>
            </tr>
            <tr>
              <td>John7 Doe</td>
              <td>303</td>
              <td>New3 York</td>
            </tr>
            <tr>
              <td>John8 Doe</td>
              <td>303</td>
              <td>New3 York</td>
            </tr>
            <tr>
              <td>John9 Doe</td>
              <td>303</td>
              <td>New3 York</td>
            </tr>
            <tr>
              <td>John10 Doe</td>
              <td>303</td>
              <td>New3 York</td>
            </tr>
            <tr>
              <td>John11 Doe</td>
              <td>303</td>
              <td>New3 York</td>
            </tr>
            <tr>
              <td>John12 Doe</td>
              <td>303</td>
              <td>New3 York</td>
            </tr>
            <tr>
              <td>John13 Doe</td>
              <td>303</td>
              <td>New3 York</td>
            </tr>
            <tr>
              <td>John14 Doe</td>
              <td>303</td>
              <td>New3 York</td>
            </tr>
            <tr>
              <td>John15 Doe</td>
              <td>303</td>
              <td>New3 York</td>
            </tr>

            <!-- Add more rows as needed -->
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Johnwwwww Doe</td>
              <td>30</td>
              <td>Newwwwwwww York</td>
            </tr>
            <!-- Add more rows as needed -->
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Citykkkkkk</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>30</td>
              <td>New Yorkkkkkkkk</td>
            </tr>
            <!-- Add more rows as needed -->
          </tbody>
        </table>
      </div>
    </div>
    `
  }
  
  
  
    

  renderCoaMovedToCoaView() {
    return html`
    
      <style type="text/css">
      :host {
        font-family: Montserrat;
      }
      .document {
        page-break-after: always;
      }   
      .title {
        font-size: 24pt;
        font-weight: bold;
        text-align: center;
        position: relative;
        top:-90px;
      }
      #firstline {
        height:120px;
      }        
      .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 0.5in;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    
      @media print {
        body * {
          visibility: hidden;
        }
        .header {
          position: fixed;
          top: 0;
          left: 0;
        }
        .footer {
          position: fixed;
          bottom: 0;
          left: 0;
        }    
        .document, .document * {
          visibility: visible;
        }
    
        .header, .footer {
          visibility: visible;
        }
        .content {
          margin-top: calc(var(--header-height) + 0.5in);
        }
        .document {
          position: static;
        }
        .header {
          border: 0px;
        }
      }  
    
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
    
      .logo {
        margin-left:5px;
        margin-bottom: 20px;
        width: 1.5in;
        height: auto;    
      }
      .header {
        position:relative;
        top: 0;
        left: 0;
        right: 0;
        justify-content: center;
        /* margin-bottom: 0.5in; */        
      }
      .form-header {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
        margin-bottom:0.05in;
        padding-bottom: 20px;
      }  
      .form-fields {
        display: grid;
        grid-template-columns: max-content 1fr; 
        grid-gap: 10px;
        text-align: right;
        left:20px;
        position: relative;  
      }
      .form-fields.col2 {
        grid-column: 2;
      }
      .form-fields label {
        text-align: left;
      }
    
      .form-fields span {
        justify-self: start;
      }
    
      body {
        margin: 0;
      }
    
      .content {
        margin-top: calc(var(--header-height) + 0.5in);
      }
      .table-container {
        width: 100%;
      }
    
      .table-container table {
        width: inherit;
        /* Additional styles for the table */
      }  
      table.pageformattable{
        border: 0px solid black;
        width: calc(var(--header-width);
        /* border-top:0.5px solid black; */
      }
      .pageformattable.table-container table thead{
        /*border: 1px solid black;*/
      }
      .pageformattable.tr{
        /*border: 1px solid black;*/
      }  
      .pageformattable.td{
        /*border: 1px solid black;*/
      }        
      </style>
      <button @click="${this.printCoa}" style="z-index: 999; position: relative;">Print PDF</button>
      <div class="document">
        <div class="page-header" style="text-align: center; font-weight: bold;"></div>
        <div class="page-footer"></div>
        <table class="pageformattable">
          <thead>
            <tr><td>
              <div class="page-header-space">${this.coaheaderWithStyle()}</div>
            </td></tr>
          </thead>
          <tbody>
            <tr><td>            
                <div class="page">
                  ${this.coaResultsTable()} ${this.resultsTableExtraTables()}                   
                </div>
            </td></tr>
          </tbody>
          <tfoot>
            <tr><td>
              <div class="page-footer-space">${this.coaUsageDecision()}${this.coaSignatures()}</div>
            </td></tr>
          </tfoot>
        </table>
      </div>
    `    
  }    
  coaheaderWithStyle(){
    let coaData=FakeCOA
    return html`
    <style type="text/css">
    :host {
      font-family: Montserrat;
    }
    .title-header {
      font-size: 24pt;
      font-weight: bold;
      text-align: center;
      position: relative;
      top:-90px;
    }
    #firstline-header {
      height:120px;
    }
    .logo-header {
      margin-left:5px;
      margin-bottom: 20px;
      width: 1.5in;
      height: auto;    
    }
    .header-header {
      position:relative;
      top: 0;
      left: 0;
      right: 0;
      justify-content: center;
    }
    .form-header {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;
      margin-bottom:0.05in;
      padding-bottom: 20px;
    }  
    .form-fields {
      display: grid;
      grid-template-columns: max-content 1fr; 
      grid-gap: 10px;
      text-align: right;
      left:20px;
      position: relative;  
    }
    .form-fields.col2 {
      grid-column: 2;
    }
    .form-fields label {
      text-align: left;
    }

    .form-fields span {
      justify-self: start;
    }
    </style>  
    <div class="header-header">
    <div id="firstline-header">
      ${coaData.logo===undefined ? nothing: html`<img class="logo-header" src="${coaData.logo}" alt="Logo">`}      
      
      ${coaData.title2===undefined ? html`<h2 class="title-header">${coaData.title["label_"+this.lang]}</h2>`
        : html`<h2 class="title-header">${coaData.title["label_"+this.lang]}<br>${coaData.title2["label_"+this.lang]}</h2>`}
    </div>  
    ${coaData.header===undefined ? nothing: html`
      <div class="form-header">
        ${coaData.header.column===undefined ? nothing: html`        
          <div class="form-fields col1">
          ${coaData.header.column.map(fld =>html`
            <label for="field1">${fld["label_"+this.lang]}</label>
            <span>${fld["value_"+this.lang]===undefined ? fld.value: fld["value_"+this.lang]}</span>
          `)}
          </div>    
        `}
        ${coaData.header.column2===undefined ? nothing: html`
          <div class="form-fields col2">
          ${coaData.header.column2.map(fld =>html`
            <label for="field1">${fld["label_"+this.lang]}</label>
            <span>${fld["value_"+this.lang]===undefined ? fld.value: fld["value_"+this.lang]}</span>
          `)}
          </div>    
        `}

      </div>  
    `}
  </div>

    `
  }

  coaResultsTable(){
    let coaData=FakeCOA
    return html`
    ${coaData.resultsTable===undefined ? nothing: html` 
      <style>
      .table-container-results {
        width: 100%;
      }
    
      .table-container-results table {
        width: inherit;
        border: 0px solid black;
        /* Additional styles for the table */
      }  
      table{      
        width: calc(var(--header-width);
        border-top:0.5px solid black;
      }
      .table-container-results table thead{
        border: 0px solid black;
      }
      tr{
        border: 1px solid black;
      }  
      </style>     
      <div class="table-container-results">   
        <table>
          <thead>
            <tr>
            ${coaData.resultsTable.header===undefined ? nothing: html` 
              ${coaData.resultsTable.header.map(fld =>html`
                <th style="font-weight: bold; font-size:18px; border-bottom: 5px double black;">${fld["label_"+this.lang]===undefined ? fld.label: fld["label_"+this.lang]}</th>
              `)}
            `}
            </tr>
          </thead>
          <tbody>          
            ${coaData.resultsTable.values===undefined ? nothing: html`           
              ${coaData.resultsTable.values.map(row =>html`
              <tr>
                ${row.map(fld =>html`
                <td style="padding:5px;">${fld["value_"+this.lang]===undefined ? fld.value: fld["value_"+this.lang]}</td>
                `)}
              </tr>   
              `)}           
            `}
          </tbody>
        </table>
      </div>
    `}
    `
  }  
  coaUsageDecision(){
    let coaData=FakeCOA
    return html`
    ${coaData.usageDecision===undefined ? nothing: html` 
    <style>
      .usage-decision-container {
          padding: 30px;
          padding-left: 20px;
          font-size: 20px;
          font-weight: bold;          
      }
      .form-fields label {
        text-align: left;
      }

      .form-fields span {
        justify-self: start;
      }
    </style>
    <div class="usage-decision-container"> 
      <label for="field1">${coaData.usageDecision.label["label_"+this.lang]}</label>
      ${coaData.usageDecision.decided!==undefined&&coaData.usageDecision.decided===true ? html`    
        <span>${coaData.usageDecision.value["value_"+this.lang]===undefined ? coaData.usageDecision.value: coaData.usageDecision.value["value_"+this.lang]}</span>
      `:html`
        <span style="color:red;">${coaData.usageDecision.noDecision["label_"+this.lang]===undefined ? coaData.usageDecision.noDecision: coaData.usageDecision.noDecision["label_"+this.lang]}</span>
      `}
    </div>
    `}
    `
  }

  coaSignatures(){
    let coaData=FakeCOA
    return html`
    ${coaData.signatures===undefined ? nothing: html` 
    <style>
      .signature-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }

      .signature-box {
        border: 1px solid black;
        flex: 1 1 calc(30.33% - 20px);
        padding: 10px;
        text-align: center;
        max-width: calc(30.33% - 20px);
      }

      .signature-title {
        font-weight: bold;
      }

      .signature-name {
        margin-top: 20px;
        font-size: 18px;
      }

      .signature-date {
        margin-top: 10px;
        font-size: 14px;
      }

      .signature-box + .signature-box {
        margin-left: 10px;
      }
    </style>
    ${coaData.signatures===undefined ? nothing: html` 
    <div class="signature-container">      
      ${coaData.signatures.map(curSign =>html`
      <div class="signature-box">
        <div class="signature-title">${curSign.title["label_"+this.lang]}</div>

        ${curSign.manualsign!==undefined&&curSign.manualsign===true ? html`
          <div style="height: 100px; border: 1px dashed black; margin-top: 20px;"></div>
        `:nothing}

        ${curSign.signed!==undefined&&curSign.signed===true ?
        html`                    
          <div class="signature-name">${curSign.author["value_"+this.lang]}</div>
          <div class="signature-date">${curSign.date["value_"+this.lang]}</div>        
        `:html`
        <div class="signature-name" style="color:red;">${curSign.noSigned["label_"+this.lang]}</div>        
        `}
        ${curSign.manualsign!==undefined&&curSign.manualsign===false&&curSign.signElectronicallyPhrase!==undefined&&curSign.signed===true ? html`
          <div class="signature-name" style="font-style: italic; font-size:12px;">${curSign.signElectronicallyPhrase["label_"+this.lang]}</div>
        `:nothing}
      </div>  
      `)}
    </div>
    `}
    `}
    `
  }

  pageFooter(){
    let coaData=FakeCOA
    let session = JSON.parse(sessionStorage.getItem("userSession"))
    let sessionDate = session.appSessionStartDate
    let sessionUser = session.header_info.first_name +" "+ session.header_info.last_name +" ("+ session.userRole +")"    
    let footerText=`<i>${sessionUser} on ${sessionDate} `
    if (coaData.report_info!==undefined&&coaData.report_info.report_information!==undefined){
      footerText+=`${coaData.report_info.report_information["label_"+this.lang]}`
    }  
    footerText+=`</i>`
    return footerText
  }
  xxxprintCoa() {
    let coaData=FakeCOA
    this.setPrintContentCoa()
    let printWindow = window.open('', '', 'fullscreen=yes');
    printWindow.document.write(this.printObj.contentWithFooter);
    printWindow.document.title = coaData.report_info.provisional_report["label_"+this.lang];     
    printWindow.document.close();
    setTimeout(function () {
      printWindow.print();
      printWindow.close();
    }, 500);
  }
  

  xxxsetPrintContentCoa() { 
    let headerData=''
    let headerDataDiv =this.shadowRoot.querySelectorAll("div.document")
    if (headerDataDiv!==undefined){
      headerData=headerDataDiv[0].outerHTML
    }    
    //console.log('object to print', headerData)
    this.printObj = {
      header: '.', //this.pageFooter(), //this.coaForInspectionLotHeader(),
      content: headerData, //this.coaForInspectionLotContent(),   
      contentWithFooter: `
      <html>
        <head>        
          <style>
            @media print {
    
              title {
                color: red;
                display: none;
              }
              #header {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
              }
              #footer {
                position: fixed;
                bottom: 0px;
                right: 0;
                font-size: 12px;                              
              }
              #content2 {                
                margin-top: calc(var(--header-height) + 10px);
                margin-bottom: 200px; /* calc(var(--footer-height) + 10px);*/
              }
              #content{
                margin-top: calc(var(--header-height) - 10px);
                margin-bottom: initial;
              }
            }
          </style>
        </head>
        <body>
        
          <div id="header"></div> 
          <div id="content">${headerData}</div></div>
          <div id="footer" class="footer">${this.pageFooter()}</div>
        </body>
      </html>
    `         
    }
  }  

}
window.customElements.define('datamining-mainview', DataMiningMainView);