import {Store} from '@ngrx/store'
import {Component} from '@angular/core'
import {AddAppointmentModal} from './add-appointment-modal.service'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {AppointmentNatureEnum} from 'app/app-core/enums/appointment-nature.enum'
import {AppointmentTypeEnum} from 'app/app-core/enums/appointment-type.enum'
import {RHUEnum} from 'app/app-core/enums/rhu.enum'
import {SexEnum} from 'app/app-core/enums/sex.enum'
import {EmailService} from 'app/app-core/services/mail.service'
import {AppointmentForm} from 'app/app-core/store/ngrx/appointments/appointments.form'
import {Observable, of, take, tap} from 'rxjs'
import {AppState} from 'app/app-core/store/core/app.state'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {CollectionEnum} from 'app/app-core/enums/collection.enum'
import {Patient} from 'app/app-core/models/patient.model'
import {appointmentLoaders} from 'app/app-core/store/ngrx/appointments/appointments.selectors'
import {StoreSelect} from '@fuse/decorators/ngrx-selector.decorator'
import {StoreLoaders} from '@digital_brand_work/states/store/models/loader.model'
import {LoadingStateEnum} from '@digital_brand_work/states/store/enums/loading-state.enum'
import {environment} from 'environments/environment'

@Component({
    selector: 'add-appointment-modal',
    templateUrl: './add-appointment-modal.component.html',
    animations: [...dbwAnimations],
})
export class AddAppointmentModalComponent {
    constructor(
        private _store: Store<AppState>,
        private _emailService: EmailService,
        private _fireStore: AngularFirestore,
        private _appointmentForm: AppointmentForm,
        private _addAppointmentModal: AddAppointmentModal,
    ) {}

    @StoreSelect(appointmentLoaders)
    readonly loader$: Observable<StoreLoaders>

    readonly opened$ = this._addAppointmentModal.opened$

    readonly SEX = Object.values(SexEnum)
    readonly APPOINTMENT_NATURES = Object.values(AppointmentNatureEnum)
    readonly APPOINTMENT_TYPES = Object.values(AppointmentTypeEnum)
    readonly RHU = Object.values(RHUEnum)

    showPersonalDetails: boolean = true
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
        this._addAppointmentModal.rhu$.next(undefined)
    }

    checkIfGeneral(): void {}

    checkIfAnimalBite(): void {}

    save() {
        this._store.dispatch(
            StoreAction.APPOINTMENTS.upsert.request({
                appointmentForm: this.form,
            }),
        )

        this.sendEmail()
    }

    onChangeHandler() {
        const email = this.form.get(['patient', 'email'])?.value

        this._fireStore
            .collection(CollectionEnum.PATIENTS)
            .snapshotChanges()
            .subscribe((patients) => {
                const foundPatient = patients.find((patient) => {
                    const patientData = patient.payload.doc.data() as Patient
                    return (
                        patientData.email &&
                        patientData.email.toLowerCase() === email.toLowerCase()
                    )
                })

                if (foundPatient) {
                    this.showPersonalDetails = false
                    return
                }
                this.showPersonalDetails = true
            })
    }

    sendEmail() {
        this._emailService
            .sendEmail({
                from: environment.brevo.auth.user,
                to: this.form.value.patient.email,
                subject: 'Appointment Confirmed',
                text: `You have successfully booked your  ${this.form.value.appointment.appointment_type} Appointment on ${this.form.value.appointment.date}`,
            })
            .subscribe()
    }
}
