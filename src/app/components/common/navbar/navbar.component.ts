import {Component} from '@angular/core'
import {NavigationEnd, Router} from '@angular/router'
import {
    NavbarNavigation,
    NAVBAR_NAVIGATION,
} from 'app/app-core/navigations/navbar.navigation'
import {Subject, takeUntil} from 'rxjs'

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    constructor(private _router: Router) {
        this._router.events.pipe(takeUntil(this.destroyed$)).subscribe((e) => {
            if (e instanceof NavigationEnd) {
                this.changeCurrentNav()
            }
        })
    }

    readonly NAVBAR_NAVIGATION = NAVBAR_NAVIGATION

    destroyed$ = new Subject()

    currentNav: NavbarNavigation = NAVBAR_NAVIGATION[0]

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

    ngOnDestroy(): void {
        this.destroyed$.complete()
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
