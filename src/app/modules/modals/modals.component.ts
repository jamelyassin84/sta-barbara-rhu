import {Component} from '@angular/core'
import {ViewAppointmentModal} from './view-appointment-modal/view-appointment-modal.service'
import {UpdateAssessmentModal} from './update-assessment-modal/update-assessment-modal.service'
import {AddAppointmentModal} from './add-appointment-modal/add-appointment-modal.service'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {UpdateDiagnosisModal} from './update-diagnosis-modal/update-diagnosis-modal.service'
import {RescheduleAppointmentModal} from './reschedule-appointment-modal/reschedule-appointment-modal.service'
import {RHUUserAddModal} from './rhu-user-add-modal/rhu-user-add-modal.service'

@Component({
    selector: 'modals',
    templateUrl: './modals.component.html',
    animations: [...dbwAnimations],
})
export class ModalsComponent {
    constructor(
        private _addAppointmentModal: AddAppointmentModal,
        private _viewAppointmentModal: ViewAppointmentModal,
        private _updateDiagnosisModal: UpdateDiagnosisModal,
        private _updateAssessmentModal: UpdateAssessmentModal,
        private _rescheduleAppointmentModal: RescheduleAppointmentModal,
        private _RHUUserAddModal: RHUUserAddModal,
    ) {}

    addAppointmentModalOpened$ = this._addAppointmentModal.opened$
    viewAppointmentModalOpened$ = this._viewAppointmentModal.opened$
    updateDiagnosisModalOpened$ = this._updateDiagnosisModal.opened$
    updateAssessmentModalOpened$ = this._updateAssessmentModal.opened$
    rescheduleAppointmentModalOpened$ = this._rescheduleAppointmentModal.opened$
    RHUUserAddModalOpened$ = this._RHUUserAddModal.opened$
}
