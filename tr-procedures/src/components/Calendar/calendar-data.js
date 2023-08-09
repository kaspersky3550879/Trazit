import { html, css, nothing, LitElement } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import {DialogsFunctions} from '../GenericDialogs/DialogsFunctions';
import { TrazitFormsElements } from '../GenericDialogs/TrazitFormsElements'
import {TrazitGenericDialogs} from '../GenericDialogs/TrazitGenericDialogs';
import '../ObjectByTabs/objecttabs-composition';
import '@google-web-components/google-chart';
import {DataViews} from '../../components/Views/DataViews';
export class CalendarData extends DataViews(TrazitGenericDialogs(TrazitFormsElements(DialogsFunctions(CredDialog)))) {
  static get styles() {
    return css`
      :host([disabled]) {
        opacity: 0.5;
        pointer: none;
      }
      div.t-item {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin-right: 3px;
        background-color: #03a9f4;
      }
      mwc-button.tabBtn {
        background-color: #24C0EB;
        font-family : Myriad Pro;
        border-radius : 11px;        
        -moz-border-radius : 11px;
        -webkit-border-radius : 11px;
        border-style:outset;
        border-color:rgb(48, 116, 135);
        border-width: 0px 3px 3px 0px;
        --mdc-typography-button-text-transform: none;
        --mdc-typography-button-font-size: 19px;
        --mdc-theme-primary: rgb(3, 169, 244);       
      }
      sp-split-view {
        height: calc(100vh - 100px); 
        --spectrum-dragbar-handle-width:0px;       
      }
      #splitter{
        width:0px;
      }
      .splitter{       
        background-color: blue;
      }
      .sp-split-view.collapsed{
        width: 0;
      }
      #leftSplit {
        padding: 10px;
        background-color:transparent;
        /* overflow: hidden; */
        overflow-y: scroll;
        width:350px;
        /* top:30px; */
        position:relative;
        transition: width 0.5s ease-in-out;
      }
      #leftSplit.collapsed {
        width: 0;
      }

      div#leftSplit::-webkit-scrollbar {
        width: 8px;
      }

      div#leftSplit::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      div#leftSplit::-webkit-scrollbar-thumb {
        background: #888;
      }

      /* Add a hover effect to the collapse button */
      .collapse-button:hover {
        cursor: pointer;
      }
      
      /* Apply the collapse class to the left side area div when the button is clicked */
      .collapse-button:hover + #leftSplit {
        width: 0;
      }      
      #rightSplit{
        padding: 0px;
        background-color:transparent;
        width: calc(96vw - 220px);
        transition: width 0.5s ease-in-out;
        position: relative;
      }  
      #rightSplit.collapsed {
        width: 96vw;
      }      
      #endpointName {
        box-shadow: 16px 14px 20px rgba(20, 78, 117, 0.5);
        overflow-y : auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;        
      }

    `;
  }
    static get properties() {
        return {
            tabsMainViewModelFromProcModel: {type: Object},
            viewModelFromProcModel: {type: Object},        
            selectedTabModelFromProcModel : {type: Object},        
            config: { type: Object },
            procName: { type: String },
            ready:{type: Boolean},
            viewName: { type: String },
            filterName: { type: String },
            lang: { type: String },
            procInstanceName:{type: String},
            //masterData:{ type: Object},
            requestData: {type: Array},
            //selectedItem:{ type: Array},    
            calendarDataInfoArr:{type: Array},        
            selectedItemLoaded:{type: Boolean},
            leftSplitDisplayed: { type: Boolean },

            selectedCalendarDate: { type: Array },
            selectedCalendar: { type: Object },      
        }
    }
    constructor() {
        super()
        this.viewModelFromProcModel={} 
        this.tabsMainViewModelFromProcModel={}
        this.selectedTabModelFromProcModel={}
        this.ready=false;
        this.config={}
        //this.masterData={} 
        this.langConfig = this.viewModelFromProcModel.langConfig
        this.requestData =[]
        //this.selectedItem=[]
        this.calendarDataInfoArr=[]
        this.selectedItemLoaded=false
        //this.getObjectData()
        this.desktop = true
        this.showDivider=true
        this.leftSplitDisplayed=true
        this.lotDefault='Testing 2023-03-15T21:20:55.962273'//'demo 2023-03-11T22:40:27.243529300'//'demo 2023-03-11T22:29:16.300048300'//'demo 2023-03-11T11:03:06.643535700'//'demo 2023-03-11T21:33:16.786665'

        this.selectedCalendar={}
        this.selectedCalendarDate=[]
    }
    title() {      
      return html`
        <style>
          .title-banner {
            background-color: #007bff; /* Blue */
            color: #24c0eb; /* White */
            display: flex;
            justify-content: space-between; /* Add space between left and right text */
            align-items: center;
            height: 60px;
            padding: 0 10px; /* Add padding to keep text away from edges */
            position: fixed;
            z-index: 6;       
            width: calc(96vw - 250px);
            transition: width 0.5s ease-in-out;
            background : -moz-linear-gradient(46.71% -341.1% -76deg,rgba(214, 233, 248, 1) 43.85%,rgba(255, 255, 255, 1) 58.66%);
            background : -webkit-linear-gradient(-76deg, rgba(214, 233, 248, 1) 43.85%, rgba(255, 255, 255, 1) 58.66%);
            background : -webkit-gradient(linear,46.71% -341.1% ,53.29% 441.1% ,color-stop(0.4385,rgba(214, 233, 248, 1) ),color-stop(0.5866,rgba(255, 255, 255, 1) ));
            background : -o-linear-gradient(-76deg, rgba(214, 233, 248, 1) 43.85%, rgba(255, 255, 255, 1) 58.66%);
            background : -ms-linear-gradient(-76deg, rgba(214, 233, 248, 1) 43.85%, rgba(255, 255, 255, 1) 58.66%);
            -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#D6E9F8', endColorstr='#FFFFFF' ,GradientType=0)";
            background : linear-gradient(166deg, rgba(214, 233, 248, 1) 43.85%, rgba(255, 255, 255, 1) 58.66%);
            border-radius : 12px;
            -moz-border-radius : 12px;
            -webkit-border-radius : 12px;
            box-shadow : 2.77px 2.77px 4.62px rgba(20, 78, 117, 0.5);
            box-shadow: 16px 14px 20px rgba(20, 78, 117, 0.5);     
            filter: progid:DXImageTransform.Microsoft.dropshadow(OffX=2.77, Off=2.77, Color='#144E75') progid:DXImageTransform.Microsoft.gradient(startColorstr='#D6E9F8',endColorstr='#FFFFFF' , GradientType=1);                  
          }  
          .title-banner.collapsed {
            width: 93.25vw;
          }  
          
          .title-banner .left-text {
            font-size: 12px;
            margin-right: auto; /* Push left text to the very left */
          }
          
          .title-banner .title {
            font-size: 24px;
            font-weight: bold;
            margin: 0;
          }
          
          .title-banner .right-text {
            font-size: 12px;
            margin-left: auto; /* Push right text to the very right */
          }    
          google-chart.calendarchart{
            height:180px;
          }
    
        </style>    
        
        <div class="title-banner ${this.leftSplitDisplayed !== undefined && this.leftSplitDisplayed ? '' : 'collapsed'}">
          <span class="left-text">
          <mwc-icon-button size="s" style="left:22px;" id="expandleftpane" dense raised label=""  icon="${this.leftSplitDisplayed !== undefined && this.leftSplitDisplayed ? 'expand_more' : 'expand_less'}"   @click=${this.toggleLeftSplitPane}></mwc-icon-button>                
          </span>
          <h1 class="title">
            ${this.viewModelFromProcModel.title["fix_text_"+this.lang]===undefined ? '' :this.viewModelFromProcModel.title["fix_text_"+this.lang]}
            ${this.selectedItem===undefined||this.selectedItem[this.viewModelFromProcModel.title.field_name]===undefined ? '' :this.selectedItem[this.viewModelFromProcModel.title.field_name]}  
          </h1>
          <span class="right-text"></span>
        </div>
    
  </div>
      `
    }
    toggleLeftSplitPane() {
      //console.log(this.leftSplitDisplayed)
      this.leftSplitDisplayed = !this.leftSplitDisplayed
    }  
    filterPerformAction(e) {
        this.GetViewData(false)
        if (this.requestData!==undefined){
          this.calendarDataInfoArr=this.requestData
          this.selectedItemLoaded=true
          this.selectedTabContent()
        }
//      }
    }

