import {Pipe, PipeTransform} from '@angular/core'
import {Appointment} from 'app/app-core/models/appointment.model'

@Pipe({name: 'sort_appointment_by_patient_name'})
export class SortAppointmentByPatientNamePipe implements PipeTransform {
    transform(appointments: Appointment[]): Appointment[] {
        return appointments.sort((a, b) => {
            const nameA =
                `${a.patient.first_name} ${a.patient.last_name}`.toLowerCase()
            const nameB =
                `${b.patient.first_name} ${b.patient.last_name}`.toLowerCase()

            if (nameA < nameB) {
                return -1 // a should come before b in the sorted order
            } else if (nameA > nameB) {
                return 1 // a should come after b in the sorted order
            } else {
                return 0 // a and b are equal in terms of sorting
            }
        })
    }
}
