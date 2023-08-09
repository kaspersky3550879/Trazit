export const Genoma1 = {
	"TrackingChanges":{
	  "version": 0.1,
	  "last change on (YYYYMMDD)": "20221018",
	  "last_change_note_20221018": "Starting the remodeling of"
	},
	"ModuleSettings":{
	  "actionsEndpoints":[
		{ "name": "Projects" , "url" : "/modulegenoma/GenomaProjectAPIactions"},
		{ "name": "Studies" , "url" : "/modulegenoma/GenomaStudyAPIactions"},
	  ]
	},	
	"ProjectManagerTabs":{
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
          {
            "actionName": "NEW_INVESTIGATION", 
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
          {
            "actionName": "OPEN_INVESTIGATIONS",
            "clientMethodxxx": "getOpenInvestigations",
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
          {
            "actionName": "INVESTIGATION_CAPA_DECISION",			
            "xxxxalternativeAPIActionMethod": "capaDecisionAction",
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
          {
            "actionName": "CLOSE_INVESTIGATION",
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
	"ProjectManager": {
        "component": "ModuleGenomaProjectWindow",
        "hasOwnComponent": true,
        "viewQuery":
        { "actionName": "ALL_ACTIVE_PROJECTS",
          "clientMethod": "getGenomaProjectsList",
          "addRefreshButton": true,
          "button": {
            "icon": "refresh",
            "title": {
              "label_en": "Reload", "label_es": "Recargar"
            },
            "requiresGridItemSelected": true
          },
          "subAction": {
              "actionName": "ALL_ACTIVE_PROJECTS",
              "clientMethod": "getGenomaProjectsList"
          }
        },
		"defaultTabOnOpen": "projectmain",
		"tabs":[
			{"tabLabel_en": "Project", "tabLabel_es": "Proyecto", "view": "projectmain", "display": true},
			{"tabLabel_en": "Users", "tabLabel_es": "Usuarios", "view": "studyusers"},
			{"tabLabel_en": "Variable Values", "tabLabel_es": "Valores de Variables", "view": "studyvariablevalues"},  
			{"tabLabel_en": "Individuals", "tabLabel_es": "Individuos", "view": "studyindividuals"},
			{"tabLabel_en": "Families", "tabLabel_es": "Familias", "view": "studyfamilies"},
			{"tabLabel_en": "Samples Set", "tabLabel_es": "Agrupador Muestras", "view": "studysamplesset"}  		
		],
		"projectmain": {
			"component": "TableWithButtons",
			"langConfig": {
				"title": {"label_en": "Users Project ", "label_es": "Usuarios del Proyecto "},
				"gridName": "projectusersgrid",
				"selectedObjectName": "selectedProject",
				"gridElementName": "project_users",
				"gridHeader": {
					"person": {"label_en": "Person", "label_es": "Persona", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
					"roles": {"label_en": "Roles", "label_es": "Roles", "sort": false, "filter": true, "width": "20%"},
					"created_by": {"label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"},
					"created_on": {"label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"}
				}
			},
			"actions":[
				{ "actionName": "PROJECT_NEW",
				  "requiresDialog": true,
					"xxclientMethod": "newStudyIndividual",
					"selObjectVariableName": "selectedProject",
					"endPointUrl": "Projects",
					"endPointParams": [
					  { "argumentName": "projectName", "element": "text1" }
					],
					"button": {
					  "z-icdon": "refresh",
					  "title": {
						"label_en": "New Project", "label_es": "Nuevo Proyecto"
					  },
					  requiresObjectSelected : false
					},   
					"dialogInfo": {
					  "name": "genericDialog",
					  "fields": [
						{ "text1": { "label_en": "new Project Name", "label_es": "Nombre nuevo Proyecto" }}
					  ]
					}
				},
			    { "actionName": "PROJECT_ADD_USER",
				  "requiresDialog": true,
				  "clientMethod": "newStudyIndividual",
				  "selObjectVariableName": "selectedProjectUser", 
				  "endPointUrl": "Projects",
				  "endPointParams": [ 
					{ "argumentName": "projectName", "internalVariableSimpleObjName":"selectedProject", "internalVariableSimpleObjProperty":"name", "ZZZselObjectPropertyName": "study"},
					{ "argumentName": "userName", "element": "listMDprocedureUsers" },
					{ "argumentName": "userRole", "element": "list1" }
				  // { "argumentName": "fieldsNames", "value": "undefined" },
				  // { "argumentName": "fieldsValues", "value": "undefined" }
				  //individualsList
				  ],
				  "button": {
					"z-icdon": "refresh",
					"title": {"label_en": "Add User", "label_es": "Añadir Usuario"},
				  requiresObjectSelected : false
				  },   
				  "dialogInfo": {
						"name": "genericDialog",
						"fields":[ 
							{ "listMDprocedureUsers": { "label_en": "User", "label_es": "Usuario" }},
							{"list1": { "label_en": "Role", "label_es": "Rol",
								"items": [
									{ "keyName": "read-only", "keyValue_en": "Read Only", "keyValue_es": "Solo Lectura" },
									{ "keyName": "edit", "keyValue_en": "Edit", "keyValue_es": "Editar" },
								]            
							}}
						]
				  }
				},
			    { "actionName": "PROJECT_USER_DEACTIVATE",
				"requiresDialog": false,
				"xxxclientMethod": "buttonActionWithoutDialog",
				"selObjectVariableName": "selectedProjectUser",
				"endPointUrl": "Projects",
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
					"endPoint": "/modulegenoma/GenomaProjectAPIactions",
					"endPointParams": [
					  { "argumentName": "projectName", "internalVariableSimpleObjName":"selectedProject", "internalVariableSimpleObjProperty":"name", "ZZZselObjectPropertyName": "study"},
					  { "argumentName": "userName", "selObjectPropertyName": "person" }
					],
					"clientMethod": "openReactivateObjectDialog",
					"button": {
					  "icon": "alarm_add",
					  "title": {
						"label_en": "Activate", "label_es": "Activar"
					  },
					  "requiresGridItemSelected": false
					},
					"requiresDialog": true,
					"dialogInfo": {          
					  "name": "reactivateObjectDialog",
					  "fieldsObject": {
						"queryNumDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
						"objectName": { "label_en": "Project User to reactivate", "label_es": "Usuario de Proyecto a Reactivar" }
					  },    
					  "listDefinition":{
						"keyFldName":"person",
						"eachEntryTextGenerator":[
						  {"value": "Name: ", "type":"fix"}, {"value": "person", "type":"field"}, {"value": " (", "type":"fix"}, {"value": "roles", "type":"field"}, {"value": ")", "type":"fix"}  
						]
					  },
					  "viewQuery": {
						  "actionName": "DEACTIVATED_PROJECT_USERS_LAST_N_DAYS",
						  "clientMethod": "getDeactivatedObjects",
						  "endPoint": "/modulegenoma/GenomaStudyAPIqueries",
						  "endPointParams": [
						    { "argumentName": "projectName", "internalVariableSimpleObjName": "selectedProject", "internalVariableSimpleObjProperty": "name"},
							{ "argumentName": "numDays", "element": "queryNumDays", "fixValue": 7 }							
						  ]
					  },
					  "action": [            
					  ]
					}
				},
			]
		},
		"studyusers": {
			"component": "TableWithButtons",
			"langConfig": {
				"title": {"label_en": "Users Study ","label_es": "Usuarios del estudio "},
				"gridName": "studyusergrid",
				"selectedObjectName": "selectedStudy",
				"gridElementName": "study_users",				
				"gridHeader": {
					"person": {"label_en": "Person", "label_es": "Persona", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
					"roles": {"label_en": "Roles", "label_es": "Roles", "sort": false, "filter": true, "width": "20%"},
					"created_by": {"label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"},
					"created_on": {"label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"}					
				}
			},
			"actions":[
				{ "actionName": "STUDY_ADD_USER",
				"requiresDialog": true,
				"xclientMethod": "newStudyIndividual",
				"selObjectVariableName": "selectedStudyUser", 
				"endPointUrl": "Projects",
				"endPointParams": [ 
				  { "argumentName": "studyName", "internalVariableObjName":"selectedStudy", "internalVariableObjProperty":"study", "ZZZselObjectPropertyName": "study"},
				  { "argumentName": "userName", "element": "listMDprocedureUsers" },
				  { "argumentName": "userRole", "element": "list1" }
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
				  "name": "genericDialog",
				  "fieldText": [
					{ "listMDprocedureUsers": { "label_en": "User", "label_es": "Usuario" }},
					{ "list1": { "label_en": "Role", "label_es": "Rol",
					   "items": [
						 { "keyName": "read-only", "keyValue_en": "Read Only", "keyValue_es": "Solo Lectura" },
						 { "keyName": "edit", "keyValue_en": "Edit", "keyValue_es": "Editar" },
						]            
					  }
					}
				  ]
				}
			  },
				{ "actionName": "STUDY_USER_DEACTIVATE",
				"requiresDialog": false,
				"clientMethod": "buttonActionWithoutDialog",
				"selObjectVariableName": "selectedStudyUser",
				"endPointUrl": "Projects",
				"endPointParams": [
				  { "argumentName": "studyName", "selObjectPropertyName": "study"},
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
				{ "actionName": "STUDY_USER_ACTIVATE",
				"requiresDialog": true,
				"endPointUrl": "Projects",  
				"endPointParams": [
				  { "argumentName": "studyName", "selObjectPropertyName": "study"},
				  { "argumentName": "userName", "selObjectPropertyName": "person" }
				  //{ "argumentName": "userRole", "selObjectPropertyName": "roles" }
				],
				"clientMethod": "openReactivateObjectDialog",
				"selObjectVariableName": "selectedStudyUser",
				"button": {
				  "icon": "alarm_add",
				  "title": {
					"label_en": "Activate", "label_es": "Activar"
				  },
				  requiresObjectSelected : false
				},
				"dialogInfo": {				  
				  "name": "reactivateObjectDialog",
				  "selObjectVariableName": "selectedStudyUser", 
				  "fieldText": {
					"numDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
					"objectName": { "label_en": "Person to reactivate", "label_es": "Persona a Reactivar" }
				  },    
				  "listDefinition":{
					"keyFldName":"person",
					"eachEntryTextGenerator":[
					  {"value": "Name: ", "type":"fix"}, {"value": "person", "type":"field"}, {"value": " (", "type":"fix"}, {"value": "roles", "type":"field"}, {"value": ")", "type":"fix"}  
					]
				  },
				  "action": [            
					{
					  "actionName": "DEACTIVATED_STUDY_USERS_LAST_N_DAYS",
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
		"studyvariablevalues": {
			"component": "TableWithButtons",
			"langConfig": {		
				"title": {"label_en": "Study Variable Values", "label_es": "Valores de variables para el estudio"},
				"gridName": "studyusergrid",
				"selectedObjectName": "selectedStudy",
				"gridElementName": "study_variable_values",				
				"gridHeader": {
				  "id": {"label_en": "Id", "label_es": "Id", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
				  "owner_table": {"label_en": "type", "label_es": "Tipo", "sort": false, "filter": true, "width": "20%"},
				  "owner_id": {"label_en": "Owner", "label_es": "Dueño", "sort": false, "filter": true, "width": "20%"},
				  "variable_set": {"label_en": "variable_set", "label_es": "variable_set", "sort": false, "filter": true, "width": "20%"},
				  "name": {"label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "width": "20%"},
				  "value": {"label_en": "Value", "label_es": "Valor", "sort": false, "filter": true, "width": "20%"}				
				}
			},
			"actions":[
			  { "actionName": "STUDY_OBJECT_SET_VARIABLE_VALUE",
			  "requiresDialog": true,
				"clientMethod": "studyObjectSetVariableValue",
				"selObjectVariableName": "selectedVariable",
				"endPointUrl": "Projects",
				"endPointParams": [
				  { "argumentName": "studyName", "ZZZselObjectPropertyName": "study"},
				  { "argumentName": "ownerId", "selObjectPropertyName": "owner_id" },
				  { "argumentName": "ownerTable", "selObjectPropertyName": "owner_table" },
				  { "argumentName": "variableSetName", "selObjectPropertyName": "variable_set" },
				  { "argumentName": "variableName", "selObjectPropertyName": "name" },
				  { "argumentName": "newValue", "variableName": "newResult" }
				],
				// // [{"is_mandatory?":true,"name":"studyName","type":"STRING","testing arg posic":6},
				// // {"is_mandatory?":true,"name":"variableSetName","type":"STRING","testing arg posic":7},
				// // {"is_mandatory?":true,"name":"ownerTable","type":"STRING","testing arg posic":8},
				// // {"is_mandatory?":true,"name":"ownerId","type":"STRING","testing arg posic":9},
				// // {"is_mandatory?":true,"name":"variableName","type":"STRING","testing arg posic":10},
				// // {"is_mandatory?":true,"name":"newValue","type":"STRING","testing arg posic":11}]        
				"button": {
				  "z-icdon": "refresh",
				  "title": {
					"label_en": "Set Result", "label_es": "Entrar Result"
				  },
				  requiresObjectSelected : true
				},   
				"dialogInfo": {				  
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
		},
		
		
		"studyindividuals": {
			"component": "TableWithButtons",
			"langConfig": {		
				"title": {"label_en": "Individuals from Study ", "label_es": "Individuos Estudio "},
				"gridName": "indivgrid",
				"selectedObjectName": "selectedStudy",
				"gridElementName": "study_individual",				
				"gridHeader": {
				  "individual_id": {"label_en": "Id", "label_es": "Id", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
				  "individual_name": {"label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "width": "20%"},
				  "created_by": {"label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"},
				  "created_on": {"label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"},				}
			},
			"actions":[
				  { "actionName": "STUDY_CREATE_INDIVIDUAL",
					"clientMethod": "newStudyIndividual",
					"selObjectVariableName": "selectedIndiv",
					"endPointUrl": "Projects",
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
					"endPointUrl": "Projects",
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
					"endPointUrl": "Projects",
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
					"endPointUrl": "Projects",  
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
		
				"studyindividualssamples": {
					"component": "TableWithButtons",
					"langConfig": {		
						"title": {"label_en": "Samples Set Samples from Study ", "label_es": "Muestras del Agrupador de Muestras Estudio "},
						"gridName": "samplesetsamplevariablegrid",
						"selectedObjectName": "selectedStudy",
						"gridElementName": "selectedSampleSetSampleVariable",				
						"gridHeader": {
						  "sample_id": {"label_en": "Smp Id", "label_es": "Id", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
						  "individual_name": {"label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "width": "20%"},
						  "created_by": {"label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"},
						  "created_on": {"label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"}
						}
					},
					"actions":[
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
				"studyindividualssamplesvariables": {
					"component": "TableWithButtons",
					"langConfig": {		
						"title": {"label_en": "Samples Set Samples from Study ", "label_es": "Muestras del Agrupador de Muestras Estudio "},
						"gridName": "samplesetsamplevariablegrid",
						"selectedObjectName": "selectedStudy",
						"gridElementName": "selectedSampleSetSampleVariable",				
						"gridHeader": {
						  "id": {"label_en": "Id", "label_es": "Id", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
						  "type": {"label_en": "Type", "label_es": "Tipo", "sort": false, "filter": true, "width": "20%"},
						  "name": {"label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "width": "20%"},
						  "value": {"label_en": "Value", "label_es": "Valor", "sort": false, "filter": true, "width": "20%"}
						}
					},
					"actions":[
						{ "actionName": "STUDY_OBJECT_SET_VARIABLE_VALUE",
			  "requiresDialog": true,
				"clientMethod": "studyObjectSetVariableValue",
				"selObjectVariableName": "selectedVariable",
				"endPointUrl": "Projects",
				"endPointParams": [
				  { "argumentName": "studyName", "ZZZselObjectPropertyName": "study"},
				  { "argumentName": "ownerId", "selObjectPropertyName": "owner_id" },
				  { "argumentName": "ownerTable", "selObjectPropertyName": "owner_table" },
				  { "argumentName": "variableSetName", "selObjectPropertyName": "variable_set" },
				  { "argumentName": "variableName", "selObjectPropertyName": "name" },
				  { "argumentName": "newValue", "variableName": "newResult" }
				],
				// // [{"is_mandatory?":true,"name":"studyName","type":"STRING","testing arg posic":6},
				// // {"is_mandatory?":true,"name":"variableSetName","type":"STRING","testing arg posic":7},
				// // {"is_mandatory?":true,"name":"ownerTable","type":"STRING","testing arg posic":8},
				// // {"is_mandatory?":true,"name":"ownerId","type":"STRING","testing arg posic":9},
				// // {"is_mandatory?":true,"name":"variableName","type":"STRING","testing arg posic":10},
				// // {"is_mandatory?":true,"name":"newValue","type":"STRING","testing arg posic":11}]        
				"button": {
				  "z-icdon": "refresh",
				  "title": {
					"label_en": "Set Result", "label_es": "Entrar Result"
				  },
				  requiresObjectSelected : true
				},   
				"dialogInfo": {				  
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
				},		
		
		
		
		
		"studyfamilies": {
			"component": "TableWithButtons",
			"langConfig": {		
				"title": {"label_en": "Families from Study ", "label_es": "Familias Estudio "},
				"gridName": "familygrid",
				"selectedObjectName": "selectedStudy",
				"gridElementName": "study_family",				
				"gridHeader": {
				  "name": {        "label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "is_icon": true, "width": "10%"      },
				  "description": {        "label_en": "Description", "label_es": "Descripción", "sort": false, "filter": true, "width": "20%"      },
				  "created_by": {        "label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"      },
				  "created_on": {        "label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"      },
				}
			},
			"actions":[
				  { "actionName": "STUDY_CREATE_FAMILY",
					"clientMethod": "newStudyIndividual",
					"selObjectVariableName": "selectedFamily", 
					"endPointUrl": "Projects",
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
					"endPointUrl": "Projects",
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
					"endPointUrl": "Projects",  
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
					"endPointUrl": "Projects",
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
					"endPointUrl": "Projects",
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
		
				"studyindividuals": {
					"component": "TableWithButtons",
					"langConfig": {		
						"title": {"label_en": "Individuals from Study ", "label_es": "Individuos Estudio "},
						"gridName": "indivgrid",
						"selectedObjectName": "selectedStudy",
						"gridElementName": "study_individual",				
						"gridHeader": {
						  "individual_id": {"label_en": "Id", "label_es": "Id", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
						  "individual_name": {"label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "width": "20%"},
						  "created_by": {"label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"},
						  "created_on": {"label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"},				}
					},
					"actions":[
						  { "actionName": "STUDY_CREATE_INDIVIDUAL",
							"clientMethod": "newStudyIndividual",
							"selObjectVariableName": "selectedIndiv",
							"endPointUrl": "Projects",
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
							"endPointUrl": "Projects",
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
							"endPointUrl": "Projects",
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
							"endPointUrl": "Projects",  
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
				
						"studyindividualssamples": {
							"component": "TableWithButtons",
							"langConfig": {		
								"title": {"label_en": "Samples Set Samples from Study ", "label_es": "Muestras del Agrupador de Muestras Estudio "},
								"gridName": "samplesetsamplevariablegrid",
								"selectedObjectName": "selectedStudy",
								"gridElementName": "selectedSampleSetSampleVariable",				
								"gridHeader": {
								  "sample_id": {"label_en": "Smp Id", "label_es": "Id", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
								  "individual_name": {"label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "width": "20%"},
								  "created_by": {"label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"},
								  "created_on": {"label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"}
								}
							},
							"actions":[
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
						"studyindividualssamplesvariables": {
							"component": "TableWithButtons",
							"langConfig": {		
								"title": {"label_en": "Samples Set Samples from Study ", "label_es": "Muestras del Agrupador de Muestras Estudio "},
								"gridName": "samplesetsamplevariablegrid",
								"selectedObjectName": "selectedStudy",
								"gridElementName": "selectedSampleSetSampleVariable",				
								"gridHeader": {
								  "id": {"label_en": "Id", "label_es": "Id", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
								  "type": {"label_en": "Type", "label_es": "Tipo", "sort": false, "filter": true, "width": "20%"},
								  "name": {"label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "width": "20%"},
								  "value": {"label_en": "Value", "label_es": "Valor", "sort": false, "filter": true, "width": "20%"}
								}
							},
							"actions":[
								{ "actionName": "STUDY_OBJECT_SET_VARIABLE_VALUE",
					  "requiresDialog": true,
						"clientMethod": "studyObjectSetVariableValue",
						"selObjectVariableName": "selectedVariable",
						"endPointUrl": "Projects",
						"endPointParams": [
						  { "argumentName": "studyName", "ZZZselObjectPropertyName": "study"},
						  { "argumentName": "ownerId", "selObjectPropertyName": "owner_id" },
						  { "argumentName": "ownerTable", "selObjectPropertyName": "owner_table" },
						  { "argumentName": "variableSetName", "selObjectPropertyName": "variable_set" },
						  { "argumentName": "variableName", "selObjectPropertyName": "name" },
						  { "argumentName": "newValue", "variableName": "newResult" }
						],
						// // [{"is_mandatory?":true,"name":"studyName","type":"STRING","testing arg posic":6},
						// // {"is_mandatory?":true,"name":"variableSetName","type":"STRING","testing arg posic":7},
						// // {"is_mandatory?":true,"name":"ownerTable","type":"STRING","testing arg posic":8},
						// // {"is_mandatory?":true,"name":"ownerId","type":"STRING","testing arg posic":9},
						// // {"is_mandatory?":true,"name":"variableName","type":"STRING","testing arg posic":10},
						// // {"is_mandatory?":true,"name":"newValue","type":"STRING","testing arg posic":11}]        
						"button": {
						  "z-icdon": "refresh",
						  "title": {
							"label_en": "Set Result", "label_es": "Entrar Result"
						  },
						  requiresObjectSelected : true
						},   
						"dialogInfo": {				  
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
						},		
		

		
		"studysamplesset": {
			"component": "TableWithButtons",
			"langConfig": {		
				"title": {"label_en": "Samples Set from Study ", "label_es": "Agrupador de Muestras Estudio "},
				"gridName": "sampleSetgrid",
				"selectedObjectName": "selectedStudy",
				"gridElementName": "study_samples_set",				
				"gridHeader": {
					  "name": {"label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
					  "description": {"label_en": "Description", "label_es": "Descripción", "sort": false, "filter": true, "width": "20%"},
					  "created_by": {"label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"},
					  "created_on": {"label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"}
				}
			},
			"actions":[
				  { "actionName": "STUDY_CREATE_SAMPLES_SET",
					"clientMethod": "newStudyIndividual",
					"selObjectVariableName": "selectedSampleSet",
					"endPointUrl": "Projects",
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
					"endPointUrl": "Projects",
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
					"endPointUrl": "Projects",  
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
					"endPointUrl": "Projects",
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
					"endPointUrl": "Projects",
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
				"studysamplessetsample": {
					"component": "TableWithButtons",
					"langConfig": {		
						"title": {"label_en": "Samples Set Samples from Study ", "label_es": "Muestras del Agrupador de Muestras Estudio "},
						"gridName": "samplesetsamplesgrid",
						"selectedObjectName": "selectedStudy",
						"gridElementName": "selectedSampleSetSample",				
						"gridHeader": {
						  "sample_id": {"label_en": "Smp Id", "label_es": "Id", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
						  "individual_name": {"label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "width": "20%"},
						  "created_by": {"label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"},
						  "created_on": {"label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"},	
						}
					},
					"actions":[
					
					]
				},
				
				"samplesetsamplevariablegrid": {
					"component": "TableWithButtons",
					"langConfig": {		
						"title": {"label_en": "Samples Set Samples from Study ", "label_es": "Muestras del Agrupador de Muestras Estudio "},
						"gridName": "samplesetsamplevariablegrid",
						"selectedObjectName": "selectedStudy",
						"gridElementName": "selectedSampleSetSampleVariable",				
						"gridHeader": {
						}
					},
					"actions":[
								{ "actionName": "STUDY_OBJECT_SET_VARIABLE_VALUE",
					  "requiresDialog": true,
						"clientMethod": "studyObjectSetVariableValue",
						"selObjectVariableName": "selectedVariable",
						"endPointUrl": "Projects",
						"endPointParams": [
						  { "argumentName": "studyName", "ZZZselObjectPropertyName": "study"},
						  { "argumentName": "ownerId", "selObjectPropertyName": "owner_id" },
						  { "argumentName": "ownerTable", "selObjectPropertyName": "owner_table" },
						  { "argumentName": "variableSetName", "selObjectPropertyName": "variable_set" },
						  { "argumentName": "variableName", "selObjectPropertyName": "name" },
						  { "argumentName": "newValue", "variableName": "newResult" }
						],
						// // [{"is_mandatory?":true,"name":"studyName","type":"STRING","testing arg posic":6},
						// // {"is_mandatory?":true,"name":"variableSetName","type":"STRING","testing arg posic":7},
						// // {"is_mandatory?":true,"name":"ownerTable","type":"STRING","testing arg posic":8},
						// // {"is_mandatory?":true,"name":"ownerId","type":"STRING","testing arg posic":9},
						// // {"is_mandatory?":true,"name":"variableName","type":"STRING","testing arg posic":10},
						// // {"is_mandatory?":true,"name":"newValue","type":"STRING","testing arg posic":11}]        
						"button": {
						  "z-icdon": "refresh",
						  "title": {
							"label_en": "Set Result", "label_es": "Entrar Result"
						  },
						  requiresObjectSelected : true
						},   
						"dialogInfo": {				  
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
				},		
	}
}