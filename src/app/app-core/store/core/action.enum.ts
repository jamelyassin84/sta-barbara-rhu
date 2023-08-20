import * as ALERT from 'app/app-core/store/ngrx/alert/alert.actions'
import * as ANALYTICS from 'app/app-core/store/ngrx/analytics/analytics.actions'
import * as APPOINTMENTS from 'app/app-core/store/ngrx/appointments/appointments.actions'
import * as ASSESSMENTS from 'app/app-core/store/ngrx/assessments/assessments.actions'
import * as DIAGNOSIS from 'app/app-core/store/ngrx/diagnosis/diagnosis.actions'
import * as PATIENTS from 'app/app-core/store/ngrx/patients/patients.actions'
import * as USERS from 'app/app-core/store/ngrx/users/users.actions'
import * as AGE_GROUP from 'app/app-core/store/ngrx/age-groups/age-groups.actions'
import * as SYMPTOMS_CATEGORIES from 'app/app-core/store/ngrx/symptoms-category/symptoms-category.actions'
import * as SYMPTOMS from 'app/app-core/store/ngrx/symptoms/symptoms.actions'

export const StoreAction = {
    ALERT,
    ANALYTICS,
    APPOINTMENTS,
    ASSESSMENTS,
    DIAGNOSIS,
    PATIENTS,
    USERS,
    AGE_GROUP,
    SYMPTOMS,
    SYMPTOMS_CATEGORIES,
}
