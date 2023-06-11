import {RouterModule} from '@angular/router'
import {NgModule} from '@angular/core'
import {PatientsComponent} from './patients.component'
import {PatientDetailsComponent} from './patient-details/patient-details.component'
import {SharedModule} from 'app/shared/shared.module'

@NgModule({
    declarations: [PatientsComponent, PatientDetailsComponent],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: '', component: PatientsComponent},
            {path: ':id', component: PatientDetailsComponent},
        ]),
    ],
})
export class PatientsModule {}
