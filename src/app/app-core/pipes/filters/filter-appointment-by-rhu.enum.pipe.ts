import {Pipe, PipeTransform} from '@angular/core'
import {AppointmentTypeEnum} from 'app/app-core/enums/appointment-type.enum'
import {RHUEnum} from 'app/app-core/enums/rhu.enum'
import {Appointment} from 'app/app-core/models/appointment.model'

@Pipe({name: 'filter_appointment_by_rhu'})
export class FilterAppointmentByRHUPipe implements PipeTransform {
    transform(appointments: Appointment[], filter: RHUEnum): Appointment[] {
        return appointments.filter((a) => a.rhu === filter)
    }
}
