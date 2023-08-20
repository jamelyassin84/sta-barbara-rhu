import {Component, Input} from '@angular/core'
import {StoreLoaders} from '@digital_brand_work/states/store/models/loader.model'
import {StoreSelect} from '@fuse/decorators/ngrx-selector.decorator'
import {Store} from '@ngrx/store'
import {SymptomsCategory} from 'app/app-core/models/symptoms-category.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {symptomCategoriesLoaders} from 'app/app-core/store/ngrx/symptoms-category/symptoms-category.selectors'
import {Observable} from 'rxjs'

@Component({
    selector: 'symptoms-category-list',
    templateUrl: './symptoms-category-list.component.html',
})
export class SymptomsCategoryListComponent {
    constructor(private _store: Store<AppState>) {}

    @StoreSelect(symptomCategoriesLoaders)
    readonly loader$: Observable<StoreLoaders>

    @Input({required: true})
    symptomsCategories: SymptomsCategory[]

    remove(symptomsCategory: SymptomsCategory) {
        this._store.dispatch(
            StoreAction.SYMPTOMS_CATEGORIES.remove.request({
                id: symptomsCategory.id,
            }),
        )
    }
}
