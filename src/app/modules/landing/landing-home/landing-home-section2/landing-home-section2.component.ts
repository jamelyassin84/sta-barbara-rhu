import {Component} from '@angular/core'
import {AppointmentTypeEnum} from 'app/app-core/enums/appointment-type.enum'
import {AddAppointmentModal} from 'app/modules/modals/add-appointment-modal/add-appointment-modal.service'

@Component({
    selector: 'landing-home-section2',
    templateUrl: './landing-home-section2.component.html',
})
export class LandingHomeSection2Component {
    constructor(private _addAppointmentModal: AddAppointmentModal) {}

    readonly SERVICES = Object.values(AppointmentTypeEnum)

    bookAppointment(service: AppointmentTypeEnum) {
        this._addAppointmentModal.appointmentType$.next(service)
        this._addAppointmentModal.opened$.next(true)
    }
}
