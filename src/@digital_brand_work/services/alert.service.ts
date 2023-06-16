import {Injectable} from '@angular/core'
import {select, Store} from '@ngrx/store'
import * as uuid from 'uuid'
import {map, take} from 'rxjs'
import {AppState} from 'app/app-core/store/core/app.state'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {TransformEntity} from '@digital_brand_work/helpers/transform-entity'
import {Alert} from '@digital_brand_work/models/core.model'

@Injectable({providedIn: 'root'})
export class AlertService {
    constructor(private _store: Store<AppState>) {}
    addAlert(alert: Alert) {
        this._store.dispatch(
            StoreAction.ALERT.addAlert({alert: {...alert, id: uuid.v4()}}),
        )
        setTimeout(() => {
            this.pop()
        }, 4000)
    }
    pop() {
        this._store
            .pipe(
                select(StateEnum.ALERTS),
                take(1),
                map((x) => new TransformEntity(x).toArray().reverse()),
            )
            .subscribe((alerts) => {
                if (alerts.length !== 0) {
                    this._store.dispatch(
                        StoreAction.ALERT.deleteAlert({
                            id: alerts[0].id,
                        }),
                    )
                }
            })
    }
    clear() {
        this._store.dispatch(StoreAction.ALERT.clearAlerts())
    }
}
