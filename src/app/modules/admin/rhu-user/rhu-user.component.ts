import {Component} from '@angular/core'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {Store} from '@ngrx/store'
import {RHUUser} from 'app/app-core/models/rhu-user.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {RHUUserAddModal} from 'app/modules/modals/rhu-user-add-modal/rhu-user-add-modal.service'
import {Observable} from 'rxjs'

@Component({
    selector: 'rhu-user',
    templateUrl: './rhu-user.component.html',
})
export class RhuUserComponent {
    constructor(
        private _store: Store<AppState>,
        private _RHUUserAddModal: RHUUserAddModal,
    ) {}

    @State({selector: StateEnum.USERS, type: 'array'})
    users$: Observable<RHUUser[]>

    ngOnInit(): void {
        this._store.dispatch(StoreAction.USERS.load.request())
    }

    addUser() {
        this._RHUUserAddModal.opened$.next(true)
    }
}
