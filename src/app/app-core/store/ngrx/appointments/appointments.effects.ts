import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {switchMap, map, tap} from 'rxjs/operators'
import {StoreAction} from '../../core/action.enum'
import {AppointmentService} from './appointments.service'
import {AddAppointmentModal} from 'app/modules/modals/add-appointment-modal/add-appointment-modal.service'
import {AlertService} from '@digital_brand_work/services/alert.service'

@Injectable({
    providedIn: 'root',
})
export class AppointmentEffects {
    constructor(
        private _actions$: Actions,
        private _alertService: AlertService,
        private _appointmentService: AppointmentService,
        private _addAppointmentModal: AddAppointmentModal,
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
                tap((action) =>
                    this._appointmentService
                        .upsert(action.appointmentForm)
                        .subscribe(() => {
                            this._alertService.addAlert({
                                title: 'You have succesffully booked your appointment',
                                message:
                                    'We have send an email to you please check your inbox',
                                type: 'success',
                            })

                            this._addAppointmentModal.opened$.next(false)
                        }),
                ),
            ),
        {dispatch: false},
    )
}
