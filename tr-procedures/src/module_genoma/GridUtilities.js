import { html, css } from 'lit';
import { columnBodyRenderer } from 'lit-vaadin-helpers';

export function GridUtilities(base) {
    return class extends base {

          gridListFromGridUtilities(gridDefinition, gridName, gridElement) {
            // console.log('gridListFromGridUtilities', gridDefinition, gridName) 
            // if (gridElement===undefined){
            //     gridElement={}
            // }
            // if (this[gridName]&&gridElement!==undefined){
            //   this[gridName].style.height=this.tableHeight(gridElement)
            // }    
            return Object.entries(gridDefinition).map(
              ([key, value], i) => html`${this.nonIconColumn(key, value, i, gridDefinition)}`
            )
          }  
          gridDynamicHeight(gridName, gridElements){
            if (this[gridName]&&gridElements!==undefined){
               this[gridName].style.height=this.tableHeight(gridElements)
            }    
          }
          nonIconColumn(key, value, i, gridDefinition) {
            return html`${gridDefinition[key].sort ?
              this.sortColumn(key, value, i, gridDefinition) :
              this.filterColumn(key, value, i, gridDefinition)
            }`
          }
          sortColumn(key, value, i, gridDefinition) {
            return html`
              ${this.desktop ?
                html`
                  ${i==0 ?
                    html`${gridDefinition[key].width ?
                      html`<vaadin-grid-sort-column 
                        ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, gridDefinition))}
                        width="${gridDefinition[key].width}" resizable text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`:
                      html`<vaadin-grid-sort-column 
                        ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, gridDefinition))}
                        flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
                    }` :
                    html`${gridDefinition[key].width ?
                      html`<vaadin-grid-sort-column 
                        ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, gridDefinition))}
                        width="${gridDefinition[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>` :
                      html`<vaadin-grid-sort-column 
                        ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, gridDefinition))}
                        resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
                    }`
                  }
                ` :
                html`<vaadin-grid-sort-column width="65px" resizable 
                  ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, gridDefinition))}
                  text-align="${gridDefinition[key].align ? gridDefinition[key].align : 'end' }"
                  path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
              }
            `
          }  
          filterColumn(key, value, i, gridDefinition) {
            return html`
              ${this.desktop ?
                html`
                  ${i==0 ?
                    html`${gridDefinition[key].width ?
                      html`<vaadin-grid-filter-column 
                        ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, gridDefinition))}
                        width="${gridDefinition[key].width}" resizable text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
                      html`<vaadin-grid-filter-column 
                        ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, gridDefinition))}
                        flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
                    }` :
                    html`${gridDefinition[key].width ?
                      html`<vaadin-grid-filter-column 
                        ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, gridDefinition))}
                        width="${gridDefinition[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
                      html`<vaadin-grid-filter-column 
                        ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, gridDefinition))}
                        resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
                    }`
                  }
                ` :
                html`<vaadin-grid-filter-column width="65px" resizable 
                  ${columnBodyRenderer((sample)=>this.isConfidential(sample, key, gridDefinition))}
                  text-align="${gridDefinition[key].align ? gridDefinition[key].align : 'end' }"
                  path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
              }
            `
          }
          isConfidential(sample, key, gridDefinition) {
            if (gridDefinition[key].confidential_value&&sample[key]) {
              return html`*****`
            } else {
              return html`${sample[key]}`
            }
          }   
          
          
          zzzzgridList(gridDefinition) {
            return Object.entries(gridDefinition).map(
              ([key, value], i) => html`${this.nonIconColumn(key, value, i, gridDefinition)}`
            )
          }        
          zzznonIconColumn(key, value, i, gridDefinition) {
            return html`${gridDefinition.gridHeader[key].sort ?
              this.sortColumn(key, value, i) :
              this.filterColumn(key, value, i)
            }`
          }        
          zzzsortColumn(key, value, i) {
            return html`
              ${this.desktop ?
                html`
                  ${i==0 ?
                    html`${langConfig.gridHeader[key].width ?
                      html`<vaadin-grid-sort-column 
                        ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                        width="${langConfig.gridHeader[key].width}" resizable text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`:
                      html`<vaadin-grid-sort-column 
                        ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                        flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
                    }` :
                    html`${langConfig.gridHeader[key].width ?
                      html`<vaadin-grid-sort-column 
                        ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                        width="${langConfig.gridHeader[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>` :
                      html`<vaadin-grid-sort-column 
                        ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                        resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
                    }`
                  }
                ` :
                html`<vaadin-grid-sort-column width="65px" resizable 
                  ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                  text-align="${langConfig.gridHeader[key].align ? langConfig.gridHeader[key].align : 'end' }"
                  path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
              }
            `
          }        
          zzzfilterColumn(key, value, i) {
            return html`
              ${this.desktop ?
                html`
                  ${i==0 ?
                    html`${langConfig.gridHeader[key].width ?
                      html`<vaadin-grid-filter-column 
                        ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                        width="${langConfig.gridHeader[key].width}" resizable text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
                      html`<vaadin-grid-filter-column 
                        ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                        flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
                    }` :
                    html`${langConfig.gridHeader[key].width ?
                      html`<vaadin-grid-filter-column 
                        ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                        width="${langConfig.gridHeader[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
                      html`<vaadin-grid-filter-column 
                        ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                        resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
                    }`
                  }
                ` :
                html`<vaadin-grid-filter-column width="65px" resizable 
                  ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                  text-align="${langConfig.gridHeader[key].align ? langConfig.gridHeader[key].align : 'end' }"
                  path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
              }
            `
          }        
          zzzisConfidential(sample, key) {
            if (langConfig.gridHeader[key].confidential_value&&sample[key]) {
              return html`*****`
            } else {
              return html`${sample[key]}`
            }
          }        
    }
}