import {Component} from '@angular/core'
import {ViewAppointmentModal} from './view-appointment-modal/view-appointment-modal.service'
import {UpdateAssessmentModal} from './update-assessment-modal/update-assessment-modal.service'
import {AddAppointmentModal} from './add-appointment-modal/add-appointment-modal.service'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {UpdateDiagnosisModal} from './update-diagnosis-modal/update-diagnosis-modal.service'

@Component({
    selector: 'modals',
    templateUrl: './modals.component.html',
    styleUrls: ['./modals.component.scss'],
    animations: [...dbwAnimations],
})
export class ModalsComponent {
    constructor(
        private _addAppointmentModal: AddAppointmentModal,
        private _viewAppointmentModal: ViewAppointmentModal,
        private _updateDiagnosisModal: UpdateDiagnosisModal,
        private _updateAssessmentModal: UpdateAssessmentModal,
    ) {}

    addAppointmentModalOpened$ = this._addAppointmentModal.opened$
    viewAppointmentModalOpened$ = this._viewAppointmentModal.opened$
    updateDiagnosisModalOpened$ = this._updateDiagnosisModal.opened$
    updateAssessmentModalOpened$ = this._updateAssessmentModal.opened$
}
