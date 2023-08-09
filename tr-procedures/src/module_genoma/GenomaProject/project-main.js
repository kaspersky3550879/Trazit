import { html, css, nothing } from 'lit';
import { CoreView } from '../../components/core-view';
import { Alignment, Layouts } from '@collaborne/lit-flexbox-literals';
import { commonLangConfig } from '@trazit/common-core';
import { columnBodyRenderer } from 'lit-vaadin-helpers';
import { CommonsDialogTemplate } from '../../CommonsDialogTemplate';
import { GenomaUtilities } from '../GenomaUtilities';
import { GridUtilities } from '../GridUtilities';
import { GenomaActions } from '../GenomaActions';
import { GenomaDialogTemplate} from '../GenomaDialogTemplate';

let langConfig = {
  "title": {
    "label_en": "Project Info", 
    "label_es": "Información del Proyecto"
  },
  "projectUsersTable":{
    "title": {
      "label_en": "Project Users", 
      "label_es": "Usuarios del Proyecto"
    }  
  },
  "fieldText": {
    "logBtn": { "label_en": "Log Sample", "label_es": "Registrar Muestra" },
    "lot": {
      "items": [],
      "label_en": "Lot", "label_es": "Lote"
    }
  },
  "mainActions": [
    { "actionName": "STUDY_NEW",
    "clientMethod": "newStudyIndividual",
    "selObjectVariableName": "selectedProject",
    "endPoint": "/modulegenoma/GenomaStudyAPI",
    "endPointParams": [
      { "argumentName": "projectName", "ZZZselObjectPropertyName": "study"},
      { "argumentName": "studyName", "element": "text1" }
      // { "argumentName": "fieldsNames", "value": "undefined" },
      // { "argumentName": "fieldsValues", "value": "undefined" }
    ],
    "button": {
      "z-icdon": "refresh",
      "title": {
        "label_en": "New Study", "label_es": "Nuevo Estudio"
      },
      requiresObjectSelected : false
    },   
    "dialogInfo": {
      "requiresDialog": true,
      "name": "genericFormDialog",
      "fieldText": [
        { "text1": { "label_en": "new Study Name", "label_es": "Nombre nuevo Estudio" }}
      ]
    }
    },
  ],
  "gridHeaderProjectUsers": {
    gridColumns:{
      "person": {"label_en": "Person", "label_es": "Persona", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
      "roles": {"label_en": "Roles", "label_es": "Roles", "sort": false, "filter": true, "width": "20%"},
      "created_by": {"label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"},
      "created_on": {"label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"}
    },
    buttons:[
      { "actionName": "PROJECT_ADD_USER",
        "clientMethod": "newStudyIndividual",
        "selObjectVariableName": "selectedProjectUser", 
        "endPoint": "/modulegenoma/GenomaProjectAPI",
        "endPointParams": [ 
          { "argumentName": "projectName", "internalVariableObjName":"selectedProject", "internalVariableObjProperty":"name", "ZZZselObjectPropertyName": "study"},
          { "argumentName": "userName", "element": "listMDprocedureUsers" },
          { "argumentName": "userRole", "element": "list1" }
          // { "argumentName": "fieldsNames", "value": "undefined" },
          // { "argumentName": "fieldsValues", "value": "undefined" }
          //individualsList
        ],
        "button": {
          "z-icdon": "refresh",
          "title": {
            "label_en": "Add User", "label_es": "Añadir Usuario"
          },
          requiresObjectSelected : false
        },   
        "dialogInfo": {
          "requiresDialog": true,
          "name": "genericFormDialog",
          "fieldText":[ 
            { "listMDprocedureUsers": { "label_en": "User", "label_es": "Usuario" }},
            {
              "list1": { "label_en": "Role", "label_es": "Rol",
                "items": [
                  { "keyName": "read-only", "keyValue_en": "Read Only", "keyValue_es": "Solo Lectura" },
                  { "keyName": "edit", "keyValue_en": "Edit", "keyValue_es": "Editar" },
                  ]            
              }            
            }
          ]
        }
      },
      { "actionName": "PROJECT_USER_DEACTIVATE",
        "clientMethod": "buttonActionWithoutDialog",
        "selObjectVariableName": "selectedProjectUser",
        "endPoint": "/modulegenoma/GenomaProjectAPI",
        "endPointParams": [
          { "argumentName": "projectName", "selObjectPropertyName": "project" },
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
      { "actionName": "PROJECT_USER_ACTIVATE",
        "endPoint": "/modulegenoma/GenomaProjectAPI",  
        "endPointParams": [
          { "argumentName": "projectName", "internalVariableObjName":"selectedProject", "internalVariableObjProperty":"name", "ZZZselObjectPropertyName": "study"},
          { "argumentName": "userName", "selObjectPropertyName": "person" }
          //{ "argumentName": "userRole", "selObjectPropertyName": "roles" }
        ],
        "clientMethod": "openReactivateObjectDialog",
        "selObjectVariableName": "selectedProjectUser",
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
          "fieldText": {
            "numDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
            "objectName": { "label_en": "Project User to reactivate", "label_es": "Usuario de Proyecto a Reactivar" }
          },    
          "listDefinition":{
            "keyFldName":"person",
            "eachEntryTextGenerator":[
              {"value": "Name: ", "type":"fix"}, {"value": "person", "type":"field"}, {"value": " (", "type":"fix"}, {"value": "roles", "type":"field"}, {"value": ")", "type":"fix"}  
            ]
          },
          "action": [            
            {
              "actionName": "DEACTIVATED_PROJECT_USERS_LAST_N_DAYS",
              "clientMethod": "getDeactivatedObjects",
              "endPoint": "/modulegenoma/GenomaStudyAPIFrontend",  
              "apiParams": [
                { "query": "numDays", "element": "lotNumDays", "defaultValue": 7 },
                { "argumentName": "projectName", "selObjectPropertyName": "project"},
              ]
            }
          ]
        }
      }
    ]
  },
}

export class ProjectMain extends GenomaDialogTemplate(GridUtilities(GenomaUtilities((CommonsDialogTemplate(GenomaActions(CoreView)))))) {
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
      xsamplesReload: { type: Boolean },
      xselectedSamples: { type: Array },
      xselectedAction: { type: Object },
      xtargetValue: { type: Object },
      procInstanceName: { type: String },
      config: { type: Object },

      selectedProject: { type: Object },
      selectedProjectUser: { type: Array },
      MDprocedureUsers:{type: Array}
    };
  }

  constructor() {
    super()
    this.xselectedSamples = []
    this.xselectedAction = []
    this.selectedProject = {}
    this.selectedProjectUser= []
    this.xselectedAction = []    
    this.MDprocedureUsers = []    
  }

  xtabView() {
    return html`
      <div class="layout horizontal flex wrap">
      ${this.selectedProject===undefined ? html``: html`
        <div class="layout flex">          
          <h1>${langConfig.title["label_"+this.lang]} ${this.selectedProject.name}</h1>          
          <div class="layout horizontal center flex wrap">
            ${this.getButton(langConfig.mainActions)}
          </div>
          <h1>${langConfig.projectUsersTable.title["label_"+this.lang]}</h1>
          ${this.getButton(langConfig.gridHeaderProjectUsers.buttons, this.selectedProjectUser)}
          <vaadin-grid id="projectusersgrid" theme="row-dividers" column-reordering-allowed multi-sort 
            @active-item-changed=${e=>this.selectedProjectUser=e.detail.value ? [e.detail.value] : []}
            .selectedItems="${this.selectedProjectUser}" .items="${this.selectedProject.project_users}">
            ${this.gridListFromGridUtilities(langConfig.gridHeaderProjectUsers, 'projectusersgrid', this.selectedProject.project_users)}
          </vaadin-grid>
        </div>
        ${this.genomaDialogsTemplate()} 
        ${this.reactiveObjectTemplate()}
      `}
      </div>
    `;
  }

  // familySelected() {
  //   if (!this.selectedProjectUser.length||this.selectedProjectUser[0].study_individual===undefined){
  //     if (this.indivgrid){this.indivgrid.items =[]}
  //     return
  //   }
  //   //console.log('selectedProjectUser', this.selectedProjectUser[0].study_individual.length, this.selectedProjectUser[0])
  //   if(this.indivgrid){this.indivgrid.items = this.selectedProjectUser[0].study_individual}
  //   return;
  // }
  get projectusersgrid() {
    return this.shadowRoot.querySelector("vaadin-grid#projectusersgrid")
  }


  // nextRequest() {
  //   super.nextRequest()
  //   this.reqParams = {
  //     procInstanceName: this.procInstanceName,
  //     ...this.reqParams
  //   }
  //   let action = this.selectedDialogAction ? this.selectedDialogAction : this.xselectedAction
  //   this.performRequest()
  //   //this[action.clientMethod]()
  // }    

  // setView() {
  //   this.xselectedSamples = []
  //   this.xselectedAction = actions[0]
  //   this.actionMethod(this.xselectedAction.subAction)
  // }

  xjsonParamCommons(selAction, selObject) {
    //console.log('xjsonParamCommons', selAction)
    if (selAction===undefined){
      selAction=this.xselectedAction
    }
    if (selObject===undefined){
      if (selAction.selObjectVariableName===undefined){
        alert("Please add the property selObjectVariableName to your action definition")
        return
      }
      selObject=this[selAction.selObjectVariableName][0]
    }
    let jsonParam = {}
    let action = selAction
    if (action.endPointParams) {
      action.endPointParams.forEach(p => {
        if (p.argumentName==="projectName") {
          if (this.selectedProject===undefined||this.selectedProject.name===undefined){
            alert('No study selected')
            return jsonParam
          }
          jsonParam[p.argumentName] = this.selectedProject.name
        } else if (p.internalVariableObjName&&p.internalVariableObjProperty) {          
            if (this[p.internalVariableObjName]===undefined||this[p.internalVariableObjName][0][p.internalVariableObjProperty]===undefined){
              var msg=""
              if (this[p.internalVariableObjName][0][p.internalVariableObjProperty]===undefined){
                msg='The object '+p.internalVariableObjName+' has no one property called '+p.internalVariableObjProperty
                alert(msg)
                //console.log(msg, this[p.internalVariableObjName][0])
              }else{
                msg='there is no object called '+p.internalVariableObjName+' in this view'
                alert(msg)
              }
          //    alert('No family selected')
              return jsonParam[p.argumentName] = "ERROR: "+msg
            }  
          jsonParam[p.argumentName] = this[p.internalVariableObjName][0][p.internalVariableObjProperty]
         
        } else if (p.element) {
          if (this[p.element]===undefined){
            alert('xjsonParamCommons. Element '+p.element+' not found to get the value' )
          }else{
            jsonParam[p.argumentName] = this[p.element].value // get value from field input
          }
        } else if (p.defaultValue) {
          jsonParam[p.argumentName] = p.defaultValue // get value from default value (i.e incubator)
        } else if (p.selObjectPropertyName) {
          jsonParam[p.argumentName] = selObject[p.selObjectPropertyName] // get value from selected item
        } else if (p.xtargetValue) {
          jsonParam[p.argumentName] = this.xtargetValue[p.argumentName] // get value from target element passed
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
customElements.define('project-main', ProjectMain);