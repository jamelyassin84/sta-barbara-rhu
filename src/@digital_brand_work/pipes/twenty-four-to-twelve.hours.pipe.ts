import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name: 'to_twelve_hour',
})
export class TwentyFourToTwelveHoursPipe implements PipeTransform {
    transform(time: any): any {
        return to_twelve_hour(time)
    }
}

export function to_twelve_hour(time: any): any {
    let [hour, min] = time.split(':')

    const part = hour > 12 ? 'PM' : 'AM'

    if (parseInt(hour) === 0) hour = 12

    min = `${min}`.length === 1 ? `0${min}` : min

    hour = hour > 12 ? hour - 12 : hour

    hour = `${hour}`.length === 1 ? `0${hour}` : hour

    return `${hour}:${min} ${part}`
}
