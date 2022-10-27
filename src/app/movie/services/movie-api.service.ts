import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MovieBody, Movie, CastBody, Genres, Trailer, CollectionApiResponse, Actor, Philmography } from '../movie-model';

export const BASE_URL = new InjectionToken<string>('api url');
export const API_KEY = new InjectionToken<string>('api key');

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  constructor(
    @Inject(BASE_URL) private baseUrl:string,
    @Inject(API_KEY) private apiKey:string,
    private http: HttpClient
    ) { }

  getMovieListByPageName(page:number) :Observable<MovieBody>{
    return this.http.get<MovieBody>(this.baseUrl+`discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`)
  }

  getMovieById(movieId:number): Observable<Movie>{
    return this.http.get<Movie>(`${this.baseUrl}movie/${movieId}?api_key=${this.apiKey}&language=en-US`);
  }

  searchMovieByName(movieName:string):Observable<MovieBody>{
    return this.http.get<MovieBody>(`${this.baseUrl}search/movie?api_key=${this.apiKey}&language=en-US&query=${movieName}&page=1&include_adult=false`)
  }

  getMovieCast(movieId:number):Observable<CastBody>{
    return this.http.get<CastBody>(`${this.baseUrl}movie/${movieId}/credits?api_key=${this.apiKey}&language=en-US`)
  }

  getMovieGenres():Observable<Genres>{
    return this.http.get<Genres>(`${this.baseUrl}genre/movie/list?api_key=${this.apiKey}&language=en-US`);
  }

  getMovieTrailer(movieId:number): Observable<Trailer>{
    return this.http.get<Trailer>(`${this.baseUrl}movie/${movieId}/videos?api_key=${this.apiKey}&language=en-US`)
  }

  getCollection(collecctionsId: number): Observable<CollectionApiResponse>{
    return this.http.get<CollectionApiResponse>(this.baseUrl+'collection/' + collecctionsId +'?api_key='+this.apiKey);
  }

  getCollectionids(): Observable<number> {
    return of<number>(10)
  }

  getActor(personId:number): Observable<Actor>{
    return this.http.get<Actor>(this.baseUrl+'person/'+personId+'?api_key='+this.apiKey+'&language=en-US');
  }

  getActorPhilmography(personId:number): Observable<Philmography>{
    return this.http.get<Philmography>(this.baseUrl+'person/'+personId+'/movie_credits?api_key='+this.apiKey+'&language=en-US');
  }

}
