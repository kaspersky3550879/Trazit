export const actions = {
  "GET_ACTIVE_PRODUCTION_LOTS": {
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
  }
}