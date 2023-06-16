import {Injectable} from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {Observable} from 'rxjs'
import {Patient} from 'app/app-core/models/patient.model'
import {Loader} from '@fuse/decorators/loader.decorator'
import {LoadingTypeEnum} from '@digital_brand_work/states/store/enums/loading-type.enum'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {AppState} from '../../core/app.state'
import {Store} from '@ngrx/store'
import {StoreSelect} from '@fuse/decorators/ngrx-selector.decorator'
import {patientsBaseSelectors} from './patients.selectors'
import {CollectionEnum} from 'app/app-core/enums/collection.enum'

@Injectable({providedIn: 'root'})
export class PatientService {
    constructor(
        private _store: Store<AppState>,
        private _fireStore: AngularFirestore,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    @StoreSelect(patientsBaseSelectors.selectAll)
    patients$: Observable<Patient[]>

    @Loader({state: 'PATIENTS', loading: LoadingTypeEnum.GET})
    get(): Observable<Patient[]> {
        return this._fireStore
            .collection<Patient>(CollectionEnum.PATIENTS)
            .valueChanges()
    }
}
