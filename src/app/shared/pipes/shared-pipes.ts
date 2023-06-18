import {FilterAppointmentByTypePipe} from 'app/app-core/pipes/filters/filter-appointment-by-appointment-type.pipe'
import {FilterAppointmentByDateRangePipe} from 'app/app-core/pipes/filters/filter-appointment-by-date-range.pipe'
import {FilterAppointmentByRHUPipe} from 'app/app-core/pipes/filters/filter-appointment-by-rhu.enum.pipe'
import {FilterPatientsByNamePipe} from 'app/app-core/pipes/filters/filter-patient-by-name.pipe'
import {FilterAppointmentByPatientNamePipe} from 'app/app-core/pipes/filters/fiter-appointment-by-patient-name.pipe'
import {ToFullNamePipe} from 'app/app-core/pipes/to-full-name.pipe'

export const sharedPipes = [
    ToFullNamePipe,
    FilterAppointmentByTypePipe,
    FilterAppointmentByDateRangePipe,
    FilterAppointmentByRHUPipe,
    FilterPatientsByNamePipe,
    FilterAppointmentByPatientNamePipe,
]
