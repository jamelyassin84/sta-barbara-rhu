import {createAction, props} from '@ngrx/store'

/**
 * Generates base actions for an entity.
 * @param {string} entity - The name of the entity.
 * @returns {object} The base actions for the entity.
 */
export function baseActions<TEntity>(entity: string) {
    return {
        // Load actions
        load: {
            // Load request action
            request: createAction(`${entity} Load Request`),
            // Load success action
            onSuccess: createAction(
                `${entity} Load Success`,
                props<{data: TEntity[]}>(),
            ),
        },
        // Update actions
        update: {
            // Update request action
            request: createAction(
                `${entity} Update Request`,
                props<{data: TEntity}>(),
            ),
            // Update success action
            onSuccess: createAction(
                `${entity} Update Success`,
                props<{data: TEntity}>(),
            ),
        },
        // Delete actions
        delete: {
            // Delete request action
            request: createAction(
                `${entity} Delete Request`,
                props<{id: string}>(),
            ),
            // Delete success action
            onSuccess: createAction(
                `${entity} Delete Success`,
                props<{id: string}>(),
            ),
        },
        // Add actions
        add: {
            // Add request action
            request: createAction(
                `${entity} Add Request`,
                props<{data: TEntity}>(),
            ),
            // Add success action
            onSuccess: createAction(
                `${entity} Add Success`,
                props<{data: TEntity}>(),
            ),
        },
        // System actions
        system: {
            // Set loader action
            setLoader: createAction(
                `${entity} Set Loader`,
                props<{loading: {type: string; state: boolean}}>(),
            ),
            // Error action
            onError: createAction(`${entity} On Error`, props<{error: any}>()),
            // Set processed ID action
            setProcessedID: createAction(
                `${entity} setProcessedID`,
                props<{id: string}>(),
            ),
            // Remove processed ID action
            removeProcessedId: createAction(
                `${entity} removeProcessedId`,
                props<{id: string}>(),
            ),
        },
    }
}
