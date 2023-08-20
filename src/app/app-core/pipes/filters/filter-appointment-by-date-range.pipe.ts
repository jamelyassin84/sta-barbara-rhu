import {Pipe, PipeTransform} from '@angular/core'
import {empty} from '@digital_brand_work/pipes/is-empty.pipe'
import {Appointment} from 'app/app-core/models/appointment.model'
import dayjs from 'dayjs'

@Pipe({name: 'filter_appointment_by_date_range'})
export class FilterAppointmentByDateRangePipe implements PipeTransform {
    transform(
        appointments: Appointment[],
        startAt: string,
        endAt: string,
    ): Appointment[] {
        if (empty(startAt) || empty(endAt)) {
            return appointments
        }

        return appointments.filter(
            (appointment: Appointment) =>
                dayjs(appointment.date).isAfter(dayjs(startAt), 'day') &&
                dayjs(appointment.date).isBefore(dayjs(endAt), 'day'),
        )
    }
}
