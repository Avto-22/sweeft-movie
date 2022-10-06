import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: "[HorizontalScroll]",
  })
  export class HorizontalScrollDirective {
    constructor(private element: ElementRef) {}
  
    @HostListener("wheel", ["$event"])
    onScroll(event: WheelEvent) {
      this.element.nativeElement.scrollLeft += event.deltaY;
    }
  }