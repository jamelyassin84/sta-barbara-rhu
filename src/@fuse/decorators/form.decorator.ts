import {Injectable} from '@angular/core'
import {FormBuilder} from '@angular/forms'

export function FormService(): ClassDecorator {
    return (target: any) => {
        Injectable({providedIn: 'root'})(target) // Apply Injectable decorator
        target.prototype.__proto__ = FormBuilder.prototype // Inherit from FormBuilder
    }
}
