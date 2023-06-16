import {Component} from '@angular/core'
import {Router} from '@angular/router'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {Observable, Subject, takeUntil} from 'rxjs'
import {StateEnum} from './app-core/store/core/state.enum'
import {Alert} from '@digital_brand_work/models/core.model'
import {AppState} from './app-core/store/core/app.state'
import {Store} from '@ngrx/store'
import {StoreAction} from './app-core/store/core/action.enum'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private _router: Router, private _store: Store<AppState>) {
        this._router.events
            .pipe(takeUntil(this.destroyed$))
            .subscribe(
                () => (this.isInHome = this._router.url.includes('home')),
            )
    }

    @State({selector: StateEnum.ALERTS, type: 'array'})
    readonly alerts$: Observable<Alert[]>

    readonly destroyed$ = new Subject()

    isInHome: boolean = true

    ngOnInit(): void {
        this._store.dispatch(StoreAction.PATIENTS.load.request())
    }

    ngOnDestroy(): void {
        this.destroyed$.complete()
        this.destroyed$.unsubscribe()
    }

    removeAlert(id: string) {
        this._store.dispatch(StoreAction.ALERT.deleteAlert({id: id}))
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
