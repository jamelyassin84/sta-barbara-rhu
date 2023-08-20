import {createSelector} from '@ngrx/store'
import {AppState} from '../../core/app.state'
import {getStoreLoaders} from '@digital_brand_work/states/store/helpers/get-store-loaders'
import {
    SymptomsCategoryState,
    symptomCategoryAdapter,
} from './symptoms-category.reducer'

const feature = (state: AppState) => state.symptomsCategories

export const symptomCategoriesLoaders = createSelector(
    feature,
    (state: SymptomsCategoryState) => getStoreLoaders(state),
)

export const usersBaseSelectors = symptomCategoryAdapter.getSelectors()
