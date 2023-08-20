import {STORE_LOADERS} from '@digital_brand_work/states/store/helpers/store-loaders'
import {StoreLoaders} from '@digital_brand_work/states/store/models/loader.model'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'
import {SymptomsCategory} from 'app/app-core/models/symptoms-category.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

export const symptomCategoryAdapter: EntityAdapter<SymptomsCategory> =
    createEntityAdapter<SymptomsCategory>()

export interface SymptomsCategoryState
    extends EntityState<SymptomsCategory>,
        StoreLoaders {
    error: any
}

const initialState: SymptomsCategoryState =
    symptomCategoryAdapter.getInitialState({
        ...STORE_LOADERS,
        error: null,
    })

export const symptomCategoriesReducer = createReducer(
    initialState,

    on(StoreAction.SYMPTOMS_CATEGORIES.SYSTEM.setLoader, (state, action) => ({
        ...state,
        [`${action.loading.type}Loader`]: action.loading.state,
    })),

    on(StoreAction.SYMPTOMS_CATEGORIES.SYSTEM.onError, (state, action) => ({
        ...state,
        error: action.error,
    })),

    on(StoreAction.SYMPTOMS_CATEGORIES.load.onSuccess, (state, action) =>
        symptomCategoryAdapter.setAll(action.symptomCategories, state),
    ),

    on(StoreAction.SYMPTOMS_CATEGORIES.upsert.onSuccess, (state, action) =>
        symptomCategoryAdapter.upsertOne(action.symptomCategory, state),
    ),

    on(StoreAction.SYMPTOMS_CATEGORIES.remove.request, (state, action) =>
        symptomCategoryAdapter.removeOne(action.id, state),
    ),
)
