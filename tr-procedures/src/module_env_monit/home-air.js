import { html, css, nothing, LitElement } from 'lit';
// import('../grid_with_buttons/grid-with-buttons');
// import './tabs-composition';
// import {DialogsFunctions} from '../GenericDialogs/DialogsFunctions';

import { navigator } from 'lit-element-router';
export class HomeAir extends navigator(LitElement) {
  static get styles() {
    return css`
    .flow {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 50px;
    }
    
    .node {
      position: relative;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #ccc;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    
    .node.start:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 0;
      height: 0;
      border-top: 1px solid #ccc;
      border-right: 1px solid #ccc;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
    
    .node.end:after {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      width: 0;
      height: 0;
      border-bottom: 1px solid #ccc;
      border-left: 1px solid #ccc;
      transform: translate(50%, -50%) rotate(-45deg);
    }
    
    .node:hover {
      background-color: #555;
    }
    
    .node:active {
      transform: scale(0.9);
    }
    
    .maindiv{
      width: 1250px;
      }
      .btn-2 {
      filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.6));
    }
    .btn-2 {
      display:inline-block;
      position: relative;
      color: #fff;
    border: 15px #C0080B;
      font-weight: 500;
      font-family: "Arial";
      text-decoration: none;
      text-transform: uppercase;
      padding: 15px 50px;
      text-align: center;
      clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);
      background-color: #7ED8F2;
    border: 10px;
    }
    .btn-2:hover {cursor: pointer;}
    .btn-1 {
      display:inline-block;
      position: relative;
      color: #fff;
      font-family: "Arial";
      font-weight: 500;
      text-decoration: none;
      text-transform: uppercase;
      padding: 30px 30px;
      text-align: center;
      clip-path: polygon(4% 0, 94% 0, 100% 50%, 90% 130%, 8% 150%, 0 50%);
      background-color: #D9F8FA;
    }
    
    .start-end {
      display:inline-block;
      position: relative;
      color: #7ED8F2;
      font-family: "Arial";
      font-weight: 500;
      text-decoration: none;
      text-transform: uppercase;
      padding: 30px 30px;
      text-align: center;
      clip-path: polygon(20% 0, 82% 0, 100% 50%, 80% 100%, 40% 150%, 0 50%);
      background-color: #D9F8FA;
    }
    .start-end:hover {cursor: pointer;}
    .block-background {
      display:inline-block;
      position: relative;
      color: #fff;
      font-family: "Arial";
      font-weight: 500;
      text-decoration: none;
      text-transform: uppercase;
      padding: 10px 5px 0px 35px;
      text-align: center;
      clip-path: polygon(4% 0, 94% 0, 100% 50%, 90% 130%, 8% 150%, 0 50%);
      background-color: #D9F8FA;
    }
    .node {
      filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.6));
    }
    .node {
      display:inline-block;
      position: relative;
      color: #fff;
    border: 15px #C0080B;
      font-weight: 500;
      font-family: "Arial";
      text-decoration: none;
      text-transform: uppercase;
      padding: 0px 30px;
      text-align: center;
      clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);
      background-color: #7ED8F2;
    border: 10px;
    }    
    .node:hover {cursor: pointer;}
		.container {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}
	.left-element {
		width: 50%;
		height: 400px;
		clip-path: polygon(4% 0, 94% 0, 100% 50%, 90% 130%, 8% 150%, 0 50%);
		background-color: #1a237e;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20px;
		color: #fff;
		font-size: 2rem;
		font-weight: bold;
	}

	.left-element .inner-elements {
		width: 100%;
		height: 50%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.left-element .inner-elements .blue-box {
		width: 80%;
		height: 45%;
		background-color: #90caf9;
		clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #1a237e;
		font-size: 1.5rem;
		font-weight: bold;
		text-align: center;
	}

	.right-element {
		width: 50%;
		height: 400px;
		clip-path: polygon(4% 0, 94% 0, 100% 50%, 90% 130%, 8% 150%, 0 50%);
		background-color: #1a237e;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20px;
		color: #fff;
		font-size: 2rem;
		font-weight: bold;
	}
    `
    // return css`
    //   .maindiv{
    //     position: relative;
    //   }
    //   html, body {
    //     --color: hsla( 020, 075%, 050%, 1.0 );
    //     display: block;
    //     width: 100vw;
    //     height: 100vh;
    //     background-color: hsla( 180, 025%, 025%, 1.0 );
    //     font-family: 'MS PGothic';
    //     color: white;
    //     margin: 0;
    //     text-align: center;
    //   }
      
    //   .blocks-background {
    //     /* display:inline-block; */
    //     position: relative;
    //     color: #fff;
    //     font-family: "Arial";
    //     font-weight: 500;
    //     text-decoration: none;
    //     text-transform: uppercase;
    //     padding: 30px 30px;
    //     text-align: center;
    //     clip-path: polygon(4% 0, 94% 0, 100% 50%, 90% 130%, 8% 150%, 0 50%);
    //     background-color: #D9F8FA;
    //   }

    //   p {
    //     position: absolute;
    //     top: 40vmin;
    //     width: 100vw;
    //     font-size: 5vmin;
    //   }
      
    //   node {
    //     display: inline-block;
    //     /* margin-top: 5vmin; */
    //     border: 1px solid var( --color );
    //     height: attr(elementh);
    //     width: 13vmin;    
    //     content-align: center;
    //     font-color:white;    
    //     padding: 30px;
    //   }
    //   div.node {
    //     display: inline-block;
    //     margin-top: vmin;
    //     border: 1px solid var( --color );
    //     height: attr(elementh);
    //     width: 15vmin;    
    //     content-align: center;
    //     font-color:white;    
    //     padding: 10px;
    //   }
    //   div.node:hover{
    //     font-color:red;    
    //     background-color: red;
    //     -webkit-transition: all 0.2s ease-in;
    //     transition: all 0.2s ease-in;
    //   }
    //   div.node:before {        
    //     content: attr(title);
    //     clip-path: polygon(4% 0, 94% 0, 100% 50%, 90% 130%, 8% 150%, 0 50%);
    //     height: 100%;
    //     width: 100%;
    //     display:inline-block;
    //     position: relative;
    //     color: rgb(255, 255, 255);
    //     font-family: "Arial";
    //     font-weight: 1500;
    //     text-decoration: none;
    //     text-transform: uppercase;
    //     padding: 30px 30px;
    //     text-align: center;
    //     clip-path: polygon(20% 0, 82% 0, 100% 50%, 80% 100%, 40% 150%, 0 50%);
    //     background-color: rgb(126, 216, 242);
    //   }      
      
    //   node:before {        
    //     content: attr(title);
    //     clip-path: polygon(4% 0, 94% 0, 100% 50%, 90% 130%, 8% 150%, 0 50%);
    //     height: 100%;
    //     width: 100%;
    //     display:inline-block;
    //     position: relative;
    //     color: rgb(255, 255, 255);
    //     font-family: "Arial";
    //     font-weight: 1500;
    //     text-decoration: none;
    //     text-transform: uppercase;
    //     padding: 30px 30px;
    //     text-align: center;
    //     clip-path: polygon(20% 0, 82% 0, 100% 50%, 80% 100%, 40% 150%, 0 50%);
    //     background-color: rgb(126, 216, 242);
    //   }      
    //   .btn-2 {
    //     filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.6));
    //   }
    //   .btn-2 {
    //     display:inline-block;
    //     position: relative;
    //     color: #fff;
    //     border: 15px #C0080B;
    //     font-weight: 500;
    //     font-family: "Arial";
    //     text-decoration: none;
    //     text-transform: uppercase;
    //     padding: 15px 50px;
    //     text-align: center;
    //     clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);
    //     background-color: #7ED8F2;
    //   border: 10px;
    //   }
    //   .btn-1 {
    //     display:inline-block;
    //     position: relative;
    //     color: #fff;
    //     font-family: "Arial";
    //     font-weight: 500;
    //     text-decoration: none;
    //     text-transform: uppercase;
    //     padding: 30px 30px;
    //     text-align: center;
    //     clip-path: polygon(4% 0, 94% 0, 100% 50%, 90% 130%, 8% 150%, 0 50%);
    //     background-color: #D9F8FA;
    //   } 
    //   .btn-1a {
    //     display:inline-block;
    //     position: relative;
    //     color: #7ED8F2;
    //     font-family: "Arial";
    //     font-weight: 500;
    //     text-decoration: none;
    //     text-transform: uppercase;
    //     padding: 30px 30px;
    //     text-align: center;
    //     clip-path: polygon(20% 0, 82% 0, 100% 50%, 80% 100%, 40% 150%, 0 50%);
    //     background-color: #D9F8FA;
    //   }

    //   .maindiv{
    //     width: 1050px;
    //     }
    //     .btn-2 {
    //     filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.6));
    //   }
    //   .btn-2 {
    //     display:inline-block;
    //     position: relative;
    //     color: #fff;
    //   border: 15px #C0080B;
    //     font-weight: 500;
    //     font-family: "Arial";
    //     text-decoration: none;
    //     text-transform: uppercase;
    //     padding: 15px 50px;
    //     text-align: center;
    //     clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);
    //     background-color: #7ED8F2;
    //   border: 10px;
    //   }
    //   .btn-1 {
    //     display:inline-block;
    //     position: relative;
    //     color: #fff;
    //     font-family: "Arial";
    //     font-weight: 500;
    //     text-decoration: none;
    //     text-transform: uppercase;
    //     padding: 30px 30px;
    //     text-align: center;
    //     clip-path: polygon(4% 0, 94% 0, 100% 50%, 90% 130%, 8% 150%, 0 50%);
    //     background-color: #D9F8FA;
    //   }
      
    //   .start-end {
    //     display:inline-block;
    //     position: relative;
    //     color: #7ED8F2;
    //     font-family: "Arial";
    //     font-weight: 500;
    //     text-decoration: none;
    //     text-transform: uppercase;
    //     padding: 30px 30px;
    //     text-align: center;
    //     clip-path: polygon(20% 0, 82% 0, 100% 50%, 80% 100%, 40% 150%, 0 50%);
    //     background-color: #D9F8FA;
    //   }
    //   .block-background {
    //     display:inline-block;
    //     position: relative;
    //     color: #fff;
    //     font-family: "Arial";
    //     font-weight: 500;
    //     text-decoration: none;
    //     text-transform: uppercase;
    //     padding: 10px 5px 0px 35px;
    //     text-align: center;
    //     clip-path: polygon(4% 0, 94% 0, 100% 50%, 90% 130%, 8% 150%, 0 50%);
    //     background-color: #D9F8FA;
    //   }
    //   .node {
    //     filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.6));
    //   }
    //   .node {
    //     display:inline-block;
    //     position: relative;
    //     color: #fff;
    //   border: 15px #C0080B;
    //     font-weight: 500;
    //     font-family: "Arial";
    //     text-decoration: none;
    //     text-transform: uppercase;
    //     padding: 0px 30px;
    //     text-align: center;
    //     clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);
    //     background-color: #7ED8F2;
    //   border: 10px;
    //   }      
    // `;
  }

