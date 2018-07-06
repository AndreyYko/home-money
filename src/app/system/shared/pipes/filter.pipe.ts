import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FlackFilter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any, value: string, field: string): any {
    if (items.length === 0 || !value) {
      return items;
    }

    return items.filter((item) => {
      const copy = Object.assign({}, item); // copy on iteration because change some fields
      if (!isNaN(copy[field])) { // check if field is sum => number
        copy[field] += '';
      }

      if (field === 'type') {
        copy[field] = copy[field] === 'income' ? 'доход' : 'расход';
      }

      if (field === 'category') {
        copy[field] = copy[field] === '1' ? 'дом' : '';
      }

      return copy[field].toLowerCase().indexOf(value.toLowerCase()) !== -1; // ideal filter in array of ... || search
    });
  }
}
