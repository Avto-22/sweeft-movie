import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ScrollingTop]'
})
export class ScrollingTopDirective {

  lastScroll:number = 0;
  currentScroll:number;

  constructor(
    private element:ElementRef,
    private renderer:Renderer2
  ) { }

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    this.currentScroll = document.body.scrollTop || document.documentElement.scrollTop;
    if(this.currentScroll > 0 && this.lastScroll < this.currentScroll){
      this.renderer.removeClass(this.element.nativeElement, 'fixed')
    }else{
      this.renderer.addClass(this.element.nativeElement, 'fixed')
    }
    this.lastScroll = this.currentScroll;
  }

}