    render() {      
      return html`    
      ${this.genericFormDialog()}
        ${this.desktop ?
          html`                  
          <sp-split-view show-divider=${this.showDivider}>
            <div id="leftSplit" class="${this.leftSplitDisplayed !== undefined && this.leftSplitDisplayed ? '' : 'collapsed'}">
              <div id="endpointName">      
              
                <sp-button size="m" slot="primaryAction" dialogAction="accept" .viewModelFromProcModel="${this.viewModelFromProcModel}" @click=${this.filterPerformAction}>
                ${this.viewModelFromProcModel.filter_button["label_" + this.lang]} </sp-button>

                ${this.viewModelFromProcModel.filter === undefined ? nothing : html`
                  ${this.genericFormElements(this.viewModelFromProcModel.filter, true)} `}                      
              </div>
            </div>
            
            <div id="rightSplit" class="${this.leftSplitDisplayed !== undefined && this.leftSplitDisplayed ? '' : 'collapsed'}">

            ${this.title()}
            ${this.tabsBlock()}  
    
            ${this.selectedItem!==undefined? html`
 
            `: nothing}
  
            </div>
          </sp-split-view>
      ` : html`        
          <div id="mobile">
          <div id="leftSplit" class="${this.leftSplitDisplayed !== undefined && this.leftSplitDisplayed ? '' : 'collapsed'}">
          </div>
        </div>
        <div id="rightSplit">
        ${this.title()}
        ${this.tabsBlock()}  

        ${this.viewModelFromProcModel !== undefined && this.viewModelFromProcModel.view_definition !== undefined && this.viewModelFromProcModel ? html`
            <objecttabs-composition .selectedTabModelFromProcModel=${this.viewModelFromProcModel.view_definition.reportElements}
              .lang=${this.lang} .procInstanceName=${this.procInstanceName} .config=${this.config} .viewName=${this.viewName} .filterName=${this.filterName} 
              .selectedItem=${this.selectedProcInstance} .viewModelFromProcModel=${this.viewModelFromProcModel}      
            </objecttabs-composition>              
          `: nothing}
        </div>
        `
        }
    `;
    }
  
