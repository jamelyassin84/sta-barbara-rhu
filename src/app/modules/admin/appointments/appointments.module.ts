import {RouterModule} from '@angular/router'
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AppointmentListComponent} from './appointment-list/appointment-list.component'
import {AppointmentsComponent} from './appointments.component'
import {AppointmentDetailsComponent} from './appointment-details/appointment-details.component'
import {SharedModule} from 'app/shared/shared.module'

@NgModule({
    declarations: [AppointmentsComponent, AppointmentDetailsComponent],
    imports: [
        SharedModule,
        RouterModule.forChild([{path: '', component: AppointmentsComponent}]),
    ],
})
export class AppointmentsModule {}
