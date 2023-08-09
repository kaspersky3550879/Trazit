import { html, css, nothing } from 'lit';
import { CoreView } from '../../components/core-view';
import { Alignment, justified, Layouts } from '@collaborne/lit-flexbox-literals';
import { commonLangConfig } from '@trazit/common-core';
import { columnBodyRenderer } from 'lit-vaadin-helpers';
//import { CommonsDialogTemplate } from '../../CommonsDialogTemplate';
//import { GenomaUtilities } from '../GenomaUtilities';
import { GridUtilities} from '../GridUtilities';
//import { GenomaActions} from '../GenomaActions';
import { GenomaDialogTemplate} from '../GenomaDialogTemplate';
import '../../components/grid_with_buttons/grid-with-buttons';
import {ButtonsFunctions} from '../../components/Buttons/ButtonsFunctions';
import {TrazitGenericDialogs} from '../../components/GenericDialogs/TrazitGenericDialogs';
import {TrazitReactivateObjectsDialog} from '../../components/GenericDialogs/TrazitReactivateObjectsDialog';
//import { CommonsClientMethod} from './../../CommonsClientMethod';


let langConfig = {}
let langConfig2 = {
  "title": {
    "label_en": "Users", 
    "label_es": "Usuarios"
  },
  "fieldText": {
    "lot": {
      "items": [],
      "label_en": "Lot", "label_es": "Lote"
    }
  },
  "gridHeaderStudyUsers": {
    gridColumns:{
      "person": {"label_en": "Person", "label_es": "Persona", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
      "roles": {"label_en": "Roles", "label_es": "Roles", "sort": false, "filter": true, "width": "20%"},
      "created_by": {"label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"},
      "created_on": {"label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"}
    },
    buttons:[
      { "actionName": "STUDY_ADD_USER",
        "requiresDialog": true,
        "clientMethod": "newStudyIndividual",
        "selObjectVariableName": "selectedItems", 
        "endPoint": "/modulegenoma/GenomaStudyAPI",
        "endPointParams": [ 
          { "argumentName": "studyName", "internalVariableObjName":"selectedStudy", "internalVariableObjProperty":"study", "ZZZselObjectPropertyName": "study"},
          { "argumentName": "userName", "element": "listMDprocedureUsers" },
          { "argumentName": "userRole", "element": "list1" }
          // { "argumentName": "fieldsNames", "value": "undefined" },
          // { "argumentName": "fieldsValues", "value": "undefined" }
          //individualsList
        ],
        "button": {
          "z-icdon": "refresh",
          "title": {
            "label_en": "New", "label_es": "Nuevo"
          },
          requiresObjectSelected : false
        },   
        "dialogInfo": {
          "requiresDialog": true,
          "name": "genericFormDialog",
          "fieldText": [
            { "listMDprocedureUsers": { "label_en": "User", "label_es": "Usuario" }},
            { "list1": { "label_en": "Role", "label_es": "Rol",
               "items": [
                 { "keyName": "read-only", "keyValue_en": "Read Only", "keyValue_es": "Solo Lectura" },
                 { "keyName": "edit", "keyValue_en": "Edit", "keyValue_es": "Editar" },
                ]            
              }
            }
          ]
        }
      },
      { "actionName": "STUDY_USER_DEACTIVATE",
        "clientMethod": "buttonActionWithoutDialog",
        "selObjectVariableName": "selectedItems",
        "endPoint": "/modulegenoma/GenomaStudyAPI",
        "endPointParams": [
          { "argumentName": "studyName", "selObjectPropertyName": "study"},
          { "argumentName": "userName", "selObjectPropertyName": "person" },
          { "argumentName": "userRole", "selObjectPropertyName": "roles" }
        ],
        "button": {
          "z-icon": "refresh",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          requiresObjectSelected : true
        },    
      }, 
      { "actionName": "STUDY_USER_ACTIVATE",
        "endPoint": "/modulegenoma/GenomaStudyAPI",  
        "endPointParams": [
          { "argumentName": "studyName", "selObjectPropertyName": "study"},
          { "argumentName": "userName", "selObjectPropertyName": "person" }
          //{ "argumentName": "userRole", "selObjectPropertyName": "roles" }
        ],
        "clientMethod": "openReactivateObjectDialog",
        "selObjectVariableName": "selectedItems",
        "button": {
          "icon": "alarm_add",
          "title": {
            "label_en": "Activate", "label_es": "Activar"
          },
          requiresObjectSelected : false
        },
        "dialogInfo": {
          "requiresDialog": true,
          "name": "reactivateObjectDialog",
          "selObjectVariableName": "selectedStudyUser", 
          "fieldText": {
            "numDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
            "objectName": { "label_en": "Person to reactivate", "label_es": "Persona a Reactivar" }
          },    
          "listDefinition":{
            "keyFldName":"person",
            "eachEntryTextGenerator":[
              {"value": "Name: ", "type":"fix"}, {"value": "person", "type":"field"}, {"value": " (", "type":"fix"}, {"value": "roles", "type":"field"}, {"value": ")", "type":"fix"}  
            ]
          },
          "action": [            
            {
              "actionName": "DEACTIVATED_STUDY_USERS_LAST_N_DAYS",
              "clientMethod": "getDeactivatedObjects",
              "endPoint": "/modulegenoma/GenomaStudyAPIFrontend",  
              "apiParams": [
                { "query": "numDays", "element": "lotNumDays", "defaultValue": 7 },
                { "argumentName": "studyName", "selObjectPropertyName": "study"},
              ]
            }
          ]
        }
      },
    ]
  },
}
let actions = [
]
//ButtonsFunctions
// GenomaDialogTemplate(GridUtilities(GenomaUtilities(GenomaActions(CommonsDialogTemplate(CoreView)))))
export class StudyUsers extends GenomaDialogTemplate(TrazitGenericDialogs(TrazitReactivateObjectsDialog(TrazitGenericDialogs(GridUtilities(ButtonsFunctions(CoreView)))))) {
  static get styles() {
    return [Layouts, Alignment,
      super.styles,
      css`
      @media (max-width: 460px) {
        vaadin-grid {
          font-size: 10px;
        }
        vaadin-grid-cell-content {
          padding: 5px;
        }
      }
      `
    ];
  }

  static get properties() {
    return {
      samplesReload: { type: Boolean },
      selectedItems: { type: Array },
      selectedAction: { type: Object },
      targetValue: { type: Object },
      procInstanceName: { type: String },
      config: { type: Object },

      selectedStudy: { type: Object },
      selectedStudyUser: { type: Array },
      
      filterName: { type: String },
      viewName: { type: String },
      lang: { type: String },
      actionBeingPerformedModel:{type:Object},
      viewModelFromProcModel: { type: Object}
      
    };
  }

  constructor() {
    super()
    this.selectedItems = []
    this.selectedAction = actions[0]

    this.selectedStudyUser = []
    this.selectedAction = []
    this.viewModelFromProcModel = {}
    this.actionBeingPerformedModel={}
  }
  //height="${this.tableHeight(this.selectedStudy.study_users)}px">
  tabView() {
    if (this.selectedStudy===undefined){
      return html``;
    }else{
      return html`
      
      ${this.genericFormDialog()}
      ${this.reactivateObjectsDialog()}
      ${this.genomaDialogsSetResultValueTemplate()}
      
        <div class="layout horizontal flex wrap">
          ${this.selectedStudy===undefined ? html`
            <h2>Please select one study first</h2>
          `: html`
            <div class="layout flex">
              <h1>${this.viewModelFromProcModel.langConfig.title["label_"+this.lang]} ${this.selectedStudy.name}</h1>
              <div class="layout horizontal center flex wrap">
                ${this.getButton(this.viewModelFromProcModel)}
              </div>
              ${this.getButton(this.viewModelFromProcModel.actions)}
              <vaadin-grid id="studyusergrid" theme="row-dividers" column-reordering-allowed multi-sort 
                @active-item-changed=${e=>this.selectedItems=e.detail.value ? [e.detail.value] : []}
                .selectedItems="${this.selectedItems}" .items="${this[this.viewModelFromProcModel.langConfig.selectedObjectName][this.viewModelFromProcModel.langConfig.gridElementName]}">
                ${this.gridListFromGridUtilities(this.viewModelFromProcModel.langConfig.gridHeader, this.viewModelFromProcModel.langConfig.gridName, this[this.viewModelFromProcModel.langConfig.selectedObjectName][this.viewModelFromProcModel.langConfig.gridElementName])}
              </vaadin-grid>
            </div>
            ${this.viewModelFromProcModel.hasChild===undefined||this.viewModelFromProcModel.childObject===undefined ? nothing: html`
              <div class="layout flex">
                <h1>${this.viewModelFromProcModel.langConfig.title["label_"+this.lang]} ${this.selectedStudy.name}</h1>
                <div class="layout horizontal center flex wrap">
                  ${this.getButton(this.viewModelFromProcModel)}
                </div>
                ${this.getButton(this.viewModelFromProcModel.actions)}
                <vaadin-grid id="studyusergrid" theme="row-dividers" column-reordering-allowed multi-sort 
                  @active-item-changed=${e=>this.selectedItems=e.detail.value ? [e.detail.value] : []}
                  .selectedItems="${this.selectedItems}" .items="${this[this.viewModelFromProcModel.langConfig.selectedObjectName][this.viewModelFromProcModel.langConfig.gridElementName]}">
                  ${this.gridListFromGridUtilities(this.viewModelFromProcModel.langConfig.gridHeader, this.viewModelFromProcModel.langConfig.gridName, this[this.viewModelFromProcModel.langConfig.selectedObjectName][this.viewModelFromProcModel.langConfig.gridElementName])}
                </vaadin-grid>
              </div>
            `}            
          `}
        </div>
        
      `;
    }
  }
  // ${this.genomaDialogsTemplate()} 
  //${this.reactiveObjectTemplate()}
  get studyusergrid() {
    return this.shadowRoot.querySelector("vaadin-grid#studyusergrid")
  }
  // nextRequest() {
  //   super.nextRequest()
  //   this.reqParams = {
  //     procInstanceName: this.procInstanceName,
  //     ...this.reqParams
  //   }
  //   let action = this.selectedDialogAction ? this.selectedDialogAction : this.selectedAction
  //   this[action.clientMethod]()
  // }    
  async getProgramList() {
    this.samplesReload = true
    let params = this.config.backendUrl + this.config.frontEndEnvMonitUrl 
      + '?' + new URLSearchParams(this.reqParams)
    await this.fetchApi(params).then(j => {
      if (j && !j.is_error) {
        if (this.selectedAction.subAction) {
          this.actionMethod(this.selectedAction.subAction)
          this.programsList = j.programsList
        }
      }
    })
  }
  // genericFormClient(){
  //   this.selectedItems = []
  //   this.newStudyIndividual.show()
  // }

  // setView() {
  //   this.selectedItems = []
  //   this.selectedAction = actions[0]
  //   this.actionMethod(this.selectedAction.subAction)
  // }

  // cleanFormFields(){
  //   if (this.text1){this.text1.value=''}
  //   if (this.number1){this.number1.value=''}
  //   //if (this.list1){this.list1.value={}}
  // }
  xjsonParamCommons(selAction, selObject) {
    let jsonParam = {}
    if (selAction.endPointParams===undefined){
      return jsonParam
    }
    //console.log('xjsonParamCommons', selAction)
    if (selAction===undefined){
      selAction=this.selectedAction
    }
    if (selObject===undefined){
      if (selAction.selObjectVariableName===undefined){
        alert("Please add the property selObjectVariableName to your action definition")
        return
      }
      selObject=this[selAction.selObjectVariableName][0]
    }
    let action = selAction
    if (action.endPointParams) {
      action.endPointParams.forEach(p => {
        if (p.argumentName==="studyName") {
          if (this.selectedStudy===undefined||this.selectedStudy.name===undefined){
            alert('No study selected')
            return jsonParam
          }
          jsonParam[p.argumentName] = this.selectedStudy.name
        } else if (p.element) {
          jsonParam[p.argumentName] = this[p.element].value // get value from field input
        } else if (p.defaultValue) {
          jsonParam[p.argumentName] = p.defaultValue // get value from default value (i.e incubator)
        } else if (p.selObjectPropertyName) {
          jsonParam[p.argumentName] = selObject[p.selObjectPropertyName] // get value from selected item
        } else if (p.targetValue) {
          jsonParam[p.argumentName] = this.targetValue[p.argumentName] // get value from target element passed
        } else {
          jsonParam[p.argumentName] = p.value
        }
        console.log('xjsonParamCommons', 'endPointParamsArgument', p, 'selObject', selObject, 'jsonParam', jsonParam)
      })
    }
    if (action.paramFilter) {
      jsonParam[action.paramFilter[this.filterName].query] = action.paramFilter[this.filterName].value
    }
    return jsonParam
  }
}
customElements.define('study-users', StudyUsers);