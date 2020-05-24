import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appShowRating]',
})
export class ShowRatingDirective {
  @Input()
  private date = '';

  @Input()
  private for = '';

  @Input()
  private idRating = '';

  @Input()
  private login = '';

  @Input()
  private indexStudent = '';

  @Input()
  private indexRating = '';

  private paragraph: any;
  private deleteButton: any;

  private yes: any;
  private question: any;

  private questionIsSet = false;

  deleteButtonFunction = () => {
    this.service.students[this.indexStudent].ratings.splice(this.indexRating, 1);
    this.service.deleteRating(this.idRating, this.login).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    this.yes.removeEventListener('click', this.deleteButtonFunction);
  }

  showDeleteConfirm = () => {
    this.question = this.renderer.createElement('p');
    this.yes = this.renderer.createElement('button');
    this.yes.classList.add('btn');
    this.yes.classList.add('btn-danger');
    this.question.innerHTML = 'Usunąć ocenę ?';
    this.yes.innerHTML = 'Usuń';
    this.renderer.appendChild(this.el.nativeElement, this.question);
    this.renderer.appendChild(this.el.nativeElement, this.yes);
    this.yes.addEventListener('click', this.deleteButtonFunction);
    this.deleteButton.removeEventListener('click', this.showDeleteConfirm);
    this.questionIsSet = true;
  }

  constructor(
    private service: AuthService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.paragraph = this.renderer.createElement('p');
    this.deleteButton = this.renderer.createElement('div');
    this.deleteButton.classList.add('btn');
    this.deleteButton.classList.add('delete');
  }

  @HostListener('mouseenter')
  mouseenter(event: Event) {
    this.paragraph.innerHTML = this.for + ' ' + this.date.toString().slice(0, 10);
    this.renderer.appendChild(this.el.nativeElement, this.paragraph);
    this.renderer.appendChild(this.el.nativeElement, this.deleteButton);
    this.deleteButton.addEventListener('click', this.showDeleteConfirm);
  }

  @HostListener('mouseleave')
  mouseleave(event: Event) {
    this.renderer.removeChild(this.el.nativeElement, this.paragraph);
    this.renderer.removeChild(this.el.nativeElement, this.deleteButton);
    if (this.questionIsSet) {
      this.renderer.removeChild(this.el.nativeElement, this.question);
      this.renderer.removeChild(this.el.nativeElement, this.yes);
      this.questionIsSet = false;
    }
    this.deleteButton.removeEventListener('click', this.showDeleteConfirm);
  }
}
