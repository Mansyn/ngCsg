import { Pipe, PipeTransform } from '@angular/core';;

/*
 * Filter nav links by section
*/

@Pipe({ name: 'filterLink', pure: false })
export class FilterLink implements PipeTransform {
    transform(items: any[], field: string, value: string): any[] {
        if (!items) return [];
        return items.filter(it => it[field] != value);
    }
}