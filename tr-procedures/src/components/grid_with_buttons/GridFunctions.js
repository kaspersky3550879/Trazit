import { html, css } from 'lit';
import { columnBodyRenderer } from 'lit-vaadin-helpers';
import {ButtonsFunctions} from '../Buttons/ButtonsFunctions';
export function GridFunctions(base) {
    return class extends ButtonsFunctions(base) {

        getTitle(sectionModel = this.viewModelFromProcModel) {
            //alert(this.filterName)
            let textToDisplay=this.filterName
            if (sectionModel.langConfig&&sectionModel.langConfig.title[this.filterName]) {
                textToDisplay=sectionModel.langConfig.title[this.filterName]["label_"+this.lang]
            }
            //if (sectionModel.langConfig&&sectionModel.langConfig.title[this.filterName]) {
                let viewDisabled=this.disabledByCertification({})
                if (viewDisabled){
                    let title={}
                    title.label_en="( Read Only Mode) "
                    title.label_es="( Modo Lectura ) "
                    return html`
                    <style>
                        h1 .readonly{
                            color: #FF00006B;
                            font-style: oblique;
                        }
                    </style>
                    <h1>${textToDisplay}<span class="readonly"> ${title["label_"+this.lang]}</span></h1>`
                }else{
                    return html`<h1>${textToDisplay}</h1>`
                }
            //}
          }
        cleanGrid(){
            this.selectedItems = []
            this.gridItems = []
            this.ready = true
        }
        setGrid(j) {
            //return
            //console.log('setGrid')
            this.selectedItems = []
            this.gridItems = []
            if (this.abstract) {
            this.shadowRoot.querySelectorAll("gridmodel-bottomcomp-sampleincubation").forEach(c => {
                // updating grid of samples_stillIncubationStageAndBothIncubCompleted
                if (c.siGrid) {
                if (j) {
                    if (j.samples_stillIncubationStageAndBothIncubCompleted && j.samples_stillIncubationStageAndBothIncubCompleted.length) {
                    c.stucksList = j.samples_stillIncubationStageAndBothIncubCompleted
                    c.stuckNum = c.stucksList.length
                    c.siGrid.items = j.samples_stillIncubationStageAndBothIncubCompleted
                    } else {
                    c.stucksList = null
                    c.siGrid.items = []
                    }
                } else {
                    c.stucksList = null
                    c.siGrid.items = []
                }
                c.selectedStucks = []
                }
            
                if (j) {
                c.gridItems = c.filteredItems = j[c.model.filter]
                } else {
                c.gridItems = c.filteredItems = []
                }
                this.batchName = null
                c.selectedItems = []
                c.samplesReload = false
                c.requestUpdate()
            })
            } else {
            if (j) {
                this.gridItems = j
            } else {
                this.gridItems = []
            }
            }
        
            this.ready = true
            if (this.sampleState) {
            this.reloadSampleState()
            }
        }
        gridList(viewModelFromProcModel ={}) {
            // this.selectedItems=[]
            // this.gridItems=[]
            //console.log('gridList')    
            if (viewModelFromProcModel===undefined){return} 
            if (this.gridItems===undefined||this.gridItems.length==0){return       }
            return Object.entries(viewModelFromProcModel.langConfig.gridHeader).map(
                ([key, value], i) => html`
                ${viewModelFromProcModel.langConfig.gridHeader[key].is_icon ?
                    this.iconColumn(key, value, i, viewModelFromProcModel) :
                    this.nonIconColumn(key, value, i, viewModelFromProcModel)
                }
                `
            )
        }
                    
        iconColumn(key, value, i, viewModelFromProcModel) {            
        return html`
            ${this.desktop ?
            html`
                ${i==0 ?
                html`${viewModelFromProcModel.langConfig.gridHeader[key].width ?
                    html`
                    <vaadin-grid-column
                    header="${value['label_'+this.lang]}"
                    ${columnBodyRenderer((sample)=>this.iconRenderer(sample, key, i, viewModelFromProcModel.langConfig.gridHeader[key]))}
                    text-align="${viewModelFromProcModel.langConfig.gridHeader[key].align ? viewModelFromProcModel.langConfig.gridHeader[key].align : 'center' }"
                    width="${viewModelFromProcModel.langConfig.gridHeader[key].width}" resizable
                    ></vaadin-grid-column>
                    ` :
                    html`
                    <vaadin-grid-column
                    header="${value['label_'+this.lang]}"
                    ${columnBodyRenderer((sample)=>this.iconRenderer(sample, key, i, viewModelFromProcModel.langConfig.gridHeader[key]))}
                    text-align="${viewModelFromProcModel.langConfig.gridHeader[key].align ? viewModelFromProcModel.langConfig.gridHeader[key].align : 'center' }"
                    flex-grow="0"
                    ></vaadin-grid-column>
                    `
                }` :
                html`${viewModelFromProcModel.langConfig.gridHeader[key].width ?
                    html`
                    <vaadin-grid-column
                    header="${value['label_'+this.lang]}"
                    ${columnBodyRenderer((sample)=>this.iconRenderer(sample, key, i, viewModelFromProcModel.langConfig.gridHeader[key]))}
                    text-align="${viewModelFromProcModel.langConfig.gridHeader[key].align ? viewModelFromProcModel.langConfig.gridHeader[key].align : 'center' }"
                    width="${viewModelFromProcModel.langConfig.gridHeader[key].width}" resizable
                    ></vaadin-grid-column>
                    ` :
                    html`<vaadin-grid-column
                    header="${value['label_'+this.lang]}"
                    ${columnBodyRenderer((sample)=>this.iconRenderer(sample, key, i, viewModelFromProcModel.langConfig.gridHeader[key]))}
                    text-align="${viewModelFromProcModel.langConfig.gridHeader[key].align ? viewModelFromProcModel.langConfig.gridHeader[key].align : 'center' }"
                    auto-width
                    ></vaadin-grid-column>`
                }`
                } 
            ` :
            html`
                <vaadin-grid-column
                header="${value['label_'+this.lang]}"
                ${columnBodyRenderer((sample)=>this.iconRenderer(sample, key, i, viewModelFromProcModel.langConfig.gridHeader[key]))}
                text-align="${viewModelFromProcModel.langConfig.gridHeader[key].align ? viewModelFromProcModel.langConfig.gridHeader[key].align : 'center' }"
                width="65px" resizable
                ></vaadin-grid-column>
            `
            }
        `
        }
        titleLang(colDef){
            let titleStr=''
            if (colDef.title!==undefined){
                return colDef.title["label_"+this.lang]
            }    
            return titleStr
        }
        iconRenderer(sample, keyName, i ,colDef) {
//            if (value!==undefined)
//console.log('iconRenderer', 'sample', 'i', i, sample, 'colDef', colDef)
        if (colDef.as_progress!==undefined&&colDef.as_progress){
            return html`
            <style>
            .w3-responsive{display:block;overflow-x:auto}
            .w3-container,.w3-panel{padding:0.01em 4px}.w3-panel{margin-top:16px;margin-bottom:16px}
            .w3-container:after,.w3-container:before,.w3-panel:after,.w3-panel:before,.w3-row:after,.w3-row:before,.w3-row-padding:after,.w3-row-padding:before,
            .w3-blue,.w3-hover-blue:hover{color:rgba(7, 13, 22, 0.94)!important;background-color:#2196F3!important}
            .w3-background,.w3-hover-blue:hover{color:rgba(7, 13, 22, 0.94)!important;background-color:#ffdedd!important}
            .title {
                font-size: 8px; font-weight: 500; letter-spacing: 0;
                line-height: 1.5em; padding-bottom: 15px; position: relative;
                font-family: Montserrat; font-color:rgb(94, 145, 186);
              }
            </style>
            <div class="w3-container" >
                <div class="w3-background w3-round-xlarge" title="${this.titleLang(colDef)}">
                <div class="w3-container w3-blue w3-round-xlarge" style="width:${sample[keyName]}%" >${sample[keyName]}%</div>
                </div>
            </div>
            <br>            
            `
        }
        if (colDef.image_name!==undefined&&String(colDef.image_name).toUpperCase()==="ACTIVATE_DEACTIVATE"){
            return html`<img src="/images/${sample[keyName]?'activate.svg':'deactivate.svg'}" style="width:20px">`
        }
        //[{"value": "A", "image_name": "imagenA"}, {"value": "B", "image_name": "imagenB"}, {"value": "else", "image_name": "imagenParaElResto"}]

        if (this.filterName == "SampleLogin") {
            return html`<img src="/images/labplanet.png" style="width:20px">`
        //} else if (String(this.viewName).toUpperCase().includes("INSTRUM")&&sample.on_line!==undefined) {
        //    return html`<img src="/images/${sample.on_line?'activate.svg':'deactivate.svg'}" style="width:20px">`
        } else if (this.viewName == "EventsInProgress") {
            return html`<img src="/images/inst_ev_type_${sample.event_type!==undefined?sample.event_type.toLowerCase():''}.svg" style="width:20px">`
        } else if (this.viewName == "WhiteIpList") {
            return html`<img src="/images/${sample.active?'activate.svg':'deactivate.svg'}" style="width:20px">`
        } else if (this.viewName == "BlackIpList") {
            return html`<img src="/images/${sample.active?'activate.svg':'deactivate.svg'}" style="width:20px">`
        } else if (this.viewName == "PlatformBusRules") {
            return html`<img src="/images/${sample.disabled?'activate.svg':'deactivate.svg'}" style="width:20px">`
        } else {
            return html`<img src="/images/${sample[keyName]?'activate.svg':'deactivate.svg'}" style="width:20px">`
        }
        }
    
        nonIconColumn(key, value, i, viewModelFromProcModel) {
        return html`${viewModelFromProcModel.langConfig.gridHeader[key].sort ?
            this.sortColumn(key, value, i, viewModelFromProcModel) :
            this.filterColumn(key, value, i, viewModelFromProcModel)
        }`
        }
    
        sortColumn(key, value, i, viewModelFromProcModel) {
        return html`
            ${this.desktop ?
            html`
                ${i==0 ?
                html`${viewModelFromProcModel.langConfig.gridHeader[key].width ?
                    html`<vaadin-grid-sort-column width="${viewModelFromProcModel.langConfig.gridHeader[key].width}" resizable 
                    ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, viewModelFromProcModel))}
                    text-align="${viewModelFromProcModel.langConfig.gridHeader[key].align ? viewModelFromProcModel.langConfig.gridHeader[key].align : 'end' }"
                    path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`:
                    html`<vaadin-grid-sort-column flex-grow="0" 
                    ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, viewModelFromProcModel))}
                    text-align="${viewModelFromProcModel.langConfig.gridHeader[key].align ? viewModelFromProcModel.langConfig.gridHeader[key].align : 'end' }"
                    path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
                }` :
                html`${viewModelFromProcModel.langConfig.gridHeader[key].width ?
                    html`<vaadin-grid-sort-column 
                    ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, viewModelFromProcModel))}
                    width="${viewModelFromProcModel.langConfig.gridHeader[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>` :
                    html`<vaadin-grid-sort-column 
                    ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, viewModelFromProcModel))}
                    resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
                }`
                }
            ` :
            html`<vaadin-grid-sort-column width="65px" resizable 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, viewModelFromProcModel))}
                text-align="${viewModelFromProcModel.langConfig.gridHeader[key].align ? viewModelFromProcModel.langConfig.gridHeader[key].align : 'end' }"
                path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
            }
        `
        }
    
        filterColumn(key, value, i, viewModelFromProcModel) {
           // console.log('filterColumn', key, value, viewModelFromProcModel)
        return html`
            ${this.desktop ?
            html`
                ${i==0 ?
                html`${viewModelFromProcModel.langConfig.gridHeader[key].width ?
                    html`<vaadin-grid-filter-column width="${viewModelFromProcModel.langConfig.gridHeader[key].width}" resizable 
                    ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, viewModelFromProcModel))}
                    text-align="${viewModelFromProcModel.langConfig.gridHeader[key].align ? viewModelFromProcModel.langConfig.gridHeader[key].align : 'end' }"
                    path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
                    html`<vaadin-grid-filter-column flex-grow="0" 
                    ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, viewModelFromProcModel))}
                    text-align="${viewModelFromProcModel.langConfig.gridHeader[key].align ? viewModelFromProcModel.langConfig.gridHeader[key].align : 'end' }"
                    path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
                }` :
                html`${viewModelFromProcModel.langConfig.gridHeader[key].width ?
                    html`<vaadin-grid-filter-column 
                    ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, viewModelFromProcModel))}
                    width="${viewModelFromProcModel.langConfig.gridHeader[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
                    html`<vaadin-grid-filter-column 
                    ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, viewModelFromProcModel))}
                    resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
                }`
                }
            ` :
            html`<vaadin-grid-filter-column width="65px" resizable 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, viewModelFromProcModel))}
                text-align="${viewModelFromProcModel.langConfig.gridHeader[key].align ? viewModelFromProcModel.langConfig.gridHeader[key].align : 'end' }"
                path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
            }
        `
        }
    
        isConfidential(sample, key, viewModelFromProcModel) {
        //if (sample[key]===undefined) return ''
        if (viewModelFromProcModel.langConfig.gridHeader[key]===undefined){ 
            alert('key='+key)
            //console.log('gridheader', viewModelFromProcModel.langConfig.gridHeader, 'key', key, 'sample', sample)
            return html`${sample[key]}`
        }
        if (viewModelFromProcModel.langConfig.gridHeader[key].confidential_value!==undefined&&viewModelFromProcModel.langConfig.gridHeader[key].confidential_value===true&&sample[key]) {
            return html`*****`
        } else {
            return html`${sample[key]}`
        }
        }
        
    }
}