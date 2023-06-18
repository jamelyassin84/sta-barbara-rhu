import {Injectable} from '@angular/core'
import {Store} from '@ngrx/store'
import {AppState} from '../../core/app.state'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {Loader} from '@fuse/decorators/loader.decorator'
import {LoadingTypeEnum} from '@digital_brand_work/states/store/enums/loading-type.enum'
import {Observable, distinctUntilChanged, map, of, take} from 'rxjs'
import {RHUUser} from 'app/app-core/models/rhu-user.model'
import {CollectionEnum} from 'app/app-core/enums/collection.enum'
import * as uuid from 'uuid'
import {timeStamps} from '@digital_brand_work/models/core.model'

@Injectable({providedIn: 'root'})
export class RHUUserService {
    constructor(
        private _store: Store<AppState>,
        private _fireStore: AngularFirestore,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    @Loader({state: 'USERS', loading: LoadingTypeEnum.GET})
    get(): Observable<RHUUser[]> {
        return this._fireStore
            .collection<RHUUser>(CollectionEnum.USERS)
            .valueChanges({idField: 'id'})
            .pipe(take(1), distinctUntilChanged())
    }

    @Loader({state: 'USERS', loading: LoadingTypeEnum.CREATE})
    add(user: RHUUser): Observable<RHUUser> {
        const newUser = {...user, id: `U-${uuid.v4()}`, ...timeStamps()}

        this._fireStore
            .collection<RHUUser>(CollectionEnum.USERS)
            .doc(newUser.id)
            .set(newUser as any)

        return of(newUser) as any
    }

    @Loader({state: 'USERS', loading: LoadingTypeEnum.REMOVE})
    remove(id: string): Observable<string> {
        this._fireStore
            .collection<RHUUser>(CollectionEnum.USERS)
            .doc(id)
            .delete()

        return of(1).pipe(map(() => id))
    }
}
