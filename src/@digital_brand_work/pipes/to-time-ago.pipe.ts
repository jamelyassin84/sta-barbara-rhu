import { Pipe, PipeTransform } from "@angular/core";
import dayjs from "dayjs";
var relativeTime = require('dayjs/plugin/relativeTime')

dayjs.extend(relativeTime)


@Pipe({name: 'to_time_ago'})
export class ToTimeAgoPipe implements PipeTransform {
    transform(date: Date): string {
        return to_time_ago(date)
    }
}


export function to_time_ago(date:Date):string {
return dayjs(date).fromNow() 
}

declare module 'dayjs' {
    interface Dayjs {
        fromNow()
    }
}