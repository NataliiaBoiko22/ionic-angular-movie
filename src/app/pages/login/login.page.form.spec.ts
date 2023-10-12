
import { LoginPageForm } from './login.page.form'
import { FormBuilder, FormGroup } from '@angular/forms';
describe('LoginPageForm', () => {

    let loginPageForm: LoginPageForm;
    let form: FormGroup
beforeEach(() =>{
     loginPageForm = new LoginPageForm(new FormBuilder());
     form = loginPageForm.createForm();
})

it('should create login form empty', () => {
expect(form).not.toBeNull();
    const emailControl = form.get('email');
    const passwordControl = form.get('password');

    expect(emailControl).not.toBeNull();
    expect(emailControl?.value).toEqual('');
    expect(emailControl?.valid).toBeFalsy();
    expect(passwordControl).not.toBeNull();
    expect(passwordControl?.value).toEqual('');
    expect(passwordControl?.valid).toBeFalsy();
})

it('should have email invalid if email is not valid', () => {
    const emailControl = form.get('email');
    emailControl?.setValue('invalid email');
expect(emailControl?.valid).toBeFalsy();
})



it('should have a valid  email if  email is valid', () => {
    const emailControl = form.get('email');

    emailControl?.setValue('valid@email.com');

expect(emailControl?.valid).toBeTruthy();

})
it('should have a  valid  form', () => {
    const emailControl = form.get('email');
    const passwordControl = form.get('password');
    emailControl?.setValue('valid@email.com');
    passwordControl?.setValue('anyPassword');
expect(form.valid).toBeTruthy();

})
})