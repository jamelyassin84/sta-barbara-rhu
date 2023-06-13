import {STORE_LOADERS} from '@digital_brand_work/states/store/helpers/store-loaders'
import {StoreLoaders} from '@digital_brand_work/states/store/models/loader.model'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'
import {Diagnosis} from 'app/app-core/models/diagnosis.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

export const diagnosisAdapter: EntityAdapter<Diagnosis> =
    createEntityAdapter<Diagnosis>()

export interface DiagnosisState extends EntityState<Diagnosis>, StoreLoaders {
    error: any
}

export const initialState: DiagnosisState = diagnosisAdapter.getInitialState({
    ...STORE_LOADERS,
    error: null,
})

export const diagnosisReducer = createReducer(
    initialState,

    on(StoreAction.DIAGNOSIS.SYSTEM.setLoader, (state, action) => {
        return {
            ...state,
            [`${action.loading.type}Loader`]: action.loading.state,
        }
    }),

    on(StoreAction.DIAGNOSIS.SYSTEM.onError, (state, action) => {
        return {
            ...state,
            error: action.error,
        }
    }),

    on(StoreAction.DIAGNOSIS.load.onSuccess, (state, action) =>
        diagnosisAdapter.setAll(action.diagnosis, state),
    ),

    on(StoreAction.DIAGNOSIS.upsert.onSuccess, (state, action) =>
        diagnosisAdapter.upsertOne(action.diagnosis, state),
    ),
)
