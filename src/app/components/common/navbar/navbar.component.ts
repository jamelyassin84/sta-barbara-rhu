import {Component} from '@angular/core'
import {NavigationEnd, Router} from '@angular/router'
import {
    NavbarNavigation,
    NAVBAR_NAVIGATION,
} from 'app/app-core/navigations/navbar.navigation'
import {Subject, takeUntil} from 'rxjs'

@Component({
    selector: 'app-navbar',
    template: `<div class="flex items-center justify-center w-full bg-black">
        <navbar-responsive
            class="block lg:hidden w-full"
            [currentNav]="changeCurrentNav"
            [NAVBAR_NAVIGATION]="NAVBAR_NAVIGATION"
        />

        <div
            class=" items-center w-full max-w-screen-xl p-3 px-0 hidden lg:flex"
        >
            <div class="flex items-center rounded-full overflow-hidden">
                <img
                    role="button"
                    routerLink="/"
                    class="object-contain h-[50px] mx-2 rounded-full"
                    src="/assets/app/logo.jpg"
                    alt=""
                />
            </div>

            <ul class="flex items-center ml-auto">
                <li
                    [ngClass]="{
                        'pointer-events-none text-white bg-brand-yellow shadow-xl shadow-brand-yellow/50':
                            currentNav === nav,
                        'hover:bg-brand-yellow/40   text-white':
                            currentNav !== nav
                    }"
                    (click)="currentNav = nav"
                    role="button"
                    [routerLink]="nav.link"
                    class="px-5 py-2 mx-2 rounded-md font-extralight "
                    *ngFor="let nav of NAVBAR_NAVIGATION; trackBy: trackByFn"
                >
                    {{ nav.title }}
                </li>
            </ul>
        </div>
    </div> `,
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
    readonly destroyed$ = new Subject<void>()

    currentNav: NavbarNavigation = NAVBAR_NAVIGATION[0]

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
