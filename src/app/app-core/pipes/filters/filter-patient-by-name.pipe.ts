import {Pipe, PipeTransform} from '@angular/core'
import {empty} from '@digital_brand_work/pipes/is-empty.pipe'
import {Patient} from 'app/app-core/models/patient.model'

@Pipe({name: 'filter_patients_by_name'})
export class FilterPatientsByNamePipe implements PipeTransform {
    transform(patients: Patient[], filter: string): Patient[] {
        if (empty(filter)) {
            return patients
        }

        return patients.filter((patient) => {
            const {first_name, last_name, middle_name} = patient

            const fullName = `${first_name} ${last_name} ${middle_name}`

            return fullName.toLowerCase().includes(filter.toLowerCase())
        })
    }
}
