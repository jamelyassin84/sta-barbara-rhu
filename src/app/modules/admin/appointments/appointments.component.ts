import {Component} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {AppointmentTypeEnum} from 'app/app-core/enums/appointment-type.enum'
import {RHUEnum} from 'app/app-core/enums/rhu.enum'

@Component({
    selector: 'appointments',
    templateUrl: './appointments.component.html',
    styleUrls: ['./appointments.component.scss'],
    animations: [...dbwAnimations],
})
export class AppointmentsComponent {
    readonly RHU = Object.values(RHUEnum)

    readonly SERVICES = Object.values(AppointmentTypeEnum)

    currentRHU = this.RHU[0]
    currentService = this.SERVICES[0]
}
