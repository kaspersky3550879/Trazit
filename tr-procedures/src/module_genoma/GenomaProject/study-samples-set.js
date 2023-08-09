import { html, css, nothing } from 'lit';
import { CoreView } from '../../components/core-view';
import { Alignment, Layouts } from '@collaborne/lit-flexbox-literals';
import { commonLangConfig } from '@trazit/common-core';
import { columnBodyRenderer } from 'lit-vaadin-helpers';
import { CommonsDialogTemplate } from '../../CommonsDialogTemplate';
import { GenomaActions } from '../GenomaActions';
import { GenomaUtilities } from '../GenomaUtilities';
import { GridUtilities } from '../GridUtilities';
import { GenomaDialogTemplate} from '../GenomaDialogTemplate';

//import { CommonsClientMethod} from './../../CommonsClientMethod';
let langConfig = {
  "title": {
    "label_en": "Samples Set", "label_es": "Agrupador de Muestras"
  },
  "fieldText": {
    "logBtn": { "label_en": "Log Sample", "label_es": "Registrar Muestra" },
    "lot": {
      "items": [],
      "label_en": "Lot", "label_es": "Lote"
    }
  },
  "gridHeaderSampleSet": {
    gridColumns:{
      "name": {
        "label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "is_icon": true, "width": "10%"
      },
      "description": {
        "label_en": "Description", "label_es": "Descripción", "sort": false, "filter": true, "width": "20%"
      },
      "created_by": {
        "label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"
      },
      "created_on": {
        "label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"
      },
    },
    buttons:[
      { "actionName": "STUDY_CREATE_SAMPLES_SET",
        "clientMethod": "newStudyIndividual",
        "selObjectVariableName": "selectedSampleSet",
        "endPoint": "/modulegenoma/GenomaStudyAPI",
        "endPointParams": [
          { "argumentName": "studyName", "ZZZselObjectPropertyName": "study"},
          { "argumentName": "samplesSetName", "element": "text1" }
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
            {"text1": { "label_en": "new Sample Set Name", "label_es": "Nombre nuevo Agrupador Muestras" }}
          ]
        }
      },
      { "actionName": "STUDY_SAMPLES_SET_DEACTIVATE",
        "clientMethod": "buttonActionWithoutDialog",
        "selObjectVariableName": "selectedSampleSet",
        "endPoint": "/modulegenoma/GenomaStudyAPI",
        "endPointParams": [
          { "argumentName": "studyName", "selObjectPropertyName": "study"},
          { "argumentName": "samplesSetName", "selObjectPropertyName": "name" }
        ],
        "button": {
          "z-icon": "refresh",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          requiresObjectSelected : true
        },    
      }, 
      { "actionName": "STUDY_SAMPLES_SET_ACTIVATE",
        "endPoint": "/modulegenoma/GenomaStudyAPI",  
        "endPointParams": [
          { "argumentName": "studyName", "selObjectPropertyName": "study"},
          { "argumentName": "samplesSetName", "selObjectPropertyName": "name" }
        ],
        "clientMethod": "openReactivateObjectDialog",
        "selObjectVariableName": "selectedSampleSet",
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
          "selObjectVariableName": "selectedSampleSet", 
          "fieldText": {
            "numDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
            "objectName": { "label_en": "Samples Set to reactivate", "label_es": "Agrupador a Reactivar" }
          },    
          "listDefinition":{
            "keyFldName":"name",
            "eachEntryTextGenerator":[
              {"value": "Name: ", "type":"fix"}, {"value": "name", "type":"field"} 
            ]
          },
          "action": [            
            {
              "actionName": "DEACTIVATED_STUDY_SAMPLES_SET_LAST_N_DAYS",
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
      { "actionName": "STUDY_SAMPLES_SET_ADD_SAMPLE",
        "clientMethod": "dialogRequired",
        "selObjectVariableName": "selectedSampleSet",
        "endPoint": "/modulegenoma/GenomaStudyAPI",
        "endPointParams": [
          { "argumentName": "studyName", "internalVariableObjName":"selectedStudy", "internalVariableObjProperty":"study", "ZZZselObjectPropertyName": "study"},
          { "argumentName": "samplesSetName", "selObjectPropertyName":"name"},
          { "argumentName": "sampleId", "element": "text1" }
          // { "argumentName": "fieldsNames", "value": "undefined" },
          // { "argumentName": "fieldsValues", "value": "undefined" }
        ],
        "button": {
          "z-icon": "add",
          "title": {
            "label_en": "Add Sample", "label_es": "Añadir Muestra"
          },
          requiresObjectSelected : true
        },    
        "dialogInfo": {
          "requiresDialog": true,
          "name": "genericFormDialog",
          "fieldText": [
            {"text1": { "label_en": "Sample to Add", "label_es": "Muestra a añadir" }}
          ]
        }
      },               
      { "actionName": "STUDY_SAMPLES_SET_REMOVE_SAMPLE",
        "clientMethod": "dialogRequired",
        "selObjectVariableName": "selectedSampleSet",
        "endPoint": "/modulegenoma/GenomaStudyAPI",
        "endPointParams": [
          { "argumentName": "studyName", "internalVariableObjName":"selectedStudy", "internalVariableObjProperty":"study", "ZZZselObjectPropertyName": "study"},
          { "argumentName": "samplesSetName", "selObjectPropertyName":"name"},
          { "argumentName": "sampleId", "element": "text1" }
        ],
        "button": {
          "z-icon": "remove",
          "title": {
            "label_en": "Unlink Sample", "label_es": "Quitar Muestra"
          },
          requiresObjectSelected : true
        }, 
        "dialogInfo": {
          "requiresDialog": true,
          "name": "genericFormDialog",
          "fieldText": [
            {"text1": { "label_en": "Sample to unlink", "label_es": "Muestra a deasignar" }}
          ]
        }
      },               
    ]
  },
  "gridHeaderSampleSetSample": {
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
  "gridHeaderSampleSetSampleVariable": {
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
        "selObjectVariableName": "selectedSampleSetSampleVariable",
        "endPoint": "/modulegenoma/GenomaStudyAPI",
        // "endPointParams": [
        //   { "argumentName": "studyName", "ZZZselObjectPropertyName": "study"},
        //   { "argumentName": "samplesSetName", "element": "text1" }
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

export class StudySamplesSet extends GenomaDialogTemplate(GridUtilities(GenomaUtilities(GenomaActions(CommonsDialogTemplate(CoreView))))) {
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
      selectedSampleSet: { type: Array },
      selectedSampleSetSample: { type: Array },
      selectedSampleSetSampleVariable: { type: Array }

    };
  }

  constructor() {
    super()
    this.selectedSamples = []
    this.selectedAction = actions[0]

    this.selectedSampleSet = []
    this.selectedSampleSetSample = []
    this.selectedSampleSetSampleVariable = []
    this.selectedAction = []

  }

  tabView() {
    return html`
      <div class="layout horizontal flex wrap">
        <div class="layout flex">
        <h1>${langConfig.title["label_"+this.lang]} ${this.selectedStudy.name}</h1>
          <div class="layout horizontal center flex wrap">
            ${this.getButton(langConfig.actions)}
          </div>
          ${this.getButton(langConfig.gridHeaderSampleSet.buttons, this.selectedSampleSet)}
          <vaadin-grid id="sampleSetgrid" theme="row-dividers" column-reordering-allowed multi-sort 
            @active-item-changed=${e=>this.selectedSampleSet=e.detail.value ? [e.detail.value] : []}
            .selectedItems="${this.selectedSampleSet}" .items="${this.selectedStudy.study_samples_set}">
            ${this.gridListFromGridUtilities(langConfig.gridHeaderSampleSet)}
          </vaadin-grid>
          ${this.getButton(langConfig.gridHeaderSampleSetSample.buttons, this.selectedSampleSetSample)}
          <vaadin-grid id="samplesetsamplesgrid" theme="row-dividers" column-reordering-allowed multi-sort 
            @active-item-changed=${e=>this.selectedSampleSetSample=e.detail.value ? [e.detail.value] : []}
            .selectedItems="${this.selectedSampleSetSample}" >
            ${this.gridListFromGridUtilities(langConfig.gridHeaderSampleSetSample)}
          </vaadin-grid>
          ${this.getButton(langConfig.gridHeaderSampleSetSampleVariable.buttons, this.selectedSampleSetSampleVariable)}
          <vaadin-grid id="samplesetsamplevariablegrid" theme="row-dividers" column-reordering-allowed multi-sort 
            @active-item-changed=${e=>this.selectedSampleSetSampleVariable=e.detail.value ? [e.detail.value] : []}
            .selectedItems="${this.selectedSampleSetSampleVariable}" >
            ${this.gridListFromGridUtilities(langConfig.gridHeaderSampleSetSampleVariable)}
          </vaadin-grid>
        </div>
        ${this.sampleSetSelected()}
        ${this.sampleSetSampleSelected()} 
        ${this.genomaDialogsTemplate()} 
        ${this.reactiveObjectTemplate()}
      </div>
    `;
  }

  get sampleSetgrid() {    return this.shadowRoot.querySelector("vaadin-grid#sampleSetgrid")  }
  sampleSetSelected() {
    if (!this.selectedSampleSet.length){return;}
    this.samplesetsamplesgrid.items = this.selectedSampleSet[0].samples;
    return;
  }
  sampleSetSampleSelected() {
    if (!this.selectedSampleSet.length||!this.selectedSampleSetSample.length){return;}
    this.samplesetsamplevariablegrid.items = this.selectedSampleSetSample[0].study_variable_values;
    return;
  }
  get samplesetsamplesgrid() {    return this.shadowRoot.querySelector("vaadin-grid#samplesetsamplesgrid")  }
  get samplesetsamplevariablegrid() {    return this.shadowRoot.querySelector("vaadin-grid#samplesetsamplevariablegrid")  }
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
customElements.define('study-samples-set', StudySamplesSet);