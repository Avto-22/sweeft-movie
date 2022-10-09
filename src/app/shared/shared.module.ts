import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { LoadingComponent } from './loading/loading.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CardComponent } from './card/card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { ImdbPipe } from './card/imdb.pipe';
import { ScrollingTopDirective } from './header/scrolling-top.directive';

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
