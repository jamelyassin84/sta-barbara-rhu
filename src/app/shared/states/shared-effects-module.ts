import {EffectsModule} from '@ngrx/effects'
import {AnalyticsEffects} from 'app/app-core/store/ngrx/analytics/analytics.effects'
import {AppointmentEffects} from 'app/app-core/store/ngrx/appointments/appointments.effects'
import {AssessmentEffects} from 'app/app-core/store/ngrx/assessments/assessments.effects'
import {DiagnosisEffects} from 'app/app-core/store/ngrx/diagnosis/diagnosis.effects'
import {PatientEffects} from 'app/app-core/store/ngrx/patients/patients.effects'

export const sharedEffects = [
    EffectsModule.forFeature([
        AnalyticsEffects,
        AppointmentEffects,
        AssessmentEffects,
        DiagnosisEffects,
        PatientEffects,
    ]),
]
