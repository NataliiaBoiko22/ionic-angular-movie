import { RegisterPage } from "./register.page";
import { ComponentFixture,  TestBed, waitForAsync } from "@angular/core/testing";
import { Router } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { AppRoutingModule } from "src/app/app-routing.module";

describe('LoginPage', () => {
let component: RegisterPage;
let fixture: ComponentFixture<RegisterPage>;
let router: Router;

beforeEach(waitForAsync(() => {
TestBed.configureTestingModule({
declarations: [ RegisterPage ],
imports: [ IonicModule.forRoot(),
AppRoutingModule]
}).compileComponents();

fixture = TestBed.createComponent(RegisterPage);
router = TestBed.get(Router);
component = fixture.componentInstance;
}));

it('should go to video-list page on register', ()=>{
    spyOn(router, 'navigate')
component.register();
expect(router.navigate).toHaveBeenCalledWith(['video-list']);
}

)



})