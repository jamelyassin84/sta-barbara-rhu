import {createSelector} from '@ngrx/store'
import {AppState} from '../../core/app.state'
import {getStoreLoaders} from '@digital_brand_work/states/store/helpers/get-store-loaders'
import {DiagnosisState, diagnosisAdapter} from './diagnosis.reducer'

const feature = (state: AppState) => state.diagnosis

export const diagnosisLoaders = createSelector(
    feature,
    (state: DiagnosisState) => getStoreLoaders(state),
)

export const diagnosisBaseSelectors = diagnosisAdapter.getSelectors()
