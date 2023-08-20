import {NodeBaseModel} from '@digital_brand_work/models/core.model'
import {AppointmentNatureEnum} from '../enums/appointment-nature.enum'
import {AppointmentTypeEnum} from '../enums/appointment-type.enum'
import {RHUEnum} from '../enums/rhu.enum'
import {Diagnosis} from './diagnosis.model'
import {Patient} from './patient.model'
import {Assessment} from './assessment.model'
import {AppointmentStatusEnum} from '../enums/appointment-status.enum'

export interface Appointment extends NodeBaseModel {
    date: string
    rhu: RHUEnum
    patient: Patient
    patientId: string
    diagnosis: Diagnosis
    appointment_type: AppointmentTypeEnum
    appointment_nature: AppointmentNatureEnum
    assessment: Assessment
    status: AppointmentStatusEnum
}
