import {LoadingStateEnum} from '../enums/loading-state.enum'

export interface StoreLoaders {
    createLoader: LoadingStateEnum
    updateLoader: LoadingStateEnum
    getLoader: LoadingStateEnum
    findOneLoader: LoadingStateEnum
    removeLoader: LoadingStateEnum
}
