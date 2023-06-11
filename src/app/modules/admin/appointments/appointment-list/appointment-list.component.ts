import {Component, Input} from '@angular/core'
import {Appointment} from 'app/app-core/models/appointment.model'
import {UpdateAssessmentModal} from 'app/modules/modals/update-assessment-modal/update-assessment-modal.service'
import {UpdateDiagnosisModal} from 'app/modules/modals/update-diagnosis-modal/update-diagnosis-modal.service'

@Component({
    selector: 'appointment-list',
    templateUrl: './appointment-list.component.html',
    styleUrls: ['./appointment-list.component.scss'],
})
export class AppointmentListComponent {
    constructor(
        private _updateDiagnosisModal: UpdateDiagnosisModal,
        private _updateAssessmentModal: UpdateAssessmentModal,
    ) {}

    @Input()
    appointments: Appointment[] = []

    updateAssessmentModalOpened$ = this._updateAssessmentModal.opened$
    updateDiagnosisModalOpened$ = this._updateDiagnosisModal.opened$

    updateAssessment() {
        this.updateAssessmentModalOpened$.next(true)
    }

    updateDiagnosis() {
        this.updateDiagnosisModalOpened$.next(true)
    }
}
