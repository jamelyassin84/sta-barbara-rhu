import {STORE_LOADERS} from '@digital_brand_work/states/store/helpers/store-loaders'
import {StoreLoaders} from '@digital_brand_work/states/store/models/loader.model'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'
import {Symptoms} from 'app/app-core/models/symptoms.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

export const symptomsAdapter: EntityAdapter<Symptoms> =
    createEntityAdapter<Symptoms>()

const initialState: SymptomsState = symptomsAdapter.getInitialState({
    ...STORE_LOADERS,
    error: null,
})

export interface SymptomsState extends EntityState<Symptoms>, StoreLoaders {
    error: any
}

export const symptomsReducer = createReducer(
    initialState,

    on(StoreAction.SYMPTOMS.SYSTEM.setLoader, (state, action) => ({
        ...state,
        [`${action.loading.type}Loader`]: action.loading.state,
    })),

    on(StoreAction.SYMPTOMS.SYSTEM.onError, (state, action) => ({
        ...state,
        error: action.error,
    })),

    on(StoreAction.SYMPTOMS.load.onSuccess, (state, action) =>
        symptomsAdapter.setAll(action.symptoms, state),
    ),
)
