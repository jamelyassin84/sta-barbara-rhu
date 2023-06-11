import {Route} from '@angular/router'
import {InitialDataResolver} from 'app/app.resolvers'
import {LayoutComponent} from 'app/layout/layout.component'

export const MAIN_ADMIN_ROUTING: Route[] = [
    {
        path: 'admin',
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'appointments',
                loadChildren: () =>
                    import(
                        'app/modules/admin/appointments/appointments.module'
                    ).then((module) => module.AppointmentsModule),
            },

            {
                path: 'patients',
                loadChildren: () =>
                    import('app/modules/admin/patients/patients.module').then(
                        (module) => module.PatientsModule,
                    ),
            },

            {
                path: 'dashboard',
                loadChildren: () =>
                    import('app/modules/admin/dashboard/dashboard.module').then(
                        (module) => module.DashboardModule,
                    ),
            },

            {
                path: 'reports',
                loadChildren: () =>
                    import('app/modules/admin/reports/reports.module').then(
                        (module) => module.ReportsModule,
                    ),
            },
        ],
    },
]
