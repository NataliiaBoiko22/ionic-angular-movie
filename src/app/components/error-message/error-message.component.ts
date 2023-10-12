import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent  implements OnInit {

  @Input() message: string = '';
  @Input() field: AbstractControl | null = null;
  @Input() error: string = '';

  constructor() {
    this.field = new FormGroup({});  }

  ngOnInit() {}
  shouldShowComponent(){
    return this.field && this.field.touched && this.field.errors?.[this.error]
  }
}
