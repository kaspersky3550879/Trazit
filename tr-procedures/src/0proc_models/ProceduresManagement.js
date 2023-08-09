export const ProceduresManagement = {
    "TrackingChanges": {
        "version": 0.9,
    },
    "ModuleSettings": {
        "actionsEndpoints": [
            { "name": "procActions", "url": "/appProcMgr/RequirementsProcedureDefinitionAPIActions" },
        ]
    },
    "ProceduresFake":
    
{"name":"ProcDeployment","title":{"label_en":"Procedure Deployment","label_es":"Desplegar Proceso"},"expanded":false,"alternative_endpoint_data":"actionOutput",
"view_definition":
    {"label_en":"Deploy Requirements","label_es":"Desplegar Requerimientos",
    "hasDetail": true,
    "detail":{
        "endPoint":"/appProcMgr/RequirementsProcedureDefinitionAPIActions",
        "actionName":"DEPLOY_REQUIREMENTS","notGetViewData":true,
        "type": "actionWithFilter",
        "button": {"label_en":"Run","button_label_es":"Ejecutar"},
        "filterFields":[
            {"text1":{"label_en":"Proc Name","label_es":"Proceso","internalVariableSimpleObjName":"selectedProcInstance","internalVariableSimpleObjProperty":"procedure_name"}},{"number1":{"label_en":"Version","label_es":"Proceso","internalVariableSimpleObjName":"selectedProcInstance","internalVariableSimpleObjProperty":"procedure_version"}},{"text2":{"label_en":"Instance Name","label_es":"Instancia","internalVariableSimpleObjName":"selectedProcInstance","internalVariableSimpleObjProperty":"proc_instance_name"}},{"text3":{"label_en":"Module Name","label_es":"Nombre del Módulo","internalVariableSimpleObjName":"selectedProcInstance","internalVariableSimpleObjProperty":"module_name"}},{"checkbox1":{"label_en":"Repositories and Base Tables","label_es":"Repositorios y Tablas Base","default_value":true}},{"checkbox2":{"label_en":"Procedure Info","label_es":"Info de Proceso","default_value":true}},{"checkbox3":{"label_en":"Procedure User & Roles","label_es":"Usuarios y Perfiles","default_value":true}},{"checkbox4":{"label_en":"SOPs","label_es":"PNTs","default_value":false}},{"checkbox5":{"label_en":"Assign SOPs to Users","label_es":"Asignar PNTs a usuarios","default_value":false}},{"checkbox6":{"label_en":"Events","label_es":"Eventos","default_value":false}},{"checkbox7":{"label_en":"Business Rules","label_es":"Reglas de Negocio","default_value":false}},{"checkbox8":{"label_en":"Module Tables and Fields","label_es":"Tablas y Campos","default_value":false}},{"checkbox9":{"label_en":"Master Data","label_es":"Datos Maestros","default_value":false}}],
        "endPointParams":[
            {"argumentName":"procedureName","element":"text1"},{"argumentName":"procedureVersion","element":"number1"},{"argumentName":"procInstanceName","element":"text2"},{"argumentName":"moduleName","element":"text3"},{"argumentName":"deployRepositoriesAndProcTbls","element":"checkbox1"},{"argumentName":"deployProcInfo","element":"checkbox2"},{"argumentName":"deployProcUserRoles","element":"checkbox3"},{"argumentName":"deployProcSopMetaData","element":"checkbox4"},{"argumentName":"deployProcSopsToUsers","element":"checkbox5"},{"argumentName":"deployProcEvents","element":"checkbox6"},{"argumentName":"deployProcBusinessRulesPropFiles","element":"checkbox7"},{"argumentName":"deployModuleTablesAndFields","element":"checkbox8"},{"argumentName":"deployMasterData","element":"checkbox9"}
        ],
        "filter":{"fixParams":{}}
    },
    "reportElements":[{"type":"cardSomeElementsSingleObject","endPointResponseObject":"Procedure Instance Info","title":"Main Information","num_columns":4,"fieldsToDisplay":[{"name":"dbName","label_en":"Trazit Instance","label_es":"Instancia de Trazit"},{"name":"Process Name","label_en":"Procedure Name","label_es":"Nombre de Proceso"},{"name":"Process Version","label_en":"Procedure Version","label_es":"Versión de Proceso"},{"name":"Instance Name","label_en":"Instance","label_es":"Instancia"}]},{"type":"cardSomeElementsSingleObject","endPointResponseObject":"actions_to_perform_settings","title":"Sections Performed","num_columns":3,"fieldsToDisplay":[{"name":"1) CREATE_REPOSITORIES_AND_PROC_TBLS","label_en":"Repositories and Proc Tables","label_es":"repositorios y Tablas de Proceso"},{"name":"2) PROCDEPL_PROCEDURE_INFO","label_en":"Procedure Info","label_es":"Información de Proceso"},{"name":"3) PROCDEPL_PROCEDURE_USER_ROLES","label_en":"Users and Roles","label_es":"Usuarios y Roles"},{"name":"4) PROCDEPL_PROCEDURE_SOP_META_DATA","label_en":"SOPs","label_es":"PNTs"},{"name":"5) PROCDEPL_ASIGN_PROC_SOPS_TO_USERS","label_en":"Assign SOPs to Users","label_es":"Asignar PNTs a Usuarios"},{"name":"6) PROCDEPL_PROCEDURE_EVENTS","label_en":"Menus","label_es":"Menús"},{"name":"7) PROCDEPL_BUSINESS_RULES_PROPTS_FILS","label_en":"Business Rules","label_es":"Reglas de Negocio"},{"name":"8) PROCDEPL_MODULE_TABLES_AND_FIELDS","label_en":"Tables and Fields","label_es":"Tablas y Campos"},{"name":"9) PROCDEPL_MASTER_DATA","label_en":"Master Data","label_es":"Datos Maestros"}]},{"type":"xjsonViewer","title":"Information","titleObj":{"label_en":"Information","label_es":"Información"},"endPointResponseObject":"Procedure Instance Info","subheadingObj":"text1"},{"type":"xjsonViewer","title":"Actions Log","titleObj":{"label_en":"Information","label_es":"Información"},"endPointResponseObject":"actions_to_perform_settings","subheadingObj":"text1"},{"type":"jsonViewer","title":"Log Summary","titleObj":{"label_en":"Information","label_es":"Información"},"endPointResponseObject":"sections_log","subheadingObj":"text1"}]}},
{"name":"TESTING_SCRIPTS",
"title":{"label_en":"Testing Scripts","label_es":"Guiones de Prueba"},
"expanded":true,
"alternative_endpoint_data":"testing",
"view_definition":{
    "hasDetail": true,
    "detail":{
        "name":"TESTING_SCRIPTS",
        "type": "objectsList",
        "xxxtype":"xxxreadOnlyTable",
        "endPointPropertyArray":["testing", "scripts"],
        "fieldsToDisplayInFilter":[{"name":"script_id","label_en":"Id","label_es":"Id"},{"name":"run_summary","label_en":"Summary","label_es":"Resumen"}
        ],
        "view_definition":[     
            {"type": "reportTitle",
                "title": {
                    "label_en": "1) Summary",
                    "label_es": "1) Resumen"
                },   
                "elements":[
                    {"type":"readOnlyTable","endPointResponseObject":"ROOT",
                    "columns":[{"name":"script_id","label_en":"Id","label_es":"Id"},{"name":"run_summary","label_en":"Summary","label_es":"Resumen"},{"name":"date_execution","label_en":"Run on","label_es":"Ejecutado en"},{"name":"eval_total_tests","label_en":"Number of Steps","label_es":"Número de Pasos"},{"label_en":"Sintaxis","label_es":"Sintáxis","fix_value_prefix":"Match: ","name":"eval_syntaxis_match","fix_value2_prefix":"UNmtch: ","name2":"eval_syntaxis_unmatch","fix_value3_prefix":"N/A:","name3":"eval_syntaxis_undefined"},{"label_en":"Notification","label_es":"Notificación","fix_value_prefix":"Match: ","name":"eval_code_match","fix_value2_prefix":"UNmtch: ","name2":"eval_code_unmatch","fix_value3_prefix":"N/A:","name3":"eval_code_undefined"},{"label_en":"Duration","label_es":"Duración","fix_value_prefix":"","name":"time_consume","fix_value2_prefix":" ("," (name2":"time_started","fix_value3_prefix":" - ","name3":"time_completed","fix_value3_suffix":") "}]
                    } 
                ]
            },
                       
        ]        
    },    
    "reportElements":[
        {"type":"xxxreadOnlyTable","endPointResponseObject":"scripts",
        "columns":[{"name":"script_id","label_en":"Id","label_es":"Id"},{"name":"run_summary","label_en":"Summary","label_es":"Resumen"},{"name":"date_execution","label_en":"Run on","label_es":"Ejecutado en"},{"name":"eval_total_tests","label_en":"Number of Steps","label_es":"Número de Pasos"},{"label_en":"Sintaxis","label_es":"Sintáxis","fix_value_prefix":"Match: ","name":"eval_syntaxis_match","fix_value2_prefix":"UNmtch: ","name2":"eval_syntaxis_unmatch","fix_value3_prefix":"N/A:","name3":"eval_syntaxis_undefined"},{"label_en":"Notification","label_es":"Notificación","fix_value_prefix":"Match: ","name":"eval_code_match","fix_value2_prefix":"UNmtch: ","name2":"eval_code_unmatch","fix_value3_prefix":"N/A:","name3":"eval_code_undefined"},{"label_en":"Duration","label_es":"Duración","fix_value_prefix":"","name":"time_consume","fix_value2_prefix":" ("," (name2":"time_started","fix_value3_prefix":" - ","name3":"time_completed","fix_value3_suffix":") "}]}
        ,{"type":"cardSomeElementsRepititiveObjects","endPointResponseObject":"scripts","add_border":true,"fieldsToDisplay":[{"name":"script_id","label_en":"Id","label_es":"Id"},{"name":"run_summary","label_en":"Summary","label_es":"Resumen"},{"name":"date_execution","label_en":"Run on","label_es":"Ejecutado en"},{"name":"eval_total_tests","label_en":"Number of Steps","label_es":"Número de Pasos"},{"label_en":"Sintaxis","label_es":"Sintáxis","fix_value_prefix":"Match: ","name":"eval_syntaxis_match","fix_value2_prefix":"UNmtch: ","name2":"eval_syntaxis_unmatch","fix_value3_prefix":"N/A:","name3":"eval_syntaxis_undefined"},{"label_en":"Notification","label_es":"Notificación","fix_value_prefix":"Match: ","name":"eval_code_match","fix_value2_prefix":"UNmtch: ","name2":"eval_code_unmatch","fix_value3_prefix":"N/A:","name3":"eval_code_undefined"},{"label_en":"Duration","label_es":"Duración","fix_value_prefix":"","name":"time_consume","fix_value2_prefix":" ("," (name2":"time_started","fix_value3_prefix":" - ","name3":"time_completed","fix_value3_suffix":") "}],"actions":[{"actionName":"TESTING_SCRIPT_RUN","endPoint":"/testing/platform/TestingRegressionUAT","requiresDialog":false,"certificationException":true,"secondaryActionToPerform":{"name":"testScriptPerformed","endPointParams":[{"argumentName":"lotName","selObjectPropertyName":"name"}]},"button":{"icon":"date_range","title":{"label_en":"Run Coverage Analysis","label_es":"Ejecutar Análisis de Cobertura"},"requiresGridItemSelected":false},"endPointParams":[{"argumentName":"scriptId","selObjectPropertyName":"script_id"},{"argumentName":"procManagement","fixValue":"true"}]}]}]}},
    

}