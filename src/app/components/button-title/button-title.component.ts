import {Component, Input} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {LoadingStateEnum} from '@digital_brand_work/states/store/enums/loading-state.enum'

@Component({
    selector: 'button-title',
    animations: [...dbwAnimations],
    template: `
        <ng-container *ngIf="loader">
            <div
                [ngClass]="{'pointer-events-none': loader === 'loading'}"
                class="flex items-center justify-center"
            >
                <app-spinner class="mr-3" *ngIf="loader === 'loading'" />

                <mat-icon
                    class="mr-3 text-emerald-500"
                    *ngIf="loader === 'succeeded'"
                    svgIcon="heroicons_outline:check-circle"
                />

                <mat-icon
                    class="mr-3 text-white"
                    *ngIf="loader === 'failed'"
                    svgIcon="heroicons_outline:x-circle"
                />

                <span *ngIf="loader === 'idle'">{{ buttons[0] }}</span>

                <span
                    @slideInRight
                    class="text-gray-400"
                    *ngIf="loader === 'loading'"
                    >{{ buttons[1] }}</span
                >

                <span
                    @slideInRight
                    class="text-white"
                    *ngIf="loader === 'failed'"
                    >{{ buttons[2] }}</span
                >

                <span
                    @slideInRight
                    class="text-emerald-500"
                    *ngIf="loader === 'succeeded'"
                    >{{ buttons[3] }}</span
                >
            </div>
        </ng-container>
    `,
})
export class ButtonTitleComponent {
    @Input()
    loader: LoadingStateEnum

    @Input()
    buttons: string[] = []
}
