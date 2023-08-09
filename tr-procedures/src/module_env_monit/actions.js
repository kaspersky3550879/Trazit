export const actions = {
  "GET_ACTIVE_PRODUCTION_LOTS": {
    "actionName": "GET_ACTIVE_PRODUCTION_LOTS",
    "clientMethod": "getSamples",
    "endPoint": "/moduleenvmon/EnvMonAPIqueries",
    "button": {
      "icon": "refresh",
      "title": {
        "label_en": "Reload", "label_es": "Recargar"
      },
      "whenDisabled": "samplesReload"
    }
  },
  "EM_NEW_PRODUCTION_LOT": {
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
  "EM_ACTIVATE_PRODUCTION_LOT": {
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
          "endPoint": "/moduleenvmon/EnvMonAPIqueries",
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
  "EM_DEACTIVATE_PRODUCTION_LOT": {
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
}