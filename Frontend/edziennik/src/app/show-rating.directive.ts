import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appShowRating]'
})
export class ShowRatingDirective {

  @Input()
  private date = '';

  @Input()
  private for = '';

  @Input()
  private id = '';

  private paragraph: any;
  private editButton: any;
  private deleteButton: any;

  editButtonFunction = () => {
    this.service.editRating(this.id, 4).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteButtonFunction = () =>  {
    this.service.deleteRating(this.id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  constructor(private service: AuthService, private el: ElementRef, private renderer: Renderer2) {
    this.paragraph = this.renderer.createElement('p');
    this.editButton = this.renderer.createElement('div');
    this.deleteButton = this.renderer.createElement('div');
    this.editButton.classList.add('btn');
    this.editButton.classList.add('edit');
    this.deleteButton.classList.add('btn');
    this.deleteButton.classList.add('delete');
  }

  @HostListener('mouseenter')
  mouseenter(event: Event) {
    this.paragraph.innerHTML = this.for + ' ' + this.date.slice(0, 10);
    this.renderer.appendChild(this.el.nativeElement, this.paragraph);
    this.renderer.appendChild(this.el.nativeElement, this.editButton);
    this.renderer.appendChild(this.el.nativeElement, this.deleteButton);
    this.deleteButton.addEventListener('click', this.deleteButtonFunction);
    this.editButton.addEventListener('click', this.editButtonFunction);
  }

  @HostListener('mouseleave')
  mouseleave(event: Event) {
    this.renderer.removeChild(this.el.nativeElement, this.paragraph);
    this.renderer.removeChild(this.el.nativeElement, this.editButton);
    this.renderer.removeChild(this.el.nativeElement, this.deleteButton);
    this.deleteButton.removeEvenListener('click');
    this.editButton.removeEvenListener('click');
  }

}
