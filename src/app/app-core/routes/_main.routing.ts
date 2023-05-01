import {Route} from '@angular/router'
import {MAIN_ADMIN_ROUTING} from './admin/_main.admin.routing'
import {MAIN_AUTH_ROUTING} from './auth/_main.auth.routing'
import {MAIN_PAGES_ROUTING} from './pages/_main.pages.routing'

export const MAIN_ROUTING: Route[] = [
    ...MAIN_AUTH_ROUTING,
    ...MAIN_PAGES_ROUTING,
    ...MAIN_ADMIN_ROUTING,

    {path: '', pathMatch: 'full', redirectTo: 'home'},

    {path: 'auth', pathMatch: 'full', redirectTo: 'auth'},

    {path: 'admin', pathMatch: 'full', redirectTo: 'admin'},

    {path: 'pages', pathMatch: 'full', redirectTo: 'pages'},

    {
        path: 'home',
        loadChildren: () =>
            import('app/modules/landing/landing-home/landing-home.module').then(
                (module) => module.LandingHomeModule,
            ),
    },

    {
        path: 'home/about',
        loadChildren: () =>
            import('app/modules/landing/about-us/about-us.module').then(
                (module) => module.AboutUsModule,
            ),
    },

    {
        path: 'home/contact-us',
        loadChildren: () =>
            import('app/modules/landing/contact-us/contact-us.module').then(
                (module) => module.ContactUsModule,
            ),
    },

    {path: '**', redirectTo: 'pages/not-found'},
]
