import {SystemActions} from '@fuse/decorators/system.action.group'
import {createActionGroup, props} from '@ngrx/store'
import {AgeGroupParams} from 'app/app-core/api/params/age-group.params'
import {AgeGroup} from 'app/app-core/models/age-group.model'

export const SYSTEM = SystemActions({name: 'Age Groups System'})

export const load = createActionGroup({
    source: 'Age Groups load',
    events: {
        request: props<{param: AgeGroupParams}>(),
        onSuccess: props<{ageGroups: AgeGroup[]}>(),
    },
})
