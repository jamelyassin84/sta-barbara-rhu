import {createSelector} from '@ngrx/store'
import {AppState} from '../../core/app.state'
import {AnalyticsState, analyticsAdapter} from './analytics.reducer'
import {getStoreLoaders} from '@digital_brand_work/states/store/helpers/get-store-loaders'

const feature = (state: AppState) => state.analytics

export const analyticsLoaders = createSelector(
    feature,
    (state: AnalyticsState) => getStoreLoaders(state),
)

export const analyticsBaseSelectors = analyticsAdapter.getSelectors()
