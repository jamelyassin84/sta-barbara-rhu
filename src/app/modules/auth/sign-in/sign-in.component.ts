import {Component, ViewChild, ViewEncapsulation} from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    NgForm,
    Validators,
} from '@angular/forms'
import {ActivatedRoute, Router} from '@angular/router'
import {fuseAnimations} from '@fuse/animations'
import {FuseAlertType} from '@fuse/components/alert'
import {CollectionEnum} from 'app/app-core/enums/collection.enum'
import {AuthService} from 'app/core/auth/auth.service'
import {take} from 'rxjs'

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent {
    constructor(
        private _router: Router,
        private _authService: AuthService,
        private _fireStore: AngularFirestore,
        private _activatedRoute: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
    ) {}

    @ViewChild('signInNgForm')
    signInNgForm: NgForm

    alert: {type: FuseAlertType; message: string} = {
        type: 'success',
        message: '',
    }

    signInForm = this._formBuilder.group({
        email: [
            'hughes.brian@company.com',
            [Validators.required, Validators.email],
        ],
        password: ['admin', Validators.required],
    })

    showAlert: boolean = false

    signIn(): void {
        if (this.signInForm.invalid) {
            return
        }

        this.signInForm.disable()

        this.showAlert = false

        this._fireStore
            .collection(CollectionEnum.USERS, (ref) => {
                return ref
                    .where('email', '==', this.signInForm.value.email)
                    .where('password', '==', this.signInForm.value.password)
            })
            .valueChanges()
            .pipe(take(1))
            .subscribe((users) => {
                if (users.length === 0) {
                    this.signInForm.enable()

                    this.signInNgForm.resetForm()

                    this.alert = {
                        type: 'error',
                        message: 'Wrong email or password',
                    }
                    this.showAlert = true
                    return
                }

                this._authService
                    .signIn({
                        email: 'hughes.brian@company.com',
                        password: 'admin',
                    })
                    .subscribe(() => {
                        const redirectURL =
                            this._activatedRoute.snapshot.queryParamMap.get(
                                'redirectURL',
                            ) || '/signed-in-redirect'

                        this._router.navigate(['admin/dashboard'])
                    })
            })
    }
}
