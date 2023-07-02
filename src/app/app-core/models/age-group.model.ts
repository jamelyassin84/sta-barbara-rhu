export interface AgeGroup {
    males: number
    females: number
    diagnosedMale: number
    diagnosedFemale: number
    bracket: Bracket
    totalPatients: number
    totalDiagnosed: number
    id?: string
}

export type Bracket =
    | '0-15'
    | '15-19'
    | '20-24'
    | '25-29'
    | '30-34'
    | '35-39'
    | '40-44'
    | '45-150'
