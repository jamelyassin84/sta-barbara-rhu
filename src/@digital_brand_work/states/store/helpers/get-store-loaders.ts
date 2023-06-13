import {StoreLoaders} from '../models/loader.model'

export function getStoreLoaders(state: any) {
    return {
        getLoader: state.getLoader,
        removeLoader: state.removeLoader,
        createLoader: state.createLoader,
        updateLoader: state.updateLoader,
        findOneLoader: state.findOneLoader,
    } as StoreLoaders
}
