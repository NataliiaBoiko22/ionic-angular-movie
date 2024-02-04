import { LoginPage } from "./login.page";
import { ComponentFixture,  fakeAsync,  TestBed, tick, waitForAsync } from "@angular/core/testing";
import { Router } from "@angular/router";
import { IonicModule, ToastController } from "@ionic/angular";
import { AppRoutingModule } from "src/app/app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { Store, StoreModule } from '@ngrx/store';
import { ErrorMessageComponent } from "src/app/components/error-message/error-message.component";
import { loadingReducer } from "src/store/loading/loading.reducers";
import { loginReducer } from "src/store/login/login.reducers";
import {AppState} from "src/store/AppState";
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "src/store/login/login.actions";
import { AuthService } from "src/app/services/auth/auth.service";
import { of, throwError } from "rxjs";
import { User } from "src/app/interfaces/user/user";

describe('LoginPage', () => {
let component: LoginPage;
let fixture: ComponentFixture<LoginPage>;
let router: Router;
let page: HTMLElement;;
let store: Store<AppState>;
let toastController: ToastController;
let authService: AuthService;

beforeEach(waitForAsync(() => {
TestBed.configureTestingModule({
declarations: [ LoginPage, ErrorMessageComponent ],
imports: [ IonicModule.forRoot(),
AppRoutingModule,
ReactiveFormsModule,
StoreModule.forRoot(),
StoreModule.forFeature("loading", loadingReducer),
StoreModule.forFeature("login", loginReducer)
]
}).compileComponents();

fixture = TestBed.createComponent(LoginPage);
router = TestBed.inject(Router);
store = TestBed.inject(Store);
toastController = TestBed.inject(ToastController);
authService = TestBed.inject(AuthService);
component = fixture.componentInstance;
page = fixture.debugElement.nativeElement;

}));

it('should create form on init', () => {

component.ngOnInit();
expect(component.form).not.toBeUndefined();

})

// it('should go to video-list page on login', ()=>{
//     spyOn(router, 'navigate')
// component.login();
// expect(router.navigate).toHaveBeenCalledWith(['video-list']);
// }

// )
it('should go to register page on register', ()=>{
    spyOn(router, 'navigate')
component.register();
expect(router.navigate).toHaveBeenCalledWith(['register']);
}
)
it('should recover email/password on forgot email/password', ()=>{
   fixture.detectChanges();
   component.form.get('email')?.setValue('valid@email.com');
   const recoverPasswordButton = page.querySelector('#recoverPasswordButton') as HTMLElement;
   if (recoverPasswordButton) {
       recoverPasswordButton.click();
   } else {
       fail('Button not found');
   }
   store.select('login').subscribe(loginState => {
expect(loginState.isRecoveringPassword).toBeTruthy();
})
})
it('should show loading when recovering password', ()=>{
    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.select('loading').subscribe(loadingState => {
    expect(loadingState.show).toBeTruthy();
    })
})
it('should hide loading and show success message when has recovered password', ()=>{
    spyOn(toastController, 'create')
    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordSuccess());

    store.select('loading').subscribe(loadingState => {
    expect(loadingState.show).toBeFalsy();
    })
expect(toastController.create).toHaveBeenCalledTimes(1);
})
it('should hide loading and show error message when error on recover password', ()=>{
    spyOn(toastController, 'create')

    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordFail({error: "message"}));

    store.select('loading').subscribe(loadingState => {
    expect(loadingState.show).toBeFalsy();
    })
expect(toastController.create).toHaveBeenCalledTimes(1);
})

it('should show loading and start login when logging in', ()=>{
    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@email.com');
    component.form.get('password')?.setValue('anyPassword');
    const loginButton =  page.querySelector('#loginButton') as HTMLElement;
    if (loginButton) {
        loginButton.click();
    } else {
        fail('Button not found');
    }
    store.select('loading').subscribe(loadingState => {
    expect(loadingState.show).toBeTruthy();
    
    });
    store.select('login').subscribe(loginState => {
        expect(loginState.isLoggingIn).toBeTruthy();
        
        });

})
it('should hide loading and send user to home page when user has logged in', ()=>{
    spyOn(router, 'navigate');
    spyOn(authService, 'login').and.returnValue(of(new User()));
    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@email.com');
    component.form.get('password')?.setValue('anyPassword');
    const loginButton =  page.querySelector('#loginButton') as HTMLElement;
    if (loginButton) {
        loginButton.click();
    } else {
        fail('Button not found');
    }
    store.select('loading').subscribe(loadingState => {
    expect(loadingState.show).toBeFalsy();
    
    });
    store.select('login').subscribe(loginState => {
        expect(loginState.isLoggedIn).toBeTruthy();
        
        });
expect(router.navigate).toHaveBeenCalledWith(['home']);

})
it('should hide loading and show error when user couldnt login', ()=>{
    spyOn(authService, 'login').and.returnValue(throwError(() => ({ message: 'error' })));
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    fixture.detectChanges();
    component.form.get('email')?.setValue('error@email.com');
    component.form.get('password')?.setValue('anyPassword');
    const loginButton =  page.querySelector('#loginButton') as HTMLElement;
    if (loginButton) {
        loginButton.click();
    } else {
        fail('Button not found');
    }

    store.select('loading').subscribe(loadingState => {
        expect(loadingState.show).toBeFalsy();
        
        });
        expect(toastController.create).toHaveBeenCalledTimes(1);
    })


})