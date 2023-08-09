import { html, css, nothing } from 'lit';
import { CoreView } from '../../components/core-view';
import { Alignment, Layouts } from '@collaborne/lit-flexbox-literals';
import { commonLangConfig } from '@trazit/common-core';
import { columnBodyRenderer } from 'lit-vaadin-helpers';
import { CommonsDialogTemplate } from './../../CommonsDialogTemplate';
import { GenomaActions } from '../GenomaActions';
import { GenomaUtilities } from '../GenomaUtilities';
import { GridUtilities } from '../GridUtilities';
import { GenomaDialogTemplate} from '../GenomaDialogTemplate';
//import { CommonsClientMethod} from './../../CommonsClientMethod';
let langConfig = {
  "title": {
    "label_en": "Individuals", "label_es": "Individuos"
  },
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
          { "argumentName": "studyName", "ZZZselObjectPropertyName": "study"},
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
          { "argumentName": "studyName", "selObjectPropertyName": "study"},
          { "argumentName": "individualId", "selObjectPropertyName": "individual_id" }
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
          { "argumentName": "studyName", "selObjectPropertyName": "study"},
          { "argumentName": "individualId", "selObjectPropertyName": "individual_id" }
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
          { "argumentName": "studyName", "selObjectPropertyName": "study"},
          { "argumentName": "individualId", "selObjectPropertyName": "individual_id" }
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
          "selObjectVariableName": "selectedIndiv", 
          "fieldText": {
            "numDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
            "objectName": { "label_en": "Individual to reactivate", "label_es": "Individuo a Reactivar" }
          },    
          "listDefinition":{
            "keyFldName":"individual_id",
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
      { "actionName": "ADD_VARIABLE_SET_TO_STUDY_OBJECT",
        "clientMethod": "newStudyIndividual",
        "selObjectVariableName": "selectedIndivSample", 
        "endPoint": "/modulegenoma/GenomaStudyAPI",
        "endPointParams": [ 
          { "argumentName": "studyName", "selObjectPropertyName": "study"},
          { "argumentName": "ownerTable", "value": "study_individual_sample" },
          { "argumentName": "ownerId", "selObjectPropertyName": "sample_id" },
          { "argumentName": "variableSetName", "element": "listMDvariablesSet" },          
          // { "argumentName": "fieldsNames", "value": "undefined" },
          // { "argumentName": "fieldsValues", "value": "undefined" }
          //individualsList
        ],
        "button": {
          "z-icdon": "refresh",
          "title": {
            "label_en": "Add Variable Set", "label_es": "Añadir Conjunto de Variables"
          },
          requiresObjectSelected : false
        },   
        "dialogInfo": {
          "requiresDialog": true,
          "name": "genericFormDialog",
          "fieldText": [
            {"listMDvariablesSet": { "label_en": "Variables Set", "label_es": "Conjunto Variables" }}
          ]
        }
      },
      { "actionName": "ADD_VARIABLE_TO_STUDY_OBJECT",
        "clientMethod": "newStudyIndividual",
        "selObjectVariableName": "selectedIndivSample", 
        "endPoint": "/modulegenoma/GenomaStudyAPI",
        "endPointParams": [ 
          { "argumentName": "studyName", "selObjectPropertyName": "study"},
          { "argumentName": "ownerTable", "value": "study_individual_sample" },
          { "argumentName": "ownerId", "selObjectPropertyName": "sample_id" },
          { "argumentName": "variableName", "element": "listMDvariables" },          
          // { "argumentName": "fieldsNames", "value": "undefined" },
          // { "argumentName": "fieldsValues", "value": "undefined" }
          //individualsList
        ],
        "button": {
          "z-icdon": "refresh",
          "title": {
            "label_en": "Add Variable", "label_es": "Añadir Variable"
          },
          requiresObjectSelected : false
        },   
        "dialogInfo": {
          "requiresDialog": true,
          "name": "genericFormDialog",
          "fieldText": [
            {"listMDvariables": { "label_en": "Variable", "label_es": "Variable" }}
          ]
        }
      },
      { "actionName": "STUDY_INDIVIDUAL_SAMPLE_DEACTIVATE",
        "clientMethod": "buttonActionWithoutDialog",
        "selObjectVariableName": "selectedIndivSample",
        "endPoint": "/modulegenoma/GenomaStudyAPI",
        "endPointParams": [
          { "argumentName": "studyName", "selObjectPropertyName": "study"},
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
          { "argumentName": "individualId", "selObjectPropertyName": "individual_id" }
        ],
        "button": {
          "z-icon": "refresh",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          requiresObjectSelected : true
        },    
      }, 
      { "actionName": "STUDY_INDIVIDUAL_SAMPLE_ACTIVATE",
        "endPoint": "/modulegenoma/GenomaStudyAPI",  
        "endPointParams": [
          { "argumentName": "studyName", "selObjectPropertyName": "study"},
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
          //{ "argumentName": "individualId", "selObjectPropertyName": "individual_id" }
        ],
        "clientMethod": "openReactivateObjectDialog",
        "selObjectVariableName": "selectedIndivSample",
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
          "selObjectVariableName": "selectedIndiv", 
          "fieldText": {
            "numDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
            "objectName": { "label_en": "Sample to reactivate", "label_es": "Muestra a Reactivar" }
          },    
          "listDefinition":{
            "keyFldName":"sample_id",
            "eachEntryTextGenerator":[
              {"value": "Sample: ", "type":"fix"}, {"value": "sample_id", "type":"field"} 
            ]
          },
          "action": [            
            {
              "actionName": "DEACTIVATED_STUDY_INDIVIDUAL_SAMPLES_LAST_N_DAYS",
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
      { "actionName": "STUDY_OBJECT_SET_VARIABLE_VALUE",
        "clientMethod": "studyObjectSetVariableValue",
        "selObjectVariableName": "selectedIndivSampleVariable",
        "endPoint": "/modulegenoma/GenomaStudyAPI",
        // "endPointParams": [
        //   { "argumentName": "studyName", "ZZZselObjectPropertyName": "study"},
        //   { "argumentName": "individualName", "element": "text1" }
        //   // { "argumentName": "fieldsNames", "value": "undefined" },
        //   // { "argumentName": "fieldsValues", "value": "undefined" }
        // ],
        "button": {
          "z-icdon": "refresh",
          "title": {
            "label_en": "Set Result", "label_es": "Entrar Result"
          },
          requiresObjectSelected : true
        },   
        "dialogInfo": {
          "requiresDialog": true,
          "name": "objectSetResultValue",
          "fieldText": {
            "variableName": { "label_en": "Variable Name", "label_es": "Nombre Variable" },
            "value": { "label_en": "Value", "label_es": "Valor" }
            //"number1": { "label_en": "new Individual Name", "label_es": "Nombre Nuevo Individuo" },
            //"list1": { "label_en": "new Individual Name", "label_es": "Nombre Nuevo Individuo",
            //   "items": [
            //     { "keyName": "familyCorrecto", "keyValue_en": "Correct", "keyValue_es": "Correcto" },
            //     { "keyName": "familyIntentObs", "keyValue_en": "Attempt-Obs", "keyValue_es": "Intent-Obs" },
            //     { "keyName": "familyObsCorrecto", "keyValue_en": "Correct-Obs", "keyValue_es": "Correcto-Obs" },
            //     { "keyName": "familyObsIntentosCorrecto", "keyValue_en": "Corr-Attempt-Obs", "keyValue_es": "Corr-Intent-Obs" },
            //     { "keyName": "familyObsIntentoCorrectoTerminado", "keyValue_en": "Corr-Attempt-Obs-End", "keyValue_es": "Corr-Intent-Obs-Term" }
            //   ]            
            // }
          }
        }
      }
    ]
  }
}
let actions = [
]

export class StudyIndividuals extends GenomaDialogTemplate(GridUtilities(GenomaUtilities(GenomaActions(CommonsDialogTemplate(CoreView))))) {
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
      selectedIndiv: { type: Array },
      selectedIndivSample: { type: Array },
      selectedIndivSampleVariable: { type: Array },

      MDvariablesSet:{type: Array},
      MDvariables:{type: Array}

    };
  }

  constructor() {
    super()
    this.selectedSamples = []
    this.selectedAction = actions[0]

    this.selectedIndiv = []
    this.selectedIndivSample = []
    this.selectedIndivSampleVariable = []
    this.selectedAction = []

    this.MDvariablesSet = []
    this.MDvariables = []
  }

  tabView() {
    return html`
      <div class="layout horizontal flex wrap">
        <div class="layout flex">
          <h1>${langConfig.title["label_"+this.lang]} ${this.selectedStudy.name}</h1>
          <div class="layout horizontal center flex wrap">
            ${this.getButton(langConfig.actions)}
          </div>
          ${this.getButton(langConfig.gridHeaderIndiv.buttons, this.selectedIndiv)}
          <vaadin-grid id="indivgrid" theme="row-dividers" column-reordering-allowed multi-sort 
            @active-item-changed=${e=>this.selectedIndiv=e.detail.value ? [e.detail.value] : []}
            .selectedItems="${this.selectedIndiv}" .items="${this.selectedStudy.study_individual}">
            ${this.gridListFromGridUtilities(langConfig.gridHeaderIndiv)}
            
          </vaadin-grid>
          ${this.getButton(langConfig.gridHeaderIndivSample.buttons, this.selectedIndivSample)}
          <vaadin-grid id="indivsmpgrid" theme="row-dividers" column-reordering-allowed multi-sort 
            @active-item-changed=${e=>this.selectedIndivSample=e.detail.value ? [e.detail.value] : []}
            .selectedItems="${this.selectedIndivSample}" >
            ${this.gridListFromGridUtilities(langConfig.gridHeaderIndivSample)}
            
          </vaadin-grid>
          ${this.getButton(langConfig.gridHeaderIndivSampleVariable.buttons, this.selectedIndivSampleVariable)}
          <vaadin-grid id="indivsmpvariablegrid" theme="row-dividers" column-reordering-allowed multi-sort 
            @active-item-changed=${e=>this.selectedIndivSampleVariable=e.detail.value ? [e.detail.value] : []}
            .selectedItems="${this.selectedIndivSampleVariable}" >
            ${this.gridListFromGridUtilities(langConfig.gridHeaderIndivSampleVariable)}
          </vaadin-grid>
        </div>
        ${this.indivSelected()}
        ${this.indivSampleSelected()} 
        ${this.genomaDialogsTemplate()} 
        ${this.reactiveObjectTemplate()}
      </div>
    `;
  }

  /** Point Template Dialog part          ${this.genomaDialogsTemplate()} */
  indivSelected() {
    if (!this.selectedIndiv.length){
      if (this.indivsmpgrid){this.indivsmpgrid.items = []}
      return
    }
    this.indivsmpgrid.items = this.selectedIndiv[0].study_individual_sample
    this.indivsmpgrid.style.height=this.tableHeight(this.selectedIndiv[0].study_individual_sample)
    return;
  }
  indivSampleSelected() {
    if (!this.selectedIndiv.length||!this.selectedIndivSample.length){
      if (this.indivsmpvariablegrid){this.indivsmpvariablegrid.items = []}
      return
    }
    this.indivsmpvariablegrid.items = this.selectedIndivSample[0].study_variable_values;
    this.indivsmpvariablegrid.style.height=this.tableHeight(this.selectedIndivSample[0].study_variable_values)
    return;
  }
  get indivgrid() {
    return this.shadowRoot.querySelector("vaadin-grid#indivgrid")
  }
  get indivsmpgrid() {
    return this.shadowRoot.querySelector("vaadin-grid#indivsmpgrid")
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
customElements.define('study-individuals', StudyIndividuals);