import {NodeBaseModel} from '@digital_brand_work/models/core.model'
import {Appointment} from './appointment.model'
import {Diagnosis} from './diagnosis.model'
import {MedicoLegal} from './medico-legal.model'

export interface Patient extends NodeBaseModel {
    first_name: string
    last_name: string
    middle_name: string
    suffix_name: string
    dob: string
    address: string
    email: string
    phone: string
    appointments: Appointment[]
    diagnosis: Diagnosis[]
    medicoLegal: MedicoLegal
}
