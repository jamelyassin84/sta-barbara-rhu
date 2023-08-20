import {Component, Input} from '@angular/core'
import {Router} from '@angular/router'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {StoreLoaders} from '@digital_brand_work/states/store/models/loader.model'
import {StoreSelect} from '@fuse/decorators/ngrx-selector.decorator'
import {Store} from '@ngrx/store'
import {AppointmentStatusEnum} from 'app/app-core/enums/appointment-status.enum'
import {Appointment} from 'app/app-core/models/appointment.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {appointmentLoaders} from 'app/app-core/store/ngrx/appointments/appointments.selectors'
import {PrintableMedicalCertificate} from 'app/modules/modals/printables/printable-medical-certificate/printable-medical-certificate.service'
import {PrintableMedicalReceit} from 'app/modules/modals/printables/printable-medical-receit/printable-medical-receit.service'
import {PrintableMedicoLegal} from 'app/modules/modals/printables/printable-medico-legal/printable-medico-legal.service'
import {RescheduleAppointmentModal} from 'app/modules/modals/reschedule-appointment-modal/reschedule-appointment-modal.service'
import {UpdateAssessmentModal} from 'app/modules/modals/update-assessment-modal/update-assessment-modal.service'
import {UpdateDiagnosisModal} from 'app/modules/modals/update-diagnosis-modal/update-diagnosis-modal.service'
import {Observable} from 'rxjs'

@Component({
    selector: 'appointment-list',
    templateUrl: './appointment-list.component.html',
    animations: [...dbwAnimations],
})
export class AppointmentListComponent {
    constructor(
        private _router: Router,
        private _store: Store<AppState>,
        private _updateDiagnosisModal: UpdateDiagnosisModal,
        private _updateAssessmentModal: UpdateAssessmentModal,
        private _rescheduleAppointmentModal: RescheduleAppointmentModal,

        private _printableMedicoLegal: PrintableMedicoLegal,
        private _printableMedicalReceit: PrintableMedicalReceit,
        private _printableMedicalCertificate: PrintableMedicalCertificate,
    ) {
        this.isInPatientDetails = this._router.url.includes('patients')
    }

    @StoreSelect(appointmentLoaders)
    readonly loader$: Observable<StoreLoaders>

    @Input({required: true})
    appointments: Appointment[]

    @Input({required: true})
    ready: boolean = false

    @Input()
    isInPatientDetails: boolean = false

    reschedule(appointment: Appointment) {
        this._rescheduleAppointmentModal.appointment$.next(appointment)
        this._rescheduleAppointmentModal.opened$.next(true)
    }

    updateAssessment(appointment: Appointment) {
        this._updateAssessmentModal.appointment$.next(appointment)
        this._updateAssessmentModal.opened$.next(true)
    }

    updateDiagnosis(appointment: Appointment) {
        this._updateDiagnosisModal.appointment$.next(appointment)
        this._updateDiagnosisModal.opened$.next(true)
    }

    viewMedicoLegal(appointment: Appointment) {
        this._printableMedicoLegal.appointment$.next(appointment)
        this._printableMedicoLegal.opened$.next(true)
    }

    viewMedicalReceit(appointment: Appointment) {
        this._printableMedicalReceit.appointment$.next(appointment)
        this._printableMedicalReceit.opened$.next(true)
    }

    viewMedicalCertificate(appointment: Appointment) {
        this._printableMedicalCertificate.appointment$.next(appointment)
        this._printableMedicalCertificate.opened$.next(true)
    }

    toggleStatus(appointment: Appointment) {
        const appointmentStatus =
            appointment.status === AppointmentStatusEnum.CONFIRMED
                ? AppointmentStatusEnum.PENDING
                : AppointmentStatusEnum.CONFIRMED

        this._store.dispatch(
            StoreAction.APPOINTMENTS.update.request({
                appointment: {
                    ...appointment,
                    status: appointmentStatus,
                },
            }),
        )

        setTimeout(() => {
            location.reload()
        }, 1500)
    }

    remove(appointment: Appointment) {
        this._store.dispatch(
            StoreAction.APPOINTMENTS.remove.request({
                appointment: appointment,
            }),
        )
    }
}
