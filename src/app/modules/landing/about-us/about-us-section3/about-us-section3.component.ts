import {Component} from '@angular/core'
import {AppointmentTypeEnum} from 'app/app-core/enums/appointment-type.enum'
import {AddAppointmentModal} from 'app/modules/modals/add-appointment-modal/add-appointment-modal.service'

@Component({
    selector: 'about-us-section3',
    templateUrl: './about-us-section3.component.html',
    styleUrls: ['./about-us-section3.component.scss'],
})
export class AboutUsSection3Component {
    constructor(private _addAppointmentModal: AddAppointmentModal) {}

    readonly SERVICES = Object.values(AppointmentTypeEnum)

    bookAppointment(service: AppointmentTypeEnum) {
        this._addAppointmentModal.appointmentType$.next(service)
        this._addAppointmentModal.appointmentWasPrefilled$.next(true)
        this._addAppointmentModal.opened$.next(true)
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
