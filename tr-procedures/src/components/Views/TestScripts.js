import { html, css, nothing} from 'lit';
export function TestScripts(base) {
    return class extends (((((((((((base))))))))))) {


        scripts(elem, data) {
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
          coaheaderWithStyle(data){
            let coaData=data//FakeCOA
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
            ${coaData===undefined? nothing:html`
            <div class="header-header">
            <div id="firstline-header">
              ${coaData===undefined||coaData.report_info.logo===undefined ? nothing: html`<img class="logo-header" src="${coaData.report_info.logo}" alt="Logo">`}      
              
              ${coaData.report_info["title2_"+this.lang]===undefined ? html`<h2 class="title-header">${coaData.report_info["title_"+this.lang]}</h2>`
                : html`<h2 class="title-header">${coaData.report_info["title_"+this.lang]}<br>${coaData.report_info["title2_"+this.lang]}</h2>`}
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
          `}
            `
          }
        
          coaResultsTable(data){
            
            let coaData=data//FakeCOA
            return html`
            ${coaData==undefined||coaData.resultsTable===undefined ? nothing: html` 
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
                      ${coaData.resultsTable.values.map(spec =>html`
                      <tr>
                        ${spec.map(fld =>html`
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
          coaUsageDecision(data){
            let coaData=data//FakeCOA
            return html`
            ${coaData==undefined||coaData.usageDecision===undefined ? nothing: html` 
            <style>
              .usage-decision-container {
                  padding-bottom: 10px;
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
              <label for="field1">${coaData.usageDecision["label_"+this.lang]}</label>
              ${coaData.usageDecision.decided!==undefined&&coaData.usageDecision.decided===true ? html`    
                <span>${coaData.usageDecision["value_"+this.lang]===undefined ? '': coaData.usageDecision["value_"+this.lang]}</span>
              `:html`
                <span style="color:red;">${coaData.usageDecision["label_when_no_decision"+this.lang]===undefined ? '': coaData.usageDecision["label_when_no_decision_"+this.lang]}</span>
              `}
            </div>
            `}
            `
          }
        
          coaSignatures(data){
            let coaData=data//FakeCOA
            return html`
            ${coaData==undefined||coaData.signatures===undefined ? nothing: html` 
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
                <div class="signature-title">${curSign["label_"+this.lang]}</div>
        
                ${curSign.manualsign!==undefined&&curSign.manualsign===true ? html`
                  <div style="height: 100px; border: 1px dashed black; margin-top: 20px;"></div>
                `:nothing}
        
                ${curSign.signed!==undefined&&curSign.signed===true ?
                html`                    
                  <div class="signature-name">${curSign["author_value_"+this.lang]}</div>
                  <div class="signature-date">${curSign["date_value_"+this.lang]}</div>        
                `:html`
                <div class="signature-name" style="color:red;">${curSign["label_when_not_signed_"+this.lang]}</div>        
                `}
                ${curSign.manualsign!==undefined&&curSign.manualsign===false&&curSign.sign_electronically_en!==undefined&&curSign.signed===true ? html`
                  <div class="signature-name" style="font-style: italic; font-size:12px;">${curSign["lsign_electronically_"+this.lang]}</div>
                `:nothing}
              </div>  
              `)}
            </div>
            `}
            `}
            `
          }
        
          documentFooter(data){
            let coaData=data//FakeCOA
            let session = JSON.parse(sessionStorage.getItem("userSession"))
            let sessionDate = session.appSessionStartDate
            let sessionUser = session.header_info.first_name +" "+ session.header_info.last_name +" ("+ session.userRole +")"    
            let footerText=`<i>${sessionUser} on ${sessionDate} `
            if (coaData==undefined&&coaData.report_info!==undefined&&coaData.report_info.report_information!==undefined){
              footerText+=`${coaData.report_info["report_information_"+this.lang]}`
            }  
            footerText+=`</i>`
            return footerText
          }
          printCoa(data){
            let coaData=data//FakeCOA
            this.setPrintContentCoa(data)
            let printWindow = window.open('', '', 'fullscreen=yes');
            printWindow.document.write(this.printObj.contentWithFooter);
            console.log('contentWithFooter', this.printObj.contentWithFooter)
            printWindow.document.title = coaData.report_info["provisional_copy_"+this.lang];     
            printWindow.document.close();
            setTimeout(function () {
              printWindow.print();
              printWindow.close();
            }, 500);
          }
         
          setPrintContentCoa(data) { 
            let headerData=''
            let headerDataDiv =this.shadowRoot.querySelectorAll("div#document")
            if (headerDataDiv!==undefined){
              headerData=headerDataDiv[0].outerHTML
            }    

            let pagerFooter=''
            let pagerFooterDiv =this.shadowRoot.querySelectorAll("div#pagefooter")
            if (pagerFooterDiv!==undefined){
                pagerFooter=pagerFooterDiv[0].outerHTML
            }    

            //console.log('object to print', headerData)
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
          
    }
}