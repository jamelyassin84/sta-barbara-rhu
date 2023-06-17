import {Component, Input} from '@angular/core'
import {Store} from '@ngrx/store'
import {Appointment} from 'app/app-core/models/appointment.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {RescheduleAppointmentModal} from 'app/modules/modals/reschedule-appointment-modal/reschedule-appointment-modal.service'
import {UpdateAssessmentModal} from 'app/modules/modals/update-assessment-modal/update-assessment-modal.service'
import {UpdateDiagnosisModal} from 'app/modules/modals/update-diagnosis-modal/update-diagnosis-modal.service'

@Component({
    selector: 'appointment-list',
    templateUrl: './appointment-list.component.html',
    styleUrls: ['./appointment-list.component.scss'],
})
export class AppointmentListComponent {
    constructor(
        private _store: Store<AppState>,
        private _updateDiagnosisModal: UpdateDiagnosisModal,
        private _updateAssessmentModal: UpdateAssessmentModal,
        private _rescheduleAppointmentModal: RescheduleAppointmentModal,
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

    remove(appointment: Appointment) {
        this._store.dispatch(
            StoreAction.APPOINTMENTS.remove.request({
                appointment: appointment,
            }),
        )
    }
}
