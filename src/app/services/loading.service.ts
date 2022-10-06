import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  
  constructor() { }

  loading: Subject<boolean> = new Subject();

  loading$():Observable<boolean>{
    return this.loading.asObservable();
  }

  start(){
    this.loading.next(true);
  }

  end(){
    this.loading.next(false);
  }
}
