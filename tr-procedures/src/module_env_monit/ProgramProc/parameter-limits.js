import { html, css, nothing  } from 'lit';
import { CoreView } from './../../components/core-view';
import { Alignment, Layouts } from '@collaborne/lit-flexbox-literals';

let langConfig = {
  limitView: {
    header: { label_en: 'Program limits list', label_es: 'Lista de rangos límite para el programa' }
  },
  configTableSpecLimits: {
    'defaultBIG': {
      'rule': {
        'label_en': 'Rule', 'label_es': 'Regla'
      },
      'method_and_version': {
        'label_en': 'Method & Version', 'label_es': 'Método y Versión'
      },
      'analysis': {
        'label_en': 'Analysis', 'label_es': 'Análisis'
      },
      'parameter': {
        'label_en': 'Parameter', 'label_es': 'Parámetro'
      },
      'variation': {
        'label_en': 'Variation', 'label_es': 'Variación'
      },
      'value_GradoA': {
        'label_en': 'Grade A', 'label_es': 'Grado A'
      },
      'value_GradoB': {
        'label_en': 'Grade B', 'label_es': 'Grado B'
      },
      'value_GradoC': {
        'label_en': 'Grade C', 'label_es': 'Grado C'
      },
      'value_GradoD': {
        'label_en': 'Grade D', 'label_es': 'Grado D'
      },
      'value_AireActivo': {
        'label_en': 'Active Air', 'label_es': 'Aire Activo'
      },
      'value_AirePasivo': {
        'label_en': 'Pasive Air', 'label_es': 'Aire Pasivo'
      },
      'value_Contacto': {
        'label_en': 'Contact', 'label_es': 'Contacto'
      },
      'value_Activo': {
        'label_en': 'Active', 'label_es': 'Activo'
      },
      'value_Pasivo': {
        'label_en': 'Pasive', 'label_es': 'Pasivo'
      },
      'value_Recuento': {
        'label_en': 'Reading', 'label_es': 'Recuento'
      }
    },
    'default': [
      {'name':'rule', 'label_en': 'Rule', 'label_es': 'Regla'},
      {'name':'method_and_version','label_en': 'Method & Version', 'label_es': 'Método y Versión'},
      {'name':'analysis','label_en': 'Analysis', 'label_es': 'Análisis'},
      {'name':'parameter','label_en': 'Parameter', 'label_es': 'Parámetro'},
      {'name':'variation', 'label_en': 'Variation', 'label_es': 'Variación'},
      {'name':'testing_group','label_en': 'Testing Group', 'label_es': 'Grupo Analítico'}
    ],
    'proc-deploy': {
      'rule': {
        'label_en': 'Rule', 'label_es': 'Regla'
      },
      'method_and_version': {
        'label_en': 'Method & Version', 'label_es': 'Método y Versión'
      },
      'analysis': {
        'label_en': 'Analysis', 'label_es': 'Análisis'
      },
      'parameter': {
        'label_en': 'Parameter', 'label_es': 'Parámetro'
      },
      'variation': {
        'label_en': 'Variation', 'label_es': 'Variación'
      },
      'testing_group': {
        'label_en': 'Testing Group', 'label_es': 'Grupo Analítico'
      }
    }
  }
}

export class ParameterLimits extends CoreView {
  static get styles() {
    return [Layouts,
      super.styles,
      css`
      .styled-table {
        display: -webkit-inline-box;
        margin-top: 0px;
        margin-bottom: 3px;
        color: #4285f4;
        font-size:2vmin;
        border-collapse: collapse;
        margin: 25px 0;
        font-family: sans-serif;
        min-width: 400px;
        box-shadow: 0 0 20px #44cbe6;
      }            
      .styled-table thead tr {
        background-color: #2989d8;
        color: #ffffff;
        text-align: left;
      }   
      .styled-table th,
      .styled-table td {
        color: #032bbc; 
        padding: 12px 15px;
      }  
      .styled-table tbody tr {
        border-bottom: 1px solid #207cca;
      }
      .styled-table tbody tr:nth-of-type(even) {
        background-color: #c2f2ff5c;
      }
      .styled-table tbody tr:last-of-type {
        border-bottom: 2px solid #009879;
      }      
      .styled-table tbody tr.active-row {
        font-weight: bold;
        color: #009879;
      }
      `
    ];
  }

  static get properties() {
    return {
      lang: { type: String },
      procInstanceName: { type: String },
      viewModelFromProcModel: { type: Object},
      tableFieldsDefinition: {type: Array}
    }
  }
  constructor(){
    super()
    console.log(this.viewModelFromProcModel)
    if (this.viewModelFromProcModel===undefined){
      this.tableFieldsDefinition=langConfig.configTableSpecLimits.default;
      console.log(this.tableFieldsDefinition, '1')
      return
    }
    if (this.viewModelFromProcModel[parameterLimits]===undefined){
      this.tableFieldsDefinition=langConfig.configTableSpecLimits.default;
      console.log(this.tableFieldsDefinition, '2')
      return
    }
    if (this.viewModelFromProcModel[parameterLimits].configTableSpecLimits===undefined){
      this.tableFieldsDefinition=langConfig.configTableSpecLimits.default;
      console.log(this.tableFieldsDefinition, '3')
      return
    }
    this.tableFieldsDefinition=this.viewModelFromProcModel[parameterLimits].configTableSpecLimits
    console.log(this.tableFieldsDefinition, '4')
    //
    //
  }
  tabView() {
    console.log(this.tableFieldsDefinition)
    return html`
      <h2>${langConfig.limitView.header["label_"+ this.lang]} ${this.selectedProgram&&this.selectedProgram.name}</h2>
      <table class="styled-table">
        <thead>          
          <tr>
            ${this.tableFieldsDefinition.map(fld =>
              html`
              <th>${fld["label_"+ this.lang]}</th>
              `
            )}
            <th>Spec</th>
          </tr>
        </thead>
        <tbody>
        ${this.selectedProgram===undefined||this.selectedProgram.spec_definition===undefined||this.selectedProgram.spec_definition.spec_limits===undefined ? nothing : 
        html`
          ${this.selectedProgram&&this.selectedProgram.spec_definition.spec_limits.map(p => 
            html`
            <tr>
              ${this.tableFieldsDefinition.map(fld =>
                html`
                <td>${p[fld.name]}</td>
                `
              )}
              <td>
                <span style="color:green">${p["spec_text_green_area_"+ this.lang]}</span>
                <span style="color:orange">${p["spec_text_yellow_area_"+ this.lang]}</span>
                <span style="color:red">${p["spec_text_red_area_"+ this.lang]}</span>
              </td>
            </tr>
            `
          )}
        `}
        </tbody>
      </table>
    `;
  }

}
customElements.define('parameter-limits', ParameterLimits);