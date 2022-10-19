import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { MovieActions } from 'src/app/store/actions';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsFacadeService {

  constructor(
    private sweetAlert: SweetAlertService,
    private authService: AuthService,
    private store: Store
  ) {}

  async addFavorite() {
    //---------------- start add favorite
    let userUid: string;
    await this.authService.getUserUid().then((res) => {
      userUid = res;
    });
    this.store.dispatch(MovieActions.addFavMovie({ uid: userUid }));
    this.sweetAlert.addFav('Film added Successful');
  } // ------------------ end add favorite

  async removeFavourite() {
    // ------------------ start removeFavorite
    let userUid: string;
    await this.authService.getUserUid().then((res) => {
      userUid = res;
    });
    this.store.dispatch(MovieActions.removeFavMovie({ uid: userUid }));
    this.sweetAlert.addFav('Film removed Successful');
  } // ------------------ end removeFavorite
}
