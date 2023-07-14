import {STORE_LOADERS} from '@digital_brand_work/states/store/helpers/store-loaders'
import {StoreLoaders} from '@digital_brand_work/states/store/models/loader.model'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'
import {AgeGroup} from 'app/app-core/models/age-group.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

export const ageGroupAdapter: EntityAdapter<AgeGroup> =
    createEntityAdapter<AgeGroup>()

export interface AgeGroupState extends EntityState<AgeGroup>, StoreLoaders {
    error: any
}

export const initialState: AgeGroupState = ageGroupAdapter.getInitialState({
    ...STORE_LOADERS,
    error: null,
})

export const ageGroupsReducer = createReducer(
    initialState,

    on(StoreAction.AGE_GROUP.SYSTEM.setLoader, (state, action) => ({
        ...state,
        [`${action.loading.type}Loader`]: action.loading.state,
    })),

    on(StoreAction.AGE_GROUP.SYSTEM.onError, (state, action) => ({
        ...state,
        error: action.error,
    })),

    on(StoreAction.AGE_GROUP.load.onSuccess, (state, action) =>
        ageGroupAdapter.setAll(action.ageGroups, state),
    ),
)
