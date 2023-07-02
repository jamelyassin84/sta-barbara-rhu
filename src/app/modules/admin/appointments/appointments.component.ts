import {Store} from '@ngrx/store'
import {Component} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {AppointmentTypeEnum} from 'app/app-core/enums/appointment-type.enum'
import {RHUEnum} from 'app/app-core/enums/rhu.enum'
import {AddAppointmentModal} from 'app/modules/modals/add-appointment-modal/add-appointment-modal.service'
import {AppState} from 'app/app-core/store/core/app.state'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {Observable} from 'rxjs'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {Appointment} from 'app/app-core/models/appointment.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import dayjs from 'dayjs'

@Component({
    selector: 'appointments',
    templateUrl: './appointments.component.html',
    animations: [...dbwAnimations],
})
export class AppointmentsComponent {
    constructor(
        private _store: Store<AppState>,
        private _addAppointmentModal: AddAppointmentModal,
    ) {}

    readonly addAppointmentModalOpened$ = this._addAppointmentModal.opened$

    readonly RHU = Object.values(RHUEnum)

    readonly SERVICES = Object.values(AppointmentTypeEnum)

    currentRHU = this.RHU[0]
    currentService = undefined
    patientName: string = ''
    startAt: any = dayjs().startOf('month').format('YYYY-MM-DD')
    endAt: any = dayjs().endOf('month').format('YYYY-MM-DD')

    @State({selector: StateEnum.APPOINTMENTS, type: 'array'})
    readonly appointments$: Observable<Appointment[]>

    ngOnInit() {
        setTimeout(() => {
            this._store.dispatch(
                StoreAction.APPOINTMENTS.load.request({isToday: false}),
            )
        }, 1500)
    }
}
