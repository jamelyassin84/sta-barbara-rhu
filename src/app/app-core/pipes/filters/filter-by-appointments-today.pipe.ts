import {Pipe, PipeTransform} from '@angular/core'
import {Appointment} from '../../models/appointment.model'
import dayjs from 'dayjs'

@Pipe({name: 'filter_by_appointments_today'})
export class FilterByAppointmentsTodayPipe implements PipeTransform {
    transform(appointments: Appointment[]): Appointment[] {
        const today = dayjs().startOf('day')

        return appointments.filter((a) => dayjs(a.date).isSame(today, 'day'))
    }
}