    static get properties() {
        return {
            tabsMainViewModelFromProcModel: {type: Object},
            viewModelFromProcModel: {type: Object},        

            config: { type: Object },
            procName: { type: String },
            ready:{type: Boolean},
            viewName: { type: String },
            filterName: { type: String },
            lang: { type: String },
            procInstanceName:{type: String},
    
        }
    }
    constructor() {
        super()
        this.viewModelFromProcModel={} 
        this.tabsMainViewModelFromProcModel={}
console.log('constructor flowchart')
        this.ready=false;
        this.config={}
  
    }
    firstUpdated() {
      const nodes = this.shadowRoot.querySelectorAll('.node');
      nodes.forEach(node => {
        node.addEventListener('click', () => {
          alert(`Clicked on ${node.textContent}`);
        });
      });
    }
    render() {
      return html`
        <div class="flow">
          <div class="node start">Start</div>
          <div class="node location">Location 1</div>
          <div class="node location">Location 2</div>
          <div class="node person">Person 1</div>
          <div class="node person">Person 2</div>
          <div class="node end">End</div>
        </div>
      `;
    }
    renderFran() {          
        return html`  
        ${this.viewModelFromProcModel ? 
        html`
            ${this.home()}              
        `: nothing}`
    }
    selectedMenu(route) {
      this.shadowRoot.querySelectorAll("sp-action-menu").forEach(s => s.open = false)
      this.navigate(route)
    }    
    elementClickedDynamic(e){
      console.log('elementClicked', this.procName,  e)
      let vwName='SampleMicroorganism' 
      //e.target.viewname
      let fltrName='MicroOrganismPERS' 
      //e.filtername
      this.selectedMenu('/dashboard/procedures?procName='+this.procName+
      '&viewName='+vwName+'&filterName='+fltrName)
      // this.trProc.ready = false
      // this.trProc.procName = this.procName
      // this.trProc.viewName = e.target.viewName
      // this.trProc.filterName = e.target.filterName
      // this.trProc.resetView()
      // this.trProc.authorized()
      // this.trProc.render()
      
    }
    elementClicked(vwName, fltrName){
      console.log('elementClicked', this.procName,  vwName, fltrName)
      this.selectedMenu('/dashboard/procedures?procName='+this.procName+
      '&viewName='+vwName+'&filterName='+fltrName)
    }
    homeAI(){
      return html`
        <div class="container">
        <div class="left-element">
          <div class="inner-elements">
            <div class="blue-box">Element 1</div>
            <div class="blue-box">Element 2</div>
          </div>
        </div>
        <div class="right-element">
          <h1>Hola</h1>
        </div>
      </div>
  
      `
    }
    home(){
      return html`


      <div class="maindiv">
      <div @click=${()=>this.elementClicked("LogSamples", "SampleLogin")} class="start-end" style="top: 50px; left: 20px;"><span>New <br>Samples</span></div>
      
      <div class="block-background" style="left:0px;">
        <div style="display:inline-grid;">
        <a @click=${()=>this.elementClicked("SamplePendingSampling", "SamplingSMP")} 
          class="node" style="font-size: 12px;"><span style="line-height: 40px">Sampling</span></a>
        <a @click=${()=>this.elementClicked("SamplePendingSamplingInterval", "SamplingSMP")} 
          class="node" style="font-size: 12px;"><span style="line-height: 40px">Sampling Static</span></a>
      </div>
        <div class="btn-2" style="left: -400px; top: -65px;"><span style="line-height: 40px">Incubar</span></div>
        <div @click=${()=>this.elementClicked("SamplePlateReading", "SamplingSMPlateReadingSPP")} 
          class="node" style="left: -30px; top:-6px; padding: 15px 20px;"><span>Plate<br>Reading</span></div>
        <div @click=${()=>this.elementClicked("SamplePlateReadingSecondEntry", "PlateReadingSecondEntrySMP")} 
          class="node" style="left: -30px; top:-6px; padding: 15px 20px;"><span>Plate Reading<br>Second Entry</span></div>
        <div @click=${()=>this.elementClicked("SampleMicroorganism", "MicroOrganismSMP")} 
          class="node" style="left: -25px; top:-6px;padding: 15px 20px;"><span>Microorganism<br>Identification</span></div>
      </div>
      <div class="block-background" style="top: 8px; left:130px;">
      <div style="display:inline-grid;">
        <a @click=${()=>this.elementClicked("SamplePendingSampling", "SamplingPERS")} 
          class="node" style="font-size: 12px;"><span style="line-height: 40px">Sampling</span></a>
          <a @click=${()=>this.elementClicked("SamplePendingSamplingInterval", "SamplingPERS")} 
          class="node" style="font-size: 12px;"><span style="line-height: 40px">Sampling Static</span></a>
      </div>          
        <div @click=${()=>this.elementClicked("SampleIncubation", "")} 
          class="btn-2" style="left: -369px; top: -102px;"><span style="line-height: 40px">Incubar</span></div>
        <div @click=${()=>this.elementClicked("SamplePlateReading", "PlateReadingPERS")} 
          class="node" style="left: -30px; top:-10px; padding: 15px 20px;"><span>Plate<br>Reading</span></div>
        <div @click=${()=>this.elementClicked("SamplePlateReadingSecondEntry", "PlateReadingSecondEntryPERS")} 
          class="node" style="left: -30px; top:-10px; padding: 15px 20px;"><span>Plate Reading<br>Second Entry</span></div>
        <div @click=${()=>this.elementClicked("SampleMicroorganism", "MicroOrganismPERS")} 
          class="node" style="left: -25px; top:-10px; padding: 15px 20px;"><span>Microorganism<br>Identification</span></div>
      </div>
        <div @click=${()=>this.elementClicked("SampleIncubation", "")} 
          class="btn-2" style="left: -488px; top: -68px;"><span style="line-height: 40px">Incubar</span></div>
      <div class="start-end" style="top: -68px; left: -70px; padding: 30px 40px;"><span style="color: #D9F8FA;"> . </span><span>End</span><span style="color: #D9F8FA;"> . </span></div>
      </div>            
      `
    }
    homeResponsive(){
      return html`
        <div class="maindiv">
          <node @click=${this.elementClicked} title='login sample' style="height: 2vmin; top: 1.5vmin; left: 120px;"></node>
          <div class="blocks-background" style="top: -6.5vmin; left:20vmin;">
            <node @click=${this.elementClicked} title='login sample' style="height: 2vmin; top: 30px; left: 320px;"></node>
            <node @click=${this.elementClicked} title='login sample' style="height: 2vmin; top: 30px; left: 320px;"></node>
            ...............
          </div>
          <div class="blocks-background" style="top: -3.5vmin; left:20vmin;">
            <node @click=${this.elementClicked} title='login sample' style="height: 2vmin; top: 380px; left: 320px;"></node>
            <node @click=${this.elementClicked} title='login sample' style="height: 2vmin; top: 380px; left: 320px;"></node>
            ...............
          </div>
        </div>
      
      `
    }
    flowChart(){
      console.log('Flowchart')
        //this.resetView()
        return html`
        <div class="template-wrap">
        <div class="maindiv">
                
        <div @click=${this.elementClicked} class="node" title="f333dasdassad" style="height: 2vmin; top: 80px; left: 320px;"></div>
        <node @click=${this.elementClicked} title='f2' style="height: 2vmin; top: 380px; left: 42%></node>
        bv
        <div class="btn-1a" style="top: 80px; left: 20px;"><span @click=${this.elementClicked}></span></div>
        
        <div class="btn-1" @click=${this.elementClicked} viewname="SampleMicroorganism"
        filtername="MicroOrganismPERS"  >
          <a href=""
          
          id="sampleIncubation" class="btn-2"><span style="line-height: 40px">muestreo</span></a>
          <div class="btn-2" style="top: 65px; opacity: 0.0;"><span style="line-height: 40px">Incubar</span></div>
          <div class="btn-2" style="top: 8px"><span>Lectura <br>de placas</span></div>
          <div class="btn-2" style="top: 8px"><span>Identificación<br>Microorganismos</span></div></div>
          <div class="btn-1" style="top: 8px; left:152px;">
          <a href="#" class="btn-2"><span style="line-height: 40px">muestreo</span></a>
          <div class="btn-2" style="top: -65px; opacity: 0.0;"><span style="line-height: 40px">Incubar</span></div>
          <div class="btn-2" style="top: 8px"><span>Lectura <br>de placas</span></div>
          <div class="btn-2" style="top: 8px"><span>Identificación<br>Microorganismos</span></div></div>
          <div class="btn-1a" style="top: -60px; left: 120px;"><span>Lectura <br>de placas</span></div>
          <div class="btn-2" style="left: -650px; top: -65px; opacity: 0.5;"><span style="line-height: 40px">Incubar</span></div>         
      </div>          
      </div>    
        `
    }
    
}
window.customElements.define('home-air', HomeAir);