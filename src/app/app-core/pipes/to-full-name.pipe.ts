import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'to_full_name'})
export class ToFullNamePipe implements PipeTransform {
    transform(user: any): string {
        return `${user.requester_last_name}, ${user.requester_first_name} ${user.requester_middle_name} ${user.requester_name_extension}`
    }
}
