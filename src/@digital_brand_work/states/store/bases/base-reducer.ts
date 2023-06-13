import {createReducer, on} from '@ngrx/store'
import {createEntityAdapter} from '@ngrx/entity'
import {STORE_LOADERS} from '../helpers/store-loaders'
import {baseActions} from './base-actions'

/**
 * Generates a base reducer for an entity using the provided actions.
 * @param {object} actions - The base actions for the entity.
 * @returns {function} The base reducer for the entity.
 */
export function baseReducers<TState>(
    actions: ReturnType<typeof baseActions<TState>>,
) {
    const adapter = createEntityAdapter()

    const initialState = adapter.getInitialState({
        ...STORE_LOADERS,
        error: null,
        processedIDs: [],
    })

    return createReducer(
        initialState,

        // Handles setting the loader state in the store
        on(actions.system.setLoader, (state, action) => ({
            ...state,
            [`${action.loading.type}Loader`]: action.loading.state,
        })),

        // Handles storing the error in the store
        on(actions.system.onError, (state, action) => ({
            ...state,
            error: action.error,
        })),

        // Handles the successful loading of data into the store
        on(actions.load.onSuccess, (state, action) =>
            adapter.setAll(action.data, state),
        ),

        // Handles the successful update of an entity in the store
        on(actions.update.onSuccess, (state, action) =>
            adapter.upsertOne(action.data, state),
        ),

        // Handles the successful addition of an entity to the store
        on(actions.add.onSuccess, (state, action) =>
            adapter.addOne(action.data, state),
        ),

        // Handles the successful deletion of an entity from the store
        on(actions.delete.onSuccess, (state, action) =>
            adapter.removeOne(action.id, state),
        ),

        // Handles setting the processed ID in the store
        on(actions.system.setProcessedID, (state, action) => ({
            ...state,
            processedIDs: [...state.processedIDs, action.id],
        })),

        // Handles removing the processed ID from the store
        on(actions.system.removeProcessedId, (state, action) => ({
            ...state,
            processedIDs: state.processedIDs.filter((id) => id !== action.id),
        })),
    )
}
