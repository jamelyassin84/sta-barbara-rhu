import {NgModule} from '@angular/core'
import {SymptomsComponent} from './symptoms.component'
import {SharedModule} from 'app/shared/shared.module'
import {RouterModule} from '@angular/router'
import {SymptomsListComponent} from './symptoms-list/symptoms-list.component'

@NgModule({
    declarations: [SymptomsComponent, SymptomsListComponent],
    imports: [
        SharedModule,
        RouterModule.forChild([{path: '', component: SymptomsComponent}]),
    ],
})
export class SymptomsModule {}
