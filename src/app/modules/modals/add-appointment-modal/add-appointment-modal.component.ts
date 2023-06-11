import {Component} from '@angular/core'
import {AddAppointmentModal} from './add-appointment-modal.service'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {AppointmentNatureEnum} from 'app/app-core/enums/appointment-nature.enum'
import {AppointmentTypeEnum} from 'app/app-core/enums/appointment-type.enum'
import {RHUEnum} from 'app/app-core/enums/rhu.enum'
import {SexEnum} from 'app/app-core/enums/sex.enum'

@Component({
    selector: 'add-appointment-modal',
    templateUrl: './add-appointment-modal.component.html',
    animations: [...dbwAnimations],
})
export class AddAppointmentModalComponent {
    constructor(private _addAppointmentModal: AddAppointmentModal) {}

    opened$ = this._addAppointmentModal.opened$

    readonly SEX = Object.values(SexEnum)
    readonly APPOINTMENT_NATURES = Object.values(AppointmentNatureEnum)
    readonly APPOINTMENT_TYPES = Object.values(AppointmentTypeEnum)
    readonly RHU = Object.values(RHUEnum)

    ngOnInit(): void {}

    checkIfGeneral(): void {}

    checkIfAnimalBite(): void {}
}
