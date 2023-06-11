import {CommonSidebarComponent} from 'app/components/common/common-sidebar/common-sidebar.component'
import {FooterComponent} from 'app/components/common/footer/footer.component'
import {NavbarResponsiveComponent} from 'app/components/common/navbar-responsive/navbar-responsive.component'
import {NavbarComponent} from 'app/components/common/navbar/navbar.component'
import {RouteHeaderComponent} from 'app/components/route-header/route-header.component'
import {AppointmentListComponent} from 'app/modules/admin/appointments/appointment-list/appointment-list.component'
import {PatientListComponent} from 'app/modules/admin/patients/patient-list/patient-list.component'
import {NoInternetComponent} from 'app/modules/pages/no-internet/no-internet.component'
import {NotFoundComponent} from 'app/modules/pages/not-found/not-found.component'

export const sharedComponents = [
    NavbarComponent,
    FooterComponent,
    NavbarResponsiveComponent,
    CommonSidebarComponent,
    RouteHeaderComponent,

    NoInternetComponent,
    NotFoundComponent,

    AppointmentListComponent,
    PatientListComponent,
]
