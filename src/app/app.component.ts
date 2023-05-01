import {Component} from '@angular/core'
import {Router} from '@angular/router'
import {Subject, takeUntil} from 'rxjs'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private _router: Router) {
        this._router.events
            .pipe(takeUntil(this.destroyed$))
            .subscribe(
                () => (this.isInHome = this._router.url.includes('home')),
            )
    }

    destroyed$ = new Subject()

    isInHome: boolean = true

    ngOnDestroy(): void {
        this.destroyed$.complete()
        this.destroyed$.unsubscribe()
    }
}
