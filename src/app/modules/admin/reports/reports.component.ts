import {Component} from '@angular/core'
import {AppointmentTypeEnum} from 'app/app-core/enums/appointment-type.enum'
import {RHUEnum} from 'app/app-core/enums/rhu.enum'
import * as XLSX from 'xlsx'
import * as FileSaver from 'file-saver'

@Component({
    selector: 'reports',
    templateUrl: './reports.component.html',
})
export class ReportsComponent {
    readonly RHU = Object.values(RHUEnum)
    readonly SERVICES = Object.values(AppointmentTypeEnum)

    currentRHU = this.RHU[0]
    currentService = this.SERVICES[0]
    diagnosis: string = ''

    generateExcel() {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
            [1, 2, 3, 4].map(() => {
                return {
                    id: 'JD34MN4BHGDKH',
                    Patient: 'John Doe',
                    'Appointment Type': 'General',
                    'Nature of Visit': 'New Admission',
                    Symptoms: 'Dry and Blood in Cough',
                    Diagnosis: 'Tuberculosis',
                    'Medication/Treatment': 'Anti-biotic',
                    Provider: 'Mary Jane',
                    'Findings/Impression': 'Phlegm in upper chest',
                    'Laboratory Test': 'X-ray',
                }
            }),
        )

        const workbook: XLSX.WorkBook = {
            Sheets: {data: worksheet},
            SheetNames: ['data'],
        }
        const excelBuffer: any = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        })
        const data: Blob = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
        })
        FileSaver.saveAs(data, `generated-${Date.now().toString()}.xlsx`)
    }
}
