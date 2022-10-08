import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieResult } from './movie/movie-model';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'sweeft-movie';

  allMovies:MovieResult[]=[];
  
  constructor(
    private loading:LoadingService,
    private changeRef:ChangeDetectorRef,
    public auth:AuthService,
    ){}

  loading$!:Observable<boolean>;

  ngOnInit(){
    this. loading$ = this.loading.loading$();
  }

  ngAfterContentChecked(): void {
   this.changeRef.detectChanges();
  }

  
}
