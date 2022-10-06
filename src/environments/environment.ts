// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: 'dd923282385902214de49a02d014c11f',
  firebase: {
    apiKey: 'AIzaSyDIWJpZCIjZzsDQDtTS09DiD0b-xd4CtEg',
    authDomain: 'sweeft-movie.firebaseapp.com',
    projectId: 'sweeft-movie',
    storageBucket: 'sweeft-movie.appspot.com',
    messagingSenderId: '624829891728',
    appId: '1:624829891728:web:0b7fa24eb1312c93fc4415',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
