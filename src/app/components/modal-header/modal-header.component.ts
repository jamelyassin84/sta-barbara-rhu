import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
    selector: 'modal-header',
    templateUrl: './modal-header.component.html',
    styleUrls: ['./modal-header.component.scss'],
})
export class ModalHeaderComponent {
    constructor() {}

    @Output()
    onClose = new EventEmitter()

    @Input()
    modalTitle: string = ''

    @Input()
    subTitle?: string

    ngOnInit(): void {}
}
