import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ErrorMessageComponent } from './error-message.component';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorMessageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
  }));

  it('should show error message on field touch and error present', () => {
    const fieldControl = new FormControl();
    component.field = new FormGroup({
      anyField: fieldControl
    });
    component.error = 'anyError';
    component.field.markAsTouched();
    component.field.setErrors({ anyError: true });

    expect(component.shouldShowComponent()).toBeTruthy();
  });

  it('should hide error message on field not touched', () => {
    const fieldControl = new FormControl();
    component.field = new FormGroup({
      anyField: fieldControl
    });
    component.error = 'anyError';

    component.field.setErrors({ anyError: true });

    expect(component.shouldShowComponent()).toBeFalsy();
  });
  it('should hide error message on field touched, but no errors', () => {
    const fieldControl = new FormControl();
    component.field = new FormGroup({
      anyField: fieldControl
    });
    component.error = 'anyError';
    component.field.markAsTouched();

    expect(component.shouldShowComponent()).toBeFalsy();
  });
  it('should hide error message on field touched and has error, but it is different error', () => {
    const fieldControl = new FormControl();
    component.field = new FormGroup({
      anyField: fieldControl
    });
    component.error = 'anotherError';
    component.field.markAsTouched();
    component.field.setErrors({ anyError: true });

    expect(component.shouldShowComponent()).toBeFalsy();
  });

});
