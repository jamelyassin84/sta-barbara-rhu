import {Pipe, PipeTransform} from '@angular/core'
import {Patient} from '../models/patient.model'

@Pipe({name: 'to_full_name'})
export class ToFullNamePipe implements PipeTransform {
    transform(patient: Patient): string {
        return `${patient.last_name}, ${patient.first_name} ${patient.middle_name} ${patient.suffix_name}`
    }
}
