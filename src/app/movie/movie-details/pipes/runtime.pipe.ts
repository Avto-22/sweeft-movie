import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'runtime'
})
export class RuntimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if( value >= 60){
      if((value % 60) == 0){
        return value/60+' hours';
      }else{
        return `${(value/60).toString().split('.')[0]+ 'h, '+ (value%60)+ 'm'}`;
      }
    };
    return value + ' minute';
  }

}
