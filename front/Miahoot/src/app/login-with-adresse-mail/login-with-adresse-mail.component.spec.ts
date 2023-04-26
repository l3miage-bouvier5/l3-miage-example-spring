import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWithAdresseMailComponent } from './login-with-adresse-mail.component';

describe('LoginWithAdresseMailComponent', () => {
  let component: LoginWithAdresseMailComponent;
  let fixture: ComponentFixture<LoginWithAdresseMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginWithAdresseMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginWithAdresseMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
