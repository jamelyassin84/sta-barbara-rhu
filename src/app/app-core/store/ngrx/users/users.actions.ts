import {SystemActions} from '@fuse/decorators/system.action.group'
import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {RHUUser} from 'app/app-core/models/rhu-user.model'

export const SYSTEM = SystemActions({name: 'User System'})

export const load = createActionGroup({
    source: 'User load',
    events: {
        request: emptyProps(),
        onSuccess: props<{users: RHUUser[]}>(),
    },
})

export const upsert = createActionGroup({
    source: 'User Update',
    events: {
        request: props<{user: RHUUser}>(),
        onSuccess: props<{user: RHUUser}>(),
    },
})

export const remove = createActionGroup({
    source: 'User Delete',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{id: string}>(),
    },
})
