import { LoginPage } from "./login.page";
import { ComponentFixture,  TestBed, waitForAsync } from "@angular/core/testing";
import { Router } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { AppRoutingModule } from "src/app/app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { ErrorMessageComponent } from "src/app/components/error-message/error-message.component";

describe('LoginPage', () => {
let component: LoginPage;
let fixture: ComponentFixture<LoginPage>;
let router: Router;

beforeEach(waitForAsync(() => {
TestBed.configureTestingModule({
declarations: [ LoginPage, ErrorMessageComponent ],
imports: [ IonicModule.forRoot(),
AppRoutingModule,
ReactiveFormsModule,
StoreModule.forRoot(),]
}).compileComponents();

fixture = TestBed.createComponent(LoginPage);
router = TestBed.get(Router);
component = fixture.componentInstance;
}));

it('should create form on init', () => {

component.ngOnInit();
expect(component.form).not.toBeUndefined();

})

it('should go to video-list page on login', ()=>{
    spyOn(router, 'navigate')
component.login();
expect(router.navigate).toHaveBeenCalledWith(['video-list']);
}

)
it('should go to register page on register', ()=>{
    spyOn(router, 'navigate')
component.register();
expect(router.navigate).toHaveBeenCalledWith(['register']);
}

)

})