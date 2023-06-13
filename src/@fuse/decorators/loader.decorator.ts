import {LoadingTypeEnum} from '@digital_brand_work/enums/loading-type.enum'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {Observable} from 'rxjs'

export function Loader(options: {
    state: keyof typeof StoreAction
    loading: LoadingTypeEnum
}): MethodDecorator {
    return function (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value

        descriptor.value = function (...args: any[]) {
            const storeAction = options.state
            const loadingType = options.loading

            this._storeLoaderService.initializeLoader(storeAction, loadingType)
            const result = originalMethod.apply(this, args)

            if (result instanceof Observable) {
                return result.pipe(
                    this._storeLoaderService.addLoadingState(
                        storeAction,
                        loadingType,
                    ),
                ) as any
            }

            return result
        }

        return descriptor
    }
}
