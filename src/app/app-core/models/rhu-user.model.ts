import {NodeBaseModel} from '@digital_brand_work/models/core.model'
import {RHUUserTypEnum} from '../enums/rhu-user-type.enum'

export interface RHUUser extends NodeBaseModel {
    email: string
    password: string
    type: RHUUserTypEnum
    confirmPassword: string
}
