import {NgModule} from '@angular/core'
import {CommonModule, NgOptimizedImage} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {globalPipes} from './pipes/global-pipes'
import {sharedPipes} from './pipes/shared-pipes'
import {globalDirectives} from './directives/global-directives'
import {sharedDirectives} from './directives/shared-directives'
import {modalComponents} from './components/modal-components'
import {popUpComponents} from './components/pop-up-components'
import {sharedComponents} from './components/shared-components'
import {globalComponents} from './components/global-components'
import {globalForms} from './components/global-forms'
import {RouterModule} from '@angular/router'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {sharedEffects} from './states/shared-effects-module'
import {sharedStateModules} from './states/shared-state-modules'
import {angularMaterialModules} from './angular-material/angular-material-modules'
import {AngularFireModule} from '@angular/fire/compat'
import {environment} from 'environments/environment'
import {AngularFirestoreModule} from '@angular/fire/compat/firestore'

const pipes = [...globalPipes, ...sharedPipes]

const directives = [...globalDirectives, ...sharedDirectives]

const components = [
    ...modalComponents,
    ...popUpComponents,
    ...sharedComponents,
    ...globalComponents,
    ...globalForms,
]

const modules = [
    RouterModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ...sharedEffects,
    ...sharedStateModules,
    ...angularMaterialModules,
    NgOptimizedImage,
]

@NgModule({
    imports: [...modules],
    declarations: [...components, ...directives, ...pipes],
    exports: [...components, ...directives, ...pipes, ...modules],
})
export class SharedModule {}
