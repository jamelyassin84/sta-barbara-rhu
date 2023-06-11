import {NgModule} from '@angular/core'
import {ReportsComponent} from './reports.component'
import {SharedModule} from 'app/shared/shared.module'
import {RouterModule} from '@angular/router'

@NgModule({
    declarations: [ReportsComponent],
    imports: [
        SharedModule,
        RouterModule.forChild([{path: '', component: ReportsComponent}]),
    ],
})
export class ReportsModule {}
