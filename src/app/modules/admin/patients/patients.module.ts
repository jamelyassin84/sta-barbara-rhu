import {RouterModule} from '@angular/router'
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {PatientsComponent} from './patients.component'
import {PatientListComponent} from './patient-list/patient-list.component'
import {PatientDetailsComponent} from './patient-details/patient-details.component'
import {SharedModule} from 'app/shared/shared.module'

@NgModule({
    declarations: [
        PatientsComponent,
        PatientListComponent,
        PatientDetailsComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: '', component: PatientsComponent},
            {path: ':id', component: PatientDetailsComponent},
        ]),
    ],
})
export class PatientsModule {}
