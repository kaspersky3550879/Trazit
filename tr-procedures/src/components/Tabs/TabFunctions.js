import { html, css , nothing} from 'lit';
import { columnBodyRenderer } from 'lit-vaadin-helpers';

export function TabFunctions(base) {
    return class extends base {
        showTabElement(viewModelFromProcModel, hardcodedTbs={}){
          console.log('showTabElement', 'viewModelFromProcModel', viewModelFromProcModel, 'hardcodedTbs', hardcodedTbs)
            return html`
            <div class="layout flex">
            <div class="layout horizontal center">
              <mwc-icon-button class="slide" icon="navigate_before" @click=${this.prevTab} ?hidden=${!this.prev}>
              </mwc-icon-button>
              <div class="tabContainer layout horizontal flex center">
                <mwc-icon-button icon="refresh" @click=${this.resetView} ?disabled=${this.samplesReload}></mwc-icon-button>
                ${viewModelFromProcModel!==undefined&&viewModelFromProcModel.tabs!==undefined  ?
                html`
                  ${(viewModelFromProcModel.tabs).map(t =>                    
                      html`
                      ${t.display===undefined||t.display===true  ?
                        html`<tab-element .lang=${this.lang} .tab=${t} @tab-rendered=${this.isScroll} @tab-change=${this.tabChanged} ?disabled=${this.samplesReload}></tab-element>`
                      :nothing}
                    `  
                  )}
                `:html`
                ${hardcodedTbs!==undefined&&hardcodedTbs.tabs!==undefined  ?                
                html`
                  ${(hardcodedTbs.tabs).map(t =>
                    html`
                    ${t.display===undefined||t.display===true  ?
                      html`<tab-element .lang=${this.lang} .tab=${t} @tab-rendered=${this.isScroll} @tab-change=${this.tabChanged} ?disabled=${this.samplesReload}></tab-element>`
                    :nothing}
                    `                      
                  )}
                `: nothing}
              `}
              </div>
              <mwc-icon-button class="slide" icon="navigate_next" @click=${this.nextTab} ?hidden=${!this.next}>
              </mwc-icon-button>
            </div>
            </div>    
            `
        }
    }
}