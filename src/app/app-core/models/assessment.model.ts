import {NodeBaseModel} from '@digital_brand_work/models/core.model'
import {SymptomsCategory} from './symptoms-category.model'

export interface Assessment extends NodeBaseModel {
    weight: string
    height: string
    sex: string
    assessment_date: string
    body_temperature: string
    blood_pressure: string
    chief_complaints: string
    injuries: string
    symptomsCategory: SymptomsCategory
}
