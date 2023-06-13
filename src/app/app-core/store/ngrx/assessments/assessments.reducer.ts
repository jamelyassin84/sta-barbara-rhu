import {STORE_LOADERS} from '@digital_brand_work/states/store/helpers/store-loaders'
import {StoreLoaders} from '@digital_brand_work/states/store/models/loader.model'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'
import {Assessment} from 'app/app-core/models/assessment.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

export const assessmentAdapter: EntityAdapter<Assessment> =
    createEntityAdapter<Assessment>()

export interface AssessmentState extends EntityState<Assessment>, StoreLoaders {
    error: any
}

export const initialState: AssessmentState = assessmentAdapter.getInitialState({
    ...STORE_LOADERS,
    error: null,
})

export const assessmentsReducer = createReducer(
    initialState,

    on(StoreAction.ASSESSMENTS.SYSTEM.setLoader, (state, action) => {
        return {
            ...state,
            [`${action.loading.type}Loader`]: action.loading.state,
        }
    }),

    on(StoreAction.ASSESSMENTS.SYSTEM.onError, (state, action) => {
        return {
            ...state,
            error: action.error,
        }
    }),

    on(StoreAction.ASSESSMENTS.load.onSuccess, (state, action) =>
        assessmentAdapter.setAll(action.assessments, state),
    ),

    on(StoreAction.ASSESSMENTS.upsert.onSuccess, (state, action) =>
        assessmentAdapter.upsertOne(action.assessment, state),
    ),
)
