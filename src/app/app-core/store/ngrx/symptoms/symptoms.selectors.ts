import {createSelector} from '@ngrx/store'
import {AppState} from '../../core/app.state'
import {getStoreLoaders} from '@digital_brand_work/states/store/helpers/get-store-loaders'
import {SymptomsState, symptomsAdapter} from './symptoms.reducer'

const feature = (state: AppState) => state.symptoms

export const symptomsLoaders = createSelector(feature, (state: SymptomsState) =>
    getStoreLoaders(state),
)

export const ageGroupBaseSelectors = symptomsAdapter.getSelectors()
