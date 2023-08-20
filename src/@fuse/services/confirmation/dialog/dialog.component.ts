import {Component, Inject, ViewEncapsulation} from '@angular/core'
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import {FuseConfirmationConfig} from '@fuse/services/confirmation/confirmation.types'

@Component({
    selector: 'fuse-confirmation-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FuseConfirmationDialogComponent {
    /**
     * Constructor
     */
    constructor(@Inject(MAT_DIALOG_DATA) public data: FuseConfirmationConfig) {}
}
