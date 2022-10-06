import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
activeUrl!:string;

  constructor() { }

  ngOnInit() {
    document.body.style.backgroundColor='#1e81b0';
    document.body.style.backgroundImage="none";
  }




}
