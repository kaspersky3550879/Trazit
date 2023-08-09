import { LitElement, html, css, nothing } from 'lit';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-icon';
import { GoogleChart } from '@google-web-components/google-chart';
import '@google-web-components/google-chart';
import {DataViews} from '../components/Views/DataViews';
import {DataMiningReportModel } from './datamining-reportmodel';

class DataMiningGoogleChartExt extends DataMiningReportModel(GoogleChart) {
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
customElements.define('datamining-datamining-google-chart-ext', DataMiningGoogleChartExt);

export class DataMiningData extends DataViews(LitElement) {
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
    console.log('render', 'activeTab', this.activeTab)
    return html`
    <div class="layout horizontal">
    ${this.activeTab&&this.activeTab.printable&&this.activeTab.printable.active===true ?
    html`
      <mwc-icon-button icon="print" @click=${this.print}></mwc-icon-button>                
    `: nothing}

    ${this.activeTab&&this.activeTab.download&&this.activeTab.download.active===true ?
      html`    
      <mwc-icon-button icon="download" @click=${this.downloadDataTableToCSV}></mwc-icon-button>                
    `: nothing}
    </div>

    <div id="kpidata">
    ${this.activeTab.reportElements===undefined ? nothing:html`

      ${this.activeTab.reportElements.map((block, i) =>    
        html`
          ${this.kpiElementsController(block, this.data)}
        `)}
    `    
    }
      <!-- ${Object.keys(this.data).length ?
        html`<json-viewer>${JSON.stringify(this.data)}</json-viewer>` :
        nothing
      } -->
      </div>
    `;
  }
  kpiDownloadButton(elem){
    html`
    <div class="layout horizontal flex wrap">
    </div>
    <div class="layout horizontal flex center-justified">
      <mwc-button label='Download Sample' @click=${this.downloadDataTableToCSV}></mwc-button>
    </div>
    ` 
  }
  xkpiElementsController(elemDef, data) {
    console.log('kpiElementsController', 'data', data, 'elemDef', elemDef)
    return html`${data&&elemDef ? 
      html`
        <div style="display:block">
          ${elemDef.map((elem, i) => 
            html`      
            
              ${elem.type==="reportTitle" ? this.kpiReportTitle(elem) : nothing}
              ${elem.type==="card" ? this.kpiCard(elem) : nothing}
              ${elem.type==="cardSomeElementsSingleObject" ? this.kpiCardSomeElementsSingleObject(elem, data) : nothing}
              ${elem.type==="cardSomeElementsRepititiveObjects" ? this.cardSomeElementsRepititiveObjects(elem, data) : nothing}              
              ${elem.type==="recovery_rate" ? this.kpiRecoveryRate(elem) : nothing}
              ${elem.type==="grid" ? this.kpiGrid(elem) : nothing}
              ${elem.type==="chart" ? this.kpiChartFran(elem) : nothing}   
              ${elem.type==="jsonViewer" ? this.jsonViewer(elem, data) : nothing}   
              ${(elem.includeChild===undefined||elem.includeChild===false) ? nothing :
                html`
                    ${this.kpiCardSomeElementsChild(elem, data)}
              `}              
              ${elem.type==="Report" ? this.ReportController(elem) : nothing}              
        </div>
        `
        )}      
      ` : nothing
    }`
  }

