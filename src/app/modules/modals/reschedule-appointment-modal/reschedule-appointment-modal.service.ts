import {Injectable} from '@angular/core'
import {Modal} from '@digital_brand_work/services/modal.service'
import {Appointment} from 'app/app-core/models/appointment.model'
import {BehaviorSubject} from 'rxjs'

@Injectable({providedIn: 'root'})
export class RescheduleAppointmentModal extends Modal {
    appointment$ = new BehaviorSubject<Appointment>(undefined)
}
