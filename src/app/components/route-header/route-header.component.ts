import {Component, Input} from '@angular/core'

@Component({
    selector: 'route-header',
    templateUrl: './route-header.component.html',
    styleUrls: ['./route-header.component.scss'],
})
export class RouteHeaderComponent {
    @Input()
    pageTitle!: string

    @Input()
    subtitle!: string

    @Input()
    icon!: string
}
