export const FakeCOA = {
    "report_info":{
        "report_information":{
			"label_en": "This report is COA v1, model releasedthe 1st of July of 2022",
			"label_es":"Informe COA v1, plantilla con fecha 1 de Julio de 2022"
		},
		"provisional_report":{
			"label_en": "Provisional Copy",
			"label_es": "Copia Provisional"
		}	
    },
    "logo": "./images/trazit-logo.png",
	"title":{"label_en": "Certificate of Analysis", "label_es": "CERTIFICADO ANALITICO"},
	"title2":{"label_en": "for Raw Material", "label_es": "DE MATERIA PRIMA"},  
	"header":{
		"column":[
			{"label_en":"Material", "label_es":"Material", "value":"Material X"},
			{"label_en":"Material", "label_es":"Material", "value":"Material X"}
		],
		"column2":[
			{"label_en":"Reception Date", "label_es":"F. Recepción", "value":"2023-05-11"},
			{},
			{"label_en":"Reception Date", "label_es":"F. Recepción", "value":"2023-05-11"}
		]
	},
	"resultsTable":{
		"header":[
			{"label_en":"Analysis", "label_es":"Determinación"},
			{"label_en":"Method", "label_es":"Método"},
			{"label_en":"Specification", "label_es":"Especificación"},
			{"label_en":"Result", "label_es":"Resultado"}
		],
		"values":[
			[
				{"value_en":"SOLUBILITY", "value_es":"SOLUBILIDAD"},
				{"value_en":"PCC-MMP-125", "value_es":"PCC-MMP-125"},
				{"value_en":"Freely soluble in chloroform, toluene, acetone and methanol, almost insoluble in water.", "value_es":"Fácilmente soluble en cloroformo, tolueno, acetona y metanol, casi insoluble en agua."},
				{"value_en":"Complies", "value_es":"Cumple"}
			],
			[
				{"value_en":"SOLUBILITY-2", "value_es":"SOLUBILIDAD"},
				{"value_en":"PCC-MMP-125", "value_es":"PCC-MMP-125"},
				{"value_en":"Freely soluble in chloroform, toluene, acetone and methanol, almost insoluble in water.", "value_es":"Fácilmente soluble en cloroformo, tolueno, acetona y metanol, casi insoluble en agua."},
				{"value_en":"Complies-2", "value_es":"Cumple"}
			]
		]
	},
	"usageDecision":{
		"decided": false,
		"label":{"label_en":"Usage Decision: ", "label_es":"Decisión de liberación: "},
		"noDecision":{"label_en":" Not Released yet", "label_es":"No liberado todavía"},
		"value":{"value_en":"Accepted", "value_es":"Aceptado"}
	},
	"signatures":[
		{
			"signed": true,
			"manualsign": false,
			"noSigned":{"label_en":" Not analysis completed yet", "label_es":"Análisis aún en proceso"},
			"signElectronicallyPhrase":{"label_en":"Signed electronically", "label_es":"Firmado electrónicamente"},
			"title":{"label_en":"Analyzed by: ", "label_es":"Analizado por: "},
			"author":{"value_en":"F. Gómez", "value_es":"F. Gómez"},
			"date":{"value_en":"2023-05-11", "value_es":"2023-05-11"}
		},
		{
			"signed": true,
			"manualsign": false,
			"noSigned":{"label_en":" No Revision completed yet", "label_es":"Revisión pendiente"},
			"signElectronicallyPhrase":{"label_en":"Signed electronically", "label_es":"Firmado electrónicamente"},
			"title":{"label_en":"Reviewed by: ", "label_es":"Revisado por: "},
			"author":{"value_en":"J. Merlo", "value_es":"J. Merlo"},
			"date":{"value_en":"2023-05-11", "value_es":"2023-05-11"}
		},
		{
			"signed": false,
			"manualsign": false,
			"noSigned":{"label_en":" Not released yet", "label_es":"Liberación pendiente"},
			"signElectronicallyPhrase":{"label_en":"Signed electronically", "label_es":"Firmado electrónicamente"},
			"title":{"label_en":"Released by: ", "label_es":"Liberado por: "},
			"author":{"value_en":"J. Merlo", "value_es":"J. Merlo"},
			"date":{"value_en":"2023-05-11", "value_es":"2023-05-11"}
		}
		
	]
	

}
