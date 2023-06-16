import {Injectable} from '@angular/core'
import {Modal} from '@digital_brand_work/services/modal.service'
import {AppointmentTypeEnum} from 'app/app-core/enums/appointment-type.enum'
import {RHUEnum} from 'app/app-core/enums/rhu.enum'
import {BehaviorSubject} from 'rxjs'

@Injectable({providedIn: 'root'})
export class AddAppointmentModal extends Modal {
    appointmentType$ = new BehaviorSubject<AppointmentTypeEnum>(undefined)
    rhu$ = new BehaviorSubject<RHUEnum>(undefined)
}
