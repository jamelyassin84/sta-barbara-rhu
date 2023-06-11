import {Appointment} from './appointment.model'
import {Diagnosis} from './diagnosis.model'

export interface Patient {
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
}
