import { html, css } from 'lit';
import { CommonCore } from '@trazit/common-core';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@spectrum-web-components/card/sp-card';
import '@spectrum-web-components/split-view/sp-split-view';

const notAvail = {
  "label_en": "not available",
  "label_es": "no disponible"
}

export class VideoTutorial extends CommonCore {
  static get styles() {
    return [
      Layouts,
      css`
      :host {
        display: block;
      }
      :host([hidden]) {
        display: none;
      }
      sp-card {
        width: 400px;
        margin: 10px;
        --spectrum-card-coverphoto-height: 300px;
        --spectrum-card-body-header-height: 50px;
        --spectrum-card-body-padding-top: 0;
        padding-bottom: 40px;
      }
      .notAvail {
        text-align: center:
        height: 300px;
        width: 400px;
      }
      sp-split-view {
        height: calc(100vh - 150px);
      }
      #leftSplit {
        padding: 10px;
      }
      #leftSplit::-webkit-scrollbar, #rightSplit::-webkit-scrollbar {
        display: none;
      }
      label {
        color: blue;
      }
      div[hidden] {
        display: none;
      }
      @media (max-width: 460px) {
        sp-card {
          width: 300px;
          margin: 5px;
          --spectrum-card-coverphoto-height: 300px;
          --spectrum-card-body-header-height: 30px;
          --spectrum-card-body-padding-top: 0;
          padding-bottom: 20px;
        }
        sp-card h1 {
          font-size: 20px;
        }
        sp-card h2 {
          font-size: 12px;
        }
        .notAvail {
          width: 300px;
        }
      }
      `
    ];
  }

  static get properties() {
    return {
      categories: { type: Array },
      filterVideos: { type: Array },
      searchVideos: { type: Array },
      timeout: { type: Object }
    };
  }

  constructor() {
    super();
    this.categories = [];
    this.filterVideos = [];
    this.searchVideos = [];
  }

  render() {
    return html`
      ${this.desktop ?
        html`
        <sp-split-view resizable splitter-pos="300">
          <div id="leftSplit">
            <select @change=${this.catChanged}>
              <option value="-1">All categories</option>
              ${this.categories.map(c=>
                html`<option value=${c.id}>${c.category}</option>`
              )}
            </select><br>
            <input type="search" placeholder="Search Video" @input=${this.searchChanged}>
          </div>
          <div id="rightSplit">
            ${this.searchVideos.map((v,i) =>
              html`
                <sp-card>
                  <h3 slot="heading">${v["title_"+this.lang]}</h3>
                  <h3 slot="subheading">${v["summary_"+this.lang]}</h3>
                  ${v['url_'+this.lang] ?
                    html`
                    <video id="${v["title_"+this.lang]}-${i}" controls slot="cover-photo"
                      @play=${()=>this.stopOthers(`${v["title_"+this.lang]}-${i}`)}>
                      <source type="video/mp4" src="https://drive.google.com/uc?export=download&id=${v['url_'+ this.lang]}">
                    </video>
                    ` :
                    html`
                    <div class="notAvail">
                      ${notAvail["label_"+this.lang]}
                    </div>
                    `
                  }
                </sp-card>
              `
            )}
          </div>
        </sp-split-view>
        ` :
        html`
        <div id="mobile">
          <div id="leftSplit">
            <select @change=${this.catChanged}>
              <option value="">-- Filter by Category --</option>
              <option value="-1">All categories</option>
              ${this.categories.map(c=>
                html`<option value=${c.id}>${c.category}</option>`
              )}
            </select><br>
            <input type="search" placeholder="Search Video" @input=${this.searchChanged}>
            <hr>
            ${this.searchVideos.map((v,i) =>
              html`
                <sp-card>
                  <h1 slot="heading">${v["title_"+this.lang]}</h1>
                  <h2 slot="subheading">${v["summary_"+this.lang]}</h2>
                  ${v['url_'+this.lang] ?
                    html`
                    <video id="${v["title_"+this.lang]}-${i}" controls slot="cover-photo"
                      @play=${()=>this.stopOthers(`${v["title_"+this.lang]}-${i}`)}>
                      <source type="video/mp4" src="${v['url_'+ this.lang]}">
                    </video>
                    ` :
                    html`
                    <div class="notAvail">
                      ${notAvail["label_"+this.lang]}
                    </div>
                    `
                  }
                </sp-card>
              `
            )}
          </div>
        </div>
        `
      }
    `;
  }

  get search() {
    return this.shadowRoot.querySelector("input[type=search]")
  }

  authorized() {
    super.authorized();
    this.getVideos();
  }

  /**
   * Populating video items from the server
   */
  getVideos() {
    this.filterVideos = []
    this.searchVideos = []
    this.fetchApi(this.config.backendUrl + this.config.frontEndVideoTutorialsUrl + '?' + new URLSearchParams({
      actionName: "ALL_ACTIVE_VIDEO_TUTORIALS",
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      dbName: this.config.dbName
    }), false).then(j => {
      if (j) {
        this.categories = j
        j.forEach(c => {
          this.filterVideos = [
            ...this.filterVideos,
            ...c.videos
          ]
        })
        let setVideos = JSON.stringify(this.filterVideos)
        this.searchVideos = JSON.parse(setVideos)
      }
    })
  }

  /**
   * Stop other videos when playing one video
   * @param {*} v the playing video element
   */
  stopOthers(v) {
    let allVids = this.shadowRoot.querySelectorAll("video")
    allVids.forEach(vid => {
      if (vid.id != v) {
        vid.pause()
      }
    })
  }

  catChanged(e) {
    this.search.value = ""
    this.filterVideos = []
    if (e.target.value == -1) {
      this.categories.forEach(c => {
        this.filterVideos = [
          ...this.filterVideos,
          ...c.videos
        ]
      })
    } else {
      let findCat = this.categories.filter(c => c.id == e.target.value)
      if (findCat.length) {
        this.filterVideos = findCat[0].videos
      }
    }
    let setVideos = JSON.stringify(this.filterVideos)
    this.searchVideos = JSON.parse(setVideos)
  }

  searchChanged(e) {
    if (this.timeout) {  
      clearTimeout(this.timeout);
    }
    let key = e.target.value
    this.timeout = setTimeout(() => {
      if (key) {
        let setVideos = this.filterVideos.filter(v => v['summary_'+this.lang].toLowerCase().indexOf(key.toLowerCase()) >= 0 || v['title_'+this.lang].toLowerCase().indexOf(key.toLowerCase()) >= 0)
        this.searchVideos = setVideos
      } else {
        let setVideos = JSON.stringify(this.filterVideos)
        this.searchVideos = JSON.parse(setVideos)
      }
    }, 1000);
  }
}
