import {Component, Input} from '@angular/core'
import {NavigationEnd, Router} from '@angular/router'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {
    NAVBAR_NAVIGATION,
    NavbarNavigation,
} from 'app/app-core/navigations/navbar.navigation'
import {BehaviorSubject, Subject, takeUntil} from 'rxjs'

@Component({
    selector: 'navbar-responsive',
    templateUrl: './navbar-responsive.component.html',
    animations: [...dbwAnimations],
})
export class NavbarResponsiveComponent {
    constructor(private _router: Router) {
        this._router.events.pipe(takeUntil(this.destroyed$)).subscribe((e) => {
            if (e instanceof NavigationEnd) {
                this.changeCurrentNav()
            }
        })
    }
    @Input({required: true})
    readonly NAVBAR_NAVIGATION

    readonly destroyed$ = new Subject<void>()

    @Input({required: true})
    currentNav: NavbarNavigation = NAVBAR_NAVIGATION[0]

    isShowing$ = new BehaviorSubject<boolean>(false)

    ngOnDestroy() {
        this.destroyed$.next()
        this.destroyed$.complete()
    }

    changeCurrentNav() {
        const url = this._router.url

        if (url.includes('/')) {
            this.currentNav = NAVBAR_NAVIGATION[0]
        }

        if (url.includes('/about')) {
            this.currentNav = NAVBAR_NAVIGATION[1]
        }

        if (url.includes('/contact-us')) {
            this.currentNav = NAVBAR_NAVIGATION[2]
        }
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
