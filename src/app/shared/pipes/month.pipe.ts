import { Pipe, PipeTransform } from '@angular/core';
import { Month } from '../../movie/movie-model';

@Pipe({
  name: 'month'
})
export class MonthPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let month: string='';
    for(let i=1; i<=12; i++){
      if(i == parseInt(value)){
        month = Month[i-1];
      }
    }
    return month;
  }

}
