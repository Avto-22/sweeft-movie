import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieBody, Movie, CastBody, Genres, Trailer } from '../movie-model';

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
    return this.http.get<Movie>(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.apiKey}&language=en-US`);
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

}
