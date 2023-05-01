import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: `to_card_image`, pure: true})
export class ToCardImagePIpe implements PipeTransform {
    transform(type: CardEnum): string {
        return to_card_image(type)
    }
}

export function to_card_image(type: CardEnum): string {
    const directory = `/assets/payment-methods/`

    if (type === CardEnum.JCB) {
        return `${directory}jcb.png`
    }

    if (type === CardEnum.VISA) {
        return `${directory}visa.png`
    }

    if (type === CardEnum.DISCOVER) {
        return `${directory}discover.svg`
    }

    if (type === CardEnum.UNION_PAY) {
        return `${directory}china_union_pay.png`
    }

    if (type === CardEnum.MASTER_CARD) {
        return `${directory}mastercard.png`
    }
    if (type === CardEnum.AMERICAN_EXPRESS) {
        return `${directory}american_expreess.png`
    }

    return `${directory}unknown.jpg`
}

export enum CardEnum {
    JCB = `JCB`,
    VISA = `visa`,
    UNKNOWN = `Unknown`,
    DISCOVER = `Discover`,
    UNION_PAY = `UnionPay`,
    MASTER_CARD = `mastercard`,
    AMERICAN_EXPRESS = `American Express`,
}
