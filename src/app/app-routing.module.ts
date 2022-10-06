import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules, Route } from '@angular/router';
import {
  redirectLoggedInTo,
  redirectUnauthorizedTo,
  AngularFireAuthGuard,
} from '@angular/fire/compat/auth-guard';

const redirectLoggedToItems = () => redirectLoggedInTo(['movie-list']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);

const routes: Route[] = [
  {
    path: '',
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLoggedToItems,
    },
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'auth',
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLoggedToItems,
    },
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'movie-list',
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
    loadChildren: () =>
      import('./movie/movie.module').then((m) => m.MovieModule),
  },

  {
    path: '**',
    loadChildren: () =>
      import('./not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
