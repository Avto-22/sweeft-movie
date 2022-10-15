import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Movie } from '../../movie-model';

@Component({
  selector: 'app-favourite-movie',
  templateUrl: './favourite-movie.component.html',
  styleUrls: ['./favourite-movie.component.css']
})
export class FavouriteMovieComponent implements OnInit {
  movies!:Movie[];

  constructor(
    private authService:AuthService
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
    this.movies = JSON.parse(localStorage.getItem(`favorites_${uid}`) || '[]');
  }

}
