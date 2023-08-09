export const ProcDeploy = {
  "TrackingChanges": {
    "version": 0.9,
    "last change on (YYYYMMDD)": "20221017",
	"last_change_note_20221017": "renamed paramFilter by subViewFilter when the entry is for two views and they require particular filters",
    "last_change_note_20221016": "Added filter in sa to not add reviewed or canceled tests",
    "last_change_note_20221012": "First fix for enter results",
    "last_change_note_20221007": "Added argument includeOnlyIfResultsInProgress for view SampleAnalysisPending for filtering samples with no pending testing, issue BE-Issues #823",
    "last_change_note_20221002": "Fixed deviation, added requiresGridItemSelected to true for NEW_INVESTIGATION",
    "last_change_note_20220921": "Fixed issues in ProductionLots reactivate lot, 3 errors on open dialog for the first time(1) use numDays (2) and error when query returns no records for the list(3)",
    "last_change_note_20220921_2": "replace whenDisabled by requiresGridItemSelected",
    "last change note_20220918": "fixed about some endpoints still using the old naming convention, frontend instead of the new one, actions/queries"
  },
  "ModuleSettings": {
    "actionsEndpoints": [
      {
        "name": "Programs",
        "url": "/moduleenvmon/EnvMonAPIactions"
      },
      {
        "name": "Samples",
        "url": "/moduleenvmon/EnvMonSampleAPIactions"
      },
      {
        "name": "ProdLot",
        "url": "/moduleenvmon/EnvMonProdLotAPIactions"
      }
    ]
  },
  "Home":{
	  "component": "ModuleEnvMonitHomeWater"
  },  
  "ProductionLots": {
    "component": "TableWithButtons",
    "langConfig": {
      "title": {
        "SampleLot": {
          "label_en": "Active Production Lots",
          "label_es": "Lotes en producción activos"
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
          "filter": false,
          "confidential_value": true
        },
        "closed_on": {
          "label_en": "Closed On",
          "label_es": "F. Cierre",
          "width": "20%",
          "sort": true,
          "filter": false
        }
      }
    },
    "viewQuery": {
      "actionName": "GET_ACTIVE_PRODUCTION_LOTS",
      "clientMethodssss": "getSamples",
      "endPoint": "/moduleenvmon/EnvMonAPIqueries",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Refresh",
          "label_es": "Recargar"
        },
        "xxxwhenDisabled": "samplesReload"
      }
    },
    "actions": [
      {
        "actionName": "EM_NEW_PRODUCTION_LOT",
        "endPointUrl": "ProdLot",
        "requiresDialog": true,
        "button": {
          "icon": "create_new_folder",
          "title": {
            "label_en": "New",
            "label_es": "Nuevo"
          },
          "requiresGridItemSelected": false
        },
        "dialogInfo": {
          "name": "genericDialog",
          "fields": [
            {
              "text1": {
                "label_en": "New Production Lot Name",
                "label_es": "Nombre para nuevo lote de producción"
              }
            }
          ]
        },
        "endPointParams": [
          {
            "argumentName": "lotName",
            "element": "text1"
          },
          {
            "argumentName": "fieldName",
            "value": "active"
          },
          {
            "argumentName": "fieldValue",
            "value": "true*Boolean"
          }
        ]
      },
      {
        "actionName": "EM_ACTIVATE_PRODUCTION_LOT",
        "endPoint": "/moduleenvmon/EnvMonProdLotAPIactions",
        "endPointParams": [
          {
            "argumentName": "lotName",
            "selObjectPropertyName": "lot_name"
          }
        ],
        "clientMethod": "openReactivateObjectDialog",
        "button": {
          "icon": "alarm_add",
          "title": {
            "label_en": "Activate",
            "label_es": "Activar"
          },
          "requiresGridItemSelected": false
        },
        "requiresDialog": true,
        "dialogInfo": {
          "name": "reactivateObjectDialog",
          "fieldsObject": {
            "queryNumDays": {
              "label_en": "Number of Days",
              "label_es": "Número de Días"
            },
            "objectName": {
              "label_en": "Production Lot to reactivate",
              "label_es": "Lote de Producción a Reactivar"
            }
          },
          "listDefinition": {
            "keyFldName": "lot_name",
            "eachEntryTextGenerator": [
              {
                "value": "Lot: ",
                "type": "fix"
              },
              {
                "value": "lot_name",
                "type": "field"
              }
            ]
          },
          "viewQuery": {
            "actionName": "DEACTIVATED_PRODUCTION_LOTS_LAST_N_DAYS",
            "clientMethod": "getDeactivatedObjects",
            "endPoint": "/moduleenvmon/EnvMonAPIqueries",
            "endPointParams": [
              {
                "argumentName": "numDays",
                "element": "queryNumDays",
                "fixValue": 7
              }
            ]
          },
          "action": []
        }
      },
      {
        "actionName": "EM_DEACTIVATE_PRODUCTION_LOT",
        "endPoint": "/moduleenvmon/EnvMonProdLotAPIactions",
        "clientMethod": "buttonActionWithoutDialog",
        "endPointParams": [
          {
            "argumentName": "lotName",
            "selObjectPropertyName": "lot_name"
          }
        ],
        "requiresDialog": false,
        "button": {
          "icon": "alarm_off",
          "title": {
            "label_en": "Deactivate",
            "label_es": "Desactivar"
          },
          "requiresGridItemSelected": true
        }
      }
    ]
  },
  "LogSamples": {
    "component": "TableWithButtons",
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
      },
      "gridActionOnClick": {
        "actionName": "LOGSAMPLE",
        "endPoint": "/moduleenvmon/EnvMonSampleAPIactions",
        "requiresDialog": true,
        "clientMethod": "logSampleDialog",
        "dialogQueries": [
          {
            "actionName": "GET_ACTIVE_PRODUCTION_LOTS",
            "endPoint": "/moduleenvmon/EnvMonAPIqueries",
            "variableForData": "prodLotList"
          }
        ],
        "dialogInfo": {
          "name": "pointDialog",
          "action": {
            "actionName": "LOGSAMPLE",
            "endPointUrl": "Samples",
            "requiresDialog": false,
            "endPoint": "/moduleenvmon/EnvMonSampleAPIactions",
            "clientMethod": "logSample",
            "endPointParams": [
              {
                "argumentName": "programName",
                "selObjectPropertyName": "program_name"
              },
              {
                "argumentName": "locationName",
                "selObjectPropertyName": "location_name"
              },
              {
                "argumentName": "sampleTemplate",
                "defaultValue": "program_smp_template"
              },
              {
                "argumentName": "sampleTemplateVersion",
                "defaultValue": 1
              },
              {
                "argumentName": "fieldName",
                "defaultValue": "shift|production_lot"
              },
              {
                "argumentName": "fieldValue",
                "targetValue": true
              },
              {
                "argumentName": "numSamplesToLog",
                "defaultValue": 1
              }
            ]
          }
        }
      }
    },
    "viewQuery": {
      "actionName": "PROGRAMS_LIST",
      "endPoint": "/moduleenvmon/EnvMonAPIqueries",
      "clientMethod": "getProgramList",
      "addRefreshButton": false,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload",
          "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      },
      "subAction": {
        "actionName": "GET_ACTIVE_PRODUCTION_LOTS",
        "clientMethod": "getLots"
      }
    },
    "actions": [],
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
  "SamplePending": {
    "component": "TableWithButtons",
    "langConfig": {
      "title": {
        "sampling": {
          "label_en": "Pending Sampling",
          "label_es": "Muestras pendiente muestreo"
        }
      },
      "gridHeader": {"sample_id": {"label_en": "Sample ID","label_es": "ID Muestra","sort": false,"filter": true},
        "program_name": {"label_en": "Project", "label_es": "Programa", "sort": false, "filter": true},
        "location_name": {"label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true},
        "sampling_comment": {"label_en": "sampling Comment", "label_es": "Comentario Muestreo", "sort": false, "filter": true},
        "spec_code": {"label_en": "Spec", "label_es": "Especificación", "sort": false, "filter": true},
        "spec_variation_name": {"label_en": "Variation", "label_es": "Variación", "sort": false, "filter": true}
      }
    },
    "viewQuery": {
      "actionName": "SAMPLES_INPROGRESS_LIST",
      "xxxclientMethod": "getSamples",
      "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload",
          "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      },
      "endPointParams": [
        {"argumentName": "sampleFieldToRetrieve", "value": "sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name"},
        {"argumentName": "whereFieldsValue","value": "-"},
		{"argumentName": "addSampleAnalysis", "value": false},
        {"argumentName": "addSampleAnalysisFieldToRetrieve", "value": "method_name|testing_group"},
        {"argumentName": "sampleAnalysisWhereFieldsName", "value": "FQ*String"},
        {"argumentName": "addSampleAnalysisResult", "value": false}
		
      ],
      "paramFilter": {
        "sampling": {
          "argumentName": "whereFieldsName",
          "value": "sampling_date is null"
        }
      }
    },
    "actions": [
      {
        "actionName": "GET_SAMPLE_AUDIT",
        "requiresDialog": true,
        "endPoint": "/modulesample/SampleAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit",
            "label_es": "Auditoría de Muestra"
          },
          "requiresGridItemSelected": true
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          {
            "argumentName": "sampleId",
            "selObjectPropertyName": "sample_id"
          }
        ],
        "dialogInfo": {
          "name": "auditDialog",
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
              "requiresDialog": false,
              "notGetViewData": true,
              "xxxxsecondaryActionToPerform": {
                "name": "getObjectAuditInfo",
                "endPointParams": [
                  {
                    "argumentName": "sampleId",
                    "selObjectPropertyName": "sample_id"
                  }
                ]
              },
              "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
                {
                  "argumentName": "auditId",
                  "targetValue": true
                }
              ]
            }
          ]
        }
      },
      {
        "actionName": "SETSAMPLINGDATE",
        "endPointUrl": "Samples",
        "requiresDialog": false,
        "button": {
          "icon": "date_range",
          "title": {
            "label_en": "Set Sample Date",
            "label_es": "Establecer Fecha Muestra"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          {
            "argumentName": "sampleId",
            "selObjectPropertyName": "sample_id"
          }
        ]
      },
      {
        "actionName": "CHANGESAMPLINGDATE",
        "requiresDialog": true,
        "endPointUrl": "Samples",
        "button": {
          "icon": "event",
          "title": {
            "label_en": "Change Sample Date",
            "label_es": "Cambiar Fecha Muestra"
          },
          "requiresGridItemSelected": true
        },
        "dialogInfo": {
          "namesssss": "dateDialog",
          "name": "genericDialog",
          "fields": [
            {
              "datetime1": {
                "label_en": "new Comment",
                "label_es": "Comentario"
              }
            }
          ]
        },
        "endPointParams": [
          {
            "argumentName": "sampleId",
            "selObjectPropertyName": "sample_id"
          },
          {
            "argumentName": "newDateTime",
            "element": "datetime1"
          }
        ]
      },
      {
        "actionName": "SAMPLINGCOMMENTADD",
        "requiresDialog": true,
        "endPointUrl": "Samples",
        "button": {
          "icon": "add_comment",
          "title": {
            "label_en": "Add Sampling Comment",
            "label_es": "Agregar Comentario de Muestra"
          },
          "requiresGridItemSelected": true
        },
        "dialogInfo": {
          "namezzzz": "commentDialog",
          "name": "genericDialog",
          "fields": [
            {
              "text1": {
                "label_en": "new Comment",
                "label_es": "Comentario",
                "selObjectPropertyName": "sampling_comment"
              }
            }
          ]
        },
        "endPointParams": [
          {
            "argumentName": "sampleId",
            "selObjectPropertyName": "sample_id"
          },
          {
            "argumentName": "sampleComment",
            "element": "text1",
            "defaultValue": ""
          }
        ]
      },
      {
        "actionName": "SAMPLINGCOMMENTREMOVE",
        "requiresDialog": false,
        "endPointUrl": "Samples",
        "button": {
          "icon": "speaker_notes_off",
          "title": {
            "label_en": "Remove Sampling Comment",
            "label_es": "Eliminar Comentario de Muestra"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          {
            "argumentName": "sampleId",
            "selObjectPropertyName": "sample_id"
          }
        ]
      }
    ]
  },
  "SampleEnterResult": {
    "component": "TableWithButtons",
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
        "sample_id": {"label_en": "Sample ID", "label_es": "ID Muestra", "sort": true, "filter": false},
        "program_name": {"label_en": "Project", "label_es": "Programa", "sort": true, "filter": false},
        "location_name": {"label_en": "Location", "label_es": "Ubicación", "sort": true, "filter": false},
        "sampling_date": {"label_en": "sampling Date", "label_es": "ID Fecha de Muestreo", "sort": true,  "filter": false},
        "spec_code": {"label_en": "Spec", "label_es": "Especificación", "sort": true, "filter": false }
      }
    },
    "viewQuery": {
      "actionName": "SAMPLES_INPROGRESS_LIST",
      "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
      "xxxclientMethod": "getSamples",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload",
          "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      },
      "endPointParams": [
        {"argumentName": "sampleFieldToRetrieve", "value": "sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name"},
        {"argumentName": "whereFieldsValue", "value": "LOGGED-RECEIVED-INCOMPLETE-COMPLETE*String|prog_pers_template|-"},
        {"argumentName": "whereFieldsName", "value": "status in-|sample_config_code not in*|sampling_date is not null"},
        {"argumentName": "addSampleAnalysisFieldToRetrieve", "value": "method_name|testing_group"},
        {"argumentName": "addSampleAnalysis", "value": false},
        {"argumentName": "addSampleAnalysisResult", "value": false},
        {"argumentName": "includeOnlyIfResultsInProgress", "value": true }
      ],
      "subViewFilter": {
        "ER-FQ": [
			{"argumentName": "sampleAnalysisWhereFieldsName", "value": "testing_group|status not in-"},
			{"argumentName": "sampleAnalysisWhereFieldsValue", "value": "FQ*String|REVIEWED-CANCELED*String"}
		],
        "ER-MB": [
			{"argumentName": "sampleAnalysisWhereFieldsName", "value": "testing_group|status not in-"},		
			{"argumentName": "sampleAnalysisWhereFieldsValue", "value": "MB*String|REVIEWED-CANCELED*String"}
		]
      }
    },
    "actions": [
      { "actionName": "GET_SAMPLE_AUDIT",
        "buttonForQuery": true,
        "requiresDialog": true,
        "endPoint": "/modulesample/SampleAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit",
            "label_es": "Auditoría de Muestra"
          },
          "requiresGridItemSelected": true
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          {
            "argumentName": "sampleId",
            "selObjectPropertyName": "sample_id"
          }
        ],
        "dialogInfo": {
          "name": "auditDialog",
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
              "requiresDialog": false,
              "notGetViewData": true,
              "xxxxsecondaryActionToPerform": {
                "name": "getObjectAuditInfo",
                "endPointParams": [
                  {
                    "argumentName": "sampleId",
                    "selObjectPropertyName": "sample_id"
                  }
                ]
              },
              "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
                {
                  "argumentName": "auditId",
                  "targetValue": true
                }
              ]
            }
          ]
        }
      },
      {
        "actionName": "ENTERRESULT",
        "requiresDialog": true,
        "endPointUrl": "Samples",
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
          "requiresGridItemSelected": true
        },
        "dialogInfo": {
          "name": "resultDialog",
          "subQueryName": "getResult",
          "viewQuery": {
				"actionName": "GET_SAMPLE_ANALYSIS_RESULT_LIST",
				"endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
				"endPointParams": [
				  {"argumentName": "sampleId", "selObjectPropertyName": "sample_id"}                            
				],
				"subViewFilter": {
					"ER-FQ": [
						{"argumentName": "sampleAnalysisWhereFieldsName", "value": "testing_group|status not in-"},
						{"argumentName": "sampleAnalysisWhereFieldsValue", "value": "FQ*String|REVIEWED-CANCELED*String"},
					],
					"ER-MB": [
						{"argumentName": "sampleAnalysisWhereFieldsName", "value": "testing_group|status not in-"},
						{"argumentName": "sampleAnalysisWhereFieldsValue", "value": "MB*String|REVIEWED-CANCELED*String"}
					]
				}			
          },
          "automatic": true,
          "resultHeader": {
            "spec_eval": {
              "label_en": "Spec Eval",
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
            },
            "uom": {
              "label_en": "UOM",
              "label_es": "UOM"
            }
          },
          "resultHeaderObjectLabelTopLeft": {
            "label_en": "Sample: ",
            "label_es": "Muestra: "
          },
          "action": [
            {
              "actionName": "ENTERRESULT",
              "notGetViewData": true,
              "requiresDialog": false,
              "endPointUrl": "Samples",
              "clientMethod": "enterResult",
              "endPointParams": [
                {
                  "argumentName": "rawValueResult",
                  "targetValue": true
                },
                {
                  "argumentName": "resultId",
                  "targetValue": true
                }
              ]
            },
            {
              "actionName": "RESULT_CHANGE_UOM",
              "clientMethod": "changeUOM",
              "endPointParams": [
                {
                  "argumentName": "newResultUom",
                  "targetValue": true
                },
                {
                  "argumentName": "resultId",
                  "targetValue": true
                }
              ]
            }
          ]
        },
        "endPointParams": [
          {
            "argumentName": "sampleAnalysisResultFieldToRetrieve",
            "value": "result_id|analysis|method_name|method_version|param_name|param_type|raw_value|uom|spec_eval|spec_eval_detail|status|min_val_allowed|min_allowed_strict|max_val_allowed|max_allowed_strict"
          },
          {
            "argumentName": "sortFieldsName",
            "value": "test_id|result_id"
          },
          {
            "argumentName": "sampleAnalysisWhereFieldsName",
            "value": "testing_group|status not in"
          },
          {
            "argumentName": "sampleId",
            "selObjectPropertyName": "sample_id"
          }
        ],
        "subViewFilter": {
          "ER-FQ": [
			{"argumentName": "sampleAnalysisWhereFieldsValue", "value": "FQ|REVIEWED*String"}
		  ],
          "ER-MB": [
			{"argumentName": "sampleAnalysisWhereFieldsValue", "value": "MB|REVIEWED*String"}
		  ]
        }
      }
    ]
  },
  "ReviewTesting": {
    "component": "TableWithButtons",
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
    "viewQuery": {
      "actionName": "SAMPLEANALYSIS_PENDING_REVISION",
      "xxxendPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
      "xxxclientMethod": "getSamples",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload",
          "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      },
      "endPointParams": [
        {"argumentName": "sampleAnalysisFieldToRetrieve", "value": "sample_id|test_id|analysis|raw_value|spec_eval|status|status_previous|sampling_date|sample_config_code|program_name|location_name|spec_code|spec_variation_name"}
		
      ],
      "subViewFilter": {
        "RT-FQ": [
			{"argumentName": "sampleAnalysisWhereFieldsName", "value": "testing_group|status not in"},
			{"argumentName": "sampleAnalysisWhereFieldsValue", "value": "FQ*String|REVIEWED*String"}
        ],
        "RT-MB": [
			{"argumentName": "sampleAnalysisWhereFieldsName", "value": "testing_group|status not in"},
			{"argumentName": "sampleAnalysisWhereFieldsValue", "value": "MB*String|REVIEWED*String"}
		]
      }
    },
    "actions": [
      {
        "actionName": "GET_SAMPLE_AUDIT",
        "requiresDialog": true,
        "endPoint": "/modulesample/SampleAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit",
            "label_es": "Auditoría de Muestra"
          },
          "requiresGridItemSelected": true
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          {
            "argumentName": "sampleId",
            "selObjectPropertyName": "sample_id"
          }
        ],
        "dialogInfo": {
          "name": "auditDialog",
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
              "requiresDialog": false,
              "notGetViewData": true,
              "xxxxsecondaryActionToPerform": {
                "name": "getObjectAuditInfo",
                "endPointParams": [
                  {
                    "argumentName": "sampleId",
                    "selObjectPropertyName": "sample_id"
                  }
                ]
              },
              "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
                {
                  "argumentName": "auditId",
                  "targetValue": true
                }
              ]
            }
          ]
        }
      },
      {
        "actionName": "REVIEWTEST",
        "requiresDialog": false,
        "endPointUrl": "Samples",
        "xxxclientMethod": "reviewTest",
        "button": {
          "icon": "reviews",
          "title": {
            "label_en": "Review Test",
            "label_es": "Revisar Ensayo"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          {
            "argumentName": "testId",
            "selObjectPropertyName": "test_id"
          }
        ]
      }
    ]
  },
  "ReviewTestingGroup": {
    "component": "TableWithButtons",
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
          "label_en": "Spec Eval",
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
        },
        "uom": {
          "label_en": "UOM",
          "label_es": "UOM"
        }
      },
      "resultHeaderObjectLabelTopLeft": {
        "label_en": "Sample: ",
        "label_es": "Muestra: "
      }
    },
    "viewQuery": {
      "actionName": "SAMPLES_PENDING_TESTINGGROUP_REVISION",
      "xxxendPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload",
          "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      },
      "endPointParams": [
        {
          "argumentName": "sampleFieldToRetrieve",
          "value": "ALL"
        }
      ],
      "subViewFilter": {
        "RTG-FQ": [
			{"argumentName": "testingGroup", "value": "FQ"},
		],
        "RTG-MB": [
			{"argumentName": "testingGroup", "value": "MB"}
		]
      }
    },
    "actions": [
      {
        "actionName": "GET_SAMPLE_AUDIT",
        "requiresDialog": true,
        "endPoint": "/modulesample/SampleAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit",
            "label_es": "Auditoría de Muestra"
          },
          "requiresGridItemSelected": true
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          {
            "argumentName": "sampleId",
            "selObjectPropertyName": "sample_id"
          }
        ],
        "dialogInfo": {
          "name": "auditDialog",
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
              "requiresDialog": false,
              "notGetViewData": true,
              "xxxxsecondaryActionToPerform": {
                "name": "getObjectAuditInfo",
                "endPointParams": [
                  {
                    "argumentName": "sampleId",
                    "selObjectPropertyName": "sample_id"
                  }
                ]
              },
              "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
                {
                  "argumentName": "auditId",
                  "targetValue": true
                }
              ]
            }
          ]
        }
      },
      {
        "actionName": "ENTERRESULT",
        "requiresDialog": true,
        "endPointUrl": "Samples",
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
          "requiresGridItemSelected": true
        },
        "dialogInfo": {
          "name": "resultDialog",
          "subQueryName": "getResult",
          "viewQuery": {
            "actionName": "GET_SAMPLE_ANALYSIS_RESULT_LIST",
            "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
            "endPointParams": [
              {
                "argumentName": "sampleId",
                "selObjectPropertyName": "sample_id"
              }
            ]
          },
          "automatic": true,
          "readOnly": true,
          "resultHeader": {
            "spec_eval": {
              "label_en": "Spec Eval",
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
            },
            "uom": {
              "label_en": "UOM",
              "label_es": "UOM"
            }
          },
          "resultHeaderObjectLabelTopLeft": {
            "label_en": "Sample: ",
            "label_es": "Muestra: "
          },
          "action": [
            {
              "actionName": "ENTERRESULT",
              "requiresDialog": false,
              "endPointUrl": "Samples",
              "clientMethod": "enterResult",
              "endPointParams": [
                {
                  "argumentName": "rawValueResult",
                  "targetValue": true
                },
                {
                  "argumentName": "resultId",
                  "targetValue": true
                }
              ]
            },
            {
              "actionName": "RESULT_CHANGE_UOM",
              "clientMethod": "changeUOM",
              "endPointParams": [
                {
                  "argumentName": "newResultUom",
                  "targetValue": true
                },
                {
                  "argumentName": "resultId",
                  "targetValue": true
                }
              ]
            }
          ]
        },
        "endPointParams": [
          {
            "argumentName": "sampleAnalysisResultFieldToRetrieve",
            "value": "result_id|analysis|method_name|method_version|param_name|param_type|raw_value|uom|spec_eval|spec_eval_detail|status|min_val_allowed|min_allowed_strict|max_val_allowed|max_allowed_strict"
          },
          {
            "argumentName": "sortFieldsName",
            "value": "test_id|result_id"
          },
          {
            "argumentName": "sampleAnalysisWhereFieldsName",
            "value": "testing_group|status not in"
          },
          {
            "argumentName": "sampleId",
            "selObjectPropertyName": "sample_id"
          }
        ],
        "subViewFilter": {
          "ER-FQ": [
			{"argumentName": "sampleAnalysisWhereFieldsValue", "value": "FQ|REVIEWED*String"},
		  ],
          "ER-MB": [
			{"argumentName": "sampleAnalysisWhereFieldsValue", "value": "MB|REVIEWED*String"}
		  ]
        }
      },
      {
        "actionName": "REVIEWSAMPLE_TESTINGGROUP",
        "requiresDialog": false,
        "endPointUrl": "Samples",
        "xxxclientMethod": "reviewTest",
        "button": {
          "icon": "reviews",
          "title": {
            "label_en": "Review",
            "label_es": "Revisar"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          {
            "argumentName": "sampleId",
            "selObjectPropertyName": "sample_id"
          },
          {
            "argumentName": "testingGroup",
            "selObjectPropertyName": "testing_group"
          }
        ]
      }
    ]
  },
  "ReviewSample": {
    "component": "TableWithButtons",
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
          "label_en": "Spec Eval",
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
        },
        "uom": {
          "label_en": "UOM",
          "label_es": "UOM"
        }
      },
      "resultHeaderObjectLabelTopLeft": {
        "label_en": "Sample: ",
        "label_es": "Muestra: "
      }
    },
    "viewQuery": {
      "actionName": "SAMPLES_PENDING_SAMPLE_REVISION",
      "xxendPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload",
          "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      },
      "endPointParams": [
        {
          "argumentName": "sampleFieldToRetrieve",
          "value": "sample_id|program_name|location_name|sampling_date"
        },
        {
          "argumentName": "whereFieldsValue",
          "value": "RECEIVED-INCOMPLETE-COMPLETE*String|prog_pers_template"
        },
        {
          "argumentName": "whereFieldsName",
          "value": "status in-|sample_config_code not in*"
        }
      ]
    },
    "actions": [
      {
        "actionName": "GET_SAMPLE_AUDIT",
        "requiresDialog": true,
        "endPoint": "/modulesample/SampleAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit",
            "label_es": "Auditoría de Muestra"
          },
          "requiresGridItemSelected": true
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          {
            "argumentName": "sampleId",
            "selObjectPropertyName": "sample_id"
          }
        ],
        "dialogInfo": {
          "name": "auditDialog",
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
              "requiresDialog": false,
              "notGetViewData": true,
              "xxxxsecondaryActionToPerform": {
                "name": "getObjectAuditInfo",
                "endPointParams": [
                  {
                    "argumentName": "sampleId",
                    "selObjectPropertyName": "sample_id"
                  }
                ]
              },
              "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
                {
                  "argumentName": "auditId",
                  "targetValue": true
                }
              ]
            }
          ]
        }
      },
      {
        "actionName": "REVIEWSAMPLE",
        "endPointUrl": "Samples",
        "requiresDialog": false,
        "xxxclientMethod": "reviewSample",
        "button": {
          "icon": "view_headline",
          "title": {
            "label_en": "Review",
            "label_es": "Revisar"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          {
            "argumentName": "sampleId",
            "selObjectPropertyName": "sample_id"
          }
        ]
      },
	  {"actionName": "CANCELSAMPLE",
        "endPointUrl": "Samples",
        "requiresDialog": false,
        "button": {
          "icon": "view_headline",
          "title": {
            "label_en": "Cancel",
            "label_es": "Cancelar"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          {
            "argumentName": "sampleId",
            "selObjectPropertyName": "sample_id"
          }
        ]
      },	  
      {
        "actionName": "VIEWRESULT",
        "buttonForQuery": true,
        "requiresDialog": true,
        "endPointUrl": "Samples",
        "alertMsg": {
          "empty": {
            "label_en": "No pending results to enter result",
            "label_es": "No hay resultados pendientes de resultados"
          }
        },
        "button": {
          "icon": "document_scanner",
          "title": {
            "label_en": "View Results",
            "label_es": "Ver los Resultados"
          },
          "requiresGridItemSelected": true
        },
        "dialogInfo": {
          "name": "resultDialog",
          "subQueryName": "getResult",
          "viewQuery": {
            "actionName": "GET_SAMPLE_ANALYSIS_RESULT_LIST",
            "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
            "endPointParams": [
              {
                "argumentName": "sampleId",
                "selObjectPropertyName": "sample_id"
              }
            ]
          },
          "automatic": true,
          "readOnly": true,
          "resultHeader": {
            "spec_eval": {
              "label_en": "Spec Eval",
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
            },
            "uom": {
              "label_en": "UOM",
              "label_es": "UOM"
            }
          },
          "resultHeaderObjectLabelTopLeft": {
            "label_en": "Sample: ",
            "label_es": "Muestra: "
          },
          "action": [
            {
              "actionName": "ENTERRESULT",
              "requiresDialog": false,
              "endPointUrl": "Samples",
              "clientMethod": "enterResult",
              "endPointParams": [
                {
                  "argumentName": "rawValueResult",
                  "targetValue": true
                },
                {
                  "argumentName": "resultId",
                  "targetValue": true
                }
              ]
            },
            {
              "actionName": "RESULT_CHANGE_UOM",
              "clientMethod": "changeUOM",
              "endPointParams": [
                {
                  "argumentName": "newResultUom",
                  "targetValue": true
                },
                {
                  "argumentName": "resultId",
                  "targetValue": true
                }
              ]
            }
          ]
        },
        "endPointParams": [
          {
            "argumentName": "sampleAnalysisResultFieldToRetrieve",
            "value": "result_id|analysis|method_name|method_version|param_name|param_type|raw_value|uom|spec_eval|spec_eval_detail|status|min_val_allowed|min_allowed_strict|max_val_allowed|max_allowed_strict"
          },
          {
            "argumentName": "sortFieldsName",
            "value": "test_id|result_id"
          },
          {
            "argumentName": "sampleAnalysisWhereFieldsName",
            "value": "testing_group|status not in"
          },
          {
            "argumentName": "sampleId",
            "selObjectPropertyName": "sample_id"
          }
        ],
        "subViewFilter": {
          "ER-FQ": [
			{"argumentName": "sampleAnalysisWhereFieldsValue", "value": "FQ|REVIEWED*String"}
		  ],
          "ER-MB": [
			{"argumentName": "sampleAnalysisWhereFieldsValue", "value": "MB|REVIEWED*String"}
		  ]
        }
      }
    ]
  },
  "Programs": {	  
    "component": "ModuleEnvMonitProgramProc",
    "hasOwnComponent": true,
    "viewQuery": {
      "actionName": "PROGRAMS_LIST",
      "endPoint": "/moduleenvmon/EnvMonAPIqueries",
      "clientMethod": "getProgramList",
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload",
          "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      },
      "subAction": {
        "actionName": "GET_ACTIVE_PRODUCTION_LOTS",
        "clientMethod": "getLots"
      }
    },
    
	"actions": []
  },
