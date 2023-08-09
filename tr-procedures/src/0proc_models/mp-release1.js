export const MpRelease1 = 
{
  "TrackingChanges": {
    "version": 0.9,
	"last change on (YYYYMMDD)": "20230808",
	"last_change_note_20230808": "Fixed Deviation view, it requires buttons to be by entity or object_type, by now the new_inv/add to inv buttons are for lot_bulk. In case new object types will be added then buttons should be cloned and adapted accordingly.",
	"last_change_note_20230726": "Added Deviation view",
    "last_change_note_20230718": "In LotView, added tab for non analyzed params and for inventory retain",
    "last_change_note_20230625": "Created new form element, list1SelectedRow, for the uoms on create new lot",
	"last_change_note_20230620": "Added new button add sample analysis",
	"last_change_note_20230601": "Record needs to be selected to create a lot",	
	"last_change_note_20230523": "Added new section for inventory retain",
    "last_change_note_20230523_2": "Added Fake CoA as a model in LotView",
    "last_change_note_20230308": "First draft"
  },
  "ModuleSettings": {
    "actionsEndpoints": [
      {
        "name": "Lots",
        "url": "/moduleinsplotrm/InspLotRMAPIactions"
      }
    ],
    "queriesEndpoints": [
      {
        "name": "Lots",
        "url": "/moduleinsplotrm/InspLotRMAPIqueries"
      }
    ]
  },
  "Home": {
    "component": "ModuleEnvMonitHomeAir"
  },
  "LotCreation": {
    "component": "TableWithButtons",
    "langConfig": {
      "title": {
        "LotCreation": {
          "label_en": "Lot Creation",
          "label_es": "Creación de lotes"
        }
      },
      "gridHeader": {
        "name": {
          "label_en": "Name",
          "label_es": "Nombre",
          "width": "80%",
          "sort": false,
          "filter": true,
          "align": "left"
        },
        "spec_code": {
          "label_en": "Specification",
          "label_es": "Especificación",
          "width": "20%",
          "sort": true,
          "filter": false
        },
        "inventory_management": {
          "label_en": "Inventory Management?",
          "label_es": "¿Gestionar inventario?",
          "width": "20%",
          "sort": true,
          "filter": false
        },
        "perform_bulk_control": {
          "label_en": "Perform Bulk Control?",
          "label_es": "¿Inspección de Bultos?",
          "width": "20%",
          "sort": true,
          "filter": false
        },
        "allow_adhoc_bulk_addition": {
          "label_en": "Allow add adhoc bulks?",
          "label_es": "¿Permitir añadir Bultos adhoc?",
          "width": "20%",
          "sort": true,
          "filter": false
        },
        "sampling_algorithm": {
          "label_en": "Sampling algorithm",
          "label_es": "Algoritmo de muestras",
          "width": "20%",
          "sort": true,
          "filter": false
        }
        
      }
    },
    "viewQuery": {
      "actionName": "GET_MATERIALS",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Refresh",
          "label_es": "Recargar"
        }
      }
    },
    "actions": [
      {
        "actionName": "NEW_LOT",
        "requiresDialog": true,
        "button": {
          "icon": "create_new_folder",
          "title": {
            "label_en": "New",
            "label_es": "Nuevo"
          },
          "requiresGridItemSelected": true
        },
        "dialogInfo": {
          "name": "genericDialog",
          "fields": [
            {
              "text1": {
                "label_en": "New Lot Name",
                "label_es": "Nombre para nuevo lote"
              }
            },
            {
              "number1": {
                "label_en": "Quantity",
                "label_es": "Cantidad"
              }
            },
            {
              "list1SelectedRow": {
                "label_en": "UOM",
                "label_es": "UDM",
				        "the_default_value":{"selObjectPropertyName": "default_uom"},
				        "list_values":{"selObjectPropertyName": "alternative_uoms"}
              }
            },
            {
              "number2": {
                "label_en": "Num Bulks",
                "label_es": "Núm Bultos"
              }
            },
            {
              "number3": {
                "label_en": "Num Containers",
                "label_es": "Núm Contenedores"
              }
            }
            
          ]
        },
        "endPointParams": [
          {            "argumentName": "lotName",            "element": "text1"          },
          {            "argumentName": "lotTemplate",        "value": "template"         },
          {            "argumentName": "lotTemplateVersion",        "value": "1"         },
          {            "argumentName": "quantity",        "element": "number1"         },
          {            "argumentName": "quantityUom",        "element": "list1SelectedRow"         },
          {            "argumentName": "materialName",        "selObjectPropertyName": "name"         },
          {            "argumentName": "numBulks",        "element": "number2"         },
          {            "argumentName": "numContainers",        "element": "number3"         }
        ]
      }
    ]
  },
  "LotView": {
    "component": "ObjectByTabs",
    "hasOwnComponent": true,
    "showTitleOnTop": true,
    "title": {
      "fix_text_en": "Lot view",
      "fix_text_es": "Visor de Lote",
      "name": "lot_name"
    },
    "viewQuery": {
      "actionName": "GET_LOT_INFO",
	  "notUseGrid": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload",
          "label_es": "Recargar"
        },
        "requiresGridItemSelected": false
      },
      "endPointParams": [
        {
          "argumentName": "lotName",
          "element": "text1"
        }
      ]
    },
    "filter_button": {
      "label_en": "Search",
      "label_es": "Buscar"
    },
    "filter": [
      {
        "text1": {
          "label_en": "Lot to get",
          "label_es": "Lote a cargar",
          "fixValue": "CCEP003"
        }
      }
    ],
    "filter_results": {
      "type": "readOnlyTable",
      "title": "3.4) Menu Definition",
      "endPointResponseObject": "user_requirements_events",
      "columns": [
        {
          "name": "id",
          "label_en": "Id",
          "label_es": "Id"
        }
      ]
    },
    "actions": [],
    "tabs": [
      { "tabLabel_en": "Summary", "tabLabel_es": "Inicio", "view": "summary",
        "view_definition": [
          { "type": "cardSomeElementsSingleObject", "endPointResponseObject": "lot_info",
            "title": {
              "label_en": "Lot Info",
              "label_es": "Información del Lote"
            },
            "subtitle": {
              "label_en": "Lot Info",
              "label_es": "Información del Lote"
            },
            "fieldsToDisplay": [
              {
                "name": "name",
                "label_en": "Name",
                "label_es": "Nombre"
              },
              {
                "name": "created_on",
                "label_en": "Creation D.",
                "label_es": "F. Creación"
              },
              {
                "name": "material_name",
                "label_en": "Material",
                "label_es": "Material"
              },
              {
                "name": "quantity",
                "name2": "quantity_uom",
                "label_en": "Quantity",
                "label_es": "Cantidad"
              },
              {
                "name": "num_containers",
                "label_en": "Num. Containers",
                "label_es": "Núm. Contenedores"
              },
              {
                "name": "bulk_decision",
                "name2": "bulk_decision_by",
                "name3": "bulk_decision_by",
                "label_en": "Bulks decision",
                "label_es": "Decisión en los bultos"
              },
              {
                "name": "sampling_plan",
                "label_en": "sampling_plan",
                "label_es": "sampling_plan"
              },
              {
                "name": "analysis_status",
                "label_en": "analysis_status",
                "label_es": "analysis_status"
              }
            ],
            "actions": [
              {
                "actionName": "GET_LOT_AUDIT",
                "requiresDialog": true,
                "endPoint": "/moduleinsplotrm/InspLotRMAPIqueries",
                "button": {
                  "icon": "rule",
                  "title": {
                    "label_en": "Lot Audit",
                    "label_es": "Auditoría de Lote"
                  },
                  "requiresGridItemSelected": false
                },
                "clientMethod": "getObjectAuditInfo",
                "endPointParams": [
                  {
                    "argumentName": "lotName",
                    "selObjectPropertyName": "name"
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
                "actionName": "LOT_ALL_BULKS_TAKE_DECISION",
                "requiresDialog": true,
                "endPointUrl": "Samples",
                "button": {
                  "icon": "event",
                  "title": {
                    "label_en": "Take Decision",
                    "label_es": "Tomar Decisión"
                  },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    {
                      "list1": {
                        "label_en": "Decision",
                        "label_es": "Decisión",
                        "items": [
                          {
                            "keyName": "ACCEPTED",
                            "keyValue_en": "Accepted",
                            "keyValue_es": "Aceptado"
                          },
                          {
                            "keyName": "ACCEPTED_WITH_RESTRICTIONS",
                            "keyValue_en": "Accepted with restrictions",
                            "keyValue_es": "Aceptado con restricciones"
                          },
                          {
                            "keyName": "REJECTED",
                            "keyValue_en": "Rejected",
                            "keyValue_es": "Rechazado"
                          }
                        ]
                      }
                    }
                  ]
                },
                "endPointParams": [
                  {
                    "argumentName": "lotName",
                    "selObjectPropertyName": "name"
                  },
                  {
                    "argumentName": "lotBulkDecision",
                    "element": "list1"
                  }
                ]
              },
              {
                "actionName": "LOT_TAKE_USAGE_DECISION",
                "requiresDialog": true,
                "endPointUrl": "Samples",
                "button": {
                  "icon": "event",
                  "title": {
                    "label_en": "Take Usage Decision",
                    "label_es": "Tomar Decisión de uso"
                  },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    {
                      "list1": {
                        "label_en": "Decision",
                        "label_es": "Decisión",
                        "items": [
                          {
                            "keyName": "ACCEPTED",
                            "keyValue_en": "Accepted",
                            "keyValue_es": "Aceptado"
                          },
                          {
                            "keyName": "ACCEPTED_WITH_RESTRICTIONS",
                            "keyValue_en": "Accepted with restrictions",
                            "keyValue_es": "Aceptado con restricciones"
                          },
                          {
                            "keyName": "REJECTED",
                            "keyValue_en": "Rejected",
                            "keyValue_es": "Rechazado"
                          }
                        ]
                      }
                    }
                  ]
                },
                "endPointParams": [
                  {
                    "argumentName": "lotName",
                    "selObjectPropertyName": "name"
                  },
                  {
                    "argumentName": "lotUsageDecision",
                    "element": "list1"
                  }
                ]
              }
            ]
          },
          { "type": "cardSomeElementsRepititiveObjects", "endPointResponseObject": "inventory_retain",
            "title": {
              "label_en": "Inventory Retain",
              "label_es": "Inventario Retén"
            },
            "subtitle": {
              "label_en": "Lot Info",
              "label_es": "Información del Lote"
            },
            "fieldsToDisplay": [
              {
                "name": "quantity_items",
                "label_en": "Items",
                "label_es": "Items"
              },			
              {
                "name": "amount",
				"name2": "amount_uom",
                "label_en": "Quantity",
                "label_es": "Cantidad"
              },
              {
                "name": "quantity_items",
                "label_en": "Items",
                "label_es": "Items"
              }
            ],
            "actions": [
              {
                "actionName": "LOT_RETAIN_RECEPTION",
                "requiresDialog": true,
                "endPointUrl": "Samples",
                "button": {
                  "icon": "event",
                  "title": {
                    "label_en": "Adjust Bulk Quantity",
                    "label_es": "Ajustar Cantidad del Bulto"
                  },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    {
                      "number1": {
                        "label_en": "Quantity",
                        "label_es": "Cantidad"
                      }
                    },
                    {
                      "text1": {
                        "label_en": "uom",
                        "label_es": "Unidad Medida",
                        "optional": true
                      }
                    }
                  ]
                },
                "endPointParams": [
                  {
                    "argumentName": "lotName",
                    "selObjectPropertyName": "lot_name"
                  },
                  {
                    "argumentName": "bulkId",
                    "selObjectPropertyName": "id"
                  },
                  {
                    "argumentName": "quantity",
                    "element": "number1"
                  },
                  {
                    "argumentName": "quantityUom",
                    "element": "text1"
                  }
                ]
              },
              {
                "actionName": "LOT_RETAIN_MOVEMENT",
                "requiresDialog": true,
                "endPointUrl": "Samples",
                "button": {
                  "icon": "alarm_on",
                  "title": {
                    "label_en": "Adjust Sample Quantity",
                    "label_es": "Ajustar Cantidad de Muestra"
                  },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    {
                      "number1": {
                        "label_en": "Quantity",
                        "label_es": "Cantidad"
                      }
                    }
                  ]
                },
                "endPointParams": [
                  {
                    "argumentName": "lotName",
                    "selObjectPropertyName": "lot_name"
                  },
                  {
                    "argumentName": "bulkId",
                    "selObjectPropertyName": "id"
                  },
                  {
                    "argumentName": "quantity",
                    "element": "number1"
                  }
                ]
              },
              {
                "actionName": "LOT_RETAIN_EXTRACT",
                "requiresDialog": true,
                "endPointUrl": "Samples",
                "button": {
                  "icon": "event",
                  "title": {
                    "label_en": "Take Decision",
                    "label_es": "Tomar Decisión"
                  },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    {
                      "list1": {
                        "label_en": "Decision",
                        "label_es": "Decisión",
                        "items": [
                          {
                            "keyName": "ACCEPTED",
                            "keyValue_en": "Accepted",
                            "keyValue_es": "Aceptado"
                          },
                          {
                            "keyName": "ACCEPTED_WITH_RESTRICTIONS",
                            "keyValue_en": "Accepted with restrictions",
                            "keyValue_es": "Aceptado con restricciones"
                          },
                          {
                            "keyName": "REJECTED",
                            "keyValue_en": "Rejected",
                            "keyValue_es": "Rechazado"
                          }
                        ]
                      }
                    }
                  ]
                },
                "endPointParams": [
                  {
                    "argumentName": "lotName",
                    "selObjectPropertyName": "lot_name"
                  },
                  {
                    "argumentName": "bulkId",
                    "selObjectPropertyName": "id"
                  },
                  {
                    "argumentName": "lotBulkDecision",
                    "element": "list1"
                  }
                ]
              },
              {
                "actionName": "LOT_RETAIN_LOCK",
                "requiresDialog": true,
                "endPointUrl": "Samples",
                "button": {
                  "icon": "event",
                  "title": {
                    "label_en": "Take Decision",
                    "label_es": "Tomar Decisión"
                  },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    {
                      "list1": {
                        "label_en": "Decision",
                        "label_es": "Decisión",
                        "items": [
                          {
                            "keyName": "ACCEPTED",
                            "keyValue_en": "Accepted",
                            "keyValue_es": "Aceptado"
                          },
                          {
                            "keyName": "ACCEPTED_WITH_RESTRICTIONS",
                            "keyValue_en": "Accepted with restrictions",
                            "keyValue_es": "Aceptado con restricciones"
                          },
                          {
                            "keyName": "REJECTED",
                            "keyValue_en": "Rejected",
                            "keyValue_es": "Rechazado"
                          }
                        ]
                      }
                    }
                  ]
                },
                "endPointParams": [
                  {
                    "argumentName": "lotName",
                    "selObjectPropertyName": "lot_name"
                  },
                  {
                    "argumentName": "bulkId",
                    "selObjectPropertyName": "id"
                  },
                  {
                    "argumentName": "lotBulkDecision",
                    "element": "list1"
                  }
                ]
              },
              {
                "actionName": "LOT_RETAIN_UNLOCK",
                "requiresDialog": true,
                "endPointUrl": "Samples",
                "button": {
                  "icon": "event",
                  "title": {
                    "label_en": "Take Decision",
                    "label_es": "Tomar Decisión"
                  },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    {
                      "list1": {
                        "label_en": "Decision",
                        "label_es": "Decisión",
                        "items": [
                          {
                            "keyName": "ACCEPTED",
                            "keyValue_en": "Accepted",
                            "keyValue_es": "Aceptado"
                          },
                          {
                            "keyName": "ACCEPTED_WITH_RESTRICTIONS",
                            "keyValue_en": "Accepted with restrictions",
                            "keyValue_es": "Aceptado con restricciones"
                          },
                          {
                            "keyName": "REJECTED",
                            "keyValue_en": "Rejected",
                            "keyValue_es": "Rechazado"
                          }
                        ]
                      }
                    }
                  ]
                },
                "endPointParams": [
                  {
                    "argumentName": "lotName",
                    "selObjectPropertyName": "lot_name"
                  },
                  {
                    "argumentName": "bulkId",
                    "selObjectPropertyName": "id"
                  },
                  {
                    "argumentName": "lotBulkDecision",
                    "element": "list1"
                  }
                ]
              }
            ]
          },
          { "type": "cardSomeElementsRepititiveObjects", "endPointResponseObject": "lot_bulk",
            "title": {
              "label_en": "Lot Bulks",
              "label_es": "Bultos"
            },
            "subtitle": {
              "label_en": "Lot Info",
              "label_es": "Información del Lote"
            },
            "fieldsToDisplay": [
              {
                "name": "bulk_name",
                "label_en": "Name",
                "label_es": "Nombre"
              },
              {
                "name": "quantity",
                "name2": "quantity_uom",
                "label_en": "Quantity",
                "label_es": "Cantidad"
              },
              {
                "name": "sample_quantity",
                "name2": "sample_quantity_uom",
                "label_en": "Sample Quantity",
                "label_es": "Cantidad de Muestra"
              },
              {
                "name": "decision",
                "label_en": "Decision",
                "label_es": "Decisión"
              }
            ],
            "actions": [
              {
                "actionName": "LOT_BULK_ADJUST_QUANTITY",
                "requiresDialog": true,
                "endPointUrl": "Samples",
                "button": {
                  "icon": "event",
                  "title": {
                    "label_en": "Adjust Bulk Quantity",
                    "label_es": "Ajustar Cantidad del Bulto"
                  },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    { "number1": {
						"label_en": "Quantity",
						"label_es": "Cantidad"
						}
                    },
                    {
                      "list1SelectedRow": {
                        "label_en": "UOM",
                        "label_es": "UDM",
        				"the_default_value":{"selObjectPropertyName": "default_uom"},
        				"list_values":{"selObjectPropertyName": "alternative_uoms"}
                      }
                    }
                 ]
                },
                "endPointParams": [
                  {"argumentName": "lotName", "selObjectPropertyName": "lot_name"},
                  {"argumentName": "bulkId", "selObjectPropertyName": "id"},
                  {"argumentName": "quantity", "element": "number1"},
                  {"argumentName": "quantityUom", "element": "list1SelectedRow"}
                ]
              },
              {
                "actionName": "LOT_BULK_ADJUST_SAMPLE_QUANTITY",
                "requiresDialog": true,
                "endPointUrl": "Samples",
                "button": {
                  "icon": "alarm_on",
                  "title": {
                    "label_en": "Adjust Sample Quantity",
                    "label_es": "Ajustar Cantidad de Muestra"
                  },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    {
                      "number1": {
                        "label_en": "Quantity",
                        "label_es": "Cantidad"
                      }
                    }
                  ]
                },
                "endPointParams": [
                  {
                    "argumentName": "lotName",
                    "selObjectPropertyName": "lot_name"
                  },
                  {
                    "argumentName": "bulkId",
                    "selObjectPropertyName": "id"
                  },
                  {
                    "argumentName": "quantity",
                    "element": "number1"
                  }
                ]
              },
              {
                "actionName": "LOT_BULK_TAKE_DECISION",
                "requiresDialog": true,
                "endPointUrl": "Samples",
                "button": {
                  "icon": "event",
                  "title": {
                    "label_en": "Take Decision",
                    "label_es": "Tomar Decisión"
                  },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    {
                      "list1": {
                        "label_en": "Decision",
                        "label_es": "Decisión",
                        "items": [
                          {
                            "keyName": "ACCEPTED",
                            "keyValue_en": "Accepted",
                            "keyValue_es": "Aceptado"
                          },
                          {
                            "keyName": "ACCEPTED_WITH_RESTRICTIONS",
                            "keyValue_en": "Accepted with restrictions",
                            "keyValue_es": "Aceptado con restricciones"
                          },
                          {
                            "keyName": "REJECTED",
                            "keyValue_en": "Rejected",
                            "keyValue_es": "Rechazado"
                          }
                        ]
                      }
                    }
                  ]
                },
                "endPointParams": [
                  {
                    "argumentName": "lotName",
                    "selObjectPropertyName": "lot_name"
                  },
                  {
                    "argumentName": "bulkId",
                    "selObjectPropertyName": "id"
                  },
                  {
                    "argumentName": "lotBulkDecision",
                    "element": "list1"
                  }
                ]
              }
            ]
          },
          { "type": "cardSomeElementsRepititiveObjects", "endPointResponseObject": "sample",
            "title": {
              "label_en": "Lot Samples",
              "label_es": "Muestras del Lote"
            },
            "subtitle": {
              "label_en": "Lot Samples",
              "label_es": "Muestras del Lote"
            },
            "fieldsToDisplay": [
              {
                "name": "bulk_name",
                "label_en": "Bulk",
                "label_es": "Bulto"
              },
              {
                "name": "sample_id",
                "label_en": "Id",
                "label_es": "Id"
              },
              {
                "name": "quantity",
                "name2": "quantity_uom",
                "label_en": "Quantity",
                "label_es": "Cantidad"
              },
              {
                "name": "logged_on",
                "label_en": "Login Date",
                "label_es": "F. Registro"
              }
            ],
            "actions": [
              {
                "actionName": "GET_SAMPLE_AUDIT",
                "buttonForQuery": true,
                "requiresDialog": true,
                "endPoint": "/modulesample/SampleAPIqueries",
                "button": {
                  "icon": "rule",
                  "title": {
                    "label_en": "Sample Audit",
                    "label_es": "Auditoría de Muestra"
                  },
                  "requiresGridItemSelected": false
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
                  "requiresGridItemSelected": false
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
                    ],
                    "subViewFilter": {
                      "ER-FQ": [
                        {
                          "argumentName": "sampleAnalysisWhereFieldsName",
                          "value": "testing_group|status not in-"
                        },
                        {
                          "argumentName": "sampleAnalysisWhereFieldsValue",
                          "value": "FQ*String|REVIEWED-CANCELED*String"
                        }
                      ],
                      "ER-MB": [
                        {
                          "argumentName": "sampleAnalysisWhereFieldsName",
                          "value": "testing_group|status not in-"
                        },
                        {
                          "argumentName": "sampleAnalysisWhereFieldsValue",
                          "value": "MB*String|REVIEWED-CANCELED*String"
                        }
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
                    {
                      "argumentName": "sampleAnalysisWhereFieldsValue",
                      "value": "FQ|REVIEWED*String"
                    }
                  ],
                  "ER-MB": [
                    {
                      "argumentName": "sampleAnalysisWhereFieldsValue",
                      "value": "MB|REVIEWED*String"
                    }
                  ]
                }
              }
            ]
          },
          { "type": "readOnlyTable", "endPointResponseObject": "spec_definition",
            "endPointResponseObject2": "spec_limits",
            "columns": [
              {
                "name": "variation_name",
                "label_en": "Variation",
                "label_es": "Variación"
              },
              {
                "name": "testing_group",
                "label_en": "Testing Group",
                "label_es": "Grupo Analítico"
              },
              {
                "name": "analysis",
                "label_en": "Analysis",
                "label_es": "Análisis"
              },
              {
                "name": "method_name",
                "fix_value2_prefix": "v",
                "name2": "method_version",
                "label_en": "Method & Version",
                "label_es": "Método y Versión"
              },
              {
                "name": "rule_type",
                "label_en": "Rule",
                "label_es": "Regla"
              },
              {
                "name": "parameter",
                "label_en": "Parameter",
                "label_es": "Parámetro"
              },
              {
                "name": "pretty_spec",
                "label_en": "Specification",
                "label_es": "Especificación"
              }
            ]
          },
          {
            "type": "zzzjsonViewer",
            "endPointResponseObject": "lot_info"
          },
          {
            "type": "zzjsonViewer",
            "endPointResponseObject": "spec_definition"
          }
        ]
      },
	  { "tabLabel_en": "Certificate", "tabLabel_es": "Certificado", "view": "summary",
        "view_definition": [
          {
            "type": "coa",
			"endPointResponseObject": "lot_coa"
		  }
		]
	  },
	  { "tabLabel_en": "Inventory Retain", "tabLabel_es": "Inventario Retén", "view": "summary",
        "view_definition": [
          {
            "type": "cardSomeElementsRepititiveObjects",
            "endPointResponseObject": "inventory_retain",
            "title": {
              "label_en": "Inventory Retain",
              "label_es": "Inventario Retén"
            },
            "subtitle": {
              "label_en": "Lot Info",
              "label_es": "Información del Lote"
            },
            "fieldsToDisplay": [
              {
                "name": "quantity_items",
                "label_en": "Items",
                "label_es": "Items"
              },			
              {
                "name": "amount",
				"name2": "amount_uom",
                "label_en": "Quantity",
                "label_es": "Cantidad"
              },
              {
                "name": "quantity_items",
                "label_en": "Items",
                "label_es": "Items"
              }
            ],
            "actions": [
              {
                "actionName": "LOT_RETAIN_RECEPTION",
                "requiresDialog": true,
                "endPointUrl": "Samples",
                "button": {
                  "icon": "event",
                  "title": {
                    "label_en": "Adjust Bulk Quantity",
                    "label_es": "Ajustar Cantidad del Bulto"
                  },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    {
                      "number1": {
                        "label_en": "Quantity",
                        "label_es": "Cantidad"
                      }
                    },
                    {
                      "text1": {
                        "label_en": "uom",
                        "label_es": "Unidad Medida",
                        "optional": true
                      }
                    }
                  ]
                },
                "endPointParams": [
                  {
                    "argumentName": "lotName",
                    "selObjectPropertyName": "lot_name"
                  },
                  {
                    "argumentName": "bulkId",
                    "selObjectPropertyName": "id"
                  },
                  {
                    "argumentName": "quantity",
                    "element": "number1"
                  },
                  {
                    "argumentName": "quantityUom",
                    "element": "text1"
                  }
                ]
              },
              {
                "actionName": "LOT_RETAIN_MOVEMENT",
                "requiresDialog": true,
                "endPointUrl": "Samples",
                "button": {
                  "icon": "alarm_on",
                  "title": {
                    "label_en": "Adjust Sample Quantity",
                    "label_es": "Ajustar Cantidad de Muestra"
                  },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    {
                      "number1": {
                        "label_en": "Quantity",
                        "label_es": "Cantidad"
                      }
                    }
                  ]
                },
                "endPointParams": [
                  {
                    "argumentName": "lotName",
                    "selObjectPropertyName": "lot_name"
                  },
                  {
                    "argumentName": "bulkId",
                    "selObjectPropertyName": "id"
                  },
                  {
                    "argumentName": "quantity",
                    "element": "number1"
                  }
                ]
              },
              {
                "actionName": "LOT_RETAIN_EXTRACT",
                "requiresDialog": true,
                "endPointUrl": "Samples",
                "button": {
                  "icon": "event",
                  "title": {
                    "label_en": "Take Decision",
                    "label_es": "Tomar Decisión"
                  },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    {
                      "list1": {
                        "label_en": "Decision",
                        "label_es": "Decisión",
                        "items": [
                          {
                            "keyName": "ACCEPTED",
                            "keyValue_en": "Accepted",
                            "keyValue_es": "Aceptado"
                          },
                          {
                            "keyName": "ACCEPTED_WITH_RESTRICTIONS",
                            "keyValue_en": "Accepted with restrictions",
                            "keyValue_es": "Aceptado con restricciones"
                          },
                          {
                            "keyName": "REJECTED",
                            "keyValue_en": "Rejected",
                            "keyValue_es": "Rechazado"
                          }
                        ]
                      }
                    }
                  ]
                },
                "endPointParams": [
                  {
                    "argumentName": "lotName",
                    "selObjectPropertyName": "lot_name"
                  },
                  {
                    "argumentName": "bulkId",
                    "selObjectPropertyName": "id"
                  },
                  {
                    "argumentName": "lotBulkDecision",
                    "element": "list1"
                  }
                ]
              },
              {
                "actionName": "LOT_RETAIN_LOCK",
                "requiresDialog": true,
                "endPointUrl": "Samples",
                "button": {
                  "icon": "event",
                  "title": {
                    "label_en": "Take Decision",
                    "label_es": "Tomar Decisión"
                  },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    {
                      "list1": {
                        "label_en": "Decision",
                        "label_es": "Decisión",
                        "items": [
                          {
                            "keyName": "ACCEPTED",
                            "keyValue_en": "Accepted",
                            "keyValue_es": "Aceptado"
                          },
                          {
                            "keyName": "ACCEPTED_WITH_RESTRICTIONS",
                            "keyValue_en": "Accepted with restrictions",
                            "keyValue_es": "Aceptado con restricciones"
                          },
                          {
                            "keyName": "REJECTED",
                            "keyValue_en": "Rejected",
                            "keyValue_es": "Rechazado"
                          }
                        ]
                      }
                    }
                  ]
                },
                "endPointParams": [
                  {
                    "argumentName": "lotName",
                    "selObjectPropertyName": "lot_name"
                  },
                  {
                    "argumentName": "bulkId",
                    "selObjectPropertyName": "id"
                  },
                  {
                    "argumentName": "lotBulkDecision",
                    "element": "list1"
                  }
                ]
              },
              {
                "actionName": "LOT_RETAIN_UNLOCK",
                "requiresDialog": true,
                "endPointUrl": "Samples",
                "button": {
                  "icon": "event",
                  "title": {
                    "label_en": "Take Decision",
                    "label_es": "Tomar Decisión"
                  },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    {
                      "list1": {
                        "label_en": "Decision",
                        "label_es": "Decisión",
                        "items": [
                          {
                            "keyName": "ACCEPTED",
                            "keyValue_en": "Accepted",
                            "keyValue_es": "Aceptado"
                          },
                          {
                            "keyName": "ACCEPTED_WITH_RESTRICTIONS",
                            "keyValue_en": "Accepted with restrictions",
                            "keyValue_es": "Aceptado con restricciones"
                          },
                          {
                            "keyName": "REJECTED",
                            "keyValue_en": "Rejected",
                            "keyValue_es": "Rechazado"
                          }
                        ]
                      }
                    }
                  ]
                },
                "endPointParams": [
                  {
                    "argumentName": "lotName",
                    "selObjectPropertyName": "lot_name"
                  },
                  {
                    "argumentName": "bulkId",
                    "selObjectPropertyName": "id"
                  },
                  {
                    "argumentName": "lotBulkDecision",
                    "element": "list1"
                  }
                ]
              }
            ]
          }
		]
	  },	  
	  { "tabLabel_en": "Not Analyzed Params", "tabLabel_es": "Parametros no analizados", "view": "summary",
        "view_definition": [
          { "type": "readOnlyTable", "endPointResponseObject": "lot_not_analyzed_result",
            "title": {
              "label_en": "",
              "label_es": ""
            },
            "subtitle": {
              "label_en": "",
              "label_es": ""
            },
            "columns": [
              {
                "name": "analysis",
                "label_en": "Items",
                "label_es": "Items"
              },			
              {
                "name": "value",
				"name2": "amount_uom",
                "label_en": "Quantity",
                "label_es": "Cantidad"
              },
              {
                "name": "reason",
                "label_en": "Reason",
                "label_es": "Motivo"
              }
            ],
            "actions": [
              {
                "actionName": "LOT_ADD_NOTANALYZED_PARAM",
                "requiresDialog": true,
                "endPointUrl": "Samples",
                "button": {
                  "icon": "event",
                  "title": {
                    "label_en": "Adjust Bulk Quantity",
                    "label_es": "Ajustar Cantidad del Bulto"
                  },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    {"text1": {
                        "label_en": "Analysis",
                        "label_es": "Análisis",
                        "optional": false
                      }
                    },
                    {"text2": {
                        "label_en": "Value",
                        "label_es": "value",
                        "optional": false
                      }
                    },
                    {"text3": {
                        "label_en": "Reason",
                        "label_es": "Razón",
                        "optional": false
                      }
                    }
                  ]
                },
                "endPointParams": [
                  {
                    "argumentName": "lotName",
                    "selObjectPropertyName": "lot_name"
                  },
                  {
                    "argumentName": "analysisName",
                    "element": "text1"
                  },
                  {
                    "argumentName": "value",
                    "element": "text2"
                  },
                  {
                    "argumentName": "reason",
                    "element": "text3"
                  }
                ]
              },
              {
                "actionName": "LOT_RETAIN_UNLOCK",
                "requiresDialog": true,
                "endPointUrl": "Samples",
                "button": {
                  "icon": "event",
                  "title": {
                    "label_en": "Take Decision",
                    "label_es": "Tomar Decisión"
                  },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    {
                      "list1": {
                        "label_en": "Decision",
                        "label_es": "Decisión",
                        "items": [
                          {
                            "keyName": "ACCEPTED",
                            "keyValue_en": "Accepted",
                            "keyValue_es": "Aceptado"
                          },
                          {
                            "keyName": "ACCEPTED_WITH_RESTRICTIONS",
                            "keyValue_en": "Accepted with restrictions",
                            "keyValue_es": "Aceptado con restricciones"
                          },
                          {
                            "keyName": "REJECTED",
                            "keyValue_en": "Rejected",
                            "keyValue_es": "Rechazado"
                          }
                        ]
                      }
                    }
                  ]
                },
                "endPointParams": [
                  {
                    "argumentName": "lotName",
                    "selObjectPropertyName": "lot_name"
                  },
                  {
                    "argumentName": "bulkId",
                    "selObjectPropertyName": "id"
                  },
                  {
                    "argumentName": "lotBulkDecision",
                    "element": "list1"
                  }
                ]
              }
            ]
          }
		]
	  }
    ],
    "zzzztabs": [
      {
        "tabLabel_en": "Summary",
        "tabLabel_es": "Inicio",
        "view": "summary",
        "view_definition": [
          {
            "type": "cardSomeElementsRepititiveObjects",
            "endPointResponseObject": "lot_info",
            "title": {
              "label_en": "Lot Info",
              "label_es": "Información del Lote"
            },
            "subtitle": {
              "label_en": "Lot Info",
              "label_es": "Información del Lote"
            },
            "fieldsToDisplay": [
              {
                "name": "name",
                "label_en": "Name",
                "label_es": "Nombre"
              },
              {
                "name": "created_on",
                "label_en": "Creation D.",
                "label_es": "F. Creación"
              },
              {
                "name": "material_name",
                "label_en": "Material",
                "label_es": "Material"
              },
              {
                "name": "quantity",
                "name2": "quantity_uom",
                "label_en": "Quantity",
                "label_es": "Cantidad"
              },
              {
                "name": "num_containers",
                "label_en": "Num. Containers",
                "label_es": "Núm. Contenedores"
              },
              {
                "name": "bulk_decision",
                "name2": "bulk_decision_by",
                "name3": "bulk_decision_by",
                "label_en": "Quantity",
                "label_es": "Cantidad"
              },
              {
                "name": "sampling_plan",
                "label_en": "sampling_plan",
                "label_es": "sampling_plan"
              },
              {
                "name": "analysis_status",
                "label_en": "analysis_status",
                "label_es": "analysis_status"
              }
            ],
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
                  "requiresGridItemSelected": false
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
              }
            ]
          },
          {
            "type": "zzzjsonViewer",
            "endPointResponseObject": "lot_info"
          },
          {
            "type": "zzjsonViewer",
            "endPointResponseObject": "spec_definition"
          }
        ]
      },
      {
        "tabLabel_en": "Bulks",
        "tabLabel_es": "Bultos",
        "view": "lot-bulks",
        "view_definition": [
          {
            "type": "cardSomeElementsRepititiveObjects",
            "endPointResponseObject": "lot_bulk",
            "title": {
              "label_en": "Lot Info",
              "label_es": "Información del Lote"
            },
            "subtitle": {
              "label_en": "Lot Info",
              "label_es": "Información del Lote"
            },
            "fieldsToDisplay": [
              {
                "name": "id",
                "label_en": "Id",
                "label_es": "Id"
              },
              {
                "name": "quantity",
                "name2": "quantity_uom",
                "label_en": "Quantity",
                "label_es": "Cantidad"
              },
              {
                "name": "sample_quantity",
                "name2": "sample_quantity_uom",
                "label_en": "Sample Quantity",
                "label_es": "Cantidad de Muestra"
              },
              {
                "name": "decision",
                "label_en": "Decision",
                "label_es": "Decisión"
              }
            ],
            "actions": [
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
                  "requiresGridItemSelected": false
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
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    {
                      "datetime1": {
                        "label_en": "new Date",
                        "label_es": "Nueva Fecha"
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
                    "element": "datetime1",
                    "selObjectPropertyName": "sampling_date"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "tabLabel_en": "Samples",
        "tabLabel_es": "Muestras",
        "view": "lot-samples"
      },
      {
        "tabLabel_en": "CoA Preview",
        "Previa CdA": "Muestras",
        "view": "lot-coa"
      },
      {
        "tabLabel_en": "Parameter Limits",
        "tabLabel_es": "Límites",
        "view": "parameter-limits",
        "view_definition": [
          {
            "type": "readOnlyTable",
            "endPointResponseObject": "spec_definition",
            "endPointResponseObject2": "spec_limits",
            "columns": [
              {
                "name": "rule",
                "label_en": "Rule",
                "label_es": "Regla"
              },
              {
                "name": "method_and_version",
                "label_en": "Method & Version",
                "label_es": "Método y Versión"
              },
              {
                "name": "analysis",
                "label_en": "Analysis",
                "label_es": "Análisis"
              },
              {
                "name": "parameter",
                "label_en": "Parameter",
                "label_es": "Parámetro"
              },
              {
                "name": "variation",
                "label_en": "Variation",
                "label_es": "Variación"
              },
              {
                "name": "testing_group",
                "label_en": "Testing Group",
                "label_es": "Grupo Analítico"
              }
            ]
          },
          {
            "type": "zzzjsonViewer",
            "endPointResponseObject": "spec_definition"
          },
          {
            "type": "zzzgrid",
            "title": {
              "label_en": "Info Matching Selection Criteria",
              "label_es": "Información cumpliendo el criterio de selección"
            },
            "elementName": "spec_limits",
            "endPointResponseObject": "spec_definition",
            "endPointResponseObject2": "spec_limits",
            "fieldsToDisplay": [
              {
                "property": "method_name",
                "header": "Method"
              }
            ]
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
        "sample_id": {
          "label_en": "Sample ID",
          "label_es": "ID Muestra",
          "sort": true,
          "filter": false
        },
        "lot_name": {
          "label_en": "Lot",
          "label_es": "Lote",
          "filter": true
        },
        "bulk_name": {
          "label_en": "Bulk",
          "label_es": "Bulto",
          "filter": true
        },
        "volume": {
          "label_en": "Volume",
          "label_es": "Volumen",
          "sort": true,
          "filter": false
        },
        "volume_uom": {
          "label_en": "UOM",
          "label_es": "UDM",
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
      "actionName": "SAMPLES_INPROGRESS_LIST",
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
        },
        {
          "argumentName": "whereFieldsName",
          "value": "status in-"
        },
        {
          "argumentName": "whereFieldsValue",
          "value": "LOGGED-RECEIVED-INCOMPLETE-COMPLETE*String"
        },
        {
          "argumentName": "addSampleAnalysisFieldToRetrieve",
          "value": "method_name|testing_group"
        },
        {
          "argumentName": "addSampleAnalysis",
          "value": false
        },
        {
          "argumentName": "addSampleAnalysisResult",
          "value": false
        },
        {
          "argumentName": "includeOnlyIfResultsInProgress",
          "value": true
        }
      ],
      "subViewFilter": {
        "ER-FQ": [
          {
            "argumentName": "sampleAnalysisWhereFieldsName",
            "value": "testing_group|status not in-"
          },
          {
            "argumentName": "sampleAnalysisWhereFieldsValue",
            "value": "FQ*String|REVIEWED-CANCELED*String"
          }
        ],
        "ER-MB": [
          {
            "argumentName": "sampleAnalysisWhereFieldsName",
            "value": "testing_group|status not in-"
          },
          {
            "argumentName": "sampleAnalysisWhereFieldsValue",
            "value": "MB*String|REVIEWED-CANCELED*String"
          }
        ]
      }
    },
    "actions": [
      {
        "actionName": "GET_SAMPLE_AUDIT",
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
        "actionName": "SAMPLEANALYSISADD",
        "buttonForQuery": false,
        "requiresDialog": true,        
        "button": {
          "icon": "add_task",
          "title": {
            "label_en": "Add Analysis",
            "label_es": "Añadir Ensayo"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
			{"argumentName": "sampleId", "selObjectPropertyName": "sample_id"},
			{"argumentName": "analysis", "addToFieldNameAndValue": true, "fieldType": "STRING", "notAddWhenValueIsBlank":true, "getFromGrid": true},
			{"argumentName": "method_name", "addToFieldNameAndValue": true, "fieldType": "STRING", "notAddWhenValueIsBlank":true, "getFromGrid": true},
			{"argumentName": "method_version", "addToFieldNameAndValue": true, "fieldType": "INTEGER", "notAddWhenValueIsBlank":true, "getFromGrid": true}
        ],
        "dialogInfo": {
			"name": "genericDialog",
			"gridContent": true,
			"masterDataEntryName": "analysis_method",
			"langConfig": {
				"gridHeader": [
					{"fldName": "analysis", "label_en": "Analysis", "label_es": "Ensayo", "width": "40%",
					  "sort": false, "filter": true, "align": "left"},
					{"fldName": "method_name", "label_en": "Method", "label_es": "Método", "width": "40%",
					  "sort": true,"filter": false},
					{"fldName": "method_version", "label_en": "Version", "label_es": "Versión", "width": "20%",
					  "sort": true, "filter": false}			
				]
			},
			"automatic": true
        }
      },
      {
        "actionName": "SAMPLEANALYSISREMOVE",
        "buttonForQuery": false,
        "requiresDialog": true,        
        "button": {
          "icon": "remove_done",
          "title": {
            "label_en": "Remove Analysis",
            "label_es": "Borrar Ensayo"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
			{"argumentName": "testId", "selObjectPropertyName": "test_id", "getFromGrid": true},
			{"argumentName": "analysis", "addToFieldNameAndValue": true, "fieldType": "STRING", "notAddWhenValueIsBlank":true, "getFromGrid": true},
			{"argumentName": "method_name", "addToFieldNameAndValue": true, "fieldType": "STRING", "notAddWhenValueIsBlank":true, "getFromGrid": true},
			{"argumentName": "method_version", "addToFieldNameAndValue": true, "fieldType": "INTEGER", "notAddWhenValueIsBlank":true, "getFromGrid": true}
        ],
        "dialogInfo": {
			"name": "genericDialog",
			"gridContent": true,
			"dialogQuery": {
				"actionName": "GET_SAMPLE_ANALYSIS_LIST",
				"variableForData": "",
				"endPointParams": [
				  {"argumentName": "sampleId", "internalVariableObjName": "selectedItems", "internalVariableObjProperty":"sample_id"}
				],
				"subViewFilter": {
					"ER-FQ": [
					],
					"ER-MB": [
					]
				}
			},					
			"langConfig": {
				"gridHeader": [
					{"fldName": "analysis", "label_en": "Analysis", "label_es": "Ensayo", "width": "40%",
					  "sort": false, "filter": true, "align": "left"},
					{"fldName": "method_name", "label_en": "Method", "label_es": "Método", "width": "40%",
					  "sort": true,"filter": false},
					{"fldName": "method_version", "label_en": "Version", "label_es": "Versión", "width": "20%",
					  "sort": true, "filter": false}			
				]
			},
			"automatic": true
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
            ],
            "subViewFilter": {
              "ER-FQ": [
                {
                  "argumentName": "sampleAnalysisWhereFieldsName",
                  "value": "testing_group|status not in-"
                },
                {
                  "argumentName": "sampleAnalysisWhereFieldsValue",
                  "value": "FQ*String|REVIEWED-CANCELED*String"
                }
              ],
              "ER-MB": [
                {
                  "argumentName": "sampleAnalysisWhereFieldsName",
                  "value": "testing_group|status not in-"
                },
                {
                  "argumentName": "sampleAnalysisWhereFieldsValue",
                  "value": "MB*String|REVIEWED-CANCELED*String"
                }
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
            {
              "argumentName": "sampleAnalysisWhereFieldsValue",
              "value": "FQ|REVIEWED*String"
            }
          ],
          "ER-MB": [
            {
              "argumentName": "sampleAnalysisWhereFieldsValue",
              "value": "MB|REVIEWED*String"
            }
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
        "lot_name": {
          "label_en": "Lot",
          "label_es": "Lote",
          "sort": true,
          "filter": false
        },
        "bulk_name": {
          "label_en": "Bulk",
          "label_es": "Bulto",
          "sort": true,
          "filter": false
        },
        "volume": {
          "label_en": "Volume",
          "label_es": "Volumen",
          "sort": true,
          "filter": false
        },
        "volume_uom": {
          "label_en": "UOM",
          "label_es": "UDM",
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
      "endPointUrl": "/moduleenvmon/EnvMonSampleAPIqueries",
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
          "value": "ALL"
        }
      ],
      "subViewFilter": {
        "RT-FQ": [
          {
            "argumentName": "sampleAnalysisWhereFieldsName",
            "value": "testing_group|status not in"
          },
          {
            "argumentName": "sampleAnalysisWhereFieldsValue",
            "value": "FQ*String|REVIEWED*String"
          }
        ],
        "RT-MB": [
          {
            "argumentName": "sampleAnalysisWhereFieldsName",
            "value": "testing_group|status not in"
          },
          {
            "argumentName": "sampleAnalysisWhereFieldsValue",
            "value": "MB*String|REVIEWED*String"
          }
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
        "lot_name": {
          "label_en": "Lot",
          "label_es": "Lote",
          "sort": true,
          "filter": false
        },
        "bulk_name": {
          "label_en": "Bulk",
          "label_es": "Bulto",
          "sort": true,
          "filter": false
        },
        "volume": {
          "label_en": "Volume",
          "label_es": "Volumen",
          "sort": true,
          "filter": false
        },
        "volume_uom": {
          "label_en": "UOM",
          "label_es": "UDM",
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
      "endPointUrl": "/moduleenvmon/EnvMonSampleAPIqueries",
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
          {
            "argumentName": "testingGroup",
            "value": "FQ"
          }
        ],
        "RTG-MB": [
          {
            "argumentName": "testingGroup",
            "value": "MB"
          }
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
            {
              "argumentName": "sampleAnalysisWhereFieldsValue",
              "value": "FQ|REVIEWED*String"
            }
          ],
          "ER-MB": [
            {
              "argumentName": "sampleAnalysisWhereFieldsValue",
              "value": "MB|REVIEWED*String"
            }
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
        "lot_name": {
          "label_en": "Lot",
          "label_es": "Lote",
          "sort": true,
          "filter": false
        },
        "bulk_name": {
          "label_en": "Bulk",
          "label_es": "Bulto",
          "sort": true,
          "filter": false
        },
        "volume": {
          "label_en": "Volume",
          "label_es": "Volumen",
          "sort": true,
          "filter": false
        },
        "volume_uom": {
          "label_en": "UOM",
          "label_es": "UDM",
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
      "actionName": "SAMPLES_PENDING_SAMPLE_REVISION",
      "endPointUrl": "/moduleenvmon/EnvMonSampleAPIqueries",
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
        },
        {
          "argumentName": "whereFieldsValue",
          "value": "RECEIVED-INCOMPLETE-COMPLETE*String"
        },
        {
          "argumentName": "whereFieldsName",
          "value": "status in-"
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
        "actionName": "CANCELSAMPLE",
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
            {
              "argumentName": "sampleAnalysisWhereFieldsValue",
              "value": "FQ|REVIEWED*String"
            }
          ],
          "ER-MB": [
            {
              "argumentName": "sampleAnalysisWhereFieldsValue",
              "value": "MB|REVIEWED*String"
            }
          ]
        }
      }
    ]
  },
  "lotsPendingUsageDecision": {
    "component": "TableWithButtons",
    "langConfig": {
      "title": {
        "lotsPendingUsageDecision": {
          "label_en": "Pending Usage Decision",
          "label_es": "Pendientes Decisión de Uso"
        }
      },
      "gridHeader": {
        "name": {
          "label_en": "Name",
          "label_es": "Nombre",
          "width": "80%",
          "sort": false,
          "filter": true,
          "align": "left"
        },
        "spec_code": {
          "label_en": "Specification",
          "label_es": "Especificación",
          "width": "20%",
          "sort": true,
          "filter": false
        },
        "inventory_management": {
          "label_en": "Inventory Management?",
          "label_es": "¿Gestionar inventario?",
          "width": "20%",
          "sort": true,
          "filter": false
        },
        "perform_bulk_control": {
          "label_en": "Perform Bulk Control?",
          "label_es": "¿Inspección de Bultos?",
          "width": "20%",
          "sort": true,
          "filter": false
        },
        "allow_adhoc_bulk_addition": {
          "label_en": "Allow add adhoc bulks?",
          "label_es": "¿Permitir añadir Bultos adhoc?",
          "width": "20%",
          "sort": true,
          "filter": false
        },
        "sampling_algorithm": {
          "label_en": "Sampling algorithm",
          "label_es": "Algoritmo de muestras",
          "width": "20%",
          "sort": true,
          "filter": false
        }
        
      }
    },
    "viewQuery": {
      "actionName": "GET_LOTS_PENDING_USAGE_DECISION",
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
		"actionName": "LOT_TAKE_USAGE_DECISION",
		"requiresDialog": true,
		"endPointUrl": "Samples",
		"button": {
		  "icon": "event",
		  "title": {
			"label_en": "Take Usage Decision",
			"label_es": "Tomar Decisión de uso"
		  },
		  "requiresGridItemSelected": false
		},
		"dialogInfo": {
		  "name": "genericDialog",
		  "fields": [
			{
			  "list1": {
				"label_en": "Decision",
				"label_es": "Decisión",
				"items": [
				  {
					"keyName": "ACCEPTED",
					"keyValue_en": "Accepted",
					"keyValue_es": "Aceptado"
				  },
				  {
					"keyName": "ACCEPTED_WITH_RESTRICTIONS",
					"keyValue_en": "Accepted with restrictions",
					"keyValue_es": "Aceptado con restricciones"
				  },
				  {
					"keyName": "REJECTED",
					"keyValue_en": "Rejected",
					"keyValue_es": "Rechazado"
				  }
				]
			  }
			}
		  ]
		},
		"endPointParams": [
		  {
			"argumentName": "lotName",
			"selObjectPropertyName": "name"
		  },
		  {
			"argumentName": "lotUsageDecision",
			"element": "list1"
		  }
		]
	  }
    ]
  },
  "DataMining": {
    "component": "DataMining",
    "tabs": [
      {
        "action": "QUERY_READING_OUT_OF_RANGE",
        "label_en": "Readings out of range",
        "label_es": "Lecturas fuera de rango",
        "endPoint": "/moduleenvmon/EnvMonAPIstats",
        "filter": {
          "fixParams": {
            "sampleGroups": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|spec_eval*counter_range_eval|has_invest*counter_investigations|has_pre_invest, has_invest*counter_pre_and_invest"
          },
          "filterFields": [
            {
              "text1": {
                "label_en": "Program",
                "label_es": "Programa",
                "default_value": ""
              }
            },
            {
              "text2": {
                "label_en": "Location",
                "label_es": "Ubicación",
                "default_value": ""
              }
            },
            {
              "text3": {
                "label_en": "Area",
                "label_es": "Area",
                "default_value": ""
              }
            },
            {
              "daterange1": {
                "dateStart": {
                  "label_en": "Sampling Start Date",
                  "label_es": "Fecha Inicio Muestreo",
                  "default_value": ""
                },
                "dateEnd": {
                  "label_en": "Sampling End Date",
                  "label_es": "Fecha Fin Muestreo",
                  "default_value": ""
                }
              }
            },
            {
              "checkbox1": {
                "label_en": "Exclude Readings Not Entered Yet",
                "label_es": "Excluir Lecturas no entradas aún",
                "default_value": true
              }
            },
            {
              "number1": {
                "label_en": "Only readings Equal to",
                "label_es": "Solo las lecturas igual a",
                "default_value": ""
              }
            },
            {
              "number2": {
                "label_en": "Only readings Greater than",
                "label_es": "Solo las lecturas Mayores a",
                "default_value": ""
              }
            },
            {
              "number3": {
                "label_en": "Only readings Less than",
                "label_es": "Solo las lecturas Menores a",
                "default_value": ""
              }
            },
            {
              "checkbox4": {
                "label_en": "Include Microorganisms",
                "label_es": "Incluir Microorganismos",
                "default_value": false
              }
            },
            {
              "text4": {
                "label_en": "Microorganisms to find",
                "label_es": "Microorganismos a encontrar",
                "default_value": ""
              }
            }
          ],
          "extraParams": [
            {
              "argumentName": "programName",
              "element": "text1"
            },
            {
              "argumentName": "locationName",
              "element": "text2"
            },
            {
              "argumentName": "area",
              "element": "text3"
            },
            {
              "argumentName": "excludeReadingNotEntered",
              "element": "checkbox1"
            },
            {
              "argumentName": "samplingDayStart",
              "element": "daterange1dateStart"
            },
            {
              "argumentName": "samplingDayEnd",
              "element": "daterange1dateEnd"
            },
            {
              "argumentName": "readingEqual",
              "element": "number1"
            },
            {
              "argumentName": "readingMin",
              "element": "number2"
            },
            {
              "argumentName": "readingMax",
              "element": "number3"
            },
            {
              "argumentName": "includeMicroorganisms",
              "element": "checkbox4"
            },
            {
              "argumentName": "MicroorganismsToFind",
              "element": "text4"
            }
          ]
        },
        "printable": true,
        "download": {
          "active": true,
          "elements": [
            {
              "elementName": "datatable"
            }
          ]
        },
        "reportElements": [
          [
            {
              "type": "reportTitle",
              "title": {
                "label_en": "Readings Out of Range",
                "label_es": "Lecturas Fuera de Rango Permitido"
              }
            }
          ],
          [
            {
              "type": "cardSomeElementsRepititiveObjects",
              "title": {
                "label_en": "Information",
                "label_es": "Información"
              },
              "elementName": "production_lot",
              "subheadingObj": "text1"
            }
          ],
          [
            {
              "type": "chart",
              "elementName": "counter_range_eval",
              "display_chart": true,
              "chart_type": "pie",
              "chart_name": "counter_range_eval",
              "chart_title": {
                "label_en": "Per out of range type",
                "label_es": "Por tipo de fuera de rango"
              },
              "counter_field_name": "count",
              "counterLimits": {
                "xmin_allowed": 3,
                "xmin_allowed_included": 3,
                "xmax_allowed": 100,
                "xmax_allowed_included": 100,
                "xvalue": 0
              },
              "chartStyle": {
                "backgroundColor": "transparent",
                "is3D": true,
                "colors": [
                  "#dfa942",
                  "#d33737",
                  "#bf120f"
                ]
              },
              "grouper_field_name": "spec_eval",
              "label_values_replacement": {
                "inAlertMax": {
                  "label_es": "Por Encima del límite de alerta",
                  "label_en": "Over the Alert limit"
                },
                "outOfSpecMax": {
                  "label_es": "Fuera de Rango",
                  "label_en": "Over the Range"
                },
                "outOfSpecMaxStrict": {
                  "label_es": "Fuera de Rango",
                  "label_en": "Over the Range"
                }
              },
              "grouper_exclude_items": [
                "xxxxoutOfSpecMax",
                "Samplingzz",
                "Incubationzz",
                "PlateReadingzz",
                "MicroorganismIdentificationzz",
                "zz",
                "END"
              ],
              "label_item": {
                "label_en": "Statussss",
                "label_es": "Estado"
              },
              "label_value": {
                "label_en": "#",
                "label_es": "#"
              }
            },
            {
              "type": "chart",
              "elementName": "counter_by_area_spec_tmp",
              "display_chart": true,
              "chart_type": "pie",
              "chart_name": "counter_by_area_spec_tmp",
              "chart_title": {
                "label_en": "Per Area and Spec",
                "label_es": "Por Area y Especificación"
              },
              "counter_field_name": "count",
              "counterLimits": {
                "xmin_allowed": 3,
                "xmin_allowed_included": 3,
                "xmax_allowed": 100,
                "xmax_allowed_included": 100,
                "xvalue": 0
              },
              "chartStyle": {
                "backgroundColor": "transparent",
                "is3D": true,
                "colors": [
                  "#1b7fcc",
                  "#5fbd5f",
                  "#bf120f"
                ]
              },
              "grouper_field_name": "sample_config_code",
              "label_values_replacement": {
                "prog_pers_template": {
                  "label_es": "Personal",
                  "label_en": "Personnel"
                },
                "program_smp_template": {
                  "label_es": "Muestras",
                  "label_en": "Samples"
                },
                "outOfSpecMaxStrict": {
                  "label_es": "Fuera de Rango",
                  "label_en": "Over the Range"
                }
              },
              "grouper_exclude_items": [
                "xxxxoutOfSpecMax",
                "Samplingzz",
                "Incubationzz",
                "PlateReadingzz",
                "MicroorganismIdentificationzz",
                "zz",
                "END"
              ],
              "label_item": {
                "label_en": "Statussss",
                "label_es": "Estado"
              },
              "label_value": {
                "label_en": "#",
                "label_es": "#"
              }
            }
          ],
          [
            {
              "type": "grid",
              "title": {
                "label_en": "Info Matching Selection Criteria",
                "label_es": "Información cumpliendo el criterio de selección"
              },
              "elementName": "datatable",
              "fieldsToDisplay": [
                {
                  "property": "program_name",
                  "header": "Program"
                },
                {
                  "property": "location_name",
                  "header": "Location"
                },
                {
                  "property": "area",
                  "header": "Area"
                },
                {
                  "property": "shift",
                  "header": "shift"
                },
                {
                  "property": "sampling_date",
                  "header": "Sampling Date"
                },
                {
                  "property": "raw_value_num",
                  "header": "Value"
                },
                {
                  "property": "spec_eval_detail",
                  "header": "Spec Eval"
                }
              ]
            }
          ]
        ]
      },
      {
        "action": "KPI_PRODUCTION_LOT_SAMPLES",
        "label_en": "Production Lot Samples",
        "label_es": "Muestras por Lote de Producción",
        "endPoint": "/moduleenvmon/EnvMonAPIstats",
        "filter": {
          "filterFields": [
            {
              "daterange1": {
                "dateStart": {
                  "label_en": "Sampling Start Date",
                  "label_es": "Fecha Inicio Muestreo",
                  "default_value": ""
                },
                "dateEnd": {
                  "label_en": "Sampling End Date",
                  "label_es": "Fecha Fin Muestreo",
                  "default_value": ""
                }
              }
            },
            {
              "text1": {
                "label_en": "Lot Name",
                "label_es": "Lote",
                "default_value": "20220202"
              }
            },
            {
              "text2": {
                "label_en": "Program",
                "label_es": "Programa",
                "default_value": ""
              }
            },
            {
              "text3": {
                "label_en": "Location",
                "label_es": "Ubicación",
                "default_value": ""
              }
            },
            {
              "text4": {
                "label_en": "Area",
                "label_es": "Area",
                "default_value": ""
              }
            },
            {
              "checkbox1": {
                "label_en": "Exclude Personal",
                "label_es": "Excluir Personal",
                "default_value": true
              }
            },
            {
              "checkbox2": {
                "label_en": "Exclude Readings Not Entered Yet",
                "label_es": "Excluir Lecturas no entradas aún",
                "default_value": true
              }
            },
            {
              "number1": {
                "label_en": "Only readings Equal to",
                "label_es": "Solo las lecturas igual a",
                "default_value": ""
              }
            },
            {
              "number2": {
                "label_en": "Only readings Greater than",
                "label_es": "Solo las lecturas Mayores a",
                "default_value": ""
              }
            },
            {
              "number3": {
                "label_en": "Only readings Less than",
                "label_es": "Solo las lecturas Menores a",
                "default_value": ""
              }
            },
            {
              "checkbox3": {
                "label_en": "Include Microorganisms",
                "label_es": "Incluir Microorganismos",
                "default_value": false
              }
            },
            {
              "text5": {
                "label_en": "Microorganisms to find",
                "label_es": "Microorganismos a encontrar",
                "default_value": ""
              }
            }
          ],
          "endPointParams": [
            {
              "argumentName": "lotName",
              "element": "text1",
              "notAddWhenValueIsBlank": true
            },
            {
              "argumentName": "programName",
              "element": "text2",
              "notAddWhenValueIsBlank": true
            },
            {
              "argumentName": "locationName",
              "element": "text3",
              "notAddWhenValueIsBlank": true
            },
            {
              "argumentName": "area",
              "element": "text4",
              "notAddWhenValueIsBlank": true
            },
            {
              "argumentName": "excludeSamplerSamples",
              "element": "checkbox1",
              "notAddWhenValueIsBlank": true
            },
            {
              "argumentName": "excludeReadingNotEntered",
              "element": "checkbox2",
              "notAddWhenValueIsBlank": true
            },
            {
              "argumentName": "samplingDayStart",
              "element": "daterange1dateStart",
              "notAddWhenValueIsBlank": true
            },
            {
              "argumentName": "samplingDayEnd",
              "element": "daterange1dateEnd",
              "notAddWhenValueIsBlank": true
            },
            {
              "argumentName": "readingEqual",
              "element": "number1",
              "notAddWhenValueIsBlank": true
            },
            {
              "argumentName": "readingMin",
              "element": "number2",
              "notAddWhenValueIsBlank": true
            },
            {
              "argumentName": "readingMax",
              "element": "number3",
              "notAddWhenValueIsBlank": true
            },
            {
              "argumentName": "includeMicroorganisms",
              "element": "checkbox3",
              "notAddWhenValueIsBlank": true
            },
            {
              "argumentName": "MicroorganismsToFind",
              "element": "text5",
              "notAddWhenValueIsBlank": true
            }
          ]
        },
        "reportElements": [
          [
            {
              "type": "reportTitle",
              "title": {
                "label_en": "Production Lot",
                "label_es": "Lote de Producción"
              },
              "style": "color:blue"
            }
          ],
          [
            {
              "type": "cardSomeElementsRepititiveObjects",
              "title": {
                "label_en": "Information",
                "label_es": "Información"
              },
              "elementName": "production_lot",
              "subheadingObj": "text1"
            }
          ],
          [
            {
              "type": "recovery_rate"
            }
          ],
          [
            {
              "type": "grid",
              "title": {
                "label_en": "Info Matching Selection Criteria",
                "label_es": "Información cumpliendo el criterio de selección"
              },
              "elementName": "datatable",
              "fieldsToDisplay": [
                {
                  "property": "program_name",
                  "header": "Program"
                },
                {
                  "property": "location_name",
                  "header": "Location"
                },
                {
                  "property": "area",
                  "header": "Area"
                },
                {
                  "property": "shift",
                  "header": "shift"
                },
                {
                  "property": "sampling_date",
                  "header": "Sampling Date"
                },
                {
                  "property": "raw_value_num",
                  "header": "Value"
                },
                {
                  "property": "spec_eval_detail",
                  "header": "Spec Eval"
                }
              ]
            }
          ]
        ]
      },
      {
        "action": "RECOVERY_RATE",
        "label_en": "Recovery Rate",
        "label_es": "Recovery Rate",
        "endPoint": "/moduleenvmon/EnvMonAPIstats",
        "filter": {
          "filterFields": [
            {
              "checkbox1": {
                "label_en": "Show Row Totals",
                "label_es": "Mostrar Totales",
                "default_value": true
              }
            },
            {
              "checkbox2": {
                "label_en": "Show Absences",
                "label_es": "Mostrar Ausencias",
                "default_value": true
              }
            },
            {
              "checkbox3": {
                "label_en": "Show Presences",
                "label_es": "Mostrar Presencias",
                "default_value": true
              }
            },
            {
              "checkbox4": {
                "label_en": "Show INs",
                "label_es": "Mostrar INs",
                "default_value": true
              }
            },
            {
              "checkbox5": {
                "label_en": "Show OUTs",
                "label_es": "Mostrar OUTs",
                "default_value": true
              }
            },
            {
              "number1": {
                "label_en": "Perc Num Decs",
                "label_es": "Num Decimales Perc",
                "default_value": 2
              }
            }
          ],
          "endPointParams": [
            {
              "argumentName": "fieldsToRetrieveOrGrouping",
              "fixValue": "program_name|location_name"
            },
            {
              "argumentName": "whereFieldsName",
              "fixValue": "sample_config_code|program_name"
            },
            {
              "argumentName": "whereFieldsValue",
              "fixValue": "program_smp_template*STRING|LlenadoVialesFA2018*STRING"
            },
            {
              "argumentName": "showRowTotal",
              "element": "checkbox1"
            },
            {
              "argumentName": "showAbsence",
              "element": "checkbox2"
            },
            {
              "argumentName": "showPresence",
              "element": "checkbox3"
            },
            {
              "argumentName": "showIN",
              "element": "checkbox4"
            },
            {
              "argumentName": "showOUT",
              "element": "checkbox5"
            },
            {
              "argumentName": "percNumDecimals",
              "element": "number1"
            }
          ]
        },
        "printable": true,
        "download": {
          "active": true,
          "elements": [
            {
              "elementName": "recovery_rate",
              "header": "columns_data",
              "values": "data"
            }
          ]
        },
        "reportElements": [
          [
            {
              "type": "reportTitle",
              "title": {
                "label_en": "Recovery Rate",
                "label_es": "Recovery Rate"
              },
              "style": "color:blue"
            }
          ],
          [
            {
              "type": "recovery_rate"
            }
          ]
        ]
      },
      {
        "action": "QUERY_SAMPLING_HISTORY",
        "label_en": "Sampling History",
        "label_es": "Histórico de muestreos",
        "endPoint": "/moduleenvmon/EnvMonAPIstats",
        "filter": {
          "fixParams": {
            "sampleGroups": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|area*counter_by_area|has_pre_invest*counter_out|spec_eval*counter_range_eval|has_invest*counter_investigations|has_pre_invest, has_invest*counter_pre_and_invest"
          },
          "filterFields": [
            {
              "text1": {
                "label_en": "Lot Name",
                "label_es": "Lote",
                "default_value": "20220202"
              }
            },
            {
              "text2": {
                "label_en": "Program",
                "label_es": "Programa",
                "default_value": ""
              }
            },
            {
              "text3": {
                "label_en": "Location",
                "label_es": "Ubicación",
                "default_value": ""
              }
            },
            {
              "text4": {
                "label_en": "Area",
                "label_es": "Area",
                "default_value": ""
              }
            },
            {
              "checkbox1": {
                "label_en": "Include Samples",
                "label_es": "Incluir Muestreo Ubicaciones",
                "default_value": true
              }
            },
            {
              "checkbox2": {
                "label_en": "Include Sampler Samples",
                "label_es": "Incluir Muestreos de Personal",
                "default_value": false
              }
            },
            {
              "daterange1": {
                "dateStart": {
                  "label_en": "Sampling Start Date",
                  "label_es": "Fecha Inicio Muestreo",
                  "default_value": ""
                },
                "dateEnd": {
                  "label_en": "Sampling End Date",
                  "label_es": "Fecha Fin Muestreo",
                  "default_value": ""
                }
              }
            },
            {
              "daterange2": {
                "dateStart": {
                  "label_en": "Login Start Date",
                  "label_es": "Fecha Inicio Creación Muestra",
                  "default_value": ""
                },
                "dateEnd": {
                  "label_en": "Login End Date",
                  "label_es": "Fecha Fin Creación Muestra",
                  "default_value": ""
                }
              }
            },
            {
              "checkbox3": {
                "label_en": "Exclude Readings Not Entered Yet",
                "label_es": "Excluir Lecturas no entradas aún",
                "default_value": true
              }
            },
            {
              "number1": {
                "label_en": "Only readings Equal to",
                "label_es": "Solo las lecturas igual a",
                "default_value": ""
              }
            },
            {
              "number2": {
                "label_en": "Only readings Greater than",
                "label_es": "Solo las lecturas Mayores a",
                "default_value": ""
              }
            },
            {
              "number3": {
                "label_en": "Only readings Less than",
                "label_es": "Solo las lecturas Menores a",
                "default_value": ""
              }
            },
            {
              "checkbox4": {
                "label_en": "Include Microorganisms",
                "label_es": "Incluir Microorganismos",
                "default_value": false
              }
            },
            {
              "text5": {
                "label_en": "Microorganisms to find",
                "label_es": "Microorganismos a encontrar",
                "default_value": ""
              }
            }
          ],
          "extraParams": [
            {
              "argumentName": "lotName",
              "element": "text1"
            },
            {
              "argumentName": "programName",
              "element": "text2"
            },
            {
              "argumentName": "locationName",
              "element": "text3"
            },
            {
              "argumentName": "area",
              "element": "text4"
            },
            {
              "argumentName": "includeSamples",
              "element": "checkbox1"
            },
            {
              "argumentName": "includeSamplerSamples",
              "element": "checkbox2"
            },
            {
              "argumentName": "excludeReadingNotEntered",
              "element": "checkbox3"
            },
            {
              "argumentName": "samplingDayStart",
              "element": "daterange1dateStart"
            },
            {
              "argumentName": "samplingDayEnd",
              "element": "daterange1dateEnd"
            },
            {
              "argumentName": "loginDayStart",
              "element": "daterange2dateStart"
            },
            {
              "argumentName": "loginDayEnd",
              "element": "daterange2dateEnd"
            },
            {
              "argumentName": "readingEqual",
              "element": "number1"
            },
            {
              "argumentName": "readingMin",
              "element": "number2"
            },
            {
              "argumentName": "readingMax",
              "element": "number3"
            },
            {
              "argumentName": "includeMicroorganisms",
              "element": "checkbox4"
            },
            {
              "argumentName": "MicroorganismsToFind",
              "element": "text5"
            }
          ]
        },
        "reportElements": [
          [
            {
              "type": "reportTitle",
              "title": {
                "label_en": "Sampling History",
                "label_es": "Histórico de muestreos"
              }
            }
          ],
          [
            {
              "type": "cardSomeElementsRepititiveObjects",
              "title": {
                "label_en": "Information",
                "label_es": "Información"
              },
              "elementName": "production_lot",
              "subheadingObj": "text1"
            }
          ],
          [
            {
              "type": "chart",
              "elementName": "counter_range_eval",
              "display_chart": true,
              "chart_type": "pie",
              "chart_name": "counter_range_eval",
              "chart_title": {
                "label_en": "Per out of range type",
                "label_es": "Por tipo de fuera de rango"
              },
              "counter_field_name": "count",
              "counterLimits": {
                "xmin_allowed": 3,
                "xmin_allowed_included": 3,
                "xmax_allowed": 100,
                "xmax_allowed_included": 100,
                "xvalue": 0
              },
              "chartStyle": {
                "backgroundColor": "transparent",
                "is3D": true,
                "colors": [
                  "#dfa942",
                  "#d33737",
                  "#bf120f"
                ]
              },
              "grouper_field_name": "spec_eval",
              "label_values_replacement": {
                "IN": {
                  "label_es": "In Range",
                  "label_en": "Dentro de Range"
                },
                "inAlertMax": {
                  "label_es": "Por Encima del límite de alerta",
                  "label_en": "Over the Alert limit"
                },
                "outOfSpecMax": {
                  "label_es": "Fuera de Rango",
                  "label_en": "Over the Range"
                },
                "outOfSpecMaxStrict": {
                  "label_es": "Fuera de Rango",
                  "label_en": "Over the Range"
                }
              },
              "grouper_exclude_items": [
                "xxxxoutOfSpecMax",
                "Samplingzz",
                "Incubationzz",
                "PlateReadingzz",
                "MicroorganismIdentificationzz",
                "zz",
                "END"
              ],
              "label_item": {
                "label_en": "Statussss",
                "label_es": "Estado"
              },
              "label_value": {
                "label_en": "#",
                "label_es": "#"
              }
            },
            {
              "type": "chart",
              "elementName": "counter_by_area_spec_tmp",
              "display_chart": true,
              "chart_type": "pie",
              "chart_name": "counter_by_area_spec_tmp",
              "chart_title": {
                "label_en": "Per Area and Spec",
                "label_es": "Por Area y Especificación"
              },
              "counter_field_name": "count",
              "counterLimits": {
                "xmin_allowed": 3,
                "xmin_allowed_included": 3,
                "xmax_allowed": 100,
                "xmax_allowed_included": 100,
                "xvalue": 0
              },
              "chartStyle": {
                "backgroundColor": "transparent",
                "is3D": true,
                "colors": [
                  "#1b7fcc",
                  "#5fbd5f",
                  "#bf120f"
                ]
              },
              "grouper_field_name": "sample_config_code",
              "label_values_replacement": {
                "prog_pers_template": {
                  "label_es": "Personal",
                  "label_en": "Personnel"
                },
                "program_smp_template": {
                  "label_es": "Muestras",
                  "label_en": "Samples"
                },
                "outOfSpecMaxStrict": {
                  "label_es": "Fuera de Rango",
                  "label_en": "Over the Range"
                }
              },
              "grouper_exclude_items": [
                "xxxxoutOfSpecMax",
                "Samplingzz",
                "Incubationzz",
                "PlateReadingzz",
                "MicroorganismIdentificationzz",
                "zz",
                "END"
              ],
              "label_item": {
                "label_en": "Statussss",
                "label_es": "Estado"
              },
              "label_value": {
                "label_en": "#",
                "label_es": "#"
              }
            }
          ],
          [
            {
              "type": "grid",
              "title": {
                "label_en": "Info Matching Selection Criteria",
                "label_es": "Información cumpliendo el criterio de selección"
              },
              "elementName": "datatable",
              "fieldsToDisplay": [
                {
                  "property": "program_name",
                  "header": "Program"
                },
                {
                  "property": "location_name",
                  "header": "Location"
                },
                {
                  "property": "area",
                  "header": "Area"
                },
                {
                  "property": "shift",
                  "header": "shift"
                },
                {
                  "property": "sampling_date",
                  "header": "Sampling Date"
                },
                {
                  "property": "raw_value_num",
                  "header": "Value"
                },
                {
                  "property": "spec_eval_detail",
                  "header": "Spec Eval"
                }
              ]
            }
          ]
        ]
      },
      {
        "action": "QUERY_SAMPLER_SAMPLING_HISTORY",
        "label_en": "Personal Sampling History",
        "label_es": "Histórico de muestreos de personal",
        "endPoint": "/moduleenvmon/EnvMonAPIstats",
        "filter": {
          "filterFields": [
            {
              "text1": {
                "label_en": "Sampler Name",
                "label_es": "Muestreador",
                "default_value": ""
              }
            },
            {
              "listMDSamplerPersonalAreas": {
                "label_en": "Sampler Area",
                "label_es": "Area Muestreada",
                "default_value": ""
              }
            },
            {
              "text3": {
                "label_en": "Program",
                "label_es": "Programa",
                "default_value": ""
              }
            },
            {
              "text4": {
                "label_en": "Location",
                "label_es": "Ubicación",
                "default_value": ""
              }
            },
            {
              "text5": {
                "label_en": "Location Area",
                "label_es": "Area de la ubicacion",
                "default_value": ""
              }
            },
            {
              "checkbox1": {
                "label_en": "Include Samples",
                "label_es": "Incluir Muestreo Ubicaciones",
                "default_value": true
              }
            },
            {
              "checkbox2": {
                "label_en": "Include Sampler Samples",
                "label_es": "Incluir Muestreos de Personal",
                "default_value": false
              }
            },
            {
              "daterange1": {
                "dateStart": {
                  "label_en": "Sampling Start Date",
                  "label_es": "Fecha Inicio Muestreo",
                  "default_value": ""
                },
                "dateEnd": {
                  "label_en": "Sampling End Date",
                  "label_es": "Fecha Fin Muestreo",
                  "default_value": ""
                }
              }
            },
            {
              "checkbox3": {
                "label_en": "Exclude Readings Not Entered Yet",
                "label_es": "Excluir Lecturas no entradas aún",
                "default_value": true
              }
            },
            {
              "number1": {
                "label_en": "Only readings Equal to",
                "label_es": "Solo las lecturas igual a",
                "default_value": ""
              }
            },
            {
              "number2": {
                "label_en": "Only readings Greater than",
                "label_es": "Solo las lecturas Mayores a",
                "default_value": ""
              }
            },
            {
              "number3": {
                "label_en": "Only readings Less than",
                "label_es": "Solo las lecturas Menores a",
                "default_value": ""
              }
            },
            {
              "checkbox4": {
                "label_en": "Include Microorganisms",
                "label_es": "Incluir Microorganismos",
                "default_value": false
              }
            },
            {
              "text6": {
                "label_en": "Microorganisms to find",
                "label_es": "Microorganismos a encontrar",
                "default_value": ""
              }
            }
          ],
          "endPointParams": [
            {
              "argumentName": "sampleGroups",
              "fixValue": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|area*counter_by_area|has_pre_invest*counter_out|spec_eval*counter_range_eval|has_invest*counter_investigations|has_pre_invest, has_invest*counter_pre_and_invest"
            },
            {
              "argumentName": "includeSamplerSamples",
              "fixValue": "true"
            },
            {
              "argumentName": "includeSamples",
              "fixValue": "false"
            },
            {
              "argumentName": "samplerName",
              "element": "text1"
            },
            {
              "argumentName": "samplerArea",
              "element": "listMDSamplerPersonalAreas"
            },
            {
              "argumentName": "programName",
              "element": "text3"
            },
            {
              "argumentName": "locationName",
              "element": "text4"
            },
            {
              "argumentName": "area",
              "element": "text5"
            },
            {
              "argumentName": "includeSamplerSamples",
              "element": "checkbox1"
            },
            {
              "argumentName": "includeSamplerSamples",
              "element": "checkbox2"
            },
            {
              "argumentName": "excludeReadingNotEntered",
              "element": "checkbox3"
            },
            {
              "argumentName": "samplingDayStart",
              "element": "daterange1dateStart"
            },
            {
              "argumentName": "samplingDayEnd",
              "element": "daterange1dateEnd"
            },
            {
              "argumentName": "readingEqual",
              "element": "number1"
            },
            {
              "argumentName": "readingMin",
              "element": "number2"
            },
            {
              "argumentName": "readingMax",
              "element": "number3"
            },
            {
              "argumentName": "includeMicroorganisms",
              "element": "checkbox4"
            },
            {
              "argumentName": "MicroorganismsToFind",
              "element": "text6"
            }
          ]
        },
        "printable": true,
        "download": {
          "active": true,
          "elements": [
            {
              "elementName": "datatable"
            }
          ]
        },
        "reportElements": [
          [
            {
              "type": "reportTitle",
              "title": {
                "label_en": "Personal Sampling History",
                "label_es": "Histórico de muestreos de personal"
              }
            }
          ],
          [
            {
              "type": "cardSomeElementsRepititiveObjects",
              "title": {
                "label_en": "Information",
                "label_es": "Información"
              },
              "elementName": "production_lot",
              "subheadingObj": "text1"
            }
          ],
          [
            {
              "type": "chart",
              "elementName": "counter_range_eval",
              "display_chart": true,
              "chart_type": "pie",
              "chart_name": "counter_range_eval",
              "chart_title": {
                "label_en": "Per out of range type",
                "label_es": "Por tipo de fuera de rango"
              },
              "counter_field_name": "count",
              "counterLimits": {
                "xmin_allowed": 3,
                "xmin_allowed_included": 3,
                "xmax_allowed": 100,
                "xmax_allowed_included": 100,
                "xvalue": 0
              },
              "chartStyle": {
                "backgroundColor": "transparent",
                "is3D": true,
                "colors": [
                  "#dfa942",
                  "#d33737",
                  "#bf120f"
                ]
              },
              "grouper_field_name": "spec_eval",
              "label_values_replacement": {
                "IN": {
                  "label_es": "In Range",
                  "label_en": "Dentro de Range"
                },
                "inAlertMax": {
                  "label_es": "Por Encima del límite de alerta",
                  "label_en": "Over the Alert limit"
                },
                "outOfSpecMax": {
                  "label_es": "Fuera de Rango",
                  "label_en": "Over the Range"
                },
                "outOfSpecMaxStrict": {
                  "label_es": "Fuera de Rango",
                  "label_en": "Over the Range"
                }
              },
              "grouper_exclude_items": [
                "xxxxoutOfSpecMax",
                "Samplingzz",
                "Incubationzz",
                "PlateReadingzz",
                "MicroorganismIdentificationzz",
                "zz",
                "END"
              ],
              "label_item": {
                "label_en": "Statussss",
                "label_es": "Estado"
              },
              "label_value": {
                "label_en": "#",
                "label_es": "#"
              }
            },
            {
              "type": "chart",
              "elementName": "counter_by_area_spec_tmp",
              "display_chart": true,
              "chart_type": "pie",
              "chart_name": "counter_by_area_spec_tmp",
              "chart_title": {
                "label_en": "Per Area and Spec",
                "label_es": "Por Area y Especificación"
              },
              "counter_field_name": "count",
              "counterLimits": {
                "xmin_allowed": 3,
                "xmin_allowed_included": 3,
                "xmax_allowed": 100,
                "xmax_allowed_included": 100,
                "xvalue": 0
              },
              "chartStyle": {
                "backgroundColor": "transparent",
                "is3D": true,
                "colors": [
                  "#1b7fcc",
                  "#5fbd5f",
                  "#bf120f"
                ]
              },
              "grouper_field_name": "sample_config_code",
              "label_values_replacement": {
                "prog_pers_template": {
                  "label_es": "Personal",
                  "label_en": "Personnel"
                },
                "program_smp_template": {
                  "label_es": "Muestras",
                  "label_en": "Samples"
                },
                "outOfSpecMaxStrict": {
                  "label_es": "Fuera de Rango",
                  "label_en": "Over the Range"
                }
              },
              "grouper_exclude_items": [
                "xxxxoutOfSpecMax",
                "Samplingzz",
                "Incubationzz",
                "PlateReadingzz",
                "MicroorganismIdentificationzz",
                "zz",
                "END"
              ],
              "label_item": {
                "label_en": "Statussss",
                "label_es": "Estado"
              },
              "label_value": {
                "label_en": "#",
                "label_es": "#"
              }
            }
          ],
          [
            {
              "type": "grid",
              "title": {
                "label_en": "Info Matching Selection Criteria",
                "label_es": "Información cumpliendo el criterio de selección"
              },
              "elementName": "datatable",
              "fieldsToDisplay": [
                {
                  "property": "sampler",
                  "header": "Sampler"
                },
                {
                  "property": "sampler_area",
                  "header": "Sampler Area"
                },
                {
                  "property": "program_name",
                  "header": "Program"
                },
                {
                  "property": "location_name",
                  "header": "Location"
                },
                {
                  "property": "area",
                  "header": "Area"
                },
                {
                  "property": "shift",
                  "header": "shift"
                },
                {
                  "property": "sampling_date",
                  "header": "Sampling Date"
                },
                {
                  "property": "raw_value_num",
                  "header": "Value"
                },
                {
                  "property": "spec_eval_detail",
                  "header": "Spec Eval"
                }
              ]
            }
          ]
        ]
      },
      {
        "action": "QUERY_INVESTIGATION",
        "label_en": "Investigations History",
        "label_es": "Histórico Investigaciones",
        "endPoint": "/moduleenvmon/EnvMonAPIstats",
        "filter": {
          "fixParams": {
            "investigationGroups": "capa_required*capa_or_not"
          },
          "filterFields": [
            {
              "checkbox1": {
                "label_en": "Exclude In Progress ones",
                "label_es": "Excluir En Curso"
              },
              "default_value": true
            },
            {
              "daterange1": {
                "dateStart": {
                  "label_en": "Creation Start Date",
                  "label_es": "Inicio Rango Creación",
                  "default_value": ""
                },
                "dateEnd": {
                  "label_en": "Creation End Date",
                  "label_es": "Fin Rango Creación",
                  "default_value": ""
                }
              }
            },
            {
              "daterange2": {
                "dateStart": {
                  "label_en": "Closure Start Date",
                  "label_es": "Inicio Rango Cierre",
                  "default_value": ""
                },
                "dateEnd": {
                  "label_en": "Closure End Date",
                  "label_es": "Fin Rango Cierre",
                  "default_value": ""
                }
              }
            }
          ],
          "endPointParams": [
            {
              "argumentName": "excludeNotClosedYet",
              "element": "checkbox1"
            },
            {
              "argumentName": "creationDayStart",
              "element": "daterange1dateStart"
            },
            {
              "argumentName": "creationDayEnd",
              "element": "daterange1dateEnd"
            },
            {
              "argumentName": "closureDayStart",
              "element": "daterange2dateStart"
            },
            {
              "argumentName": "closureDayEnd",
              "element": "daterange2dateEnd"
            }
          ]
        },
        "reportElements": [
          [
            {
              "type": "grid",
              "title": {
                "label_en": "Info Matching Selection Criteria",
                "label_es": "Información cumpliendo el criterio de selección"
              },
              "elementName": "datatable",
              "fieldsToDisplay": [
                {
                  "property": "id",
                  "header": "Id"
                },
                {
                  "property": "created_on",
                  "header": "Creation",
                  "label_es": "Creación"
                },
                {
                  "property": "created_by",
                  "header": "By"
                },
                {
                  "property": "closed_on",
                  "header": "Closed"
                },
                {
                  "property": "closed_by",
                  "header": "By"
                },
                {
                  "property": "external_system_name",
                  "header": "External System Name"
                },
                {
                  "property": "external_system_id",
                  "header": "Id"
                },
                {
                  "property": "capa_required",
                  "header": "Capa Required"
                },
                {
                  "property": "capa_decision_by",
                  "header": "Capa Decision By"
                },
                {
                  "property": "capa_decision_on",
                  "header": "On"
                },
                {
                  "property": "capa_external_system_id",
                  "header": "External CAPA Systema Name"
                },
                {
                  "property": "capa_external_system_name",
                  "header": "Id"
                }
              ]
            }
          ],
          [
            {
              "type": "reportTitle",
              "title": {
                "label_en": "Investigations History",
                "label_es": "Histórico Investigaciones"
              }
            }
          ],
          [
            {
              "type": "chart",
              "elementName": "capa_or_not",
              "display_chart": true,
              "chart_type": "pie",
              "chart_name": "capa_or_not",
              "chart_title": {
                "label_en": "Per CAPA Required",
                "label_es": "Por CAPA necesario"
              },
              "counter_field_name": "count",
              "counterLimits": {
                "xmin_allowed": 3,
                "xmin_allowed_included": 3,
                "xmax_allowed": 100,
                "xmax_allowed_included": 100,
                "xvalue": 0
              },
              "chartStyle": {
                "backgroundColor": "transparent",
                "is3D": true,
                "colors": [
                  "#dfa942",
                  "#d33737",
                  "#bf120f"
                ]
              },
              "grouper_field_name": "capa_required",
              "label_values_replacement": {
                "inAlertMax": {
                  "label_es": "Por Encima del límite de alerta",
                  "label_en": "Over the Alert limit"
                },
                "outOfSpecMax": {
                  "label_es": "Fuera de Rango",
                  "label_en": "Over the Range"
                },
                "outOfSpecMaxStrict": {
                  "label_es": "Fuera de Rango",
                  "label_en": "Over the Range"
                }
              },
              "grouper_exclude_items": [
                "xxxxoutOfSpecMax",
                "Samplingzz",
                "Incubationzz",
                "PlateReadingzz",
                "MicroorganismIdentificationzz",
                "zz",
                "END"
              ],
              "label_item": {
                "label_en": "Statussss",
                "label_es": "Estado"
              },
              "label_value": {
                "label_en": "#",
                "label_es": "#"
              }
            }
          ]
        ]
      }
    ]
  },
  "Browser": {
    "component": "DataMining",
    "tabs": [
      {
        "action": "GET_SAMPLE_STAGES_SUMMARY_REPORT",
        "label_en": "Sample",
        "label_es": "Muestras",
        "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
        "filter": {
          "fixParams": {
            "sampleGroups": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|spec_eval*counter_range_eval|has_invest*counter_investigations|has_pre_invest, has_invest*counter_pre_and_invest"
          },
          "filterFields": [
            {
              "text1": {
                "label_en": "Sample",
                "label_es": "Muestra",
                "default_value": "2029"
              }
            }
          ],
          "endPointParams": [
            {
              "argumentName": "sampleId",
              "element": "text1"
            },
            {
              "argumentName": "sampleFieldToRetrieve",
              "fixValue": "ALL"
            },
            {
              "argumentName": "sampleFieldsToDisplay",
              "fixValue": "current_stage|program_name|location_name|product_lot|shift"
            }
          ]
        },
        "printable": {
          "active": true,
          "reportTitle": {
            "label_en": "Report for sample",
            "label_es": "Informe de muestra"
          },
          "printableTitleContent": "EnvMonAirSampleReportTitle",
          "printableContent": "EnvMonAirSampleReportContent"
        },
        "download": {
          "active": false,
          "elements": [
            {
              "elementName": "datatable"
            }
          ]
        },
        "reportElements": [
          [
            {
              "type": "Report",
              "reportModel": "EnvMonAirSampleBrowser"
            }
          ]
        ]
      },
      {
        "action": "GET_INCUBATOR_REPORT",
        "label_en": "Incubator",
        "label_es": "Incubadora",
        "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
        "filter": {
          "fixParams": {
            "sampleGroups": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|spec_eval*counter_range_eval|has_invest*counter_investigations|has_pre_invest, has_invest*counter_pre_and_invest"
          },
          "filterFields": [
            {
              "text1": {
                "label_en": "Incubator",
                "label_es": "Incubadora",
                "default_value": "INC_1"
              }
            },
            {
              "daterange1": {
                "dateStart": {
                  "label_en": "Sampling Start Date",
                  "label_es": "Fecha Inicio Muestreo",
                  "default_value": ""
                },
                "dateEnd": {
                  "label_en": "Sampling End Date",
                  "label_es": "Fecha Fin Muestreo",
                  "default_value": ""
                }
              }
            }
          ],
          "endPointParams": [
            {
              "argumentName": "incubatorName",
              "element": "text1"
            },
            {
              "argumentName": "startDate",
              "element": "daterange1dateStart"
            },
            {
              "argumentName": "endDate",
              "element": "daterange1dateEnd"
            },
            {
              "argumentName": "incubatorFieldsToDisplay",
              "fixValue": "ALL"
            }
          ]
        },
        "printable": {
          "active": true,
          "reportTitle": {
            "label_en": "Report for sample",
            "label_es": "Informe de muestra"
          },
          "printableTitleContent": "incubatorContentTitle",
          "printableContent": "EnvMonAirIncubatorReportContent"
        },
        "download": {
          "active": false,
          "elements": [
            {
              "elementName": "datatable"
            }
          ]
        },
        "reportElements": [
          [
            {
              "type": "Report",
              "reportModel": "EnvMonAirIncubatorBrowser"
            }
          ],
          [
            {
              "type": "chart",
              "elementName": "lastTemperatureReadings",
              "display_chart": true,
              "chart_type": "line",
              "chart_name": "lastTemperatureReadings",
              "chart_title": {
                "label_en": "Per out of range type",
                "label_es": "Por tipo de fuera de rango"
              },
              "counter_field_name": "count",
              "counterLimits": {
                "xmin_allowed": 3,
                "xmin_allowed_included": 3,
                "xmax_allowed": 100,
                "xmax_allowed_included": 100,
                "xvalue": 0
              },
              "chartStyle": {
                "backgroundColor": "transparent",
                "is3D": true,
                "colors": [
                  "#dfa942",
                  "#d33737",
                  "#bf120f"
                ]
              },
              "grouper_field_name": "spec_eval",
              "label_values_replacement": {
                "IN": {
                  "label_es": "In Range",
                  "label_en": "Dentro de Range"
                },
                "inAlertMax": {
                  "label_es": "Por Encima del límite de alerta",
                  "label_en": "Over the Alert limit"
                },
                "outOfSpecMax": {
                  "label_es": "Fuera de Rango",
                  "label_en": "Over the Range"
                },
                "outOfSpecMaxStrict": {
                  "label_es": "Fuera de Rango",
                  "label_en": "Over the Range"
                }
              },
              "grouper_exclude_items": [
                "xxxxoutOfSpecMax",
                "Samplingzz",
                "Incubationzz",
                "PlateReadingzz",
                "MicroorganismIdentificationzz",
                "zz",
                "END"
              ],
              "label_item": {
                "label_en": "Statussss",
                "label_es": "Estado"
              },
              "label_value": {
                "label_en": "#",
                "label_es": "#"
              }
            }
          ]
        ]
      },
      {
        "action": "GET_BATCH_REPORT",
        "label_en": "Batch",
        "label_es": "Tanda",
        "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
        "filter": {
          "fixParams": {
            "sampleGroups": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|spec_eval*counter_range_eval|has_invest*counter_investigations|has_pre_invest, has_invest*counter_pre_and_invest"
          },
          "filterFields": [
            {
              "text1": {
                "label_en": "Sample",
                "label_es": "Muestra",
                "default_value": ""
              }
            }
          ],
          "endPointParams": [
            {
              "argumentName": "batchName",
              "element": "text1"
            },
            {
              "argumentName": "sampleFieldToRetrieve",
              "fixValue": "ALL"
            },
            {
              "argumentName": "sampleFieldsToDisplay",
              "fixValue": "current_stage|program_name|location_name|product_lot|shift"
            }
          ]
        },
        "printable": {
          "active": true,
          "reportTitle": {
            "label_en": "Report for sample",
            "label_es": "Informe de muestra"
          },
          "printableTitleContent": "EnvMonAirSampleReportTitle",
          "printableContent": "EnvMonAirBatchReportContent"
        },
        "download": {
          "active": false,
          "elements": [
            {
              "elementName": "datatable"
            }
          ]
        },
        "reportElements": [
          [
            {
              "type": "Report",
              "reportModel": "EnvMonAirBatchBrowser"
            }
          ]
        ]
      },
      {
        "action": "GET_PRODLOT_REPORT",
        "label_en": "Production Lot",
        "label_es": "Lote Producido",
        "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
        "filter": {
          "fixParams": {
            "sampleGroups": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|spec_eval*counter_range_eval|has_invest*counter_investigations|has_pre_invest, has_invest*counter_pre_and_invest"
          },
          "filterFields": [
            {
              "text1": {
                "label_en": "Lot",
                "label_es": "Lote",
                "default_value": "demo"
              }
            }
          ],
          "endPointParams": [
            {
              "argumentName": "lotName",
              "element": "text1"
            },
            {
              "argumentName": "prodLotFieldToRetrieve",
              "fixValue": "ALL"
            },
            {
              "argumentName": "prodLotFieldsToDisplay",
              "fixValue": "ALL"
            },
            {
              "argumentName": "sampleFieldToRetrieve",
              "fixValue": "ALL"
            },
            {
              "argumentName": "sampleFieldsToDisplay",
              "fixValue": "ALL"
            },
            {
              "argumentName": "sampleGroups",
              "fixValue": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|area*counter_by_status"
            }
          ]
        },
        "printable": {
          "active": true,
          "reportTitle": {
            "label_en": "Report for sample",
            "label_es": "Informe de muestra"
          },
          "printableTitleContent": "EnvMonProductionLotReportTitle",
          "printableContent": "EnvMonProductionLotReportContent"
        },
        "download": {
          "active": false,
          "elements": [
            {
              "elementName": "datatable" 
            }
          ]
        },
        "reportElements": [
          [
            {
              "type": "Report",
              "reportModel": "EnvMonProductionLotBrowser"
            }
          ]
        ]
      }
    ]
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
            "bulk_id": {
              "label_en": "Bulk Id", "label_es": "Id bulto", "sort": false, "filter": true, "width": "10%"
            },
            "lot_name": {
              "label_en": "Lot Name", "label_es": "¨Nombre lote", "sort": false, "filter": true, "width": "10%"
            },
            "crated_by": {
              "label_en": "Created By", "label_es": "Creado por", "sort": true, "filter": false, "width": "15%"
            },
            "created_on": {
              "label_en": "Created on", "label_es": "Fecha de creación", "sort": false, "filter": true, "width": "15%"
            },
            "object_type": {
              "label_en": "Object Type", "label_es": "Tipo de objeto", "sort": false, "filter": true, "width": "10%"
            }
          }
        },
        "viewQuery":{
            "actionName": "INVESTIGATION_DEVIATION_PENDING_DECISION",
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
			"requiresDialog": false,
            "button": {
              "title": {
                "label_en": "Create Investigation", "label_es": "Crear Investigación"
              },
              "requiresGridItemSelected": true,
			  "showWhenSelectedItem": {
					"column": "object_type",
					"value": "lot_bulk"
			  }
            },
            "endPointParams": [
				{ "argumentName": "objectToAddObjectType", "selObjectPropertyName": "object_type" },	
				{ "argumentName": "objectToAddObjectName", "selObjectPropertyName": "bulk_id" }
            ]
          },
          {"actionName": "OPEN_INVESTIGATIONS",          
			"requiresDialog": true,
            "button": {
              "title": {
                "label_en": "Add to Investigation", "label_es": "Añadir a Investigación"
              },
              "requiresGridItemSelected": true,
			  "showWhenSelectedItem": {
					"column": "object_type",
					"value": "lot_bulk"
			  }			  
            },
            "dialogInfo": {
			"name": "investigationDialog",
			"subQueryName": "getOpenInvestigations",				
              "automatic": true,
              "action": [
                {
                  "actionName": "ADD_INVEST_OBJECTS",
                  "XclientMethod": "addInvestObjects",
                  "endPointParams": [
                    {"argumentName": "investigationId", "getFromGrid": true, "selObjectPropertyName": "id"},
					{ "argumentName": "objectToAddObjectType", "selObjectPropertyName": "object_type" },
					{ "argumentName": "objectToAddObjectName", "selObjectPropertyName": "bulk_id" }
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
  }
}