import {STORE_LOADERS} from '@digital_brand_work/states/store/helpers/store-loaders'
import {StoreLoaders} from '@digital_brand_work/states/store/models/loader.model'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'
import {Analytics} from 'app/app-core/models/analytics.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

export const adapter: EntityAdapter<Analytics> =
    createEntityAdapter<Analytics>()

export interface AnalyticsState extends EntityState<Analytics>, StoreLoaders {
    error: any
}

export const initialState: AnalyticsState = adapter.getInitialState({
    ...STORE_LOADERS,
    error: null,
})

export const analyticsReducer = createReducer(
    initialState,

    on(StoreAction.ANALYTICS.SYSTEM.setLoader, (state, action) => {
        return {
            ...state,
            [`${action.loading.type}Loader`]: action.loading.state,
        }
    }),

    on(StoreAction.ANALYTICS.SYSTEM.onError, (state, action) => {
        return {
            ...state,
            error: action.error,
        }
    }),

    on(StoreAction.ANALYTICS.load.onSuccess, (state, action) =>
        adapter.setAll(action.analytics, state),
    ),
)
