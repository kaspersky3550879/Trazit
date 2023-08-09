import { Card } from '@spectrum-web-components/card/src/Card.js';

class CardExt extends Card {
  static get properties() {
    return {
      nonSubHeading: { type: Boolean, reflect: true }
    };
  }

  constructor() {
    super(...arguments);
    this.nonSubHeading = false
  }

  updated(changes) {
    super.updated(changes)
    if (changes.has('nonSubHeading') && this.nonSubHeading) {
      this.shadowRoot.querySelector("div.content").style.display = 'none'
    }
    this.shadowRoot.querySelector("div.body").style.display = 'none'  
    let photoObj=this.shadowRoot.querySelector("sp-asset#cover-photo")
    if (photoObj!==undefined&&photoObj!==null){
      photoObj.style.backgroundColor = 'transparent'      
    }        
  }
}
customElements.define('sp-card-ext', CardExt);