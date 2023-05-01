import {Pipe, PipeTransform} from '@angular/core'
import {Time} from './../models/core.model'
import {to_fixed_two} from './to-fixed-two.pipe'

@Pipe({name: 'to_time_interval'})
export class ToTimeIntervalPipe implements PipeTransform {
    transform(data: {from: Time; to: Time}): Time[] {
        return to_time_interval(data)
    }
}

export function to_time_interval(data: {from: Time; to: Time}): Time[] {
    let timings: Time[] = []

    const {from, to} = data

    const [startHour] = from.split(':')

    const [endHour] = to.split(':')

    const isGraveYard: boolean = parseInt(endHour) < 13

    for (
        let time = parseInt(startHour);
        !isGraveYard
            ? time <= 23 && time <= parseInt(endHour)
            : time <= 23 || time <= parseInt(endHour);
        time++
    ) {
        timings.push(`${to_fixed_two(time)}:00`)
    }

    if (isGraveYard) {
        for (let time = 2; time < parseInt(endHour) + 1; time++) {
            timings.push(`${to_fixed_two(time)}:00`)
        }
    }

    return [...new Set(timings)]
}
