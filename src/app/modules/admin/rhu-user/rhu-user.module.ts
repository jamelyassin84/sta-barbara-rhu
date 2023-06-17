import {NgModule} from '@angular/core'
import {RhuUserComponent} from './rhu-user.component'
import {RhuUserListComponent} from './rhu-user-list/rhu-user-list.component'
import {SharedModule} from 'app/shared/shared.module'
import {RouterModule} from '@angular/router'

@NgModule({
    declarations: [RhuUserComponent, RhuUserListComponent],
    imports: [
        SharedModule,
        RouterModule.forChild([{path: '', component: RhuUserComponent}]),
    ],
})
export class RhuUserModule {}
