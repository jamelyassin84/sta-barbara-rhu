import {RouterModule} from '@angular/router'
import {NgModule} from '@angular/core'
import {AboutUsComponent} from './about-us.component'
import {AboutUsSection1Component} from './about-us-section1/about-us-section1.component'
import {AboutUsSection2Component} from './about-us-section2/about-us-section2.component'
import {AboutUsSection3Component} from './about-us-section3/about-us-section3.component'
import {SharedModule} from 'app/shared/shared.module'
import {ABOUT_US_ROUTING} from 'app/app-core/routes/landing/about.routing'

@NgModule({
    declarations: [
        AboutUsComponent,
        AboutUsSection1Component,
        AboutUsSection2Component,
        AboutUsSection3Component,
    ],
    imports: [SharedModule, RouterModule.forChild(ABOUT_US_ROUTING)],
})
export class AboutUsModule {}
