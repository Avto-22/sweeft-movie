import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: "[HorizontalScroll]",
  })
  export class HorizontalScrollDirective {

    startX;
    isDown:boolean = false;
    scrollLeft;

    constructor(
      private element: ElementRef,
      private renderer:Renderer2
      ) {
        this.element.nativeElement.style.fontWeight = 'bold';
      }
  
    @HostListener("wheel", ["$event"])
    onScroll(event: WheelEvent) {
      this.element.nativeElement.scrollLeft += event.deltaY;
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event){
      this.renderer.addClass(this.element.nativeElement, 'active-cast');
      this.isDown = true;
      this.startX = event.pageX - this.element.nativeElement.offsetLeft;
      this.scrollLeft = this.element.nativeElement.scrollLeft;
    }

    @HostListener('mouseleave')
    onMouseLeave(){
      this.isDown = false;
      this.renderer.removeClass(this.element.nativeElement, 'active-cast');
    }

    @HostListener('mouseup')
    onMouseUp(){
      this.isDown = false;
      this.renderer.removeClass(this.element.nativeElement, 'active-cast');
    }

    @HostListener('mousemove', ["$event"])
    onMouseMove(event){
      if(!this.isDown){
        return;
      }
      event.preventDefault();
      let x = event.pageX - this.element.nativeElement.offsetLeft;
      let walk = (x - this.startX) * 1;
      this.element.nativeElement.scrollLeft = this.scrollLeft - walk;
    }
  }