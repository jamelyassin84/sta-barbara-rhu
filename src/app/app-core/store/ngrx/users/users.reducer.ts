import {STORE_LOADERS} from '@digital_brand_work/states/store/helpers/store-loaders'
import {StoreLoaders} from '@digital_brand_work/states/store/models/loader.model'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'
import {RHUUser} from 'app/app-core/models/rhu-user.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

export const userAdapter: EntityAdapter<RHUUser> =
    createEntityAdapter<RHUUser>()

export interface UserState extends EntityState<RHUUser>, StoreLoaders {
    error: any
}

export const initialState: UserState = userAdapter.getInitialState({
    ...STORE_LOADERS,
    error: null,
})

export const usersReducer = createReducer(
    initialState,

    on(StoreAction.USERS.SYSTEM.setLoader, (state, action) => ({
        ...state,
        [`${action.loading.type}Loader`]: action.loading.state,
    })),

    on(StoreAction.USERS.SYSTEM.onError, (state, action) => ({
        ...state,
        error: action.error,
    })),

    on(StoreAction.USERS.load.onSuccess, (state, action) =>
        userAdapter.setAll(action.users, state),
    ),

    on(StoreAction.USERS.upsert.onSuccess, (state, action) =>
        userAdapter.upsertOne(action.user, state),
    ),

    on(StoreAction.USERS.remove.request, (state, action) =>
        userAdapter.removeOne(action.id, state),
    ),
)
