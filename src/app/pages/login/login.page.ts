import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { LoginPageForm } from './login.page.form';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { show, hide } from 'src/store/loading/loading.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  emailControl: AbstractControl | null = null;
  passwordControl: AbstractControl | null = null;
  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>) {
    this.form = new FormGroup({}); 
     }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm()
    this.emailControl = this.form.get('email');
    this.passwordControl = this.form.get('password');

  }

forgotEmailPassword(){
this.store.dispatch(show())
setTimeout(()=>{
this.store.dispatch(hide())
}, 3000)
}

  login(){
  this.router.navigate(['video-list'])
  }
  
  register(){
    this.router.navigate(['register'])
    }
}
