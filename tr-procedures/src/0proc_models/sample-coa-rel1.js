export const SampleCoaRel1 = {
  "TrackingChanges": {
  "version": 0.1,
  "last change on (YYYYMMDD)": "20220921",
  "last_change_note_20220921": "Refresh to model 2.1"
  },
  "ModuleSettings": {
    "actionsEndpoints": [
      {
        "name": "Samples",
        "url": "/modulesample/SampleAPIactions"
      }
    ]
  },
  "LogSamplesModuleSamples": {
    "component": "ModuleSampleLogSample",
    "langConfig": {
      "title": {
          "label_en": "Login Samples", 
          "label_es": "Registro de Muestras"
      },
      "fields":[
        {"list1": {
          "items": [
            { "keyName": "demo", "keyValue_en": "demo", "keyValue_es": "demo" }
          ],
          "label_en": "Spec", "label_es": "Espec"
        }},
        {"list2": {
          "items": [
            { "keyName": "global", "keyValue_en": "global", "keyValue_es": "global" }
          ],
          "label_en": "Variation", "label_es": "Variación"
        }}
      ],
      "button": { "label_en": "Log Sample", "label_es": "Registrar Muestra" }
    },
    "viewQuery":
    { 
    },
    "actions": [
      { "actionName": "LOGSAMPLE",
        "clientMethod": "buttonActionWithoutDialog",
        "selObjectVariableName": "",
        "endPoint": "/modulesample/SampleAPIactions",
        "endPointParams": [
          {"argumentName": "specName", "value": "demo"},
          {"argumentName": "specVersion", "value": "1"},
          {"argumentName": "variationName", "value": "global"},
          {"argumentName": "sampleTemplate", "value": "template"},
          {"argumentName": "sampleTemplateVersion", "value": "1"}
          
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
  "SampleEnterResult": {
    "component" : "TableWithButtons",
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
        "received_on": {
          "label_en": "Reception Date", "label_es": "Fecha de Recepción", "sort": true, "filter": false
        },
        "spec_code": {
          "label_en": "Spec", "label_es": "Especificación", "sort": true, "filter": false
        }
      }
    },
    "viewQuery":    
    { "actionName": "SAMPLES_INPROGRESS_LIST",
      "xxxclientMethod": "getSamples",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      },
      "endPointParams": [
        { "argumentName": "sampleFieldToRetrieve", "value": "sample_id|current_stage|status|status_previous|received_on|sampling_comment|sample_config_code|spec_code|spec_variation_name" },
        { "argumentName": "whereFieldsValue", "value": "LOGGED-RECEIVED-INCOMPLETE-COMPLETE*String" },
        { "argumentName": "whereFieldsName", "value": "status in-" },
        { "argumentName": "addSampleAnalysisFieldToRetrieve", "value": "method_name|testing_group" },
        { "argumentName": "sampleAnalysisWhereFieldsName", "value": "testing_group|status not in" },
        { "argumentName": "addSampleAnalysis", "value": false },
        { "argumentName": "addSampleAnalysisResult", "value": false }
      ],
      "paramFilter": {
        "ER-FQ": { "argumentName": "sampleAnalysisWhereFieldsValue", "value": "FQ*String|REVIEWED*String" },
        "ER-MB": { "argumentName": "sampleAnalysisWhereFieldsValue", "value": "MB*String|REVIEWED*String" }
      }
    },
    "actions": [
      {  "actionName": "GET_SAMPLE_AUDIT",
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
      { "actionName": "ENTERRESULT",
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
            "endPointParams": [
              {
                "argumentName": "sampleId",
                "selObjectPropertyName": "sample_id"
              }
            ]
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
        "paramFilter": {
          "ER-FQ": {
            "argumentName": "sampleAnalysisWhereFieldsValue",
            "value": "FQ|REVIEWED*String"
          },
          "ER-MB": {
            "argumentName": "sampleAnalysisWhereFieldsValue",
            "value": "MB|REVIEWED*String"
          }
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
      {
        "argumentName": "sampleAnalysisFieldToRetrieve",
        "value": "sample_id|test_id|analysis|raw_value|spec_eval|status|status_previous|sampling_date|sample_config_code|spec_code|spec_variation_name"
      },
      {
        "argumentName": "sampleAnalysisWhereFieldsName",
        "value": "testing_group|status not in*"
      }
    ],
    "paramFilter": {
      "RT-FQ": {
        "argumentName": "sampleAnalysisWhereFieldsValue",
        "value": "FQ*String|REVIEWED*String"
      },
      "RT-MB": {
        "argumentName": "sampleAnalysisWhereFieldsValue",
        "value": "MB*String|REVIEWED*String"
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
    "paramFilter": {
      "RTG-FQ": {
        "argumentName": "testingGroup",
        "value": "FQ"
      },
      "RTG-MB": {
        "argumentName": "testingGroup",
        "value": "MB"
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
      "paramFilter": {
        "ER-FQ": {
          "argumentName": "sampleAnalysisWhereFieldsValue",
          "value": "FQ|REVIEWED*String"
        },
        "ER-MB": {
          "argumentName": "sampleAnalysisWhereFieldsValue",
          "value": "MB|REVIEWED*String"
        }
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
        "value": "sample_id|sampling_date"
      },
      {
        "argumentName": "whereFieldsValue",
        "value": "RECEIVED-INCOMPLETE-COMPLETE*String|template"
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
      "paramFilter": {
        "ER-FQ": {
          "argumentName": "sampleAnalysisWhereFieldsValue",
          "value": "FQ|REVIEWED*String"
        },
        "ER-MB": {
          "argumentName": "sampleAnalysisWhereFieldsValue",
          "value": "MB|REVIEWED*String"
        }
      }
    }
  ]
}  
,
"culture-medium": {
	 "component": "ModuleEnvMonitCultureMedium"
}
}