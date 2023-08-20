import {Component} from '@angular/core'
import {RHUEnum} from 'app/app-core/enums/rhu.enum'
import {AddAppointmentModal} from 'app/modules/modals/add-appointment-modal/add-appointment-modal.service'

@Component({
    selector: 'contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
    constructor(private _addAppointmentModal: AddAppointmentModal) {}

    setRHU(rhu: string) {
        this._addAppointmentModal.rhu$.next(
            rhu === 'RHU 1' ? RHUEnum.RHU_1 : RHUEnum.RHU_2,
        )
        this._addAppointmentModal.RHUWasPrefilled$.next(true)
        this._addAppointmentModal.opened$.next(true)
    }
}
