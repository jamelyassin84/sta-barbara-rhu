import {Component} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [...dbwAnimations],
})
export class DashboardComponent {}
