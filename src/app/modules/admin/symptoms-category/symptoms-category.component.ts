import {Component} from '@angular/core'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {Store} from '@ngrx/store'
import {SymptomsCategory} from 'app/app-core/models/symptoms-category.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {AddSymptomCategoryModal} from 'app/modules/modals/add-symptom-category/add-symptom-category.service'
import {Observable} from 'rxjs'

@Component({
    selector: 'symptoms-category',
    templateUrl: './symptoms-category.component.html',
})
export class SymptomsCategoryComponent {
    constructor(
        private _store: Store<AppState>,
        private _addSymptomCategoryModal: AddSymptomCategoryModal,
    ) {}

    @State({selector: StateEnum.SYMPTOMS_CATEGORIES, type: 'array'})
    symptomsCategories$: Observable<SymptomsCategory[]>

    ngOnInit(): void {
        this._store.dispatch(StoreAction.SYMPTOMS_CATEGORIES.load.request())
    }

    addSymptoms() {
        this._addSymptomCategoryModal.opened$.next(true)
    }
}
