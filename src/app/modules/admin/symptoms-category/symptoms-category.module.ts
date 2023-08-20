import {NgModule} from '@angular/core'
import {SymptomsCategoryComponent} from './symptoms-category.component'
import {SharedModule} from 'app/shared/shared.module'
import {RouterModule} from '@angular/router'
import {SymptomsCategoryListComponent} from './symptoms-category-list/symptoms-category-list.component'

@NgModule({
    declarations: [SymptomsCategoryComponent, SymptomsCategoryListComponent],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: '', component: SymptomsCategoryComponent},
        ]),
    ],
})
export class SymptomsCategoryModule {}
