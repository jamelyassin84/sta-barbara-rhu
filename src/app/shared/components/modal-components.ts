import {ModalHeaderComponent} from 'app/components/modal-header/modal-header.component'
import {AddAppointmentModalComponent} from 'app/modules/modals/add-appointment-modal/add-appointment-modal.component'
import {ModalsComponent} from 'app/modules/modals/modals.component'
import {UpdateAssessmentModalComponent} from 'app/modules/modals/update-assessment-modal/update-assessment-modal.component'
import {UpdateDiagnosisModalComponent} from 'app/modules/modals/update-diagnosis-modal/update-diagnosis-modal.component'
import {ViewAppointmentModalComponent} from 'app/modules/modals/view-appointment-modal/view-appointment-modal.component'

export const modalComponents = [
    ModalsComponent,
    AddAppointmentModalComponent,
    ViewAppointmentModalComponent,
    UpdateAssessmentModalComponent,
    ModalHeaderComponent,
    UpdateDiagnosisModalComponent,
]
