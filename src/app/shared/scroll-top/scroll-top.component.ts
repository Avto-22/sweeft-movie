import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.css'],
})
export class ScrollTopComponent implements OnInit {
  isWindowScrolled: boolean;

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll') onWindowScroll() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      this.isWindowScrolled = true;
    } else {
      this.isWindowScrolled = false;
    }
  }

  scroll() {
    if (this.isWindowScrolled) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }
}
