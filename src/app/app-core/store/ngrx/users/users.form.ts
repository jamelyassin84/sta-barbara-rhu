import {Injectable} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {FuseValidators} from '@fuse/validators'
import {RHUUserTypEnum} from 'app/app-core/enums/rhu-user-type.enum'

@Injectable({providedIn: 'root'})
export class UserForm extends FormBuilder {
    get() {
        return this.group(
            {
                password: ['', Validators.required],
                confirmPassword: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                type: [RHUUserTypEnum.SUPER_ADMIN, Validators.required],
            },
            {
                validators: FuseValidators.mustMatch(
                    'password',
                    'confirmPassword',
                ),
            },
        )
    }
}
