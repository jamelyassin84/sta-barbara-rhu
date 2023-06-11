import {AppointmentNatureEnum} from '../enums/appointment-nature.enum'
import {AppointmentTypeEnum} from '../enums/appointment-type.enum'
import {RHUEnum} from '../enums/rhu.enum'
import {Diagnosis} from './diagnosis.model'
import {Patient} from './patient.model'

export interface Appointment {
    date: string
    rhu: RHUEnum
    patient: Patient
    patientId: string
    diagnosis: Diagnosis
    appointment_type: AppointmentTypeEnum
    appointment_nature: AppointmentNatureEnum
}
