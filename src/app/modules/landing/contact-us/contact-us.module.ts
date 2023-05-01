import {RouterModule} from '@angular/router'
import {SharedModule} from './../../../shared/shared.module'
import {NgModule} from '@angular/core'
import {ContactUsComponent} from './contact-us.component'
import {CONTACT_US_ROUTING} from 'app/app-core/routes/landing/contact-us.routing'

@NgModule({
    declarations: [ContactUsComponent],
    imports: [SharedModule, RouterModule.forChild(CONTACT_US_ROUTING)],
})
export class ContactUsModule {}
