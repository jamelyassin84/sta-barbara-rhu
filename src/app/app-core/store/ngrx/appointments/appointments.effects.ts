import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {switchMap, map, tap} from 'rxjs/operators'
import {StoreAction} from '../../core/action.enum'
import {AppointmentService} from './appointments.service'

@Injectable({
    providedIn: 'root',
})
export class AppointmentEffects {
    constructor(
        private _actions$: Actions,
        private _appointmentService: AppointmentService,
    ) {}

    get$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.APPOINTMENTS.load.request),
            switchMap((action) =>
                this._appointmentService.get(action.isToday).pipe(
                    map((response) =>
                        StoreAction.APPOINTMENTS.load.onSuccess({
                            appointments: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    upsert$ = createEffect(
        () =>
            this._actions$.pipe(
                ofType(StoreAction.APPOINTMENTS.upsert.request),
                switchMap((action) =>
                    this._appointmentService.upsert(action.appointmentForm),
                ),
            ),
        {dispatch: false},
    )
}
