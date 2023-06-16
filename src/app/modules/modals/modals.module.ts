import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ModalsComponent} from './modals.component'
import {AddAppointmentModalComponent} from './add-appointment-modal/add-appointment-modal.component'
import {ViewAppointmentModalComponent} from './view-appointment-modal/view-appointment-modal.component'
import {UpdateAssessmentModalComponent} from './update-assessment-modal/update-assessment-modal.component'
import {UpdateDiagnosisModalComponent} from './update-diagnosis-modal/update-diagnosis-modal.component';
import { RescheduleAppointmentModalComponent } from './reschedule-appointment-modal/reschedule-appointment-modal.component'

@NgModule({
    declarations: [
    RescheduleAppointmentModalComponent
  ],
    imports: [CommonModule],
})
export class ModalsModule {}
