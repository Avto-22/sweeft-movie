import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CardComponent } from './components/card/card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { ImdbPipe } from './pipes/imdb.pipe';
import { ScrollingTopDirective } from './components/header/scrolling-top.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
  ],
  declarations: [SharedComponent,LoadingComponent, HeaderComponent, CardComponent, ScrollTopComponent, ImdbPipe, ScrollingTopDirective],
  providers: [AuthService],
  exports: [LoadingComponent, HeaderComponent, CardComponent, ScrollTopComponent, ImdbPipe],
 
})
export class SharedModule { }
