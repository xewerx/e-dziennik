import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appShowRating]'
})
export class ShowRatingDirective {


  date = new Date(); // zbindowac date przez input

  @Input()
  private for = '';

  private paragraph;
  private editButton;
  private deleteButton;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.paragraph = this.renderer.createElement('p');
  }

  @HostListener('mouseenter')
  mouseenter(event: Event) {
    this.paragraph.innerHTML = this.for + ' ' + this.date.toLocaleDateString();
    this.renderer.appendChild(this.el.nativeElement, this.paragraph);
  }

  @HostListener('mouseleave')
  mouseleave(event: Event) {
    this.renderer.removeChild(this.el.nativeElement, this.paragraph);
  }

}
