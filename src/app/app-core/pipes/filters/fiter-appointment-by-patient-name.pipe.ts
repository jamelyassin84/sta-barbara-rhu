import {Pipe, PipeTransform} from '@angular/core'
import {empty} from '@digital_brand_work/pipes/is-empty.pipe'
import {AppointmentTypeEnum} from 'app/app-core/enums/appointment-type.enum'
import {RHUEnum} from 'app/app-core/enums/rhu.enum'
import {Appointment} from 'app/app-core/models/appointment.model'

@Pipe({name: 'filter_appointment_by_patient_name'})
export class FilterAppointmentByPatientNamePipe implements PipeTransform {
    transform(appointments: Appointment[], filter: string): Appointment[] {
        if (empty(filter)) {
            return appointments
        }

        return appointments.filter((appointment: Appointment) => {
            const {first_name, last_name, middle_name} = appointment.patient

            const fullName = `${first_name} ${last_name} ${middle_name}`

            return fullName.toLowerCase().includes(filter.toLowerCase())
        })
    }
}
