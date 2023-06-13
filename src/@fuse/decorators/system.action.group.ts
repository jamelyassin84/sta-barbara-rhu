import {LoadingState} from '@digital_brand_work/models/core.model'
import {createActionGroup, props} from '@ngrx/store'

export function SystemActions(options: {name: string}) {
    return createActionGroup({
        source: options.name as any,
        events: {
            onError: props<{error: any}>(),
            setLoader: props<{loading: LoadingState}>(),
            setProcessedID: props<{id: string}>(),
            removeProcessedId: props<{id: string}>(),
        },
    })
}
