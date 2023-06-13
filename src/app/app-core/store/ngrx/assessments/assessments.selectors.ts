import {createSelector} from '@ngrx/store'
import {AppState} from '../../core/app.state'
import {getStoreLoaders} from '@digital_brand_work/states/store/helpers/get-store-loaders'
import {AssessmentState, assessmentAdapter} from './assessments.reducer'

const feature = (state: AppState) => state.assessments

export const assessmentLoaders = createSelector(
    feature,
    (state: AssessmentState) => getStoreLoaders(state),
)

export const assessmentBaseSelectors = assessmentAdapter.getSelectors()
