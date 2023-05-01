import {Patient} from './patient.model'

export interface Diagnosis {
    diagnosis: string
    medication_or_treatment: string
    name_of_health_care_provider: string
    laboratory_findings_or_impression: string
    performed_laboratory_test: string
    patient: Patient
}
