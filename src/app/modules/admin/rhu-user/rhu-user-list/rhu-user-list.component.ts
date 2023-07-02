import {Component, Input} from '@angular/core'
import {StoreLoaders} from '@digital_brand_work/states/store/models/loader.model'
import {StoreSelect} from '@fuse/decorators/ngrx-selector.decorator'
import {Store} from '@ngrx/store'
import {RHUUser} from 'app/app-core/models/rhu-user.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {userLoaders} from 'app/app-core/store/ngrx/users/users.selectors'
import {Observable} from 'rxjs'

@Component({
    selector: 'rhu-user-list',
    templateUrl: './rhu-user-list.component.html',
})
export class RhuUserListComponent {
    constructor(private _store: Store<AppState>) {}

    @StoreSelect(userLoaders)
    readonly loader$: Observable<StoreLoaders>

    @Input({required: true})
    users: RHUUser[]

    remove(user: RHUUser) {
        this._store.dispatch(StoreAction.USERS.remove.request({id: user.id}))
    }
}
