import {STORE_LOADERS} from '@digital_brand_work/states/store/helpers/store-loaders'
import {StoreLoaders} from '@digital_brand_work/states/store/models/loader.model'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'
import {Patient} from 'app/app-core/models/patient.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

export const patientAdapter: EntityAdapter<Patient> =
    createEntityAdapter<Patient>()

export interface PatientState extends EntityState<Patient>, StoreLoaders {
    error: any
    patient: Patient
}

export const initialState: PatientState = patientAdapter.getInitialState({
    ...STORE_LOADERS,
    error: null,
    patient: undefined,
})

export const patientsReducer = createReducer(
    initialState,

    on(StoreAction.PATIENTS.SYSTEM.setLoader, (state, action) => ({
        ...state,
        [`${action.loading.type}Loader`]: action.loading.state,
    })),

    on(StoreAction.PATIENTS.SYSTEM.onError, (state, action) => ({
        ...state,
        error: action.error,
    })),

    on(StoreAction.PATIENTS.show.onSuccess, (state, action) => ({
        ...state,
        patient: action.patient,
    })),

    on(StoreAction.PATIENTS.load.onSuccess, (state, action) =>
        patientAdapter.setAll(action.patients, state),
    ),

    on(StoreAction.PATIENTS.upsert.onSuccess, (state, action) =>
        patientAdapter.upsertOne(action.patient, state),
    ),

    on(StoreAction.PATIENTS.remove.request, (state, action) =>
        patientAdapter.removeOne(action.id, state),
    ),
)
