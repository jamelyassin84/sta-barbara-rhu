import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {switchMap, map, tap, catchError} from 'rxjs/operators'
import {StoreAction} from '../../core/action.enum'
import {AppointmentService} from './appointments.service'
import {AddAppointmentModal} from 'app/modules/modals/add-appointment-modal/add-appointment-modal.service'
import {AlertService} from '@digital_brand_work/services/alert.service'
import {ReportService} from 'app/modules/admin/reports/reports.service'
import {Store} from '@ngrx/store'
import {AppState} from '../../core/app.state'
import {EMPTY} from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class AppointmentEffects {
    constructor(
        private _actions$: Actions,
        private _store: Store<AppState>,
        private _alertService: AlertService,
        private _reportService: ReportService,
        private _appointmentService: AppointmentService,
        private _addAppointmentModal: AddAppointmentModal,
    ) {}

    get$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.APPOINTMENTS.load.request),
            switchMap((action) =>
                this._appointmentService.get(action.isToday).pipe(
                    tap(() => this.filter()),
                    map((response) =>
                        StoreAction.APPOINTMENTS.load.onSuccess({
                            appointments: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    update$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.APPOINTMENTS.update.request),
            switchMap((action) =>
                this._appointmentService
                    .updateAppointment(action.appointment)
                    .pipe(
                        tap(() => this.filter()),
                        map(() => StoreAction.PATIENTS.load.request()),
                    ),
            ),
        ),
    )

    remove$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.APPOINTMENTS.remove.request),
            switchMap((action) =>
                this._appointmentService.remove(action.appointment).pipe(
                    tap(() => this.filter()),
                    map((response) =>
                        StoreAction.APPOINTMENTS.remove.onSuccess({
                            id: response,
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
                tap((action) => {
                    this._appointmentService.upsert(action.appointmentForm)

                    this._alertService.addAlert({
                        title: 'You have successfully booked your appointment',
                        message:
                            'We have sent an email to you, please check your inbox',
                        type: 'success',
                    })

                    this.filter()

                    this._addAppointmentModal.opened$.next(false)

                    this._store.dispatch(StoreAction.PATIENTS.load.request())
                }),
            ),
        {dispatch: false},
    )

    private filter() {
        this._reportService.filter$.next(true)
    }
}
