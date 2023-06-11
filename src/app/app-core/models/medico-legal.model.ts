import {NodeBaseModel} from '@digital_brand_work/models/core.model'

export interface MedicoLegal extends NodeBaseModel {
    incident: string
    timeOfIncident: string
    dateOfIncident: string
    placeOfIncident: string
    dateOfArrival: string
    bloodPressure: string
    injuries: string[]
    medications: string[]
    medicalAttendanceDays: number
}
