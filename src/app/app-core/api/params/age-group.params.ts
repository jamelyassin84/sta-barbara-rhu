import {AppointmentTypeEnum} from 'app/app-core/enums/appointment-type.enum'

export interface AgeGroupParams {
    startAt: string
    endAt: string
    keyword: string
    appointmentType: AppointmentTypeEnum
}
