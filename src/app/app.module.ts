import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundModule } from './not-found/not-found.module';
import { SharedModule } from './shared/shared.module';
import {
  API_KEY,
  BASE_URL,
  MovieApiService,
} from './movie/services/movie-api.service';
import { environment } from 'src/environments/environment';
import { AuthModule } from './auth/auth.module';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { movieReducer } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './store/effects/movie.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotFoundModule,
    SharedModule,
    AuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),

    StoreModule.forRoot({movies: movieReducer}),
    EffectsModule.forRoot([MovieEffects]),
    StoreDevtoolsModule.instrument({
      maxAge:25, // ბოლო 25 state
      logOnly: environment.production, // მხოლოდ პროდაქშენის დროს
      autoPause:true // დააპაუზოს ექშენების და სტეიტების ცვლილებების ჩაწერა, როცა ექსთენშენის ფანჯარა გახსნილი არ იქნება
    }),

  ],
  providers: [
    MovieApiService,
    {
      provide: BASE_URL,
      useValue: environment.baseUrl,
    },
    {
      provide: API_KEY,
      useValue: environment.apiKey,
    },
    

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
