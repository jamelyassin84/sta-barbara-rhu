import {NodeResponse} from '@digital_brand_work/models/core.model'
import {Observable, OperatorFunction} from 'rxjs'
import {map} from 'rxjs/operators'

export function NodeResponseMap<T>(): MethodDecorator {
    return function (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value

        descriptor.value = function (...args: any[]) {
            const result = originalMethod.apply(this, args)

            if (result instanceof Observable) {
                return result.pipe(
                    map((response: NodeResponse<T>) => response.data),
                )
            }

            return result
        }

        return descriptor
    }
}
