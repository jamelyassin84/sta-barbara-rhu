import {Component, OnInit} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {Store} from '@ngrx/store'
import {Analytics} from 'app/app-core/models/analytics.model'
import {Appointment} from 'app/app-core/models/appointment.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {Observable} from 'rxjs'

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [...dbwAnimations],
})
export class DashboardComponent implements OnInit {
    constructor(private _store: Store<AppState>) {}

    @State({selector: StateEnum.ANALYTICS, type: 'object'})
    readonly analytics$: Observable<Analytics>

    @State({selector: StateEnum.APPOINTMENTS, type: 'array'})
    readonly appointments$: Observable<Appointment[]>

    ngOnInit() {
        setTimeout(() => {
            this._store.dispatch(StoreAction.ANALYTICS.load.request())

            this._store.dispatch(
                StoreAction.APPOINTMENTS.load.request({isToday: true}),
            )
        }, 1500)
    }
}
