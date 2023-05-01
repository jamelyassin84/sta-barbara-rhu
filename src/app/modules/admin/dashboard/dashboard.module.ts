import {RouterModule} from '@angular/router'
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DashboardComponent} from './dashboard.component'
import {SharedModule} from 'app/shared/shared.module'

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        SharedModule,
        RouterModule.forChild([{path: '', component: DashboardComponent}]),
    ],
})
export class DashboardModule {}
