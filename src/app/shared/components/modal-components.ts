import {ModalHeaderComponent} from 'app/components/modal-header/modal-header.component'
import {AddAppointmentModalComponent} from 'app/modules/modals/add-appointment-modal/add-appointment-modal.component'
import {ModalsComponent} from 'app/modules/modals/modals.component'
import {PrintableMedicalCertificateComponent} from 'app/modules/modals/printables/printable-medical-certificate/printable-medical-certificate.component'
import {PrintableMedicalReceitComponent} from 'app/modules/modals/printables/printable-medical-receit/printable-medical-receit.component'
import {PrintableMedicoLegalComponent} from 'app/modules/modals/printables/printable-medico-legal/printable-medico-legal.component'
import {RescheduleAppointmentModalComponent} from 'app/modules/modals/reschedule-appointment-modal/reschedule-appointment-modal.component'
import {RhuUserAddModalComponent} from 'app/modules/modals/rhu-user-add-modal/rhu-user-add-modal.component'
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
    RhuUserAddModalComponent,
    RescheduleAppointmentModalComponent,

    PrintableMedicalCertificateComponent,
    PrintableMedicalReceitComponent,
    PrintableMedicoLegalComponent,
]
