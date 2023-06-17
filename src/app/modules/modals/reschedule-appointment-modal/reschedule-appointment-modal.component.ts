import {Component} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {RescheduleAppointmentModal} from './reschedule-appointment-modal.service'
import {AppState} from 'app/app-core/store/core/app.state'
import {Store} from '@ngrx/store'
import {EmailService} from 'app/app-core/services/mail.service'
import {AppointmentForm} from 'app/app-core/store/ngrx/appointments/appointments.form'
import {appointmentLoaders} from 'app/app-core/store/ngrx/appointments/appointments.selectors'
import {StoreSelect} from '@fuse/decorators/ngrx-selector.decorator'
import {StoreLoaders} from '@digital_brand_work/states/store/models/loader.model'
import {Observable, take} from 'rxjs'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import dayjs from 'dayjs'
import {AlertService} from '@digital_brand_work/services/alert.service'
import {Appointment} from 'app/app-core/models/appointment.model'
import {environment} from 'environments/environment'

@Component({
    selector: 'reschedule-appointment-modal',
    templateUrl: './reschedule-appointment-modal.component.html',
    animations: [...dbwAnimations],
})
export class RescheduleAppointmentModalComponent {
    constructor(
        private _store: Store<AppState>,
        private _emailService: EmailService,
        private _alertService: AlertService,
        private _appointmentForm: AppointmentForm,
        private _rescheduleAppointmentModal: RescheduleAppointmentModal,
    ) {}

    @StoreSelect(appointmentLoaders)
    readonly loader$: Observable<StoreLoaders>

    readonly opened$ = this._rescheduleAppointmentModal.opened$

    form = this._appointmentForm.reschedule()

    save() {
        if (this.form.invalid) {
            return
        }

        this._rescheduleAppointmentModal.appointment$
            .pipe(take(1))
            .subscribe((appointment) => {
                if (appointment) {
                    this._store.dispatch(
                        StoreAction.APPOINTMENTS.update.request({
                            appointment: {
                                ...appointment,
                                date: dayjs(this.form.value.date).toJSON(),
                            },
                        }),
                    )

                    this.sendEmail(appointment)

                    this._alertService.addAlert({
                        type: 'success',
                        title: 'Appointment Rescheduled',
                        message:
                            'You have successfully rescheduled the appointment',
                    })

                    this._rescheduleAppointmentModal.opened$.next(false)
                }
            })
    }

    sendEmail(appointment: Appointment) {
        this._emailService
            .sendEmail({
                from: environment.brevo.auth.user,
                to: appointment.patient.email,
                subject: 'Appointment Rescheduled',
                text: `Your appointment was rescheduled to ${this.form.value.date}`,
            })
            .subscribe()
    }
}
