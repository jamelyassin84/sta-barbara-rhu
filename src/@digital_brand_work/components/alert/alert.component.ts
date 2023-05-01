import {Component, Input, OnInit} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Alert} from '@digital_brand_work/models/core.model'

@Component({
    selector: 'alert-component',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    animations: [...dbwAnimations],
})
export class AlertComponent implements OnInit {
    constructor() {}

    @Input() alert!: Alert

    ngOnInit(): void {}
}
