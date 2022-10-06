import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imdb'
})
export class ImdbPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if(value.toString().split('.')[1].split('').length>1){
      return value.toString().split('.')[0]+'.'+value.toString().split('.')[1].split('')[0]
    }
    if(value.toString().split('.')?.length == 1){
      return value+'.0';
    }
    return value.toString();
  }

}
