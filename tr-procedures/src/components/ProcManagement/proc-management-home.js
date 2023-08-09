import { html, css, nothing } from "lit";
import { ApiFunctions } from "../Api/ApiFunctions";
import { ProceduresManagement } from "../../0proc_models/ProceduresManagement";
import "@spectrum-web-components/split-view/sp-split-view";
import { CommonCore } from "@trazit/common-core";
import "../../components/ObjectByTabs/objecttabs-composition";
import { TrazitFormsElements } from "../GenericDialogs/TrazitFormsElements";
import { ProcManagementMethods } from "./ProcManagementMethods";

export class ProcManagementHome extends ProcManagementMethods(
  ApiFunctions(TrazitFormsElements(CommonCore))
) {
  static get styles() {
    return [
      css`
        :host {
          font-family: Montserrat;
          display: flex;
          flex-wrap: wrap;
        }
        .fade-in {
          opacity: 1;
          transition: opacity 2s ease-in-out;
        }
        .show {
          opacity: 0;
        }
        mwc-button {
          background-color: rgba(36, 192, 235, 1);
          font-family: Montserrat;
          font-weight: bold;
          font-size: 19px;
          --mdc-theme-primary: rgba(36, 192, 235, 1);
          border-radius: 32px;
          --mdc-button-horizontal-padding: 0px;
          --mdc-button-min-width: 20px;
        }
        mwc-button.mdc-button {
          min-width: 20px !important;
        }
        mwc-button.button {
          color: rgba(36, 192, 235, 1);
          font-family: Montserrat;
          font-weight: bold;
          font-size: 19px;
          background: rgb(36, 192, 235) none repeat scroll 0% 0%;
          font-family: Montserrat;
          font-weight: bold;
          font-size: 19px;
          color: white;
          border-color: transparent !important;
          --mdc-button-fill-color: red;
          --mdc-button-ink-color: blue;
          border-radius: 12px;
          min-width: 20px !important;
        }
        mwc-icon-button {
          color: rgba(36, 192, 235, 1);
          font-family: Montserrat;
          font-weight: bold;
          font-size: 19px;
          /* position: absolute; */
          cursor: zoom-in;
        }
        .mdc-icon-button {
          cursor: zoom-in;
        }
        #expand {
          position: absolute;
        }
        div.procCard {
          width: 100%;
          height: 200px;
          margin-bottom: 16px;
          transition: all 0.2s ease-in;
          border-radius: 12px 12px 0 0;
        }
        .procCard__footer {
          padding: 0 16px 16px;
          margin: 0;
        }

        .progress-bar {
          display: inline-block;
          width: 160px;
          height: 22px;
          background-color: #ddd;
          border-radius: 5px;
          color: white;
          padding-left: 5px;
          padding-top: 3px;
        }

        .bar {
          display: block;
          height: 100%;
          border-radius: 5px;
          padding-left: 10px;
        }

        /* Color ranges */
        [data-progress^="0"],
        [data-progress^="1"] {
          background-color: red;
        }

        [data-progress^="2"],
        [data-progress^="3"],
        [data-progress^="4"],
        [data-progress^="5"],
        [data-progress^="6"] {
          background-color: #ff8e00;
        }

        [data-progress^="7"],
        [data-progress^="8"],
        [data-progress^="9"] {
          background-color: rgb(156, 224, 100);
        }

        [data-progress^="100"] {
          background-color: green;
        }

        .tooltip-container {
          position: relative;
          display: inline-block;
        }

        .tooltip {
          font-family: Montserrat;
          visibility: hidden;
          opacity: 0;
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-10%);
          padding: 5px;
          background-color: white;
          color: #24c0eb;
          border-color: #24c0eb;
          border-block-style: solid;
          transition: all 0.3s ease-in-out;
          z-index: 1;
          width: 180px;
        }
        .tooltip-red {
          color: #800c00;
          border-color: #800c00;
        }
        .tooltip-blue {
          color: #24c0eb;
          border-color: #24c0eb;
        }

        .trigger:hover + .tooltip,
        .tooltip:hover {
          visibility: visible;
          opacity: 1;
          top: calc(100% + 5px);
        }
        sp-split-view {
          height: calc(100vh - 100px);
          --spectrum-dragbar-handle-width: 0px;
        }
        #splitter {
          width: 0px;
        }
        .splitter {
          background-color: blue;
        }
        .sp-split-view.collapsed {
          width: 0;
        }
        #leftSplit {
          padding: 10px;
          background-color: transparent;
          /* overflow: hidden; */
          overflow-y: scroll;
          width: 290px;
          /* top:30px; */
          position: relative;
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
        #rightSplit {
          padding: 0px;
          background-color: transparent;
          width: calc(96vw - 290px);
          transition: width 0.5s ease-in-out;
          position: relative;
        }
        #rightSplit.collapsed {
          width: 96vw;
        }
        #endpointName {
          box-shadow: 16px 14px 20px rgba(20, 78, 117, 0.5);
          overflow-y: auto;
        }
        .accordion-item {
          border: 1px solid rgba(36, 192, 235, 1);
          padding: 10px;
          position: relative;
        }
        .accordion-title {
          cursor: pointer;
          display: flex;
          padding-left: 5px;
          color: rgba(36, 192, 235, 1);
          font-family: Montserrat;
          font-weight: bold;
          font-size: 18px;
          --mdc-theme-primary: rgba(36, 192, 235, 1);
        }
        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.2s ease-out;
        }
        .accordion-item[data-active] .accordion-content {
          max-height: 500px;
        }
        span.selected-proc-instance {
          color: #1473e6;
          font-size: 30px;
          margin-top: 10px;
          font-weight: bold;
        }
      `,
    ];
  }
  static get properties() {
    return {
      config: { type: Object },
      procMgrModel: { type: Object },
      procDefinitionViewCollapsed: { type: Boolean },
      procDeployViewCollapsed: { type: Boolean },
      procDeployViewCheckerCollapsed: { type: Boolean },
      procTestingCoverageCollapsed: { type: Boolean },
      procTestingScriptsCollapsed: { type: Boolean },
      selectedProcInstance: { type: Object },
      viewModelFromProcModel: { type: Object },
      show: { type: Boolean },
      selectedViewDefinition: { type: Object },
      selectedItems: { type: Array },
      procedureVersion: { type: Number },
      procedureName: { type: String },
      procInstanceName: { type: String }, // This one is for the buttons and should be fix to proc_management to get this procedure model
      actionOutput: { type: Object },
      allProcedures: { type: Array },
      leftSplitDisplayed: { type: Boolean },
      selectedTabModelFromProcModel: { type: Array },
      localModel: { type: Boolean },
    };
  }
  constructor() {
    super();
    this.localModel = false;
    this.leftSplitDisplayed = true;
    this.show = false;
    this.selectedViewDefinition = {};
    this.actionOutput = {};
    this.selectedItems = [];
    this.allProcedures = [];
    if (!customElements.get("mwc-notched-outline")) {
      customElements.define("mwc-notched-outline", NotchedOutline);
    }
    this.viewModelFromProcModel = undefined;
    this.selectedProcInstance = undefined;
    this.viewModelFromProcModel = {};
    this.selectedTabModelFromProcModel = [];
    this.viewModelFromProcModel.viewQuery = {
      actionName: "ALL_PROCEDURES_DEFINITION",
      label_en: "All Procedures Definition",
      label_es: "Definición de todos los procesos",
      endPoint: "/appProcMgr/RequirementsProcedureDefinitionAPIQueries",
      notUseGrid: true,
      variableName: "allProcedures",
      endPointResponseVariableName: "all_platform_procedures_list",
    };
    //this.viewModelFromProcModel=ProcManagement.ProcedureDefinition
    // console.log('constructor', 'this.config', this.config, this.viewModelFromProcModel)

    if (this.localModel) {
      this.allProcedures =
        ProceduresManagement.ProceduresFake.all_platform_procedures_list;
      this.selectedProcInstance = this.allProcedures[0];
      //this.selectSectionView(0)
      this.selectedViewDefinition = this.selectedProcInstance.views[0];

      if (this.selectedViewDefinition.alternative_endpoint_data !== undefined) {
        //this.objecttabsComposition.selectedItem = this.selectedProcInstance[this.selectedViewDefinition.alternative_endpoint_data]
        this.selectedItem =
          this.selectedProcInstance[
            this.selectedViewDefinition.alternative_endpoint_data
          ];
      } else {
        //this.objecttabsComposition.selectedItem = this.selectedProcInstance.definition
        this.selectedItem = this.selectedProcInstance.definition;
      }
    } else {
      this.GetViewData(this.viewModelFromProcModel.viewQuery);
    }
  }
  resetView() {
    this.selectedProcInstance = undefined;
    this.selectedViewDefinition = undefined;
    //this.GetViewData(this.viewModelFromProcModel.viewQuery)
    if (this.localModel) {
      this.allProcedures =
        ProceduresManagement.ProceduresFake.all_platform_procedures_list;
      this.render();
    } else {
      this.GetViewData(this.viewModelFromProcModel.viewQuery);
      this.render();
    }
  }

  selectSectionView(index, notResetSelectedView) {
    if (notResetSelectedView === undefined || !notResetSelectedView) {
      this.selectedItem = {};
    }
    this.selectedTabModelFromProcModel = [];
    this.selectedViewDefinition = {};
    this.selectedViewDefinition = this.selectedProcInstance.views[index];
    this.procedureName = this.selectedProcInstance.procedure_name;
    this.procedureVersion = this.selectedProcInstance.procedure_version;
    this.procInstanceName = this.selectedProcInstance.proc_instance_name;

    //console.log('this.selectedViewDefinition', this.selectedViewDefinition, 'procInstanceName', this.procInstanceName)
    if (this.objecttabsComposition == null) {
      return;
    }
    this.selectedProcInstance[0] = this.selectedProcInstance;

    if (this.selectedViewDefinition.alternative_endpoint_data !== undefined) {
      this.selectedItem =
        this.selectedProcInstance[
          this.selectedViewDefinition.alternative_endpoint_data
        ];
      this.selectedTabModelFromProcModel = this.selectedViewDefinition;
    } else {
      this.selectedTabModelFromProcModel = this.selectedViewDefinition;
      this.selectedItem = this.selectedProcInstance.definition;
    }
    this.objecttabsComposition.isProcManagement = true;
    //    console.log('selectedItem', this.selectedItem)
    this.objecttabsComposition.render();
  }

  handleMouseMove(evt) {
    const el = evt.target;
    const { layerX, layerY } = evt;
    const height = el.clientHeight + 70;
    const width = el.clientWidth + 70;
    const yRotation = ((layerX - width / 2) / width) * 20;
    const xRotation = ((layerY - width / 2) / height) * 20;
    const transform = `perspective(300px) scale(0.9) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    el.style.transform = transform;
  }
  handleMouseOut(evt) {
    const el = evt.target;
    el.style.transform = `perspective(300px) scale(1) rotateX(0) rotateY(0)`;
  }

  updated(changedProperties) {
    if (changedProperties.has("show")) {
      const element = this.shadowRoot.querySelector(".fade-in");
      if (this.show) {
        if (element !== null) {
          element.classList.add("fade-in");
        }
      } else {
        if (element !== null) {
          element.classList.remove("fade-in");
        }
      }
      if (changedProperties.has("selectedProcInstance")) {
        this.selectedViewDefinition = this.selectedProcInstance.views[0];
        this.selectSectionView(0);
      }
    }
    if (changedProperties.has("this.allProcedures")) {
      // find the selected object in the new allArr array
      this.selectedProcInstance = this.allProcedures.find(
        (obj) =>
          obj.proc_instance_name ===
          this.selectedProcInstance.proc_instance_name
      );
    }
    const items = this.shadowRoot.querySelectorAll(".accordion-item");
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const isActive = item.hasAttribute("data-active");
      //const content = item.querySelector('.accordion-content');
      // const content = this.shadowRoot.querySelector('div#section'+i+'_detail');

      // if (isActive) {
      //   content.style.maxHeight = content.scrollHeight + 'px';
      // } else {
      //   content.style.maxHeight = null;
      // }
    }
  }
  async authorized() {
    //console.log('procManagementHome async authorized')
    super.authorized();
  }
  connectedCallback() {
    super.connectedCallback();
    this.show = true;
    //this.selectedProcInstance=this.allProcedures[0]
  }
  fieldsToDiscard(fldName) {
    if (fldName === "navigation_icon_name") {
      return true;
    }
    if (fldName === "active") {
      return true;
    }
    if (fldName.includes("label") && !fldName.includes(this.lang)) {
      return true;
    }
    return false;
  }

  // updated(changedProperties) {
  //   super.updated(changedProperties);
  //   if (document.location.hash === '' || document.location.hash === '#') {
  //     document.location.hash = '#product_one';
  //   }
  // }
  render() {
    return html`
      ${this.selectedProcInstance === undefined
        ? html`
            <style>
              $red: #aa392e;
              $blue: #1b1c38;
              $grey: #9f9b98;
              $black: #111111;
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: Montserrat, sans-serif;
              }
              .container {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
              }

              .product_grid {
                width: 100%;
                padding: 16px 10px;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
                gap: 24px;
              }

              @media (min-width: 990px) {
                .product_grid {
                  gap: 36px;
                  padding: 24px 80px;
                }
              }

              .product_container {
                position: relative;
                border-radius: 12px;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06),
                  0 4px 4px rgba(0, 0, 0, 0.03);
                box-sizing: border-box;
                transition: all 0.4s ease-in !important;
                cursor: pointer;

                &:hover {
                  box-shadow: none;
                  box-shadow: 0 10px 20px rgba(36, 192, 235, 0.19),
                    0 6px 6px rgba(36, 192, 235, 0.1);
                }
              }

              .product {
                position: absolute;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                color: #fff;
                box-shadow: -3px 0px 10px -2px rgba(0, 0, 0, 0.14);
                opacity: 0;
                transition: all 1s ease 0.5s;

                .title {
                  font-size: 19px;
                  padding-bottom: 10px;
                  font-weight: bolder;
                }

                .price {
                  font-size: 20px;
                }

                .image {
                  width: 40%;
                  padding: 30px 0;
                  transform: scale(2.5);
                }
              }

              .product > * {
                transform: translateY(-50px);
                opacity: 0;
                transition: all 0.8s ease;
              }

              .product:target {
                opacity: 1;
                z-index: 7;

                & .title {
                  transition-delay: 1.2s;
                }

                & .price {
                  transition-delay: 0.6s;
                }

                & .image {
                  transform: scale(1);
                  transition-delay: 0.8s;
                }

                & .color {
                  transition-delay: 1s;
                }
              }

              .product:target > * {
                transform: translateY(0px);
                opacity: 1;
                transition: all 0.8s ease;
              }

              #product_one,
              .first_link {
                background: radial-gradient(lighten($red, 0.8), $red);
              }

              #product_two,
              .second_link {
                background: radial-gradient(lighten($blue, 0.8), $blue);
              }

              #product_three,
              .third_link {
                background: radial-gradient(lighten($grey, 0.8), $grey);
              }

              #product_four,
              .fourth_link {
                background: radial-gradient(lighten($black, 0.8), $black);
              }

              .nav_btns {
                display: flex;
                z-index: 70;
                position: absolute;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);

                .link {
                  width: 25px;
                  height: 25px;
                  border-radius: 50%;
                  margin: 5px;
                  border: 1px solid white;
                }
              }
            </style>
            <objecttabs-composition></objecttabs-composition>
            <div class="product_grid">
              ${this.allProcedures.map(
                (p) =>
                  html`
                    <div
                      class="product_container ${this.show
                        ? "fade-in"
                        : "show"}"
                    >
                      <div id="product_one22" class="xproduct">
                        <sp-card-ext
                          heading="${p.name}"
                          id="${p.proc_instance_name}"
                          subheading="'this[elem.subheadingObj].value'"
                          @click=${this.selectedProcedureInstance}
                        >
                          <div
                            class="procCard"
                            style="background:url(${p.navigation_icon_name ===
                            undefined
                              ? "trazit-logo.jpg"
                              : p.navigation_icon_name}) no-repeat center; 
                              height: 150px;
                              background-size: cover;"
                            slot="cover-photo"
                            @mousemove="${this.handleMouseMove}"
                            @mouseout="${this.handleMouseOut}"
                          ></div>
                          <ul slot="footer" class="procCard__footer">
                            ${p.cardData === undefined
                              ? nothing
                              : html`
                                  ${p.cardData.title === undefined
                                    ? nothing
                                    : html`<p"><span style="font-weight: bold; font-size:18px;">${
                                        p.cardData.title
                                      }</span>
                  ${
                    p.cardData.subtitle === undefined
                      ? nothing
                      : html` <span style="font-size:16px;"
                          >(${p.cardData.subtitle})</span
                        >`
                  }
                  </p>`}
                                  ${p.cardData.fields === undefined
                                    ? nothing
                                    : html`
                                        ${p.cardData.fields.map(
                                          (d) =>
                                            html`
                                              ${this.fieldsToDiscard(
                                                d.field_name
                                              ) === true
                                                ? nothing
                                                : html`<li
                                                    style="color: rgba(36, 57, 170, 0.9); position:relative; left:20px;"
                                                  >
                                                    <b>${d.field_name}:</b>
                                                    ${d.field_value}
                                                  </li>`}
                                            `
                                        )}
                                      `}
                                  ${p.cardData.summary === undefined
                                    ? nothing
                                    : html`
                                        ${p.cardData.summary.map(
                                          (d) =>
                                            html`
                      <p>
                      <div style="display:inline-flex;">  
                      <div class="tooltip-container">                      
                        ${
                          d.signed !== undefined && d.signed === true
                            ? html`
                                <img
                                  class="trigger"
                                  style="height:25px; padding-right: 5px;"
                                  src="/images/procedures_pictures/Pass.jpg"
                                />
                                <div class="tooltip tooltip-blue">
                                  Step done and signed!
                                </div>
                              `
                            : html`
                                <img
                                  class="trigger"
                                  style="height:25px; padding-right: 5px;"
                                  src="/images/procedures_pictures/NotPass.png"
                                />
                                <div class="tooltip tooltip-red">
                                  Step not completed neither signed!
                                </div>
                              `
                        }
                      </div>
                      <div class="tooltip-container">
                          <div class="trigger progress-bar" data-progress="${
                            d.progress
                          }"><span class="bar">${d.section}: ${d.progress} ${
                                              d.progress_extra_text ===
                                              undefined
                                                ? ""
                                                : d.progress_extra_text
                                            }</span></div>
                          ${
                            d.tooltip == undefined
                              ? nothing
                              : html`<div class="tooltip tooltip-blue">
                                  ${d.tooltip}
                                </div>`
                          }
                      </div>
                      </div></p>
                      `
                                        )}
                                      `}
                                `}
                          </ul>
                        </sp-card-ext>
                      </div>
                    </div>
                  `
              )}
            </div>
          `
        : html`
            <div>
              ${this.selectedProcInstance.views === undefined
                ? nothing
                : html` <div>${this.selectedProcInstanceMainView()}</div>`}
            </div>
            <div></div>
          `}
    `;
  }

  toggleLeftSplitPane() {
    //console.log(this.leftSplitDisplayed)
    this.leftSplitDisplayed = !this.leftSplitDisplayed;
  }
  selectedProcInstanceMainView() {
    return html`
      ${this.desktop
        ? html`
            <sp-split-view show-divider=${this.showDivider}>
              <div
                id="leftSplit"
                class="${this.leftSplitDisplayed !== undefined &&
                this.leftSplitDisplayed
                  ? ""
                  : "collapsed"}"
              >
                <div id="endpointName">
                  ${this.selectedProcInstance.views.map(
                    (item, index) => html`
                      <div id="section${index}" class="accordion-item">
                        <div
                          class="layout horizontal center inline-flex wrap accordion-title"
                        >
                          ${this.sectionElement(item, index)}
                        </div>
                        ${this.sectionDetail(item, index)}
                      </div>
                    `
                  )}
                </div>
              </div>
              <div
                id="rightSplit"
                class="${this.leftSplitDisplayed !== undefined &&
                this.leftSplitDisplayed
                  ? ""
                  : "collapsed"}"
              >
                ${this.selectedProcessTitle()}
                ${this.selectedViewDefinition !== undefined &&
                this.selectedViewDefinition.view_definition !== undefined &&
                this.selectedViewDefinition
                  ? html`            
              <objecttabs-composition style="position:relative; left: 30px; top:10px; width:95%; display:block;" .selectedTabModelFromProcModel=${this.selectedViewDefinition.view_definition.reportElements}
              .lang=${this.lang} .procedureName=${this.procedureName} .procedureVersion=${this.procedureVersion} .procInstanceName=${this.procInstanceName} .config=${this.config}     
              .selectedItem=${this.selectedItem}      
              </objecttabs-composition>              

            `
                  : nothing}
              </div>
            </sp-split-view>
          `
        : html`
            <div id="mobile">
              ${this.selectedProcessTitle()}

              <div
                id="leftSplit"
                class="${this.leftSplitDisplayed !== undefined &&
                this.leftSplitDisplayed
                  ? ""
                  : "collapsed"}"
              >
                <div id="endpointName">
                  ${this.selectedProcInstance.views.map(
                    (item, index) => html`
                      <div id="section${index}" class="accordion-item">
                        <div
                          class="layout horizontal center flex wrap accordion-title"
                        >
                          ${item.view_definition !== undefined &&
                          item.view_definition.filter !== undefined &&
                          item.view_definition.filterFields !== undefined &&
                          item.view_definition.filterFields.length > 0
                            ? html`
                                <mwc-button
                                  dense
                                  raised
                                  label=""
                                  icon="${item.expanded !== undefined &&
                                  item.expanded
                                    ? "expand_less"
                                    : "expand_more"}"
                                  @click=${() => this.toggleLeftElements(index)}
                                ></mwc-button>
                                <div
                                  @click=${() => this.toggleLeftElements(index)}
                                >
                                  ${item.title}
                                </div>
                              `
                            : html`
                                <div
                                  @click=${() => this.selectSectionView(index)}
                                >
                                  ${item.title}
                                </div>
                              `}
                        </div>
                        ${item.expanded !== undefined && item.expanded
                          ? html`
                              ${item.view_definition !== undefined &&
                              item.view_definition.filter !== undefined &&
                              item.view_definition.filterFields !== undefined &&
                              item.view_definition.filterFields.length > 0
                                ? html`
                                    <div
                                      id="section${index}_detail"
                                      class="accordion-content"
                                      style=${index > -1
                                        ? "max-height: none;"
                                        : ""}
                                    >
                                      ${item.name}
                                    </div>
                                  `
                                : nothing}
                            `
                          : nothing}
                      </div>
                    `
                  )}
                </div>
              </div>
              <div id="rightSplit">
                ${this.selectedViewDefinition !== undefined &&
                this.selectedViewDefinition.view_definition !== undefined &&
                this.selectedViewDefinition
                  ? html`
          <objecttabs-composition .selectedTabModelFromProcModel=${this.selectedViewDefinition.view_definition.reportElements}
            .lang=${this.lang} .procInstanceName=${this.procInstanceName} .config=${this.config}     
            .selectedItem=${this.selectedProcInstance}      
          </objecttabs-composition>              
        `
                  : nothing}
              </div>
            </div>
          `}
    `;
  }
  sectionElement(item, index) {
    return html`
      ${item.view_definition !== undefined &&
      item.view_definition.hasDetail !== undefined &&
      item.view_definition.hasDetail === true > 0
        ? html`
            <mwc-icon-button
              size="s"
              id="expand"
              dense
              raised
              label=""
              icon="${item.expanded !== undefined && item.expanded
                ? "expand_less"
                : "expand_more"}"
              @click=${() => this.toggleLeftElements(index)}
            ></mwc-icon-button>
            <div @click=${() => this.toggleLeftElements(index)}>
              ${item.title["label_" + this.lang]}
            </div>
          `
        : html`
            <div
              class="accordion-title"
              @click=${() => this.selectSectionView(index)}
            >
              ${item.title["label_" + this.lang]}
            </div>
          `}
    `;
  }
  sectionDetail(item, index) {
    return html`
      ${item.expanded !== undefined && item.expanded
        ? html`
            ${item.view_definition !== undefined &&
            item.view_definition.hasDetail !== undefined &&
            item.view_definition.hasDetail === true
              ? html`
                  <div
                    id="section${index}_detail"
                    class="layout horizontal center wrap accordion-content"
                    style=${index > -1 ? "max-height: none;" : ""}
                  >
                    ${item.view_definition.detail.type !== undefined &&
                    item.view_definition.detail.type === "actionWithFilter"
                      ? html`
                          <div
                            style="margin-top:1px;text-align:center;padding-bottom:5px;"
                          >
                            ${item.view_definition.detail.button === undefined
                              ? nothing
                              : html`
                                  <sp-button
                                    size="m"
                                    slot="primaryAction"
                                    dialogAction="accept"
                                    .selectedViewDefinition="${item.view_definition}"
                                    .tabindex="${index}"
                                    @click=${this.filterPerformAction}
                                  >
                                    ${item.view_definition.detail.button[
                                      "label_" + this.lang
                                    ]}
                                  </sp-button>
                                `}
                          </div>
                          ${this.genericFormElements(
                            item.view_definition.detail.filterFields
                          )}
                        `
                      : nothing}
                    ${item.view_definition.detail.type !== undefined &&
                    item.view_definition.detail.type === "objectsList"
                      ? html`
                          ${this.testingcardSomeElementsRepititiveObjects(
                            item,
                            this.selectedProcInstance,
                            true
                          )}
                        `
                      : nothing}
                  </div>
                `
              : nothing}
          `
        : nothing}
    `;
  }
  testingcardSomeElementsRepititiveObjects(elem, data) {
    data = this.localGetDataFromRoot(elem.view_definition.detail, data);
    //console.log('testingcardSomeElementsRepititiveObjects', 'elem', elem, 'getDataFromRoot', data)
    //console.log('cardSomeElementsRepititiveObjects >> getDataFromRoot', 'elem', elem, 'data', data)
    if (data === undefined) {
      return html``;
    }
    return html`
      ${Array.isArray(data) && data.length > 0
        ? html`
            <style>
              li.no_success {
                color: red;
              }
              li.success {
                color: green;
              }
            </style>
            <ul>
              ${data.map(
                (d) =>
                  html`
                    <li
                      class="${d.run_summary.toUpperCase().includes("SUCCESS")
                        ? "success"
                        : "no_success"}"
                      .thisitem="${d}"
                      @click=${this.clickedTest}
                      .elementdef="${elem}"
                    >
                      ${d.script_id} ${d.run_summary}<br />(${d.date_execution})
                      <hr />
                    </li>
                  `
              )}
            </ul>
          `
        : nothing}
    `;
  }
  clickedTest(e) {
    console.log(e.currentTarget.thisitem);
    //    this.selectedItem = e.currentTarget.thisitem
    this.selectedTabModelFromProcModel =
      e.currentTarget.elementdef.view_definition.detail;
    this.objecttabsComposition.isProcManagement = true;
    this.objecttabsComposition.selectedTabModelFromProcModel =
      this.selectedTabModelFromProcModel;
    this.objecttabsComposition.selectedItem = e.currentTarget.thisitem;
    this.objecttabsComposition.render();
  }
  fieldLabel(fld) {
    return fld["label_" + this.lang] !== undefined
      ? fld["label_" + this.lang]
      : fld.name;
  }
  localGetDataFromRoot(elem, data) {
    if (data === undefined) {
      return undefined;
    }
    if (elem.endPointPropertyArray !== undefined) {
      if (elem.endPointPropertyArray.length === 0) {
        return data;
      }
      if (
        elem.endPointPropertyArray.length === 1 &&
        elem.endPointPropertyArray[0].toUpperCase() === "ROOT"
      ) {
        return data;
      }
      //const numObjectsToSkip = elem.endPointPropertyArray.length - 1;
      //const propertyName = elem.endPointPropertyArray[numObjectsToSkip];
      let i = 0;
      let subJSON = {};
      //data = data[elem.endPointPropertyArray[0]][0]
      for (i = 0; i < elem.endPointPropertyArray.length; i++) {
        let propertyName = elem.endPointPropertyArray[i];
        if (Array.isArray(data[propertyName])) {
          if (i < elem.endPointPropertyArray.length - 1) {
            subJSON = data[propertyName][0];
          } else {
            return data[propertyName];
          }
        } else {
          subJSON = data[propertyName];
        }
        if (typeof subJSON === "undefined") {
          return data;
        } else {
          data = subJSON;
        }
      }
      return data;
      if (typeof subJSON === "undefined") {
        return undefined;
      } else if (elem.endPointPropertyArray.length % 2 === 0) {
        // If the input array has an even number of elements, skip one more object level before recursing
        return getValueFromNestedJSON(
          subJSON,
          elem.endPointPropertyArray.slice(0, numObjectsToSkip)
        );
      } else {
        // Otherwise, recurse on the sub-JSON with the remaining elem.endPointPropertyArray elements
        return getValueFromNestedJSON(
          subJSON,
          elem.endPointPropertyArray.slice(0, numObjectsToSkip)
        );
      }
    } else {
      if (
        elem.endPointResponseObject !== undefined &&
        elem.endPointResponseObject2 !== undefined
      ) {
        let dataToRet = [];
        dataToRet = data[elem.endPointResponseObject];
        if (dataToRet !== undefined) {
          return dataToRet[elem.endPointResponseObject2];
        } else {
          return [];
        }
      } else {
        if (String(elem.endPointResponseObject).toUpperCase() === "ROOT") {
          return data;
        } else {
          return data[elem.endPointResponseObject];
        }
      }
    }
  }

  selectedProcessTitle() {
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
          position: relative;
          z-index: 6;       
          width: calc(96vw - 330px);
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
      </style>    
      <div class="title-banner ${
        this.leftSplitDisplayed !== undefined && this.leftSplitDisplayed
          ? ""
          : "collapsed"
      }">
        <span class="left-text">
        <mwc-icon-button size="s" style="left:22px;" id="expandleftpane" dense raised label=""  icon="${
          this.leftSplitDisplayed !== undefined && this.leftSplitDisplayed
            ? "expand_more"
            : "expand_less"
        }"   @click=${this.toggleLeftSplitPane}></mwc-icon-button>
        <mwc-icon-button size="xl" dense raised label=""  icon="home" @click=${
          this.resetView
        }></mwc-icon-button> 
    
        </span>
        <h1 class="title">${this.selectedProcInstance.procedure_name} v:${
      this.selectedProcInstance.procedure_version
    }</h1>
        <span class="right-text">${this.lang == "es" ? "Módulo" : "Module"} ${
      this.selectedProcInstance.module_name
    }</span>
      </div>
  
</div>
    `;
  }
  filterPerformAction(e) {
    this.selectedViewDefinition = e.currentTarget.selectedViewDefinition.detail;
    //console.log('this.selectedViewDefinition', this.selectedViewDefinition)
    //alert('filterPerformAction')
    this.performActionRequestHavingDialogOrNotForProcess(
      e.currentTarget.tabindex,
      this.selectedViewDefinition,
      this.selectedItems
    );
  }

  performActionRequestHavingDialogOrNotForProcess(
    index,
    action,
    selectedItem,
    targetValue = {},
    credDialogArgs = {}
  ) {
    if (action.alternativeAPIActionMethod !== undefined) {
      this[action.alternativeAPIActionMethod]();
      return;
    }
    var extraParams = this.jsonParam(action, selectedItem[0], targetValue);
    let APIParams = this.getAPICommonParams(action, true);
    let endPointUrl = this.getActionAPIUrl(action);
    if (String(endPointUrl).toUpperCase().includes("ERROR")) {
      alert(endPointUrl);
      return;
    }
    let params =
      this.config.backendUrl +
      endPointUrl +
      "?" +
      new URLSearchParams(APIParams) +
      "&" +
      new URLSearchParams(extraParams) +
      "&" +
      new URLSearchParams(credDialogArgs);
    console.log(
      "performActionRequestHavingDialogOrNot",
      "action",
      action,
      "selectedItem",
      selectedItem[0],
      "extraParams",
      extraParams
    );
    let log = true;
    this.fetchApi(params)
      .then((j) => {
        if (j && !j.is_error) {
          this.actionOutput = j;
          this.selectedItem = j;
        } else {
          this.actionOutput = j;
          this.selectedItem = j;
        }
        this.selectSectionView(index, true);

        //this.selectedProcInstanceMainView()
        console.log("actionOutput", this.actionOutput);
      })
      .then((j) => {
        let mye = {};
        if (j.is_error !== undefined && j.is_error === true) {
          //        mye = { is_error: true, message_en: "Performed with success", message_es: "Ejecutado correctamente" }
          this.dispatchEvent(
            new CustomEvent("error", {
              detail: { ...j, log: log },
              bubbles: true,
              composed: true,
            })
          );
        } else {
          mye = {
            is_error: false,
            message_en: "Performed with success",
            message_es: "Ejecutado correctamente",
          };
          this.dispatchEvent(
            new CustomEvent("success", {
              detail: { ...mye, log: log },
              bubbles: true,
              composed: true,
            })
          );
        }
        return j;
      })
      .catch((e) => {
        if (e.message == "Unexpected end of JSON input") {
          this.dispatchEvent(
            new CustomEvent("error", {
              detail: { ...e },
              bubbles: true,
              composed: true,
            })
          );
        } else {
          this.dispatchEvent(
            new CustomEvent("error", {
              detail: { ...e, log: log },
              bubbles: true,
              composed: true,
            })
          );
          //this.error(e)
          return e;
        }
      });

    return;
  }

  toggleLeftElements(index) {
    const item = this.selectedProcInstance.views[index];
    item.expanded = !item.expanded;
    this.requestUpdate();
  }
  get objecttabsComposition() {
    return this.shadowRoot.querySelector("objecttabs-composition");
  }
}
window.customElements.define("proc-management-home", ProcManagementHome);