    tabsBlock(){
        //this.resetView()
        return html`
        ${this.viewModelFromProcModel.tabs ?
          html`
            <div class="layout horizontal flex" style="position:relative; top:60px;">
            ${this.viewModelFromProcModel.tabs!==undefined&&this.viewModelFromProcModel.tabs.length>1 ?
            html`
              <div class="layout horizontal flex">
                ${this.viewModelFromProcModel.tabs.map(t => 
                  html`
                    <mwc-button class="tabBtn" dense unelevated 
                      .label=${t["tabLabel_"+ this.lang]}
                      @click=${()=>this.selectTab(t)}></mwc-button>
                  `
                )}
              </div>
            `: nothing}
              ${this.selectedTabContent()}  
            </div>
            
          ` : nothing
        }
        `
    }

    selectedTabContent(){
      if (Object.keys(this.selectedTabModelFromProcModel).length === 0){
        this.selectedTabModelFromProcModel=this.viewModelFromProcModel.tabs[0]
      }
      let options= {width: 2000,
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
      }    
      let datas=[]
      let datesArr=[];
      if (this.calendarDataInfoArr!==undefined&&this.calendarDataInfoArr.dates_grouped!==undefined){
        datas=this.calendarDataInfoArr.dates_grouped
        console.log('datesArr for google-chart', datas)
      }
      let i=0
      for (i = 0; i < datas.length; i++) { 
          console.log('i', i, new Date(Date.parse(datas[i].calendar_date)), datas[i].calendar_date);
          let newElement=[];
          newElement[0]=new Date(Date.parse(datas[i].calendar_date)) //new Date(datas[i].year, datas[i].date_month-1, datas[i].date_dayOfMonth);
          newElement[1]=datas[i].counter
          datesArr[i]=newElement;                    
      }
      let cols=[]
      cols=[{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }]
      return html`
      ${this.selectedTabModelFromProcModel.view=='Calendar'?html`
        <div class="layout horizontal center flex wrap">          
          <google-chart id="mychart" .options=${options} .cols=${cols} .rows=${datesArr} class="calendarChart" type="calendar" @google-chart-select=${this.calendarDayClicked}></google-chart>          
          <objecttabs-composition id="dayDetail" .selectedTabModelFromProcModel=${this.selectedTabModelFromProcModel}
            .lang=${this.lang} .procInstanceName=${this.procInstanceName} .config=${this.config}  .viewName=${this.viewName} .filterName=${this.filterName} 
            .selectedItem=${this.calendarDataInfoArr}  .viewModelFromProcModel=${this.viewModelFromProcModel}   
          </objecttabs-composition>      
  
        </div>
      `:html`
      <objecttabs-composition .selectedTabModelFromProcModel=${this.selectedTabModelFromProcModel}
        .lang=${this.lang} .procInstanceName=${this.procInstanceName} .config=${this.config}  .viewName=${this.viewName} .filterName=${this.filterName} 
        .selectedItem=${this.calendarDataInfoArr}  .viewModelFromProcModel=${this.viewModelFromProcModel}   
      </objecttabs-composition>      
      `}
      `
    }
    calendarDayClicked(e){
      if (e.currentTarget.selection[e.currentTarget.selection.length-1].date===undefined){
        return
      }
      let cellDateRaw=e.currentTarget.selection[e.currentTarget.selection.length-1].date
      let cellDate=new Date((cellDateRaw))
      const filteredArray = this.calendarDataInfoArr.raw_data.filter(entry => 
        new Date(Date.parse(entry.calendar_date)).getFullYear() === cellDate.getFullYear() &&
        new Date(Date.parse(entry.calendar_date)).getMonth() === cellDate.getMonth() &&
        new Date(Date.parse(entry.calendar_date)).getDay() === cellDate.getDay()
      )
            
      this.objecttabsCompositionDayDetail.selectedItem=filteredArray//this.calendarDataInfoArr.raw_data[0]
      this.objecttabsCompositionDayDetail.selectedTabModelFromProcModel=this.selectedTabModelFromProcModel.day_clicked_detail
      //alert(cellDate)
      return

    }  
    detailElement(elem, dataArr, isSecondLevel, directData, alternativeTitle){
      return html`
      hola ${alternativeTitle}
      ${elem!==undefined?html`
        ${this.readOnlyTable(elem, dataArr, isSecondLevel, directData, alternativeTitle)}
      `:nothing}
      `
    }
    


