import {createSelector} from '@ngrx/store'
import {AppState} from '../../core/app.state'
import {getStoreLoaders} from '@digital_brand_work/states/store/helpers/get-store-loaders'
import {UserState, userAdapter} from './users.reducer'

const feature = (state: AppState) => state.users

export const userLoaders = createSelector(feature, (state: UserState) =>
    getStoreLoaders(state),
)

export const usersBaseSelectors = userAdapter.getSelectors()
