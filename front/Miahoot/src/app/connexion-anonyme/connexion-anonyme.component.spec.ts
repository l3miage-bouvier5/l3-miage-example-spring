import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionAnonymeComponent } from './connexion-anonyme.component';

describe('ConnexionAnonymeComponent', () => {
  let component: ConnexionAnonymeComponent;
  let fixture: ComponentFixture<ConnexionAnonymeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnexionAnonymeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnexionAnonymeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
