import {Injectable} from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {Observable, distinctUntilChanged, take, tap} from 'rxjs'
import {Patient} from 'app/app-core/models/patient.model'
import {Loader} from '@fuse/decorators/loader.decorator'
import {LoadingTypeEnum} from '@digital_brand_work/states/store/enums/loading-type.enum'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {AppState} from '../../core/app.state'
import {Store} from '@ngrx/store'
import {CollectionEnum} from 'app/app-core/enums/collection.enum'

@Injectable({providedIn: 'root'})
export class PatientService {
    constructor(
        private _fireStore: AngularFirestore,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    @Loader({state: 'PATIENTS', loading: LoadingTypeEnum.GET})
    get(): Observable<Patient[]> {
        return this._fireStore
            .collection<Patient>(CollectionEnum.PATIENTS)
            .valueChanges({idField: 'id'})
            .pipe(take(1), distinctUntilChanged())
    }

    @Loader({state: 'PATIENTS', loading: LoadingTypeEnum.FIND_ONE})
    show(id: string): Observable<Patient> {
        return this._fireStore
            .collection<Patient>(CollectionEnum.PATIENTS)
            .doc(id)
            .valueChanges({idField: 'id'})
            .pipe(take(1), distinctUntilChanged())
    }
}
