import {Injectable} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'

@Injectable({providedIn: 'root'})
export class SymptomsCategoryForm extends FormBuilder {
    get() {
        return this.group({
            name: ['', Validators.required],
        })
    }
}
