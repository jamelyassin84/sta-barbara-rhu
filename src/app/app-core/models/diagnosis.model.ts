import {NodeBaseModel} from '@digital_brand_work/models/core.model'
import {Patient} from './patient.model'

export interface Diagnosis extends NodeBaseModel {
    diagnosis: string
    medication_or_treatment: string
    name_of_health_care_provider: string
    laboratory_findings_or_impression: string
    performed_laboratory_test: string
    patient: Patient
}
