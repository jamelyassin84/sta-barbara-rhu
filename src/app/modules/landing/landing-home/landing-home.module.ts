import {RouterModule} from '@angular/router'
import {SharedModule} from './../../../shared/shared.module'
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {LandingHomeComponent} from './landing-home.component'
import {LandingHomeSection1Component} from './landing-home-section1/landing-home-section1.component'
import {LandingHomeSection2Component} from './landing-home-section2/landing-home-section2.component'
import {LandingHomeSection3Component} from './landing-home-section3/landing-home-section3.component'
import {HOME_ROUTING} from 'app/app-core/routes/landing/home.routing'

@NgModule({
    declarations: [
        LandingHomeComponent,
        LandingHomeSection1Component,
        LandingHomeSection2Component,
        LandingHomeSection3Component,
    ],
    imports: [SharedModule, RouterModule.forChild(HOME_ROUTING)],
})
export class LandingHomeModule {}
