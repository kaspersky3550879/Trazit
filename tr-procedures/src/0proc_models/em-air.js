export const EmAir = {
  "ProductionLots": {
    "langConfig": {
      "title": {
        "SampleLot": {
          "label_en": "Active Production Lots",
          "label_es": "Lotes en producción activos"
        }
      },
      "fieldText": {
        "newLot": {
          "label_en": "New Production Lot Name",
          "label_es": "Nombre para nuevo lote de producción"
        },
        "lotDays": {
          "label_en": "Number of Days",
          "label_es": "Número de Días"
        },
        "lotName": {
          "label_en": "Lot Name to reactivate",
          "label_es": "Nombre para el lote a reactivar"
        },
        "activateLot": {
          "label_en": "Production Lot Name to reactivate",
          "label_es": "Nombre para el lote de producción a reactivar"
        }
      },
      "gridHeader": {
        "lot_name": {
          "label_en": "Name",
          "label_es": "Nombre",
          "width": "80%",
          "sort": false,
          "filter": true,
          "align": "left"
        },
        "created_on": {
          "label_en": "Created On",
          "label_es": "F. Creación",
          "width": "20%",
          "sort": true,
          "filter": false
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
            "label_en": "Reload",
            "label_es": "Recargar"
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
            "label_en": "New",
            "label_es": "Nuevo"
          },
          "whenDisabled": "samplesReload"
        },
        "dialogInfo": {
          "requiresDialog": true,
          "name": "lotDialog"
        },
        "apiParams": [
          {
            "query": "lotName",
            "element": "lotInput"
          },
          {
            "query": "fieldName",
            "value": "active"
          },
          {
            "query": "fieldValue",
            "value": "true*Boolean"
          }
        ]
      },
      {
        "actionName": "EM_ACTIVATE_PRODUCTION_LOT",
        "clientMethod": "setLot",
        "button": {
          "icon": "alarm_add",
          "title": {
            "label_en": "Activate",
            "label_es": "Activar"
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
                {
                  "query": "numDays",
                  "element": "lotNumDays",
                  "defaultValue": 7
                }
              ]
            }
          ]
        },
        "apiParams": [
          {
            "query": "lotName",
            "element": "lotName"
          }
        ]
      },
      {
        "actionName": "EM_DEACTIVATE_PRODUCTION_LOT",
        "clientMethod": "setLot",
        "button": {
          "icon": "alarm_off",
          "title": {
            "label_en": "Deactivate",
            "label_es": "Desactivar"
          },
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          {
            "query": "lotName",
            "beItem": "lot_name"
          }
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
        "logBtn": {
          "label_en": "Log Sample",
          "label_es": "Registrar Muestra"
        },
        "shift": {
          "items": [
            {
              "keyName": "M1",
              "keyValue_en": "Morning 1",
              "keyValue_es": "Mañana 1"
            },
            {
              "keyName": "M2",
              "keyValue_en": "Morning 2",
              "keyValue_es": "Mañana 2"
            },
            {
              "keyName": "N",
              "keyValue_en": "Night",
              "keyValue_es": "Noche"
            }
          ],
          "label_en": "Shift",
          "label_es": "Turno"
        },
        "lot": {
          "items": [],
          "label_en": "Lot",
          "label_es": "Lote"
        }
      },
      "gridHeader": {
        "area": {
          "label_en": "Area",
          "label_es": "Area",
          "sort": false,
          "filter": true,
          "is_icon": true,
          "width": "10%"
        },
        "location_name": {
          "label_en": "Location",
          "label_es": "Ubicación",
          "sort": false,
          "filter": true,
          "width": "20%"
        },
        "spec_code": {
          "label_en": "Spec",
          "label_es": "Especificación",
          "sort": false,
          "filter": true,
          "width": "20%"
        },
        "spec_variation_name": {
          "label_en": "Variation",
          "label_es": "Variación",
          "sort": false,
          "filter": true,
          "width": "20%"
        },
        "spec_analysis_variation": {
          "label_en": "Analysis Variation",
          "label_es": "Análisis de Variación",
          "sort": false,
          "filter": true,
          "width": "20%"
        },
        "person_ana_definition": {
          "label_en": "Person Sampling Areas",
          "label_es": "Areas a analizar de Personal",
          "sort": false,
          "filter": true,
          "width": "40%"
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
            "label_en": "Reload",
            "label_es": "Recargar"
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
          {
            "query": "programName",
            "element": "programInput",
            "defaultValue": ""
          },
          {
            "query": "locationName",
            "element": "locationInput",
            "defaultValue": ""
          },
          {
            "query": "sampleTemplate",
            "targetValue": true
          },
          {
            "query": "sampleTemplateVersion",
            "targetValue": true
          },
          {
            "query": "fieldName",
            "defaultValue": "shift|production_lot"
          },
          {
            "query": "fieldValue",
            "targetValue": true
          },
          {
            "query": "numSamplesToLog",
            "defaultValue": 1
          }
        ]
      }
    ],
    "topCompositions": [
      {
        "templateName": "specCode",
        "buttons": [
          {
            "icon": "refresh",
            "title": {
              "label_en": "Reload",
              "label_es": "Recargar"
            },
            "calledActionIdx": 0
          }
        ]
      }
    ]
  },
  "SamplePendingSampling": {
    "langConfig": {
      "title": {
        "SamplingSMP": {
          "label_en": "Samples Pending Sampling Date",
          "label_es": "Muestras pendientes de la fecha de muestreo"
        },
        "SamplingPERS": {
          "label_en": "Personnel Samples Pending Sampling Date",
          "label_es": "Muestras de personal pendientes de la fecha de muestreo"
        }
      },
      "fieldText": {
        "comment": {
          "label_en": "Comment",
          "label_es": "Comentario"
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
        },
        "sampling_comment": {
          "label_en": "sampling Comment",
          "label_es": "Comentario Muestreo",
          "sort": false,
          "filter": true
        },
        "spec_code": {
          "label_en": "Spec",
          "label_es": "Especificación",
          "sort": false,
          "filter": true
        },
        "spec_variation_name": {
          "label_en": "Variation",
          "label_es": "Variación",
          "sort": false,
          "filter": true
        }
      }
    },
    "actions": [
      {
        "actionName": "SAMPLES_BY_STAGE",
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
            "value": "sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name"
          },
          {
            "query": "whereFieldsValue",
            "value": "Sampling|prog_pers_template|false*Boolean"
          }
        ],
        "paramFilter": {
          "SamplingSMP": {
            "query": "whereFieldsName",
            "value": "current_stage|sample_config_code not in*|requires_tracking_sampling_end"
          },
          "SamplingPERS": {
            "query": "whereFieldsName",
            "value": "current_stage|sample_config_code in*|requires_tracking_sampling_end"
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
                {
                  "query": "auditId",
                  "targetValue": true
                }
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
            "label_en": "Set Sample Date",
            "label_es": "Establecer Fecha Muestra"
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
            "label_en": "Change Sample Date",
            "label_es": "Cambiar Fecha Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": {
          "requiresDialog": true,
          "name": "dateDialog"
        },
        "apiParams": [
          {
            "query": "newDateTime",
            "element": "dateInput",
            "defaultValue": ""
          }
        ]
      },
      {
        "actionName": "SAMPLESTAGE_MOVETONEXT",
        "clientMethod": "moveToNext",
        "button": {
          "icon": "next_week",
          "title": {
            "label_en": "Next",
            "label_es": "Siguiente"
          },
          "whenDisabled": "selectedSamples"
        }
      },
      {
        "actionName": "SAMPLINGCOMMENTADD",
        "clientMethod": "addSamplingComment",
        "button": {
          "icon": "add_comment",
          "title": {
            "label_en": "Add Sampling Comment",
            "label_es": "Agregar Comentario de Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": {
          "requiresDialog": true,
          "name": "commentDialog"
        },
        "apiParams": [
          {
            "query": "sampleComment",
            "element": "commentInput",
            "defaultValue": ""
          }
        ]
      },
      {
        "actionName": "SAMPLINGCOMMENTREMOVE",
        "clientMethod": "removeSamplingComment",
        "button": {
          "icon": "speaker_notes_off",
          "title": {
            "label_en": "Remove Sampling Comment",
            "label_es": "Eliminar Comentario de Muestra"
          },
          "whenDisabled": "selectedSamples"
        }
      }
    ]
  },
  "SamplePendingSamplingInterval": {
    "langConfig": {
      "title": {
        "SamplingSMP": {
          "label_en": "Samples Pending Sampling Date by Interval",
          "label_es": "Muestras pendientes de la fecha de muestreo por Intervalo"
        },
        "SamplingPERS": {
          "label_en": "Personnel Samples Pending Sampling Date",
          "label_es": "Muestras de personal pendientes de la fecha de muestreo"
        }
      },
      "fieldText": {
        "comment": {
          "label_en": "Comment",
          "label_es": "Comentario"
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
        },
        "sampling_comment": {
          "label_en": "sampling Comment",
          "label_es": "Comentario Muestreo",
          "sort": false,
          "filter": true
        },
        "spec_code": {
          "label_en": "Spec",
          "label_es": "Especificación",
          "sort": false,
          "filter": true
        },
        "spec_variation_name": {
          "label_en": "Variation",
          "label_es": "Variación",
          "sort": false,
          "filter": true
        }
      }
    },
    "actions": [
      {
        "actionName": "SAMPLES_BY_STAGE",
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
            "value": "sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name"
          },
          {
            "query": "whereFieldsValue",
            "value": "true*Boolean|Sampling|prog_pers_template"
          }
        ],
        "paramFilter": {
          "SamplingSMP": {
            "query": "whereFieldsName",
            "value": "requires_tracking_sampling_end|current_stage|sample_config_code not in*"
          },
          "SamplingPERS": {
            "query": "whereFieldsName",
            "value": "requires_tracking_sampling_end|current_stage|sample_config_code in*"
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
                {
                  "query": "auditId",
                  "targetValue": true
                }
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
            "label_en": "Set Sample Date",
            "label_es": "Establecer Fecha Muestra"
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
            "label_en": "Change Sample Date",
            "label_es": "Cambiar Fecha Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": {
          "requiresDialog": true,
          "name": "dateDialog"
        },
        "apiParams": [
          {
            "query": "newDateTime",
            "element": "dateInput",
            "defaultValue": ""
          }
        ]
      },
      {
        "actionName": "SETSAMPLINGDATEEND",
        "clientMethod": "setSamplingDate",
        "button": {
          "icon": "date_range",
          "title": {
            "label_en": "Set END Sample Date",
            "label_es": "Establecer Fecha FIN Muestreo"
          },
          "whenDisabled": "selectedSamples"
        }
      },
      {
        "actionName": "CHANGESAMPLINGDATEEND",
        "clientMethod": "setSamplingDate",
        "button": {
          "icon": "event",
          "title": {
            "label_en": "Change END Sample Date",
            "label_es": "Cambiar Fecha FIN Muestreo"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": {
          "requiresDialog": true,
          "name": "dateDialog"
        },
        "apiParams": [
          {
            "query": "newDateTime",
            "element": "dateInput",
            "defaultValue": ""
          }
        ]
      },
      {
        "actionName": "SAMPLESTAGE_MOVETONEXT",
        "clientMethod": "moveToNext",
        "button": {
          "icon": "next_week",
          "title": {
            "label_en": "Next",
            "label_es": "Siguiente"
          },
          "whenDisabled": "selectedSamples"
        }
      },
      {
        "actionName": "SAMPLINGCOMMENTADD",
        "clientMethod": "addSamplingComment",
        "button": {
          "icon": "add_comment",
          "title": {
            "label_en": "Add Sampling Comment",
            "label_es": "Agregar Comentario de Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": {
          "requiresDialog": true,
          "name": "commentDialog"
        },
        "apiParams": [
          {
            "query": "sampleComment",
            "element": "commentInput",
            "defaultValue": ""
          }
        ]
      },
      {
        "actionName": "SAMPLINGCOMMENTREMOVE",
        "clientMethod": "removeSamplingComment",
        "button": {
          "icon": "speaker_notes_off",
          "title": {
            "label_en": "Remove Sampling Comment",
            "label_es": "Eliminar Comentario de Muestra"
          },
          "whenDisabled": "selectedSamples"
        }
      }
    ]
  },
  "SamplePlateReading": {
    "langConfig": {
      "title": {
        "PlateReadingSMP": {
          "label_en": "Samples Pending Plate Reading",
          "label_es": "Muestras pendientes de la lectura de placa"
        },
        "PlateReadingPERS": {
          "label_en": "Personnel Samples Pending Plate Reading",
          "label_es": "Muestras de personal pendientes de la lectura de placa"
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
          "label_en": "sampling Date",
          "label_es": "ID Fecha de Muestreo",
          "sort": false,
          "filter": true
        },
        "incubation_batch": {
          "label_en": "Batch incub 1",
          "label_es": "Tanda 1a Incubacion",
          "sort": false,
          "filter": true
        },
        "incubation_incubator": {
          "label_en": "Incubator incub 1",
          "label_es": "Incubadora 1a Incubacion",
          "sort": false,
          "filter": true
        },
        "incubation_start": {
          "label_en": "incubation 1 start",
          "label_es": "Inicio 1a Incubacion",
          "sort": false,
          "filter": true
        },
        "incubation_end": {
          "label_en": "incubation 1 end",
          "label_es": "Fin 1a Incubacion",
          "sort": false,
          "filter": true
        },
        "incubation2_batch": {
          "label_en": "Batch incub 2",
          "label_es": "Tanda 2a Incubacion",
          "sort": false,
          "filter": true
        },
        "incubation2_incubator": {
          "label_en": "Incubator incub 2",
          "label_es": "Incubadora 2a Incubacion",
          "sort": false,
          "filter": true
        },
        "incubation2_start": {
          "label_en": "incubation 2 start",
          "label_es": "Inicio 2a Incubacion",
          "sort": false,
          "filter": true
        },
        "incubation2_end": {
          "label_en": "incubation 2 end",
          "label_es": "Fin 2a Incubacion",
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
        "actionName": "SAMPLES_BY_STAGE",
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
            "value": "sample_id|program_name|location_name|current_stage|status|sampling_date|sampling_comment|incubation_batch|incubation_incubator|incubation_start|incubation_end|incubation2_batch|incubation2_incubator|incubation2_start|incubation2_end|sample_config_code"
          },
          {
            "query": "whereFieldsValue",
            "value": "PlateReading|prog_pers_template"
          }
        ],
        "paramFilter": {
          "PlateReadingSMP": {
            "query": "whereFieldsName",
            "value": "current_stage|sample_config_code not in*"
          },
          "PlateReadingPERS": {
            "query": "whereFieldsName",
            "value": "current_stage|sample_config_code in*"
          }
        }
      },
      {
        "actionName": "SAMPLESTAGE_MOVETOPREVIOUS",
        "clientMethod": "moveToNext",
        "button": {
          "id": "prev",
          "icon": "next_week",
          "title": {
            "label_en": "Previous",
            "label_es": "Previo"
          },
          "whenDisabled": "selectedSamples"
        }
      },
      {
        "actionName": "SAMPLESTAGE_MOVETONEXT",
        "clientMethod": "moveToNext",
        "button": {
          "icon": "next_week",
          "title": {
            "label_en": "Next",
            "label_es": "Siguiente"
          },
          "whenDisabled": "selectedSamples"
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
                {
                  "query": "auditId",
                  "targetValue": true
                }
              ]
            }
          ]
        }
      },
      {
        "actionName": "GET_SAMPLE_ANALYSIS_RESULT_LIST",
        "clientMethod": "getResult",
        "alertMsg": {
          "empty": {
            "label_en": "No pending results to enter result",
            "label_es": "No hay resultados pendientes de resultados"
          }
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
          "action": [
            {
              "actionName": "ENTERRESULT",
              "clientMethod": "enterResult",
              "apiParams": [
                {
                  "query": "rawValueResult",
                  "targetValue": true
                },
                {
                  "query": "resultId",
                  "targetValue": true
                }
              ]
            }
          ]
        },
        "apiParams": [
          {
            "query": "sampleAnalysisResultFieldToRetrieve",
            "value": "result_id|analysis|method_name|method_version|param_name|param_type|raw_value|uom|spec_eval|spec_eval_detail|status|min_val_allowed|min_allowed_strict|max_val_allowed|max_allowed_strict"
          },
          {
            "query": "sortFieldsName",
            "value": "test_id|result_id"
          }
        ]
      }
    ]
  },
  "SampleMicroorganism": {
    "langConfig": {
      "title": {
        "MicroOrganismSMP": {
          "label_en": "Samples Pending Microorganism Identification",
          "label_es": "Muestras pendientes de la identificación de microorganismos"
        },
        "MicroOrganismPERS": {
          "label_en": "Personnel Samples Pending Microorganism Identification",
          "label_es": "Muestras de personal pendientes de la identificación de microorganismos"
        }
      },
      "fieldText": {
        "addhocInput": {
          "label_en": "Ad-hoc microorganism name",
          "label_es": "Nombre Ad-hoc"
        },
        "addhocBtn": {
          "label_en": "Add Addhoc",
          "label_es": "Añadir Nuevo"
        },
        "addBtn": {
          "label_en": "Add",
          "label_es": "Añadir"
        }
      },
      "gridHeader": {
        "sample_id": {
          "label_en": "Sample ID",
          "label_es": "ID Muestra",
          "sort": false,
          "filter": true,
          "width": "12px"
        },
        "program_name": {
          "label_en": "Project",
          "label_es": "Programa",
          "sort": false,
          "filter": true,
          "width": "20px"
        },
        "location_name": {
          "label_en": "Location",
          "label_es": "Ubicación",
          "sort": false,
          "filter": true,
          "width": "30px"
        },
        "sampling_date": {
          "label_en": "sampling Date",
          "label_es": "ID Fecha de Muestreo",
          "sort": false,
          "filter": true,
          "width": "20px"
        },
        "raw_value": {
          "label_en": "Reading Result",
          "label_es": "Recuento",
          "sort": false,
          "filter": true,
          "width": "20px"
        },
        "microorganism_count": {
          "label_en": "# Organism Ident.",
          "label_es": "Num. MicroOrg. Detectados",
          "sort": false,
          "filter": true,
          "width": "20px"
        },
        "microorganism_list": {
          "label_en": "Microorganisms",
          "label_es": "Microorganismos",
          "sort": false,
          "filter": true,
          "width": "20px"
        }
      },
      "microorganismHeader": {
        "name": {
          "label_en": "Name",
          "label_es": "Nombre",
          "sort": true,
          "filter": false
        }
      }
    },
    "actions": [
      {
        "actionName": "GET_SAMPLE_MICROORGANISM_VIEW",
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
            "value": "sample_id|current_stage|status|status_previous|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name"
          },
          {
            "query": "whereFieldsValue",
            "value": "MicroorganismIdentification|prog_pers_template"
          }
        ],
        "paramFilter": {
          "MicroOrganismSMP": {
            "query": "whereFieldsName",
            "value": "current_stage|sample_config_code not in*"
          },
          "MicroOrganismPERS": {
            "query": "whereFieldsName",
            "value": "current_stage|sample_config_code in*"
          }
        }
      },
      {
        "actionName": "SAMPLESTAGE_MOVETOPREVIOUS",
        "clientMethod": "moveToNext",
        "button": {
          "id": "prev",
          "icon": "next_week",
          "title": {
            "label_en": "Previous",
            "label_es": "Previo"
          },
          "whenDisabled": "selectedSamples"
        }
      },
      {
        "actionName": "SAMPLESTAGE_MOVETONEXT",
        "clientMethod": "moveToNext",
        "button": {
          "icon": "next_week",
          "title": {
            "label_en": "Next",
            "label_es": "Siguiente"
          },
          "whenDisabled": "selectedSamples"
        }
      },
      {
        "actionName": "GET_SAMPLE_AUDIT",
        "clientMethod": "getSampleAudit",
        "button": {
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
                {
                  "query": "auditId",
                  "targetValue": true
                }
              ]
            }
          ]
        }
      },
      {
        "actionName": "GET_MICROORGANISM_LIST",
        "clientMethod": "getMicroorganism",
        "button": {
          "icon": "add",
          "title": {
            "label_en": "Add Microorganism",
            "label_es": "Añadir Microorganismo"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": {
          "automatic": true,
          "action": [
            {
              "actionName": "ADD_SAMPLE_MICROORGANISM",
              "clientMethod": "addSampleMicroorganism",
              "apiParams": [
                {
                  "query": "microorganismName",
                  "targetValue": true
                }
              ]
            },
            {
              "actionName": "ADD_ADHOC_SAMPLE_MICROORGANISM",
              "clientMethod": "addSampleMicroorganism",
              "apiParams": [
                {
                  "query": "microorganismName",
                  "targetValue": true
                }
              ]
            }
          ]
        }
      },
      {
        "actionName": "GET_SAMPLE_MICROORGANISM_VIEW",
        "clientMethod": "getMicroorganismItem",
        "button": {
          "icon": "remove",
          "title": {
            "label_en": "Remove Microorganism",
            "label_es": "Borrar Microorganismo"
          },
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          {
            "query": "whereFieldsName",
            "value": "sample_id"
          },
          {
            "query": "whereFieldsValue",
            "targetValue": true
          }
        ],
        "dialogInfo": {
          "automatic": true,
          "action": [
            {
              "actionName": "REMOVE_SAMPLE_MICROORGANISM",
              "clientMethod": "removeSampleMicroorganism",
              "apiParams": [
                {
                  "query": "microorganismName",
                  "targetValue": true
                }
              ]
            }
          ]
        }
      }
    ]
  },
  "SampleIncubation": {
    "abstract": true,
    "actions": [
      {
        "actionName": "GET_PENDING_INCUBATION_SAMPLES_AND_ACTIVE_BATCHES",
        "clientMethod": "getSamples",
        "apiParams": [
          {
            "query": "incub1_whereFieldsName",
            "value": "current_stage|incubation_passed"
          },
          {
            "query": "incub1_whereFieldsValue",
            "value": "Incubation|false"
          },
          {
            "query": "incub1_sortFieldsName",
            "value": "sample_id desc"
          },
          {
            "query": "incub2_whereFieldsName",
            "value": "current_stage|incubation_passed"
          },
          {
            "query": "incub2_whereFieldsValue",
            "value": "Incubation|true"
          },
          {
            "query": "incub2_sortFieldsName",
            "value": "sample_id desc"
          },
          {
            "query": "includeAllWithAnyPendingIncubation",
            "value": true
          },
          {
            "query": "samplesWithAnyPendingIncubation",
            "value": true
          }
        ]
      }
    ],
    "bottomCompositions": [
      {
        "filter": "active_batches",
        "langConfig": {
          "title": {
            "active_batches": {
              "label_en": "Batches",
              "label_es": "Tandas"
            }
          },
          "fieldText": {
            "newBatch": {
              "label_en": "New Batch Name",
              "label_es": "Nombre para la nueva tanda"
            }
          },
          "gridHeader": {
            "batchState": {
              "label_en": "",
              "label_es": "",
              "is_icon": true,
              "width": "10%"
            },
            "incubState": {
              "label_en": "Incubator",
              "label_es": "Incubadora",
              "is_icon": true,
              "width": "10%"
            },
            "name": {
              "label_en": "Name",
              "label_es": "Nombre",
              "sort": true,
              "filter": false,
              "width": "15%"
            },
            "incubator_info_temperature": {
              "label_en": "Temperature",
              "label_es": "Temperatura",
              "sort": false,
              "filter": false,
              "width": "10%"
            },
            "incubator_info_created_on": {
              "label_en": "T.Date",
              "label_es": "Fecha T.",
              "sort": false,
              "filter": false,
              "width": "20%"
            },
            "NUM_SAMPLES": {
              "label_en": "Num Samples",
              "label_es": "Nº Muestras",
              "sort": false,
              "filter": false,
              "width": "10%"
            },
            "incubation_start": {
              "label_en": "Start Date",
              "label_es": "Fecha Inicio",
              "sort": false,
              "filter": false,
              "width": "10%"
            }
          },
          "assignHeader": {
            "stage": {
              "label_en": "Incub",
              "label_es": "Incub"
            },
            "name": {
              "label_en": "Name",
              "label_es": "Nombre"
            },
            "description": {
              "label_en": "description",
              "label_es": "descripción"
            }
          }
        },
        "actions": [
          {
            "actionName": "GET_PENDING_INCUBATION_SAMPLES_AND_ACTIVE_BATCHES",
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
                "query": "incub1_whereFieldsName",
                "value": "current_stage|incubation_passed"
              },
              {
                "query": "incub1_whereFieldsValue",
                "value": "Incubation|false"
              },
              {
                "query": "incub1_sortFieldsName",
                "value": "sample_id desc"
              },
              {
                "query": "incub2_whereFieldsName",
                "value": "current_stage|incubation_passed"
              },
              {
                "query": "incub2_whereFieldsValue",
                "value": "Incubation|true"
              },
              {
                "query": "incub2_sortFieldsName",
                "value": "sample_id desc"
              },
              {
                "query": "includeAllWithAnyPendingIncubation",
                "value": true
              },
              {
                "query": "samplesWithAnyPendingIncubation",
                "value": true
              }
            ]
          },
          {
            "actionName": "EM_BATCH_INCUB_CREATE",
            "clientMethod": "setIncubator",
            "button": {
              "title": {
                "label_en": "New Batch",
                "label_es": "Nuevo Lote"
              },
              "whenDisabled": "samplesReload"
            },
            "dialogInfo": {
              "requiresDialog": true,
              "name": "newBatchDialog"
            },
            "apiParams": [
              {
                "query": "batchName",
                "element": "batchInput",
                "defaultValue": ""
              },
              {
                "query": "batchTemplateId",
                "defaultValue": 1
              },
              {
                "query": "batchTemplateVersion",
                "defaultValue": 1
              }
            ]
          },
          {
            "actionName": "EM_BATCH_INCUB_REMOVE",
            "clientMethod": "setIncubator",
            "button": {
              "title": {
                "label_en": "Delete Batch",
                "label_es": "Eliminar Lote"
              },
              "whenDisabled": "selectedSamples"
            },
            "apiParams": [
              {
                "query": "batchName",
                "beItem": "name"
              }
            ]
          },
          {
            "actionName": "GET_INCUBATORS_LIST",
            "clientMethod": "getAssign",
            "button": {
              "title": {
                "label_en": "Assign Incubator",
                "label_es": "Asignar Incubadora"
              },
              "whenDisabled": "selectedSamples",
              "disabledBEState": "incubation_start"
            },
            "dialogInfo": {
              "automatic": true,
              "action": [
                {
                  "actionName": "EM_BATCH_ASSIGN_INCUB",
                  "clientMethod": "setIncubator",
                  "apiParams": [
                    {
                      "query": "batchName",
                      "beItem": "name"
                    },
                    {
                      "query": "incubatorName",
                      "targetValue": true
                    },
                    {
                      "query": "incubStage",
                      "targetValue": true
                    }
                  ]
                }
              ]
            }
          },
          {
            "actionName": "EM_BATCH_INCUB_START",
            "clientMethod": "setIncubator",
            "button": {
              "title": {
                "label_en": "Start Incubator",
                "label_es": "Iniciar Incubadora"
              },
              "whenDisabled": "selectedSamples",
              "disabledBEState": "incubation_start"
            },
            "apiParams": [
              {
                "query": "batchName",
                "beItem": "name"
              },
              {
                "query": "batchTemplateId",
                "defaultValue": 1
              },
              {
                "query": "batchTemplateVersion",
                "defaultValue": 1
              }
            ]
          },
          {
            "actionName": "EM_BATCH_INCUB_END",
            "clientMethod": "setIncubator",
            "button": {
              "title": {
                "label_en": "End Incubator",
                "label_es": "Termina incubadora"
              },
              "whenDisabled": "selectedSamples"
            },
            "apiParams": [
              {
                "query": "batchName",
                "beItem": "name"
              },
              {
                "query": "batchTemplateId",
                "defaultValue": 1
              },
              {
                "query": "batchTemplateVersion",
                "defaultValue": 1
              }
            ]
          }
        ]
      },
      {
        "filter": "samplesWithAnyPendingIncubation",
        "langConfig": {
          "title": {
            "samplesWithAnyPendingIncubation": {
              "label_en": "All Samples Pending Incubation",
              "label_es": "Todas las muestras pendientes de incubación"
            }
          },
          "fieldText": {
            "topLabel": {
              "label_en": "Samples Incubation Stage",
              "label_es": "Etapa de incubación de muestras"
            },
            "next": {
              "label_en": "Next",
              "label_es": "Próxima"
            }
          },
          "gridHeader": {
            "sampleType": {
              "label_en": "",
              "label_es": "",
              "is_icon": true,
              "width": "3%"
            },
            "incubState": {
              "label_en": "",
              "label_es": "",
              "is_icon": true,
              "width": "3%"
            },
            "samplesState": {
              "label_en": "",
              "label_es": "",
              "is_icon": true,
              "width": "3%"
            },
            "sample_id": {
              "label_en": "Sample ID",
              "label_es": "ID Muestra",
              "sort": false,
              "filter": true,
              "width": "9%"
            },
            "incubation_batch": {
              "label_en": "Batch 1",
              "label_es": "Tanda",
              "sort": false,
              "filter": true,
              "width": "9%"
            },
            "incubation2_batch": {
              "label_en": "Batch 2",
              "label_es": "Tanda",
              "sort": false,
              "filter": true,
              "width": "9%"
            },
            "incubation_start": {
              "label_en": "incubation 1 start",
              "label_es": "Inicio 1a Incubacion",
              "sort": false,
              "filter": true,
              "width": "15%"
            },
            "incubation_end": {
              "label_en": "incubation 1 end",
              "label_es": "Fin 1a Incubacion",
              "sort": false,
              "filter": true,
              "width": "15%"
            },
            "incubation2_start": {
              "label_en": "Incubation 2 Start",
              "label_es": "Inicio 2a Incubacion",
              "sort": false,
              "filter": true,
              "width": "15%"
            },
            "sampling_date": {
              "label_en": "Sampling Date",
              "label_es": "ID Fecha de Muestreo",
              "sort": false,
              "filter": true,
              "width": "9%"
            },
            "sampling_comment": {
              "label_en": "Sampling Commment",
              "label_es": "Comentario Muestreo",
              "sort": false,
              "filter": true,
              "width": "9%"
            }
          },
          "stuckHeader": {
            "current_stage": {
              "label_en": "Current Stage",
              "label_es": "Etapa Actual"
            },
            "incubation_passed": {
              "label_en": "Passed",
              "label_es": "Aprobado"
            },
            "sample_id": {
              "label_en": "Sample Id",
              "label_es": "Muestra Id"
            }
          }
        },
        "actions": [
          {
            "actionName": "GET_PENDING_INCUBATION_SAMPLES_AND_ACTIVE_BATCHES",
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
                "query": "incub1_whereFieldsName",
                "value": "current_stage|incubation_passed"
              },
              {
                "query": "incub1_whereFieldsValue",
                "value": "Incubation|false"
              },
              {
                "query": "incub1_sortFieldsName",
                "value": "sample_id desc"
              },
              {
                "query": "incub2_whereFieldsName",
                "value": "current_stage|incubation_passed"
              },
              {
                "query": "incub2_whereFieldsValue",
                "value": "Incubation|true"
              },
              {
                "query": "incub2_sortFieldsName",
                "value": "sample_id desc"
              },
              {
                "query": "includeAllWithAnyPendingIncubation",
                "value": true
              },
              {
                "query": "samplesWithAnyPendingIncubation",
                "value": true
              }
            ]
          },
          {
            "actionName": "SAMPLESTAGE_MOVETONEXT",
            "clientMethod": "moveToNext",
            "button": {
              "icon": "low_priority",
              "color": "red",
              "title": {
                "label_en": "Sample Stuck",
                "label_es": "Muestra Atascada",
                "extra": "stuckNum"
              },
              "whenDisabled": "samplesReload",
              "whenHidden": "stucksList"
            },
            "dialogInfo": {
              "requiresDialog": true,
              "name": "sampleStuckDialog"
            }
          },
          {
            "actionName": "SAMPLESTAGE_MOVETOPREVIOUS",
            "clientMethod": "moveToNext",
            "button": {
              "id": "prev",
              "icon": "next_week",
              "title": {
                "label_en": "Previous",
                "label_es": "Previo"
              },
              "whenDisabled": "selectedSamples"
            }
          },
          {
            "actionName": "GET_SAMPLE_AUDIT",
            "clientMethod": "getSampleAudit",
            "button": {
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
                    {
                      "query": "auditId",
                      "targetValue": true
                    }
                  ]
                }
              ]
            }
          },
          {
            "actionName": "EM_BATCH_INCUB_ADD_SMP",
            "clientMethod": "addRemoveBatch",
            "button": {
              "title": {
                "label_en": "Add to Batch",
                "label_es": "Añadir a Tanda"
              },
              "whenDisabled": "selectedSamples"
            },
            "apiParams": [
              {
                "query": "batchTemplateId",
                "defaultValue": 1
              },
              {
                "query": "batchTemplateVersion",
                "defaultValue": 1
              }
            ]
          },
          {
            "actionName": "EM_BATCH_INCUB_REMOVE_SMP",
            "clientMethod": "addRemoveBatch",
            "button": {
              "title": {
                "label_en": "Remove from Batch",
                "label_es": "Quitar de Tanda"
              },
              "whenDisabled": "selectedSamples"
            }
          },
          {
            "clientMethod": "filterSamples",
            "filterState": "not_in_batch",
            "button": {
              "icon": "radio_button_checked",
              "color": "Orange",
              "title": {
                "label_en": "Not in batch",
                "label_es": "No en lote"
              },
              "whenDisabled": "samplesReload"
            }
          },
          {
            "clientMethod": "filterSamples",
            "filterState": "in_batch_1",
            "button": {
              "icon": "radio_button_checked",
              "color": "Tomato",
              "title": {
                "label_en": "In batch",
                "label_es": "En lote"
              },
              "whenDisabled": "samplesReload"
            }
          },
          {
            "clientMethod": "filterSamples",
            "filterState": "progress_1",
            "button": {
              "img": "incubators/IncubInProgress.gif",
              "size": "20px",
              "title": {
                "label_en": "Incub#1 in progress",
                "label_es": "Incub#1 en curso"
              },
              "whenDisabled": "samplesReload"
            }
          },
          {
            "clientMethod": "filterSamples",
            "filterState": "done",
            "button": {
              "icon": "radio_button_checked",
              "color": "MediumSeaGreen",
              "title": {
                "label_en": "Incub#1 done",
                "label_es": "Incub#1 hecho"
              },
              "whenDisabled": "samplesReload"
            }
          },
          {
            "clientMethod": "filterSamples",
            "filterState": "in_batch_2",
            "button": {
              "icon": "radio_button_checked",
              "color": "SlateBlue",
              "title": {
                "label_en": "Incub#2 in batch",
                "label_es": "Incub#2 en lote"
              },
              "whenDisabled": "samplesReload"
            }
          },
          {
            "clientMethod": "filterSamples",
            "filterState": "progress_2",
            "button": {
              "img": "incubators/IncubInProgress.gif",
              "size": "20px",
              "title": {
                "label_en": "Incub#2 in progress",
                "label_es": "Incub#2 en curso"
              },
              "whenDisabled": "samplesReload"
            }
          },
          {
            "clientMethod": "filterSamples",
            "filterState": "all",
            "button": {
              "icon": "restart_alt",
              "color": "black",
              "title": {
                "label_en": "Reset",
                "label_es": "Reiniciar"
              },
              "whenDisabled": "samplesReload"
            }
          }
        ]
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
            "label_en": "Reload",
            "label_es": "Recargar"
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
              "label_en": "Result",
              "label_es": "Resultado",
              "sort": false,
              "filter": true,
              "width": "10%"
            },
            "sample_id": {
              "label_en": "Sample",
              "label_es": "Muestra",
              "sort": false,
              "filter": true,
              "width": "10%"
            },
            "created_on": {
              "label_en": "Creation",
              "label_es": "Creada",
              "sort": true,
              "filter": false,
              "width": "15%"
            },
            "location_name": {
              "label_en": "Location",
              "label_es": "Ubicación",
              "sort": false,
              "filter": true,
              "width": "15%"
            },
            "method_name": {
              "label_en": "Method",
              "label_es": "Método",
              "sort": false,
              "filter": true,
              "width": "10%"
            },
            "spec_eval_detail": {
              "label_en": "Problem Detail",
              "label_es": "Detalle del Problema",
              "sort": false,
              "filter": true,
              "width": "30%"
            },
            "spec_rule_with_detail": {
              "label_en": "Spec Rule",
              "label_es": "Especificación",
              "sort": false,
              "filter": true,
              "width": "10%"
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
                "label_en": "Reload",
                "label_es": "Recargar"
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
                "label_en": "Create Investigation",
                "label_es": "Crear Investigación"
              },
              "whenDisabled": "selectedSamples"
            },
            "apiParams": [
              {
                "query": "fieldName",
                "value": "description"
              }
            ]
          },
          {
            "actionName": "OPEN_INVESTIGATIONS",
            "clientMethod": "getOpenInvestigations",
            "endPoint": "/frontend/InvestigationAPIfrontend",
            "button": {
              "title": {
                "label_en": "Add to Investigation",
                "label_es": "Añadir a Investigación"
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
                    {
                      "query": "investigationId",
                      "targetValue": true
                    },
                    {
                      "query": "objectsToAdd",
                      "targetValue": true
                    }
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
            "systemName": {
              "label_en": "System Name",
              "label_es": "Nombre Sistema"
            },
            "systemId": {
              "label_en": "System Id",
              "label_es": "Id Sistema"
            },
            "capa": {
              "label_en": "CAPA Required",
              "label_es": "¿Requiere CAPA?"
            },
            "capaName": {
              "label_en": "CAPA System Name",
              "label_es": "Nombre Sistema CAPA"
            },
            "capaId": {
              "label_en": "CAPA Id",
              "label_es": "Id CAPA"
            }
          },
          "gridHeader": {
            "id": {
              "label_en": "ID",
              "label_es": "ID",
              "width": "12px",
              "sort": false,
              "filter": true
            },
            "description": {
              "label_en": "description",
              "label_es": "description",
              "width": "20px",
              "sort": false,
              "filter": true
            },
            "created_on": {
              "label_en": "Creation",
              "label_es": "Creación",
              "width": "30px",
              "sort": false,
              "filter": true
            },
            "external_system_name": {
              "label_en": "External System Name",
              "label_es": "Nombre Sistema Externo",
              "width": "20px",
              "sort": false,
              "filter": true
            },
            "external_system_id": {
              "label_en": "External System Id",
              "label_es": "Id Sistema Externo",
              "width": "20px",
              "sort": false,
              "filter": true
            },
            "capa_required": {
              "label_en": "capa_required",
              "label_es": "CAPA Necesario",
              "width": "20px",
              "sort": false,
              "filter": true
            },
            "capa_external_system_name": {
              "label_en": "CAPA System",
              "label_es": "Sistema para CAPAs",
              "width": "20px",
              "sort": false,
              "filter": true
            },
            "capa_external_system_id": {
              "label_en": "CAPA System Id",
              "label_es": "Id en Sistema CAPAs",
              "width": "20px",
              "sort": false,
              "filter": true
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
                "label_en": "Reload",
                "label_es": "Recargar"
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
                "label_en": "Decision",
                "label_es": "Decisión"
              },
              "whenDisabled": "selectedSamples"
            },
            "dialogInfo": {
              "requiresDialog": true,
              "name": "decisionDialog"
            },
            "apiParams": [
              {
                "query": "investigationId",
                "beItem": "id"
              },
              {
                "query": "capaRequired",
                "element": "capaCheck",
                "type": "check"
              },
              {
                "query": "capaFieldName",
                "value": "external_system_name|external_system_id|capa_external_system_name|capa_external_system_id"
              },
              {
                "query": "capaFieldValue",
                "targetValue": true
              }
            ]
          },
          {
            "actionName": "CLOSE_INVESTIGATION",
            "clientMethod": "closeInvestigation",
            "endPoint": "/app/InvestigationAPI",
            "button": {
              "title": {
                "label_en": "Close",
                "label_es": "Cerrar"
              },
              "whenDisabled": "selectedSamples"
            },
            "apiParams": [
              {
                "query": "investigationId",
                "beItem": "id"
              }
            ]
          }
        ]
      }
    ]
  },
  "Browser": {
    "browser": true
  }
}