import {Pipe, PipeTransform} from '@angular/core'
import {AppointmentTypeEnum} from 'app/app-core/enums/appointment-type.enum'
import {Appointment} from 'app/app-core/models/appointment.model'

@Pipe({name: 'filter_appointment_by_type'})
export class FilterAppointmentByTypePipe implements PipeTransform {
    transform(
        appointments: Appointment[],
        appointmentType: AppointmentTypeEnum,
    ): Appointment[] {
        if (!appointmentType) {
            return appointments
        }

        return appointments.filter(
            (a) => a.appointment_type === appointmentType,
        )
    }
}
