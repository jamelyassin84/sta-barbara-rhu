import {StoreModule} from '@ngrx/store'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {alertReducer} from 'app/app-core/store/ngrx/alert/alert.reducer'
import {analyticsReducer} from 'app/app-core/store/ngrx/analytics/analytics.reducer'
import {appointmentsReducer} from 'app/app-core/store/ngrx/appointments/appointments.reducer'
import {assessmentsReducer} from 'app/app-core/store/ngrx/assessments/assessments.reducer'
import {diagnosisReducer} from 'app/app-core/store/ngrx/diagnosis/diagnosis.reducer'
import {patientsReducer} from 'app/app-core/store/ngrx/patients/patients.reducer'

export const sharedStateModules = [
    StoreModule.forFeature(StateEnum.ALERTS, alertReducer),
    StoreModule.forFeature(StateEnum.ANALYTICS, analyticsReducer),
    StoreModule.forFeature(StateEnum.APPOINTMENTS, appointmentsReducer),
    StoreModule.forFeature(StateEnum.ASSESSMENTS, assessmentsReducer),
    StoreModule.forFeature(StateEnum.DIAGNOSIS, diagnosisReducer),
    StoreModule.forFeature(StateEnum.PATIENTS, patientsReducer),
]