  kpiElementsController(elemDef = this.selectedTabModelFromProcModel, data = this.selectedItem) {
    if (this.selectedItem!==undefined){
      console.log(this.selectedItem.procInstanceName, 'kpiElementsController', 'data', data, 'elemDef', elemDef)
    }
    return html`${data&&elemDef&&Object.keys(data).length > 0 ?
      html`
        <div style="display:block">
          ${elemDef.map((elem, i) => 
            html`      
              ${elem.elements!==undefined? html`               
                ${elem.type==="reportTitle" ? this.kpiReportTitle(elem, data[elem.endPointResponseObject], false) : nothing}
                <div style="display: flex; flex-wrap: wrap; padding-left:30px;">        
                  ${elem.elements.map((elem2, i) =>
                    html`
                      ${elem2.type==="reportTitle" ? this.kpiReportTitleLvl2(elem2, data[elem.endPointResponseObject], true) : nothing}
                      ${elem2.type==="card" ? this.kpiCard(elem2, data[elem2.endPointResponseObject], true) : nothing}
                      ${elem2.type==="cardSomeElementsSingleObject" ? this.kpiCardSomeElementsSingleObject(elem2, data, true) : nothing}
                      ${elem2.type==="cardSomeElementsRepititiveObjects" ? this.cardSomeElementsRepititiveObjects(elem2, data, true) : nothing}              
                      ${elem2.type==="recovery_rate" ? this.kpiRecoveryRate(elem2, true) : nothing}
                      ${elem2.type==="grid" ? this.kpiGrid(elem2, data[elem2.endPointResponseObject], true) : nothing}
                      ${elem2.type==="chart" ? this.kpiChartFran(elem2, true) : nothing}   

                      ${elem2.type==="jsonViewer" ? this.jsonViewer(elem2, data, true): nothing}
                      ${elem2.type==="readOnlyTable" ? this.readOnlyTable(elem2, data, true): nothing}
                      ${elem2.type==="readOnlyTableByGroup" ? this.readOnlyTableByGroup(elem2, data, true): nothing}
                      ${elem2.type==="readOnlyTableByGroupAllInOne" ? this.readOnlyTableByGroupAllInOne(elem2, data, true): nothing}

                      ${elem2.type==="rolesAndActions"&&elem2.endPointResponseObject2!==undefined ? 
                        this.rolesAndActions(elem2, data[elem2.endPointResponseObject][elem2.endPointResponseObject2], true, this.lang) : nothing}
                      ${elem2.type==="rolesAndActions"&&elem2.endPointResponseObject2===undefined ? 
                        this.rolesAndActions(elem2, data[elem2.endPointResponseObject], true, this.lang) : nothing}   

                      ${elem2.type==="coa" ? this.coa(elem, data[elem.endPointResponseObject], true): nothing}
                        
                         
                      ${(elem2.includeChild===undefined||elem2.includeChild===false) ? nothing :
                        html`
                            ${this.kpiCardSomeElementsChild(elem2, data, true)}
                      `}              
                      ${elem2.type==="Report" ? this.ReportController(elem2, true) : nothing}
                      ${elem2.type==="testScripts" ? this.scripts(elem2, true) : nothing}

                    `
                  )} 
                </div>
              `: html`      
                ${elem.type==="reportTitle" ? this.kpiReportTitle(elem, data[elem.endPointResponseObject]) : nothing}
                ${elem.type==="card" ? this.kpiCard(elem, data[elem.endPointResponseObject]) : nothing}
                ${elem.type==="cardSomeElementsSingleObject" ? this.kpiCardSomeElementsSingleObject(elem, data) : nothing}
                ${elem.type==="cardSomeElementsRepititiveObjects" ? this.cardSomeElementsRepititiveObjects(elem, data) : nothing}              
                ${elem.type==="recovery_rate" ? this.kpiRecoveryRate(elem) : nothing}
                ${elem.type==="grid" ? this.kpiGrid(elem, data[elem.endPointResponseObject]) : nothing}
                ${elem.type==="chart" ? this.kpiChartFran(elem) : nothing}   
                ${elem.type==="jsonViewer" ? this.jsonViewer(elem, data, true): nothing}
                ${elem.type==="readOnlyTable" ? this.readOnlyTable(elem, data, true): nothing}
                ${elem.type==="readOnlyTableByGroup" ? this.readOnlyTableByGroup(elem, data, true): nothing}
                ${elem.type==="readOnlyTableByGroupAllInOne" ? this.readOnlyTableByGroupAllInOne(elem, data, true): nothing}

              ${elem.type==="rolesAndActions"&&elem.endPointResponseObject2!==undefined ? 
                this.rolesAndActions(elem, data[elem.endPointResponseObject][elem.endPointResponseObject2], true, this.lang) : nothing}
              ${elem.type==="rolesAndActions"&&elem.endPointResponseObject2===undefined ? 
                this.rolesAndActions(elem, data[elem.endPointResponseObject], true, this.lang) : nothing}   


                ${elem.type==="readOnlyTable"&&elem.endPointResponseObject2!==undefined&&data[elem.endPointResponseObject]!==undefined ? 
                  this.readOnlyTable(elem, data[elem.endPointResponseObject][elem.endPointResponseObject2]) : nothing}
                ${elem.type==="readOnlyTable"&&elem.endPointResponseObject2===undefined ? 
                  this.readOnlyTable(elem, data[elem.endPointResponseObject]) : nothing}
                
                ${(elem.includeChild===undefined||elem.includeChild===false) ? nothing :
                  html`
                      ${this.kpiCardSomeElementsChild(elem, data)}
                `}
                ${elem.type==="Report" ? this.ReportController(elem) : nothing}
                ${elem.type==="testScripts" ? this.scripts(elem, true) : nothing}
                ${elem.type==="coa" ? this.coa(elem, data[elem.endPointResponseObject], true): nothing}
                
              `
              }
        </div>
        `
        )}      
      ` : nothing
    }`
  }    
  
