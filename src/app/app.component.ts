import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { MovieSelector } from './store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'sweeft-movie';

  loading$: Observable<boolean> = this.store.select(
    MovieSelector.selectLoading
  );

  constructor(
    private changeRef: ChangeDetectorRef,
    public auth: AuthService,
    private store: Store,
  ) {}

  ngOnInit() {
    document.body.style.backgroundColor = 'black'
  }

  ngAfterContentChecked(): void {
    this.changeRef.detectChanges();
  }
}
