import {createSelector} from '@ngrx/store'
import {AppState} from '../../core/app.state'
import {getStoreLoaders} from '@digital_brand_work/states/store/helpers/get-store-loaders'
import {AgeGroupState, ageGroupAdapter} from '../age-groups/age-groups.reducer'

const feature = (state: AppState) => state.ageGroups

export const ageGroupLoaders = createSelector(feature, (state: AgeGroupState) =>
    getStoreLoaders(state),
)

export const ageGroupBaseSelectors = ageGroupAdapter.getSelectors()
