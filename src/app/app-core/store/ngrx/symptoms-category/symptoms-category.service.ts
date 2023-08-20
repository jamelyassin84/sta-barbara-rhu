import {Injectable} from '@angular/core'
import {Store} from '@ngrx/store'
import {AppState} from '../../core/app.state'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {Loader} from '@fuse/decorators/loader.decorator'
import {LoadingTypeEnum} from '@digital_brand_work/states/store/enums/loading-type.enum'
import {Observable, distinctUntilChanged, map, of, take} from 'rxjs'
import {CollectionEnum} from 'app/app-core/enums/collection.enum'
import * as uuid from 'uuid'
import {timeStamps} from '@digital_brand_work/models/core.model'
import {SymptomsCategory} from 'app/app-core/models/symptoms-category.model'

@Injectable({providedIn: 'root'})
export class SymptomsCategoryService {
    constructor(
        private _store: Store<AppState>,
        private _fireStore: AngularFirestore,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    @Loader({state: 'SYMPTOMS_CATEGORIES', loading: LoadingTypeEnum.GET})
    get(): Observable<SymptomsCategory[]> {
        return this._fireStore
            .collection<SymptomsCategory>(CollectionEnum.SYMPTOMS_CATEGORIES)
            .valueChanges({idField: 'id'})
            .pipe(take(1), distinctUntilChanged())
    }

    @Loader({state: 'SYMPTOMS_CATEGORIES', loading: LoadingTypeEnum.CREATE})
    add(user: SymptomsCategory): Observable<SymptomsCategory> {
        const newUser = {...user, id: `U-${uuid.v4()}`, ...timeStamps()}

        this._fireStore
            .collection<SymptomsCategory>(CollectionEnum.SYMPTOMS_CATEGORIES)
            .doc(newUser.id)
            .set(newUser as any)

        return of(newUser) as any
    }

    @Loader({state: 'SYMPTOMS_CATEGORIES', loading: LoadingTypeEnum.REMOVE})
    remove(id: string): Observable<string> {
        this._fireStore
            .collection<SymptomsCategory>(CollectionEnum.SYMPTOMS_CATEGORIES)
            .doc(id)
            .delete()

        return of(1).pipe(map(() => id))
    }
}
