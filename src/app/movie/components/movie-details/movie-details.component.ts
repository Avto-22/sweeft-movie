import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetail } from '../../movie-model';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { utility } from './utility';
import { MovieDetailsFacadeService } from './services/movie-details-facade.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {

  utility = utility;

  movie$:Observable<MovieDetail>;

  @ViewChild('cast') cast: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    public facadeService:MovieDetailsFacadeService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    document.body.style.backgroundColor = '#1e81b0';
    this.getMovie();
  }

  async getMovie(){
    let userUid:string;
     await this.authService?.getUserUid().then(res=>{
      userUid = res
    });

    this.movie$ = this.activatedRoute.paramMap
    .pipe(
      map((params) => params.get('id')),
      switchMap(movieId=>{
        return this.facadeService.getFullInfo(parseInt(movieId),userUid)
      }),
    )
  }

  next() {
    this.cast.nativeElement.scrollLeft += 200;
  }

  back() {
    this.cast.nativeElement.scrollLeft -= 200;
  }

}
