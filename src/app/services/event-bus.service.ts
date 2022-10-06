import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  page: number;

  constructor() {}

  setPage(page: number) {
    this.page = page;
  }
  
}
