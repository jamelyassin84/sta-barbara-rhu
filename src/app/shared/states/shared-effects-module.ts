import {EffectsModule} from '@ngrx/effects'
import {AgeGroupEffects} from 'app/app-core/store/ngrx/age-groups/age-groups.effects'
import {AnalyticsEffects} from 'app/app-core/store/ngrx/analytics/analytics.effects'
import {AppointmentEffects} from 'app/app-core/store/ngrx/appointments/appointments.effects'
import {AssessmentEffects} from 'app/app-core/store/ngrx/assessments/assessments.effects'
import {DiagnosisEffects} from 'app/app-core/store/ngrx/diagnosis/diagnosis.effects'
import {PatientEffects} from 'app/app-core/store/ngrx/patients/patients.effects'
import {SymptomsCategoryEffects} from 'app/app-core/store/ngrx/symptoms-category/symptoms-category.effects'
import {UserEffects} from 'app/app-core/store/ngrx/users/users.effects'

export const sharedEffects = [
    EffectsModule.forFeature([
        AnalyticsEffects,
        AppointmentEffects,
        AssessmentEffects,
        DiagnosisEffects,
        PatientEffects,
        UserEffects,
        AgeGroupEffects,
        SymptomsCategoryEffects,
    ]),
]
