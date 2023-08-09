export const ProcManagement = 
[
  {
    "name": "URS",
    "title": {
      "label_en": "Requirements",
      "label_es": "Requisitos"
    },
    "expanded": false,
    "view_definition": {
      "reportElements": [
        {
          "type": "cardSomeElementsSingleObject",
          "endPointResponseObject": "procedure_info",
          "title": "Main Information",
          "num_columns": 4,
          "fieldsToDisplay": [
            {
              "name": "description",
              "label_en": "Description",
              "label_es": "Descripcción"
            },
            {
              "name": "procedure_hash_code",
              "label_en": "Procedure Hash Code",
              "label_es": "Código de comprobación"
            },
            {
              "name": "procedure_name",
              "label_en": "Procedure Name",
              "label_es": "Nombre del procedimiento"
            },
            {
              "name": "locked_for_actions",
              "label_en": "Locked for deployments",
              "label_es": "Bloqueado para despliegues"
            }
          ]
        },
        {
          "type": "reportTitle",
          "title": {
            "label_en": "1) Users and Privileges",
            "label_es": "1) Usuarios y permisos"
          },
          "elements": [
            {
              "type": "readOnlyTable",
              "title": {
                "label_en": "1.1) Users",
                "label_es": "1.2) Usuarios"
              },
              "endPointResponseObject": "process_accesses",
              "endPointResponseObject2": "users",
              "columns": [
                {
                  "name": "user_name",
                  "label_en": "User",
                  "label_es": "Usuario"
                }
              ],
              "actions": [
                {
                  "actionName": "ADD_USER",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "add",
                    "title": {
                      "label_en": "Assign User",
                      "label_es": "Asignar Usuario"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text1": {
                          "label_en": "User to assign",
                          "label_es": "Usuario a asignar"
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "userName",
                      "element": "text1",
                      "defaultValue": ""
                    }
                  ]
                }
              ]
            },
            {
              "type": "readOnlyTable",
              "title": {
                "label_en": "1.2) Roles",
                "label_es": "1.2) Roles"
              },
              "endPointResponseObject": "process_accesses",
              "endPointResponseObject2": "roles",
              "columns": [
                {
                  "name": "role_name",
                  "label_en": "Role",
                  "label_es": "Perfil"
                }
              ],
              "actions": [
                {
                  "actionName": "ADD_ROLE",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "add",
                    "title": {
                      "label_en": "Assign User",
                      "label_es": "Asignar Usuario"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text1": {
                          "label_en": "New Role name",
                          "label_es": "Nombre nuevo Rol"
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "roleName",
                      "element": "text1",
                      "defaultValue": ""
                    }
                  ]
                }
              ]
            },
            {
              "type": "readOnlyTable",
              "title": {
                "label_en": "1.3) User Roles",
                "label_es": "1.3) Roles de usuario"
              },
              "endPointResponseObject": "process_accesses",
              "endPointResponseObject2": "user_role",
              "columns": [
                {
                  "name": "user_name",
                  "label_en": "User",
                  "label_es": "Usuario"
                },
                {
                  "name": "role_name",
                  "label_en": "Role",
                  "label_es": "Perfil"
                }
              ],
              "actions": [
                {
                  "actionName": "ADD_ROLE_TO_USER",
                  "notGetViewData": true,
                  "clientMethod": "procMngRequirementsMethod",
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "selectedItemPropertyName": "selectedItems",
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "add",
                    "title": {
                      "label_en": "Assign User",
                      "label_es": "Asignar Usuario"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text1": {
                          "label_en": "User to assign",
                          "label_es": "Usuario a asignar"
                        }
                      },
                      {
                        "text2": {
                          "label_en": "New Role name",
                          "label_es": "Nombre nuevo Rol"
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "procedureName",
                      "contextVariableName": "procedureName"
                    },
                    {
                      "argumentName": "procedureVersion",
                      "contextVariableName": "procedureVersion"
                    },
                    {
                      "argumentName": "procInstanceName",
                      "contextVariableName": "procInstanceName"
                    },
                    {
                      "argumentName": "userName",
                      "element": "text1",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "roleName",
                      "element": "text2",
                      "defaultValue": ""
                    }
                  ]
                }
              ]
            },
            {
              "type": "rolesAndActions",
              "title": {
                "label_en": "1.4) Actions by Roles",
                "label_es": "1.4) Acciones por Roles"
              },
              "endPointResponseObject": "process_accesses",
              "endPointResponseObject2": "roles_actions"
            }
          ]
        },
        {
          "type": "reportTitle",
          "title": {
            "label_en": "2) SOPs",
            "label_es": "2) PNTs"
          },
          "elements": [
            {
              "type": "cardSomeElementsRepititiveObjects",
              "endPointResponseObject": "sops",
              "num_columns": 1,
              "add_border": true,
              "fieldsToDisplay": [
                {
                  "name": "sop_name",
                  "label_en": "Name",
                  "label_es": "Nombre",
                  "fix_value2_prefix": " v",
                  "name2": "sop_version"
                },
                {
                  "name": "expires",
                  "label_en": "Expires?",
                  "label_es": "¿Caduca?"
                },
                {
                  "name": "current_status",
                  "label_en": "Current Status",
                  "label_es": "Estado Actual"
                },
                {
                  "name": "brief_summary",
                  "label_en": "Purpose",
                  "label_es": "Propósito"
                }
              ],
              "actions": [
                {
                  "clientMethod": "openSop",
                  "selectedItemPropertyName": "selectedItems",
                  "requiresDialog": false,
                  "certificationException": true,
                  "button": {
                    "icon": "picture_as_pdf",
                    "title": {
                      "label_en": "Run Coverage Analysis",
                      "label_es": "Ejecutar Análisis de Cobertura"
                    },
                    "requiresGridItemSelected": false
                  }
                }
              ]
            }
          ]
        },
        {
          "type": "reportTitle",
          "title": {
            "label_en": "3) Views and Privileges",
            "label_es": "3) Pantallas y Permisos"
          },
          "elements": [
            {
              "type": "rolesAndActions",
              "title": {
                "label_en": "3.1) Views and Roles",
                "label_es": "3.1) Pantallas y Roles"
              },
              "endPointResponseObject": "views_info",
              "endPointResponseObject2": "roles_views"
            },
            {
              "type": "rolesAndActions",
              "title": {
                "label_en": "3.2) View SOPs",
                "label_es": "3.2) PNTs de Pantalla"
              },
              "endPointResponseObject": "views_info",
              "endPointResponseObject2": "view_sops"
            },
            {
              "type": "readOnlyTableByGroup",
              "title": {
                "label_en": "3.3) View Actions",
                "label_es": "3.3) Acciones por Pantalla"
              },
              "endPointPropertyArray": [
                "views_info",
                "view_actions"
              ],
              "columns": [
                {
                  "name": "pretty_name_en",
                  "is_translation": true,
                  "label_en": "Name",
                  "label_es": "Nombre"
                },
                {
                  "name": "pretty_name_es",
                  "is_translation": true,
                  "label_en": "Name",
                  "label_es": "Nombre"
                }
              ]
            },
            {
              "type": "readOnlyTable",
              "title": {
                "label_en": "3.4) Menu Definition",
                "label_es": "3.4) Definición del menú"
              },
              "endPointResponseObject": "user_requirements_events",
              "columns": [
                {
                  "name": "id",
                  "label_en": "Id",
                  "label_es": "Id"
                },
                {
                  "name": "type",
                  "label_en": "Type",
                  "label_es": "Tipo"
                },
                {
                  "name": "mode",
                  "label_en": "Mode",
                  "label_es": "Modo"
                },
                {
                  "name": "name",
                  "label_en": "Name",
                  "label_es": "Nombre"
                },
                {
                  "name": "lp_frontend_page_name",
                  "label_en": "View Name",
                  "label_es": "Nombre de la vista"
                },
                {
                  "name": "position",
                  "label_en": "Position",
                  "label_es": "Posición"
                },
                {
                  "name": "sop",
                  "label_en": "SOPs",
                  "label_es": "PNTs"
                },
                {
                  "name": "role_name",
                  "label_en": "Role",
                  "label_es": "Rol"
                },
                {
                  "name": "icon_name",
                  "label_en": "Icon",
                  "label_es": "Icono"
                },
                {
                  "name": "icon_name_when_not_certified",
                  "label_en": "Icon when Not Certified",
                  "label_es": "Icono cuando No Certificado"
                },
                {
                  "name": "label_en",
                  "label_en": "Label (en)",
                  "label_es": "Etiqueta (en)"
                },
                {
                  "name": "label_es",
                  "label_en": "Label (es)",
                  "label_es": "Etiqueta (es)"
                }
              ]
            }
          ]
        },
        {
          "type": "reportTitle",
          "title": {
            "label_en": "4) Settings",
            "label_es": "4) Administración"
          },
          "elements": [
            {
              "type": "readOnlyTable",
              "endPointResponseObject": "business_rules",
              "title": {
                "label_en": "4.1) Business Rules",
                "label_es": "4.1) Reglas de negocio"
              },
              "columns": [
                {
                  "name": "rule_name",
                  "label_en": "Name",
                  "label_es": "Nombre"
                },
                {
                  "name": "rule_value",
                  "label_en": "Value",
                  "label_es": "Valor"
                },
                {
                  "name": "explanation",
                  "label_en": "Explanation",
                  "label_es": "Explicación"
                }
              ]
            },
            {
              "type": "readOnlyTableByGroup",
              "endPointResponseObject": "tables",
              "title": {
                "label_en": "4.2) Tables list",
                "label_es": "4.2) Lista de tablas"
              },
              "zzzendPointPropertyArray": [
                "coverage",
                "business_rules_summary_json",
                "evaluation_all"
              ],
              "columns": [
                {
                  "name": "table_name",
                  "label_en": "Name",
                  "label_es": "Nombre"
                },
                {
                  "name": "is_view",
                  "label_en": "Is View?",
                  "label_es": "¿Es vista?"
                },
                {
                  "name": "definition_en",
                  "is_translation": true,
                  "label_en": "Definition",
                  "label_es": "Definición"
                },
                {
                  "name": "definition_es",
                  "is_translation": true,
                  "label_en": "Definition",
                  "label_es": "Definición"
                }
              ]
            },
            {
              "type": "jsonViewer",
              "endPointResponseObject": "frontend_proc_model",
              "title": {
                "label_en": "4.3) Views Model",
                "label_es": "4.3) Modelo de Pantallas"
              }
            }
          ]
        }
      ]
    }
  },
  {
    "name": "Master Data",
    "title": {
      "label_en": "Master Data",
      "label_es": "Datos Maestros"
    },
    "expanded": false,
    "alternative_endpoint_data": "master_data",
    "view_definition": {
      "reportElements": [
        {
          "type": "jsonViewer",
          "endPointResponseObject": "root",
          "title": "Master Data"
        }
      ]
    }
  },
  {
    "name": "ProcDeployment",
    "title": {
      "label_en": "Procedure Deployment",
      "label_es": "Desplegar Proceso"
    },
    "expanded": false,
    "alternative_endpoint_data": "actionOutput",
    "view_definition": {
      "label_en": "Deploy Requirements",
      "label_es": "Desplegar Requerimientos",
      "hasDetail": true,
      "detail": {
        "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
        "actionName": "DEPLOY_REQUIREMENTS",
        "notGetViewData": true,
        "type": "actionWithFilter",
        "button": {
          "label_en": "Run",
          "button_label_es": "Ejecutar"
        },
        "filterFields": [
          {
            "text1": {
              "label_en": "Proc Name",
              "label_es": "Proceso",
              "internalVariableSimpleObjName": "selectedProcInstance",
              "internalVariableSimpleObjProperty": "procedure_name"
            }
          },
          {
            "number1": {
              "label_en": "Version",
              "label_es": "Proceso",
              "internalVariableSimpleObjName": "selectedProcInstance",
              "internalVariableSimpleObjProperty": "procedure_version"
            }
          },
          {
            "text2": {
              "label_en": "Instance Name",
              "label_es": "Instancia",
              "internalVariableSimpleObjName": "selectedProcInstance",
              "internalVariableSimpleObjProperty": "proc_instance_name"
            }
          },
          {
            "text3": {
              "label_en": "Module Name",
              "label_es": "Nombre del Módulo",
              "internalVariableSimpleObjName": "selectedProcInstance",
              "internalVariableSimpleObjProperty": "module_name"
            }
          },
          {
            "checkbox1": {
              "label_en": "Repositories and Base Tables",
              "label_es": "Repositorios y Tablas Base",
              "default_value": true
            }
          },
          {
            "checkbox2": {
              "label_en": "Procedure Info",
              "label_es": "Info de Proceso",
              "default_value": true
            }
          },
          {
            "checkbox3": {
              "label_en": "Procedure User & Roles",
              "label_es": "Usuarios y Perfiles",
              "default_value": true
            }
          },
          {
            "checkbox4": {
              "label_en": "SOPs",
              "label_es": "PNTs",
              "default_value": false
            }
          },
          {
            "checkbox5": {
              "label_en": "Assign SOPs to Users",
              "label_es": "Asignar PNTs a usuarios",
              "default_value": false
            }
          },
          {
            "checkbox6": {
              "label_en": "Events",
              "label_es": "Eventos",
              "default_value": false
            }
          },
          {
            "checkbox7": {
              "label_en": "Business Rules",
              "label_es": "Reglas de Negocio",
              "default_value": false
            }
          },
          {
            "checkbox8": {
              "label_en": "Module Tables and Fields",
              "label_es": "Tablas y Campos",
              "default_value": false
            }
          },
          {
            "checkbox9": {
              "label_en": "Master Data",
              "label_es": "Datos Maestros",
              "default_value": false
            }
          }
        ],
        "endPointParams": [
          {
            "argumentName": "procedureName",
            "element": "text1"
          },
          {
            "argumentName": "procedureVersion",
            "element": "number1"
          },
          {
            "argumentName": "procInstanceName",
            "element": "text2"
          },
          {
            "argumentName": "moduleName",
            "element": "text3"
          },
          {
            "argumentName": "deployRepositoriesAndProcTbls",
            "element": "checkbox1"
          },
          {
            "argumentName": "deployProcInfo",
            "element": "checkbox2"
          },
          {
            "argumentName": "deployProcUserRoles",
            "element": "checkbox3"
          },
          {
            "argumentName": "deployProcSopMetaData",
            "element": "checkbox4"
          },
          {
            "argumentName": "deployProcSopsToUsers",
            "element": "checkbox5"
          },
          {
            "argumentName": "deployProcEvents",
            "element": "checkbox6"
          },
          {
            "argumentName": "deployProcBusinessRulesPropFiles",
            "element": "checkbox7"
          },
          {
            "argumentName": "deployModuleTablesAndFields",
            "element": "checkbox8"
          },
          {
            "argumentName": "deployMasterData",
            "element": "checkbox9"
          }
        ],
        "filter": {
          "fixParams": {}
        }
      },
      "reportElements": [
        {
          "type": "cardSomeElementsSingleObject",
          "endPointResponseObject": "Procedure Instance Info",
          "title": "Main Information",
          "num_columns": 4,
          "fieldsToDisplay": [
            {
              "name": "dbName",
              "label_en": "Trazit Instance",
              "label_es": "Instancia de Trazit"
            },
            {
              "name": "Process Name",
              "label_en": "Procedure Name",
              "label_es": "Nombre de Proceso"
            },
            {
              "name": "Process Version",
              "label_en": "Procedure Version",
              "label_es": "Versión de Proceso"
            },
            {
              "name": "Instance Name",
              "label_en": "Instance",
              "label_es": "Instancia"
            }
          ]
        },
        {
          "type": "cardSomeElementsSingleObject",
          "endPointResponseObject": "actions_to_perform_settings",
          "title": "Sections Performed",
          "num_columns": 3,
          "fieldsToDisplay": [
            {
              "name": "1) CREATE_REPOSITORIES_AND_PROC_TBLS",
              "label_en": "Repositories and Proc Tables",
              "label_es": "repositorios y Tablas de Proceso"
            },
            {
              "name": "2) PROCDEPL_PROCEDURE_INFO",
              "label_en": "Procedure Info",
              "label_es": "Información de Proceso"
            },
            {
              "name": "3) PROCDEPL_PROCEDURE_USER_ROLES",
              "label_en": "Users and Roles",
              "label_es": "Usuarios y Roles"
            },
            {
              "name": "4) PROCDEPL_PROCEDURE_SOP_META_DATA",
              "label_en": "SOPs",
              "label_es": "PNTs"
            },
            {
              "name": "5) PROCDEPL_ASIGN_PROC_SOPS_TO_USERS",
              "label_en": "Assign SOPs to Users",
              "label_es": "Asignar PNTs a Usuarios"
            },
            {
              "name": "6) PROCDEPL_PROCEDURE_EVENTS",
              "label_en": "Menus",
              "label_es": "Menús"
            },
            {
              "name": "7) PROCDEPL_BUSINESS_RULES_PROPTS_FILS",
              "label_en": "Business Rules",
              "label_es": "Reglas de Negocio"
            },
            {
              "name": "8) PROCDEPL_MODULE_TABLES_AND_FIELDS",
              "label_en": "Tables and Fields",
              "label_es": "Tablas y Campos"
            },
            {
              "name": "9) PROCDEPL_MASTER_DATA",
              "label_en": "Master Data",
              "label_es": "Datos Maestros"
            }
          ]
        },
        {
          "type": "xjsonViewer",
          "title": "Information",
          "titleObj": {
            "label_en": "Information",
            "label_es": "Información"
          },
          "endPointResponseObject": "Procedure Instance Info",
          "subheadingObj": "text1"
        },
        {
          "type": "xjsonViewer",
          "title": "Actions Log",
          "titleObj": {
            "label_en": "Information",
            "label_es": "Información"
          },
          "endPointResponseObject": "actions_to_perform_settings",
          "subheadingObj": "text1"
        },
        {
          "type": "jsonViewer",
          "title": "Log Summary",
          "titleObj": {
            "label_en": "Information",
            "label_es": "Información"
          },
          "endPointResponseObject": "sections_log",
          "subheadingObj": "text1"
        }
      ]
    }
  },
  {
    "name": "TESTING_SCRIPTS",
    "title": {
      "label_en": "Testing Scripts",
      "label_es": "Guiones de Prueba"
    },
    "expanded": true,
    "alternative_endpoint_data": "testing",
    "view_definition": {
      "hasDetail": true,
      "detail": {
        "name": "TESTING_SCRIPTS",
        "type": "objectsList",
        "endPointPropertyArray": [
          "testing",
          "scripts"
        ],
        "fieldsToDisplayInFilter": [
          {
            "name": "script_id",
            "label_en": "Id",
            "label_es": "Id"
          },
          {
            "name": "run_summary",
            "label_en": "Summary",
            "label_es": "Resumen"
          }
        ],
        "view_definition": [
          {
            "type": "reportTitle",
            "title": {
              "label_en": "Summary",
              "label_es": "Resumen"
            },
            "elements": [
              {
                "type": "readOnlyTable",
                "endPointResponseObject": "ROOT",
                "columns": [
                  {
                    "name": "script_id",
                    "label_en": "Id",
                    "label_es": "Id"
                  },
                  {
                    "name": "run_summary",
                    "label_en": "Summary",
                    "label_es": "Resumen"
                  },
                  {
                    "name": "date_execution",
                    "label_en": "Run on",
                    "label_es": "Ejecutado en"
                  },
                  {
                    "name": "eval_total_tests",
                    "label_en": "Number of Steps",
                    "label_es": "Número de Pasos"
                  },
                  {
                    "label_en": "Sintaxis",
                    "label_es": "Sintáxis",
                    "fix_value_prefix": "Match: ",
                    "name": "eval_syntaxis_match",
                    "fix_value2_prefix": "UNmtch: ",
                    "name2": "eval_syntaxis_unmatch",
                    "fix_value3_prefix": "N/A:",
                    "name3": "eval_syntaxis_undefined"
                  },
                  {
                    "label_en": "Notification",
                    "label_es": "Notificación",
                    "fix_value_prefix": "Match: ",
                    "name": "eval_code_match",
                    "fix_value2_prefix": "UNmtch: ",
                    "name2": "eval_code_unmatch",
                    "fix_value3_prefix": "N/A:",
                    "name3": "eval_code_undefined"
                  },
                  {
                    "label_en": "Duration",
                    "label_es": "Duración",
                    "fix_value_prefix": "",
                    "name": "time_consume",
                    "fix_value2_prefix": " (",
                    " (name2": "time_started",
                    "fix_value3_prefix": " - ",
                    "name3": "time_completed",
                    "fix_value3_suffix": ") "
                  }
                ],
                "actions": [
                    {
                      "actionName": "TestingRegressionUAT",
                      "endPoint": "/testing/platform/TestingRegressionUAT",
                      "requiresDialog": false,
                      "certificationException": true,
                      "button": {
                        "icon": "date_range",
                        "title": {
                          "label_en": "Run Testing",
                          "label_es": "Ejecutar Prueba"
                        },
                        "requiresGridItemSelected": false
                      },
                      "endPointParams": [
                        {
                          "argumentName": "scriptId",
                          "selObjectPropertyName": "script_id"
                        },
                        {
                          "argumentName": "procInstanceName",
                          "contextVariableName": "procInstanceName"
                        },
                        {
                          "argumentName": "procManagement",
                          "fixValue": "true"
                        },
                        {
                          "argumentName": "outputFormat",
                          "fixValue": "JSON"
                        }                    
                      ]
                    }
                  ]				
              }
            ]
          },
          {
            "type": "reportTitle",
            "title": {
              "label_en": "Steps",
              "label_es": "Pasos"
            },
            "elements": [
              {
                "type": "readOnlyTable",
                "endPointResponseObject": "scripts",
                "endPointResponseObject2": "steps",
                "columns": [
                  {
                    "name": "step_id",
                    "label_en": "Id",
                    "label_es": "Id"
                  },
                  {
                    "name": "action_name",
                    "label_en": "Action",
                    "label_es": "Acción"
                  },
                  {
                    "name": "date_execution",
                    "label_en": "Run on",
                    "label_es": "Ejecutado en"
                  },
                  {
                    "name": "eval_total_tests",
                    "label_en": "Number of Steps",
                    "label_es": "Número de Pasos"
                  },
                  {
                    "label_en": "Sintaxis",
                    "label_es": "Sintáxis",
                    "fix_value_prefix": "Eval: ",
                    "name": "eval_syntaxis_icon",
                    "fix_value2_prefix": "(Expected: ",
                    "name2": "expected_syntaxis",
                    "fix_value2_suffix": ")",
                    "fix_value3_prefix": " (Trazit:",
                    "name3": "function_syntaxis",
                    "fix_value3_suffix": ")"
                  },
                  {
                    "label_en": "Notification",
                    "label_es": "Notificación",
                    "fix_value_prefix": "Eval: ",
                    "name": "eval_code",
                    "fix_value2_prefix": "(Expected: ",
                    "name2": "expected_code",
                    "fix_value2_suffix": ")",
                    "fix_value3_prefix": " (Trazit:",
                    "name3": "function_code",
                    "fix_value3_suffix": ")"
                  },                  
                  {
                    "label_en": "Duration",
                    "label_es": "Duración",
                    "fix_value_prefix": "",
                    "name": "time_consume",
                    "fix_value2_prefix": " (",
                    " (name2": "time_started",
                    "fix_value3_prefix": " - ",
                    "name3": "time_completed",
                    "fix_value3_suffix": ") "
                  }
                ]
              }
            ]
          }
        ]
      },
      "reportElements": [
        {
          "type": "xxxreadOnlyTable",
          "endPointResponseObject": "scripts",
          "columns": [
            {
              "name": "script_id",
              "label_en": "Id",
              "label_es": "Id"
            },
            {
              "name": "run_summary",
              "label_en": "Summary",
              "label_es": "Resumen"
            },
            {
              "name": "date_execution",
              "label_en": "Run on",
              "label_es": "Ejecutado en"
            },
            {
              "name": "eval_total_tests",
              "label_en": "Number of Steps",
              "label_es": "Número de Pasos"
            },
            {
              "label_en": "Sintaxis",
              "label_es": "Sintáxis",
              "fix_value_prefix": "Match: ",
              "name": "eval_syntaxis_match",
              "fix_value2_prefix": "UNmtch: ",
              "name2": "eval_syntaxis_unmatch",
              "fix_value3_prefix": "N/A:",
              "name3": "eval_syntaxis_undefined"
            },
            {
              "label_en": "Notification",
              "label_es": "Notificación",
              "fix_value_prefix": "Match: ",
              "name": "eval_code_match",
              "fix_value2_prefix": "UNmtch: ",
              "name2": "eval_code_unmatch",
              "fix_value3_prefix": "N/A:",
              "name3": "eval_code_undefined"
            },
            {
              "label_en": "Duration",
              "label_es": "Duración",
              "fix_value_prefix": "",
              "name": "time_consume",
              "fix_value2_prefix": " (",
              " (name2": "time_started",
              "fix_value3_prefix": " - ",
              "name3": "time_completed",
              "fix_value3_suffix": ") "
            }
          ]
        },
        {
          "type": "cardSomeElementsRepititiveObjects",
          "endPointResponseObject": "scripts",
          "add_border": true,
          "fieldsToDisplay": [
            {
              "name": "script_id",
              "label_en": "Id",
              "label_es": "Id"
            },
            {
              "name": "run_summary",
              "label_en": "Summary",
              "label_es": "Resumen"
            },
            {
              "name": "date_execution",
              "label_en": "Run on",
              "label_es": "Ejecutado en"
            },
            {
              "name": "eval_total_tests",
              "label_en": "Number of Steps",
              "label_es": "Número de Pasos"
            },
            {
              "label_en": "Sintaxis",
              "label_es": "Sintáxis",
              "fix_value_prefix": "Match: ",
              "name": "eval_syntaxis_match",
              "fix_value2_prefix": "UNmtch: ",
              "name2": "eval_syntaxis_unmatch",
              "fix_value3_prefix": "N/A:",
              "name3": "eval_syntaxis_undefined"
            },
            {
              "label_en": "Notification",
              "label_es": "Notificación",
              "fix_value_prefix": "Match: ",
              "name": "eval_code_match",
              "fix_value2_prefix": "UNmtch: ",
              "name2": "eval_code_unmatch",
              "fix_value3_prefix": "N/A:",
              "name3": "eval_code_undefined"
            },
            {
              "label_en": "Duration",
              "label_es": "Duración",
              "fix_value_prefix": "",
              "name": "time_consume",
              "fix_value2_prefix": " (",
              " (name2": "time_started",
              "fix_value3_prefix": " - ",
              "name3": "time_completed",
              "fix_value3_suffix": ") "
            }
          ],
          "actions": [
            {
              "actionName": "TESTING_SCRIPT_RUN",
              "endPoint": "/testing/platform/TestingRegressionUAT",
              "requiresDialog": false,
              "certificationException": true,
              "button": {
                "icon": "date_range",
                "title": {
                  "label_en": "Run Coverage Analysis",
                  "label_es": "Ejecutar Análisis de Cobertura"
                },
                "requiresGridItemSelected": false
              },
              "endPointParams": [
                {
                  "argumentName": "scriptId",
                  "selObjectPropertyName": "script_id"
                },
                {
                  "argumentName": "procManagement",
                  "fixValue": "true"
                },
                {
                  "argumentName": "outputFormat",
                  "fixValue": "JSON"
                }                
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "name": "TESTING_COVERAGE",
    "title": {
      "label_en": "Testing Coverage Analysis",
      "label_es": "Análisis Cobertura Pruebas"
    },
    "expanded": false,
    "alternative_endpoint_data": "testing",
    "view_definition": {
      "reportElements": [
        {
          "type": "cardSomeElementsRepititiveObjects",
          "endPointResponseObject": "coverage",
          "title": "Testing Script Coverage",
          "num_columns": 2,
          "fieldsToDisplay": [
            {
              "name": "coverage_id",
              "label_en": "Id",
              "label_es": "Id"
            },
            {
              "name": "run_summary",
              "label_en": "Summary",
              "label_es": "Resumen"
            },
            {
              "name": "date_execution",
              "label_en": "Run on",
              "label_es": "Ejecutado en"
            },
            {
              "name": "script_ids_list",
              "label_en": "Scripts List",
              "label_es": "Lista de Guiones"
            }
          ],
          "actions": [
            {
              "actionName": "TESTING_COVERAGE_RUN",
              "endPoint": "/testing/platform/TestingCoverageRun",
              "requiresDialog": false,
              "certificationException": true,
              "button": {
                "icon": "date_range",
                "title": {
                  "label_en": "Run Coverage Analysis",
                  "label_es": "Ejecutar Análisis de Cobertura"
                },
                "requiresGridItemSelected": false
              },
              "endPointParams": [
                {
                  "argumentName": "coverageId",
                  "selObjectPropertyName": "coverage_id"
                },
                {
                  "argumentName": "procInstanceName",
                  "contextVariableName": "procInstanceName"
                }
              ]
            }
          ]
        },
        {
          "type": "cardSomeElementsRepititiveObjects",
          "endPointResponseObject": "coverage",
          "title": "Testing Script Coverage",
          "num_columns": 3,
          "fieldsToDisplay": [
            {
              "name": "endpoints_coverage",
              "is_icon": true,
              "as_progress": true,
              "label_en": "Actions Coverage",
              "label_es": "Cobertura de Acciones"
            },
            {
              "name": "bus_rule_coverage",
              "is_icon": true,
              "as_progress": true,
              "label_en": "Business Rules Coverage",
              "label_es": "Cobertura de Reglas de Negocio"
            },
            {
              "name": "msg_coverage",
              "is_icon": true,
              "as_progress": true,
              "label_en": "Notifications Coverage",
              "label_es": "Cobertura de Notificationes"
            }
          ]
        },
        {
          "type": "reportTitle",
          "title": {
            "label_en": "Testing Coverage Detail",
            "label_es": "Detalle de la Cobertura de las pruebas"
          },
          "elements": [
            {
              "type": "cardSomeElementsSingleObject",
              "endPointPropertyArray": [
                "coverage",
                "endpoints_summary_json",
                "summary"
              ],
              "num_columns": 1,
              "fieldsToDisplay": [
                {
                  "name": "percentage_explanation",
                  "label_en": "Explanation for Actions",
                  "label_es": "Explicación para Acciones"
                }
              ]
            },
            {
              "type": "cardSomeElementsSingleObject",
              "endPointPropertyArray": [
                "coverage",
                "business_rules_summary_json",
                "summary"
              ],
              "num_columns": 1,
              "fieldsToDisplay": [
                {
                  "name": "percentage_explanation",
                  "label_en": "Explanation for Business Rules",
                  "label_es": "Explicación para Reglas de Negocio"
                }
              ]
            },
            {
              "type": "cardSomeElementsSingleObject",
              "endPointPropertyArray": [
                "coverage",
                "notifications_summary_json",
                "summary"
              ],
              "num_columns": 1,
              "fieldsToDisplay": [
                {
                  "name": "percentage_explanation",
                  "label_en": "Explanation for Notification Messages",
                  "label_es": "Explicación para Mensajes de Notificación"
                }
              ]
            },
            {
              "type": "readOnlyTable",
              "endPointPropertyArray": [
                "coverage",
                "endpoints_summary_json",
                "evaluation"
              ],
              "title": "Actions Evaluation",
              "columns": [
                {
                  "name": "name",
                  "label_en": "Action",
                  "label_es": "Acción"
                },
                {
                  "name": "evaluation",
                  "label_en": "Evaluation",
                  "label_es": "Evaluación"
                }
              ]
            },
            {
              "type": "readOnlyTable",
              "title": "Business Rules Evaluation",
              "endPointPropertyArray": [
                "coverage",
                "business_rules_summary_json",
                "evaluation_all"
              ],
              "columns": [
                {
                  "name": "area",
                  "label_en": "Area",
                  "label_es": "Área"
                },
                {
                  "name": "name",
                  "label_en": "Action",
                  "label_es": "Acción"
                },
                {
                  "name": "evaluation",
                  "label_en": "Evaluation",
                  "label_es": "Evaluación"
                }
              ]
            },
            {
              "type": "readOnlyTable",
              "title": "Notifications Evaluation",
              "endPointPropertyArray": [
                "coverage",
                "notifications_summary_json",
                "evaluation"
              ],
              "columns": [
                {
                  "name": "collection_source",
                  "label_en": "Source",
                  "label_es": "Origen"
                },
                {
                  "name": "collection_name",
                  "label_en": "Collection",
                  "label_es": "Colección"
                },
                {
                  "name": "notification_name",
                  "label_en": "Notification",
                  "label_es": "Notificación"
                },
                {
                  "name": "evaluation",
                  "label_en": "Evaluation",
                  "label_es": "Evaluación"
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "name": "MODULE_ACTIONS_CHECKER",
    "title": {
      "label_en": "Module Content Checker",
      "label_es": "Verificar Contenido Módulo"
    },
    "expanded": false
  },
  {
    "name": "MODULE_ACTIONS_MANUALS",
    "title": {
      "label_en": "Manuals",
      "label_es": "Manuales"
    },
    "expanded": false,
    "alternative_endpoint_data": "manuals",
    "view_definition": {
      "reportElements": [
        {
          "type": "reportTitle",
          "title": {
            "label_en": "PROCEDURE MANUALS",
            "label_es": "MANUALES DEL PROCESO"
          },
          "elements": [
            {
              "type": "cardSomeElementsRepititiveObjects",
              "endPointResponseObject": "root",
              "num_columns": 1,
              "add_border": true,
              "fieldsToDisplay": [
                {
                  "name": "manual_name",
                  "label_en": "Name",
                  "label_es": "Nombre",
                  "fix_value2_prefix": " v",
                  "name2": "manual_version"
                },
                {
                  "name": "description",
                  "label_en": "Purpose",
                  "label_es": "Propósito"
                },
                {
                  "name": "file_link",
                  "as_ppt": true
                }
              ],
              "actions": [
                {
                  "clientMethod": "openSop",
                  "selectedItemPropertyName": "selectedItems",
                  "requiresDialog": false,
                  "certificationException": true,
                  "button": {
                    "icon": "picture_as_pdf",
                    "title": {
                      "label_en": "Run Coverage Analysis",
                      "label_es": "Ejecutar Análisis de Cobertura"
                    },
                    "requiresGridItemSelected": false
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  }
]