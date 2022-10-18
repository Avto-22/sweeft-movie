import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MovieActions } from 'src/app/store/actions';
import { MovieSelector } from 'src/app/store/selectors';
import { Movie } from '../../movie-model';

@Component({
  selector: 'app-favourite-movie',
  templateUrl: './favourite-movie.component.html',
  styleUrls: ['./favourite-movie.component.css']
})
export class FavouriteMovieComponent implements OnInit {
  movies$:Observable<Movie[]> = this.store.select(MovieSelector.selectFavMovies);

  constructor(
    private authService:AuthService,
    private store:Store
  ) { }

  ngOnInit(): void {
    document.body.style.backgroundColor='#1e81b0';
    this.getMovies();
  }

  async getMovies(){
    let uid:string;
    await this.authService.getUserUid().then(res=>{
      uid = res
    });
    this.store.dispatch(MovieActions.getFavMovies({key: `favorites_${uid}`}))
    // this.movies$ = JSON.parse(localStorage.getItem(`favorites_${uid}`) || '[]');
  }

}
