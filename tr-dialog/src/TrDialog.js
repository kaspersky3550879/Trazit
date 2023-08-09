import { html, css } from 'lit';
import { cssClasses } from '@material/dialog/constants';
import { classMap } from 'lit/directives/class-map.js';
import { Dialog } from '@material/mwc-dialog';
import '@material/mwc-button';
import '@material/mwc-icon';

export class TrDialog extends Dialog {
  static get styles() {
    return [
      super.styles,
      css`
      mwc-icon.corner {
        cursor: pointer;
        --mdc-icon-size: 15px;
        margin: auto 5px;
        color: rgb(94, 145, 186);
      }
      ::slotted(mwc-icon) {
        cursor: pointer;
        --mdc-icon-size: 15px;
      }
      mwc-icon[hidden] {
        display: none;
      }
      div[hidden] {
        display: none;
      }
      `
    ];
  }

  render() {
    const classes = {
      [cssClasses.STACKED]: this.stacked,
    };
    let heading = html``;
    if (this.heading) {
      heading = this.renderHeading();
    }
    const actionsClasses = {
      'mdc-dialog__actions': !this.hideActions,
    };
    return html`
    <style>
      :host {
        --mdc-shape-medium: ${this.dialogShape};
      }
    </style>
    <div class="mdc-dialog ${classMap(classes)}" role="alertdialog" aria-modal="true" aria-labelledby="title"
      aria-describedby="content">
      <div class="mdc-dialog__container">
        <div class="mdc-dialog__surface">
          ${heading}
          <div id="content" class="mdc-dialog__content">
            <slot id="contentSlot"></slot>
          </div>
          <footer id="actions" class="${classMap(actionsClasses)}">
            <span>
              <slot name="secondaryAction"></slot>
            </span>
            <span>
              <slot name="primaryAction"></slot>
            </span>
          </footer>
          ${this.cornerButton()}
        </div>
      </div>
      <div class="mdc-dialog__scrim"></div>
    </div>`;
  }

  get mdcDialog() {
    return this.shadowRoot.querySelector(".mdc-dialog")
  }

  get mdcScrim() {
    return this.shadowRoot.querySelector(".mdc-dialog__scrim")
  }

  get dialogSurface() {
    return this.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  get dialogContent() {
    return this.shadowRoot.querySelector("#content")
    }

  static get properties() {
    return {
      dialogShape: { type: String },
      zoomLabel: { type: String },
      expandLabel: { type: String },
      hideMin: { type: Boolean, reflect: true },
      hideZoom: { type: Boolean, reflect: true }
    };
  }

  constructor() {
    super();
    this.dialogShape = "5px"
    this.zoomLabel = "zoom_out_map"
    this.expandLabel = "expand_more"
    this.hideMin = false
    this.hideZoom = false
  }

  firstUpdated() {
    super.firstUpdated()
    this.shadowRoot.querySelector(".mdc-dialog__surface").style.padding = "20px"
  }

  cornerButton() {
    return html`
      <div style="position: absolute; top: 10px; left: 10px;">
        <slot name="topLeft"></slot>
      </div>
      <div style="position: absolute; top: 10px; right: 10px;">
        <slot name="icon1" style="margin-right: 5px;"></slot>
        <mwc-icon ?hidden=${this.hideMin} class="corner" @click=${this.minimize}>${this.expandLabel}</mwc-icon>
        <mwc-icon ?hidden=${this.hideZoom} class="corner" @click=${this.zoomOut}>${this.zoomLabel}</mwc-icon>
        <mwc-icon class="corner" dialogAction="decline">close</mwc-icon>
      </div>
    `
  }

  show() {
    if (this.dialogContent!==undefined&&this.dialogContent!==null){
      this.dialogContent.style.overflow = "auto";
    }
    if (this.dialogSurface!==undefined&&this.dialogSurface!==null){
      this.dialogSurface.style.overflow = "auto";
      this.dialogSurface.style.top = "0";
      this.dialogSurface.style.height = "auto";
    }
      this.expandLabel = "expand_more";
    super.show()
  }

  minimize() {
    this.dialogSurface.style.minWidth = "auto";
    this.mdcDialog.style.minWidth = "auto";
    this.dialogShape = "5px";
    this.dialogSurface.style.height = "auto";
    this.mdcDialog.style.height = "100%";
    this.mdcScrim.style.height = "100%";
    this.zoomLabel = "zoom_out_map"

    if (this.expandLabel == "expand_more") {
      this.dialogContent.style.overflow = "hidden";
      this.dialogSurface.style.overflow = "hidden";
      this.dialogSurface.style.top = "45vh";
      this.dialogSurface.style.height = "0";
      this.expandLabel = "expand_less";
    } else {
      this.dialogContent.style.overflow = "auto";
      this.dialogSurface.style.overflow = "auto";
      this.dialogSurface.style.top = "0";
      this.dialogSurface.style.height = "auto";
      this.expandLabel = "expand_more";
    }
  }

  zoomOut() {
    this.dialogSurface.style.top = "0";
    if (this.zoomLabel == "zoom_out_map") {
      this.dispatchEvent(new CustomEvent("zoom-out"))
      this.dialogShape = "0px";
      this.dialogSurface.style.height = "100vh";
      this.mdcDialog.style.height = "auto";
      this.dialogSurface.style.minWidth = "100vw";
      this.mdcDialog.style.minWidth = "100vw";
      this.mdcScrim.style.height = "auto";
      this.zoomLabel = "zoom_in_map"
      this.expandLabel = "expand_more";
    } else {
      this.dispatchEvent(new CustomEvent("zoom-in"))
      this.dialogSurface.style.minWidth = "auto";
      this.mdcDialog.style.minWidth = "auto";
      this.dialogShape = "5px";
      this.dialogSurface.style.height = "auto";
      this.mdcDialog.style.height = "100%";
      this.mdcScrim.style.height = "100%";
      this.zoomLabel = "zoom_out_map"
    }
  }
}
