import {SystemActions} from '@fuse/decorators/system.action.group'
import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {Analytics} from 'app/app-core/models/analytics.model'

export const SYSTEM = SystemActions({name: `Analytics System`})

export const load = createActionGroup({
    source: `Analytics load`,
    events: {
        request: emptyProps(),
        onSuccess: props<{analytics: Analytics[]}>(),
    },
})
