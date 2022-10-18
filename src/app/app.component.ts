import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MovieResult } from './movie/movie-model';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';
import { MovieActions } from './store/actions';
import { MovieSelector } from './store/selectors';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'sweeft-movie';

  loading$:Observable<boolean> = this.store.select(MovieSelector.selectLoading);

  allMovies:MovieResult[]=[];
  
  constructor(
    private changeRef:ChangeDetectorRef,
    public auth:AuthService,
    private store:Store
    ){}


  ngOnInit(){ }

  ngAfterContentChecked(): void {
   this.changeRef.detectChanges();
  }

  
}
