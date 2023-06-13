import {STORE_LOADERS} from '@digital_brand_work/states/store/helpers/store-loaders'
import {StoreLoaders} from '@digital_brand_work/states/store/models/loader.model'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'
import {Patient} from 'app/app-core/models/patient.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

export const adapter: EntityAdapter<Patient> = createEntityAdapter<Patient>()

export interface PatientState extends EntityState<Patient>, StoreLoaders {
    error: any
}

export const initialState: PatientState = adapter.getInitialState({
    ...STORE_LOADERS,
    error: null,
})

export const patientsReducer = createReducer(
    initialState,

    on(StoreAction.PATIENTS.SYSTEM.setLoader, (state, action) => {
        return {
            ...state,
            [`${action.loading.type}Loader`]: action.loading.state,
        }
    }),

    on(StoreAction.PATIENTS.SYSTEM.onError, (state, action) => {
        return {
            ...state,
            error: action.error,
        }
    }),

    on(StoreAction.PATIENTS.load.onSuccess, (state, action) =>
        adapter.setAll(action.patients, state),
    ),

    on(StoreAction.PATIENTS.upsert.onSuccess, (state, action) =>
        adapter.upsertOne(action.patient, state),
    ),

    on(StoreAction.PATIENTS.remove.request, (state, action) =>
        adapter.removeOne(action.id, state),
    ),
)
