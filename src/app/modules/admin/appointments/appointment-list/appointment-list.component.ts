import {Component, Input} from '@angular/core'
import {Store} from '@ngrx/store'
import {Appointment} from 'app/app-core/models/appointment.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
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
    ) {}

    @Input({required: true})
    appointments: Appointment[]

    updateAssessmentModalOpened$ = this._updateAssessmentModal.opened$
    updateDiagnosisModalOpened$ = this._updateDiagnosisModal.opened$

    reschedule(appointment: Appointment) {}

    updateAssessment(appointment: Appointment) {
        this.updateAssessmentModalOpened$.next(true)
    }

    updateDiagnosis(appointment: Appointment) {
        this.updateDiagnosisModalOpened$.next(true)
    }

    remove(appointment: Appointment) {
        this._store.dispatch(
            StoreAction.APPOINTMENTS.remove.request({
                appointment: appointment,
            }),
        )
    }
}
