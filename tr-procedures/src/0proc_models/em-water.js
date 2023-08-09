export const ProcDeploy = {
  "ProductionLots": {
    "langConfig": {
      "title": {
        "SampleLot": {
          "label_en": "Active Production Lots",
          "label_es": "Lotes en producción activos"
        }
      },
      "fieldText": {
        "newLot": { "label_en": "New Production Lot Name", "label_es": "Nombre para nuevo lote de producción" },
        "lotDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
        "lotName": { "label_en": "Lot Name to reactivate", "label_es": "Nombre para el lote a reactivar" },
        "activateLot": { "label_en": "Production Lot Name to reactivate", "label_es": "Nombre para el lote de producción a reactivar" }
      },
      "gridHeader": {
        "lot_name": {
          "label_en": "Name", "label_es": "Nombre", "width": "80%", "sort": false, "filter": true, "align": "left"
        },
        "created_on": {
          "label_en": "Created On", "label_es": "F. Creación", "width": "20%", "sort": true, "filter": false
        }
      }
    },
    "actions": [
      {
        "actionName": "GET_ACTIVE_PRODUCTION_LOTS",
        "clientMethod": "getSamples",
        "endPoint": "/moduleenvmon/frontend/EnvMonAPIfrontend",
        "button": {
          "icon": "refresh",
          "title": {
            "label_en": "Reload", "label_es": "Recargar"
          },
          "whenDisabled": "samplesReload"
        }
      },
      {
        "actionName": "EM_NEW_PRODUCTION_LOT",
        "clientMethod": "setLot",
        "button": {
          "icon": "create_new_folder",
          "title": {
            "label_en": "New", "label_es": "Nuevo"
          },
          "whenDisabled": "samplesReload"
        },
        "dialogInfo": {
          "requiresDialog": true,
          "name": "lotDialog"
        },
        "apiParams": [
          { "query": "lotName", "element": "lotInput" },
          { "query": "fieldName", "value": "active" },
          { "query": "fieldValue", "value": "true*Boolean" }
        ]
      },
      {
        "actionName": "EM_ACTIVATE_PRODUCTION_LOT",
        "clientMethod": "setLot",
        "button": {
          "icon": "alarm_add",
          "title": {
            "label_en": "Activate", "label_es": "Activar"
          },
          "whenDisabled": "samplesReload"
        },
        "dialogInfo": {
          "requiresDialog": true,
          "name": "lotDialog",
          "action": [
            {
              "actionName": "DEACTIVATED_PRODUCTION_LOTS_LAST_N_DAYS",
              "clientMethod": "getDeactivatedLots",
              "endPoint": "/moduleenvmon/frontend/EnvMonAPIfrontend",
              "apiParams": [
                { "query": "numDays", "element": "lotNumDays", "defaultValue": 7 }
              ]
            }
          ]
        },
        "apiParams": [
          { "query": "lotName", "element": "lotName" }
        ]
      },
      {
        "actionName": "EM_DEACTIVATE_PRODUCTION_LOT",
        "clientMethod": "setLot",
        "button": {
          "icon": "alarm_off",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          { "query": "lotName", "beItem": "lot_name" }
        ]
      }
    ]
  },
  "LogSamples": {
    "langConfig": {
      "title": {
        "SampleLogin": {
          "label_en": "Program Sampling Points",
          "label_es": "Puntos de muestro del programa"
        }
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
      "gridHeader": {
        "area": {
          "label_en": "Area", "label_es": "Area", "sort": false, "filter": true, "is_icon": true, "width": "10%"
        },
        "location_name": {
          "label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true, "width": "20%"
        },
        "spec_code": {
          "label_en": "Spec", "label_es": "Especificación", "sort": false, "filter": true, "width": "20%"
        },
        "spec_variation_name": {
          "label_en": "Variation", "label_es": "Variación", "sort": false, "filter": true, "width": "20%"
        },
        "spec_analysis_variation": {
          "label_en": "Analysis Variation", "label_es": "Análisis de Variación", "sort": false, "filter": true, "width": "20%"
        },
        "person_ana_definition": {
          "label_en": "Person Sampling Areas", "label_es": "Areas a analizar de Personal", "sort": false, "filter": true, "width": "40%"
        }
      }
    },
    "actions": [
      {
        "actionName": "PROGRAMS_LIST",
        "clientMethod": "getProgramList",
        "button": {
          "icon": "refresh",
          "title": {
            "label_en": "Reload", "label_es": "Recargar"
          },
          "whenDisabled": "samplesReload"
        },
        "subAction": {
          "actionName": "GET_ACTIVE_PRODUCTION_LOTS",
          "clientMethod": "getLots"
        }
      },
      {
        "actionName": "LOGSAMPLE",
        "clientMethod": "logSample",
        "apiParams": [
          { "query": "programName", "element": "programInput", "defaultValue": "" },
          { "query": "locationName", "element": "locationInput", "defaultValue": "" },
          { "query": "sampleTemplate", "targetValue": true },
          { "query": "sampleTemplateVersion", "targetValue": true },
          { "query": "fieldName", "defaultValue": "shift|production_lot" },
          { "query": "fieldValue", "targetValue": true },
          { "query": "numSamplesToLog", "defaultValue": 1 }
        ]
      }
    ],
    "topCompositions": [
      {
        "templateName": "specCode",
        "buttons": [{
          "icon": "refresh",
          "title": {
            "label_en": "Reload", "label_es": "Recargar"
          },
          "calledActionIdx": 0
        }]
      }
    ]
  },
  "SamplePending": {
    "langConfig": {
      "title": {
        "sampling": {
          "label_en": "Pending Sampling",
          "label_es": "Muestras pendiente muestreo"
        }
      },
      "fieldText": {
        "newDate": { "label_en": "New Date", "label_es": "Nueva Fecha" },
        "comment": { "label_en": "Comment", "label_es": "Comentario" }
      },
      "gridHeader": {
        "sample_id": {
          "label_en": "Sample ID", "label_es": "ID Muestra", "sort": false, "filter": true
        },
        "program_name": {
          "label_en": "Project", "label_es": "Programa", "sort": false, "filter": true
        },
        "location_name": {
          "label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true
        },
        "sampling_comment": {
          "label_en": "sampling Comment", "label_es": "Comentario Muestreo", "sort": false, "filter": true
        },
        "spec_code": {
          "label_en": "Spec", "label_es": "Especificación", "sort": false, "filter": true
        },
        "spec_variation_name": {
          "label_en": "Variation", "label_es": "Variación", "sort": false, "filter": true
        }
      }
    },
    "actions": [
      {
        "actionName": "SAMPLES_INPROGRESS_LIST",
        "clientMethod": "getSamples",
        "button": {
          "icon": "refresh",
          "title": {
            "label_en": "Reload", "label_es": "Recargar"
          },
          "whenDisabled": "samplesReload"
        },
        "apiParams": [
          { "query": "sampleFieldToRetrieve", "value": "sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name" },
          { "query": "whereFieldsValue", "value": "-" },
          { "query": "addSampleAnalysis", "value": false },
          { "query": "addSampleAnalysisFieldToRetrieve", "value": "method_name|testing_group" },
          { "query": "sampleAnalysisWhereFieldsName", "value": "FQ*String" },
          { "query": "addSampleAnalysisResult", "value": false }
        ],
        "paramFilter": {
          "sampling": { "query": "whereFieldsName", "value": "sampling_date is null" }
        }
      },
      {
        "actionName": "GET_SAMPLE_AUDIT",
        "clientMethod": "getSampleAudit",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit", "label_es": "Auditoría de Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": {
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
              "clientMethod": "signAudit",
              "apiParams": [
                { "query": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
      {
        "actionName": "SETSAMPLINGDATE",
        "clientMethod": "setSamplingDate",
        "button": {
          "icon": "date_range",
          "title": {
            "label_en": "Set Sample Date", "label_es": "Establecer Fecha Muestra"
          },
          "whenDisabled": "selectedSamples"
        }
      },
      {
        "actionName": "CHANGESAMPLINGDATE",
        "clientMethod": "setSamplingDate",
        "button": {
          "icon": "event",
          "title": {
            "label_en": "Change Sample Date", "label_es": "Cambiar Fecha Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": {
          "requiresDialog": true,
          "name": "dateDialog"
        },
        "apiParams": [
          { "query": "newDateTime", "element": "dateInput", "defaultValue": "" }
        ]
      },
      {
        "actionName": "SAMPLINGCOMMENTADD",
        "clientMethod": "addSamplingComment",
        "button": {
          "icon": "add_comment",
          "title": {
            "label_en": "Add Sampling Comment", "label_es": "Agregar Comentario de Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": {
          "requiresDialog": true,
          "name": "commentDialog"
        },
        "apiParams": [
          { "query": "sampleComment", "element": "commentInput", "defaultValue": "" }
        ]
      },
      {
        "actionName": "SAMPLINGCOMMENTREMOVE",
        "clientMethod": "removeSamplingComment",
        "button": {
          "icon": "speaker_notes_off",
          "title": {
            "label_en": "Remove Sampling Comment", "label_es": "Eliminar Comentario de Muestra"
          },
          "whenDisabled": "selectedSamples"
        }
      }
    ]
  },
  "SampleEnterResult": {
    "langConfig": {
      "title": {
        "ER-FQ": {
          "label_en": "FQ-Testing Pending Results",
          "label_es": "FQ-Ensayos pendientes entrar resultados"
        },
        "ER-MB": {
          "label_en": "Samples Pending Micro Testing",
          "label_es": "Muestras pendientes de testeo Microbiológico"
        }
      },
      "gridHeader": {
        "sample_id": {
          "label_en": "Sample ID", "label_es": "ID Muestra", "sort": true, "filter": false
        },
        "program_name": {
          "label_en": "Project", "label_es": "Programa", "sort": true, "filter": false
        },
        "location_name": {
          "label_en": "Location", "label_es": "Ubicación", "sort": true, "filter": false
        },
        "sampling_date": {
          "label_en": "sampling Date", "label_es": "ID Fecha de Muestreo", "sort": true, "filter": false
        },
        "spec_code": {
          "label_en": "Spec", "label_es": "Especificación", "sort": true, "filter": false
        }
      },
      "resultHeader": {
        "spec_eval": {
          "label_en": "spec_eval", "label_es": "Eval Espec"
        },
        "result_id": {
          "label_en": "Result Id", "label_es": "Id Resultado"
        },
        "analysis": {
          "label_en": "Analysis", "label_es": "Análísis"
        },
        "param_name": {
          "label_en": "Parameter", "label_es": "Parámetro"
        },
        "raw_value": {
          "label_en": "Value", "label_es": "Valor"
        }
      }
    },
    "actions": [
      {
        "actionName": "SAMPLES_INPROGRESS_LIST",
        "clientMethod": "getSamples",
        "button": {
          "icon": "refresh",
          "title": {
            "label_en": "Reload", "label_es": "Recargar"
          },
          "whenDisabled": "samplesReload"
        },
        "apiParams": [
          { "query": "sampleFieldToRetrieve", "value": "sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name" },
          { "query": "whereFieldsValue", "value": "LOGGED-RECEIVED-INCOMPLETE-COMPLETE*String|prog_pers_template|-" },
          { "query": "whereFieldsName", "value": "status in-|sample_config_code not in*|sampling_date is not null" },
          { "query": "addSampleAnalysisFieldToRetrieve", "value": "method_name|testing_group" },
          { "query": "sampleAnalysisWhereFieldsName", "value": "testing_group|status not in" },
          { "query": "addSampleAnalysis", "value": false },
          { "query": "addSampleAnalysisResult", "value": false }
        ],
        "paramFilter": {
          "ER-FQ": { "query": "sampleAnalysisWhereFieldsValue", "value": "FQ*String|REVIEWED*String" },
          "ER-MB": { "query": "sampleAnalysisWhereFieldsValue", "value": "MB*String|REVIEWED*String" }
        }
      },
      {
        "actionName": "GET_SAMPLE_AUDIT",
        "clientMethod": "getSampleAudit",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit", "label_es": "Auditoría de Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": {
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
              "clientMethod": "signAudit",
              "apiParams": [
                { "query": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
      {
        "actionName": "GET_SAMPLE_ANALYSIS_RESULT_LIST",
        "clientMethod": "getResult",
        "alertMsg": {
          "empty": { "label_en": "No pending results to enter result", "label_es": "No hay resultados pendientes de resultados" }
        },
        "button": {
          "icon": "document_scanner",
          "title": {
            "label_en": "Enter Result", "label_es": "Ingrese el Resultado"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": {
          "automatic": true,
          "action": [
            {
              "actionName": "ENTERRESULT",
              "clientMethod": "enterResult",
              "apiParams": [
                { "query": "rawValueResult", "targetValue": true },
                { "query": "resultId", "targetValue": true }
              ]
            }
          ]
        },
        "apiParams": [
          { "query": "sampleAnalysisResultFieldToRetrieve", "value": "result_id|analysis|method_name|method_version|param_name|param_type|raw_value|uom|spec_eval|spec_eval_detail|status|min_val_allowed|min_allowed_strict|max_val_allowed|max_allowed_strict" },
          { "query": "sortFieldsName", "value": "test_id|result_id" },
          { "query": "sampleAnalysisWhereFieldsName", "value": "testing_group|status not in" }
        ],
        "paramFilter": {
          "ER-FQ": { "query": "sampleAnalysisWhereFieldsValue", "value": "FQ|REVIEWED*String" },
          "ER-MB": { "query": "sampleAnalysisWhereFieldsValue", "value": "MB|REVIEWED*String" }
        }
      }
    ]
  },
  "ReviewTesting": {
    "langConfig": {
      "title": {
        "RT-FQ": {
          "label_en": "FQ-Pending Review Testing",
          "label_es": "FQ-Ensayos pendiente revisión"
        },
        "RT-MB": {
          "label_en": "MB-Pending Review Testing",
          "label_es": "MB-Ensayos pendiente revisión"
        }
      },
      "gridHeader": {
        "sample_id": {
          "label_en": "Sample ID",
          "label_es": "ID Muestra",
          "sort": true,
          "filter": false
        },
        "test_id": {
          "label_en": "Test ID",
          "label_es": "ID Ensayo",
          "sort": true,
          "filter": false
        },
        "analysis": {
          "label_en": "Analysis",
          "label_es": "Ensayo",
          "sort": true,
          "filter": false
        },
        "param_name": {
          "label_en": "Parameter",
          "label_es": "Parámetro"
        },
        "raw_value": {
          "label_en": "Value",
          "label_es": "Valor"
        },
        "spec_eval": {
          "label_en": "Spec Eval",
          "label_es": "Eval Especificación"
        },
        "program_name": {
          "label_en": "Project",
          "label_es": "Programa",
          "sort": true,
          "filter": false
        },
        "location_name": {
          "label_en": "Location",
          "label_es": "Ubicación",
          "sort": true,
          "filter": false
        },
        "sampling_date": {
          "label_en": "sampling Date",
          "label_es": "ID Fecha de Muestreo",
          "sort": true,
          "filter": false
        },
        "spec_code": {
          "label_en": "Spec",
          "label_es": "Especificación",
          "sort": true,
          "filter": false
        }
      }
    },
    "actions": [
      {
        "actionName": "SAMPLEANALYSIS_PENDING_REVISION",
        "clientMethod": "getSamples",
        "button": {
          "icon": "refresh",
          "title": {
            "label_en": "Reload",
            "label_es": "Recargar"
          },
          "whenDisabled": "samplesReload"
        },
        "apiParams": [
          {
            "query": "sampleAnalysisFieldToRetrieve",
            "value": "sample_id|test_id|analysis|raw_value|spec_eval|status|status_previous|sampling_date|sample_config_code|program_name|location_name|spec_code|spec_variation_name"
          },
          {
            "query": "sampleAnalysisWhereFieldsName",
            "value": "testing_group|status not in*"
          }
        ],
        "paramFilter": {
          "RT-FQ": {
            "query": "sampleAnalysisWhereFieldsValue",
            "value": "FQ*String|REVIEWED*String"
          },
          "RT-MB": {
            "query": "sampleAnalysisWhereFieldsValue",
            "value": "MB*String|REVIEWED*String"
          }
        }
      },
      {
        "actionName": "GET_SAMPLE_AUDIT",
        "clientMethod": "getSampleAudit",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit",
            "label_es": "Auditoría de Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": {
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
              "clientMethod": "signAudit",
              "apiParams": [
                { "query": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
      {
        "actionName": "REVIEWTEST",
        "clientMethod": "reviewTest",
        "button": {
          "icon": "reviews",
          "title": {
            "label_en": "Review Test",
            "label_es": "Revisar Ensayo"
          },
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          {
            "query": "testId",
            "beItem": "test_id"
          }
        ]
      }
    ]
  },
  "ReviewTestingGroup": {
    "langConfig": {
      "title": {
        "RTG-FQ": {
          "label_en": "FQ-Pending Review Testing Group",
          "label_es": "FQ-Grupo Analítico pendientes de revisión"
        },
        "RTG-MB": {
          "label_en": "MB-Pending Review Testing",
          "label_es": "MB-Ensayos pendiente revisión"
        }
      },
      "gridHeader": {
        "sample_id": {
          "label_en": "Sample ID",
          "label_es": "ID Muestra",
          "sort": true,
          "filter": false
        },
        "testing_group": {
          "label_en": "Testing Group",
          "label_es": "Grupo Analítico",
          "sort": true,
          "filter": false
        },
        "program_name": {
          "label_en": "Project",
          "label_es": "Programa",
          "sort": true,
          "filter": false
        },
        "location_name": {
          "label_en": "Location",
          "label_es": "Ubicación",
          "sort": true,
          "filter": false
        },
        "sampling_date": {
          "label_en": "sampling Date",
          "label_es": "ID Fecha de Muestreo",
          "sort": true,
          "filter": false
        },
        "spec_code": {
          "label_en": "Spec",
          "label_es": "Especificación",
          "sort": true,
          "filter": false
        }
      },
      "resultHeader": {
        "spec_eval": {
          "label_en": "spec_eval",
          "label_es": "Eval Espec"
        },
        "result_id": {
          "label_en": "Result Id",
          "label_es": "Id Resultado"
        },
        "analysis": {
          "label_en": "Analysis",
          "label_es": "Análísis"
        },
        "param_name": {
          "label_en": "Parameter",
          "label_es": "Parámetro"
        },
        "raw_value": {
          "label_en": "Value",
          "label_es": "Valor"
        }
      }
    },
    "actions": [
      {
        "actionName": "SAMPLES_PENDING_TESTINGGROUP_REVISION",
        "clientMethod": "getSamples",
        "button": {
          "icon": "refresh",
          "title": {
            "label_en": "Reload",
            "label_es": "Recargar"
          },
          "whenDisabled": "samplesReload"
        },
        "apiParams": [
          {
            "query": "sampleFieldToRetrieve",
            "value": "ALL"
          }
        ],
        "paramFilter": {
          "RTG-FQ": {
            "query": "testingGroup",
            "value": "FQ"
          },
          "RTG-MB": {
            "query": "testingGroup",
            "value": "MB"
          }
        }
      },
      {
        "actionName": "GET_SAMPLE_AUDIT",
        "clientMethod": "getSampleAudit",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit",
            "label_es": "Auditoría de Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": {
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
              "clientMethod": "signAudit",
              "apiParams": [
                { "query": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
      {
        "actionName": "GET_SAMPLE_ANALYSIS_RESULT_LIST",
        "clientMethod": "getResult",
        "alertMsg": {
          "empty": { "label_en": "No pending results to enter result", "label_es": "No hay resultados pendientes de resultados" }
        },
        "button": {
          "icon": "document_scanner",
          "title": {
            "label_en": "Enter Result",
            "label_es": "Ingrese el Resultado"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": {
          "automatic": true,
          "readOnly": true
        },
        "apiParams": [
          {
            "query": "sampleAnalysisResultFieldToRetrieve",
            "value": "result_id|analysis|method_name|method_version|param_name|param_type|raw_value|uom|spec_eval|spec_eval_detail|status|min_val_allowed|min_allowed_strict|max_val_allowed|max_allowed_strict"
          },
          {
            "query": "sortFieldsName",
            "value": "test_id|result_id"
          },
          {
            "query": "sampleAnalysisWhereFieldsName",
            "value": "testing_group|status in"
          }
        ],
        "paramFilter": {
          "RTG-FQ": {
            "query": "sampleAnalysisWhereFieldsValue",
            "value": "FQ|REVIEWED*String"
          },
          "RTG-MB": {
            "query": "sampleAnalysisWhereFieldsValue",
            "value": "MB|REVIEWED*String"
          }
        }
      },
      {
        "actionName": "REVIEWSAMPLE_TESTINGGROUP",
        "clientMethod": "reviewTest",
        "button": {
          "icon": "reviews",
          "title": {
            "label_en": "Review",
            "label_es": "Revisar"
          },
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          {
            "query": "sampleId",
            "beItem": "sample_id"
          },
          {
            "query": "testingGroup",
            "beItem": "testing_group"
          }
        ]
      }
    ]
  },
  "ReviewSample": {
    "langConfig": {
      "title": {
        "Review": {
          "label_en": "Samples Review",
          "label_es": "Revisión de  Muestras"
        }
      },
      "gridHeader": {
        "sample_id": {
          "label_en": "Sample ID",
          "label_es": "ID Muestra",
          "sort": false,
          "filter": true
        },
        "program_name": {
          "label_en": "Project",
          "label_es": "Programa",
          "sort": false,
          "filter": true
        },
        "location_name": {
          "label_en": "Location",
          "label_es": "Ubicación",
          "sort": false,
          "filter": true
        },
        "sampling_date": {
          "label_en": "Sampling Date",
          "label_es": "ID Fecha de Muestreo",
          "sort": false,
          "filter": true
        }
      },
      "resultHeader": {
        "spec_eval": {
          "label_en": "spec_eval",
          "label_es": "Eval Espec"
        },
        "result_id": {
          "label_en": "Result Id",
          "label_es": "Id Resultado"
        },
        "analysis": {
          "label_en": "Analysis",
          "label_es": "Análísis"
        },
        "param_name": {
          "label_en": "Parameter",
          "label_es": "Parámetro"
        },
        "raw_value": {
          "label_en": "Value",
          "label_es": "Valor"
        }
      }
    },
    "actions": [
      {
        "actionName": "SAMPLES_PENDING_SAMPLE_REVISION",
        "clientMethod": "getSamples",
        "button": {
          "icon": "refresh",
          "title": {
            "label_en": "Reload",
            "label_es": "Recargar"
          },
          "whenDisabled": "samplesReload"
        },
        "apiParams": [
          {
            "query": "sampleFieldToRetrieve",
            "value": "sample_id|program_name|location_name|sampling_date"
          },
          {
            "query": "whereFieldsValue",
            "value": "RECEIVED-INCOMPLETE-COMPLETE*String|prog_pers_template"
          },
          {
            "query": "whereFieldsName",
            "value": "status in-|sample_config_code not in*"
          }
        ]
      },
      {
        "actionName": "GET_SAMPLE_AUDIT",
        "clientMethod": "getSampleAudit",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit",
            "label_es": "Auditoría de Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": {
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
              "clientMethod": "signAudit",
              "apiParams": [
                { "query": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
      {
        "actionName": "REVIEWSAMPLE",
        "clientMethod": "reviewSample",
        "button": {
          "icon": "view_headline",
          "title": {
            "label_en": "Review",
            "label_es": "Revisar"
          },
          "whenDisabled": "selectedSamples"
        }
      },
      {
        "actionName": "GET_SAMPLE_ANALYSIS_RESULT_LIST",
        "clientMethod": "getResult",
        "alertMsg": {
          "empty": { "label_en": "No pending results to enter result", "label_es": "No hay resultados pendientes de resultados" }
        },
        "button": {
          "icon": "document_scanner",
          "title": {
            "label_en": "Enter Result",
            "label_es": "Ingrese el Resultado"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": {
          "automatic": true,
          "readOnly": true
        }
      }
    ]
  },
  "Programs": {
    "component": "program-proc",
    "actions": [
      {
        "actionName": "PROGRAMS_LIST",
        "clientMethod": "getProgramList",
        "button": {
          "icon": "refresh",
          "title": {
            "label_en": "Reload", "label_es": "Recargar"
          },
          "whenDisabled": "samplesReload"
        },
        "subAction": {
          "actionName": "GET_ACTIVE_PRODUCTION_LOTS",
          "clientMethod": "getLots"
        }
      }
    ]
  },
  "Deviation": {
    "abstract": true,
    "tabs": [
      {
        "filter": "pending",
        "langConfig": {
          "tab": {
            "label_en": "Pending Decision", 
            "label_es": "Decisión pendiente"
          },
          "title": {
            "pending": {
              "label_en": "Program Active Corrective Actions", 
              "label_es": "Acciones correctivas aún activas del programa"
            }
          },
          "gridHeader": {
            "result_id": {
              "label_en": "Result", "label_es": "Resultado", "sort": false, "filter": true, "width": "10%"
            },
            "sample_id": {
              "label_en": "Sample", "label_es": "Muestra", "sort": false, "filter": true, "width": "10%"
            },
            "created_on": {
              "label_en": "Creation", "label_es": "Creada", "sort": true, "filter": false, "width": "15%"
            },
            "location_name": {
              "label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true, "width": "15%"
            },
            "method_name": {
              "label_en": "Method", "label_es": "Método", "sort": false, "filter": true, "width": "10%"
            },
            "spec_eval_detail": {
              "label_en": "Problem Detail", "label_es": "Detalle del Problema", "sort": false, "filter": true, "width": "30%"
            },
            "spec_rule_with_detail": {
              "label_en": "Spec Rule", "label_es": "Especificación", "sort": false, "filter": true, "width": "10%"
            }
          }
        },
        "actions": [
          {
            "actionName": "INVESTIGATION_RESULTS_PENDING_DECISION",
            "clientMethod": "getSamples",
            "endPoint": "/frontend/InvestigationAPIfrontend",
            "button": {
              "icon": "refresh",
              "title": {
                "label_en": "Reload", "label_es": "Recargar"
              },
              "whenDisabled": "samplesReload"
            }
          },
          {
            "actionName": "NEW_INVESTIGATION",
            "clientMethod": "newInvestigation",
            "endPoint": "/app/InvestigationAPI",
            "button": {
              "title": {
                "label_en": "Create Investigation", "label_es": "Crear Investigación"
              },
              "whenDisabled": "selectedSamples"
            },
            "apiParams": [
              { "query": "fieldName", "value": "description" }
            ]
          },
          {
            "actionName": "OPEN_INVESTIGATIONS",
            "clientMethod": "getOpenInvestigations",
            "endPoint": "/frontend/InvestigationAPIfrontend",
            "button": {
              "title": {
                "label_en": "Add to Investigation", "label_es": "Añadir a Investigación"
              },
              "whenDisabled": "selectedSamples"
            },
            "dialogInfo": {
              "automatic": true,
              "action": [
                {
                  "actionName": "ADD_INVEST_OBJECTS",
                  "clientMethod": "addInvestObjects",
                  "endPoint": "/app/InvestigationAPI",
                  "apiParams": [
                    { "query": "investigationId", "targetValue": true },
                    { "query": "objectsToAdd", "targetValue": true }
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "filter": "open",
        "langConfig": {
          "tab": {
            "label_en": "Investigations", 
            "label_es": "Investigaciones"
          },
          "title": {
            "open": {
              "label_en": "Program Active Corrective Actions", 
              "label_es": "Acciones correctivas aún activas del programa"
            }
          },
          "fieldText": {
            "systemName": { "label_en": "System Name", "label_es": "Nombre Sistema" },
            "systemId": { "label_en": "System Id", "label_es": "Id Sistema" },
            "capa": { "label_en": "CAPA Required", "label_es": "¿Requiere CAPA?" },
            "capaName": { "label_en": "CAPA System Name", "label_es": "Nombre Sistema CAPA" },
            "capaId": { "label_en": "CAPA Id", "label_es": "Id CAPA" }
          },
          "gridHeader": {
            "id": {
              "label_en": "ID", "label_es": "ID", "width": "12px", "sort": false, "filter": true
            },
            "description": {
              "label_en": "description", "label_es": "description", "width": "20px", "sort": false, "filter": true
            },
            "created_on": {
              "label_en": "Creation", "label_es": "Creación", "width": "30px", "sort": false, "filter": true
            },
            "external_system_name": {
              "label_en": "External System Name", "label_es": "Nombre Sistema Externo", "width": "20px", "sort": false, "filter": true
            },
            "external_system_id": {
              "label_en": "External System Id", "label_es": "Id Sistema Externo", "width": "20px", "sort": false, "filter": true
            },
            "capa_required": {
              "label_en": "capa_required", "label_es": "CAPA Necesario", "width": "20px", "sort": false, "filter": true
            },
            "capa_external_system_name": {
              "label_en": "CAPA System", "label_es": "Sistema para CAPAs", "width": "20px", "sort": false, "filter": true
            },
            "capa_external_system_id": {
              "label_en": "CAPA System Id", "label_es": "Id en Sistema CAPAs", "width": "20px", "sort": false, "filter": true
            }
          }
        },
        "actions": [
          {
            "actionName": "OPEN_INVESTIGATIONS",
            "clientMethod": "getSamples",
            "endPoint": "/frontend/InvestigationAPIfrontend",
            "button": {
              "icon": "refresh",
              "title": {
                "label_en": "Reload", "label_es": "Recargar"
              },
              "whenDisabled": "samplesReload"
            }
          },
          {
            "actionName": "INVESTIGATION_CAPA_DECISION",
            "clientMethod": "capaDecision",
            "endPoint": "/app/InvestigationAPI",
            "button": {
              "title": {
                "label_en": "Decision", "label_es": "Decisión"
              },
              "whenDisabled": "selectedSamples"
            },
            "dialogInfo": { 
              "requiresDialog": true,
              "name": "decisionDialog"
            },
            "apiParams": [
              { "query": "investigationId", "beItem": "id" },
              { "query": "capaRequired", "element": "capaCheck", "type": "check" },
              { "query": "capaFieldName", "value": "external_system_name|external_system_id|capa_external_system_name|capa_external_system_id" },
              { "query": "capaFieldValue", "targetValue": true }
            ]
          },
          {
            "actionName": "CLOSE_INVESTIGATION",
            "clientMethod": "closeInvestigation",
            "endPoint": "/app/InvestigationAPI",
            "button": {
              "title": {
                "label_en": "Close", "label_es": "Cerrar"
              },
              "whenDisabled": "selectedSamples"
            },
            "apiParams": [
              { "query": "investigationId", "beItem": "id" }
            ]
          }
        ]
      }
    ]
  }
}