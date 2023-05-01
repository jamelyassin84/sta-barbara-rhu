import {Component} from '@angular/core'
import {ViewAppointmentModal} from './view-appointment-modal.service'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'

@Component({
    selector: 'view-appointment-modal',
    templateUrl: './view-appointment-modal.component.html',
    styleUrls: ['./view-appointment-modal.component.scss'],
    animations: [...dbwAnimations],
})
export class ViewAppointmentModalComponent {
    constructor(private _viewAppointmentModal: ViewAppointmentModal) {}

    opened$ = this._viewAppointmentModal.opened$
}
