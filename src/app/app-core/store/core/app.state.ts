import {AgeGroupState} from '../ngrx/age-groups/age-groups.reducer'
import {AlertState} from '../ngrx/alert/alert.reducer'
import {AnalyticsState} from '../ngrx/analytics/analytics.reducer'
import {AppointmentState} from '../ngrx/appointments/appointments.reducer'
import {AssessmentState} from '../ngrx/assessments/assessments.reducer'
import {DiagnosisState} from '../ngrx/diagnosis/diagnosis.reducer'
import {PatientState} from '../ngrx/patients/patients.reducer'
import {UserState} from '../ngrx/users/users.reducer'

export interface AppState {
    alerts: AlertState
    analytics: AnalyticsState
    appointments: AppointmentState
    assessments: AssessmentState
    diagnosis: DiagnosisState
    patients: PatientState
    users: UserState
    ageGroups: AgeGroupState
}
