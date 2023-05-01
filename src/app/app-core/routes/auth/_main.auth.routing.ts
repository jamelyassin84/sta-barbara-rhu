import {Route} from '@angular/router'
import {LayoutComponent} from 'app/layout/layout.component'

export const MAIN_AUTH_ROUTING: Route[] = [
    {
        path: 'auth',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.module').then(
                        (module) => module.AuthSignOutModule,
                    ),
            },

            {
                path: 'unlock-session',
                loadChildren: () =>
                    import(
                        'app/modules/auth/unlock-session/unlock-session.module'
                    ).then((module) => module.AuthUnlockSessionModule),
            },

            {
                path: 'confirmation-required',
                loadChildren: () =>
                    import(
                        'app/modules/auth/confirmation-required/confirmation-required.module'
                    ).then((module) => module.AuthConfirmationRequiredModule),
            },

            {
                path: 'forgot-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/forgot-password/forgot-password.module'
                    ).then((module) => module.AuthForgotPasswordModule),
            },

            {
                path: 'reset-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/reset-password/reset-password.module'
                    ).then((module) => module.AuthResetPasswordModule),
            },

            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        (module) => module.AuthSignInModule,
                    ),
            },

            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.module').then(
                        (module) => module.AuthSignUpModule,
                    ),
            },
        ],
    },
]
