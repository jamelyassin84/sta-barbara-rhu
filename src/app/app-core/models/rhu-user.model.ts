import {RHUUserTypEnum} from '../enums/rhu-user-type.enum'

export interface RHUUser {
    email: string
    password: string
    type: RHUUserTypEnum
    confirmPassword: string
}