 xkpiCardSomeElementsChild(elem, data){
    console.log('kpiCardSomeElementsChild', 'elem.child', elem, 'data', data)
    return html`            
    ${elem===undefined||data===undefined ? html`nothing to do` :
        html`
        ${this.kpiElementsController(elem.child, data[elem.endPointResponseObject] )}
    `}`
}  

  static get properties() {
    return {
      lang: { type: String },
      data: { type: Object },
      chartH: { type: Number },
      chartW: { type: Number },
      dbName: {type: String},
      procName:{type: String}
    };
  }

  constructor() {
    super();
    this.data = {}
  }

  firstUpdated() {
    this.chartH = Math.round(window.innerHeight / 2)
    this.chartW = Math.round(this.offsetWidth - 40)
  }

  get chart1() {
    return this.shadowRoot.querySelector('datamining-google-chart-ext#chart1')
  }

  get chart2() {
    return this.shadowRoot.querySelector('datamining-google-chart-ext#chart2')
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

  getTraceabilityInfo(){
    let trackInfo = []
    let userSession = JSON.parse(sessionStorage.getItem("userSession"))
    //${userSession.header_info.first_name} ${userSession.header_info.last_name} (${userSession.userRole})<br></br
    trackInfo.push(['Traceability Info: '])
    trackInfo.push(['This file was created on', new Date(), 'by', userSession.header_info.first_name+' '+userSession.header_info.last_name])
    trackInfo.push(['KPI Name',  this.activeTab["label_"+this.lang], this.activeTab.action])
    trackInfo.push(['system',  this.dbName, 'Procedure', this.procName])
    trackInfo.push(['Data: '])
//    dbName: this.config.dbName,
//    schemaPrefix: this.procName, 
    return trackInfo
  }
  
  downloadDataTableToCSVv2() {
    let csvContent = "data:text/csv;charset=utf-8,"
    let header = [], contents = []
    contents = this.getTraceabilityInfo()
    for (let iElems=0; iElems<this.activeTab.download.elements.length; iElems++) {
        let iElemObj=this.activeTab.download.elements[iElems]
//      for (let i=0; i<this.data[this.activeTab.download.elements[iElems].elementName].length; i++) {
        if (this.data[iElemObj.elementName]) {
          if (this.activeTab.download.elements.header!==undefined){
            Object.entries(this.data[iElemObj.header][i]).map(([key]) => {
              header.push(key)
            })
            contents.push(header)
          }else{
            if (!header.length) {
              Object.entries(this.data[iElemObj.elementName]).map(([key]) => {
                header.push(key)
              })
              contents.push(header)
            }
          }
          let content = []
          if (iElemObj.values!==undefined){
            Object.entries(this.data[iElemObj.elementName][iElemObj.values]).map(([key, val]) => {
              content.push(val)
            })
          }else{
            Object.entries(this.data[iElemObj.elementName]).map(([key, val]) => {
              for (let i=0; i<this.data[this.activeTab.download.elements[iElems].elementName].length; i++) {
                content.push(val[i])
              }
            })
          }
          contents.push(content)
        }
//      }
    }
    console.log('contents', contents)
    return
    contents.forEach(rowArray => {
      let row = rowArray.join(",")
      csvContent += row + "\r\n";
    })
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");

    let currentDate = new Date();
    let cDay = currentDate.getDate()
    let cMonth = currentDate.getMonth() + 1
    let cYear = currentDate.getFullYear()

    link.setAttribute("href", encodedUri);
    link.setAttribute("download", this.activeTab["label_"+this.lang]+'_'+cYear+cMonth+cDay+".csv");
    link.click()
  }

  downloadDataTableToCSV() {
    console.log('this.activeTab', this.activeTab)
    let csvContent = "data:text/csv;charset=utf-8,"
    let header = [], contents = []
    contents = this.getTraceabilityInfo()
    for (let i=0; i<this.data[this.activeTab.download.elements[0].elementName].length; i++) {
      //if (this.data[this.activeTab.download.elements[0].elementName][i].spec_code) {
        if (!header.length) {
          Object.entries(this.data[this.activeTab.download.elements[0].elementName][i]).map(([key]) => {
            header.push(key)
          })
          contents.push(header)
        }
        let content = []
        Object.entries(this.data[this.activeTab.download.elements[0].elementName][i]).map(([key, val]) => {
          content.push(val)
        })        
        contents.push(content)
      //}
    }
    contents.forEach(rowArray => {      
      let row = rowArray.join(",")
      csvContent += row + "\r\n";
    })
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");

    let currentDate = new Date();
    let cDay = currentDate.getDate()
    let cMonth = currentDate.getMonth() + 1
    let cYear = currentDate.getFullYear()

    link.setAttribute("href", encodedUri);
    link.setAttribute("download", this.activeTab["label_"+this.lang]+'_'+cYear+cMonth+cDay+".csv");
    link.click()
  }

  openSample() {}

  
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
  printFran() {
    this.setPrintContent()
    let printWindow = window.open('', '', 'fullscreen=yes');
    printWindow.document.write(this.printObj.content);
    let strContent
    strContent += this.chartContent()
    let dataContentChart =this.shadowRoot.querySelector("google-chart#counter_range_eval")
    printWindow.document.write(dataContentChart.getImageURI());

    printWindow.document.title = 'Trazit-'+this.printObj.header;
    printWindow.document.close();
    setTimeout(function () {
      printWindow.print();
      printWindow.close();
    }, 500);
  }

  printFran(){
      let dataContent=this.shadowRoot.querySelector("div#kpidata")
      let dataContentChart =this.shadowRoot.querySelector("google-chart#counter_range_eval")
      console.log(dataContentChart.innerHTML)
      //var mywindow = window.open('', 'PRINT', 'height=400,width=600');
      var mywindow = window.open('', '', 'fullscreen=yes');
      mywindow.document.write('<html><head><title>' + document.title  + '</title>');
      mywindow.document.write('</head><body >');
      mywindow.document.write('<h1>' + document.title  + '</h1>');
      mywindow.document.write(dataContentChart.getImageURI());
      mywindow.document.write('</body></html>');

      mywindow.document.close(); // necessary for IE >= 10
      mywindow.focus(); // necessary for IE >= 10*/

      mywindow.print();
      mywindow.close();

      return true;    
  }
  setPrintContent() {
    let contentToPrint="Page Empty, nothing to print"
    let dataContent=this.shadowRoot.querySelector("div#kpidata")
    if (dataContent!==undefined&&dataContent!==null){contentToPrint=dataContent
    }
    console.log('object to print', contentToPrint)
    this.printObj = {
      header: this.setPrintableTitleContentController(),
      content: this.setPrintableContent()      
    }
  }


  reportHeaderContent(){
    let content=``
    //content += `<img height="50px" src="https://upload.wikimedia.org/wikipedia/en/3/3e/Tranzit_Group_logo%2C_New_Zealand.png" style="margin-bottom=10px;"><br>`
    content += `<div>`
    content += `<p style="text-align: center;"><img height="50px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPwOK46iZVfnuBPpbQVbU7BRpc27BhtTkbgAQuF8AUyqxjBb-oTn1-5jxl8vg2_05FNvE&usqp=CAU" style="margin-bottom=10px;">` //${this.activeTab["label_"+this.lang]}</p>`       
    content +=`<td> ${this.activeTab["label_"+this.lang]}</p>`
    content += `</div>`
    return content
  }
  reportFooterContent(){    
    let content=``
    let session = JSON.parse(sessionStorage.getItem("userSession"))
    let sessionDate = session.appSessionStartDate
    let sessionUser = session.header_info.first_name +" "+ session.header_info.last_name +" ("+ session.userRole +")"

    content += `${sessionUser} on ${sessionDate}<br>`
    content += `${this.activeTab["label_"+this.lang]} system: ${this.dbName} Procedure: ${this.procName}`
    return content
  }
  myCharts(){
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
  myFilter(){
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
  myTables(){    
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
  setContentFran() {
    let strContent =``
    let filterContent=``
    filterContent=this.myFilter()
    strContent =this.myCharts()
    let strContent2 =`` 
    strContent2=this.myTables()

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

      <div class="page-header" style="text-align: center; font-weight: bold;">      
        ${this.reportHeaderContent()}     
      </div>
      <div class="page-header" style="text-align: center; font-weight: bold;">      
        ${filterContent}
      </div>

      <div class="page-footer">
        ${this.reportFooterContent()}        
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

  ReportController(elem){    
    if (elem.reportModel==undefined){
      console.log('elem', elem)
      return html` No report specified`
    }
    if (this[elem.reportModel]!==undefined){
      return this[elem.reportModel]()
    }else{
      alert(elem.reportModel+ ' not found')
    }    
    return ""    
  }  
  setPrintableTitleContentController(){
    if (this.activeTab.printable.printableTitleContent==undefined)
      return this.setContentFran()
      if (this[this.activeTab.printable.printableTitleContent]!==undefined){
        return this[this.activeTab.printable.printableTitleContent]()
      }else{
        alert(this.activeTab.printable.printableTitleContent+ ' not found')
      }    
    return "Report"
  }

  setPrintableContentController(){
    if (this.activeTab.printable.printableContent==undefined)
      return this.setContentFran()
      if (this[this.activeTab.printable.printableContent]!==undefined){
        return this[this.activeTab.printable.printableContent]()
      }else{
        alert(this.activeTab.printable.printableContent+ ' not found')
      }    
    return this.setContentFinal()
  }

  setPrintableContent(header) {
    //alert('setContentFinal')
    let session = JSON.parse(sessionStorage.getItem("userSession"))
    let sessionDate = session.appSessionStartDate
    let sessionUser = session.header_info.first_name +" "+ session.header_info.last_name +" ("+ session.userRole +")"    
    
    let strContent = this.setPrintableContentController(header)
    // strContent = this.incubatorContent(strContent)
    // strContent = this.batchContent(strContent)
    // strContent = this.lotContent(strContent)

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
        ${this.data.report_info[0].report_information}
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



}
customElements.define('datamining-data', DataMiningData);