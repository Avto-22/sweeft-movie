import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MovieApiService } from '../services/movie-api.service';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieResult, MovieAndCast} from '../movie-model';
import {  of, Subject } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  movie!: MovieAndCast;
  isMovieNotFound:boolean;

  isFavourite:boolean;
  errorText:string;

  favorites:Movie[] = JSON.parse(localStorage.getItem('favorites') || '[]');

  @ViewChild('cast') cast:ElementRef;

  unsubscribe$:Subject<number> = new Subject<number>();

  constructor(
    private movieApi: MovieApiService,
    private activatedRoute: ActivatedRoute,
    private sweetAlert:SweetAlertService
  ) {}

  ngOnInit() {
    document.body.style.backgroundColor = '#1e81b0';
    this.activatedRoute.paramMap.pipe(
      map(params=> params.get('id')),
      takeUntil(this.unsubscribe$)
    ).subscribe(movieId=>{
      if(movieId){
        this.getFullInfo(+movieId);
      }
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(-1);
    this.unsubscribe$.unsubscribe();
  }

  getFullInfo(id?:number) {
      let movieId:number;
      let favMovies:MovieResult[] = JSON.parse(localStorage.getItem('favorites') || '[]');
      if(id){
        movieId = id;
      }else{
        movieId = this.activatedRoute.snapshot.params['id'];
      }
      this.movieApi
      .getMovieById(movieId)
      .pipe(
        map(movie=> {
          /* api-დან წამოღებული ფილმების შემოწმება არის თუ არა რომელიმე  უკვე მომხმარებლის მიერ ფავორიტი, და თუ არის დაამატებს ობიექტს შესაბამის პროპერთის true მნიშვნელობით,
          რასაც გამოვიყენებ შემდეგ დეტალების გვედზე ფავორიტების დამატების და წაშლის ღილაკების გამოსაჩენად*/
            for(let i=0; i<favMovies.length; i++){
              if(movie.id == favMovies[i].id){
                movie = {
                  ...movie,
                  isFavorite:true
                }
              }
            }
            return movie;
          }),
        switchMap(movie=>{ // ახალ observable-ზე გადაყვანა და MovieAndCast ტიპის გამოყვანა
          return this.movieApi.getMovieCast(movie.id).pipe(
            switchMap(cast=>{
              return of({
                ...movie,
                casts: cast.cast.filter(data=> data.profile_path),
              })
            })
          )
        }),
        catchError(error=>{
          throw 'movie not found'
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((movieAndCast) => {
        this.movie = movieAndCast;
        this.isFavourite = Boolean(this.movie.isFavorite);
      },
      
      (error)=>{
       this.isMovieNotFound = true;
       this.errorText=error;
      });
  }

  addFavorite() {
    this.isFavourite = true;
    let favorites: Movie[] = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );

    localStorage.setItem(
      'favorites',
      JSON.stringify([this.movie, ...favorites])
    );

    this.sweetAlert.addFav('Film added Successful');
  }

  removeFavourite(){
    this.isFavourite=false;
    let favorites:Movie[] = JSON.parse(localStorage.getItem('favorites') || '[]').filter(movie=>movie.id!=this.movie.id);
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
    this.sweetAlert.addFav('Film removed Successful');
  }

  next(){
    this.cast.nativeElement.scrollLeft+=200;
  }

  back(){
    this.cast.nativeElement.scrollLeft-=200;
  }

}
