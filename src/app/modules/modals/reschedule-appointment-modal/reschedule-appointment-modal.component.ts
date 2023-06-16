import {Component} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'

@Component({
    selector: 'reschedule-appointment-modal',
    templateUrl: './reschedule-appointment-modal.component.html',
    animations: [...dbwAnimations],
})
export class RescheduleAppointmentModalComponent {}
