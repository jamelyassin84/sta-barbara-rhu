import {Component} from '@angular/core'
import {AddSymptomCategoryModal} from './add-symptom-category.service'
import {AppState} from 'app/app-core/store/core/app.state'
import {Store} from '@ngrx/store'
import {SymptomsCategoryForm} from 'app/app-core/store/ngrx/symptoms-category/symptoms-category.form'
import {AlertService} from '@digital_brand_work/services/alert.service'
import {StoreSelect} from '@fuse/decorators/ngrx-selector.decorator'
import {symptomCategoriesLoaders} from 'app/app-core/store/ngrx/symptoms-category/symptoms-category.selectors'
import {StoreLoaders} from '@digital_brand_work/states/store/models/loader.model'
import {Observable} from 'rxjs'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'

@Component({
    selector: 'add-symptom-category',
    templateUrl: './add-symptom-category.component.html',
    animations: [...dbwAnimations],
})
export class AddSymptomCategoryComponent {
    constructor(
        private _store: Store<AppState>,
        private _alertService: AlertService,
        private _symptomsCategoryForm: SymptomsCategoryForm,
        private _addSymptomCategoryModal: AddSymptomCategoryModal,
    ) {}

    @StoreSelect(symptomCategoriesLoaders)
    readonly loader$: Observable<StoreLoaders>

    readonly opened$ = this._addSymptomCategoryModal.opened$

    ngOnInit(): void {}

    form = this._symptomsCategoryForm.get()

    save() {
        if (this.form.invalid) {
            return
        }

        this._store.dispatch(
            StoreAction.SYMPTOMS_CATEGORIES.upsert.request({
                symptomCategory: this.form.value as any,
            }),
        )

        this._alertService.addAlert({
            type: 'success',
            title: 'Symptom Category Added',
            message: 'You have successfully added a Symptom Category',
        })

        this.opened$.next(false)
    }
}
