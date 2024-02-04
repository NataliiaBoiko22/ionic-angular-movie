import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { LoginPageForm } from './login.page.form';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { show, hide } from 'src/store/loading/loading.actions';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { ToastController } from '@ionic/angular';
import { LoginState } from 'src/store/login/Login.State';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy{

  form: FormGroup;
  loginFormSubscription!: Subscription;
  emailControl: AbstractControl | null = null;
  passwordControl: AbstractControl | null = null;
  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>, private toastController: ToastController, private authService: AuthService) {
    this.form = new FormGroup({}); 
     }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
this.loginFormSubscription = this.store.select('login').subscribe(loginState => {
  this.onIsRecoveringPassword(loginState);
  this.onIsRecoverredPassword(loginState);
this.onError(loginState);
this.onIsLoggingIn(loginState);
this.onIsLoggedIn(loginState);

this.toggleLoading(loginState);

})

    this.emailControl = this.form.get('email');
    this.passwordControl = this.form.get('password');

  }
ngOnDestroy(): void {
    if(this.loginFormSubscription){
    this.loginFormSubscription.unsubscribe();
    }
}

private toggleLoading(loginState: LoginState){
if (loginState.isLoggingIn || loginState.isRecoveringPassword){
this.store.dispatch(show());
} else {
this.store.dispatch(hide())
}
}
private onIsRecoveringPassword( loginState: LoginState){
  if(loginState.isRecoveringPassword){
    
    this.authService.recoverEmailPassword(this.form.get('email')?.value).subscribe(() => {
    this.store.dispatch(recoverPasswordSuccess())
    }, error => this.store.dispatch(recoverPasswordFail({error})))
    }
}
private async onIsRecoverredPassword( loginState: LoginState){
  if(loginState.isRecoveredPassword){
   
    try {
      const toaster = await this.toastController.create({
        position: "bottom",
        message: "Recovery email sent",
        color: "primary"
      });
      toaster.present();
    } catch (error) {
      console.error('Error creating toast', error);
    }
    }
  
}

private onIsLoggingIn(loginState: LoginState){
if (loginState.isLoggingIn){
  const email = this.form.get('email')?.value;
  const password = this.form.get('password')?.value;

this.authService.login(email, password).subscribe(user => {
this.store.dispatch(loginSuccess({user}));
}, error => this.store.dispatch(loginFail({error})))
}

}
private onIsLoggedIn(loginState: LoginState){
  if (loginState.isLoggedIn){
    this.router.navigate(['home'])
  
  }
  
  }
private async onError( loginState: LoginState){
  if(loginState.error){

    try {
      const toaster = await this.toastController.create({
        position: "bottom",
        message: loginState.error.message,
        color: "danger"
      });
      toaster.present();
    } catch (error) {
      console.error('Error creating toast', error);
    }
    
    }
}

forgotEmailPassword(){
  this.store.dispatch(recoverPassword())
this.store.dispatch(show())
setTimeout(()=>{
this.store.dispatch(hide())
}, 3000)
}

  login(){
  // this.router.navigate(['video-list'])
  this.store.dispatch(login());
  }
  
  register(){
    this.router.navigate(['register'])
    }
}
