import {Component} from '@angular/core'
import {AddAppointmentModal} from './add-appointment-modal.service'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {AppointmentNatureEnum} from 'app/app-core/enums/appointment-nature.enum'
import {AppointmentTypeEnum} from 'app/app-core/enums/appointment-type.enum'
import {RHUEnum} from 'app/app-core/enums/rhu.enum'
import {SexEnum} from 'app/app-core/enums/sex.enum'
import {EmailService} from 'app/app-core/services/mail.service'
import {AppointmentForm} from 'app/app-core/forms/appointment.form'
import {take} from 'rxjs'

@Component({
    selector: 'add-appointment-modal',
    templateUrl: './add-appointment-modal.component.html',
    animations: [...dbwAnimations],
})
export class AddAppointmentModalComponent {
    constructor(
        private _emailService: EmailService,
        private _appointmentForm: AppointmentForm,
        private _addAppointmentModal: AddAppointmentModal,
    ) {}

    opened$ = this._addAppointmentModal.opened$

    readonly SEX = Object.values(SexEnum)
    readonly APPOINTMENT_NATURES = Object.values(AppointmentNatureEnum)
    readonly APPOINTMENT_TYPES = Object.values(AppointmentTypeEnum)
    readonly RHU = Object.values(RHUEnum)

    form = this._appointmentForm.get()

    ngOnInit(): void {
        this._addAppointmentModal.appointmentType$
            .pipe(take(4))
            .subscribe((service) => {
                if (service) {
                    this.form
                        .get(['appointment', 'appointment_type'])
                        .setValue(service)
                }
            })

        this._addAppointmentModal.rhu$.pipe(take(4)).subscribe((rhu) => {
            if (rhu) {
                this.form.get(['appointment', 'rhu']).setValue(rhu)
            }
        })
    }

    ngOnDestroy(): void {
        this._addAppointmentModal.appointmentType$.next(undefined)
    }

    checkIfGeneral(): void {}

    checkIfAnimalBite(): void {}

    async save() {
        await this._addAppointmentModal.save(this.form)
        alert('Appointment Confirmed')
        this.sendEmail()
    }

    sendEmail() {
        this._emailService
            .sendEmail({
                from: 'jamelyassin84@gmail.com',
                to: this.form.value.patient.email,
                subject: 'Appointment Confirmed',
                text: `You have successfully booked your  ${this.form.value.appointment.appointment_type} Appointment on ${this.form.value.appointment.date}`,
            })
            .subscribe()
    }
}
