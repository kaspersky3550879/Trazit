import { LitElement, html, css, nothing } from 'lit';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import {GridFunctions} from '../components/grid_with_buttons/GridFunctions';

export class Templates extends GridFunctions(LitElement) {
  static get styles() {
    return [
      Layouts,
      css`
      mwc-select[hidden] {
        display: none;
      }
      div#topElement{
        padding-top:5px;
        display: flex;
      }
      mwc-icon-button {        
        color : rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }   
      mwc-select {        
        --mdc-theme-primary : rgba(36, 192, 235, 1);
        --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
        --mdc-select-ink-color: rgba(36, 192, 235, 1);
        --mdc-select-dropdown-icon-color:rgba(36, 192, 235, 1);
        --mdc-select-hover-line-color:rgba(36, 192, 235, 1);

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
      } 
      h1 {        
        color : rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size:calc(12px + 1.5vw);
        text-align: center;
        padding-left: 5px;
      }                         
      `
    ];
  }

  static get properties() {
    return {
      templateName: { type: String },
      buttons: { type: Array },
      lang: { type: String },
      programsList: { type: Array },
      selectedProgram: { type: Array },
      viewModelFromProcModel: {type: Object},
      viewName: { type: String },
      filterName: { type: String },
      procInstanceName: { type: String },
      

    };
  }

  constructor() {
    super()
    this.programsList = []
    this.selectedProgram = {}
    this.viewModelFromProcModel={}
    this.lang='en'
  }

  render() {
    return html`${this.templateName ?
      html`${this[this.templateName]()}` :
      nothing
    }`
  }
  resetView(){
    //console.log('resetView-templates-')
    this.selectedProgram = []
    this.programsList = []
  }
  populateProgramsList(){
    let myList=[]
    this.programsList.forEach(row =>{
      myList.push(row)
    })
    let firstProgram=this.programsList[0]
    if (firstProgram!==undefined){
      this.selectedProgram=[]
      this.selectedProgram.push(firstProgram)
      let mye={target:{value:''}}
      mye.target.value=firstProgram.name
      //console.log('mye', mye)
      this.programChanged(mye)
    }
    return html`
    ${myList.map((c, i) =>
      html`<mwc-list-item value="${c.name}" ?selected=${i==0}>${c.name}</mwc-list-item>`
    )}
    `

  }
  specCode() {
    return html`    
      <div id= "topElement" class="layout center">
        ${this.buttons&&this.buttons.map(b =>
          html`<mwc-icon-button 
            icon="${b.icon}" 
            title="${b.title['label_'+this.lang]}" 
            @click=${()=>this.dispatchEvent(new CustomEvent('template-event', {
              detail: b
            }))}></mwc-icon-button>`
        )}
        <mwc-select outlined label="Program Name" @change=${this.programChanged} ?hidden=${this.programsList.length<2}>
            ${this.populateProgramsList()}
        </mwc-select>
        ${this.programsList.length==1 ?
          html`<h3>${this.programsList[0].name}</h3>` : nothing
        }
         
        ${this.getTitle()}  
      </div>
    `
  }

  programChanged(e) {
    if (this.programsList.length) {
      this.selectedProgram = this.programsList.filter(p => p.name == e.target.value)
      // console.log('programChanged', this.selectedProgram)
      
      this.dispatchEvent(new CustomEvent('program-changed', {
        detail: this.selectedProgram[0].sample_points || []
      }))
    }
  }
}
window.customElements.define('templates-', Templates);