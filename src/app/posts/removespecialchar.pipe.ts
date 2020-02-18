import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removespecialchar'
})
export class RemovespecialcharPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace( /%/g , '-');
  }
}
