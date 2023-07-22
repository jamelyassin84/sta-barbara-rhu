import {Pipe, PipeTransform} from '@angular/core'
import {Patient} from 'app/app-core/models/patient.model'

@Pipe({name: 'sort_patient_by_name'})
export class SortPatientByNamePipe implements PipeTransform {
    transform(patients: Patient[]): Patient[] {
        return patients.sort((a: Patient, b: Patient) => {
            const nameA = a.last_name.toLowerCase()
            const nameB = b.last_name.toLowerCase()

            if (nameA < nameB) {
                return -1
            } else if (nameA > nameB) {
                return 1
            } else {
                return 0
            }
        })
    }
}
