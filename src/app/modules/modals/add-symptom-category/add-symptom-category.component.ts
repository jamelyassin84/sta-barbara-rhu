import {Component} from '@angular/core'
import {AddSymptomCategoryModal} from './add-symptom-category.service'
import {AppState} from 'app/app-core/store/core/app.state'
import {Store} from '@ngrx/store'

@Component({
    selector: 'add-symptom-category',
    templateUrl: './add-symptom-category.component.html',
})
export class AddSymptomCategoryComponent {
    constructor(
        private _store: Store<AppState>,
        private _addSymptomCategoryModal: AddSymptomCategoryModal,
    ) {}

    readonly opened$ = this._addSymptomCategoryModal.opened$

    save() {}
}
