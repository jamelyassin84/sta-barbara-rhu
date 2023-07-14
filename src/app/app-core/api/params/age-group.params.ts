import {AppointmentTypeEnum} from 'app/app-core/enums/appointment-type.enum'
import {RHUEnum} from 'app/app-core/enums/rhu.enum'

export interface AgeGroupParams {
    startAt: string
    endAt: string
    keyword: string
    appointmentType: AppointmentTypeEnum
    rhu: RHUEnum
}
