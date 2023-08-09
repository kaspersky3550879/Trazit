export const App = {
  "TrackingChanges":{
	  "version": 0.9,
	  "last change on (YYYYMMDD)": "20220928",
	  "last_change_note_20220928": "Modified endpoint names to be case sensitve (APIactions and APIqueries) - modified ADD_WHITE_IP requiresGridItemSelected to false",
	  "last_change_note_20220926": "Added API to the API names, for actions and queries",
	  "last_change_note_20220926": "typo hidWhenSelectedItem when should be hideWhenSelectedItem",
	  "last_change_note_20220921": "replace whenDisabled by requiresGridItemSelected",
	  "last change note_20220918": "fixed about some endpoints still using the old naming convention, frontend instead of the new one, actions/queries"
  },	
  "ModuleSettings":{
	  "actionsEndpoints":[
		{ "name": "PlatformAdmin" , "url" : "/app/PlatformAdminAPIactions"}
	  ]
  },	
  "WhiteIpList": {
	"component": "TableWithButtons",
    "langConfig": {
	"title": {
        "WhiteIpList": {
          "label_en": "White (Accepted) IPs List",
          "label_es": "Lista de IPs aceptadas (Blancas)"
        }
      },
      "xxxfields": {
        "ip_value1": { "label_en": "Section 1", "label_es": "Bloque 1" },
        "ip_value2": { "label_en": "Section 2", "label_es": "Bloque 2" },
        "ip_value3": { "label_en": "Section 3", "label_es": "Bloque 3" },
        "ip_value4": { "label_en": "Section 4", "label_es": "Bloque 4" },
        "description": { "label_en": "Description", "label_es": "Descripción" }
      },
      "gridHeader": {
        "active": {
          "label_en": "Active", "label_es": "Activo", "sort": false, "filter": true, "is_icon": true, "width": "20%"
        },
        "ip_value1": {
          "label_en": "Section 1", "label_es": "Bloque 1", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "ip_value2": {
          "label_en": "Section 2", "label_es": "Bloque 2", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "ip_value3": {
          "label_en": "Section 3", "label_es": "Bloque 3", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "ip_value4": {
          "label_en": "Section 4", "label_es": "Bloque 4", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "description": {
          "label_en": "Description", "label_es": "Descripción", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        }
      }
    },	
    "viewQuery":{ "actionName": "GET_WHITE_IP_LIST",
      "xxxclientMethod": "getSamples",
      "addRefreshButton": true,
      "endPoint": "/app/PlatformAdminAPIqueries",
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      }
    },
    "actions": [
      { "actionName": "ADD_WHITE_IP",
		"requiresDialog": true,
        "xxxclientMethod": "setWhiteIpsList",
        "button": {
          "icon": "create_new_folder",
          "title": {
            "label_en": "New", "label_es": "Nuevo"
          },
          "requiresGridItemSelected": false
        },
        "dialogInfo": {          
			"name": "genericDialog",
			"fields":[
			{"text1": { "label_en": "Section 1", "label_es": "Sección 1" }},
			{"text2": { "label_en": "Section 2", "label_es": "Sección 2" }},
			{"text3": { "label_en": "Section 3", "label_es": "Sección 3" }},
			{"text4": { "label_en": "Section 4", "label_es": "Sección 4" }},
			{"text5": { "label_en": "Description", "label_es": "Descripción" }}			
			]
        },
        "endPointParams": [
          { "argumentName": "ip_value1", "element": "text1" },
          { "argumentName": "ip_value2", "element": "text2" },
          { "argumentName": "ip_value3", "element": "text3" },
          { "argumentName": "ip_value4", "element": "text4" },
          { "argumentName": "description", "element": "text5" }
        ]
      },
      { "actionName": "DEACTIVATE_WHITE_IP",
        "xxxclientMethod": "setWhiteIpsList",
		"requiresDialog": false,
        "button": {
            "img": "deactivate.svg",
            "title": {
              "label_en": "Deactivate", "label_es": "Desactivar"
            },
            "requiresGridItemSelected": true,
            "hideWhenSelectedItem": {
              "column": "active",
              "value": false
            }  
        },
        "endPointParams": [
          { "argumentName": "id", "selObjectPropertyName": "id" }
        ]
      },
      { "actionName": "ACTIVATE_WHITE_IP",
		"requiresDialog": false,
        "xxxclientMethod": "setWhiteIpsList",
        "button": {
            "img": "activate.svg",
            "title": {
              "label_en": "Activate", "label_es": "Activar"
            },
            "requiresGridItemSelected": true,
            "hideWhenSelectedItem": [
				{"column": "active","value": true},
				{"column": "active","value": true}
			]
        },
        "endPointParams": [
          { "argumentName": "id", "selObjectPropertyName": "id" }
        ]
      },
      { "actionName": "UPDATE_WHITE_IP",
        "xxxclientMethod": "setWhiteIpsList",
		"requiresDialog": true,
        "button": {
            "icon": "alarm_on",
            "title": {
                "label_en": "Update", "label_es": "Modificar"
            },
            "requiresGridItemSelected": true
        },
        "dialogInfo": {          
			"name": "genericDialog",
			"fields":[
				{"text1": { "label_en": "Section 1", "label_es": "Sección 1", "selObjectPropertyName": "ip_value1"}},
				{"text2": { "label_en": "Section 2", "label_es": "Sección 2", "selObjectPropertyName": "ip_value2" }},
				{"text3": { "label_en": "Section 3", "label_es": "Sección 3", "selObjectPropertyName": "ip_value3" }},
				{"text4": { "label_en": "Section 4", "label_es": "Sección 4", "selObjectPropertyName": "ip_value4" }},
				{"text5": { "label_en": "Description", "label_es": "Descripción", "selObjectPropertyName": "description" }}		
			]		  
        },
        "endPointParams": [
          { "argumentName": "id", "selObjectPropertyName": "id" },
          { "argumentName": "ip_value1", "element": "text1" },
          { "argumentName": "ip_value2", "element": "text2" },
          { "argumentName": "ip_value3", "element": "text3" },
          { "argumentName": "ip_value4", "element": "text4" },
          { "argumentName": "description", "element": "text5" }
        ]
    },
	  { "actionName": "REMOVE_WHITE_IP",
        "xxxclientMethod": "setWhiteIpsList",
		"requiresDialog":false,
        "button": {
          "icon": "remove",
          "title": {
            "label_en": "Remove", "label_es": "Borrar"
          },
          "requiresGridItemSelected": true
      },
      "endPointParams": [
        { "argumentName": "id", "selObjectPropertyName": "id" }
      ]
    }
  ]
  },
  "BlackIpList": {
	"component": "TableWithButtons",
    "langConfig": {
	"title": {
        "BlackIpList": {
          "label_en": "Black (Banned) IPs List",
          "label_es": "Lista de IPs bloqueadas (Baneadas)"
        }
      },
      "fields": {
        "ip_value1": { "label_en": "Section 1", "label_es": "Bloque 1" },
        "ip_value2": { "label_en": "Section 2", "label_es": "Bloque 2" },
        "ip_value3": { "label_en": "Section 3", "label_es": "Bloque 3" },
        "ip_value4": { "label_en": "Section 4", "label_es": "Bloque 4" },
        "description": { "label_en": "Description", "label_es": "Descripción" }
      },
      "gridHeader": {
        "active": {
          "label_en": "Active", "label_es": "Activo", "sort": false, "filter": true, "is_icon": true, "width": "20%"
        },
        "ip_value1": {
          "label_en": "Section 1", "label_es": "Bloque 1", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "ip_value2": {
          "label_en": "Section 2", "label_es": "Bloque 2", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "ip_value3": {
          "label_en": "Section 3", "label_es": "Bloque 3", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "ip_value4": {
          "label_en": "Section 4", "label_es": "Bloque 4", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "description": {
          "label_en": "Description", "label_es": "Descripción", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        }
      }
    },	
    "viewQuery":{ "actionName": "GET_BLACK_IP_LIST",
      "addRefreshButton": true,
      "endPoint": "/app/PlatformAdminAPIqueries",
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      }
    },
    "actions": [
      { "actionName": "ADD_BLACK_IP",
		"requiresDialog": true,
        "button": {
          "icon": "create_new_folder",
          "title": {
            "label_en": "New", "label_es": "Nuevo"
          },
          "whenDisabled": "samplesReload"
        },
        "dialogInfo": {          
			"name": "genericDialog",
			"fields":[
			{"text1": { "label_en": "Section 1", "label_es": "Sección 1" }},
			{"text2": { "label_en": "Section 2", "label_es": "Sección 2" }},
			{"text3": { "label_en": "Section 3", "label_es": "Sección 3" }},
			{"text4": { "label_en": "Section 4", "label_es": "Sección 4" }},
			{"text5": { "label_en": "Description", "label_es": "Descripción" }}		
			]
        },
        "endPointParams": [
          { "argumentName": "ip_value1", "element": "text1" },
          { "argumentName": "ip_value2", "element": "text2" },
          { "argumentName": "ip_value3", "element": "text3" },
          { "argumentName": "ip_value4", "element": "text4" },
          { "argumentName": "description", "element": "text5" }
        ]
      },
      { "actionName": "DEACTIVATE_BLACK_IP",
        "xxxclientMethod": "setWhiteIpsList",
		"requiresDialog": false,
        "button": {
            "img": "deactivate.svg",
            "title": {
              "label_en": "Deactivate", "label_es": "Desactivar"
            },
            "requiresGridItemSelected": true,
            "showWhenSelectedItem": {
              "column": "active",
              "value": true
            }  
        },
        "endPointParams": [
          { "argumentName": "id", "selObjectPropertyName": "id" }
        ]
      },
      { "actionName": "ACTIVATE_BLACK_IP",
		"requiresDialog": false,
        "button": {
            "img": "activate.svg",
            "title": {
              "label_en": "Activate", "label_es": "Activar"
            },
            "requiresGridItemSelected": true,
            "showWhenSelectedItem": {
              "column": "active",
              "value": false
            }  
        },
        "endPointParams": [
          { "argumentName": "id", "selObjectPropertyName": "id" }
        ]
      },
      { "actionName": "UPDATE_BLACK_IP",
		"requiresDialog": true,
        "button": {
            "icon": "alarm_on",
            "title": {
                "label_en": "Update", "label_es": "Modificar"
            },
            "requiresGridItemSelected": true
        },
        "dialogInfo": {          
			"name": "genericDialog",
			"fields":[
				{"text1": { "label_en": "Section 1", "label_es": "Sección 1", "selObjectPropertyName": "ip_value1"}},
				{"text2": { "label_en": "Section 2", "label_es": "Sección 2", "selObjectPropertyName": "ip_value2" }},
				{"text3": { "label_en": "Section 3", "label_es": "Sección 3", "selObjectPropertyName": "ip_value3" }},
				{"text4": { "label_en": "Section 4", "label_es": "Sección 4", "selObjectPropertyName": "ip_value4" }},
				{"text5": { "label_en": "Description", "label_es": "Descripción", "selObjectPropertyName": "description" }}		
			]		  
        },
        "endPointParams": [
          { "argumentName": "id", "selObjectPropertyName": "id" },
          { "argumentName": "ip_value1", "element": "text1" },
          { "argumentName": "ip_value2", "element": "text2" },
          { "argumentName": "ip_value3", "element": "text3" },
          { "argumentName": "ip_value4", "element": "text4" },
          { "argumentName": "description", "element": "text5" }
        ]
    },
	  { "actionName": "REMOVE_BLACK_IP",
		"requiresDialog":false,
        "button": {
          "icon": "remove",
          "title": {
            "label_en": "Remove", "label_es": "Borrar"
          },
          "requiresGridItemSelected": true
      },
      "endPointParams": [
        { "argumentName": "id", "selObjectPropertyName": "id" }
      ]
    }
  ]
  },
  "PlatformBusRules": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "platformBusRules": {
          "label_en": "Platform Business Rules",
          "label_es": "Reglas de Negocio de la Plataforma"
        }
      },
      "gridHeader": {
        "area": {"label_en": "Area", "label_es": "Área", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"},
        "rule_name": {"label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "is_icon": false, "width": "20%"},
        "rule_value": {"label_en": "Value", "label_es": "Valor", "sort": false, "filter": true, "is_icon": false, "width": "10%"},
        "disabled": {"label_en": "Disabled?", "label_es": "¿Deshabilitada?", "sort": false, "filter": true, "is_icon": true, "width": "10%"}
      }
    },
    "viewQuery":
    {
      "actionName": "GET_PLATFORM_BUSINESS_RULES",
      "addRefreshButton": true,
      "endPoint": "/app/PlatformAdminAPIqueries",
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      }
    },
    "actions": [
    ]
  }
}