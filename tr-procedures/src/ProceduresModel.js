import { EmDemoA } from './0proc_models/em-demo-a';
import { ProcDeploy } from './0proc_models/proc-deploy';
import { AppProc } from './0proc_models/app-proc';
import { EmAir } from './0proc_models/em-air';
import { App } from './0proc_models/app';
import { Genoma1 } from './0proc_models/genoma-1';
import { SampleCoaRel1 } from './0proc_models/sample-coa-rel1';
import { InvDraft } from './0proc_models/inv-draft';
import { MpRelease1 } from './0proc_models/mp-release1';
import { ProceduresManagement } from './0proc_models/ProceduresManagement';

export const ProceduresModel = {
  ['em-demo-a']: EmDemoA,
  ['proc-deploy']: ProcDeploy,
  ['app-proc']: AppProc,
  ['em-air-spr1']: EmAir,
  ['app']: App,
  ['genoma-1']: Genoma1,
  ['sample-coa-rel1']: SampleCoaRel1,
  ['inv-draft']: InvDraft,
  ['mp-release1']: MpRelease1, 
  ['procedures-management']: ProceduresManagement
}

export const DemoViews = [
  {"label":"EM-Air (em-demo-a)", "proc_instance_name": "em-demo-a", "views":[
    {"proc_instance_name": "em-demo-a", "view_name": "Home", "filter_name": "Home", "title": "Home"},
    {"proc_instance_name": "em-demo-a", "view_name": "LogSamples", "filter_name": "SampleLogin", "title": "Log Samples"},
    {"proc_instance_name": "em-demo-a", "view_name": "ProductionLots", "filter_name": "SampleLot", "title": "Production Lots"},
    {"proc_instance_name": "em-demo-a", "view_name": "SampleCultureMedia", "filter_name": "CultureMediaSMP", "title": "Sample Culture"},
    {"proc_instance_name": "em-demo-a", "view_name": "SamplePendingSampling", "filter_name": "SamplingSMP", "title": "Location Sampling"},
    {"proc_instance_name": "em-demo-a", "view_name": "SamplePendingSampling", "filter_name": "SamplingPERS", "title": "Personel Sampling"},
    {"proc_instance_name": "em-demo-a", "view_name": "SamplePendingSamplingInterval", "filter_name": "SamplingSMP", "title": "Location SamplingInterval"},
    {"proc_instance_name": "em-demo-a", "view_name": "SamplePendingSamplingInterval", "filter_name": "SamplingPERS", "title": "Person SamplingInterval"},
    {"proc_instance_name": "em-demo-a", "view_name": "SamplePlateReading", "filter_name": "PlateReadingSecondEntrySMP", "title": "Location-Plate Reading"},
    {"proc_instance_name": "em-demo-a", "view_name": "SamplePlateReading", "filter_name": "PlateReadingSecondEntryPERS", "title": "Person-Plate Reading"},
    {"proc_instance_name": "em-demo-a", "view_name": "SamplePlateReadingSecondEntry", "filter_name": "PlateReadingSecondEntrySMP", "title": "Location-Plate Reading 2nd Entry"},
    {"proc_instance_name": "em-demo-a", "view_name": "SamplePlateReadingSecondEntry", "filter_name": "PlateReadingSecondEntryPERS", "title": "Person-Plate Reading 2nd Entry"},
    {"proc_instance_name": "em-demo-a", "view_name": "SampleIncubation", "filter_name": "Incubation", "title": "Sample Incubation"},
    {"proc_instance_name": "em-demo-a", "view_name": "SampleMicroorganism", "filter_name": "MicroOrganismSMP", "title": "Sample Microorganism"},
    {"proc_instance_name": "em-demo-a", "view_name": "SampleMicroorganism", "filter_name": "MicroOrganismPERS", "title": "Personal Microorganism"},
    {"proc_instance_name": "em-demo-a", "view_name": "Programs", "filter_name": "Programs", "title": "Programs"},
    {"proc_instance_name": "em-demo-a", "view_name": "Deviation", "filter_name": "Deviation", "title": "Deviation"},
    {"proc_instance_name": "em-demo-a", "view_name": "Browser", "filter_name": "Browser", "title": "Browser"},
    {"proc_instance_name": "em-demo-a", "view_name": "DataMining", "filter_name": "DataMining", "title": "DataMining"},
    {"proc_instance_name": "em-demo-a", "view_name": "Incubators", "filter_name": "Incubators", "title": "Incubators"}
    ]
  },
  {"label":"EM-Water (proc-deploy)", "proc_instance_name": "proc-deploy", "views":[
    {"proc_instance_name": "proc-deploy", "view_name": "Home", "filter_name": "Home", "title": "Home"},
    {"proc_instance_name": "proc-deploy", "view_name": "LogSamples", "filter_name": "SampleLogin", "title": "Log Samples"},
    {"proc_instance_name": "proc-deploy", "view_name": "SamplePending", "filter_name": "Sampling", "title": "Sampling"},
    {"proc_instance_name": "proc-deploy", "view_name": "ProductionLots", "filter_name": "SampleLot", "title": "Production Lots"},
    {"proc_instance_name": "proc-deploy", "view_name": "SamplePendingSampling", "filter_name": "SamplingPERS", "title": "Personel Sampling"},
    {"proc_instance_name": "proc-deploy", "view_name": "SampleEnterResult", "filter_name": "ER-FQ", "title": "ER-FQ"},
    {"proc_instance_name": "proc-deploy", "view_name": "SampleEnterResult", "filter_name": "ER-MB", "title": "ER-MB"},
    {"proc_instance_name": "proc-deploy", "view_name": "ReviewTesting", "filter_name": "RT-FQ", "title": "RT-FQ"},
    {"proc_instance_name": "proc-deploy", "view_name": "ReviewTesting", "filter_name": "RT-MB", "title": "RT-MB"},
    {"proc_instance_name": "proc-deploy", "view_name": "ReviewTestingGroup", "filter_name": "RTG-FQ", "title": "RTG-FQ"},
    {"proc_instance_name": "proc-deploy", "view_name": "ReviewTestingGroup", "filter_name": "RTG-MB", "title": "RTG-MB"},
    {"proc_instance_name": "proc-deploy", "view_name": "ReviewSample", "filter_name": "Review", "title": "ReviewSample"},
    {"proc_instance_name": "proc-deploy", "view_name": "Programs", "filter_name": "Programs", "title": "Programs"},
    {"proc_instance_name": "proc-deploy", "view_name": "Deviation", "filter_name": "Deviation", "title": "Deviation"},
    {"proc_instance_name": "proc-deploy", "view_name": "Browser", "filter_name": "Browser", "title": "Browser"}
    ]
  },
  {"label":"Instruments (app-proc)", "proc_instance_name": "app-proc", "views":[
    {"proc_instance_name": "app-proc", "view_name": "InventoryLotsGeneral", "filter_name": "InventoryLots.1", "title": "Active Inventory Lots"},
    {"proc_instance_name": "app-proc", "view_name": "QualificationsInProgress", "filter_name": "QualificationsInProgress.1", "title": "Qualifications In Progress"},
    {"proc_instance_name": "app-proc", "view_name": "PlatformInstruments", "filter_name": "InstrumentsList", "title": "Instruments List"},
    {"proc_instance_name": "app-proc", "view_name": "PlatformInstrumentsfamilyCorrecto", "filter_name": "InstrumentsfamilyCorrecto", "title": "Instruments List FamilyCorrecto"},
    {"proc_instance_name": "app-proc", "view_name": "PlatformInstrumentsfamilyObsInterno", "filter_name": "InstrumentsfamilyObsInterno", "title": "Instruments List FamilyObsIntento"},
    {"proc_instance_name": "app-proc", "view_name": "EventsInProgress", "filter_name": "EventsER", "title": "Events In Progress"},
    {"proc_instance_name": "app-proc", "view_name": "InstrumentReport", "filter_name": "InstrumentReport", "title": "Instrument Report"},
    {"proc_instance_name": "app-proc", "view_name": "ConfigInstrumentFamilies", "filter_name": "ConfigInstrumentFamilies", "title": "Master: Instruments Familiy"},
	{"proc_instance_name": "app-proc", "view_name": "EventsCalendar", "filter_name": "EventsCalendar", "title": "Events Calendar"}
	
  ]},  
  {"label":"Instruments (app-instruments)", "proc_instance_name": "app-instruments", "views":[
    {"proc_instance_name": "app-instruments", "view_name": "InventoryLotsGeneral", "filter_name": "InventoryLots.1", "title": "Active Inventory Lots"},
    {"proc_instance_name": "app-instruments", "view_name": "QualificationsInProgress", "filter_name": "QualificationsInProgress.1", "title": "Qualifications In Progress"},
    {"proc_instance_name": "app-instruments", "view_name": "PlatformInstruments", "filter_name": "InstrumentsList", "title": "Instruments List"},
    {"proc_instance_name": "app-instruments", "view_name": "PlatformInstrumentsfamilyCorrecto", "filter_name": "InstrumentsListFamilyCorrecto", "title": "Instruments List FamilyCorrecto"},
    {"proc_instance_name": "app-instruments", "view_name": "EventsInProgress", "filter_name": "EventsER", "title": "Events In Progress"},
  ]},  
  {"label":"Platform Admin (app)", "proc_instance_name": "app", "views":[
    {"proc_instance_name": "app", "view_name": "InventoryLotsGeneral", "filter_name": "InventoryLots.1", "title": "Active Inventory Lots"},
    {"proc_instance_name": "app-instruments", "view_name": "QualificationsInProgress", "filter_name": "QualificationsInProgress.1", "title": "Qualifications In Progress"},
    {"proc_instance_name": "app", "view_name": "WhiteIpList", "filter_name": "WhiteIpList", "title": "White Ip List"},
    {"proc_instance_name": "app", "view_name": "BlackIpList", "filter_name": "BlackIpList", "title": "Black Ip List"},
    {"proc_instance_name": "app", "view_name": "PlatformBusRules", "filter_name": "PlatformBusRules", "title": "Platform Business Rules"},
  ]},  
  {"label":"genoma (genoma-1)", "proc_instance_name": "genoma-1", "views":[
    {"proc_instance_name": "genoma-1", "view_name": "InventoryLotsGeneral", "filter_name": "InventoryLots.1", "title": "Active Inventory Lots"},
    {"proc_instance_name": "genoma-1", "view_name": "QualificationsInProgress", "filter_name": "QualificationsInProgress.1", "title": "Qualifications In Progress"},
    {"proc_instance_name": "genoma-1", "view_name": "ProjectManager", "filter_name": "ProjectManager", "title": "Genoma-ProjectManager"},
    {"proc_instance_name": "genoma-1", "view_name": "StudyVariableValues", "filter_name": "StudyVariableValues", "title": "Genoma-StudyVariableValues"},
  ]},  
  {"label":"Instruments (sample-coa-rel1)", "proc_instance_name": "sample-coa-rel1", "views":[
    {"proc_instance_name": "sample-coa-rel1", "view_name": "InventoryLotsGeneral", "filter_name": "InventoryLots.1", "title": "Active Inventory Lots"},
    {"proc_instance_name": "sample-coa-rel1", "view_name": "QualificationsInProgress", "filter_name": "QualificationsInProgress.1", "title": "Qualifications In Progress"},
    {"proc_instance_name": "sample-coa-rel1", "view_name": "LogSamplesModuleSamples", "filter_name": "SampleLogin", "title": "sample-coa logSamples"},
    {"proc_instance_name": "sample-coa-rel1", "view_name": "SampleEnterResult", "filter_name": "ER-FQ", "title": "sample-coa-rel1 FQ"},
    {"proc_instance_name": "sample-coa-rel1", "view_name": "SampleEnterResult", "filter_name": "ER-MB", "title": "sample-coa-rel1 MB"},
    {"proc_instance_name": "sample-coa-rel1", "view_name": "ReviewTesting", "filter_name": "RT-FQ", "title": "sample-coa-rel1 RT FQ"},
    {"proc_instance_name": "sample-coa-rel1", "view_name": "ReviewTesting", "filter_name": "RT-MB", "title": "sample-coa-rel1 RT MB"},
    {"proc_instance_name": "sample-coa-rel1", "view_name": "ReviewTestingGroup", "filter_name": "RTG-FQ", "title": "sample-coa-rel1 RTG FQ"},
    {"proc_instance_name": "sample-coa-rel1", "view_name": "ReviewTestingGroup", "filter_name": "RTG-MB", "title": "sample-coa-rel1 RTG MB"},
    {"proc_instance_name": "sample-coa-rel1", "view_name": "ReviewSample", "filter_name": "Review", "title": "sample-coa-rel1 Review Sample"},
    {"proc_instance_name": "sample-coa-rel1", "view_name": "culture-medium", "filter_name": "culture-medium", "title": "culture-medium"},
  ]},  

  {"label":"Inventory Management (inv-draft)", "proc_instance_name": "inv-draft", "views":[
    {"proc_instance_name": "inv-draft", "view_name": "InventoryLotsGeneral", "filter_name": "InventoryLots.1", "title": "Active Inventory Lots"},
    {"proc_instance_name": "inv-draft", "view_name": "QualificationsInProgress", "filter_name": "QualificationsInProgress.1", "title": "Qualifications In Progress"},
    {"proc_instance_name": "inv-draft", "view_name": "InventoryLotsGeneral", "filter_name": "InventoryLotsGeneral", "title": "InventoryLots"},
    {"proc_instance_name": "inv-draft", "view_name": "InventoryLotsReactivos", "filter_name": "InventoryLotsReactivos", "title": "InventoryLotsReactivos"},
    {"proc_instance_name": "inv-draft", "view_name": "InventoryControls", "filter_name": "InventoryControls", "title": "InventoryControls"},
    {"proc_instance_name": "inv-draft", "view_name": "Deviation", "filter_name": "Deviation", "title": "Deviation"},
	{"proc_instance_name": "inv-draft", "view_name": "configReferences", "filter_name": "configReferences", "title": "config References"}	
  ]},
  {"label":"Raw Material Inspection Lots (mp-release1", "proc_instance_name": "mp-release1", "views":[
    {"proc_instance_name": "mp-release1", "view_name": "LotCreation", "filter_name": "LotCreation", "title": "lotCreation"},
    {"proc_instance_name": "mp-release1", "view_name": "LotView", "filter_name": "LotView", "title": "LotView"},
    {"proc_instance_name": "mp-release1", "view_name": "SampleEnterResult", "filter_name": "ER-FQ", "title": "ER-FQ"},
    {"proc_instance_name": "mp-release1", "view_name": "SampleEnterResult", "filter_name": "ER-MB", "title": "ER-MB"},
    {"proc_instance_name": "mp-release1", "view_name": "ReviewTesting", "filter_name": "RT-FQ", "title": "RT-FQ"},
    {"proc_instance_name": "mp-release1", "view_name": "ReviewTesting", "filter_name": "RT-MB", "title": "RT-MB"},
    {"proc_instance_name": "mp-release1", "view_name": "ReviewTestingGroup", "filter_name": "RTG-FQ", "title": "RTG-FQ"},
    {"proc_instance_name": "mp-release1", "view_name": "ReviewTestingGroup", "filter_name": "RTG-MB", "title": "RTG-MB"},
    {"proc_instance_name": "mp-release1", "view_name": "ReviewSample", "filter_name": "Review", "title": "ReviewSample"},
    {"proc_instance_name": "mp-release1", "view_name": "Browser", "filter_name": "Browser", "title": "Browser"},
	{"proc_instance_name": "mp-release1", "view_name": "Deviation", "filter_name": "Deviation", "title": "Deviation"}
  ]
  }
]