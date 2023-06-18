import {Component} from '@angular/core'
import {RHUUserAddModal} from './rhu-user-add-modal.service'
import {AppState} from 'app/app-core/store/core/app.state'
import {Store} from '@ngrx/store'
import {UserForm} from 'app/app-core/store/ngrx/users/users.form'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AlertService} from '@digital_brand_work/services/alert.service'
import {userLoaders} from 'app/app-core/store/ngrx/users/users.selectors'
import {StoreSelect} from '@fuse/decorators/ngrx-selector.decorator'
import {Observable} from 'rxjs'
import {StoreLoaders} from '@digital_brand_work/states/store/models/loader.model'
import {RHUUserTypEnum} from 'app/app-core/enums/rhu-user-type.enum'

@Component({
    selector: 'rhu-user-add-modal',
    templateUrl: './rhu-user-add-modal.component.html',
})
export class RhuUserAddModalComponent {
    constructor(
        private _userForm: UserForm,
        private _store: Store<AppState>,
        private _alertService: AlertService,
        private _RHUUserAddModal: RHUUserAddModal,
    ) {}

    @StoreSelect(userLoaders)
    readonly loader$: Observable<StoreLoaders>

    readonly opened$ = this._RHUUserAddModal.opened$

    readonly TYPES = Object.values(RHUUserTypEnum)

    ngOnInit(): void {}

    form = this._userForm.get()

    save() {
        if (this.form.invalid) {
            return
        }

        this._store.dispatch(
            StoreAction.USERS.upsert.request({user: this.form.value as any}),
        )

        this._alertService.addAlert({
            type: 'success',
            title: 'User Added',
            message: 'You have successfully added a user',
        })

        this.opened$.next(false)
    }
}