"Deviation": {
	"component":"Tabs",  
    "abstract": true,
    "tabs": [
      { "component":"TableWithButtons",  
        "filter": "pending",
        "langConfig": {
          "tab": {
            "label_en": "Pending Decision", 
            "label_es": "Decisión pendiente"
          },
          "title": {
            "pending": {
				"label_en": "Pending Decision", 
				"label_es": "Decisión pendiente"
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
        "viewQuery":{
            "actionName": "INVESTIGATION_RESULTS_PENDING_DECISION",
            "ssclientMethod": "getSamples",
            "endPoint": "/app/InvestigationAPIqueries",
            "button": {
              "icon": "refresh",
              "title": {
                "label_en": "Reload", "label_es": "Recargar"
              },
              "requiresGridItemSelected": true
            }		
		},
		"actions": [
          {"actionName": "NEW_INVESTIGATION", 
            "alternativeAPIActionMethod": "newInvestigationAction",
            "endPoint": "/app/InvestigationAPIactions",
			"requiresDialog": false,
            "button": {
              "title": {
                "label_en": "Create Investigation", "label_es": "Crear Investigación"
              },
              "requiresGridItemSelected": true
            },
            "endPointParams": [
				{ "argumentName": "fieldName", "value": "description" },
				{ "argumentName": "fieldValue", "targetValue": true },
				{ "argumentName": "objectsToAdd", "targetValue": true }			
            ]
          },
          {"actionName": "OPEN_INVESTIGATIONS",          
            "endPoint": "/app/InvestigationAPIqueries",
			"requiresDialog": true,
            "button": {
              "title": {
                "label_en": "Add to Investigation", "label_es": "Añadir a Investigación"
              },
              "requiresGridItemSelected": true
            },
            "dialogInfo": {
			"name": "investigationDialog",
			"subQueryName": "getOpenInvestigations",				
              "automatic": true,
              "action": [
                {
                  "actionName": "ADD_INVEST_OBJECTS",
                  "clientMethod": "addInvestObjects",
                  "endPoint": "/app/InvestigationAPIactions",
                  "endPointParams": [
                    { "argumentName": "investigationId", "targetValue": true },
                    { "argumentName": "objectsToAdd", "targetValue": true }
                  ]
                }
              ]
            }
          }
        ]
      },	
      { "component":"TableWithButtons",  
        "filter": "open",
        "langConfig": {
          "tab": {
            "label_en": "Investigations", 
            "label_es": "Investigaciones"
          },
          "title": {
            "open": {
              "label_en": "In Progress Investigations", 
              "label_es": "Investigaciones en curso"
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
        "viewQuery":{
            "actionName": "OPEN_INVESTIGATIONS",
            "sssclientMethod": "getSamples",
            "endPoint": "/app/InvestigationAPIqueries",
            "button": {
              "icon": "refresh",
              "title": {
                "label_en": "Reload", "label_es": "Recargar"
              },
              "requiresGridItemSelected": true
            }
		},
		"actions": [
          {"actionName": "INVESTIGATION_CAPA_DECISION",			
            "endPoint": "/app/InvestigationAPIactions",
			"requiresDialog": true,
            "button": {
              "title": {
                "label_en": "Decision", "label_es": "Decisión"
              },
              "requiresGridItemSelected": true
            },
            "dialogInfo": {               
              "name": "decisionDialog"
            },
            "endPointParams": [
              { "argumentName": "investigationId", "selObjectPropertyName": "id" },
              { "argumentName": "capaRequired", "targetValue": true },
              { "argumentName": "capaFieldName", "value": "external_system_name|external_system_id|capa_external_system_name|capa_external_system_id" },
              { "argumentName": "capaFieldValue", "targetValue": true },
			  { "argumentName": "closeInvestigation", "value": false }				  
            ]
          },
          {"actionName": "CLOSE_INVESTIGATION",
            "clientMethod": "closeInvestigation",
            "endPoint": "/app/InvestigationAPIactions",
			"requiresDialog": false,
            "button": {
              "title": {
                "label_en": "Close", "label_es": "Cerrar"
              },
              "requiresGridItemSelected": true
            },
            "endPointParams": [
              { "argumentName": "investigationId", "selObjectPropertyName": "id" }
            ]
          }
        ]
      }
    ]
  },  
  "Deviation2": {
    "component": "Tabs",
    "abstract": true,
    "tabs": [
      {
        "component": "TableWithButtons",
        "filter": "pending",
        "langConfig": {
          "tab": {
            "label_en": "Pending Decision",
            "label_es": "Decisión pendiente"
          },
          "title": {
            "pending": {
              "label_en": "Pending Decision",
              "label_es": "Decisión pendiente"
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
        "viewQuery": {
          "actionName": "INVESTIGATION_RESULTS_PENDING_DECISION",
          "ssclientMethod": "getSamples",
          "endPoint": "/app/InvestigationAPIqueries",
          "button": {
            "icon": "refresh",
            "title": {
              "label_en": "Reload",
              "label_es": "Recargar"
            },
            "requiresGridItemSelected": true
          }
        },
        "actions": [
          {
            "actionName": "NEW_INVESTIGATION",
            "alternativeAPIActionMethod": "newInvestigationAction",
            "endPoint": "/app/InvestigationAPIactions",
            "requiresDialog": false,
            "button": {
              "title": {
                "label_en": "Create Investigation",
                "label_es": "Crear Investigación"
              },
              "requiresGridItemSelected": true
            },
            "endPointParams": [
              {
                "argumentName": "fieldName",
                "value": "description"
              },
              {
                "argumentName": "fieldValue",
                "targetValue": true
              },
              {
                "argumentName": "objectsToAdd",
                "targetValue": true
              }
            ]
          },
          {
            "actionName": "OPEN_INVESTIGATIONS",
            "clientMethodxxx": "getOpenInvestigations",
            "endPoint": "/app/InvestigationAPIqueries",
            "requiresDialog": true,
            "button": {
              "title": {
                "label_en": "Add to Investigation",
                "label_es": "Añadir a Investigación"
              },
              "requiresGridItemSelected": true
            },
            "dialogInfo": {
              "name": "investigationDialog",
              "subQueryName": "getOpenInvestigations",
              "automatic": true,
              "action": [
                {
                  "actionName": "ADD_INVEST_OBJECTS",
                  "clientMethod": "addInvestObjects",
                  "endPoint": "/app/InvestigationAPIactions",
                  "endPointParams": [
                    {
                      "argumentName": "investigationId",
                      "targetValue": true
                    },
                    {
                      "argumentName": "objectsToAdd",
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
        "component": "TableWithButtons",
        "filter": "open",
        "langConfig": {
          "tab": {
            "label_en": "Investigations",
            "label_es": "Investigaciones"
          },
          "title": {
            "open": {
              "label_en": "In Progress Investigations",
              "label_es": "Investigaciones en curso"
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
        "viewQuery": {
          "actionName": "OPEN_INVESTIGATIONS",
          "sssclientMethod": "getSamples",
          "endPoint": "/app/InvestigationAPIqueries",
          "button": {
            "icon": "refresh",
            "title": {
              "label_en": "Reload",
              "label_es": "Recargar"
            },
            "requiresGridItemSelected": true
          }
        },
        "actions": [
          {
            "actionName": "INVESTIGATION_CAPA_DECISION",
            "alternativeAPIActionMethod": "capaDecisionAction",
            "endPoint": "/app/InvestigationAPIactions",
            "requiresDialog": true,
            "button": {
              "title": {
                "label_en": "Decision",
                "label_es": "Decisión"
              },
              "requiresGridItemSelected": true
            },
            "dialogInfo": {
              "name": "decisionDialog"
            },
            "endPointParams": [
              {
                "argumentName": "investigationId",
                "selObjectPropertyName": "id"
              },
              {
                "argumentName": "capaRequired",
                "targetValue": true
              },
              {
                "argumentName": "capaFieldName",
                "value": "external_system_name|external_system_id|capa_external_system_name|capa_external_system_id"
              },
              {
                "argumentName": "capaFieldValue",
                "targetValue": true
              },
              {
                "argumentName": "closeInvestigation",
                "value": false
              }
            ]
          },
          {
            "actionName": "CLOSE_INVESTIGATION",
            "clientMethod": "closeInvestigation",
            "endPoint": "/app/InvestigationAPIactions",
            "requiresDialog": false,
            "button": {
              "title": {
                "label_en": "Close",
                "label_es": "Cerrar"
              },
              "requiresGridItemSelected": true
            },
            "endPointParams": [
              {
                "argumentName": "investigationId",
                "selObjectPropertyName": "id"
              }
            ]
          }
        ]
      }
    ]
  },
  "Browser": {
    "hasOwnComponent": true,
    "component": "DataMining",
	"tabsListElement": {"label_en":"Browsers", "label_es":"Buscador"},
    "tabs": [
      {		  
        "action": "GET_SAMPLE_BY_TESTINGGROUP_SUMMARY_REPORT",
        "label_en": "Sample",
        "label_es": "Sample",
		
        "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
        "filter":{
			"fixParams": {
			},
			"filterFields":[
				{"text1": { "label_en": "Sample ID", "label_es": "ID Muestra", "default_value": "539" }}
			],
			"endPointParams": [
				{"argumentName": "sampleId", "element": "text1"}
			]
		},
        "reportElements":[
			[
				{"type": "ccccjsonViewer",
				 "endPointResponseObject":"report_info", 
				}
			],		
			[
				{"type": "reportTitle", "title":{"label_en": "Certificate of Analysis", "label_es": "Certificado de Análisis"}}
			],
			[
				{"type": "cardSomeElementsSingleObject",				 
				 "endPointResponseObject":"sample", 
				 "fieldsToDisplay": [
					{"name": "sample_id", "label_en": "ID", "label_es": "ID"},
					{"name": "logged_on", "label_en": "Logged On", "label_es": "F. Registro"},					
				 ], 
				 "includeChild": true,
				 "child": [{			
						 "type": "cardSomeElementsRepititiveObjects",				 				 
						 "endPointResponseObject":"sample_revision_testing_group", 
						 "fieldsToDisplay": [
							{"name": "testing_group", "label_en": "Testing Group", "label_es": "Grupo Analítico"},
							{"name": "revision_on", "label_en": "Reviewed On", "label_es": "F. Revisión"},
							{"name": "ready_for_revision", "label_en": "Ready for revision", "label_es": "Listo para revisar"},								
						 ],
						 "includeChild": true,
						 "child": [{
							 "type": "cardSomeElementsRepititiveObjects",				 
							 "endPointResponseObject":"sample_analysis", 
							 "fieldsToDisplay": [
								{"name": "analysis", "label_en": "Analysis", "label_es": "Análisis"},
								{"name": "method_name", "label_en": "Method", "label_es": "Méthodo"}
							 ],
							 "includeChild": false,
							 "child": []
							 
						 }]							
				 }]
				}			
			],
			[
				{"type": "cccjsonViewer",
				 "endPointResponseObject":"sample", 
				}
			]
		],
        "xfixParams": {
          "sampleFieldToRetrieve": "ALL",
          "sampleFieldsToDisplay": "current_stage|program_name|location_name"
        },
        "xextraParams": {
          "sampleId": ""
        },
		"xviewDefinition":{
			"title": "Hola"
		},
        "printable": true,
        "download":{
          "active": true,
          "elements":[
            {"elementName": "datatable"}
          ] 
        }		
      },
      {
        "label_en": "Production Lot",
        "label_es": "Production Lot",
        "action": "GET_PRODLOT_REPORT",
        "fixParams": {
          "prodLotFieldToRetrieve": "ALL",
          "prodLotFieldsToDisplay": "ALL",
          "sampleFieldToRetrieve": "ALL",
          "sampleFieldsToDisplay": "ALL",
          "sampleGroups": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|area*counter_by_status"
        },
        "extraParams": {
          "lotName": ""
        }
      },
      { "action": "QUERY_READING_OUT_OF_RANGE",
        "label_en": "Readings out of range", 
        "label_es": "Lecturas fuera de rango", 
        "endPoint": "/moduleenvmon/EnvMonAPIstats",
        "filter":{
          "fixParams": {
            "sampleGroups": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|spec_eval*counter_range_eval|has_invest*counter_investigations|has_pre_invest, has_invest*counter_pre_and_invest"
          },
          "filterFields":[
            {"text1": { "label_en": "Program", "label_es": "Programa", "default_value": "" }},
            {"text2": { "label_en": "Location", "label_es": "Ubicación", "default_value": "" }},
            {"text3": { "label_en": "Area", "label_es": "Area", "default_value": "" }},
            {"daterange1":
              {
              "dateStart":{ "label_en": "Sampling Start Date", "label_es": "Fecha Inicio Muestreo", "default_value": "" },
              "dateEnd":{ "label_en": "Sampling End Date", "label_es": "Fecha Fin Muestreo", "default_value": "" }
              }
            },
            {"checkbox1": { "label_en": "Exclude Readings Not Entered Yet", "label_es": "Excluir Lecturas no entradas aún", "default_value": true }},
            {"number1": { "label_en": "Only readings Equal to", "label_es": "Solo las lecturas igual a", "default_value": "" }},
            {"number2": { "label_en": "Only readings Greater than", "label_es": "Solo las lecturas Mayores a", "default_value": "" }},
            {"number3": { "label_en": "Only readings Less than", "label_es": "Solo las lecturas Menores a", "default_value": "" }},
            {"checkbox4": { "label_en": "Include Microorganisms", "label_es": "Incluir Microorganismos", "default_value": false }},
            {"text4": { "label_en": "Microorganisms to find", "label_es": "Microorganismos a encontrar", "default_value": "" }}
          ],
          "extraParams": [
            {"argumentName": "programName", "element": "text1"},
            {"argumentName": "locationName", "element": "text2"},
            {"argumentName": "area", "element": "text3"},
            {"argumentName": "excludeReadingNotEntered", "element": "checkbox1"},
            {"argumentName": "samplingDayStart", "element": "daterange1dateStart"},
            {"argumentName": "samplingDayEnd", "element": "daterange1dateEnd"},
            {"argumentName": "readingEqual", "element": "number1"},
            {"argumentName": "readingMin", "element": "number2"},
            {"argumentName": "readingMax", "element": "number3"},
            {"argumentName": "includeMicroorganisms", "element": "checkbox4"},
            {"argumentName": "MicroorganismsToFind", "element": "text4"}
          ]      
        },
        "printable": true,
        "download":{
          "active": true,
          "elements":[
            {"elementName": "datatable"}
          ] 
        },

        "reportElements":[
          [
          {"type": "reportTitle", "title":{"label_en": "Readings Out of Range", "label_es": "Lecturas Fuera de Rango Permitido"}}
          ],
          [
          {"type": "card", "title":{"label_en": "Information", "label_es": "Información"}, 
            "elementName":"production_lot", "subheadingObj": "text1"}
          ],
          [
          {"type": "chart", "elementName": "counter_range_eval",

            "display_chart": true,
            "chart_type":"pie",
            "chart_name":"counter_range_eval",
            "chart_title":{"label_en": "Per out of range type", "label_es":"Por tipo de fuera de rango"},
            "counter_field_name":"count",
            "counterLimits":{
              "xmin_allowed": 3,
              "xmin_allowed_included":3,
              "xmax_allowed":100,
              "xmax_allowed_included":100,
              "xvalue":0
            },
            "chartStyle": {
              "backgroundColor": "transparent",
              "is3D": true,
              "colors": ["#dfa942", "#d33737", "#bf120f"]              
            },
            "grouper_field_name":"spec_eval",
            "label_values_replacement":{
              "inAlertMax": {"label_es": "Por Encima del límite de alerta", "label_en": "Over the Alert limit"},
              "outOfSpecMax": {"label_es": "Fuera de Rango", "label_en": "Over the Range"},
              "outOfSpecMaxStrict": {"label_es": "Fuera de Rango", "label_en": "Over the Range"}
            },
            "grouper_exclude_items":["xxxxoutOfSpecMax", "Samplingzz","Incubationzz","PlateReadingzz","MicroorganismIdentificationzz","zz","END"],
            "label_item":{"label_en":"Statussss", "label_es":"Estado"},
            "label_value":{"label_en":"#", "label_es":"#"}   
          },
          {"type": "chart", "elementName": "counter_by_area_spec_tmp",

            "display_chart": true,
            "chart_type":"pie",
            "chart_name":"counter_by_area_spec_tmp",
            "chart_title":{"label_en": "Per Area and Spec", "label_es":"Por Area y Especificación"},
            "counter_field_name":"count",
            "counterLimits":{
              "xmin_allowed": 3,
              "xmin_allowed_included":3,
              "xmax_allowed":100,
              "xmax_allowed_included":100,
              "xvalue":0
            },
            "chartStyle": {
              "backgroundColor": "transparent",
              "is3D": true,
              "colors": ["#1b7fcc", "#5fbd5f", "#bf120f"]              
            },
            "grouper_field_name":"sample_config_code",
            "label_values_replacement":{
              "prog_pers_template": {"label_es": "Personal", "label_en": "Personnel"},
              "program_smp_template": {"label_es": "Muestras", "label_en": "Samples"},
              "outOfSpecMaxStrict": {"label_es": "Fuera de Rango", "label_en": "Over the Range"}
            },
            "grouper_exclude_items":["xxxxoutOfSpecMax", "Samplingzz","Incubationzz","PlateReadingzz","MicroorganismIdentificationzz","zz","END"],
            "label_item":{"label_en":"Statussss", "label_es":"Estado"},
            "label_value":{"label_en":"#", "label_es":"#"}   
          }
        ],
        [
          {"type": "grid", "title":{"label_en": "Info Matching Selection Criteria", "label_es": "Información cumpliendo el criterio de selección"}, 
           "elementName": "datatable", "fieldsToDisplay":[
              {"property": "program_name", "header": "Program"}, 
              {"property": "location_name", "header": "Location"}, 
              {"property": "area", "header": "Area"}, 
              {"property": "shift", "header": "shift"}, 
              {"property": "sampling_date", "header": "Sampling Date"}, 
              {"property": "raw_value_num", "header": "Value"}, 
              {"property": "spec_eval_detail", "header": "Spec Eval"}
           ] 
          }          
        ]
        ]
      }	  
    ]
  }
}