    tabOnOpenView() {
      // <objecttabs-composition 
      // .lang=${this.lang} .masterData=${this.masterData}
      // .windowOpenable=${this.windowOpenable}
      // .sopsPassed=${this.sopsPassed}
      // .procInstanceName=${this.procInstanceName}             
      // .viewName=${this.viewName}  .viewModelFromProcModel=${this.viewModelFromProcModel!==undefined&&Object.keys(this.viewModelFromProcModel).length>0 ? this.viewModelFromProcModel : this.viewModelFromProcModel.tabs[0]}
      // .selectedTabModelFromProcModel=${this.selectedTabModelFromProcModel}
      // .selectedItem=${this.selectedItem}
      // .config=${this.config}>${this.tabOnOpenView()}</objecttabs-composition>        
      return
    }
    selectTab(tab) {
      this.selectedTabModelFromProcModel=tab
      if (this.objecttabsComposition!==null){
//        this.objecttabsComposition.render()
      }
    }

    resetView() {
      //console.log('resetView', 'tabs', this.tabsMainViewModelFromProcModel.tabs, 'master data', this.masterData)
      if (this.objecttabsComposition!==null){
//        this.objecttabsComposition.render()
      }
    }
    get lottoget() {    return this.shadowRoot.querySelector("mwc-textfield#lottoget")    }        
    get objecttabsComposition() {return this.shadowRoot.querySelector("objecttabs-composition")}  
    get objecttabsCompositionDayDetail() {return this.shadowRoot.querySelector("objecttabs-composition#dayDetail")}  
    
    get chart() {return this.shadowRoot.querySelector("google-chart#mychart")}
  
}
window.customElements.define('calendar-data', CalendarData);