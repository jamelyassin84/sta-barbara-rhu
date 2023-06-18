import {Component, Input} from '@angular/core'
import {Store} from '@ngrx/store'
import {RHUUser} from 'app/app-core/models/rhu-user.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'

@Component({
    selector: 'rhu-user-list',
    templateUrl: './rhu-user-list.component.html',
})
export class RhuUserListComponent {
    constructor(private _store: Store<AppState>) {}

    @Input({required: true})
    users: RHUUser[]

    remove(user: RHUUser) {
        this._store.dispatch(StoreAction.USERS.remove.request({id: user.id}))
    }
}
