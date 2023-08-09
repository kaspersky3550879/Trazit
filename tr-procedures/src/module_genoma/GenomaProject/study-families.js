import { html, css, nothing } from 'lit';
import { CoreView } from '../../components/core-view';
import { columnBodyRenderer, gridRowDetailsRenderer } from 'lit-vaadin-helpers';
import { Alignment, Layouts } from '@collaborne/lit-flexbox-literals';
import { commonLangConfig } from '@trazit/common-core';
//import { columnBodyRenderer } from 'lit-vaadin-helpers';
import { CommonsDialogTemplate } from './../../CommonsDialogTemplate';
import { GenomaActions } from '../GenomaActions';
import { GenomaUtilities } from '../GenomaUtilities';
import { GridUtilities } from '../GridUtilities';
import { GenomaDialogTemplate} from '../GenomaDialogTemplate';

import '@vaadin/vaadin-grid/vaadin-grid-column';
let langConfig = {
  "title": {"label_en": "Families", "label_es": "Familias"},
  "labelWhenNotSelected":{"label_en": "No study selected", "label_es": "No hay estudio seleccionado"},
  "fieldText": {
    "logBtn": { "label_en": "Log Sample", "label_es": "Registrar Muestra" },
    "shift": {
      "items": [
        { "keyName": "M1", "keyValue_en": "Morning 1", "keyValue_es": "Mañana 1" },
        { "keyName": "M2", "keyValue_en": "Morning 2", "keyValue_es": "Mañana 2" },
        { "keyName": "N", "keyValue_en": "Night", "keyValue_es": "Noche" }
      ],
      "label_en": "Shift", "label_es": "Turno"
    },
    "lot": {
      "items": [],
      "label_en": "Lot", "label_es": "Lote"
    }
  },
  "gridHeaderFamily": {
    gridColumns:{
      "name": {        "label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "is_icon": true, "width": "10%"      },
      "description": {        "label_en": "Description", "label_es": "Descripción", "sort": false, "filter": true, "width": "20%"      },
      "created_by": {        "label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"      },
      "created_on": {        "label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"      },
    },
    buttons:[
      { "actionName": "STUDY_CREATE_FAMILY",
        "clientMethod": "newStudyIndividual",
        "selObjectVariableName": "selectedFamily", 
        "endPoint": "/modulegenoma/GenomaStudyAPI",
        "endPointParams": [ 
          { "argumentName": "studyName", "internalVariableObjName":"selectedStudy", "internalVariableObjProperty":"study", "ZZZselObjectPropertyName": "study"},
          { "argumentName": "familyName", "element": "text1" }
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
            {"text1": { "label_en": "new family Name", "label_es": "Nombre Nueva familia" }}
          ]
        }
      },
      { "actionName": "STUDY_FAMILY_DEACTIVATE",
        "clientMethod": "buttonActionWithoutDialog",
        "selObjectVariableName": "selectedFamily",
        "endPoint": "/modulegenoma/GenomaStudyAPI",
        "endPointParams": [
          { "argumentName": "studyName", "internalVariableObjName":"selectedStudy", "internalVariableObjProperty":"study", "ZZZselObjectPropertyName": "study"},
          { "argumentName": "familyName", "selObjectPropertyName": "name" }
        ],
        "button": {
          "z-icon": "refresh",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          requiresObjectSelected : true
        },    
      }, 
      { "actionName": "STUDY_FAMILY_ACTIVATE",
        "endPoint": "/modulegenoma/GenomaStudyAPI",  
        "endPointParams": [
          { "argumentName": "studyName", "internalVariableObjName":"selectedStudy", "internalVariableObjProperty":"study", "ZZZselObjectPropertyName": "study"},
          { "argumentName": "familyName", "selObjectPropertyName": "name" }
        ],
        "clientMethod": "openReactivateObjectDialog",
        "selObjectVariableName": "selectedFamily",
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
            "objectName": { "label_en": "Family to reactivate", "label_es": "Familia a Reactivar" }
          },    
          "listDefinition":{
            "keyFldName":"name",
            "eachEntryTextGenerator":[
              {"value": "Name: ", "type":"fix"}, {"value": "name", "type":"field"} 
            ]
          },
          "action": [            
            {
              "actionName": "DEACTIVATED_STUDY_FAMILIES_LAST_N_DAYS",
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
      { "actionName": "STUDY_FAMILY_ADD_INDIVIDUAL",
        "clientMethod": "dialogRequired",
        "selObjectVariableName": "selectedFamily",
        "endPoint": "/modulegenoma/GenomaStudyAPI",
        "endPointParams": [
          { "argumentName": "studyName", "internalVariableObjName":"selectedStudy", "internalVariableObjProperty":"study", "ZZZselObjectPropertyName": "study"},
          { "argumentName": "familyName", "internalVariableObjName":"selectedFamily", "internalVariableObjProperty":"name", "element": "text1" },
          { "argumentName": "individualsList", "element": "listSelectedStudyIndividuals" }
          // { "argumentName": "fieldsNames", "value": "undefined" },
          // { "argumentName": "fieldsValues", "value": "undefined" }
        ],
        "button": {
          "z-icon": "add",
          "title": {
            "label_en": "Add Individual", "label_es": "Añadir Individuo"
          },
          requiresObjectSelected : true
        },    
        "dialogInfo": {
          "requiresDialog": true,
          "name": "genericFormDialog",
          "fieldText": [
            {"listSelectedStudyIndividuals": { "label_en": "Indvidual Id to Add", "label_es": "Individuo a añadir",              
              "keyFldName":"individual_id",
              "eachEntryTextGenerator":[                
                {"value": "Name: ", "type":"fix"}, {"value": "individual_name", "type":"field"} 
              ]
            }}
          ]
        }
      },               
      { "actionName": "STUDY_FAMILY_REMOVE_INDIVIDUAL",
        "clientMethod": "dialogRequired",
        "selObjectVariableName": "selectedFamily",
        "endPoint": "/modulegenoma/GenomaStudyAPI",
        "endPointParams": [
          { "argumentName": "studyName", "internalVariableObjName":"selectedStudy", "internalVariableObjProperty":"study", "ZZZselObjectPropertyName": "study"},
          { "argumentName": "familyName", "internalVariableObjName":"selectedFamily", "internalVariableObjProperty":"name", "element": "text1" },
          { "argumentName": "individualId", "element": "text1" }
        ],
        "button": {
          "z-icon": "remove",
          "title": {
            "label_en": "Unlink Individual", "label_es": "Quitar Individuo"
          },
          requiresObjectSelected : true
        }, 
        "dialogInfo": {
          "requiresDialog": true,
          "name": "genericFormDialog",
          "fieldText": [
            {"text1": { "label_en": "Indvidual Id to unlink", "label_es": "Individuo a deasignar" }}
          ]
        }
      },               
    ]    
  },
  "gridHeaderIndiv": {
    gridColumns:{
      "individual_id": {
        "label_en": "Id", "label_es": "Id", "sort": false, "filter": true, "is_icon": true, "width": "10%"
      },
      "individual_name": {
        "label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "width": "20%"
      },
      "created_by": {
        "label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"
      },
      "created_on": {
        "label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"
      },
    },
    buttons:[
      { "actionName": "STUDY_CREATE_INDIVIDUAL",
        "clientMethod": "newStudyIndividual",
        "selObjectVariableName": "selectedIndiv",
        "endPoint": "/modulegenoma/GenomaStudyAPI",
        "endPointParams": [
          { "argumentName": "studyName", "internalVariableObjName":"selectedStudy", "internalVariableObjProperty":"study", "ZZZselObjectPropertyName": "study"},
          { "argumentName": "individualName", "element": "text1" }
          // { "argumentName": "fieldsNames", "value": "undefined" },
          // { "argumentName": "fieldsValues", "value": "undefined" }
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
            {"text1": { "label_en": "new Individual Name", "label_es": "Nombre Nuevo Individuo" }}
          ]
        }
      },
      { "actionName": "STUDY_INDIVIDUAL_DEACTIVATE",
        "clientMethod": "buttonActionWithoutDialog",
        "selObjectVariableName": "selectedIndiv",
        "endPoint": "/modulegenoma/GenomaStudyAPI",
        "endPointParams": [
          { "argumentName": "studyName", "internalVariableObjName":"selectedStudy", "internalVariableObjProperty":"study", "ZZZselObjectPropertyName": "study"},
          { "argumentName": "individualId", "internalVariableObjName":"selectedIndiv", "internalVariableObjProperty":"individual_id", "element": "text1" },
        ],
        "button": {
          "z-icon": "refresh",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          requiresObjectSelected : true
        },    
      }, 
      { "actionName": "STUDY_CREATE_INDIVIDUAL_SAMPLE",
        "clientMethod": "buttonActionWithoutDialog",
        "selObjectVariableName": "selectedIndiv",
        "endPoint": "/modulegenoma/GenomaStudyAPI",
        "endPointParams": [
          { "argumentName": "studyName", "internalVariableObjName":"selectedStudy", "internalVariableObjProperty":"study", "ZZZselObjectPropertyName": "study"},
          { "argumentName": "individualId", "internalVariableObjName":"selectedIndiv", "internalVariableObjProperty":"individual_id", "element": "text1" },
        ],
        "button": {
          "z-icon": "add",
          "title": {
            "label_en": "Add Extra Sample", "label_es": "Añadir Muestra Extra"
          },
          requiresObjectSelected : true
        },    
      },               
      { "actionName": "STUDY_INDIVIDUAL_ACTIVATE",
        "endPoint": "/modulegenoma/GenomaStudyAPI",  
        "endPointParams": [
          { "argumentName": "studyName", "internalVariableObjName":"selectedStudy", "internalVariableObjProperty":"study", "ZZZselObjectPropertyName": "study"},
          { "argumentName": "individualId", "selObjectPropertyName": "lot_name" }
        ],
        "clientMethod": "openReactivateObjectDialog",
        "selObjectVariableName": "selectedIndiv",
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
            "objectName": { "label_en": "Individual to reactivate", "label_es": "Individuo a Reactivar" }
          },    
          "listDefinition":{
            "keyFldName":"lot_name",
            "eachEntryTextGenerator":[
              {"value": "Name: ", "type":"fix"}, {"value": "individual_name", "type":"field"} 
            ]
          },
          "action": [            
            {
              "actionName": "DEACTIVATED_STUDY_INDIVIDUALS_LAST_N_DAYS",
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
  "gridHeaderIndivSample": {
    gridColumns:{
      "sample_id": {
        "label_en": "Smp Id", "label_es": "Id", "sort": false, "filter": true, "is_icon": true, "width": "10%"
      },
      "individual_name": {
        "label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "width": "20%"
      },
      "created_by": {
        "label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"
      },
      "created_on": {
        "label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"
      },
    },
    buttons:[
    ]
  },
  "gridHeaderIndivSampleVariable": {
    gridColumns:{
      "id": {
        "label_en": "Id", "label_es": "Id", "sort": false, "filter": true, "is_icon": true, "width": "10%"
      },
      "type": {
        "label_en": "Type", "label_es": "Tipo", "sort": false, "filter": true, "width": "20%"
      },
      "name": {
        "label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "width": "20%"
      },
      "value": {
        "label_en": "Value", "label_es": "Valor", "sort": false, "filter": true, "width": "20%"
      },
    },
    buttons:[
      {
        "actionName": "LOGSAMPLE",
        "clientMethod": "logSample2",        
        "apiParamsLogSamples": [
          { "query": "locationName", "element": "locationInput", "defaultValue": "" },
          { "query": "sampleTemplate", "targetValue": true },
          { "query": "sampleTemplateVersion", "targetValue": true },
          { "query": "fieldName", "defaultValue": "shift|production_lot" },
          { "query": "fieldValue", "targetValue": true },
          { "query": "numSamplesToLog", "defaultValue": 1 }
        ],
        "button": {
          "icon": "refresh",
          "title": {
            "label_en": "Reload", "label_es": "Recargar"
          },
          "whenDisabled": "samplesReload"
        },    
      }    
    ]
  }
}
let actions = [
]

export class StudyFamilies extends GenomaDialogTemplate(GridUtilities(GenomaUtilities(GenomaActions(CommonsDialogTemplate(CoreView))))) {
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
      selectedSamples: { type: Array },
      selectedAction: { type: Object },
      targetValue: { type: Object },
      procInstanceName: { type: String },
      config: { type: Object },

      selectedStudy: { type: Object },
      selectedFamily: { type: Array },
      selectedIndiv: { type: Array },
      selectedIndivSample: { type: Array },
      selectedIndivSampleVariable: { type: Array }

    };
  }

  constructor() {
    super()
    this.selectedSamples = []
    this.selectedAction = actions[0]

    this.selectedFamily= []
    this.selectedIndiv = []
    this.selectedIndivSample = []
    this.selectedIndivSampleVariable = []
    this.selectedAction = []

  }

  tabView() {
    return html`
      <div class="layout horizontal flex wrap">
        <div class="layout flex">
        ${this.selectedStudy===undefined ? 
          html`<h1>${langConfig.labelWhenNotSelected.title["label_"+this.lang]} ${this.selectedStudy.name}</h1>`: html`        
            <h1>${langConfig.title["label_"+this.lang]} ${this.selectedStudy.name}</h1>
            <div class="layout horizontal center flex wrap">
              ${this.getButton(langConfig.actions)}
            </div>
            ${this.getButton(langConfig.gridHeaderFamily.buttons, this.selectedFamily)}

  <!--          <vaadin-grid id="erGrid" theme="row-dividers" column-reordering-allowed multi-sort
            .items=${this.enterResults}
            @selected-items-changed=${e => {
              this.selectedResults = e.detail.value
            }}
            .detailsOpenedItems=${this.selectedResults}
            ${gridRowDetailsRenderer(this.detailRenderer)}>
            ${this.desktop ?
            html`<vaadin-grid-selection-column header="" flex-grow="1"></vaadin-grid-selection-column>` :
            html`<vaadin-grid-selection-column header="" width="65px" resizable ></vaadin-grid-selection-column>`
          }
            ${this.enterResultList(langConfig.gridHeaderFamily)}
          }
          </vaadin-grid>
  -->
            <vaadin-grid id="familygrid" theme="row-dividers" column-reordering-allowed multi-sort 
              @active-item-changed=${e=>this.selectedFamily=e.detail.value ? [e.detail.value] : []}
              .selectedItems="${this.selectedFamily}" .items="${this.selectedStudy.study_family}">
              ${this.gridListFromGridUtilities(langConfig.gridHeaderFamily, 'familygrid',this.selectedStudy.study_family)}
            </vaadin-grid>
            ${this.getButton(langConfig.gridHeaderIndiv.buttons, this.selectedIndiv)}
            <vaadin-grid id="indivgrid" theme="row-dividers" column-reordering-allowed multi-sort 
              @active-item-changed=${e=>this.selectedIndiv=e.detail.value ? [e.detail.value] : []}
              .selectedItems="${this.selectedIndiv}" >
              ${this.gridListFromGridUtilities(langConfig.gridHeaderIndiv)}
            </vaadin-grid>          
            ${this.getButton(langConfig.gridHeaderIndivSample.buttons, this.selectedIndivSample)}
            <vaadin-grid id="indivsmpgrid" theme="row-dividers" column-reordering-allowed multi-sort 
              @active-item-changed=${e=>this.selectedIndivSample=e.detail.value ? [e.detail.value] : []}
              .selectedItems="${this.selectedIndivSample}" >
              ${this.gridListFromGridUtilities(langConfig.gridHeaderIndivSample, 'indivsmpgridz',[])}
            </vaadin-grid>          
            ${this.getButton(langConfig.gridHeaderIndivSampleVariable.buttons, this.selectedIndivSampleVariable)}
            <vaadin-grid id="indivsmpvariablegrid" theme="row-dividers" column-reordering-allowed multi-sort 
              @active-item-changed=${e=>this.selectedIndivSampleVariable=e.detail.value ? [e.detail.value] : []}
              .selectedItems="${this.selectedIndivSampleVariable}" >
              ${this.gridListFromGridUtilities(langConfig.gridHeaderIndivSampleVariable, 'indivsmpvariablegridz',[])}
            </vaadin-grid>          
          `}
        </div>
        ${this.familySelected()}
        ${this.indivSelected()}
        ${this.indivSampleSelected()} 
        ${this.genomaDialogsTemplate()} 
        ${this.reactiveObjectTemplate()}

      </div>
    `;
  }
  get familygrid() {
    return this.shadowRoot.querySelector("vaadin-grid#familygrid")
  }  
  familySelected() {
    if (!this.selectedFamily.length||this.selectedFamily[0].study_individual===undefined){
      if (this.indivgrid){
        this.indivgrid.items =[]
      }
      this.gridDynamicHeight('indivgrid',[])
      return
    }
    //console.log('selectedFamily', this.selectedFamily[0].study_individual.length, this.selectedFamily[0])
    if(this.indivgrid){
      this.indivgrid.items = this.selectedFamily[0].study_individual
      this.gridDynamicHeight('indivgrid',this.selectedFamily[0].study_individual)
    }

    return;
  }
  get indivgrid() {
    return this.shadowRoot.querySelector("vaadin-grid#indivgrid")
  }
  indivSelected() {
    if (!this.selectedFamily.length||!this.selectedIndiv.length||this.selectedIndiv[0].study_individual_sample===undefined){
      if(this.indivsmpgrid){this.indivsmpgrid.items = []}
      return;
    }
    this.indivsmpgrid.items = this.selectedIndiv[0].study_individual_sample;
    return;
  }
  get indivsmpgrid() {
    return this.shadowRoot.querySelector("vaadin-grid#indivsmpgrid")
  }
  indivSampleSelected() {
    if (!this.selectedIndiv.length||!this.selectedIndivSample.length||this.selectedIndivSample[0].study_variable_values===undefined){
      if(this.indivsmpvariablegrid){this.indivsmpvariablegrid.items = []}
      return;
    }
    this.indivsmpvariablegrid.items = this.selectedIndivSample[0].study_variable_values;
    return;
  }
  get indivsmpvariablegrid() {
    return this.shadowRoot.querySelector("vaadin-grid#indivsmpvariablegrid")
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
//   genericFormClient(){
//     //console.log('genericFormClient')
//     this.selectedSamples = []
//     this.newStudyIndividual.show()
// //    this.actionMethod(this.selectedAction)
//   }
//   setView() {
//     this.selectedSamples = []
//     this.selectedAction = actions[0]
//     this.actionMethod(this.selectedAction.subAction)
//   }

  xjsonParamCommons(selAction, selObject) {
    //console.log('jsonParamCommons', selAction)
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
    let jsonParam = {}
    let action = selAction
    if (action.endPointParams) {
      action.endPointParams.forEach(p => {
        if (p.argumentName==="studyName") {
          if (this.selectedStudy===undefined||this.selectedStudy.name===undefined){
            alert('No study selected')
            return jsonParam
          }
          jsonParam[p.argumentName] = this.selectedStudy.name
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

    enterResultList(gridElementDefinition) {
     // console.log('enterResultList', 'gridElementDefinition', gridElementDefinition, 'this.desktop', this.desktop)
      if (this[gridElementDefinition]===undefined){return}
      return Object.entries(this[gridElementDefinition.gridColumns]).map(([key, value], i) =>      
        html`
          ${this.desktop ?
            html`
              ${i == 0 ?
                html`<vaadin-grid-column 
                  ${columnBodyRenderer(this.specRenderer)}
                  text-align="center" 
                  flex-grow="0"
                  path="${key}" 
                  header="${value['label_' + this.lang]}"></vaadin-grid-column>` :
                html`${key == "raw_value" ?
                  html`<vaadin-grid-column 
                    ${columnBodyRenderer(this.valRenderer)}
                    text-align="center" 
                    resizable 
                    width="130px"
                    path="${key}" 
                    header="${value['label_' + this.lang]}"></vaadin-grid-column>` :
                  html`${key == "uom" ?
                    html`<vaadin-grid-column ${columnBodyRenderer(this.uomRenderer)} resizable flex-grow=1 text-align='center' path="${key}" header="${value['label_' + this.lang]}"></vaadin-grid-column>` :
                    html`<vaadin-grid-column resizable flex-grow=1 path="${key}" header="${value['label_' + this.lang]}"></vaadin-grid-column>`
                    }`
                  }`
              }
            ` :
            html`
              ${i == 0 ?
                html`<vaadin-grid-column 
                  ${columnBodyRenderer(this.specRenderer)}
                  width="65px" resizable 
                  path="${key}" 
                  header="${value['label_' + this.lang]}"></vaadin-grid-column>` :
                html`${key == "raw_value" ?
                  html`<vaadin-grid-column 
                    ${columnBodyRenderer(this.valRenderer)}
                    width="130px" resizable 
                    path="${key}" 
                    header="${value['label_' + this.lang]}"></vaadin-grid-column>` :
                  html`${key == "uom" ?
                    html`<vaadin-grid-column ${columnBodyRenderer(this.uomRenderer)} resizable width="65px" path="${key}" header="${value['label_' + this.lang]}"></vaadin-grid-column>` :
                    html`<vaadin-grid-column resizable width="65px" path="${key}" header="${value['label_' + this.lang]}"></vaadin-grid-column>`
                    }`
                  }`
              }
            `
          }
        `
      )
    }

    specRenderer(result) {
      //console.log('specRenderer')
      if (result.spec_eval) {
        if (result.spec_eval == 'IN') {
          return html`<mwc-icon style="color:green">radio_button_checked</mwc-icon>`
        } else {
          if (result.spec_eval.toUpperCase().includes("OUT") && result.spec_eval.toUpperCase().includes("SPEC")) {
            return html`<mwc-icon style="color:red">radio_button_checked</mwc-icon>`
          } else {
            return html`<mwc-icon style="color:orange">radio_button_checked</mwc-icon>`
          }
        }
      } else {
        return html`<img style="height:24px; width: 24px;" src="https://upload.wikimedia.org/wikipedia/commons/9/96/Button_Icon_White.svg">`
      }
    }

    detailRenderer() {
      let labels = {
        "warning_reason_label_en": "Warning Reason", "warning_reason_label_es": "Razón Aviso",
        "locking_reason_label_en": "Locking Reason", "locking_reason_label_es": "Razón Bloqueo"
      }
      let result = {"spec_eval": "IN", "method_name": "Method", "method_version": 1, "spec_eval_detail": "spec_eval_detail", "is_locked": false, "warning_reason": "warning"}
      return html`
        <div style="text-align:center;font-size:12px">
          <p>${result.spec_eval ?
          html`${result.spec_eval == 'IN' ?
            html`<mwc-icon style="color:green">radio_button_checked</mwc-icon>` :
            html`${result.spec_eval.toUpperCase().includes("OUT") && result.spec_eval.toUpperCase().includes("SPEC") ?
              html`<mwc-icon style="color:red">radio_button_checked</mwc-icon>` :
              html`<mwc-icon style="color:orange">radio_button_checked</mwc-icon>`
              }`
            }` :
          html`<img style="height:24px; width: 24px;" src="https://upload.wikimedia.org/wikipedia/commons/9/96/Button_Icon_White.svg">`
        }</p>
          <p>${this.lang == "en" ? "Method" : "Método"}: ${result.method_name} (${result.method_version})</p>
          <p>Range Rule: ${result.spec_rule_info[0].ruleRepresentation}</p>
          <p>Range Evaluation: ${result.spec_eval} (${result.spec_eval_detail})</p>
          ${result.is_locked ?
          html`<p style="color:rgb(255 8 8)">${labels['locking_reason_label_' + this.lang]}: ${result.locking_reason["message_" + this.lang]}</p>` : nothing
        }
          ${result.warning_reason ?
          html`<p style="color:#0085ff">${labels['warning_reason_label_' + this.lang]}: ${result.warning_reason["message_" + this.lang]}</p>` : nothing
        }
        </div>
      `
    }

}
customElements.define('study-families', StudyFamilies);