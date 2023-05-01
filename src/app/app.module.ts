import {NgModule, isDevMode} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ExtraOptions, PreloadAllModules, RouterModule} from '@angular/router'
import {FuseModule} from '@fuse'
import {FuseConfigModule} from '@fuse/services/config'
import {FuseMockApiModule} from '@fuse/lib/mock-api'
import {CoreModule} from 'app/core/core.module'
import {appConfig} from 'app/core/config/app.config'
import {mockApiServices} from 'app/mock-api'
import {LayoutModule} from 'app/layout/layout.module'
import {AppComponent} from 'app/app.component'
import {appRoutes} from 'app/app.routing'
import {SharedModule} from './shared/shared.module'

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    useHash: true,
}

const modules = [
    FuseModule,
    CoreModule,
    LayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,

    FuseConfigModule.forRoot(appConfig),
    FuseMockApiModule.forRoot(mockApiServices),
    RouterModule.forRoot(appRoutes, routerConfig),
]

@NgModule({
    declarations: [AppComponent],
    imports: [...modules],
    bootstrap: [AppComponent],
})
export class AppModule {}
