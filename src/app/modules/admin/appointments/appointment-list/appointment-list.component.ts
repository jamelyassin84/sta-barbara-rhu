import {Component, Input} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Store} from '@ngrx/store'
import {Appointment} from 'app/app-core/models/appointment.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {PrintableMedicalCertificate} from 'app/modules/modals/printables/printable-medical-certificate/printable-medical-certificate.service'
import {PrintableMedicalReceit} from 'app/modules/modals/printables/printable-medical-receit/printable-medical-receit.service'
import {PrintableMedicoLegal} from 'app/modules/modals/printables/printable-medico-legal/printable-medico-legal.service'
import {RescheduleAppointmentModal} from 'app/modules/modals/reschedule-appointment-modal/reschedule-appointment-modal.service'
import {UpdateAssessmentModal} from 'app/modules/modals/update-assessment-modal/update-assessment-modal.service'
import {UpdateDiagnosisModal} from 'app/modules/modals/update-diagnosis-modal/update-diagnosis-modal.service'

@Component({
    selector: 'appointment-list',
    templateUrl: './appointment-list.component.html',
    animations: [...dbwAnimations],
})
export class AppointmentListComponent {
    constructor(
        private _store: Store<AppState>,
        private _updateDiagnosisModal: UpdateDiagnosisModal,
        private _updateAssessmentModal: UpdateAssessmentModal,
        private _rescheduleAppointmentModal: RescheduleAppointmentModal,

        private _printableMedicoLegal: PrintableMedicoLegal,
        private _printableMedicalReceit: PrintableMedicalReceit,
        private _printableMedicalCertificate: PrintableMedicalCertificate,
    ) {}

    @Input({required: true})
    appointments: Appointment[]

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

    remove(appointment: Appointment) {
        this._store.dispatch(
            StoreAction.APPOINTMENTS.remove.request({
                appointment: appointment,
            }),
        )
    }
}
