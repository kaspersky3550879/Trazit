export function DataMiningReportModel(base) {
    return class extends base {

    envmonairsamplereport(strContent) {
        if (this.sampleData.sampleFieldsToDisplay && this.activeTab.label_en == "Sample") {
          this.sampleData.sampleFieldsToDisplay.forEach(d => {
            strContent += `<li>${d.field_name}: ${d.field_value}</li>`
          })
          strContent += `<h2>Stages</h2>`
          this.sampleData.stages.forEach(d => {
            strContent += `<table border="1" cellpadding="3" style="margin-bottom: 10px; border-collapse: collapse; width: 100%;"><tr><th>${d.current_stage}<br>${d.started_on}${d.ended_on&&` >> ${d.ended_on}`}</th></tr><tr><td>`
            if (d.current_stage == "Sampling") {
              d.data.forEach(data => {
                strContent += `Sampling Date: ${data.sampling_date}`
              })
            } else if (d.current_stage == "Incubation") {
              d.data.forEach(data => {
                strContent += `<table border="1" cellpadding="3" style="border-collapse: collapse; width: 100%;"><tr><th>Incubation 1</th><th>Incubation 2</th></tr><tr>`
                strContent += `<td>`
                data.incubation_1.forEach(f => {
                  if (f.field_name) {
                    strContent += `<li>${f.field_name}: ${f.field_value}</li>`
                  }
                })
                strContent += `</td><td>`
                data.incubation_2.forEach(f => {
                  if (f.field_name) {
                    strContent += `<li>${f.field_name}: ${f.field_value}</li>`
                  }
                })
                strContent += `</td></tr></table>`
              })
            } else if (d.current_stage == "PlateReading") {
              d.data.forEach(data => {
                if (data.field_name == "raw_value") {
                  strContent += `Number of Colonies: ${data.field_value}`
                }
              })
            } else {
              d.data.forEach(data => {
                strContent += `<li>${data.name}: ${data.items}</li>`
              })
            }
            strContent += `</td></tr></table>`
          })
        }
        return strContent
      }
    
      incubatorContent(strContent) {
        if (this.sampleData.incubatorFieldsToDisplay) {
          this.sampleData.incubatorFieldsToDisplay.forEach(d => {
            strContent += `<li>${d.field_name}: ${d.field_value}</li>`
          })
          strContent += this.chartContent()
        }
        return strContent
      }
    
      batchContent(strContent) {
        if (this.sampleData.batchFieldsToDisplay) {
          this.sampleData.batchFieldsToDisplay.forEach(d => {
            strContent += `<li>${d.field_name}: ${d.field_value}</li>`
          })
          strContent += this.chartContent()
          let batches = this.sampleData.SAMPLES_ARRAY.map(d => d.sample_id)
          strContent += `<table border="1" cellpadding="3" style="margin: 10px auto; border-collapse: collapse; width: 100%;"><tr><th>Batch Content (${this.sampleData.NUM_SAMPLES} samples)</th></tr><tr><td>${batches.join(", ")}</td></tr></table>`
        }
        return strContent
      }
    
      lotContent(strContent) {
        if (this.sampleData.prodLotFieldsToDisplay) {
          this.sampleData.prodLotFieldsToDisplay.forEach(d => {
            strContent += `<li>${d.field_name}: ${d.field_value}</li>`
          })
          strContent += this.chartContent()
          strContent += `<br><table border="1" cellpadding="3" style="margin-top: 10px; border-collapse: collapse; width: 100%;">`
          strContent += `<tr><th>Sample ID</th><th>Sampling Date</th><th>Sampling Date End</th><th>Raw Value</th></tr>`
          this.sampleData.sample.forEach(s => {
            if (s.spec_code) {
              strContent += `<tr><td>${s.sample_id}</td><td>${s.sampling_date}</td><td>${s.sampling_date_end}</td><td>${s.raw_value?s.raw_value:''}</td></tr>`
            }
          })
          strContent += `</table>`  
        }
        return strContent
      }
}
}