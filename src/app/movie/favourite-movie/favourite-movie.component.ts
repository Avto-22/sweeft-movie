import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Movie } from '../movie-model';

@Component({
  selector: 'app-favourite-movie',
  templateUrl: './favourite-movie.component.html',
  styleUrls: ['./favourite-movie.component.css']
})
export class FavouriteMovieComponent implements OnInit {
  movie!:Movie[];

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    document.body.style.backgroundColor='#1e81b0';
    this.movie = JSON.parse(localStorage.getItem(`favorites_${this.authService.getUserUid()}`) || '[]');
  }


}
