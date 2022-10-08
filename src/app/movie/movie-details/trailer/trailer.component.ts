import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.css'],
})
export class TrailerComponent implements OnInit {
  @Input() trailerUrl: string = '';
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('trailer_div', { static: true }) trailerDiv: ElementRef;
  @ViewChild('video_div', { static: true }) trailerVideo: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.outsideVideo();
  }

  outsideVideo() {
    this.renderer.listen(this.trailerDiv.nativeElement, 'click', (event) => {
      if (!this.trailerVideo.nativeElement.contains(event.target)) {
        this.closeTrailer();
      }
    });
  }

  closeTrailer() {
    this.close.emit();
  }
}
